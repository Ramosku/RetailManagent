// ── UTILS ────────────────────────────────────────────
function uid(type){ const id=DB.nextId[type]||1; DB.nextId[type]=id+1; saveDB(); return id; }
function fmtDate(iso){ if(!iso) return '—'; const [y,m,d]=iso.split('-'); return `${d}/${m}/${y}`; }
function today(){ return new Date().toISOString().split('T')[0]; }
function daysLeft(iso){
  if(!iso) return null;
  const now=new Date(); now.setHours(0,0,0,0);
  const t=new Date(iso+'T00:00:00'); return Math.round((t-now)/(1000*60*60*24));
}
function vencBadge(days){
  if(days===null) return '<span class="badge badge-gray">Sin fecha</span>';
  if(days<0) return `<span class="badge badge-danger">Vencido hace ${Math.abs(days)}d</span>`;
  if(days===0) return `<span class="badge badge-danger">Vence HOY</span>`;
  if(days<=3) return `<span class="badge badge-danger">Crítico — ${days}d</span>`;
  if(days<=7) return `<span class="badge badge-warn">${days} días</span>`;
  return `<span class="badge badge-ok">Vigente — ${days}d</span>`;
}
function initials(n){ const p=n.trim().split(' '); return (p[0][0]+(p[1]?p[1][0]:'')).toUpperCase(); }
const avatarColors=[['#EBF2FE','#1A6FD8'],['#FEE9E8','#C0392B'],['#E4F5EE','#1A9E5F'],['#FEF3E2','#C47A10'],['#F0EAFA','#6A3DBB'],['#E8F8F5','#148F77'],['#FDF2F8','#A04090']];

function populateSelects(){
  const names = DB.personal.map(p=>p.nombre);
  ['inc-resp','asist-colab','eval-colab','asist-filter-user'].forEach(id=>{
    const el=document.getElementById(id); if(!el) return;
    const isFilter=id==='asist-filter-user';
    el.innerHTML = isFilter?'<option value="">Todos</option>':'<option value="">— Selecciona —</option>';
    names.forEach(n=>{ const o=document.createElement('option'); o.value=n; o.textContent=n; el.appendChild(o); });
  });
}

function toast(msg,type='ok'){
  const t=document.createElement('div');
  t.className=`alert alert-${type}`;
  t.style.cssText='position:fixed;top:1rem;right:1rem;z-index:999;min-width:240px;box-shadow:var(--shadow-md)';
  t.innerHTML=`<i class="ti ti-${type==='ok'?'check':'alert-circle'}"></i>${msg}`;
  document.body.appendChild(t); setTimeout(()=>t.remove(),2800);
}

function openModal(id){ document.getElementById(id).classList.add('open'); }
function closeModal(id){ document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-bg').forEach(m=>m.addEventListener('click',e=>{ if(e.target===m) m.classList.remove('open'); }));