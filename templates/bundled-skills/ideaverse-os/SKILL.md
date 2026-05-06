---
name: ideaverse-os
description: The ideaverse-OS build interview and capture orchestrator. Use when the user runs /ideaverse-os build to compile their identity into the lean 6 files, or /ideaverse-os capture to ingest a source. Harness-agnostic - works in any LLM CLI that can read project files.
type: meta-skill
last-updated: 2026-05-06
auto_inject: false
---

# ideaverse-os

The orchestrator for an ideaverse-OS vault. Two main entry points: **build** (LLM-driven 5-phase identity interview) and **capture** (conversational source ingestion).

## When to use this skill

Trigger when the user types one of:

| Command | Phase / Action |
|---|---|
| `/ideaverse-os build` | Run all 5 phases in order (compass -> identity -> workflow -> domains -> optional layers) |
| `/ideaverse-os build --phase=compass` | Phase 1 only -- compile their priorities into `00-agentic-OS/compass.md` |
| `/ideaverse-os build --phase=identity` | Phase 2 -- compile `me.md` and `soul.md` |
| `/ideaverse-os build --phase=workflow` | Phase 3 -- compile `user.md` |
| `/ideaverse-os build --phase=domains` | Phase 4 -- pick a starter template, scaffold `20-` / `30-` user domains |
| `/ideaverse-os build --phase=optional-layers` | Phase 5 -- Claude hooks, GitHub backup, WSL paths |
| `/ideaverse-os capture <url-or-text>` | Route a source to the right ingestion handler + refresh cortex |

## Phase contract (universal)

**Every phase follows this lock-file flow:**

1. Read the relevant `00-agentic-OS/<file>.md` to see current state.
2. Run the dynamic Q&A specified in the phase's reference doc. **Ask one question per turn.**
3. When all answers are collected, write a **lock file** at `00-agentic-OS/<file>.md.lock.md` with the proposed compiled content.
4. Show the user a one-line summary and ask: *"Confirm and write to `<file>.md`? [y/n]"*
5. On confirm, write to the real file. On reject, revise the lock file and re-ask.

This is the **grill-then-pipeline** pattern. The lock file is your safety net - users can `git diff` it before files materialize. See `reference/lock-file-flow.md` for details.

## Phase routing

For each phase, load the matching reference doc:

| Phase | Reference | Status in v1 |
|---|---|---|
| compass | [reference/build-compass.md](reference/build-compass.md) | Implemented (Task 1) |
| identity | [reference/build-identity.md](reference/build-identity.md) | Stub - implemented in Task 2 |
| workflow | [reference/build-workflow.md](reference/build-workflow.md) | Stub - Task 3 |
| domains | [reference/build-domains.md](reference/build-domains.md) | Stub - Task 4 |
| optional-layers | [reference/build-optional-layers.md](reference/build-optional-layers.md) | Stub - Task 5 |
| capture | [reference/capture.md](reference/capture.md) | Stub - Task 2 |

If the user invokes a phase that's still a stub, respond: *"Phase X is part of slice N (not yet implemented). v1.0 ships all 5 phases. For now, run `/ideaverse-os build --phase=compass`."*

## Hard rules

- **One question per turn.** Even if a phase has 5 sub-questions. Match the `/grill-me` cadence.
- **Never write to `00-agentic-OS/<file>.md` directly.** Always lock-file first, confirm, then write.
- **Compass-first reading.** Before any phase, read `00-agentic-OS/compass.md`. The user's current priorities filter what's relevant.
- **Respect existing content.** If `<file>.md` has user-written content (no `[TODO]` markers), MERGE rather than overwrite. Surface a diff and ask.

## Architecture notes

- Skill files live in this directory: `60-skills/_shared/ideaverse-os/`
- The CLI (`npx ideaverse-os init`) scaffolds this skill into the vault. After init, the LLM in any harness can read this `SKILL.md`.
- All file writes happen via the LLM using its native file-edit tools. No shell scripts required for the build flow.
- Capture uses dispatched skills (`yt-light-research`, `web-clip-report`, etc.) which DO have shell scripts. See `reference/capture.md`.

## Site

Full docs: https://ideaverse-os.ktncodes.com
