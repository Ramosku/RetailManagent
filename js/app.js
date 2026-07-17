// ── SINCRONIZACIÓN / LIMPIEZA FIREBASE ───────────────
document.addEventListener('keydown', e=>{
  if(e.ctrlKey && e.shiftKey && e.key.toLowerCase()==='l'){
    e.preventDefault();
    const btn=document.getElementById('btn-sync');
    if(btn) btn.style.display = btn.style.display==='none' ? 'flex' : 'none';
  }
});

async function forzarSincronizacion(){
  if(!confirm('Esto sobrescribirá los datos en la nube con lo que ves aquí en tu tienda, eliminando cualquier dato viejo que ya no exista en la plataforma (categorías, registros borrados, etc). ¿Continuar?')) return;
  if(!window.__fb || !window.__fb.setData){ toast('No hay conexión con Firebase en este momento.','warn'); return; }
  try{
    window.__fb.suppress();
    await window.__fb.setData(DB);
    toast('Datos sincronizados y limpiados en la nube ✅','ok');
  }catch(e){
    console.error('Error al sincronizar:', e);
    toast('No se pudo sincronizar. Intenta de nuevo.','warn');
  }
}

// ── INIT ─────────────────────────────────────────────
function initApp(){
  document.getElementById('dash-date').textContent = new Date().toLocaleDateString('es-PE',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  const today = new Date();
  const mon = new Date(today); mon.setDate(today.getDate() - ((today.getDay()+6)%7));
  document.getElementById('hor-week').value = mon.toISOString().split('T')[0];
  populateSelects();
  renderAll();
  buildEvalPreguntas();
  initAuditChecklistSystem();
}

function renderAll(){
  renderDash(); renderVencimientos(); renderIncidencias();
  renderPersonal(); renderHorario(); renderEvaluaciones();
  renderFallos(); renderAuditHistory(); renderCaidas();
  buildLimpieza(); cargarFechasHistorialLim(); renderComunicados();
  renderCertificados();
}

// ── NAV ──────────────────────────────────────────────
const ADMIN_PASSWORD = 'admin2024';
const ADMIN_SECTIONS = ['personal','horarios','evaluaciones','auditorias','certificados'];

document.querySelectorAll('.nav-item').forEach(el=>{
  el.addEventListener('click',()=>{
    const sec = el.dataset.section;
    if(ADMIN_SECTIONS.includes(sec)){
      const pass = prompt('Esta sección es solo para el administrador.\nIngresa la contraseña:');
      if(pass === null) return;
      if(pass !== ADMIN_PASSWORD){ alert('Contraseña incorrecta.'); return; }
    }
    document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('sec-'+sec).classList.add('active');
    const titles={dashboard:'Dashboard general',comunicados:'Comunicados',vencimientos:'Control de vencimientos',incidencias:'Incidencias de recepción',limpieza:'Limpieza',auditorias:'Auditorías de Tienda',caidas:'Caídas de Servicio (Luz / SIP)',certificados:'Certificados',personal:'Mi equipo',horarios:'Horarios semanales',evaluaciones:'Evaluaciones'};
    document.getElementById('topbar-title').textContent = titles[sec]||sec;
    if(sec==='comunicados') markComunicadosRead();
    closeSidebar();
  });
});

// ── SIDEBAR MÓVIL ────────────────────────────────────
function toggleSidebar(){
  const sb = document.getElementById('main-sidebar');
  const ov = document.getElementById('sidebar-overlay');
  const open = sb.classList.toggle('open');
  ov.classList.toggle('open', open);
}
function closeSidebar(){
  document.getElementById('main-sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('open');
}

// ── TABS VENCIMIENTOS ────────────────────────────────
function switchTab(group, idx){
  if(group==='venc-tabs'){
    const card=document.getElementById('sec-vencimientos').querySelector('.card');
    const myTabs=card.querySelectorAll('.tab');
    myTabs.forEach((t,i)=>t.classList.toggle('active',i===idx));
    renderVencimientos(idx===0?null:idx);
  }
}
