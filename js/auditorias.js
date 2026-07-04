const auditChecklistData = [
  { category: "DINERO", items: [
    { text: "Las NC emitidas cuentan con los datos completos (DNI, nombre y firma)", points: 5 },
    { text: "El importe del retiro no supera el límite establecido", points: 5 },
    { text: "En el arqueo de cajero del auditor no se encuentran diferencias", points: 5 },
    { text: "Todos los sobres son depositados inmediatamente", points: 5 },
    { text: "Todo dinero retirado de bóveda queda registrado (fondo)", points: 5 },
    { text: "La cuadratura de medios de pago cuadra (lotes)", points: 5 },
    { text: "La cuadratura de venta (pre cierre) se realiza al día siguiente", points: 5 },
    { text: "Las anomalías fueron trabajadas", points: 10 },
    { text: "Los registros de depósitos en BBR corresponden al reporte de la transportadora", points: 5 },
    { text: "Los sobres enviados cuadran con lo declarado en el sistema", points: 5 },
    { text: "En el arqueo de bóveda del auditor no se encuentran diferencias", points: 5 },
    { text: "El coordinador realiza arqueos de bóveda", points: 5 },
    { text: "Las diferencias encontradas en arqueos anteriores fueron registradas", points: 5 },
    { text: "Los usuarios de cajeros son personales e intransferibles", points: 5 },
    { text: "Los usuarios de tesorería son personales e intransferibles", points: 5 },
    { text: "Los usuarios activos corresponden a la planilla actual de tienda", points: 5 },
    { text: "No se usan usuarios de personal cesado o trasladado", points: 5 },
    { text: "Los autorizadores son personales e intransferibles", points: 5 },
    { text: "Los autorizadores activos corresponden a la planilla actual", points: 5 },
    { text: "No se usan autorizadores de personal cesado o trasladado", points: 5 }
  ]},
  { category: "CLIENTE", items: [
    { text: "Libro de reclamaciones de respaldo y QR dentro del libro", points: 5 },
    { text: "Aviso del Libro de Reclamaciones Virtual", points: 5 },
    { text: "Reclamos registrados en SIREC", points: 5 },
    { text: "Reclamos atendidos dentro del plazo normativo", points: 5 },
    { text: "Atención preferente a personas con perro guía", points: 5 },
    { text: "Aviso de Ley de Atención Preferente", points: 5 },
    { text: "Aviso de Medios de Pago", points: 5 },
    { text: "Aviso contra el Acoso Sexual", points: 5 },
    { text: "Aviso contra la Discriminación", points: 5 },
    { text: "Certificado de calibración de balanzas vigente", points: 5 }
  ]},
  { category: "GDH", items: [
    { text: "Acceso a We Connect / Academia MASS", points: 5 },
    { text: "Conductas culturales SEHMAS conocidas por colaboradores", points: 5 },
    { text: "Mesa o silla operativa para almuerzo", points: 5 },
    { text: "Microondas operativo", points: 5 },
    { text: "Ventiladores operativos", points: 5 },
    { text: "Pago de asignación familiar", points: 5 },
    { text: "Descuentos por diferencia de caja con formato firmado", points: 5 },
    { text: "Descuento ejecutado coincide con BBR", points: 6 },
    { text: "Enrolamiento dentro del plazo establecido", points: 6 },
    { text: "Cumplimiento del refrigerio mínimo", points: 6 },
    { text: "Visualización de boleta en SuperApp", points: 5 },
    { text: "Full time y part time cuentan con marcaciones correctas", points: 6 },
    { text: "Part time no realizan horas extras", points: 6 },
    { text: "Colaboradores se retiran después de marcar salida", points: 6 },
    { text: "Horario publicado y visible", points: 5 },
    { text: "RPC operativo", points: 5 },
    { text: "Sin reincidencias de auditorías anteriores", points: 3 }
  ]},
  { category: "INVENTARIOS", items: [
    { text: "Programación y ejecución de inventarios", points: 9 },
    { text: "Códigos programados contados totalmente", points: 10 },
    { text: "Stock teórico vs físico (inventarios programados)", points: 8 },
    { text: "Ajustes cuentan con autorización", points: 3 },
    { text: "Legajos completos", points: 3 },
    { text: "Análisis de legajos realizado", points: 3 },
    { text: "Stock teórico vs físico (productos ajustados)", points: 8 },
    { text: "Inventario 04 (Devolución) cuadra con físico", points: 10 },
    { text: "Inventarios 02,03,05,06 y 09 cuadran con físico", points: 5 },
    { text: "Productos con stock exhibidos para la venta", points: 10 },
    { text: "Facturas/GR cuentan con conformidad de recepción", points: 5 },
    { text: "Cantidades recepcionadas coinciden con sistema", points: 5 },
    { text: "Transferencias recepcionadas en sistema", points: 5 },
    { text: "Transferencias cuentan con autorizaciones", points: 5 },
    { text: "Donaciones cuentan con sustento", points: 2 },
    { text: "Productos donados son los autorizados", points: 2 }
  ]},
  { category: "CALIDAD", items: [
    { text: "Refrigeración ≤ 5°C", points: 3 },
    { text: "Congelados ≤ -18°C", points: 3 },
    { text: "Productos en buenas condiciones y frescura", points: 4 },
    { text: "Equipos y utensilios en buen estado", points: 4 },
    { text: "Infraestructura en buen estado", points: 4 },
    { text: "Limpieza de superficies sin contacto", points: 3 },
    { text: "Ausencia de plagas", points: 6 },
    { text: "Termómetro operativo", points: 2 },
    { text: "Colaborador sabe tomar temperatura", points: 4 },
    { text: "Productos exhibidos con rótulo de vencimiento", points: 4 },
    { text: "Manipulación adecuada de alimentos", points: 4 },
    { text: "Ausencia de envases abollados u oxidados", points: 2 },
    { text: "Productos vigentes (no vencidos)", points: 6 },
    { text: "Manejo según tiempos de vida útil", points: 2 },
    { text: "Devolución/merma separada y rotulada", points: 3 },
    { text: "Jabas no colocadas directamente en piso", points: 3 },
    { text: "Distancias de almacenamiento correctas", points: 2 },
    { text: "Limpieza de superficies en contacto con alimentos", points: 4 },
    { text: "Utensilios de limpieza en buen estado", points: 2 },
    { text: "Basureros adecuados", points: 2 },
    { text: "Stock de químicos y rotulación correcta", points: 2 },
    { text: "Material de empaque en buen estado", points: 2 },
    { text: "Baños limpios y abastecidos", points: 3 },
    { text: "Retiros de mercadería según Calidad", points: 3 }
  ]},
  { category: "SST", items: [
    { text: "Conexiones eléctricas en buenas condiciones", points: 5 },
    { text: "Escaleras operativas", points: 5 },
    { text: "Techos, paredes, pisos y tuberías con mantenimiento", points: 5 },
    { text: "Almacenamiento seguro de mercadería", points: 5 },
    { text: "Botiquín y primeros auxilios vigentes", points: 5 },
    { text: "Equipos de emergencia libres de obstáculos", points: 5 },
    { text: "Equipos de emergencia operativos", points: 5 },
    { text: "Rutas de evacuación libres", points: 5 },
    { text: "Mapa de riesgo publicado", points: 5 },
    { text: "IPER publicado", points: 5 },
    { text: "Proveedores de alto riesgo cumplen requisitos SST", points: 5 }
  ]},
  { category: "MANTENIMIENTO", items: [
    { text: "Cronograma de mantenimiento preventivo", points: 5 },
    { text: "Ejecución del mantenimiento preventivo según cronograma", points: 5 },
    { text: "Conformidad de servicio preventivo", points: 5 },
    { text: "Conformidad de servicio correctivo", points: 5 },
    { text: "Atención oportuna de emergencias/adicionales", points: 5 },
    { text: "Conformidad de servicios adicionales", points: 5 },
    { text: "Infraestructura en buenas condiciones", points: 5 },
    { text: "Baños en buen estado y funcionamiento", points: 3 },
    { text: "Certificado de fumigación vigente", points: 6 },
    { text: "Correcta reposición de cebos", points: 4 },
    { text: "Filtro de agua vigente", points: 5 }
  ]},
  { category: "REGULATORIA", items: [
    { text: "Licencia de Funcionamiento vigente", points: 5 },
    { text: "Autorización de Uso de Retiro", points: 5 },
    { text: "Autorización de Anuncios Publicitarios", points: 5 },
    { text: "Certificado de Defensa Civil vigente", points: 5 },
    { text: "Certificado de Desinfección y Fumigación vigente", points: 5 },
    { text: "Certificado de operatividad de Luces de Emergencia", points: 5 },
    { text: "Certificado de operatividad de Extintores", points: 5 },
    { text: "Certificado de operatividad de Detectores de Humo", points: 5 },
    { text: "Certificado de operatividad de Pozo Tierra", points: 5 },
    { text: "Plano de Arquitectura y Distribución vigente", points: 5 },
    { text: "Plano de Localización y Ubicación vigente", points: 5 },
    { text: "Plano de Señalización y Evacuación vigente", points: 5 },
    { text: "Constancia de capacitación de Primeros Auxilios", points: 5 },
    { text: "Publicación visible del aforo", points: 5 },
    { text: "Política SST publicada y vigente", points: 5 },
    { text: "PASST y objetivos actualizados", points: 5 }
  ]}
];

let auditChart = null;

function initAuditChecklistSystem(){
  const container = document.getElementById('auditChecklistContainer');
  if(!container) return;
  container.innerHTML = '';
  auditChecklistData.forEach((cat, catIndex) => {
    const totalCatPoints = cat.items.reduce((sum, item) => sum + item.points, 0);
    const section = document.createElement('div');
    section.className = 'category-section';
    section.innerHTML = `
      <div class="category-header" onclick="toggleAuditCategory(${catIndex})">
        <span><i class="ti ti-clipboard-check" style="color:var(--blue)"></i> ${cat.category} <span style="font-size:11px;color:var(--text3);font-weight:400">(${cat.items.length} ítems)</span></span>
        <div style="display:flex;align-items:center;gap:10px">
          <button class="btn btn-sm" style="font-size:11px;padding:3px 10px;background:var(--green-light);color:var(--green);border-color:#9EE0C0" onclick="event.stopPropagation();selectAllCat(${catIndex})"><i class="ti ti-checks"></i> Seleccionar todo</button>
          <span class="category-score" id="score-cat-${catIndex}">0 / ${totalCatPoints} pts (0.00%)</span>
        </div>
      </div>
      <div class="category-content" id="content-cat-${catIndex}">
        ${cat.items.map((item, itemIndex) => `
          <div class="audit-item">
            <input type="checkbox" id="audit-chk-${catIndex}-${itemIndex}" data-cat="${catIndex}" data-idx="${itemIndex}" data-points="${item.points}" onchange="calculateAuditChecklist()">
            <label for="audit-chk-${catIndex}-${itemIndex}">${item.text}</label>
            <span class="item-points">${item.points} pts</span>
          </div>
        `).join('')}
      </div>
    `;
    container.appendChild(section);
  });
  const ctx = document.getElementById('auditChart').getContext('2d');
  auditChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: auditChecklistData.map(c => c.category),
      datasets: [{
        label: '% Cumplimiento',
        data: new Array(8).fill(0),
        backgroundColor: 'rgba(26, 111, 216, 0.7)',
        borderColor: 'rgba(26, 111, 216, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } } },
      plugins: { legend: { display: false } }
    }
  });
}

function toggleAuditCategory(index){
  document.getElementById(`content-cat-${index}`).classList.toggle('open');
}

function selectAllCat(catIndex){
  const checkboxes = document.querySelectorAll(`input[data-cat="${catIndex}"]`);
  const allChecked = [...checkboxes].every(c => c.checked);
  checkboxes.forEach(c => c.checked = !allChecked);
  calculateAuditChecklist();
}

function calculateAuditChecklist(){
  const categoryPercentages = [];
  auditChecklistData.forEach((cat, catIndex) => {
    const checkboxes = document.querySelectorAll(`input[data-cat="${catIndex}"]`);
    let obtained = 0, total = 0;
    checkboxes.forEach(chk => {
      total += parseInt(chk.dataset.points);
      if (chk.checked) obtained += parseInt(chk.dataset.points);
    });
    const percentage = total > 0 ? (obtained / total) * 100 : 0;
    categoryPercentages.push(percentage);
    document.getElementById(`score-cat-${catIndex}`).textContent = `${obtained} / ${total} pts (${percentage.toFixed(2)}%)`;
  });
  const totalAverage = categoryPercentages.reduce((a, b) => a + b, 0) / categoryPercentages.length;
  document.getElementById('finalScore').textContent = totalAverage.toFixed(2) + '%';
  const statusBox = document.getElementById('statusBox');
  const statusText = document.getElementById('finalStatus');
  statusBox.className = 'score-box';
  if (totalAverage >= 95) { statusBox.classList.add('aprobado'); statusText.textContent = 'APROBADO'; }
  else if (totalAverage >= 90) { statusBox.classList.add('bueno'); statusText.textContent = 'BUENO'; }
  else { statusBox.classList.add('jalado'); statusText.textContent = 'JALADO'; }
  if (auditChart) {
    auditChart.data.datasets[0].data = categoryPercentages;
    auditChart.update();
  }
}

function resetAuditChecklist(){
  if(confirm('¿Reiniciar toda la auditoría?')) {
    document.querySelectorAll('#auditChecklistContainer input[type="checkbox"]').forEach(chk => chk.checked = false);
    calculateAuditChecklist();
  }
}

function saveAuditChecklist(){
  const scoreText = document.getElementById('finalScore').textContent;
  const status = document.getElementById('finalStatus').textContent;
  if (status === 'SIN EVALUAR') {
    alert('Por favor completa al menos algunas categorías antes de guardar.');
    return;
  }
  const detalleCategorias = [];
  const fallosGenerados = [];
  let totalObtenido = 0, totalPosible = 0;
  const auditId = 'audit-' + Date.now();
  auditChecklistData.forEach((cat, catIndex) => {
    const checkboxes = document.querySelectorAll(`input[data-cat="${catIndex}"]`);
    let catObtenido = 0, catTotal = 0;
    const itemsCumplidos = [];
    const itemsNoCumplidos = [];
    checkboxes.forEach(chk => {
      const idx = parseInt(chk.dataset.idx);
      const pts = parseInt(chk.dataset.points);
      catTotal += pts;
      totalPosible += pts;
      if (chk.checked) {
        catObtenido += pts;
        totalObtenido += pts;
        itemsCumplidos.push({ text: cat.items[idx].text, points: pts });
      } else {
        itemsNoCumplidos.push({ text: cat.items[idx].text, points: pts });
      }
    });
    detalleCategorias.push({
      categoria: cat.category,
      obtenido: catObtenido,
      total: catTotal,
      porcentaje: catTotal > 0 ? (catObtenido/catTotal*100) : 0,
      itemsCumplidos,
      itemsNoCumplidos
    });
    itemsNoCumplidos.forEach(item => {
      fallosGenerados.push({
        id: 'fallo-' + Date.now() + '-' + Math.random().toString(36).substr(2,5),
        fecha: today(),
        categoria: cat.category,
        desc: item.text,
        puntos: item.points,
        origen: 'checklist',
        estado: 'Pendiente',
        auditor: currentUser,
        obsSolucion: '',
        limite: '',
        auditId: auditId
      });
    });
  });
  const porcentajeGeneral = totalPosible > 0 ? (totalObtenido/totalPosible*100) : 0;
  const auditRecord = {
    id: auditId,
    fecha: today(),
    hora: new Date().toLocaleTimeString('es-PE'),
    registradoPor: currentUser,
    puntaje: scoreText,
    porcentaje: porcentajeGeneral,
    estado: status,
    totalObtenido,
    totalPosible,
    detalleCategorias,
    fallosGenerados: fallosGenerados.length,
    timestamp: new Date().toISOString()
  };
  if(!DB.auditChecklistHistory) DB.auditChecklistHistory = [];
  DB.auditChecklistHistory.push(auditRecord);
  if(!DB.fallos) DB.fallos = [];
  DB.fallos = [...DB.fallos, ...fallosGenerados];
  saveDB();
  const msg = fallosGenerados.length > 0
    ? `✅ Auditoría guardada correctamente.\n📊 Puntaje: ${scoreText} (${status})\n⚠️ Se generaron ${fallosGenerados.length} fallos pendientes.\nVe a la pestaña "Fallos Encontrados" para verlos y darles seguimiento.`
    : `✅ Auditoría guardada correctamente.\n📊 Puntaje: ${scoreText} (${status})\n✨ ¡No se generaron fallos!`;
  alert(msg);
  document.querySelectorAll('#auditChecklistContainer input[type="checkbox"]').forEach(chk => chk.checked = false);
  calculateAuditChecklist();
  renderFallos();
  renderAuditHistory();
  renderDash();
}

function renderAuditHistory(){
  const container = document.getElementById('audit-history-list');
  if(!container) return;
  const filter = document.getElementById('hist-filter-estado')?.value || '';
  let data = [...(DB.auditChecklistHistory || [])].sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
  if(filter) data = data.filter(a => a.estado === filter);
  if(!data.length){
    container.innerHTML = '<div class="empty-state"><i class="ti ti-history-off"></i>No hay auditorías guardadas aún.<br><small>Realiza una auditoría en el checklist y guárdala para verla aquí.</small></div>';
    return;
  }
  container.innerHTML = data.map(a => {
    const statusClass = a.estado === 'APROBADO' ? 'badge-ok' : a.estado === 'BUENO' ? 'badge-warn' : 'badge-danger';
    return `<div class="audit-history-item" style="position:relative">
      <div class="audit-history-header" onclick="verDetalleAuditoria('${a.id}')" style="cursor:pointer">
        <div>
          <strong style="font-size:14px">Auditoría del ${fmtDate(a.fecha)}</strong>
          <span style="font-size:11px;color:var(--text3);margin-left:8px">${a.hora || ''}</span>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <span class="badge ${statusClass}" style="font-size:13px;padding:5px 12px">${a.estado}</span>
          <strong style="font-size:18px;color:var(--blue)">${a.puntaje}</strong>
          <button class="btn btn-icon btn-sm btn-danger" onclick="event.stopPropagation();delAuditoria('${a.id}')" title="Eliminar auditoría y sus fallos"><i class="ti ti-trash"></i></button>
        </div>
      </div>
      <div class="audit-history-details" onclick="verDetalleAuditoria('${a.id}')" style="cursor:pointer">
        <div><i class="ti ti-user"></i> ${a.registradoPor}</div>
        <div><i class="ti ti-points"></i> ${a.totalObtenido} / ${a.totalPosible} pts</div>
        <div><i class="ti ti-alert-circle" style="color:var(--red)"></i> ${a.fallosGenerados || 0} fallos generados</div>
        <div><i class="ti ti-eye"></i> <span style="color:var(--blue);font-weight:600">Ver detalle →</span></div>
      </div>
    </div>`;
  }).join('');
}

function delAuditoria(id){
  const audit = (DB.auditChecklistHistory || []).find(a => a.id === id);
  if(!audit) return;
  const fallosAsociados = (DB.fallos || []).filter(f => f.origen === 'checklist' && f.fecha === audit.fecha).length;
  const msg = fallosAsociados > 0
    ? `¿Eliminar la auditoría del ${fmtDate(audit.fecha)} y sus ${fallosAsociados} fallos de checklist de esa fecha?`
    : `¿Eliminar la auditoría del ${fmtDate(audit.fecha)}?`;
  if(!confirm(msg)) return;
  DB.auditChecklistHistory = (DB.auditChecklistHistory || []).filter(a => a.id !== id);
  DB.fallos = (DB.fallos || []).filter(f => !(f.origen === 'checklist' && f.fecha === audit.fecha));
  saveDB();
  renderAuditHistory();
  renderFallos();
  renderDash();
  toast('Auditoría eliminada', 'ok');
}

function verDetalleAuditoria(id){
  const audit = (DB.auditChecklistHistory || []).find(a => a.id === id);
  if(!audit) return;
  const content = document.getElementById('audit-detail-content');
  const statusClass = audit.estado === 'APROBADO' ? 'badge-ok' : audit.estado === 'BUENO' ? 'badge-warn' : 'badge-danger';
  let html = `
    <div style="background:var(--surface2);padding:1rem;border-radius:var(--radius);margin-bottom:1rem">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem">
        <strong style="font-size:16px">Auditoría del ${fmtDate(audit.fecha)} — ${audit.hora || ''}</strong>
        <span class="badge ${statusClass}" style="font-size:14px;padding:6px 14px">${audit.estado}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;font-size:13px">
        <div><strong>Puntaje:</strong> ${audit.puntaje}</div>
        <div><strong>Puntos:</strong> ${audit.totalObtenido} / ${audit.totalPosible}</div>
        <div><strong>Registrado por:</strong> ${audit.registradoPor}</div>
        <div><strong>Fallos:</strong> ${audit.fallosGenerados || 0}</div>
      </div>
    </div>
  `;
  audit.detalleCategorias.forEach(cat => {
    const pctClass = cat.porcentaje >= 95 ? 'var(--green)' : cat.porcentaje >= 90 ? 'var(--amber)' : 'var(--red)';
    html += `
      <div style="margin-bottom:1rem;border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">
        <div style="background:var(--surface2);padding:0.75rem 1rem;display:flex;justify-content:space-between;align-items:center">
          <strong>${cat.categoria}</strong>
          <span style="color:${pctClass};font-weight:700">${cat.obtenido} / ${cat.total} pts (${cat.porcentaje.toFixed(1)}%)</span>
        </div>
        <div style="padding:0.75rem 1rem">
    `;
    if(cat.itemsNoCumplidos.length > 0){
      html += `<div style="margin-bottom:0.5rem"><strong style="color:var(--red);font-size:12px">❌ NO CUMPLIDOS (${cat.itemsNoCumplidos.length}):</strong></div>`;
      html += cat.itemsNoCumplidos.map(i => `<div style="font-size:12px;padding:4px 0;color:var(--text);border-bottom:1px solid var(--border)">• ${i.text} <span style="color:var(--red);font-weight:600">(-${i.points} pts)</span></div>`).join('');
    }
    if(cat.itemsCumplidos.length > 0){
      html += `<div style="margin-top:0.5rem;margin-bottom:0.5rem"><strong style="color:var(--green);font-size:12px">✅ CUMPLIDOS (${cat.itemsCumplidos.length}):</strong></div>`;
      html += cat.itemsCumplidos.map(i => `<div style="font-size:12px;padding:4px 0;color:var(--text2)">• ${i.text} <span style="color:var(--green);font-weight:600">(+${i.points} pts)</span></div>`).join('');
    }
    html += `</div></div>`;
  });
  content.innerHTML = html;
  openModal('m-audit-detail');
}

function renderFallos(){
  const tbody = document.getElementById('aud-fallos-tbody');
  if(!tbody) return;
  const filtroEst = document.getElementById('aud-filter-estado-fallo')?.value || '';
  const filtroOrigen = document.getElementById('aud-filter-origen')?.value || '';
  const filtroFecha = document.getElementById('aud-filter-fecha-fallo')?.value || '';
  const selFecha = document.getElementById('aud-filter-fecha-fallo');
  if(selFecha){
    const fechasUnicas = [...new Set((DB.fallos||[]).map(f=>f.fecha))].sort((a,b)=> new Date(b)-new Date(a));
    const prevValue = selFecha.value;
    selFecha.innerHTML = '<option value="">Todas las fechas</option>' +
      fechasUnicas.map(fc => `<option value="${fc}" ${fc===prevValue?'selected':''}>${fmtDate(fc)}</option>`).join('');
  }
  let data = [...(DB.fallos || [])].sort((a,b) => new Date(b.fecha) - new Date(a.fecha));
  if(filtroEst) data = data.filter(f => f.estado === filtroEst);
  if(filtroOrigen) data = data.filter(f => f.origen === filtroOrigen);
  if(filtroFecha) data = data.filter(f => f.fecha === filtroFecha);
  if(!data.length){
    tbody.innerHTML = '<tr><td colspan="8"><div class="empty-state"><i class="ti ti-check"></i>Sin fallos en este filtro</div></td></tr>';
    return;
  }
  let html = '';
  let fechaActual = null;
  let contadorGlobal = 0;
  data.forEach(f => {
    if(f.fecha !== fechaActual){
      fechaActual = f.fecha;
      const cantidadDia = data.filter(x=>x.fecha===fechaActual).length;
      html += `<tr style="background:var(--surface2)">
        <td colspan="8" style="padding:8px 10px;font-weight:700;color:var(--text2);font-size:12.5px">
          <i class="ti ti-calendar-event" style="color:var(--purple)"></i> ${fmtDate(fechaActual)} — ${cantidadDia} fallo${cantidadDia!==1?'s':''}
        </td>
      </tr>`;
    }
    contadorGlobal++;
    const estBadge = f.estado==='Pendiente' ? 'badge-danger' : f.estado==='En proceso' ? 'badge-warn' : 'badge-ok';
    const origBadge = f.origen === 'checklist' ? '<span class="fallo-source-badge fallo-source-checklist">Checklist</span>' :
      f.origen === 'historico' ? '<span class="fallo-source-badge fallo-source-historico">Histórico</span>' :
      '<span class="fallo-source-badge fallo-source-manual">Manual</span>';
    html += `<tr>
      <td style="color:var(--text3);font-size:12px">${contadorGlobal}</td>
      <td>${fmtDate(f.fecha)}</td>
      <td><span class="tag">${f.categoria || 'General'}</span></td>
      <td style="font-size:12px;max-width:300px">${f.desc}${f.obsSolucion ? `<div style="margin-top:4px;color:var(--green);font-size:11px;display:flex;align-items:center;gap:6px"><i class="ti ti-check"></i><span>${f.obsSolucion}</span><button class="btn btn-icon btn-sm" style="padding:1px 4px" onclick="borrarObsSolucion('${f.id}')" title="Borrar observación"><i class="ti ti-x" style="font-size:11px"></i></button></div>` : ''}</td>
      <td style="text-align:center;font-weight:700;color:var(--red)">${f.puntos || 0}</td>
      <td>${origBadge}</td>
      <td>
        <select onchange="cambiarEstadoFallo('${f.id}',this.value)" style="font-size:11px;padding:3px 6px;border:1px solid var(--border);border-radius:4px;background:var(--surface)">
          ${['Pendiente','En proceso','Subsanado'].map(e=>`<option ${e===f.estado?'selected':''}>${e}</option>`).join('')}
        </select>
      </td>
      <td style="display:flex;gap:4px">
        <button class="btn btn-icon btn-sm" onclick="editarFallo('${f.id}')" title="Editar"><i class="ti ti-edit"></i></button>
        ${f.origen !== 'historico' ? `<button class="btn btn-icon btn-sm btn-danger" onclick="delFallo('${f.id}')" title="Eliminar"><i class="ti ti-trash"></i></button>` : ''}
      </td>
    </tr>`;
  });
  tbody.innerHTML = html;
}

function cambiarEstadoFallo(id, estado){
  const f = DB.fallos.find(f => f.id == id);
  if(f){
    f.estado = estado;
    if(estado === 'Subsanado' && !f.obsSolucion){
      const obs = prompt('Describe brevemente cómo se subsanó el fallo:');
      if(obs) f.obsSolucion = obs;
    }
    saveDB();
    renderFallos();
    renderDash();
  }
}

function borrarObsSolucion(id){
  const f = DB.fallos.find(f => f.id == id);
  if(!f) return;
  if(!confirm('¿Borrar la observación de solución?')) return;
  f.obsSolucion = '';
  saveDB();
  renderFallos();
}

function editarFallo(id){
  const f = DB.fallos.find(f => f.id == id);
  if(!f) return;
  document.getElementById('fallo-edit-id').value = id;
  document.getElementById('fallo-categoria').value = f.categoria || 'General';
  document.getElementById('fallo-fecha').value = f.fecha;
  document.getElementById('fallo-desc').value = f.desc;
  document.getElementById('fallo-puntos').value = f.puntos || 0;
  document.getElementById('fallo-limite').value = f.limite || '';
  document.getElementById('fallo-estado').value = f.estado;
  document.getElementById('fallo-obs-solucion').value = f.obsSolucion || '';
  openModal('m-fallo');
}

function saveFallo(){
  const desc = document.getElementById('fallo-desc').value.trim();
  if(!desc){ alert('Ingresa la descripción.'); return; }
  const editId = document.getElementById('fallo-edit-id').value;
  const obj = {
    categoria: document.getElementById('fallo-categoria').value,
    fecha: document.getElementById('fallo-fecha').value || today(),
    desc,
    puntos: parseInt(document.getElementById('fallo-puntos').value) || 0,
    limite: document.getElementById('fallo-limite').value,
    estado: document.getElementById('fallo-estado').value,
    obsSolucion: document.getElementById('fallo-obs-solucion').value.trim(),
    origen: 'manual',
    registradoPor: currentUser
  };
  if(editId){
    const f = DB.fallos.find(f => f.id == editId);
    if(f) Object.assign(f, obj);
  } else {
    DB.fallos.push({ id: 'fallo-manual-' + Date.now(), ...obj });
  }
  saveDB();
  closeModal('m-fallo');
  document.getElementById('fallo-edit-id').value = '';
  ['fallo-desc','fallo-puntos','fallo-limite','fallo-obs-solucion'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('fallo-fecha').value = '';
  renderFallos();
  renderDash();
  toast('Fallo guardado','ok');
}

function delFallo(id){
  if(!confirm('¿Eliminar este fallo?')) return;
  DB.fallos = DB.fallos.filter(f => f.id != id);
  saveDB();
  renderFallos();
  renderDash();
}

function switchMainAudTab(idx){
  [0,1,2].forEach(i => {
    const tab = document.getElementById('main-aud-tab-'+i);
    const panel = document.getElementById('main-aud-panel-'+i);
    if(tab) tab.classList.toggle('active', i===idx);
    if(panel) panel.style.display = i===idx ? '' : 'none';
  });
  if(idx===1) renderAuditHistory();
  if(idx===2) renderFallos();
}