# Phase 1: Compass

Compile the user's current priorities into `00-agentic-OS/compass.md`. This is the **first** phase because every later phase reads the compass to filter what's relevant.

## Goal

Fill in 4 sections of `compass.md`:
1. **What I'm Optimizing For Right Now** -- this week / this month / this quarter
2. **In-flight** -- active threads, deadlines, who's involved
3. **Parked** -- explicitly demoted items + reason
4. **Decision Criteria** -- when two priorities conflict, which wins

## Question flow (dynamic, one per turn)

Walk these questions one at a time. Adapt language to the user. Don't bundle. Match `/grill-me` cadence.

### Section 1 - What you're optimizing for

1. *"What's the **single most important thing** you need to accomplish this week? (Just one. We can rank others after.)"*
2. *"Anything else this week worth listing as a top priority? (Cap at 3 total.)"*
3. *"Zoom out: what are you optimizing for **this month**? Different from this week, or just a longer view of the same thing?"*
4. *"And **this quarter**? What's the strategic bet you're making?"*

### Section 2 - In-flight

5. *"What threads are currently in motion? (e.g., a job interview pipeline, a project mid-build, an evaluation underway.) For each, give: name, current step, who's involved, next deadline."*
6. *"Any time-sensitive deadlines I should know about? Format: `<thing> by <date>`."*

### Section 3 - Parked

7. *"What have you deliberately said NO to (or DEFERRED) right now? List 2-3 items + the reason for parking. This is critical -- without it, the compass loses its filtering power."*

### Section 4 - Decision criteria

8. *"When two priorities collide -- say, a work emergency and a personal goal -- which wins? Is there a rule, or does it case-by-case?"*

## Compilation

Once all 8 answers are in, draft the compiled `compass.md` content. Keep frontmatter intact (auto_inject: true, last-updated to today). Replace `[TODO]` markers with compiled content. **Preserve existing content** if any non-TODO sections were already filled.

## Lock-file flow

1. Write the proposal to `00-agentic-OS/compass.md.lock.md`.
2. Print a 5-line summary:
   ```
   Compass compiled.
   - This week: <one-liner extracted from section 1>
   - This month: <one-liner>
   - In-flight: <count> active threads
   - Parked: <count> items
   - Decision rule: <one-liner from section 4>

   Lock file: 00-agentic-OS/compass.md.lock.md
   ```
3. Ask: *"Write this to compass.md? [y]es / [n]o (revise) / [d]iff to see full content"*
4. On `y`, copy lock content to `compass.md`, delete the lock file.
5. On `n`, ask what to revise, re-grill the relevant section, regenerate the lock.
6. On `d`, print the lock file content, then re-ask.

## Examples of "good" answers

These are what the LLM should aim for in the compiled output:

**This week (good):**
> "Vizio HM-fit round Mon 3 PM is the top bet. Locked why-Vizio narrative; focus on BLUF + casual tone. Hackathon close-out: final QA pass + skillify."

**This week (bad - too vague):**
> "Work on interview prep and finish hackathon things."

**Parked (good):**
> "Zones / smart-pointer audit / AutoPath docs / ktncodes piece. Each needs its own week; this week is single-threaded on Vizio."

**Parked (bad - just a list):**
> "Various things I'm not doing right now."

The good versions have specificity, named stakeholders, and a clear "why parked" rationale. Push the user toward these.

## Edge cases

- **User has nothing parked.** Push: "Everything is active = nothing is. What's the top thing you're choosing NOT to do right now? It can be tiny."
- **User can't articulate a quarterly bet.** Don't force one. Write `[TODO: clarify next month]` for the quarterly section.
- **User's priorities shift mid-interview.** That's fine -- the lock file is editable. Re-grill the affected section.
- **compass.md already has compiled content (no TODOs).** Don't overwrite. Show a diff + ask: "Refresh existing compass, or edit specific sections?"

## After compass is locked

Suggest the natural next step:
> *"Compass locked. Next: `/ideaverse-os build --phase=identity` to fill `me.md` + `soul.md`. Or run `/ideaverse-os capture` to start ingesting sources -- the compass alone is enough to make capture useful."*
