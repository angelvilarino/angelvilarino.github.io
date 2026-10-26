/* Ángel OS · Contenido de cada app */
'use strict';
/* ---- Utilidades de contenido ---- */
const imgOf = p => tx(p.image);
/* src con respaldo al español si la versión del idioma no existe */
const ims = v => { const s = tx(v), f = (v && typeof v === 'object') ? v.es : s; return `src="${s}"${s !== f ? ` onerror="this.onerror=null;this.src='${f}'"` : ''}`; };
const links = p => ['demo', 'memoria', 'repo', 'web'].filter(k => p.links[k] && tx(p.links[k]) !== '#').map(k => `<a href="${tx(p.links[k])}" target="_blank" rel="noopener">${U()['l_' + k]}</a>`).join('');
let _sn = 0, _tb = 0;
const blk = b => {
  const tl = a => `<div class="tiles">${a.map((x, i) => `<div class="tl" style="--c:var(--c${i % 2 + 1})"><b>${tx(x.t)}</b><p>${tx(x.d)}</p></div>`).join('')}</div>`;
  switch (b.type) {
    case 'h': return `<h3 class="sh" style="--c:var(--c${_sn % 2 + 1})"><span>${++_sn}</span>${tx(b.t)}</h3>`; case 'h3': return `<h4>${tx(b.t)}</h4>`; case 'p': return `<p>${tx(b.t)}</p>`;
    case 'tiles': return tl(b.items);
    case 'tabs': { const id = 'tb' + (++_tb); return `<div class="tabs"><div class="seg" role="tablist">${b.items.map((x, i) => `<button type="button" role="tab" id="${id}-t${i}" aria-controls="${id}-p${i}" aria-selected="${!i}" tabindex="${i ? -1 : 0}" data-tab="${i}">${tx(x.t)}</button>`).join('')}</div>${b.items.map((x, i) => `<div class="tl tp" role="tabpanel" id="${id}-p${i}" aria-labelledby="${id}-t${i}" data-p="${i}" ${i ? 'hidden' : ''}><p>${tx(x.d)}</p>${x.img ? `<img src="${x.img}" alt="${tx(x.alt)}" loading="lazy">` : ''}</div>`).join('')}</div>`; }
    case 'accordion': return `<div class="acc">${b.items.map(x => `<details><summary>${tx(x.t)}</summary><p>${tx(x.d)}</p></details>`).join('')}</div>`;
    case 'chipgroups': return b.items.map(g => `<h4>${tx(g.t)}</h4><ul class="chp">${txa(g.chips).map(c => `<li>${c}</li>`).join('')}</ul>`).join('');
    case 'tech': return `<ul class="chp lg">${b.items.map(i => `<li>${i.i ? `<img src="assets/logos/${i.i}.svg" alt="" onerror="this.remove()">` : ''}${tx(i.n)}</li>`).join('')}</ul>`;
    case 'people': return `<div class="tiles">${b.items.map(x => `<div class="tl"><b><a href="${x.url}" target="_blank" rel="noopener">${x.name}</a></b><p><small>${tx(x.role)}</small></p><p>${tx(x.bio)}</p></div>`).join('')}</div>`;
    case 'kpis': return `<div class="tiles">${b.items.map((x, i) => { const c = x.count, a = c ? ` data-n="${c.to}"${c.dec ? ` data-d="${c.dec}"` : ''}${c.prefix ? ` data-pre="${c.prefix}"` : ''}${c.suffix ? ` data-suf="${tx(c.suffix)}"` : ''}${c.group ? ' data-grp="1"' : ''}` : ''; return `<div class="tl" style="--c:var(--c${i % 2 + 1})"><b class="big"${a}>${tx(x.v)}</b>${x.pct ? `<i class="sbar"><u style="--w:${x.pct / 100}"></u></i>` : ''}<p>${tx(x.l)}</p></div>`; }).join('')}</div>`;
    case 'fig': return `<figure><img ${ims(b.src)} alt="${tx(b.alt)}" loading="lazy"><figcaption>${tx(b.caption)}</figcaption></figure>`;
    case 'note': return `<p class="nt"><small>${tx(b.t)}</small></p>`;
    default: return '';
  }
};

/* ---- Contenido de cada app ---- */
const R = {};
R.projects = () => `<div class="bento">${PROJECTS.map((p, i) => `<article class="card ${i ? '' : 'big'}" data-go="p:${p.id}" style="--c:var(--c${i % 2 + 1})"><img ${ims(p.image)} alt="" loading="lazy"><div><small>${tx(p.date)}</small><h3>${tx(p.title)}</h3><p>${tx(p.short)}</p><div class="lk">${links(p)}</div></div></article>`).join('')}</div>`;
R.stack = () => { const max = Math.max(...SKILLS.map(g => g.items.length)), L = U();
  const groups = SKILLS.map((g, i) => `<div class="sg" data-cat="${g.cat}" style="--c:var(--c${i % 2 + 1})"><h3>${tx(g.title)}<small>${g.items.length}</small></h3><i class="sbar"><u style="--w:${g.items.length / max}"></u></i><ul>${g.items.map(it => `<li>${it.i ? `<img src="assets/logos/${it.i}.svg" alt="">` : ''}${tx(it.n)}</li>`).join('')}</ul></div>`).join('');
  const soft = `<div class="sg" data-cat="work" style="--c:var(--c1)"><h3>${L.soft}</h3><ul>${txa(SOFT_SKILLS).map(x => `<li>${x}</li>`).join('')}</ul></div>`;
  const langs = `<div class="sg" data-cat="work" style="--c:var(--c2)"><h3>${L.languages}</h3>${LANGUAGES.map(l => `<p style="margin:0 0 3px">${tx(l.n)} · <small>${tx(l.level)}</small></p><div class="meter" style="margin-bottom:10px"><u style="width:${l.pct}%"></u></div>`).join('')}</div>`;
  return `<div class="flt">${['all', 'code', 'ai', 'data', 'viz', 'work'].map((k, i) => `<button type="button" data-f="${k}" aria-pressed="${!i}">${L['f_' + k]}</button>`).join('')}</div><div class="sk">${groups}${soft}${langs}</div>`; };
R.path = () => { const row = (e, c, bl) => `<li style="--c:var(--c${c})"><small>${dt(e.dates)}${e.place ? ' · ' + tx(e.place) : ''}</small><h3>${tx(e.org)}${e.upcoming ? ` <span class="tag">${tx(e.upcoming)}</span>` : ''}</h3><p>${tx(e.role || e.title)}</p>${bl ? `<ul class="bl">${txa(e.bullets).map(b => `<li>${b}</li>`).join('')}</ul>` : ''}${e.detail ? `<small>${tx(e.detail)}</small>` : ''}</li>`; return `<div class="flt">${[['all', U().f_all], ['exp', U().a_exp], ['edu', U().a_edu]].map(([k, l], i) => `<button type="button" data-pf="${k}" aria-pressed="${!i}">${l}</button>`).join('')}</div><div data-pc="exp"><h3 class="gh x1">${U().a_exp}</h3><ol class="tl-list">${EXPERIENCE.map(e => row(e, 1, 1)).join('')}</ol></div><div data-pc="edu"><h3 class="gh x2">${U().a_edu}</h3><ol class="tl-list">${EDUCATION.map(e => row(e, 2, 0)).join('')}</ol></div>`; };
R.wins = () => { const r = RECOGNITIONS, avg = parseFloat(String(r.avg.es).replace(',', '.')); return `<div class="wg"><div class="tl"><b class="big" data-n="${avg}" data-d="1">${tx(r.avg)}</b><p>${U().r_avg}</p></div><div class="tl"><b class="big" data-n="${r.honors}">${r.honors}</b><p>${U().r_honors}</p></div><div class="tl"><b class="big" data-n="${r.tfg}">${r.tfg}</b><p>${U().r_tfg}</p></div><div class="tl"><p>${U().r_abau}</p></div></div><div class="row"><button class="btn fill" type="button" data-toggle aria-expanded="false" data-a="${U().honors_btn}" data-b="${U().honors_hide}">${U().honors_btn}</button></div><div class="hon" hidden><p><small>${U().honors_note}</small></p><ul class="chp">${HONORS_COURSES.map(c => `<li>${tx(c)}</li>`).join('')}</ul></div>`; };
R.about = () => `<img class="face" src="${SITE.photo}" alt="${SITE.name}">${ABOUT.long[lang] ? ABOUT.long[lang].map(x => `<p>${x}</p>`).join('') : ABOUT.long.es.map(x => `<p>${x}</p>`).join('')}<h3 class="gh x2">${t('life')}</h3>${R.life()}`;
R.contact = () => `<div class="tl"><small>${U().c_email}</small><p class="big" style="word-break:break-all;margin:6px 0 12px">${SITE.email}</p><div class="row" style="margin:0"><button class="btn fill" type="button" data-copy>${t('copy')}</button></div></div><div class="tl" style="margin-top:12px"><small>${U().c_phone}</small><p class="big" style="margin:6px 0 0"><a href="tel:${SITE.phoneLink}" style="text-decoration:none">${SITE.phone}</a></p></div><div class="row"><a class="btn" href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a><a class="btn" href="${SITE.github}" target="_blank" rel="noopener">GitHub</a><a class="btn" href="${SITE.cv[lang] || SITE.cv.es}" download>${U().c_cv}</a><a class="btn" href="${LBASE[lang]}cv/">${t('cvonline')}</a></div>`;
R.welcome = () => { const r = RECOGNITIONS; return `<p class="lead2">${ABOUT.short[lang] || ABOUT.short.es}</p><div class="wg w3"><div class="tl"><b class="big">${tx(r.avg)}</b><p>${U().r_avg}</p></div><div class="tl"><b class="big">${r.honors}</b><p>${U().r_honors}</p></div><div class="tl"><b class="big">${r.tfg}</b><p>${U().r_tfg}</p></div></div><div class="row"><button class="btn fill" type="button" data-go="projects">${t('projects')}</button><button class="btn" type="button" data-go="stack">${t('stack')}</button><a class="btn" href="${SITE.cv[lang] || SITE.cv.es}" download>CV</a></div>`; };
const seg = (lab, name, opts, cur) => `<h4>${lab}</h4><div class="seg">${opts.map(([v, l]) => `<button type="button" data-set="${name}" data-v="${v}" aria-pressed="${String(cur) === String(v)}">${l}</button>`).join('')}</div>`;
R.settings = () => seg(t('theme'), 'theme', [['light', t('light')], ['dark', t('dark')]], document.documentElement.dataset.theme) + seg(t('wall'), 'wall', ['mesh', 'aurora', 'grid', 'dusk', 'hills', 'particles', 'plain'].map(w => [w, t('wall_' + w)]), document.documentElement.dataset.wall) + seg(t('lang'), 'lang', [['es', 'ES'], ['en', 'EN'], ['gl', 'GL']], lang) + seg(t('motion'), 'anim', [[true, t('on')], [false, t('off')]], S.anim !== false) + seg(t('widgets'), 'wdg', [[true, t('on')], [false, t('off')]], S.wdg !== false) + seg(t('sound'), 'sfx', [[true, t('on')], [false, t('off')]], S.sfx === true);
R.p = id => { _sn = 0; const p = PROJECTS.find(x => x.id === id); return `<div class="detail"><img class="hero" ${ims(p.image)} alt=""><small>${tx(p.date)}</small>${p.by ? `<p><small>${tx(p.by)}</small></p>` : ''}<p>${tx(p.short)}</p><div class="lk">${links(p)}</div>${(p.blocks || []).map(blk).join('')}</div>`; };
const titleOf = id => id.startsWith('p:') ? tx(PROJECTS.find(p => p.id === id.slice(2)).title) : t(id);
const body = id => id.startsWith('p:') ? R.p(id.slice(2)) : R[id]();

R.certs = () => CERT_GROUPS.map((g, gi) => { const lim = g.cols ? 5 : 3, many = g.items.length > lim; return `<h3 class="gh x${gi % 2 + 1}">${tx(g.title)}<small>${g.items.length}</small></h3>${g.summary ? `<p><small>${tx(g.summary)}</small></p>` : ''}<div class="cg"><div class="tiles${g.cols ? ' c2' : ''}">${g.items.map((c, i) => { const lg = c.logo || g.logo, f = c.file, x = many && i >= lim; return `<div class="tl cert ${x ? 'xtra' : ''} ${c.featured ? 'feat' : ''}" ${x ? 'hidden' : ''} style="--c:var(--c${(gi + i) % 2 + 1})">${f ? `<a class="th" href="${f}" target="_blank" rel="noopener" aria-label="${U().cert_view}"><canvas width="3" height="4" data-pdf="${f}"></canvas></a>` : ''}<div class="cb2"><div class="ch">${lg ? `<img class="cl" src="${lg}" alt="">` : ''}<b>${tx(c.title)}</b></div>${c.meta ? `<p>${tx(c.meta)}</p>` : ''}${f ? `<a class="btn" href="${f}" target="_blank" rel="noopener">${U().cert_view}</a>` : ''}</div></div>`; }).join('')}</div>${many ? `<button class="btn plus" type="button" data-more aria-expanded="false" data-a="+ ${t('more')} (${g.items.length})" data-b="&minus; ${t('less')}">+ ${t('more')} (${g.items.length})</button>` : ''}</div>`; }).join('');
R.life = () => `<p class="lead2">${tx(PERSONAL_INTRO)}</p><div class="tiles">${INTERESTS.map((it, i) => `<div class="tl" style="--c:var(--c${i % 2 + 1})"><b class="ti">${(it.icon || '').split(' ').filter(Boolean).map(n => ico(n)).join('')}<span>${tx(it.title)}</span></b><p>${tx(it.text)}</p></div>`).join('')}</div>${SITE.lifePhotos.map(ph => `<figure class="ph"><img src="${ph.src}" alt="${tx(ph.alt)}" loading="lazy"></figure>`).join('')}`;

/* Miniatura de respaldo: si no hay .jpg junto al PDF, se previsualiza el propio PDF */
/* Miniaturas: se dibujan desde el propio PDF con pdf.js incluido en assets/vendor/pdfjs (sin CDN ni JPG). Respeta vertical/horizontal. */
let pdfjsP;
const pdfjs = () => pdfjsP || (pdfjsP = import(new URL('assets/vendor/pdfjs/pdf.min.js', document.baseURI).href).then(m => { m.GlobalWorkerOptions.workerSrc = new URL('assets/vendor/pdfjs/pdf.worker.min.js', document.baseURI).href; return m; }));
/* Respaldo: PDF incrustado con la proporción real de la 1.ª página (se lee de /MediaBox) para evitar huecos oscuros; muestra el motivo del fallo de pdf.js */
function thumbFallback(cv, a, err) {
  const file = location.protocol === 'file:', msg = String((err && err.message) || err); console.warn(file ? 'Abierto como archivo (file://): usa un servidor local o GitHub Pages para ver las miniaturas.' : 'pdf.js falló:', cv.dataset.pdf, err);
  (file ? Promise.reject() : fetch(cv.dataset.pdf)).then(r => r.arrayBuffer()).then(b => { const m = new TextDecoder('latin1').decode(b).match(/\/MediaBox\s*\[\s*([\d.\-]+)\s+([\d.\-]+)\s+([\d.\-]+)\s+([\d.\-]+)/); return m ? (m[3] - m[1]) / (m[4] - m[2]) : 0.75; }).catch(() => 0.75).then(r => {
    const f = document.createElement('iframe'); f.src = cv.dataset.pdf + '#toolbar=0&navpanes=0&scrollbar=0&view=Fit'; f.tabIndex = -1; f.title = '';
    a.classList.add('emb'); if (r > 1) a.classList.add('land'); a.style.aspectRatio = String(r); cv.replaceWith(f);
    if (!file) a.insertAdjacentHTML('afterend', '<small class="perr">pdf.js: ' + msg.replace(/</g, '&lt;') + '</small>');
  });
}
function thumbs(root) {
  $$('canvas[data-pdf]', root).forEach(cv => {
    if (cv.dataset.done) return; cv.dataset.done = 1; const a = cv.parentNode;
    pdfjs().then(m => m.getDocument(cv.dataset.pdf).promise).then(d => d.getPage(1)).then(p => {
      const v0 = p.getViewport({ scale: 1 }), v = p.getViewport({ scale: 420 / v0.width });
      cv.width = v.width; cv.height = v.height; if (v0.width > v0.height) a.classList.add('land');
      return p.render({ canvasContext: cv.getContext('2d'), viewport: v }).promise;
    }).catch(err => thumbFallback(cv, a, err));
  });
}
R.trash = () => `<div class="trashv">${ico('trash')}<p>${t('trashmsg')}</p></div>`;
