# wallet-tools-site

Landing page y documentación de las herramientas de Bitcoin de SatsForge:
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
index.html                 landing + pestaña de documentación (shell)
assets/
  site.css                  estilos (misma paleta que las herramientas)
  site.js                   datos de las 7 herramientas, documentación ES/EN,
                            tabs, filtros, ruteo por hash, i18n y tema
paper-wallet-btc/
  index.html                copia del build de paper-wallet-btc
my-wallet-btc/index.html    (ídem, una carpeta por herramienta)
psbt-signer-btc/index.html
btc-airgap-bridge/index.html
multisig-coordinator-btc/index.html
inheritance-planner-btc/index.html
inheritance-vault-btc/index.html
scripts/sync.mjs            copia y verifica el build de cada herramienta
.gitattributes              evita que Git rompa los builds (ver abajo)
```

El sitio tiene dos pestañas: **Herramientas** (hero, flujo recomendado,
tarjetas filtrables y tabla comparativa) y **Documentación** (una página por
herramienta: qué es, cuándo usarla, cómo se usa paso a paso, modelo de
seguridad y limitaciones).

Todo lo que la página muestra sale de la tabla `TOOLS` en `assets/site.js`,
en español e inglés: las tarjetas, la tabla comparativa, el menú de
documentación y las páginas de documentación. **Agregar una herramienta es
agregar una entrada ahí** — no hay ningún otro lugar donde estén listadas.

Las páginas de documentación son enlazables directamente:
`…/#/docs/psbt-signer-btc` abre esa herramienta ya seleccionada.

### Por qué el CSS y el JS están en `assets/` y no inline

Cada herramienta es un único archivo autocontenido que fija en su CSP un
hash SHA-256 de su propio script inline — tiene sentido, porque el
entregable es ese archivo y nada más. Esta landing, en cambio, es un sitio
normal: separar CSS y JS deja poner una CSP igual de estricta
(`script-src 'self'; style-src 'self'`) **sin un hash que haya que
recalcular a mano en cada edición** — y sin el riesgo de que alguien lo
olvide y la página quede en blanco sin ninguna pista de por qué.

## Actualizar una herramienta

Cada herramienta vive en su propio repo. Cuando cambie alguna:

```bash
# 1. Reconstruir la herramienta en su propio repo
cd ../psbt-signer-btc && npm run build

# 2. Volver acá y sincronizar
cd ../wallet-tools-site
node scripts/sync.mjs
```

`sync.mjs` asume que este repo vive como carpeta hermana de las siete
herramientas (mismo nivel, mismo workspace). Si lo clonás en otro lado,
editá las rutas en `scripts/sync.mjs` o copiá los `dist/index.html` a mano.

### Verificar antes de deployar

```bash
node scripts/sync.mjs --check
```

Falla (exit 1) si el sitio está sirviendo un build viejo, o si el script
inline de alguna herramienta dejó de coincidir con el hash que su propia
CSP fija. Corrélo antes de publicar, o en CI.

## Por qué existe el `.gitattributes`

Cada herramienta fija en su CSP un hash SHA-256 de su propio `<script>`
inline. **Cualquier conversión de fin de línea reescribe esos bytes, el
hash deja de coincidir, y el navegador se niega a ejecutar el script**: la
página carga en blanco y la herramienta queda muerta, sin nada en la
interfaz que explique por qué.

En Windows, el `core.autocrlf=true` que instala Git por defecto hace
exactamente esa conversión en cada `clone` y cada `checkout`. Por eso este
repo marca `*.html` como `-text`: los builds se guardan y se recuperan byte
a byte como salieron. El resto de los archivos sí se normaliza a LF.

Si clonás alguno de los repos de las herramientas y su `dist/index.html`
queda con CRLF, la herramienta no va a funcionar hasta que lo restaures —
conviene agregarles el mismo `.gitattributes`.

## Deploy

Sin decidir todavía — el sitio es 100% estático así que corre igual en
GitHub Pages, Vercel, o cualquier otro host de archivos. Pendiente: dominio
y proveedor.
