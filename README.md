# wallet-tools-site

Landing page para las herramientas de Bitcoin de SatsForge:
[paper-wallet-btc](https://github.com/satsforge/paper-wallet-btc),
[my-wallet-btc](https://github.com/satsforge/my-wallet-btc),
[psbt-signer-btc](https://github.com/satsforge/psbt-signer-btc),
[btc-airgap-bridge](https://github.com/satsforge/btc-airgap-bridge),
[multisig-coordinator-btc](https://github.com/satsforge/multisig-coordinator-btc),
[inheritance-planner-btc](https://github.com/satsforge/inheritance-planner-btc) y
[inheritance-vault-btc](https://github.com/satsforge/inheritance-vault-btc).

Sitio 100% estático, sin build step ni backend — sirve directo con
cualquier host de archivos estáticos (GitHub Pages, Vercel, Netlify, un
bucket S3, etc.).

## Estructura

```
index.html              landing page (linkea a las siete herramientas)
paper-wallet-btc/
  index.html             copia del build de paper-wallet-btc
my-wallet-btc/
  index.html             copia del build de my-wallet-btc
psbt-signer-btc/
  index.html             copia del build de psbt-signer-btc
btc-airgap-bridge/
  index.html             copia del build de btc-airgap-bridge
multisig-coordinator-btc/
  index.html             copia del build de multisig-coordinator-btc
inheritance-planner-btc/
  index.html             copia del build de inheritance-planner-btc
inheritance-vault-btc/
  index.html             copia del build de inheritance-vault-btc
scripts/sync.mjs         copia el último build de cada herramienta a este repo
```

## Actualizar una herramienta

Cada herramienta vive en su propio repo. Cuando cambie alguna:

```bash
# 1. Reconstruir la herramienta en su propio repo
cd ../paper-wallet-btc && npm run build
# (o) cd ../my_btc_wallet && npm run build
# (o) cd ../psbt-signer-btc && npm run build
# (o) cd ../btc-airgap-bridge && npm run build
# (o) cd ../multisig-coordinator-btc && npm run build
# (o) cd ../inheritance-planner-btc && npm run build
# (o) cd ../inheritance-vault-btc && npm run build

# 2. Volver acá y sincronizar
cd ../wallet-tools-site
node scripts/sync.mjs
```

`sync.mjs` asume que este repo vive como carpeta hermana de `paper-wallet-btc`,
`my_btc_wallet`, `psbt-signer-btc`, `btc-airgap-bridge`,
`multisig-coordinator-btc`, `inheritance-planner-btc` e `inheritance-vault-btc`
(mismo nivel, en el mismo `workspace-ideas`). Si lo cloná en otro lado, editá
las rutas en `scripts/sync.mjs` o copiá los `dist/index.html` a mano.

## Deploy

Sin decidir todavía — el sitio es 100% estático así que corre igual en
GitHub Pages, Vercel, o cualquier otro host de archivos. Pendiente: dominio
y proveedor.
