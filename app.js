/* ─────────────────────────────────────────────────────────
   Mattress Builder — app.js
   Screen 1: App shell navigation + Size panel
   ───────────────────────────────────────────────────────── */


// ── Data ────────────────────────────────────────────────

const SIZES = [
  { id: 'king',         name: 'King',         w: 76, h: 80 },
  { id: 'queen',        name: 'Queen',        w: 60, h: 80 },
  { id: 'twin',         name: 'Twin',         w: 38, h: 75 },
  { id: 'twin-xl',      name: 'Twin XL',      w: 38, h: 80 },
  { id: 'full',         name: 'Full Double',  w: 54, h: 75 },
  { id: 'crib',         name: 'Crib',         w: 28, h: 52 },
  { id: 'cal-king',     name: 'Cal King',     w: 72, h: 84 },
  { id: 'small-single', name: 'Small Single', w: 30, h: 75 },
  { id: 'small-double', name: 'Small Double', w: 48, h: 75 },
];

// Uniform scale: all rects on the same px-per-inch ratio so sizes are comparable
// Largest dimension is Cal King 84" tall → maps to RECT_MAX_H px
const PX_PER_INCH = 72 / 84; // ~0.857 px/inch


// ── State ────────────────────────────────────────────────

let state = {
  mode:    'external',
  section: 'size',
  size:    'king',
  sizeQuery: '',
};


// ── Size panel ───────────────────────────────────────────

function sizeRect(w, h) {
  return {
    w: Math.round(w * PX_PER_INCH),
    h: Math.round(h * PX_PER_INCH),
  };
}

function renderSizeGrid(query) {
  const grid = document.getElementById('sizeGrid');
  if (!grid) return;

  const q = (query || state.sizeQuery || '').toLowerCase().trim();
  const visible = q
    ? SIZES.filter(s => s.name.toLowerCase().includes(q))
    : SIZES;

  if (!visible.length) {
    grid.innerHTML = `<p class="size-grid-empty">No sizes match "${q}"</p>`;
    return;
  }

  grid.innerHTML = visible.map(size => {
    const r = sizeRect(size.w, size.h);
    const isActive = size.id === state.size;

    return `
      <button
        class="size-card${isActive ? ' is-active' : ''}"
        data-size="${size.id}"
        aria-pressed="${isActive}"
        aria-label="${size.name}, ${size.w} by ${size.h} inches"
      >
        <div class="size-card-visual">
          <div class="size-card-rect" style="width:${r.w}px; height:${r.h}px;"></div>
        </div>
        <div class="size-card-label">
          <span class="size-card-name">${size.name}</span>
          <span class="size-card-dims">${size.w}" × ${size.h}"</span>
        </div>
      </button>
    `;
  }).join('');

  grid.querySelectorAll('.size-card').forEach(card => {
    card.addEventListener('click', () => {
      state.size = card.dataset.size;
      renderSizeGrid();
      updateViewportLabel();
      if (window.viewportSetSize) window.viewportSetSize(state.size);
    });
  });
}

function initSizeSearch() {
  const input = document.getElementById('sizeSearch');
  if (!input) return;
  input.addEventListener('input', () => {
    state.sizeQuery = input.value;
    renderSizeGrid();
  });
}

function updateViewportLabel() {
  const label = document.getElementById('viewportLabel');
  if (!label) return;
  const size = SIZES.find(s => s.id === state.size);
  if (size) label.textContent = `${size.name} · Smooth Bottom`;
}


// ── Navigation ───────────────────────────────────────────

function setSection(section) {
  state.section = section;

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('is-active', item.dataset.section === section);
  });

  document.querySelectorAll('.panel').forEach(panel => {
    panel.hidden = (panel.id !== `panel-${section}`);
  });
}

function initNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => setSection(item.dataset.section));
  });
}


// ── Mode toggle ──────────────────────────────────────────

function setMode(mode) {
  state.mode = mode;

  const navExternal = document.getElementById('navExternal');
  const navInternal = document.getElementById('navInternal');

  if (mode === 'external') {
    navExternal.classList.remove('nav-group--hidden');
    navInternal.classList.add('nav-group--hidden');
    setSection('size');
  } else {
    navExternal.classList.add('nav-group--hidden');
    navInternal.classList.remove('nav-group--hidden');
    setSection('layers');
  }
}

function initModeToggle() {
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.mode === state.mode) return;
      document.querySelectorAll('.mode-btn').forEach(b => {
        b.classList.toggle('is-active', b.dataset.mode === btn.dataset.mode);
      });
      setMode(btn.dataset.mode);
    });
  });
}


// ── Init ─────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderSizeGrid();
  initSizeSearch();
  initNavigation();
  initModeToggle();
  updateViewportLabel();
});
