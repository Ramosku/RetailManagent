function openNewInc(){
  document.getElementById('m-inc-title').textContent='Nueva incidencia';
  document.getElementById('inc-edit-id').value='';
  ['inc-proveedor','inc-uds','inc-monto','inc-producto','inc-codigo','inc-otro-producto','inc-otro-codigo','inc-resp','inc-fecha-ajuste'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('inc-fecha').value=today();
  document.getElementById('inc-tipo').value='Faltante';
  document.getElementById('inc-estado').value='Pendiente';
  toggleIncTipo();
  toggleIncEstado();
  openModal('m-inc');
}

function renderIncidencias(){
  const tbody=document.getElementById('inc-tbody');
  const data=[...DB.incidencias].sort((a,b)=>b.id-a.id);
  if(!data.length){ tbody.innerHTML='<tr><td colspan="11"><div class="empty-state"><i class="ti ti-mood-empty"></i>Sin incidencias</div></td></tr>'; return; }
  const typeBadge={'Faltante':'badge-danger','Sobrante':'badge-blue','Cruce de códigos':'badge-purple'};
  const statBadge={'Pendiente':'badge-danger','Ajustado en inventario':'badge-warn','Regularizado':'badge-ok'};
  tbody.innerHTML=data.map(i=>{
    const costoTotal=(i.uds||0)*(i.monto||0);
    const rowClass = i.estado==='Regularizado' ? 'row-regularizado' : '';
    return `<tr class="${rowClass}">
    <td>#${i.id}</td><td>${fmtDate(i.fecha)}</td><td><strong>${i.proveedor}</strong></td>
    <td><strong>${i.producto||'—'}</strong></td>
    <td><span class="badge ${typeBadge[i.tipo]||'badge-gray'}">${i.tipo}</span></td>
    <td style="text-align:center">${i.uds||'—'}</td>
    <td>${i.monto?'S/ '+i.monto.toFixed(2):'—'}</td>
    <td><strong>S/ ${costoTotal.toFixed(2)}</strong></td>
    <td>${i.resp||'—'}</td>
    <td><span class="badge ${statBadge[i.estado]||'badge-gray'}">${i.estado}</span>${i.fechaAjuste?`<br><span style="font-size:10px;color:var(--text3)">Ajustado: ${fmtDate(i.fechaAjuste)}</span>`:''}</td>
    <td><div style="display:flex;gap:4px">
      <button class="btn btn-icon btn-sm" onclick="editInc(${i.id})"><i class="ti ti-edit"></i></button>
      <button class="btn btn-icon btn-sm btn-danger" onclick="delInc(${i.id})"><i class="ti ti-trash"></i></button>
    </div></td>
  </tr>`;
  }).join('');
}

function toggleIncTipo(){
  const tipo=document.getElementById('inc-tipo').value;
  document.getElementById('inc-otro-wrap').style.display = (tipo==='Cruce de códigos') ? '' : 'none';
}

function toggleIncEstado(){
  const estado=document.getElementById('inc-estado').value;
  document.getElementById('inc-fecha-ajuste-wrap').style.display = (estado==='Ajustado en inventario') ? '' : 'none';
}

function editInc(id){
  const i=DB.incidencias.find(x=>x.id===id); if(!i) return;
  document.getElementById('m-inc-title').textContent='Editar incidencia';
  document.getElementById('inc-edit-id').value=id;
  document.getElementById('inc-proveedor').value=i.proveedor;
  document.getElementById('inc-fecha').value=i.fecha;
  document.getElementById('inc-tipo').value=i.tipo;
  document.getElementById('inc-resp').value=i.resp||'';
  document.getElementById('inc-producto').value=i.producto||'';
  document.getElementById('inc-codigo').value=i.codigo||'';
  document.getElementById('inc-otro-producto').value=i.otroProducto||'';
  document.getElementById('inc-otro-codigo').value=i.otroCodigo||'';
  document.getElementById('inc-uds').value=i.uds||'';
  document.getElementById('inc-monto').value=i.monto||'';
  document.getElementById('inc-estado').value=i.estado;
  document.getElementById('inc-fecha-ajuste').value=i.fechaAjuste||'';
  toggleIncTipo();
  toggleIncEstado();
  openModal('m-inc');
}

function saveInc(){
  const prov=document.getElementById('inc-proveedor').value.trim();
  const fecha=document.getElementById('inc-fecha').value;
  const tipo=document.getElementById('inc-tipo').value;
  const producto=document.getElementById('inc-producto').value.trim();
  const codigo=document.getElementById('inc-codigo').value.trim();
  if(!prov||!fecha||!producto||!codigo){ alert('Completa los campos obligatorios.'); return; }
  const editId=document.getElementById('inc-edit-id').value;
  const estado=document.getElementById('inc-estado').value;
  const obj={
    proveedor:prov, fecha, producto, codigo, tipo,
    otroProducto:tipo==='Cruce de códigos'?document.getElementById('inc-otro-producto').value.trim():'',
    otroCodigo:tipo==='Cruce de códigos'?document.getElementById('inc-otro-codigo').value.trim():'',
    resp:document.getElementById('inc-resp').value,
    uds:parseInt(document.getElementById('inc-uds').value)||0,
    monto:parseFloat(document.getElementById('inc-monto').value)||0,
    estado,
    fechaAjuste: estado==='Ajustado en inventario' ? document.getElementById('inc-fecha-ajuste').value : '',
    registradoPor:currentUser,
  };
  if(editId){
    const idx=DB.incidencias.findIndex(x=>x.id===parseInt(editId));
    if(idx>-1) DB.incidencias[idx]={...DB.incidencias[idx],...obj};
  } else {
    DB.incidencias.push({id:uid('inc'),...obj});
  }
  saveDB(); closeModal('m-inc'); renderIncidencias(); renderDash();
}

function delInc(id){
  if(!confirm('¿Eliminar?')) return;
  DB.incidencias=DB.incidencias.filter(x=>x.id!==id);
  saveDB(); renderIncidencias(); renderDash();
}