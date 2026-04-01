---
name: system-overview
description: App layout, structure, modes and sections of the Mattress Builder
type: project
---

# System Overview

## Layout
```
┌─────────────────────────────────────────────────┐
│  [File ▾]  [External/Internal ▾]   New Mattress_4   [Request a prop] [Create Image] [Add to library]  │
├──┬──────────────────┬────────────────────────────┤
│  │                  │                            │
│ Icons  Context      │     3D Viewport            │
│  │    Panel         │                            │
│  │    (dynamic)     │                            │
│  │                  │   [label: King Smooth Bottom] │
└──┴──────────────────┴────────────────────────────┘
```

- Left icon strip: section selector
- Context panel: changes based on selected section
- 3D viewport: live mattress preview, orbitable/zoomable
- Bottom of canvas: label showing currently selected component name

## Repository State
- `/tokens.css` contains the base Prism Design System token layer, typography, spacing, and border aliases
- `/tokens-dark.css` contains the mattress-builder dark-theme semantic overrides and must be imported after `/tokens.css`
- `/assets/fonts/` contains six PP Neue Montreal font files used by the token layer and experiments
- `/assets/logos/` contains imagine.io logo variants used by the archived prototype
- `/archive/experiment/` contains an archived first-screen prototype plus an experimental design-system page kept for reference only
- `/assets/existing-screenshots/` contains the screenshot set used to document the current production builder behavior

---

## Modes

### External Mode
Configures the outer appearance of the mattress.
Sidebar sections (top to bottom):

| Icon | Section  | What it controls |
|------|----------|-----------------|
| Size | Size | Mattress dimensions (King, Queen, Twin, Twin XL, Full/Double, California King, Small Double, etc.) |
| Height | Height | Mattress height in inches (4"–7"+, with layer count variants) |
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
1. **Textures** — searchable library, "Exclusive for Mattress" badge, Upload button
2. **Materials** — filtered by tags (Mattress Builder, Cotton, Flexi AI); e.g. Linen Cotton Blend 1/2/3, Fabric 007
3. **Colors** — full HSB/RGB/Hex picker, color swatches
4. **Properties** — Width/Height (inches), Position X/Y, Rotation, Gloss slider, Fit Texture / Reset Texture, Save in library

### Layers (Internal mode)
- Layer types: Convoluted Foam 1, Convoluted Foam 2, Edge-To-Edge Pocket Coil, Fiber Batting, Foam Slab, Hole Punch Foam Layer
- Each layer has: Height (inches), visibility/lock/delete icons
- View customization:
  - Exploded — gap between layers slider
  - Inner Build — assembled cross-section
  - Cutaway View — per-layer Front Cut Angle + Side Cut Angle sliders

### Images
- Tabs: Previews | Renders
- Previews: thumbnail, name, date, resolution
- Renders: separate render queue ("No renders produced yet" default state)
- Create Image modal:
  - Toggle: Preview / High Resolution
  - Resolution presets: 480p / 1080p / 4k
  - Custom width/height (px)
  - File name
  - Options: Transparent Bg / Shadow on floor

### Cameras
- + Add Current View (saves current 3D camera angle)
- Import Camera Presets
- Lists named camera presets with resolution (e.g. Camera 1 — 1920×1080)
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
