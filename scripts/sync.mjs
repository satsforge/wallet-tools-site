// Copies each tool's compiled, self-contained index.html from its sibling
// source repo into this site. Re-run whenever paper-wallet-btc or
// my-wallet-btc gets rebuilt (`npm run build` in that repo) and you want
// the site to serve the new version.
import { copyFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const workspace = join(root, '..'); // ../workspace-ideas

const tools = [
  { src: join(workspace, 'paper-wallet-btc', 'dist', 'index.html'), dest: join(root, 'paper-wallet-btc', 'index.html') },
  { src: join(workspace, 'my_btc_wallet', 'dist', 'index.html'), dest: join(root, 'my-wallet-btc', 'index.html') },
];

for (const { src, dest } of tools) {
  if (!existsSync(src)) {
    console.error(`Missing build output: ${src} (run "npm run build" in that project first)`);
    process.exitCode = 1;
    continue;
  }
  copyFileSync(src, dest);
  console.log(`Synced ${dest}`);
}
