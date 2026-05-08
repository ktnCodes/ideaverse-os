# ideaverse-os

> Your knowledge base, written by conversation.

Bootstrap a position-addressed, harness-agnostic knowledge vault in one command. Karpathy's wiki pattern with conversational ingestion baked in.

```bash
npx ideaverse-os init ~/my-vault
```

**Site:** [https://ktncodes.com/ideaverse-os](https://ktncodes.com/ideaverse-os)

---

## What it does

| Step | Command | What you get |
|---|---|---|
| Init | `npx ideaverse-os init <path>` | A numbered folder skeleton (`00-agentic-OS/`, `10-cortex/`, `20-/30-` user domains, `40-raw/`, `50-research-library/`, `60-skills/`, `70-daily/`, `80-visualization/`, `99-archive/`), a 6-file `auto_inject` identity layer, and router files for every major harness (`CLAUDE.md`, `GEMINI.md`, `AGENTS.md`, `.cursorrules`). |
| Build | `/ideaverse-os build` (in your harness) | A 5-phase LLM-driven interview that compiles your compass, identity, workflow, domains, and optional layers into the lean files. Lock-file flow on every phase so you review before any mutation. |
| Capture | `/ideaverse-capture <input>` | Paste a YouTube URL, drop an Obsidian web clip, paste a plain URL, or write "I learned X today." Routes to the right handler, ingests, refreshes your cortex articles, and cross-links automatically. |
| Lint | `/cortex-lint [topic]` | Read-only audit of `10-cortex/` for stale `verified_at`, missing TL;DR, untyped sources, and triggered staleness signals. Diagnoses; doesn't mutate. |

Six bundled skills ship with init: `ideaverse-os` (the build interview), `ideaverse-capture`, `cortex-compile`, `cortex-connect`, `cortex-lint`, `web-clip-report`, `yt-light-research`. Each lives at `60-skills/<skill>/SKILL.md` plus a copy at `.claude/skills/<skill>/` for Claude Code's slash-command discovery.

## Why

Existing knowledge systems force a tradeoff. ideaverse-os keeps what each got right and ships the missing piece:

| System | The tradeoff |
|---|---|
| Karpathy raw->wiki | No template. You build the structure manually. |
| AI Impact infinite_brain | 16 node types, 10 edge types. Over-engineered for solo operators. |
| Tiago Forte PARA | Designed for human re-reading, not agent retrieval. |
| Cole Medin AI second brain | Static identity files. No ingestion model. Claude-only. |
| Nick Milo Ideaverse-OS | Vault template only. No LLM build flow. |
| **ideaverse-os** | **Position-addressed scaffold + LLM-driven 5-phase interview + harness-agnostic ingestion.** |

## Install

Requires Node 20+ and a harness of your choice (Claude Code, Cursor, Codex CLI, Gemini CLI).

```bash
# Bootstrap a new vault
npx ideaverse-os@latest init ~/my-vault

# Open the vault in your harness, then:
/ideaverse-os build
```

`init` is idempotent and detect-and-prompt safe -- existing files trigger a per-conflict diff with overwrite / skip / abort. It never silently deletes.

## How the LLM finds things

Every harness has its own convention file (`CLAUDE.md`, `.cursorrules`, `AGENTS.md`, ...). Init writes all of them, each pointing at the same lean 6 files in `00-agentic-OS/`:

- `soul.md` -- communication and behavioral rules
- `me.md` -- your identity (role, tools, knowledge)
- `user.md` -- your workflow preferences
- `compass.md` -- current priorities (refreshed weekly)
- `memory.md` -- session continuity
- `runbook.md` -- the right command for the right intent

Every harness loads them at session start through its native auto-injection mechanism. One identity, every tool. See [/ideaverse-os/concepts/harness-layer](https://ktncodes.com/ideaverse-os/concepts/harness-layer).

## Cortex articles

Articles in `10-cortex/` follow a strict frontmatter standard so the LLM can rank, refresh, and surface decay:

```yaml
---
title: "..."
description: "..."
topic: "..."
sources: [...]
created: YYYY-MM-DD
last_compiled: YYYY-MM-DD
verified_at: YYYY-MM-DD
confidence: low | medium | high
staleness_signal: "one-line condition that means this is stale"
---
```

Sources use 5 typed-edge prefixes (`supports::`, `contradicts::`, `extends::`, `mentions::`, `inspired-by::`) so the relationship between source and claim is explicit. See [/ideaverse-os/concepts/cortex-frontmatter](https://ktncodes.com/ideaverse-os/concepts/cortex-frontmatter).

## Optional layers (Phase 5)

Three opt-ins, each independent. Skip any subset.

- **Claude hooks** -- session-start, load-memory, save-session shell scripts registered in `~/.claude/settings.json`. Claude Code only.
- **GitHub backup** -- private repo, baseline commit. Any harness; requires `gh` authenticated.
- **WSL paths** -- fills `platforms.wsl` block in `paths.json`. Windows + WSL only.

See [/ideaverse-os/concepts/optional-layers](https://ktncodes.com/ideaverse-os/concepts/optional-layers).

## Templates

Phase 4 of `build` offers six starter shapes plus Custom. Each names your `20-` and `30-` domains.

| Template | For |
|---|---|
| `work-personal` | Default Western knowledge worker. Job + everything else. |
| `creative` | Artists, writers, makers. Practice + projects. |
| `researcher-builder` | Studying X while shipping Y. |
| `trader-investor` | Markets + life. |
| `dayjob-sideproject` | Income job + the thing you're building on the side. |
| `solo` | One operator, one venture. No domain split. |

[Browse all six -->](https://ktncodes.com/ideaverse-os/templates)

## Architecture rules

- **The CLI is the source of truth.** The Claude skill wrapper shells out to the CLI; the site documents what the CLI produces.
- **LLM-agnostic core.** Anything Claude-specific is Phase 5 opt-in.
- **Detect-and-prompt safety.** Init never silently overwrites. Every build phase writes a `.lock.md` for review before promoting.
- **No heavy runtime.** Node + Next.js + Tailwind. No Python for end users. No Electron, no Tauri.

## Development

```bash
git clone https://github.com/ktnCodes/ideaverse-os.git
cd ideaverse-os
npm install
npm run build      # tsc to dist/
npm link           # then `npx --no -- ideaverse-os init <path>` works locally
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Issues and PRs welcome -- this is early.

## License

MIT (c) 2026 Kevin Nguyen
