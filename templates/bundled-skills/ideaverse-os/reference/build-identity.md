# Phase 2: Identity

Compiles **two** lean files: `00-agentic-OS/me.md` (identity dossier) and `00-agentic-OS/soul.md` (behavioral constraints). Run as two sub-phases. Both follow the universal lock-file flow.

## Goal

After phase 2, the LLM has a personalized model of:
- Who the user is at their core (`me.md`)
- The non-negotiable rules they want every session to obey (`soul.md`)

This is the **most identity-sensitive** phase. Compass (phase 1) is what the user is doing this week; identity is who they are in any week.

---

## Sub-phase 2a: me.md (identity dossier)

Sections in `me.md.tmpl`:
1. Summary Statement (2-3 sentences)
2. First Principles (3-5 beliefs)
3. Identity (roles, current focus, what they're known for)
4. Working Style (decision-making, collaboration, energy pattern)

### Question flow (one per turn)

1. *"In 2-3 sentences: what drives you? What are you building toward over the next 1-2 years?"* (Summary statement)
2. *"What are 3-5 first principles -- load-bearing beliefs that shape how you work? Format: 'On <topic>: <stance>'. Example: 'On feedback: prefer brutal honesty over polite vagueness.'"*
3. *"What roles do you currently play? (e.g., software engineer, knowledge worker, parent, mentor.) Lead with the one you most identify with."*
4. *"What are you known for among people who know you well? What do they come to you for?"*
5. *"How do you make decisions when there's ambiguity -- when there's no obvious right answer?"*
6. *"How do you prefer to collaborate? Solo deep-work-first? Pair-programming? Async written? Live verbal?"*
7. *"What's your energy pattern? When are you sharpest -- morning, afternoon, late night? When do you run out of gas?"*

### Compilation

Compile answers into `me.md` preserving frontmatter (`auto_inject: true`, last-updated). Sections map directly. Lock at `me.md.lock.md`, prompt, promote.

---

## Sub-phase 2b: soul.md (behavioral rules)

Sections in `soul.md.tmpl`:
1. Communication
2. Format
3. Process

### Question flow (one per turn)

1. *"What communication patterns do you want the LLM to default to? List 5-10 rules. Examples: 'lead with the answer', 'tables over paragraphs', 'honest pushback'."*
2. *"Any phrases or words you want the LLM to NEVER use? Examples: 'Great question!', 'I'd be happy to help', the word 'delve'."*
3. *"Any output format constraints? Examples: ASCII only, no em dashes, file naming pattern like `YYYY-MM-DD <description>.ext`."*
4. *"What workflow / process rules apply across all sessions? Examples: 'grill before build', 'vertical slices over horizontal layers', 'TDD when applicable', 'always check git status before committing'."*
5. *"What should the LLM **always do** at session start? Examples: 'state what context you have', 'confirm no prior history when starting fresh', 'name a fresh branch'."*
6. *"What should the LLM **never do**? Hard prohibitions. Examples: 'never push without asking', 'never run destructive ops without confirmation', 'never invent file paths you haven't verified'."*

### Compilation

Compile into `soul.md` under the three section headers (Communication / Format / Process). Each rule becomes a bullet. Concise -- soul.md is a constraint sheet, not an essay.

---

## Depth probes (use whenever an answer is shallow)

Identity is the phase most prone to vague generic answers. Push hard.

| Shallow signal | Probe |
|---|---|
| Generic role ("software engineer") | "What kind of engineer? What do you build, in what stack, for what user? Specificity helps the LLM frame your work correctly." |
| Generic principle ("I value quality") | "Quality of what? Compared to what? Give me a concrete situation where this shaped a decision you made." |
| "Be helpful" / "communicate clearly" | "Concretely -- what does a perfect response look like vs a wrong one? Show me an example of each." |
| No anti-pattern named | "What's something the LLM does that drives you crazy? Cliche openings? Trailing summaries? Yes-man behavior?" |
| Working style platitudes ("collaborative, hard-working") | "Walk me through how you actually worked last week. What did your day look like Tuesday morning?" |
| Energy answer is "depends" | "Pick one: which morning of last week were you sharpest? Which afternoon were you toast? Patterns show up under specificity." |
| Communication rule list under 5 items | "Push for more. What about: pushback style? Question density at end of responses? Acceptable verbosity? File-naming?" |
| "Skip 'great question'" but no other forbidden phrases | "What other LLM tics annoy you? List 3-5 more." |

## Order matters

Run **2a (me.md) before 2b (soul.md)**. The identity context informs which rules matter:

- If me.md says "values brutal honesty," soul.md should default to "honest pushback over yes-man behavior."
- If me.md says "experiments fast, iterates," soul.md should default to "ship a quick version, refine after feedback."

Don't bundle the two. Run 2a, lock, promote. Then run 2b, lock, promote.

## Examples of "good" vs "bad" answers

**Good summary statement:**
> "I'm a 34-year-old engineer optimizing for evidence of an embedded-systems x AI-tooling bridge profile. Building toward a senior tech lead role at a company where AI workflows are core, not bolted on."

**Bad summary statement:**
> "I'm a software engineer who loves learning new things."

**Good first principle:**
> "On feedback: brutal honesty beats polite vagueness. If something is broken, say so directly -- I trust you more than I trust my ego."

**Bad first principle:**
> "I value quality and continuous improvement."

The LLM should push toward the "good" version every time. If the user gives "bad," probe.

## After both lock files are promoted

Suggest the natural next step:
> *"Identity locked. Next: `/ideaverse-os build --phase=workflow` to compile your day-to-day operating preferences (harnesses, tools, file naming, daily routine) into user.md."*
