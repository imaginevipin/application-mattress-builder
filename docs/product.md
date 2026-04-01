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
- Early UI exploration work is preserved in `/archive/experiment/` as reference, not as the active implementation

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
- No active application stack or runtime has been initialized yet in the repository root
- Current repository progress is discovery, design-token setup, and archived UI exploration
- Next meaningful build step is to set up the actual app structure and start implementing the production shell with Prism dark-theme tokens

## File Operations
- Save Project
- Save as New
- Download PDF

## Open Questions
- Is the rebuild a full rewrite or a redesign of the existing tool?
- What tech stack is used (or being considered for the rebuild)?
- Are there known pain points in the current tool?
- What is "Request a prop" exactly — a quote form or physical sample request?
