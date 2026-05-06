# Phase 5: Optional layers

Enables opt-in power-up layers. None are required. Each is independently optable -- user can pick any subset (or none).

## Goal

After phase 5, optional integrations the user explicitly chose are wired up:
- **Claude hooks** -- session-start + load-memory + save-session, registered in `~/.claude/settings.json` (Claude Code only)
- **GitHub private repo** -- vault baseline pushed for backup / cross-device sync
- **WSL paths** -- `paths.json.platforms.wsl` block filled with the user's WSL paths

These are powerful but **harness-specific or environment-specific**. The core ideaverse-OS architecture works without any of them.

## Pre-flight

Before asking anything, **read** the current state:
- `~/.claude/settings.json` exists? (Detects if user has any Claude config)
- `gh auth status` returns success? (Detects if GitHub CLI is authenticated)
- `uname -a` or `$WSL_DISTRO_NAME` available? (Detects if WSL is reachable)

Surface what's available before the menu:
> *"Detected: ~/.claude/ exists, gh CLI authenticated, no WSL detected. Available power-ups: Claude hooks (yes), GitHub backup (yes), WSL paths (skip). Pick which to enable."*

## Question flow (one per turn)

1. *"Which optional layers do you want to enable? Multi-select. Available: <list-from-detection>. Type the names separated by commas, or 'all' / 'none'."*

For each chosen layer, run the matching sub-flow.

---

## Sub-flow: Claude hooks

**Only offer if** detected `~/.claude/` exists.

### Questions

1. *"You'll get three hooks: `session-start.sh` (loads compass on every new session), `load-memory.sh` (injects the lean 6 files into every prompt), `save-session.py` (logs session transcripts to 70-daily/). Confirm all three, or pick a subset?"*
2. *"`save-session.py` requires Ollama running locally for the local-model session-summary. Do you have Ollama installed? (yes / no / not sure)"*
   - If no/not sure: skip save-session, install only the first two.

### Detect existing hooks

3. Read `~/.claude/settings.json`. For each hook event (`UserPromptSubmit`, `SessionStart`, `Stop`):
   - If empty: write the new hook entry.
   - If has existing entries: show them and ask:
     > *"You already have a `<event>` hook configured. Options: [c]hain (append ours after yours), [r]eplace yours, [s]kip ours. Recommended: chain."*

### Compilation

1. Copy `templates/optional/claude-hooks/{session-start,load-memory,save-session}.{sh,py}` to `~/.claude/scripts/`. (Or to vault-local `<vault>/.claude/scripts/` if user prefers project-local; ask.)
2. Update `~/.claude/settings.json` with the appropriate hook registration, chaining or replacing per user's choice.
3. Print the registered hooks for confirmation:
   ```
   Registered: ~/.claude/settings.json
     UserPromptSubmit -> ~/.claude/scripts/load-memory.sh
     SessionStart     -> ~/.claude/scripts/session-start.sh
     Stop             -> ~/.claude/scripts/save-session.py
   ```

### Lock-file flow

Write `00-agentic-OS/optional-claude-hooks.lock.md` with the proposed `settings.json` diff. Prompt before applying.

---

## Sub-flow: GitHub private repo

**Only offer if** `gh auth status` succeeds.

### Questions

1. *"Repo name? Defaults to `<vault-name>-ideaverse`. Use the default, or rename?"*
2. *"Private repo? (Default yes -- this is a personal knowledge base.)"*
3. *"Existing repo at `ktnCodes/<repo-name>`? <yes/no/auto-check via gh>. If yes, push to existing. If no, create + push."*
4. *"Initial commit message? Default: `Initial vault baseline (ideaverse-os v0.1.0 init)`."*

### Compilation

1. `cd <vault>`
2. `git init` (if not already a repo)
3. `git add -A && git commit -m <message>`
4. `gh repo create <user>/<repo-name> --private --source=. --push`
5. Print the resulting GitHub URL.

### Lock-file flow

Write `00-agentic-OS/optional-github.lock.md` listing what would be pushed (file count, total size). Prompt before pushing -- this is a destructive operation in the sense that the user is about to publish their vault to GitHub.

### Critical safety

- **Never auto-init git over an existing repo.** Detect `<vault>/.git/` and skip if present, or ask user explicitly.
- **Never push to a public repo by accident.** Default to private; require explicit `--public` flag if user wants it.
- Verify `.gitignore` is in place before pushing -- the user may have personal content under `20-` or `30-` they don't want on GitHub.

---

## Sub-flow: WSL paths

**Only offer if** WSL is detected OR user explicitly says they use WSL.

### Questions

1. *"What's your WSL vault root path? Example: `/home/<user>/workspace/<vault-name>`. (You can find it via `wslpath -u 'C:\\path\\to\\vault'` or just paste it.)"*
2. *"What's your WSL workspace root (the parent of vault)?"*
3. *"What shell? bash / zsh / fish."*
4. *"Where do your Claude / Copilot skills live in WSL? Default: `/home/<user>/.claude/skills/`."*

### Compilation

Update `00-agentic-OS/paths.json` -> `platforms.wsl` block:

```json
"platforms": {
  "wsl": {
    "_target": "wsl-linux",
    "vaultRoot": "/home/<user>/workspace/<vault-name>",
    "workspaceRoot": "/home/<user>/workspace",
    "shell": "bash",
    "claudeSkillsDir": "/home/<user>/.claude/skills"
  }
}
```

### Lock-file flow

Write `00-agentic-OS/optional-wsl.lock.md` with the proposed JSON diff. Prompt, promote.

---

## Depth probes

| Shallow signal | Probe |
|---|---|
| "Just enable everything" | "Sure -- but quick sanity check: do you have Ollama running locally? GitHub CLI auth? WSL configured? Without those, the matching layer is a no-op or breaks." |
| User chains hooks but has 5+ existing | "You have a deep hook chain already. Are any of them legacy / unused? This is a good moment to audit before adding more." |
| User confused on private vs public repo | "If your vault has any client work, secrets, personal notes, journal -- private. If it's a public knowledge garden meant to be browsed -- public. When in doubt, private; you can flip later." |
| WSL path doesn't validate (no leading /, has Windows backslashes) | "WSL paths use forward slashes, no drive letters. Try `/home/<user>/...`." |

## Order of sub-flows (when "all" is picked)

1. WSL paths first (no external state mutation -- just edits paths.json locally)
2. Claude hooks second (mutates ~/.claude/ but reversible)
3. GitHub last (mutates external state -- the GitHub account)

If any fails, the others should still complete. Surface failures clearly:
> *"Claude hooks: registered. GitHub: failed (gh CLI not authenticated -- run `gh auth login` and retry). WSL paths: skipped (not detected)."*

## After optional layers is locked

Suggest the natural next step:
> *"Optional layers configured. Your vault is now fully set up. Try the differentiator -- `/ideaverse-os capture <youtube-url>` -- to watch the cortex auto-populate. Or just start working: open `00-agentic-OS/compass.md` and let the harness layer do the rest."*

This is the **last build phase**. Phase 5 complete = full setup done.
