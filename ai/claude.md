# Claude Operating Contract

You are working on an Imagine.io Mattress Builder project.

Your role is to build, maintain, and continuously evolve this repository as a reliable, low-token, shared context system for the team.

---

# Non-Negotiable Rule

All meaningful progress must be written to files.

If it is not written to files, it does not exist.

Chat is temporary. Files are permanent memory.

---

# Objective

- Maintain a clean and minimal project structure
- Ensure long-term context persistence through files
- Minimize token usage through selective context loading
- Support both short-term tasks and long-term system evolution
- Continuously improve the quality of documentation

---

# Core Principles

- Files > Chat
- Read less, think better
- Write only what matters
- Do not assume missing information
- Keep everything structured and concise

---

# Project Initialization

If the repository is empty:

Create ONLY:

/docs/product.md  
/context/system/overview.md  
/context/system/flows.md  
/context/decisions.md  
/tasks/backlog.md  
/tasks/done.md  

Populate with minimal, structured placeholders.

Do NOT over-create files.

---

# Context Loading Strategy

DO NOT read all files.

Always start with:
/docs/product.md

Then read ONLY if required:
/context/system/*  
/context/decisions.md  
/tasks/backlog.md  

Avoid unnecessary reads.

---

# Adaptive Behavior

Before starting any task:

1. Identify task complexity

### Simple Task
- Small change
- Limited scope

→ Read minimal context  
→ Use Haiku or Sonnet  

---

### Medium Task
- UX improvement
- Feature addition

→ Read relevant system files  
→ Use Sonnet  

---

### Complex Task
- Redesign
- System-level thinking

→ Read broader context  
→ Use Sonnet or Opus  

---

Do NOT over-read context for simple tasks.

---

# Model Usage Rules

### Haiku
Use for:
- Summaries
- Structuring content
- Small edits

---

### Sonnet (Default)
Use for:
- Most tasks
- UX and product work

---

### Opus
Use ONLY for:
- Complex reasoning
- Ambiguous or undefined problems

---

Default → Sonnet  
Adjust only when necessary  

---

# Design System Rule (Imagine.io)

Prism Design Tokens are available.

Use them ONLY when:
- UI or styling decisions are required

Do NOT use them for:
- Documentation
- Logic
- System understanding

---

# Task Management

## Default Mode (Single Session)

- Pick tasks directly from /tasks/backlog.md  
- No strict requirement to use in-progress  

---

## Multi-Session Mode (If Needed)

- Use /tasks/in-progress.md to claim tasks  
- Avoid collisions  
- Do not work on tasks already in progress  

---

## Task Flow

backlog → in-progress (optional) → done  

---

# Task Execution Protocol

Before task:
- Identify scope
- Read only required context

During task:
- Stay within scope
- Avoid unrelated exploration

After task:
- Move task to /tasks/done.md  
- Add concise summary  

---

# Write-Back Protocol (Critical)

After ANY meaningful task, update relevant files.

---

## When to Write

- New system understanding
- Flow clarity
- Feature behavior identified
- Decisions made
- Task completed

---

## Where to Write

System:
/context/system/*

Decisions:
/context/decisions.md

Tasks:
/tasks/*

Product:
/docs/product.md

---

## How to Write

- Use bullet points
- Keep content dense
- Avoid repetition
- Update only relevant sections

---

## Completion Rule

A task is NOT complete until:

1. Output is generated  
2. Files are updated  

---

# Self-Evolving System (Important)

You must continuously improve the repository.

---

## Responsibilities

- Refine unclear documentation
- Break large files into smaller ones when needed
- Remove outdated or redundant information
- Keep structure clean and scalable

---

## When to Evolve

- When files become too large
- When structure becomes unclear
- When repeated patterns emerge
- When better organization is possible

---

## Constraints

- Do NOT restructure aggressively without reason
- Do NOT create unnecessary files
- Prefer incremental improvements

---

# Context Budgeting

Before reading:

1. Identify required information
2. Read minimal files

Guideline:

- Small task → 1 file  
- Medium → 2–3 files  
- Complex → broader, but controlled  

---

# Repository Behavior

- Write for team understanding
- Keep content clean and structured
- Avoid raw or messy dumps
- Maintain clarity over time

---

# File Writing Style

- Bullet points only
- No long paragraphs
- Clear headings
- Explicit unknowns

---

# Behavior Rules

- Be concise
- Do not over-explain
- Do not over-structure
- Ask if context is missing