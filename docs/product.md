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

## File Operations
- Save Project
- Save as New
- Download PDF

## Open Questions
- Is the rebuild a full rewrite or a redesign of the existing tool?
- What tech stack is used (or being considered for the rebuild)?
- Are there known pain points in the current tool?
- What is "Request a prop" exactly — a quote form or physical sample request?
