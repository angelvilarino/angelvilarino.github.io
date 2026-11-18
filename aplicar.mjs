#!/usr/bin/env node
/* Engancha los archivos nuevos (css/depth.css, js/gl.js, js/depth.js) al build.
   Ejecutar UNA vez desde la raíz del repositorio:  node aplicar.mjs
   Es idempotente: si ya está aplicado, no hace nada. */
import fs from 'node:fs';
const F = 'build.mjs';
if (!fs.existsSync(F)) { console.error('No encuentro build.mjs: ejecútalo desde la raíz del repositorio.'); process.exit(1); }
for (const f of ['css/depth.css', 'js/gl.js', 'js/depth.js']) if (!fs.existsSync(f)) { console.error('Falta ' + f + ': descomprime el zip en la raíz del repositorio.'); process.exit(1); }
let s = fs.readFileSync(F, 'utf8'), changed = false;

const js0 = "'js/fx.js', 'js/main.js']";
if (!s.includes("'js/depth.js'")) {
  if (!s.includes(js0)) { console.error('No reconozco la lista JS_FILES de build.mjs; añade a mano \'js/gl.js\', \'js/depth.js\' al final (después de \'js/main.js\').'); process.exit(1); }
  s = s.replace(js0, "'js/fx.js', 'js/main.js', 'js/gl.js', 'js/depth.js']"); changed = true;
}

const css0 = "const cssMin = esbuild.transformSync(fs.readFileSync(path.join(ROOT, 'css/style.css'), 'utf8'), { loader: 'css', minify: true }).code;";
if (!s.includes('css/depth.css')) {
  if (!s.includes(css0)) { console.error('No reconozco la línea de cssMin; haz que lea también css/depth.css a continuación de css/style.css.'); process.exit(1); }
  s = s.replace(css0, "const cssSrc = ['css/style.css', 'css/depth.css'].map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\\n');\n  const cssMin = esbuild.transformSync(cssSrc, { loader: 'css', minify: true }).code;"); changed = true;
}
if (changed) { fs.writeFileSync(F + '.bak', fs.readFileSync(F)); fs.writeFileSync(F, s); console.log('✔ build.mjs actualizado (copia de seguridad: build.mjs.bak)'); }
else console.log('✔ build.mjs ya estaba actualizado');
console.log('Ahora:  npm run dev   (o git add . && git commit -m "v14 profundidad" && git push)');
