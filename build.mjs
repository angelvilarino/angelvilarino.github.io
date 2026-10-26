#!/usr/bin/env node
/* =====================================================================
   build.mjs · construye la web en la carpeta dist/

     npm install        (una sola vez)
     npm run build      genera dist/
     npm run dev        genera dist/, la sirve en http://localhost:8123 y
                        se reconstruye sola al guardar content.js, js/ o css/

   En GitHub, el workflow .github/workflows/deploy.yml hace esto mismo
   y publica dist/ en GitHub Pages cada vez que haces push.

   Genera: index.html, en/, gl/ · proyectos/<id>/ (y en/projects, gl/proxectos)
           cv/ (y en/cv, gl/cv) · sitemap.xml · 404.html · sw.js
           app.<huella>.js · style.<huella>.css · fonts.<huella>.css
   ===================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import http from 'node:http';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, 'dist');
const ORIGIN = 'https://angelvilarino.github.io';
const LANGS = ['es', 'en', 'gl'];
const BUILD_DATE = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10);
const JS_FILES = ['content.js', 'js/core.js', 'js/i18n.js', 'js/theme.js', 'js/views.js', 'js/windows.js', 'js/nav.js', 'js/widgets.js', 'js/fx.js', 'js/main.js'];
const FONTS = [['space-grotesk', [500, 700]], ['jetbrains-mono', [400, 500]]];
const PRELOAD_FONTS = ['space-grotesk-latin-500-normal.woff2', 'space-grotesk-latin-700-normal.woff2', 'jetbrains-mono-latin-400-normal.woff2'];

let esbuild;
try { esbuild = await import('esbuild'); } catch { console.error('\nFalta instalar las dependencias. Ejecuta primero:  npm install\n'); process.exit(1); }

/* ---------- Utilidades ---------- */
const hash = s => crypto.createHash('sha1').update(s).digest('hex').slice(0, 8);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const eT = s => String(s).replace(/&(?!amp;|lt;|gt;|quot;)/g, '&amp;').replace(/</g, '&lt;');   // texto plano -> HTML
const clip = (s, n) => { s = String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); if (s.length <= n) return s; const c = s.slice(0, n - 1); return c.slice(0, c.lastIndexOf(' ')) + '…'; };
const urlOf = rel => ORIGIN + rel;
const outDir = rel => rel.replace(/^\//, '');
function write(rel, txt) { const f = path.join(DIST, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, txt); return rel; }
function copyDir(src, dst) {
  if (!fs.existsSync(src)) return false;
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    if (e.name === '.DS_Store') continue;
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    e.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
  return true;
}

/* ---------- Metadatos por idioma (los de la home son los que ya tenías) ---------- */
const HOME = {
  es: { locale: 'es_ES', alt: 'en_US', title: 'Ángel Vilariño García | Data Scientist & Data Engineer', job: 'Científico e Ingeniero de Datos',
    desc: 'Portfolio de Ángel Vilariño García: graduado en Ciencia e Ingeniería de Datos. Data science, data engineering, machine learning e IA generativa.',
    ogDesc: 'Graduado en Ciencia e Ingeniería de Datos. Data engineering, machine learning e IA generativa.', ogAlt: 'Ángel Vilariño García, Científico e Ingeniero de Datos', og: 'assets/og-image-es.png', cv: 'Currículum' },
  en: { locale: 'en_US', alt: 'es_ES', title: 'Ángel Vilariño García | Data Scientist & Data Engineer', job: 'Data Scientist & Data Engineer',
    desc: 'Portfolio of Ángel Vilariño García: Data Science and Engineering graduate. Data science, data engineering, machine learning and generative AI.',
    ogDesc: 'Data Science and Engineering graduate. Data engineering, machine learning and generative AI.', ogAlt: 'Ángel Vilariño García, Data Scientist & Data Engineer', og: 'assets/og-image-en.png', cv: 'Résumé' },
  gl: { locale: 'gl_ES', alt: 'es_ES', title: 'Ángel Vilariño García | Científico e Enxeñeiro de Datos', job: 'Científico e Enxeñeiro de Datos',
    desc: 'Portfolio de Ángel Vilariño García: graduado en Ciencia e Enxeñaría de Datos. Ciencia de datos, enxeñaría de datos, machine learning e IA xenerativa.',
    ogDesc: 'Graduado en Ciencia e Enxeñaría de Datos. Enxeñaría de datos, machine learning e IA xenerativa.', ogAlt: 'Ángel Vilariño García, Científico e Enxeñeiro de Datos', og: 'assets/og-image-gl.png', cv: 'Currículo' }
};
const H1_HOME = 'Ángel Vilariño García · Data Scientist & Data Engineer';

/* ======================================================================
   CONSTRUCCIÓN
   ====================================================================== */
async function build() {
  const t0 = Date.now(), made = [];
  fs.rmSync(DIST, { recursive: true, force: true }); fs.mkdirSync(DIST, { recursive: true });

  /* ---- contenido (content.js + i18n.js) en un contexto aislado ---- */
  const ctx = vm.createContext({ matchMedia: () => ({ matches: false }), addEventListener() {}, localStorage: { getItem: () => null, setItem() {} },
    navigator: { language: 'es' }, location: { pathname: '/', hash: '' }, document: {}, console });
  for (const f of ['content.js', 'js/core.js', 'js/i18n.js']) vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
  const D = vm.runInContext('({ SITE, ABOUT, EXPERIENCE, EDUCATION, RECOGNITIONS, PROJECTS, SKILLS, CERT_GROUPS, LANGUAGES, SOFT_SKILLS, tx, txa, U, t, dt, projUrl, LBASE })', ctx);
  const { SITE, ABOUT, EXPERIENCE, EDUCATION, RECOGNITIONS, PROJECTS, SKILLS, CERT_GROUPS, LANGUAGES, SOFT_SKILLS, tx, txa, U, t, dt, projUrl, LBASE } = D;
  const setLang = l => vm.runInContext(`lang = ${JSON.stringify(l)}`, ctx);

  /* ---- recursos estáticos ---- */
  if (!copyDir(path.join(ROOT, 'assets'), path.join(DIST, 'assets'))) console.warn('  ⚠ No existe la carpeta assets/ junto a build.mjs');
  if (fs.existsSync(path.join(ROOT, 'robots.txt'))) fs.copyFileSync(path.join(ROOT, 'robots.txt'), path.join(DIST, 'robots.txt'));

  /* ---- fuentes alojadas (Fontsource): solo subconjuntos latin y latin-ext, woff2 ---- */
  let fontCss = '';
  const fdir = path.join(DIST, 'assets', 'fonts'); fs.mkdirSync(fdir, { recursive: true });
  for (const [pkg, weights] of FONTS) {
    const base = path.join(ROOT, 'node_modules', '@fontsource', pkg);
    if (!fs.existsSync(base)) { console.error('Falta @fontsource/' + pkg + '. Ejecuta:  npm install'); process.exit(1); }
    for (const w of weights) for (const m of fs.readFileSync(path.join(base, `${w}.css`), 'utf8').match(/@font-face\s*\{[^}]*\}/g) || []) {
      const file = (m.match(/url\(\.\/files\/([^)]+?\.woff2)\)/) || [])[1];
      if (!file || !/-latin(-ext)?-\d+-normal\.woff2$/.test(file)) continue;
      fs.copyFileSync(path.join(base, 'files', file), path.join(fdir, file));
      fontCss += m.replace(/src:[^;]+;/, `src: url(assets/fonts/${file}) format('woff2');`) + '\n';
    }
  }
  fontCss = esbuild.transformSync(fontCss, { loader: 'css', minify: true }).code;
  const FONTS_CSS = `fonts.${hash(fontCss)}.css`; write(FONTS_CSS, fontCss);

  /* ---- JS y CSS minificados con huella en el nombre ---- */
  const jsSrc = JS_FILES.map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n');
  const jsMin = esbuild.transformSync(jsSrc, { minify: true, target: 'es2019', legalComments: 'none' }).code;
  const APP_JS = `app.${hash(jsMin)}.js`; write(APP_JS, jsMin);
  const cssMin = esbuild.transformSync(fs.readFileSync(path.join(ROOT, 'css/style.css'), 'utf8'), { loader: 'css', minify: true }).code;
  const STYLE_CSS = `style.${hash(cssMin)}.css`; write(STYLE_CSS, cssMin);

  /* ---- service worker ---- */
  const VERSION = hash(APP_JS + STYLE_CSS + FONTS_CSS);
  const precache = ['/', '/' + APP_JS, '/' + STYLE_CSS, '/' + FONTS_CSS, ...PRELOAD_FONTS.map(f => '/assets/fonts/' + f)];
  write('sw.js', swSource(VERSION, precache));

  /* ---- estadísticas (opcional) ---- */
  const gc = SITE.analytics && SITE.analytics.goatcounter ? String(SITE.analytics.goatcounter).trim() : '';
  const analytics = gc ? `<script data-goatcounter="https://${gc}.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>` : '';
  const A = { APP_JS, STYLE_CSS, FONTS_CSS, analytics };

  /* ---- funciones que usan los datos de este build ---- */
  const a = (href, label) => `<a href="${esc(href)}">${label}</a>`;
  const cvUrl = l => LBASE[l] + 'cv/';
  function blocks(bs) {
    return bs.map(b => {
      switch (b.type) {
        case 'h': return `<h2>${tx(b.t)}</h2>`;
        case 'h3': return `<h3>${tx(b.t)}</h3>`;
        case 'p': return `<p>${tx(b.t)}</p>`;
        case 'note': return `<p><small>${tx(b.t)}</small></p>`;
        case 'tiles': return `<ul>${b.items.map(x => `<li><strong>${tx(x.t)}</strong>: ${tx(x.d)}</li>`).join('')}</ul>`;
        case 'tabs': return b.items.map(x => `<h3>${tx(x.t)}</h3><p>${tx(x.d)}</p>${x.img ? `<img src="${esc(x.img)}" alt="${esc(tx(x.alt))}" loading="lazy">` : ''}`).join('');
        case 'accordion': return `<dl>${b.items.map(x => `<dt>${tx(x.t)}</dt><dd>${tx(x.d)}</dd>`).join('')}</dl>`;
        case 'chipgroups': return b.items.map(g => `<h3>${tx(g.t)}</h3><ul>${txa(g.chips).map(c => `<li>${c}</li>`).join('')}</ul>`).join('');
        case 'tech': return `<ul>${b.items.map(i => `<li>${eT(tx(i.n))}</li>`).join('')}</ul>`;
        case 'people': return `<ul>${b.items.map(x => `<li><a href="${esc(x.url)}">${eT(x.name)}</a> (${eT(tx(x.role))}): ${tx(x.bio)}</li>`).join('')}</ul>`;
        case 'kpis': return `<ul>${b.items.map(x => `<li><strong>${eT(tx(x.v))}</strong> ${tx(x.l)}</li>`).join('')}</ul>`;
        case 'fig': return `<figure><img src="${esc(tx(b.src))}" alt="${esc(tx(b.alt))}" loading="lazy"><figcaption>${tx(b.caption)}</figcaption></figure>`;
        default: return '';
      }
    }).join('\n');
  }
  function homeSeo(l) {
    const L = U(), cvf = SITE.cv[l] || SITE.cv.es, r = RECOGNITIONS;
    return [
      `<h2>${L.s_about}</h2>`, `<p>${tx(ABOUT.short)}</p>`, ...txa(ABOUT.long).map(x => `<p>${x}</p>`),
      `<h2>${L.s_projects}</h2>`,
      `<ul>${PROJECTS.map(p => `<li>${a(projUrl(l, p.id), eT(tx(p.title)))}: ${eT(tx(p.short))}</li>`).join('')}</ul>`,
      `<h2>${L.a_exp}</h2>`,
      `<ul>${EXPERIENCE.map(e => `<li><strong>${eT(tx(e.org))}</strong>, ${eT(tx(e.role))} (${dt(e.dates)}${e.place ? ', ' + eT(tx(e.place)) : ''})<ul>${txa(e.bullets).map(b => `<li>${b}</li>`).join('')}</ul></li>`).join('')}</ul>`,
      `<h2>${L.a_edu}</h2>`,
      `<ul>${EDUCATION.map(e => `<li><strong>${eT(tx(e.org))}</strong>, ${eT(tx(e.title))} (${dt(e.dates)}${e.place ? ', ' + eT(tx(e.place)) : ''})${e.detail ? ': ' + eT(tx(e.detail)) : ''}</li>`).join('')}</ul>`,
      `<h2>${L.s_recog}</h2>`,
      `<ul><li>${L.r_avg}: ${eT(tx(r.avg))}</li><li>${L.r_honors}: ${r.honors}</li><li>${L.r_tfg}: ${r.tfg}</li><li>${L.r_abau}</li></ul>`,
      `<h2>${L.s_skills}</h2>`,
      SKILLS.map(g => `<h3>${eT(tx(g.title))}</h3><p>${g.items.map(i => eT(tx(i.n))).join(', ')}</p>`).join(''),
      `<h2>${L.a_cert}</h2>`,
      CERT_GROUPS.map(g => `<h3>${eT(tx(g.title))}</h3><ul>${g.items.map(c => `<li>${eT(tx(c.title))}${c.meta ? ': ' + eT(tx(c.meta)) : ''}</li>`).join('')}</ul>`).join(''),
      `<h2>${L.s_contact}</h2>`,
      `<ul><li>${a('mailto:' + SITE.email, SITE.email)}</li><li>${a('tel:' + SITE.phoneLink, SITE.phone)}</li><li>${a(SITE.linkedin, 'LinkedIn')}</li><li>${a(SITE.github, 'GitHub')}</li><li>${a(cvf, L.c_cv)}</li><li>${a(cvUrl(l), t('cvonline'))}</li></ul>`
    ].join('\n');
  }
  function projectSeo(l, p) {
    const L = U(), links = ['demo', 'memoria', 'repo', 'web'].filter(k => p.links[k] && tx(p.links[k]) !== '#').map(k => `<li>${a(tx(p.links[k]), L['l_' + k])}</li>`).join('');
    return [
      `<p>${a(LBASE[l], SITE.name)} · ${eT(tx(p.date))}${p.by ? ' · ' + eT(tx(p.by)) : ''}</p>`,
      `<img src="${esc(tx(p.image))}" alt="${esc(tx(p.title))}">`, `<p>${eT(tx(p.short))}</p>`, links ? `<ul>${links}</ul>` : '', blocks(p.blocks || [])
    ].join('\n');
  }
  /* Página /cv/ imprimible */
  function cvPage(l, M, alternates) {
    const L = U(), canonical = urlOf(cvUrl(l)), cvf = '/' + (SITE.cv[l] || SITE.cv.es), r = RECOGNITIONS;
    const title = `${M.cv} · ${SITE.name} | ${M.job}`, desc = clip(tx(ABOUT.short), 160);
    const sec = (h, body) => `<section><h2>${h}</h2>${body}</section>`;
    const item = (head, when, sub, body) => `<article><h3><span>${head}</span>${when ? `<span class="when">${eT(when)}</span>` : ''}</h3>${sub ? `<p class="sub">${sub}</p>` : ''}${body || ''}</article>`;
    const html = [
      sec(L.s_about, `<p>${tx(ABOUT.short)}</p>`),
      sec(L.a_exp, EXPERIENCE.map(e => item(eT(tx(e.org)), dt(e.dates), eT(tx(e.role)) + (e.place ? ' · ' + eT(tx(e.place)) : ''), `<ul>${txa(e.bullets).map(b => `<li>${b}</li>`).join('')}</ul>`)).join('')),
      sec(L.a_edu, EDUCATION.map(e => item(eT(tx(e.org)), dt(e.dates) + (e.upcoming ? ' · ' + tx(e.upcoming) : ''), eT(tx(e.title)) + (e.place ? ' · ' + eT(tx(e.place)) : ''), e.detail ? `<p>${eT(tx(e.detail))}</p>` : '')).join('')),
      sec(L.s_projects, PROJECTS.map(p => item(eT(tx(p.title)), tx(p.date), '', `<p>${eT(tx(p.short))}</p><p class="lk">${a(projUrl(l, p.id), eT(urlOf(projUrl(l, p.id)).replace('https://', '')))}${p.links.repo ? ' · ' + a(tx(p.links.repo), 'GitHub') : ''}${p.links.demo ? ' · ' + a(tx(p.links.demo), L.l_demo) : ''}</p>`)).join('')),
      sec(L.s_skills, `<dl>${SKILLS.map(g => `<dt>${eT(tx(g.title))}</dt><dd>${g.items.map(i => eT(tx(i.n))).join(' · ')}</dd>`).join('')}</dl>`),
      sec(L.a_cert, `<dl>${CERT_GROUPS.map(g => `<dt>${eT(tx(g.title))}</dt><dd>${g.items.map(c => eT(tx(c.title))).join(' · ')}</dd>`).join('')}</dl>`),
      sec(L.s_recog, `<ul><li>${L.r_avg}: <strong>${eT(tx(r.avg))}</strong></li><li>${L.r_honors}: <strong>${r.honors}</strong></li><li>${L.r_tfg}: <strong>${r.tfg}</strong></li><li>${L.r_abau}</li></ul>`),
      sec(L.languages, `<ul>${LANGUAGES.map(x => `<li>${eT(tx(x.n))}: ${eT(tx(x.level))}</li>`).join('')}</ul>`),
      sec(L.soft, `<p>${txa(SOFT_SKILLS).map(eT).join(' · ')}</p>`)
    ].join('\n');
    return `<!DOCTYPE html>
<html lang="${l}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="author" content="${SITE.name}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="profile"><meta property="og:site_name" content="${SITE.name}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${urlOf('/' + M.og)}"><meta property="og:locale" content="${M.locale}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${urlOf('/' + M.og)}">
${alternates}
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'ProfilePage', inLanguage: l, url: canonical, mainEntity: { '@type': 'Person', name: SITE.name, jobTitle: M.job, email: SITE.email, url: urlOf(LBASE[l]), sameAs: [SITE.github, SITE.linkedin] } })}</script>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23d6381c'/%3E%3Ctext x='32' y='42' font-family='sans-serif' font-size='28' font-weight='700' text-anchor='middle' fill='white'%3EAV%3C/text%3E%3C/svg%3E">
<link rel="preload" href="/assets/fonts/${PRELOAD_FONTS[0]}" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/${PRELOAD_FONTS[2]}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/${FONTS_CSS}">
<style>${CV_CSS}</style>
${analytics}
</head>
<body>
<nav class="top noprint" aria-label="${esc(M.cv)}">
  <a href="${LBASE[l]}">← ${t('cvsite')}</a>
  <span class="langs">${LANGS.map(x => `<a href="${cvUrl(x)}" hreflang="${x}" lang="${x}"${x === l ? ' aria-current="page"' : ''}>${x.toUpperCase()}</a>`).join('')}</span>
  <span class="acts"><a class="btn" href="${esc(cvf)}" download>${L.c_cv}</a><button class="btn fill" type="button" onclick="print()">${t('cvprint')}</button></span>
</nav>
<main class="paper">
  <header>
    <h1>${SITE.name}</h1>
    <p class="role">${eT(M.job)}</p>
    <ul class="contact">
      <li>${a('mailto:' + SITE.email, SITE.email)}</li><li>${a('tel:' + SITE.phoneLink, SITE.phone)}</li><li>${eT(L.tile_where)}</li>
      <li>${a(SITE.linkedin, 'LinkedIn')}</li><li>${a(SITE.github, 'GitHub')}</li>
    </ul>
  </header>
${html}
</main>
</body>
</html>
`;
  }

  /* ---- páginas ---- */
  const alts = hrefs => [...LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${urlOf(hrefs[l])}">`), `<link rel="alternate" hreflang="x-default" href="${urlOf(hrefs.es)}">`].join('');
  const CV_HREFS = Object.fromEntries(LANGS.map(l => [l, cvUrl(l)]));
  for (const l of LANGS) {
    setLang(l);
    const M = HOME[l], canonical = urlOf(LBASE[l]);
    made.push(write(outDir(LBASE[l]) + 'index.html', page(A, {
      l, M, title: M.title, desc: M.desc, canonical, ogImage: urlOf('/' + M.og), ogAlt: M.ogAlt, ogDesc: M.ogDesc, h1: H1_HOME,
      seo: homeSeo(l), alternates: alts(LBASE), SITE,
      jsonld: { '@context': 'https://schema.org', '@type': 'Person', name: SITE.name, jobTitle: M.job, url: canonical, image: urlOf('/' + SITE.photo), inLanguage: l,
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidade da Coruña' }, address: { '@type': 'PostalAddress', addressLocality: 'A Coruña', addressCountry: 'ES' },
        knowsAbout: ['Data Science', 'Data Engineering', 'Machine Learning', 'Generative AI'], sameAs: [SITE.github, SITE.linkedin] }
    })));
    for (const p of PROJECTS) {
      const url = projUrl(l, p.id), title = tx(p.title), pHref = Object.fromEntries(LANGS.map(x => [x, projUrl(x, p.id)]));
      const img = urlOf('/' + tx(p.image));
      made.push(write(outDir(url) + 'index.html', page(A, {
        l, M, title: `${title} | ${SITE.name}`, desc: clip(tx(p.short), 160), canonical: urlOf(url), ogImage: img, ogAlt: title, ogType: 'article', ogSize: false,
        h1: `${title} · ${SITE.name}`, seo: projectSeo(l, p), alternates: alts(pHref), SITE,
        jsonld: { '@context': 'https://schema.org', '@type': 'TechArticle', headline: title, description: tx(p.short), image: img, inLanguage: l, url: urlOf(url), mainEntityOfPage: urlOf(url),
          author: { '@type': 'Person', name: SITE.name, url: urlOf('/') } }
      })));
    }
    made.push(write(outDir(cvUrl(l)) + 'index.html', cvPage(l, M, alts(CV_HREFS))));
  }

  /* ---- sitemap y 404 ---- */
  const entry = (hrefs, l) => `<url><loc>${urlOf(hrefs[l])}</loc><lastmod>${BUILD_DATE}</lastmod>${[...LANGS.map(x => `<xhtml:link rel="alternate" hreflang="${x}" href="${urlOf(hrefs[x])}"/>`), `<xhtml:link rel="alternate" hreflang="x-default" href="${urlOf(hrefs.es)}"/>`].join('')}</url>`;
  const sets = [LBASE, CV_HREFS, ...PROJECTS.map(p => Object.fromEntries(LANGS.map(x => [x, projUrl(x, p.id)])))];
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sets.flatMap(h => LANGS.map(l => entry(h, l))).join('\n')}\n</urlset>\n`);
  write('404.html', notFound(SITE)); made.push('404.html');

  const size = f => (fs.statSync(path.join(DIST, f)).size / 1024).toFixed(1) + ' KB';
  console.log(`✔ dist/ listo en ${Date.now() - t0} ms · ${made.length} páginas`);
  console.log(`  ${APP_JS} ${size(APP_JS)} (de ${(jsSrc.length / 1024).toFixed(0)} KB) · ${STYLE_CSS} ${size(STYLE_CSS)} · ${FONTS_CSS} ${size(FONTS_CSS)}`);
  console.log(gc ? `  Estadísticas: GoatCounter (${gc})` : '  Estadísticas: desactivadas (pon tu código en SITE.analytics.goatcounter de content.js)');
}

/* ---------- Plantilla de página (portfolio) ---------- */
function page(A, o) {
  const { l, M, title, desc, canonical, ogImage, ogAlt, ogType = 'website', h1, seo, jsonld, alternates, SITE, ogTitle = title, ogDesc = desc } = o;
  return `<!DOCTYPE html>
<html lang="${l}">
<head>
<meta charset="UTF-8">
<base href="/">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="author" content="${SITE.name}">
<meta name="theme-color" content="#d6381c" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#0f0e13" media="(prefers-color-scheme: dark)">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="${ogType}"><meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(ogTitle)}">
<meta property="og:description" content="${esc(ogDesc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">${o.ogSize === false ? '' : `
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">`}
<meta property="og:image:alt" content="${esc(ogAlt)}">
<meta property="og:locale" content="${M.locale}"><meta property="og:locale:alternate" content="${M.alt}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${ogImage}">
${alternates}
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23d6381c'/%3E%3Ctext x='32' y='42' font-family='sans-serif' font-size='28' font-weight='700' text-anchor='middle' fill='white'%3EAV%3C/text%3E%3C/svg%3E">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
${PRELOAD_FONTS.map(f => `<link rel="preload" href="assets/fonts/${f}" as="font" type="font/woff2" crossorigin>`).join('')}
<link rel="stylesheet" href="${A.FONTS_CSS}"><link rel="stylesheet" href="${A.STYLE_CSS}">
<noscript><style>#boot,.bar,.prog,.desk,.gap,.end{display:none!important}#seo{position:static;width:auto;height:auto;overflow:visible;clip:auto;white-space:normal;max-width:72ch;margin:0 auto;padding:32px 16px;line-height:1.6}#seo img{display:block;max-width:100%;height:auto;margin:12px 0}#seo li{margin:.3em 0}</style></noscript>
<script defer src="${A.APP_JS}"></script>
${A.analytics}
</head>
<body data-home="${esc(M.title)}">
<div id="boot" aria-hidden="true"><b>AV</b><i><u></u></i></div>
<h1 class="sr">${esc(h1)}</h1>
<header class="bar" id="bar">
  <b class="mono-logo">AV</b><span class="who"><b id="wname"></b><small id="wrole"></small></span><span id="appname"></span><time id="clk"></time>
  <button id="fcs" type="button" aria-pressed="false"></button>
  <div class="dd" id="lngd"><button id="lng" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="lngm"></button><ul id="lngm" role="menu" hidden></ul></div>
  <button id="thm" type="button"></button><button id="lpb" type="button"></button>
</header>
<div class="prog" id="prog"></div>
<main class="desk" id="desk">
  <div class="wall"></div><canvas id="pc" aria-hidden="true" hidden></canvas>
  <nav class="icons" id="icons"></nav>
  <button class="trash" id="trash" type="button" data-go="trash"></button>
  <div id="wins"></div>
  <div id="wdg"><div class="wd me"><img src="assets/foto.jpg" alt="${SITE.name}"><i class="live" aria-hidden="true"></i></div><div class="wd" id="w-cv"><b>CV</b><div class="cvb"><a class="btn fill" id="bcv" href="#" download>PDF</a><a class="btn" id="bcvw" href="#"></a></div></div><div class="wd" id="w-clock"><b id="wc"></b><small id="wd-date"></small></div><div class="wd" id="w-wx"><b id="wt">--°</b><small id="wcity"></small></div><div class="wd" id="w-mu"><button type="button" id="mu" class="btn" aria-pressed="false">Play</button><small>Ambient</small></div><a class="wd" id="w-gh" href="${SITE.github}" target="_blank" rel="noopener"><small id="ghl">GitHub</small><b id="ghn">GitHub</b><small id="ghs"></small></a></div>
  <nav class="dock" id="dock" aria-label="Windows"></nav>
  <a class="fab mag" id="fab" href="#end"></a>
</main>
<div class="gap"></div>
<footer class="end" id="end" inert>
  <div class="end-in">
    <h2 class="name" id="gname">${SITE.name}</h2>
    <div class="cta"><a class="cb fill" id="ctacv" href="#" download></a><button class="cb mag" id="cta" type="button" data-copy></button><a class="cb mag" id="cli" href="#" target="_blank" rel="noopener">LinkedIn</a><a class="cb mag" id="cgh" href="#" target="_blank" rel="noopener">GitHub</a></div>
    <div class="fb">
      <div class="cell" id="f-apps"></div><div class="cell" id="f-soc"></div>
      <div class="cell"><b id="fc" class="big2"></b><small><i class="live"></i><span id="favail"></span> · A Coruña</small></div>
      <button class="cell back" id="back" type="button"></button>
    </div>
    <p class="legal mono"></p>
  </div>
</footer>
<div id="lp" hidden role="dialog" aria-modal="true" aria-label="Launchpad">
  <button id="lpx" type="button" aria-label="Close">×</button>
  <input id="lps" type="search" autocomplete="off"><div id="lpg"></div>
</div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<div class="sr" id="seo">
${seo}
</div>
<script>setTimeout(function(){var b=document.getElementById('boot');if(b)b.remove()},4000)</script>
</body>
</html>
`;
}

/* ---------- Estilos de la página /cv/ ---------- */
const CV_CSS = `
:root{color-scheme:light dark;--bg:#ece9e3;--paper:#fff;--tx:#16151a;--mu:#5d5a66;--ln:#dcd8d0;--ac:#d6381c}
@media(prefers-color-scheme:dark){:root{--bg:#0f0e13;--paper:#1a1920;--tx:#f3f0ea;--mu:#a8a4b3;--ln:#33313c;--ac:#ff7a59}}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--tx);font:16px/1.55 "Space Grotesk",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
a{color:var(--ac)}a:focus-visible,button:focus-visible{outline:2px solid var(--ac);outline-offset:2px}
.top{max-width:860px;margin:0 auto;padding:16px 12px 0;display:flex;flex-wrap:wrap;gap:10px 18px;align-items:center;font-size:.9rem}
.top a{text-decoration:none;font-weight:600}.langs{display:flex;gap:4px}.langs a{padding:3px 9px;border:1px solid var(--ln);border-radius:99px;font:500 .78rem "JetBrains Mono",monospace;color:var(--mu)}.langs a[aria-current]{background:var(--tx);color:var(--paper);border-color:var(--tx)}
.acts{margin-left:auto;display:flex;gap:8px;flex-wrap:wrap}
.btn{display:inline-block;padding:7px 16px;border:1.5px solid var(--ac);border-radius:999px;background:transparent;color:var(--ac);font:700 .85rem "Space Grotesk",sans-serif;text-decoration:none;cursor:pointer}.btn.fill,.btn:hover{background:var(--ac);color:#fff}
.paper{max-width:860px;margin:14px auto 48px;padding:44px 48px;background:var(--paper);border:1px solid var(--ln);border-radius:14px;box-shadow:0 20px 50px -30px #0006}
header{border-bottom:3px solid var(--ac);padding-bottom:16px;margin-bottom:6px}
h1{margin:0;font-size:2.4rem;line-height:1.05;letter-spacing:-.03em}.role{margin:6px 0 10px;font-size:1.15rem;color:var(--ac);font-weight:700}
.contact{display:flex;flex-wrap:wrap;gap:4px 18px;margin:0;padding:0;list-style:none;font:.85rem "JetBrains Mono",monospace;color:var(--mu)}.contact a{color:inherit}
section{margin-top:22px}h2{margin:0 0 8px;padding-bottom:4px;border-bottom:1px solid var(--ln);font-size:.95rem;letter-spacing:.12em;text-transform:uppercase;color:var(--ac)}
article{margin:0 0 12px}h3{display:flex;justify-content:space-between;gap:12px;margin:0;font-size:1.05rem}.when{font:.8rem "JetBrains Mono",monospace;color:var(--mu);white-space:nowrap;font-weight:400}
.sub{margin:0 0 4px;color:var(--mu);font-size:.92rem}p{margin:0 0 .5em}ul{margin:.3em 0 0;padding-left:1.15em}li{margin:.15em 0}
dl{margin:0;display:grid;grid-template-columns:max-content 1fr;gap:3px 16px;font-size:.92rem}dt{font-weight:700}dd{margin:0;color:var(--mu)}
.lk{font-size:.85rem}.lk a{word-break:break-all}
@media(max-width:640px){.paper{padding:26px 20px;margin:10px 8px 32px}h1{font-size:1.9rem}dl{grid-template-columns:1fr}dd{margin-bottom:6px}h3{flex-direction:column;gap:0}}
@media print{
 @page{size:A4;margin:12mm}
 :root{--bg:#fff;--paper:#fff;--tx:#111;--mu:#444;--ln:#ccc;--ac:#b82d14}
 body{background:#fff;font-size:9.6pt;line-height:1.4}.noprint{display:none!important}
 .paper{max-width:none;margin:0;padding:0;border:0;box-shadow:none;border-radius:0}
 h1{font-size:22pt}section{margin-top:12px;break-inside:auto}h2{break-after:avoid;font-size:9pt}article,li,dl>*{break-inside:avoid}
 a{color:inherit;text-decoration:none}.lk a{word-break:normal}
}`;

/* ---------- 404 ---------- */
function notFound(SITE) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"><base href="/">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>404 | ${SITE.name}</title>
<style>:root{color-scheme:light dark;--bg:#f4f1ec;--tx:#16151a;--ac:#d6381c}@media(prefers-color-scheme:dark){:root{--bg:#0f0e13;--tx:#f3f0ea;--ac:#ff7a59}}
body{margin:0;min-height:100vh;display:grid;place-content:center;gap:14px;padding:24px;background:var(--bg);color:var(--tx);font:16px/1.5 system-ui,sans-serif}
h1{margin:0;font-size:clamp(3rem,12vw,7rem);letter-spacing:-.04em;color:var(--ac)}p{margin:0}a{color:var(--ac);font-weight:700}nav{display:flex;gap:18px;flex-wrap:wrap}</style>
</head>
<body>
<h1>404</h1>
<p>Esta página no existe · This page does not exist · Esta páxina non existe</p>
<nav><a href="/">Español</a><a href="/en/">English</a><a href="/gl/">Galego</a></nav>
</body>
</html>
`;
}

/* ---------- Service worker ----------
   · Páginas (navegación): red primero; si no hay conexión, la última copia guardada.
   · Archivos con huella (app.*.js, style.*.css, fonts.*.css, *.woff2): caché primero (nunca cambian).
   · /assets/ (imágenes, logos...): se sirve de caché y se actualiza por detrás.
   · No se tocan PDFs, peticiones con Range ni nada de otros dominios. */
function swSource(version, precache) {
  return `/* generado por build.mjs · versión ${version} */
const VERSION = '${version}', CORE = 'core-' + VERSION, RUNTIME = 'runtime-' + VERSION;
const PRECACHE = ${JSON.stringify(precache)};
const HASHED = /\\.[0-9a-f]{8}\\.(?:js|css)$|\\.woff2$/;
self.addEventListener('install', e => e.waitUntil(caches.open(CORE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CORE && k !== RUNTIME).map(k => caches.delete(k)))).then(() => self.clients.claim())));
const put = (name, req, res) => { if (res && res.ok && res.type === 'basic') { const c = res.clone(); caches.open(name).then(x => x.put(req, c)); } return res; };
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== self.location.origin || r.headers.has('range') || /\\.pdf$/i.test(u.pathname) || u.pathname === '/sw.js') return;
  if (r.mode === 'navigate') {
    e.respondWith(fetch(r).then(res => put(RUNTIME, r, res)).catch(() => caches.match(r).then(m => m || caches.match('/'))));
  } else if (HASHED.test(u.pathname)) {
    e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => put(CORE, r, res))));
  } else if (u.pathname.startsWith('/assets/')) {
    e.respondWith(caches.match(r).then(m => { const net = fetch(r).then(res => put(RUNTIME, r, res)).catch(() => m); return m || net; }));
  }
});
`;
}

/* ======================================================================
   MAIN
   ====================================================================== */
await build();

if (process.argv.includes('--serve')) {
  const PORT = +process.env.PORT || 8123;
  const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
  http.createServer((q, r) => {
    let p = decodeURIComponent(q.url.split('?')[0]), f = path.join(DIST, p);
    if (!f.startsWith(DIST)) { r.statusCode = 403; return r.end(); }
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) { if (!p.endsWith('/')) { r.writeHead(301, { Location: p + '/' }); return r.end(); } f = path.join(f, 'index.html'); }
    if (!fs.existsSync(f)) { r.statusCode = 404; r.setHeader('content-type', TYPES['.html']); return r.end(fs.readFileSync(path.join(DIST, '404.html'))); }
    r.setHeader('content-type', TYPES[path.extname(f).toLowerCase()] || 'application/octet-stream'); r.setHeader('cache-control', 'no-store'); r.end(fs.readFileSync(f));
  }).listen(PORT, () => console.log(`\n  → http://localhost:${PORT}/   (Ctrl+C para parar; se reconstruye al guardar)\n`));
  let timer = 0;
  for (const w of ['content.js', 'js', 'css']) {
    try { fs.watch(path.join(ROOT, w), () => { clearTimeout(timer); timer = setTimeout(() => build().catch(e => console.error('✖', e.message)), 250); }); } catch {}
  }
}
