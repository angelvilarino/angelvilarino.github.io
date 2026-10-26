/* Ángel OS · Ventanas y router */
'use strict';
/* ---- Ventanas ---- */
const wins = $('#wins'); let z = 10;
const HOME_TITLE = document.body.dataset.home || document.title;
const pos = store.g('pos2', {});
const openIds = () => $$('.win', wins).map(w => w.dataset.id);
/* Se guarda qué ventanas hay, cuál está activa (a), minimizada (m) o maximizada (x) para restaurarlas al recargar */
const persist = () => { store.s('open2', openIds()); store.s('pos2', pos); store.s('st2', Object.fromEntries($$('.win', wins).map(w => [w.dataset.id, (w.classList.contains('min') ? 'm' : '') + (w.classList.contains('max') ? 'x' : '') + (w.classList.contains('act') ? 'a' : '')]))); };
function fill(w) { const id = w.dataset.id; $('.tb b', w).textContent = titleOf(id); $('.body', w).innerHTML = body(id); w.setAttribute('aria-label', titleOf(id)); countUp(w); thumbs(w); }
/* La URL y el título de la pestaña siguen a la ventana activa */
const urlFor = id => id.startsWith('p:') ? projUrl(lang, id.slice(2)) : LBASE[lang] + '#/' + slug(id);
function syncUrl(w) { const id = w && w.dataset.id; history.replaceState(null, '', id ? urlFor(id) : LBASE[lang]); document.title = id ? `${titleOf(id)} | ${SITE.name}` : HOME_TITLE; }
const topWin = () => $$('.win:not(.min):not(.out)', wins).sort((a, b) => (+b.style.zIndex || 0) - (+a.style.zIndex || 0))[0];
/* Tras cerrar o minimizar: pasa a estar activa la ventana que queda encima (o se limpia la URL si no queda ninguna) */
function settle() { const a = topWin(); if (a) return focusWin(a); $$('.win', wins).forEach(x => x.classList.remove('act')); $('#appname').textContent = ''; syncUrl(null); dockSync(); compact(); persist(); }
function focusWin(w) { $$('.win', wins).forEach(x => x.classList.toggle('act', x === w)); w.style.zIndex = ++z; $('#appname').textContent = $('.tb b', w).textContent; syncUrl(w); compact(); dockSync(); persist(); }
function make(id) {
  const n = openIds().length, big = id === 'projects' || id.startsWith('p:');
  const pw = Math.min(740, Math.round(innerWidth * .47)), wx = 128 + pw, sv = pos[id] || (id === 'projects' ? { x: 110, y: 84, w: pw, h: Math.min(600, innerHeight - 150) } : id === 'trash' ? { x: 320, y: 220, w: 340, h: 250 } : id === 'welcome' ? { x: wx, y: 84, w: Math.max(320, Math.min(460, innerWidth - wx - 220)), h: Math.min(470, innerHeight - 150) } : { x: 140 + n * 34, y: 90 + n * 30, w: Math.min(big ? 820 : 640, innerWidth - 300), h: Math.min(big ? 600 : 500, innerHeight - 150) });
  const w = document.createElement('section');
  w.className = 'win'; w.dataset.id = id; w.setAttribute('role', 'dialog'); w.tabIndex = -1; if (mob()) w.setAttribute('aria-modal', 'true');
  w.innerHTML = `<header class="tb"><span class="dots"><button class="x" type="button" aria-label="${t('winclose')}"></button><button class="m" type="button" aria-label="${t('winmin')}"></button><button class="z" type="button" aria-label="${t('winmax')}"></button></span><b></b></header><div class="body"></div>`;
  Object.assign(w.style, { width: sv.w + 'px', height: sv.h + 'px', translate: `${sv.x}px ${sv.y}px` });
  w.dataset.x = sv.x; w.dataset.y = sv.y;
  wins.appendChild(w); fill(w); dragify(w, $('.tb', w), w, id);
  w.addEventListener('pointerdown', () => focusWin(w));
  w.addEventListener('pointerup', () => { if (!mob() && !w.classList.contains('max')) { pos[id] = { ...pos[id], w: w.offsetWidth, h: w.offsetHeight, x: +w.dataset.x, y: +w.dataset.y }; persist(); } });
  return w;
}
function open(id) { let w = $(`.win[data-id="${CSS.escape(id)}"]`, wins); if (!w) { sfx('open'); const from = document.activeElement; w = make(id); w._from = from; } w.classList.remove('min'); focusWin(w); w.focus({ preventScroll: true }); }
function close(w) { sfx('close'); w.classList.add('out'); setTimeout(() => { const from = w._from; w.remove(); settle(); if (from && from.isConnected && from.focus) from.focus({ preventScroll: true }); }, 200); }
function go(id) { open(id); }
function dragify(el, handle, target, id) {
  handle.addEventListener('pointerdown', e => {
    if (e.target.closest('button') || mob() || target.classList.contains('max')) return;
    const sx = e.clientX - (+target.dataset.x), sy = e.clientY - (+target.dataset.y); handle.setPointerCapture(e.pointerId);
    let raf = 0;
    const mv = ev => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; const x = Math.max(-target.offsetWidth + 80, Math.min(innerWidth - 80, ev.clientX - sx)), y = Math.max(0, Math.min(innerHeight - 60, ev.clientY - sy)); target.dataset.x = x; target.dataset.y = y; target.style.translate = `${x}px ${y}px`; }); };
    const up = () => { handle.removeEventListener('pointermove', mv); handle.removeEventListener('pointerup', up); };
    handle.addEventListener('pointermove', mv); handle.addEventListener('pointerup', up);
  });
}
function dockSync() {
  $('#dock').innerHTML = $$('.win', wins).map(w => `<button type="button" data-d="${w.dataset.id}" class="${w.classList.contains('act') && !w.classList.contains('min') ? 'on' : ''}" aria-label="${$('.tb b', w).textContent}">${ico(iconOf(w.dataset.id))}</button>`).join('');
}
wins.addEventListener('click', e => {
  const w = e.target.closest('.win'); if (!w) return;
  if (e.target.closest('.x')) close(w);
  else if (e.target.closest('.m')) { sfx('min'); w.classList.add('min'); settle(); }
  else if (e.target.closest('.z')) { w.classList.toggle('max'); compact(); persist(); }
});

/* ---- Contadores, render, router ---- */
const cuFmt = (el, v) => {
  const d = +el.dataset.d || 0, en = lang === 'en', [i, f] = v.toFixed(d).split('.');
  return (el.dataset.pre || '') + (el.dataset.grp ? i.replace(/\B(?=(\d{3})+$)/g, en ? ',' : '.') : i) + (f ? (en ? '.' : ',') + f : '') + (el.dataset.suf || '');
};
const cuRun = el => {
  const to = parseFloat(el.dataset.n), t0 = performance.now();
  const f = n => { const p = Math.min(1, (n - t0) / 1100); el.textContent = cuFmt(el, to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); };
  requestAnimationFrame(f);
};
/* Se anima cuando el contador entra en pantalla (antes corría al abrir la ventana, aunque estuviera fuera de vista) */
const cuIO = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { cuIO.unobserve(e.target); cuRun(e.target); } }), { threshold: .4 }) : null;
function countUp(root) {
  $$('[data-n]', root).forEach(el => {
    if (S.anim === false || reduce) { el.textContent = cuFmt(el, parseFloat(el.dataset.n)); return; }
    cuIO ? cuIO.observe(el) : cuRun(el);
  });
}
function paintUI() {
  document.documentElement.lang = lang;
  $('#lng').textContent = lang.toUpperCase();
  $('#thm').innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`;
  $('#thm').setAttribute('aria-label', t('theme')); $('#lpb').innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><circle cx="5" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="19" r="2"/></svg>`;
  $('#lpb').setAttribute('aria-label', 'Launchpad'); $('#wname').textContent = SITE.name; $('#wrole').textContent = U().role; $('#fcs').setAttribute('aria-label', t('focus')); $('#fcs').title = t('focus'); $('#lng').setAttribute('aria-label', t('lang')); $('#lps').placeholder = t('search'); $('#lps').setAttribute('aria-label', t('search'));
  const appBtn = (a, i) => `<button class="ic" type="button" data-go="${a[0]}" style="--i:${i}"><i>${ico(a[2])}</i>${t(a[0])}</button>`;
  $('#icons').innerHTML = APPS.filter(a => a[0] !== 'trash').map(appBtn).join(''); $('#trash').innerHTML = ico('trash'); $('#trash').setAttribute('aria-label', t('trash')); $('#trash').title = t('trash');
  $('#fab').textContent = t('lets'); $('#cta').textContent = t('copy'); $('#cli').href = SITE.linkedin; $('#cgh').href = SITE.github;
  $('#ctacv').textContent = t('cv'); $('#ctacv').href = SITE.cv[lang] || SITE.cv.es; $('#back').textContent = t('back'); $('#favail').textContent = t('avail');
  $('#f-apps').innerHTML = APPS.slice(0, 4).map(a => `<a href="${LBASE[lang]}#/${a[1]}" data-go="${a[0]}">${t(a[0])}</a>`).join('');
  $('#f-soc').innerHTML = `<a href="${SITE.github}" target="_blank" rel="noopener">GitHub</a><a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a><button class="lnk" type="button" data-copy>${SITE.email}</button><a href="tel:${SITE.phoneLink}">${SITE.phone}</a><a href="${LBASE[lang]}cv/">${t('cvonline')}</a>`;
  $('.legal').textContent = `© ${new Date().getFullYear()} ${SITE.name} · HTML, CSS, JS` + (SITE.analytics && SITE.analytics.goatcounter ? ' · ' + t('stats') : '');
  $('#wcity').textContent = CFG.city;
  /* widget de CV: descarga el PDF o abre el CV online */
  const cv = $('#bcv'); cv.href = SITE.cv[lang] || SITE.cv.es; cv.setAttribute('aria-label', t('cv'));
  const cw = $('#bcvw'); cw.textContent = t('cvweb'); cw.href = LBASE[lang] + 'cv/';
  $('#ghl').textContent = t('ghlast');
}
/* Rutas: /proyectos/<id>/ (URL real) y #/<app> (ventanas); #/proyectos/<id> antiguo se reescribe a la URL real */
const ALIAS = { projects: 'projects', stack: 'stack', about: 'about', 'vida-personal': 'about' };
function route() {
  const [a, b] = location.hash.replace(/^#\/?/, '').split('/');
  if (b && Object.values(PSEG).includes(a) && PROJECTS.some(p => p.id === b)) { go('p:' + b); return 'p:' + b; }
  const m = ALIAS[a] || (APPS.find(x => x[1] === a) || [])[0];
  if (m) { open(m); return m; }
  const pid = pathProject();
  if (pid) { open('p:' + pid); return 'p:' + pid; }
  return false;
}
window.addEventListener('hashchange', route);
