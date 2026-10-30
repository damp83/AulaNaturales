/**
 * Genera las fichas en papel de los esquemas (2.º de Primaria) a partir de contenidos.js.
 *
 * Uso (desde la raíz del repositorio):   node tools/fichas/generar_fichas.js
 * Crea en la carpeta fichas/:
 *   tema-1-esquemas.pdf … tema-6-esquemas.pdf   (una ficha por página, para el alumnado)
 *   solucionario-esquemas.pdf                   (todas las fichas resueltas, para el docente)
 *
 * © 2026 Diego Alberto Moya Puerta, Maestro de Educación Primaria, Comunidad Autónoma de la Región de Murcia · Licencia CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es)
 *
 * Necesita Node y Playwright con Chromium. Las tipografías (Andika y Lilita One, licencia OFL)
 * están en esta misma carpeta y se incrustan en el PDF.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { chromium } = require('playwright');

const RAIZ = path.resolve(__dirname, '..', '..');
const SALIDA = path.join(RAIZ, 'fichas');

// ---------- Datos ----------
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(RAIZ, 'contenidos.js'), 'utf8') + ';this.CURSO = CURSO;', ctx);
const CURSO = ctx.CURSO;

// Colores de cada tema: borde fuerte y fondo suave (se leen bien también en blanco y negro)
const COLORES = {
  '--sense': ['#1A6FB0', '#E3F2FD'], '--bone': ['#9A6B12', '#FFF4DC'], '--lung': ['#B8304F', '#FDE7EC'],
  '--food': ['#C2620E', '#FFEEDD'], '--ok': ['#1F8A3B', '#E3F6E8'], '--virus': ['#3E8A1C', '#EAF7DF'],
  '--gold': ['#A67B00', '#FFF6D6'], '--opt1': ['#0F4C85', '#E1EEFA']
};
const color = c => COLORES[c] || COLORES['--sense'];

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const partes = t => String(t).split(/(\[\[[^\]]+\]\])/).filter(Boolean);

function respuestas(e) {
  const out = [];
  const walk = t => partes(t).forEach(p => { const m = p.match(/^\[\[(.+)\]\]$/); if (m) out.push(m[1]); });
  walk(e.titulo || '');
  (function rec(ns) { ns.forEach(n => { walk(n.txt); rec(n.hijos || []); }); })(e.nodos || []);
  return out;
}

// Barajado estable (siempre el mismo orden para la misma ficha) y distinto del orden del esquema
function barajar(arr, semilla) {
  let s = [...semilla].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const r = () => (s = (s * 1103515245 + 12345) >>> 0) / 4294967296;
  let a = arr.slice();
  for (let intento = 0; intento < 20; intento++) {
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    if (a.length < 2 || a.some((v, i) => v !== arr[i])) break;
  }
  return a;
}

// ---------- Maquetación de una ficha ----------
function ficha(tema, mision, k, e, resuelta) {
  const [fuerte, suave] = color(mision.color);
  const ans = respuestas(e);
  let g = 0;
  const hueco = palabra => {
    // Ancho pensado para letra de 7-8 años (unos 6 mm por letra)
    const ancho = Math.min(Math.max(palabra.length * 0.62 + 1.0, 2.8), 7.5).toFixed(1);
    return `<span class="hueco" style="width:${ancho}cm">${resuelta ? `<span class="sol">${esc(palabra)}</span>` : ''}</span>`;
  };
  const txt = t => partes(t).map(p => { const m = p.match(/^\[\[(.+)\]\]$/); if (m) { g++; return hueco(m[1]); } return esc(p); }).join('');

  const titulo = `<div class="raiz">${txt(e.titulo || '')}</div>`;
  let esquema;
  if (e.tipo === 'flujo') {
    esquema = `<div class="esquema flujo">${titulo}<ol>${e.nodos.map((n, i) => `<li><span class="num">${i + 1}</span><span class="caja">${txt(n.txt)}</span></li>`).join('')}</ol></div>`;
  } else {
    const cols = e.nodos.length === 4 ? 2 : Math.min(e.nodos.length, 3);
    esquema = `<div class="esquema arbol">${titulo}<div class="ramas" style="grid-template-columns:repeat(${cols},1fr)">${e.nodos.map(n => `
      <div class="rama"><div class="caja">${txt(n.txt)}</div>${(n.hijos || []).length ? `<ul>${n.hijos.map(h => `<li>${txt(h.txt)}</li>`).join('')}</ul>` : ''}</div>`).join('')}</div></div>`;
  }

  const banco = barajar(ans, mision.id);
  return `<section class="pagina" style="--fuerte:${fuerte};--suave:${suave}">
    <header>
      <div class="datos"><span>Nombre: <i class="linea larga"></i></span><span>Fecha: <i class="linea"></i></span></div>
      <div class="sello">Tema ${tema.n}</div>
    </header>
    <div class="cab">
      ${GLO}
      <div><h1>${esc(mision.title)}</h1><p class="sub">Tema ${tema.n} · ${esc(tema.title)} · Misión ${k + 1}${mision.pages ? ' · Libro, ' + esc(mision.pages.replace('Págs.', 'págs.')) : ''}</p></div>
      ${resuelta ? '<div class="marca-sol">Solucionario</div>' : ''}
    </div>
    <p class="consigna"><b>1.</b> Lee las palabras del recuadro. <b>2.</b> Escribe cada palabra en su hueco. <b>3.</b> Tacha la palabra cuando la uses.</p>
    <div class="banco">${banco.map(w => `<span class="palabra"><i class="check"></i>${esc(w)}</span>`).join('')}</div>
    ${esquema}
    ${resuelta ? '' : `<div class="pie">
      <div class="dibujo"><b>Haz un dibujo sobre este esquema.</b></div>
      <div class="auto"><b>¿Cómo lo he hecho?</b><p>Colorea una cara.</p>
        <div class="caras"><span>${CARA(0)}¡Muy bien!</span><span>${CARA(1)}Bien</span><span>${CARA(2)}Tengo que repasar</span></div></div>
    </div>`}
    <footer class="licencia"><span>Exploradores de la Naturaleza · Licencia CC BY-NC-SA 4.0</span><span>© 2026 Diego Alberto Moya Puerta, Maestro de Educación Primaria, Comunidad Autónoma de la Región de Murcia</span></footer>
  </section>`;
}

const GLO = `<svg class="glo" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="66" r="44" fill="#FF8A9A" stroke="#222" stroke-width="5"/>
  <path d="M28 34q32-42 64 0z" fill="#F7E2A8" stroke="#222" stroke-width="4"/><rect x="18" y="30" width="84" height="9" rx="4.5" fill="#EBCB7A" stroke="#222" stroke-width="4"/>
  <circle cx="46" cy="62" r="7" fill="#fff" stroke="#222" stroke-width="3"/><circle cx="74" cy="62" r="7" fill="#fff" stroke="#222" stroke-width="3"/>
  <circle cx="47" cy="63" r="3.5" fill="#222"/><circle cx="75" cy="63" r="3.5" fill="#222"/><path d="M48 80q12 10 24 0" fill="none" stroke="#222" stroke-width="4.5" stroke-linecap="round"/></svg>`;
const CARA = n => {
  const boca = ['M14 25q8 8 16 0', 'M14 27h16', 'M14 29q8 -7 16 0'][n];
  return `<svg class="cara" viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" fill="#fff" stroke="#222" stroke-width="2.5"/><circle cx="15.5" cy="17" r="2.5" fill="#222"/><circle cx="28.5" cy="17" r="2.5" fill="#222"/><path d="${boca}" fill="none" stroke="#222" stroke-width="2.5" stroke-linecap="round"/></svg>`;
};

function fuente(nombre, archivo, peso) {
  const b64 = fs.readFileSync(path.join(__dirname, archivo)).toString('base64');
  return `@font-face{font-family:'${nombre}';font-weight:${peso};src:url(data:font/woff2;base64,${b64}) format('woff2');}`;
}

const CSS = `
${fuente('Andika', 'Andika-Regular.woff2', 400)}${fuente('Andika', 'Andika-Bold.woff2', 700)}${fuente('Lilita One', 'LilitaOne.woff2', 400)}
@page{size:A4;margin:11mm 12mm}
*{box-sizing:border-box}
body{margin:0;font-family:'Andika',sans-serif;font-size:15pt;color:#1d1d1d;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.pagina{height:273mm;display:flex;flex-direction:column;gap:4mm;page-break-after:always;break-after:page;overflow:hidden}
.pagina:last-child{page-break-after:auto;break-after:auto}
header{display:flex;justify-content:space-between;align-items:center;gap:6mm;font-size:13pt}
.datos{display:flex;gap:8mm;flex-wrap:wrap}
.linea{display:inline-block;width:32mm;border-bottom:1.5px solid #333;height:1em;vertical-align:-2px}
.linea.larga{width:70mm}
.sello{font-family:'Lilita One';background:var(--fuerte);color:#fff;border-radius:999px;padding:1mm 5mm;font-size:13pt}
.cab{display:flex;align-items:center;gap:4mm}
.glo{width:17mm;height:17mm;flex:none}
h1{font-family:'Lilita One';font-weight:400;color:var(--fuerte);font-size:23pt;margin:0;line-height:1.1}
.sub{margin:1mm 0 0;font-size:11pt;color:#555}
.marca-sol{margin-left:auto;font-family:'Lilita One';color:#C62828;border:2px solid #C62828;border-radius:3mm;padding:1mm 4mm;transform:rotate(-4deg)}
.consigna{margin:0;font-size:13pt;background:#F4F4F4;border-radius:3mm;padding:2mm 4mm}
.banco{display:flex;flex-wrap:wrap;justify-content:center;gap:3mm 6mm;border:2.5px dashed var(--fuerte);border-radius:5mm;padding:3mm 5mm;background:var(--suave)}
.palabra{display:inline-flex;align-items:center;gap:2mm;font-weight:700;font-size:16pt}
.check{display:inline-block;width:4.5mm;height:4.5mm;border:1.5px solid #333;border-radius:1mm;background:#fff}
.esquema{display:flex;flex-direction:column;align-items:center;gap:4mm}
.raiz{font-family:'Lilita One';font-size:19pt;background:var(--suave);border:3px solid var(--fuerte);border-radius:5mm;padding:2mm 7mm;text-align:center;line-height:1.9}
.ramas{display:grid;gap:4mm;width:100%;border-top:2.5px solid var(--fuerte);padding-top:4mm}
.rama{display:flex;flex-direction:column;gap:2.5mm;min-width:0}
.caja{display:block;border:2.5px solid var(--fuerte);border-radius:4mm;padding:2mm 3mm;text-align:center;font-weight:700;line-height:2.1;background:#fff}
.rama ul{list-style:none;margin:0;padding:0 0 0 4mm;border-left:2.5px solid var(--fuerte);display:flex;flex-direction:column;gap:2mm}
.rama li{border:1.5px solid #bbb;border-radius:3mm;padding:1.5mm 3mm;line-height:2.1;font-size:14pt}
.flujo ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;align-items:center;gap:2.2mm;width:100%}
.flujo li{display:flex;align-items:center;gap:3mm;width:150mm;position:relative}
.flujo li+li{margin-top:4mm}
.flujo .caja{line-height:1.9;padding:1.5mm 3mm;text-align:left}
.flujo li+li::before{content:"";position:absolute;left:75mm;top:-6.5mm;border:2.6mm solid transparent;border-top:3.6mm solid var(--fuerte)}
.flujo .caja{flex:1}
.num{font-family:'Lilita One';width:10mm;height:10mm;border-radius:50%;background:var(--fuerte);color:#fff;display:grid;place-items:center;flex:none;font-size:14pt}
.hueco{display:inline-block;max-width:100%;height:1.6em;vertical-align:-0.45em;border-bottom:2px solid #222;margin:0 1.5mm;position:relative}
.sol{position:absolute;left:0;right:0;bottom:1px;text-align:center;color:#C62828;font-weight:700;line-height:1.2}
.flujo .hueco{max-width:5.2cm}
.licencia{font-size:7.5pt;color:#777;text-align:center;margin-top:auto;padding-top:1mm;display:flex;flex-direction:column;line-height:1.3}
.licencia span{white-space:nowrap}
.pie{flex:1 0 auto;display:grid;grid-template-columns:1fr 66mm;gap:5mm;min-height:30mm}
.dibujo{border:2.5px dashed #999;border-radius:5mm;padding:2mm 4mm;font-size:12pt;color:#555}
.auto{border:2.5px solid #999;border-radius:5mm;padding:2mm 4mm;font-size:12pt;display:flex;flex-direction:column}
.auto p{margin:0 0 2mm;color:#555}
.caras{display:grid;grid-template-columns:repeat(3,1fr);gap:2mm;font-size:10.5pt;text-align:center;line-height:1.15}
.caras span{display:flex;flex-direction:column;align-items:center;gap:1mm}
.cara{width:12mm;height:12mm}
`;

(async () => {
  fs.mkdirSync(SALIDA, { recursive: true });
  const browser = await chromium.launch();
  // Mismo ancho que el área imprimible de un A4 (210 mm − 24 mm de márgenes), para medir como en el papel
  const pagina = await browser.newPage({ viewport: { width: Math.round(186 / 25.4 * 96), height: 1100 } });
  const doc = cuerpo => `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>${CSS}</style></head><body>${cuerpo}</body></html>`;
  const pdf = async (html, nombre) => {
    await pagina.setContent(html, { waitUntil: 'load' });
    await pagina.evaluate(() => document.fonts.ready);
    await pagina.emulateMedia({ media: 'print' });
    // Si una ficha no cabe en su página, reduce un poco el esquema (sin bajar del 72 %) hasta que quepa
    const ajustes = await pagina.evaluate(() => [...document.querySelectorAll('.pagina')].map(p => {
      const esq = p.querySelector('.esquema'), banco = p.querySelector('.banco');
      const cabe = () => p.scrollHeight <= p.clientHeight + 1;
      let z = 1;
      while (!cabe() && z > 0.73) { z -= 0.03; esq.style.zoom = z; if (z < 0.9) banco.style.zoom = Math.max(z, 0.85); }
      return { titulo: p.querySelector('h1').textContent, zoom: Math.round(z * 100), cabe: cabe() };
    }));
    ajustes.filter(a => a.zoom < 100).forEach(a => console.log(`    «${a.titulo}» reducido al ${a.zoom} %`));
    const desbordes = ajustes.filter(a => !a.cabe).map(a => a.titulo);
    if (desbordes.length) console.warn('  Atención: no cabe en una página →', desbordes.join(', '));
    await pagina.pdf({ path: path.join(SALIDA, nombre), format: 'A4', printBackground: true, preferCSSPageSize: true });
    console.log('  ' + nombre);
  };
  const solucion = [];
  for (const tema of CURSO.temas) {
    const fichas = [];
    (tema.missions || []).forEach((m, k) => {
      const e = (m.ch || []).find(c => c.t === 'esquema');
      if (!e) return;
      fichas.push(ficha(tema, m, k, e, false));
      solucion.push(ficha(tema, m, k, e, true));
    });
    if (fichas.length) await pdf(doc(fichas.join('')), `tema-${tema.n}-esquemas.pdf`);
  }
  await pdf(doc(solucion.join('')), 'solucionario-esquemas.pdf');
  await browser.close();
  console.log('Fichas generadas en ' + SALIDA);
})();
