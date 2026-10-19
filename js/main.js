/* Ángel OS · Arranque */
'use strict';
/* ---- Arranque ---- */
applySet(); paintUI();
if (!route()) { const o = store.g('open2', []).filter(id => id === 'projects' || APPS.some(a => a[0] === id) || (id.startsWith('p:') && PROJECTS.some(p => p.id === id.slice(2)))); (o.length ? o : (mob() ? ['projects'] : ['projects', 'welcome'])).forEach(open); }
const boot = $('#boot');
if (store.g('booted', false) || reduce) boot.remove(); else { store.s('booted', true); const off = () => { boot.classList.add('off'); setTimeout(() => boot.remove(), 450); }; boot.addEventListener('click', off); setTimeout(off, 1700); }
