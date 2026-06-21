const LIM_TAREAS_GENERALES=['Limpieza de góndolas','Troquelado de productos','Orden de techos','Limpieza de equipos de frío','Trapeado y barrido','Limpieza de balanzas','Revisión de extintores','Limpieza de tachos','Limpieza balanza movible','Barrido de rampa'];
const LIM_TURNOS_3=['Mañana','Tarde','Noche'];
const LIM_TURNOS_2=['Mañana','Tarde'];
const LIM_BANO_OFICINA=['Limpieza de baños','Limpieza de oficina','Reposición de papel y jabón'];

function buildLimpieza(){
  const fecha = today();
  const key = `lim_${fecha}_dia`;
  let saved = {};
  try { const raw=localStorage.getItem(key); if(raw) saved=JSON.parse(raw); } catch(e){}
  const readOnly = !!saved._historial;
  document.getElementById('lim-fecha-hoy').textContent = new Date().toLocaleDateString('es-PE',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  buildZoneLim('zone-general-lim', LIM_TAREAS_GENERALES, 'gen', saved, readOnly);
  buildTurnosLim('zone-merma-lim', LIM_TURNOS_2, 'mer', saved, readOnly, '¿Se realizó la merma?');
  buildTurnosLim('zone-frutas-lim', LIM_TURNOS_3, 'fru', saved, readOnly, '¿Se realizó el saneo?');
  buildTurnosLim('zone-checklist-lim', LIM_TURNOS_3, 'chk', saved, readOnly, '¿Se realizó el checklist?');
  const zBano = document.getElementById('zone-bano-oficina-lim');
  zBano.innerHTML = LIM_BANO_OFICINA.map((t,i)=>{
    const done = saved[`bano_${i}`] || false;
    return `<div class="chk-item"><input type="checkbox" id="bano-${i}" ${done?'checked':''} ${readOnly?'disabled':''} onchange="updateLimpieza()"><label for="bano-${i}" style="${done?'text-decoration:line-through;color:var(--text3)':''}">${t}</label></div>`;
  }).join('');
  buildZoneCustomLim(saved, readOnly);
  if(saved._obs) document.getElementById('lim-obs-txt').value = saved._obs;
  updateLimpieza();
}

function buildZoneCustomLim(saved, readOnly){
  const zone = document.getElementById('zone-custom-lim');
  const addRow = document.getElementById('custom-lim-add-row');
  const items = saved.custom ? saved.custom : DB.limpiezaCustomTasks.map(t=>({texto:t, done:false}));
  if(addRow) addRow.style.display = readOnly ? 'none' : '';
  if(!items.length){
    zone.innerHTML = `<p style="font-size:12px;color:var(--text3)">${readOnly?'Sin tareas personalizadas ese día.':'Aún no hay tareas. Agrega una abajo.'}</p>`;
    return;
  }
  zone.innerHTML = items.map((it,i)=>`
    <div class="chk-item">
      <input type="checkbox" id="cus-${i}" ${it.done?'checked':''} ${readOnly?'disabled':''} onchange="updateLimpieza()">
      <label for="cus-${i}" style="flex:1;${it.done?'text-decoration:line-through;color:var(--text3)':''}">${it.texto}</label>
      ${readOnly?'':`<button class="btn btn-icon btn-sm btn-danger" onclick="delCustomLimTask(${i})"><i class="ti ti-trash"></i></button>`}
    </div>`).join('');
}

function addCustomLimTask(){
  const input = document.getElementById('custom-lim-input');
  const val = input.value.trim();
  if(!val) return;
  DB.limpiezaCustomTasks.push(val);
  saveDB(); input.value='';
  buildZoneCustomLim({}, false); updateLimpieza();
}

function delCustomLimTask(i){
  if(!confirm('¿Eliminar?')) return;
  DB.limpiezaCustomTasks.splice(i,1);
  saveDB(); buildZoneCustomLim({}, false); updateLimpieza();
}

function buildZoneLim(zoneId, tareas, prefix, saved, readOnly){
  document.getElementById(zoneId).innerHTML = tareas.map((t,i)=>{
    const done = saved[`${prefix}_${i}`] || false;
    return `<div class="chk-item"><input type="checkbox" id="${prefix}-${i}" ${done?'checked':''} ${readOnly?'disabled':''} onchange="updateLimpieza()"><label for="${prefix}-${i}" style="${done?'text-decoration:line-through;color:var(--text3)':''}">${t}</label></div>`;
  }).join('');
}

function buildTurnosLim(zoneId, turnos, prefix, saved, readOnly, label){
  const colores = ['var(--blue)','var(--amber)','var(--purple)'];
  document.getElementById(zoneId).innerHTML = `
    <p style="font-size:12px;color:var(--text2);margin-bottom:.75rem">${label}</p>
    <div style="display:flex;gap:.75rem;flex-wrap:wrap">
      ${turnos.map((t,i)=>{
        const done = saved[`${prefix}_${i}`] || false;
        const c = colores[i];
        return `<label style="display:flex;align-items:center;gap:8px;background:${done?'var(--surface2)':'var(--bg)'};border:2px solid ${done?c:'var(--border)'};border-radius:10px;padding:10px 18px;min-width:140px">
          <input type="checkbox" id="${prefix}-${i}" ${done?'checked':''} ${readOnly?'disabled':''} onchange="updateLimpieza()" style="accent-color:${c};width:17px;height:17px">
          <div><div style="font-size:13px;font-weight:700;color:${done?c:'var(--text2)'}">${t}</div>
          ${done?`<div style="font-size:10px;color:${c}">✓ Realizado</div>`:'<div style="font-size:10px;color:var(--text3)">Pendiente</div>'}</div>
        </label>`;
      }).join('')}</div>`;
}

function updateLimpieza(){
  let total=0, done=0;
  document.querySelectorAll('#sec-limpieza input[type=checkbox]').forEach(c=>{
    total++; if(c.checked) done++;
    const lbl = c.nextElementSibling;
    if(lbl) lbl.style.cssText = c.checked ? 'text-decoration:line-through;color:var(--text3)' : '';
  });
  document.getElementById('lim-prog-badge').textContent = `${done} / ${total} tareas`;
  const pct = total ? Math.round(done/total*100) : 0;
  const bar = document.getElementById('lim-prog-bar');
  bar.style.width = pct+'%';
  bar.style.background = pct>=80 ? 'var(--green)' : pct>=50 ? 'var(--blue)' : 'var(--amber)';
}

function guardarLimpiezaDia(){
  const fecha = today();
  const key = `lim_${fecha}_dia`;
  const data = { _fecha:fecha, _usuario:currentUser, _guardado:new Date().toISOString() };
  LIM_TAREAS_GENERALES.forEach((_,i)=>{ const el=document.getElementById(`gen-${i}`); if(el) data[`gen_${i}`]=el.checked; });
  LIM_TURNOS_2.forEach((_,i)=>{ const el=document.getElementById(`mer-${i}`); if(el) data[`mer_${i}`]=el.checked; });
  LIM_TURNOS_3.forEach((_,i)=>{ const el=document.getElementById(`fru-${i}`); if(el) data[`fru_${i}`]=el.checked; });
  LIM_TURNOS_3.forEach((_,i)=>{ const el=document.getElementById(`chk-${i}`); if(el) data[`chk_${i}`]=el.checked; });
  LIM_BANO_OFICINA.forEach((_,i)=>{ const el=document.getElementById(`bano-${i}`); if(el) data[`bano_${i}`]=el.checked; });
  data.custom = DB.limpiezaCustomTasks.map((t,i)=>{
    const el=document.getElementById(`cus-${i}`);
    return {texto:t, done: el ? el.checked : false};
  });
  data._obs = document.getElementById('lim-obs-txt').value;
  localStorage.setItem(key, JSON.stringify(data));
  cargarFechasHistorialLim();
  const msg = document.getElementById('lim-save-msg');
  msg.style.display='inline-flex'; setTimeout(()=>msg.style.display='none',2500);
  toast('Checklist guardado','ok');
}

function cargarFechasHistorialLim(){
  const sel = document.getElementById('lim-fecha-hist');
  const keys = Object.keys(localStorage).filter(k=>k.startsWith('lim_')).sort().reverse();
  sel.innerHTML = '<option value="">📅 Ver día anterior...</option>';
  keys.forEach(k=>{
    try { const d=JSON.parse(localStorage.getItem(k)); sel.innerHTML += `<option value="${k}">📅 ${d._fecha}</option>`; } catch(e){}
  });
}

function cargarLimpiezaHistorial(){
  const key = document.getElementById('lim-fecha-hist').value;
  if(!key){ cerrarHistorialLim(); return; }
  let saved={};
  try { const raw=localStorage.getItem(key); if(raw) saved=JSON.parse(raw); } catch(e){}
  saved._historial = true;
  document.getElementById('lim-historial-banner').style.display='block';
  document.getElementById('lim-hist-fecha-label').textContent = saved._fecha||'—';
  document.getElementById('lim-hist-turno-label').textContent = 'día completo';
  buildLimpieza();
}

function cerrarHistorialLim(){
  document.getElementById('lim-historial-banner').style.display='none';
  document.getElementById('lim-fecha-hist').value='';
  buildLimpieza();
}