function toggleTardanza(){
  const tipo=document.getElementById('asist-tipo').value;
  document.getElementById('grupo-minutos').style.display=tipo==='Tardanza'?'flex':'none';
}

function renderAsistencia(){
  const tbody=document.getElementById('asist-tbody');
  const filterUser=document.getElementById('asist-filter-user').value;
  const filterTipo=document.getElementById('asist-filter-tipo').value;
  let data=[...DB.asistencia].sort((a,b)=>b.id-a.id);
  if(filterUser) data=data.filter(a=>a.colab===filterUser);
  if(filterTipo) data=data.filter(a=>a.tipo===filterTipo);
  const mes=new Date().getMonth();
  const tardMes=DB.asistencia.filter(a=>new Date(a.fecha).getMonth()===mes&&a.tipo==='Tardanza').length;
  const faltMes=DB.asistencia.filter(a=>new Date(a.fecha).getMonth()===mes&&a.tipo==='Falta').length;
  const totalMin=DB.asistencia.filter(a=>new Date(a.fecha).getMonth()===mes&&a.tipo==='Tardanza').reduce((s,a)=>s+(a.horas*60+a.minutos),0);
  document.getElementById('asist-metrics').innerHTML=`
    <div class="metric"><div class="m-label"><i class="ti ti-clock"></i>Tardanzas</div><div class="m-val" style="color:var(--purple)">${tardMes}</div></div>
    <div class="metric"><div class="m-label"><i class="ti ti-calendar-off"></i>Faltas</div><div class="m-val" style="color:var(--red)">${faltMes}</div></div>
    <div class="metric"><div class="m-label"><i class="ti ti-hourglass"></i>Minutos</div><div class="m-val" style="color:var(--amber)">${totalMin}</div></div>`;
  if(!data.length){ tbody.innerHTML='<tr><td colspan="7"><div class="empty-state"><i class="ti ti-mood-happy"></i>Sin registros</div></td></tr>'; return; }
  tbody.innerHTML=data.map(a=>{
    const tipoBadge=a.tipo==='Tardanza'?'badge-warn':'badge-danger';
    const tiempo=a.tipo==='Tardanza'?`${a.horas}h ${a.minutos}min`:'—';
    return `<tr>
      <td>${fmtDate(a.fecha)}</td><td><strong>${a.colab}</strong></td>
      <td><span class="badge ${tipoBadge}">${a.tipo}</span></td><td>${tiempo}</td>
      <td style="font-size:12px">${a.motivo||'—'}</td>
      <td style="font-size:12px;color:var(--text2)">${a.registradoPor}</td>
      <td><button class="btn btn-icon btn-sm btn-danger" onclick="delAsist(${a.id})"><i class="ti ti-trash"></i></button></td>
    </tr>`;
  }).join('');
}

function saveAsist(){
  const colab=document.getElementById('asist-colab').value;
  const fecha=document.getElementById('asist-fecha').value;
  const tipo=document.getElementById('asist-tipo').value;
  if(!colab||!fecha){ alert('Completa los campos.'); return; }
  const horas=tipo==='Tardanza'?(parseInt(document.getElementById('asist-horas').value)||0):0;
  const minutos=tipo==='Tardanza'?(parseInt(document.getElementById('asist-minutos').value)||0):0;
  if(tipo==='Tardanza'&&horas===0&&minutos===0){ alert('Ingresa el tiempo.'); return; }
  DB.asistencia.push({id:uid('asist'), colab, fecha, tipo, horas, minutos, motivo:document.getElementById('asist-motivo').value.trim(), registradoPor:currentUser});
  if(tipo==='Falta'){
    const p=DB.personal.find(x=>x.nombre===colab);
    if(p) aplicarFaltaAHorario(p.id, fecha);
  }
  saveDB(); closeModal('m-asist');
  ['asist-colab','asist-fecha','asist-horas','asist-minutos','asist-motivo'].forEach(id=>document.getElementById(id).value='');
  renderAsistencia(); renderHorario(); renderDash();
}

function delAsist(id){
  if(!confirm('¿Eliminar?')) return;
  DB.asistencia=DB.asistencia.filter(x=>x.id!==id);
  saveDB(); renderAsistencia(); renderDash();
}