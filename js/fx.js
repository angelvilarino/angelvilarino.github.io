/* Ángel OS · Cursor, partículas y pestañas */
'use strict';
/* ---- Botones magnéticos (el cursor es el nativo del sistema, como en macOS) ---- */
if (fine && !reduce) {
  document.addEventListener('pointermove', e => { const m = e.target.closest('.mag'); if (m) { const r = m.getBoundingClientRect(); m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .25}px)`; } }, { passive: true });
  document.addEventListener('pointerout', e => { const m = e.target.closest && e.target.closest('.mag'); if (m) m.style.transform = ''; });
}
/* Brillo del nombre del pie */
document.addEventListener('pointermove', e => { const n = e.target.closest && e.target.closest('.name'); if (n) { const r = n.getBoundingClientRect(); n.style.setProperty('--mx', e.clientX - r.left + 'px'); n.style.setProperty('--my', e.clientY - r.top + 'px'); } }, { passive: true });

/* ---- Fondo de partículas (canvas, se pausa si la pestaña no se ve o hay animaciones off) ---- */
const pc = $('#pc'), px = pc.getContext('2d'); let pts = [], praf = 0, pW = 0, pH = 0, pD = 1;
function pRun() {
  cancelAnimationFrame(praf);
  const h = document.documentElement, is = h.dataset.wall === 'particles', calm = h.classList.contains('calm');
  pc.hidden = !is; if (!is) return;
  pD = Math.min(devicePixelRatio || 1, 2); pW = pc.width = innerWidth * pD; pH = pc.height = innerHeight * pD;
  const cs = getComputedStyle(h), cols = [cs.getPropertyValue('--ac').trim(), cs.getPropertyValue('--a2').trim()];
  pts = Array.from({ length: mob() ? 40 : 80 }, (_, i) => ({ x: Math.random() * pW, y: Math.random() * pH, vx: (Math.random() - .5) * .5 * pD, vy: (Math.random() - .5) * .5 * pD, c: cols[i % 2] }));
  const step = () => {
    px.clearRect(0, 0, pW, pH); const L = 130 * pD; px.lineWidth = pD;
    pts.forEach(p => { if (!calm) { p.x = (p.x + p.vx + pW) % pW; p.y = (p.y + p.vy + pH) % pH; } });
    pts.forEach((a, i) => { px.fillStyle = a.c; px.globalAlpha = .8; px.beginPath(); px.arc(a.x, a.y, 2.2 * pD, 0, 6.283); px.fill();
      for (let j = i + 1; j < pts.length; j++) { const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y); if (d < L) { px.globalAlpha = (1 - d / L) * .35; px.strokeStyle = a.c; px.beginPath(); px.moveTo(a.x, a.y); px.lineTo(b.x, b.y); px.stroke(); } } });
    if (!calm && !document.hidden) praf = requestAnimationFrame(step);
  };
  step();
}
document.addEventListener('visibilitychange', pRun); let prz = 0; addEventListener('resize', () => { clearTimeout(prz); prz = setTimeout(pRun, 200); });

/* ---- Pestañas del detalle de proyecto ---- */
document.addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (!b) return; const r = b.closest('.tabs'); $$('[data-tab]', r).forEach(x => x.setAttribute('aria-pressed', x === b)); $$('[data-p]', r).forEach(p => p.hidden = p.dataset.p !== b.dataset.tab); });

/* ---- Visor de imágenes (capturas y figuras de los proyectos) ---- */
const lb = document.createElement('div'); lb.id = 'lb'; lb.hidden = true; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true');
lb.innerHTML = '<img alt=""><button type="button" aria-label="Close">×</button>'; document.body.appendChild(lb);
document.addEventListener('click', e => {
  const im = e.target.closest('.detail figure img, .tp img, .ph img');
  if (im) { const x = $('img', lb); x.src = im.currentSrc || im.src; x.alt = im.alt; lb.hidden = false; $('button', lb).focus(); return; }
  if (e.target.closest('#lb')) lb.hidden = true;
});
addEventListener('keydown', e => { if (e.key === 'Escape' && !lb.hidden) { e.stopPropagation(); lb.hidden = true; } }, true);
