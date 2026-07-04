// ── COMUNICADOS (recibidos desde la plataforma del Jefe de Zona) ──────
let COMUNICADOS = [];

function comunicadosSeenKey(){ return 'rm_comunicados_seen_' + (currentTiendaId || ''); }
function getComunicadosSeenId(){ return localStorage.getItem(comunicadosSeenKey()) || ''; }
function markComunicadosRead(){
  if(!COMUNICADOS.length) return;
  localStorage.setItem(comunicadosSeenKey(), String(COMUNICADOS[0].id));
  updateComunicadosBadge();
}
function updateComunicadosBadge(){
  const badge = document.getElementById('comunicados-badge');
  if(!badge) return;
  const seen = getComunicadosSeenId();
  const idx = COMUNICADOS.findIndex(c=>String(c.id)===seen);
  const unread = idx===-1 ? COMUNICADOS.length : idx;
  if(unread>0){ badge.style.display='flex'; badge.textContent = unread>9?'9+':unread; }
  else { badge.style.display='none'; }
}

// Llamado por firebase.js cuando llega/actualiza la lista de comunicados
function onComunicadosUpdate(items){
  COMUNICADOS = [...(items||[])].sort((a,b)=> (b.fecha||'').localeCompare(a.fecha||''));
  updateComunicadosBadge();
  const sec = document.getElementById('sec-comunicados');
  if(sec && sec.classList.contains('active')) renderComunicados();
}

function renderComunicados(){
  const box = document.getElementById('comunicados-list');
  if(!box) return;
  const seen = getComunicadosSeenId();
  const seenIdx = COMUNICADOS.findIndex(c=>String(c.id)===seen);

  if(!COMUNICADOS.length){
    box.innerHTML = '<div class="comunicado-empty"><i class="ti ti-speakerphone"></i>Aún no hay comunicados de la Jefatura de Zona.</div>';
    return;
  }
  box.innerHTML = COMUNICADOS.map((c,i)=>{
    const unread = seenIdx===-1 || i<seenIdx;
    const fecha = c.fecha ? new Date(c.fecha).toLocaleString('es-PE',{dateStyle:'medium',timeStyle:'short'}) : '';
    return `<div class="comunicado-card ${unread?'unread':''}">
      <div class="comunicado-head">
        <div class="comunicado-autor"><i class="ti ti-speakerphone"></i>${c.autor || 'Eduardo Cabello'}</div>
        <div class="comunicado-fecha">${fecha}</div>
      </div>
      ${c.texto ? `<div class="comunicado-texto">${escapeHtmlComunicado(c.texto)}</div>` : ''}
      ${c.imagenUrl ? `<img class="comunicado-img" src="${c.imagenUrl}" onclick="verImagenComunicado('${c.imagenUrl}')">` : ''}
    </div>`;
  }).join('');
  markComunicadosRead();
}

function verImagenComunicado(url){
  document.getElementById('m-comunicado-img-src').src = url;
  document.getElementById('m-comunicado-img').classList.add('open');
}

function escapeHtmlComunicado(str){
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}
