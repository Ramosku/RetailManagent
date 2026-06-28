function renderPersonal(){
  const grid=document.getElementById('personal-grid');
  if(!DB.personal.length){ grid.innerHTML='<div class="empty-state" style="grid-column:span 2"><i class="ti ti-users-off"></i>Sin colaboradores</div>'; return; }
  grid.innerHTML=DB.personal.map((p,i)=>{
    const [bg,fg]=avatarColors[i%avatarColors.length];
    const statBadge=p.estado==='Activo'?'badge-ok':p.estado==='Vacaciones'?'badge-warn':'badge-gray';
    return `<div class="card">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
        <div class="avatar" style="background:${bg};color:${fg}">${initials(p.nombre)}</div>
        <div style="flex:1"><p style="font-weight:700;font-size:14px">${p.nombre}</p><p style="font-size:12px;color:var(--text2)">${p.cargo}</p></div>
        <span class="badge ${statBadge}">${p.estado}</span>
      </div>
      <table style="font-size:12px">
        <tr><td style="color:var(--text2);padding:3px 0;width:90px">DNI</td><td>${p.dni}</td></tr>
        <tr><td style="color:var(--text2);padding:3px 0">Celular</td><td>${p.cel||'—'}</td></tr>
        <tr><td style="color:var(--text2);padding:3px 0">Ingreso</td><td>${fmtDate(p.ingreso)}</td></tr>
      </table>
      <div style="display:flex;gap:6px;margin-top:10px">
        <button class="btn btn-sm" onclick="editPers(${p.id})"><i class="ti ti-edit"></i> Editar</button>
        <button class="btn btn-sm btn-danger" onclick="delPers(${p.id})"><i class="ti ti-trash"></i></button>
      </div>
    </div>`;
  }).join('');
}

function openAddPers(){
  document.getElementById('m-pers-title').textContent='Agregar colaborador';
  document.getElementById('pers-edit-id').value='';
  ['pers-nombre','pers-dni','pers-cel','pers-ingreso','pers-vac-desde','pers-vac-hasta'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('pers-cargo').value='ADMINISTRADOR';
  document.getElementById('pers-turno').value='M';
  document.getElementById('pers-estado').value='Activo';
  toggleVacFechas();
  openModal('m-pers');
}

function editPers(id){
  const p=DB.personal.find(x=>x.id===id); if(!p) return;
  document.getElementById('m-pers-title').textContent='Editar colaborador';
  document.getElementById('pers-edit-id').value=id;
  document.getElementById('pers-nombre').value=p.nombre;
  document.getElementById('pers-dni').value=p.dni;
  document.getElementById('pers-cargo').value=p.cargo;
  document.getElementById('pers-cel').value=p.cel||'';
  document.getElementById('pers-ingreso').value=p.ingreso||'';
  document.getElementById('pers-turno').value=p.turno||'M';
  document.getElementById('pers-estado').value=p.estado;
  document.getElementById('pers-vac-desde').value=p.vacDesde||'';
  document.getElementById('pers-vac-hasta').value=p.vacHasta||'';
  toggleVacFechas();
  openModal('m-pers');
}

function toggleVacFechas(){
  const isVac = document.getElementById('pers-estado').value==='Vacaciones';
  document.getElementById('pers-vac-row').style.display = isVac ? 'flex' : 'none';
}

function savePers(){
  const nombre=document.getElementById('pers-nombre').value.trim();
  const dni=document.getElementById('pers-dni').value.trim();
  if(!nombre||!dni){ alert('Nombre y DNI son obligatorios.'); return; }
  const editId=document.getElementById('pers-edit-id').value;
  const estado=document.getElementById('pers-estado').value;
  const vacDesde=document.getElementById('pers-vac-desde').value;
  const vacHasta=document.getElementById('pers-vac-hasta').value;
  if(estado==='Vacaciones' && (!vacDesde || !vacHasta)){ alert('Indica el rango de fechas de vacaciones.'); return; }
  if(estado==='Vacaciones' && vacHasta<vacDesde){ alert('La fecha "hasta" no puede ser anterior a "desde".'); return; }
  const obj={nombre, dni, cargo:document.getElementById('pers-cargo').value,
    cel:document.getElementById('pers-cel').value.trim(),
    ingreso:document.getElementById('pers-ingreso').value,
    turno:document.getElementById('pers-turno').value,
    estado, vacDesde: estado==='Vacaciones'?vacDesde:'', vacHasta: estado==='Vacaciones'?vacHasta:''};
  let pid;
  if(editId){
    const idx=DB.personal.findIndex(x=>x.id===parseInt(editId));
    if(idx>-1) DB.personal[idx]={...DB.personal[idx],...obj};
    pid=parseInt(editId);
  } else {
    pid=uid('pers');
    DB.personal.push({id:pid,...obj});
  }
  if(estado==='Vacaciones'){
    aplicarVacacionesAHorario(pid, vacDesde, vacHasta);
  }
  saveDB(); closeModal('m-pers'); populateSelects(); renderPersonal(); renderHorario();
}

function delPers(id){
  if(!confirm('¿Eliminar?')) return;
  DB.personal=DB.personal.filter(x=>x.id!==id);
  saveDB(); populateSelects(); renderPersonal(); renderHorario();
}