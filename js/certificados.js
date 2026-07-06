function renderCertificados(){
  const tbody=document.getElementById('cert-tbody');
  const data=[...DB.certificados].sort((a,b)=>{
    const da=daysLeft(a.vencimiento), db=daysLeft(b.vencimiento);
    if(da===null) return 1; if(db===null) return -1;
    return da-db;
  });
  if(!data.length){ tbody.innerHTML='<tr><td colspan="5"><div class="empty-state"><i class="ti ti-certificate-off"></i>Sin certificados registrados</div></td></tr>'; return; }
  tbody.innerHTML=data.map(c=>{
    const d=daysLeft(c.vencimiento);
    return `<tr>
      <td><strong>${c.nombre}</strong></td>
      <td>${fmtDate(c.entrega)}</td>
      <td>${fmtDate(c.vencimiento)}</td>
      <td>${vencBadge(d)}</td>
      <td>
        <button class="btn btn-icon btn-sm" onclick="editCert(${c.id})"><i class="ti ti-edit"></i></button>
        <button class="btn btn-icon btn-sm btn-danger" onclick="delCert(${c.id})"><i class="ti ti-trash"></i></button>
      </td>
    </tr>`;
  }).join('');
}

function openAddCert(){
  document.getElementById('m-cert-title').textContent='Agregar certificado';
  document.getElementById('cert-edit-id').value='';
  document.getElementById('cert-nombre').value='';
  document.getElementById('cert-entrega').value='';
  document.getElementById('cert-vencimiento').value='';
  openModal('m-cert');
}

function editCert(id){
  const c=DB.certificados.find(x=>x.id===id); if(!c) return;
  document.getElementById('m-cert-title').textContent='Editar certificado';
  document.getElementById('cert-edit-id').value=id;
  document.getElementById('cert-nombre').value=c.nombre;
  document.getElementById('cert-entrega').value=c.entrega||'';
  document.getElementById('cert-vencimiento').value=c.vencimiento||'';
  openModal('m-cert');
}

function saveCert(){
  const nombre=document.getElementById('cert-nombre').value.trim();
  const entrega=document.getElementById('cert-entrega').value;
  const vencimiento=document.getElementById('cert-vencimiento').value;
  if(!nombre||!entrega||!vencimiento){ alert('Completa nombre, fecha de entrega y fecha de vencimiento.'); return; }
  const editId=document.getElementById('cert-edit-id').value;
  if(editId){
    const idx=DB.certificados.findIndex(x=>x.id===parseInt(editId));
    if(idx>-1) DB.certificados[idx]={...DB.certificados[idx], nombre, entrega, vencimiento};
  } else {
    DB.certificados.push({id:uid('cert'), nombre, entrega, vencimiento});
  }
  saveDB(); closeModal('m-cert'); renderCertificados(); renderDash();
}

function delCert(id){
  if(!confirm('¿Eliminar certificado?')) return;
  DB.certificados=DB.certificados.filter(x=>x.id!==id);
  saveDB(); renderCertificados(); renderDash();
}
