---
name: web-clip-report
description: Process a raw web clip in 40-raw/web-clips/ into a standardized frontmatter-first research note. Rewrites the file in-place with structured frontmatter, TL;DR, key takeaways, and a relevance section personalized from user.md. Invoke with /web-clip-report <filename>.
user_invocable: true
argument-hint: "<filename> -- the .md file in 40-raw/web-clips/ to process"
---

# web-clip-report

Process a raw web clip saved by Obsidian Web Clipper (or written by ideaverse-capture) into a standardized vault research note. Rewrites the file in-place, preserving the original source URL.

## Path resolution

Read `00-agentic-OS/paths.json` for `vaultRoot`. All paths are relative to it.

Optionally read `00-agentic-OS/user.md` if available -- it provides context for the "So What for You" section.

---

## Step 1: Read the source file

Read the file at `{vaultRoot}/40-raw/web-clips/$ARGUMENTS`.

If the file does not exist, halt: "File not found: 40-raw/web-clips/{arg}. Check the filename and try again."

Preserve from the original frontmatter:
- `source` or `source_url` field (the original URL -- never lose this)
- `author` field if present
- `published` date if present
- `title` if present (use as fallback title if no better title is found in the body)

---

## Step 2: Analyze the content

Read the full body. Identify:

- The main argument or thesis
- 5-7 key takeaways
- The content type (article, blog post, documentation, research paper, social post, video transcript, etc.)
- 1-3 open questions the content raises but does not answer
- Source bias or agenda (selling a product? promoting a framework? sharing direct experience? anonymous?)
- Confidence rating:
  - **High** -- primary research, expert practitioner with direct experience, or official documentation
  - **Medium** -- credible analysis or opinion, secondhand evidence, reputable publication
  - **Low** -- speculative, poorly sourced, anonymous, or heavily promotional
- Relevance to the vault owner (read `user.md` if available for their active work and goals)
- Any external sources, tools, books, or links referenced in the body

---

## Step 3: Rewrite the file

Overwrite the file at `{vaultRoot}/40-raw/web-clips/$ARGUMENTS` with exactly this format:

```markdown
---
title: "[Article or page title]"
description: "[One sentence: what this source argues or covers. One sentence: why it matters or what problem it addresses.]"
topic: "[primary-topic-slug]"
source: "[Publication name, site name, or author name]"
source_url: "[original URL]"
source_type: web-clip
date: YYYY-MM-DD
tags: [research, web-clip, topic-tag-1, topic-tag-2]
confidence: Low | Medium | High
related: []
---

## TL;DR

- [Core argument in one line]
- [Most important implication]
- [Key actionable insight or warning]

## Key Takeaways

- **[Label]:** [explanation]
- **[Label]:** [explanation]
- **[Label]:** [explanation]
- **[Label]:** [explanation]
- **[Label]:** [explanation]

## Open Questions

- [Question this content raises but does not answer]
- [Follow-up question worth investigating]

## Bias / Agenda Notes

[1-2 sentences on source credibility. Note if the author is selling a product, promoting a framework, or has a known slant. If none detected, write "No obvious bias detected."]

## So What for You

[1-2 sentences connecting this content to the vault owner's active projects, goals, or technical work. Read user.md for context. If user.md is not available, write a general relevance statement based on the topic.]

## Sources

- [Any external sources, papers, tools, or links referenced in the body.]
- [If none were explicitly mentioned, write "No external sources referenced."]
```

---

## Quality rules

- **Frontmatter first.** The `description` field is the most critical -- an LLM scanning only frontmatter must determine relevance without reading the body.
- **ASCII only.** No em dashes, curly quotes, ellipsis characters, or Unicode bullets.
- **Preserve provenance.** Always carry forward the original source URL. Never lose it.
- **Do not hallucinate.** Only include information present in the clipped content.
- **Date field:** Use today's date if no clear publication date exists in the original clip.
- **No archiving.** This skill rewrites in-place. cortex-compile handles moving files to 99-archive/ after compilation.
- **"So What for You"** reads the vault owner's profile from `user.md` -- if available, reference their active projects or goals specifically. If not available, keep it generic.
