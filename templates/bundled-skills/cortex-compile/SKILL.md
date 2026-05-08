---
name: cortex-compile
description: Compile source notes from 40-raw/ into structured cortex articles in 10-cortex/. Creates or refreshes LLM-maintained articles. Invoke with /cortex-compile [topic] after any ingestion event, or run standalone to process all pending sources.
user_invocable: true
argument-hint: "topic tag to compile (e.g., ai, career, productivity) -- omit to process all pending sources"
---

# cortex-compile

The synthesis step that turns raw captures in `40-raw/` into lasting knowledge articles in `10-cortex/`.

## Path resolution

Read `00-agentic-OS/paths.json` for `vaultRoot`. All paths below are relative to it.

## Sources

| Source folder | Content type |
|---|---|
| `40-raw/youtube/` | YouTube research notes written by yt-light-research |
| `40-raw/web-clips/` | Processed web clip notes written by web-clip-report |
| `40-raw/harvest/` | Knowledge extracted manually from domain folders |
| `40-raw/plain/` | Plain-text synthesis notes from ideaverse-capture |

---

## Step 1: Identify pending sources

**With topic argument:** filter sources to files whose `topic:` frontmatter matches the argument.

**Without topic argument:** collect all sources in the above folders that are NOT already logged as `compiled` in `40-raw/_index.md`.

Read `40-raw/_index.md` (ingestion log) to skip already-compiled sources.

**Scale guidance:** If there are 50+ source files, prioritize: files with `status: pending` first, then the 15 most-recently-modified, then any files matching known gaps in `10-cortex/`. Do not read all files at once.

If no pending sources are found, report: "No pending sources in 40-raw/. Nothing to compile."

---

## Step 2: Determine target articles

From each source file's `topic:` frontmatter, determine:
- Target topic folder: `10-cortex/<topic>/`
- Candidate article: check if an article covering the source's main concept already exists in that folder.

For each source:
- If an existing article covers it at 70%+: plan a **merge** (update that article).
- Otherwise: plan a **new article**.

---

## Step 3: Write or refresh articles

For each planned article, create or update the file at `10-cortex/<topic>/<slug>.md`:

```markdown
---
title: "[Concept Name]"
description: "[One sentence: what this is. One sentence: why it matters to the vault owner.]"
topic: "[topic-slug]"
sources:
  - "[source-path]"
created: YYYY-MM-DD
last_compiled: YYYY-MM-DD
verified_at: YYYY-MM-DD
confidence: low | medium | high
staleness_signal: "[one-line condition that, if true, means this article is stale]"
---

# [Concept Name]

One-sentence definition of what this is.

## TL;DR

50-100 words. What this is and why the reader cares. Enough to know whether to keep reading.
This section is required -- cortex-lint flags articles missing it.

## Summary

2-3 paragraphs. Written for the vault owner 6 months from now who needs a fast refresher.
Emphasize the "why" and key insights, not definitions. Ground it in their active work where possible.

## Key Facts

- Concrete finding or principle
- Concrete finding or principle

## Connections

- **Related:** [[other-cortex-article]], [[another-article]]
- **Used in:** (domain contexts where this applies)
- **Contrasts with:** [[contrasting-concept]] -- (one-line distinction)

## Sources

Use typed-edge prefixes so the relationship between source and claim is explicit:

- supports:: [[40-raw/youtube/light-research-slug.md]] -- one-line note on what this source supports
- contradicts:: [[40-raw/web-clips/clip-slug.md]] -- one-line note on what claim this source disputes
- extends:: [[40-raw/papers/paper-slug.md]] -- one-line note on what this source builds on
- mentions:: [[40-raw/youtube/passing-mention.md]] -- one-line note on a passing reference
- inspired-by:: [[40-raw/plain/seed-thought.md]] -- one-line note on the seed idea
```

### Quality rules

- One concept per article. If an article is over 600 words, consider splitting it.
- Prefer updating over creating: new source 70%+ covered by existing article -> update, don't create.
- Every article must have at least one entry in Sources, using one of the 5 typed-edge prefixes.
- Every article must link to at least one other article in Connections.
- Every article must have a 50-100 word `## TL;DR` section. cortex-lint enforces this.
- Write for the vault owner. If `00-agentic-OS/me.md` is in context, use it to ground the "Used in" and TL;DR relevance.
- Confidence: `high` for primary research or official docs, `medium` for credible analysis, `low` for speculation or single source.
- `verified_at`: set to today's date when the article is created or substantively re-confirmed against current sources. cortex-lint flags articles where `verified_at` is older than 90 days.
- `staleness_signal`: a one-line condition that, if true, means the article is no longer accurate. Examples: "model name changes", "API version bumps to v2", "company is acquired or shuts down". cortex-lint surfaces these for periodic review.
- Do not invent. Only write facts supported by the source material.

---

## Step 4: Update 10-cortex/_index.md

Create `10-cortex/_index.md` if it doesn't exist. Update it to list all articles:

```markdown
# Cortex Index

Last compiled: YYYY-MM-DD
Total articles: N

## <topic>

| Article | Description | Last compiled |
|---|---|---|
| [[10-cortex/<topic>/<slug>.md]] | <description from frontmatter> | YYYY-MM-DD |
```

---

## Step 5: Update ingestion log

For each source that was compiled, add a row to `40-raw/_index.md`:

```markdown
| YYYY-MM-DD | <source-path> | <cortex-article-path> | compiled |
```

Create `40-raw/_index.md` with a table header if it doesn't exist.

---

## Step 6: Archive compiled raw sources

After logging, move each compiled source from `40-raw/<type>/filename.md` to `99-archive/<type>/filename.md`. Create the destination subfolder if it does not exist.

Update any cortex article that references `[[40-raw/<type>/filename]]` in its Sources section to point to `[[99-archive/<type>/filename]]`.

**Do NOT archive** sources tagged `keep-in-raw: true` in their frontmatter.

---

## Step 7: Report

```
cortex-compile complete:
- Topics compiled: [comma-separated list]
- Articles created: N
- Articles updated: N
- Sources archived: N
- Ingestion log: updated 40-raw/_index.md
```

List any article that was created for the first time so the user knows to run `/cortex-connect` to add wikilinks.
