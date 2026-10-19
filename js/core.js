/* Ángel OS · Configuración y utilidades */
'use strict';
const CFG = { lat: 43.3623, lon: -8.4115, city: 'A Coruña', gh: 'angelvilarino' /* gh: reservado para widget GitHub (pendiente) */ };
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = { g(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }, s(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
const mob = () => matchMedia('(max-width:1024px)').matches;
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

const PHONE = '+34 684 64 79 52';

/* Sonidos de sistema sintetizados (suaves; solo tras interactuar; se desactivan en Ajustes) */
let touched = false, sctx;
addEventListener('pointerdown', () => { touched = true; }, { capture: true, once: true });
function sfx(kind) {
  if (!touched || S.sfx === false || reduce) return;
  try {
    sctx = sctx || new (window.AudioContext || window.webkitAudioContext)(); if (sctx.state === 'suspended') sctx.resume();
    const t0 = sctx.currentTime, tone = (f1, f2, d, v, type, at) => { const o = sctx.createOscillator(), g = sctx.createGain(); o.type = type || 'sine'; o.frequency.setValueAtTime(f1, t0 + at); o.frequency.exponentialRampToValueAtTime(f2, t0 + at + d); g.gain.setValueAtTime(0.0001, t0 + at); g.gain.exponentialRampToValueAtTime(v, t0 + at + .02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + at + d); o.connect(g); g.connect(sctx.destination); o.start(t0 + at); o.stop(t0 + at + d + .02); };
    if (kind === 'open') { tone(520, 780, .16, .05, 'sine', 0); tone(780, 1040, .14, .035, 'sine', .06); }
    else if (kind === 'close') tone(700, 420, .16, .05, 'sine', 0);
    else if (kind === 'min') tone(600, 260, .22, .04, 'triangle', 0);
  } catch (e) {}
}
