---
name: system-flows
description: User flows through the Mattress Builder tool
type: project
---

# System Flows

## Primary Flow: Configure a Mattress (External)

1. **Size** — search or browse mattress dimensions (King, Queen, Twin, etc.) and select one
2. **Height** — search or browse overall height presets and select one
3. **Top** — choose top type (Box Pillow / Smooth), set quilting patterns, add tufts
4. **Wall** — choose side quilting pattern, adjust scale/position
5. **Tape** — add border tape, set type and position
6. **Label** — place brand label, set position/scale
7. **Handle** — add handle(s), mirror/anchor as needed
8. **Bottom** — set bottom type, or mirror top, set quilting pattern
9. **Style** — apply textures / materials / colors / properties to selected parts
10. **Images / Cameras** — capture previews, manage camera angles

> Flow is non-linear. User can jump to any section at any time via sidebar icons **or by clicking directly on the 3D mattress**.

Current implemented state: all panels and the interactive viewport are live.

---

## Shortcut Flow: Click a 3D Part to Open Its Panel

Available in External mode only.

1. Hover over any visible mattress part in the 3D viewport
2. Part glows orange (emissive highlight) and cursor changes to pointer
3. Click the part → the corresponding sidebar panel opens immediately
4. Orbit/drag is unaffected — the panel only opens on a true click (not a drag)

Part → panel mapping:
- Top quilting surface → Top panel
- Side walls (front/back/left/right) → Wall panel
- Tape border → Tape panel
- Main body shell → Bottom panel

---

## Secondary Flow: Internal Layer Build

1. Switch mode: External → Internal (top bar toggle)
2. **Layers** — click "Add new layer" (top CTA) → navigates to layer picker sub-view
   - Breadcrumb header: `← Layers › Add new layer` (back button returns without adding)
   - Search field filters the grid live
   - 2-column grid of layer type cards; click any card → layer is added and panel returns to main Layers view
3. Set height per layer via the expanded card slider
4. Use View customization:
   - Exploded — inspect layer separation
   - Inner Build — see assembled construction
   - Cutaway View — per-layer cut angles to reveal cross-section
5. Apply materials via Style tab

---

## Output Flow: Create Image

1. Click "Create Image" (top right)
2. Modal opens:
   - Choose Preview or High Resolution
   - Set resolution (480p / 1080p / 4k or custom px)
   - Set file name
   - Toggle Transparent Bg / Shadow on floor
3. Click "Create Image"
4. Result appears in Images → Previews tab
5. Preview thumbnail is clickable — opens full image with filename shown

Current implemented state:
- Button exists in top bar
- Output flow is not built yet

---

## Output Flow: Add to Library

1. Click "Add to library" (top right)
2. Modal shows exploded 3D view
3. Enter mattress name
4. Click Save
5. Mattress saved to team library (slot count decremented)

Current implemented state:
- Button exists in top bar
- Modal flow is not built yet

---

## Project File Menu Flow

1. Click `File` in the top bar
2. Dropdown opens under the File button
3. Choose one action:
   - `Save Project` — stores current builder state in `localStorage`
   - `Save as New` — stores a timestamped copy in `localStorage`
   - `Quit Project` — resets builder state to defaults
   - `Download Pdf` — opens a printable project summary for export
4. Toast feedback appears in the bottom-right corner

---

## Quilt Pattern Selection Sub-flow

Used in: Top, Wall, Bottom
1. Click quilting pattern swatch in panel
2. Pattern selector opens (full panel, "< Back" to return)
3. Search by name or browse grid
4. Click pattern — applies immediately to 3D view
5. "< Back" returns to parent section

---

## Tuft Configuration Sub-flow

Used in: Top, Wall
1. Click "+ Add tufts"
2. Tuft type selector opens (e.g. Classic Tuft)
3. Set Side: Front / Mirror Tuft / All Sides
4. Adjust grid parameters (columns, rows, gap, diameter, offset, depth)
5. Save Preset to reuse

---

## Camera Management Sub-flow

1. Navigate to Cameras section
2. Orbit 3D viewport to desired angle
3. Click "+ Add Current View" → name prompt → Save
4. OR: Import Camera Presets from file
5. Saved presets appear in list and are selectable for image export
