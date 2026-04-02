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

const HEIGHTS = [
  { id: '6',  name: 'Slim',    inches: 6 },
  { id: '8',  name: 'Low',     inches: 8 },
  { id: '10', name: 'Classic', inches: 10 },
  { id: '12', name: 'Plush',   inches: 12 },
  { id: '14', name: 'Tall',    inches: 14 },
  { id: '16', name: 'Ultra',   inches: 16 },
];

const DEFAULT_STATE = {
  mode: 'external',
  section: 'size',
  size: 'king',
  height: '10',
  sizeQuery: '',
  heightQuery: '',
};

// Uniform scale: all rects on the same px-per-inch ratio so sizes are comparable
// Largest dimension is Cal King 84" tall → maps to RECT_MAX_H px
const PX_PER_INCH = 72 / 84; // ~0.857 px/inch
const HEIGHT_PX_PER_INCH = 64 / 16;


// ── State ────────────────────────────────────────────────

let state = { ...DEFAULT_STATE };
let toastTimeout = null;


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

function syncSizeSearchInput() {
  const input = document.getElementById('sizeSearch');
  if (input) input.value = state.sizeQuery;
}

function initHeightSearch() {
  const input = document.getElementById('heightSearch');
  if (!input) return;
  input.addEventListener('input', () => {
    state.heightQuery = input.value;
    renderHeightGrid();
  });
}

function syncHeightSearchInput() {
  const input = document.getElementById('heightSearch');
  if (input) input.value = state.heightQuery;
}

function heightRect(inches) {
  return {
    w: 42,
    h: Math.max(18, Math.round(inches * HEIGHT_PX_PER_INCH)),
  };
}

function renderHeightGrid() {
  const grid = document.getElementById('heightGrid');
  if (!grid) return;

  const q = (state.heightQuery || '').toLowerCase().trim();
  const visible = q
    ? HEIGHTS.filter(height => {
        const matchesName = height.name.toLowerCase().includes(q);
        const matchesValue = String(height.inches).includes(q);
        const matchesProfile = `${height.inches}"`.includes(q);
        return matchesName || matchesValue || matchesProfile;
      })
    : HEIGHTS;

  if (!visible.length) {
    grid.innerHTML = `<p class="size-grid-empty">No heights match "${q}"</p>`;
    return;
  }

  grid.innerHTML = visible.map(height => {
    const rect = heightRect(height.inches);
    const isActive = height.id === state.height;

    return `
      <button
        class="height-card${isActive ? ' is-active' : ''}"
        data-height="${height.id}"
        aria-pressed="${isActive}"
        aria-label="${height.name}, ${height.inches} inches high"
      >
        <div class="height-card-visual">
          <div class="height-card-stack">
            <div class="height-card-top"></div>
            <div class="height-card-rect" style="width:${rect.w}px; height:${rect.h}px;"></div>
          </div>
        </div>
        <div class="height-card-label">
          <span class="height-card-name">${height.name}</span>
          <span class="height-card-dims">${height.inches}"</span>
        </div>
      </button>
    `;
  }).join('');

  grid.querySelectorAll('.height-card').forEach(card => {
    card.addEventListener('click', () => {
      state.height = card.dataset.height;
      renderHeightGrid();
      updateViewportLabel();
      if (window.viewportSetHeight) window.viewportSetHeight(Number(state.height));
    });
  });
}

function updateViewportLabel() {
  const label = document.getElementById('viewportLabel');
  if (!label) return;
  const size = SIZES.find(s => s.id === state.size);
  const height = HEIGHTS.find(option => option.id === state.height);
  if (size && height) label.textContent = `${size.name} · ${height.inches}" Profile`;
}

function syncModeButtons() {
  document.querySelectorAll('.mode-btn').forEach(button => {
    const isActive = button.dataset.mode === state.mode;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function showToast(message) {
  const toast = document.getElementById('appToast');
  if (!toast) return;

  toast.textContent = message;
  toast.hidden = false;

  if (toastTimeout) window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    toast.hidden = true;
  }, 2400);
}

function getProjectPayload() {
  const nameInput = document.querySelector('.mattress-name');

  return {
    name: nameInput ? nameInput.value.trim() || 'Untitled Mattress' : 'Untitled Mattress',
    savedAt: new Date().toISOString(),
    state: { ...state },
  };
}

function saveProject() {
  const payload = getProjectPayload();
  window.localStorage.setItem('mattressBuilder.currentProject', JSON.stringify(payload));
  showToast(`Saved ${payload.name}`);
}

function saveProjectAsNew() {
  const payload = getProjectPayload();
  const key = `mattressBuilder.project.${Date.now()}`;
  window.localStorage.setItem(key, JSON.stringify(payload));
  showToast(`Saved new project: ${payload.name}`);
}

function quitProject() {
  state = { ...DEFAULT_STATE };
  syncModeButtons();
  syncSizeSearchInput();
  syncHeightSearchInput();
  setMode(state.mode);
  renderSizeGrid();
  renderHeightGrid();
  updateViewportLabel();
  if (window.viewportSetSize) window.viewportSetSize(state.size);
  if (window.viewportSetHeight) window.viewportSetHeight(Number(state.height));
  showToast('Project reset to defaults');
}

function downloadPdf() {
  const payload = getProjectPayload();
  const size = SIZES.find(option => option.id === state.size);
  const height = HEIGHTS.find(option => option.id === state.height);
  const summaryWindow = window.open('', '_blank', 'width=900,height=700');

  if (!summaryWindow) {
    showToast('Allow pop-ups to download the project summary');
    return;
  }

  const safeName = payload.name.replace(/[<>]/g, '');
  summaryWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${safeName} Summary</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #141414; }
        h1 { margin: 0 0 8px; font-size: 28px; }
        p { margin: 0 0 16px; color: #444; }
        .card { border: 1px solid #ddd; border-radius: 12px; padding: 24px; margin-top: 24px; }
        .row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; }
        .row:last-child { border-bottom: 0; }
        .label { color: #666; }
      </style>
    </head>
    <body>
      <h1>${safeName}</h1>
      <p>Generated from Mattress Builder on ${new Date().toLocaleString()}</p>
      <div class="card">
        <div class="row"><span class="label">Mode</span><strong>${state.mode}</strong></div>
        <div class="row"><span class="label">Size</span><strong>${size ? size.name : '-'}</strong></div>
        <div class="row"><span class="label">Dimensions</span><strong>${size ? `${size.w}" × ${size.h}"` : '-'}</strong></div>
        <div class="row"><span class="label">Height</span><strong>${height ? `${height.inches}"` : '-'}</strong></div>
      </div>
    </body>
    </html>
  `);
  summaryWindow.document.close();
  summaryWindow.focus();
  summaryWindow.print();
  showToast('Opened project summary for PDF download');
}

function handleFileAction(action) {
  if (action === 'save') saveProject();
  if (action === 'save-as-new') saveProjectAsNew();
  if (action === 'quit') quitProject();
  if (action === 'download-pdf') downloadPdf();
}

function openFileMenu() {
  const button = document.getElementById('fileMenuBtn');
  const menu = document.getElementById('fileMenu');
  if (!button || !menu) return;

  menu.hidden = false;
  button.setAttribute('aria-expanded', 'true');
}

function closeFileMenu({ focusButton = false } = {}) {
  const button = document.getElementById('fileMenuBtn');
  const menu = document.getElementById('fileMenu');
  if (!button || !menu) return;

  menu.hidden = true;
  button.setAttribute('aria-expanded', 'false');

  if (focusButton) button.focus();
}

function isFileMenuOpen() {
  const menu = document.getElementById('fileMenu');
  return Boolean(menu && !menu.hidden);
}

function initFileMenu() {
  const button = document.getElementById('fileMenuBtn');
  const menu = document.getElementById('fileMenu');
  if (!button || !menu) return;

  button.addEventListener('click', () => {
    if (isFileMenuOpen()) {
      closeFileMenu();
    } else {
      openFileMenu();
    }
  });

  document.querySelectorAll('.file-menu__item').forEach(item => {
    item.addEventListener('click', () => {
      handleFileAction(item.dataset.fileAction);
      closeFileMenu();
    });
  });

  document.addEventListener('click', event => {
    const withinMenu = event.target.closest('.file-menu');
    if (!withinMenu) closeFileMenu();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && isFileMenuOpen()) {
      closeFileMenu({ focusButton: true });
    }
  });
}


// ── Navigation ───────────────────────────────────────────

function setSection(section) {
  state.section = section;

  document.querySelectorAll('.nav-item').forEach(item => {
    const isActive = item.dataset.section === section;
    item.classList.toggle('is-active', isActive);

    if (isActive) {
      item.setAttribute('aria-current', 'page');
    } else {
      item.removeAttribute('aria-current');
    }
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
      state.mode = btn.dataset.mode;
      syncModeButtons();
      setMode(btn.dataset.mode);
    });
  });
}


// ── Init ─────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderSizeGrid();
  renderHeightGrid();
  syncSizeSearchInput();
  syncHeightSearchInput();
  syncModeButtons();
  initSizeSearch();
  initHeightSearch();
  initFileMenu();
  initNavigation();
  initModeToggle();
  updateViewportLabel();
});
