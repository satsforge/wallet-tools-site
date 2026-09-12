// Copies each tool's compiled, self-contained index.html from its sibling
// source repo into this site. Re-run whenever paper-wallet-btc,
// my-wallet-btc, psbt-signer-btc, btc-airgap-bridge,
// multisig-coordinator-btc, inheritance-planner-btc, or inheritance-vault-btc
// gets rebuilt (`npm run build` in that repo) and you want the site to serve
// the new version.
//
//   node scripts/sync.mjs            copy + verify
//   node scripts/sync.mjs --check    verify only, exit 1 if anything is off
//
// `--check` is the one to run before deploying (or in CI): it fails if the
// site is serving a stale build, or one whose inline script no longer
// matches the hash its own CSP pins.
import { copyFileSync, existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const workspace = join(root, '..');

const tools = [
  { src: join(workspace, 'paper-wallet-btc', 'dist', 'index.html'), dest: join(root, 'paper-wallet-btc', 'index.html') },
  { src: join(workspace, 'my_btc_wallet', 'dist', 'index.html'), dest: join(root, 'my-wallet-btc', 'index.html') },
  { src: join(workspace, 'psbt-signer-btc', 'dist', 'index.html'), dest: join(root, 'psbt-signer-btc', 'index.html') },
  { src: join(workspace, 'btc-airgap-bridge', 'dist', 'index.html'), dest: join(root, 'btc-airgap-bridge', 'index.html') },
  { src: join(workspace, 'multisig-coordinator-btc', 'dist', 'index.html'), dest: join(root, 'multisig-coordinator-btc', 'index.html') },
  { src: join(workspace, 'inheritance-planner-btc', 'dist', 'index.html'), dest: join(root, 'inheritance-planner-btc', 'index.html') },
  { src: join(workspace, 'inheritance-vault-btc', 'dist', 'index.html'), dest: join(root, 'inheritance-vault-btc', 'index.html') },
];

const checkOnly = process.argv.includes('--check');

/**
 * Every tool pins a SHA-256 of its own inline <script> in its CSP. If the two
 * ever disagree the browser silently refuses to run the script and the page
 * loads blank - no console-free way for a user to tell why. The usual cause
 * is a line-ending conversion somewhere between the build and here (Git's
 * core.autocrlf=true on Windows does exactly that), which is why this repo
 * marks *.html as -text in .gitattributes. Verify rather than assume.
 */
function checkCspHash(file) {
  const html = readFileSync(file, 'utf8');
  const script = html.match(/<script>([\s\S]*?)<\/script>/);
  const pinned = html.match(/script-src 'sha256-([^']+)'/);
  if (!script || !pinned) return 'no inline script / CSP hash found';
  const actual = createHash('sha256').update(script[1], 'utf8').digest('base64');
  if (actual !== pinned[1]) {
    return html.includes('\r\n')
      ? 'CSP hash mismatch - the file has CRLF line endings (check core.autocrlf / .gitattributes)'
      : 'CSP hash mismatch - the inline script does not match the hash its CSP pins';
  }
  return null;
}

const sha256 = (file) => createHash('sha256').update(readFileSync(file)).digest('hex');
const rel = (p) => relative(root, p).replace(/\\/g, '/');

let failed = false;

for (const { src, dest } of tools) {
  if (!existsSync(src)) {
    console.error(`✗ ${rel(dest)}: missing build output ${rel(src)} (run "npm run build" in that project first)`);
    failed = true;
    continue;
  }

  if (checkOnly) {
    if (!existsSync(dest)) {
      console.error(`✗ ${rel(dest)}: not present in the site`);
      failed = true;
      continue;
    }
    if (sha256(src) !== sha256(dest)) {
      console.error(`✗ ${rel(dest)}: STALE - differs from ${rel(src)}, run "node scripts/sync.mjs"`);
      failed = true;
      continue;
    }
  } else {
    copyFileSync(src, dest);
  }

  const problem = checkCspHash(dest);
  if (problem) {
    console.error(`✗ ${rel(dest)}: ${problem}`);
    failed = true;
  } else {
    console.log(`✓ ${rel(dest)}${checkOnly ? '' : ' synced'}`);
  }
}

if (failed) {
  console.error(checkOnly ? '\nThe site is not in sync with the tool builds.' : '\nSync finished with problems.');
  process.exitCode = 1;
} else if (checkOnly) {
  console.log('\nAll tools are in sync and their CSP hashes check out.');
}
