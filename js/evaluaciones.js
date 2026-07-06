const EVAL_PREGUNTAS=['¿Qué es el SEHMASS?','¿Qué es el PACMASS?','¿Qué es el BOI?','¿Qué es el LLOP?','¿Qué es el SAC?','¿Qué son las 5S?','¿Qué es el Método PEPS?','¿Qué es el IR3C?'];
let evalScores={};

function buildEvalPreguntas(){
  const container=document.getElementById('eval-preguntas');
  evalScores={};
  container.innerHTML=EVAL_PREGUNTAS.map((q,i)=>`
    <div style="padding:10px 0;border-bottom:1px solid var(--border)">
      <p style="font-size:12px;font-weight:600;color:var(--text2);margin-bottom:7px">${i+1}. ${q}</p>
      <div style="display:flex;gap:5px;align-items:center" id="eq-${i}">
        <button type="button" class="btn btn-sm" style="min-width:38px;border-radius:8px" onclick="setEvalScore(${i},0,this)">0</button>
        <button type="button" class="btn btn-sm" style="min-width:38px;border-radius:8px" onclick="setEvalScore(${i},1,this)">1</button>
        <button type="button" class="btn btn-sm" style="min-width:38px;border-radius:8px" onclick="setEvalScore(${i},2,this)">2</button>
      </div>
    </div>`).join('');
}

function calcEvalEscalado(){
  const raw=Object.values(evalScores).reduce((a,b)=>a+b,0);
  return Math.round(raw*20/(EVAL_PREGUNTAS.length*2));
}

function setEvalScore(q,val,el){
  evalScores[q]=val;
  document.querySelectorAll(`#eq-${q} button`).forEach(b=>{b.style.background='';b.style.color='';});
  el.style.background=val===2?'var(--green)':val===1?'var(--blue)':'var(--red)';
  el.style.color='#fff';
  const escalado=calcEvalEscalado();
  document.getElementById('eval-total').textContent=`${escalado} / 20`;
}

function renderEvaluaciones(){
  const tbody=document.getElementById('eval-tbody');
  const data=[...DB.evaluaciones].sort((a,b)=>b.id-a.id);
  if(!data.length){ tbody.innerHTML='<tr><td colspan="8"><div class="empty-state"><i class="ti ti-clipboard-off"></i>Sin evaluaciones</div></td></tr>'; return; }
  tbody.innerHTML=data.map(e=>{
    const nivel=e.puntaje>=18?'badge-ok':e.puntaje>=14?'badge-blue':e.puntaje>=10?'badge-warn':'badge-danger';
    const nivelTxt=e.puntaje>=18?'Excelente':e.puntaje>=14?'Bueno':e.puntaje>=10?'Regular':'Insuficiente';
    return `<tr>
      <td><strong>${e.colab}</strong></td><td>${fmtDate(e.fecha)}</td><td>${e.periodo}</td>
      <td style="text-align:center"><strong>${e.puntaje}/20</strong></td>
      <td><span class="badge ${nivel}">${nivelTxt}</span></td>
      <td style="font-size:12px">${e.obs||'—'}</td>
      <td style="font-size:12px;color:var(--text2)">${e.evaluador}</td>
      <td><button class="btn btn-icon btn-sm btn-danger" onclick="delEval(${e.id})"><i class="ti ti-trash"></i></button></td>
    </tr>`;
  }).join('');
}

function saveEval(){
  const colab=document.getElementById('eval-colab').value;
  if(!colab){ alert('Selecciona colaborador.'); return; }
  const periodoFecha=document.getElementById('eval-periodo').value;
  if(!periodoFecha){ alert('Selecciona la fecha de la evaluación.'); return; }
  DB.evaluaciones.push({id:uid('eval'), colab, fecha:periodoFecha, periodo:fmtDate(periodoFecha), puntaje:calcEvalEscalado(), obs:document.getElementById('eval-obs').value.trim(), evaluador:currentUser});
  saveDB(); closeModal('m-eval');
  evalScores={}; buildEvalPreguntas();
  document.getElementById('eval-obs').value='';
  document.getElementById('eval-periodo').value='';
  document.getElementById('eval-total').textContent='0 / 20';
  renderEvaluaciones();
}

function delEval(id){
  if(!confirm('¿Eliminar?')) return;
  DB.evaluaciones=DB.evaluaciones.filter(x=>x.id!==id);
  saveDB(); renderEvaluaciones();
}