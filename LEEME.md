# Cómo funciona ahora la web

Tú editas **content.js**, **js/**, **css/** y **assets/**. GitHub construye y publica solo.

## Una sola vez
1. En GitHub: **Settings → Pages → Build and deployment → Source: "GitHub Actions"**.
2. Borra del repositorio los HTML que antes se generaban a mano (ahora se generan en cada build):
   `git rm -r index.html en gl proyectos sitemap.xml 404.html`
3. Haz commit y push. En la pestaña **Actions** verás "Construir y publicar en GitHub Pages". Tarda ~1 minuto.
   Si el primer push falló porque aún no habías cambiado el ajuste de Pages (paso 1), cámbialo y pulsa **Run workflow**.

## Cada vez que cambies algo
`git add . && git commit -m "..." && git push`. Nada más.

## Probar en local (opcional; necesita Node 20+ de nodejs.org)
```
npm install      # solo la primera vez
npm run dev      # http://localhost:8123 (se reconstruye al guardar)
```

## Fechas que se gestionan en content.js
- `SITE.updated` (AAAA-MM-DD): fecha de última actualización; sale como `<lastmod>` del sitemap para la home y el CV.
  Cámbiala cuando publiques cambios de contenido. Si la borras, el sitemap no lleva `<lastmod>`.
- `updated` en un proyecto (opcional): `<lastmod>` de esa página de proyecto.
- `from` / `to` en una formación: la etiqueta "Próximamente" / "En curso" se calcula sola según la fecha de hoy
  (en la web, al abrirla; en `/cv/`, cada vez que se construye).

## Imágenes
El build lee el tamaño real de los PNG, JPG y SVG de `assets/` (menos logos, certificados y pdf.js) y añade
`width` y `height` a cada `<img>`, para que la página no se mueva al cargar. No hay que hacer nada.

## CV en PDF
Los PDF de `assets/` se mantienen a mano. Al cambiar `content.js`, revisa también:
nombre del proyecto (PedalIA), tecnologías (XGBoost), formación y fechas, y que no incluyan datos personales
que no quieras publicar (teléfono, dirección, fecha de nacimiento).

## Estadísticas de visitas (opcional)
1. Crea una cuenta gratuita en https://www.goatcounter.com y elige un código (p. ej. `angelvilarino`).
2. En `content.js`, dentro de `SITE`, pon `analytics: { goatcounter: "angelvilarino" }`.
3. Push. Sin cookies, no hace falta aviso. Registra visitas, descargas de CV, visitas al CV online,
   copias de correo y clics salientes.

## Qué hace el build
- Minifica JS y CSS en archivos con huella (`app.xxxx.js`): nunca se mezcla HTML nuevo con JS viejo.
- Aloja las fuentes en tu web (sin Google Fonts).
- Genera las páginas de cada idioma, proyecto y CV (`/cv/`, `/en/cv/`, `/gl/cv/`), el sitemap y el 404.
- Crea el service worker (caché y modo offline; las páginas siempre se piden primero a la red).
