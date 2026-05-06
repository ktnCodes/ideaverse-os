# Phase 3: Workflow

Compiles `00-agentic-OS/user.md`. Captures day-to-day operating preferences -- which harnesses, which tools, which conventions, which workflow rituals.

## Goal

After phase 3, the LLM knows how to **operate alongside** the user without re-asking basic context every session.

Sections in `user.md.tmpl`:
1. Harnesses (LLM CLIs / desktop apps in use)
2. Tooling (editor, OS, terminal, knowledge base)
3. File Naming Conventions
4. Daily Workflow

## Question flow (one per turn)

### Section 1 - Harnesses

1. *"Which LLM harnesses do you use? (Claude Code, Cursor, Aider, Codex CLI, Gemini CLI, ChatGPT web, Claude.ai web, Copilot CLI, other.) For each, when do you reach for it?"*
2. *"Which is your **primary**? The one you spend the most time in?"*

### Section 2 - Tooling

3. *"What's your stack? Editor / OS / terminal / knowledge base / browser. Be specific (e.g., 'VS Code on Windows 11 with PowerShell 7 + Obsidian + Brave with Web Clipper')."*
4. *"Any **load-bearing** plugins or extensions? Things that, if uninstalled, would noticeably hurt your workflow."*
5. *"What language stacks do you work in primarily? Order them by how much time you spend in each."*

### Section 3 - File naming conventions

6. *"What file-naming conventions do you use? Examples: `YYYY-MM-DD <description>.md` for daily notes, `lc-<number>-<slug>-v<n>.md` for leetcode attempts. List the patterns you use most."*
7. *"Any folder-structure rules? (e.g., 'every project gets a CONTEXT.md', 'tests live alongside source not in /tests/'.)"*

### Section 4 - Daily workflow

8. *"Walk me through a typical work day. Morning routine, deep-work blocks, capture/journal cadence, end-of-day ritual. Keep it concrete -- 'yesterday' over 'usually'."*
9. *"What signals trigger a new session? Examples: 'morning coffee', 'pomodoro reset', 'topic change'. The LLM uses these to decide when to load fresh context vs continue."*
10. *"How do you split work and personal time? Hard boundary, soft boundary, or blended?"*

## Depth probes

| Shallow signal | Probe |
|---|---|
| "I use VS Code" without specifics | "Which extensions are load-bearing? Anything for AI integration -- Claude Code, Continue, Copilot?" |
| "Various languages" | "Rank: top 3 languages by hours-per-week. Be honest -- 'I dabbled once' doesn't count." |
| Vague routine ("work, lunch, more work") | "What did you actually do yesterday morning between 9 and 12? Concrete." |
| Daily notes "sometimes" | "When was the last time you wrote one? What format did it take?" |
| No file-naming pattern | "Look at the last 5 markdown files you created. Spot the pattern -- there is one, even if you didn't think about it." |
| "I use Obsidian" without conventions | "What's in your vault root? What folders exist at level 1? That's already a workflow choice -- describe it." |
| Plugin list under 3 items | "Open your editor's extension panel. What's installed? Don't filter -- list everything." |

## Compilation

Map answers to sections directly. user.md.tmpl already has the four headers; replace `[TODO]` markers with compiled content. Lock at `user.md.lock.md`, prompt, promote.

## After workflow is locked

Suggest the natural next step:
> *"Workflow locked. Next: `/ideaverse-os build --phase=domains` to set up your `20-` and `30-` user-domain folders. You'll pick from 6 starter templates (Work+Personal, Creative, Researcher+Builder, Trader/Investor, Day-job+Side-project, Solo) or go Custom."*
