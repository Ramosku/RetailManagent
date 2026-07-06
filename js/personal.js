const PERS_DOCS=[
  {key:'cv', label:'CV'},
  {key:'epp', label:'EPPs'},
  {key:'cargos', label:'Cargos de entrega'},
  {key:'recom', label:'Recomendación para el puesto'},
  {key:'segvida', label:'Seguro de vida ley'},
  {key:'djdom', label:'Declaración jurada de domicilio'},
  {key:'certijoven', label:'Certijoven'}
];

function docsCompletos(p){
  const docs=p.docs||{};
  return PERS_DOCS.every(d=>docs[d.key]);
}
function docsResumen(p){
  const docs=p.docs||{};
  const total=PERS_DOCS.length;
  const ok=PERS_DOCS.filter(d=>docs[d.key]).length;
  return {ok,total};
}
function renderDocsCheck(existing){
  const docs=existing||{};
  const cont=document.getElementById('pers-docs-check');
  cont.innerHTML=PERS_DOCS.map(d=>`
    <label style="display:flex;align-items:center;gap:6px;font-size:12px;font-weight:500;cursor:pointer">
      <input type="checkbox" id="doc-${d.key}" ${docs[d.key]?'checked':''}> ${d.label}
    </label>`).join('');
}
function readDocsCheck(){
  const docs={};
  PERS_DOCS.forEach(d=>{ docs[d.key]=document.getElementById('doc-'+d.key).checked; });
  return docs;
}

function renderPersonal(){
  const grid=document.getElementById('personal-grid');
  if(!DB.personal.length){ grid.innerHTML='<div class="empty-state" style="grid-column:span 2"><i class="ti ti-users-off"></i>Sin colaboradores</div>'; return; }
  grid.innerHTML=DB.personal.map((p,i)=>{
    const [bg,fg]=avatarColors[i%avatarColors.length];
    const statBadge=p.estado==='Activo'?'badge-ok':p.estado==='Vacaciones'?'badge-warn':'badge-gray';
    const {ok,total}=docsResumen(p);
    const docBadge = ok===total ? 'badge-ok' : ok===0 ? 'badge-danger' : 'badge-warn';
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
        <tr><td style="color:var(--text2);padding:3px 0">Documentación</td><td><span class="badge ${docBadge}">${ok}/${total}</span></td></tr>
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
  renderDocsCheck(null);
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
  renderDocsCheck(p.docs);
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
    estado, vacDesde: estado==='Vacaciones'?vacDesde:'', vacHasta: estado==='Vacaciones'?vacHasta:'',
    docs: readDocsCheck()};
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