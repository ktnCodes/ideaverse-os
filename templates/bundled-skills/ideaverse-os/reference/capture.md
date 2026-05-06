# Capture (stub)

The conversational ingestion router. Takes a URL, file drop, or plain text and routes to the right handler (`yt-light-research`, `web-clip-report`, etc.), then refreshes `10-cortex/` articles via `cortex-compile` + `cortex-connect`.

**Status: implemented in Task 2 of the v1 roadmap.** This is the **differentiator** -- the thing that makes ideaverse-OS unique. Karpathy's wiki pattern with conversational ingestion baked in.

Routing matrix planned:

| Source | Handler |
|---|---|
| YouTube URL | yt-light-research |
| Obsidian Web Clipper drop in 40-raw/web-clips/ | web-clip-report |
| Pasted URL (no OWC) | server-side fetch -> Mozilla Readability -> Turndown -> web-clip-report |
| Plain text "I learned X" | direct synthesis (no fetch) |
| Local file in 40-raw/ | route by extension |

After ingestion, runs `cortex-compile` + `cortex-connect` and writes a one-line capture log to today's `70-daily/<date>.md`.
