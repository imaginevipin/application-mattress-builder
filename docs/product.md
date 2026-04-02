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
- Repository scaffolding is in place: product, system context, decisions, and task tracking files exist and are being used as persistent memory
- Existing product understanding has been captured from 46 screenshots stored in `/assets/existing-screenshots/`
- Prism Design System tokens are initialized in `/tokens.css`
- Dark-theme semantic overrides are initialized in `/tokens-dark.css`
- Brand assets are stored in `/assets/fonts/` and `/assets/logos/`
- Early UI exploration work is preserved in `/archives/experiments/` as reference, not as the active implementation
- Active builder implementation now includes a refined top bar, accessible shell polish, live Size + Height panels, and lightweight file-menu actions

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
- Screen 1 is live: `index.html` + `app.css` + `app.js` + `viewport.js` committed and pushed (commit 48d25f2)
- App shell: topbar with imagine.io logo mark, File dropdown, External/Internal toggle, editable mattress title, action buttons, icon strip, context panel, Three.js viewport
- Accessibility/readability pass applied: placeholder contrast, keyboard focus states, ARIA state/labels, live viewport label, quieter input styling
- Size panel: 9 sizes, proportional rects, live search, tuned card sizing/typography, active state; Three.js mattress geometry rebuilds on size change
- Height panel: 6 preset profiles, live search, 2-column card grid, active selection state; Three.js mattress thickness rebuilds on height change
- File operations shell is implemented in-browser: Save Project, Save as New, Quit Project, Download PDF summary
- Remaining external/internal sections are still wired as placeholders
- Tech stack: vanilla HTML/CSS/JS + Three.js r160 (via CDN importmap) + Prism dark-theme tokens
- Typography rule: all text ≤ 18px (body/small/caption scale only, no H1–H3)
- Next: Top panel and remaining external configuration flows

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
