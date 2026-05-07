---
name: cortex-connect
description: Scan 10-cortex/ articles for unlinked mentions of other article titles and add [[wikilinks]]. Deepens the knowledge graph without needing an LLM for matching -- pure text search. Invoke with /cortex-connect [topic] after cortex-compile, or run standalone.
user_invocable: true
argument-hint: "Optional topic to scope: ai | career | tools (omit to scan all topics)"
---

# cortex-connect

Find plain-text mentions of cortex article titles that aren't wikilinked and add `[[wikilinks]]` to deepen the knowledge graph.

## Path resolution

Read `00-agentic-OS/paths.json` for `vaultRoot`. All paths are relative to it.

---

## Step 1: Build article title index

Read `10-cortex/_index.md`. If it doesn't exist, read all `.md` files in `10-cortex/` directly.

Build a lookup of:
- Article slug (filename without `.md`, e.g., `context-window-management`)
- Article display title from the `title:` frontmatter field
- Any aliases listed in the article's `aliases: [...]` frontmatter field

Result: a map of `{ displayText -> slug }` for every article in the cortex.

---

## Step 2: Scan articles for unlinked mentions

**Scope:** If a topic argument is given, scan only `10-cortex/<topic>/`. Otherwise scan all topics.

For each article being scanned, search the body text for:
- Exact matches of other article titles (case-insensitive)
- Exact matches of known aliases
- That are NOT already inside a `[[wikilink]]`
- That are NOT in the article's own title heading
- That are NOT inside a code block (fenced ``` or inline `) or frontmatter

---

## Step 3: Present proposed links

Before applying anything, show the full set of proposed additions grouped by file:

```
## Proposed Wikilinks

### 10-cortex/ai/context-management.md
- Line 15: "context window" -> [[context-window-management]]
- Line 28: "sub-agents" -> [[multi-agent-patterns]]

### 10-cortex/career/positioning.md
- Line 42: "knowledge management" -> [[knowledge-management]]

Total: N new links across M articles
```

**Wait for user confirmation before applying.** The user may decline specific links or skip entire files.

---

## Step 4: Apply approved links

For each confirmed link:
- Replace the plain-text mention with `[[slug|display text]]`, preserving the original text as the display label.
- Example: `context window` -> `[[context-window-management|context window]]`

**Do NOT link:**
- First occurrence in a heading (`#`, `##`, etc.) -- headings should not have wikilinks
- Text inside code blocks (fenced or inline)
- Text inside frontmatter
- The article's own name (no self-links)
- A target that is already linked once elsewhere in the same article (one link per target per article)

---

## Step 5: Report

```
cortex-connect complete:
- Articles scanned: N
- New wikilinks added: N
- Articles touched: [list of slugs]
```

---

## Quality rules

- **One link per target per article.** Link the first meaningful occurrence; ignore subsequent mentions.
- **Preserve readability.** If adding a link makes a sentence awkward, skip it.
- **Never auto-apply.** Always present proposals and wait for confirmation.
- **Cross-topic links are valuable.** An `ai` article mentioning a `career` concept should link to it.
- **Skip trivial matches.** Common words that happen to match an article title (e.g., if a future article were named "tools") should be skipped if the match is incidental.
