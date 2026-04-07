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

### 2026-04-07 | Style panel search fields use icon-inside-input pattern
- **Decision:** Search icons are positioned absolutely inside a `.style-search-input-wrap` wrapper (position: relative), not as a sibling element to the input
- **Reason:** Icon-inside pattern matches industry standard for search inputs and the existing `panel-search` pattern used elsewhere in the app
- **Alternatives considered:** Icon as static sibling outside the input (was the original implementation)

### 2026-04-07 | Camera cards support inline rename and delete; Current Camera is immutable
- **Decision:** Saved cameras show a pencil (rename) and trash (delete) icon on hover/active. Rename triggers an inline `<input>` replacing the name span. Current Camera shows neither action.
- **Reason:** Inline editing is less disruptive than a modal; Current Camera represents live viewport state and must always exist
- **Alternatives considered:** Modal dialog for rename; separate settings page

### 2026-04-07 | Export Image modal is header/body/footer — not a flat scrollable form
- **Decision:** Modal uses a three-zone layout: fixed header (title + close), scrollable body (two-column: cameras left, settings right), fixed footer (CTA)
- **Reason:** The flat padding layout scrolled on smaller viewports and the CTA (full-width 900px) looked disproportionate; splitting zones gives each element a fixed anchor
- **Alternatives considered:** Single scrollable column, full-width CTA retained

### 2026-04-07 | DPI selector lives in the File Name row, not a standalone section
- **Decision:** In High Resolution mode, the DPI `<select>` appears inline inside the file name row (`[filename] [DPI ▼] [JPG ▼]`). Physical size is shown as a caption hint below.
- **Reason:** A standalone DPI section caused the settings column to overflow and require scrolling; combining into one row removes the need for scroll entirely
- **Alternatives considered:** DPI as its own labelled section (original implementation)

### 2026-04-07 | Resolution presets are mode-aware
- **Decision:** `IMAGE_RESOLUTION_PRESETS` is split by mode — Preview 1080p = 1500×843, High Res 1080p = 1920×1080
- **Reason:** Preview exports target screen/web use (smaller, faster), High Res targets print/production (standard pixel dimensions)
- **Alternatives considered:** Single preset table shared across modes

### 2026-04-07 | Image Viewer rail uses dark theme colors, not the legacy blue-gray
- **Decision:** Rail background changed to `#1a1a1a`, matching the app's dark surface tokens instead of `rgba(70, 74, 79, 0.82)`
- **Reason:** The blue-gray rail was visually disconnected from the rest of the app; a neutral dark surface maintains consistency
- **Alternatives considered:** Keep existing blue-gray, use a semi-transparent overlay

### 2026-04-07 | Render items in the Images panel are horizontal cards with a fixed-width thumbnail
- **Decision:** Render items use a flex row with an 80px thumbnail on the left and body (name + status + meta) on the right, matching the pattern of the preview cards
- **Reason:** The original render item was a plain text row with no thumbnail — inconsistent with Previews and the reference tool screenshots
- **Alternatives considered:** Full-width thumbnail (same as preview cards), text-only row retained
