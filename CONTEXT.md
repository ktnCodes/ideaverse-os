# ideaverse-os - Routing

Bootstraps a position-addressed, LLM-agnostic knowledge vault. CLI (`npx ideaverse-os init`) + skills bundle + marketing site at `ideaverse-os.ktncodes.com`. See `CLAUDE.md` for full project identity.

## What do you want to do?

| Task | Go to | Load first |
|------|-------|------------|
| Edit the CLI entry point | `src/cli.ts` | `CLAUDE.md`, `package.json` |
| Edit vault templates (skeleton, lean files, router files) | `templates/` | `CLAUDE.md` |
| Edit a bundled skill | `skills/<skill-name>/` | `MyIdeaverse/Ideaverse/60-skills/_shared/impeccable/SKILL.md` (reference architecture) |
| Edit the site copy | `portfolio-site/ktncodes-v2/src/app/ideaverse-os/` | `portfolio-site/ktncodes-v2/CLAUDE.md` |
| Reference the design (locked decisions) | `MyIdeaverse/Ideaverse/50-research-library/Spikes/SPIKE_ideaverse_OS_skill_rewrite.md` | - |
| Reference task breakdown (vertical slices) | `MyIdeaverse/Ideaverse/50-research-library/Spikes/SPIKE_ideaverse_OS_skill_rewrite_TASKS.md` | - |
| Inspect old Python prototype | `_archived/cli-python/` | not for active edits |

## Session Start

1. Read `CLAUDE.md` for stack + rules.
2. Check `MyIdeaverse/Ideaverse/50-research-library/Spikes/SPIKE_ideaverse_OS_skill_rewrite_TASKS.md` for the current slice in flight.
3. Use `/tdd` to implement the next unblocked task with test-first discipline.

## Build / run

```bash
npm install
npm run build           # tsc -> dist/
npm run dev -- init ~/test-vault
node dist/cli.js init ~/test-vault
npm link                # makes `ideaverse-os` global, pointing here
```
