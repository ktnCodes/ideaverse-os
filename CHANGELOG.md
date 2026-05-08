# Changelog

All notable changes to `ideaverse-os` are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.2] - 2026-05-08

### Removed

- Aider router file (`AIDER_CONVENTIONS.md`). Scope of supported harnesses is now Claude Code, Cursor, Codex CLI, Gemini CLI -- the four with strong adoption and well-documented convention-file mechanisms. Aider users can still target the vault by passing `--read CLAUDE.md` (or another router file) at startup.

## [0.1.1] - 2026-05-08

### Added

- Initial public release. Bootstrap a position-addressed, harness-agnostic knowledge vault in one command.
- `init` scaffolds the vault skeleton: `00-agentic-OS/` (lean 6 identity files) + numbered domain folders + router files for every major harness (CLAUDE.md, GEMINI.md, AGENTS.md, .cursorrules).
- Detect-and-prompt safety on every conflicting file (overwrite / skip / abort).
- Seven bundled skills installed to `60-skills/` and `.claude/skills/`:
  - `ideaverse-os` -- the build interview (compass / identity / workflow / domains / optional-layers phases) plus capture router.
  - `ideaverse-capture` -- source-type router for YouTube URLs, web clips, plain URLs, and free text.
  - `cortex-compile` -- raw -> wiki synthesis with article template.
  - `cortex-connect` -- automated wikilink discovery (LCS-based).
  - `cortex-lint` -- read-only audit of `10-cortex/` for stale `verified_at`, missing TL;DR, untyped sources, and triggered `staleness_signal`. Reports findings as error / warn / info; never mutates a file.
  - `web-clip-report` -- structured research note formatter.
  - `yt-light-research` -- transcript-only YouTube research (single-video MVP).
- Cortex frontmatter standard: `cortex-compile` article template requires `verified_at`, `staleness_signal`, mandatory 50-100 word `## TL;DR`, and 5 typed-edge wikilink prefixes in Sources (`supports::`, `contradicts::`, `extends::`, `mentions::`, `inspired-by::`). cortex-lint enforces all of it.
- Six starter templates for the build interview: `work-personal`, `creative`, `researcher-builder`, `trader-investor`, `dayjob-sideproject`, `solo`. Each ships `template.json`, `folders.txt`, and `compass-example.md`. The `work-personal` template also ships `cortex-example.md` demonstrating the article standard end-to-end.
- Optional Phase 5 layers: Claude hooks (session-start, load-memory, save-session), GitHub backup, WSL paths block. Each is independently optable.
- Lock-file flow on every build phase. Each phase writes `<file>.md.lock.md` for review before promoting to the lean file.
- Marketing site live at https://ideaverse-os.ktncodes.com (subdomain rewrite to `/ideaverse-os` on `ktncodes.com`). New `/concepts/cortex-frontmatter` page documents the article standard, typed-edge prefixes, and cortex-lint rules.

### Known issues

- `npx ideaverse-os@0.1.1 --version` prints `0.1.0` due to a hardcoded version string in `src/cli.ts`. Fixed in 0.1.2 -- the CLI now reads from `package.json` at runtime.

### Notes

- `0.1.0` was a name-reservation stub with no functional content; treat `0.1.1` as the first real release.

[Unreleased]: https://github.com/ktnCodes/ideaverse-os/compare/v0.1.2...HEAD
[0.1.2]: https://github.com/ktnCodes/ideaverse-os/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/ktnCodes/ideaverse-os/releases/tag/v0.1.1
