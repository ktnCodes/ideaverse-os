# ideaverse-os

> Your knowledge base, written by conversation.

Bootstrap a position-addressed, LLM-agnostic knowledge vault in one command.

```bash
npx ideaverse-os init ~/my-vault
```

**Status:** v0.x (early development). Tracer slice in flight; v1.0 launch coming.

**Site:** [ideaverse-os.ktncodes.com](https://ideaverse-os.ktncodes.com) (live by Task 1)

---

## What it does

- **Init** scaffolds a position-addressed vault skeleton (numbered prefixes per Jake Chief / Nick Milo / Karpathy raw->wiki principles), drops a 6-file `auto_inject: true` harness layer, and writes router files for every major LLM harness (`CLAUDE.md`, `GEMINI.md`, `AGENTS.md`, `.cursorrules`, `AIDER_CONVENTIONS.md`).
- **Build** runs an LLM-driven 5-phase interview from inside any harness (Claude Code, Cursor, Aider, Codex, Gemini CLI). Compiles your purpose / identity / workflow / domain split into the lean files. Pick from 6 starter templates or go Custom.
- **Capture** is the differentiator. Paste a YouTube link, save a page via Obsidian Web Clipper, or just say "I learned X today" — `ideaverse-capture` routes to the right handler, refreshes your cortex articles, and cross-links automatically.

## Why

Existing knowledge bases force a tradeoff:

| System | What's missing |
|---|---|
| Karpathy raw->wiki | No template; you build it manually |
| AI Impact infinite_brain | 16 node types + 10 edge types; over-engineered |
| Tiago Forte PARA | Designed for human re-reading, not agent retrieval |
| Cole Medin AI second brain | Static identity; no ingestion model; Claude-only |
| Nick Milo Ideaverse-OS | Vault template only; no LLM build flow |

ideaverse-os ships the position-addressed architecture as a one-command bootstrap, then lets the LLM curate it as you converse.

## Install

```bash
npx ideaverse-os@latest init <path>
```

Requires Node 20+ and an LLM CLI of your choice.

## Status

See [PRD](./docs/PRD.md) and [TASKS](./docs/TASKS.md). Currently shipping vertical slice 1 of 7.

## License

MIT (c) 2026 Kevin Nguyen
