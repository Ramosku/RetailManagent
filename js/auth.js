// ── TIENDAS ──────────────────────────────────────────
// Login compartido por tienda. Cada tienda ingresa su
// propio código/usuario y contraseña; cada una tiene sus datos separados
// en Firebase. Ya no depende de una lista fija: se puede agregar cuantas
// tiendas se quiera sin tocar este archivo.
// Si el código coincide con uno de esta lista se muestra su nombre bonito;
// si no, se muestra el código tal cual se escribió.
const TIENDAS = [
  { id:"1268", nombre:"1268 - SPSA MOCHE8 TRU MS" },
  { id:"1293", nombre:"1293 - SPSA EJERCI999TRU MS" },
  { id:"1300", nombre:"1300 - SPSA JERUSA4TRUMS" },
  { id:"1304", nombre:"1304 - SPSA VALLEJO10TRU MS" },
  { id:"1340", nombre:"1340 - SPSA UCEDAA9 TRU MS" },
  { id:"1447", nombre:"1447 - SPSA INCAS 4 TRU MS" },
  { id:"1474", nombre:"1474 - SPSA WICHAN 30 TRU MS" },
  { id:"1609", nombre:"1609 - SPSA SANTA 13 TRU MS" },
  { id:"1610", nombre:"1610 - SPSA INDOAME 5 TRU MS" },
  { id:"1615", nombre:"1615 - SPSA PRADA O13 TRU MS" },
  { id:"1616", nombre:"1616 - SPSA VALLEJO 4 TRU MS" },
  { id:"1718", nombre:"1718 - EJERCI3 TRU MS" },
  { id:"2171", nombre:"2171 - SPSA ESPAÑA24 TRU MS" },
  { id:"2244", nombre:"2244 - SPSA ANCASH4 TRU MS" },
  { id:"2254", nombre:"2254 - SPSA 22FEB26 TRU MS" },
  { id:"2396", nombre:"2396 - SPSA SALVA6 TRU MS" },
  { id:"2410", nombre:"2410 - SPSA MARISCAL1 TRU MS" },
  { id:"2453", nombre:"2453 - SPSA OLAYA37 TRU MS" },
  { id:"2632", nombre:"2632 - SPSA CAJAMARCA755 TRU MS" }
];
function tiendaEmail(id){ return `tienda${id}@tiendasmass.app`; }

let currentUser = '';
let currentTiendaId = '';

// ── LOGIN ────────────────────────────────────────────
async function doLogin(){
  const t = document.getElementById('login-user').value.trim();
  const p = document.getElementById('login-pass').value;
  const err = document.getElementById('login-error');
  const btn = document.querySelector('.btn-login');
  if(!t){ err.style.display='block'; err.textContent='Ingresa tu usuario.'; return; }
  if(!p){ err.style.display='block'; err.textContent='Ingresa la contraseña.'; return; }
  if(!window.__fb || !window.__fb.login){
    err.style.display='block'; err.textContent='No se pudo conectar con el sistema de acceso. Intenta de nuevo.';
    return;
  }
  if(btn){ btn.disabled = true; btn.innerHTML = 'Ingresando...'; }
  try{
    await window.__fb.login(tiendaEmail(t), p);
    err.style.display='none';
    currentTiendaId = t;
    currentUser = (TIENDAS.find(x=>x.id===t)||{}).nombre || t;
    STORE_KEY = STORE_PREFIX + t;
    DB = loadDB();
    window.__fb.setTienda(t);
    document.getElementById('login-screen').style.display='none';
    document.getElementById('app').style.display='flex';
    document.getElementById('topbar-user').textContent = currentUser;

    // Siempre arrancar en el Dashboard, sin importar dónde te quedaste antes
    document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
    document.querySelector('.nav-item[data-section="dashboard"]').classList.add('active');
    document.getElementById('sec-dashboard').classList.add('active');
    document.getElementById('topbar-title').textContent = 'Dashboard general';
    closeSidebar();

    firestoreReady = false;
    await initFirestoreSync();
    initApp();
  }catch(e){
    err.style.display='block';
    err.textContent='Usuario o contraseña incorrectos.';
  }finally{
    if(btn){ btn.disabled = false; btn.innerHTML = '<i class="ti ti-login"></i> Ingresar'; }
  }
}

function doLogout(){
  if(window.__fb && window.__fb.logout) window.__fb.logout();
  currentUser=''; currentTiendaId=''; firestoreReady = false;
  document.getElementById('login-screen').style.display='flex';
  document.getElementById('app').style.display='none';
  document.getElementById('login-pass').value='';
  document.getElementById('login-user').value='';
}
