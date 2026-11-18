/* Ángel OS · Fondo líquido: shader WebGL propio (sin librerías)
   Sustituye al degradado CSS en los fondos «Malla», «Aurora» y «Atardecer». Si WebGL falla, se ve el fondo CSS de siempre.
   Calidad automática: full (escritorio) · lite (móvil, equipos modestos, ahorro de batería: menos octavas, 24 fps) · static (animaciones off: un solo fotograma). */
(() => {
  'use strict';
  const H = document.documentElement, wall = $('.wall');
  const F = window.FXP = window.FXP || { x: .5, y: .5, px: 0, py: 0 };   // puntero / inclinación suavizados (los actualiza depth.js)
  if (!wall) return;
  const cv = document.createElement('canvas'); cv.id = 'gl'; cv.setAttribute('aria-hidden', 'true'); wall.appendChild(cv);
  const MODES = { mesh: 0, aurora: 1, dusk: 2 };
  const VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
  const FS = oct => `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
#define OCT ${oct}
uniform vec2 uRes, uM, uRip;
uniform float uT, uMode, uDark, uRipT;
uniform vec3 uC1, uC2, uC3, uBg;
float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x), mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x), f.y); }
float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<OCT;i++){ v+=a*noise(p); p=p*2.03+vec2(1.7,9.2); a*=.5; } return v; }
void main(){
  float m = min(uRes.x,uRes.y);
  vec2 p = (gl_FragCoord.xy - .5*uRes)/m;
  vec2 mp = (uM - .5)*uRes/m;
  float t = uT*.05;
  vec2 d = p - mp; float md = exp(-dot(d,d)*4.5);
  vec2 q = vec2(fbm(p*1.25 + vec2(0.,t)), fbm(p*1.25 + vec2(5.2,1.3) - t));
  vec2 r = vec2(fbm(p*1.5 + 2.*q + vec2(1.7,9.2) + .15*t + d*md*.9), fbm(p*1.5 + 2.*q + vec2(8.3,2.8) - .126*t));
  float f = fbm(p*1.4 + 2.4*r);
  vec3 col = uBg;
  float k = mix(.85,.95,uDark);
  if (uMode < .5) {
    vec3 c = mix(uC1,uC2,clamp(q.x*1.5-.15,0.,1.));
    c = mix(c,uC3,clamp(r.y*r.y*1.3,0.,1.));
    col = mix(uBg, c, clamp(smoothstep(.12,.8,f)*k*1.6,0.,.92));
    vec3 n = normalize(vec3(r.x-.5, r.y-.5, .35));
    vec3 L = normalize(vec3(mp*1.6 + vec2(.25,.45), .8));
    float s = pow(max(dot(n,L),0.), 8.);
    col += s*mix(.05,.09,uDark)*(c+.4);
  } else if (uMode < 1.5) {
    float w = sin((p.y*2.2 + f*2.2 - t*5.)*3.14159)*.5+.5;
    w = pow(w, 1.8);
    vec3 c = mix(uC2,uC1,smoothstep(-.5,.6,p.x + (f-.5)*.9));
    c = mix(c,uC3,r.x*r.x*1.4);
    float v = smoothstep(-.7,.4,p.y + .25*q.x);
    col = mix(uBg, c, clamp(w*v*k*1.7 + md*.06,0.,1.));
  } else {
    float y = gl_FragCoord.y/uRes.y;
    vec3 lo = vec3(1.,.70,.42), mi = vec3(.76,.27,.35), hi = vec3(.17,.106,.30);
    col = mix(lo, mi, smoothstep(0.,.5,y)); col = mix(col, hi, smoothstep(.4,1.,y));
    col += (f-.5)*.16 + md*.05;
  }
  float age = uT - uRipT;
  if (age > 0. && age < 3.) { float rr = length(p-uRip); float ring = exp(-pow((rr-age*.55)*9.,2.))*exp(-age*1.3); col += ring*.12*(uC2+.3); }
  col += (hash(gl_FragCoord.xy + fract(uT)) - .5)*.018;
  gl_FragColor = vec4(col,1.);
}`;

  let gl = null, prog = null, U = {}, tier = '', raf = 0, running = false, ok = true, mode = 0, last = 0, acc = 0, nF = 0, sc = .6, rip = [0, 0], ripT = -99, key = '', batt = false;
  const T0 = performance.now();
  const lowEnd = () => (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4 || !!(navigator.connection && navigator.connection.saveData);
  const calm = () => H.classList.contains('calm');
  const getTier = () => calm() ? 'static' : (mob() || lowEnd() || batt) ? 'lite' : 'full';
  const shouldRun = () => ok && !!gl && tier !== 'static' && !document.hidden && scrollY < innerHeight * .95;
  const rgb = v => { v = String(v).trim().replace('#', ''); if (v.length === 3) v = v.replace(/./g, c => c + c); const n = parseInt(v, 16); return isNaN(n) ? [.5, .5, .5] : [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; };

  try { if (navigator.getBattery) navigator.getBattery().then(b => { const f = () => { batt = !b.charging && b.level < .25; apply(); }; b.addEventListener('levelchange', f); b.addEventListener('chargingchange', f); f(); }).catch(() => {}); } catch (e) {}

  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn('shader:', gl.getShaderInfoLog(s)); gl.deleteShader(s); return null; } return s; };
  function build(oct) {
    const v = sh(gl.VERTEX_SHADER, VS), f = sh(gl.FRAGMENT_SHADER, FS(oct)); if (!v || !f) return false;
    const p = gl.createProgram(); gl.attachShader(p, v); gl.attachShader(p, f); gl.bindAttribLocation(p, 0, 'a'); gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) { console.warn('link:', gl.getProgramInfoLog(p)); return false; }
    if (prog) gl.deleteProgram(prog);
    prog = p; gl.useProgram(p); U = {};
    ['uRes', 'uM', 'uRip', 'uRipT', 'uT', 'uMode', 'uDark', 'uC1', 'uC2', 'uC3', 'uBg'].forEach(n => { U[n] = gl.getUniformLocation(p, n); });
    return true;
  }
  function init() {
    gl = cv.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: 'low-power' });
    if (!gl) return false;
    const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    tier = ''; prog = null; return true;
  }
  function colors() {
    const cs = getComputedStyle(H), g = n => rgb(cs.getPropertyValue(n));
    gl.uniform3fv(U.uC1, g('--ac')); gl.uniform3fv(U.uC2, g('--a2')); gl.uniform3fv(U.uC3, g('--a3')); gl.uniform3fv(U.uBg, g('--bg'));
    gl.uniform1f(U.uDark, H.dataset.theme === 'dark' ? 1 : 0);
  }
  function size() {
    const w = Math.max(2, Math.round(wall.clientWidth * sc)), h = Math.max(2, Math.round(wall.clientHeight * sc));
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    gl.viewport(0, 0, w, h); gl.uniform2f(U.uRes, w, h);
  }
  function draw(now) {
    gl.uniform1f(U.uT, tier === 'static' ? 14 : (now - T0) / 1000);
    gl.uniform2f(U.uM, F.x, F.y); gl.uniform1f(U.uMode, mode);
    gl.uniform2f(U.uRip, rip[0], rip[1]); gl.uniform1f(U.uRipT, ripT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  function frame(now) {
    raf = 0; if (!running) return;
    if (!shouldRun()) { running = false; return; }
    if (now - last < (tier === 'lite' ? 1000 / 24 : 1000 / 32) - 2) { raf = requestAnimationFrame(frame); return; }
    const dt = now - last; last = now;
    draw(now);
    /* si va justo de GPU, baja la resolución poco a poco */
    if (tier === 'full') { acc += dt; if (++nF >= 45) { if (acc / nF > 24 && sc > .32) { sc = Math.max(.3, sc * .82); size(); } acc = 0; nF = 0; } }
    raf = requestAnimationFrame(frame);
  }
  const start = () => { if (running) return; running = true; last = performance.now(); acc = 0; nF = 0; raf = requestAnimationFrame(frame); };
  const stop = () => { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; };
  const kick = () => { if (!ok || !gl) return; if (tier === 'static') { draw(performance.now()); return; } if (shouldRun()) start(); };
  const off = () => { stop(); H.classList.toggle('gl', false); };

  function apply() {
    const m = MODES[H.dataset.wall], tr = getTier(), k = [H.dataset.wall, H.dataset.theme, tr, mob()].join('|');
    if (k === key && (gl || m === undefined)) return;
    key = k;
    if (m === undefined || !ok) { off(); return; }
    if (!gl && !init()) { ok = false; off(); return; }
    if (tr !== tier) {
      if (!build(tr === 'full' ? 5 : 3)) { ok = false; off(); return; }
      tier = tr; sc = tr === 'full' ? .6 : tr === 'lite' ? .34 : .5;
    }
    mode = m; colors(); size();
    H.classList.toggle('gl', true); stop(); kick();
  }

  cv.addEventListener('webglcontextlost', e => { e.preventDefault(); stop(); gl = null; key = ''; H.classList.toggle('gl', false); });
  cv.addEventListener('webglcontextrestored', () => { gl = null; key = ''; apply(); });
  new MutationObserver(apply).observe(H, { attributes: true, attributeFilter: ['data-wall', 'data-theme', 'class'] });
  if (window.ResizeObserver) new ResizeObserver(() => { if (gl && ok && tier) { size(); if (tier === 'static') draw(performance.now()); } }).observe(wall);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else kick(); });
  addEventListener('scroll', () => { if (!running) kick(); }, { passive: true });
  matchMedia('(max-width:1024px)').addEventListener('change', apply);
  /* onda al pulsar en el escritorio vacío */
  document.addEventListener('pointerdown', e => {
    if (!running || e.clientY > innerHeight || (e.target.closest && e.target.closest('.win,.dock,.bar,.wd,.ic,.trash,.fab,#lp,button,a,input'))) return;
    const m = Math.min(innerWidth, innerHeight);
    rip = [(e.clientX / innerWidth - .5) * innerWidth / m, (.5 - e.clientY / innerHeight) * innerHeight / m];
    ripT = (performance.now() - T0) / 1000;
  }, { passive: true });
  apply();
})();
