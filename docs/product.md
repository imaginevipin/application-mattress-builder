---
name: product
description: Core product definition for the Mattress Builder application
type: project
---

# Mattress Builder — Product

## What It Is
- A real-time 3D mattress configurator web application
- Users design a mattress visually: outer appearance + internal layer construction
- Live at: https://app.imagine.io/builder/[id]
- Built by / for imagine.io
- Existing tool is being rebuilt/improved — screenshots captured from live version

## Platform
- Web application (browser-based)
- 3D viewport (WebGL/Three.js or similar renderer)
- Single-page tool — no multi-page navigation

## Progress Snapshot
- Repository scaffolding is in place: product, system context, decisions, and task tracking files are being used as persistent memory
- Existing product understanding has been captured from 46 screenshots stored in `/assets/existing-screenshots/`
- Prism Design System tokens are initialized in `/tokens.css`
- Dark-theme semantic overrides are initialized in `/tokens-dark.css`
- Brand assets are stored in `/assets/fonts/` and `/assets/logos/`
- Early UI exploration work is preserved in `/archives/experiments/` as reference, not as the active implementation
- Active builder implementation includes a refined top bar, accessible shell polish, live Size + Height panels, a Three.js viewport, and lightweight file-menu actions

## Who Uses It
- Likely B2B: mattress manufacturers, brands, or retailers configuring products
- Users can name mattresses, save to library, request quotes, create images

## Output Actions (top-right bar)
- Request a prop — quotes/sample requests
- Create Image — renders a still (preview or hi-res)
- Add to library — saves configured mattress to a project library

## Core Modes
- External — configures the outer appearance (Size, Height, Top, Wall, Tape, Label, Handle, Bottom)
- Internal — configures the internal build (foam/coil layers, exploded/cutaway views)

## Current Implementation State
- Screen 1 is live in `index.html` + `app.css` + `app.js` + `viewport.js`
- App shell: topbar with imagine.io logo mark, File dropdown, External/Internal toggle, editable mattress title, action buttons, icon strip, context panel, Three.js viewport
- Accessibility/readability pass applied: placeholder contrast, keyboard focus states, ARIA state/labels, live viewport label, quieter input styling
- Size panel: 9 sizes, proportional rects, live search, tuned card sizing/typography, active state; Three.js mattress geometry rebuilds on size change
- Height panel: 6 preset profiles, live search, 2-column card grid, active selection state; Three.js mattress thickness rebuilds on height change
- File operations shell is implemented in-browser: Save Project, Save as New, Quit Project, Download PDF summary
- Top panel: rebuilt to match Live version — Add Top CTA (top of panel, always visible); clicking CTA or type name opens a type picker subview (8 types: Box Pillow Top + 7 Euro Top variants with inch sizes, searchable 2-col grid, outline cross-section thumbnails matching Size/Height card style); section header splits into type name (→ opens type picker to change) + separate collapse chevron; type thumbnail swatch in main view; quilting pattern swatches (top + gusset) → pattern picker sub-view (6 CSS patterns, searchable, Upload button, Back nav); Add tufts row with Alpha Version outlined badge; tuft config expands with new header (‹ Classic Tuft ›, Alpha Version badge, delete btn, collapse chevron), tuft swatch row, 8 number inputs, Comfort Depth slider, Save Preset; tuft body is collapsible
- Wall panel: same structure as Top — Add Wall CTA at top; wall type picker subview (5 wall types: Quilted Panel, Stretch Knit, Damask Weave, Woven Fabric, Smooth Panel, with neutral fabric texture thumbnails); section header with name (→ type picker) + collapse chevron; wall + band quilting pattern swatches; Add tufts with Alpha Version badge; full tuft config with delete/collapse; all mirrors Top panel primitives
- Tape panel: fully implemented — type swatch selector opens tape style picker (6 styles with CSS pattern previews, live search); Position slider; Scale X/Y/Z 3-col grid; Reset Scale CTA
- Label panel: fully implemented — type swatch picker (6 label shapes with CSS outline previews, live search); Side dropdown; Scale X/Y/Z; Position X/Y/Z sliders; Adjacent Object / Move Object buttons
- Handle panel: fully implemented — refactored to type-section-header pattern (matching Tape/Label); header shows "Type : Side"; collapsible section body; Side now in pattern-row inside body
- Bottom panel: fully implemented — Mirror Top to Bottom toggle switch; Add Bottom CTA; type selector ‹ › cycle (4 types); quilting pattern swatch with shared pattern picker sub-view
- Style panel: fully implemented — 4-tab panel (Textures / Materials / Colors / Properties); Textures: inline search+Upload bar, 2-col asset grid with "Exclusive for Mattress" badge; Materials: filter chips (Mattress Builder / Cotton / Trim AI), search, asset grid; Colors: draggable HSV field + hue slider + HEX input (bidirectional sync) + RGB channel sliders with colored gradient tracks + color swatches (add/remove/select); Properties: material preview, Front/Fit texture toggle, Width/Height + reset, Position X/Y, rotation presets (0/90/180/270), Glossy slider
- Top-right action buttons (`Request Prop`, `Add to library`, `Create Image`) are present in the shell but not implemented yet
- All external panels (Size, Height, Top, Wall, Tape, Label, Handle, Bottom) are fully implemented
- Tech stack: vanilla HTML/CSS/JS + Three.js r160 (via CDN importmap) + Prism dark-theme tokens
- Typography rule: all text ≤ 18px (body/small/caption scale only, no H1–H3)
- Shared UI primitives in app.css: `.panel-subview` (flex col), `.panel-cta-bar`, `.panel-cta-bar--inner`, `.panel-cta-bar--foot` (sticky bottom), `.btn-panel-cta`, `.type-selector-row`, `.type-selector-row--compact`, `.type-cycle-btn`, `.type-name-btn`, `.type-section-header`, `.type-section-name` (opens picker), `.type-section-collapse` (chevron-only button), `.type-section-body`, `.type-thumb-row`, `.top-type-thumb`, `.wall-type-thumb`, `.type-swatch-row`, `.type-swatch-btn`, `.type-thumb-sm`, `.pattern-row`, `.pattern-swatch-btn`, `.pattern-thumb`, `.feature-add-row`, `.btn-feature-add`, `.alpha-badge`, `.alpha-badge--sm`, `.tuft-config`, `.tuft-config__header`, `.tuft-config__header-left`, `.tuft-config__header-right`, `.tuft-type-name`, `.tuft-action-btn`, `.tuft-swatch-row`, `.tuft-swatch`, `.form-grid-2`, `.form-grid-3`, `.form-field`, `.form-field-label`, `.form-input`, `.form-select`, `.form-range`, `.form-slider-field`, `.form-slider-hint`, `.section-label`, `.side-select-row`, `.toggle-row`, `.toggle-switch`, `.toggle-input`, `.toggle-track`, `.btn-form-action`, `.btn-save-preset`, `.picker-topbar`, `.btn-back-nav`, `.btn-upload-action`, `.pattern-picker-grid`, `.pattern-card`, CSS pattern classes (`ptn-*`), top type classes (`tt-*`), wall type classes (`wt-*`), tape CSS classes (`tape-*`), label CSS classes (`lbl-*`), handle CSS classes (`hdl-*`)
- TOP_TYPES is now an array of objects `{ id, name, css }` — 8 types (Box Pillow Top + Euro Top 1.5/2/2.5/3/3.75/4/5.75 Inch); same shape for WALL_TYPES (5 types); state now carries `topTypePickerQuery`, `topSectionCollapsed`, `topTuftCollapsed`, and wall equivalents
- Next: Images panel (Previews + Renders tabs) — priority: high — complexity: medium
- Deferred UX work on Top/Wall panels: consider full UX revamp (beyond Live-version parity) in a future pass — current state is Live-version parity with minor improvements

## File Operations
- Save Project — stores current builder state in `localStorage`
- Save as New — stores a timestamped copy in `localStorage`
- Quit Project — resets current builder state to defaults
- Download PDF — opens a printable project summary for export

## Open Questions
- Is the rebuild a full rewrite or a redesign of the existing tool?
- What tech stack is used (or being considered for the rebuild)?
- Are there known pain points in the current tool?
- What is "Request a prop" exactly — a quote form or physical sample request?
