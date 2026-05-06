"""Vault scaffolding logic -- creates directories, writes config and template files."""

from __future__ import annotations

import json
import shutil
from datetime import date
from pathlib import Path
from string import Template

from . import config


def create_vault_dirs(vault: Path) -> list[Path]:
    """Create the full vault directory tree. Returns list of created dirs."""
    created = []
    for rel in config.VAULT_DIRS:
        d = vault / rel
        d.mkdir(parents=True, exist_ok=True)
        created.append(d)
    return created


def write_obsidian_config(vault: Path) -> None:
    """Write .obsidian JSON config files."""
    obsidian = vault / ".obsidian"
    obsidian.mkdir(parents=True, exist_ok=True)

    # appearance.json
    (obsidian / "appearance.json").write_text(
        json.dumps(config.APPEARANCE_CONFIG, indent=2) + "\n", encoding="utf-8"
    )

    # community-plugins.json
    (obsidian / "community-plugins.json").write_text(
        json.dumps(config.COMMUNITY_PLUGINS, indent=2) + "\n", encoding="utf-8"
    )


def write_css_snippet(vault: Path) -> None:
    """Copy the heading-font CSS snippet into the vault."""
    src = config.TEMPLATE_DIR / "heading-font.css"
    dest = vault / ".obsidian" / "snippets" / "heading-font.css"
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dest)


def render_template(template_name: str, **kwargs: str) -> str:
    """Read a template file and substitute $PLACEHOLDER values."""
    src = config.TEMPLATE_DIR / template_name
    raw = src.read_text(encoding="utf-8")
    return Template(raw).safe_substitute(**kwargs)


def write_routing_files(vault: Path, user_name: str, vault_name: str) -> None:
    """Generate all _index.md and CONTEXT.md routing files."""
    today = date.today().isoformat()
    subs = {
        "USER_NAME": user_name,
        "VAULT_NAME": vault_name,
        "TODAY": today,
        "VAULT_PATH": str(vault),
    }

    files = {
        "_index.md": "vault-_index.md",
        "daily/_index.md": "daily-_index.md",
        "skills/_index.md": "skills-_index.md",
        "wiki/_index.md": "wiki-_index.md",
        "raw/_index.md": "raw-_index.md",
        "_work/CONTEXT.md": "domain-context-work.md",
        "_personal/CONTEXT.md": "domain-context-personal.md",
    }

    for dest_rel, template_name in files.items():
        dest = vault / dest_rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        if not dest.exists():
            content = render_template(template_name, **subs)
            dest.write_text(content, encoding="utf-8")
            print(f"  Created {dest_rel}")
        else:
            print(f"  Skipped {dest_rel} (already exists)")


def write_me_skeleton(vault: Path, user_name: str) -> None:
    """Write a skeleton me.md that the user fills in after the interview."""
    dest = vault / "_ai-OS" / "me.md"
    if dest.exists():
        print("  Skipped _ai-OS/me.md (already exists)")
        return
    today = date.today().isoformat()
    content = render_template("me-skeleton.md", USER_NAME=user_name, TODAY=today)
    dest.write_text(content, encoding="utf-8")
    print("  Created _ai-OS/me.md (skeleton -- run the interview to fill it in)")


def write_daily_template(vault: Path) -> None:
    """Copy the daily note template into the vault templates/ folder."""
    src = config.TEMPLATE_DIR / "daily-note-template.md"
    dest = vault / "templates" / "daily-note-template.md"
    if not dest.exists():
        shutil.copy2(src, dest)
        print("  Created templates/daily-note-template.md")


def scaffold_vault(vault: Path, user_name: str, vault_name: str,
                   install_fonts: bool = True) -> None:
    """Run the full scaffold: dirs, config, templates, routing, identity."""
    print(f"\nScaffolding vault at: {vault}\n")

    if any(vault.iterdir()) if vault.exists() else False:
        print("WARNING: Vault directory is not empty. Existing files will NOT be overwritten.\n")

    print("Creating directories...")
    create_vault_dirs(vault)

    print("\nWriting Obsidian config...")
    write_obsidian_config(vault)
    write_css_snippet(vault)

    print("\nWriting routing files...")
    write_routing_files(vault, user_name, vault_name)

    print("\nWriting identity skeleton...")
    write_me_skeleton(vault, user_name)

    print("\nWriting daily note template...")
    write_daily_template(vault)

    if install_fonts:
        from .fonts import install_all_fonts
        install_all_fonts(config.FONT_URLS)

    print("\n--- Scaffold complete ---")
    print(f"\nNext steps:")
    print(f"  1. Open Obsidian and add {vault} as a vault")
    print(f"  2. Install the AnuPpuccin theme: Settings > Appearance > Themes > Browse")
    print(f"  3. Install community plugins: Settings > Community Plugins > Browse")
    print(f"     (the plugin list is pre-configured in community-plugins.json)")
    print(f"  4. Set Homepage plugin to open _index.md")
    print(f"  5. Run the identity interview to fill in _ai-OS/me.md")
    print(f"     (see docs/interview-guide.md or use the Claude skill)")
