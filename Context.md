# Mattress Builder — Work Context

**Date:** 2026-05-20
**Working directory:** `outputs/v2/` (the active v2 build)
**Files being edited:** `outputs/v2/index.html`, `outputs/v2/app.css`, `outputs/v2/app.js`

---

## What This Project Is

A 3D mattress configurator web application built for imagine.io. The UI has a left icon strip (Mattress, Top, Wall, Bottom, Accessories, Images), a context panel on the left, and a 3D viewport on the right. The app has External and Internal configuration modes.

The project has two versioned outputs:
- `outputs/v1/` — snapshot of the original build (do not touch)
- `outputs/v2/` — active rebuild from new Figma-exported screens

---

## Current Work Pass: UI Consistency — Top Panel

We are aligning `outputs/v2/` to match the new Figma-exported reference screens. The work is section-by-section starting with **Top**, then Wall, Bottom, etc.

### Changes Completed (Top panel)

#### 1. Picker Sub-View Layout
- **Upload button** moved out of the picker header and into the search row, as a sibling of the search field (not inside it)
- A new **`.picker-search-row`** wrapper holds the search field + upload button side-by-side
- **Filter icon** (`tune`) added inside the search field
- **Back button** header made more compact (`min-height: 36px`)

#### 2. Settings → Palette Icon
- The settings gear icon on all layer cards changed to a **palette** icon (`palette`) to match Figma
- Both the thumbnail click and the palette icon click now open the picker (same behaviour)

#### 3. Sub-items Nested Inside Base Card Accordion
- Previously: "Top Quilting", "Tufts" cards appeared as separate sibling cards at the same level as "Mattress Top"
- Now: They are nested **inside** the Mattress Top card's accordion body
- Add links ("+ Add Quilting", "+ Add Tufts") also live inside the accordion, not outside
- The Mattress Top card has its own expand/collapse toggle (`topBaseExpanded`, defaults to `true`)
- Sub-card `min-height` inflation (inherited from `#panel-top .layer-card-wrap { min-height: 104px }`) fixed with higher-specificity override

#### 4. Add Link Button Style
- Buttons changed from orange outline → gray filled pills matching Figma (`background: #6a6a6a`, white text, `min-height: 24px`)
- Row layout (`flex-direction: row`, `gap: 4px`) matching Figma side-by-side layout

#### 5. Upload Button Style
- Upload button in picker search row now uses filled `#6a6a6a` style, no visible border — matches Figma

---

## Key State Fields Added

```javascript
// in createDefaultState():
topBaseExpanded: true   // controls expand/collapse of the Mattress Top accordion
```

---

## Key CSS Classes Added

| Class | Purpose |
|---|---|
| `.picker-search-row` | Outer flex row wrapping search field + upload btn |
| `.picker-filter-btn` | Filter icon button inside search field |
| `.layer-card__nested-body` | Container for sub-cards inside a base card accordion |
| `.add-links--in-card` | Row of gray pill add-link buttons inside the accordion |

---

## What's Next

1. **Wall panel** — apply the same three changes:
   - Sub-items (Wall Quilting, Tufts) nested inside the Wall layer card accordion
   - Palette icon on gear (already done globally via `makeLayerCard`)
   - Picker search row layout (Upload next to search, not inside it)

2. **Bottom panel** — same nesting/accordion treatment

3. **Accessories panel** — review for any similar patterns

---

## Reference Screens

Figma-exported reference PNGs are in:
- `new-external-screens/` — External mode screens (Top, Wall, Bottom, Accessories, etc.)
- `new-internal-screens/` — Internal mode screens (Layers, Layout)

When in doubt about intended UI, compare against these PNG exports.

---

## Architecture Notes

- No build tooling — raw HTML/CSS/JS, open directly in browser
- CSS token system: `tokens.css` (light defaults) → `tokens-dark.css` (dark overrides) → `app.css` (component styles)
- The Figma-parity overrides live at the **bottom** of `app.css` (around line 1580+) and use hardcoded hex values from the Figma export
- `makeLayerCard()` in `app.js` is the shared layer card builder used by Top, Wall, Bottom, and Accessories panels
- Picker open logic is in `bindTopMainEvents()` / `bindWallMainEvents()` etc. — each panel has its own bind function
