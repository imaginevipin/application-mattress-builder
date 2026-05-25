/* ─────────────────────────────────────────────────────────
   Mattress Builder v2 — app.js
   ───────────────────────────────────────────────────────── */


// ── Data ─────────────────────────────────────────────────

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
  { id: '6',  name: 'Slim',    inches: 6  },
  { id: '8',  name: 'Low',     inches: 8  },
  { id: '10', name: 'Classic', inches: 10 },
  { id: '12', name: 'Plush',   inches: 12 },
  { id: '14', name: 'Tall',    inches: 14 },
  { id: '16', name: 'Ultra',   inches: 16 },
];

const PATTERNS = [
  { id: 'diamond',  name: 'Diamond Quilt 1234', css: 'ptn-diamond'  },
  { id: 'xshape',   name: 'X Shape Top Quilt',  css: 'ptn-xshape'   },
  { id: 'buttons',  name: 'Buttons Top Quilt',  css: 'ptn-buttons'  },
  { id: 'rolling',  name: 'Rolling 6ft Lem',    css: 'ptn-rolling'  },
  { id: 'polkadot', name: 'Polka Dot Quilt',    css: 'ptn-polkadot' },
  { id: 'scallop',  name: 'Scalloped Mesh',     css: 'ptn-scallop'  },
];

const TEXTURES = [
  { id: 'diamond',  name: 'Diamond quilt 1234',  css: 'ptn-diamond'  },
  { id: 'xshape',   name: 'X shape top quilt',   css: 'ptn-xshape'   },
  { id: 'buttons',  name: 'Buttons top quilt',   css: 'ptn-buttons'  },
  { id: 'rolling',  name: 'Rolling 6ft lem',     css: 'ptn-rolling'  },
  { id: 'polkadot', name: 'Polka Dot Quilt',     css: 'ptn-polkadot' },
  { id: 'scallop',  name: 'Scalloped Mesh',      css: 'ptn-scallop'  },
];

const MATERIALS = [
  { id: 'linen-cotton-2', name: 'Linen Cotton Blend 2', css: 'mat-linen' },
  { id: 'linen-cotton-1', name: 'Linen Cotton Blend 1', css: 'mat-linen' },
  { id: 'linen-cotton-3', name: 'Linen Cotton Blend 3', css: 'mat-linen' },
  { id: 'fabric-391',     name: 'Fabric 391',           css: 'ptn-rolling' },
  { id: 'fabric-371',     name: 'Fabric 371',           css: 'ptn-xshape'  },
  { id: 'fabric-321',     name: 'Fabric 321',           css: 'ptn-buttons' },
];

const WALL_TYPES = [
  { id: 'quilted-panel', name: 'Quilted Panel', css: 'wt-quilted' },
  { id: 'stretch-knit',  name: 'Stretch Knit',  css: 'wt-stretch' },
  { id: 'damask-weave',  name: 'Damask Weave',  css: 'wt-damask'  },
  { id: 'woven-fabric',  name: 'Woven Fabric',  css: 'wt-woven'   },
  { id: 'smooth-panel',  name: 'Smooth Panel',  css: 'wt-smooth'  },
];

const TOP_TYPES = [
  { id: 'box-pillow', name: 'Box Pillow Top',     css: 'ptn-diamond'  },
  { id: 'euro-15',    name: 'Euro Top 1.5 Inch',  css: 'ptn-xshape'   },
  { id: 'euro-2',     name: 'Euro Top 2 Inch',    css: 'ptn-buttons'  },
  { id: 'euro-25',    name: 'Euro Top 2.5 Inch',  css: 'ptn-rolling'  },
  { id: 'euro-3',     name: 'Euro Top 3 Inch',    css: 'ptn-polkadot' },
  { id: 'euro-375',   name: 'Euro Top 3.75 Inch', css: 'ptn-scallop'  },
];

const BOTTOM_TYPES = [
  { id: 'flat',    name: 'Flat Bottom',          css: 'ptn-diamond'  },
  { id: 'euro-15', name: 'Euro Bottom 1.5 Inch', css: 'ptn-xshape'   },
  { id: 'euro-2',  name: 'Euro Bottom 2 Inch',   css: 'ptn-buttons'  },
  { id: 'euro-25', name: 'Euro Bottom 2.5 Inch', css: 'ptn-rolling'  },
  { id: 'euro-3',  name: 'Euro Bottom 3 Inch',   css: 'ptn-polkadot' },
];

const TAPE_STYLES = [
  { id: 'flat-sm',   name: '0.5" Wide Flat Tape',  css: 'tape-flat'  },
  { id: 'zipper-sm', name: '0.5" Zipper',          css: 'tape-piped' },
  { id: 'flat-md',   name: '0.75" Wide Flat Tape', css: 'tape-flat'  },
  { id: 'flat-lg',   name: '1.0" Wide Flat Tape',  css: 'tape-ribbon'},
  { id: 'oval',      name: 'Oval Tape',             css: 'tape-oval'  },
];

const LABEL_TYPES = [
  { id: 'sm-rect', name: 'Small Rectangle Label', css: 'lbl-sm-rect' },
  { id: 'lg-rect', name: 'Large Rectangle Label', css: 'lbl-lg-rect'  },
  { id: 'square',  name: 'Square Label',          css: 'lbl-square'   },
  { id: 'oval',    name: 'Oval Label',            css: 'lbl-oval'     },
  { id: 'tag',     name: 'Tag Label',             css: 'lbl-tag'      },
  { id: 'strip',   name: 'Strip Label',           css: 'lbl-strip'    },
];

const HANDLE_TYPES = [
  { id: 'horizontal', name: 'Horizontal Handle', css: 'hdl-horizontal' },
  { id: 'vertical',   name: 'Vertical Handle',   css: 'hdl-vertical'   },
  { id: 'loop',       name: 'Loop Handle',       css: 'hdl-loop'       },
  { id: 'strap',      name: 'Strap Handle',      css: 'hdl-strap'      },
  { id: 'ring',       name: 'Ring Handle',       css: 'hdl-ring'       },
  { id: 'cord',       name: 'Cord Handle',       css: 'hdl-cord'       },
];

const TUFT_TYPES = ['Classic Tuft', 'Round Tuft', 'Button Tuft', 'Diamond Tuft'];

const LAYER_TEMPLATES = [
  { id: 'pocket-coil',   name: 'Edge-To-Edge Pocket Coil', css: 'lt-pocket-coil',  thickness: 4.794, color: '#aeb8cb' },
  { id: 'hole-punch',    name: 'Hole Punch Foam Layer',    css: 'lt-hole-punch',   thickness: 1.503, color: '#94c876' },
  { id: 'convoluted-1',  name: 'Convoluted Foam 1',        css: 'lt-convoluted-1', thickness: 1.125, color: '#c9d1df' },
  { id: 'convoluted-2',  name: 'Convoluted Foam 2',        css: 'lt-convoluted-2', thickness: 1.125, color: '#b9c3d3' },
  { id: 'fiber-batting', name: 'Fiber Batting',            css: 'lt-fiber',        thickness: 0.9,   color: '#ddd8cf' },
  { id: 'foam-slab',     name: 'Foam Slab',                css: 'lt-foam-slab',    thickness: 2.0,   color: '#7eb26d' },
];

const CAMERA_PRESETS = [
  { id: 'front',     name: 'Front View' },
  { id: 'back',      name: 'Back View' },
  { id: 'left',      name: 'Left Side' },
  { id: 'right',     name: 'Right Side' },
  { id: 'top-view',  name: 'Top View' },
  { id: 'iso-left',  name: 'Isometric Left' },
  { id: 'iso-right', name: 'Isometric Right' },
  { id: 'corner',    name: 'Corner View' },
];

const IMAGE_RESOLUTION_PRESETS = {
  preview: {
    '1080p': { width: 1500, height: 843 },
    '1440p': { width: 1920, height: 1080 },
    '4k':    { width: 3840, height: 2160 },
  },
  highres: {
    '1080p': { width: 1920, height: 1080 },
    '1440p': { width: 2560, height: 1440 },
    '4k':    { width: 3840, height: 2160 },
  },
};

const PX_PER_INCH      = 72 / 84;
const HEIGHT_PX_PER_INCH = 64 / 16;

let layerUid    = 0;
let imageUid    = 0;
let cameraUid   = 0;
let toastTimeout = null;
let appVersion = 1;


// ── State helpers ─────────────────────────────────────────

function createLayer(templateId) {
  const t = LAYER_TEMPLATES.find(x => x.id === templateId) || LAYER_TEMPLATES[0];
  layerUid += 1;
  return { id: `layer-${layerUid}`, templateId: t.id, name: t.name, css: t.css, thickness: t.thickness, color: t.color, visible: true, frontCut: 0.25, sideCut: 0.25 };
}

function createCamera(name, snapshot = null, isCurrent = false) {
  cameraUid += 1;
  return { id: isCurrent ? 'current-camera' : `camera-${cameraUid}`, name, snapshot, isCurrent, createdAt: new Date().toISOString() };
}

function makeDefaultTopLayer() {
  return {
    patternId: 'diamond', patternCss: 'ptn-diamond', expanded: true,
    quiltingAdded: false, quiltingPatternId: 'diamond', quiltingPatternCss: 'ptn-diamond',
    quiltingExpanded: false, quiltingW: 50, quiltingH: 50,
    quiltingPosX: 0, quiltingPosY: 0, quiltingRotation: 0, quiltingDepth: 25,
    gussetAdded: false, gussetPatternId: 'buttons', gussetPatternCss: 'ptn-buttons',
    gussetExpanded: false, gussetW: 50, gussetH: 50,
    gussetPosX: 0, gussetPosY: 0, gussetRotation: 0, gussetDepth: 25,
    tuftsAdded: false, tuftsExpanded: false, tuftTypeIndex: 0,
    tuftsPosX: 0, tuftsPosY: 0, tuftsColCount: 6, tuftsColGap: 14,
    tuftsRowCount: 6, tuftsRowGap: 14, tuftsOffsetRows: 0, tuftsDiameter: 1, tuftsDepth: 25,
  };
}

function createDefaultState() {
  const defaultLayers = [createLayer('pocket-coil'), createLayer('hole-punch')];
  const defaultCamera = createCamera('Current Camera', null, true);
  return {
    section: 'mattress',
    legacyMode: 'external',

    // Mattress
    mattressTab: 'size',
    sizeId: 'king',
    heightId: '10',
    sizeQuery: '',
    heightQuery: '',

    // Top panel
    topSubView: 'main',
    topPickerCtx: null,
    topPickerLayerIdx: 0,
    topPickerTab: 'pattern',
    topPickerQuery: '',
    topLayers: [makeDefaultTopLayer()],

    // Wall panel
    wallSubView: 'main',
    wallPickerCtx: null,       // 'quilting'
    wallPickerTab: 'pattern',
    wallPickerQuery: '',
    wallQuiltingAdded: false,
    wallQuiltingPatternId: 'xshape',
    wallQuiltingPatternCss: 'ptn-xshape',
    wallQuiltingExpanded: false,
    wallQuiltingW: 50, wallQuiltingH: 50,
    wallQuiltingPosX: 0, wallQuiltingPosY: 0,
    wallQuiltingRotation: 0, wallQuiltingDepth: 25,
    wallTuftsAdded: false,
    wallTuftTypeIndex: 0,
    wallTuftsExpanded: false,
    wallTuftsPosX: 0, wallTuftsPosY: 0,
    wallTuftsColCount: 6, wallTuftsColGap: 14,
    wallTuftsRowCount: 6, wallTuftsRowGap: 14,
    wallTuftsOffsetRows: 0, wallTuftsDiameter: 1, wallTuftsDepth: 25,

    // Bottom panel
    bottomSubView: 'main',
    bottomPickerCtx: 'base',
    bottomPickerTab: 'pattern',
    bottomPickerQuery: '',
    bottomMirrored: false,
    bottomTypeId: 'euro-2',
    bottomTypeCss: 'ptn-buttons',
    bottomPatternId: 'diamond',
    bottomPatternCss: 'ptn-diamond',
    bottomExpanded: false,
    bottomW: 50, bottomH: 50,
    bottomPosX: 0, bottomPosY: 0,
    bottomRotation: 0, bottomDepth: 25,

    // Accessories
    accessoriesTab: 'tape',
    tapeSubView: 'main',
    tapePickerQuery: '',
    tapeAdded: false,
    tapeStyleId: 'flat-sm',
    tapeStyleCss: 'tape-flat',
    tapeScaleX: 0, tapeScaleY: 0, tapeScaleZ: 0,
    tapePosition: 0.25,
    labelSubView: 'main',
    labelPickerQuery: '',
    labelAdded: false,
    labelTypeId: 'sm-rect',
    labelTypeCss: 'lbl-sm-rect',
    labelSide: 'front',
    labelScaleX: 0, labelScaleY: 0, labelScaleZ: 0,
    labelPosX: 0, labelPosY: 0, labelPosZ: 0,
    labelAdjacent: false, labelMirror: false,
    handleSubView: 'main',
    handlePickerQuery: '',
    handleAdded: false,
    handleTypeId: 'horizontal',
    handleTypeCss: 'hdl-horizontal',
    handleSide: 'front',
    handleScaleX: 0, handleScaleY: 0, handleScaleZ: 0,
    handlePosX: 0, handlePosY: 0, handlePosZ: 0,
    handleAdjacent: false, handleMirror: false,

    // Images
    imagesTab: 'preview',
    previewImages: [],
    renderImages: [],

    // Internal — Layers
    layers: defaultLayers,
    layersSubView: 'main',
    layersPickerQuery: '',
    layersExpandedId: defaultLayers[0].id,

    // Internal — Layout
    activeLayout: 'exploded',
    layoutExplodedGap: 0.3,
    layoutCutawayType: 'square',

    // Create image modal
    createImageMode: 'preview',
    createImageResolution: '1080p',
    createImageWidth: 1500,
    createImageHeight: 843,
    createImageAspectLocked: true,
    createImageFormat: 'jpg',
    createImageTransparentBg: false,
    createImageShadowFloor: true,
    createImageFilename: 'New Mattress_4-image1',
    createImageSelectedCameraIds: [defaultCamera.id],

    cameras: [defaultCamera],
    activeCameraId: defaultCamera.id,
    libraryAvailableCount: 397,

    // Shared color picker state (used across all picker sub-views)
    pickerH: 0,
    pickerS: 0,
    pickerV: 100,

    // External tab
    externalTab: 'top',

    // Camera panel
    cameraSubView: 'main',
    cameraPresetQuery: '',
  };
}

let state = createDefaultState();


// ── Utility ───────────────────────────────────────────────

function getMattressName() {
  const el = document.querySelector('.mattress-name');
  return el ? (el.value.trim() || 'Untitled Mattress') : 'Untitled Mattress';
}

function showToast(msg) {
  const el = document.getElementById('appToast');
  if (!el) return;
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => { el.hidden = true; }, 2400);
}

function getPatternName(id) {
  return (PATTERNS.find(p => p.id === id) || {}).name || 'Pattern 1';
}

function getTuftName(layer) {
  return TUFT_TYPES[(layer || {}).tuftTypeIndex || 0] || 'Classic Tuft';
}

function getWallTuftName() {
  return TUFT_TYPES[state.wallTuftTypeIndex] || 'Classic Tuft';
}


// ── Viewport sync ─────────────────────────────────────────

function updateViewportLabel() {
  const el = document.getElementById('viewportLabel');
  if (!el) return;
  const size   = SIZES.find(s => s.id === state.sizeId);
  const height = HEIGHTS.find(h => h.id === state.heightId);
  if (!size || !height) return;
  const isInternalSection = ['internal', 'layout', 'camera'].includes(state.section);
  if (isInternalSection) {
    el.textContent = `${size.name} · ${state.layers.length} Layers · ${height.inches}" Profile`;
  } else {
    el.textContent = `${size.name} · ${height.inches}" Profile`;
  }
}

function syncViewport() {
  if (window.viewportSetSize)   window.viewportSetSize(state.sizeId);
  if (window.viewportSetHeight) window.viewportSetHeight(Number(state.heightId));
  const vMode = ['internal', 'layout', 'camera'].includes(state.section) ? 'internal' : 'external';
  if (window.viewportSyncState) {
    window.viewportSyncState({
      mode: vMode,
      layers: state.layers,
      nextView: {
        exploded: state.activeLayout === 'exploded',
        explodedGap: state.layoutExplodedGap,
        innerBuild: state.activeLayout === 'inner-build',
        cutaway: state.activeLayout === 'cutaway',
        cutawayShape: state.layoutCutawayType,
      },
    });
  } else if (window.viewportSetMode) {
    window.viewportSetMode(vMode);
  }
}


// ── Section navigation ────────────────────────────────────

function setSection(section) {
  // Remap legacy section names (used by v1/v3 nav) to current panel IDs
  let resolvedSection = section;
  if (appVersion !== 2) {
    if (section === 'top')          { state.externalTab = 'top';    resolvedSection = 'external'; }
    else if (section === 'wall')    { state.externalTab = 'wall';   resolvedSection = 'external'; }
    else if (section === 'bottom')  { state.externalTab = 'bottom'; resolvedSection = 'external'; }
    else if (section === 'accessories') { resolvedSection = 'details'; }
    else if (section === 'layers')  { resolvedSection = 'internal'; }
  }

  state.section = resolvedSection;

  // Highlight nav items — match on original section name so legacy nav highlights correctly
  document.querySelectorAll('.nav-item').forEach(btn => {
    const active = btn.dataset.section === section;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-current', active ? 'page' : 'false');
  });

  document.querySelectorAll('.panel').forEach(p => { p.hidden = true; });
  const panel = document.getElementById(`panel-${resolvedSection}`);
  if (panel) panel.hidden = false;

  const vMode = ['internal', 'layout', 'camera'].includes(resolvedSection) ? 'internal' : 'external';
  if (window.viewportSetMode) window.viewportSetMode(vMode);
  renderPanel(resolvedSection);
}

function setMode(mode) {
  state.legacyMode = mode;
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.mode === mode);
    btn.setAttribute('aria-pressed', String(btn.dataset.mode === mode));
  });
  const navExt = document.getElementById('navExternal');
  const navInt = document.getElementById('navInternal');
  if (navExt) navExt.classList.toggle('nav-group--hidden', mode !== 'external');
  if (navInt) navInt.classList.toggle('nav-group--hidden', mode !== 'internal');
  const section = mode === 'external' ? 'mattress' : 'layers';
  setSection(section);
  updateViewportLabel();
}

function renderPanel(section) {
  switch (section) {
    case 'mattress':  renderMattressPanel();    break;
    case 'external':  renderExternalPanel();    break;
    case 'details':   renderAccessoriesPanel(); break;
    case 'internal':  renderLayersPanel();      break;
    case 'layout':    renderLayoutPanel();      break;
    case 'camera':    renderCameraPanel();      break;
    case 'images':    renderImagesPanel();      break;
  }
}

function renderExternalPanel() {
  ['top', 'wall', 'bottom'].forEach(tab => {
    const pane = document.getElementById(`externalTab${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
    if (pane) pane.hidden = tab !== state.externalTab;
  });
  document.querySelectorAll('[data-external-tab]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.externalTab === state.externalTab);
    btn.setAttribute('aria-selected', String(btn.dataset.externalTab === state.externalTab));
  });
  switch (state.externalTab) {
    case 'top':    renderTopPanel();    break;
    case 'wall':   renderWallPanel();   break;
    case 'bottom': renderBottomPanel(); break;
  }
}


// ── Mattress panel ────────────────────────────────────────

function renderMattressPanel() {
  renderSizeGrid();
  renderHeightGrid();
  syncMattressTabs();
}

function syncMattressTabs() {
  document.querySelectorAll('[data-mattress-tab]').forEach(btn => {
    const active = btn.dataset.mattressTab === state.mattressTab;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', String(active));
  });
  document.getElementById('mattressTabSize').hidden   = state.mattressTab !== 'size';
  document.getElementById('mattressTabHeight').hidden = state.mattressTab !== 'height';
}

function renderSizeGrid() {
  const grid = document.getElementById('sizeGrid');
  if (!grid) return;
  const q = state.sizeQuery.toLowerCase().trim();
  const visible = q ? SIZES.filter(s => s.name.toLowerCase().includes(q)) : SIZES;
  if (!visible.length) { grid.innerHTML = `<p style="grid-column:1/-1;color:var(--text-default-placeholder);font-size:12px;padding:8px 0;">No results</p>`; return; }
  const PPI = PX_PER_INCH;
  grid.innerHTML = visible.map(size => {
    const w = Math.round(size.w * PPI);
    const h = Math.round(size.h * PPI);
    const active = size.id === state.sizeId;
    return `<button class="size-card${active ? ' is-active' : ''}" data-size="${size.id}" aria-pressed="${active}">
      <div class="size-card-visual"><div class="size-card-rect" style="width:${w}px;height:${h}px;"></div></div>
      <div class="size-card-label"><span class="size-card-name">${size.name}</span><span class="size-card-dims">${size.w}" × ${size.h}"</span></div>
    </button>`;
  }).join('');
  grid.querySelectorAll('.size-card').forEach(card => {
    card.addEventListener('click', () => {
      state.sizeId = card.dataset.size;
      renderSizeGrid();
      updateViewportLabel();
      if (window.viewportSetSize) window.viewportSetSize(state.sizeId);
    });
  });
}

function renderHeightGrid() {
  const grid = document.getElementById('heightGrid');
  if (!grid) return;
  const q = state.heightQuery.toLowerCase().trim();
  const visible = q ? HEIGHTS.filter(h => h.name.toLowerCase().includes(q) || String(h.inches).includes(q)) : HEIGHTS;
  if (!visible.length) { grid.innerHTML = `<p style="grid-column:1/-1;color:var(--text-default-placeholder);font-size:12px;padding:8px 0;">No results</p>`; return; }
  grid.innerHTML = visible.map(h => {
    const rh = Math.max(16, Math.round(h.inches * HEIGHT_PX_PER_INCH));
    const active = h.id === state.heightId;
    return `<button class="height-card${active ? ' is-active' : ''}" data-height="${h.id}" aria-pressed="${active}">
      <div class="height-card-visual"><div class="height-card-stack"><div class="height-card-top"></div><div class="height-card-rect" style="height:${rh}px;"></div></div></div>
      <div class="height-card-label"><span class="height-card-name">${h.name}</span><span class="height-card-dims">${h.inches}"</span></div>
    </button>`;
  }).join('');
  grid.querySelectorAll('.height-card').forEach(card => {
    card.addEventListener('click', () => {
      state.heightId = card.dataset.height;
      renderHeightGrid();
      updateViewportLabel();
      if (window.viewportSetHeight) window.viewportSetHeight(Number(state.heightId));
      syncViewport();
    });
  });
}


// ── Layer card HTML builder ───────────────────────────────

function layerCardBodyHTML(fields) {
  return `<div class="layer-card__body">${fields}</div>`;
}

function propGroupHTML(label, content) {
  return `<div class="prop-group"><div class="prop-row"><span class="prop-label">${label}</span>${content}</div></div>`;
}

function inputPairHTML(aLabel, aId, aVal, bLabel, bId, bVal) {
  return `<div class="input-pair">
    <div class="input-pair__item"><span class="input-pair__item-label">${aLabel}</span><input class="form-input" id="${aId}" type="number" value="${aVal}"></div>
    <button class="lock-btn" title="Link values"><span class="material-symbols-outlined">lock_open</span></button>
    <div class="input-pair__item"><span class="input-pair__item-label">${bLabel}</span><input class="form-input" id="${bId}" type="number" value="${bVal}"></div>
  </div>`;
}

function rotationPillsHTML(prefix, current) {
  return `<div class="rotation-pills">${[0,90,180,270].map(d =>
    `<button class="rot-pill${current === d ? ' is-active' : ''}" data-rot="${prefix}" data-deg="${d}">${d}</button>`
  ).join('')}</div>`;
}

function sliderRowHTML(label, id, min, max, step, val) {
  return `<div class="form-slider-field">
    <div class="form-slider-header"><label class="form-field-label" for="${id}">${label}</label><span class="form-slider-val" id="${id}Val">${val}</span></div>
    <input class="form-range" id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${val}">
  </div>`;
}

function quiltingBodyHTML(idPrefix, vals) {
  return `<div class="compact-body">
    <div class="compact-row">
      <span class="compact-label">Sizing</span>
      <div class="compact-fields">
        <div class="compact-field"><span class="compact-field-lbl">W</span><input class="compact-input" id="${idPrefix}W" type="number" value="${vals.W}"></div>
        <button class="lock-btn compact-lock" title="Link"><span class="material-symbols-outlined">lock_open</span></button>
        <div class="compact-field"><span class="compact-field-lbl">H</span><input class="compact-input" id="${idPrefix}H" type="number" value="${vals.H}"></div>
      </div>
    </div>
    <div class="compact-row">
      <span class="compact-label">Position</span>
      <div class="compact-fields">
        <div class="compact-field"><span class="compact-field-lbl">X</span><input class="compact-input" id="${idPrefix}PosX" type="number" value="${vals.PosX}"></div>
        <button class="lock-btn compact-lock" title="Link"><span class="material-symbols-outlined">lock_open</span></button>
        <div class="compact-field"><span class="compact-field-lbl">Y</span><input class="compact-input" id="${idPrefix}PosY" type="number" value="${vals.PosY}"></div>
      </div>
    </div>
    <div class="compact-row">
      <span class="compact-label">Rotation</span>
      <div class="compact-rotation">${[0,90,180,270].map(d =>
        `<button class="rot-pill${vals.Rotation === d ? ' is-active' : ''}" data-rot="${idPrefix}" data-deg="${d}">${d}</button>`
      ).join('')}</div>
    </div>
    <div class="compact-depth-block">
      <div class="compact-row">
        <span class="compact-label">Depth</span>
        <input class="compact-input compact-depth-num" id="${idPrefix}DepthNum" type="number" min="0" max="100" value="${vals.Depth}">
      </div>
      <input class="form-range" id="${idPrefix}Depth" type="range" min="0" max="100" step="1" value="${vals.Depth}">
    </div>
  </div>`;
}

function tuftsBodyHTML(idPrefix, vals) {
  return `<div class="compact-body">
    <div class="compact-row">
      <span class="compact-label">Position</span>
      <div class="compact-fields">
        <div class="compact-field"><span class="compact-field-lbl">X</span><input class="compact-input" id="${idPrefix}PosX" type="number" value="${vals.PosX}"></div>
        <button class="lock-btn compact-lock" title="Link"><span class="material-symbols-outlined">lock_open</span></button>
        <div class="compact-field"><span class="compact-field-lbl">Y</span><input class="compact-input" id="${idPrefix}PosY" type="number" value="${vals.PosY}"></div>
      </div>
    </div>
    <div class="compact-row">
      <span class="compact-label">Column</span>
      <div class="compact-fields">
        <div class="compact-field"><span class="compact-field-lbl">Cnt</span><input class="compact-input" id="${idPrefix}ColCount" type="number" value="${vals.ColCount}"></div>
        <div class="compact-field"><span class="compact-field-lbl">Gap</span><input class="compact-input" id="${idPrefix}ColGap" type="number" value="${vals.ColGap}"></div>
      </div>
    </div>
    <div class="compact-row">
      <span class="compact-label">Row</span>
      <div class="compact-fields">
        <div class="compact-field"><span class="compact-field-lbl">Cnt</span><input class="compact-input" id="${idPrefix}RowCount" type="number" value="${vals.RowCount}"></div>
        <div class="compact-field"><span class="compact-field-lbl">Gap</span><input class="compact-input" id="${idPrefix}RowGap" type="number" value="${vals.RowGap}"></div>
      </div>
    </div>
    <div class="compact-row">
      <span class="compact-label">Alt Rows</span>
      <div class="compact-fields">
        <div class="compact-field"><input class="compact-input" id="${idPrefix}OffsetRows" type="number" value="${vals.OffsetRows}"></div>
      </div>
    </div>
    <div class="compact-row">
      <span class="compact-label">Diameter</span>
      <div class="compact-fields">
        <div class="compact-field"><input class="compact-input" id="${idPrefix}Diameter" type="number" min="0.1" step="0.1" value="${vals.Diameter}"></div>
      </div>
    </div>
    <div class="compact-depth-block">
      <div class="compact-row">
        <span class="compact-label">C. Depth</span>
        <input class="compact-input compact-depth-num" id="${idPrefix}DepthNum" type="number" min="0" max="100" value="${vals.Depth}">
      </div>
      <input class="form-range" id="${idPrefix}Depth" type="range" min="0" max="100" step="1" value="${vals.Depth}">
    </div>
    <div class="feedback-strip"><span class="material-symbols-outlined">info</span><span>This feature is still evolving. <span class="feedback-strip__link">Click here to share feedback.</span></span></div>
  </div>`;
}

function makeLayerCard({ id, thumbCss, label, value, showDelete, expanded, bodyHtml, showDrag = false }) {
  const dragHtml = showDrag ? `<span class="layer-card__drag material-symbols-outlined">drag_indicator</span>` : '';
  return `
  <div class="layer-card-wrap" id="wrap-${id}"${showDrag ? ' draggable="true"' : ''}>
    <div class="layer-card">
      ${dragHtml}
      <button class="layer-card__trigger" data-open-picker="${id}">
        <div class="layer-card__thumb ${thumbCss}"></div>
        <div class="layer-card__info">
          <span class="layer-card__label">${label}</span>
          <span class="layer-card__value">${value}</span>
        </div>
      </button>
      <div class="layer-card__actions">
        <button class="icon-btn" data-open-picker-settings="${id}" title="Style"><span class="material-symbols-outlined">palette</span></button>
        ${showDelete ? `<button class="icon-btn icon-btn--danger" data-delete-card="${id}" title="Delete"><span class="material-symbols-outlined">delete</span></button>` : ''}
        <button class="icon-btn" data-toggle-card="${id}" aria-expanded="${expanded}" title="Expand">
          <span class="material-symbols-outlined">${expanded ? 'expand_less' : 'expand_more'}</span>
        </button>
      </div>
    </div>
    ${bodyHtml ? (expanded ? bodyHtml : `<div id="body-${id}" hidden>${bodyHtml}</div>`) : ''}
  </div>`;
}


// ── Top panel ─────────────────────────────────────────────

function renderTopPanel() {
  showSubView('top', state.topSubView);
  if (state.topSubView === 'main') renderTopMain();
  else renderTopPickerGrid();
}

function renderTopMain() {
  const stack = document.getElementById('topLayerStack');
  const addLinks = document.getElementById('topAddLinks');
  if (!stack || !addLinks) return;

  stack.innerHTML = state.topLayers.map((layer, idx) => {
    const pfx = `topL${idx}`;
    let subCardsHtml = '';

    if (layer.quiltingAdded) {
      subCardsHtml += makeLayerCard({
        id: `${pfx}Quilting`, thumbCss: layer.quiltingPatternCss,
        label: 'Top Quilting', value: getPatternName(layer.quiltingPatternId),
        showDelete: true, expanded: layer.quiltingExpanded,
        bodyHtml: quiltingBodyHTML(`${pfx}Quilting`, {
          W: layer.quiltingW, H: layer.quiltingH,
          PosX: layer.quiltingPosX, PosY: layer.quiltingPosY,
          Rotation: layer.quiltingRotation, Depth: layer.quiltingDepth,
        }),
      });
    }
    if (layer.gussetAdded) {
      subCardsHtml += makeLayerCard({
        id: `${pfx}Gusset`, thumbCss: layer.gussetPatternCss,
        label: 'Gusset Quilting', value: getPatternName(layer.gussetPatternId),
        showDelete: true, expanded: layer.gussetExpanded,
        bodyHtml: quiltingBodyHTML(`${pfx}Gusset`, {
          W: layer.gussetW, H: layer.gussetH,
          PosX: layer.gussetPosX, PosY: layer.gussetPosY,
          Rotation: layer.gussetRotation, Depth: layer.gussetDepth,
        }),
      });
    }
    if (layer.tuftsAdded) {
      subCardsHtml += makeLayerCard({
        id: `${pfx}Tufts`, thumbCss: 'ptn-buttons',
        label: 'Tufts', value: getTuftName(layer),
        showDelete: true, expanded: layer.tuftsExpanded,
        bodyHtml: tuftsBodyHTML(`${pfx}Tufts`, {
          PosX: layer.tuftsPosX, PosY: layer.tuftsPosY,
          ColCount: layer.tuftsColCount, ColGap: layer.tuftsColGap,
          RowCount: layer.tuftsRowCount, RowGap: layer.tuftsRowGap,
          OffsetRows: layer.tuftsOffsetRows, Diameter: layer.tuftsDiameter, Depth: layer.tuftsDepth,
        }),
      });
    }

    const linkButtons = [];
    if (!layer.quiltingAdded) linkButtons.push(`<button class="add-link" data-top-add="quilting" data-idx="${idx}">+ Add Quilting</button>`);
    if (layer.quiltingAdded && !layer.gussetAdded) linkButtons.push(`<button class="add-link" data-top-add="gusset" data-idx="${idx}">+ Add Gusset Quilting</button>`);
    if (!layer.tuftsAdded) linkButtons.push(`<button class="add-link" data-top-add="tufts" data-idx="${idx}">+ Add Tufts</button>`);
    const addLinksHtml = linkButtons.length
      ? `<div class="add-links--in-card">${linkButtons.join('')}</div>`
      : '';

    const hasContent = subCardsHtml || addLinksHtml;
    const baseBodyHtml = hasContent
      ? `<div class="layer-card__nested-body">${subCardsHtml}${addLinksHtml}</div>`
      : '';

    const layerLabel = state.topLayers.length > 1 ? `Mattress Top ${idx + 1}` : 'Mattress Top';
    return makeLayerCard({
      id: `${pfx}Base`, thumbCss: layer.patternCss,
      label: layerLabel, value: getPatternName(layer.patternId),
      showDelete: idx > 0, expanded: layer.expanded, bodyHtml: baseBodyHtml,
    });
  }).join('');

  addLinks.innerHTML = '';
  bindTopMainEvents();
}

function bindTopMainEvents() {
  function layerIdxFromId(id) {
    const m = id.match(/^topL(\d+)/);
    return m ? parseInt(m[1], 10) : 0;
  }

  // Open picker — thumbnail click
  document.querySelectorAll('[data-open-picker]').forEach(btn => {
    if (!btn.closest('#panel-top')) return;
    btn.addEventListener('click', () => {
      const id = btn.dataset.openPicker;
      state.topPickerLayerIdx = layerIdxFromId(id);
      if (id.endsWith('Base'))          state.topPickerCtx = 'base';
      else if (id.endsWith('Quilting')) state.topPickerCtx = 'quilting';
      else if (id.endsWith('Gusset'))   state.topPickerCtx = 'gusset';
      else if (id.endsWith('Tufts'))    state.topPickerCtx = 'tufts';
      state.topSubView = 'picker';
      renderTopPanel();
    });
  });

  // Open picker — settings gear
  document.querySelectorAll('[data-open-picker-settings]').forEach(btn => {
    if (!btn.closest('#panel-top')) return;
    btn.addEventListener('click', () => {
      const id = btn.dataset.openPickerSettings;
      state.topPickerLayerIdx = layerIdxFromId(id);
      if (id.endsWith('Base'))          state.topPickerCtx = 'base';
      else if (id.endsWith('Quilting')) state.topPickerCtx = 'quilting';
      else if (id.endsWith('Gusset'))   state.topPickerCtx = 'gusset';
      else if (id.endsWith('Tufts'))    state.topPickerCtx = 'tufts';
      state.topSubView = 'picker';
      renderTopPanel();
    });
  });

  // Toggle expand
  document.querySelectorAll('[data-toggle-card]').forEach(btn => {
    if (!btn.closest('#panel-top')) return;
    btn.addEventListener('click', () => {
      const id = btn.dataset.toggleCard;
      const idx = layerIdxFromId(id);
      const layer = state.topLayers[idx];
      if (!layer) return;
      if (id.endsWith('Base'))          layer.expanded         = !layer.expanded;
      else if (id.endsWith('Quilting')) layer.quiltingExpanded = !layer.quiltingExpanded;
      else if (id.endsWith('Gusset'))   layer.gussetExpanded   = !layer.gussetExpanded;
      else if (id.endsWith('Tufts'))    layer.tuftsExpanded    = !layer.tuftsExpanded;
      renderTopMain();
    });
  });

  // Delete
  document.querySelectorAll('[data-delete-card]').forEach(btn => {
    if (!btn.closest('#panel-top')) return;
    btn.addEventListener('click', () => {
      const id = btn.dataset.deleteCard;
      const idx = layerIdxFromId(id);
      const layer = state.topLayers[idx];
      if (!layer) return;
      if (id.endsWith('Base'))          { state.topLayers.splice(idx, 1); }
      else if (id.endsWith('Quilting')) { layer.quiltingAdded = false; layer.quiltingExpanded = false; }
      else if (id.endsWith('Gusset'))   { layer.gussetAdded   = false; layer.gussetExpanded   = false; }
      else if (id.endsWith('Tufts'))    { layer.tuftsAdded    = false; layer.tuftsExpanded    = false; }
      renderTopMain();
    });
  });

  // Add sub-items (quilting / gusset / tufts) via data-top-add + data-idx
  document.querySelectorAll('[data-top-add]').forEach(btn => {
    if (!btn.closest('#panel-top')) return;
    btn.addEventListener('click', () => {
      const kind = btn.dataset.topAdd;
      const idx  = parseInt(btn.dataset.idx, 10);
      const layer = state.topLayers[idx];
      if (!layer) return;
      if (kind === 'quilting') { layer.quiltingAdded = true; layer.expanded = true; }
      else if (kind === 'gusset') { layer.gussetAdded = true; layer.expanded = true; }
      else if (kind === 'tufts')  { layer.tuftsAdded  = true; layer.expanded = true; }
      renderTopMain();
    });
  });

  // Add New Layer CTA — use onclick to prevent listener accumulation across re-renders
  const ctaBtn = document.getElementById('topAddLayerCta');
  if (ctaBtn) ctaBtn.onclick = () => {
    state.topLayers.push(makeDefaultTopLayer());
    renderTopMain();
  };

  // Rotation pills
  document.querySelectorAll('.rot-pill').forEach(btn => {
    if (!btn.closest('#panel-top')) return;
    btn.addEventListener('click', () => {
      const idPrefix = btn.dataset.rot;
      const deg      = Number(btn.dataset.deg);
      const idx      = layerIdxFromId(idPrefix);
      const layer    = state.topLayers[idx];
      if (!layer) return;
      if (idPrefix.endsWith('Quilting')) layer.quiltingRotation = deg;
      else if (idPrefix.endsWith('Gusset')) layer.gussetRotation = deg;
      renderTopMain();
    });
  });

  // Number inputs and sliders — scoped per layer
  state.topLayers.forEach((layer, idx) => {
    const pfx = `topL${idx}`;
    if (layer.quiltingAdded) {
      bindNumberInput('#panel-top', `${pfx}QuiltingW`,    v => { layer.quiltingW    = v; });
      bindNumberInput('#panel-top', `${pfx}QuiltingH`,    v => { layer.quiltingH    = v; });
      bindNumberInput('#panel-top', `${pfx}QuiltingPosX`, v => { layer.quiltingPosX = v; });
      bindNumberInput('#panel-top', `${pfx}QuiltingPosY`, v => { layer.quiltingPosY = v; });
      bindSlider('#panel-top', `${pfx}QuiltingDepth`, v => { layer.quiltingDepth = v; const el = document.getElementById(`${pfx}QuiltingDepthNum`); if (el) el.value = v; });
    }
    if (layer.gussetAdded) {
      bindNumberInput('#panel-top', `${pfx}GussetW`,    v => { layer.gussetW    = v; });
      bindNumberInput('#panel-top', `${pfx}GussetH`,    v => { layer.gussetH    = v; });
      bindNumberInput('#panel-top', `${pfx}GussetPosX`, v => { layer.gussetPosX = v; });
      bindNumberInput('#panel-top', `${pfx}GussetPosY`, v => { layer.gussetPosY = v; });
      bindSlider('#panel-top', `${pfx}GussetDepth`, v => { layer.gussetDepth = v; const el = document.getElementById(`${pfx}GussetDepthNum`); if (el) el.value = v; });
    }
    if (layer.tuftsAdded) {
      bindNumberInput('#panel-top', `${pfx}TuftsPosX`,    v => { layer.tuftsPosX    = v; });
      bindNumberInput('#panel-top', `${pfx}TuftsPosY`,    v => { layer.tuftsPosY    = v; });
      bindNumberInput('#panel-top', `${pfx}TuftsColCount`,v => { layer.tuftsColCount = v; });
      bindNumberInput('#panel-top', `${pfx}TuftsColGap`,  v => { layer.tuftsColGap  = v; });
      bindNumberInput('#panel-top', `${pfx}TuftsRowCount`,v => { layer.tuftsRowCount = v; });
      bindNumberInput('#panel-top', `${pfx}TuftsRowGap`,  v => { layer.tuftsRowGap  = v; });
      bindSlider('#panel-top', `${pfx}TuftsDepth`, v => { layer.tuftsDepth = v; const el = document.getElementById(`${pfx}TuftsDepthNum`); if (el) el.value = v; });
    }
  });
}

function renderTopPickerGrid() {
  if (state.topPickerTab === 'colors') {
    syncPickerTabs('topPickerTabStrip', state.topPickerTab);
    renderColorPicker('topPickerGrid', 'topPicker');
    return;
  }
  const subview = document.getElementById('topPicker');
  if (subview) { const sw = subview.querySelector('.picker-search-wrap'); if (sw) sw.hidden = false; }
  document.getElementById('topPickerGrid').style.display = '';

  const allItems = state.topPickerTab === 'pattern'   ? PATTERNS
                 : state.topPickerTab === 'textures'  ? TEXTURES
                 : state.topPickerTab === 'materials' ? MATERIALS : PATTERNS;
  const q = state.topPickerQuery.toLowerCase().trim();
  const visible = q ? allItems.filter(i => i.name.toLowerCase().includes(q)) : allItems;

  const activeLayer = state.topLayers[state.topPickerLayerIdx] || state.topLayers[0];
  let activeId = activeLayer.patternId;
  if (state.topPickerCtx === 'quilting') activeId = activeLayer.quiltingPatternId;
  if (state.topPickerCtx === 'gusset')   activeId = activeLayer.gussetPatternId;

  const grid = document.getElementById('topPickerGrid');
  if (!grid) return;
  grid.innerHTML = visible.map(item => `
    <button class="picker-tile${item.id === activeId ? ' is-active' : ''}" data-pick="${item.id}" data-css="${item.css}">
      <span class="picker-tile__dot"></span>
      <div class="picker-tile__preview ${item.css}"></div>
      <span class="picker-tile__name">${item.name}</span>
    </button>`).join('');

  grid.querySelectorAll('.picker-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const id  = tile.dataset.pick;
      const css = tile.dataset.css;
      const layer = state.topLayers[state.topPickerLayerIdx] || state.topLayers[0];
      if (state.topPickerCtx === 'base')     { layer.patternId = id; layer.patternCss = css; }
      if (state.topPickerCtx === 'quilting') { layer.quiltingPatternId = id; layer.quiltingPatternCss = css; }
      if (state.topPickerCtx === 'gusset')   { layer.gussetPatternId   = id; layer.gussetPatternCss   = css; }
      grid.querySelectorAll('.picker-tile').forEach(t => t.classList.toggle('is-active', t.dataset.pick === id));
    });
  });

  syncPickerTabs('topPickerTabStrip', state.topPickerTab);
  document.querySelectorAll('#topPickerTabStrip .picker-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.topPickerTab = btn.dataset.tab;
      renderTopPickerGrid();
    });
  });
}


// ── Wall panel ────────────────────────────────────────────

function renderWallPanel() {
  showSubView('wall', state.wallSubView);
  if (state.wallSubView === 'main') renderWallMain();
  else renderWallPickerGrid();
}

function renderWallMain() {
  const hasItems = state.wallQuiltingAdded || state.wallTuftsAdded;
  document.getElementById('wallEmptyState').hidden = hasItems;
  document.getElementById('wallLayerStack').hidden  = !hasItems;
  document.getElementById('wallAddLinks').hidden    = !hasItems;

  if (!hasItems) return;

  const stack = document.getElementById('wallLayerStack');
  const addLinks = document.getElementById('wallAddLinks');
  let cards = '';

  if (state.wallQuiltingAdded) {
    cards += makeLayerCard({
      id: 'wallQuilting', thumbCss: state.wallQuiltingPatternCss,
      label: 'Mattress Wall', value: getPatternName(state.wallQuiltingPatternId),
      showDelete: true, expanded: state.wallQuiltingExpanded,
      bodyHtml: quiltingBodyHTML('wallQuilting', state),
    });
  }

  if (state.wallTuftsAdded) {
    cards += makeLayerCard({
      id: 'wallTufts', thumbCss: 'ptn-buttons',
      label: 'Tufts', value: getWallTuftName(),
      showDelete: true, expanded: state.wallTuftsExpanded,
      bodyHtml: tuftsBodyHTML('wallTufts', state),
    });
  }

  stack.innerHTML = cards;

  const links = [];
  if (!state.wallTuftsAdded) links.push(`<button class="add-link" id="wallAddTufts">+ Add Tufts</button>`);
  addLinks.innerHTML = links.join('');

  bindWallMainEvents();
}

function bindWallMainEvents() {
  document.querySelectorAll('[data-open-picker]').forEach(btn => {
    if (!btn.closest('#panel-wall')) return;
    btn.addEventListener('click', () => {
      const id = btn.dataset.openPicker;
      if (id === 'wallQuilting') state.wallPickerCtx = 'quilting';
      state.wallSubView = 'picker';
      renderWallPanel();
    });
  });
  document.querySelectorAll('[data-toggle-card]').forEach(btn => {
    if (!btn.closest('#panel-wall')) return;
    btn.addEventListener('click', () => {
      const id = btn.dataset.toggleCard;
      if (id === 'wallQuilting') state.wallQuiltingExpanded = !state.wallQuiltingExpanded;
      if (id === 'wallTufts')    state.wallTuftsExpanded    = !state.wallTuftsExpanded;
      renderWallMain();
    });
  });
  document.querySelectorAll('[data-delete-card]').forEach(btn => {
    if (!btn.closest('#panel-wall')) return;
    btn.addEventListener('click', () => {
      const id = btn.dataset.deleteCard;
      if (id === 'wallQuilting') { state.wallQuiltingAdded = false; state.wallQuiltingExpanded = false; }
      if (id === 'wallTufts')    { state.wallTuftsAdded    = false; state.wallTuftsExpanded    = false; }
      renderWallMain();
    });
  });
  bindAddLink('wallAddTufts', () => { state.wallTuftsAdded = true; renderWallMain(); });
  document.querySelectorAll('.rot-pill').forEach(btn => {
    if (!btn.closest('#panel-wall')) return;
    btn.addEventListener('click', () => {
      if (btn.dataset.rot === 'wallQuilting') state.wallQuiltingRotation = Number(btn.dataset.deg);
      renderWallMain();
    });
  });
  bindSlider('#panel-wall', 'wallQuiltingDepth', v => { state.wallQuiltingDepth = v; const el = document.getElementById('wallQuiltingDepthNum'); if (el) el.value = v; });
  bindSlider('#panel-wall', 'wallTuftsDepth',    v => { state.wallTuftsDepth    = v; const el = document.getElementById('wallTuftsDepthNum');    if (el) el.value = v; });
}

function renderWallPickerGrid() {
  renderGenericPickerGrid('wallPickerGrid', 'wallPickerTabStrip', state.wallPickerTab, state.wallPickerQuery, state.wallQuiltingPatternId, (id, css) => {
    if (state.wallPickerCtx === 'quilting') { state.wallQuiltingPatternId = id; state.wallQuiltingPatternCss = css; }
  });
  document.querySelectorAll('#wallPickerTabStrip .picker-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.wallPickerTab = btn.dataset.tab;
      syncPickerTabs('wallPickerTabStrip', state.wallPickerTab);
      renderWallPickerGrid();
    });
  });
}


// ── Bottom panel ──────────────────────────────────────────

function bottomCompactBodyHTML() {
  const s = state;
  return `<div class="compact-body">
    <div class="compact-row">
      <span class="compact-label">Sizing</span>
      <div class="compact-fields">
        <div class="compact-field"><span class="compact-field-lbl">W</span><input class="compact-input" id="bottomW" type="number" value="${s.bottomW}"></div>
        <button class="lock-btn compact-lock" title="Link"><span class="material-symbols-outlined">lock_open</span></button>
        <div class="compact-field"><span class="compact-field-lbl">H</span><input class="compact-input" id="bottomH" type="number" value="${s.bottomH}"></div>
      </div>
    </div>
    <div class="compact-row">
      <span class="compact-label">Position</span>
      <div class="compact-fields">
        <div class="compact-field"><span class="compact-field-lbl">X</span><input class="compact-input" id="bottomPosX" type="number" value="${s.bottomPosX}"></div>
        <button class="lock-btn compact-lock" title="Link"><span class="material-symbols-outlined">lock_open</span></button>
        <div class="compact-field"><span class="compact-field-lbl">Y</span><input class="compact-input" id="bottomPosY" type="number" value="${s.bottomPosY}"></div>
      </div>
    </div>
    <div class="compact-row">
      <span class="compact-label">Rotation</span>
      <div class="compact-rotation">${[0,90,180,270].map(d =>
        `<button class="rot-pill${s.bottomRotation === d ? ' is-active' : ''}" data-rot="bottom" data-deg="${d}">${d}</button>`
      ).join('')}</div>
    </div>
    <div class="compact-depth-block">
      <div class="compact-row">
        <span class="compact-label">Depth</span>
        <input class="compact-input compact-depth-num" id="bottomDepthNum" type="number" min="0" max="100" value="${s.bottomDepth}">
      </div>
      <input class="form-range" id="bottomDepth" type="range" min="0" max="100" step="1" value="${s.bottomDepth}">
    </div>
  </div>`;
}

function renderBottomPanel() {
  showSubView('bottom', state.bottomSubView);
  if (state.bottomSubView === 'main') renderBottomMain();
  else renderBottomPickerGrid();
}

function renderBottomMain() {
  // Type selector row
  const typeRow = document.getElementById('bottomTypeRow');
  const bt = BOTTOM_TYPES.find(t => t.id === state.bottomTypeId) || BOTTOM_TYPES[2];
  if (typeRow) {
    typeRow.innerHTML = `<button class="bottom-type-btn" id="bottomTypeBtn">
      <div class="layer-card__thumb ${bt.css} bottom-type-thumb"></div>
      <div class="bottom-type-info">
        <span class="bottom-type-label">Size</span>
        <span class="bottom-type-value">${bt.name}</span>
      </div>
      <span class="material-symbols-outlined bottom-type-chevron">chevron_right</span>
    </button>`;
    document.getElementById('bottomTypeBtn').addEventListener('click', () => {
      state.bottomPickerCtx = 'type';
      state.bottomSubView = 'picker';
      renderBottomPanel();
    });
  }

  // Mirror toggle
  const toggle = document.getElementById('bottomMirrorToggle');
  if (toggle) {
    toggle.checked = state.bottomMirrored;
    toggle.setAttribute('aria-checked', String(state.bottomMirrored));
    toggle.onchange = () => {
      state.bottomMirrored = toggle.checked;
      toggle.setAttribute('aria-checked', String(toggle.checked));
      renderBottomMain();
    };
  }

  // Layer card
  const stack = document.getElementById('bottomLayerStack');
  if (!stack) return;

  stack.innerHTML = makeLayerCard({
    id: 'bottomBase', thumbCss: state.bottomPatternCss,
    label: 'Mattress Bottom', value: getPatternName(state.bottomPatternId),
    showDelete: false, expanded: state.bottomExpanded,
    bodyHtml: bottomCompactBodyHTML(),
  });

  if (state.bottomMirrored) {
    const wrap = stack.querySelector('.layer-card-wrap');
    if (wrap) wrap.classList.add('layer-card--dimmed');
  }

  if (!state.bottomMirrored) {
    stack.querySelectorAll('[data-open-picker="bottomBase"]').forEach(btn => {
      btn.addEventListener('click', () => { state.bottomPickerCtx = 'base'; state.bottomSubView = 'picker'; renderBottomPanel(); });
    });
    stack.querySelectorAll('[data-open-picker-settings="bottomBase"]').forEach(btn => {
      btn.addEventListener('click', () => { state.bottomPickerCtx = 'base'; state.bottomSubView = 'picker'; renderBottomPanel(); });
    });
  }

  const toggleBtn = stack.querySelector('[data-toggle-card="bottomBase"]');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => { state.bottomExpanded = !state.bottomExpanded; renderBottomMain(); });
  }

  document.querySelectorAll('.rot-pill').forEach(btn => {
    if (!btn.closest('#panel-bottom')) return;
    btn.addEventListener('click', () => { state.bottomRotation = Number(btn.dataset.deg); renderBottomMain(); });
  });

  bindSlider('#panel-bottom', 'bottomDepth', v => {
    state.bottomDepth = v;
    const numEl = document.getElementById('bottomDepthNum');
    if (numEl) numEl.value = v;
  });

  bindNumberInput('#panel-bottom', 'bottomW',    v => { state.bottomW = v; });
  bindNumberInput('#panel-bottom', 'bottomH',    v => { state.bottomH = v; });
  bindNumberInput('#panel-bottom', 'bottomPosX', v => { state.bottomPosX = v; });
  bindNumberInput('#panel-bottom', 'bottomPosY', v => { state.bottomPosY = v; });
}

function renderBottomPickerGrid() {
  const isType = state.bottomPickerCtx === 'type';
  if (isType) {
    // Show type list (no tabs needed)
    syncPickerTabs('bottomPickerTabStrip', 'pattern');
    const grid = document.getElementById('bottomPickerGrid');
    if (!grid) return;
    grid.innerHTML = BOTTOM_TYPES.map(t => `
      <button class="picker-tile${t.id === state.bottomTypeId ? ' is-active' : ''}" data-pick="${t.id}" data-css="${t.css}">
        <span class="picker-tile__dot"></span>
        <div class="picker-tile__preview ${t.css}"></div>
        <span class="picker-tile__name">${t.name}</span>
      </button>`).join('');
    grid.querySelectorAll('.picker-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        state.bottomTypeId  = tile.dataset.pick;
        state.bottomTypeCss = tile.dataset.css;
        grid.querySelectorAll('.picker-tile').forEach(t => t.classList.toggle('is-active', t.dataset.pick === tile.dataset.pick));
      });
    });
    return;
  }

  renderGenericPickerGrid('bottomPickerGrid', 'bottomPickerTabStrip', state.bottomPickerTab, state.bottomPickerQuery, state.bottomPatternId, (id, css) => {
    state.bottomPatternId  = id;
    state.bottomPatternCss = css;
  });
  document.querySelectorAll('#bottomPickerTabStrip .picker-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.bottomPickerTab = btn.dataset.tab;
      syncPickerTabs('bottomPickerTabStrip', state.bottomPickerTab);
      renderBottomPickerGrid();
    });
  });
}


// ── Accessories panel ─────────────────────────────────────

function renderAccessoriesPanel() {
  syncAccTabs();
  renderCurrentAccTab();
}

function syncAccTabs() {
  document.querySelectorAll('.acc-tab').forEach(btn => {
    const active = btn.dataset.accTab === state.accessoriesTab;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', String(active));
  });
  document.getElementById('accTabTape').hidden   = state.accessoriesTab !== 'tape';
  document.getElementById('accTabLabel').hidden  = state.accessoriesTab !== 'label';
  document.getElementById('accTabHandle').hidden = state.accessoriesTab !== 'handle';
}

function renderCurrentAccTab() {
  if (state.accessoriesTab === 'tape')   renderTapeTab();
  if (state.accessoriesTab === 'label')  renderLabelTab();
  if (state.accessoriesTab === 'handle') renderHandleTab();
}

function renderTapeTab() {
  showAccSubView('tapeMain', 'tapePicker', state.tapeSubView);
  if (state.tapeSubView === 'main') {
    const empty = document.getElementById('tapeEmptyState');
    const stack = document.getElementById('tapeCardStack');
    const cta   = document.getElementById('tapeCta');
    empty.hidden = state.tapeAdded;
    stack.hidden = !state.tapeAdded;
    cta.hidden   = !state.tapeAdded;
    if (state.tapeAdded) {
      const style = TAPE_STYLES.find(t => t.id === state.tapeStyleId) || TAPE_STYLES[0];
      stack.innerHTML = makeLayerCard({
        id: 'tapeCard', thumbCss: state.tapeStyleCss,
        label: 'Tape', value: style.name,
        showDelete: true, expanded: false,
        bodyHtml: layerCardBodyHTML(`
          <div class="acc-props">
            <div class="acc-prop-group"><span class="acc-prop-label">Scale</span>
              <div class="xyz-inputs">
                ${xyzInput('tapeScaleX','X',state.tapeScaleX)}
                ${xyzInput('tapeScaleY','Y',state.tapeScaleY)}
                ${xyzInput('tapeScaleZ','Z',state.tapeScaleZ)}
              </div>
            </div>
            ${propGroupHTML('Position', sliderRowHTML('Position', 'tapePosition', 0, 1, 0.01, state.tapePosition))}
            <button class="reset-link" id="tapeResetScale"><span class="material-symbols-outlined">restart_alt</span>Reset Scale</button>
          </div>
        `),
      });
      const delBtn = stack.querySelector('[data-delete-card="tapeCard"]');
      if (delBtn) delBtn.addEventListener('click', () => { state.tapeAdded = false; renderTapeTab(); });
      bindSlider('#panel-details', 'tapePosition', v => { state.tapePosition = v; });
    }
  } else {
    renderAccPickerGrid('tapePickerGrid', TAPE_STYLES, state.tapePickerQuery, state.tapeStyleId, (id, css) => {
      state.tapeStyleId  = id;
      state.tapeStyleCss = css;
      state.tapeAdded    = true;
      state.tapeSubView  = 'main';
      renderTapeTab();
    });
  }
}

function renderLabelTab() {
  showAccSubView('labelMain', 'labelPicker', state.labelSubView);
  if (state.labelSubView === 'main') {
    const empty = document.getElementById('labelEmptyState');
    const stack = document.getElementById('labelCardStack');
    const cta   = document.getElementById('labelCta');
    empty.hidden = state.labelAdded;
    stack.hidden = !state.labelAdded;
    cta.hidden   = !state.labelAdded;
    if (state.labelAdded) {
      const lbl = LABEL_TYPES.find(l => l.id === state.labelTypeId) || LABEL_TYPES[0];
      stack.innerHTML = makeLayerCard({
        id: 'labelCard', thumbCss: state.labelTypeCss,
        label: 'Label', value: lbl.name,
        showDelete: true, expanded: false,
        bodyHtml: layerCardBodyHTML(`
          <div class="acc-props">
            <div class="acc-prop-group"><span class="acc-prop-label">Side</span>
              <select class="form-select" id="labelSideSelect">
                ${['front','back','left','right'].map(s => `<option value="${s}"${state.labelSide===s?' selected':''}>${capitalize(s)}</option>`).join('')}
              </select>
            </div>
            <div class="acc-prop-group"><span class="acc-prop-label">Scale</span>
              <div class="xyz-inputs">${xyzInput('labelScaleX','X',state.labelScaleX)}${xyzInput('labelScaleY','Y',state.labelScaleY)}${xyzInput('labelScaleZ','Z',state.labelScaleZ)}</div>
            </div>
            <div class="acc-prop-group"><span class="acc-prop-label">Position</span>
              <div class="xyz-inputs">${xyzInput('labelPosX','X',state.labelPosX)}${xyzInput('labelPosY','Y',state.labelPosY)}${xyzInput('labelPosZ','Z',state.labelPosZ)}</div>
            </div>
            <div class="acc-checkbox-group">
              <label class="acc-checkbox"><input type="checkbox" id="labelAdjacent"${state.labelAdjacent?' checked':''}>Adjacent Object</label>
              <label class="acc-checkbox"><input type="checkbox" id="labelMirror"${state.labelMirror?' checked':''}>Mirror Object</label>
            </div>
          </div>
        `),
      });
      const delBtn = stack.querySelector('[data-delete-card="labelCard"]');
      if (delBtn) delBtn.addEventListener('click', () => { state.labelAdded = false; renderLabelTab(); });
      bindCheckbox('#panel-details', 'labelAdjacent', v => { state.labelAdjacent = v; });
      bindCheckbox('#panel-details', 'labelMirror',   v => { state.labelMirror   = v; });
    }
  } else {
    renderAccPickerGrid('labelPickerGrid', LABEL_TYPES, state.labelPickerQuery, state.labelTypeId, (id, css) => {
      state.labelTypeId  = id;
      state.labelTypeCss = css;
      state.labelAdded   = true;
      state.labelSubView = 'main';
      renderLabelTab();
    });
  }
}

function renderHandleTab() {
  showAccSubView('handleMain', 'handlePicker', state.handleSubView);
  if (state.handleSubView === 'main') {
    const empty = document.getElementById('handleEmptyState');
    const stack = document.getElementById('handleCardStack');
    const cta   = document.getElementById('handleCta');
    empty.hidden = state.handleAdded;
    stack.hidden = !state.handleAdded;
    cta.hidden   = !state.handleAdded;
    if (state.handleAdded) {
      const hdl = HANDLE_TYPES.find(h => h.id === state.handleTypeId) || HANDLE_TYPES[0];
      stack.innerHTML = makeLayerCard({
        id: 'handleCard', thumbCss: state.handleTypeCss,
        label: 'Handle', value: hdl.name,
        showDelete: true, expanded: false,
        bodyHtml: layerCardBodyHTML(`
          <div class="acc-props">
            <div class="acc-prop-group"><span class="acc-prop-label">Side</span>
              <select class="form-select" id="handleSideSelect">
                ${['front','back','left','right'].map(s => `<option value="${s}"${state.handleSide===s?' selected':''}>${capitalize(s)}</option>`).join('')}
              </select>
            </div>
            <div class="acc-prop-group"><span class="acc-prop-label">Scale</span>
              <div class="xyz-inputs">${xyzInput('handleScaleX','X',state.handleScaleX)}${xyzInput('handleScaleY','Y',state.handleScaleY)}${xyzInput('handleScaleZ','Z',state.handleScaleZ)}</div>
            </div>
            <div class="acc-prop-group"><span class="acc-prop-label">Position</span>
              <div class="xyz-inputs">${xyzInput('handlePosX','X',state.handlePosX)}${xyzInput('handlePosY','Y',state.handlePosY)}${xyzInput('handlePosZ','Z',state.handlePosZ)}</div>
            </div>
            <div class="acc-checkbox-group">
              <label class="acc-checkbox"><input type="checkbox" id="handleAdjacent"${state.handleAdjacent?' checked':''}>Adjacent Object</label>
              <label class="acc-checkbox"><input type="checkbox" id="handleMirror"${state.handleMirror?' checked':''}>Mirror Object</label>
            </div>
          </div>
        `),
      });
      const delBtn = stack.querySelector('[data-delete-card="handleCard"]');
      if (delBtn) delBtn.addEventListener('click', () => { state.handleAdded = false; renderHandleTab(); });
      bindCheckbox('#panel-details', 'handleAdjacent', v => { state.handleAdjacent = v; });
      bindCheckbox('#panel-details', 'handleMirror',   v => { state.handleMirror   = v; });
    }
  } else {
    renderAccPickerGrid('handlePickerGrid', HANDLE_TYPES, state.handlePickerQuery, state.handleTypeId, (id, css) => {
      state.handleTypeId  = id;
      state.handleTypeCss = css;
      state.handleAdded   = true;
      state.handleSubView = 'main';
      renderHandleTab();
    });
  }
}

function renderAccPickerGrid(gridId, items, query, activeId, onSelect) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  const q = query.toLowerCase().trim();
  const visible = q ? items.filter(i => i.name.toLowerCase().includes(q)) : items;
  grid.innerHTML = visible.map(item => `
    <button class="picker-tile${item.id === activeId ? ' is-active' : ''}" data-pick="${item.id}" data-css="${item.css}">
      <span class="picker-tile__dot"></span>
      <div class="picker-tile__preview ${item.css}"></div>
      <span class="picker-tile__name">${item.name}</span>
    </button>`).join('');
  grid.querySelectorAll('.picker-tile').forEach(tile => {
    tile.addEventListener('click', () => onSelect(tile.dataset.pick, tile.dataset.css));
  });
}

function xyzInput(id, label, val) {
  return `<div class="xyz-input-item"><span class="xyz-input-item-label">${label}</span><input class="form-input" id="${id}" type="number" value="${val}"></div>`;
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }


// ── Images panel ──────────────────────────────────────────

function renderImagesPanel() {
  document.querySelectorAll('[data-images-tab]').forEach(btn => {
    const active = btn.dataset.imagesTab === state.imagesTab;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', String(active));
  });
  document.getElementById('imagesTabPreview').hidden = state.imagesTab !== 'preview';
  document.getElementById('imagesTabRenders').hidden = state.imagesTab !== 'renders';

  const previews = state.previewImages;
  const renders  = state.renderImages;

  document.getElementById('imagesPreviewEmpty').hidden = previews.length > 0;
  document.getElementById('imagesPreviewList').hidden  = previews.length === 0;
  document.getElementById('imagesRendersEmpty').hidden = renders.length > 0;
  document.getElementById('imagesRendersList').hidden  = renders.length === 0;

  document.getElementById('imagesPreviewList').innerHTML = previews.map(img => imageTileHTML(img)).join('');
  document.getElementById('imagesRendersList').innerHTML = renders.map(img => imageTileHTML(img)).join('');
}

function imageTileHTML(img) {
  return `<div class="image-tile">
    <div class="image-tile__thumb">${img.src ? `<img src="${img.src}" style="width:100%;height:100%;object-fit:cover;" alt="">` : ''}</div>
    <div class="image-tile__info">
      <span class="image-tile__name">${img.name}</span>
      <span class="image-tile__date">${relativeTime(img.createdAt)}</span>
    </div>
    <span class="material-symbols-outlined image-tile__more">more_horiz</span>
  </div>`;
}

function relativeTime(iso) {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins/60)}h ago`;
}


// ── Layers panel (internal) ───────────────────────────────

function renderLayersPanel() {
  showSubView('internal', state.layersSubView);
  if (state.layersSubView === 'main') renderLayersMain();
  else renderLayersPickerGrid();
}

function renderLayersMain() {
  const stack = document.getElementById('layersStack');
  if (!stack) return;
  stack.innerHTML = state.layers.map(layer => {
    const isExpanded = layer.id === state.layersExpandedId;
    return `
    <div class="layer-card-wrap" id="wrap-${layer.id}">
      <div class="layer-card">
        <span class="layer-card__drag material-symbols-outlined">drag_indicator</span>
        <button class="layer-card__trigger" data-layer-id="${layer.id}">
          <div class="layer-card__thumb ${layer.css}"></div>
          <div class="layer-card__info">
            <span class="layer-card__label">Layer</span>
            <span class="layer-card__value">${layer.name}</span>
          </div>
        </button>
        <div class="layer-card__actions">
          <button class="icon-btn" data-open-picker-settings="${layer.id}" title="Style"><span class="material-symbols-outlined">palette</span></button>
          <button class="icon-btn icon-btn--danger" data-delete-layer="${layer.id}" title="Delete"><span class="material-symbols-outlined">delete</span></button>
          <button class="icon-btn" data-toggle-layer="${layer.id}" aria-expanded="${isExpanded}">
            <span class="material-symbols-outlined">${isExpanded ? 'expand_less' : 'expand_more'}</span>
          </button>
        </div>
      </div>
      ${isExpanded ? `<div class="layer-card__body">
        <div class="layer-height-field">
          <div class="layer-height-row">
            <span class="layer-height-label">Height (in)</span>
            <input class="form-input layer-height-input" data-layer-thickness="${layer.id}" type="number" value="${layer.thickness.toFixed(2)}" step="0.1" min="0.1">
          </div>
          <input class="form-range" data-layer-slider="${layer.id}" type="range" min="0.1" max="8" step="0.1" value="${layer.thickness}">
        </div>
      </div>` : ''}
    </div>`;
  }).join('');

  // Bind events
  stack.querySelectorAll('[data-toggle-layer]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.toggleLayer;
      state.layersExpandedId = state.layersExpandedId === id ? null : id;
      renderLayersMain();
      updateViewportLabel();
    });
  });
  stack.querySelectorAll('[data-delete-layer]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.deleteLayer;
      state.layers = state.layers.filter(l => l.id !== id);
      if (state.layersExpandedId === id) state.layersExpandedId = null;
      renderLayersMain();
      updateViewportLabel();
      syncViewport();
    });
  });
  stack.querySelectorAll('[data-layer-thickness]').forEach(input => {
    input.addEventListener('change', () => {
      const id = input.dataset.layerThickness;
      const layer = state.layers.find(l => l.id === id);
      if (layer) { layer.thickness = Math.max(0.1, Number(input.value)); syncViewport(); }
    });
  });
  stack.querySelectorAll('[data-layer-slider]').forEach(input => {
    input.addEventListener('input', () => {
      const id = input.dataset.layerSlider;
      const layer = state.layers.find(l => l.id === id);
      if (layer) { layer.thickness = Number(input.value); renderLayersMain(); syncViewport(); }
    });
  });
}

function renderLayersPickerGrid() {
  const grid = document.getElementById('layersPickerGrid');
  if (!grid) return;
  const q = state.layersPickerQuery.toLowerCase().trim();
  const visible = q ? LAYER_TEMPLATES.filter(t => t.name.toLowerCase().includes(q)) : LAYER_TEMPLATES;
  grid.innerHTML = visible.map(t => `
    <button class="picker-tile" data-template="${t.id}">
      <div class="picker-tile__preview ${t.css}"></div>
      <span class="picker-tile__name">${t.name}</span>
    </button>`).join('');
  grid.querySelectorAll('.picker-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const newLayer = createLayer(tile.dataset.template);
      state.layers.push(newLayer);
      state.layersSubView  = 'main';
      state.layersExpandedId = newLayer.id;
      renderLayersPanel();
      updateViewportLabel();
      syncViewport();
    });
  });
}


// ── Camera panel ──────────────────────────────────────────

function renderCameraPanel() {
  const main    = document.getElementById('cameraMain');
  const create  = document.getElementById('cameraCreate');
  const presets = document.getElementById('cameraPresets');
  if (main)    main.hidden    = state.cameraSubView !== 'main';
  if (create)  create.hidden  = state.cameraSubView !== 'create';
  if (presets) presets.hidden = state.cameraSubView !== 'presets';
  if (state.cameraSubView === 'main')    renderCameraMain();
  if (state.cameraSubView === 'presets') renderCameraPresetGrid();
}

function renderCameraMain() {
  const list  = document.getElementById('cameraList');
  const empty = document.getElementById('cameraEmpty');
  if (!list) return;

  if (state.cameras.length === 0) {
    list.innerHTML = '';
    if (empty) { empty.hidden = false; list.appendChild(empty); }
    return;
  }

  if (empty) empty.hidden = true;
  const cards = state.cameras.map(cam => `
    <div class="camera-card-wrap" id="cam-wrap-${cam.id}">
      <div class="camera-card">
        <span class="material-symbols-outlined camera-card__icon">videocam</span>
        <div class="camera-card__info">
          <span class="camera-card__name">${cam.name}</span>
          <span class="camera-card__type">${cam.preset ? 'Preset · ' + cam.preset : 'Custom'}</span>
        </div>
        <div class="camera-card__actions">
          <button class="icon-btn icon-btn--danger" data-delete-camera="${cam.id}" title="Delete">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
    </div>`).join('');
  list.innerHTML = cards;
  list.querySelectorAll('[data-delete-camera]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.cameras = state.cameras.filter(c => c.id !== btn.dataset.deleteCamera);
      renderCameraMain();
    });
  });
}

function renderCameraPresetGrid() {
  const grid = document.getElementById('cameraPresetGrid');
  if (!grid) return;
  const q = state.cameraPresetQuery.toLowerCase().trim();
  const visible = q ? CAMERA_PRESETS.filter(p => p.name.toLowerCase().includes(q)) : CAMERA_PRESETS;
  grid.innerHTML = visible.map(p => `
    <button class="picker-tile" data-preset-id="${p.id}">
      <div class="picker-tile__preview camera-preset-icon">
        <span class="material-symbols-outlined">videocam</span>
      </div>
      <span class="picker-tile__name">${p.name}</span>
    </button>`).join('');
  grid.querySelectorAll('.picker-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const preset = CAMERA_PRESETS.find(p => p.id === tile.dataset.presetId);
      if (!preset) return;
      state.cameras.push({ id: `cam-${Date.now()}`, name: preset.name, preset: preset.name });
      state.cameraSubView = 'main';
      renderCameraPanel();
    });
  });
}


// ── Layout panel (internal) ───────────────────────────────

function renderLayoutPanel() {
  syncLayoutSections();
  renderCutawayLayers();
}

function syncLayoutSections() {
  const sections = ['exploded', 'innerBuild', 'cutaway'];
  const sectionMap = { exploded: 'exploded', innerBuild: 'inner-build', cutaway: 'cutaway' };

  document.getElementById('layoutSectionExploded').classList.toggle('is-active',   state.activeLayout === 'exploded');
  document.getElementById('layoutSectionInnerBuild').classList.toggle('is-active', state.activeLayout === 'inner-build');
  document.getElementById('layoutSectionCutaway').classList.toggle('is-active',    state.activeLayout === 'cutaway');

  const explodedBody = document.getElementById('layoutExplodedBody');
  if (explodedBody) explodedBody.hidden = state.activeLayout !== 'exploded';
  const cutawayBody = document.getElementById('layoutCutawayBody');
  if (cutawayBody) cutawayBody.hidden = state.activeLayout !== 'cutaway';

  const explodedChevron = document.getElementById('layoutExplodedChevron');
  if (explodedChevron) explodedChevron.textContent = state.activeLayout === 'exploded' ? 'expand_less' : 'expand_more';
  const cutawayChevron = document.getElementById('layoutCutawayChevron');
  if (cutawayChevron) cutawayChevron.textContent = state.activeLayout === 'cutaway' ? 'expand_less' : 'expand_more';
}

function renderCutawayLayers() {
  const container = document.getElementById('layoutCutawayLayers');
  if (!container) return;
  container.innerHTML = state.layers.map(layer => `
    <div class="cutaway-layer-row">
      <div class="cutaway-layer-name">${layer.name}</div>
      <div class="cutaway-slider-pair">
        <input class="form-range" type="range" min="0" max="1" step="0.05" value="${layer.frontCut}">
        <button class="lock-btn" title="Link sides"><span class="material-symbols-outlined">lock_open</span></button>
        <input class="form-range" type="range" min="0" max="1" step="0.05" value="${layer.sideCut}">
        <span class="cutaway-slider-val">${layer.frontCut.toFixed(2)}</span>
      </div>
    </div>`).join('');

  container.querySelectorAll('.cutaway-layer-row').forEach((row, i) => {
    const layer = state.layers[i];
    const [frontSlider, sideSlider] = row.querySelectorAll('input[type="range"]');
    const valEl = row.querySelector('.cutaway-slider-val');
    if (frontSlider) {
      frontSlider.addEventListener('input', () => {
        layer.frontCut = Number(frontSlider.value);
        if (valEl) valEl.textContent = layer.frontCut.toFixed(2);
        syncViewport();
      });
    }
    if (sideSlider) {
      sideSlider.addEventListener('input', () => {
        layer.sideCut = Number(sideSlider.value);
        syncViewport();
      });
    }
  });
}


// ── Color picker ─────────────────────────────────────────

function hsvToRgb(h, s, v) {
  s /= 100; v /= 100;
  const f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
  return [Math.round(f(5) * 255), Math.round(f(3) * 255), Math.round(f(1) * 255)];
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return [255, 255, 255];
  return [parseInt(clean.slice(0,2), 16), parseInt(clean.slice(2,4), 16), parseInt(clean.slice(4,6), 16)];
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
  }
  return [Math.round(h), max === 0 ? 0 : Math.round((d / max) * 100), Math.round(max * 100)];
}

function renderColorPicker(gridId, subviewId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  // Hide search wrap while colors tab is active
  const subview = document.getElementById(subviewId);
  if (subview) {
    const sw = subview.querySelector('.picker-search-wrap');
    if (sw) sw.hidden = true;
  }

  const hex = rgbToHex(...hsvToRgb(state.pickerH, state.pickerS, state.pickerV));
  const cursorLeft = state.pickerS;
  const cursorTop  = 100 - state.pickerV;

  grid.style.display = 'block';
  grid.innerHTML = `
    <div class="color-picker-container">
      <div class="color-picker-field" id="${gridId}Field"
           style="background: linear-gradient(to bottom, transparent, #000), linear-gradient(to right, #fff, hsl(${state.pickerH},100%,50%));">
        <div class="color-picker-cursor" id="${gridId}Cursor" style="left:${cursorLeft}%;top:${cursorTop}%;"></div>
      </div>
      <div class="color-picker-hue-wrap">
        <input class="color-picker-hue" id="${gridId}Hue" type="range" min="0" max="360" step="1" value="${state.pickerH}">
      </div>
      <div class="color-hex-row">
        <span class="color-hex-label">HEX</span>
        <input class="form-input color-hex-input" id="${gridId}Hex" type="text" value="${hex.replace('#','')}" maxlength="6" spellcheck="false">
        <div class="color-preview-dot" id="${gridId}Preview" style="background:${hex};"></div>
      </div>
    </div>`;

  initColorPickerEvents(gridId);
}

function initColorPickerEvents(gridId) {
  const field   = document.getElementById(`${gridId}Field`);
  const cursor  = document.getElementById(`${gridId}Cursor`);
  const hueEl   = document.getElementById(`${gridId}Hue`);
  const hexEl   = document.getElementById(`${gridId}Hex`);
  const preview = document.getElementById(`${gridId}Preview`);
  if (!field || !hueEl || !hexEl) return;

  function updateFromHsv() {
    field.style.background = `linear-gradient(to bottom, transparent, #000), linear-gradient(to right, #fff, hsl(${state.pickerH},100%,50%))`;
    cursor.style.left = `${state.pickerS}%`;
    cursor.style.top  = `${100 - state.pickerV}%`;
    const hex = rgbToHex(...hsvToRgb(state.pickerH, state.pickerS, state.pickerV));
    hexEl.value = hex.replace('#', '');
    preview.style.background = hex;
    hueEl.value = state.pickerH;
  }

  function pickFromField(e) {
    const rect = field.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top)  / rect.height));
    state.pickerS = Math.round(x * 100);
    state.pickerV = Math.round((1 - y) * 100);
    updateFromHsv();
  }

  let dragging = false;
  field.addEventListener('mousedown', e => { dragging = true; pickFromField(e); e.preventDefault(); });
  document.addEventListener('mousemove', e => { if (dragging) pickFromField(e); });
  document.addEventListener('mouseup', () => { dragging = false; });

  hueEl.addEventListener('input', () => {
    state.pickerH = Number(hueEl.value);
    updateFromHsv();
  });

  hexEl.addEventListener('change', () => {
    const clean = hexEl.value.replace('#', '');
    if (/^[0-9a-fA-F]{6}$/.test(clean)) {
      const [r, g, b] = hexToRgb(clean);
      [state.pickerH, state.pickerS, state.pickerV] = rgbToHsv(r, g, b);
      updateFromHsv();
    }
  });
}

function restorePickerSearch(subviewId) {
  const subview = document.getElementById(subviewId);
  if (subview) {
    const sw = subview.querySelector('.picker-search-wrap');
    if (sw) sw.hidden = false;
  }
  const grid = document.getElementById(subviewId.replace('Picker', 'PickerGrid').replace('picker', 'PickerGrid'));
  if (grid) grid.style.display = '';
}


// ── Generic picker helpers ────────────────────────────────

function renderGenericPickerGrid(gridId, tabStripId, activeTab, query, activeId, onSelect) {
  syncPickerTabs(tabStripId, activeTab);

  // Resolve subview id from tabStrip id — e.g. "wallPickerTabStrip" → "wallPicker"
  const subviewId = tabStripId.replace('TabStrip', '');
  if (activeTab === 'colors') {
    renderColorPicker(gridId, subviewId);
    return;
  }
  const subview = document.getElementById(subviewId);
  if (subview) { const sw = subview.querySelector('.picker-search-wrap'); if (sw) sw.hidden = false; }
  const gridEl = document.getElementById(gridId);
  if (gridEl) gridEl.style.display = '';

  const items = activeTab === 'pattern'   ? PATTERNS
              : activeTab === 'textures'  ? TEXTURES
              : activeTab === 'materials' ? MATERIALS : PATTERNS;
  const grid = document.getElementById(gridId);
  if (!grid) return;
  const q = query.toLowerCase().trim();
  const visible = q ? items.filter(i => i.name.toLowerCase().includes(q)) : items;
  grid.innerHTML = visible.map(item => `
    <button class="picker-tile${item.id === activeId ? ' is-active' : ''}" data-pick="${item.id}" data-css="${item.css}">
      <span class="picker-tile__dot"></span>
      <div class="picker-tile__preview ${item.css}"></div>
      <span class="picker-tile__name">${item.name}</span>
    </button>`).join('');
  grid.querySelectorAll('.picker-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      onSelect(tile.dataset.pick, tile.dataset.css);
      grid.querySelectorAll('.picker-tile').forEach(t => t.classList.toggle('is-active', t.dataset.pick === tile.dataset.pick));
    });
  });
}

function syncPickerTabs(stripId, activeTab) {
  const strip = document.getElementById(stripId);
  if (!strip) return;
  strip.querySelectorAll('.picker-tab').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.tab === activeTab);
  });
}

function showSubView(panelId, view) {
  const panel = document.getElementById(`panel-${panelId}`);
  if (!panel) return;
  panel.querySelectorAll('.panel-subview').forEach(sv => { sv.hidden = true; });
  const target = panel.querySelector(`#${panelId}${view === 'main' ? 'Main' : 'Picker'}`);
  if (target) target.hidden = false;
}

function showAccSubView(mainId, pickerId, view) {
  document.getElementById(mainId).hidden   = view !== 'main';
  document.getElementById(pickerId).hidden = view !== 'picker';
}

function bindAddLink(id, fn) {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', fn);
}

function bindNumberInput(scope, id, fn) {
  const el = document.querySelector(`${scope} #${id}`);
  if (el) el.addEventListener('change', () => fn(Number(el.value)));
}

function bindSlider(scope, id, fn) {
  const slider = document.querySelector(`${scope} #${id}`);
  const valEl  = document.querySelector(`${scope} #${id}Val`);
  if (slider) {
    slider.addEventListener('input', () => {
      fn(Number(slider.value));
      if (valEl) valEl.textContent = slider.value;
    });
  }
}

function bindCheckbox(scope, id, fn) {
  const el = document.querySelector(`${scope} #${id}`);
  if (el) el.addEventListener('change', () => fn(el.checked));
}


// ── Create Image modal ────────────────────────────────────

function openCreateImageModal() {
  renderCreateImageCameraList();
  document.getElementById('createImageModal').hidden = false;
}

function closeCreateImageModal() {
  document.getElementById('createImageModal').hidden = true;
}

function renderCreateImageCameraList() {
  const list = document.getElementById('createImageCameraList');
  const count = document.getElementById('createImageCameraCount');
  if (!list) return;
  if (count) count.textContent = state.cameras.length;
  list.innerHTML = state.cameras.map(cam => `
    <label class="create-image-camera-item">
      <input type="checkbox" value="${cam.id}"${state.createImageSelectedCameraIds.includes(cam.id) ? ' checked' : ''}>
      <span>${cam.name}</span>
    </label>`).join('');
  list.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      const id = cb.value;
      if (cb.checked) { if (!state.createImageSelectedCameraIds.includes(id)) state.createImageSelectedCameraIds.push(id); }
      else            { state.createImageSelectedCameraIds = state.createImageSelectedCameraIds.filter(x => x !== id); }
      if (document.getElementById('createImageSelectAll')) {
        document.getElementById('createImageSelectAll').checked = state.createImageSelectedCameraIds.length === state.cameras.length;
      }
    });
  });
}

function syncCreateImageResolution() {
  document.querySelectorAll('.create-image-res-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.resolution === state.createImageResolution);
  });
  const preset = IMAGE_RESOLUTION_PRESETS[state.createImageMode][state.createImageResolution];
  if (preset) {
    state.createImageWidth  = preset.width;
    state.createImageHeight = preset.height;
    const wEl = document.getElementById('createImageWidth');
    const hEl = document.getElementById('createImageHeight');
    if (wEl) wEl.value = preset.width;
    if (hEl) hEl.value = preset.height;
  }
}

function addPreviewImage() {
  imageUid += 1;
  const img = {
    id: `preview-${imageUid}`,
    name: `${getMattressName()}-image${imageUid}`,
    src: null,
    createdAt: new Date().toISOString(),
  };
  state.previewImages.push(img);
  showToast(`Image created: ${img.name}`);
  closeCreateImageModal();
  if (state.section === 'images') renderImagesPanel();
}


// ── File menu ─────────────────────────────────────────────

function openFileMenu() {
  const menu = document.getElementById('fileMenu');
  const btn  = document.getElementById('fileMenuBtn');
  if (!menu) return;
  const open = !menu.hidden;
  menu.hidden = open;
  btn.setAttribute('aria-expanded', String(!open));
}

function handleFileAction(action) {
  document.getElementById('fileMenu').hidden = true;
  document.getElementById('fileMenuBtn').setAttribute('aria-expanded', 'false');
  if (action === 'save') {
    const payload = { name: getMattressName(), savedAt: new Date().toISOString() };
    localStorage.setItem('mattressBuilderV2', JSON.stringify(payload));
    showToast(`Saved ${payload.name}`);
  }
  if (action === 'save-as-new') showToast('Saved as new project');
  if (action === 'quit') { state = createDefaultState(); initApp(); showToast('Project reset'); }
  if (action === 'download-pdf') showToast('Downloading PDF…');
}


// ── Library modal ─────────────────────────────────────────

function openLibraryModal() {
  document.getElementById('libraryMattressName').value = getMattressName();
  document.getElementById('libraryAvailableCount').textContent = state.libraryAvailableCount;
  document.getElementById('libraryModal').hidden = false;
}

function closeLibraryModal() {
  document.getElementById('libraryModal').hidden = true;
}


// ── Init & event wiring ───────────────────────────────────

function initApp() {
  syncModeAndNav();
  setSection(state.section);
  updateViewportLabel();
  wireGlobalEvents();
  syncViewport();
}

function syncModeAndNav() {
  if (appVersion === 2) return;
  document.querySelectorAll('.mode-btn').forEach(btn => {
    const active = btn.dataset.mode === state.legacyMode;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
  const navExt = document.getElementById('navExternal');
  const navInt = document.getElementById('navInternal');
  if (navExt) navExt.classList.toggle('nav-group--hidden', state.legacyMode !== 'external');
  if (navInt) navInt.classList.toggle('nav-group--hidden', state.legacyMode !== 'internal');
}

function wireGlobalEvents() {

  // Mode toggle (legacy v1/v3)
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => setMode(btn.dataset.mode));
  });

  // Nav items
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => setSection(btn.dataset.section));
  });

  // External tabs
  document.querySelectorAll('[data-external-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.externalTab = btn.dataset.externalTab;
      renderExternalPanel();
    });
  });

  // Mattress tabs
  document.querySelectorAll('[data-mattress-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.mattressTab = btn.dataset.mattressTab;
      syncMattressTabs();
      if (state.mattressTab === 'size')   renderSizeGrid();
      if (state.mattressTab === 'height') renderHeightGrid();
    });
  });

  // Search inputs
  document.getElementById('sizeSearch').addEventListener('input', e => { state.sizeQuery = e.target.value; renderSizeGrid(); });
  document.getElementById('heightSearch').addEventListener('input', e => { state.heightQuery = e.target.value; renderHeightGrid(); });

  // Picker back buttons
  document.getElementById('topPickerBack').addEventListener('click', () => { state.topSubView = 'main'; renderTopPanel(); });
  document.getElementById('wallPickerBack').addEventListener('click', () => { state.wallSubView = 'main'; renderWallPanel(); });
  document.getElementById('bottomPickerBack').addEventListener('click', () => { state.bottomSubView = 'main'; renderBottomPanel(); });
  document.getElementById('tapePickerBack').addEventListener('click', () => { state.tapeSubView = 'main'; renderTapeTab(); });
  document.getElementById('labelPickerBack').addEventListener('click', () => { state.labelSubView = 'main'; renderLabelTab(); });
  document.getElementById('handlePickerBack').addEventListener('click', () => { state.handleSubView = 'main'; renderHandleTab(); });
  document.getElementById('layersPickerBack').addEventListener('click', () => { state.layersSubView = 'main'; renderLayersPanel(); });

  // Picker search inputs
  document.getElementById('topPickerSearch').addEventListener('input', e => { state.topPickerQuery = e.target.value; renderTopPickerGrid(); });
  document.getElementById('wallPickerSearch').addEventListener('input', e => { state.wallPickerQuery = e.target.value; renderWallPickerGrid(); });
  document.getElementById('bottomPickerSearch').addEventListener('input', e => { state.bottomPickerQuery = e.target.value; renderBottomPickerGrid(); });
  document.getElementById('tapePickerSearch').addEventListener('input', e => { state.tapePickerQuery = e.target.value; renderTapeTab(); });
  document.getElementById('labelPickerSearch').addEventListener('input', e => { state.labelPickerQuery = e.target.value; renderLabelTab(); });
  document.getElementById('handlePickerSearch').addEventListener('input', e => { state.handlePickerQuery = e.target.value; renderHandleTab(); });
  document.getElementById('layersPickerSearch').addEventListener('input', e => { state.layersPickerQuery = e.target.value; renderLayersPickerGrid(); });

  // Wall empty state buttons
  document.getElementById('wallAddQuiltingEmpty').addEventListener('click', () => { state.wallQuiltingAdded = true; renderWallPanel(); });
  document.getElementById('wallAddTuftsEmpty').addEventListener('click', () => { state.wallTuftsAdded = true; renderWallPanel(); });

  // Bottom mirror toggle
  document.getElementById('bottomMirrorToggle').addEventListener('change', e => {
    state.bottomMirrored = e.target.checked;
    e.target.setAttribute('aria-checked', String(state.bottomMirrored));
    renderBottomMain();
  });

  // Accessories tabs
  document.querySelectorAll('.acc-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.accessoriesTab = btn.dataset.accTab;
      renderAccessoriesPanel();
    });
  });

  // Accessories add-empty buttons
  document.getElementById('tapeAddEmpty').addEventListener('click', () => { state.tapeSubView = 'picker'; renderTapeTab(); });
  document.getElementById('labelAddEmpty').addEventListener('click', () => { state.labelSubView = 'picker'; renderLabelTab(); });
  document.getElementById('handleAddEmpty').addEventListener('click', () => { state.handleSubView = 'picker'; renderHandleTab(); });
  document.getElementById('tapeAddNew').addEventListener('click', () => { state.tapeSubView = 'picker'; renderTapeTab(); });
  document.getElementById('labelAddNew').addEventListener('click', () => { state.labelSubView = 'picker'; renderLabelTab(); });
  document.getElementById('handleAddNew').addEventListener('click', () => { state.handleSubView = 'picker'; renderHandleTab(); });

  // Images tabs
  document.querySelectorAll('[data-images-tab]').forEach(btn => {
    btn.addEventListener('click', () => { state.imagesTab = btn.dataset.imagesTab; renderImagesPanel(); });
  });

  // Layers add button
  document.getElementById('layersAddBtn').addEventListener('click', () => { state.layersSubView = 'picker'; renderLayersPanel(); });

  // Layout accordion
  document.getElementById('layoutExplodedBtn').addEventListener('click', () => {
    state.activeLayout = 'exploded';
    renderLayoutPanel();
    syncViewport();
  });
  document.getElementById('layoutInnerBuildBtn').addEventListener('click', () => {
    state.activeLayout = 'inner-build';
    renderLayoutPanel();
    syncViewport();
  });
  document.getElementById('layoutCutawayBtn').addEventListener('click', () => {
    state.activeLayout = 'cutaway';
    renderLayoutPanel();
    syncViewport();
  });
  document.getElementById('layoutExplodedGap').addEventListener('input', e => {
    state.layoutExplodedGap = Number(e.target.value);
    document.getElementById('layoutExplodedGapVal').textContent = e.target.value;
    syncViewport();
  });
  document.getElementById('layoutCutawayType').addEventListener('change', e => {
    state.layoutCutawayType = e.target.value;
    syncViewport();
  });

  // Topbar buttons
  document.getElementById('fileMenuBtn').addEventListener('click', openFileMenu);
  document.querySelectorAll('[data-file-action]').forEach(btn => {
    btn.addEventListener('click', () => handleFileAction(btn.dataset.fileAction));
  });
  document.addEventListener('click', e => {
    const menu = document.getElementById('fileMenu');
    if (menu && !menu.hidden && !document.getElementById('fileMenu').contains(e.target) && !document.getElementById('fileMenuBtn').contains(e.target)) {
      menu.hidden = true;
      document.getElementById('fileMenuBtn').setAttribute('aria-expanded', 'false');
    }
  });

  document.getElementById('createImageBtn').addEventListener('click', openCreateImageModal);
  document.getElementById('createImageCloseBtn').addEventListener('click', closeCreateImageModal);
  document.querySelector('[data-close-modal="create-image"]').addEventListener('click', closeCreateImageModal);
  document.getElementById('createImageSubmitBtn').addEventListener('click', addPreviewImage);

  document.getElementById('addToLibraryBtn').addEventListener('click', openLibraryModal);
  document.getElementById('libraryCloseBtn').addEventListener('click', closeLibraryModal);
  document.querySelector('[data-close-modal="library"]').addEventListener('click', closeLibraryModal);
  document.getElementById('librarySaveBtn').addEventListener('click', () => { closeLibraryModal(); showToast('Saved to library'); });

  document.getElementById('createImageSelectAll').addEventListener('change', e => {
    state.createImageSelectedCameraIds = e.target.checked ? state.cameras.map(c => c.id) : [];
    document.querySelectorAll('#createImageCameraList input[type="checkbox"]').forEach(cb => { cb.checked = e.target.checked; });
  });

  document.querySelectorAll('.create-image-mode').forEach(btn => {
    btn.addEventListener('click', () => {
      state.createImageMode = btn.dataset.imageMode;
      document.querySelectorAll('.create-image-mode').forEach(b => b.classList.toggle('is-active', b.dataset.imageMode === state.createImageMode));
      syncCreateImageResolution();
    });
  });
  document.querySelectorAll('.create-image-res-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.createImageResolution = btn.dataset.resolution;
      syncCreateImageResolution();
    });
  });
  document.getElementById('createImageAspectLock').addEventListener('click', () => {
    state.createImageAspectLocked = !state.createImageAspectLocked;
    document.getElementById('createImageAspectLock').classList.toggle('is-locked', state.createImageAspectLocked);
    document.getElementById('createImageAspectLock').querySelector('.material-symbols-outlined').textContent = state.createImageAspectLocked ? 'lock' : 'lock_open';
  });

  // Camera
  document.getElementById('cameraCreateBtn').addEventListener('click', () => {
    state.cameraSubView = 'create';
    const input = document.getElementById('cameraNameInput');
    if (input) input.value = '';
    renderCameraPanel();
  });
  document.getElementById('cameraCreateBack').addEventListener('click', () => {
    state.cameraSubView = 'main';
    renderCameraPanel();
  });
  document.getElementById('cameraSaveBtn').addEventListener('click', () => {
    const input = document.getElementById('cameraNameInput');
    const name = (input ? input.value.trim() : '') || 'Custom Camera';
    state.cameras.push({ id: `cam-${Date.now()}`, name, preset: null });
    state.cameraSubView = 'main';
    renderCameraPanel();
  });
  document.getElementById('cameraImportPresetBtn').addEventListener('click', () => {
    state.cameraSubView = 'presets';
    state.cameraPresetQuery = '';
    renderCameraPanel();
  });
  document.getElementById('cameraPresetsBack').addEventListener('click', () => {
    state.cameraSubView = 'main';
    renderCameraPanel();
  });
  document.getElementById('cameraPresetSearch').addEventListener('input', e => {
    state.cameraPresetQuery = e.target.value;
    renderCameraPresetGrid();
  });

  initAssistant();
}

// ── AI Assistant ─────────────────────────────────────────
function initAssistant() {
  const fab           = document.getElementById('aiFab');
  const panel         = document.getElementById('aiPanel');
  const closeBtn      = document.getElementById('aiPanelClose');
  const chatBody      = document.getElementById('aiPanelBody');
  const chatInput     = document.getElementById('aiInputField');
  const chatSend      = document.getElementById('aiInputSend');
  const chips         = document.querySelectorAll('.ai-chip');
  const versionPills  = document.querySelectorAll('.version-pill');
  const requestPanel  = document.getElementById('requestPanel');
  const reqBoard      = document.getElementById('reqBoard');
  const reqBoardEmpty = document.getElementById('reqBoardEmpty');
  const reqCatalog    = document.getElementById('reqCatalog');
  const reqCatStrip   = document.getElementById('reqCatStrip');
  const reqInput      = document.getElementById('reqInput');
  const reqSend       = document.getElementById('reqSend');
  const reqCount      = document.getElementById('reqCount');
  const myRequestsBtn = document.getElementById('requestPropBtn');

  // V3 panel elements
  const v3PanelEl       = document.getElementById('requestPanelV3');
  const v3ViewBoard     = document.getElementById('v3ViewBoard');
  const v3ViewForm      = document.getElementById('v3ViewForm');
  const v3Board         = document.getElementById('v3Board');
  const v3BoardEmpty    = document.getElementById('v3BoardEmpty');
  const v3NewReqBtn     = document.getElementById('v3NewReqBtn');
  const v3BackBtn       = document.getElementById('v3BackBtn');
  const v3CloseBtnBoard = document.getElementById('v3CloseBtnBoard');
  const v3CloseBtnForm  = document.getElementById('v3CloseBtnForm');
  const v3BackLabel     = document.getElementById('v3BackLabel');
  const v3StepDots      = document.getElementById('v3StepDots');
  const v3Step1         = document.getElementById('v3Step1');
  const v3Step2         = document.getElementById('v3Step2');
  const v3Step3         = document.getElementById('v3Step3');
  const v3TypeCards     = document.getElementById('v3TypeCards');
  const v3SelectedCard  = document.getElementById('v3SelectedCard');
  const v3UploadInput   = document.getElementById('v3UploadInput');
  const v3FilePreview   = document.getElementById('v3FilePreview');
  const v3FileName      = document.getElementById('v3FileName');
  const v3FileRemove    = document.getElementById('v3FileRemove');
  const v3ContinueBtn   = document.getElementById('v3ContinueBtn');
  const v3ReviewCard    = document.getElementById('v3ReviewCard');
  const v3CheckoutBtn   = document.getElementById('v3CheckoutBtn');
  const v3TotalPrice    = document.getElementById('v3TotalPrice');

  const CATALOG = [
    { id: 'tx1', cat: 'texture',   name: 'Velvet',           meta: 'Soft pile · 18 colorways',        price: '$49'   },
    { id: 'tx2', cat: 'texture',   name: 'Jacquard Weave',   meta: 'Woven pattern · 8 colorways',     price: '$65'   },
    { id: 'tx3', cat: 'texture',   name: 'Linen Blend',      meta: 'Natural texture · 6 colorways',   price: '$38'   },
    { id: 'tx4', cat: 'texture',   name: 'Microfiber',       meta: 'Ultra-soft · 15 colorways',       price: '$42'   },
    { id: 'pa1', cat: 'pattern',   name: 'Diamond Quilt',    meta: 'Classic stitch · 3 depths',       price: '$29'   },
    { id: 'pa2', cat: 'pattern',   name: 'Box Quilt',        meta: 'Grid stitch · 2 depths',          price: '$25'   },
    { id: 'pa3', cat: 'pattern',   name: 'Floral Embroidery',meta: 'Hand-stitched look',              price: '$89'   },
    { id: 'pa4', cat: 'pattern',   name: 'Tufting Grid',     meta: 'Button-top · 4 spacings',         price: '$45'   },
    { id: 'ma1', cat: 'material',  name: 'Gel Memory Foam',  meta: '2" layer · medium feel',          price: '$120'  },
    { id: 'ma2', cat: 'material',  name: 'Latex Core',       meta: 'Natural latex · firm',            price: '$180'  },
    { id: 'ma3', cat: 'material',  name: 'Pocket Springs',   meta: '1000-count · zoned support',      price: '$95'   },
    { id: 'ma4', cat: 'material',  name: 'HR Foam Base',     meta: 'High resilience · 6" core',       price: '$75'   },
    { id: 'mo1', cat: 'model',     name: 'King XL',          meta: '80" × 84" · extended length',     price: 'Quote' },
    { id: 'mo2', cat: 'model',     name: 'Round Bed',        meta: 'Ø72" standard diameter',          price: 'Quote' },
    { id: 'mo3', cat: 'model',     name: 'Split King',       meta: 'Dual Twin XL · adjustable',       price: 'Quote' },
    { id: 'ac1', cat: 'accessory', name: 'Rope Handle',      meta: 'Cotton braid · 4 positions',      price: '$18'   },
    { id: 'ac2', cat: 'accessory', name: 'Logo Label',       meta: 'Woven brand label',               price: '$12'   },
    { id: 'ac3', cat: 'accessory', name: 'Decorative Tape',  meta: 'Border trim · 24 colors',         price: '$22'   },
    { id: 'ac4', cat: 'accessory', name: 'Zipper Border',    meta: 'Full-perimeter zipper',           price: '$35'   },
  ];

  const CAT_COLORS = {
    texture: '#9b7afc', pattern: '#f24b0b', material: '#4db8e0',
    model: '#5abe8a', accessory: '#f0a440', custom: '#888'
  };

  const addedIds = new Set();

  const V3_TYPES = [
    { id: 'quilting-map',        label: 'Quilting Map',        icon: 'grid_view',             price: 100, checkoutUrl: 'https://imagine.io/checkout?item=quilting-map' },
    { id: 'seamless-fabrics',    label: 'Seamless fabrics',    icon: 'texture',               price: 100, checkoutUrl: 'https://imagine.io/checkout?item=seamless-fabrics' },
    { id: 'handles',             label: 'Handles',             icon: 'drag_handle',           price: 100, checkoutUrl: 'https://imagine.io/checkout?item=handles' },
    { id: 'custom-labels',       label: 'Custom labels',       icon: 'label',                 price: 100, checkoutUrl: 'https://imagine.io/checkout?item=custom-labels' },
    { id: 'custom-tape',         label: 'Custom tape',         icon: 'cut',                   price: 100, checkoutUrl: 'https://imagine.io/checkout?item=custom-tape' },
    { id: 'internal-components', label: 'Internal components', icon: 'developer_board',       price: 100, checkoutUrl: 'https://imagine.io/checkout?item=internal-components' },
  ];

  let v3CurrentStep  = 1;
  let v3SelectedType = null;
  let v3UploadedFile = null;
  const v3Requests   = [];

  const MOCK_REPLIES = [
    "I'll help you with that. Let me pull up the relevant options.",
    "Sure! I'm navigating to those settings now.",
    "Got it. Here are the configuration options you can explore.",
    "On it! I've highlighted the relevant section in the panel.",
  ];

  // ── Chat panel ──────────────────────────────────────────
  function openPanel() {
    panel.classList.add('is-open');
    fab.setAttribute('aria-expanded', 'true');
  }

  function closePanel() {
    panel.classList.remove('is-open');
    fab.setAttribute('aria-expanded', 'false');
  }

  function appendMessage(text, role) {
    const el = document.createElement('div');
    el.className = `ai-message ai-message--${role}`;
    el.textContent = text;
    chatBody.appendChild(el);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function sendChatMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = '';
    appendMessage(text, 'user');
    const reply = MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)];
    setTimeout(() => appendMessage(reply, 'assistant-reply'), 600);
  }

  fab.addEventListener('click', () => {
    panel.classList.contains('is-open') ? closePanel() : openPanel();
  });
  closeBtn.addEventListener('click', closePanel);
  chips.forEach(chip => {
    chip.addEventListener('click', () => { chatInput.value = chip.textContent; chatInput.focus(); });
  });
  chatSend.addEventListener('click', sendChatMessage);
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); }
  });
  document.addEventListener('click', e => {
    if (panel.classList.contains('is-open') && !document.getElementById('aiAssistant').contains(e.target)) {
      closePanel();
    }
  });

  // ── Catalog ──────────────────────────────────────────────
  let activeFilter = 'all';

  function renderCatalog(filter) {
    reqCatalog.innerHTML = '';
    const items = filter === 'all' ? CATALOG : CATALOG.filter(i => i.cat === filter);
    items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'req-item' + (addedIds.has(item.id) ? ' is-added' : '');
      row.dataset.id = item.id;

      const dot = document.createElement('span');
      dot.className = 'req-item__dot';
      dot.style.cssText = `width:8px;height:8px;border-radius:50%;background:${CAT_COLORS[item.cat]};flex-shrink:0;`;

      const info = document.createElement('div');
      info.style.cssText = 'flex:1;min-width:0;';
      const name = document.createElement('p');
      name.className = 'req-item__name';
      name.textContent = item.name;
      const meta = document.createElement('p');
      meta.className = 'req-item__meta';
      meta.textContent = item.meta;
      info.appendChild(name);
      info.appendChild(meta);

      const price = document.createElement('span');
      price.className = 'req-item__price';
      price.textContent = item.price;

      const addBtn = document.createElement('button');
      addBtn.className = 'req-item__add';
      addBtn.type = 'button';
      addBtn.setAttribute('aria-label', `Add ${item.name} to requests`);
      addBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:14px;">add</span>';
      addBtn.addEventListener('click', () => addToBoard(item, row, addBtn));

      row.appendChild(dot);
      row.appendChild(info);
      row.appendChild(price);
      row.appendChild(addBtn);
      reqCatalog.appendChild(row);
    });
  }

  // ── Board ────────────────────────────────────────────────
  function updateReqCount() {
    const n = reqBoard.querySelectorAll('.req-card').length;
    if (n > 0) {
      reqCount.textContent = n;
      reqCount.classList.add('has-items');
    } else {
      reqCount.textContent = '';
      reqCount.classList.remove('has-items');
    }
  }

  function wirePurchaseBtn(btn, item) {
    btn.addEventListener('click', () => {
      const card = btn.closest('.req-card');
      const badge = card.querySelector('.req-card__badge');
      badge.textContent = 'Confirmed';
      badge.classList.add('req-card__badge--confirmed');
      btn.remove();
      showToast('Request submitted');
    });
  }

  function addBoardCard(title, cat, price) {
    if (reqBoardEmpty) reqBoardEmpty.hidden = true;
    const card = document.createElement('div');
    card.className = 'req-card';

    const catRow = document.createElement('div');
    catRow.className = 'req-card__cat';
    const dot = document.createElement('span');
    dot.className = 'req-card__cat-dot';
    dot.style.background = CAT_COLORS[cat] || CAT_COLORS.custom;
    const catLabel = document.createElement('span');
    catLabel.className = 'req-card__cat-label';
    catLabel.textContent = cat;
    catRow.appendChild(dot);
    catRow.appendChild(catLabel);

    const titleEl = document.createElement('p');
    titleEl.className = 'req-card__title';
    titleEl.textContent = title;

    const noteEl = document.createElement('p');
    noteEl.className = 'req-card__note';
    noteEl.textContent = 'Just now · Pending review';

    const footer = document.createElement('div');
    footer.className = 'req-card__footer';
    const badge = document.createElement('span');
    badge.className = 'req-card__badge';
    badge.textContent = 'Pending';
    const purchaseBtn = document.createElement('button');
    purchaseBtn.className = 'req-card__purchase';
    purchaseBtn.type = 'button';
    purchaseBtn.textContent = price && price !== 'Quote' ? `Purchase · ${price}` : 'Request quote';
    footer.appendChild(badge);
    footer.appendChild(purchaseBtn);

    card.appendChild(catRow);
    card.appendChild(titleEl);
    card.appendChild(noteEl);
    card.appendChild(footer);
    wirePurchaseBtn(purchaseBtn);
    reqBoard.insertBefore(card, reqBoard.firstChild);
    updateReqCount();
  }

  function addToBoard(item, row, addBtn) {
    if (addedIds.has(item.id)) return;
    addedIds.add(item.id);
    row.classList.add('is-added');
    addBtn.disabled = true;
    addBoardCard(item.name, item.cat, item.price);
    showToast(`${item.name} added to requests`);
  }

  // ── Category filter ──────────────────────────────────────
  reqCatStrip.addEventListener('click', e => {
    const btn = e.target.closest('.req-cat');
    if (!btn) return;
    activeFilter = btn.dataset.cat;
    reqCatStrip.querySelectorAll('.req-cat').forEach(b => b.classList.toggle('is-active', b === btn));
    renderCatalog(activeFilter);
  });

  // ── Panel tabs ───────────────────────────────────────────
  const tabBrowse   = document.querySelector('.req-panel__tab[data-tab="browse"]');
  const tabRequests = document.querySelector('.req-panel__tab[data-tab="requests"]');
  const viewBrowse  = document.getElementById('reqViewBrowse');
  const viewRequests= document.getElementById('reqViewRequests');

  function switchTab(tab) {
    const isBrowse = tab === 'browse';
    tabBrowse.classList.toggle('is-active', isBrowse);
    tabRequests.classList.toggle('is-active', !isBrowse);
    tabBrowse.setAttribute('aria-selected', isBrowse);
    tabRequests.setAttribute('aria-selected', !isBrowse);
    viewBrowse.hidden = !isBrowse;
    viewRequests.hidden = isBrowse;
  }

  tabBrowse.addEventListener('click', () => switchTab('browse'));
  tabRequests.addEventListener('click', () => switchTab('requests'));

  // ── Custom request input ─────────────────────────────────
  function sendRequest() {
    const text = reqInput.value.trim();
    if (!text) return;
    reqInput.value = '';
    addBoardCard(text, 'custom', null);
    switchTab('requests');
  }

  reqSend.addEventListener('click', sendRequest);
  reqInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendRequest(); }
  });

  // ── V3 Panel ─────────────────────────────────────────────
  function openV3Panel() {
    v3PanelEl.hidden = false;
    myRequestsBtn.classList.add('btn-action--active');
    showV3Board();
  }

  function closeV3Panel() {
    v3PanelEl.hidden = true;
    myRequestsBtn.classList.remove('btn-action--active');
  }

  function showV3Board() {
    v3ViewBoard.hidden = false;
    v3ViewForm.hidden = true;
    renderV3Board();
  }

  function showV3Form() {
    v3ViewBoard.hidden = true;
    v3ViewForm.hidden = false;
    v3SelectedType = null;
    v3UploadedFile = null;
    v3UploadInput.value = '';
    v3FilePreview.hidden = true;
    v3TypeCards.querySelectorAll('.v3-type-card').forEach(c => c.classList.remove('is-selected'));
    goToStep(1);
  }

  function goToStep(step) {
    v3CurrentStep = step;
    v3Step1.hidden = step !== 1;
    v3Step2.hidden = step !== 2;
    v3Step3.hidden = step !== 3;
    const dots = v3StepDots.querySelectorAll('.v3-dot');
    dots.forEach((d, i) => d.classList.toggle('is-active', i < step));
    if (step === 1) v3BackLabel.textContent = 'New Request';
    if (step === 2 && v3SelectedType) {
      v3BackLabel.textContent = v3SelectedType.label;
      v3SelectedCard.innerHTML = `
        <div class="v3-sel-card">
          <span class="material-symbols-outlined v3-sel-card__icon">${v3SelectedType.icon}</span>
          <span class="v3-sel-card__label">${v3SelectedType.label}</span>
          <span class="v3-sel-card__price">$${v3SelectedType.price}</span>
        </div>`;
    }
    if (step === 3 && v3SelectedType) {
      v3BackLabel.textContent = 'Upload file';
      const fileStr = v3UploadedFile ? v3UploadedFile.name : 'No file attached';
      v3TotalPrice.textContent = `$${v3SelectedType.price}`;
      v3ReviewCard.innerHTML = `
        <div class="v3-review-row">
          <span class="material-symbols-outlined">${v3SelectedType.icon}</span>
          <div class="v3-review-info">
            <span class="v3-review-name">${v3SelectedType.label}</span>
            <span class="v3-review-file">${fileStr}</span>
          </div>
        </div>`;
    }
  }

  function renderV3Board() {
    v3Board.querySelectorAll('.v3-card').forEach(c => c.remove());
    v3BoardEmpty.hidden = v3Requests.length > 0;
    v3Requests.slice().reverse().forEach(req => v3Board.appendChild(makeV3Card(req)));
  }

  function makeV3Card(req) {
    const card = document.createElement('div');
    card.className = 'v3-card';
    const fileStr = req.filename || 'No file attached';
    card.innerHTML = `
      <div class="v3-card__type">Form Request</div>
      <p class="v3-card__title">${req.label}</p>
      <p class="v3-card__meta">${fileStr} · Just now</p>
      <div class="v3-card__footer">
        <span class="v3-card__badge">Submitted</span>
        <button class="v3-card__checkout" type="button">Checkout <span class="material-symbols-outlined">open_in_new</span></button>
      </div>
    `;
    card.querySelector('.v3-card__checkout').addEventListener('click', () => {
      window.open(req.checkoutUrl, '_blank');
    });
    return card;
  }

  function initV3TypeCards() {
    V3_TYPES.forEach(type => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'v3-type-card';
      card.dataset.id = type.id;
      card.innerHTML = `
        <span class="material-symbols-outlined v3-type-card__icon">${type.icon}</span>
        <span class="v3-type-card__name">${type.label}</span>
        <span class="v3-type-card__price">$${type.price}</span>`;
      card.addEventListener('click', () => {
        v3SelectedType = type;
        v3TypeCards.querySelectorAll('.v3-type-card').forEach(c => c.classList.remove('is-selected'));
        card.classList.add('is-selected');
        goToStep(2);
      });
      v3TypeCards.appendChild(card);
    });
  }

  v3UploadInput.addEventListener('change', () => {
    if (v3UploadInput.files.length > 0) {
      v3UploadedFile = v3UploadInput.files[0];
      v3FileName.textContent = v3UploadedFile.name;
      v3FilePreview.hidden = false;
    }
  });

  v3FileRemove.addEventListener('click', e => {
    e.preventDefault();
    v3UploadedFile = null;
    v3UploadInput.value = '';
    v3FilePreview.hidden = true;
  });

  v3ContinueBtn.addEventListener('click', () => {
    if (!v3SelectedType) return;
    goToStep(3);
  });

  v3CheckoutBtn.addEventListener('click', () => {
    if (!v3SelectedType) return;
    const req = { ...v3SelectedType, filename: v3UploadedFile ? v3UploadedFile.name : null };
    v3Requests.push(req);
    window.open(req.checkoutUrl, '_blank');
    showV3Board();
    showToast(`${req.label} request submitted`);
  });

  v3NewReqBtn.addEventListener('click', showV3Form);
  v3BackBtn.addEventListener('click', () => {
    if (v3CurrentStep === 1) showV3Board();
    else goToStep(v3CurrentStep - 1);
  });
  v3CloseBtnBoard.addEventListener('click', closeV3Panel);
  v3CloseBtnForm.addEventListener('click', closeV3Panel);

  // ── My Requests button toggle ────────────────────────────
  function openRequestPanel() {
    requestPanel.hidden = false;
    myRequestsBtn.classList.add('btn-action--active');
  }

  function closeRequestPanel() {
    requestPanel.hidden = true;
    myRequestsBtn.classList.remove('btn-action--active');
  }

  myRequestsBtn.addEventListener('click', () => {
    if (activeVersion === 2) {
      requestPanel.hidden ? openRequestPanel() : closeRequestPanel();
    } else if (activeVersion === 3) {
      v3PanelEl.hidden ? openV3Panel() : closeV3Panel();
    }
  });

  // ── Version switching ────────────────────────────────────
  let activeVersion = 1;

  function switchVersion(v) {
    activeVersion = v;
    appVersion = v;

    // Nav swap
    const navMainEl = document.getElementById('navMain');
    const navLegacyEl = document.getElementById('navLegacy');
    if (navMainEl) navMainEl.classList.toggle('nav-group--hidden', v !== 2);
    if (navLegacyEl) navLegacyEl.classList.toggle('nav-group--hidden', v === 2);

    // Topbar elements
    const helpBtnEl = document.getElementById('helpBtn');
    const modeToggleEl = document.getElementById('modeToggle');
    if (helpBtnEl) helpBtnEl.hidden = (v === 2);
    if (modeToggleEl) modeToggleEl.hidden = (v === 2);

    // Section reset
    if (v === 2) {
      setSection('mattress');
    } else {
      setMode('external');
    }

    // Request panel management
    fab.style.display = (v === 2 || v === 3) ? 'none' : '';
    if (v === 1 && panel.classList.contains('is-open')) closePanel();
    if (v !== 2) closeRequestPanel();
    if (v !== 3) closeV3Panel();
    myRequestsBtn.textContent = v === 2 ? 'My Requests' : 'Request Props';

    versionPills.forEach(p => {
      const active = Number(p.dataset.version) === v;
      p.classList.toggle('is-active', active);
      p.setAttribute('aria-pressed', active);
    });
  }

  versionPills.forEach(pill => {
    pill.addEventListener('click', () => switchVersion(Number(pill.dataset.version)));
  });

  // ── Init ─────────────────────────────────────────────────
  renderCatalog('all');
  initV3TypeCards();
}

document.addEventListener('DOMContentLoaded', initApp);
