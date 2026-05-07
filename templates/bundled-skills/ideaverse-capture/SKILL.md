---
name: ideaverse-capture
description: Conversational ingestion router. Accepts a YouTube URL, plain HTTP URL, a filename in 40-raw/web-clips/, or a free-text "I learned X" note. Routes to the right handler, refreshes 10-cortex/ via cortex-compile + cortex-connect, and logs to today's daily note. Invoke with /ideaverse-capture <url-or-text>.
user_invocable: true
argument-hint: "<youtube-url | http-url | filename-in-40-raw/web-clips/ | 'I learned...'>"
---

# ideaverse-capture

The ingestion entrypoint for your vault. One command routes any source into your cortex.

## When to use

- Paste a YouTube URL to capture a video as a research note in `40-raw/youtube/`
- Paste any web URL to fetch, process, and store it in `40-raw/web-clips/`
- Pass a filename after Obsidian Web Clipper drops a raw file into `40-raw/web-clips/`
- Type "I learned X" or any free-text insight to synthesize it directly into `10-cortex/`

## Routing matrix

| Input type | Detection | Handler |
|---|---|---|
| YouTube URL | matches `youtu.be/`, `youtube.com/watch?v=`, or `youtube.com/shorts/` | /yt-light-research |
| File in 40-raw/web-clips/ | no `://`, has .md extension, or filename exists in 40-raw/web-clips/ | /web-clip-report |
| Plain HTTP/S URL (not YouTube) | starts with `https?://`, not a YouTube domain | fetch + /web-clip-report |
| Free text | none of the above | direct cortex synthesis |

---

## Step 0: Load paths

Read `00-agentic-OS/paths.json`. Use `vaultRoot` for all file operations. If `paths.json` is missing, halt: "paths.json not found. Run /ideaverse-os build --phase=workflow to generate it."

---

## Step 1: Detect source type

Inspect `$ARGUMENTS` (everything after `/ideaverse-capture`):

1. Matches `(?:youtu\.be/|youtube\.com/watch\?v=|youtube\.com/shorts/)` -> **YT URL**. Go to Step 2a.
2. No `://`, ends in `.md`, OR file exists at `{vaultRoot}/40-raw/web-clips/<arg>` -> **Web clip file**. Go to Step 2b.
3. Starts with `https?://` (not YouTube) -> **Plain URL**. Go to Step 2c.
4. Anything else -> **Free text**. Go to Step 2d.

---

## Step 2a: YouTube URL

Delegate to `/yt-light-research <url>`.

That skill fetches the transcript, synthesizes a research note, and writes it to `40-raw/youtube/`. After it completes, take the written file path and continue to Step 3.

If `/yt-light-research` is not available: "yt-light-research skill not found in 60-skills/_shared/. Re-run `npx ideaverse-os init --force` to restore bundled skills."

---

## Step 2b: Web clip file

File must exist at `{vaultRoot}/40-raw/web-clips/<filename>`.

If it doesn't exist: "File not found at 40-raw/web-clips/{arg}. Did you mean to paste the URL directly?"

Delegate to `/web-clip-report <filename>`. That skill rewrites the file in-place with structured frontmatter, TL;DR, and key takeaways.

After it completes, continue to Step 3 with the file path.

---

## Step 2c: Plain URL (not YouTube)

1. Use available browser tools (Playwright MCP `browser_navigate` + `browser_snapshot`, or any equivalent fetch tool) to retrieve the page content.
2. Extract the main article text. Discard navigation, ads, footers, cookie banners.
3. Derive a slug from the page title (kebab-case, ASCII, max 60 chars).
4. Write a temporary raw file to `{vaultRoot}/40-raw/web-clips/YYYY-MM-DD-<slug>.md` with:
   - `source_url:` the original URL
   - `date:` today's date
   - The extracted body as plain markdown
5. Delegate to `/web-clip-report YYYY-MM-DD-<slug>.md`.

If no browser/fetch tool is available: "No fetch tool found. Save the page manually to 40-raw/web-clips/ and run `/ideaverse-capture <filename>` to process it."

Continue to Step 3 with the processed file path.

---

## Step 2d: Free text synthesis

For "I learned X", "Key insight: ...", or any plain-text insight without a source URL:

1. Ask: "What topic tag should this go under? (e.g., ai, career, embedded, productivity, tools)"
2. Ask: "One-line title for this insight?"
3. Derive a slug from the title.
4. Write or update a cortex article at `{vaultRoot}/10-cortex/<topic>/<slug>.md` using the cortex-compile article format:

```markdown
---
title: "<title>"
description: "<insight in one sentence>"
topic: "<topic>"
sources: [plain-text capture]
created: YYYY-MM-DD
last_compiled: YYYY-MM-DD
confidence: low
---

# <title>

<insight as 1-2 paragraph article>

## Sources

- Plain-text capture, YYYY-MM-DD
```

Skip to Step 4 (cortex-connect + daily log). Do not run cortex-compile (the article was written directly).

---

## Step 3: Run cortex-compile

After ingestion via Steps 2a-2c, refresh the cortex:

1. Read the written note's `topic:` frontmatter field.
2. Invoke `/cortex-compile <topic>` to compile or refresh the relevant cortex articles.
3. Note the articles created or updated.

If `/cortex-compile` is unavailable, surface as an action item in the report: "Run /cortex-compile <topic> to fold this into your cortex."

---

## Step 4: Run cortex-connect

Invoke `/cortex-connect` to scan `10-cortex/` for unlinked mentions and add wikilinks.

If unavailable: "Run /cortex-connect to add wikilinks after reviewing the new article."

---

## Step 5: Write to daily log

Append a one-line entry to today's daily note. Determine the path:
- If `{vaultRoot}/70-daily/YYYY-MM-DD.md` exists, append to it.
- If it doesn't exist, create it with a minimal header and append.

Entry format:
```
- [capture] <source-type>: [[<relative-path-to-note>]] -- <one-line title or description>
```

---

## Step 6: Report

```
Captured: <source title>
Source type: <youtube | web-clip | url | plain-text>
Raw note: <path if applicable>
Cortex: <cortex article(s) updated or created>
See also: <related articles if found by cortex-connect>
Daily log: updated 70-daily/YYYY-MM-DD.md
```

---

## Quality rules

- Never invent content. If the transcript or page doesn't say it, don't write it.
- ASCII only. No em dashes, smart quotes, or Unicode bullets.
- Paths always come from paths.json, never hardcoded.
- If a delegated skill is missing, report it clearly. Never silently skip.
- One capture per invocation. Batch capture is not supported in v1.
