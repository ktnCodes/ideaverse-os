# wiki/

LLM-compiled knowledge base. Articles here are generated from raw sources and domain notes, not hand-written.

## Sections

| Section | Covers |
|---|---|
| [[wiki/ai/_index\|AI]] | Agent patterns, LLM tooling, prompt engineering |
| [[wiki/career/_index\|Career]] | Career strategy, growth planning, job market |
| [[wiki/portfolio/_index\|Portfolio]] | Personal projects, builds, methodology |
| [[wiki/tools/_index\|Tools]] | Dev tools, workflow, integrations |

## How It Works

1. Capture raw sources in `raw/` (web clips, YouTube transcripts, papers)
2. Use `/wiki-compile` to read raw sources and produce structured articles here
3. Use `/wiki-query` to ask questions -- the LLM reads these articles to answer
4. Use `/wiki-lint` to find stale articles, broken links, and coverage gaps
