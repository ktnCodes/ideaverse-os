---
title: "Daily standup notes"
description: "Why we keep a one-line standup log per day. Faster than meetings, slower than nothing."
topic: "work-rituals"
sources:
  - "40-raw/plain/why-standups-fail.md"
created: YYYY-MM-DD
last_compiled: YYYY-MM-DD
verified_at: YYYY-MM-DD
confidence: medium
staleness_signal: "team adopts a different async ritual, or company-wide tooling replaces the manual log"
---

# Daily standup notes

A one-line written status, captured before the workday starts, that the
LLM and any teammate can read instead of waiting for a meeting.

## TL;DR

Standups exist to surface blockers fast. The 15-minute meeting form often
fails: it forces synchrony, repeats info teammates already know, and rewards
performance over honesty. A written one-liner per day keeps the surfacing
benefit and drops the meeting tax. The vault stores yours in 70-daily/ so
the LLM can read recent context at the start of any session. About 80
words of why, 60 words of how.

## Summary

The original standup format from XP / Scrum was three questions: what did
you do yesterday, what will you do today, what's blocking you. The format
worked because teams were small, co-located, and shipping daily. Most of
those conditions don't hold anymore.

A written variant captures the same three answers in one line each, lets
the team read async, and gives the LLM something concrete to ground its
session-start context in. The cost is one minute of typing instead of
fifteen of meeting.

## Key Facts

- Original format: 3 questions, 15 minutes, daily, in-person.
- Async variant: same 3 questions, written, 60 seconds, posted to a known
  location.
- The vault stores yours in `70-daily/<date>-work.md` so cortex-compile
  can pick up patterns over time.

## Connections

- Related: [[10-cortex/work-rituals/weekly-review]]
- Used in: 70-daily session start, before any LLM session
- Contrasts with: [[10-cortex/work-rituals/synchronous-standup]] -- the
  meeting form has higher cost, marginally higher trust signal.

## Sources

- supports:: [[40-raw/plain/why-standups-fail.md]] -- argument that the
  meeting form rewards performance over honesty
- inspired-by:: [[40-raw/youtube/agile-rituals-examined.md]] -- talk that
  re-examines XP / Scrum rituals in remote-first teams

---

This file is a sample cortex article that demonstrates the frontmatter
standard. Delete it once you have your own articles. See
`/ideaverse-os/concepts/cortex-frontmatter` for the full spec.
