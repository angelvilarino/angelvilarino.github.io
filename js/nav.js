/* Ángel OS · Navbar, Launchpad, atajos y cierre */
'use strict';
/* ---- Navbar, Launchpad, atajos ---- */
let idle = 0;
const bar = $('#bar');
function compact() { bar.classList.toggle('compact', !!$('.win.max:not(.min)') || mob()); clearTimeout(idle); idle = setTimeout(() => bar.classList.add('compact'), 8000); }
['pointermove', 'keydown'].forEach(ev => addEventListener(ev, () => { if (!$('.win.max:not(.min)') && !mob()) { bar.classList.remove('compact'); compact(); } }, { passive: true }));
const lp = $('#lp'); let lastFocus;
function lpOpen() { lastFocus = document.activeElement; lp.hidden = false; $('#lps').value = ''; lpFill(''); $('#lps').focus(); }
function lpClose() { lp.hidden = true; if (lastFocus) lastFocus.focus(); }
function lpFill(q) { $('#lpg').innerHTML = APPS.filter(a => a[0] !== 'trash' && t(a[0]).toLowerCase().includes(q.toLowerCase())).map((a, i) => `<button class="ic" type="button" data-go="${a[0]}" style="--i:${i}"><i>${ico(a[2])}</i>${t(a[0])}</button>`).join(''); }
$('#lps').addEventListener('input', e => lpFill(e.target.value));
$('#lpb').addEventListener('click', lpOpen); $('#lpx').addEventListener('click', lpClose);
/* Selector de idioma: patrón "menú" accesible (flechas, Inicio/Fin, Esc) */
const lm = $('#lngm');
lm.innerHTML = [['es', 'Español'], ['en', 'English'], ['gl', 'Galego']].map(([c, n]) => `<li role="none"><button type="button" role="menuitemradio" aria-checked="${c === lang}" tabindex="-1" lang="${c}" data-l="${c}"><b class="mono">${c.toUpperCase()}</b>${n}</button></li>`).join('');
const lmItems = () => $$('[role=menuitemradio]', lm);
const lmClose = () => { lm.hidden = true; $('#lng').setAttribute('aria-expanded', 'false'); };
const lmOpen = () => { lm.hidden = false; $('#lng').setAttribute('aria-expanded', 'true'); const it = lmItems(); (it.find(b => b.dataset.l === lang) || it[0]).focus(); };
$('#lng').addEventListener('click', e => { e.stopPropagation(); lm.hidden ? lmOpen() : lmClose(); });
$('#lng').addEventListener('keydown', e => { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); lmOpen(); } });
lm.addEventListener('keydown', e => {
  const it = lmItems(), i = it.indexOf(document.activeElement), k = e.key;
  if (k === 'ArrowDown') it[(i + 1) % it.length].focus(); else if (k === 'ArrowUp') it[(i - 1 + it.length) % it.length].focus();
  else if (k === 'Home') it[0].focus(); else if (k === 'End') it[it.length - 1].focus(); else if (k === 'Tab') { lmClose(); return; } else return;
  e.preventDefault();
});
/* Cambiar de idioma = ir a la URL de ese idioma */
const switchLang = l => { if (l !== lang) location.href = langUrl(l); };   // las ventanas abiertas ya están guardadas
lm.addEventListener('click', e => { const b = e.target.closest('[data-l]'); if (!b) return; lmClose(); switchLang(b.dataset.l); $('#lng').focus(); });
document.addEventListener('click', e => { if (!e.target.closest('#lngd')) lmClose(); });
/* Modo enfoque: oculta widgets y foto */
$('#fcs').innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
$('#fcs').addEventListener('click', () => { setS('wdg', S.wdg === false); $('#fcs').setAttribute('aria-pressed', String(S.wdg === false)); });
/* "Hablemos" baja al footer */
$('#fab').addEventListener('click', e => { e.preventDefault(); scrollTo({ top: innerHeight, behavior: reduce ? 'auto' : 'smooth' }); });
/* Copiar correo con aviso */
function toast(m) { const el = $('#toast'); el.textContent = m; el.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('show'), 2200); }
document.addEventListener('click', e => {
  if (!e.target.closest('[data-copy]')) return;
  const done = () => toast(t('copied'));
  (navigator.clipboard ? navigator.clipboard.writeText(SITE.email) : Promise.reject()).then(done).catch(() => { const ta = document.createElement('textarea'); ta.value = SITE.email; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (x) {} ta.remove(); done(); });
});
$('#thm').addEventListener('click', () => setS('theme', document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); lp.hidden ? lpOpen() : lpClose(); return; }
  if (e.key === 'Escape') { if (!lm.hidden) { lmClose(); $('#lng').focus(); } else if (!lp.hidden) lpClose(); else { const a = $('.win.act:not(.min)', wins); if (a) close(a); } }
  /* Foco atrapado en la hoja activa (móvil/tablet, donde la ventana ocupa casi toda la pantalla) */
  if (e.key === 'Tab' && lp.hidden && mob()) {
    const a = $('.win.act:not(.min)', wins);
    if (a) { const f = $$('a[href],button:not([disabled]),input,summary,[tabindex]:not([tabindex="-1"])', a).filter(x => !x.closest('[hidden]')), i = f.indexOf(document.activeElement);
      if (f.length && (i === -1 || (e.shiftKey && i === 0) || (!e.shiftKey && i === f.length - 1))) { e.preventDefault(); f[e.shiftKey ? f.length - 1 : 0].focus(); } }
  }
  if (e.key === 'Tab' && !lp.hidden) { const f = $$('button,input', lp); const i = f.indexOf(document.activeElement); const n = f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length]; n.focus(); e.preventDefault(); }
});
document.addEventListener('click', e => {
  const g = e.target.closest('[data-go]'); if (g && !e.target.closest('.lk a')) { e.preventDefault(); if (!lp.hidden) lpClose(); if (scrollY > 10) scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); go(g.dataset.go); return; }
  const d = e.target.closest('[data-d]'); if (d) { const w = $(`.win[data-id="${CSS.escape(d.dataset.d)}"]`); if (w.classList.contains('min') || !w.classList.contains('act')) { w.classList.remove('min'); focusWin(w); } else { w.classList.add('min'); settle(); } return; }
  const f = e.target.closest('[data-f]'); if (f) { const r = f.closest('.body'); $$('[data-f]', r).forEach(b => b.setAttribute('aria-pressed', b === f)); $$('.sg', r).forEach(s => s.hidden = f.dataset.f !== 'all' && s.dataset.cat !== f.dataset.f); return; }
  const s = e.target.closest('[data-set]'); if (s) { const v = s.dataset.v, k = s.dataset.set; if (k === 'lang') switchLang(v); else setS(k, v === 'true' ? true : v === 'false' ? false : v); }
});
document.addEventListener('submit', e => { if (e.target.id === 'mf') { e.preventDefault(); const f = new FormData(e.target); location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(f.get('s'))}&body=${encodeURIComponent(f.get('b'))}`; } });
$('#back').addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

/* ---- Cierre de sesión: cortina + progreso ---- */
addEventListener('scroll', () => { const y = scrollY, h = innerHeight; $('#prog').style.transform = `scaleX(${Math.min(1, y / h)})`; $('#end').inert = y < h * 0.4; }, { passive: true });


/* Alt+. cambia entre ventanas abiertas (Alt+Tab lo reserva el navegador) */
document.addEventListener('keydown', e => { if (e.altKey && e.key === '.') { const l = $$('.win:not(.min)', wins); if (l.length) { e.preventDefault(); focusWin(l[(l.indexOf($('.win.act', wins)) + 1) % l.length]); } } });

/* Botón que despliega/oculta (asignaturas con matrícula) */
document.addEventListener('click', e => { const b = e.target.closest('[data-toggle]'); if (!b) return; const p = b.closest('.body').querySelector('.hon'); p.hidden = !p.hidden; b.setAttribute('aria-expanded', String(!p.hidden)); b.textContent = p.hidden ? b.dataset.a : b.dataset.b; });

/* Ver todos (+), PDF embebido y selector de Trayectoria */
document.addEventListener('click', e => {
  const m = e.target.closest('[data-more]');
  if (m) { const w = m.closest('.cg'), op = m.getAttribute('aria-expanded') !== 'true'; $$('.xtra', w).forEach(x => x.hidden = !op); m.setAttribute('aria-expanded', String(op)); m.innerHTML = op ? m.dataset.b : m.dataset.a; return; }
  const pf = e.target.closest('[data-pf]');
  if (pf) { const r = pf.closest('.body'); $$('[data-pf]', r).forEach(b => b.setAttribute('aria-pressed', b === pf)); $$('[data-pc]', r).forEach(s => s.hidden = pf.dataset.pf !== 'all' && s.dataset.pc !== pf.dataset.pf); }
});

/* pdf.js se descarga solo al abrir Certificaciones; al acercarse a su icono se empieza a precargar */
let warmed = 0;
const warm = e => { if (!warmed && e.target.closest && e.target.closest('[data-go="certs"]')) { warmed = 1; pdfjs().catch(() => {}); } };
document.addEventListener('pointerover', warm, { passive: true }); document.addEventListener('focusin', warm);

/* Eventos de uso (no hace nada sin GoatCounter): abrir ventana, descargar CV, copiar correo, enlaces salientes */
document.addEventListener('click', e => {
  const g = e.target.closest('[data-go]'); if (g) track('open/' + g.dataset.go);
  if (e.target.closest('[data-copy]')) track('copy-email');
  const a = e.target.closest('a[href]'); if (!a) return;
  if (a.hasAttribute('download')) track('cv-download');
  else if (a.protocol === 'mailto:' || a.protocol === 'tel:') track(a.protocol.slice(0, -1));
  else if (a.hostname && a.hostname !== location.hostname) track('out/' + a.hostname);
});
