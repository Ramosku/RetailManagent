function refreshDash(){ renderDash(); }

function renderDash(){
  const vencProx = DB.vencimientos.filter(v=>{ const d=daysLeft(v.fecha); return d!==null&&d<=7&&d>=0; }).length;
  const incAbiertas = DB.incidencias.filter(i=>i.estado!=='Resuelto').length;
  const tardMes = DB.asistencia.filter(a=>{ const m=new Date().getMonth(); const am=new Date(a.fecha).getMonth(); return am===m&&a.tipo==='Tardanza'; }).length;
  document.getElementById('d-personal').textContent = DB.personal.filter(p=>p.estado==='Activo').length;
  document.getElementById('d-venc').textContent = vencProx;
  document.getElementById('d-inc').textContent = incAbiertas;
  document.getElementById('d-tard').textContent = tardMes;
  
  const alertBox = document.getElementById('dash-alerts');
  let html='';
  DB.vencimientos.filter(v=>{ const d=daysLeft(v.fecha); return d!==null&&d<=3&&d>=0; }).slice(0,4).forEach(v=>{
    const d=daysLeft(v.fecha);
    html+=`<div class="alert alert-danger"><i class="ti ti-calendar-x"></i>${v.nombre} — vence en ${d===0?'HOY':d+'d'}</div>`;
  });
  const fallosPend = DB.fallos.filter(f=>f.estado==='Pendiente').length;
  if(fallosPend>0){
    html+=`<div class="alert alert-warn"><i class="ti ti-alert-circle"></i><strong>${fallosPend} fallos</strong> pendientes de subsanar (ver Auditorías)</div>`;
  }
  if(!html) html='<div class="alert alert-ok"><i class="ti ti-check"></i>Sin alertas críticas</div>';
  alertBox.innerHTML=html;
  
  const incBox = document.getElementById('dash-inc-list');
  const recent = [...DB.incidencias].sort((a,b)=>b.id-a.id).slice(0,4);
  if(!recent.length){ incBox.innerHTML='<p class="text-muted">Sin incidencias.</p>'; return; }
  let iHtml='<table><thead><tr><th>Proveedor</th><th>Tipo</th><th>Estado</th></tr></thead><tbody>';
  recent.forEach(i=>{
    const badge=i.estado==='Pendiente'?'badge-danger':i.estado==='En revisión'?'badge-warn':'badge-ok';
    iHtml+=`<tr><td>${i.proveedor}</td><td>${i.tipo}</td><td><span class="badge ${badge}">${i.estado}</span></td></tr>`;
  });
  incBox.innerHTML=iHtml+'</tbody></table>';
}