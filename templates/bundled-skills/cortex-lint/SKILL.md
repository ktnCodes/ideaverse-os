---
name: cortex-lint
description: Audit cortex articles in 10-cortex/ for decay, missing required fields, broken Sources prefixes, and short TL;DR sections. Read-only by default. Invoke with /cortex-lint to surface issues without mutating any file.
user_invocable: true
argument-hint: "topic to lint (e.g., ai, career) -- omit to lint all topics"
---

# cortex-lint

A health check across `10-cortex/` that flags articles that have decayed, are missing required frontmatter, or violate the cortex article standard. Read-only -- it diagnoses, never edits. To fix issues, hand the report to `/cortex-compile` or edit the article directly.

## Path resolution

Read `00-agentic-OS/paths.json` for `vaultRoot`. All paths below are relative to it.

## Scope

**With topic argument:** lint articles under `10-cortex/<topic>/`.

**Without topic argument:** lint every article under `10-cortex/` except `_index.md`.

If `10-cortex/` is empty or missing, report: "No cortex articles to lint." and exit.

---

## Step 1: Collect articles

For each markdown file under the lint scope (excluding `_index.md` files):

1. Parse YAML frontmatter.
2. Read the body.

If frontmatter parse fails, record the article as a `parse-error` finding and skip the rest of its checks.

---

## Step 2: Run check rules

Run each rule against every article. Each rule produces zero or more findings.

### Rule A: stale -- `verified_at` over 90 days old

- If `verified_at` is missing: record `missing-verified-at`.
- If `verified_at` parses to a date older than 90 days from today: record `stale-verified-at` with the age in days.

### Rule B: low confidence

- If `confidence: low`: record `low-confidence` (informational; not a failure on its own, but surfaces articles that should either be promoted or removed).

### Rule C: missing required frontmatter fields

Required: `title`, `description`, `topic`, `created`, `last_compiled`, `verified_at`, `confidence`, `staleness_signal`, `sources`.

For each missing field, record `missing-field:<field-name>`.

### Rule D: TL;DR missing or out-of-range

- If the body has no `## TL;DR` heading: record `missing-tldr`.
- If the TL;DR section word count is under 30 or over 150: record `tldr-out-of-range` with the word count. (Target is 50-100, with a buffer.)

### Rule E: Sources missing or untyped

- If the body has no `## Sources` heading: record `missing-sources`.
- If the Sources section has no list items: record `empty-sources`.
- For each Sources list item that does NOT start with one of the 5 typed-edge prefixes (`supports::`, `contradicts::`, `extends::`, `mentions::`, `inspired-by::`): record `untyped-source` with the item text.

### Rule F: Connections missing

- If the body has no `## Connections` heading: record `missing-connections`.
- If the Connections section has no `[[...]]` wikilinks: record `empty-connections`.

### Rule G: staleness_signal trigger (best-effort)

`staleness_signal` is free-form text. Run a best-effort match: if the signal mentions a model name, API version, or product that the LLM knows has changed since `verified_at`, record `staleness-signal-triggered` with the matched phrase.

This rule is intentionally fuzzy. The LLM uses its own world knowledge to flag plausible decay; the user makes the final call.

---

## Step 3: Group and rank findings

Group findings by article. Within each article, order findings by severity:

| Severity | Findings |
|---|---|
| error | `parse-error`, `missing-tldr`, `missing-sources`, `empty-sources`, `missing-field:title`, `missing-field:topic` |
| warn | `missing-field:*` (for any other field), `untyped-source`, `tldr-out-of-range`, `missing-connections`, `empty-connections` |
| info | `low-confidence`, `stale-verified-at`, `staleness-signal-triggered`, `missing-verified-at` |

Articles with at least one error sort first. Within a severity bucket, articles with more findings sort first.

---

## Step 4: Report

Write the report to stdout. Do NOT write a file -- the report is for the human to read in the chat.

```
cortex-lint report (YYYY-MM-DD)

Scope: <topic or "all topics">
Articles linted: N
Articles with findings: M

ERRORS (block re-compile until fixed)
  10-cortex/ai/transformers.md
    - missing-tldr
    - missing-field:topic
  10-cortex/career/grade-7.md
    - parse-error: unexpected token at line 4

WARNINGS (fix when you next touch the article)
  10-cortex/ai/rag.md
    - untyped-source: "[[40-raw/youtube/foo.md]] -- pipeline overview"
    - missing-connections

INFO (surface for review, not blocking)
  10-cortex/ai/llm-routing.md
    - stale-verified-at: 137 days old
    - staleness-signal-triggered: signal mentions "GPT-4 turbo" which has been deprecated

Summary: 2 errors, 3 warnings, 2 info
Next: hand the error list to /cortex-compile to refresh those articles, or edit them directly.
```

If there are zero findings, report:

```
cortex-lint report (YYYY-MM-DD)

Scope: <topic or "all topics">
Articles linted: N
Articles with findings: 0

All clean. Nothing to fix.
```

---

## What this skill does NOT do

- Does not edit any article. Linting is diagnostic only.
- Does not auto-fix typed-edge prefixes. The rewrite is a `/cortex-compile` job.
- Does not update `verified_at` for you. That's a manual decision -- bumping the date is a claim that you re-checked the source.
- Does not crawl `40-raw/`. It only inspects `10-cortex/` articles.
- Does not write a report file. Output is chat-only so the user can scan and act.
