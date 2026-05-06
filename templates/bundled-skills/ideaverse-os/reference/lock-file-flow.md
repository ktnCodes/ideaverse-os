# Lock-file flow

The safety pattern that every phase MUST follow. Borrowed from Kevin's `/pipeline-template` `/scope` -> `/build` separation: never compile straight into the destination file. Always go through a lock.

## Why

1. **User can review.** A lock file is `git diff`-able before it materializes.
2. **User can abort cheaply.** Reject -> just don't promote the lock. No file mutation needed.
3. **Resumable.** Mid-flight session pause + restart still has the lock available.
4. **Defends against LLM hallucination.** If the compiled content has problems, the user catches them before `compass.md` (or any auto_inject file) is corrupted.

## Pattern

```
00-agentic-OS/<file>.md            <-- the destination (auto_inject: true; reads on every prompt)
00-agentic-OS/<file>.md.lock.md    <-- the proposal (lock file)
```

## Steps for any phase

1. **Gather** answers via dynamic Q&A.
2. **Compile** the answers into the destination format (frontmatter + sections).
3. **Write the lock file** at `<file>.md.lock.md`. Lock file content = proposed final content.
4. **Summarize** in 3-5 lines what changed.
5. **Ask** for confirmation: `[y]es / [n]o / [d]iff`.
6. **On yes:**
   - Copy lock content to `<file>.md`.
   - Delete the lock file.
   - Confirm: "Wrote to `00-agentic-OS/<file>.md`. Lock file removed."
7. **On no:**
   - Ask what to revise.
   - Re-gather (only the affected section, not all of them).
   - Re-write the lock file.
   - Re-prompt.
8. **On diff:**
   - Print the full lock file content.
   - Re-prompt for y/n.

## Concurrent-edit handling

If `<file>.md` has been modified since the lock was written (e.g., user edited it manually mid-flight), warn:

> "Note: `00-agentic-OS/<file>.md` was modified after I wrote the lock. Show the diff and confirm you want to overwrite the user's edits? [y]es / [n]o / [m]erge"

Default: pick `m`erge -- combine user edits with proposed compilation, write a NEW lock file, re-prompt.

## File hygiene

- Lock files are NEVER auto-injected (no `auto_inject: true` in their frontmatter).
- Lock files SHOULD be gitignored at the vault level if the user wants clean commits. The default `.gitignore` does NOT exclude them (intentional -- they're part of the audit trail).
- Lock files are deleted on successful promotion. If the user aborts, the lock stays for next-time resume.

## Cross-phase note

The first time a user runs build, all 6 lean files have `[TODO]` markers. Each phase fills its own files. After all 5 phases run, no TODOs remain.

If the user re-runs a phase later (e.g., monthly compass refresh), the lock-file flow applies to the **diff** between current compiled content and re-compiled content -- not to a from-scratch generation.
