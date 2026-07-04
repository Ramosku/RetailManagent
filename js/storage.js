// ── ESTADO GLOBAL ────────────────────────────────────
const STORE_PREFIX = 'rm_data_v3_';
let STORE_KEY = null;
let DB = null;

function loadDB(){
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if(raw) return migrateDB(JSON.parse(raw));
  } catch(e){}
  return {
    personal: [],
    vencimientos: [],
    incidencias: [],
    evaluaciones: [],
    horarios: {},
    limpiezaCustomTasks: [],
    limpiezaTareasGenerales: [...LIM_TAREAS_GENERALES_DEFAULT],
    limpiezaTareasBano: [...LIM_BANO_OFICINA_DEFAULT],
    auditorias: [],
    fallos: [],
    auditChecklistHistory: [],
    caidas: [],
    historicFallosLoaded: true,
    nextId: {venc:1, inc:1, eval:1, pers:1, aud:1, fallo:1, caida:1}
  };
}

function saveDB(){
  if(!STORE_KEY) return;
  localStorage.setItem(STORE_KEY, JSON.stringify(DB));
  if(window.__fb && window.__fb.setData){
    window.__fb.suppress();
    window.__fb.setData(DB).catch(e=>{
      console.error('Error guardando en Firestore:', e);
      toast('Sin conexión: guardado solo localmente','warn');
    });
  }
}

function migrateDB(parsed){
  if(parsed.limpiezaCustomTasks===undefined) parsed.limpiezaCustomTasks=[];
  if(!parsed.limpiezaTareasGenerales) parsed.limpiezaTareasGenerales=[...LIM_TAREAS_GENERALES_DEFAULT];
  if(!parsed.limpiezaTareasBano) parsed.limpiezaTareasBano=[...LIM_BANO_OFICINA_DEFAULT];
  if(!parsed.fallos) parsed.fallos = [];
  if(!parsed.auditChecklistHistory) parsed.auditChecklistHistory = [];
  if(!parsed.personal) parsed.personal = [];
  if(!parsed.vencimientos) parsed.vencimientos = [];
  if(!parsed.incidencias) parsed.incidencias = [];
  if(!parsed.evaluaciones) parsed.evaluaciones = [];
  if(!parsed.horarios) parsed.horarios = {};
  if(!parsed.caidas) parsed.caidas = [];
  if(!parsed.nextId) parsed.nextId = {venc:1, inc:1, eval:1, pers:1, aud:1, fallo:1, caida:1};
  if(!parsed.nextId.caida) parsed.nextId.caida = 1;
  parsed.historicFallosLoaded = true;
  return parsed;
}

// ── FIRESTORE SYNC ───────────────────────────────────
let firestoreReady = false;
async function initFirestoreSync(){
  if(!window.__fb || !window.__fb.getData){
    console.warn('Firebase no disponible, usando solo almacenamiento local.');
    return;
  }
  try {
    const remote = await window.__fb.getData();
    if(remote) DB = migrateDB(remote);
    else await window.__fb.setData(DB);
    firestoreReady = true;
  } catch(e){
    console.error('No se pudo conectar a Firestore, usando datos locales:', e);
  }
  window.__fb.watch((remote)=>{
    DB = migrateDB(remote);
    localStorage.setItem(STORE_KEY, JSON.stringify(DB));
    if(currentUser) renderAll();
  });
}
