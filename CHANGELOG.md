# Changelog

All notable changes to `ideaverse-os` are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `cortex-lint` skill bundle: read-only diagnostic that audits `10-cortex/` for stale `verified_at`, missing TL;DR, untyped sources, and triggered `staleness_signal`. Reports findings as error / warn / info; never mutates a file.
- `templates/starter/work-personal/cortex-example.md`: sample article demonstrating the cortex frontmatter standard end-to-end. Users see the spec from day one.
- Site page `/ideaverse-os/concepts/cortex-frontmatter`: full reference for the article standard, typed-edge prefixes, and lint rules.

### Removed

- Aider router file (`AIDER_CONVENTIONS.md`). Scope of supported harnesses is now Claude Code, Cursor, Codex CLI, Gemini CLI -- the four with strong adoption and well-documented convention-file mechanisms. Aider can still be used by passing `--read CLAUDE.md` (or another router file) at startup.

### Changed

- `cortex-compile` article template now requires three new frontmatter fields:
  - `verified_at: YYYY-MM-DD` -- last time the article was confirmed against current sources. cortex-lint flags articles older than 90 days.
  - `staleness_signal: "..."` -- one-line condition that, if true, means the article is stale.
  - `## TL;DR` is now mandatory (50-100 words). cortex-lint enforces this.
- `cortex-compile` Sources section now uses 5 typed-edge wikilink prefixes: `supports::`, `contradicts::`, `extends::`, `mentions::`, `inspired-by::`. Untyped sources surface as cortex-lint warnings.
- CLI `--version` now reads from `package.json` at runtime instead of a hardcoded string. Future bumps no longer require editing `src/cli.ts`.

## [0.1.1] - 2026-05-08

### Added

- Initial public release. Bootstrap a position-addressed, harness-agnostic knowledge vault in one command.
- `init` scaffolds the vault skeleton: `00-agentic-OS/` (lean 6 identity files) + numbered domain folders + router files for every major harness (CLAUDE.md, GEMINI.md, AGENTS.md, .cursorrules).
- Detect-and-prompt safety on every conflicting file (overwrite / skip / abort).
- Six bundled skills installed to `60-skills/` and `.claude/skills/`:
  - `ideaverse-os` -- the build interview (compass / identity / workflow / domains / optional-layers phases) plus capture router.
  - `ideaverse-capture` -- source-type router for YouTube URLs, web clips, plain URLs, and free text.
  - `cortex-compile` -- raw -> wiki synthesis with article template.
  - `cortex-connect` -- automated wikilink discovery (LCS-based).
  - `web-clip-report` -- structured research note formatter.
  - `yt-light-research` -- transcript-only YouTube research (single-video MVP).
- Six starter templates for the build interview: `work-personal`, `creative`, `researcher-builder`, `trader-investor`, `dayjob-sideproject`, `solo`. Each ships `template.json`, `folders.txt`, and `compass-example.md`.
- Optional Phase 5 layers: Claude hooks (session-start, load-memory, save-session), GitHub backup, WSL paths block. Each is independently optable.
- Lock-file flow on every build phase. Each phase writes `<file>.md.lock.md` for review before promoting to the lean file.
- Marketing site live at https://ideaverse-os.ktncodes.com (subdomain rewrite to `/ideaverse-os` on `ktncodes.com`).

### Notes

- `0.1.0` was a name-reservation stub with no functional content; treat `0.1.1` as the first real release.
- `npx ideaverse-os@0.1.1 --version` prints `0.1.0` due to a hardcoded version string in `src/cli.ts`. Fixed in `[Unreleased]` -- the next published version reads from `package.json`.

[Unreleased]: https://github.com/ktnCodes/ideaverse-os/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/ktnCodes/ideaverse-os/releases/tag/v0.1.1
