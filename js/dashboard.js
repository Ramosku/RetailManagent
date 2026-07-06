function refreshDash(){ renderDash(); }

function renderDash(){
  const vencProx = DB.vencimientos.filter(v=>{ const d=daysLeft(calcRetiro(v.categoria,v.fecha)); return d!==null&&d<=7&&d>=0; }).length;
  const incAbiertas = DB.incidencias.filter(i=>i.estado!=='Resuelto').length;

  // Faltas del mes actual contadas desde horarios
  let faltasMes = 0;
  const ahora = new Date();
  const mesActual = ahora.getMonth();
  const anioActual = ahora.getFullYear();
  Object.entries(DB.horarios||{}).forEach(([weekKey, semana])=>{
    const semFecha = new Date(weekKey+'T00:00:00');
    if(semFecha.getFullYear()!==anioActual) return;
    Object.values(semana).forEach(persona=>{
      Object.entries(persona).forEach(([dk, cell])=>{
        if(cell && cell.tipo==='F'){
          // Calcular fecha real del día dk de esa semana
          const dkIdx = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].indexOf(dk);
          if(dkIdx<0) return;
          const fechaDia = new Date(semFecha);
          fechaDia.setDate(semFecha.getDate()+dkIdx);
          if(fechaDia.getMonth()===mesActual) faltasMes++;
        }
      });
    });
  });

  document.getElementById('d-personal').textContent = DB.personal.filter(p=>p.estado==='Activo').length;
  document.getElementById('d-venc').textContent = vencProx;
  document.getElementById('d-inc').textContent = incAbiertas;
  document.getElementById('d-faltas').textContent = faltasMes;

  const alertBox = document.getElementById('dash-alerts');
  let html='';
  DB.vencimientos.map(v=>({...v, retiro:calcRetiro(v.categoria,v.fecha)})).filter(v=>{ const d=daysLeft(v.retiro); return d!==null&&d<=3&&d>=0; }).slice(0,4).forEach(v=>{
    const d=daysLeft(v.retiro);
    html+=`<div class="alert alert-danger"><i class="ti ti-calendar-x"></i>${v.nombre} — retirar ${d===0?'HOY':'en '+d+'d'}</div>`;
  });
  const fallosPend = DB.fallos.filter(f=>f.estado==='Pendiente').length;
  if(fallosPend>0){
    html+=`<div class="alert alert-warn"><i class="ti ti-alert-circle"></i><strong>${fallosPend} fallos</strong> pendientes de subsanar (ver Auditorías)</div>`;
  }
  (DB.certificados||[]).map(c=>({...c, dias:daysLeft(c.vencimiento)}))
    .filter(c=>c.dias!==null && c.dias<=7)
    .sort((a,b)=>a.dias-b.dias).slice(0,4).forEach(c=>{
      const txt = c.dias<0 ? `vencido hace ${Math.abs(c.dias)}d` : c.dias===0 ? 'vence HOY' : `vence en ${c.dias}d`;
      html+=`<div class="alert alert-danger"><i class="ti ti-certificate"></i>Certificado <strong>${c.nombre}</strong> ${txt}</div>`;
    });
  const caidasHoy = (DB.caidas||[]).filter(c=>c.fecha===today());
  caidasHoy.forEach(c=>{
    const icon = c.tipo==='Luz' ? 'ti-bolt-off' : 'ti-credit-card-off';
    const dur = fmtHoras(calcHoras(c.horaInicio,c.horaFin));
    html+=`<div class="alert alert-warn"><i class="ti ${icon}"></i>Caída de <strong>${c.tipo}</strong> hoy de ${c.horaInicio} a ${c.horaFin} (${dur})</div>`;
  });
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

  const caidasBox = document.getElementById('dash-caidas-list');
  if(caidasBox){
    const recentCaidas = [...(DB.caidas||[])].sort((a,b)=>(b.fecha+b.horaInicio).localeCompare(a.fecha+a.horaInicio)).slice(0,4);
    if(!recentCaidas.length){ caidasBox.innerHTML='<p class="text-muted">Sin caídas registradas.</p>'; }
    else {
      let cHtml='<table><thead><tr><th>Fecha</th><th>Tipo</th><th>Horario</th><th>Duración</th></tr></thead><tbody>';
      recentCaidas.forEach(c=>{
        const badge = c.tipo==='Luz' ? 'badge-warn' : 'badge-purple';
        const dur = fmtHoras(calcHoras(c.horaInicio,c.horaFin));
        cHtml+=`<tr><td>${fmtDate(c.fecha)}</td><td><span class="badge ${badge}">${c.tipo}</span></td><td>${c.horaInicio}–${c.horaFin}</td><td><strong>${dur}</strong></td></tr>`;
      });
      caidasBox.innerHTML=cHtml+'</tbody></table>';
    }
  }
}
