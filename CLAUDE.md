This is an imagine.io project — apply the Prism Design System.

# Project
Mattress Builder — 3D mattress configurator web application.

# Context Loading
Start with: /docs/product.md
Then load as needed: /context/system/*, /context/decisions.md, /tasks/backlog.md

# Assets
- Fonts: /assets/fonts/ (6 PP Neue Montreal .otf files)
- Logos: /assets/logos/ (PNG variants: Horizontal Dark/Light, Vertical Dark/Light, Logo Mark)
- Screenshots of existing tool: /assets/existing-screenshots/

# Theme
This is a dark-themed application. Every screen uses the dark-theme token layer:
- Always import both `tokens.css` then `tokens-dark.css` (in that order)
- `tokens.css` — full PDS (Tier 1 primitives + Tier 2 light defaults, never edited)
- `tokens-dark.css` — overrides Tier 2 semantic aliases for dark backgrounds
- Tier 1 primitives are never overridden — only Tier 2 semantic aliases change

# Build Rules
- CSS must always be in a separate .css file — never embedded in HTML via <style> tags
- JS must always be in a separate .js file — never embedded in HTML via <script> tags
- One concern per file. HTML = structure, CSS = styles, JS = behaviour
- No exceptions, including quick experiments or prototypes

# Panel Body Pattern (MANDATORY)
All layer card property bodies must use the `compact-body` system. Use these helpers in app.js — never use `acc-props`, `xyz-inputs`, `form-input`, or `layerCardBodyHTML` for property panels:
- `xyzCompactRow(label, idPrefix, x, y, z)` — Scale/Position rows with X Y Z inputs
- `sliderCompactRow(label, id, min, max, step, val)` — slider with synced number input
- `selectCompactRow(label, id, options, value)` — dropdown row
- Wrap everything in `<div class="compact-body">...</div>` (no other wrapper)
- Action buttons at bottom: `<div class="acc-action-group compact-action-group">` inside compact-body

# Operating Rules
See /ai/claude.md for full contract.
See /ai/github.md for Git/GitHub protocol.
