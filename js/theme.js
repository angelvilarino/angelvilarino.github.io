/* Ángel OS · Tema, fondo y ajustes */
'use strict';
/* ---- Ajustes ---- */
function applySet() {
  const h = document.documentElement;
  h.dataset.theme = S.theme || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  h.dataset.wall = S.wall || 'mesh';
  h.classList.toggle('calm', S.anim === false || reduce);
  $('#wdg').hidden = S.wdg === false;
  if (typeof pRun === 'function') pRun();
}
const setS = (k, v) => { S[k] = v; store.s('set', S); applySet(); if (k === 'theme' || k === 'wall' || k === 'anim' || k === 'wdg' || k === 'sfx') rerender(); };
