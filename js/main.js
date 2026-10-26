/* Ángel OS · Arranque */
'use strict';
applySet(); paintUI();
/* El HTML estático (#seo) es el contenido para buscadores y usuarios sin JS: al arrancar se sustituye por la interfaz */
const seo = $('#seo'); if (seo) seo.remove();

/* Restaurar TODAS las ventanas guardadas (con su estado) y, encima, la que indique la URL */
const okId = id => APPS.some(a => a[0] === id) || (id.startsWith('p:') && PROJECTS.some(p => p.id === id.slice(2)));
const saved = store.g('open2', []).filter(okId), st = store.g('st2', {});
const lastAct = saved.find(id => (st[id] || '').includes('a'));
const winOf = id => $(`.win[data-id="${CSS.escape(id)}"]`, wins);
saved.forEach(open);
saved.forEach(id => { const w = winOf(id), s = st[id] || ''; if (!w) return; if (s.includes('m')) w.classList.add('min'); if (s.includes('x')) w.classList.add('max'); });
const routed = route();
if (!saved.length && !routed) (mob() ? ['projects'] : ['projects', 'welcome']).forEach(open);
else if (!routed && lastAct) { const w = winOf(lastAct); if (w && !w.classList.contains('min')) focusWin(w); }
settle();   // sincroniza URL, título y barra con la ventana que quede arriba

const boot = $('#boot');
if (store.g('booted', false) || reduce) boot.remove(); else { store.s('booted', true); const off = () => { boot.classList.add('off'); setTimeout(() => boot.remove(), 450); }; boot.addEventListener('click', off); setTimeout(off, 1700); }

/* Service worker (solo en https): caché de recursos con huella y modo offline. Las páginas se piden siempre a la red primero. */
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('/sw.js').catch(() => {});
