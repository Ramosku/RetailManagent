const DAYS=['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
const DAYKEYS=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const SCHEDULE_TEMPLATES={
  'ADMINISTRADOR':{Mon:{in:'06:45',out:'15:45'}, Tue:'D', Wed:{in:'06:45',out:'15:45'},Thu:{in:'13:15',out:'22:15'}, Fri:{in:'06:45',out:'15:45'},Sat:{in:'06:45',out:'15:45'}, Sun:{in:'13:15',out:'22:15'}},
  'ENCARGAD@':{Mon:{in:'13:15',out:'22:15'}, Tue:{in:'06:45',out:'15:45'}, Wed:{in:'12:00',out:'21:00'},Thu:{in:'06:45',out:'15:45'}, Fri:'D',Sat:{in:'12:00',out:'21:00'}, Sun:{in:'06:45',out:'15:45'}},
  'PARTIME 1':{Mon:{in:'08:15',out:'13:00'}, Tue:{in:'08:15',out:'13:00'}, Wed:{in:'08:15',out:'13:00'},Thu:{in:'08:15',out:'13:00'}, Fri:'D', Sat:'D', Sun:{in:'08:15',out:'13:00'}},
  'PARTIME 2':{Mon:{in:'15:30',out:'20:15'}, Tue:{in:'15:30',out:'20:15'}, Wed:'D', Thu:'D',Fri:{in:'15:30',out:'20:15'}, Sat:{in:'15:30',out:'20:15'}, Sun:{in:'15:30',out:'20:15'}},
  'PARTIME 3':{Mon:{in:'17:30',out:'22:15'}, Tue:'D', Wed:'D', Thu:{in:'17:15',out:'22:00'},Fri:{in:'17:30',out:'22:15'}, Sat:{in:'17:30',out:'22:15'}, Sun:{in:'17:30',out:'22:15'}},
  'PARTIME 4':{Mon:'D', Tue:{in:'17:30',out:'22:15'}, Wed:{in:'17:30',out:'22:15'}, Thu:{in:'15:45',out:'20:30'},Fri:'D', Sat:{in:'17:30',out:'22:15'}, Sun:{in:'17:15',out:'22:00'}},
  'PARTIME 5':{Mon:{in:'06:45',out:'11:30'}, Tue:'D', Wed:{in:'07:00',out:'11:45'}, Thu:'D',Fri:{in:'08:15',out:'13:00'}, Sat:{in:'07:00',out:'11:45'}, Sun:{in:'07:00',out:'11:45'}},
  'PARTIME 6':{Mon:'D', Tue:{in:'17:30',out:'22:15'}, Wed:{in:'17:30',out:'22:15'}, Thu:{in:'17:30',out:'22:15'},Fri:{in:'17:30',out:'22:15'}, Sat:'D', Sun:{in:'12:00',out:'16:45'}}
};

function getWeekKey(dateStr){
  const d=new Date(dateStr+'T00:00:00');
  const mon=new Date(d); mon.setDate(d.getDate()-((d.getDay()+6)%7));
  return mon.toISOString().split('T')[0];
}
function getWeekDates(monStr){
  const mon=new Date(monStr+'T00:00:00');
  return DAYKEYS.map((_,i)=>{ const dd=new Date(mon); dd.setDate(mon.getDate()+i); return dd.toISOString().split('T')[0]; });
}
function templateFor(cargo,dk){
  const t=SCHEDULE_TEMPLATES[cargo];
  if(!t) return 'D';
  return t[dk]??'D';
}
function calcHoras(inStr,outStr){
  if(!inStr||!outStr) return 0;
  const [ih,im]=inStr.split(':').map(Number);
  const [oh,om]=outStr.split(':').map(Number);
  let mins=(oh*60+om)-(ih*60+im);
  if(mins<=0) mins+=24*60;
  return mins/60;
}
function fmtHoras(h){
  const hh=Math.floor(h), mm=Math.round((h-hh)*60);
  return `${hh}h${mm?(' '+mm+'m'):''}`;
}
function getDayKeyFromDate(dateStr){
  const d=new Date(dateStr+'T00:00:00');
  return DAYKEYS[(d.getDay()+6)%7];
}
function setHorarioCell(personId, dateStr, tipo){
  const weekKey=getWeekKey(dateStr);
  const dk=getDayKeyFromDate(dateStr);
  if(!DB.horarios[weekKey]) DB.horarios[weekKey]={};
  if(!DB.horarios[weekKey][personId]) DB.horarios[weekKey][personId]={};
  DB.horarios[weekKey][personId][dk]={tipo, auto:false};
}
function aplicarVacacionesAHorario(personId, desde, hasta){
  const d0=new Date(desde+'T00:00:00');
  const d1=new Date(hasta+'T00:00:00');
  for(let d=new Date(d0); d<=d1; d.setDate(d.getDate()+1)){
    setHorarioCell(personId, d.toISOString().split('T')[0], 'V');
  }
}
function aplicarFaltaAHorario(personId, fecha){
  setHorarioCell(personId, fecha, 'F');
}

// ── MODAL TARDANZA INLINE ─────────────────────────────
let _tardanzaPending = null;

function openTardanzaModal(personId, dk, weekKey){
  _tardanzaPending = {personId, dk, weekKey};
  document.getElementById('tard-horas').value='0';
  document.getElementById('tard-minutos').value='0';
  document.getElementById('tard-motivo').value='';
  document.getElementById('m-tardanza').classList.add('open');
}

function saveTardanza(){
  if(!_tardanzaPending) return;
  const {personId, dk, weekKey} = _tardanzaPending;
  const horas = parseInt(document.getElementById('tard-horas').value)||0;
  const minutos = parseInt(document.getElementById('tard-minutos').value)||0;
  if(horas===0 && minutos===0){ alert('Ingresa el tiempo de tardanza.'); return; }
  const motivo = document.getElementById('tard-motivo').value.trim();
  if(!DB.horarios[weekKey]) DB.horarios[weekKey]={};
  if(!DB.horarios[weekKey][personId]) DB.horarios[weekKey][personId]={};
  const prev = DB.horarios[weekKey][personId][dk]||{};
  DB.horarios[weekKey][personId][dk] = {...prev, tipo:'T', tardHoras:horas, tardMinutos:minutos, tardMotivo:motivo, auto:false};
  saveDB();
  document.getElementById('m-tardanza').classList.remove('open');
  _tardanzaPending = null;
  renderHorario();
  renderDash();
}

function renderHorario(){
  const dateVal=document.getElementById('hor-week').value || today();
  const weekKey=getWeekKey(dateVal);
  const weekDates=getWeekDates(weekKey);
  if(!DB.horarios[weekKey]) DB.horarios[weekKey]={};
  const wk=DB.horarios[weekKey];
  DB.personal.forEach(p=>{
    if(!wk[p.id]) wk[p.id]={};
    DAYKEYS.forEach(dk=>{
      const cell=wk[p.id][dk];
      if(cell===undefined || cell?.auto){
        if(p.estado==='Inactivo'){
          wk[p.id][dk] = {tipo:'I', auto:true};
        } else {
          const tpl=templateFor(p.cargo,dk);
          wk[p.id][dk] = (tpl==='D') ? {tipo:'D',auto:true} : {tipo:'H',in:tpl.in,out:tpl.out,auto:true};
        }
      }
    });
  });

  let html=`<div style="margin-bottom:8px;font-size:13px;color:var(--text2)"><i class="ti ti-calendar"></i> Semana del <strong>${fmtDate(weekDates[0])}</strong> al <strong>${fmtDate(weekDates[6])}</strong></div>`;
  html+=`<div class="hor-grid">`;
  html+=`<div class="hor-cell hor-header" style="text-align:left;padding-left:10px;align-items:flex-start">Colaborador</div>`;
  DAYS.forEach((d,i)=>html+=`<div class="hor-cell hor-header">${d}<br><span style="font-weight:400;font-size:10px;color:var(--text3)">${weekDates[i].slice(5).replace('-','/')}</span></div>`);
  html+=`<div class="hor-cell hor-header">Total</div>`;

  DB.personal.forEach(p=>{
    html+=`<div class="hor-cell hor-name" style="border-left:none"><strong>${p.nombre}</strong><span class="badge badge-blue hor-cargo-badge">${p.cargo}</span></div>`;
    let totalSemana=0;
    DAYKEYS.forEach(dk=>{
      const cell=wk[p.id][dk]||{tipo:'D'};
      const cls = cell.tipo==='D' ? 't-D' : cell.tipo==='F' ? 't-F' : cell.tipo==='V' ? 't-V' : cell.tipo==='I' ? 't-I' : cell.tipo==='T' ? 't-T' : 't-H';
      if(cell.tipo==='H' && cell.in && cell.out) totalSemana+=calcHoras(cell.in,cell.out);
      const tipoSelect = `<select class="hor-tipo" onchange="horTipoChange(this)">
          <option value="H" ${cell.tipo==='H'?'selected':''}>Horario</option>
          <option value="D" ${cell.tipo==='D'?'selected':''}>Descanso</option>
          <option value="F" ${cell.tipo==='F'?'selected':''}>Falta</option>
          <option value="T" ${cell.tipo==='T'?'selected':''}>Tardanza</option>
          <option value="V" ${cell.tipo==='V'?'selected':''}>Vacaciones</option>
          <option value="I" ${cell.tipo==='I'?'selected':''}>Inactivo</option>
        </select>`;
      const tardInfo = cell.tipo==='T' ? `<div style="font-size:10px;color:var(--purple);margin-top:2px;cursor:pointer" onclick="openTardanzaModal(${p.id},'${dk}','${weekKey}')">✏️ ${cell.tardHoras||0}h ${cell.tardMinutos||0}min${cell.tardMotivo?' · '+cell.tardMotivo:''}</div>` : '';
      html+=`<div class="hor-cell ${cls}" data-pid="${p.id}" data-dk="${dk}">
        ${tipoSelect}
        <div class="hor-times" style="${cell.tipo==='H'?'':'display:none'}">
          <input type="time" class="hor-time-in" value="${cell.in||''}" onchange="horTimeChange(this)">
          <input type="time" class="hor-time-out" value="${cell.out||''}" onchange="horTimeChange(this)">
        </div>
        <div class="hor-total">${cell.tipo==='H'&&cell.in&&cell.out?fmtHoras(calcHoras(cell.in,cell.out)):'—'}</div>
        ${tardInfo}
      </div>`;
    });
    html+=`<div class="hor-cell hor-cell-total">${fmtHoras(totalSemana)}</div>`;
  });
  html+=`</div>`;

  // ── RESUMEN DE FALTAS Y TARDANZAS DE LA SEMANA ─────
  const resumen = {};
  DB.personal.forEach(p=>{
    resumen[p.id]={nombre:p.nombre, faltas:0, tardanzas:[], totalMinTard:0};
    DAYKEYS.forEach(dk=>{
      const cell=(wk[p.id]||{})[dk]||{};
      if(cell.tipo==='F') resumen[p.id].faltas++;
      if(cell.tipo==='T'){
        const mins=(cell.tardHoras||0)*60+(cell.tardMinutos||0);
        resumen[p.id].tardanzas.push(mins);
        resumen[p.id].totalMinTard+=mins;
      }
    });
  });
  const conEventos = Object.values(resumen).filter(r=>r.faltas>0||r.tardanzas.length>0);
  if(conEventos.length>0){
    html+=`<div style="margin-top:1.25rem">
      <div class="card-title" style="margin-bottom:.75rem"><i class="ti ti-alert-circle" style="color:var(--red)"></i> Faltas y Tardanzas — esta semana</div>
      <table style="width:100%;font-size:13px;border-collapse:collapse">
        <thead><tr style="border-bottom:1px solid var(--border)">
          <th style="text-align:left;padding:6px 8px;color:var(--text2)">Colaborador</th>
          <th style="text-align:center;padding:6px 8px;color:var(--red)"><i class="ti ti-calendar-off"></i> Faltas</th>
          <th style="text-align:center;padding:6px 8px;color:var(--purple)"><i class="ti ti-clock"></i> Tardanzas</th>
          <th style="text-align:center;padding:6px 8px;color:var(--amber)"><i class="ti ti-hourglass"></i> Min. perdidos</th>
        </tr></thead><tbody>`;
    conEventos.forEach(r=>{
      html+=`<tr style="border-bottom:1px solid var(--border)">
        <td style="padding:6px 8px"><strong>${r.nombre}</strong></td>
        <td style="text-align:center;padding:6px 8px">${r.faltas>0?`<span class="badge badge-danger">${r.faltas}</span>`:'—'}</td>
        <td style="text-align:center;padding:6px 8px">${r.tardanzas.length>0?`<span class="badge badge-warn">${r.tardanzas.length}</span>`:'—'}</td>
        <td style="text-align:center;padding:6px 8px">${r.totalMinTard>0?`<span style="color:var(--amber);font-weight:700">${r.totalMinTard} min</span>`:'—'}</td>
      </tr>`;
    });
    html+=`</tbody></table></div>`;
  }

  document.getElementById('hor-container').innerHTML=html;
}

function shiftHorWeek(dir){
  const cur=document.getElementById('hor-week').value || today();
  const d=new Date(cur+'T00:00:00');
  d.setDate(d.getDate()+dir*7);
  document.getElementById('hor-week').value=d.toISOString().split('T')[0];
  renderHorario();
}
function horTipoChange(sel){
  const cell=sel.closest('.hor-cell');
  const pid=parseInt(cell.dataset.pid), dk=cell.dataset.dk, tipo=sel.value;
  const weekKey=getWeekKey(document.getElementById('hor-week').value||today());
  if(!DB.horarios[weekKey]) DB.horarios[weekKey]={};
  if(!DB.horarios[weekKey][pid]) DB.horarios[weekKey][pid]={};
  const prev=DB.horarios[weekKey][pid][dk]||{};
  if(tipo==='H'){
    const p=DB.personal.find(x=>x.id===pid);
    const tpl=templateFor(p?.cargo,dk);
    DB.horarios[weekKey][pid][dk]={tipo:'H', in:prev.in||(tpl!=='D'?tpl.in:'09:00'), out:prev.out||(tpl!=='D'?tpl.out:'18:00'), auto:false};
    saveDB(); renderHorario();
  } else if(tipo==='T'){
    DB.horarios[weekKey][pid][dk]={...prev, tipo:'T', tardHoras:prev.tardHoras||0, tardMinutos:prev.tardMinutos||0, tardMotivo:prev.tardMotivo||'', auto:false};
    saveDB(); renderHorario();
    setTimeout(()=>openTardanzaModal(pid, dk, weekKey), 50);
  } else {
    DB.horarios[weekKey][pid][dk]={tipo, auto:false};
    saveDB(); renderHorario();
  }
  renderDash();
}
function horTimeChange(input){
  const cell=input.closest('.hor-cell');
  const pid=parseInt(cell.dataset.pid), dk=cell.dataset.dk;
  const weekKey=getWeekKey(document.getElementById('hor-week').value||today());
  const inVal=cell.querySelector('.hor-time-in').value;
  const outVal=cell.querySelector('.hor-time-out').value;
  DB.horarios[weekKey][pid][dk]={tipo:'H', in:inVal, out:outVal, auto:false};
  saveDB();
  cell.querySelector('.hor-total').textContent = (inVal&&outVal)?fmtHoras(calcHoras(inVal,outVal)):'—';
  renderHorario();
}
function resetHorarioSemana(){
  if(!confirm('¿Restablecer horario?')) return;
  const weekKey=getWeekKey(document.getElementById('hor-week').value||today());
  DB.horarios[weekKey]={};
  saveDB(); renderHorario();
}
function saveHorario(){
  saveDB();
  toast('Horario guardado','ok');
}
