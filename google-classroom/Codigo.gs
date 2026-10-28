/**
 * Exploradores de la Naturaleza · versión Google Classroom
 * ---------------------------------------------------------
 * Guarda el progreso de cada alumno en una hoja de cálculo del Drive del docente.
 * El alumno entra con su cuenta de Google del centro: no hay que crear usuarios.
 *
 * Instalación: ver INSTRUCCIONES.md (en esta misma carpeta).
 *
 * Datos que se guardan por alumno: cuenta del centro, nombre que escribe en el juego,
 * personaje, nivel, puntos, estrellas, insignias y fecha de la última partida.
 */

// Otros docentes que pueden ver el panel (además de la persona que publica el script).
// Ejemplo: const DOCENTES = ['otra.docente@murciaeduca.es'];
const DOCENTES = [];

const HOJA = 'Progreso';
const CABECERA = ['Cuenta', 'Nombre en el juego', 'Personaje', 'Nivel', 'XP', 'Estrellas', 'Insignias',
  'Tema 1', 'Tema 2', 'Tema 3', 'Tema 4', 'Tema 5', 'Tema 6', 'Última partida', 'Datos (no editar)'];
const COL_DATOS = CABECERA.length;          // última columna: progreso completo en JSON
const MAX_DATOS = 45000;                     // una celda admite 50.000 caracteres

function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
    .setTitle('Exploradores de la Naturaleza')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/** Inserta un archivo HTML del proyecto (lo usa index.html para cargar los contenidos). */
function include(nombre) {
  return HtmlService.createHtmlOutputFromFile(nombre).getContent();
}

/* ---------- Llamadas desde el juego ---------- */

function getState() {
  const email = cuentaActual_();
  const fila = buscarFila_(email);
  const docente = esDocente_(email);
  const datos = fila ? hoja_().getRange(fila, COL_DATOS).getValue() : '';
  return {
    email: email,
    teacher: docente,
    sheetUrl: docente ? libro_().getUrl() : null,
    profile: datos ? JSON.parse(datos) : null,
    settings: JSON.parse(PropertiesService.getScriptProperties().getProperty('AJUSTES') || '{}')
  };
}

function saveProgress(json, resumen) {
  const email = cuentaActual_();
  if (typeof json !== 'string' || json.length > MAX_DATOS) throw new Error('Datos no válidos');
  JSON.parse(json); // comprueba que es JSON válido
  const r = resumen || {};
  const temas = (r.temas || []).slice(0, 6);
  while (temas.length < 6) temas.push('');
  const valores = [email, texto_(r.name, 30), texto_(r.avatar, 12), num_(r.level), num_(r.xp), num_(r.stars), num_(r.badges)]
    .concat(temas.map(t => texto_(t, 12)))
    .concat([new Date(), json]);

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const h = hoja_();
    const fila = buscarFila_(email);
    if (fila) h.getRange(fila, 1, 1, valores.length).setValues([valores]);
    else h.appendRow(valores);
  } finally {
    lock.releaseLock();
  }
  return true;
}

function getClass() {
  soloDocente_();
  const h = hoja_();
  const n = h.getLastRow() - 1;
  if (n < 1) return [];
  return h.getRange(2, 1, n, COL_DATOS).getValues()
    .filter(f => f[0] && f[COL_DATOS - 1])
    .map(f => ({ email: String(f[0]), profile: JSON.parse(f[COL_DATOS - 1]) }));
}

function setSettings(ajustes) {
  soloDocente_();
  const limpio = { free: !!(ajustes && ajustes.free), open: {} };
  Object.keys((ajustes && ajustes.open) || {}).forEach(k => { if (ajustes.open[k]) limpio.open[String(k).slice(0, 30)] = true; });
  PropertiesService.getScriptProperties().setProperty('AJUSTES', JSON.stringify(limpio));
  return true;
}

function deleteStudent(email) {
  soloDocente_();
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const fila = buscarFila_(String(email).toLowerCase());
    if (fila) hoja_().deleteRow(fila);
  } finally {
    lock.releaseLock();
  }
  return true;
}

/* ---------- Funciones internas ---------- */

function cuentaActual_() {
  const email = (Session.getActiveUser().getEmail() || '').toLowerCase();
  if (!email) throw new Error('NO_EMAIL');
  return email;
}

function esDocente_(email) {
  const propietario = (Session.getEffectiveUser().getEmail() || '').toLowerCase();
  return email === propietario || DOCENTES.map(d => d.toLowerCase()).indexOf(email) >= 0;
}

function soloDocente_() {
  if (!esDocente_(cuentaActual_())) throw new Error('Solo el docente puede hacer esto');
}

function libro_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('HOJA_ID');
  if (id) {
    try { return SpreadsheetApp.openById(id); } catch (e) { /* la hoja se borró: se crea otra */ }
  }
  const libro = SpreadsheetApp.create('Exploradores de la Naturaleza · Progreso del alumnado');
  const h = libro.getSheets()[0];
  h.setName(HOJA);
  h.getRange(1, 1, 1, CABECERA.length).setValues([CABECERA]).setFontWeight('bold');
  h.setFrozenRows(1);
  h.hideColumns(COL_DATOS);
  props.setProperty('HOJA_ID', libro.getId());
  return libro;
}

function hoja_() {
  return libro_().getSheetByName(HOJA) || libro_().getSheets()[0];
}

function buscarFila_(email) {
  const h = hoja_();
  const n = h.getLastRow() - 1;
  if (n < 1) return 0;
  const cuentas = h.getRange(2, 1, n, 1).getValues();
  for (let i = 0; i < cuentas.length; i++) {
    if (String(cuentas[i][0]).toLowerCase() === email) return i + 2;
  }
  return 0;
}

function texto_(v, max) {
  const t = String(v == null ? '' : v).slice(0, max);
  return /^[=+\-@]/.test(t) ? "'" + t : t;   // evita que la hoja lo interprete como fórmula
}
function num_(v) { const n = Number(v); return isFinite(n) ? n : 0; }

/** Ejecuta esta función una vez desde el editor para crear la hoja y dar los permisos. */
function prepararHoja() {
  Logger.log('Hoja de progreso: ' + libro_().getUrl());
}
