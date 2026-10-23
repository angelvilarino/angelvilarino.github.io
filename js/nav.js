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
/* Selector de idioma desplegable */
const lm = $('#lngm');
lm.innerHTML = [['es', 'Español'], ['en', 'English'], ['gl', 'Galego']].map(([c, n]) => `<li><button type="button" role="option" data-l="${c}"><b class="mono">${c.toUpperCase()}</b>${n}</button></li>`).join('');
const lmClose = () => { lm.hidden = true; $('#lng').setAttribute('aria-expanded', 'false'); };
$('#lng').addEventListener('click', e => { e.stopPropagation(); lm.hidden = !lm.hidden; $('#lng').setAttribute('aria-expanded', String(!lm.hidden)); if (!lm.hidden) $('button', lm).focus(); });
lm.addEventListener('click', e => { const b = e.target.closest('[data-l]'); if (!b) return; lang = b.dataset.l; store.s('lang', lang); lmClose(); rerender(); $('#lng').focus(); });
document.addEventListener('click', e => { if (!e.target.closest('#lngd')) lmClose(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') lmClose(); });
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
  if (e.key === 'Escape') { if (!lp.hidden) lpClose(); else { const a = $('.win.act:not(.min)', wins); if (a) close(a); } }
  if (e.key === 'Tab' && !lp.hidden) { const f = $$('button,input', lp); const i = f.indexOf(document.activeElement); const n = f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length]; n.focus(); e.preventDefault(); }
});
document.addEventListener('click', e => {
  const g = e.target.closest('[data-go]'); if (g && !e.target.closest('.lk a')) { e.preventDefault(); if (!lp.hidden) lpClose(); if (scrollY > 10) scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); go(g.dataset.go); return; }
  const d = e.target.closest('[data-d]'); if (d) { const w = $(`.win[data-id="${CSS.escape(d.dataset.d)}"]`); if (w.classList.contains('min') || !w.classList.contains('act')) { w.classList.remove('min'); focusWin(w); } else { w.classList.add('min'); dockSync(); } return; }
  const f = e.target.closest('[data-f]'); if (f) { const r = f.closest('.body'); $$('[data-f]', r).forEach(b => b.setAttribute('aria-pressed', b === f)); $$('.sg', r).forEach(s => s.hidden = f.dataset.f !== 'all' && s.dataset.cat !== f.dataset.f); return; }
  const s = e.target.closest('[data-set]'); if (s) { const v = s.dataset.v, k = s.dataset.set; if (k === 'lang') { lang = v; store.s('lang', lang); rerender(); } else setS(k, v === 'true' ? true : v === 'false' ? false : v); }
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
