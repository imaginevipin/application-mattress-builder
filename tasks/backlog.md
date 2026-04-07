---
name: backlog
description: Task backlog for the Mattress Builder project
type: project
---

# Backlog

## Format
- [ ] Task — priority: high/medium/low — complexity: simple/medium/complex

---

## Discovery (remaining)

- [ ] Confirm rebuild scope — full rewrite or redesign/refactor? — priority: high — complexity: simple
- [ ] Confirm target tech stack — priority: high — complexity: simple
- [ ] Identify known pain points in the current tool — priority: high — complexity: simple
- [ ] Clarify "Request a prop" — quote form or physical sample request? — priority: medium — complexity: simple
- [ ] Are there Figma design files for the rebuild? — priority: high — complexity: simple

## Setup

- [x] Set up project stack and folder structure — done: 2026-04-02
- [x] Create production application shell using Prism dark-theme tokens — done: 2026-04-02
- [x] Archived experiment kept as reference only — done: 2026-04-02

## Features

- [x] Size panel — done: 2026-04-02 — 9 sizes, proportional CSS rects, live search, orange active footer, Three.js geometry rebuilds on selection
- [x] Height panel — done: 2026-04-02 — searchable preset cards, active state, viewport label updates, Three.js mattress thickness rebuilds
- [x] Top panel — done: 2026-04-04 — Add Top CTA, type selector, quilting pattern swatches with drill-down picker, tufts config form; shared UI primitives established in app.css
- [x] Wall panel — done: 2026-04-06
- [x] Tape panel — done: 2026-04-06
- [x] Label panel — done: 2026-04-06
- [x] Handle panel — done: 2026-04-06 (refactored to type-section-header pattern: 2026-04-06)
- [x] Bottom panel — done: 2026-04-06
- [x] Style panel (Textures, Materials, Colors, Properties) — done: 2026-04-06
- [x] Internal layers panel (Layers, Exploded/Cutaway view) — done: 2026-04-06
- [x] Create Image modal + output — done: 2026-04-06
- [x] Add to Library modal — done: 2026-04-06
- [x] Camera management — done: 2026-04-06
- [x] File operations shell (Save, Save as New, Quit, Download PDF summary) — done: 2026-04-02 — implemented browser-native project actions via dropdown menu, localStorage, reset state, printable summary

## UI Polish (2026-04-07)

- [x] Style panel — Textures tab: search icon moved inside input, Upload button height matched, textures mixed exclusive/normal — done: 2026-04-07
- [x] Cameras panel — Import Camera Presets padding fix (removed --inner modifier from CTA bar) — done: 2026-04-07
- [x] Cameras panel — inline rename (click pencil → editable input, Enter/blur saves, Escape cancels) + delete (trash icon, not available on Current Camera) — done: 2026-04-07
- [x] Export Image modal — full premium redesign: header/body/footer structure, segmented mode toggle, section labels, right-aligned CTA — done: 2026-04-07
- [x] Export Image modal — file row fixes: gap between filename and format, render options alignment (specificity fix), CTA button right-aligned auto-width — done: 2026-04-07
- [x] Export Image modal — High Resolution features: mode-aware resolution presets (Preview vs High Res px values), DPI selector with computed physical size, aspect ratio lock button, DPI folded into file name row — done: 2026-04-07
- [x] Images panel — Previews: 16:9 thumbnail, camera name + relative time meta (removed "Status: 0/1") — done: 2026-04-07
- [x] Images panel — Renders: horizontal card with 80px thumbnail, body with name/status badge/meta — done: 2026-04-07
- [x] Image Viewer — full redesign: dark rail (#1a1a1a), structured viewer-meta typography, 16:9 thumbnails, thumb-footer row, orange border active state, proper close button, glassmorphism caption bar with filename + dimensions — done: 2026-04-07
