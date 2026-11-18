# v14 «Profundidad»

## Instalar (una vez)
1. Descomprime este zip **en la raíz del repositorio** (junto a `build.mjs`). Añade 3 archivos nuevos y no pisa ninguno tuyo.
2. `node aplicar.mjs`  → engancha los archivos nuevos en `build.mjs` (hace copia en `build.mjs.bak`; si lo ejecutas dos veces no pasa nada).
3. `npm run dev` para verlo, y `git add . && git commit -m "v14 profundidad" && git push` para publicar.

Archivos: `css/depth.css` (se concatena tras `style.css`), `js/gl.js` (shader), `js/depth.js` (todo lo demás).
Para volver atrás: borra esos 3 archivos y restaura `build.mjs.bak`.

## Qué hay
- **Arranque**: logo con destello, halo cónico, tagline y barra; salida con desenfoque; el escritorio entra en cascada (barra, iconos, widgets, dock, ventanas).
- **Fondo líquido (WebGL propio)**: sustituye al degradado CSS en «Malla», «Aurora» y «Atardecer». Sigue al cursor, ondas al pulsar, grano y viñeta.
  Calidad automática: móvil / ≤4 núcleos / ahorrar datos / batería <25 % → versión ligera (24 fps, menos octavas); animaciones apagadas o `prefers-reduced-motion` → un solo fotograma; pestaña oculta o escritorio fuera de pantalla → se pausa. Si WebGL falla, se ve el fondo CSS de siempre.
- **Vidrio**: brillo especular en el borde que sigue al cursor (ventanas, widgets, tarjetas, dock, barra), sombras por capas y ventana inactiva más plana, violeta sutil (`--a3`).
- **Ventanas**: genie al abrir (sale del icono pulsado) y minimizar (va a su botón del dock), inclinación 3D al arrastrar, snap a izquierda/derecha/maximizar con vista previa.
- **Dock**: apps fijas + ventanas abiertas con punto, magnificación, etiqueta y rebote al abrir.
- **Cierre**: el escritorio se encoge y se oscurece al hacer scroll; el nombre del pie son letras que reaccionan al cursor (en táctil, una ola lenta); focos de luz en las celdas.
- **Proyectos**: cabecera grande con parallax, índice fijo con secciones numeradas y progreso de lectura, bloques que aparecen al entrar, métricas con anillos, visor de imágenes nuevo (galería, rueda, doble clic, pellizco, deslizar, teclado).
- **Móvil/tablet**: pantalla de inicio tipo iOS (widgets arriba, cuadrícula de iconos con degradado, dock inferior), hojas que se cierran arrastrando, inclinación del fondo con el giroscopio (en iPhone/iPad hay un botón en la barra para dar el permiso).

## Notas
- **Sparklines**: solo aparecen si añades datos reales a una métrica en `content.js`, p. ej. `{ v: "0,65", count: {...}, spark: [0.9, 0.8, 0.7, 0.65], l: {...} }`. Sin `spark`, la métrica con porcentaje lleva anillo y el resto queda como número.
- **Transición tarjeta → proyecto**: la ventana nace del icono/tarjeta que pulsas (genie). No hay «vuelo» de la imagen de una a otra.
- Si prefieres otro fondo animado distinto de los tres con shader (Cuadrícula, Colinas, Partículas, Liso), siguen como antes.
