/**
 * Comprueba que contenidos-en.js encaja con contenidos.js (mismo número y orden de tarjetas,
 * retos, opciones, grupos, parejas y huecos) y que no quedan textos en castellano.
 * Uso:  node tools/validar_ingles.js
 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const raiz = path.resolve(__dirname, '..');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(raiz, 'contenidos.js'), 'utf8') + '\n' + fs.readFileSync(path.join(raiz, 'contenidos-en.js'), 'utf8') +
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
// La aplicación debe poder ir y volver entre idiomas sin perder nada
const antes = JSON.stringify(CURSO.temas.map(t => (t.missions || []).map(m => m.ch.map(r => r.q))));
ctx.I.aplicar(CURSO, 'en'); const enQ = CURSO.temas[0].missions[0].ch[0].q; ctx.I.aplicar(CURSO, 'es');
const despues = JSON.stringify(CURSO.temas.map(t => (t.missions || []).map(m => m.ch.map(r => r.q))));
if (antes !== despues) errores.push('Al volver al castellano no se recuperan los textos originales');
if (!/How many/.test(enQ)) errores.push('La traducción no se aplica');
avisos.forEach(a => console.log('  aviso · ' + a));
errores.forEach(e => console.log('  ERROR · ' + e));
const n = Object.keys(EN.misiones).length;
console.log(errores.length ? `\n${errores.length} errores` : `\nContenidos en inglés correctos: ${n} misiones y jefes comprobados.`);
process.exit(errores.length ? 1 : 0);
