function renderVencimientos(filterTab){
  const tbody=document.getElementById('venc-tbody');
  let data=[...DB.vencimientos].sort((a,b)=>{ const da=daysLeft(a.fecha),db=daysLeft(b.fecha); if(da===null) return 1; if(db===null) return -1; return da-db; });
  if(filterTab===1) data=data.filter(v=>{ const d=daysLeft(v.fecha); return d!==null&&d<=3; });
  else if(filterTab===2) data=data.filter(v=>{ const d=daysLeft(v.fecha); return d!==null&&d<=7&&d>3; });
  else if(filterTab===3) data=data.filter(v=>{ const d=daysLeft(v.fecha); return d!==null&&d>7; });
  if(!data.length){ tbody.innerHTML='<tr><td colspan="10"><div class="empty-state"><i class="ti ti-package-off"></i>Sin productos</div></td></tr>'; return; }
  tbody.innerHTML=data.map(v=>{
    const d=daysLeft(v.fecha);
    const total=(v.uds||0)*(v.precio||0);
    return `<tr>
      <td><strong>${v.nombre}</strong></td><td>${v.seccion}</td>
      <td><code style="font-size:11px;background:var(--surface2);padding:2px 6px;border-radius:4px">${v.lote||'—'}</code></td>
      <td style="text-align:center"><strong>${v.uds||0}</strong></td>
      <td>S/ ${(v.precio||0).toFixed(2)}</td><td><strong>S/ ${total.toFixed(2)}</strong></td>
      <td>${fmtDate(v.fecha)}</td><td style="text-align:center">${d!==null?d+'d':'—'}</td>
      <td>${vencBadge(d)}</td>
      <td><div style="display:flex;gap:4px">
        <button class="btn btn-icon btn-sm" onclick="editVenc(${v.id})"><i class="ti ti-edit"></i></button>
        <button class="btn btn-icon btn-sm btn-danger" onclick="delVenc(${v.id})"><i class="ti ti-trash"></i></button>
      </div></td>
    </tr>`;
  }).join('');
}

function editVenc(id){
  const v=DB.vencimientos.find(x=>x.id===id); if(!v) return;
  document.getElementById('m-venc-title').textContent='Editar producto';
  document.getElementById('venc-edit-id').value=id;
  document.getElementById('venc-nombre').value=v.nombre;
  document.getElementById('venc-seccion').value=v.seccion;
  document.getElementById('venc-lote').value=v.lote||'';
  document.getElementById('venc-fecha').value=v.fecha;
  document.getElementById('venc-uds').value=v.uds||'';
  document.getElementById('venc-precio').value=v.precio||'';
  document.getElementById('venc-obs').value=v.obs||'';
  openModal('m-venc');
}

function saveVenc(){
  const nombre=document.getElementById('venc-nombre').value.trim();
  const fecha=document.getElementById('venc-fecha').value;
  if(!nombre||!fecha){ alert('Nombre y fecha son obligatorios.'); return; }
  const editId=document.getElementById('venc-edit-id').value;
  const obj={nombre, fecha, seccion:document.getElementById('venc-seccion').value,
    lote:document.getElementById('venc-lote').value.trim(),
    uds:parseFloat(document.getElementById('venc-uds').value)||0,
    precio:parseFloat(document.getElementById('venc-precio').value)||0,
    obs:document.getElementById('venc-obs').value.trim()};
  if(editId){
    const idx=DB.vencimientos.findIndex(x=>x.id===parseInt(editId));
    if(idx>-1) DB.vencimientos[idx]={...DB.vencimientos[idx],...obj};
  } else {
    DB.vencimientos.push({id:uid('venc'),...obj});
  }
  saveDB(); closeModal('m-venc'); renderVencimientos(); renderDash();
}

function delVenc(id){
  if(!confirm('¿Eliminar este producto?')) return;
  DB.vencimientos=DB.vencimientos.filter(x=>x.id!==id);
  saveDB(); renderVencimientos(); renderDash();
}