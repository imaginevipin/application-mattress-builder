# GitHub Interaction Protocol

Repository:
https://github.com/imaginevipin/application-mattress-builder.git

---

## Core Principle

This repository is the single source of truth for the team.

All meaningful progress must be reflected here in a clean, structured, and readable manner.

Chat is temporary. GitHub is persistent.

---

## Objective

- Keep the repository always up to date with meaningful progress
- Ensure all changes are understandable by team members
- Maintain a clean and reliable commit history
- Support collaboration across multiple sessions or tools

---

## When to Push

Push ONLY when:

- A meaningful task is completed
- Multiple related updates are ready
- The repository reflects a stable and consistent state

---

## Do NOT Push When

- Work is incomplete or experimental
- Changes are messy or unclear
- Files are not properly updated
- Context is missing or inconsistent

---

## Push Workflow

Before pushing:

1. Ensure all relevant files are updated (write-back protocol followed)
2. Ensure content is clean, structured, and readable
3. Ensure no broken or partial updates exist
4. Ensure changes are scoped to the task

---

## Commit Message Format

[Type] Short description

Details:
- Key changes made
- Files affected
- Important notes (if any)

---

## Commit Types

- feat → new feature
- fix → bug fix
- refactor → structural improvement
- docs → documentation updates
- chore → minor maintenance

---

## Example Commit

docs: initialize mattress builder project structure

Details:
- Added product and system context files
- Created task tracking structure
- Defined Claude operating rules

---

## Safety Rules

- Do NOT delete important files unless necessary
- Do NOT overwrite unrelated work
- Do NOT introduce breaking or inconsistent changes
- Do NOT push unclear or poorly structured updates

---

## Multi-Session Safety

If multiple sessions or contributors are active:

- Do NOT push if unsure about repository state
- Do NOT override others’ work
- Instead, prepare commit summary and stop

---

## If Direct Push Is Not Possible

Provide:

1. List of files changed
2. Suggested commit message
3. Clear summary of changes

Ensure repository is ready for manual push by a human or another tool.

---

## Responsibility

You must:

- Keep repository clean and structured
- Ensure all updates improve shared understanding
- Write changes so they are understandable without chat context
- Maintain consistency across files

---

## Repository Behavior

- Prefer clarity over cleverness
- Avoid duplication across files
- Keep updates scoped and relevant
- Write for long-term maintainability

---

## Important

If pushing is supported in the environment:

- Use the repository URL provided above

If pushing is NOT supported:

- Prepare everything for a clean and safe manual push

## Git Execution

If the environment supports terminal access, you are allowed to execute git commands.

---

### First Push (if repository is not initialized)

Run:

git init  
git remote add origin https://github.com/imaginevipin/application-mattress-builder.git  
git branch -M main  

---

### Standard Push Flow

After completing meaningful work:

1. Stage changes:
   git add .

2. Commit:
   git commit -m "<formatted message>"

3. Push:
   git push origin main

---

### Rules

- Do NOT push repeatedly for small changes
- Push only when work is meaningful and stable
- Ensure commit message follows defined format
- Ensure repository is in a clean state before pushing