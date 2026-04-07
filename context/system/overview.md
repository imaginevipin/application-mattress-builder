---
name: system-overview
description: App layout, structure, modes and sections of the Mattress Builder
type: project
---

# System Overview

## Layout
```
┌─────────────────────────────────────────────────┐
│ [logo] [File ▾] [External/Internal] New Mattress_4 [Request Prop] [Add to library] [Create Image] │
├──┬──────────────────┬────────────────────────────┤
│  │                  │                            │
│ Icons  Context      │     3D Viewport            │
│  │    Panel         │                            │
│  │    (dynamic)     │                            │
│  │                  │   [label: King · 10" Profile] │
└──┴──────────────────┴────────────────────────────┘
```

- Left icon strip: section selector
- Context panel: changes based on selected section
- 3D viewport: live mattress preview, orbitable/zoomable
- Bottom of canvas: label showing selected size + height profile
- File button opens an anchored dropdown menu with project actions
- Mattress name is editable, but visually styled like a title until hover/focus

## Repository State
- `/tokens.css` contains the base Prism Design System token layer, typography, spacing, and border aliases
- `/tokens-dark.css` contains the mattress-builder dark-theme semantic overrides and must be imported after `/tokens.css`
- `/assets/fonts/` contains six PP Neue Montreal font files used by the token layer and experiments
- `/assets/logos/` contains imagine.io logo variants reused by the active top bar
- `/archives/experiments/` contains an archived first-screen prototype plus an experimental design-system page kept for reference only
- `/assets/existing-screenshots/` contains the screenshot set used to document the current production builder behavior

---

## Modes

### External Mode
Configures the outer appearance of the mattress.
Sidebar sections (top to bottom):

| Icon | Section  | What it controls |
|------|----------|-----------------|
| Size | Size | Mattress dimensions (King, Queen, Twin, Twin XL, Full/Double, California King, Small Double, etc.) |
| Height | Height | Mattress height/profile selection via searchable preset cards (currently 6", 8", 10", 12", 14", 16") |
| Top | Top | Pillow top type, quilting pattern (top + gusset), tufts |
| Wall | Wall | Side/gusset quilting pattern and properties |
| Tape | Tape | Border tape type and position |
| Label | Label | Brand label placement, size, position |
| Handle | Handle | Handle type, side, position |
| Bottom | Bottom | Bottom type, quilting pattern, mirror-top option |
| Style | Style | Material/texture/color editing (4 tabs) |
| Images | Images | Preview and render outputs |
| Cameras | Cameras | Camera angle presets |

### Internal Mode
Configures the internal construction (foam/coil layers).
Sidebar sections:

| Section | What it controls |
|---------|-----------------|
| Layers | Add/manage/reorder internal layers, layer height |
| Style | Same as External |
| Images | Same as External |
| Cameras | Same as External |

---

## Section Details

### Size
- Searchable 2-column card grid
- Current implementation uses 9 preset sizes
- Each card shows a proportional plan-view rectangle plus a one-line name/dimension footer
- Selection updates the Three.js mattress width/depth in real time

### Height
- Searchable 2-column card grid mirroring the Size panel pattern
- Current implementation uses 6 presets: Slim 6", Low 8", Classic 10", Plush 12", Tall 14", Ultra 16"
- Each card shows a simplified side-profile block visualization
- Selection updates the Three.js mattress thickness in real time
- Height search matches both names and inch values

### Top
- Types: Box Pillow Top, Smooth Top (others likely exist)
- Quilting pattern — top: searchable pattern grid
- Quilting pattern — gusset: searchable pattern grid
- + Add tufts → Classic Tuft with full parameter control

### Tuft Parameters
- Starts From X / Y
- Column Count, Column Gap
- Row Count, Row Gap
- Diameter Size
- Offset Alternate Rows
- Contact Depth (slider)
- Sides: Front | Mirror Tuft | All Sides
- Save Preset

### Wall
- Quilting pattern selector (same library as Top)
- Pattern properties: Width/Height (inches, lockable), Position X/Y, Rotation (0/90/180/270°)
- Depth / Alpha texture toggle
- + Add tufts

### Tape
- Types: 0.5inch Wide Flat Tape (variants), 0.5inch Zipper, Oval Tape
- Properties: Position (slider), Scale X/Y/Z, Reset Scale

### Label
- Types: Small Rectangle Label (others likely)
- Properties: dimensions shown in inches, Scale X/Y/Z, Position X/Y/Z
- Actions: Anchor Object | Mirror Object

### Handle
- Types: Horizontal Handle
- Side: Left / Right
- Properties: dimensions in inches, Scale X/Y/Z, Position X/Y/Z
- Actions: Anchor Object ("places next to selected") | Mirror Object ("mirrors across selected")

### Bottom
- Types: Smooth Bottom, Box Pillow Bottom
- Mirror Top to Bottom toggle (checkbox)
- Quilting pattern — bottom
- Quilting pattern — gusset

### Style (4 tabs)
1. **Textures** — search (icon inside input) + Upload dropdown; grid mixes normal and "Exclusive for Mattress" badged items
2. **Materials** — filtered by tags (Mattress Builder, Cotton, Flexi AI); e.g. Linen Cotton Blend 1/2/3, Fabric 007
3. **Colors** — full HSB/RGB/Hex picker, color swatches
4. **Properties** — Width/Height (inches), Position X/Y, Rotation, Gloss slider, Fit Texture / Reset Texture, Save in library

### Layers (Internal mode)
- Layer types: Convoluted Foam 1, Convoluted Foam 2, Edge-To-Edge Pocket Coil, Fiber Batting, Foam Slab, Hole Punch Foam Layer
- "Add new layer" CTA is at top of panel (consistent with all External panels)
- Clicking it navigates to a picker sub-view: breadcrumb header (`← Layers › Add new layer`), live search, 2-column grid of layer cards; selecting a card adds the layer and returns to the main view
- Each layer has: Height (inches), visibility/lock/delete icons
- View customization:
  - Exploded — gap between layers slider
  - Inner Build — assembled cross-section
  - Cutaway View — per-layer Front Cut Angle + Side Cut Angle sliders

### Images
- Tabs: Previews | Renders
- **Previews**: 16:9 thumbnail card, name, camera name, relative time
- **Renders**: horizontal card (80px thumbnail + body: name, status badge, camera · dimensions)
- **Image Viewer** (full-screen overlay): dark rail (#1a1a1a), viewer-meta typography, 16:9 thumbnails, orange border active state, glassmorphism caption bar (filename left, dimensions right)
- **Export Image modal** — premium three-zone layout (header / two-column body / footer):
  - Left column: camera checklist with Select All
  - Right column settings:
    - Mode toggle: Preview | High Resolution ♛ (segmented pill)
    - Resolution: 1080p / 1440p / 4k (mode-aware presets — Preview uses screen sizes, High Res uses standard px)
    - Dimensions: Width × Height with aspect ratio lock button between inputs
    - DPI (High Res only): selector (72/96/150/300) + computed physical size — folded inline into File Name row
    - File Name row: `[filename] [DPI ▼ — High Res only] [JPG/PNG ▼]`
    - Render options: Transparent background / Shadow on floor toggles
  - Footer: right-aligned "Create Image" CTA

### Cameras
- + Add Current View (saves current 3D camera angle with snapshot)
- Import Camera Presets (adds 3 offset angle presets)
- Camera cards: hover/active reveals pencil (rename) + trash (delete) icons
  - Rename: inline input replaces name span; Enter/blur saves, Escape cancels
  - Delete: removes from state; Current Camera is immutable (no actions shown)
- Preset search

---

## Pattern Library
- Shared across Top, Wall, Bottom sections
- Known patterns: Diamond quilt 1234, x shape top quilt, Pattern_top_quilt, Lofting_left_bm, Polka Dot Quilt, Scalloped Mesh
- Searchable, with Upload option

---

## Add to Library Modal
- Triggered by "Add to library" top-right button
- Shows 3D exploded mattress preview
- Mattress name input
- Model slot counter (e.g. "10 Models Available: 397")
- Save button

---

## Current UI Decisions Reflected in Code
- Search inputs use a neutral dark-surface treatment rather than a strong primary-color focus state; icon is positioned inside the input using `.panel-search` / `.style-search-input-wrap` patterns
- Panel cards use orange primarily for selected states, with restrained use elsewhere
- Card labels are compact, single-line, medium-weight names with inline dimensions
- The builder favors consistent panel scaffolding: search row + 2-column option grid where applicable
- Modals use three-zone layout (header / body / footer) with two-column body grids where content warrants it
- Camera cards support inline rename and delete; Current Camera is always immutable
- `form-select` uses custom chevron SVG, fully styled to match dark theme
- All panel CTA bars use `btn-panel-cta` / `btn-panel-cta--outline`; the `--inner` modifier removes top padding/border for stacked CTAs (do not use `--inner` when full padding is needed)

## Build Status (as of 2026-04-07)
All panels, output flows, and core viewport interactions are functional. Remaining work is refinement and backend integration.
- **Done:** All 11 External panels, Internal layers panel (incl. picker sub-view with breadcrumb nav + search + 2-col grid), Export modal, Image Viewer, Camera management, File operations, Interactive 3D viewport (hover highlight + click-to-panel)
- **Not yet wired to backend:** Create Image (uses canvas capture), Camera snapshots, Add to Library (localStorage only)

## Interactive Viewport (added 2026-04-07)
- Raycasting via `THREE.Raycaster` runs on every `mousemove` against `interactiveMeshes[]`
- `interactiveMeshes` is rebuilt inside `buildMattress()` on every size/height/mode change — only populated in external mode
- Each mesh in `interactiveMeshes` gets a **cloned material** so emissive changes are isolated (shared base materials `bodyMat`, `topMat`, `sideMat`, `tapeMat` are never mutated)
- Hover: papaya orange emissive (`0xec4e0b`, intensity `0.14`) + `cursor: pointer`
- Click → `window.setSection(part)` opens the matching panel; drag detection (mousedown delta > 4px) prevents panel switch on orbit gestures
- Part → panel mapping: `top` → Top, `wall` → Wall, `tape` → Tape, `bottom` → Bottom
- `window.setSection` is exposed from `app.js` for viewport to call cross-module
