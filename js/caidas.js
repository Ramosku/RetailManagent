// ── CAÍDAS DE SERVICIO (LUZ / SIP) ───────────────────
// Permite registrar cortes de energía eléctrica y caídas del método de
// pago SIP, con hora de inicio y fin, para sustentar ante consultas por
// qué la venta o la participación SIP fue baja un día determinado.

let caidasTabActual = 'Todos';

function switchCaidaTab(tipo, el){
  caidasTabActual = tipo;
  document.querySelectorAll('#sec-caidas .tabs .tab').forEach(t=>t.classList.remove('active'));
  if(el) el.classList.add('active');
  renderCaidas();
}

function openNewCaida(tipoDefault){
  document.getElementById('m-caida-title').textContent='Registrar caída de servicio';
  document.getElementById('caida-edit-id').value='';
  document.getElementById('caida-tipo').value=tipoDefault||'Luz';
  document.getElementById('caida-fecha').value=today();
  document.getElementById('caida-hora-inicio').value='';
  document.getElementById('caida-hora-fin').value='';
  document.getElementById('caida-motivo').value='';
  document.getElementById('caida-obs').value='';
  openModal('m-caida');
}

function editCaida(id){
  const c=DB.caidas.find(x=>x.id===id); if(!c) return;
  document.getElementById('m-caida-title').textContent='Editar caída de servicio';
  document.getElementById('caida-edit-id').value=id;
  document.getElementById('caida-tipo').value=c.tipo;
  document.getElementById('caida-fecha').value=c.fecha;
  document.getElementById('caida-hora-inicio').value=c.horaInicio;
  document.getElementById('caida-hora-fin').value=c.horaFin;
  document.getElementById('caida-motivo').value=c.motivo||'';
  document.getElementById('caida-obs').value=c.obs||'';
  openModal('m-caida');
}

function saveCaida(){
  const tipo=document.getElementById('caida-tipo').value;
  const fecha=document.getElementById('caida-fecha').value;
  const horaInicio=document.getElementById('caida-hora-inicio').value;
  const horaFin=document.getElementById('caida-hora-fin').value;
  if(!fecha||!horaInicio||!horaFin){ alert('Fecha, hora de inicio y hora de fin son obligatorias.'); return; }
  const editId=document.getElementById('caida-edit-id').value;
  const obj={
    tipo, fecha, horaInicio, horaFin,
    motivo:document.getElementById('caida-motivo').value.trim(),
    obs:document.getElementById('caida-obs').value.trim(),
    registradoPor:currentUser,
  };
  if(editId){
    const idx=DB.caidas.findIndex(x=>x.id===parseInt(editId));
    if(idx>-1) DB.caidas[idx]={...DB.caidas[idx],...obj};
  } else {
    DB.caidas.push({id:uid('caida'),...obj});
  }
  saveDB(); closeModal('m-caida'); renderCaidas(); renderDash();
}

function delCaida(id){
  if(!confirm('¿Eliminar este registro de caída?')) return;
  DB.caidas=DB.caidas.filter(x=>x.id!==id);
  saveDB(); renderCaidas(); renderDash();
}

function renderCaidas(){
  const cont=document.getElementById('caidas-resumen');
  if(!cont) return;

  const ahora=new Date(); const mesAct=ahora.getMonth(), anioAct=ahora.getFullYear();
  const esMesActual = c=>{ const d=new Date(c.fecha+'T00:00:00'); return d.getMonth()===mesAct && d.getFullYear()===anioAct; };
  const caidasMes = DB.caidas.filter(esMesActual);
  const luzMes = caidasMes.filter(c=>c.tipo==='Luz');
  const sipMes = caidasMes.filter(c=>c.tipo==='SIP');
  const horasLuz = luzMes.reduce((a,c)=>a+calcHoras(c.horaInicio,c.horaFin),0);
  const horasSip = sipMes.reduce((a,c)=>a+calcHoras(c.horaInicio,c.horaFin),0);

  cont.innerHTML=`
    <div class="grid-3" style="margin-bottom:0">
      <div class="metric"><div class="m-label"><i class="ti ti-bolt-off" style="color:var(--amber)"></i>Caídas de luz (mes)</div><div class="m-val" style="color:var(--amber)">${luzMes.length}</div><div class="m-sub">${fmtHoras(horasLuz)} sin servicio</div></div>
      <div class="metric"><div class="m-label"><i class="ti ti-credit-card-off" style="color:var(--purple)"></i>Caídas SIP (mes)</div><div class="m-val" style="color:var(--purple)">${sipMes.length}</div><div class="m-sub">${fmtHoras(horasSip)} sin cobrar con SIP</div></div>
      <div class="metric"><div class="m-label"><i class="ti ti-hourglass-low" style="color:var(--red)"></i>Total horas perdidas (mes)</div><div class="m-val" style="color:var(--red)">${fmtHoras(horasLuz+horasSip)}</div><div class="m-sub">luz + SIP combinadas</div></div>
    </div>`;

  const tbody=document.getElementById('caidas-tbody');
  let data=[...DB.caidas].sort((a,b)=> (b.fecha+b.horaInicio).localeCompare(a.fecha+a.horaInicio));
  if(caidasTabActual==='Luz') data=data.filter(c=>c.tipo==='Luz');
  else if(caidasTabActual==='SIP') data=data.filter(c=>c.tipo==='SIP');

  if(!data.length){ tbody.innerHTML='<tr><td colspan="8"><div class="empty-state"><i class="ti ti-plug-off"></i>Sin caídas registradas</div></td></tr>'; return; }

  tbody.innerHTML=data.map(c=>{
    const horas=calcHoras(c.horaInicio,c.horaFin);
    const badge = c.tipo==='Luz' ? 'badge-warn' : 'badge-purple';
    const icon = c.tipo==='Luz' ? 'ti-bolt-off' : 'ti-credit-card-off';
    return `<tr>
      <td>${fmtDate(c.fecha)}</td>
      <td><span class="badge ${badge}"><i class="ti ${icon}"></i>${c.tipo}</span></td>
      <td style="text-align:center">${c.horaInicio}</td>
      <td style="text-align:center">${c.horaFin}</td>
      <td style="text-align:center"><strong>${fmtHoras(horas)}</strong></td>
      <td>${c.motivo||'—'}</td>
      <td style="font-size:12px;color:var(--text2)">${c.obs||'—'}</td>
      <td><div style="display:flex;gap:4px">
        <button class="btn btn-icon btn-sm" onclick="editCaida(${c.id})"><i class="ti ti-edit"></i></button>
        <button class="btn btn-icon btn-sm btn-danger" onclick="delCaida(${c.id})"><i class="ti ti-trash"></i></button>
      </div></td>
    </tr>`;
  }).join('');
}
