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


// ── Scene ────────────────────────────────────────────────

const container = document.getElementById('viewport');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1c1c1c);
scene.fog = new THREE.Fog(0x1c1c1c, 22, 38);


// ── Camera ───────────────────────────────────────────────

const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
camera.position.set(5.5, 3.8, 8);


// ── Renderer ─────────────────────────────────────────────

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.4;
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

function buildMattress(sizeId = currentSizeId, heightInches = currentHeightInches) {
  currentSizeId = sizeId;
  currentHeightInches = heightInches;

  // Dispose and clear previous geometry
  mattressGroup.traverse(obj => {
    if (obj.isMesh) obj.geometry.dispose();
  });
  mattressGroup.clear();

  const s = SIZES[sizeId] || SIZES['queen'];
  const w = s.w * IN;   // width  (head-to-foot axis)
  const d = s.d * IN;   // depth  (side-to-side axis)
  const h = heightInches * IN;

  // Main body
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), bodyMat);
  body.position.y = h / 2;
  body.castShadow = true;
  body.receiveShadow = true;
  mattressGroup.add(body);

  // Top quilting panel — inset, slightly raised
  const topPanel = new THREE.Mesh(
    new THREE.BoxGeometry(w - 0.08, 0.04, d - 0.08),
    topMat
  );
  topPanel.position.y = h + 0.02;
  topPanel.castShadow = false;
  mattressGroup.add(topPanel);

  // Side wall panels (front, back, left, right) — slightly darker inset
  const wallH = h * 0.5;

  const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(w - 0.02, wallH, 0.02),
    sideMat
  );
  frontWall.position.set(0, wallH / 2 + h * 0.25, d / 2 + 0.005);
  mattressGroup.add(frontWall);

  const backWall = frontWall.clone();
  backWall.position.set(0, wallH / 2 + h * 0.25, -(d / 2 + 0.005));
  mattressGroup.add(backWall);

  const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.02, wallH, d - 0.02),
    sideMat
  );
  leftWall.position.set(-(w / 2 + 0.005), wallH / 2 + h * 0.25, 0);
  mattressGroup.add(leftWall);

  const rightWall = leftWall.clone();
  rightWall.position.set(w / 2 + 0.005, wallH / 2 + h * 0.25, 0);
  mattressGroup.add(rightWall);

  // Tape border — runs along the top edge perimeter
  const tapeH = 0.05;
  const tapeD = 0.055;

  const tapeF = new THREE.Mesh(
    new THREE.BoxGeometry(w + tapeD, tapeH, tapeD),
    tapeMat
  );
  tapeF.position.set(0, h - tapeH / 2, d / 2);
  mattressGroup.add(tapeF);

  const tapeB = tapeF.clone();
  tapeB.position.set(0, h - tapeH / 2, -d / 2);
  mattressGroup.add(tapeB);

  const tapeL = new THREE.Mesh(
    new THREE.BoxGeometry(tapeD, tapeH, d + tapeD),
    tapeMat
  );
  tapeL.position.set(-w / 2, h - tapeH / 2, 0);
  mattressGroup.add(tapeL);

  const tapeR = tapeL.clone();
  tapeR.position.set(w / 2, h - tapeH / 2, 0);
  mattressGroup.add(tapeR);

  // Center the group so mattress sits on y=0
  mattressGroup.position.set(0, 0, 0);
}

// Default
buildMattress('king');


// ── Public API (called from app.js on size change) ───────

window.viewportSetSize = (sizeId) => buildMattress(sizeId, currentHeightInches);
window.viewportSetHeight = (heightInches) => buildMattress(currentSizeId, heightInches);


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
