/* ─────────────────────────────────────────────────────────
   viewport.js — Three.js 3D scene
   Orbit: left-drag · Zoom: scroll · Pan: right-drag
   ───────────────────────────────────────────────────────── */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// ── Mattress size data (inches) ──────────────────────────

const SIZES = {
  'king':         { w: 76, d: 80 },
  'queen':        { w: 60, d: 80 },
  'twin':         { w: 38, d: 75 },
  'twin-xl':      { w: 38, d: 80 },
  'full':         { w: 54, d: 75 },
  'crib':         { w: 28, d: 52 },
  'cal-king':     { w: 72, d: 84 },
  'small-single': { w: 30, d: 75 },
  'small-double': { w: 48, d: 75 },
};

const IN = 1 / 12; // 1 Three.js unit = 12 inches
let currentSizeId = 'king';
let currentHeightInches = 10;
let currentMode = 'external';
let internalView = { exploded: true, explodedGap: 0.3, innerBuild: false, cutaway: false };
let currentLayers = [
  { id: 'pocket-coil', color: '#aeb8cb', thickness: 4.794, visible: true, frontCut: 0.1, sideCut: 0.1 },
  { id: 'hole-punch', color: '#94c876', thickness: 1.503, visible: true, frontCut: 0.1, sideCut: 0.1 },
];


// ── Scene ────────────────────────────────────────────────

const container = document.getElementById('viewport');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1c1c1c);
scene.fog = new THREE.Fog(0x1c1c1c, 22, 38);


// ── Camera ───────────────────────────────────────────────

const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
camera.position.set(5.5, 3.8, 8);


// ── Renderer ─────────────────────────────────────────────

const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.4;
renderer.setClearAlpha(1);
container.prepend(renderer.domElement);


// ── Controls ─────────────────────────────────────────────

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.4, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.minDistance = 2.5;
controls.maxDistance = 22;
controls.maxPolarAngle = Math.PI / 2 - 0.02;
controls.update();


// ── Lighting ─────────────────────────────────────────────

// Ambient — soft fill
const ambient = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambient);

// Key light — upper left front
const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
keyLight.position.set(7, 12, 9);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(2048, 2048);
keyLight.shadow.camera.near = 0.5;
keyLight.shadow.camera.far = 50;
keyLight.shadow.camera.left   = -10;
keyLight.shadow.camera.right  =  10;
keyLight.shadow.camera.top    =  10;
keyLight.shadow.camera.bottom = -10;
keyLight.shadow.bias = -0.0008;
scene.add(keyLight);

// Fill light — right side, cool
const fillLight = new THREE.DirectionalLight(0xd0e0ff, 0.6);
fillLight.position.set(-6, 5, -4);
scene.add(fillLight);

// Rim light — behind, adds edge separation from bg
const rimLight = new THREE.DirectionalLight(0xffffff, 0.35);
rimLight.position.set(0, 3, -10);
scene.add(rimLight);


// ── Floor ────────────────────────────────────────────────

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshStandardMaterial({ color: 0x191919, roughness: 1, metalness: 0 })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Grid — subtle, Unity-style
const grid = new THREE.GridHelper(30, 30, 0x323232, 0x272727);
grid.position.y = 0.001;
scene.add(grid);


// ── Mattress geometry ────────────────────────────────────

const mattressGroup = new THREE.Group();
scene.add(mattressGroup);

const shellGroup = new THREE.Group();
const internalGroup = new THREE.Group();
mattressGroup.add(shellGroup);
mattressGroup.add(internalGroup);

// Shared materials
const bodyMat = new THREE.MeshStandardMaterial({
  color: 0x484848,
  roughness: 0.88,
  metalness: 0.04,
});

const topMat = new THREE.MeshStandardMaterial({
  color: 0x585858,
  roughness: 0.70,
  metalness: 0.0,
});

const sideMat = new THREE.MeshStandardMaterial({
  color: 0x3c3c3c,
  roughness: 0.90,
  metalness: 0.02,
});

const tapeMat = new THREE.MeshStandardMaterial({
  color: 0x606060,
  roughness: 0.75,
  metalness: 0.0,
});

function createLayerMaterial(color) {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 0.78,
    metalness: 0.02,
  });
}

function buildMattress(sizeId = currentSizeId, heightInches = currentHeightInches) {
  currentSizeId = sizeId;
  currentHeightInches = heightInches;

  // Dispose and clear previous geometry
  mattressGroup.traverse(obj => {
    if (obj.isMesh) {
      obj.geometry.dispose();
      if (obj.material && ![bodyMat, topMat, sideMat, tapeMat].includes(obj.material)) {
        obj.material.dispose();
      }
    }
  });
  shellGroup.clear();
  internalGroup.clear();

  const s = SIZES[sizeId] || SIZES['queen'];
  const w = s.w * IN;   // width  (head-to-foot axis)
  const d = s.d * IN;   // depth  (side-to-side axis)
  const h = heightInches * IN;
  const visibleLayers = currentLayers.filter(layer => layer.visible !== false);
  const workingLayers = visibleLayers.length ? visibleLayers : currentLayers;
  const shellOffsetX = currentMode === 'internal' && internalView.cutaway ? -(w * 0.18) : 0;
  const shellWidth = currentMode === 'internal' && internalView.cutaway ? w * 0.64 : w;
  const shellTopWidth = Math.max(shellWidth - 0.08, 0.24);
  const shellDepth = currentMode === 'internal' && internalView.cutaway ? d * 0.82 : d;
  const shellTopDepth = Math.max(shellDepth - 0.08, 0.24);
  const topLift = currentMode === 'internal' && !internalView.cutaway
    ? 0.55 + (internalView.exploded ? internalView.explodedGap * 0.9 : 0)
    : 0;
  const trayHeight = currentMode === 'internal' ? 0.18 : h;

  // Main body
  const body = new THREE.Mesh(new THREE.BoxGeometry(shellWidth, trayHeight, shellDepth), bodyMat);
  body.position.y = currentMode === 'internal' ? trayHeight / 2 : h / 2;
  body.position.x = shellOffsetX;
  body.castShadow = true;
  body.receiveShadow = true;
  if (currentMode === 'external') {
    body.material = bodyMat;
  } else {
    body.material = bodyMat.clone();
    body.material.transparent = internalView.cutaway;
    body.material.opacity = internalView.cutaway ? 0.28 : 1;
  }
  shellGroup.add(body);

  // Top quilting panel — inset, slightly raised
  const topPanel = new THREE.Mesh(
    new THREE.BoxGeometry(shellTopWidth, 0.04, shellTopDepth),
    topMat
  );
  topPanel.position.y = currentMode === 'internal' ? h + topLift : h + 0.02;
  topPanel.position.x = shellOffsetX;
  topPanel.castShadow = false;
  if (currentMode === 'internal') {
    topPanel.material = topMat.clone();
    topPanel.material.transparent = internalView.cutaway;
    topPanel.material.opacity = internalView.cutaway ? 0.4 : 1;
  }
  shellGroup.add(topPanel);

  // Side wall panels (front, back, left, right) — slightly darker inset
  const wallH = currentMode === 'internal' ? 0.16 : h * 0.5;

  const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(Math.max(shellWidth - 0.02, 0.22), wallH, 0.02),
    sideMat
  );
  frontWall.position.set(shellOffsetX, currentMode === 'internal' ? wallH / 2 + 0.02 : wallH / 2 + h * 0.25, shellDepth / 2 + 0.005);
  shellGroup.add(frontWall);

  const backWall = frontWall.clone();
  backWall.position.set(shellOffsetX, wallH / 2 + h * 0.25, -(shellDepth / 2 + 0.005));
  if (!internalView.cutaway) shellGroup.add(backWall);

  const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.02, wallH, Math.max(shellDepth - 0.02, 0.22)),
    sideMat
  );
  leftWall.position.set(shellOffsetX - (shellWidth / 2 + 0.005), wallH / 2 + h * 0.25, 0);
  shellGroup.add(leftWall);

  const rightWall = leftWall.clone();
  rightWall.position.set(shellOffsetX + shellWidth / 2 + 0.005, currentMode === 'internal' ? wallH / 2 + 0.02 : wallH / 2 + h * 0.25, 0);
  if (!internalView.cutaway) shellGroup.add(rightWall);

  // Tape border — runs along the top edge perimeter
  const tapeH = 0.05;
  const tapeD = 0.055;

  const tapeF = new THREE.Mesh(
    new THREE.BoxGeometry(shellWidth + tapeD, tapeH, tapeD),
    tapeMat
  );
  tapeF.position.set(shellOffsetX, currentMode === 'internal' ? trayHeight - tapeH / 2 + 0.02 : h - tapeH / 2, shellDepth / 2);
  if (currentMode === 'external') shellGroup.add(tapeF);

  const tapeB = tapeF.clone();
  tapeB.position.set(shellOffsetX, currentMode === 'internal' ? trayHeight - tapeH / 2 + 0.02 : h - tapeH / 2, -shellDepth / 2);
  if (!internalView.cutaway && currentMode === 'external') shellGroup.add(tapeB);

  const tapeL = new THREE.Mesh(
    new THREE.BoxGeometry(tapeD, tapeH, shellDepth + tapeD),
    tapeMat
  );
  tapeL.position.set(shellOffsetX - shellWidth / 2, currentMode === 'internal' ? trayHeight - tapeH / 2 + 0.02 : h - tapeH / 2, 0);
  if (currentMode === 'external') shellGroup.add(tapeL);

  const tapeR = tapeL.clone();
  tapeR.position.set(shellOffsetX + shellWidth / 2, currentMode === 'internal' ? trayHeight - tapeH / 2 + 0.02 : h - tapeH / 2, 0);
  if (!internalView.cutaway && currentMode === 'external') shellGroup.add(tapeR);

  // Internal layers — normalized to selected mattress height
  const totalThickness = workingLayers.reduce((sum, layer) => sum + Math.max(Number(layer.thickness) || 0.5, 0.5), 0) || 1;
  const explodedGap = currentMode === 'internal' && internalView.exploded && !internalView.cutaway
    ? Math.max(internalView.explodedGap * 0.32, 0) : (currentMode === 'internal' && internalView.innerBuild && !internalView.cutaway ? 0.08 : 0);
  const usableHeight = currentMode === 'internal'
    ? Math.max(h - explodedGap * Math.max(workingLayers.length - 1, 0), 0.25)
    : h - explodedGap * Math.max(workingLayers.length - 1, 0);
  let yCursor = currentMode === 'internal' ? trayHeight + 0.04 : 0;

  workingLayers.forEach((layer, index) => {
    const normalizedHeight = Math.max((Math.max(Number(layer.thickness) || 0.5, 0.5) / totalThickness) * usableHeight, 0.035);
    const cutFront = internalView.cutaway ? Number(layer.frontCut || 0) : 0;
    const cutSide = internalView.cutaway ? Number(layer.sideCut || 0) : 0;
    const layerMesh = new THREE.Mesh(
      new THREE.BoxGeometry(
        Math.max(w * (internalView.cutaway ? 0.82 - cutSide * 0.18 : 0.92), 0.16),
        normalizedHeight,
        Math.max(d * (internalView.cutaway ? 0.82 - cutFront * 0.18 : 0.92), 0.16)
      ),
      createLayerMaterial(layer.color || '#808080')
    );

    layerMesh.position.y = yCursor + normalizedHeight / 2;
    if (currentMode === 'internal' && internalView.cutaway) {
      layerMesh.position.x = w * (0.12 + cutSide * 0.03);
      layerMesh.position.z = d * (0.02 + cutFront * 0.03);
    }

    layerMesh.castShadow = index === workingLayers.length - 1;
    layerMesh.receiveShadow = true;
    internalGroup.add(layerMesh);
    yCursor += normalizedHeight + explodedGap;
  });

  internalGroup.visible = currentMode === 'internal';

  // Center the group so mattress sits on y=0
  mattressGroup.position.set(0, 0, 0);
}

// Default
buildMattress('king');


// ── Public API (called from app.js on size change) ───────

window.viewportSetSize = (sizeId) => buildMattress(sizeId, currentHeightInches);
window.viewportSetHeight = (heightInches) => buildMattress(currentSizeId, heightInches);
window.viewportGetCamera = () => ({
  position: [camera.position.x, camera.position.y, camera.position.z],
  target: [controls.target.x, controls.target.y, controls.target.z],
});
window.viewportSetCamera = (snapshot) => {
  if (!snapshot) return;
  camera.position.set(...snapshot.position);
  controls.target.set(...snapshot.target);
  controls.update();
  renderer.render(scene, camera);
};
window.viewportCapture = async ({ width, height, transparent = false } = {}) => {
  const prevBg = scene.background;
  const prevAlpha = renderer.getClearAlpha();
  const prevSize = new THREE.Vector2();
  renderer.getSize(prevSize);
  const prevAspect = camera.aspect;
  const nextWidth = width || prevSize.x;
  const nextHeight = height || prevSize.y;

  if (transparent) {
    scene.background = null;
    renderer.setClearAlpha(0);
  }

  renderer.setSize(nextWidth, nextHeight, false);
  camera.aspect = nextWidth / nextHeight;
  camera.updateProjectionMatrix();
  controls.update();
  renderer.render(scene, camera);

  const dataUrl = renderer.domElement.toDataURL(transparent ? 'image/png' : 'image/jpeg', 0.92);

  if (transparent) {
    scene.background = prevBg;
    renderer.setClearAlpha(prevAlpha);
  }

  renderer.setSize(prevSize.x, prevSize.y, false);
  camera.aspect = prevAspect;
  camera.updateProjectionMatrix();
  controls.update();
  renderer.render(scene, camera);

  return {
    dataUrl,
    width: nextWidth,
    height: nextHeight,
  };
};
window.viewportSyncState = ({ mode, layers, nextView }) => {
  if (mode) currentMode = mode;
  if (Array.isArray(layers) && layers.length) currentLayers = layers.map(layer => ({ ...layer }));
  if (nextView) internalView = { ...internalView, ...nextView };
  buildMattress(currentSizeId, currentHeightInches);
};
window.viewportSetMode = (mode) => {
  currentMode = mode;
  buildMattress(currentSizeId, currentHeightInches);
};
window.viewportSetLayers = (layers) => {
  currentLayers = Array.isArray(layers) && layers.length ? layers.map(layer => ({ ...layer })) : currentLayers;
  buildMattress(currentSizeId, currentHeightInches);
};
window.viewportSetInternalView = (nextView) => {
  internalView = { ...internalView, ...nextView };
  buildMattress(currentSizeId, currentHeightInches);
};


// ── Resize ───────────────────────────────────────────────

function resize() {
  const w = container.clientWidth;
  const h = container.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

new ResizeObserver(resize).observe(container);
resize();


// ── Render loop ───────────────────────────────────────────

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
