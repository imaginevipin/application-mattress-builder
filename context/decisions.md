---
name: decisions
description: Architectural and product decisions log
type: project
---

# Decisions

## Format
Each entry: **Date | Decision | Reason | Alternatives considered**

---

## Log

### 2026-04-01 | Project initialized
- Created base file structure per claude.md contract
- No architectural decisions made yet — awaiting product brief

### 2026-04-01 | Design system: Prism only
- **Decision:** Use Prism Design System (PDS) exclusively — no custom or experimental token systems
- **Reason:** An experiment folder was created to explore a 3-color minimal system; concluded PDS is the right foundation and experiment was archived
- **Alternatives considered:** Custom 3-color token system (archived in /archive/experiment/)

### 2026-04-01 | Dark theme token strategy
- **Decision:** Dual-import pattern — `tokens.css` (PDS, never edited) + `tokens-dark.css` (Tier 2 overrides only)
- **Reason:** Mattress Builder is a dark-themed app; PDS Tier 1 primitives are theme-neutral and must stay unchanged for Figma sync compatibility
- **What changes in dark:** surface-default/page → `#141414`, text-default-* → white/grey scale, subtle semantic surfaces/borders flip from top of scale (pastels) to bottom (deep tints), disabled tokens shift darker
- **What does not change:** All solid semantic colors (primary, error, info, warning, success) — they work on both themes

### 2026-04-01 | Discovery assets and experiments are retained in-repo
- **Decision:** Keep screenshot research, brand assets, and the archived experiment inside the repository instead of treating them as temporary local files
- **Reason:** The project contract requires meaningful progress to live in files; these artifacts explain how current system understanding and early UI direction were derived
- **Alternatives considered:** Keep assets local-only or delete the experiment after documenting conclusions
