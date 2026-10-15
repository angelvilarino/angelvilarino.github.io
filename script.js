/* =====================================================================
   Lógica de la web: idioma, tema, rutas (#/, #/about, #/projects, #/projects/<id>)
   y generación del HTML a partir de content.js
   ===================================================================== */

/* ---------- Estado ---------- */
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};
let lang = store.get('lang') || ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en');
let theme = document.documentElement.getAttribute('data-theme') || 'light';

/* ---------- Utilidades ---------- */
// Devuelve el texto en el idioma actual si es un objeto {es, en}; si no, el valor tal cual
const tx = v => (v && typeof v === 'object' && !Array.isArray(v) && ('es' in v || 'en' in v)) ? v[lang] : (v == null ? '' : v);
const ui = k => UI[lang][k];

const ICON = {
  github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  download: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/></svg>',
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>',
  sun: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  up: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V5"/><path d="m6 11 6-6 6 6"/></svg>',
  copy: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>',
  doc: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/></svg>',
  globe: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  image: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="m21 16-5-5-9 9"/></svg>'
};

// Los logos viven en assets/logos/<nombre>.svg (no dependen de ninguna CDN)
const iconUrl = name => `assets/logos/${name}.svg`;

/* ---------- Piezas reutilizables ---------- */
const col = i => `style="--c:var(--c${(i % 5) + 1})"`;

function section(id, title, body) {
  return `<section class="block" id="${id}"><h2>${title}</h2>${body}</section>`;
}

// Índice lateral (se resalta la sección visible) + contenido
function withRail(items, content) {
  return `<div class="layout">
    <aside class="rail"><nav aria-label="${ui('toc')}">
      <p class="rail-title">${ui('toc')}</p>
      <ul>${items.map(([id, label]) => `<li><a href="#${id}" data-scroll="${id}" data-rail="${id}">${label}</a></li>`).join('')}</ul>
    </nav></aside>
    <div class="content">${content}</div>
  </div>`;
}

// Nombre de empresa/centro en negrita, enlazado a su web oficial
function orgLink(o, full) {
  const name = full && o.orgFull ? o.orgFull : tx(o.org);
  return o.url ? `<strong><a class="org-link" href="${o.url}" target="_blank" rel="noopener">${name}</a></strong>` : `<strong>${name}</strong>`;
}

function chips(items) {
  return `<ul class="chips">${items.map(it => {
    const logo = it.i ? `<span class="logo"><img src="${iconUrl(it.i)}" alt="" loading="lazy" onerror="this.parentNode.remove()"></span>` : '';
    return `<li class="chip">${logo}${tx(it.n)}</li>`;
  }).join('')}</ul>`;
}

const SKILL_FILTERS = [['all', 'f_all'], ['code', 'f_code'], ['ai', 'f_ai'], ['data', 'f_data'], ['viz', 'f_viz'], ['work', 'f_work']];

function skillsBlock(withSoft) {
  const filters = `<div class="filters" role="group" aria-label="${ui('filters')}">${SKILL_FILTERS.map(([k, l], i) =>
    `<button type="button" class="fbtn" data-filter="${k}" aria-pressed="${i === 0}">${ui(l)}</button>`).join('')}</div>`;
  const groups = SKILLS.map((g, i) => `<div class="group" data-cat="${g.cat || 'all'}" ${col(i)}><h3>${tx(g.title)}</h3>${chips(g.items)}</div>`).join('');
  const langs = `<div class="group" data-cat="all" ${col(SKILLS.length)}><h3>${ui('languages')}</h3><ul class="langs">${LANGUAGES.map(l =>
    `<li><div class="lang-row"><span>${tx(l.n)}</span><span class="muted">${tx(l.level)}</span></div><div class="meter"><span style="width:${l.pct}%"></span></div></li>`).join('')}</ul></div>`;
  const soft = withSoft ? `<div class="group" data-cat="all" ${col(SKILLS.length + 1)}><h3>${ui('soft')}</h3><ul class="chips">${SOFT_SKILLS[lang].map(s => `<li class="chip">${s}</li>`).join('')}</ul></div>` : '';
  return `${filters}<div class="skills">${groups}${langs}${soft}</div>`;
}

// Cinta de logos en movimiento (decorativa)
function marquee() {
  const seen = new Set(), items = [];
  SKILLS.forEach(g => g.items.forEach(it => { if (it.i && !seen.has(it.i)) { seen.add(it.i); items.push(it); } }));
  const half = Math.ceil(items.length / 2);
  const row = (arr, rev) => {
    const html = arr.map(it => `<span class="mchip"><span class="logo"><img src="${iconUrl(it.i)}" alt=""></span>${tx(it.n)}</span>`).join('');
    return `<div class="mrow ${rev ? 'rev' : ''}"><div class="mtrack">${html}${html}</div></div>`;
  };
  return `<section class="marquee" aria-hidden="true">${row(items.slice(0, half), false)}${row(items.slice(half), true)}</section>`;
}

function stats() {
  const avgTxt = tx(RECOGNITIONS.avg), avg = parseFloat(String(RECOGNITIONS.avg.es).replace(',', '.'));
  return `<div class="bento">
    <div class="tile t-avg"><b><span data-count="${avg}" data-dec="1">${avgTxt}</span><small>/10</small></b><span>${ui('r_avg')}</span></div>
    <div class="tile t-honors"><b><span data-count="${RECOGNITIONS.honors}" data-dec="0">${RECOGNITIONS.honors}</span></b><span>${ui('r_honors')}</span></div>
    <div class="tile t-tfg"><b><span data-count="${RECOGNITIONS.tfg}" data-dec="0">${RECOGNITIONS.tfg}</span></b><span>${ui('r_tfg')}</span></div>
    <div class="tile t-award"><i>${ICON.star}</i><span>${ui('r_abau')}</span></div>
  </div>`;
}

function certCard(c, i, groupLogo) {
  const logo = c.logo || groupLogo;
  const img = logo ? `<span class="clogo"><img src="${logo}" alt="" loading="lazy"></span>` : '';
  const file = c.file ? `<a class="btn sm" href="${c.file}" target="_blank" rel="noopener">${ui('cert_view')}</a>` : '';
  return `<div class="card cert ${c.featured ? 'featured' : ''}" ${col(i)}>${img}
    <div class="cbody"><h4>${tx(c.title)}${c.featured ? ` <span class="tag">${ui('cert_featured')}</span>` : ''}</h4>
    ${c.meta ? `<p class="muted">${tx(c.meta)}</p>` : ''}${file}</div></div>`;
}

function certsBlock() {
  const groups = CERT_GROUPS.map((g, gi) => {
    const cards = g.items.map((c, i) => certCard(c, gi, g.logo)).join('');
    if (g.collapsible) {
      return `<div class="cgroup"><details class="cert-acc card" ${col(gi)}>
        <summary><span class="clogo"><img src="${g.logo}" alt="" loading="lazy"></span>
          <span class="cbody"><strong class="acc-title">${tx(g.title)}</strong><span class="muted">${tx(g.summary)}</span></span>
          <span class="acc-cta"><span class="show">${ui('cert_open')}</span><span class="hide">${ui('cert_close')}</span></span><span class="plus" aria-hidden="true"></span></summary>
        <div class="cert-grid">${cards}</div></details></div>`;
    }
    return `<div class="cgroup"><h3>${tx(g.title)} <span class="muted">(${g.items.length})</span></h3><div class="cert-grid">${cards}</div></div>`;
  }).join('');
  return groups;
}

function timeline(items) {
  return `<ol class="timeline">${items.join('')}</ol>`;
}

function projectImage(p, big) {
  if (p.image) {
    const src = tx(p.image) || (p.image.es || p.image), fb = p.image.es || p.image;
    return `<div class="pimg ${big ? 'big' : ''} ${p.fit === 'contain' ? 'contain' : ''}"><img src="${src}" alt="${tx(p.title)}" loading="lazy" onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src='${fb}'}"></div>`;
  }
  return `<div class="pimg ph ${big ? 'big' : ''}">${ICON.image}<span>${ui('p_img')}</span></div>`;
}

function projectLinks(p) {
  const defs = [['demo', 'l_demo', ICON.play], ['memoria', 'l_memoria', ICON.doc], ['repo', 'l_repo', ICON.github], ['web', 'l_web', ICON.globe]];
  const out = defs.filter(([k]) => p.links[k]).map(([k, label, ic]) => {
    const href = tx(p.links[k]);
    return href === '#'
      ? `<span class="btn sm disabled" aria-disabled="true">${ic}${ui(label)}</span>`
      : `<a class="btn sm ext" href="${href}" target="_blank" rel="noopener">${ic}${ui(label)}</a>`;
  });
  return out.length ? `<div class="links">${out.join('')}</div>` : '';
}

function contact() {
  return section('contact', ui('s_contact'), `
    <div class="panel">
      <a class="mail" href="mailto:${SITE.email}">${SITE.email}</a>
      <div class="panel-actions"><button class="btn" type="button" data-copy="${SITE.email}">${ICON.copy}<span>${ui('copy_email')}</span></button></div>
      <p class="phone"><span>${ui('c_phone')}</span> <a href="tel:${SITE.phoneLink}">${SITE.phone}</a></p>
      <div class="social">
        <a class="round" href="${SITE.github}" target="_blank" rel="noopener" aria-label="${ui('c_github')}" title="${ui('c_github')}">${ICON.github}</a>
        <a class="round" href="${SITE.linkedin}" target="_blank" rel="noopener" aria-label="${ui('c_linkedin')}" title="${ui('c_linkedin')}">${ICON.linkedin}</a>
        <a class="round" href="${SITE.cv[lang]}" download aria-label="${ui('c_cv')}" title="${ui('c_cv')}">${ICON.download}</a>
      </div>
    </div>`);
}

/* ---------- Páginas ---------- */
function pageHome(intro) {
  const [first, ...rest] = SITE.name.split(' ');
  const exp = timeline(EXPERIENCE.map(e => `<li><span class="when">${e.dates}</span>${orgLink(e)}<span>${tx(e.short)}</span></li>`));
  const edu = timeline(EDUCATION.slice(0, 3).map(e => `<li><span class="when">${e.dates}</span>${orgLink(e)}<span>${tx(e.title)}</span></li>`));

  const hero = `
  <section class="hero ${intro ? 'intro' : ''}">
    <canvas id="field" aria-hidden="true"></canvas>
    <div class="hero-text">
      <h1><span class="ln"><span>${first}</span></span><span class="ln"><span>${rest.join(' ')}</span></span></h1>
      <p class="role">${ui('role')}</p>
      <p class="lead">${ui('hero_desc')}</p>
      <div class="cta">
        <a class="btn" href="#projects" data-scroll="projects">${ui('cta_projects')}</a>
        <a class="btn" href="${SITE.cv[lang]}" target="_blank" rel="noopener">${ui('cta_cv')}</a>
        <a class="btn" href="#contact" data-scroll="contact">${ui('cta_contact')}</a>
      </div>
    </div>
    <div class="photo tilt"><img class="portrait" src="${SITE.photo}" alt="${SITE.name}"></div>
  <p class="hint">${ui('hero_hint')}</p>
  </section>`;

  const about = section('about', ui('s_about'), `
    <div class="bento2">
      <div class="tile2 bio"><p class="lead small">${tx(ABOUT.short)}</p></div>
      <div class="tile2 place">
        <span class="pin">${ICON.pin}</span>
        <div><p class="muted">${ui('tile_place')}</p><h3>${ui('tile_where')}</h3></div>
        <div class="clock"><b data-time>--:--</b><span class="muted">${ui('tile_time')}</span></div>
        <i class="sky"><span class="sun">${ICON.sun}</span><span class="moon">${ICON.moon}</span></i>
      </div>
      <div class="stack">
        <div class="tile2 exp"><h3>${ui('s_experience')}</h3>${exp}</div>
        <a class="tile2 cvtile" href="${SITE.cv[lang]}" download>
          <i>${ICON.download}</i>
          <span><strong>${ui('c_cv')}</strong><small>${lang === 'es' ? 'PDF en español' : 'PDF in English'}</small></span>
        </a>
      </div>
      <div class="tile2 edu"><h3>${ui('s_education')}</h3>${edu}</div>
    </div>
    <p class="more"><a class="link" href="#/about">${ui('more_about')}</a></p>`);

  const recog = section('recognitions', ui('s_recog'), `${stats()}<p class="more"><a class="link" href="#/about">${ui('more_recog')}</a></p>`);

  const projects = section('projects', ui('s_projects'), `
    <div class="projects-grid">${PROJECTS.map((p, i) => `
      <article class="card project tilt clickable ${i === 0 || PROJECTS.length === 2 ? 'feature' : ''}" ${col(i)} data-href="#/projects/${p.id}">
        ${projectImage(p, false)}
        <div class="body">
          <p class="date"><i></i>${tx(p.date)}</p>
          <h3><a href="#/projects/${p.id}">${tx(p.title)}</a></h3>
          <p>${tx(p.short)}</p>
          ${projectLinks(p)}
        </div>
      </article>`).join('')}</div>
    <p class="more"><a class="link" href="#/projects">${ui('all_projects')}</a></p>`);

  const skills = section('skills', ui('s_skills'), skillsBlock(false));

  const items = [['about', ui('s_about')], ['recognitions', ui('s_recog')], ['projects', ui('s_projects')], ['skills', ui('s_skills')], ['contact', ui('s_contact')]];
  return hero + marquee() + withRail(items, about + recog + projects + skills + contact());
}

function pageAbout() {
  const intro = `<section class="page-head about-head">
    <div><h1>${ui('a_title')}</h1>${ABOUT.long[lang].map(p => `<p class="lead small">${p}</p>`).join('')}</div>
    <div class="photo small tilt"><img class="portrait" src="${SITE.photo}" alt="${SITE.name}"></div></section>`;

  const edu = section('education', ui('a_edu'), timeline(EDUCATION.map(e => `
    <li><span class="when">${e.dates}${e.place ? ` <span class="muted">${tx(e.place)}</span>` : ''}</span>
      <h3>${tx(e.title)}${e.upcoming ? ` <span class="tag">${tx(e.upcoming)}</span>` : ''}</h3>
      <span class="org">${orgLink(e, true)}</span>
      ${e.detail ? `<span class="muted">${tx(e.detail)}</span>` : ''}</li>`)));

  const exp = section('experience', ui('a_exp'), timeline(EXPERIENCE.map(e => `
    <li><span class="when">${e.dates} <span class="muted">${e.place}</span></span>
      <h3>${orgLink(e)}</h3><span class="org">${tx(e.role)}</span>
      <ul class="bullets">${tx(e.bullets).map(b => `<li>${b}</li>`).join('')}</ul></li>`)));

  const excel = section('excellence', ui('a_excel'), `
    ${stats()}
    <details class="honors">
      <summary><span class="plus" aria-hidden="true"></span><span class="show">${ui('honors_btn')}</span><span class="hide">${ui('honors_hide')}</span></summary>
      <p class="muted">${ui('honors_note')}</p>
      <ul class="bullets">${HONORS_COURSES.map(c => `<li>${tx(c)}</li>`).join('')}</ul>
    </details>`);

  const certs = section('certs', ui('a_cert'), certsBlock());

  const skills = section('skills', ui('a_skills'), `<p class="lead small">${ui('a_skills_intro')}</p>${skillsBlock(true)}`);

  const personal = section('personal', ui('a_personal'), `
    <p class="lead small">${tx(PERSONAL_INTRO)}</p>
    <div class="grid two life">${INTERESTS.map((it, i) => `<div class="card life" ${col(i + 1)}><h3>${tx(it.title)}</h3><p>${tx(it.text)}</p></div>`).join('')}</div>
    <div class="gallery">${SITE.lifePhotos.map((ph, i) => ph && ph.src
      ? `<figure class="pimg zoomable" tabindex="0" role="button" aria-label="${ui('open_img')}" data-src="${ph.src}"><img src="${ph.src}" alt="${tx(ph.alt)}" loading="lazy"></figure>`
      : `<div class="pimg ph" ${col(i)}>${ICON.image}<span>Foto / Photo</span></div>`).join('')}</div>`);

  const items = [['education', ui('a_edu')], ['experience', ui('a_exp')], ['excellence', ui('a_excel')], ['certs', ui('a_cert')], ['skills', ui('a_skills')], ['personal', ui('a_personal')], ['contact', ui('s_contact')]];
  return intro + withRail(items, edu + exp + excel + certs + skills + personal + contact());
}

function pageProjects() {
  return `<section class="page-head"><h1>${ui('p_title')}</h1><p class="lead small">${ui('p_intro')}</p></section>
    <div class="projects-grid page">${PROJECTS.map((p, i) => `
      <a class="card project tilt" ${col(i)} href="#/projects/${p.id}">
        ${projectImage(p, true)}
        <div class="body">
          <p class="date"><i></i>${tx(p.date)}</p>
          <h3>${tx(p.title)}</h3>
          <p>${tx(p.short)}</p>
        </div>
      </a>`).join('')}</div>`;
}

function figSrc(v) {
  const s = typeof v === 'string' ? v : (tx(v) || v.es);
  return s;
}

function renderBlock(b, bi) {
  switch (b.type) {
    case 'h': return `<h2>${tx(b.t)}</h2>`;
    case 'h3': return `<h3>${tx(b.t)}</h3>`;
    case 'p': return `<p>${tx(b.t)}</p>`;
    case 'ul': return `<ul class="bullets">${tx(b.items).map(i => `<li>${i}</li>`).join('')}</ul>`;
    case 'callout': return `<aside class="callout"><h3>${tx(b.title)}</h3><ul class="bullets">${tx(b.items).map(i => `<li>${i}</li>`).join('')}</ul></aside>`;
    case 'steps': return `<ol class="steps">${b.items.map((s, i) => `<li ${col(i)}><span class="num">${i + 1}</span><div><strong>${tx(s.t)}</strong><p>${tx(s.d)}</p></div></li>`).join('')}</ol>`;
    case 'kpis': return `<div class="kpis">${b.items.map((m, k) => `<div class="kpi" ${col(k)}><b>${m.count ? `<span data-count="${m.count.to}" data-dec="${m.count.dec || 0}" data-prefix="${m.count.prefix || ''}" data-suffix="${tx(m.count.suffix) || ''}" data-group="${m.count.group ? 1 : 0}">${tx(m.v)}</span>` : tx(m.v)}</b>${m.pct ? `<div class="meter"><span style="width:${m.pct}%"></span></div>` : ''}<span>${tx(m.l)}</span></div>`).join('')}</div>`;
    case 'cards': return `<div class="grid three life">${b.items.map((c, i) => `<div class="card life" ${col(i)}><h3>${tx(c.t)}</h3><ul class="bullets">${tx(c.ex).map(x => `<li>${x}</li>`).join('')}</ul></div>`).join('')}</div>`;
    case 'fig': {
      const src = figSrc(b.src), fb = typeof b.src === 'string' ? b.src : (b.src.es || src);
      return `<figure class="pfig zoomable" tabindex="0" role="button" aria-label="${ui('open_img')}" data-src="${src}"><img src="${src}" alt="${tx(b.alt)}" loading="lazy" onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src='${fb}';this.parentNode.dataset.src='${fb}'}">${b.caption ? `<figcaption>${tx(b.caption)}</figcaption>` : ''}</figure>`;
    }
    case 'people': return `<div class="people">${b.items.map((x, i) => `<div class="card person" ${col(i + 1)}><span class="avatar" aria-hidden="true">${x.name.split(' ').filter((_, k) => k < 2).map(w => w[0]).join('')}</span><div><h3><a class="org-link" href="${x.url}" target="_blank" rel="noopener">${x.name}</a></h3><p class="role-line">${tx(x.role)}</p><p>${tx(x.bio)}</p></div></div>`).join('')}</div>`;
    case 'tech': return chips(b.items);
    case 'tabs': {
      const st = b.variant === 'steps';
      const btns = b.items.map((x, i) => `<button type="button" class="tabbtn" role="tab" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-tab="${i}" ${col(i)}>${st ? `<span class="tnum">${i + 1}</span>` : ''}${tx(x.t)}</button>`).join('');
      const panels = b.items.map((x, i) => `<div class="tabpanel ${x.side ? 'side' : ''}" role="tabpanel" data-panel="${i}" ${i ? 'hidden' : ''} ${col(i)}>
        <div class="tp-text"><h3>${tx(x.t)}</h3><p>${tx(x.d)}</p></div>
        ${x.img ? `<figure class="tp-img zoomable" tabindex="0" role="button" aria-label="${ui('open_img')}" data-src="${x.img}"><img src="${x.img}" alt="${tx(x.alt)}" loading="lazy"></figure>` : ''}</div>`).join('');
      return `<div class="tabs ${st ? 'steps' : ''}" data-tabs><div class="tablist" role="tablist">${btns}</div>${panels}</div>`;
    }
    case 'tiles': return `<div class="tiles ${b.variant || ''}">${b.items.map((x, i) => `<div class="card tile3" ${col(i)}><h3>${tx(x.t)}</h3><p>${tx(x.d)}</p></div>`).join('')}</div>`;
    case 'chipgroups': return `<div class="grid three life">${b.items.map((g, i) => `<div class="card life" ${col(i)}><h3>${tx(g.t)}</h3><ul class="chips">${tx(g.chips).map(c => `<li class="chip">${c}</li>`).join('')}</ul></div>`).join('')}</div>`;
    case 'accordion': return `<div class="acc">${b.items.map((x, i) => `<details class="card acc-item" ${col(i)}><summary><span>${tx(x.t)}</span><span class="plus" aria-hidden="true"></span></summary><p>${tx(x.d)}</p></details>`).join('')}</div>`;
    case 'note': return `<p class="note"><i class="live" aria-hidden="true"></i>${tx(b.t)}</p>`;
    default: return '';
  }
}

function pageProject(id) {
  const i = PROJECTS.findIndex(x => x.id === id);
  const p = PROJECTS[i];
  if (!p) return `<section class="page-head"><p class="lead small">${ui('p_notfound')}</p><p><a class="link" href="#/projects">${ui('p_back')}</a></p></section>`;
  const head = `<article class="detail" ${col(i)}>
    <p><a class="back link" href="#/projects">← ${ui('p_back')}</a></p>
    <p class="date"><i></i>${tx(p.date)}</p>
    <h1>${tx(p.title)}</h1>
    ${p.by ? `<p class="by">${tx(p.by)}</p>` : ''}
    <p class="lead small">${tx(p.short)}</p>
    ${projectLinks(p)}`;
  if (p.blocks) return head + p.blocks.map(renderBlock).join('') + '</article>';
  return head + `
    ${projectImage(p, true)}
    <h2>${ui('p_detail')}</h2>${tx(p.long).map(t => `<p>${t}</p>`).join('')}
    <h2>${ui('p_stack')}</h2><ul class="chips">${p.stack.map(s => `<li class="chip">${s}</li>`).join('')}</ul>
    <h2>${ui('p_results')}</h2><p>${tx(p.results)}</p>
    <h2>${ui('p_gallery')}</h2>
    <div class="grid two photos"><div class="pimg ph">${ICON.image}<span>${ui('p_img')}</span></div><div class="pimg ph">${ICON.image}<span>${ui('p_img')}</span></div></div>
  </article>`;
}

/* ---------- Hero: campo de puntos (clusters) interactivo ----------
   Cinco grupos de puntos orbitan lentamente y se apartan del cursor.
   Es el único elemento animado de la web. */
let fieldRaf = 0, fieldCleanup = null;
function startField() {
  cancelAnimationFrame(fieldRaf);
  if (fieldCleanup) { fieldCleanup(); fieldCleanup = null; }
  const cv = document.getElementById('field');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const hero = cv.parentElement;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const css = getComputedStyle(document.documentElement);
  const cols = [1, 2, 3, 4, 5].map(i => css.getPropertyValue('--c' + i).trim());
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const K = 5, N = 150;
  const pts = Array.from({ length: N }, (_, i) => ({
    k: i % K, a: Math.random() * 6.283, r: Math.pow(Math.random(), 0.7) * 78 + 8,
    s: Math.random() * 1.6 + 1.3, d: Math.random() < 0.5 ? -1 : 1, x: null, y: null
  }));
  const mouse = { x: -999, y: -999 };
  let burst = -1e9;
  let w = 0, h = 0;
  const size = () => {
    const r = hero.getBoundingClientRect();
    w = r.width; h = r.height;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  size();

  function frame(t) {
    if (window.scrollY < h + 80) {
      ctx.clearRect(0, 0, w, h);
      const centers = cols.map((_, k) => {
        const th = (k / K) * 6.283;
        return { x: w * (0.55 + 0.36 * Math.cos(th + t * 0.00007)), y: h * (0.5 + 0.3 * Math.sin(th * 1.3 + t * 0.00009)) };
      });
      pts.forEach(p => {
        const c = centers[p.k];
        let tx = c.x + p.r * Math.cos(p.a + p.d * t * 0.0003);
        let ty = c.y + p.r * Math.sin(p.a + p.d * t * 0.0003);
        const b = Math.max(0, 1 - (t - burst) / 650), R = 120 + 260 * b, F = 46 + 130 * b;
        const dx = tx - mouse.x, dy = ty - mouse.y, d = Math.hypot(dx, dy);
        if (d < R && d > 0) { const f = (1 - d / R) * F; tx += (dx / d) * f; ty += (dy / d) * f; }
        if (p.x === null) { p.x = tx; p.y = ty; }
        p.x += (tx - p.x) * 0.07; p.y += (ty - p.y) * 0.07;
      });
      ctx.lineWidth = 1;
      for (let k = 0; k < K; k++) {
        const g = pts.filter(p => p.k === k);
        ctx.strokeStyle = cols[k]; ctx.globalAlpha = 0.16;
        ctx.beginPath();
        for (let i = 0; i < g.length; i++) for (let j = i + 1; j < g.length; j++) {
          if (Math.hypot(g[i].x - g[j].x, g[i].y - g[j].y) < 52) { ctx.moveTo(g[i].x, g[i].y); ctx.lineTo(g[j].x, g[j].y); }
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 0.8;
      pts.forEach(p => { ctx.fillStyle = cols[p.k]; ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, 6.283); ctx.fill(); });
    }
    if (!reduce) fieldRaf = requestAnimationFrame(frame);
  }
  frame(0);

  const onMove = e => { const r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; hero.classList.add('moved'); };
  const onDown = e => { onMove(e); burst = performance.now(); if (reduce) frame(performance.now()); };
  const onLeave = () => { mouse.x = mouse.y = -999; };
  const ro = new ResizeObserver(size);
  ro.observe(hero);
  hero.addEventListener('pointermove', onMove);
  hero.addEventListener('pointerleave', onLeave);
  hero.addEventListener('pointerdown', onDown);
  fieldCleanup = () => { ro.disconnect(); hero.removeEventListener('pointermove', onMove); hero.removeEventListener('pointerleave', onLeave); hero.removeEventListener('pointerdown', onDown); };
}

/* ---------- Índice lateral: resalta la sección visible ---------- */
let spyHandler = null;
function startSpy() {
  if (spyHandler) window.removeEventListener('scroll', spyHandler);
  spyHandler = null;
  const links = [...document.querySelectorAll('[data-rail]')];
  if (!links.length) return;
  const secs = links.map(a => document.getElementById(a.dataset.rail));
  spyHandler = () => {
    let cur = -1;
    secs.forEach((s, i) => { if (s.getBoundingClientRect().top <= 150) cur = i; });
    links.forEach((a, i) => a.classList.toggle('on', i === cur));
  };
  window.addEventListener('scroll', spyHandler, { passive: true });
  spyHandler();
}

/* =====================================================================
   Interacciones y microanimaciones
   (todas respetan prefers-reduced-motion y no dependen de librerías)
   ===================================================================== */
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

// Aparición progresiva al hacer scroll (con escalonado en cuadrículas y listas)
let revealIO = null, countIO = null;
function setupReveal() {
  if (revealIO) revealIO.disconnect();
  if (countIO) countIO.disconnect();
  const root = document.getElementById('app');
  root.querySelectorAll('.bento, .bento2, .projects-grid, .skills, .cert-grid, .chips, .timeline, .grid, .gallery, .filters, .marquee').forEach(c => {
    c.classList.add('stagger');
    [...c.children].forEach((ch, i) => ch.style.setProperty('--i', Math.min(i, 14)));
  });
  const targets = [...root.querySelectorAll('.block > *, .page-head, .detail > *')];
  if (reduceMotion || !('IntersectionObserver' in window)) { targets.forEach(t => t.classList.add('in')); }
  else {
    revealIO = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    targets.forEach(t => { t.classList.add('reveal'); revealIO.observe(t); });
  }
  // Contadores animados
  const counters = [...root.querySelectorAll('[data-count]')];
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  countIO = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { countUp(e.target); countIO.unobserve(e.target); }
  }), { threshold: 0.6 });
  counters.forEach(c => countIO.observe(c));
}

function countUp(el) {
  const target = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0;
  const pre = el.dataset.prefix || '', suf = el.dataset.suffix || '', grp = el.dataset.group === '1';
  const fmt = v => {
    let [i, d] = v.toFixed(dec).split('.');
    if (grp) i = i.replace(/\B(?=(\d{3})+(?!\d))/g, lang === 'es' ? '.' : ',');
    return pre + i + (d ? (lang === 'es' ? ',' : '.') + d : '') + suf;
  };
  const t0 = performance.now(), dur = 1200;
  const step = now => {
    const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(target * e);
    if (p < 1) requestAnimationFrame(step); else el.textContent = fmt(target);
  };
  requestAnimationFrame(step);
}

// Inclinación 3D y botones magnéticos (solo con ratón)
function bindFx(root) {
  if (!finePointer || reduceMotion) return;
  root.querySelectorAll('.tilt').forEach(el => {
    const max = el.classList.contains('photo') ? 7 : 4;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--ry', (x * max * 2).toFixed(2) + 'deg');
      el.style.setProperty('--rx', (-y * max * 2).toFixed(2) + 'deg');
      el.style.setProperty('--px', (-x * 16).toFixed(1) + 'px');
      el.style.setProperty('--py', (-y * 16).toFixed(1) + 'px');
    });
    el.addEventListener('pointerleave', () => ['--rx', '--ry', '--px', '--py'].forEach(v => el.style.removeProperty(v)));
  });
  root.querySelectorAll('.btn:not(.disabled), .round, .tool, .totop').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.28, dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
      el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

// Foco de luz que sigue al cursor sobre tarjetas, teselas y el pie de página
document.addEventListener('pointermove', e => {
  if (!finePointer) return;
  const s = e.target.closest && e.target.closest('.card, .tile, .tile2, .panel, .wordmark');
  if (!s) return;
  const r = s.getBoundingClientRect();
  s.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  s.style.setProperty('--my', (e.clientY - r.top) + 'px');
}, { passive: true });

// Reloj en directo de A Coruña
let clockTimer = 0;
function startClock() {
  clearInterval(clockTimer);
  const fmt = new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Madrid' });
  let last = '';
  const tick = () => {
    const parts = fmt.formatToParts(new Date());
    const hh = parts.find(p => p.type === 'hour').value, mm = parts.find(p => p.type === 'minute').value;
    const key = hh + mm;
    const tile = document.querySelector('.tile2.place');
    if (tile) tile.classList.toggle('night', +hh < 7 || +hh >= 21);
    if (key === last) return;
    last = key;
    document.querySelectorAll('[data-time]').forEach(e => { e.innerHTML = `${hh}<span class="colon">:</span>${mm}`; });
  };
  tick();
  clockTimer = setInterval(tick, 1000);
}

// Barra de navegación: píldora deslizante
function setupNav(page) {
  const nav = document.getElementById('nav');
  nav.innerHTML = '<span class="nav-pill"></span>' + [['home', '#/', 'nav_home'], ['about', '#/about', 'nav_about'], ['projects', '#/projects', 'nav_projects']]
    .map(([key, href, label]) => `<a href="${href}" ${key === page || (key === 'home' && !['about', 'projects'].includes(page)) ? 'aria-current="page"' : ''}>${ui(label)}</a>`).join('');
  const pill = nav.querySelector('.nav-pill'), links = [...nav.querySelectorAll('a')], cur = nav.querySelector('[aria-current]');
  const moveTo = a => {
    pill.style.opacity = a ? 1 : 0;
    if (!a) return;
    pill.style.width = a.offsetWidth + 'px';
    pill.style.transform = `translateX(${a.offsetLeft}px)`;
    links.forEach(l => l.classList.toggle('on', l === a));
  };
  links.forEach(a => { a.addEventListener('pointerenter', () => moveTo(a)); a.addEventListener('focus', () => moveTo(a)); });
  nav.addEventListener('pointerleave', () => moveTo(cur));
  nav.addEventListener('focusout', () => moveTo(cur));
  moveTo(cur);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => moveTo(cur));
  window.onresize = () => moveTo(cur);
}

// Progreso de scroll y cabecera que se esconde al bajar (solo en pantallas anchas)
(function () {
  const bar = document.getElementById('progress');
  let lastY = window.scrollY, ticking = false;
  const update = () => {
    const y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    document.body.classList.toggle('hdr-hidden', innerWidth > 960 && y > 180 && y > lastY + 2);
    if (y < lastY - 2 || y < 180) document.body.classList.remove('hdr-hidden');
    lastY = y; ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  document.getElementById('site-header').addEventListener('focusin', () => document.body.classList.remove('hdr-hidden'));
})();

// Toast + confeti
let toastTimer = 0;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}
function confetti(origin) {
  if (reduceMotion) return;
  const r = origin.getBoundingClientRect(), host = document.body;
  for (let i = 0; i < 18; i++) {
    const s = document.createElement('i');
    s.className = 'confetti';
    const a = Math.random() * Math.PI * 2, d = 50 + Math.random() * 90;
    s.style.cssText = `left:${r.left + r.width / 2}px;top:${r.top + r.height / 2}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d - 30}px;--r:${Math.random() * 540 - 270}deg;background:var(--c${(i % 5) + 1})`;
    host.appendChild(s);
    setTimeout(() => s.remove(), 900);
  }
}
function copyText(text) {
  const legacy = () => new Promise(res => {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    ta.remove(); res();
  });
  if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text).catch(legacy);
  return legacy();
}

// Visor de fotos
const lb = document.getElementById('lightbox'), lbImg = document.getElementById('lb-img');
function openLightbox(src, alt) { lbImg.src = src; lbImg.alt = alt || ''; lb.hidden = false; document.body.style.overflow = 'hidden'; document.getElementById('lb-close').focus(); }
function closeLightbox() { lb.hidden = true; document.body.style.overflow = ''; }
lb.addEventListener('click', e => { if (e.target !== lbImg) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lb.hidden) closeLightbox(); });

// Clics delegados: scroll interno, filtros, copiar, volver arriba, fotos
document.addEventListener('click', e => {
  const card = e.target.closest('[data-href]');
  if (card && !e.target.closest('a, button') && !(window.getSelection && String(window.getSelection()))) { location.hash = card.dataset.href; return; }
  const a = e.target.closest('[data-scroll]');
  if (a) { e.preventDefault(); const el = document.getElementById(a.dataset.scroll); if (el) el.scrollIntoView({ block: 'start' }); return; }

  const tb = e.target.closest('.tabbtn');
  if (tb) { selectTab(tb); return; }

  const f = e.target.closest('.fbtn');
  if (f) {
    const wrap = f.closest('.block') || document;
    const skills = wrap.querySelector('.skills');
    wrap.querySelectorAll('.fbtn').forEach(b => b.setAttribute('aria-pressed', b === f));
    skills.classList.remove('stagger');
    skills.querySelectorAll('.group').forEach(g => {
      const show = f.dataset.filter === 'all' || g.dataset.cat === f.dataset.filter;
      g.hidden = !show;
      g.classList.remove('fx-pop');
      if (show) { void g.offsetWidth; g.classList.add('fx-pop'); }
    });
    return;
  }

  const c = e.target.closest('[data-copy]');
  if (c) {
    copyText(c.dataset.copy).then(() => {
      toast(ui('copied')); confetti(c);
      const label = c.querySelector('span'), old = label.textContent;
      label.textContent = ui('copied_btn'); c.classList.add('done');
      setTimeout(() => { label.textContent = old; c.classList.remove('done'); }, 1800);
    });
    return;
  }

  if (e.target.closest('[data-top]')) { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); return; }

  const z = e.target.closest('.zoomable');
  if (z) { const im = z.querySelector('img'); openLightbox(z.dataset.src, im && im.alt); }
});
// Pestañas (proyectos): selección con clic o flechas del teclado
function selectTab(tb) {
  const root = tb.closest('[data-tabs]'), idx = tb.dataset.tab;
  root.querySelectorAll('.tabbtn').forEach(b => { const on = b === tb; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
  root.querySelectorAll('.tabpanel').forEach(p => {
    const on = p.dataset.panel === idx;
    p.hidden = !on;
    if (on) { p.classList.remove('fx-pop'); void p.offsetWidth; p.classList.add('fx-pop'); }
  });
}
document.addEventListener('keydown', e => {
  const tb = e.target.closest && e.target.closest('.tabbtn');
  if (!tb || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return;
  const all = [...tb.parentNode.querySelectorAll('.tabbtn')], n = all[(all.indexOf(tb) + (e.key === 'ArrowRight' ? 1 : -1) + all.length) % all.length];
  n.focus(); selectTab(n); e.preventDefault();
});
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('zoomable')) { e.preventDefault(); e.target.click(); }
});

/* ---------- Pie de página ---------- */
function footerHtml() {
  const links = [['#/', 'nav_home'], ['#/about', 'nav_about'], ['#/projects', 'nav_projects']].map(([h, l]) => `<li><a href="${h}">${ui(l)}</a></li>`).join('');
  return `<div class="foot">
    <div class="foot-grid">
      <div class="foot-id">
        <p class="foot-name">${SITE.name}</p>
        <p class="muted">${ui('foot_role')}</p>
        <p class="foot-time"><span class="live" aria-hidden="true"></span>A Coruña, <b data-time>--:--</b></p>
      </div>
      <div><p class="foot-h">${ui('foot_nav')}</p><ul>${links}</ul></div>
      <div><p class="foot-h">${ui('foot_links')}</p><ul>
        <li><a href="${SITE.github}" target="_blank" rel="noopener">GitHub</a></li>
        <li><a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li>
        <li><a href="${SITE.cv[lang]}" target="_blank" rel="noopener">CV</a></li>
        <li><a href="mailto:${SITE.email}">${ui('c_email')}</a></li>
      </ul></div>
      <button class="round totop" type="button" data-top aria-label="${ui('back_top')}" title="${ui('back_top')}">${ICON.up}</button>
    </div>
    <div class="wordmark" aria-hidden="true"><span>Ángel Vilariño</span></div>
    <div class="foot-bottom"><p class="muted">${ui('footer')}</p><p class="muted">${ui('foot_by')}</p></div>
  </div>`;
}

/* ---------- Render y rutas ---------- */
function currentRoute() {
  const [page, id] = location.hash.replace(/^#\/?/, '').split('/');
  return { page: page || 'home', id };
}

function render(resetScroll) {
  const { page, id } = currentRoute();
  const app = document.getElementById('app');
  app.innerHTML = page === 'about' ? pageAbout()
    : page === 'projects' ? (id ? pageProject(id) : pageProjects())
    : pageHome(resetScroll);

  document.documentElement.lang = lang;
  document.title = page === 'about' ? `${ui('nav_about')} | ${SITE.name}`
    : page === 'projects' ? `${ui('nav_projects')} | ${SITE.name}`
    : `${SITE.name} | ${ui('role')}`;
  setupNav(page);
  const lb2 = document.getElementById('lang-btn');
  lb2.textContent = lang === 'es' ? 'EN' : 'ES';
  lb2.setAttribute('aria-label', ui('lang_switch'));
  lb2.title = ui('lang_switch');
  const tb = document.getElementById('theme-btn');
  tb.innerHTML = theme === 'dark' ? ICON.sun : ICON.moon;
  tb.setAttribute('aria-label', theme === 'dark' ? ui('theme_light') : ui('theme_dark'));
  tb.title = tb.getAttribute('aria-label');
  document.getElementById('lb-close').setAttribute('aria-label', ui('close'));
  const foot = document.getElementById('footer');
  foot.innerHTML = footerHtml();
  if (resetScroll) window.scrollTo(0, 0);
  startField();
  startSpy();
  startClock();
  setupReveal();
  bindFx(app);
  bindFx(foot);
  fitWordmark();
}

// Ajusta el rótulo gigante del pie al ancho disponible
function fitWordmark() {
  const w = document.querySelector('.wordmark');
  if (!w) return;
  const fit = () => {
    w.style.fontSize = '100px';
    const avail = w.clientWidth, used = w.firstElementChild.getBoundingClientRect().width;
    if (used > 0) w.style.fontSize = Math.min(Math.floor(100 * avail / used * 0.985), 200) + 'px';
  };
  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  window.addEventListener('resize', fit, { once: true });
}

// Transiciones suaves entre páginas, idioma y tema (View Transitions API, si el navegador la soporta)
function withTransition(fn) {
  if (!document.startViewTransition || reduceMotion) { fn(); return null; }
  try { return document.startViewTransition(fn); } catch (e) { fn(); return null; }
}

document.getElementById('lang-btn').addEventListener('click', () => {
  withTransition(() => { lang = lang === 'es' ? 'en' : 'es'; store.set('lang', lang); render(false); });
});

document.getElementById('theme-btn').addEventListener('click', e => {
  const apply = () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    store.set('theme', theme);
    render(false);
  };
  if (!document.startViewTransition || reduceMotion) { apply(); return; }
  const r = e.currentTarget.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
  const rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  document.documentElement.classList.add('vt-theme');
  const t = document.startViewTransition(apply);
  t.ready.then(() => document.documentElement.animate(
    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${rad}px at ${x}px ${y}px)`] },
    { duration: 650, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' }
  )).catch(() => {});
  t.finished.finally(() => document.documentElement.classList.remove('vt-theme'));
});

window.addEventListener('hashchange', () => withTransition(() => render(true)));
render(true);
bindFx(document.querySelector('.site-header'));
