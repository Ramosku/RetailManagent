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
  renderFallos(); renderAuditHistory();
  buildLimpieza(); cargarFechasHistorialLim();
}

// ── NAV ──────────────────────────────────────────────
document.querySelectorAll('.nav-item').forEach(el=>{
  el.addEventListener('click',()=>{
    document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
    el.classList.add('active');
    const sec = el.dataset.section;
    document.getElementById('sec-'+sec).classList.add('active');
    const titles={dashboard:'Dashboard general',vencimientos:'Control de vencimientos',incidencias:'Incidencias de recepción',limpieza:'Limpieza',auditorias:'Auditorías de Tienda',personal:'Mi equipo',horarios:'Horarios semanales',evaluaciones:'Evaluaciones'};
    document.getElementById('topbar-title').textContent = titles[sec]||sec;
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
