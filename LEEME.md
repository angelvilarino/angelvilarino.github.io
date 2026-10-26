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

## Estadísticas de visitas (opcional)
1. Crea una cuenta gratuita en https://www.goatcounter.com y elige un código (p. ej. `angelvilarino`).
2. En `content.js`, dentro de `SITE`, pon `analytics: { goatcounter: "angelvilarino" }`.
3. Push. Sin cookies, no hace falta aviso. Registra visitas, descargas de CV, copias de correo y clics salientes.

## Qué hace el build
- Minifica JS y CSS en archivos con huella (`app.xxxx.js`): nunca se mezcla HTML nuevo con JS viejo.
- Aloja las fuentes en tu web (sin Google Fonts).
- Genera las páginas de cada idioma, proyecto y CV (`/cv/`, `/en/cv/`, `/gl/cv/`), el sitemap y el 404.
- Crea el service worker (caché y modo offline; las páginas siempre se piden primero a la red).
