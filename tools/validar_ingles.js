/**
 * Comprueba que el contenidos-en.js de cada curso encaja con su contenidos.js (mismo número y orden
 * de tarjetas, retos, opciones, grupos, parejas y huecos) y que no quedan textos en castellano.
 * Uso:  node tools/validar_ingles.js              (todos los cursos con inglés)
 *       node tools/validar_ingles.js 2-primaria   (solo ese curso)
 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const raiz = path.resolve(__dirname, '..');
const reg = {}; vm.createContext(reg); vm.runInContext(fs.readFileSync(path.join(raiz, 'cursos.js'), 'utf8') + ';this.CURSOS=CURSOS;', reg);
const cursos = (process.argv.slice(2).length ? process.argv.slice(2) : reg.CURSOS.filter(c => c.ingles).map(c => c.id));
let total = 0;
for (const cid of cursos) {
const carpeta = path.join(raiz, 'cursos', cid);
console.log(`Curso ${cid}:`);
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(carpeta, 'contenidos.js'), 'utf8') + '\n' + fs.readFileSync(path.join(carpeta, 'contenidos-en.js'), 'utf8') +
  ';this.CURSO=CURSO;this.EN=CONTENIDOS_EN;this.I=IDIOMA_CONTENIDOS;', ctx);
const { CURSO, EN } = ctx;
const errores = [], avisos = [];
const huecos = e => { const out = []; const w = t => (String(t).match(/\[\[([^\]]+)\]\]/g) || []).forEach(x => out.push(x.slice(2, -2))); w(e.titulo || ''); (function r(ns) { (ns || []).forEach(n => { w(n.txt); r(n.hijos); }); })(e.nodos); return out; };
const castellano = /[áéíóúñ¿¡]|\b(el|los|las|del|una|que|para|con|por|tiene|son|está)\b/i;
const revisarTexto = (donde, v) => {
  const textos = []; (function rec(x) { if (typeof x === 'string') textos.push(x); else if (Array.isArray(x)) x.forEach(rec); else if (x && typeof x === 'object') Object.values(x).forEach(rec); })(v);
  textos.forEach(t => { const limpio = t.replace(/<[^>]+>/g, ' '); if (castellano.test(limpio)) avisos.push(`${donde}: ¿castellano? «${limpio.trim().slice(0, 70)}»`); });
};
if (EN.situaciones.length !== (CURSO.situaciones || []).length) errores.push('situaciones: distinto número');
CURSO.temas.forEach(t => {
  if (!EN.temas[t.id]) errores.push(`tema ${t.id}: falta en inglés`);
  [...(t.missions || []), ...(t.boss ? [t.boss] : [])].forEach(m => {
    const o = EN.misiones[m.id];
    if (!o) { errores.push(`misión ${m.id}: falta en inglés`); return; }
    revisarTexto(m.id, o);
    if (m.learn && (!o.learn || o.learn.length !== m.learn.length)) errores.push(`${m.id}: tarjetas ${o.learn ? o.learn.length : 0} ≠ ${m.learn.length}`);
    [['ch', m.ch || []], ['extra', m.extra || []]].forEach(([campo, lista]) => {
      const ol = o[campo] || [];
      if (ol.length !== lista.length) { errores.push(`${m.id}.${campo}: ${ol.length} retos ≠ ${lista.length}`); return; }
      lista.forEach((r, i) => {
        const e = ol[i], d = `${m.id}.${campo}[${i}] (${r.t})`;
        if (r.t !== 'esquema' && !e.q) errores.push(`${d}: falta la pregunta`);
        ['opts', 'items', 'pairs', 'bins'].forEach(k => { if (r[k] && (!e[k] || e[k].length !== r[k].length)) errores.push(`${d}: ${k} ${e[k] ? e[k].length : 0} ≠ ${r[k].length}`); });
        if (r.t === 'fill') {
          const pos = p => p.filter(x => typeof x === 'number').join(',');
          if (!e.parts || pos(e.parts) !== pos(r.parts)) errores.push(`${d}: los huecos de «parts» no coinciden`);
          if (!e.answers || e.answers.length !== r.answers.length) errores.push(`${d}: answers`);
          (e.bank || []).forEach(b => { if ((e.answers || []).includes(b)) errores.push(`${d}: «${b}» está en el banco y en las respuestas`); });
        }
        if (r.t === 'esquema') {
          const a = huecos(e), b = huecos(r);
          if (!a.length) errores.push(`${d}: el esquema no tiene huecos`);
          if (a.length !== b.length) avisos.push(`${d}: ${a.length} huecos en inglés y ${b.length} en castellano`);
          (e.extra || []).forEach(x => { if (a.some(y => y.toLowerCase() === x.toLowerCase())) errores.push(`${d}: la palabra de despiste «${x}» es una respuesta`); });
          const rep = a.map(x => x.toLowerCase()).filter((x, k, arr) => arr.indexOf(x) !== k); if (rep.length) errores.push(`${d}: huecos repetidos ${rep}`);
        }
      });
    });
  });
});
// Minijuegos: mismas preguntas en los dos idiomas
CURSO.temas.forEach(t => {
  if (!t.minijuego) return;
  const e = EN.temas[t.id] && EN.temas[t.id].minijuego;
  if (!e) { avisos.push(`tema ${t.id}: el minijuego no tiene versión en inglés`); return; }
  if (!e.titulo) errores.push(`tema ${t.id}: falta el título del minijuego`);
  const es0 = t.minijuego, igual = (a, b, que) => { if (!a || !b || a.length !== b.length) errores.push(`tema ${t.id}: ${que} del minijuego no coinciden (${(a || []).length} en inglés y ${(b || []).length} en castellano)`); else return true; };
  ['buenos', 'malos'].forEach(k => { if (es0[k] && igual(e[k], es0[k], k)) e[k].forEach((x, i) => { if (!x.n || x.e !== es0[k][i].e) errores.push(`tema ${t.id}: ${k} ${i + 1} del minijuego no coincide`); }); });
  ['intro', 'fin'].forEach(k => { if (es0[k] && !e[k]) errores.push(`tema ${t.id}: falta «${k}» del minijuego en inglés`); });
  if (es0.tipo === 'memoria') { if (igual(e.parejas, es0.parejas, 'las parejas')) e.parejas.forEach((p, i) => { if (!p[0] || !p[1]) errores.push(`tema ${t.id}: pareja ${i + 1} incompleta`); }); return; }
  if (es0.tipo === 'lluvia') {
    if (igual(e.rondas, es0.rondas, 'las rondas')) e.rondas.forEach((r, i) => { if (!r.meta) errores.push(`tema ${t.id}: falta la meta de la ronda ${i + 1}`);
      ['ok', 'no'].forEach(k => { if (igual(r[k], es0.rondas[i][k], `ronda ${i + 1} (${k})`)) r[k].forEach((x, j) => { if (!x.n || x.e !== es0.rondas[i][k][j].e) errores.push(`tema ${t.id}: ronda ${i + 1}, ${k} ${j + 1} no coincide`); }); }); });
    return;
  }
  if (t.minijuego.tipo === 'rescate') {
    const es = t.minijuego;
    if (!e.refugios || e.refugios.length !== es.refugios.length) errores.push(`tema ${t.id}: los refugios del minijuego no coinciden`);
    if (!e.animales || e.animales.length !== es.animales.length) errores.push(`tema ${t.id}: el minijuego tiene ${(e.animales || []).length} animales en inglés y ${es.animales.length} en castellano`);
    else e.animales.forEach((a, i) => { if (!a.n || a.e !== es.animales[i].e || a.g !== es.animales[i].g) errores.push(`tema ${t.id}: el animal ${i + 1} del minijuego no coincide con el castellano`); });
    return;
  }
  if (!e.preguntas || e.preguntas.length !== t.minijuego.preguntas.length) errores.push(`tema ${t.id}: el minijuego tiene ${(e.preguntas || []).length} preguntas en inglés y ${t.minijuego.preguntas.length} en castellano`);
  else e.preguntas.forEach((q, i) => { if (!q.q || !q.ok || !q.no) errores.push(`tema ${t.id}: pregunta ${i + 1} del minijuego incompleta`); });
});
// La aplicación debe poder ir y volver entre idiomas sin perder nada
const antes = JSON.stringify(CURSO.temas.map(t => [(t.missions || []).map(m => m.ch.map(r => r.q)), t.minijuego || null]));
ctx.I.aplicar(CURSO, 'en'); const enQ = CURSO.temas[0].missions[0].ch[0].q; ctx.I.aplicar(CURSO, 'es');
const despues = JSON.stringify(CURSO.temas.map(t => [(t.missions || []).map(m => m.ch.map(r => r.q)), t.minijuego || null]));
if (antes !== despues) errores.push('Al volver al castellano no se recuperan los textos originales');
if (!/How many/.test(enQ)) errores.push('La traducción no se aplica');
avisos.forEach(a => console.log('  aviso · ' + a));
errores.forEach(e => console.log('  ERROR · ' + e));
const n = Object.keys(EN.misiones).length;
console.log(errores.length ? `  ${errores.length} errores` : `  Contenidos en inglés correctos: ${n} misiones y jefes comprobados.`);
total += errores.length;
}
process.exit(total ? 1 : 0);
