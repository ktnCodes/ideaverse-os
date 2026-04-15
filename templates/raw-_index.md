# raw/

Ingestion queue. Everything captured goes here first, then gets compiled into wiki articles.

## Subfolders

| Folder | What goes here |
|---|---|
| `web-clips/` | Obsidian Web Clipper saves, bookmarked articles |
| `youtube/` | YouTube transcript notes and research reports |
| `papers/` | Academic papers, whitepapers, technical reports |

## Workflow

1. **Capture** -- Save raw content into the appropriate subfolder
2. **Tag** -- Add frontmatter with `description`, `source`, and `tags`
3. **Compile** -- Run `/wiki-compile` to turn tagged raw notes into wiki articles
4. **Archive** -- Compiled notes stay here as source citations for wiki articles

## Frontmatter Convention

```yaml
---
title: "Article Title"
source: "https://..."
description: "One-sentence summary for LLM scanning"
tags: [topic1, topic2]
created: YYYY-MM-DD
---
```

The `description` field is critical -- LLM skills scan it to determine relevance without reading the full body.
