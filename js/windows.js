/* Ángel OS · Ventanas y router */
'use strict';
/* ---- Ventanas ---- */
const wins = $('#wins'); let z = 10;
const pos = store.g('pos2', {});
const openIds = () => $$('.win', wins).map(w => w.dataset.id);
const persist = () => { store.s('open2', openIds()); store.s('pos2', pos); };
function fill(w) { const id = w.dataset.id; $('.tb b', w).textContent = titleOf(id); $('.body', w).innerHTML = body(id); w.setAttribute('aria-label', titleOf(id)); countUp(w); thumbs(w); }
function focusWin(w) { $$('.win', wins).forEach(x => x.classList.toggle('act', x === w)); w.style.zIndex = ++z; $('#appname').textContent = $('.tb b', w).textContent; compact(); dockSync(); }
function make(id) {
  const n = openIds().length, big = id === 'projects' || id.startsWith('p:');
  const pw = Math.min(740, Math.round(innerWidth * .47)), wx = 128 + pw, sv = pos[id] || (id === 'projects' ? { x: 110, y: 84, w: pw, h: Math.min(600, innerHeight - 150) } : id === 'trash' ? { x: 320, y: 220, w: 340, h: 250 } : id === 'welcome' ? { x: wx, y: 84, w: Math.max(320, Math.min(460, innerWidth - wx - 220)), h: Math.min(470, innerHeight - 150) } : { x: 140 + n * 34, y: 90 + n * 30, w: Math.min(big ? 820 : 640, innerWidth - 300), h: Math.min(big ? 600 : 500, innerHeight - 150) });
  const w = document.createElement('section');
  w.className = 'win'; w.dataset.id = id; w.setAttribute('role', 'dialog'); w.tabIndex = -1;
  w.innerHTML = `<header class="tb"><span class="dots"><button class="x" type="button" aria-label="Close"></button><button class="m" type="button" aria-label="Minimize"></button><button class="z" type="button" aria-label="Maximize"></button></span><b></b></header><div class="body"></div>`;
  Object.assign(w.style, { width: sv.w + 'px', height: sv.h + 'px', translate: `${sv.x}px ${sv.y}px` });
  w.dataset.x = sv.x; w.dataset.y = sv.y;
  wins.appendChild(w); fill(w); dragify(w, $('.tb', w), w, id);
  w.addEventListener('pointerdown', () => focusWin(w));
  w.addEventListener('pointerup', () => { if (!mob() && !w.classList.contains('max')) { pos[id] = { ...pos[id], w: w.offsetWidth, h: w.offsetHeight, x: +w.dataset.x, y: +w.dataset.y }; persist(); } });
  return w;
}
function open(id) { let w = $(`.win[data-id="${CSS.escape(id)}"]`, wins) || (sfx('open'), make(id)); w.classList.remove('min'); focusWin(w); persist(); w.focus({ preventScroll: true }); }
function close(w) { sfx('close'); w.classList.add('out'); setTimeout(() => { w.remove(); persist(); dockSync(); compact(); const a = $$('.win:not(.min)', wins).pop(); $('#appname').textContent = a ? $('.tb b', a).textContent : ''; }, 200); }
function go(id) { open(id); history.replaceState(null, '', location.pathname + location.search + '#/' + slug(id)); }
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
  else if (e.target.closest('.m')) { sfx('min'); w.classList.add('min'); dockSync(); compact(); }
  else if (e.target.closest('.z')) { w.classList.toggle('max'); compact(); }
});

/* ---- Contadores, render, router ---- */
function countUp(root) {
  $$('[data-n]', root).forEach(el => {
    const to = parseFloat(el.dataset.n), d = +el.dataset.d || 0; if (S.anim === false || reduce) return;
    const t0 = performance.now(), f = n => { const p = Math.min(1, (n - t0) / 1100), v = to * (1 - Math.pow(1 - p, 3)); el.textContent = v.toFixed(d).replace('.', lang === 'en' ? '.' : ','); if (p < 1) requestAnimationFrame(f); }; requestAnimationFrame(f);
  });
}
function paintUI() {
  document.documentElement.lang = lang;
  document.title = `${SITE.name} | ${U().role}`;
  $('#lng').textContent = lang.toUpperCase();
  $('#thm').innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`;
  $('#thm').setAttribute('aria-label', t('theme')); $('#lpb').innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><circle cx="5" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="19" r="2"/></svg>`;
  $('#lpb').setAttribute('aria-label', 'Launchpad'); $('#wname').textContent = SITE.name; $('#wrole').textContent = U().role; $('#fcs').setAttribute('aria-label', t('focus')); $('#fcs').title = t('focus'); $('#lng').setAttribute('aria-label', t('lang')); $('#lps').placeholder = t('search'); $('#lps').setAttribute('aria-label', t('search'));
  const appBtn = (a, i) => `<button class="ic" type="button" data-go="${a[0]}" style="--i:${i}"><i>${ico(a[2])}</i>${t(a[0])}</button>`;
  $('#icons').innerHTML = APPS.filter(a => a[0] !== 'trash').map(appBtn).join(''); $('#trash').innerHTML = ico('trash'); $('#trash').setAttribute('aria-label', t('trash')); $('#trash').title = t('trash');
  $('#fab').textContent = t('lets'); $('#cta').textContent = t('copy'); $('#cli').href = SITE.linkedin; $('#cgh').href = SITE.github;
  $('#ctacv').textContent = t('cv'); $('#ctacv').href = SITE.cv[lang] || SITE.cv.es; $('#back').textContent = t('back'); $('#favail').textContent = t('avail');
  $('#f-apps').innerHTML = APPS.slice(0, 4).map(a => `<a href="#/${a[1]}" data-go="${a[0]}">${t(a[0])}</a>`).join('');
  $('#f-soc').innerHTML = `<a href="${SITE.github}" target="_blank" rel="noopener">GitHub</a><a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a><button class="lnk" type="button" data-copy>${SITE.email}</button><a href="tel:${SITE.phoneLink}">${PHONE}</a>`;
  $('.legal').textContent = `© ${new Date().getFullYear()} ${SITE.name} · HTML, CSS, JS`;
  $('#wcity').textContent = CFG.city;
}
function rerender() { paintUI(); $$('.win', wins).forEach(fill); dockSync(); }
function route() {
  const [a, b] = location.hash.replace(/^#\/?/, '').split('/');
  const m = { projects: 'projects', proyectos: 'projects', stack: 'stack', habilidades: 'stack', inicio: 'welcome', trayectoria: 'path', logros: 'wins', 'sobre-mi': 'about', about: 'about', 'vida-personal': 'about', contacto: 'contact', ajustes: 'settings' }[a];
  if (m === 'projects' && b && PROJECTS.some(p => p.id === b)) open('p:' + b); else if (m) open(m); else return false; return true;
}
window.addEventListener('hashchange', route);
