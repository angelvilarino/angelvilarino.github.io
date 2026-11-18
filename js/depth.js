/* Ángel OS · Profundidad
   Revelado tras el arranque · parallax y luz de cursor · ventanas (genie, inclinación, snap) · dock con magnificación ·
   telón de cierre y nombre interactivo · páginas de proyecto · visor de imágenes · pantalla de inicio móvil (inclinación, hojas)
   Todo va en una función autoejecutable para no chocar con los nombres globales del resto de archivos. */
(() => {
  'use strict';
  const H = document.documentElement, desk = $('#desk'), winsEl = $('#wins'), dockEl = $('#dock');
  if (!desk || !winsEl || !dockEl) return;
  const F = window.FXP = window.FXP || { x: .5, y: .5, px: 0, py: 0 };
  const fineOk = fine && !reduce;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const raf = fn => requestAnimationFrame(fn);
  const L3 = (a, b, c) => ({ es: a, en: b, gl: c })[lang] || a;
  const esc_ = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const calmNow = () => H.classList.contains('calm');
  const winEl = id => $(`.win[data-id="${CSS.escape(id)}"]`, winsEl);
  const onView = (el, cb, thr) => {
    if (reduce || !('IntersectionObserver' in window)) { cb(); return; }
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { io.disconnect(); cb(); } }, { threshold: thr || .2 });
    io.observe(el);
  };

  /* ===== 1 · Revelado en cascada al terminar el arranque ===== */
  const boot_ = $('#boot');
  function reveal() { H.classList.remove('rvw'); H.classList.add('rv1'); setTimeout(() => { H.classList.remove('rv1'); H.classList.add('fx-on'); }, 2400); }
  if (reduce) H.classList.add('fx-on');
  else {
    H.classList.add('rvw');
    let done = false;
    const start = () => { if (done) return; done = true; void H.offsetWidth; raf(() => raf(reveal)); };
    if (boot_ && boot_.isConnected) {
      new MutationObserver(() => { if (boot_.classList.contains('off') || !boot_.isConnected) start(); }).observe(boot_, { attributes: true, attributeFilter: ['class'] });
      setTimeout(start, 2600);
    } else start();
  }

  /* ===== 2 · Puntero / inclinación: parallax del escritorio y fondo ===== */
  const parEls = [$('#gl'), $('#icons')].filter(Boolean);   // las variables solo se ponen donde se usan (heredadas recalcularían todo el escritorio)
  const tgt = { x: .5, y: .5, px: 0, py: 0 }; let loopOn = false;
  function loop() {
    F.x += (tgt.x - F.x) * .09; F.y += (tgt.y - F.y) * .09; F.px += (tgt.px - F.px) * .09; F.py += (tgt.py - F.py) * .09;
    parEls.forEach(n => { n.style.setProperty('--px', F.px.toFixed(3)); n.style.setProperty('--py', F.py.toFixed(3)); });
    if (Math.abs(tgt.x - F.x) + Math.abs(tgt.y - F.y) + Math.abs(tgt.px - F.px) + Math.abs(tgt.py - F.py) > .002) raf(loop); else loopOn = false;
  }
  const poke = () => { if (!loopOn) { loopOn = true; raf(loop); } };
  if (!reduce) document.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch' || calmNow()) return;
    tgt.x = e.clientX / innerWidth; tgt.y = 1 - e.clientY / innerHeight; tgt.px = (e.clientX / innerWidth - .5) * 2; tgt.py = (e.clientY / innerHeight - .5) * 2; poke();
  }, { passive: true });

  /* Luz especular del borde en tarjetas y celdas (en ventanas y widgets no: el desenfoque de fondo parpadearía) */
  const LIT = '.cell,.card,.cc'; let litList = [], litX = 0, litY = 0, litQ = 0;
  document.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    const list = []; let el = e.target.closest && e.target.closest(LIT);
    while (el && list.length < 3) { list.push(el); el = el.parentElement && el.parentElement.closest(LIT); }
    if (!list.length) return;
    litList = list; litX = e.clientX; litY = e.clientY;
    if (!litQ) litQ = raf(() => { litQ = 0; litList.forEach(n => { const r = n.getBoundingClientRect(); n.style.setProperty('--lx', (litX - r.left) + 'px'); n.style.setProperty('--ly', (litY - r.top) + 'px'); }); });
  }, { passive: true });

  /* ===== 3 · Ventanas: genie, inclinación al arrastrar, snap a los bordes ===== */
  let src = null, srcAt = 0;
  document.addEventListener('click', e => {
    const s = e.target.closest && e.target.closest('[data-go],[data-d]');
    if (s) { const r = s.getBoundingClientRect(); src = { x: r.left + r.width / 2, y: r.top + r.height / 2 }; srcAt = Date.now(); }
  }, true);
  const winBox = w => w.classList.contains('max') ? { x: 8, y: 64 } : { x: +w.dataset.x || 0, y: +w.dataset.y || 0 };
  const setOrigin = (w, pt) => { const b = winBox(w); w.style.transformOrigin = clamp(pt.x - b.x, -4000, 6000) + 'px ' + clamp(pt.y + scrollY - b.y, -4000, 6000) + 'px'; };
  const dockPt = id => { const b = dockEl.querySelector(`[data-d="${CSS.escape(id)}"]`); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };
  function onOpen(w) {
    if (mob() || !H.classList.contains('fx-on') || calmNow() || !src || Date.now() - srcAt > 900) return;
    setOrigin(w, src); src = null; w.classList.add('gin');
    const end = e => { if (e && e.target !== w) return; w.classList.remove('gin'); w.style.transformOrigin = ''; w.removeEventListener('animationend', end); };
    w.addEventListener('animationend', end); setTimeout(end, 900);
  }
  new MutationObserver(list => {
    for (const r of list) {
      if (r.type === 'childList') r.addedNodes.forEach(n => {
        if (n.nodeType !== 1 || !n.classList.contains('win')) return;
        if ((n.dataset.id || '').indexOf('p:') === 0) enhance(n);
        onOpen(n);
      });
      else if (r.type === 'attributes' && !mob() && !reduce && r.target.classList.contains('win')) {
        const w = r.target, was = /\bmin\b/.test(r.oldValue || ''), now = w.classList.contains('min');
        if (was !== now) { const pt = dockPt(w.dataset.id); if (pt) setOrigin(w, pt); }
      }
    }
  }).observe(winsEl, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'], attributeOldValue: true });

  /* Inclinación 3D sutil al arrastrar + snap (izquierda, derecha, maximizar) */
  let drag = null, snapEl = null;
  const snapBox = k => { const iw = innerWidth, ih = innerHeight, top = 64, h = ih - top - 8, hw = Math.round((iw - 24) / 2); return k === 'l' ? { x: 8, y: top, w: hw, h } : k === 'r' ? { x: 16 + hw, y: top, w: hw, h } : { x: 8, y: top, w: iw - 16, h }; };
  const snapKind = (cx, cy) => cy < 6 ? 'm' : cx < 14 ? 'l' : cx > innerWidth - 14 ? 'r' : '';
  function showSnap(k) {
    if (!k) { if (snapEl) snapEl.classList.remove('on'); return; }
    if (!snapEl) { snapEl = document.createElement('div'); snapEl.id = 'snap'; desk.appendChild(snapEl); }
    const b = snapBox(k); snapEl.style.cssText = `left:${b.x}px;top:${b.y}px;width:${b.w}px;height:${b.h}px`;
    void snapEl.offsetWidth; snapEl.classList.add('on');
  }
  function snapTo(w, k) {
    const id = w.dataset.id;
    if (k === 'm') { w.classList.add('max'); compact(); persist(); return; }
    const b = snapBox(k);
    w.classList.remove('max'); w.classList.add('snapping');
    w.style.width = b.w + 'px'; w.style.height = b.h + 'px'; w.style.translate = `${b.x}px ${b.y}px`; w.dataset.x = b.x; w.dataset.y = b.y;
    pos[id] = Object.assign({}, pos[id], { w: b.w, h: b.h, x: b.x, y: b.y }); persist();
    setTimeout(() => w.classList.remove('snapping'), 450);
  }
  document.addEventListener('pointerdown', e => {
    if (mob() || reduce || e.button) return;
    const tb = e.target.closest && e.target.closest('.tb'); if (!tb || e.target.closest('button')) return;
    const w = tb.closest('.win'); if (!w || w.classList.contains('max')) return;
    drag = { w, lx: e.clientX, ly: e.clientY, vx: 0, vy: 0, k: '', t: 0 };
  }, true);
  document.addEventListener('pointermove', e => {
    if (!drag) return;
    const d = drag, w = d.w, dx = e.clientX - d.lx, dy = e.clientY - d.ly; d.lx = e.clientX; d.ly = e.clientY;
    d.vx = d.vx * .75 + dx * .25; d.vy = d.vy * .75 + dy * .25;
    w.classList.add('tilting');
    w.style.setProperty('--ry', clamp(d.vx * .45, -8, 8) + 'deg'); w.style.setProperty('--rx', clamp(-d.vy * .45, -6, 6) + 'deg');
    clearTimeout(d.t); d.t = setTimeout(() => { w.style.setProperty('--ry', '0deg'); w.style.setProperty('--rx', '0deg'); }, 90);
    const k = snapKind(e.clientX, e.clientY); if (k !== d.k) { d.k = k; showSnap(k); }
  }, { passive: true });
  const endDrag = () => {
    if (!drag) return; const d = drag, w = d.w; drag = null; clearTimeout(d.t);
    w.style.setProperty('--rx', '0deg'); w.style.setProperty('--ry', '0deg'); setTimeout(() => w.classList.remove('tilting'), 600);
    showSnap('');
    if (d.k && w.isConnected) snapTo(w, d.k);
  };
  document.addEventListener('pointerup', endDrag); document.addEventListener('pointercancel', endDrag);

  /* ===== 4 · Dock: apps fijas + ventanas abiertas con punto, magnificación, rebote ===== */
  const PIN = ['projects', 'stack', 'path', 'contact', 'settings'], PIN_M = ['projects', 'stack', 'contact', 'about'];
  let prevOpen = new Set($$('.win', winsEl).map(w => w.dataset.id));
  dockSync = function () {
    const ids = $$('.win', winsEl).map(w => w.dataset.id), pins = mob() ? PIN_M : PIN;
    const btn = (id, open) => {
      const w = open ? winEl(id) : null, on = !!w && w.classList.contains('act') && !w.classList.contains('min'), lab = esc_(titleOf(id));
      return `<button type="button" ${open ? 'data-d' : 'data-go'}="${esc_(id)}" data-tip="${lab}" aria-label="${lab}" class="${open ? 'open' : ''}${on ? ' on' : ''}${open && !prevOpen.has(id) ? ' bn' : ''}">${ico(iconOf(id))}</button>`;
    };
    const extra = mob() ? [] : ids.filter(id => !pins.includes(id));
    dockEl.innerHTML = pins.map(id => btn(id, ids.includes(id))).join('') + (extra.length ? '<i class="sep" aria-hidden="true"></i>' + extra.map(id => btn(id, true)).join('') : '');
    prevOpen = new Set(ids); base = null;
    if (lastMX != null) raf(magnify);
  };
  let lastMX = null, mq = 0, base = null;
  function magnify() {
    mq = 0; const bs = $$('button', dockEl);
    if (lastMX == null) { bs.forEach(b => b.style.removeProperty('--s')); base = null; return; }
    if (!base || base.length !== bs.length) {   // posiciones sin magnificar (el dock está centrado, así que su centro no se mueve al crecer)
      const r = dockEl.getBoundingClientRect(), left = r.left + r.width / 2 - dockEl.clientWidth / 2;
      base = bs.map(b => left + b.offsetLeft + b.offsetWidth / 2);
    }
    bs.forEach((b, i) => { const d = lastMX - base[i]; b.style.setProperty('--s', (1 + .5 * Math.exp(-(d * d) / (2 * 58 * 58))).toFixed(3)); });
  }
  dockEl.addEventListener('pointermove', e => { if (mob() || e.pointerType === 'touch' || reduce) return; lastMX = e.clientX; dockEl.classList.add('hov'); if (!mq) mq = raf(magnify); }, { passive: true });
  dockEl.addEventListener('pointerleave', () => { lastMX = null; dockEl.classList.remove('hov'); if (!mq) mq = raf(magnify); });
  matchMedia('(max-width:1024px)').addEventListener('change', () => dockSync());
  dockSync();

  /* ===== 5 · Cierre: telón + nombre con letras que reaccionan ===== */
  let cq = 0; const dim = document.createElement('div'); dim.id = 'dim'; dim.setAttribute('aria-hidden', 'true'); desk.appendChild(dim);
  const onScroll = () => { if (cq) return; cq = raf(() => { cq = 0; const p = clamp(scrollY / innerHeight, 0, 1), on = p > .03; H.classList.toggle('closing', on); desk.style.transform = on ? `scale(${(1 - p * .06).toFixed(4)})` : ''; dim.style.opacity = (p * .42).toFixed(3); }); };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const nm = $('#gname'), endEl = $('#end');
  if (nm && endEl) {
    const txt = nm.textContent.trim(); nm.setAttribute('aria-label', txt); nm.classList.add('lt'); nm.textContent = '';
    let k = 0; const words = txt.split(' ');
    words.forEach((w, wi) => {
      const s = document.createElement('span'); s.className = 'w'; s.setAttribute('aria-hidden', 'true');
      [...w].forEach(ch => { const c = document.createElement('span'); c.className = 'nl'; c.textContent = ch; c.style.setProperty('--k', k++); s.appendChild(c); });
      nm.appendChild(s); if (wi < words.length - 1) nm.appendChild(document.createTextNode(' '));
    });
    const chs = $$('.nl', nm); let cen = null, fq = 0, fx = 0, fy = 0;
    const measure = () => { cen = chs.map(c => { const r = c.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }); };
    addEventListener('resize', () => { cen = null; }); endEl.addEventListener('scroll', () => { cen = null; }, { passive: true });
    endEl.addEventListener('pointermove', e => {
      if (e.pointerType === 'touch' || reduce) return;
      fx = e.clientX; fy = e.clientY; endEl.style.setProperty('--ex', fx + 'px'); endEl.style.setProperty('--ey', fy + 'px');
      if (!fq) fq = raf(() => { fq = 0; if (!cen) measure(); const R = Math.max(120, nm.offsetHeight * .5);
        chs.forEach((c, i) => { const dx = fx - cen[i][0], dy = fy - cen[i][1]; c.style.setProperty('--p', Math.exp(-(dx * dx + dy * dy) / (2 * R * R)).toFixed(3)); }); });
    }, { passive: true });
    endEl.addEventListener('pointerleave', () => { chs.forEach(c => c.style.setProperty('--p', 0)); });
  }

  /* ===== 6 · Páginas de proyecto ===== */
  function enhance(w) {
    const d = $('.detail', w); if (!d || d.dataset.en) return; d.dataset.en = 1;
    const id = w.dataset.id.slice(2), p = PROJECTS.find(x => x.id === id), bd = $('.body', w); if (!p) return;
    /* cabecera grande con parallax */
    const hero = $('.hero', d), kids = [...d.children];
    const small = kids.find(n => n.tagName === 'SMALL'), by = kids.find(n => n.tagName === 'P' && n.firstElementChild && n.firstElementChild.tagName === 'SMALL'),
      short = kids.find(n => n.tagName === 'P' && n !== by), lk = kids.find(n => n.classList.contains('lk'));
    const dh = document.createElement('header'); dh.className = 'dh';
    const bg = document.createElement('i'); bg.className = 'dh-bg'; bg.setAttribute('aria-hidden', 'true');
    const tx_ = document.createElement('div'); tx_.className = 'dh-tx';
    const fig = document.createElement('div'); fig.className = 'dh-fig';
    const h = document.createElement('h2'); h.className = 'dh-t'; h.textContent = titleOf('p:' + id);
    if (small) { small.className = 'dh-k'; tx_.appendChild(small); }
    tx_.appendChild(h); if (by) tx_.appendChild(by); if (short) { short.classList.add('dh-s'); tx_.appendChild(short); } if (lk) tx_.appendChild(lk);
    if (hero) fig.appendChild(hero);
    dh.append(bg, tx_, fig); d.prepend(dh);
    if (fineOk && hero) {
      fig.addEventListener('pointermove', e => { const r = fig.getBoundingClientRect(); fig.style.setProperty('--ry2', ((e.clientX - r.left) / r.width - .5) * 6 + 'deg'); fig.style.setProperty('--rx2', -((e.clientY - r.top) / r.height - .5) * 5 + 'deg'); });
      fig.addEventListener('pointerleave', () => { fig.style.setProperty('--ry2', '0deg'); fig.style.setProperty('--rx2', '0deg'); });
    }
    /* índice con progreso de lectura */
    const hs = $$('.sh', d); let spy = null;
    if (hs.length >= 3) {
      const nav = document.createElement('nav'); nav.className = 'toc'; nav.setAttribute('aria-label', L3('Índice', 'Contents', 'Índice'));
      nav.innerHTML = `<div class="toc-p"><u></u></div><div class="toc-l">${hs.map((n, i) => `<button type="button" data-i="${i}"><b>${i + 1}</b>${esc_(n.lastChild.textContent)}</button>`).join('')}</div>`;
      dh.after(nav);
      const btns = $$('.toc-l button', nav), bar = $('.toc-p u', nav), lst = $('.toc-l', nav); let cur = -1;
      nav.addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        const hd = hs[+b.dataset.i];
        bd.scrollTo({ top: hd.getBoundingClientRect().top - bd.getBoundingClientRect().top + bd.scrollTop - 62, behavior: reduce ? 'auto' : 'smooth' });
      });
      spy = () => {
        const br = bd.getBoundingClientRect().top; let a = 0; hs.forEach((n, i) => { if (n.getBoundingClientRect().top - br < 120) a = i; });
        const mx = bd.scrollHeight - bd.clientHeight; bar.style.transform = `scaleX(${mx > 0 ? clamp(bd.scrollTop / mx, 0, 1) : 0})`;
        if (a !== cur) {
          cur = a; btns.forEach((b, i) => { b.classList.toggle('on', i === a); if (i === a) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
          const b = btns[a]; lst.scrollTo({ left: b.offsetLeft - lst.clientWidth / 2 + b.offsetWidth / 2, behavior: reduce ? 'auto' : 'smooth' });
        }
      };
      spy();
    }
    /* parallax de la cabecera y progreso al hacer scroll */
    if (!reduce || spy) {
      let sq = 0;
      bd.addEventListener('scroll', () => { if (sq) return; sq = raf(() => { sq = 0; if (!reduce) dh.style.setProperty('--sy', bd.scrollTop.toFixed(0)); if (spy) spy(); }); }, { passive: true });
    }
    /* métricas: anillos y sparklines (la sparkline solo sale si el dato lleva `spark: [..]` en content.js) */
    const items = (p.blocks || []).filter(b => b.type === 'kpis').flatMap(b => b.items);
    $$('.tl > b.big', d).map(b => b.parentNode).forEach((tl, i) => {
      const it = items[i]; if (!it) return;
      let frac = null; const m = String(tx(it.v)).match(/^\s*(\d+)\s*\/\s*(\d+)\s*$/);
      if (typeof it.pct === 'number') frac = it.pct / 100; else if (m) frac = +m[1] / +m[2];
      if (Array.isArray(it.spark) && it.spark.length > 1) {
        const a = it.spark, mn = Math.min.apply(null, a), mx = Math.max.apply(null, a);
        const pts = a.map((v, j) => ((j / (a.length - 1)) * 100).toFixed(1) + ',' + (28 - ((v - mn) / (mx - mn || 1)) * 24).toFixed(1)), line = 'M' + pts.join(' L');
        tl.insertAdjacentHTML('beforeend', `<svg class="sp" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path class="sp-a" d="${line} L100,30 L0,30Z"/><path class="sp-l" pathLength="1" d="${line}"/></svg>`);
        onView(tl, () => tl.classList.add('rin'), .35);
      } else if (frac != null) {
        const C = 2 * Math.PI * 26; const sb = $('.sbar', tl); if (sb) sb.remove();
        tl.insertAdjacentHTML('afterbegin', `<svg class="rg" viewBox="0 0 64 64" aria-hidden="true"><circle class="rg-t" cx="32" cy="32" r="26"/><circle class="rg-v" cx="32" cy="32" r="26" style="--len:${C.toFixed(1)};--off:${(C * (1 - clamp(frac, 0, 1))).toFixed(1)}"/></svg>`);
        tl.classList.add('rk'); onView(tl, () => tl.classList.add('rin'), .35);
      }
    });
    /* los bloques aparecen al entrar en pantalla */
    if (!reduce && 'IntersectionObserver' in window) [...d.children].filter(n => !n.classList.contains('dh') && !n.classList.contains('toc')).forEach(n => { n.classList.add('rvl'); onView(n, () => n.classList.add('in'), .06); });
  }
  $$('.win', winsEl).forEach(w => { if ((w.dataset.id || '').indexOf('p:') === 0) enhance(w); });

  /* ===== 7 · Visor de imágenes: galería, zoom (rueda, doble clic, pellizco) y gestos ===== */
  const VW = document.createElement('div');
  VW.id = 'vw'; VW.hidden = true; VW.setAttribute('role', 'dialog'); VW.setAttribute('aria-modal', 'true'); VW.setAttribute('aria-label', L3('Visor de imágenes', 'Image viewer', 'Visor de imaxes'));
  VW.innerHTML = `<div class="vw-bg"></div><figure class="vw-st"><img alt="" draggable="false"></figure><div class="vw-cap" aria-live="polite"></div><button class="vw-x" type="button" aria-label="${esc_(t('winclose'))}">×</button><button class="vw-n vw-pv" type="button" aria-label="${L3('Anterior', 'Previous', 'Anterior')}">‹</button><button class="vw-n vw-nx" type="button" aria-label="${L3('Siguiente', 'Next', 'Seguinte')}">›</button><div class="vw-tb"><button type="button" data-z="out" aria-label="Zoom −">−</button><button type="button" data-z="fit" aria-label="Zoom 1:1">1:1</button><button type="button" data-z="in" aria-label="Zoom +">+</button><span class="vw-c"></span></div>`;
  document.body.appendChild(VW);
  const vim = $('img', VW), vst = $('.vw-st', VW), vcap = $('.vw-cap', VW), vcnt = $('.vw-c', VW);
  let vg = [], vi = 0, vs = 1, vx = 0, vy = 0, vfrom = null;
  const vApply = anim => { vim.classList.toggle('anim', !!anim); vim.style.setProperty('--vs', vs.toFixed(3)); vim.style.setProperty('--vx', vx.toFixed(1) + 'px'); vim.style.setProperty('--vy', vy.toFixed(1) + 'px'); vst.classList.toggle('z', vs > 1.02); };
  const vClamp = () => { const mx = Math.max(0, (vim.clientWidth * vs - vst.clientWidth) / 2 + 40), my = Math.max(0, (vim.clientHeight * vs - vst.clientHeight) / 2 + 40); vx = clamp(vx, -mx, mx); vy = clamp(vy, -my, my); if (vs <= 1.001) { vx = 0; vy = 0; } };
  const vZoom = (s2, cx, cy, anim) => {
    s2 = clamp(s2, 1, 6); const r = vst.getBoundingClientRect(), qx = (cx == null ? r.left + r.width / 2 : cx) - (r.left + r.width / 2), qy = (cy == null ? r.top + r.height / 2 : cy) - (r.top + r.height / 2);
    vx = qx - (qx - vx) * (s2 / vs); vy = qy - (qy - vy) * (s2 / vs); vs = s2; vClamp(); vApply(anim);
  };
  const vShow = i => {
    if (!vg.length) return; vi = (i + vg.length) % vg.length; const el = vg[vi], fc = el.closest('figure') && el.closest('figure').querySelector('figcaption');
    vim.src = el.currentSrc || el.src; vim.alt = el.alt || ''; vcap.textContent = (fc && fc.textContent) || el.alt || ''; vcnt.textContent = (vi + 1) + ' / ' + vg.length;
    vs = 1; vx = 0; vy = 0; vApply(false); vim.classList.remove('sw'); void vim.offsetWidth; vim.classList.add('sw');
    $$('.vw-n', VW).forEach(b => { b.hidden = vg.length < 2; });
  };
  const vOpen = el => {
    const sc_ = el.closest('.detail') || el.closest('.body') || document;
    vg = $$('.detail figure img, .tp img, .ph img', sc_).filter(n => n.src); vi = Math.max(0, vg.indexOf(el)); vfrom = document.activeElement;
    VW.hidden = false; vShow(vi); $('.vw-x', VW).focus();
  };
  const vClose = () => { VW.hidden = true; if (vfrom && vfrom.isConnected && vfrom.focus) vfrom.focus({ preventScroll: true }); };
  document.addEventListener('click', e => {
    const im = e.target.closest && e.target.closest('.detail figure img, .tp img, .ph img'); if (!im) return;
    e.preventDefault(); e.stopPropagation(); vOpen(im);   // sustituye al visor sencillo de fx.js
  }, true);
  const vpts = new Map(); let gest = null, moved = false;
  vst.addEventListener('pointerdown', e => {
    if (e.button) return; vst.setPointerCapture(e.pointerId); vpts.set(e.pointerId, { x: e.clientX, y: e.clientY }); moved = false;
    if (vpts.size === 2) { const [a, b] = [...vpts.values()]; gest = { t: 'pinch', d: Math.hypot(a.x - b.x, a.y - b.y) || 1, s: vs }; }
    else gest = { t: vs > 1.02 ? 'pan' : 'swipe', x0: e.clientX, y0: e.clientY, vx0: vx, vy0: vy };
  });
  vst.addEventListener('pointermove', e => {
    const q = vpts.get(e.pointerId); if (!q) return; q.x = e.clientX; q.y = e.clientY; if (!gest) return;
    if (gest.t === 'pinch' && vpts.size >= 2) { const [a, b] = [...vpts.values()]; vZoom(gest.s * Math.hypot(a.x - b.x, a.y - b.y) / gest.d, (a.x + b.x) / 2, (a.y + b.y) / 2, false); moved = true; }
    else if (gest.t === 'pan') { if (Math.abs(e.clientX - gest.x0) + Math.abs(e.clientY - gest.y0) > 3) moved = true; vx = gest.vx0 + e.clientX - gest.x0; vy = gest.vy0 + e.clientY - gest.y0; vClamp(); vApply(false); }
    else if (gest.t === 'swipe') { const dx = e.clientX - gest.x0, dy = e.clientY - gest.y0; if (Math.abs(dx) + Math.abs(dy) > 6) moved = true; vim.style.setProperty('--vx', dx * .5 + 'px'); vim.style.setProperty('--vy', Math.max(0, dy) * .5 + 'px'); }
  });
  const vEnd = e => {
    if (!vpts.has(e.pointerId)) return; vpts.delete(e.pointerId);
    if (gest && gest.t === 'swipe' && !vpts.size) {
      const dx = e.clientX - gest.x0, dy = e.clientY - gest.y0;
      if (vg.length > 1 && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.3) vShow(vi + (dx < 0 ? 1 : -1));
      else if (dy > 110 && Math.abs(dx) < 90) vClose(); else vApply(true);
    }
    if (!vpts.size) gest = null; else if (gest && gest.t === 'pinch') gest = null;
  };
  vst.addEventListener('pointerup', vEnd); vst.addEventListener('pointercancel', vEnd);
  vst.addEventListener('click', e => { if (!moved && e.target === vst) vClose(); });
  vst.addEventListener('wheel', e => { e.preventDefault(); vZoom(vs * Math.exp(-e.deltaY * .0016), e.clientX, e.clientY, false); }, { passive: false });
  vst.addEventListener('dblclick', e => { if (e.target === vim) vZoom(vs > 1.05 ? 1 : 2.5, e.clientX, e.clientY, true); });
  VW.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.classList.contains('vw-x')) vClose(); else if (b.classList.contains('vw-pv')) vShow(vi - 1); else if (b.classList.contains('vw-nx')) vShow(vi + 1);
    else if (b.dataset.z === 'in') vZoom(vs * 1.5, null, null, true); else if (b.dataset.z === 'out') vZoom(vs / 1.5, null, null, true); else if (b.dataset.z === 'fit') vZoom(1, null, null, true);
  });
  addEventListener('keydown', e => {
    if (VW.hidden) return; const k = e.key;
    if (k === 'Escape') vClose(); else if (k === 'ArrowRight') vShow(vi + 1); else if (k === 'ArrowLeft') vShow(vi - 1);
    else if (k === '+' || k === '=') vZoom(vs * 1.4, null, null, true); else if (k === '-') vZoom(vs / 1.4, null, null, true); else if (k === '0') vZoom(1, null, null, true);
    else if (k === 'Tab') { const f = $$('button', VW).filter(b => !b.hidden), i = f.indexOf(document.activeElement), n = f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length]; if (n) n.focus(); }
    else return;
    e.preventDefault(); e.stopPropagation();
  }, true);

  /* ===== 8 · Móvil: hojas que se cierran arrastrando e inclinación del fondo (giroscopio) ===== */
  let sheet = null;
  document.addEventListener('pointerdown', e => {
    if (!mob() || e.button) return;
    const tb = e.target.closest && e.target.closest('.tb'); if (!tb || e.target.closest('button')) return;
    const w = tb.closest('.win'); if (!w) return;
    sheet = { w, y0: e.clientY, dy: 0 }; try { tb.setPointerCapture(e.pointerId); } catch (x) {}
  }, true);
  document.addEventListener('pointermove', e => { if (!sheet) return; sheet.dy = Math.max(0, e.clientY - sheet.y0); sheet.w.style.transition = 'none'; sheet.w.style.transform = `translateY(${sheet.dy}px)`; }, { passive: true });
  const sheetEnd = () => {
    if (!sheet) return; const s = sheet, w = s.w; sheet = null; w.style.transition = 'transform .28s var(--ease)';
    if (s.dy > 110) { w.style.transform = 'translateY(100%)'; setTimeout(() => { close(w); }, 120); }
    else { w.style.transform = ''; setTimeout(() => { w.style.transition = ''; }, 300); }
  };
  document.addEventListener('pointerup', sheetEnd); document.addEventListener('pointercancel', sheetEnd);

  if (matchMedia('(pointer:coarse)').matches && !reduce && 'DeviceOrientationEvent' in window) {
    const D = window.DeviceOrientationEvent;
    const on = () => addEventListener('deviceorientation', e => {
      if (e.gamma == null) return;
      tgt.px = clamp(e.gamma / 22, -1, 1); tgt.py = clamp(((e.beta || 0) - 40) / 22, -1, 1); tgt.x = .5 + tgt.px * .3; tgt.y = .5 - tgt.py * .3; poke();
    }, { passive: true });
    if (typeof D.requestPermission === 'function') {   // iOS: pide permiso con un botón (solo se muestra en iPhone/iPad)
      const b = document.createElement('button'), lab = L3('Inclinación del fondo', 'Tilt background', 'Inclinación do fondo');
      b.id = 'gyr'; b.type = 'button'; b.setAttribute('aria-label', lab); b.title = lab;
      b.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="3" width="10" height="18" rx="2" transform="rotate(18 12 12)"/></svg>';
      b.addEventListener('click', () => { D.requestPermission().then(r => { if (r === 'granted') { on(); b.remove(); } }).catch(() => {}); });
      const th = $('#thm'); if (th) th.before(b);
    } else on();
  }
})();
