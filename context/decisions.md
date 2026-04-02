---
name: decisions
description: Architectural and product decisions log
type: project
---

# Decisions

## Format
Each entry: **Date | Decision | Reason | Alternatives considered**

---

## Log

### 2026-04-01 | Project initialized
- Created base file structure per claude.md contract
- No architectural decisions made yet — awaiting product brief

### 2026-04-01 | Design system: Prism only
- **Decision:** Use Prism Design System (PDS) exclusively — no custom or experimental token systems
- **Reason:** An experiment folder was created to explore a 3-color minimal system; concluded PDS is the right foundation and experiment was archived
- **Alternatives considered:** Custom 3-color token system (archived in /archives/experiments/)

### 2026-04-01 | Dark theme token strategy
- **Decision:** Dual-import pattern — `tokens.css` (PDS, never edited) + `tokens-dark.css` (Tier 2 overrides only)
- **Reason:** Mattress Builder is a dark-themed app; PDS Tier 1 primitives are theme-neutral and must stay unchanged for Figma sync compatibility
- **What changes in dark:** surface-default/page → `#141414`, text-default-* → white/grey scale, subtle semantic surfaces/borders flip from top of scale (pastels) to bottom (deep tints), disabled tokens shift darker
- **What does not change:** All solid semantic colors (primary, error, info, warning, success) — they work on both themes

### 2026-04-02 | Tech stack: vanilla + Three.js, no framework
- **Decision:** Plain HTML/CSS/JS with Three.js r160 via CDN importmap — no build tool, no framework
- **Reason:** Fastest path to a working 3D configurator shell; avoids toolchain overhead for a single-page tool
- **Alternatives considered:** React + Vite, plain HTML without Three.js

### 2026-04-02 | Typography cap: ≤ 18px across the entire UI
- **Decision:** No H1–H3 token sizes used anywhere; all UI text uses body (16px), small (14px), caption (12px), or nav labels (10px)
- **Reason:** Tool UI requires dense, compact information display — large headings don't suit the panel-driven layout

### 2026-04-02 | Three.js viewport with OrbitControls
- **Decision:** Replace CSS 3D fake with a real Three.js WebGL scene (orbit/zoom/pan)
- **Reason:** The viewport needs to feel like a real 3D environment (Unity-style), not a CSS trick
- **Notes:** Geometry is parametric — rebuilds from inch dimensions on every size change

### 2026-04-01 | Discovery assets and experiments are retained in-repo
- **Decision:** Keep screenshot research, brand assets, and the archived experiment inside the repository instead of treating them as temporary local files
- **Reason:** The project contract requires meaningful progress to live in files; these artifacts explain how current system understanding and early UI direction were derived
- **Alternatives considered:** Keep assets local-only or delete the experiment after documenting conclusions

### 2026-04-02 | Screen 1 builder shell remains framework-free and panel-driven
- **Decision:** Keep the active implementation in plain `index.html` + `app.css` + `app.js` + `viewport.js`, expanding the shell incrementally instead of introducing components/build tooling mid-stream
- **Reason:** The team already has a working interactive shell with a live Three.js scene and persistent context files; staying in the same structure keeps handoff simple and reduces integration risk
- **Alternatives considered:** Pause to migrate the UI shell into a component framework before feature buildout

### 2026-04-02 | Size and Height panels share the same panel pattern
- **Decision:** Option panels should follow a consistent structure: search row + 2-column card grid + live viewport update on selection
- **Reason:** Screenshot research and current UI work show the builder benefits from repeatable panel scaffolding instead of section-specific one-offs
- **Alternatives considered:** Special-case the Height panel without search or use a different list/slider control

### 2026-04-02 | Inputs should read as neutral dark surfaces, not primary-accent controls
- **Decision:** Text inputs use restrained dark styling and only reveal stronger affordance on hover/focus; the mattress title behaves more like editable heading text than a permanent form field
- **Reason:** Strong orange input states made the shell feel noisy and visually competed with selected option cards
- **Alternatives considered:** Keep orange focus/border treatment on search fields and title field

### 2026-04-02 | File menu actions are lightweight browser-native behaviors first
- **Decision:** Implement `Save Project`, `Save as New`, `Quit Project`, and `Download Pdf` using `localStorage`, reset logic, and printable summary output
- **Reason:** This gives the shell credible project actions immediately without blocking on backend/storage/export infrastructure
- **Alternatives considered:** Leave File menu visual-only until a full persistence/export backend exists
