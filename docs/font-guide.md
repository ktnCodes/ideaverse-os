# Font Stack Guide

The Ideaverse uses three font families, each serving a distinct purpose.

## The Stack

| Font | Role | Where It Appears |
|------|------|------------------|
| **Comfortaa** | Body text | Note content, paragraphs, lists |
| **iA Writer Quattro S** | Interface | Sidebar, tabs, menus, file explorer |
| **DM Serif Display** | Headings | H1-H6 in all views, inline note titles |

## Why These Fonts?

**Comfortaa** is a rounded geometric sans-serif. Clean and readable for extended writing. Pairs well with a serif heading font for visual hierarchy.

**iA Writer Quattro S** is a proportional monospace hybrid designed specifically for writing interfaces. It keeps the sidebar and tabs compact while remaining highly readable at small sizes. Designed by Information Architects (iA).

**DM Serif Display** is a high-contrast serif display font. Used only for headings to create clear visual separation between heading levels and body text. The `!important` overrides ensure it works even when the AnuPpuccin theme sets its own heading styles.

## How Fonts Are Configured

1. **Body + Interface** -- Set in `.obsidian/appearance.json` via `textFontFamily` and `interfaceFontFamily`
2. **Headings** -- Set via the CSS snippet `.obsidian/snippets/heading-font.css` using `!important` overrides

The CSS snippet targets three contexts:
- `.markdown-rendered h1-h6` -- reading view
- `.cm-header-1` through `.cm-header-6` -- live preview / editing view
- `.inline-title` -- the note name displayed at the top of each note

## Alternatives

If you prefer different fonts, update these two locations:

| To change | Edit |
|-----------|------|
| Body text | `.obsidian/appearance.json` > `textFontFamily` |
| Interface | `.obsidian/appearance.json` > `interfaceFontFamily` |
| Headings | `.obsidian/snippets/heading-font.css` > all `font-family` rules |

Popular alternatives:
- **Body:** Inter, Source Sans Pro, Nunito, Lato
- **Interface:** JetBrains Mono, Fira Code, iA Writer Mono S
- **Headings:** Merriweather, Lora, Playfair Display, Libre Baskerville

## Troubleshooting

**Fonts not showing after install:**
1. Restart Obsidian completely (not just reload)
2. Check Settings > Appearance to verify font names match exactly
3. For headings, ensure the `heading-font` snippet is toggled ON in Settings > Appearance > CSS Snippets

**AnuPpuccin overriding heading font:**
The CSS snippet uses `!important` on all selectors to override theme styles. If headings still don't render, open Developer Tools (Ctrl+Shift+I) and inspect the heading element to see which CSS rule is winning.
