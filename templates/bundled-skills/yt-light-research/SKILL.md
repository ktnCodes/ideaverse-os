---
name: yt-light-research
description: Lightweight YouTube research pipeline. Fetches transcript + metadata only (no frame extraction). Writes a structured research note to 40-raw/youtube/ and auto-chains cortex-compile. Use for concept explainers, talks, or any video where the audio carries the signal. Invoke with /yt-light-research <youtube-url>.
user_invocable: true
argument-hint: "<youtube-url> -- https://youtu.be/... or https://www.youtube.com/watch?v=..."
---

# yt-light-research

Fetch a YouTube transcript, synthesize it against the vault's cortex, and write a research note in `40-raw/youtube/`.

If the video has dense slides, code-on-screen, architecture diagrams, or benchmark charts, visual analysis is needed and this skill will miss that layer. In that case, note the gap in the output.

## Path resolution

Read `00-agentic-OS/paths.json` for `vaultRoot`.

| Placeholder | Points to |
|---|---|
| `{vaultRoot}` | Vault root directory |
| `{ytRawDir}` | `40-raw/youtube/` -- where research notes land |

If `paths.json` is missing, halt: "paths.json not found. Run /ideaverse-os build --phase=workflow to generate it."

---

## Step 1: Fetch transcript + metadata

Use available MCP tools or browser automation to retrieve:

- **Transcript:** The full spoken-word transcript of the video. If the transcript is returned as a cached file path, read the file at that path.
- **Metadata:** Title, channel name, video description, duration.

If transcript fetch fails and no fallback is available, halt: "Transcript fetch failed for {url}. Try fetching the transcript manually and running /web-clip-report with the saved content."

---

## Step 2: Content analysis

Synthesize transcript + metadata. Identify:

- The main thesis or claim
- All major takeaways -- preserve enumerated structures (if the speaker lists 5 things, enumerate all 5)
- Every tool, framework, service, or method named
- Any URLs, commands, version numbers, or named references in the description or speech
- 1-3 open questions the video raises but doesn't answer
- Source bias or agenda
- Confidence rating: High, Medium, or Low

**Visual gaps:** If the speaker references on-screen content the transcript can't capture ("as you can see here", "look at this diagram", "in this slide"), note these moments. Flag them in the output under a Visual Gaps section.

---

## Step 3: Cortex synthesis

Read:
1. `10-cortex/_index.md` to see what's already in the cortex
2. 3-5 relevant cortex articles that relate to the video's topic

Produce:
- 2-3 convergent themes (where the video confirms or extends existing cortex knowledge)
- 1-2 tensions or new directions (where the video contradicts or adds something new)
- 2-4 actionable insights with why/try-it framing

If the cortex is empty, skip this step and note: "Cortex is empty -- run /cortex-compile after this research to start building it."

---

## Step 4: Write the research note

Determine a slug: kebab-case from the video title, ASCII only, max 60 chars.

Save to `{ytRawDir}/light-research-{slug}.md`:

```markdown
---
title: "[Video Title]"
description: "[What the video covers. Why it matters. 1-2 sentences.]"
topic: "[primary-topic-slug]"
source: "[Channel Name]"
source_url: "https://youtu.be/VIDEO_ID"
source_type: youtube
analysis_type: light-research
date: YYYY-MM-DD
tags: [research, youtube, light-research, topic-tag-1]
confidence: Low | Medium | High
duration_minutes: [number]
pipeline: transcript-only
related: []
---

## TL;DR

[2-4 sentences summarizing the video's core argument and most important takeaway.]

## Key Takeaways

[Preserve the enumerated structure from the talk. If the speaker defines 5 concepts, list all 5.]

- **[Label]:** [explanation]
- **[Label]:** [explanation]

## Detailed Analysis

[Transcript-grounded analysis. Quote sparingly, with timestamps when exact phrasing matters.]

## Cortex Synthesis

[Themes, tensions, actionable insights. Grounded in existing cortex articles. Skip if cortex is empty.]

## Open Questions

- [Question the video raised but didn't answer]
- [Follow-up worth investigating]

## Bias / Agenda Notes

[1-2 sentences on source credibility and motivation.]

## Sources and References

[URLs, papers, books, repos mentioned by name in the video or description.]
```

If there were visual gaps (Step 2), add:

```markdown
## Visual Gaps

[List the moments where the speaker referenced on-screen content that the transcript couldn't capture. Consider re-running with visual analysis if this content is important.]
```

---

## Step 5: Auto-chain cortex-compile

After the note is written, determine the target topic from the note's `topic:` frontmatter:

- Invoke `/cortex-compile <topic>` to compile or refresh the relevant cortex articles.
- If `/cortex-compile` is not available, surface as an action item: "Run /cortex-compile <topic> to fold this research into your cortex."

---

## Step 6: Report

```
yt-light-research complete:
- Video: [Title]
- Duration: N min
- Research note: 40-raw/youtube/light-research-{slug}.md
- Cortex: <topic> -- N articles updated/created
- Visual gaps flagged: 0 | N (if N > 0, visual analysis may add value)
```

---

## Quality rules

- **Transcript is the source of truth.** No hallucination, no padding.
- **Preserve enumerations.** If the speaker says "5 things", enumerate all 5 with their framing.
- **ASCII only.** No em dashes, smart quotes, or Unicode bullets.
- **Visual gaps are a feature.** Light research is faster because it skips visuals; flagging the gaps makes the tradeoff visible.
- **Paths from paths.json only.** Never hardcode a path.
