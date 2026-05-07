# Capture

The conversational ingestion router. Accepts a YouTube URL, plain HTTP URL, a filename in `40-raw/web-clips/`, or a free-text "I learned X" note.

**Status: implemented.** Delegate to the `ideaverse-capture` skill.

---

## How to handle /ideaverse-os capture

When the user invokes `/ideaverse-os capture <arg>` or `/ideaverse-capture <arg>`, load and follow `60-skills/ideaverse-capture/SKILL.md`. That skill owns the full routing logic, step-by-step process, and quality rules.

Do not re-implement routing here. ideaverse-capture is the single source of truth.

---

## Routing summary (for quick reference)

| Input | Handler |
|---|---|
| YouTube URL | /yt-light-research |
| File in 40-raw/web-clips/ | /web-clip-report |
| Plain HTTP/S URL (not YouTube) | fetch + /web-clip-report |
| Free text ("I learned X") | direct cortex synthesis |

After any ingestion: run `/cortex-compile <topic>` + `/cortex-connect`. Log to `70-daily/YYYY-MM-DD.md`.

---

## Dispatched skills

All bundled at `60-skills/` after `npx ideaverse-os init`:

| Skill | Purpose |
|---|---|
| ideaverse-capture | Router (this skill's owner) |
| yt-light-research | YouTube transcript + synthesis -> 40-raw/youtube/ |
| web-clip-report | Web clip processing -> rewrites in-place in 40-raw/web-clips/ |
| cortex-compile | Raw sources -> 10-cortex/ articles |
| cortex-connect | Adds [[wikilinks]] across 10-cortex/ articles |
