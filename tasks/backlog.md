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
- [ ] Internal layers panel (Layers, Exploded/Cutaway view) — priority: high — complexity: complex
- [ ] Create Image modal + output — priority: medium — complexity: medium
- [ ] Add to Library modal — priority: medium — complexity: medium
- [ ] Camera management — priority: medium — complexity: medium
- [x] File operations shell (Save, Save as New, Quit, Download PDF summary) — done: 2026-04-02 — implemented browser-native project actions via dropdown menu, localStorage, reset state, printable summary
