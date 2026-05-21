# Mattress Builder — Work Context

**Date:** 2026-05-21
**Working directory:** `outputs/v2/` (the active v2 build)
**Files being edited:** `outputs/v2/index.html`, `outputs/v2/app.css`, `outputs/v2/app.js`

---

## What This Project Is

A 3D mattress configurator web application built for imagine.io. The UI has a left icon strip (Mattress, Top, Wall, Bottom, Accessories, Images), a context panel on the left, and a 3D viewport on the right. The app has External and Internal configuration modes.

The project has two versioned outputs:
- `outputs/v1/` — snapshot of the original build (do not touch)
- `outputs/v2/` — active rebuild from new Figma-exported screens

---

## Version Switcher (V1 / V2 toggle bar)

A version switcher bar sits above the topbar, allowing the product team to demo two distinct modes without separate URLs. It uses `.version-bar` / `.version-pill` CSS and `switchVersion(v)` in `app.js`.

- **Version 1** — standard configurator. "Request Props" button in topbar (no request panel).
- **Version 2** — configurator + "My Requests" button that opens the catalog marketplace panel.

Switching from V2→V1 automatically closes the request panel and reverts the button label.

---

## Imagine Assistant (AI Chat Widget)

A floating chat assistant (FAB + sliding panel) docked at the bottom-right of the viewport. Relevant only in **Version 1**; the FAB is hidden when Version 2 is active.

- **FAB:** `#aiFab` — 44px papaya circle, `z-index` above viewport
- **Panel:** `#aiPanel` — 380px wide, slides in via `opacity` + `transform` transition, class `.is-open`
- **Chat:** `#aiPanelBody` — scrolling message list; `appendMessage(text, role)` adds bubbles
- **Suggestion chips:** `.ai-chip` — clicking pre-fills the input
- **Input:** `#aiInputField` + `#aiInputSend`
- **Close:** `#aiPanelClose`
- All wired in `initAssistant()` in `app.js`

---

## My Requests — Catalog Marketplace Panel

A right-side `aside.request-panel` (300px) toggled by the "My Requests" topbar button in Version 2. Contains two tabs: **Browse** and **My Requests**.

### Browse tab
- Category filter strip (`#reqCatStrip`) with pills: All / Texture / Pattern / Material / Model / Accessory
- Catalog list (`#reqCatalog`) — JS-rendered from the `CATALOG` array in `initAssistant()`
- Each row: colored category dot, item name, meta description, price, `+` add button
- Clicking `+` adds the item to the My Requests board, dims the catalog row, shows a toast

### My Requests tab
- Board (`#reqBoard`) — real raised cards (`background: #373737`, `border-radius: 6px`) with `gap: 8px`
- Each board card: category dot + uppercase label, item name, "Just now · Pending review" note, status badge + purchase/quote link
- Confirming purchase flips badge to "Confirmed" and removes the link
- Custom request input (`#reqInput` + `#reqSend`) — free-text submissions become `custom` category cards
- Tab count badge (`#reqCount`) shows live board card count

### Category colour system
| Category | Colour |
|---|---|
| Texture | `#9b7afc` |
| Pattern | `#f24b0b` |
| Material | `#4db8e0` |
| Model | `#5abe8a` |
| Accessory | `#f0a440` |
| Custom | `#888` |

### JS entry point
`initAssistant()` in `app.js` — handles chat panel, catalog rendering, category filtering, tab switching, board card creation, version switching, and My Requests button toggle.

---

## Card Style (Global)

All grid cards (size picker, height picker, picker tiles) share a unified dark card style defined in the Figma-parity override block at the bottom of `app.css`:

- **Preview area:** `background: var(--figma-card)` = `#555555`
- **Label bar:** `background: #666666`, white text `#f0f0f0`, dims text `#b0b0b0`
- **Border:** `1px solid #606060` default, `#888` on hover, `2px solid #f24b0b` when active
- **Border-radius:** `8px` (all cards and `layer-card-wrap` rows)

---

## UI Consistency Passes Completed

### Top Panel (May 20)
- Upload button moved into search row (sibling of search field)
- Settings gear → palette icon on all layer cards
- Sub-items (Top Quilting, Tufts) nested inside Mattress Top accordion
- Add link buttons: orange outline → gray filled pills (`#6a6a6a`)

### Bottom Panel — Design Token Parity (May 20 evening)
- Removed hardcoded `#panel-bottom .compact-*` overrides that bypassed the unified token system
- Bottom panel now inherits the same dark styles as Top/Wall

### Request Panel contrast fix (May 21)
- All secondary text brought up to `#999` minimum, primary labels at `#e0e0e0`
- Empty state icon: `#333` → `#666`; placeholder: `#4a4a4a` → `#777`

---

## Key State Fields

```javascript
// in createDefaultState():
topBaseExpanded: true   // controls expand/collapse of the Mattress Top accordion
```

---

## Key CSS Classes

| Class | Purpose |
|---|---|
| `.version-bar` / `.version-pill` | Top-of-app version switcher |
| `.ai-assistant` / `.ai-fab` / `.ai-panel` | Floating chat assistant |
| `.request-panel` | Right-side catalog marketplace panel |
| `.req-panel__tabs` / `.req-panel__tab` | Browse / My Requests tab bar |
| `.req-cat-strip` / `.req-cat` | Category filter pills |
| `.req-item` / `.req-item__dot` | Catalog row + category dot |
| `.req-board` / `.req-card` | My Requests board + cards |
| `.req-input-bar` / `.req-input` | Custom request text input bar |
| `.btn-action--active` | Active state for My Requests topbar button |
| `.picker-search-row` | Outer flex row wrapping search field + upload btn |
| `.layer-card__nested-body` | Container for sub-cards inside a base card accordion |
| `.add-links--in-card` | Row of gray pill add-link buttons inside the accordion |

---

## Architecture Notes

- No build tooling — raw HTML/CSS/JS, open directly in browser
- CSS token system: `tokens.css` (light defaults) → `tokens-dark.css` (dark overrides) → `app.css` (component styles)
- The Figma-parity overrides live at the **bottom** of `app.css` (around line 1580+) and use `--figma-*` custom properties and hardcoded hex values from the Figma export
- `makeLayerCard()` in `app.js` is the shared layer card builder used by Top, Wall, Bottom, and Accessories panels
- `initAssistant()` in `app.js` handles all chat + request panel logic, called from `initApp()`
- Picker open logic is in `bindTopMainEvents()` / `bindWallMainEvents()` etc. — each panel has its own bind function

---

## Reference Screens

Figma-exported reference PNGs are in:
- `new-external-screens/` — External mode screens (Top, Wall, Bottom, Accessories, etc.)
- `new-internal-screens/` — Internal mode screens (Layers, Layout)

When in doubt about intended UI, compare against these PNG exports.
