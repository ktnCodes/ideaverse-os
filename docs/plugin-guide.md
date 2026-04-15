# Community Plugins Guide

These are the recommended Obsidian community plugins installed by ideaverse-setup. All are optional but each serves a specific purpose in the vault workflow.

## Required for Full Experience

| Plugin | Purpose | Why It Matters |
|--------|---------|----------------|
| **Dataview** | Query vault data using inline code | Powers the heatmap calendar on the homepage. Also useful for creating dynamic lists of recent notes, open tasks, etc. |
| **Homepage** | Set a note as the vault landing page | Opens `_index.md` every time you launch Obsidian. This is your routing file. |
| **Calendar** | Sidebar calendar widget | Navigate daily notes by clicking dates. Visual overview of which days have notes. |

## Recommended

| Plugin | Purpose | Why It Matters |
|--------|---------|----------------|
| **Heatmap Calendar** | GitHub-style contribution heatmap | Visualize your note-taking activity over time. Pairs with Dataview on the homepage. |
| **Style Settings** | Granular theme customization | Unlock AnuPpuccin's full configuration panel (accent colors, layout tweaks, typography). |
| **Obsidian Git** | Auto-backup vault to Git | Version control for your vault. Set up a private GitHub repo and sync automatically. |
| **QuickAdd** | Macro commands for note creation | Create custom shortcuts for common actions (new daily note, new web clip, etc.). |
| **Excalidraw** | Whiteboard diagrams | Draw architecture diagrams, flowcharts, and visual thinking boards inside Obsidian. |
| **Iconic** | Custom folder/file icons | Visual organization in the file explorer. Makes domain folders instantly recognizable. |

## Optional

| Plugin | Purpose | Why It Matters |
|--------|---------|----------------|
| **Meta Bind** | Interactive YAML inputs | Add buttons, toggles, and input fields to notes. Useful for templates and dashboards. |
| **Pexels Banner** | Header images on notes | Add visual banner images to notes from the Pexels free photo library. Aesthetic, not functional. |

## Configuration Tips

### Homepage
- Settings > Homepage > Set to `_index.md`
- Mode: "Replace all open notes"

### Obsidian Git
- Create a private GitHub repo for your vault
- Settings > Obsidian Git > Auto-backup interval: 10 minutes
- Exclude `.obsidian/workspace.json` from git (changes constantly)

### Calendar
- Settings > Calendar > Start week on: Monday (or your preference)
- Daily note format should match: `YYYY-MM-DD`
