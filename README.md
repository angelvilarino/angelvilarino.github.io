# angelvilarino.github.io · Portfolio de Ángel Vilariño García

Portfolio personal con forma de escritorio de sistema operativo: iconos, ventanas arrastrables, dock, Launchpad y widgets.
Está en tres idiomas (español, inglés y gallego), se publica solo en GitHub Pages y no usa ningún framework.

Web: https://angelvilarino.github.io

## Qué incluye

**Escritorio (apps = ventanas)**
- **Proyectos**: tarjetas y una página de detalle por proyecto (TFG sobre detección temprana del TEA y PedalIA para BiciCoruña), con pestañas, acordeones, métricas animadas, figuras ampliables y enlaces a demo, memoria y repositorio.
- **Habilidades**: filtros por categoría, logos de cada tecnología, habilidades personales e idiomas.
- **Trayectoria**: experiencia y formación en línea de tiempo, con etiqueta automática "Próximamente / En curso" según las fechas.
- **Logros**: nota media, matrículas de honor (con el desglose por asignatura) y nota del TFG.
- **Certificaciones**: miniaturas generadas desde cada PDF, agrupadas por temas, con "ver todos".
- **Sobre mí** (con vida personal), **Contacto** (tarjetas con correo, LinkedIn, GitHub, CV y ubicación), **Ajustes**, **Inicio** y una **Papelera** de adorno.
- Dock con las ventanas abiertas, Launchpad (Ctrl/⌘ + K), cambio entre ventanas (Alt + .) y estado de las ventanas recordado al volver.

**Widgets**: foto de perfil, CV (descarga del PDF o CV online), reloj, tiempo en A Coruña, música ambiente (solo al pulsar Play) y último repositorio de GitHub.

**Ajustes**: tema claro/oscuro, 7 fondos (incluido uno de partículas), idioma, animaciones, widgets y sonidos.

**Otras páginas**
- `/cv/`, `/en/cv/`, `/gl/cv/`: CV online imprimible (A4) con botón de guardar PDF.
- Una URL real por proyecto: `/proyectos/<id>/`, `/en/projects/<id>/`, `/gl/proxectos/<id>/`.
- `404.html`, `sitemap.xml` y `robots.txt`.

## Stack

| Capa | Tecnología |
|---|---|
| Interfaz | HTML5, CSS3 (variables, `color-mix`, grid/flex) y JavaScript puro (sin frameworks ni librerías de UI) |
| Build | Node.js ≥ 20 + esbuild (minifica JS y CSS con huella en el nombre) y un script propio, `build.mjs` |
| Tipografías | Space Grotesk y JetBrains Mono, alojadas en la propia web (Fontsource, solo subconjuntos latin) |
| Miniaturas de certificados | pdf.js incluido en `assets/vendor/pdfjs` (se carga solo al abrir Certificaciones) |
| Datos externos | Open-Meteo (tiempo) y API de GitHub (último repositorio); si fallan, el widget no se muestra |
| Estadísticas | GoatCounter, opcional y sin cookies |
| Despliegue | GitHub Actions → GitHub Pages |
| Offline | Service worker (páginas red-primero; archivos con huella desde caché) |

## Estructura

```
content.js        Todo el contenido: textos, proyectos, formación, certificados, habilidades (es/en/gl)
build.mjs         Genera dist/: páginas por idioma, proyectos, CV, sitemap, 404, service worker
js/
  core.js         Configuración y utilidades
  i18n.js         Textos de la interfaz, rutas por idioma, iconos
  theme.js        Tema, fondo y ajustes
  views.js        Contenido de cada ventana
  windows.js      Ventanas, router y pintado de la interfaz
  nav.js          Barra, Launchpad, selector de idioma, atajos, eventos de uso
  widgets.js      Reloj, tiempo, música y GitHub
  fx.js           Efectos, pestañas y visor de imágenes
  main.js         Arranque
css/style.css     Estilos (tokens de color, escritorio, ventanas, responsive)
assets/           Imágenes, logos, certificados (PDF), CV (PDF), pdf.js
.github/workflows/deploy.yml   Construye y publica en cada push
```

## Cómo trabajar con la web

```
npm install      # solo la primera vez
npm run dev      # http://localhost:8123, se reconstruye al guardar
npm run build    # genera dist/
```

Para publicar: `git add . && git commit -m "..." && git push`. El workflow construye y despliega en Pages
(en **Settings → Pages → Source** debe estar "GitHub Actions").

### Dónde se edita cada cosa
- **Textos, proyectos, certificados, habilidades**: `content.js`. Todo texto traducible es `{ es, en, gl }`; si falta un idioma se muestra el español.
- **Un certificado nuevo**: añade `{ title, meta, logo, file }` en el grupo que toque de `CERT_GROUPS` y copia el PDF a `assets/certs/`.
- **Fechas**: `SITE.updated` (AAAA-MM-DD) es el `<lastmod>` del sitemap para la home y el CV; `updated` en un proyecto es el de esa página.
  `from` / `to` en una formación calculan solos "Próximamente" / "En curso".
- **Textos de la interfaz**: `T` en `js/i18n.js` (menús, botones) y `UI` en `content.js` (secciones y etiquetas).
- **Colores y tamaños**: variables al principio de `css/style.css`.
- **Estadísticas**: crea una cuenta en goatcounter.com y pon el código en `SITE.analytics.goatcounter`.
- **CV en PDF**: se mantienen a mano en `assets/`. Al cambiar el contenido, revísalos y comprueba que no incluyan datos personales que no quieras publicar.

## Qué hace el build
- Minifica JS y CSS con huella (`app.xxxx.js`), así nunca se mezcla HTML nuevo con JS viejo.
- Mide las imágenes de `assets/` y añade `width` y `height` a cada `<img>` para evitar saltos al cargar.
- Genera una página por idioma, por proyecto y para el CV, con `canonical`, `hreflang`, Open Graph, Twitter Card y datos estructurados (JSON-LD).
- Incluye el contenido como HTML estático (visible sin JavaScript y para buscadores) y lo sustituye por la interfaz al arrancar.

## Accesibilidad, rendimiento y privacidad
- Navegación completa con teclado: menú de idioma, pestañas, Launchpad con foco atrapado, Esc cierra la ventana activa; respeta `prefers-reduced-motion`.
- En móvil y tablet las ventanas pasan a hojas inferiores a pantalla casi completa.
- Acento y textos con contraste AA sobre el fondo claro; tema oscuro por defecto según el sistema.
- Sin cookies. En el navegador solo se guardan preferencias y el estado de las ventanas (`localStorage`). Las llamadas a Open-Meteo y a la API de GitHub envían la IP del visitante a esos servicios.
