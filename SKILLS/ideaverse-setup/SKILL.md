---
name: ideaverse-setup
description: "Set up a fresh Obsidian Ideaverse vault from scratch with ICM routing, LLM-ready structure, identity file, fonts, theme, plugins, skills, and daily note workflow. Walk the user through every step interactively."
user_invocable: true
argument-hint: "[vault-path] (absolute path where the vault should live)"
---

# Ideaverse Setup

Bootstrap a complete Obsidian Ideaverse vault: folder structure, routing files, identity dossier, theme + fonts, community plugins, CSS snippets, daily note workflow, and Claude skill wiring. This is a guided, interactive process -- not a one-shot dump.

**Prerequisites the user must have before starting:**
- Obsidian installed (https://obsidian.md)
- A code editor with Claude Code or Copilot Chat (for running this skill)
- Fonts will be installed automatically (internet required)

---

## Step 0: Gather Setup Info

Ask the user for:

1. **Vault path** -- Where to create the vault on disk. Use `$ARGUMENTS` if provided. Example: `C:\Users\name\Documents\MyIdeaverse\Vault`
2. **Domains** -- What domains they want to track. Default is two: `_work/` (professional) and `_personal/` (career, learning, growth). If they have different domains, adapt the folder names.
3. **Identity interview** -- Confirm they want to go through the me.md interview (recommended). If they decline, create a skeleton me.md with placeholder sections.

Store the vault path as `$VAULT` for all subsequent steps.

---

## Step 1: Create Folder Structure

Create the following directory tree under `$VAULT`:

```
$VAULT/
  .obsidian/
    snippets/
    themes/
    plugins/
  _ai-OS/
  _work/
    bugs/
    features/
    product/
    reference/
  _personal/
    career/
    learning/
    portfolio/
  wiki/
    ai/
    career/
    portfolio/
    tools/
  raw/
    web-clips/
    youtube/
    papers/
  daily/
  skills/
  methodology/
  prompt-library/
  templates/
  resources/
  visualization/
  Excalidraw/
```

Adapt domain folders if the user specified custom domains in Step 0. The `_work/` subdirectories above are the default for a software engineering role -- adjust to match the user's profession.

---

## Step 2: Create Routing Files

### 2a: Vault Root `_index.md`

Create `$VAULT/_index.md` as the master navigation file. This is how LLMs orient themselves in the vault. Structure:

```markdown
# [Vault Name]

Welcome to [user's name]'s personal knowledge base.

[One sentence describing what the vault captures.]

[Two domains]: `_work/` ([professional domain]) and `_personal/` ([growth domain]), plus shared layers at root (wiki, raw, skills, daily notes).

---

## Wiki -- Query Layer

LLM-compiled knowledge base.

- [[wiki/_index|Wiki Index]] -- Master index of all compiled knowledge
  - [[wiki/[section1]/_index|Section 1]] -- [description]
  - [[wiki/[section2]/_index|Section 2]] -- [description]
  ...

---

## Work Domain (_work/)

[Professional] notes. Load `_work/CONTEXT.md` to orient an LLM to this domain.

- [[_work/[subfolder1]/|Label]] -- [description]
- [[_work/[subfolder2]/|Label]] -- [description]
...

---

## Personal Domain (_personal/)

Career growth, portfolio work, and personal learning.

- [[_personal/career/|Career & Growth]]
- [[_personal/learning/|Learning]]
- [[_personal/portfolio/|Portfolio]]

---

## Shared Layers (root)

### Ingestion
- [[raw/_index|Raw Ingestion Queue]] -- Web clips, papers, YouTube transcripts

### Daily Notes
- [[daily/|Daily Notes]] -- Session notes organized by date folder (daily/YYYY-MM-DD/)

### Skills
- [[skills/_index|Skills Catalog]] -- Vault backups of Claude skill definitions

### Methodology
- [[methodology/|Methodology]] -- Workflow patterns and process docs
```

### 2b: Domain CONTEXT.md Files

Create `$VAULT/_work/CONTEXT.md` and `$VAULT/_personal/CONTEXT.md` with:
- What this domain covers
- Folder layout within the domain
- Key conventions (file naming, tagging, etc.)
- Routing table (what to load, what to skip)

### 2c: Section `_index.md` Files

Create `_index.md` in each of: `wiki/`, `raw/`, `daily/`, `skills/`.

**`daily/_index.md`** should document:
- The date-folder structure (`daily/YYYY-MM-DD/`)
- Naming conventions (`YYYY-MM-DD-work.md`, `YYYY-MM-DD-personal.md`)
- What daily notes contain (tasks, session logs, links, reflections)
- Navigation guidance (most recent first, only read last 3-7)

**`wiki/_index.md`** should list all wiki sections with descriptions.

**`raw/_index.md`** should describe the ingestion queue and subfolders.

**`skills/_index.md`** should be a table with columns: Skill, Trigger, Description. Start empty -- it gets populated as skills are created.

---

## Step 3: Install Theme and Fonts

### 3a: AnuPpuccin Theme

Create `$VAULT/.obsidian/appearance.json`:

```json
{
  "cssTheme": "AnuPpuccin",
  "theme": "moonstone",
  "textFontFamily": "Comfortaa",
  "interfaceFontFamily": "iA Writer Quattro S",
  "enabledCssSnippets": [
    "heading-font"
  ]
}
```

Tell the user:
> Open Obsidian, go to Settings > Appearance > Themes > Browse, and install **AnuPpuccin**. Select the **Moonstone** (light) base color scheme. The appearance.json file has been pre-configured.

### 3b: Install Fonts

Download and install three font families to the system:

**1. Comfortaa (body text)**
Download TTF files from Google Fonts GitHub:
```
https://raw.githubusercontent.com/google/fonts/main/ofl/comfortaa/static/Comfortaa-Regular.ttf
https://raw.githubusercontent.com/google/fonts/main/ofl/comfortaa/static/Comfortaa-Bold.ttf
https://raw.githubusercontent.com/google/fonts/main/ofl/comfortaa/static/Comfortaa-Light.ttf
```

**2. iA Writer Quattro S (interface/UI text)**
Download from the iA Fonts repo:
```
https://github.com/iaolo/iA-Fonts/archive/refs/heads/master.zip
```
Extract and install the `iA Writer Quattro S` TTF files.

**3. DM Serif Display (headings)**
Download TTF from Google Fonts GitHub:
```
https://raw.githubusercontent.com/google/fonts/main/ofl/dmserifdisplay/DMSerifDisplay-Regular.ttf
```

Install all fonts to the system fonts directory:
- **Windows:** Copy TTFs to `C:\Windows\Fonts\` or use `$shell = New-Object -ComObject Shell.Application; $shell.Namespace(0x14).CopyHere($fontPath)` for each file
- **macOS:** Copy TTFs to `~/Library/Fonts/`
- **Linux:** Copy TTFs to `~/.local/share/fonts/` and run `fc-cache -fv`

### 3c: Heading Font CSS Snippet

Create `$VAULT/.obsidian/snippets/heading-font.css`:

```css
/* DM Serif Display headings - override theme */

/* Reading view */
.markdown-rendered h1,
.markdown-rendered h2,
.markdown-rendered h3,
.markdown-rendered h4,
.markdown-rendered h5,
.markdown-rendered h6 {
  font-family: "DM Serif Display", serif !important;
}

/* Editing view (live preview) */
.cm-header-1,
.cm-header-2,
.cm-header-3,
.cm-header-4,
.cm-header-5,
.cm-header-6 {
  font-family: "DM Serif Display", serif !important;
}

/* Inline title (note name at top) */
.inline-title {
  font-family: "DM Serif Display", serif !important;
}
```

Tell the user:
> After installing fonts, restart Obsidian. Go to Settings > Appearance > CSS Snippets and enable **heading-font**. You may need to click the refresh button to see it.

---

## Step 4: Install Community Plugins

Create `$VAULT/.obsidian/community-plugins.json`:

```json
[
  "dataview",
  "calendar",
  "heatmap-calendar",
  "homepage",
  "iconic",
  "obsidian-meta-bind-plugin",
  "obsidian-style-settings",
  "obsidian-git",
  "quickadd",
  "obsidian-excalidraw-plugin",
  "pexels-banner"
]
```

Tell the user:
> Open Obsidian, go to Settings > Community Plugins > Turn on community plugins. Then browse and install each of these plugins. The pre-configured list enables them automatically once installed.

Explain what each plugin does:

| Plugin | Purpose |
|--------|---------|
| **Dataview** | Query and display vault data (used for heatmap calendar on homepage) |
| **Calendar** | Sidebar calendar widget for navigating daily notes |
| **Heatmap Calendar** | GitHub-style contribution heatmap on the homepage |
| **Homepage** | Set a note as the vault landing page (use `_index.md`) |
| **Iconic** | Custom icons for folders and files in the file explorer |
| **Meta Bind** | Interactive YAML frontmatter inputs and buttons |
| **Style Settings** | Granular control over AnuPpuccin theme options |
| **Obsidian Git** | Auto-backup vault to a Git repository |
| **QuickAdd** | Macro commands for rapid note creation |
| **Excalidraw** | Whiteboard diagrams inside Obsidian |
| **Pexels Banner** | Header banner images on notes from Pexels |

### Configure Homepage Plugin

Tell the user to set **Homepage** to open `_index.md` on vault launch:
> Settings > Homepage > Set homepage to `_index.md`. Mode: "Replace all open notes".

---

## Step 5: Create Identity File (me.md)

This is the most important file in the vault. It tells every LLM tool who the user is, how they think, and how to interact with them.

### 5a: Run the Interview

Conduct a structured interview across **3 rounds**. Use the ask-questions tool for each round.

**Round 1 -- Who You Are:**
1. **Summary Statement** -- "In 2-3 sentences, describe what drives you. What are you building toward?"
2. **First Principles** -- "What are the 3-5 beliefs you don't compromise on? These are the load-bearing walls of your worldview."
3. **Values** -- "List your top 5-6 values in priority order. When two conflict, the higher one wins."

**Round 2 -- How You Think:**
4. **Thinking Style** -- "How do you naturally approach problems? (pattern matcher, first-principles thinker, builder, researcher, etc.)"
5. **Intellectual Influences** -- "Who has shaped how you think? Could be authors, creators, coworkers. Identify what each one taught you."
6. **Spark List** -- "What are the topics and project ideas buzzing in your head right now? These are the things you would build if time were unlimited."

**Round 3 -- Work Preferences:**
7. **Inner Spaces** -- "Describe your productive environments. Do you have a 'workshop' mode? An 'office' mode? When/where does your best work happen?"
8. **Vibe** -- "How should an AI assistant talk to you? What communication patterns annoy you? What do you want more of?"

### 5b: Compile me.md

Create `$VAULT/_ai-OS/me.md` with this structure:

```markdown
---
up:
related:
  - "[[_index]]"
created: [today's date]
collections:
---
This is your briefing on who I am, how I think, and how to interact with me.

**Navigation:**
- me.md - You are here. Identity, philosophy, and working preferences.
- [[_index]] - Vault routing. How to navigate and work in my Ideaverse.
- See `skills/` or `~/.claude/skills/` for all defined skills you can use on my behalf.

# Me
---
## The Summary Statement
[From interview Round 1, Q1]

---
## First Principles
[From interview Round 1, Q2. Each principle as a bold label + explanation.]

---
## Values
[From interview Round 1, Q3. Numbered list with bold labels.]

---
## Identity
[Brief factual paragraph: job, tools, methodology, career status. Written in third person.]

---
# How I Think

## Thinking Style
[From interview Round 2, Q4. Bullet points.]

## How I Solve Problems
[Synthesize from interview answers into a numbered process.]

## Intellectual Influences
[From interview Round 2, Q5. Each influence with what they taught.]

## Inner Spaces
[From interview Round 3, Q7. Metaphorical modes with descriptions.]

---
# How to Work With Me

## Preferences
[Bullet list of communication and interaction preferences.]

## Vibe
[From interview Round 3, Q8. Direct rules about tone and style.]

## Rules
[Organize into categories: Communication, Process, Security, and any domain-specific conventions.]

## Skills
Read the skill-map before processing any involved request.

---
## Tool Pointers

To reference this identity from other tool configurations:

- **Claude Code (CLAUDE.md):** `Read [vault-path]/_ai-OS/me.md for identity context`
- **Cursor (.cursorrules):** `Identity and preferences: see [vault-path]/_ai-OS/me.md`
- **Copilot (copilot-instructions.md):** `User identity: [vault-path]/_ai-OS/me.md`

---
*Last refreshed: [today's date]. Review monthly by re-running the dossier interview.*
```

**Quality bar:** Do not use generic placeholder language. Every section must reflect the user's actual words from the interview. Paraphrase for structure, but preserve their voice. If an answer was thin, ask a follow-up before writing.

---

## Step 6: Wire LLM Routing

### 6a: CLAUDE.md (if using Claude Code)

If the user's workspace has a `CLAUDE.md`, add a pointer to the vault:

```markdown
## MyIdeaverse
- Identity: `[vault-path]/_ai-OS/me.md`
- Vault routing: `[vault-path]/_index.md`
```

### 6b: CONTEXT.md for MyIdeaverse Workspace

Create a workspace-level CONTEXT.md alongside the vault:

```markdown
# MyIdeaverse Workspace

## What This Workspace Is
[User's name]'s personal knowledge base powered by Obsidian.

## Folder Structure
[Tree diagram of the vault]

## Routing Table
| Task | Load These | Skip These |
|------|-----------|------------|
| Navigate the vault | `Vault/_index.md` | ... |
| Work on [domain 1] | `Vault/_work/CONTEXT.md` | ... |
| Work on [domain 2] | `Vault/_personal/CONTEXT.md` | ... |
| Query wiki | `Vault/wiki/_index.md` | ... |
| Write daily notes | `Vault/daily/` | ... |

## Key Conventions
- The Vault uses `_index.md` files for routing.
- Daily notes follow `YYYY-MM-DD-work.md` / `YYYY-MM-DD-personal.md` naming in date folders.
- Wiki articles are LLM-compiled from raw sources.
```

---

## Step 7: Set Up Daily Note Workflow

### 7a: Create Daily Note Template

Create `$VAULT/templates/daily-note-template.md`:

```markdown
---
up: "[[daily/_index]]"
created: {{date:YYYY-MM-DD}}
type: daily
domain:
---

# {{date:YYYY-MM-DD}} Session

## Focus
-

## Tasks
- [ ]

## Notes


## End of Session
-
```

### 7b: Explain the Date-Folder Pattern

Tell the user:
> Daily notes live in date folders: `daily/2026-04-14/2026-04-14-work.md`. This keeps the daily/ directory clean as notes accumulate. The naming convention encodes both date and domain (work vs personal) in the filename.

### 7c: Inform About Daily Note Skills

Tell the user that if they are using Claude Code, they can install skills that auto-generate daily plans:
- `/work-daily-note` -- Scans the work domain for open tasks and generates a prioritized plan
- `/personal-daily-note` -- Same for the personal domain
- `/sync-daily` -- Safety net that moves stray daily notes into their date folders

These skills are separate from this setup skill and should be installed after the vault is working.

---

## Step 8: Verification Checklist

Walk through this checklist with the user:

- [ ] Obsidian opens and shows the vault
- [ ] `_index.md` is set as the homepage
- [ ] AnuPpuccin theme is active with Moonstone base
- [ ] Comfortaa renders as body text
- [ ] iA Writer Quattro S renders as interface text
- [ ] DM Serif Display renders in headings (both reading and editing view)
- [ ] All community plugins are installed and enabled
- [ ] `me.md` exists in `_ai-OS/` and reflects the user's identity
- [ ] Folder structure matches the plan
- [ ] At least one daily note can be created in the date-folder pattern

---

## Step 9: Wrap Up

Summarize what was created:

1. **Vault structure** -- [N] folders with ICM routing via `_index.md` files
2. **Theme + fonts** -- AnuPpuccin (Moonstone) + Comfortaa / iA Writer Quattro S / DM Serif Display
3. **Plugins** -- [N] community plugins configured
4. **Identity** -- `me.md` canonical identity file with [N] sections
5. **Routing** -- `_index.md`, domain CONTEXT.md files, and LLM pointers

Tell the user what to do next:
- Start capturing notes in `raw/web-clips/` or `raw/youtube/`
- Use `/wiki-compile` to turn raw notes into wiki articles
- Run `/briefing` to get situational awareness across domains
- Review `me.md` monthly and update if values or priorities shift

---

## Notes for the Skill Runner

- This is an interactive skill. Do not run all steps silently. Pause after Steps 0, 5a (each interview round), and 8 for user input.
- Font installation requires system-level access. If the user cannot install fonts (e.g., restricted machine), skip Step 3b and tell them to install manually.
- The `_work/` subdirectory structure is opinionated toward software engineering. Adapt for other professions (e.g., `_work/clients/`, `_work/projects/`, `_work/research/`).
- The wiki sections (ai, career, portfolio, tools) are a starting point. The user can add domain-specific sections later.
- If the vault path already exists and contains files, warn the user before creating anything. Never overwrite existing files.
