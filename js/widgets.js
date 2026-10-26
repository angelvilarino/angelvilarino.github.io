/* Ángel OS · Reloj, clima, música y GitHub */
'use strict';
/* ---- Reloj, widgets, clima ---- */
function tick() { const d = new Date(), hm = d.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' }); ['#clk', '#wc', '#fc'].forEach(s => $(s).textContent = hm); $('#wd-date').textContent = d.toLocaleDateString(lang === 'gl' ? 'gl-ES' : lang, { weekday: 'long', day: 'numeric', month: 'short' }); }
setInterval(tick, 1000); tick();

fetch(`https://api.open-meteo.com/v1/forecast?latitude=${CFG.lat}&longitude=${CFG.lon}&current=temperature_2m`).then(r => r.json()).then(j => { $('#wt').textContent = Math.round(j.current.temperature_2m) + '°'; }).catch(() => {});


/* ---- Música ambiente (Web Audio, nunca autoplay: solo al pulsar Play) ---- */
let actx, mgain, mOn = false;
$('#mu').addEventListener('click', () => {
  if (!actx) {
    actx = new (window.AudioContext || window.webkitAudioContext)(); mgain = actx.createGain(); mgain.gain.value = 0; mgain.connect(actx.destination);
    [110, 164.81, 220, 277.18].forEach((f, i) => { const o = actx.createOscillator(), l = actx.createOscillator(), lg = actx.createGain(), g = actx.createGain(); o.type = 'sine'; o.frequency.value = f; l.frequency.value = .08 + i * .03; lg.gain.value = .03; g.gain.value = .05; l.connect(lg); lg.connect(g.gain); o.connect(g); g.connect(mgain); o.start(); l.start(); });
  }
  mOn = !mOn; if (actx.state === 'suspended') actx.resume();
  mgain.gain.setTargetAtTime(mOn ? .8 : 0, actx.currentTime, .4);
  $('#mu').textContent = mOn ? 'Pause' : 'Play'; $('#mu').setAttribute('aria-pressed', mOn);
});

/* ---- Último repositorio de GitHub (se guarda 1 h para no agotar el límite de la API; si falla, no se muestra nada) ---- */
(function () {
  const K = 'gh2', el = $('#w-gh');
  const ago = d => { const s = Math.max(0, (Date.now() - new Date(d)) / 1000); let r; try { r = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' }); } catch (e) { r = new Intl.RelativeTimeFormat('es', { numeric: 'auto' }); }
    for (const [u, n] of [['day', 86400], ['hour', 3600]]) if (s >= n) return r.format(-Math.floor(s / n), u); return r.format(-Math.max(1, Math.floor(s / 60)), 'minute'); };
  const show = v => { $('#ghn').textContent = v.name; $('#ghs').textContent = ago(v.pushed); el.href = v.url; };
  const c = store.g(K, null); if (c) show(c);
  if (c && Date.now() - c.t < 3600e3) return;
  fetch(`https://api.github.com/users/${CFG.gh}/repos?sort=pushed&per_page=8`).then(r => r.ok ? r.json() : Promise.reject())
    .then(list => { const r = list.find(x => !x.fork && x.name.toLowerCase() !== (CFG.gh + '.github.io').toLowerCase()); if (!r) return; const v = { t: Date.now(), name: r.name, url: r.html_url, pushed: r.pushed_at }; store.s(K, v); show(v); }).catch(() => {});
})();
