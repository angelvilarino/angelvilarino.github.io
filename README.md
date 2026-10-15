# Web personal de Ángel Vilariño García

Sitio estático (HTML + CSS + JS), sin dependencias ni proceso de compilación.

## Estructura
- `index.html`: estructura base y metadatos (título, vista previa al compartir).
- `style.css`: estilos, modo claro/oscuro y animaciones.
- `script.js`: lógica de la web (rutas, idioma, tema, interacciones).
- `content.js`: **todo el contenido** (textos ES/EN, proyectos, certificaciones, habilidades, enlaces).
- `404.html`: página de error personalizada (GitHub Pages la usa automáticamente).
- `assets/`: foto, CV (ES/EN), logos (`assets/logos/`), certificados, imagen de vista previa.

## Publicar en GitHub Pages
1. Crea en GitHub un repositorio **público** llamado exactamente `angelvilarino.github.io`.
2. Sube **el contenido** de esta carpeta a la raíz del repositorio (no la carpeta en sí).
3. En el repositorio: *Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)`* y guarda.
4. En 1-2 minutos estará en `https://angelvilarino.github.io/`.

Si usas otro nombre de repositorio o dominio, cambia la URL `https://angelvilarino.github.io/` en `index.html`
(`canonical`, `og:url`, `og:image`, `twitter:image`) y el enlace `href="/"` de `404.html`.

## Probar en local
Abre `index.html` en el navegador, o lanza un servidor: `python3 -m http.server` y visita `http://localhost:8000`.
