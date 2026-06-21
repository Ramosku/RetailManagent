function calcSipEstado(pct){
  if(pct >= 15) return {label:'EXCELENTE', color:'var(--green)', bg:'var(--green-light)'};
  if(pct >= 11) return {label:'BUENO', color:'var(--green)', bg:'var(--green-light)'};
  return {label:'DEFICIENTE', color:'var(--red)', bg:'var(--red-light)'};
}

function saveSip(){
  const fecha = document.getElementById('sip-fecha').value;
  const total = parseFloat(document.getElementById('sip-total').value);
  const monto = parseFloat(document.getElementById('sip-monto').value);
  if(!fecha || isNaN(total) || isNaN(monto) || total<=0){ alert('Completa fecha, venta total y venta SIP correctamente.'); return; }
  if(monto > total){ alert('La venta SIP no puede ser mayor que la venta total.'); return; }
  const pct = (monto/total)*100;
  if(!DB.sip) DB.sip = [];
  const idx = DB.sip.findIndex(s => s.fecha === fecha);
  const record = { id: idx>=0 ? DB.sip[idx].id : DB.nextId.sip++, fecha, total, monto, pct, registradoPor: currentUser };
  if(idx>=0) DB.sip[idx] = record; else DB.sip.push(record);
  saveDB();
  updateSipSummary(record);
  renderSipHistory();
  const msg = document.getElementById('sip-save-msg');
  msg.style.display='inline';
  setTimeout(()=>msg.style.display='none', 2500);
}

function updateSipSummary(record){
  const estado = calcSipEstado(record.pct);
  document.getElementById('sip-porcentaje').textContent = record.pct.toFixed(2)+'%';
  document.getElementById('sip-estado').textContent = estado.label;
  const statusBox = document.getElementById('sip-status-box');
  statusBox.style.background = estado.color;
  statusBox.style.color = '#fff';
}

function delSip(id){
  if(!confirm('¿Eliminar este registro?')) return;
  DB.sip = DB.sip.filter(s => s.id !== id);
  saveDB(); renderSipHistory();
}

function renderSipHistory(){
  const tbody = document.getElementById('sip-tbody');
  if(!tbody) return;
  let data = [...(DB.sip || [])].sort((a,b) => b.fecha.localeCompare(a.fecha));
  const filtroMes = document.getElementById('sip-filter-mes')?.value;
  if(filtroMes) data = data.filter(s => s.fecha.startsWith(filtroMes));
  if(data.length === 0){
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text3)">Sin registros aún.</td></tr>';
  } else {
    tbody.innerHTML = data.map(s => {
      const estado = calcSipEstado(s.pct);
      return `<tr>
        <td>${fmtDate(s.fecha)}</td>
        <td>S/ ${s.total.toFixed(2)}</td>
        <td>S/ ${s.monto.toFixed(2)}</td>
        <td><strong>${s.pct.toFixed(2)}%</strong></td>
        <td><span class="badge" style="background:${estado.bg};color:${estado.color}">${estado.label}</span></td>
        <td><button class="btn btn-icon btn-sm btn-danger" onclick="delSip(${s.id})"><i class="ti ti-trash"></i></button></td>
      </tr>`;
    }).join('');
  }
  if(data.length > 0){
    const today = new Date().toISOString().split('T')[0];
    const hoy = (DB.sip||[]).find(s => s.fecha === today);
    updateSipSummary(hoy || data[0]);
  } else {
    document.getElementById('sip-porcentaje').textContent = '0.00%';
    document.getElementById('sip-estado').textContent = 'SIN REGISTRO';
    const statusBox = document.getElementById('sip-status-box');
    statusBox.style.background = 'var(--text2)';
    statusBox.style.color = '#fff';
  }
}