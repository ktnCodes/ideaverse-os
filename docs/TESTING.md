# Testing ideaverse-os

How to verify the CLI works end-to-end across harnesses, what to look for, and the gaps most likely to bite. Run through this before each minor release.

---

## What you're testing

Three layers, top to bottom:

| Layer | Owns | Failure looks like |
|---|---|---|
| CLI (`npx ideaverse-os`) | Init scaffold, conflict prompts, bundled skill copy | Files missing, conflict diff broken, skills not in `60-skills/` and `.claude/skills/` |
| Harness layer | Loading the lean 6 files automatically at session start | LLM doesn't know your role / compass when you open the vault in that harness |
| Skills | Build interview, capture, cortex compile/connect/lint | Slash command not found, lock file not written, wrong format, wrong paths |

The CLI is the source of truth. Skills are runtime behavior inside whatever harness you point at the vault. Test the CLI first; only then test skills inside each harness.

---

## Prerequisites

- Node 20+ (`node --version`)
- Empty test directory you don't mind nuking: e.g. `~/test-vault-001`, `~/test-vault-002`
- The harness you're testing, installed and authenticated
- For capture testing: `gh auth status` (GitHub backup), `yt-dlp` if testing YouTube capture

---

## Phase 0: CLI smoke test (10 min)

**Goal:** verify the published npm package scaffolds correctly.

```bash
# Pick a path that doesn't exist yet
npx ideaverse-os@latest init ~/test-vault-001
```

**Checklist:**

- [ ] Command completes in under 15 seconds
- [ ] Stdout shows the scaffold plan and final summary
- [ ] `~/test-vault-001/` exists and contains:
  - [ ] `00-agentic-OS/` with all 6 lean files (`soul.md`, `me.md`, `user.md`, `compass.md`, `memory.md`, `runbook.md`) plus `paths.json`
  - [ ] Numbered domain folders: `10-cortex/`, `40-raw/`, `50-research-library/`, `60-skills/`, `70-daily/`, `80-visualization/`, `99-archive/`
  - [ ] No `20-` / `30-` folders yet (those land during build phase 4)
  - [ ] Router files at vault root: `CLAUDE.md`, `GEMINI.md`, `AGENTS.md`, `.cursorrules`
  - [ ] `60-skills/ideaverse-os/SKILL.md` exists and so do the other 6 bundled skills
  - [ ] `.claude/skills/ideaverse-os/SKILL.md` exists (mirrored copy for Claude Code)
  - [ ] `.gitignore` with privacy-first defaults
- [ ] Each lean file has frontmatter with `auto_inject: true`
- [ ] `paths.json` has correct `vaultRoot` (matches the path you ran init with)

**Variations to run:**

| Variation | Command | Expected behavior |
|---|---|---|
| Path with spaces | `npx ideaverse-os init "~/test vault 002"` | Works; quoting handled |
| Existing populated dir | Re-run init on `~/test-vault-001` | Per-conflict prompt: overwrite / skip / abort |
| Dry run | `npx ideaverse-os init ~/test-vault-003 --dry-run` | Lists files that would be written; nothing actually written |
| Force | `npx ideaverse-os init ~/test-vault-001 --force` | Overwrites without prompting (verify by editing a lean file first, then running) |
| No path arg | `cd ~/test-vault-004 && npx ideaverse-os init` | Defaults to `.`; warns if dir is non-empty |
| Old Node | Run with Node 18 if you have nvm | Should fail with a clear "requires Node 20+" message, not a cryptic error |

---

## Phase 1: Harness loading (5 min per harness)

**Goal:** verify the convention file we wrote gets auto-loaded by the harness, so the LLM sees the lean 6 files at the start of every session without you doing anything.

**Setup:** open `~/test-vault-001` in the harness. Start a fresh session.

**Test prompt:** type exactly this into the harness:

> What's in my soul.md? Quote the first communication rule.

**Pass condition:** the LLM responds with the actual first rule from `00-agentic-OS/soul.md` without you having to attach the file or re-run anything.

**Fail symptom:** LLM says "I don't see a soul.md file" or asks you to share it. That means the convention file wasn't auto-loaded.

### Per-harness setup notes

| Harness | Convention file | Auto-loads? | Notes |
|---|---|---|---|
| **Claude Code** (CLI) | `CLAUDE.md` | Yes (native) | Baseline. Should always pass. |
| **Cursor** | `.cursorrules` (legacy) **or** `.cursor/rules/*.mdc` (current) | Yes for legacy; new format may need migration | If `.cursorrules` doesn't load, check Cursor settings -> Rules -> "Use .cursorrules" toggle. Newer Cursor versions prefer the `.cursor/rules/` directory; we may need to write that format too. |
| **Codex CLI** (OpenAI) | `AGENTS.md` | Yes (per the agents.md spec OpenAI adopted) | Should work out of the box. |
| **Gemini CLI** | `GEMINI.md` | Yes | Should work out of the box. |
| **Continue.dev** (VS Code) | `.continue/config.json` | No -- different format | We don't write this. Skip Continue.dev for v0.1.x or document as a known gap. |
| **Cline / Roo Code** | `.clinerules` | Yes | We don't write this. Skip or add for v0.2.x. |
| **GitHub Copilot Chat** | None | No convention file mechanism | Skip; only workspace files are visible. |

**Recommended matrix for v0.1.x acceptance:** Claude Code (baseline) + at least 2 of: Cursor, Codex CLI, Gemini CLI. Pick whichever 2 you actually use.

### Cursor-specific gotcha

Recent Cursor moved from `.cursorrules` to `.cursor/rules/*.mdc`. Run a quick check:

```bash
ls ~/test-vault-001/.cursor/rules/ 2>/dev/null  # likely empty
cat ~/test-vault-001/.cursorrules               # what we wrote
```

If Cursor's UI says "no rules loaded," we have a gap. Workaround for now: copy `.cursorrules` content into `.cursor/rules/ideaverse.mdc`. **Track this as an issue** for v0.2.x.

---

## Phase 2: Build interview (15 min per harness)

**Goal:** the 5-phase interview runs end-to-end, lock files are written, user confirms, lean files are promoted.

**Setup:** still in the test vault. Open in the harness.

**Run:** invoke the build skill via the harness's slash command system, or paste the equivalent natural-language prompt if slash commands aren't supported.

```
/ideaverse-os build --phase=compass
```

**Per-phase checklist** (applies to all 5 phases: compass, identity, workflow, domains, optional-layers):

- [ ] LLM asks the questions defined in the build skill (not generic ones)
- [ ] Answers are turned into a `<lean>.md.lock.md` file in `00-agentic-OS/` (e.g. `compass.md.lock.md`)
- [ ] Lock file contains a labeled diff vs. the current state
- [ ] You're prompted to review and confirm before promotion
- [ ] On confirm, the lean file (`compass.md`) is overwritten and the lock file is removed
- [ ] On reject, the lean file is unchanged and the lock file remains for editing
- [ ] Re-running the same phase after edits triggers diff-detect and re-grills

**Phase-specific things to look for:**

| Phase | Watch for |
|---|---|
| compass | Asks about week / month / quarter goals; output is a 3-tier compass.md |
| identity | Compiles `me.md` (role, knowledge, tools) and `soul.md` (rules); two lock files, not one |
| workflow | Detects which harnesses you mentioned; updates router files if relevant; compiles `user.md` |
| domains | Phase 4 -- offers 6 starter templates + Custom; selecting one writes `20-` / `30-` folders; `paths.json` updated with chosen domain slugs |
| optional-layers | Phase 5 -- offers Claude hooks / GitHub backup / WSL paths; each independently optable, each writes its own lock file |

---

## Phase 3: Capture skills (10 min)

**Goal:** the 5 capture skills route input to the right handler and write the right files.

| Skill | Test input | Expected output |
|---|---|---|
| `ideaverse-capture` (router) | `/ideaverse-capture https://www.youtube.com/watch?v=...` | Routes to yt-light-research |
| `ideaverse-capture` (router) | `/ideaverse-capture I learned that prompt caching has a 5-min TTL` | Routes to direct synthesis; one-line entry in today's daily note |
| `web-clip-report` | Drop a raw web clip from Obsidian Web Clipper into `40-raw/web-clips/`, run skill | File rewritten in-place with structured frontmatter, TL;DR, key takeaways |
| `yt-light-research` | YT URL | Transcript-only research note in `40-raw/youtube/<slug>.md` |
| `cortex-compile` | Run after any of the above | Synthesizes affected source files into articles in `10-cortex/<topic>/` |

**Edge cases to hit:**

- [ ] YT URL with no captions -- yt-light-research should fail gracefully, not crash
- [ ] Web clip without standard frontmatter -- web-clip-report should infer or prompt
- [ ] Pasted URL when site blocks scraping (paywalled article) -- ideaverse-capture should fall back to free-text mode
- [ ] cortex-compile with 50+ pending sources -- per SKILL.md, should prioritize 15 most-recent; verify it actually does

---

## Phase 4: cortex-lint (5 min)

**Goal:** verify the new cortex-lint skill from `[Unreleased]` works.

> Note: cortex-lint isn't on npm yet (it's in HEAD, not v0.1.1). To test, `npm link` your local repo, or wait until v0.2.0 publish.

**Setup:** in your test vault, manually create a few articles to lint.

```bash
mkdir -p ~/test-vault-001/10-cortex/test
```

Create three articles:

1. **Clean article** (`good.md`) -- all required fields, fresh `verified_at`, typed sources
2. **Stale article** (`stale.md`) -- `verified_at: 2025-01-01` (year+ old)
3. **Broken article** (`broken.md`) -- missing `## TL;DR`, untyped sources

**Run:** `/cortex-lint test`

**Expected report:**

```
ERRORS
  10-cortex/test/broken.md
    - missing-tldr

WARNINGS
  10-cortex/test/broken.md
    - untyped-source: ...

INFO
  10-cortex/test/stale.md
    - stale-verified-at: <N> days old
```

- [ ] No file is mutated
- [ ] `good.md` produces zero findings
- [ ] Output is chat-only (no report file written)

---

## Gaps to hunt for (the things most likely to break)

I haven't tested any of these. They're hypotheses about where bugs hide -- run through and either confirm working or file an issue.

### CLI

- [ ] **Path with spaces on Windows** -- `init "C:\Users\kevin\My Stuff\vault"` -- does the conflict-diff logic handle the quoting through child processes?
- [ ] **Init on path that's already a git repo** -- does it skip git init? Does it preserve `.git/`?
- [ ] **Init when target has hidden files** (`.DS_Store`, `.git/`, `.idea/`) -- treated as conflicts or ignored?
- [ ] **Bundled skill copy on macOS** -- does init `chmod +x` the `.mjs` scripts? Without exec bit, hooks won't run.
- [ ] **WSL crossing /mnt** -- run init from WSL bash on a `/mnt/c/...` path; does paths.json get the right vaultRoot string?
- [ ] **Two-location skill install drift** -- are `60-skills/<name>/SKILL.md` and `.claude/skills/<name>/SKILL.md` byte-identical? They must be. A diff between them is a bug.

### Build interview

- [ ] **Lock file half-baked** -- kill the harness mid-phase; does the next session see a partial `.lock.md` and get confused?
- [ ] **User edits lock file then re-runs phase** -- does diff-detect see the edits or always re-compile from scratch?
- [ ] **Phase ordering** -- can you run `--phase=domains` before `--phase=compass`? Should it block, or just produce a less-personalized result?
- [ ] **Compass refresh** -- run `--phase=compass` against an already-populated vault. Does it diff against the existing compass.md and only ask about changes, or restart from zero?

### Capture / cortex

- [ ] **YT video with chapters but no captions** -- yt-light-research's behavior?
- [ ] **Cortex-compile when topic has 50 articles** -- does the "scale guidance" actually trigger? Read the report to see how many it touched.
- [ ] **Cortex-connect ambiguity** -- if `[[transformers]]` could resolve to `10-cortex/ai/transformers.md` OR `10-cortex/ml/transformers.md`, what does it do?
- [ ] **Capture URL that's a redirect chain** -- does Readability+Turndown follow it correctly?

### Optional layers (Phase 5)

- [ ] **Claude hooks on a fresh `~/.claude/settings.json`** -- does it write the file or skip thinking it must already exist?
- [ ] **Claude hooks chaining order** -- if user has 3 existing UserPromptSubmit hooks, does ours append or insert at top? Does the order matter for behavior?
- [ ] **Re-running optional-layers** -- second run with same answers: idempotent, or duplicates the hooks?
- [ ] **GitHub backup with no `gh` auth** -- error message clarity?
- [ ] **WSL paths block on a non-WSL Windows machine** -- does it still write the block (and just leave it inert) or skip entirely?

### Convention files / harness layer

- [ ] **Cursor `.cursor/rules/*.mdc`** -- if Cursor users on the latest version don't get rules loaded, we need to also write this format.
- [ ] **Codex CLI agents.md spec compliance** -- does our `AGENTS.md` follow the spec OpenAI / Cursor / others jointly adopted?
- [ ] **Gemini CLI** -- does it actually exist as a thing right now? Check Gemini's CLI docs to confirm `GEMINI.md` is the right convention.

### Site

- [ ] **Subdomain rewrite on the deployed site** -- visit `https://ideaverse-os.ktncodes.com/concepts/cortex-frontmatter` directly; does the rewrite preserve the path and not bounce to root? (Already verified for `/`.)
- [ ] **GitHub star count fetch** -- with the repo public and at 1 star, does the header show "1★"? Does it gracefully hide if the API rate-limits?
- [ ] **Open Graph preview** -- paste the site URL into Slack / Discord / Twitter; does the OG card render cleanly?

---

## Filing a bug

For each failure, capture:

```
- Harness: <name + version>
- OS / shell: <os + version + bash/pwsh/zsh>
- Command: <exact command run>
- Vault state: <fresh from npx, or pre-existing?>
- Expected: <what should happen>
- Actual: <what happened, with stderr if any>
- Lean file state: <what 00-agentic-OS/ looks like after>
```

File at `https://github.com/ktnCodes/ideaverse-os/issues`.

---

## Done = ready for v0.2.0

A clean run through Phase 0 + Phase 1 (Claude Code + 2 other harnesses) + Phase 2 (compass phase end-to-end) is the minimum bar to call v0.2.0 testable. Everything else is incremental hardening.
