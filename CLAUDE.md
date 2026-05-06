# Ideaverse-OS - Project Identity

## Status: ACTIVE (Task 0 - foundation complete; Task 1 tracer slice in flight)

Bootstraps a position-addressed, LLM-agnostic knowledge vault from a one-line `npx` command. Karpathy's wiki pattern with conversational ingestion baked in. Ships as an npm package + thin Claude skill wrapper + marketing site.

**Source of truth for the design:**
- PRD: `MyIdeaverse/Ideaverse/50-research-library/Spikes/SPIKE_ideaverse_OS_skill_rewrite.md`
- Tasks: `MyIdeaverse/Ideaverse/50-research-library/Spikes/SPIKE_ideaverse_OS_skill_rewrite_TASKS.md`
- Kickoff (historical): `MyIdeaverse/Ideaverse/50-research-library/Idea Generation/2026-05-06 Ideaverse-OS-Skill Rewrite Kickoff.md`

**Reference architecture:** `MyIdeaverse/Ideaverse/60-skills/_shared/impeccable/` (lean SKILL.md + reference/ docs + scripts/ + agents/)

---

## Stack

- **CLI:** Node 20+ + TypeScript + Commander.js, built with `tsc`, runs via `npx ideaverse-os init`
- **Skills bundle (vault-resident):** harness-agnostic markdown + Node `.mjs` scripts (impeccable pattern). Bundle includes `ideaverse-os` (build interview + capture router), `cortex-compile`, `cortex-lint`, `cortex-connect`, `web-clip-report`, `yt-light-research`.
- **Site:** `ideaverse-os.ktncodes.com` lives in `portfolio-site/ktncodes-v2/` (Next.js 15 + React 19 + Tailwind v4 + MDX + Motion). Subdomain rewrite to the existing app.
- **Distribution:** npm `ideaverse-os` (unscoped) + GitHub `ktnCodes/ideaverse-os` + Claude skill wrapper that shells out to the CLI.

## Folder Map

```
ideaverse-OS/
├── src/
│   └── cli.ts                 # Entry: npx ideaverse-os init
├── templates/                  # Vault skeleton + lean files + router files (consumed by init)
├── skills/                     # Bundled v1 skills (copied into 60-skills/_shared/ on init)
├── docs/                       # Project docs (legacy + new)
├── _archived/
│   └── cli-python/             # Old Python CLI - reference only, not shipped
├── package.json
├── tsconfig.json
├── README.md
├── CONTRIBUTING.md
├── LICENSE                     # MIT
├── CLAUDE.md                   # You are here
├── CONTEXT.md                  # Task routing
└── .gitignore
```

## Rules

- **The CLI is the source of truth.** The Claude skill wrapper just shells out to the CLI; the site documents what the CLI produces.
- **LLM-agnostic is non-negotiable.** Any feature that only works in Claude must be Phase 5 opt-in. Never blocking core init/build/capture.
- **Vertical slices only.** Every task cuts CLI + Skills + Site simultaneously. Per soul.md.
- **Detect-and-prompt for safety.** CLI never deletes user files. Conflict detection on init. Phase lock files before build compilation.
- **No heavy dependencies.** Stay in the Node + Next.js + Tailwind ecosystem. No Python runtime for end users. No Electron, no Tauri.
- **Templates use placeholder syntax** (e.g., `{{DOMAIN_1}}`) that the build interview fills in. Init alone leaves placeholders intact.
