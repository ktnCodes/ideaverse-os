# Ideaverse Setup — Identity

## Purpose

A toolkit for bootstrapping an LLM-ready Obsidian vault with structured routing, identity dossier, curated theme/fonts, and daily note workflow. Ships as both a Claude Code skill (AI-assisted) and a standalone Python CLI (manual).

---

## Folder Map

```
ideaverse-setup/
├── SKILLS/
│   └── ideaverse-setup/
│       └── SKILL.md              # Claude Code skill — full interactive setup
├── cli/
│   ├── __init__.py
│   ├── __main__.py               # Entry point: python -m cli
│   ├── scaffold.py               # Folder + file creation logic
│   ├── fonts.py                  # Font download and install
│   └── config.py                 # Default values and paths
├── templates/
│   ├── _index.md                 # Vault root routing file
│   ├── daily-_index.md           # Daily notes index
│   ├── skills-_index.md          # Skills catalog index
│   ├── wiki-_index.md            # Wiki section index
│   ├── raw-_index.md             # Raw ingestion index
│   ├── domain-context.md         # Domain CONTEXT.md template
│   ├── workspace-context.md      # Workspace CONTEXT.md template
│   ├── me-skeleton.md            # me.md skeleton (pre-interview)
│   ├── me-template.md            # me.md full template (post-interview)
│   ├── daily-note-template.md    # Daily session note template
│   └── heading-font.css          # DM Serif Display heading snippet
├── docs/
│   ├── interview-guide.md        # Self-administered identity interview
│   ├── plugin-guide.md           # What each plugin does and how to configure
│   └── font-guide.md             # Font stack explanation and alternatives
├── CLAUDE.md                     # You are here
├── CONTEXT.md                    # Task routing
├── LICENSE                       # MIT
├── README.md                     # Project overview
├── pyproject.toml                # Python project config
└── .gitignore
```

---

## Rules

- The CLI and SKILL.md are the primary products. Templates and docs support them.
- Templates use `{{PLACEHOLDER}}` syntax for values the CLI or skill fills in.
- The CLI must work without Claude Code — it's the manual path for anyone.
- The skill is the AI-assisted path — it runs the interview and compiles me.md live.
- Do not hardcode Kevin's personal details anywhere. This is a generic tool.
- Font installation is optional. The vault must work without custom fonts.
