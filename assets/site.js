/* SatsForge landing + documentation.
 *
 * Everything the page renders comes from the TOOLS table below, in both
 * languages: the cards, the comparison table, the docs navigation and the
 * docs pages themselves. Adding a tool means adding one entry here - there
 * is no other place that lists them.
 *
 * Deliberately dependency-free and build-step-free: this file is served
 * as-is, which is also what lets the CSP be a plain `script-src 'self'`
 * with no hash to recompute by hand on every edit.
 */
(function () {
  'use strict';

  // ------------------------------------------------------------------
  // Tools
  // ------------------------------------------------------------------

  var TOOLS = [
    {
      id: 'paper-wallet-btc',
      glyph: '🖨',
      name: 'Paper Wallet BTC',
      path: './paper-wallet-btc/index.html',
      repo: 'https://github.com/satsforge/paper-wallet-btc',
      tags: ['airgap'],
      badges: ['airgap'],
      kicker: { es: 'Generar', en: 'Generate' },
      short: {
        es: 'Creá una wallet de Bitcoin nueva desde cero: semilla, dirección y clave privada, listas para imprimir y guardar en papel. Pensada para usarse air-gapped.',
        en: 'Create a brand-new Bitcoin wallet from scratch: seed, address, and private key, ready to print and keep on paper. Built to be used air-gapped.'
      },
      compare: {
        purpose: { es: 'Generar una wallet nueva', en: 'Generate a new wallet' },
        network: { es: 'Ninguna (air-gapped)', en: 'None (air-gapped)' },
        input: { es: 'Entropía del navegador / dados', en: 'Browser entropy / dice' },
        output: { es: 'PDF imprimible', en: 'Printable PDF' }
      },
      doc: {
        es: {
          tagline: 'Genera una wallet de Bitcoin completamente nueva en un equipo sin conexión, y la imprime en un PDF pensado para guardarse en papel.',
          what: 'Es el punto de partida del suite: crea la entropía, deriva la semilla BIP39 y las direcciones, y arma un PDF listo para imprimir. El entregable es un único archivo <code>index.html</code> autocontenido — sin llamadas de red, sin dependencias externas en tiempo de ejecución — que podés copiar a un USB y abrir con doble clic en una máquina desconectada.',
          when: [
            'Querés una wallet nueva cuya clave privada nunca haya existido en un equipo conectado a internet.',
            'Querés un respaldo en papel, no en un disco ni en la nube.',
            'Vas a regalar o repartir varias wallets y necesitás generarlas de una sentada.'
          ],
          steps: [
            'Descargá el archivo y copialo por USB a un equipo desconectado de internet. Abrilo con doble clic (<code>file://</code>).',
            'Elegí el tipo de dirección: Legacy, SegWit, Native SegWit o Taproot. Si no sabés cuál, el modo Básico ya elige por vos.',
            'Opcional, en modo Avanzado: agregá entropía tirando dados, cifrá la semilla con AES-256, o generá una wallet señuelo.',
            'Revisá la semilla en pantalla y exportá el PDF.',
            'Imprimilo, verificá que se lea bien, y guardá el papel. Cerrá la pestaña: nada queda guardado en ningún lado.'
          ],
          security: [
            '<strong>Cero llamadas de red</strong>, impuesto por la CSP (<code>connect-src \'none\'</code>) — verificable en las herramientas de desarrollador del navegador.',
            '<strong>Cero persistencia</strong>: no usa <code>localStorage</code>, <code>sessionStorage</code>, cookies ni IndexedDB. Al recargar, no queda nada.',
            'El inventario de sesión guarda <strong>solo datos públicos</strong> (dirección, tipo, ruta de derivación) en una variable de JavaScript — nunca la semilla ni la clave privada.',
            'Cifrado opcional <strong>BIP38</strong> (de la clave privada) y <strong>AES-256-GCM</strong> (de la semilla), este último compatible con My Wallet BTC, PSBT Signer BTC y el Planificador de Herencia.',
            'La criptografía está verificada contra los vectores de prueba oficiales de BIP38, BIP39, BIP84 y BIP341.'
          ],
          limits: [
            'No consulta saldo ni transmite nada — para eso están My Wallet BTC o BTC Airgap Bridge.',
            'Un papel se puede perder, quemar o mojar: el PDF es un respaldo, no un plan de herencia. Para eso está el Planificador de Herencia BTC.',
            'La seguridad depende de que lo abras en un equipo realmente desconectado. Abrirlo en la máquina de todos los días anula buena parte de la garantía.'
          ]
        },
        en: {
          tagline: 'Generates a brand-new Bitcoin wallet on an offline machine and prints it to a PDF meant to be kept on paper.',
          what: 'This is the suite\'s starting point: it creates the entropy, derives the BIP39 seed and the addresses, and builds a print-ready PDF. The deliverable is a single self-contained <code>index.html</code> — no network calls, no external runtime dependencies — that you can copy onto a USB stick and open by double-clicking on a disconnected machine.',
          when: [
            'You want a new wallet whose private key has never existed on an internet-connected machine.',
            'You want a paper backup, not a disk or a cloud one.',
            'You are gifting or handing out several wallets and need to generate them in one sitting.'
          ],
          steps: [
            'Download the file and copy it by USB to a machine that is disconnected from the internet. Open it by double-clicking (<code>file://</code>).',
            'Pick the address type: Legacy, SegWit, Native SegWit, or Taproot. If you are not sure, Basic mode already picks for you.',
            'Optional, in Advanced mode: add entropy by rolling dice, encrypt the seed with AES-256, or generate a decoy wallet.',
            'Check the seed on screen and export the PDF.',
            'Print it, confirm it is legible, and store the paper. Close the tab: nothing is saved anywhere.'
          ],
          security: [
            '<strong>Zero network calls</strong>, enforced by the CSP (<code>connect-src \'none\'</code>) — verifiable in the browser\'s developer tools.',
            '<strong>Zero persistence</strong>: no <code>localStorage</code>, <code>sessionStorage</code>, cookies, or IndexedDB. Reload and nothing is left.',
            'The session inventory keeps <strong>public data only</strong> (address, type, derivation path) in a JavaScript variable — never the seed or the private key.',
            'Optional <strong>BIP38</strong> (private key) and <strong>AES-256-GCM</strong> (seed) encryption, the latter compatible with My Wallet BTC, PSBT Signer BTC, and the Inheritance Planner.',
            'The cryptography is verified against the official BIP38, BIP39, BIP84, and BIP341 test vectors.'
          ],
          limits: [
            'It does not check balances or broadcast anything — that is what My Wallet BTC and BTC Airgap Bridge are for.',
            'Paper can be lost, burned, or soaked: the PDF is a backup, not an inheritance plan. That is what Inheritance Planner BTC is for.',
            'The security depends on you opening it on a genuinely disconnected machine. Opening it on your everyday computer gives up much of the guarantee.'
          ]
        }
      }
    },

    {
      id: 'my-wallet-btc',
      glyph: '👛',
      name: 'My Wallet BTC',
      path: './my-wallet-btc/index.html',
      repo: 'https://github.com/satsforge/my-wallet-btc',
      tags: ['online'],
      badges: ['online'],
      kicker: { es: 'Acceder', en: 'Access' },
      short: {
        es: 'Accedé a una wallet que ya tenés — de Paper Wallet BTC o de cualquier otra — consultá su saldo real y enviá fondos, firmando siempre en tu navegador.',
        en: 'Access a wallet you already have — from Paper Wallet BTC or any other — check its real balance and send funds, always signing in your browser.'
      },
      compare: {
        purpose: { es: 'Acceder a una wallet existente', en: 'Access an existing wallet' },
        network: { es: 'Sí — consulta saldo y transmite', en: 'Yes — checks balance and broadcasts' },
        input: { es: 'Semilla, semilla cifrada, WIF o clave BIP38', en: 'Seed, encrypted seed, WIF, or BIP38 key' },
        output: { es: 'Panel de saldo y envío de fondos', en: 'Balance panel and fund sending' }
      },
      doc: {
        es: {
          tagline: 'Una wallet completa del lado del cliente: importá una wallet que ya tenés, mirá su saldo real y mandá fondos, firmando siempre en tu navegador.',
          what: 'A diferencia de Paper Wallet BTC, esta herramienta no crea nada nuevo: <strong>importa</strong> una wallet existente y te deja operarla. Tiene además un modo <strong>watch-only</strong> en el que solo pegás una clave pública extendida (xpub/ypub/zpub): ves el saldo y armás transacciones sin firmar (PSBT) para firmarlas en otro lado, sin que ninguna clave privada toque nunca esta pestaña.',
          when: [
            'Tenés una wallet en papel y querés ver cuánto tiene o mover fondos.',
            'Querés operar con comodidad, aceptando que la clave pasa por un equipo conectado.',
            'Querés vigilar el saldo de una wallet fría sin exponer su clave: usá el modo watch-only con la xpub.'
          ],
          steps: [
            'Elegí la red. Testnet viene por defecto; Mainnet exige tildar un checkbox de confirmación explícita.',
            'Elegí cómo accedés: frase semilla BIP39 (en texto plano o el bloque cifrado AES que imprime Paper Wallet BTC), clave privada WIF o BIP38, o solo una xpub para modo watch-only.',
            'Si tu semilla usa passphrase BIP39 ("palabra 25"), ingresala — es distinta de la contraseña de descifrado del bloque AES.',
            'Mirá el panel: saldo, direcciones derivadas y próxima dirección de recepción.',
            'Para enviar: destino, monto y tarifa. Revisá el resumen, confirmá y la transacción se firma en el navegador y se transmite vía mempool.space.'
          ],
          security: [
            'La firma ocurre <strong>siempre en tu navegador</strong>: la clave privada nunca se envía a ningún servidor.',
            'La única salida de red es hacia <code>mempool.space</code>, restringida por CSP con <code>connect-src</code> — para consultar saldo y transmitir, nada más.',
            '<strong>Cero persistencia</strong>: no usa <code>localStorage</code>, cookies ni IndexedDB. Cerrar la pestaña borra todo.',
            'El <strong>modo watch-only</strong> te deja consultar y armar PSBTs sin que exista ninguna clave privada en la sesión.',
            'Carga desde archivo para la semilla cifrada y la clave privada, para no tener que pasar por el portapapeles.'
          ],
          limits: [
            'Es la herramienta con más superficie de riesgo del suite junto con la Bóveda: maneja claves privadas <em>y</em> tiene red. Si querés separar esas dos cosas, usá PSBT Signer BTC + BTC Airgap Bridge.',
            'Depende de la disponibilidad de mempool.space: no hay fallback a otro proveedor ni a un nodo propio.',
            'Probá primero en testnet con monedas sin valor antes de usarla con fondos reales.'
          ]
        },
        en: {
          tagline: 'A full client-side wallet: import a wallet you already have, see its real balance, and send funds — always signing in your browser.',
          what: 'Unlike Paper Wallet BTC, this tool creates nothing new: it <strong>imports</strong> an existing wallet and lets you operate it. It also has a <strong>watch-only</strong> mode where you paste only an extended public key (xpub/ypub/zpub): you see the balance and build unsigned transactions (PSBTs) to sign elsewhere, without any private key ever touching this tab.',
          when: [
            'You have a paper wallet and want to see what is in it or move funds.',
            'You want convenience, accepting that the key passes through a connected machine.',
            'You want to watch a cold wallet\'s balance without exposing its key: use watch-only mode with the xpub.'
          ],
          steps: [
            'Pick the network. Testnet is the default; Mainnet requires ticking an explicit confirmation checkbox.',
            'Pick how you get in: BIP39 seed phrase (plain text, or the AES-encrypted block Paper Wallet BTC prints), a WIF or BIP38 private key, or just an xpub for watch-only mode.',
            'If your seed uses a BIP39 passphrase ("25th word"), enter it — it is different from the AES block\'s decryption password.',
            'Check the dashboard: balance, derived addresses, and the next receive address.',
            'To send: destination, amount, and fee. Review the summary, confirm, and the transaction is signed in the browser and broadcast via mempool.space.'
          ],
          security: [
            'Signing always happens <strong>in your browser</strong>: the private key is never sent to any server.',
            'The only network egress is to <code>mempool.space</code>, restricted by the CSP\'s <code>connect-src</code> — to check balances and broadcast, nothing more.',
            '<strong>Zero persistence</strong>: no <code>localStorage</code>, cookies, or IndexedDB. Closing the tab clears everything.',
            '<strong>Watch-only mode</strong> lets you query and build PSBTs with no private key present in the session at all.',
            'Load-from-file for the encrypted seed and the private key, so you never have to go through the clipboard.'
          ],
          limits: [
            'Along with the Vault, this is the highest-exposure tool in the suite: it handles private keys <em>and</em> has network access. To separate those two, use PSBT Signer BTC + BTC Airgap Bridge instead.',
            'It depends on mempool.space being available: there is no fallback provider and no way to point it at your own node.',
            'Try it on testnet with worthless coins before using it with real funds.'
          ]
        }
      }
    },

    {
      id: 'psbt-signer-btc',
      glyph: '✍',
      name: 'PSBT Signer BTC',
      path: './psbt-signer-btc/index.html',
      repo: 'https://github.com/satsforge/psbt-signer-btc',
      tags: ['airgap'],
      badges: ['airgap'],
      kicker: { es: 'Firmar', en: 'Sign' },
      short: {
        es: 'Firmá una transacción (PSBT) que armó otra wallet, sin ninguna llamada de red — ni para consultar saldo ni para transmitir. Pensada para usarse air-gapped.',
        en: 'Sign a transaction (PSBT) another wallet built, with no network calls at all — not to check balance, not to broadcast. Built to be used air-gapped.'
      },
      compare: {
        purpose: { es: 'Firmar una transacción ya armada', en: 'Sign an already-built transaction' },
        network: { es: 'Ninguna (air-gapped)', en: 'None (air-gapped)' },
        input: { es: 'Semilla o clave privada + un PSBT sin firmar', en: 'Seed or private key + an unsigned PSBT' },
        output: { es: 'Transacción firmada (hex, QR o PSBT parcial)', en: 'Signed transaction (hex, QR, or partial PSBT)' }
      },
      doc: {
        es: {
          tagline: 'El firmador offline del suite: recibe un PSBT armado en otro lado, lo firma con tu clave, y devuelve el resultado — sin tocar la red ni una sola vez.',
          what: 'Completa el trío air-gapped. Otra herramienta arma la transacción (My Wallet BTC en watch-only, el Coordinador Multifirma, la Bóveda de Herencia, o cualquier wallet compatible con BIP174), esta la firma en una máquina desconectada, y una tercera la transmite. Es la única herramienta del suite que maneja claves privadas <em>y</em> garantiza cero red.',
          when: [
            'Querés que la clave privada nunca esté en un equipo conectado a internet.',
            'Sos uno de varios cosigners de una wallet multifirma y te toca firmar tu parte.',
            'Sos heredero de una Bóveda de Herencia BTC y te toca reclamar tu parte pasado el timelock.'
          ],
          steps: [
            'Abrí la herramienta en un equipo desconectado. Elegí la red y desbloqueá tu clave: semilla BIP39 (texto plano o cifrada con AES), WIF, o clave BIP38.',
            'Pegá o cargá el PSBT sin firmar (base64 o hex). También podés cargarlo desde un archivo, sin usar el portapapeles.',
            'Revisá la pantalla de resumen: total de entradas, total de salidas, comisión, y cada dirección de destino con su monto. Las direcciones se muestran completas, sin truncar.',
            'Si aparece una advertencia (montos no verificables o comisión anómala), leela: hace falta una confirmación extra para poder firmar.',
            'Confirmá. Si la transacción queda completa obtenés el hex listo para transmitir y su TXID; si necesita más firmas, obtenés el PSBT actualizado para el próximo cosigner. En texto, QR, o archivo descargable.'
          ],
          security: [
            '<strong>Cero red, de verdad</strong>: <code>connect-src \'none\'</code> en la CSP, sin ninguna excepción. Verificable desde el navegador.',
            '<strong>Revisión obligatoria</strong>: el PSBT se decodifica y se identifica qué se puede firmar, pero <code>tx.sign()</code> no corre hasta que confirmás el resumen en pantalla.',
            '<strong>Alerta de montos no verificables</strong>: un input que solo trae <code>witnessUtxo</code> declara un monto que no se puede comprobar sin conexión. La revisión lo marca y exige una confirmación extra — es la defensa contra el ataque clásico de inflar la comisión real mintiendo sobre los montos.',
            '<strong>Chequeo de red por ruta de derivación</strong>: un PSBT que declare una ruta de mainnet mientras operás en testnet (o al revés) se rechaza, en vez de firmar a ciegas en la red equivocada.',
            '<strong>Higiene de memoria</strong>: la semilla y la master key se cerean apenas se usan; las claves derivadas efímeras, apenas terminan de firmar; y todo lo demás al bloquear la sesión.',
            '<strong>Auto-bloqueo</strong> a los 10 minutos sin actividad, por si desbloqueaste y te alejaste.'
          ],
          limits: [
            'No arma transacciones desde cero: solo firma un PSBT que ya te dio otra herramienta.',
            'La búsqueda por fuerza bruta de tus direcciones usa un rango fijo (200 índices por rama). Fuera de ese rango hace falta que el PSBT traiga su <code>bip32Derivation</code>.',
            'Firma Taproot por key-path y por script-path vía <code>tapBip32Derivation</code>, pero no implementa todos los casos posibles de árboles de scripts.'
          ]
        },
        en: {
          tagline: 'The suite\'s offline signer: it takes a PSBT built elsewhere, signs it with your key, and hands back the result — without touching the network once.',
          what: 'It completes the air-gapped trio. Another tool builds the transaction (My Wallet BTC in watch-only mode, the Multisig Coordinator, the Inheritance Vault, or any BIP174-compatible wallet), this one signs it on a disconnected machine, and a third one broadcasts it. It is the only tool in the suite that handles private keys <em>and</em> guarantees zero network.',
          when: [
            'You want the private key to never sit on an internet-connected machine.',
            'You are one of several cosigners on a multisig wallet and it is your turn to sign.',
            'You are an heir on an Inheritance Vault BTC and it is time to claim your share after the timelock.'
          ],
          steps: [
            'Open the tool on a disconnected machine. Pick the network and unlock your key: BIP39 seed (plain or AES-encrypted), WIF, or BIP38 key.',
            'Paste or load the unsigned PSBT (base64 or hex). You can also load it from a file, without using the clipboard.',
            'Review the summary screen: total inputs, total outputs, fee, and every destination address with its amount. Addresses are shown in full, never truncated.',
            'If a warning appears (unverifiable amounts or an anomalous fee), read it: an extra confirmation is required before you can sign.',
            'Confirm. If the transaction is complete you get the broadcast-ready hex and its TXID; if it needs more signatures, you get the updated PSBT for the next cosigner. As text, a QR code, or a downloadable file.'
          ],
          security: [
            '<strong>Genuinely zero network</strong>: <code>connect-src \'none\'</code> in the CSP, with no exceptions. Verifiable from the browser.',
            '<strong>Mandatory review</strong>: the PSBT is decoded and the signable inputs identified, but <code>tx.sign()</code> does not run until you confirm the on-screen summary.',
            '<strong>Unverifiable-amount warning</strong>: an input carrying only a <code>witnessUtxo</code> declares an amount that cannot be checked offline. The review flags it and demands an extra confirmation — this is the defense against the classic attack of inflating the real fee by lying about amounts.',
            '<strong>Network check by derivation path</strong>: a PSBT declaring a mainnet path while you operate on testnet (or vice versa) is rejected, rather than blindly signing on the wrong network.',
            '<strong>Memory hygiene</strong>: the seed and master key are zeroed as soon as they are used; ephemeral derived keys as soon as signing finishes; everything else when you lock the session.',
            '<strong>Auto-lock</strong> after 10 minutes of inactivity, in case you unlocked and walked away.'
          ],
          limits: [
            'It does not build transactions from scratch: it only signs a PSBT another tool gave you.',
            'The brute-force search for your addresses uses a fixed range (200 indices per chain). Beyond that the PSBT has to carry its own <code>bip32Derivation</code>.',
            'It signs Taproot by key-path and by script-path via <code>tapBip32Derivation</code>, but does not implement every possible script-tree case.'
          ]
        }
      }
    },

    {
      id: 'btc-airgap-bridge',
      glyph: '🌉',
      name: 'BTC Airgap Bridge',
      path: './btc-airgap-bridge/index.html',
      repo: 'https://github.com/satsforge/btc-airgap-bridge',
      tags: ['online', 'nokeys'],
      badges: ['online', 'nokeys'],
      kicker: { es: 'Puente', en: 'Bridge' },
      short: {
        es: 'El complemento online de un flujo air-gapped: consultá UTXOs y tarifas de red para armar una transacción offline, y transmití la que ya firmaste en otro lado.',
        en: 'The online companion for an air-gapped workflow: query UTXOs and network fees to build a transaction offline, and broadcast the one you already signed elsewhere.'
      },
      compare: {
        purpose: { es: 'Consultar UTXOs y transmitir', en: 'Query UTXOs and broadcast' },
        network: { es: 'Sí, siempre — es su propósito', en: 'Yes, always — that is its purpose' },
        input: { es: 'Direcciones, o una transacción ya firmada', en: 'Addresses, or an already-signed transaction' },
        output: { es: 'UTXOs (.json) o TXID transmitido', en: 'UTXOs (.json) or a broadcast TXID' }
      },
      doc: {
        es: {
          tagline: 'La mitad online de un flujo que por lo demás es 100% air-gapped: mira la red por vos, sin pedirte jamás una clave.',
          what: 'Un flujo air-gapped completo necesita tocar la red exactamente dos veces: antes de firmar (para saber qué UTXOs hay y a qué tarifa conviene pagar) y después (para transmitir). Esta herramienta cubre esas dos puntas y nada más. No tiene ningún concepto de clave: ni privada, ni siquiera pública extendida.',
          when: [
            'Firmás en un equipo desconectado y necesitás saber qué UTXOs tenés y a qué tarifa pagar.',
            'Ya firmaste una transacción en otro lado y necesitás difundirla a la red.',
            'Usás una hardware wallet y querés un transmisor que no te pida nada más que el hex firmado.'
          ],
          steps: [
            'Elegí la red. Testnet por defecto; Mainnet exige el checkbox de confirmación.',
            'Para consultar: pegá una o más direcciones (una por línea) de tu wallet fría. Se consulta cada una y se combinan en una sola lista de UTXOs, con la altura de bloque actual y tres estimaciones de tarifa.',
            'Descargá el <code>.json</code> y llevátelo al equipo offline para armar la transacción ahí.',
            'Para transmitir: pegá o cargá el hex de la transacción firmada (o un PSBT ya finalizado, base64 o hex).',
            'Revisá el resumen — TXID, tamaño virtual, entradas que se gastan, salidas con dirección completa y monto, y la comisión — tildá el checkbox y confirmá. Recibís el TXID con un link al explorador.'
          ],
          security: [
            '<strong>Cero claves, de ningún tipo</strong>: no hay ningún campo para pegar una clave privada, una semilla, ni una xpub. Solo entiende direcciones y transacciones ya firmadas.',
            '<strong>Nunca firma</strong>: verifica explícitamente que lo que le pegás ya esté completamente firmado y finalizado. Un PSBT a medio firmar se rechaza con un error claro, en vez de intentar completarlo.',
            '<strong>Comisión mostrada con honestidad</strong>: cuando se puede calcular de verdad, se muestra el número exacto; cuando no, se dice explícitamente "desconocida" en vez de inventar una cifra.',
            '<strong>Revisión completa antes de transmitir</strong>: entradas <em>y</em> salidas, con las direcciones de destino sin truncar, y un checkbox que advierte que transmitir es irreversible.',
            '<strong>Cambiar de red descarta lo que estaba en pantalla</strong>: una revisión hecha bajo una red no queda disponible para confirmarse bajo otra.',
            '<strong>Cero persistencia</strong>: no usa cookies ni ningún almacenamiento del navegador.'
          ],
          limits: [
            'Depende de mempool.space. Si el servicio está caído o limita pedidos, la consulta falla — no hay fallback ni nodo propio configurable.',
            'La comisión de una transacción en crudo solo se puede calcular si consultaste esos mismos UTXOs en la misma sesión; si no, se muestra como desconocida.',
            'No valida que las direcciones de destino sean "las tuyas": no conoce ninguna clave ni xpub contra la cual comparar. La revisión es manual, por eso las muestra completas.'
          ]
        },
        en: {
          tagline: 'The online half of an otherwise fully air-gapped workflow: it watches the network for you, without ever asking for a key.',
          what: 'A complete air-gapped workflow has to touch the network exactly twice: before signing (to know which UTXOs exist and what fee to pay) and after (to broadcast). This tool covers those two ends and nothing else. It has no concept of a key at all — not private, not even an extended public one.',
          when: [
            'You sign on a disconnected machine and need to know which UTXOs you have and what fee to pay.',
            'You already signed a transaction elsewhere and need to broadcast it.',
            'You use a hardware wallet and want a broadcaster that asks for nothing but the signed hex.'
          ],
          steps: [
            'Pick the network. Testnet by default; Mainnet requires the confirmation checkbox.',
            'To query: paste one or more addresses (one per line) from your cold wallet. Each is queried and merged into a single UTXO list, along with the current block height and three fee estimates.',
            'Download the <code>.json</code> and take it to the offline machine to build the transaction there.',
            'To broadcast: paste or load the signed transaction hex (or an already-finalized PSBT, base64 or hex).',
            'Review the summary — TXID, virtual size, the inputs being spent, the outputs with full address and amount, and the fee — tick the checkbox and confirm. You get the TXID with a link to the explorer.'
          ],
          security: [
            '<strong>Zero keys, of any kind</strong>: there is no field to paste a private key, a seed, or an xpub. It only understands addresses and already-signed transactions.',
            '<strong>It never signs</strong>: it explicitly verifies that what you paste is already fully signed and finalized. A half-signed PSBT is rejected with a clear error rather than being completed.',
            '<strong>Honest fee display</strong>: when the fee can genuinely be computed, the exact number is shown; when it cannot, it says "unknown" explicitly instead of inventing a figure.',
            '<strong>Complete review before broadcasting</strong>: inputs <em>and</em> outputs, with destination addresses never truncated, and a checkbox warning that broadcasting is irreversible.',
            '<strong>Switching networks discards what was on screen</strong>: a review done under one network is not left available to confirm under another.',
            '<strong>Zero persistence</strong>: no cookies, no browser storage of any kind.'
          ],
          limits: [
            'It depends on mempool.space. If the service is down or rate-limits you, the query fails — there is no fallback and no way to point it at your own node.',
            'A raw transaction\'s fee can only be computed if you queried those same UTXOs in the same session; otherwise it is shown as unknown.',
            'It does not validate that destination addresses are "yours": it knows no key or xpub to compare against. The review is manual, which is why addresses are shown in full.'
          ]
        }
      }
    },

    {
      id: 'multisig-coordinator-btc',
      glyph: '🔗',
      name: 'Coordinador Multifirma BTC',
      nameEn: 'Multisig Coordinator BTC',
      path: './multisig-coordinator-btc/index.html',
      repo: 'https://github.com/satsforge/multisig-coordinator-btc',
      tags: ['online', 'nokeys'],
      badges: ['online', 'nokeys'],
      kicker: { es: 'Coordinar', en: 'Coordinate' },
      short: {
        es: 'Armá una wallet multifirma (P2WSH) M-de-N, consultá su saldo, armá una transacción de gasto y coordiná las firmas de los cosigners hasta juntar el quorum.',
        en: 'Build an M-of-N multisig (P2WSH) wallet, check its balance, build a spending transaction, and coordinate cosigner signatures until the quorum is met.'
      },
      compare: {
        purpose: { es: 'Armar/consultar una wallet M-de-N y coordinar PSBTs', en: 'Build/check an M-of-N wallet and coordinate PSBTs' },
        network: { es: 'Sí — consulta saldo', en: 'Yes — checks balance' },
        input: { es: 'xpubs/descriptor, y PSBTs firmados de los cosigners', en: 'xpubs/descriptor, and cosigners\' signed PSBTs' },
        output: { es: 'Saldo, descriptor, PSBT sin firmar o tx final', en: 'Balance, descriptor, unsigned PSBT, or final tx' }
      },
      doc: {
        es: {
          tagline: 'Un coordinador multifirma al estilo Caravan, pero como una sola página: arma la wallet M-de-N, la consulta, y junta las firmas de cada cosigner.',
          what: 'Una wallet multifirma necesita alguien que arme el descriptor, derive las direcciones, construya la transacción de gasto y junte las firmas parciales de cada cosigner. Ese "alguien" no necesita —ni debería— ver ninguna clave privada: solo las claves públicas extendidas de cada participante. Eso es exactamente lo que hace esta herramienta.',
          when: [
            'Querés una wallet cuya custodia esté repartida entre varias personas o varios dispositivos.',
            'Querés que ningún dispositivo solo pueda mover los fondos.',
            'Ya tenés una wallet multifirma armada en Sparrow, Coldcard o Bitcoin Core y querés operarla desde un descriptor.'
          ],
          steps: [
            'Elegí la red, y elegí M (firmas requeridas) y N (cantidad de cosigners).',
            'Cargá los cosigners: uno por uno (nombre, xpub, fingerprint y ruta de derivación — podés escanear el xpub con la cámara), o pegando un descriptor <code>wsh(sortedmulti(...))</code> ya armado por otra herramienta.',
            '"Armar wallet y consultar saldo" deriva las direcciones y escanea ambas ramas contra mempool.space con el límite de huecos estándar.',
            'Desde el panel: recibir, actualizar, ver direcciones, exportar la configuración como descriptor (guardala: sin ella tenés que volver a tipear todo), o enviar.',
            'Para enviar: armá la transacción, revisá el resumen, exportá el PSBT sin firmar y llevalo a cada cosigner. Volvé con cada PSBT firmado, pegalo o escanealo, y mirá el progreso de firmas hasta llegar al quorum.',
            'Cuando todos los inputs llegan a M firmas válidas, finalizá y llevá el hex resultante a BTC Airgap Bridge para transmitirlo.'
          ],
          security: [
            '<strong>Nunca ve una clave privada</strong>: no hay ningún campo para pegar una. Toda la derivación es pública pura.',
            '<strong>BIP67 / sortedmulti</strong>: el orden en que cargás los cosigners no cambia la dirección resultante — las claves se ordenan canónicamente, igual que hacen Sparrow, Coldcard y Bitcoin Core.',
            '<strong>Cada firma se verifica criptográficamente</strong> contra el sighash real del input antes de contar para el quorum. Una firma corrupta o forjada se rechaza al combinarla — sobre una copia, así que nunca toca el PSBT que se está coordinando.',
            '<strong>La profundidad del xpub se valida contra la ruta declarada</strong>: pegar la clave maestra en vez de la de cuenta se rechaza, en vez de armar una wallet cuyas direcciones nunca se van a poder firmar.',
            '<strong>Checksum de descriptores (BIP380)</strong>: un descriptor mal copiado se rechaza. Si viene sin checksum se acepta, pero el panel avisa que no se pudo verificar.',
            '<strong>Cosigners duplicados rechazados</strong>, comparando la clave derivada real y no el texto del xpub (la misma clave puede escribirse con prefijos distintos).'
          ],
          limits: [
            'Solo P2WSH nativo (<code>wsh(sortedmulti(...))</code>). No soporta P2SH-P2WSH ni multifirma Taproot.',
            'No hay conexión directa por USB a hardware wallets: el intercambio es por texto, archivo o QR (BBQr, el formato de Coldcard).',
            'El escaneo por cámara se verificó contra imágenes QR reales, pero no contra una cámara ni una hardware wallet físicas. Pegar el texto sigue siendo la vía de respaldo.',
            'Nunca transmite: el hex final se lleva a BTC Airgap Bridge o a cualquier nodo.'
          ]
        },
        en: {
          tagline: 'A Caravan-style multisig coordinator as a single page: it builds the M-of-N wallet, checks it, and collects each cosigner\'s signature.',
          what: 'A multisig wallet needs someone to build the descriptor, derive the addresses, construct the spending transaction, and gather each cosigner\'s partial signature. That "someone" does not need — and should not have — any private key: only each participant\'s extended public key. That is exactly what this tool does.',
          when: [
            'You want a wallet whose custody is split across several people or devices.',
            'You want no single device to be able to move the funds on its own.',
            'You already have a multisig wallet set up in Sparrow, Coldcard, or Bitcoin Core and want to operate it from a descriptor.'
          ],
          steps: [
            'Pick the network, then pick M (required signatures) and N (number of cosigners).',
            'Add the cosigners: one by one (name, xpub, fingerprint, and derivation path — you can scan the xpub with the camera), or by pasting a <code>wsh(sortedmulti(...))</code> descriptor another tool produced.',
            '"Build wallet and check balance" derives the addresses and scans both chains against mempool.space with the standard gap limit.',
            'From the dashboard: receive, refresh, list addresses, export the configuration as a descriptor (save it — without it you have to retype everything), or send.',
            'To send: build the transaction, review the summary, export the unsigned PSBT and take it to each cosigner. Come back with each signed PSBT, paste or scan it, and watch the signature progress until the quorum is met.',
            'Once every input reaches M valid signatures, finalize and take the resulting hex to BTC Airgap Bridge to broadcast it.'
          ],
          security: [
            '<strong>It never sees a private key</strong>: there is no field to paste one. All derivation is pure public-key derivation.',
            '<strong>BIP67 / sortedmulti</strong>: the order you add cosigners in does not change the resulting address — keys are sorted canonically, exactly as Sparrow, Coldcard, and Bitcoin Core do.',
            '<strong>Every signature is cryptographically verified</strong> against the input\'s real sighash before it counts toward the quorum. A corrupt or forged signature is rejected at combine time — on a clone, so it never touches the PSBT being coordinated.',
            '<strong>The xpub\'s depth is validated against its declared path</strong>: pasting the master key instead of the account key is rejected, rather than building a wallet whose addresses could never be signed.',
            '<strong>Descriptor checksums (BIP380)</strong>: a mis-copied descriptor is rejected. One with no checksum is accepted, but the dashboard warns that nothing could be verified.',
            '<strong>Duplicate cosigners rejected</strong>, comparing the actual derived key rather than the xpub text (the same key can be written with different prefixes).'
          ],
          limits: [
            'Native P2WSH only (<code>wsh(sortedmulti(...))</code>). No P2SH-P2WSH, no Taproot multisig.',
            'No direct USB connection to hardware wallets: the exchange is by text, file, or QR (BBQr, Coldcard\'s format).',
            'Camera scanning was verified against real QR images, but not against a physical camera or hardware wallet. Pasting the text remains the fallback.',
            'It never broadcasts: the final hex goes to BTC Airgap Bridge or any node.'
          ]
        }
      }
    },

    {
      id: 'inheritance-planner-btc',
      glyph: '📋',
      name: 'Planificador de Herencia BTC',
      nameEn: 'Inheritance Planner BTC',
      path: './inheritance-planner-btc/index.html',
      repo: 'https://github.com/satsforge/inheritance-planner-btc',
      tags: ['airgap', 'nokeys'],
      badges: ['airgap', 'nokeys'],
      kicker: { es: 'Planificar', en: 'Plan' },
      short: {
        es: 'Respondé un cuestionario sobre tu custodia actual y obtené un plan de respaldo y documentación para tus herederos — sin pedir ninguna clave.',
        en: 'Answer a questionnaire about your current custody setup and get a backup and documentation plan for your heirs — asking for no key.'
      },
      compare: {
        purpose: { es: 'Planificar respaldo y herencia', en: 'Plan backup and inheritance' },
        network: { es: 'Ninguna (air-gapped)', en: 'None (air-gapped)' },
        input: { es: 'Respuestas de un cuestionario (nunca una clave)', en: 'Answers to a questionnaire (never a key)' },
        output: { es: 'Plan en texto, PDF, o cifrado', en: 'Plan as text, PDF, or encrypted' }
      },
      doc: {
        es: {
          tagline: 'Convierte un cuestionario sobre tu custodia actual en un plan concreto de respaldo y documentación para tus herederos.',
          what: 'La forma más común de perder bitcoin no es un hackeo: es que quien lo custodiaba ya no esté y nadie más sepa cómo acceder. Esta herramienta no custodia nada — te hace preguntas sobre tu situación y devuelve un plan: qué mejorar, cómo repartir el respaldo, qué documentar y qué <em>no</em> documentar nunca.',
          when: [
            'Tenés bitcoin y nadie más sabría cómo acceder si vos no estás.',
            'Querés dejar instrucciones sin escribir tu semilla en un papel que cualquiera pueda leer.',
            'Querés entender qué tan frágil es tu custodia actual antes de mejorarla.'
          ],
          steps: [
            'Respondé el cuestionario de cuatro pasos: tu custodia actual, tu respaldo físico, si tus herederos saben que los fondos existen y sabrían acceder, y si tenés a alguien de confianza técnica que pueda ayudarlos.',
            'Opcionalmente indicá tu país — solo personaliza el texto de la carta, no cambia ninguna recomendación.',
            'Leé el plan generado: diagnóstico de riesgo, camino de mejora, plan de distribución del respaldo, checklist de qué documentar (y qué no), un borrador de carta para tus herederos, y el aviso legal.',
            'Exportalo como texto plano, como PDF, o cifrado con contraseña si lo vas a guardar en un lugar menos controlado.',
            'Para recuperarlo después: pegá o cargá el archivo cifrado con su contraseña, sin necesidad de haber generado el plan en esa misma sesión.'
          ],
          security: [
            '<strong>Nunca pide ninguna clave de Bitcoin</strong>: no hay campo para una semilla, un WIF, ni un xpub. Es la herramienta de menor riesgo criptográfico del suite.',
            '<strong>Cero llamadas de red</strong>, impuesto por la CSP: no necesita saber nada de la red Bitcoin, solo de tu situación.',
            '<strong>Cero persistencia</strong>: lo que respondés vive en memoria y desaparece al cerrar la pestaña. Si querés conservarlo, exportalo vos.',
            'El <strong>cifrado AES-256-GCM</strong> del plan usa el mismo formato que Paper Wallet BTC y My Wallet BTC: un archivo cifrado por cualquiera de las tres se abre en cualquiera de las tres.',
            'El checklist es explícito sobre <strong>qué NO documentar</strong> — una semilla escrita junto a las instrucciones convierte el plan en el punto único de falla que intenta evitar.'
          ],
          limits: [
            'Da guía técnica y operativa, <strong>no asesoramiento legal, financiero ni impositivo</strong>. Las leyes de sucesión varían mucho según el país: para que un plan tenga validez legal consultá a un profesional matriculado en tu jurisdicción.',
            'No implementa nada on-chain: no arma direcciones ni timelocks. Para eso está la Bóveda de Herencia BTC.',
            'Un plan sirve solo si alguien lo va a encontrar. La herramienta te ayuda a escribirlo, no a guardarlo.'
          ]
        },
        en: {
          tagline: 'Turns a questionnaire about your current custody setup into a concrete backup and documentation plan for your heirs.',
          what: 'The most common way to lose bitcoin is not a hack: it is that whoever held it is gone and nobody else knows how to get in. This tool custodies nothing — it asks about your situation and returns a plan: what to improve, how to distribute the backup, what to document, and what to <em>never</em> document.',
          when: [
            'You hold bitcoin and nobody else would know how to access it if you were gone.',
            'You want to leave instructions without writing your seed on a paper anyone could read.',
            'You want to understand how fragile your current setup is before improving it.'
          ],
          steps: [
            'Answer the four-step questionnaire: your current custody, your physical backup, whether your heirs know the funds exist and would know how to access them, and whether you have someone technically trustworthy who could help them.',
            'Optionally give your country — it only personalizes the letter\'s wording, it changes no recommendation.',
            'Read the generated plan: risk diagnosis, recommended upgrade path, backup distribution plan, a checklist of what to document (and what not to), a draft letter for your heirs, and the legal disclaimer.',
            'Export it as plain text, as a PDF, or encrypted with a password if you will store it somewhere less controlled.',
            'To retrieve it later: paste or load the encrypted file with its password, with no need to have generated the plan in that same session.'
          ],
          security: [
            '<strong>It never asks for any Bitcoin key</strong>: no field for a seed, a WIF, or an xpub. It is the lowest cryptographic-risk tool in the suite.',
            '<strong>Zero network calls</strong>, enforced by the CSP: it needs to know nothing about the Bitcoin network, only about your situation.',
            '<strong>Zero persistence</strong>: your answers live in memory and vanish when you close the tab. If you want to keep it, you export it yourself.',
            'The plan\'s <strong>AES-256-GCM encryption</strong> uses the same format as Paper Wallet BTC and My Wallet BTC: a file encrypted by any of the three opens in any of the three.',
            'The checklist is explicit about <strong>what NOT to document</strong> — a seed written next to the instructions turns the plan into exactly the single point of failure it is meant to avoid.'
          ],
          limits: [
            'It gives technical and operational guidance, <strong>not legal, financial, or tax advice</strong>. Succession law varies enormously by country: for a plan to have real legal standing, consult a licensed professional in your jurisdiction.',
            'It implements nothing on-chain: it builds no addresses and no timelocks. That is what Inheritance Vault BTC is for.',
            'A plan only works if someone will find it. The tool helps you write it, not store it.'
          ]
        }
      }
    },

    {
      id: 'inheritance-vault-btc',
      glyph: '🔐',
      name: 'Bóveda de Herencia BTC',
      nameEn: 'Inheritance Vault BTC',
      path: './inheritance-vault-btc/index.html',
      repo: 'https://github.com/satsforge/inheritance-vault-btc',
      tags: ['airgap', 'nokeys'],
      badges: ['airgap', 'nokeys'],
      kicker: { es: 'Bóveda', en: 'Vault' },
      short: {
        es: 'Armá una dirección Taproot por heredero: vos podés gastarla cuando quieras, y cada heredero puede reclamar su parte recién después del timelock que le asignes.',
        en: 'Build one Taproot address per heir: you can spend it at any time, and each heir can claim their share only after the timelock you set for them.'
      },
      compare: {
        purpose: { es: 'Bóveda Taproot con timelock por heredero', en: 'Taproot vault with a per-heir timelock' },
        network: { es: 'Ninguna (air-gapped)', en: 'None (air-gapped)' },
        input: { es: 'xpub del owner + pubkey de cada heredero', en: 'Owner\'s xpub + each heir\'s pubkey' },
        output: { es: 'Direcciones Taproot + PSBTs sin firmar', en: 'Taproot addresses + unsigned PSBTs' }
      },
      doc: {
        es: {
          tagline: 'Herencia sin custodios ni oráculos: una dirección Taproot por heredero, donde el timelock hace el trabajo que haría un albacea.',
          what: 'Cada dirección tiene dos caminos de gasto. El <strong>owner</strong> puede gastar en cualquier momento por key-path, sin esperar nada. Cada <strong>heredero</strong> puede reclamar su parte por script-path, pero recién después de que pasen los bloques del timelock (CSV) que el owner le asignó. Si el owner sigue activo, mueve los fondos y el reloj se reinicia; si deja de estarlo, el heredero puede reclamar solo, sin que nadie tenga que avisar nada.',
          when: [
            'Querés que tus herederos puedan acceder sin darles hoy una clave que ya podrían usar.',
            'Querés repartir montos distintos entre herederos, con plazos distintos.',
            'Querés que el plan funcione sin depender de ningún servicio, empresa ni intermediario.'
          ],
          steps: [
            'Cargá tu <strong>xpub</strong> como owner. Nunca la clave privada.',
            'Cargá a cada heredero: su <strong>pubkey</strong> (que genera él, en su propia wallet, y solo te comparte la parte pública) y el timelock que le asignás.',
            'La herramienta deriva una dirección Taproot por heredero. Fondeá cada una con el monto que le corresponde a esa persona.',
            'Guardá la configuración: sin ella, ni vos ni tus herederos pueden reconstruir los scripts para gastar.',
            'Para gastar (owner, en cualquier momento; o heredero, pasado el timelock): ingresá el UTXO, la herramienta arma el PSBT sin firmar, y se firma en PSBT Signer BTC.'
          ],
          security: [
            '<strong>100% watch-only, siempre</strong>: el owner entrega su xpub, cada heredero solo su pubkey. Esta herramienta nunca ve, pide ni toca una clave privada.',
            '<strong>Nunca firma nada</strong>: solo arma direcciones y PSBTs sin firmar. Firmar sigue siendo trabajo exclusivo de PSBT Signer BTC, que ya está probado y es air-gapped.',
            '<strong>Cero red</strong>: <code>connect-src \'none\'</code>. La construcción de direcciones es matemática pública pura; el UTXO que fondeó una bóveda se ingresa a mano.',
            '<strong>Validado contra un nodo Bitcoin Core real en regtest</strong>, no solo contra su propio código: el owner gasta por key-path, un heredero es rechazado antes del timelock (<code>non-BIP68-final</code>) y aceptado después, con los PSBTs firmados por el código real de PSBT Signer BTC.',
            'Una <strong>plantilla de script fija y hecha a mano</strong> en vez de un compilador Miniscript general — menos superficie para un bug catastrófico que no se note hasta que sea tarde.'
          ],
          limits: [
            '<strong>Es la herramienta de mayor riesgo del suite.</strong> Usa un script Taproot no estándar: la mayoría de las wallets <strong>no van a reconocer</strong> los fondos enviados a esas direcciones. Solo se pueden gastar con un PSBT armado por esta misma herramienta.',
            'Probá primero con montos chicos en testnet o regtest antes de usar mainnet con fondos reales.',
            'Si perdés la configuración de la bóveda, perdés la capacidad de reconstruir los scripts — y con eso, el acceso por script-path. Guardala como guardarías la semilla.',
            'El timelock es en bloques, no en fechas: es aproximado respecto al tiempo de calendario.',
            'No reparte automáticamente: cada heredero reclama su propia dirección. No hay ningún oráculo que decida que "pasó algo".'
          ]
        },
        en: {
          tagline: 'Inheritance without custodians or oracles: one Taproot address per heir, where the timelock does the job an executor would.',
          what: 'Each address has two spending paths. The <strong>owner</strong> can spend at any time via the key-path, waiting for nothing. Each <strong>heir</strong> can claim their share via the script-path, but only after the timelock (CSV) blocks the owner assigned them have passed. If the owner is still active, they move the funds and the clock resets; if they are not, the heir can claim on their own, with nobody needing to be notified.',
          when: [
            'You want your heirs to be able to get in without handing them a key today that they could already use.',
            'You want to split different amounts between heirs, on different timelines.',
            'You want the plan to work without depending on any service, company, or intermediary.'
          ],
          steps: [
            'Enter your <strong>xpub</strong> as the owner. Never the private key.',
            'Add each heir: their <strong>pubkey</strong> (which they generate in their own wallet, sharing only the public part) and the timelock you assign them.',
            'The tool derives one Taproot address per heir. Fund each one with the amount meant for that person.',
            'Save the configuration: without it, neither you nor your heirs can rebuild the scripts needed to spend.',
            'To spend (owner, at any time; or heir, after the timelock): enter the UTXO, the tool builds the unsigned PSBT, and it gets signed in PSBT Signer BTC.'
          ],
          security: [
            '<strong>100% watch-only, always</strong>: the owner provides their xpub, each heir only their pubkey. This tool never sees, asks for, or touches a private key.',
            '<strong>It never signs anything</strong>: it only builds addresses and unsigned PSBTs. Signing remains the exclusive job of PSBT Signer BTC, which is already tested and air-gapped.',
            '<strong>Zero network</strong>: <code>connect-src \'none\'</code>. Building addresses is pure public math; the UTXO that funded a vault is entered by hand.',
            '<strong>Validated against a real Bitcoin Core regtest node</strong>, not just against its own code: the owner spends by key-path, an heir is rejected before the timelock (<code>non-BIP68-final</code>) and accepted after it, with both PSBTs signed by PSBT Signer BTC\'s real code.',
            'A <strong>fixed, hand-written script template</strong> instead of a general Miniscript compiler — less surface for a catastrophic bug that goes unnoticed until it is too late.'
          ],
          limits: [
            '<strong>This is the highest-risk tool in the suite.</strong> It uses a non-standard Taproot script: most wallets <strong>will not recognize</strong> funds sent to those addresses. They can only be spent with a PSBT built by this same tool.',
            'Try small amounts on testnet or regtest before using mainnet with real funds.',
            'If you lose the vault configuration, you lose the ability to rebuild the scripts — and with it, script-path access. Store it the way you would store a seed.',
            'The timelock is measured in blocks, not dates: it is approximate with respect to calendar time.',
            'It does not distribute automatically: each heir claims their own address. There is no oracle deciding that "something happened".'
          ]
        }
      }
    }
  ];

  // ------------------------------------------------------------------
  // Interface strings
  // ------------------------------------------------------------------

  var UI = {
    'nav.tools': { es: 'Herramientas', en: 'Tools' },
    'nav.docs': { es: 'Documentación', en: 'Docs' },
    'topbar.lang.toEnglish': { es: '🌐 English', en: '🌐 Español' },
    'topbar.theme.toLight': { es: '☀ Modo claro', en: '☀ Light mode' },
    'topbar.theme.toDark': { es: '🌙 Modo oscuro', en: '🌙 Dark mode' },

    'hero.title': { es: 'Herramientas de Bitcoin, 100% del lado del cliente', en: 'Bitcoin tools, 100% client-side' },
    'hero.subtitle': {
      es: 'Siete herramientas de código abierto que corren enteramente en tu navegador — nada de lo que generás, desbloqueás o firmás sale de la pestaña salvo lo que vos decidas transmitir a la red.',
      en: 'Seven open-source tools that run entirely in your browser — nothing you generate, unlock, or sign leaves the tab except what you choose to broadcast to the network.'
    },
    'hero.stat.tools': { es: 'herramientas', en: 'tools' },
    'hero.stat.backend': { es: 'backends', en: 'backends' },
    'hero.stat.storage': { es: 'cookies o storage', en: 'cookies or storage' },

    'flow.title': { es: '¿Por dónde empiezo?', en: 'Where do I start?' },
    'flow.sub': {
      es: 'El camino habitual de una wallet air-gapped, de punta a punta. Cada paso es una herramienta distinta, y ninguna necesita a las otras para funcionar.',
      en: 'The usual path of an air-gapped wallet, end to end. Each step is a different tool, and none of them needs the others to work.'
    },
    'flow.s1.t': { es: 'Generá la wallet, sin red', en: 'Generate the wallet, offline' },
    'flow.s1.d': { es: 'Paper Wallet BTC crea la semilla en una máquina desconectada y la imprime.', en: 'Paper Wallet BTC creates the seed on a disconnected machine and prints it.' },
    'flow.s2.t': { es: 'Mirá el saldo y armá el gasto', en: 'Check the balance and build the spend' },
    'flow.s2.d': { es: 'BTC Airgap Bridge (o My Wallet BTC en modo watch-only) consulta UTXOs y tarifas.', en: 'BTC Airgap Bridge (or My Wallet BTC in watch-only mode) queries UTXOs and fees.' },
    'flow.s3.t': { es: 'Firmá offline', en: 'Sign offline' },
    'flow.s3.d': { es: 'PSBT Signer BTC firma el PSBT en la máquina desconectada. La clave nunca toca internet.', en: 'PSBT Signer BTC signs the PSBT on the disconnected machine. The key never touches the internet.' },
    'flow.s4.t': { es: 'Transmitilo', en: 'Broadcast it' },
    'flow.s4.d': { es: 'BTC Airgap Bridge lo difunde a la red. Revisás destinos y montos antes de confirmar.', en: 'BTC Airgap Bridge sends it to the network. You review destinations and amounts before confirming.' },

    'tools.title': { es: 'Las herramientas', en: 'The tools' },
    'tools.sub': {
      es: 'Filtrá por lo que necesitás hacer. Cada tarjeta lleva a la herramienta, a su documentación, y a su código.',
      en: 'Filter by what you need to do. Each card links to the tool, its documentation, and its source.'
    },
    'filter.all': { es: 'Todas', en: 'All' },
    'filter.airgap': { es: 'Sin red (air-gapped)', en: 'Offline (air-gapped)' },
    'filter.online': { es: 'Con red', en: 'Networked' },
    'filter.nokeys': { es: 'Nunca ve claves privadas', en: 'Never sees private keys' },
    'filter.empty': { es: 'Ninguna herramienta coincide con ese filtro.', en: 'No tool matches that filter.' },

    'badge.airgap': { es: 'Sin red', en: 'Offline' },
    'badge.online': { es: 'Requiere red', en: 'Needs network' },
    'badge.nokeys': { es: 'Nunca ve claves privadas', en: 'Never sees private keys' },

    'card.useNow': { es: 'Usar ahora →', en: 'Use it now →' },
    'card.docs': { es: 'Documentación', en: 'Docs' },
    'card.source': { es: 'Código ↗', en: 'Source ↗' },

    'notice.title': { es: '⚠ Antes de confiarles fondos reales', en: '⚠ Before trusting them with real funds' },
    'notice.body': {
      es: 'Son proyectos de código abierto <strong>sin auditoría externa todavía</strong>. Cada uno explica su propio modelo de seguridad en su documentación — leelo antes de usarlo con Bitcoin real. Para generar una wallet nueva o firmar con PSBT Signer BTC, lo más seguro es descargar el código y abrirlo desconectado de internet. Para mover fondos, probá primero en <strong>testnet</strong> con monedas sin valor.',
      en: 'These are open-source projects <strong>not audited externally yet</strong>. Each explains its own security model in its documentation — read it before using it with real Bitcoin. To generate a new wallet or sign with PSBT Signer BTC, the safest thing is to download the code and open it disconnected from the internet. To move funds, try <strong>testnet</strong> with worthless coins first.'
    },

    'compare.title': { es: 'Comparación rápida', en: 'Quick comparison' },
    'compare.sub': { es: 'Las mismas cuatro preguntas para las siete herramientas.', en: 'The same four questions for all seven tools.' },
    'compare.tool': { es: 'Herramienta', en: 'Tool' },
    'compare.purpose': { es: 'Para qué sirve', en: 'What it\'s for' },
    'compare.network': { es: 'Red', en: 'Network' },
    'compare.input': { es: 'Entrada', en: 'Input' },
    'compare.output': { es: 'Salida', en: 'Output' },

    'docs.title': { es: 'Documentación', en: 'Documentation' },
    'docs.subtitle': {
      es: 'Qué hace cada herramienta, cuándo conviene usarla, cómo se usa paso a paso, qué garantiza su modelo de seguridad y qué <em>no</em> hace.',
      en: 'What each tool does, when to use it, how to use it step by step, what its security model guarantees, and what it does <em>not</em> do.'
    },
    'doc.what': { es: 'Qué es', en: 'What it is' },
    'doc.when': { es: 'Cuándo usarla', en: 'When to use it' },
    'doc.steps': { es: 'Cómo se usa', en: 'How to use it' },
    'doc.security': { es: 'Modelo de seguridad', en: 'Security model' },
    'doc.limits': { es: 'Limitaciones', en: 'Limitations' },
    'doc.open': { es: 'Abrir herramienta →', en: 'Open the tool →' },
    'doc.repo': { es: 'Código fuente ↗', en: 'Source code ↗' },
    'doc.unaudited': {
      es: '<strong>Sin auditoría externa.</strong> El modelo de seguridad de abajo describe lo que la herramienta hace, no una garantía verificada por un tercero. Leé el código antes de confiarle fondos reales, y probá primero en testnet.',
      en: '<strong>Not externally audited.</strong> The security model below describes what the tool does, not a guarantee verified by a third party. Read the code before trusting it with real funds, and try testnet first.'
    },

    'footer.note': {
      es: 'Todo el código es abierto y auditable en <a href="https://github.com/satsforge" target="_blank" rel="noopener noreferrer">github.com/satsforge</a>. Ninguna de las herramientas usa cookies, almacenamiento persistente, ni envía tu semilla o clave privada a ningún servidor.',
      en: 'All the code is open and auditable at <a href="https://github.com/satsforge" target="_blank" rel="noopener noreferrer">github.com/satsforge</a>. None of the tools use cookies, persistent storage, or send your seed or private key to any server.'
    }
  };

  // ------------------------------------------------------------------
  // State + helpers
  // ------------------------------------------------------------------

  var state = { lang: 'es', tab: 'herramientas', doc: TOOLS[0].id, filter: 'all' };

  function t(key) {
    var entry = UI[key];
    return entry ? (entry[state.lang] || entry.es) : key;
  }

  function toolName(tool) {
    return state.lang === 'en' && tool.nameEn ? tool.nameEn : tool.name;
  }

  function byId(id) {
    for (var i = 0; i < TOOLS.length; i++) if (TOOLS[i].id === id) return TOOLS[i];
    return null;
  }

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function list(tag, items) {
    var node = el(tag);
    for (var i = 0; i < items.length; i++) node.appendChild(el('li', null, items[i]));
    return node;
  }

  // ------------------------------------------------------------------
  // Rendering
  // ------------------------------------------------------------------

  function renderCards() {
    var wrap = document.getElementById('cards');
    wrap.innerHTML = '';
    var shown = 0;

    TOOLS.forEach(function (tool) {
      if (state.filter !== 'all' && tool.tags.indexOf(state.filter) === -1) return;
      shown++;

      var card = el('article', 'card');

      var head = el('div', 'card-head');
      head.appendChild(el('div', 'card-glyph', tool.glyph));
      var titles = el('div');
      titles.appendChild(el('div', 'kicker', tool.kicker[state.lang]));
      titles.appendChild(el('h3', null, toolName(tool)));
      head.appendChild(titles);
      card.appendChild(head);

      card.appendChild(el('p', null, tool.short[state.lang]));

      var badges = el('div', 'badges');
      tool.badges.forEach(function (b) {
        badges.appendChild(el('span', 'badge badge-' + b, t('badge.' + b)));
      });
      card.appendChild(badges);

      var row = el('div', 'btn-row');
      row.innerHTML =
        '<a class="btn btn-primary" href="' + tool.path + '">' + t('card.useNow') + '</a>' +
        '<a class="btn btn-secondary" href="#/docs/' + tool.id + '">' + t('card.docs') + '</a>' +
        '<a class="btn btn-secondary" href="' + tool.repo + '" target="_blank" rel="noopener noreferrer">' + t('card.source') + '</a>';
      card.appendChild(row);

      wrap.appendChild(card);
    });

    document.getElementById('cards-empty').hidden = shown > 0;
  }

  function renderCompare() {
    var table = document.getElementById('compare');
    var rows = ['purpose', 'network', 'input', 'output'];

    var html = '<thead><tr><th>' + t('compare.tool') + '</th>';
    rows.forEach(function (key) { html += '<th>' + t('compare.' + key) + '</th>'; });
    html += '</tr></thead><tbody>';

    TOOLS.forEach(function (tool) {
      html += '<tr><th scope="row">' + toolName(tool) + '</th>';
      rows.forEach(function (key) {
        // data-label carries the column header into the stacked mobile layout,
        // where the <thead> is hidden (see site.css).
        html += '<td data-label="' + t('compare.' + key) + '">' + tool.compare[key][state.lang] + '</td>';
      });
      html += '</tr>';
    });

    table.innerHTML = html + '</tbody>';
  }

  function renderDocsNav() {
    var nav = document.getElementById('docs-nav');
    nav.innerHTML = '';
    TOOLS.forEach(function (tool) {
      var btn = el('button', tool.id === state.doc ? 'is-active' : '');
      btn.type = 'button';
      btn.innerHTML = '<span aria-hidden="true">' + tool.glyph + '</span> ' + toolName(tool);
      btn.addEventListener('click', function () { go('#/docs/' + tool.id); });
      nav.appendChild(btn);
    });
  }

  function renderDoc() {
    var tool = byId(state.doc) || TOOLS[0];
    var doc = tool.doc[state.lang] || tool.doc.es;
    var body = document.getElementById('docs-body');
    body.innerHTML = '';

    var head = el('div', 'doc-head');
    head.appendChild(el('div', 'kicker', tool.kicker[state.lang]));
    head.appendChild(el('h2', null, toolName(tool)));
    head.appendChild(el('p', 'tagline', doc.tagline));
    var links = el('div', 'btn-row');
    links.innerHTML =
      '<a class="btn btn-primary" href="' + tool.path + '">' + t('doc.open') + '</a>' +
      '<a class="btn btn-secondary" href="' + tool.repo + '" target="_blank" rel="noopener noreferrer">' + t('doc.repo') + '</a>';
    head.appendChild(links);
    body.appendChild(head);

    body.appendChild(el('div', 'doc-warn', t('doc.unaudited')));

    function section(titleKey, content) {
      var sec = el('section', 'doc-section');
      sec.appendChild(el('h3', null, t(titleKey)));
      sec.appendChild(content);
      body.appendChild(sec);
    }

    section('doc.what', el('p', null, doc.what));
    section('doc.when', list('ul', doc.when));
    section('doc.steps', list('ol', doc.steps));
    section('doc.security', list('ul', doc.security));
    section('doc.limits', list('ul', doc.limits));
  }

  function applyTranslations() {
    document.documentElement.lang = state.lang;
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].innerHTML = t(nodes[i].dataset.i18n);
    }
    updateThemeLabel();
    renderCards();
    renderCompare();
    renderDocsNav();
    renderDoc();
  }

  function updateThemeLabel() {
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    document.getElementById('theme-toggle').textContent = t(isLight ? 'topbar.theme.toDark' : 'topbar.theme.toLight');
  }

  function showTab(tab) {
    state.tab = tab;
    var isDocs = tab === 'docs';
    document.getElementById('panel-tools').hidden = isDocs;
    document.getElementById('panel-docs').hidden = !isDocs;
    document.getElementById('tab-tools').setAttribute('aria-selected', String(!isDocs));
    document.getElementById('tab-docs').setAttribute('aria-selected', String(isDocs));
  }

  // ------------------------------------------------------------------
  // Routing - the docs pages are linkable, so a specific tool's docs can be
  // shared or bookmarked directly (#/docs/psbt-signer-btc).
  // ------------------------------------------------------------------

  function go(hash) {
    if (location.hash === hash) applyRoute();
    else location.hash = hash;
  }

  function applyRoute() {
    var parts = location.hash.replace(/^#\/?/, '').split('/');
    if (parts[0] === 'docs') {
      if (parts[1] && byId(parts[1])) state.doc = parts[1];
      showTab('docs');
      renderDocsNav();
      renderDoc();
      document.getElementById('panel-docs').focus();
    } else {
      showTab('herramientas');
    }
    window.scrollTo(0, 0);
  }

  // ------------------------------------------------------------------
  // Wiring
  // ------------------------------------------------------------------

  document.getElementById('lang-toggle').addEventListener('click', function () {
    state.lang = state.lang === 'es' ? 'en' : 'es';
    applyTranslations();
  });

  document.getElementById('theme-toggle').addEventListener('click', function () {
    var html = document.documentElement;
    html.setAttribute('data-theme', html.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
    updateThemeLabel();
  });

  var tabButtons = document.querySelectorAll('.tab');
  for (var i = 0; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener('click', function (ev) {
      go(ev.currentTarget.dataset.tab === 'docs' ? '#/docs/' + state.doc : '#/herramientas');
    });
  }

  var chips = document.querySelectorAll('.chip');
  for (var j = 0; j < chips.length; j++) {
    chips[j].addEventListener('click', function (ev) {
      state.filter = ev.currentTarget.dataset.filter;
      for (var k = 0; k < chips.length; k++) chips[k].classList.toggle('is-active', chips[k] === ev.currentTarget);
      renderCards();
    });
  }

  window.addEventListener('hashchange', applyRoute);

  // Follow the reader's own OS preference instead of forcing dark on everyone.
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  applyTranslations();
  applyRoute();
})();
