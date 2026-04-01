// ── DATA ─────────────────────────────────────────────────
const SIZES = [
  { id:'king',      name:'King',          dims:'76" × 80"', w:76, d:80 },
  { id:'queen',     name:'Queen',         dims:'60" × 80"', w:60, d:80 },
  { id:'twin',      name:'Twin',          dims:'38" × 75"', w:38, d:75 },
  { id:'twin-xl',   name:'Twin XL',       dims:'38" × 80"', w:38, d:80 },
  { id:'full',      name:'Full / Double', dims:'54" × 75"', w:54, d:75 },
  { id:'cal-king',  name:'Cal King',      dims:'72" × 84"', w:72, d:84 },
  { id:'sm-double', name:'Small Double',  dims:'48" × 75"', w:48, d:75 },
  { id:'full-xl',   name:'Full XL',       dims:'54" × 80"', w:54, d:80 },
];

let selected = 'king';
let q = '';

// ── RENDER GRID ─────────────────────────────────────────
function render() {
  const list = SIZES.filter(s =>
    s.name.toLowerCase().includes(q.toLowerCase()) ||
    s.dims.includes(q)
  );

  document.getElementById('size-grid').innerHTML = list.map(s => {
    const MAX = 50;
    const scale = MAX / Math.max(s.w, s.d);
    const w = Math.round(s.w * scale);
    const h = Math.round(s.d * scale);
    const isSel = s.id === selected;

    return `
      <div class="size-card ${isSel ? 'selected' : ''}"
           data-id="${s.id}" data-name="${s.name}" data-dims="${s.dims}"
           onclick="pick(this)">
        <div class="size-diagram">
          <div class="mattress-rect" style="width:${w}px; height:${h}px;"></div>
        </div>
        <div class="size-info">
          <span class="size-name">${s.name}</span>
          <span class="size-dims">${s.dims}</span>
        </div>
      </div>`;
  }).join('');
}

// ── PICK SIZE ────────────────────────────────────────────
function pick(el) {
  selected = el.dataset.id;
  document.querySelectorAll('.size-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  void el.offsetWidth; // retrigger animation
  document.getElementById('vp-label').textContent =
    `${el.dataset.name}\u00a0\u2014\u00a0${el.dataset.dims}`;
}

function filterSizes(v) { q = v; render(); }

// ── SIDEBAR ──────────────────────────────────────────────
function setSection(el) {
  document.querySelectorAll('.s-icon').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
}

// ── MODE TOGGLE ──────────────────────────────────────────
function setMode(el) {
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

// ── DROPDOWN ─────────────────────────────────────────────
function toggle(id) {
  const menu = document.getElementById('menu-' + id);
  const btn  = document.getElementById('btn-' + id);
  const open = menu.classList.contains('visible');
  closeAll();
  if (!open) {
    menu.classList.add('visible');
    btn.classList.add('open');
  }
}

function closeAll() {
  document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('visible'));
  document.querySelectorAll('.topbar-pill').forEach(b => b.classList.remove('open'));
}

// ── INIT ─────────────────────────────────────────────────
render();
