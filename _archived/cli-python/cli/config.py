"""Default configuration values for Ideaverse Setup."""

from pathlib import Path

# -- Folder Structure ----------------------------------------------------------

VAULT_DIRS = [
    ".obsidian/snippets",
    ".obsidian/themes",
    ".obsidian/plugins",
    "_ai-OS",
    "_work/bugs",
    "_work/features",
    "_work/product",
    "_work/reference",
    "_personal/career",
    "_personal/learning",
    "_personal/portfolio",
    "wiki/ai",
    "wiki/career",
    "wiki/portfolio",
    "wiki/tools",
    "raw/web-clips",
    "raw/youtube",
    "raw/papers",
    "daily",
    "skills",
    "methodology",
    "prompt-library",
    "templates",
    "resources",
    "visualization",
    "Excalidraw",
]

# -- Theme & Appearance --------------------------------------------------------

APPEARANCE_CONFIG = {
    "cssTheme": "AnuPpuccin",
    "theme": "moonstone",
    "textFontFamily": "Comfortaa",
    "interfaceFontFamily": "iA Writer Quattro S",
    "enabledCssSnippets": ["heading-font"],
}

# -- Community Plugins ---------------------------------------------------------

COMMUNITY_PLUGINS = [
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
    "pexels-banner",
]

# -- Font URLs -----------------------------------------------------------------

FONT_URLS = {
    "Comfortaa": [
        "https://raw.githubusercontent.com/google/fonts/main/ofl/comfortaa/static/Comfortaa-Light.ttf",
        "https://raw.githubusercontent.com/google/fonts/main/ofl/comfortaa/static/Comfortaa-Regular.ttf",
        "https://raw.githubusercontent.com/google/fonts/main/ofl/comfortaa/static/Comfortaa-Bold.ttf",
    ],
    "DM Serif Display": [
        "https://raw.githubusercontent.com/google/fonts/main/ofl/dmserifdisplay/DMSerifDisplay-Regular.ttf",
    ],
    "iA Writer Quattro S": [
        "https://github.com/iaolo/iA-Fonts/archive/refs/heads/master.zip",
    ],
}

# -- Template directory (relative to package root) -----------------------------

TEMPLATE_DIR = Path(__file__).resolve().parent.parent / "templates"
