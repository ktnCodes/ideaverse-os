# Phase 4: Domains

Picks a starter template (or Custom path), then scaffolds the user's `20-` and `30-` (and optionally `25-` / `35-`) domain folders. The most user-visible phase -- after this, the vault has the user's actual mental model in its folder tree.

## Goal

After phase 4:
- `20-<domain-name>/` and `30-<domain-name>/` exist with sensible sub-folders
- A `CONTEXT.md` lives in each, routing LLMs to the right files
- `paths.json` is updated with the new domain paths
- The user's compass priorities can now reference real domain folders, not generic placeholders

## Pre-flight

Before asking anything, **read the current compass and identity** to inform template recommendations:
- Compass mentions `Vizio interview prep` + `Deere work` -> recommend Day-job + Side-project or Work + Personal
- Identity mentions `creative writing` + `freelance` -> recommend Creative or Day-job + Side-project
- Compass is empty / unfilled -> default-recommend Work + Personal

Surface the recommendation before showing the menu:
> *"Based on your compass mentioning <X> and identity mentioning <Y>, I'd recommend the **<template>** template. But here's the full menu -- pick what fits."*

## Question flow (one per turn)

### Section 1 - Template selection

1. *Show the catalog (see "Starter templates" below). Ask:* "Which template fits your mental model?"
   - Options: `work-personal` / `creative` / `researcher-builder` / `trader-investor` / `dayjob-sideproject` / `solo` / `custom`

### If user picks a preset (work-personal, creative, etc.)

2. *"Default name for your first domain is `<template-default-1>`. Use that, or rename? Examples: `work` -> `engineering`, `creative` -> `art-and-writing`."*
3. *"Default name for your second domain is `<template-default-2>`. Use that, or rename?"*
4. *(if template has sub-folders)* "Confirm the sub-folder structure for each domain, or customize? Show the proposed tree."*
5. *"Want to add a `25-` slot or `35-` slot for an additional domain? (Optional. Most users use just two.)"*

### If user picks Custom

2. *"How do you split your life in your head right now? Don't overthink categories -- just describe the split. Examples: 'work and personal', 'research and building', 'three areas: creative + finance + family'."*
3. *"For each split, what would you call it? One-word lowercase slugs work best."*
4. *"For each domain, what kinds of things go inside? List the top 3-5 sub-folders you can think of."*
5. *"Any cross-domain themes? (e.g., 'AI workflow' relevant to both work and personal.) These usually live in `10-cortex/`, not in a domain folder, but flag them so we can decide."*

### Section 2 - Confirm + execute

6. *"Final structure preview:" -- show the proposed tree as a code block. Ask: "Confirm and create?"*

## Starter templates (the 6 + Custom)

Each preset is described inline below. The actual folder content + compass-example.md per template lives in `templates/starter/<name>/` (those template files are loaded at execute time).

### `work-personal` (default if compass mentions a day-job + side life)

```
20-work/
  _bugs/
  _features/
  _other-work-items/
  reference/
30-personal/
  career/
  learning/
  portfolio/
  finances/
```
Tagline: *"Default Western knowledge-worker split. Two domains: your job and the rest of your life."*

### `creative` (artist / writer / designer)

```
20-craft/        # the work itself
  drafts/
  finished/
  references/
30-business/     # the operations behind the work
  clients/
  finances/
  contracts/
```
Tagline: *"Two domains: the craft and the business of selling the craft."*

### `researcher-builder` (academic + side projects)

```
20-research/
  papers/
  experiments/
  notes/
30-building/
  projects/
  prototypes/
  archives/
```
Tagline: *"Two domains: the questions you're investigating and the things you're shipping."*

### `trader-investor`

```
20-portfolio/
  positions/
  trades/
  pnl/
30-research/
  macro/
  companies/
  thesis/
```
Tagline: *"Two domains: what you hold and what you're studying."*

### `dayjob-sideproject` (consultant / employed-but-building model)

```
20-dayjob/
  clients-or-employer/
  reference/
30-sideproject/
  product/
  growth/
  operations/
```
Tagline: *"Two domains: the thing paying the bills and the thing you're building toward."*

### `solo` (single-domain, no split)

```
20-work/
  projects/
  reference/
  daily/
```
Tagline: *"One domain. For people whose life and work blur into a single focus area."*

(Note: `solo` only scaffolds a `20-` slot, no `30-`. paths.json reflects the single domain.)

### `custom`

No preset; runs the open exploration questions above and scaffolds whatever the user describes.

## Compilation

For preset templates:
1. Read `templates/starter/<name>/folders.txt` -- list of sub-folders to create
2. Apply user's slug renames (e.g., `work` -> `engineering`)
3. Create the folder tree under `20-<slug>/` and `30-<slug>/`
4. Drop a `CONTEXT.md` in each domain root pointing at the lean 6
5. Read `templates/starter/<name>/compass-example.md` and surface it as a one-time tip:
   > *"Here's a sample compass entry showing how this template's domains tend to be used. Optional reference."*
6. Update `00-agentic-OS/paths.json` with the new domain paths

For custom:
1. Generate the folder tree from the user's description
2. Same CONTEXT.md drop + paths.json update

## Lock-file flow

The "lock file" for this phase is unusual -- it's not a single markdown file, it's a **proposed folder tree + paths.json diff**. Write the proposal as `00-agentic-OS/domains.lock.md`:

```markdown
# Domain scaffold proposal

Template: work-personal

Will create:
  20-work/
    _bugs/
    _features/
    ...
  30-personal/
    career/
    ...

Will update paths.json:
  + workDomainRoot: "...20-work"
  + personalDomainRoot: "...30-personal"
```

Show summary, prompt, on-confirm execute the folder creation + paths.json update. Delete the lock file.

## Depth probes

| Shallow signal | Probe |
|---|---|
| "I'm not sure how I split my life" (Custom) | "Don't overthink. Past 7 days -- name 5 things you spent significant time on. We'll cluster those." |
| "Just give me the default" | "Sure. Confirming: `work-personal` template. But quick check -- does your work involve creative output, finance, research, or trading? If yes, a more specific template might fit better." |
| User wants 5+ domains | "The position-addressed scheme has 80 slots, so you can absolutely add more later. For v1, two is the path with the most tooling support. Start with two; add `25-` / `35-` later if needed." |
| Custom names that conflict (e.g., `work` for both 20 and 30) | "Each domain needs a unique slug. Want to call them `work-day` and `work-side`?" |

## After domains is locked

Suggest the natural next step:
> *"Domains scaffolded. Next: `/ideaverse-os build --phase=optional-layers` to enable Claude hooks, GitHub backup, or WSL paths -- if you want them. Or skip optional and start using your vault: try `/ideaverse-os capture` with a YouTube link to see the conversational ingestion loop."*
