// ── CUADRO DE TIEMPO DE VIDA ÚTIL (MSS-CAL-HT001) ────
// base:'fv'    -> se retira "dias" ANTES de la fecha de vencimiento (FV)
// base:'lote'  -> se retira "dias" DESPUÉS de la fecha de lote/recepción
// base:'mismodia' -> se retira el mismo día (fraccionados en tienda)
const CATEGORIAS_VIDA_UTIL=[
  {id:'pollo_pescado_congelado', label:'Pollo / Filete de Tilapia congelado', base:'fv', dias:5, regla:'5 días antes de FV'},
  {id:'carne_vacuno_termo', label:'Carne de vacuno termoformada', base:'lote', dias:9, regla:'9 días desde su recepción'},
  {id:'pollo_fresco_termo', label:'Pollo fresco termoformado', base:'fv', dias:1, regla:'1 día antes de FV'},
  {id:'embutidos_quesos_fiambres', label:'Embutidos, quesos y fiambres', base:'fv', dias:3, regla:'3 días antes de FV'},
  {id:'salsas_aderezos_refrig', label:'Salsas y aderezos refrigerados', base:'fv', dias:3, regla:'3 días antes de FV'},
  {id:'congelados_varios', label:'Congelados (hamburguesas, helados, panes, pizzas, etc)', base:'fv', dias:5, regla:'5 días antes de FV'},
  {id:'lacteos_yogurt', label:'Yogurt, mantequillas, margarinas, salsa pizza, dulce de leche', base:'fv', dias:3, regla:'3 días antes de FV'},
  {id:'lacteos_uht', label:'Leches UHT/evaporadas/condensadas, bebidas vegetales', base:'fv', dias:5, regla:'5 días antes de FV'},
  {id:'cremas_leche', label:'Cremas de leche', base:'fv', dias:3, regla:'3 días antes de FV'},
  {id:'huevos', label:'Huevos', base:'fv', dias:5, regla:'5 días antes de FV'},
  {id:'abarrotes_granel', label:'Arroz, azúcar, avena (a granel)', base:'fv', dias:5, regla:'5 días antes de FV'},
  {id:'abarrotes_general', label:'Abarrotes / bebidas / golosinas / cuidado personal', base:'fv', dias:5, regla:'5 días antes de FV'},
  {id:'snacks_fritolay', label:'Snacks marca Frito Lay y Chipy', base:'fv', dias:3, regla:'3 días antes de FV'},
  {id:'pilas', label:'Pilas', base:'fv', dias:30, regla:'1 mes antes de FV'},
  {id:'cigarros_vapes', label:'Cigarros y vapes', base:'fv', dias:5, regla:'5 días antes de FV'},
  {id:'mascotas', label:'Alimentos para mascotas', base:'fv', dias:7, regla:'7 días antes de FV'},
  {id:'panaderia_marca', label:'Panadería de marca (panes, kekes, panetones, etc)', base:'fv', dias:3, regla:'3 días antes de FV'},
  {id:'alim_preparados', label:'Alimentos preparados (tamales, humitas)', base:'fv', dias:1, regla:'1 día antes de FV'},
  {id:'cf_keke450', label:'Keke vainilla 450gr (Centro de Fabricación)', base:'fv', dias:1, regla:'1 día antes de FV'},
  {id:'cf_keke_suli', label:'Kekes Suli 390', base:'fv', dias:1, regla:'1 día antes de FV'},
  {id:'cf_pizza', label:'Pizzas refrigeradas del CF', base:'fv', dias:2, regla:'2 días antes de FV'},
  {id:'cf_panes', label:'Panes empacados del CF (yema, hot dog, hamburguesa)', base:'fv', dias:1, regla:'1 día antes de FV'},
  {id:'cf_lunch', label:'Lunch (arroz chaufa, arroz con pollo)', base:'fv', dias:1, regla:'1 día antes de FV'},
  {id:'fraccionados', label:'Fraccionados en tienda', base:'mismodia', dias:0, regla:'Al final del día de exhibición'},
  {id:'verd_aji_pepino', label:'Ají verde, pepinillo, zapallo macre', base:'lote', dias:7, regla:'7 días después del lote'},
  {id:'verd_choclo', label:'Choclo', base:'lote', dias:5, regla:'5 días después del lote'},
  {id:'verd_champinon', label:'Champiñones', base:'fv', dias:2, regla:'2 días antes de FV'},
  {id:'verd_apio', label:'Apio', base:'lote', dias:5, regla:'5 días después del lote'},
  {id:'verd_lechuga_espinaca', label:'Lechugas, espinaca', base:'fv', dias:1, regla:'1 día antes de FV'},
  {id:'verd_papa_camote_cebolla', label:'Papa, camote, cebolla', base:'lote', dias:7, regla:'7 días después del lote'},
  {id:'verd_limon', label:'Limón ácido', base:'lote', dias:9, regla:'9 días después del lote'},
  {id:'verd_wantan', label:'Masa wantán', base:'fv', dias:5, regla:'5 días antes de FV'},
  {id:'verd_zanahoria_tomate', label:'Zanahoria y tomates', base:'lote', dias:7, regla:'7 días después del lote'},
  {id:'frut_arandanos', label:'Arándanos', base:'lote', dias:15, regla:'15 días después del lote'},
  {id:'frut_granadilla', label:'Granadilla', base:'lote', dias:7, regla:'7 días después del lote'},
  {id:'frut_manzana_pera_import', label:'Manzana / pera Packam\'s (importadas)', base:'lote', dias:30, regla:'30 días después del lote'},
  {id:'frut_general_3d', label:'Frutas varias (exhibición 3 días T° ambiente)', base:'lote', dias:3, regla:'3 días después del lote'},
  {id:'frut_citricos', label:'Naranja, mandarina, manzana nacional, mango, piña, plátano', base:'lote', dias:7, regla:'7 días después del lote'},
  {id:'frut_palta', label:'Palta fuerte', base:'lote', dias:4, regla:'4 días después del lote'},
  {id:'frut_platano_palillo', label:'Plátano palillo', base:'lote', dias:5, regla:'5 días después del lote'},
];

function catInfo(id){ return CATEGORIAS_VIDA_UTIL.find(c=>c.id===id); }

function calcRetiro(catId, fecha){
  if(!fecha) return null;
  const cat=catInfo(catId);
  if(!cat) return fecha;
  const d=new Date(fecha+'T00:00:00');
  if(cat.base==='fv') d.setDate(d.getDate()-cat.dias);
  else if(cat.base==='lote') d.setDate(d.getDate()+cat.dias);
  return d.toISOString().split('T')[0];
}

function populateVencCategorias(){
  const sel=document.getElementById('venc-categoria');
  if(!sel || sel.options.length) return;
  sel.innerHTML='<option value="">— Selecciona —</option>'+CATEGORIAS_VIDA_UTIL.map(c=>`<option value="${c.id}">${c.label}</option>`).join('');
}

function vencCategoriaChange(){
  const catId=document.getElementById('venc-categoria').value;
  const cat=catInfo(catId);
  const label=document.getElementById('venc-fecha-label');
  const preview=document.getElementById('venc-retiro-preview');
  const fecha=document.getElementById('venc-fecha').value;
  if(!cat){ label.textContent='Fecha *'; preview.textContent=''; return; }
  label.textContent = cat.base==='lote' ? 'Fecha de lote / recepción *' : 'Fecha de vencimiento (FV) *';
  if(fecha){
    const retiro=calcRetiro(catId,fecha);
    preview.textContent = `Regla: ${cat.regla} → se debe retirar el ${fmtDate(retiro)}`;
  } else {
    preview.textContent = `Regla: ${cat.regla}`;
  }
}

function renderVencimientos(filterTab){
  populateVencCategorias();
  const tbody=document.getElementById('venc-tbody');
  let data=[...DB.vencimientos].map(v=>({...v, retiro:calcRetiro(v.categoria, v.fecha)}));
  data.sort((a,b)=>{ const da=daysLeft(a.retiro),db=daysLeft(b.retiro); if(da===null) return 1; if(db===null) return -1; return da-db; });
  if(filterTab===1) data=data.filter(v=>{ const d=daysLeft(v.retiro); return d!==null&&d<=3; });
  else if(filterTab===2) data=data.filter(v=>{ const d=daysLeft(v.retiro); return d!==null&&d<=7&&d>3; });
  else if(filterTab===3) data=data.filter(v=>{ const d=daysLeft(v.retiro); return d!==null&&d>7; });
  if(!data.length){ tbody.innerHTML='<tr><td colspan="11"><div class="empty-state"><i class="ti ti-package-off"></i>Sin productos</div></td></tr>'; return; }
  tbody.innerHTML=data.map(v=>{
    const d=daysLeft(v.retiro);
    const total=(v.uds||0)*(v.precio||0);
    const cat=catInfo(v.categoria);
    return `<tr>
      <td><strong>${v.nombre}</strong></td>
      <td style="font-size:11px">${cat?cat.label:'—'}</td>
      <td>${v.seccion}</td>
      <td><code style="font-size:11px;background:var(--surface2);padding:2px 6px;border-radius:4px">${v.lote||'—'}</code></td>
      <td style="text-align:center"><strong>${v.uds||0}</strong></td>
      <td>S/ ${(v.precio||0).toFixed(2)}</td><td><strong>S/ ${total.toFixed(2)}</strong></td>
      <td>${fmtDate(v.fecha)}</td>
      <td><strong>${fmtDate(v.retiro)}</strong></td>
      <td style="text-align:center">${vencBadge(d)}</td>
      <td><div style="display:flex;gap:4px">
        <button class="btn btn-icon btn-sm" onclick="editVenc(${v.id})"><i class="ti ti-edit"></i></button>
        <button class="btn btn-icon btn-sm btn-danger" onclick="delVenc(${v.id})"><i class="ti ti-trash"></i></button>
      </div></td>
    </tr>`;
  }).join('');
}

function openAddVenc(){
  document.getElementById('m-venc-title').textContent='Agregar producto';
  document.getElementById('venc-edit-id').value='';
  document.getElementById('venc-nombre').value='';
  document.getElementById('venc-categoria').value='';
  document.getElementById('venc-lote').value='';
  document.getElementById('venc-fecha').value='';
  document.getElementById('venc-uds').value='';
  document.getElementById('venc-precio').value='';
  document.getElementById('venc-obs').value='';
  document.getElementById('venc-fecha-label').textContent='Fecha *';
  document.getElementById('venc-retiro-preview').textContent='';
  openModal('m-venc');
}

function editVenc(id){
  const v=DB.vencimientos.find(x=>x.id===id); if(!v) return;
  document.getElementById('m-venc-title').textContent='Editar producto';
  document.getElementById('venc-edit-id').value=id;
  document.getElementById('venc-nombre').value=v.nombre;
  document.getElementById('venc-seccion').value=v.seccion;
  document.getElementById('venc-categoria').value=v.categoria||'';
  document.getElementById('venc-lote').value=v.lote||'';
  document.getElementById('venc-fecha').value=v.fecha;
  document.getElementById('venc-uds').value=v.uds||'';
  document.getElementById('venc-precio').value=v.precio||'';
  document.getElementById('venc-obs').value=v.obs||'';
  vencCategoriaChange();
  openModal('m-venc');
}

function saveVenc(){
  const nombre=document.getElementById('venc-nombre').value.trim();
  const fecha=document.getElementById('venc-fecha').value;
  const categoria=document.getElementById('venc-categoria').value;
  if(!nombre||!fecha){ alert('Nombre y fecha son obligatorios.'); return; }
  if(!categoria){ alert('Selecciona la categoría de vida útil del producto.'); return; }
  const editId=document.getElementById('venc-edit-id').value;
  const obj={nombre, fecha, categoria, seccion:document.getElementById('venc-seccion').value,
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
