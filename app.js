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

// ── Tape panel data ──────────────────────────────────────

const TAPE_STYLES = [
  { id: 'flat-sm',   name: '0.5" Wide Flat Tape',  css: 'tape-flat'       },
  { id: 'zipper-sm', name: '0.5" Zipper',          css: 'tape-piped'      },
  { id: 'flat-md',   name: '0.75" Wide Flat Tape', css: 'tape-flat'       },
  { id: 'zipper-md', name: '0.75" Zipper',         css: 'tape-piped'      },
  { id: 'flat-lg',   name: '1.0" Wide Flat Tape',  css: 'tape-ribbon'     },
  { id: 'oval',      name: 'Oval Tape',             css: 'tape-oval'       },
];

// ── Label panel data ─────────────────────────────────────

const LABEL_TYPES = [
  { id: 'sm-rect',  name: 'Small Rectangle Label', css: 'lbl-sm-rect' },
  { id: 'lg-rect',  name: 'Large Rectangle Label',  css: 'lbl-lg-rect' },
  { id: 'square',   name: 'Square Label',           css: 'lbl-square'  },
  { id: 'oval',     name: 'Oval Label',             css: 'lbl-oval'    },
  { id: 'tag',      name: 'Tag Label',              css: 'lbl-tag'     },
  { id: 'strip',    name: 'Strip Label',            css: 'lbl-strip'   },
];

// ── Handle panel data ────────────────────────────────────

const HANDLE_TYPES = [
  { id: 'horizontal', name: 'Horizontal Handle', css: 'hdl-horizontal' },
  { id: 'vertical',   name: 'Vertical Handle',   css: 'hdl-vertical'   },
  { id: 'loop',       name: 'Loop Handle',       css: 'hdl-loop'       },
  { id: 'strap',      name: 'Strap Handle',      css: 'hdl-strap'      },
  { id: 'ring',       name: 'Ring Handle',       css: 'hdl-ring'       },
  { id: 'cord',       name: 'Cord Handle',       css: 'hdl-cord'       },
];

// ── Style panel data ─────────────────────────────────────

const TEXTURES = [
  { id: 'diamond',  name: 'Diamond quilt 1234',  css: 'ptn-diamond',  exclusive: true },
  { id: 'xshape',   name: 'X shape, top quilt',  css: 'ptn-xshape',   exclusive: true },
  { id: 'buttons',  name: 'Buttons top quilt',   css: 'ptn-buttons',  exclusive: true },
  { id: 'rolling',  name: 'Rolling 6ft lem',     css: 'ptn-rolling',  exclusive: true },
  { id: 'polkadot', name: 'Polka Dot Quilt',     css: 'ptn-polkadot', exclusive: true },
  { id: 'scallop',  name: 'Scalloped Mesh',      css: 'ptn-scallop',  exclusive: true },
];

const MATERIALS = [
  { id: 'linen-cotton-2', name: 'Linen Cotton Blend 2', css: 'mat-linen-cotton-2', filter: 'cotton', exclusive: true },
  { id: 'linen-cotton-1', name: 'Linen Cotton Blend 1', css: 'mat-linen-cotton-1', filter: 'cotton', exclusive: true },
  { id: 'linen-cotton-3', name: 'Linen Cotton Blend 3', css: 'mat-linen-cotton-3', filter: 'cotton', exclusive: true },
  { id: 'fabric-391',     name: 'Fabric 391',           css: 'mat-fabric-warm',    filter: 'all',    exclusive: true },
  { id: 'fabric-371',     name: 'Fabric 371',           css: 'mat-fabric-cool',    filter: 'all',    exclusive: true },
  { id: 'fabric-321',     name: 'Fabric 321',           css: 'mat-fabric-neutral', filter: 'trim',   exclusive: true },
];

// ── Bottom panel data ────────────────────────────────────

const BOTTOM_TYPES = [
  'Smooth Bottom',
  'Box Pillow Bottom',
  'Euro Bottom',
  'Tight Bottom',
];

// ── Wall panel data ──────────────────────────────────────

const WALL_TYPES = [
  { id: 'quilted-panel',  name: 'Quilted Panel',   css: 'wt-quilted'   },
  { id: 'stretch-knit',   name: 'Stretch Knit',    css: 'wt-stretch'   },
  { id: 'damask-weave',   name: 'Damask Weave',    css: 'wt-damask'    },
  { id: 'woven-fabric',   name: 'Woven Fabric',    css: 'wt-woven'     },
  { id: 'smooth-panel',   name: 'Smooth Panel',    css: 'wt-smooth'    },
];

// ── Top panel data ───────────────────────────────────────

const TOP_TYPES = [
  { id: 'box-pillow',  name: 'Box Pillow Top',     css: 'tt-box-pillow'  },
  { id: 'euro-15',     name: 'Euro Top 1.5 Inch',  css: 'tt-euro-15'     },
  { id: 'euro-2',      name: 'Euro Top 2 Inch',    css: 'tt-euro-2'      },
  { id: 'euro-25',     name: 'Euro Top 2.5 Inch',  css: 'tt-euro-25'     },
  { id: 'euro-3',      name: 'Euro Top 3 Inch',    css: 'tt-euro-3'      },
  { id: 'euro-375',    name: 'Euro Top 3.75 Inch', css: 'tt-euro-375'    },
  { id: 'euro-4',      name: 'Euro Top 4 Inch',    css: 'tt-euro-4'      },
  { id: 'euro-575',    name: 'Euro Top 5.75 Inch', css: 'tt-euro-575'    },
];

const TUFT_TYPES = [
  'Classic Tuft',
  'Round Tuft',
  'Button Tuft',
  'Diamond Tuft',
];

const PATTERNS = [
  { id: 'diamond',  name: 'Diamond Quilt 1234', css: 'ptn-diamond'  },
  { id: 'xshape',   name: 'X Shape Top Quilt',  css: 'ptn-xshape'   },
  { id: 'buttons',  name: 'Buttons Top Quilt',  css: 'ptn-buttons'  },
  { id: 'rolling',  name: 'Rolling 6ft Lem',    css: 'ptn-rolling'  },
  { id: 'polkadot', name: 'Polka Dot Quilt',    css: 'ptn-polkadot' },
  { id: 'scallop',  name: 'Scalloped Mesh',     css: 'ptn-scallop'  },
];


const DEFAULT_STATE = {
  mode: 'external',
  section: 'size',
  size: 'king',
  height: '10',
  sizeQuery: '',
  heightQuery: '',
  // Top panel
  topAdded: false,
  topTypeIndex: 0,
  topPatternId: 'diamond',
  topGussetPatternId: 'buttons',
  topTuftsAdded: false,
  topTuftTypeIndex: 0,
  topPickerTarget: null,   // 'top' | 'gusset'
  topPatternQuery: '',
  topTypePickerQuery: '',
  topSectionCollapsed: false,
  topTuftCollapsed: false,
  // Tape panel
  tapeAdded: false,
  tapeStyleId: 'flat-sm',
  tapeCollapsed: false,
  tapeStyleQuery: '',
  // Label panel
  labelAdded: false,
  labelTypeId: 'sm-rect',
  labelTypeQuery: '',
  labelCollapsed: false,
  // Handle panel
  handleAdded: false,
  handleTypeId: 'horizontal',
  handleTypeQuery: '',
  handleCollapsed: false,
  // Style panel
  styleTab: 'textures',
  styleTextureId: 'diamond',
  styleTextureQuery: '',
  styleMaterialId: 'linen-cotton-1',
  styleMaterialFilter: 'all',
  styleMaterialQuery: '',
  styleColorH: 0,
  styleColorS: 0,
  styleColorV: 1,
  styleColorR: 255,
  styleColorG: 255,
  styleColorB: 255,
  styleColorHex: 'FFFFFF',
  styleColorSwatches: [],
  styleActiveSwatchIdx: -1,
  styleTextureMode: 'front',
  stylePropRotation: 0,
  // Bottom panel
  bottomAdded: false,
  bottomMirrored: false,
  bottomTypeIndex: 0,
  bottomPatternId: 'diamond',
  bottomPatternQuery: '',
  // Wall panel
  wallAdded: false,
  wallTypeIndex: 0,
  wallPatternId: 'xshape',
  wallBandPatternId: 'rolling',
  wallTuftsAdded: false,
  wallTuftTypeIndex: 0,
  wallPickerTarget: null,  // 'wall' | 'band'
  wallPatternQuery: '',
  wallTypePickerQuery: '',
  wallSectionCollapsed: false,
  wallTuftCollapsed: false,
};

// Uniform scale: all rects on the same px-per-inch ratio so sizes are comparable
// Largest dimension is Cal King 84" tall → maps to RECT_MAX_H px
const PX_PER_INCH = 72 / 84; // ~0.857 px/inch
const HEIGHT_PX_PER_INCH = 64 / 16;


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
  openTopView('topMainView');
  renderTopMain();
  openWallView('wallMainView');
  renderWallMain();
  openTapeView('tapeMainView');
  renderTapeMain();
  openLabelView('labelMainView');
  renderLabelMain();
  openHandleView('handleMainView');
  renderHandleMain();
  openBottomView('bottomMainView');
  renderBottomMain();
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


// ── Top panel ────────────────────────────────────────────

function openTopView(viewId) {
  ['topMainView', 'topTypePickerView', 'topPatternView'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.hidden = (id !== viewId);
  });
  const panel = document.getElementById('contextPanel');
  if (panel) panel.scrollTop = 0;
}

function renderTopMain() {
  const config      = document.getElementById('topConfig');
  const typeName    = document.getElementById('topTypeName');
  const typeThumb   = document.getElementById('topTypeThumb');
  const featureRow  = document.getElementById('topTuftsRow');
  const tuftConfig  = document.getElementById('topTuftConfig');
  const tuftName    = document.getElementById('tuftTypeName');
  const sectionBody = document.getElementById('topSectionBody');
  const chevron     = document.getElementById('topSectionChevron');

  const topType = TOP_TYPES[state.topTypeIndex];

  if (config)     config.hidden = !state.topAdded;
  if (typeName)   typeName.textContent = topType ? topType.name : '';
  if (typeThumb && topType) typeThumb.className = `top-type-thumb ${topType.css}`;

  // Accordion collapse
  const collapseBtn = document.getElementById('topCollapseBtn');
  if (sectionBody)  sectionBody.hidden = state.topSectionCollapsed;
  if (chevron)      chevron.textContent = state.topSectionCollapsed ? 'expand_more' : 'expand_less';
  if (collapseBtn)  collapseBtn.setAttribute('aria-expanded', String(!state.topSectionCollapsed));

  // Tufts
  if (featureRow) featureRow.hidden = state.topTuftsAdded;
  if (tuftConfig) tuftConfig.hidden = !state.topTuftsAdded;
  if (tuftName)   tuftName.textContent = TUFT_TYPES[state.topTuftTypeIndex];

  // Tuft collapse
  const tuftBody    = document.getElementById('topTuftBody');
  const tuftChevron = document.getElementById('topTuftCollapseIcon');
  if (tuftBody)    tuftBody.hidden    = state.topTuftCollapsed;
  if (tuftChevron) tuftChevron.textContent = state.topTuftCollapsed ? 'expand_more' : 'expand_less';

  syncTopPatternSwatches();
}

function syncTopPatternSwatches() {
  const topThumb    = document.getElementById('topPatternThumb');
  const gussetThumb = document.getElementById('topGussetThumb');
  const topPtn      = PATTERNS.find(p => p.id === state.topPatternId);
  const gussetPtn   = PATTERNS.find(p => p.id === state.topGussetPatternId);

  if (topThumb && topPtn)       topThumb.className    = `pattern-thumb ${topPtn.css}`;
  if (gussetThumb && gussetPtn) gussetThumb.className = `pattern-thumb ${gussetPtn.css}`;
}

function renderTopTypeGrid() {
  const grid = document.getElementById('topTypeGrid');
  if (!grid) return;

  const q = (state.topTypePickerQuery || '').toLowerCase();
  const visible = q
    ? TOP_TYPES.filter(t => t.name.toLowerCase().includes(q))
    : TOP_TYPES;

  if (!visible.length) {
    grid.innerHTML = `<p class="pattern-grid-empty">No types match</p>`;
    return;
  }

  grid.innerHTML = visible.map(t => `
    <button
      class="pattern-card${t.id === TOP_TYPES[state.topTypeIndex].id ? ' is-active' : ''}"
      data-type-index="${TOP_TYPES.indexOf(t)}"
      aria-pressed="${t.id === TOP_TYPES[state.topTypeIndex].id}"
      aria-label="${t.name}"
    >
      <span class="pattern-card__thumb ${t.css}"></span>
      <span class="pattern-card__name">${t.name}</span>
    </button>
  `).join('');

  grid.querySelectorAll('.pattern-card').forEach(card => {
    card.addEventListener('click', () => {
      state.topTypeIndex = Number(card.dataset.typeIndex);
      state.topAdded     = true;
      renderTopTypeGrid();
      openTopView('topMainView');
      renderTopMain();
    });
  });
}

function renderTopPatternGrid() {
  const grid = document.getElementById('topPatternGrid');
  if (!grid) return;

  const q = (state.topPatternQuery || '').toLowerCase();
  const visible = q
    ? PATTERNS.filter(p => p.name.toLowerCase().includes(q))
    : PATTERNS;

  const activeId = state.topPickerTarget === 'gusset'
    ? state.topGussetPatternId
    : state.topPatternId;

  if (!visible.length) {
    grid.innerHTML = `<p class="pattern-grid-empty">No patterns match</p>`;
    return;
  }

  grid.innerHTML = visible.map(p => `
    <button
      class="pattern-card${p.id === activeId ? ' is-active' : ''}"
      data-pattern="${p.id}"
      aria-pressed="${p.id === activeId}"
      aria-label="${p.name}"
    >
      <span class="pattern-card__thumb ${p.css}"></span>
      <span class="pattern-card__name">${p.name}</span>
    </button>
  `).join('');

  grid.querySelectorAll('.pattern-card').forEach(card => {
    card.addEventListener('click', () => {
      if (state.topPickerTarget === 'gusset') {
        state.topGussetPatternId = card.dataset.pattern;
      } else {
        state.topPatternId = card.dataset.pattern;
      }
      renderTopPatternGrid();
      syncTopPatternSwatches();
    });
  });
}

function updateSliderFill(rangeEl) {
  if (!rangeEl) return;
  const min = Number(rangeEl.min) || 0;
  const max = Number(rangeEl.max) || 100;
  const pct = ((Number(rangeEl.value) - min) / (max - min)) * 100;
  rangeEl.style.setProperty('--fill', `${pct.toFixed(1)}%`);
}

function initTopPanel() {
  const addBtn             = document.getElementById('topAddBtn');
  const typeNameBtn        = document.getElementById('topTypeNameBtn');
  const collapseBtn        = document.getElementById('topCollapseBtn');
  const patternBtn         = document.getElementById('topPatternBtn');
  const gussetBtn          = document.getElementById('topGussetBtn');
  const tuftsToggle        = document.getElementById('topTuftsToggle');
  const tuftTypePrev       = document.getElementById('tuftTypePrev');
  const tuftTypeNext       = document.getElementById('tuftTypeNext');
  const tuftDeleteBtn      = document.getElementById('topTuftDeleteBtn');
  const tuftCollapseBtn    = document.getElementById('topTuftCollapseBtn');
  const typePickerBackBtn  = document.getElementById('topTypePickerBackBtn');
  const typeSearch         = document.getElementById('topTypeSearch');
  const patternBackBtn     = document.getElementById('topPatternBackBtn');
  const patternSearch      = document.getElementById('patternSearch');
  const tuftDepth          = document.getElementById('tuftDepth');
  const tuftDepthVal       = document.getElementById('tuftDepthVal');

  // "Add Top" → open type picker (add or change)
  const openTypePicker = () => {
    state.topTypePickerQuery = '';
    openTopView('topTypePickerView');
    const searchEl = document.getElementById('topTypeSearch');
    if (searchEl) searchEl.value = '';
    renderTopTypeGrid();
  };

  if (addBtn)      addBtn.addEventListener('click', openTypePicker);
  // Type name in section header also opens picker (to change type)
  if (typeNameBtn) typeNameBtn.addEventListener('click', openTypePicker);

  // Separate collapse chevron → toggle section body only
  if (collapseBtn) {
    collapseBtn.addEventListener('click', () => {
      state.topSectionCollapsed = !state.topSectionCollapsed;
      renderTopMain();
    });
  }

  // Pattern swatch → open pattern picker
  if (patternBtn) {
    patternBtn.addEventListener('click', () => {
      state.topPickerTarget = 'top';
      state.topPatternQuery = '';
      openTopView('topPatternView');
      const searchEl = document.getElementById('patternSearch');
      if (searchEl) searchEl.value = '';
      renderTopPatternGrid();
    });
  }

  if (gussetBtn) {
    gussetBtn.addEventListener('click', () => {
      state.topPickerTarget = 'gusset';
      state.topPatternQuery = '';
      openTopView('topPatternView');
      const searchEl = document.getElementById('patternSearch');
      if (searchEl) searchEl.value = '';
      renderTopPatternGrid();
    });
  }

  // Add tufts
  if (tuftsToggle) {
    tuftsToggle.addEventListener('click', () => {
      state.topTuftsAdded   = true;
      state.topTuftCollapsed = false;
      renderTopMain();
    });
  }

  // Tuft type cycle
  if (tuftTypePrev) {
    tuftTypePrev.addEventListener('click', () => {
      state.topTuftTypeIndex = (state.topTuftTypeIndex - 1 + TUFT_TYPES.length) % TUFT_TYPES.length;
      renderTopMain();
    });
  }

  if (tuftTypeNext) {
    tuftTypeNext.addEventListener('click', () => {
      state.topTuftTypeIndex = (state.topTuftTypeIndex + 1) % TUFT_TYPES.length;
      renderTopMain();
    });
  }

  // Delete tuft
  if (tuftDeleteBtn) {
    tuftDeleteBtn.addEventListener('click', () => {
      state.topTuftsAdded   = false;
      state.topTuftCollapsed = false;
      renderTopMain();
    });
  }

  // Collapse tuft body
  if (tuftCollapseBtn) {
    tuftCollapseBtn.addEventListener('click', () => {
      state.topTuftCollapsed = !state.topTuftCollapsed;
      renderTopMain();
    });
  }

  // Type picker: back
  if (typePickerBackBtn) {
    typePickerBackBtn.addEventListener('click', () => {
      openTopView('topMainView');
    });
  }

  // Type picker: search
  if (typeSearch) {
    typeSearch.addEventListener('input', () => {
      state.topTypePickerQuery = typeSearch.value;
      renderTopTypeGrid();
    });
  }

  // Pattern picker: back
  if (patternBackBtn) {
    patternBackBtn.addEventListener('click', () => {
      state.topPickerTarget = null;
      openTopView('topMainView');
    });
  }

  // Pattern picker: search
  if (patternSearch) {
    patternSearch.addEventListener('input', () => {
      state.topPatternQuery = patternSearch.value;
      renderTopPatternGrid();
    });
  }

  // Comfort depth slider
  if (tuftDepth && tuftDepthVal) {
    tuftDepth.addEventListener('input', () => {
      tuftDepthVal.textContent = Number(tuftDepth.value).toFixed(1);
      updateSliderFill(tuftDepth);
    });
    updateSliderFill(tuftDepth);
  }

  renderTopMain();
}


// ── Wall panel ───────────────────────────────────────────

function openWallView(viewId) {
  ['wallMainView', 'wallTypePickerView', 'wallPatternView'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.hidden = (id !== viewId);
  });
  const panel = document.getElementById('contextPanel');
  if (panel) panel.scrollTop = 0;
}

function renderWallMain() {
  const config      = document.getElementById('wallConfig');
  const typeName    = document.getElementById('wallTypeName');
  const typeThumb   = document.getElementById('wallTypeThumb');
  const featureRow  = document.getElementById('wallTuftsRow');
  const tuftConfig  = document.getElementById('wallTuftConfig');
  const tuftName    = document.getElementById('wallTuftTypeName');
  const sectionBody = document.getElementById('wallSectionBody');
  const chevron     = document.getElementById('wallSectionChevron');

  const wallType = WALL_TYPES[state.wallTypeIndex];

  if (config)     config.hidden = !state.wallAdded;
  if (typeName)   typeName.textContent = wallType ? wallType.name : '';
  if (typeThumb && wallType) typeThumb.className = `wall-type-thumb ${wallType.css}`;

  // Accordion collapse
  const collapseBtn = document.getElementById('wallCollapseBtn');
  if (sectionBody)  sectionBody.hidden = state.wallSectionCollapsed;
  if (chevron)      chevron.textContent = state.wallSectionCollapsed ? 'expand_more' : 'expand_less';
  if (collapseBtn)  collapseBtn.setAttribute('aria-expanded', String(!state.wallSectionCollapsed));

  // Tufts
  if (featureRow) featureRow.hidden = state.wallTuftsAdded;
  if (tuftConfig) tuftConfig.hidden = !state.wallTuftsAdded;
  if (tuftName)   tuftName.textContent = TUFT_TYPES[state.wallTuftTypeIndex];

  // Tuft collapse
  const tuftBody    = document.getElementById('wallTuftBody');
  const tuftChevron = document.getElementById('wallTuftCollapseIcon');
  if (tuftBody)    tuftBody.hidden    = state.wallTuftCollapsed;
  if (tuftChevron) tuftChevron.textContent = state.wallTuftCollapsed ? 'expand_more' : 'expand_less';

  syncWallPatternSwatches();
}

function syncWallPatternSwatches() {
  const wallThumb = document.getElementById('wallPatternThumb');
  const bandThumb = document.getElementById('wallBandThumb');
  const wallPtn   = PATTERNS.find(p => p.id === state.wallPatternId);
  const bandPtn   = PATTERNS.find(p => p.id === state.wallBandPatternId);

  if (wallThumb && wallPtn) wallThumb.className = `pattern-thumb ${wallPtn.css}`;
  if (bandThumb && bandPtn) bandThumb.className = `pattern-thumb ${bandPtn.css}`;
}

function renderWallTypeGrid() {
  const grid = document.getElementById('wallTypeGrid');
  if (!grid) return;

  const q = (state.wallTypePickerQuery || '').toLowerCase();
  const visible = q
    ? WALL_TYPES.filter(t => t.name.toLowerCase().includes(q))
    : WALL_TYPES;

  if (!visible.length) {
    grid.innerHTML = `<p class="pattern-grid-empty">No types match</p>`;
    return;
  }

  grid.innerHTML = visible.map(t => `
    <button
      class="pattern-card${t.id === WALL_TYPES[state.wallTypeIndex].id ? ' is-active' : ''}"
      data-type-index="${WALL_TYPES.indexOf(t)}"
      aria-pressed="${t.id === WALL_TYPES[state.wallTypeIndex].id}"
      aria-label="${t.name}"
    >
      <span class="pattern-card__thumb ${t.css}"></span>
      <span class="pattern-card__name">${t.name}</span>
    </button>
  `).join('');

  grid.querySelectorAll('.pattern-card').forEach(card => {
    card.addEventListener('click', () => {
      state.wallTypeIndex = Number(card.dataset.typeIndex);
      state.wallAdded     = true;
      renderWallTypeGrid();
      openWallView('wallMainView');
      renderWallMain();
    });
  });
}

function renderWallPatternGrid() {
  const grid = document.getElementById('wallPatternGrid');
  if (!grid) return;

  const q = (state.wallPatternQuery || '').toLowerCase();
  const visible = q
    ? PATTERNS.filter(p => p.name.toLowerCase().includes(q))
    : PATTERNS;

  const activeId = state.wallPickerTarget === 'band'
    ? state.wallBandPatternId
    : state.wallPatternId;

  if (!visible.length) {
    grid.innerHTML = `<p class="pattern-grid-empty">No patterns match</p>`;
    return;
  }

  grid.innerHTML = visible.map(p => `
    <button
      class="pattern-card${p.id === activeId ? ' is-active' : ''}"
      data-pattern="${p.id}"
      aria-pressed="${p.id === activeId}"
      aria-label="${p.name}"
    >
      <span class="pattern-card__thumb ${p.css}"></span>
      <span class="pattern-card__name">${p.name}</span>
    </button>
  `).join('');

  grid.querySelectorAll('.pattern-card').forEach(card => {
    card.addEventListener('click', () => {
      if (state.wallPickerTarget === 'band') {
        state.wallBandPatternId = card.dataset.pattern;
      } else {
        state.wallPatternId = card.dataset.pattern;
      }
      renderWallPatternGrid();
      syncWallPatternSwatches();
    });
  });
}

function initWallPanel() {
  const addBtn             = document.getElementById('wallAddBtn');
  const typeNameBtn        = document.getElementById('wallTypeNameBtn');
  const collapseBtn        = document.getElementById('wallCollapseBtn');
  const patternBtn         = document.getElementById('wallPatternBtn');
  const bandBtn            = document.getElementById('wallBandBtn');
  const tuftsToggle        = document.getElementById('wallTuftsToggle');
  const tuftTypePrev       = document.getElementById('wallTuftTypePrev');
  const tuftTypeNext       = document.getElementById('wallTuftTypeNext');
  const tuftDeleteBtn      = document.getElementById('wallTuftDeleteBtn');
  const tuftCollapseBtn    = document.getElementById('wallTuftCollapseBtn');
  const typePickerBackBtn  = document.getElementById('wallTypePickerBackBtn');
  const typeSearch         = document.getElementById('wallTypeSearch');
  const patternBackBtn     = document.getElementById('wallPatternBackBtn');
  const patternSearch      = document.getElementById('wallPatternSearch');
  const tuftDepth          = document.getElementById('wallTuftDepth');
  const tuftDepthVal       = document.getElementById('wallTuftDepthVal');

  // "Add Wall" → open type picker (add or change)
  const openWallTypePicker = () => {
    state.wallTypePickerQuery = '';
    openWallView('wallTypePickerView');
    const searchEl = document.getElementById('wallTypeSearch');
    if (searchEl) searchEl.value = '';
    renderWallTypeGrid();
  };

  if (addBtn)      addBtn.addEventListener('click', openWallTypePicker);
  // Type name in section header also opens picker (to change type)
  if (typeNameBtn) typeNameBtn.addEventListener('click', openWallTypePicker);

  // Separate collapse chevron → toggle section body only
  if (collapseBtn) {
    collapseBtn.addEventListener('click', () => {
      state.wallSectionCollapsed = !state.wallSectionCollapsed;
      renderWallMain();
    });
  }

  // Pattern swatches
  if (patternBtn) {
    patternBtn.addEventListener('click', () => {
      state.wallPickerTarget = 'wall';
      state.wallPatternQuery = '';
      openWallView('wallPatternView');
      const searchEl = document.getElementById('wallPatternSearch');
      if (searchEl) searchEl.value = '';
      renderWallPatternGrid();
    });
  }

  if (bandBtn) {
    bandBtn.addEventListener('click', () => {
      state.wallPickerTarget = 'band';
      state.wallPatternQuery = '';
      openWallView('wallPatternView');
      const searchEl = document.getElementById('wallPatternSearch');
      if (searchEl) searchEl.value = '';
      renderWallPatternGrid();
    });
  }

  // Add tufts
  if (tuftsToggle) {
    tuftsToggle.addEventListener('click', () => {
      state.wallTuftsAdded    = true;
      state.wallTuftCollapsed = false;
      renderWallMain();
    });
  }

  // Tuft type cycle
  if (tuftTypePrev) {
    tuftTypePrev.addEventListener('click', () => {
      state.wallTuftTypeIndex = (state.wallTuftTypeIndex - 1 + TUFT_TYPES.length) % TUFT_TYPES.length;
      renderWallMain();
    });
  }

  if (tuftTypeNext) {
    tuftTypeNext.addEventListener('click', () => {
      state.wallTuftTypeIndex = (state.wallTuftTypeIndex + 1) % TUFT_TYPES.length;
      renderWallMain();
    });
  }

  // Delete tuft
  if (tuftDeleteBtn) {
    tuftDeleteBtn.addEventListener('click', () => {
      state.wallTuftsAdded    = false;
      state.wallTuftCollapsed = false;
      renderWallMain();
    });
  }

  // Collapse tuft body
  if (tuftCollapseBtn) {
    tuftCollapseBtn.addEventListener('click', () => {
      state.wallTuftCollapsed = !state.wallTuftCollapsed;
      renderWallMain();
    });
  }

  // Type picker: back
  if (typePickerBackBtn) {
    typePickerBackBtn.addEventListener('click', () => {
      openWallView('wallMainView');
    });
  }

  // Type picker: search
  if (typeSearch) {
    typeSearch.addEventListener('input', () => {
      state.wallTypePickerQuery = typeSearch.value;
      renderWallTypeGrid();
    });
  }

  // Pattern picker: back
  if (patternBackBtn) {
    patternBackBtn.addEventListener('click', () => {
      state.wallPickerTarget = null;
      openWallView('wallMainView');
    });
  }

  // Pattern picker: search
  if (patternSearch) {
    patternSearch.addEventListener('input', () => {
      state.wallPatternQuery = patternSearch.value;
      renderWallPatternGrid();
    });
  }

  // Comfort depth slider
  if (tuftDepth && tuftDepthVal) {
    tuftDepth.addEventListener('input', () => {
      tuftDepthVal.textContent = Number(tuftDepth.value).toFixed(1);
      updateSliderFill(tuftDepth);
    });
    updateSliderFill(tuftDepth);
  }

  renderWallMain();
}


// ── Tape panel ───────────────────────────────────────────

function openTapeView(viewId) {
  ['tapeMainView', 'tapePickerView'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.hidden = (id !== viewId);
  });
  const panel = document.getElementById('contextPanel');
  if (panel) panel.scrollTop = 0;
}

function syncTapeTypeThumb() {
  const thumb = document.getElementById('tapeTypeThumb');
  const nameEl = document.getElementById('tapeTypeName');
  const style = TAPE_STYLES.find(s => s.id === state.tapeStyleId);
  if (thumb && style) thumb.className = `type-thumb-sm ${style.css}`;
  if (nameEl && style) nameEl.textContent = style.name;
}

function renderTapeMain() {
  const config = document.getElementById('tapeConfig');
  const addBtn = document.getElementById('tapeAddBtn');
  if (config) config.hidden = !state.tapeAdded;
  if (addBtn) addBtn.textContent = state.tapeAdded ? 'Add Another' : 'Add Tape';
  syncTapeTypeThumb();
}

function renderTapeStyleGrid() {
  const grid = document.getElementById('tapeStyleGrid');
  if (!grid) return;

  const q = (state.tapeStyleQuery || '').toLowerCase();
  const visible = q
    ? TAPE_STYLES.filter(s => s.name.toLowerCase().includes(q))
    : TAPE_STYLES;

  if (!visible.length) {
    grid.innerHTML = `<p class="pattern-grid-empty">No styles match</p>`;
    return;
  }

  grid.innerHTML = visible.map(s => `
    <button
      class="pattern-card${s.id === state.tapeStyleId ? ' is-active' : ''}"
      data-style="${s.id}"
      aria-pressed="${s.id === state.tapeStyleId}"
      aria-label="${s.name}"
    >
      <span class="pattern-card__thumb ${s.css}"></span>
      <span class="pattern-card__name">${s.name}</span>
    </button>
  `).join('');

  grid.querySelectorAll('.pattern-card').forEach(card => {
    card.addEventListener('click', () => {
      state.tapeStyleId = card.dataset.style;
      renderTapeStyleGrid();
      syncTapeTypeThumb();
    });
  });
}

function initTapePanel() {
  const addBtn       = document.getElementById('tapeAddBtn');
  const typeNameBtn  = document.getElementById('tapeTypeNameBtn');
  const collapseBtn  = document.getElementById('tapeCollapseBtn');
  const sectionBody  = document.getElementById('tapeSectionBody');
  const chevron      = document.getElementById('tapeSectionChevron');
  const backBtn      = document.getElementById('tapePickerBackBtn');
  const searchEl     = document.getElementById('tapeSearch');
  const resetBtn     = document.getElementById('tapeResetScaleBtn');
  const posRange     = document.getElementById('tapePosition');
  const posVal       = document.getElementById('tapePositionVal');

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (!state.tapeAdded) {
        state.tapeAdded = true;
        renderTapeMain();
      } else {
        showToast('Tape already configured — use the style selector to change it');
      }
    });
  }

  if (typeNameBtn) {
    typeNameBtn.addEventListener('click', () => {
      state.tapeStyleQuery = '';
      openTapeView('tapePickerView');
      const s = document.getElementById('tapeSearch');
      if (s) s.value = '';
      renderTapeStyleGrid();
    });
  }

  if (collapseBtn && sectionBody && chevron) {
    collapseBtn.addEventListener('click', () => {
      state.tapeCollapsed = !state.tapeCollapsed;
      sectionBody.hidden = state.tapeCollapsed;
      chevron.textContent = state.tapeCollapsed ? 'expand_more' : 'expand_less';
      collapseBtn.setAttribute('aria-expanded', String(!state.tapeCollapsed));
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => openTapeView('tapeMainView'));
  }

  if (searchEl) {
    searchEl.addEventListener('input', () => {
      state.tapeStyleQuery = searchEl.value;
      renderTapeStyleGrid();
    });
  }

  if (posRange && posVal) {
    posRange.addEventListener('input', () => {
      posVal.textContent = Number(posRange.value).toFixed(1);
      updateSliderFill(posRange);
    });
    updateSliderFill(posRange);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      ['tapeScaleX', 'tapeScaleY', 'tapeScaleZ'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = 1;
      });
      showToast('Scale reset to 1 × 1 × 1');
    });
  }

  renderTapeMain();
}


// ── Label panel ──────────────────────────────────────────

function openLabelView(viewId) {
  ['labelMainView', 'labelPickerView'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.hidden = (id !== viewId);
  });
  const panel = document.getElementById('contextPanel');
  if (panel) panel.scrollTop = 0;
}

function syncLabelTypeThumb() {
  const thumb  = document.getElementById('labelTypeThumb');
  const nameEl = document.getElementById('labelTypeName');
  const sideEl = document.getElementById('labelSide');
  const type   = LABEL_TYPES.find(t => t.id === state.labelTypeId);
  const side   = sideEl ? sideEl.options[sideEl.selectedIndex].text : 'Front';
  if (thumb && type)  thumb.className   = `type-thumb-sm ${type.css}`;
  if (nameEl && type) nameEl.textContent = `${type.name} : ${side}`;
}

function renderLabelMain() {
  const config = document.getElementById('labelConfig');
  const addBtn = document.getElementById('labelAddBtn');
  if (config) config.hidden = !state.labelAdded;
  if (addBtn) addBtn.textContent = state.labelAdded ? 'Add Another' : 'Add Label';
  syncLabelTypeThumb();
}

function renderLabelTypeGrid() {
  const grid = document.getElementById('labelTypeGrid');
  if (!grid) return;

  const q = (state.labelTypeQuery || '').toLowerCase();
  const visible = q
    ? LABEL_TYPES.filter(t => t.name.toLowerCase().includes(q))
    : LABEL_TYPES;

  if (!visible.length) {
    grid.innerHTML = `<p class="pattern-grid-empty">No labels match</p>`;
    return;
  }

  grid.innerHTML = visible.map(t => `
    <button
      class="pattern-card${t.id === state.labelTypeId ? ' is-active' : ''}"
      data-type="${t.id}"
      aria-pressed="${t.id === state.labelTypeId}"
      aria-label="${t.name}"
    >
      <span class="pattern-card__thumb ${t.css}"></span>
      <span class="pattern-card__name">${t.name}</span>
    </button>
  `).join('');

  grid.querySelectorAll('.pattern-card').forEach(card => {
    card.addEventListener('click', () => {
      state.labelTypeId = card.dataset.type;
      renderLabelTypeGrid();
      syncLabelTypeThumb();
    });
  });
}

function initLabelPanel() {
  const addBtn      = document.getElementById('labelAddBtn');
  const typeNameBtn = document.getElementById('labelTypeNameBtn');
  const collapseBtn = document.getElementById('labelCollapseBtn');
  const sectionBody = document.getElementById('labelSectionBody');
  const chevron     = document.getElementById('labelSectionChevron');
  const backBtn     = document.getElementById('labelPickerBackBtn');
  const searchEl    = document.getElementById('labelSearch');
  const sideEl      = document.getElementById('labelSide');
  const sliders     = [
    { range: 'labelPosX', val: 'labelPosXVal', decimals: 2 },
    { range: 'labelPosY', val: 'labelPosYVal', decimals: 2 },
    { range: 'labelPosZ', val: 'labelPosZVal', decimals: 2 },
  ];

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (!state.labelAdded) {
        state.labelAdded = true;
        renderLabelMain();
      } else {
        showToast('Label already configured — use the type selector to change it');
      }
    });
  }

  if (typeNameBtn) {
    typeNameBtn.addEventListener('click', () => {
      state.labelTypeQuery = '';
      openLabelView('labelPickerView');
      const s = document.getElementById('labelSearch');
      if (s) s.value = '';
      renderLabelTypeGrid();
    });
  }

  if (collapseBtn && sectionBody && chevron) {
    collapseBtn.addEventListener('click', () => {
      state.labelCollapsed = !state.labelCollapsed;
      sectionBody.hidden   = state.labelCollapsed;
      chevron.textContent  = state.labelCollapsed ? 'expand_more' : 'expand_less';
      collapseBtn.setAttribute('aria-expanded', String(!state.labelCollapsed));
    });
  }

  if (sideEl) {
    sideEl.addEventListener('change', () => syncLabelTypeThumb());
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => openLabelView('labelMainView'));
  }

  if (searchEl) {
    searchEl.addEventListener('input', () => {
      state.labelTypeQuery = searchEl.value;
      renderLabelTypeGrid();
    });
  }

  sliders.forEach(({ range, val, decimals }) => {
    const rangeEl = document.getElementById(range);
    const valEl   = document.getElementById(val);
    if (rangeEl && valEl) {
      rangeEl.addEventListener('input', () => {
        valEl.textContent = Number(rangeEl.value).toFixed(decimals);
        updateSliderFill(rangeEl);
      });
      updateSliderFill(rangeEl);
    }
  });

  renderLabelMain();
}


// ── Handle panel ─────────────────────────────────────────

function openHandleView(viewId) {
  ['handleMainView', 'handlePickerView'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.hidden = (id !== viewId);
  });
  const panel = document.getElementById('contextPanel');
  if (panel) panel.scrollTop = 0;
}

function syncHandleTypeThumb() {
  const thumb  = document.getElementById('handleTypeThumb');
  const nameEl = document.getElementById('handleTypeName');
  const sideEl = document.getElementById('handleSide');
  const type   = HANDLE_TYPES.find(t => t.id === state.handleTypeId);
  const side   = sideEl ? sideEl.options[sideEl.selectedIndex].text : 'Front';
  if (thumb && type)  thumb.className   = `type-thumb-sm ${type.css}`;
  if (nameEl && type) nameEl.textContent = `${type.name} : ${side}`;
}

function renderHandleMain() {
  const config = document.getElementById('handleConfig');
  const addBtn = document.getElementById('handleAddBtn');
  if (config) config.hidden = !state.handleAdded;
  if (addBtn) addBtn.textContent = state.handleAdded ? 'Add Another' : 'Add Handle';
  syncHandleTypeThumb();
}

function renderHandleTypeGrid() {
  const grid = document.getElementById('handleTypeGrid');
  if (!grid) return;

  const q = (state.handleTypeQuery || '').toLowerCase();
  const visible = q
    ? HANDLE_TYPES.filter(t => t.name.toLowerCase().includes(q))
    : HANDLE_TYPES;

  if (!visible.length) {
    grid.innerHTML = `<p class="pattern-grid-empty">No handles match</p>`;
    return;
  }

  grid.innerHTML = visible.map(t => `
    <button
      class="pattern-card${t.id === state.handleTypeId ? ' is-active' : ''}"
      data-type="${t.id}"
      aria-pressed="${t.id === state.handleTypeId}"
      aria-label="${t.name}"
    >
      <span class="pattern-card__thumb ${t.css}"></span>
      <span class="pattern-card__name">${t.name}</span>
    </button>
  `).join('');

  grid.querySelectorAll('.pattern-card').forEach(card => {
    card.addEventListener('click', () => {
      state.handleTypeId = card.dataset.type;
      renderHandleTypeGrid();
      syncHandleTypeThumb();
    });
  });
}

function initHandlePanel() {
  const addBtn      = document.getElementById('handleAddBtn');
  const typeNameBtn = document.getElementById('handleTypeNameBtn');
  const collapseBtn = document.getElementById('handleCollapseBtn');
  const sectionBody = document.getElementById('handleSectionBody');
  const chevron     = document.getElementById('handleSectionChevron');
  const sideEl      = document.getElementById('handleSide');
  const backBtn     = document.getElementById('handlePickerBackBtn');
  const searchEl    = document.getElementById('handleSearch');
  const sliders     = [
    { range: 'handlePosX', val: 'handlePosXVal', decimals: 2 },
    { range: 'handlePosY', val: 'handlePosYVal', decimals: 2 },
    { range: 'handlePosZ', val: 'handlePosZVal', decimals: 2 },
  ];

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (!state.handleAdded) {
        state.handleAdded = true;
        renderHandleMain();
      } else {
        showToast('Handle already configured — use the type selector to change it');
      }
    });
  }

  if (typeNameBtn) {
    typeNameBtn.addEventListener('click', () => {
      state.handleTypeQuery = '';
      openHandleView('handlePickerView');
      const s = document.getElementById('handleSearch');
      if (s) s.value = '';
      renderHandleTypeGrid();
    });
  }

  if (collapseBtn && sectionBody && chevron) {
    collapseBtn.addEventListener('click', () => {
      state.handleCollapsed = !state.handleCollapsed;
      sectionBody.hidden    = state.handleCollapsed;
      chevron.textContent   = state.handleCollapsed ? 'expand_more' : 'expand_less';
      collapseBtn.setAttribute('aria-expanded', String(!state.handleCollapsed));
    });
  }

  if (sideEl) {
    sideEl.addEventListener('change', () => syncHandleTypeThumb());
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => openHandleView('handleMainView'));
  }

  if (searchEl) {
    searchEl.addEventListener('input', () => {
      state.handleTypeQuery = searchEl.value;
      renderHandleTypeGrid();
    });
  }

  sliders.forEach(({ range, val, decimals }) => {
    const rangeEl = document.getElementById(range);
    const valEl   = document.getElementById(val);
    if (rangeEl && valEl) {
      rangeEl.addEventListener('input', () => {
        valEl.textContent = Number(rangeEl.value).toFixed(decimals);
        updateSliderFill(rangeEl);
      });
      updateSliderFill(rangeEl);
    }
  });

  renderHandleMain();
}


// ── Bottom panel ─────────────────────────────────────────

function openBottomView(viewId) {
  ['bottomMainView', 'bottomPatternView'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.hidden = (id !== viewId);
  });
  const panel = document.getElementById('contextPanel');
  if (panel) panel.scrollTop = 0;
}

function renderBottomMain() {
  const config   = document.getElementById('bottomConfig');
  const addBtn   = document.getElementById('bottomAddBtn');
  const typeName = document.getElementById('bottomTypeName');

  if (config)   config.hidden      = !state.bottomAdded;
  if (addBtn)   addBtn.textContent = state.bottomAdded ? 'Add Another' : 'Add Bottom';
  if (typeName) typeName.textContent = BOTTOM_TYPES[state.bottomTypeIndex];

  syncBottomPatternSwatch();
}

function syncBottomPatternSwatch() {
  const thumb = document.getElementById('bottomPatternThumb');
  const ptn   = PATTERNS.find(p => p.id === state.bottomPatternId);
  if (thumb && ptn) thumb.className = `pattern-thumb ${ptn.css}`;
}

function renderBottomPatternGrid() {
  const grid = document.getElementById('bottomPatternGrid');
  if (!grid) return;

  const q = (state.bottomPatternQuery || '').toLowerCase();
  const visible = q
    ? PATTERNS.filter(p => p.name.toLowerCase().includes(q))
    : PATTERNS;

  if (!visible.length) {
    grid.innerHTML = `<p class="pattern-grid-empty">No patterns match</p>`;
    return;
  }

  grid.innerHTML = visible.map(p => `
    <button
      class="pattern-card${p.id === state.bottomPatternId ? ' is-active' : ''}"
      data-pattern="${p.id}"
      aria-pressed="${p.id === state.bottomPatternId}"
      aria-label="${p.name}"
    >
      <span class="pattern-card__thumb ${p.css}"></span>
      <span class="pattern-card__name">${p.name}</span>
    </button>
  `).join('');

  grid.querySelectorAll('.pattern-card').forEach(card => {
    card.addEventListener('click', () => {
      state.bottomPatternId = card.dataset.pattern;
      renderBottomPatternGrid();
      syncBottomPatternSwatch();
    });
  });
}

function initBottomPanel() {
  const addBtn      = document.getElementById('bottomAddBtn');
  const typePrev    = document.getElementById('bottomTypePrev');
  const typeNext    = document.getElementById('bottomTypeNext');
  const patternBtn  = document.getElementById('bottomPatternBtn');
  const backBtn     = document.getElementById('bottomPatternBackBtn');
  const searchEl    = document.getElementById('bottomPatternSearch');
  const mirrorToggle = document.getElementById('bottomMirrorToggle');

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (!state.bottomAdded) {
        state.bottomAdded = true;
        renderBottomMain();
      } else {
        showToast('Bottom already configured — use the type selector to change it');
      }
    });
  }

  if (typePrev) {
    typePrev.addEventListener('click', () => {
      state.bottomTypeIndex = (state.bottomTypeIndex - 1 + BOTTOM_TYPES.length) % BOTTOM_TYPES.length;
      renderBottomMain();
    });
  }

  if (typeNext) {
    typeNext.addEventListener('click', () => {
      state.bottomTypeIndex = (state.bottomTypeIndex + 1) % BOTTOM_TYPES.length;
      renderBottomMain();
    });
  }

  if (patternBtn) {
    patternBtn.addEventListener('click', () => {
      state.bottomPatternQuery = '';
      openBottomView('bottomPatternView');
      const s = document.getElementById('bottomPatternSearch');
      if (s) s.value = '';
      renderBottomPatternGrid();
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => openBottomView('bottomMainView'));
  }

  if (searchEl) {
    searchEl.addEventListener('input', () => {
      state.bottomPatternQuery = searchEl.value;
      renderBottomPatternGrid();
    });
  }

  if (mirrorToggle) {
    mirrorToggle.addEventListener('change', () => {
      state.bottomMirrored = mirrorToggle.checked;
      mirrorToggle.setAttribute('aria-checked', String(state.bottomMirrored));
    });
  }

  renderBottomMain();
}


// ── Style panel ──────────────────────────────────────────

// ── Color picker helpers ──────────────────────────────

function hsvToRgb(h, s, v) {
  h = ((h % 360) + 360) % 360;
  const c = v * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if      (h < 60)  { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else              { r = c; g = 0; b = x; }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function rgbToHex(r, g, b) {
  return [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d   = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  if (d !== 0) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6;               break;
      case b: h = ((r - g) / d + 4) / 6;               break;
    }
  }
  return { h: h * 360, s, v };
}

function syncColorPickerUI() {
  const field    = document.getElementById('colorPickerField');
  const cursor   = document.getElementById('colorPickerCursor');
  const hueEl    = document.getElementById('colorPickerHue');
  const hueThumb = document.getElementById('colorPickerHueThumb');
  const hexInput = document.getElementById('colorHexInput');
  const preview  = document.getElementById('colorPreviewSwatch');
  const rRange   = document.getElementById('colorR');
  const gRange   = document.getElementById('colorG');
  const bRange   = document.getElementById('colorB');
  const rVal     = document.getElementById('colorRVal');
  const gVal     = document.getElementById('colorGVal');
  const bVal     = document.getElementById('colorBVal');

  const { h, s, v, r, g, b } = {
    h: state.styleColorH,
    s: state.styleColorS,
    v: state.styleColorV,
    r: state.styleColorR,
    g: state.styleColorG,
    b: state.styleColorB,
  };

  const hex = rgbToHex(r, g, b);
  state.styleColorHex = hex;

  // CSS vars for dynamic gradients
  const root = document.documentElement;
  root.style.setProperty('--cp-hue', String(h));
  root.style.setProperty('--cp-r',   String(r));
  root.style.setProperty('--cp-g',   String(g));
  root.style.setProperty('--cp-b',   String(b));

  if (cursor)   { cursor.style.left = `${s * 100}%`; cursor.style.top = `${(1 - v) * 100}%`; }
  if (hueThumb) hueThumb.style.left = `${(h / 360) * 100}%`;
  if (hexInput && document.activeElement !== hexInput) hexInput.value = hex;
  if (preview)  preview.style.background = `rgb(${r},${g},${b})`;
  if (rRange)   rRange.value = r;
  if (gRange)   gRange.value = g;
  if (bRange)   bRange.value = b;
  if (rVal)     rVal.textContent = r;
  if (gVal)     gVal.textContent = g;
  if (bVal)     bVal.textContent = b;
}

function setColorFromHsv(h, s, v) {
  state.styleColorH = h;
  state.styleColorS = s;
  state.styleColorV = v;
  const rgb = hsvToRgb(h, s, v);
  state.styleColorR = rgb.r;
  state.styleColorG = rgb.g;
  state.styleColorB = rgb.b;
  syncColorPickerUI();
}

function setColorFromRgb(r, g, b) {
  state.styleColorR = r;
  state.styleColorG = g;
  state.styleColorB = b;
  const hsv = rgbToHsv(r, g, b);
  state.styleColorH = hsv.h;
  state.styleColorS = hsv.s;
  state.styleColorV = hsv.v;
  syncColorPickerUI();
}

function renderColorSwatches() {
  const grid = document.getElementById('colorSwatchesGrid');
  if (!grid) return;

  if (!state.styleColorSwatches.length) {
    grid.innerHTML = `<span class="color-swatches-empty">No swatches saved</span>`;
    return;
  }

  grid.innerHTML = state.styleColorSwatches.map((hex, i) => `
    <div
      class="color-swatch-item${i === state.styleActiveSwatchIdx ? ' is-active' : ''}"
      style="background:#${hex}"
      data-idx="${i}"
      title="#${hex}"
      role="button"
      tabindex="0"
      aria-label="Swatch #${hex}"
    ></div>
  `).join('');

  grid.querySelectorAll('.color-swatch-item').forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.dataset.idx, 10);
      state.styleActiveSwatchIdx = idx;
      const hex = state.styleColorSwatches[idx];
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      setColorFromRgb(r, g, b);
      renderColorSwatches();
    });
  });
}

// ── Asset grid renderers ──────────────────────────────

function renderStyleTextureGrid() {
  const grid = document.getElementById('styleTextureGrid');
  if (!grid) return;

  const q = (state.styleTextureQuery || '').toLowerCase();
  const visible = q
    ? TEXTURES.filter(t => t.name.toLowerCase().includes(q))
    : TEXTURES;

  if (!visible.length) {
    grid.innerHTML = `<p class="pattern-grid-empty">No textures match</p>`;
    return;
  }

  grid.innerHTML = visible.map(t => `
    <button
      class="pattern-card${t.id === state.styleTextureId ? ' is-active' : ''}"
      data-texture="${t.id}"
      aria-pressed="${t.id === state.styleTextureId}"
      aria-label="${t.name}"
    >
      <span class="style-asset-thumb ${t.css}">
        ${t.exclusive ? '<span class="style-asset-badge">Exclusive for Mattress</span>' : ''}
      </span>
      <span class="pattern-card__name">${t.name}</span>
    </button>
  `).join('');

  grid.querySelectorAll('.pattern-card').forEach(card => {
    card.addEventListener('click', () => {
      state.styleTextureId = card.dataset.texture;
      renderStyleTextureGrid();
    });
  });
}

function renderStyleMaterialGrid() {
  const grid = document.getElementById('styleMaterialGrid');
  if (!grid) return;

  const q   = (state.styleMaterialQuery || '').toLowerCase();
  const flt = state.styleMaterialFilter || 'all';

  let visible = flt === 'all'
    ? MATERIALS
    : MATERIALS.filter(m => m.filter === flt || m.filter === 'all');

  if (q) visible = visible.filter(m => m.name.toLowerCase().includes(q));

  if (!visible.length) {
    grid.innerHTML = `<p class="pattern-grid-empty">No materials match</p>`;
    return;
  }

  grid.innerHTML = visible.map(m => `
    <button
      class="pattern-card${m.id === state.styleMaterialId ? ' is-active' : ''}"
      data-material="${m.id}"
      aria-pressed="${m.id === state.styleMaterialId}"
      aria-label="${m.name}"
    >
      <span class="style-asset-thumb ${m.css}">
        ${m.exclusive ? '<span class="style-asset-badge">Exclusive for Mattress</span>' : ''}
      </span>
      <span class="pattern-card__name">${m.name}</span>
    </button>
  `).join('');

  grid.querySelectorAll('.pattern-card').forEach(card => {
    card.addEventListener('click', () => {
      state.styleMaterialId = card.dataset.material;
      renderStyleMaterialGrid();
    });
  });
}

// ── Main init ─────────────────────────────────────────

function initStylePanel() {
  // ── Tab switching ──
  document.querySelectorAll('.style-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.styleTab;
      state.styleTab = target;

      document.querySelectorAll('.style-tab').forEach(t => {
        t.classList.toggle('is-active', t.dataset.styleTab === target);
        t.setAttribute('aria-selected', String(t.dataset.styleTab === target));
      });

      ['textures', 'materials', 'colors', 'properties'].forEach(name => {
        const pane = document.getElementById(`styleTab${name.charAt(0).toUpperCase() + name.slice(1)}`);
        if (pane) pane.hidden = (name !== target);
      });
    });
  });

  // ── Textures tab ──
  const textureSearch = document.getElementById('styleTextureSearch');
  if (textureSearch) {
    textureSearch.addEventListener('input', () => {
      state.styleTextureQuery = textureSearch.value;
      renderStyleTextureGrid();
    });
  }

  // ── Materials tab ──
  const materialSearch = document.getElementById('styleMaterialSearch');
  if (materialSearch) {
    materialSearch.addEventListener('input', () => {
      state.styleMaterialQuery = materialSearch.value;
      renderStyleMaterialGrid();
    });
  }

  document.querySelectorAll('#styleMaterialFilters .style-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      state.styleMaterialFilter = chip.dataset.filter;
      document.querySelectorAll('#styleMaterialFilters .style-chip').forEach(c => {
        c.classList.toggle('is-active', c.dataset.filter === state.styleMaterialFilter);
      });
      renderStyleMaterialGrid();
    });
  });

  // ── Colors tab ──
  const field    = document.getElementById('colorPickerField');
  const hueEl    = document.getElementById('colorPickerHue');
  const hexInput = document.getElementById('colorHexInput');
  const rRange   = document.getElementById('colorR');
  const gRange   = document.getElementById('colorG');
  const bRange   = document.getElementById('colorB');

  function pointerOnField(e) {
    const rect = field.getBoundingClientRect();
    const s = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const v = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
    setColorFromHsv(state.styleColorH, s, v);
  }

  if (field) {
    field.addEventListener('mousedown', e => {
      pointerOnField(e);
      const move = ev => pointerOnField(ev);
      const up   = ()  => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    });
  }

  function pointerOnHue(e) {
    const rect = hueEl.getBoundingClientRect();
    const h = Math.max(0, Math.min(360, ((e.clientX - rect.left) / rect.width) * 360));
    setColorFromHsv(h, state.styleColorS, state.styleColorV);
  }

  if (hueEl) {
    hueEl.addEventListener('mousedown', e => {
      pointerOnHue(e);
      const move = ev => pointerOnHue(ev);
      const up   = ()  => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    });
  }

  if (hexInput) {
    hexInput.addEventListener('input', () => {
      const val = hexInput.value.replace(/[^0-9a-fA-F]/g, '');
      if (val.length === 6) {
        const r = parseInt(val.slice(0, 2), 16);
        const g = parseInt(val.slice(2, 4), 16);
        const b = parseInt(val.slice(4, 6), 16);
        setColorFromRgb(r, g, b);
      }
    });
  }

  if (rRange) rRange.addEventListener('input', () => setColorFromRgb(Number(rRange.value), state.styleColorG, state.styleColorB));
  if (gRange) gRange.addEventListener('input', () => setColorFromRgb(state.styleColorR, Number(gRange.value), state.styleColorB));
  if (bRange) bRange.addEventListener('input', () => setColorFromRgb(state.styleColorR, state.styleColorG, Number(bRange.value)));

  const addSwatchBtn    = document.getElementById('colorSwatchAdd');
  const removeSwatchBtn = document.getElementById('colorSwatchRemove');

  if (addSwatchBtn) {
    addSwatchBtn.addEventListener('click', () => {
      if (state.styleColorSwatches.length >= 20) { showToast('Maximum 20 swatches'); return; }
      const hex = state.styleColorHex;
      if (!state.styleColorSwatches.includes(hex)) {
        state.styleColorSwatches.push(hex);
        state.styleActiveSwatchIdx = state.styleColorSwatches.length - 1;
      }
      renderColorSwatches();
    });
  }

  if (removeSwatchBtn) {
    removeSwatchBtn.addEventListener('click', () => {
      const idx = state.styleActiveSwatchIdx;
      if (idx >= 0 && idx < state.styleColorSwatches.length) {
        state.styleColorSwatches.splice(idx, 1);
        state.styleActiveSwatchIdx = Math.min(idx, state.styleColorSwatches.length - 1);
        renderColorSwatches();
      }
    });
  }

  // ── Properties tab ──
  const frontBtn  = document.getElementById('styleFrontTextureBtn');
  const fitBtn    = document.getElementById('styleFitTextureBtn');
  const resetBtn  = document.getElementById('stylePropDimReset');
  const glossyEl  = document.getElementById('styleGlossy');
  const glossyVal = document.getElementById('styleGlossyVal');

  if (frontBtn && fitBtn) {
    frontBtn.addEventListener('click', () => {
      state.styleTextureMode = 'front';
      frontBtn.classList.add('is-active');
      fitBtn.classList.remove('is-active');
    });
    fitBtn.addEventListener('click', () => {
      state.styleTextureMode = 'fit';
      fitBtn.classList.add('is-active');
      frontBtn.classList.remove('is-active');
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const w = document.getElementById('stylePropWidth');
      const h = document.getElementById('stylePropHeight');
      if (w) w.value = '1';
      if (h) h.value = '1';
    });
  }

  document.querySelectorAll('.style-rot-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.stylePropRotation = Number(btn.dataset.deg);
      document.querySelectorAll('.style-rot-btn').forEach(b => {
        b.classList.toggle('is-active', Number(b.dataset.deg) === state.stylePropRotation);
      });
    });
  });

  if (glossyEl && glossyVal) {
    glossyEl.addEventListener('input', () => {
      glossyVal.textContent = Number(glossyEl.value).toFixed(2);
      updateSliderFill(glossyEl);
    });
    updateSliderFill(glossyEl);
  }

  // ── Initial render ──
  renderStyleTextureGrid();
  renderStyleMaterialGrid();
  renderColorSwatches();
  syncColorPickerUI();
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
  initTopPanel();
  initWallPanel();
  initTapePanel();
  initLabelPanel();
  initHandlePanel();
  initBottomPanel();
  initStylePanel();
  updateViewportLabel();
});
