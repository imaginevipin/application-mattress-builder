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

# Operating Rules
See /ai/claude.md for full contract.
See /ai/github.md for Git/GitHub protocol.
