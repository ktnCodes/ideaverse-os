---
name: ideaverse-os
description: Your knowledge base, written by conversation.
colors:
  cream: "oklch(0.95 0.01 80)"
  cream-pale: "oklch(0.97 0.01 80)"
  cream-deep: "oklch(0.92 0.012 80)"
  ink: "oklch(0.30 0.02 280)"
  ink-soft: "oklch(0.45 0.02 280)"
  wine: "oklch(0.45 0.13 18)"
  wine-deep: "oklch(0.38 0.14 18)"
  teal: "oklch(0.55 0.05 195)"
  rose: "oklch(0.78 0.06 15)"
  amber: "oklch(0.78 0.10 75)"
  blue: "oklch(0.62 0.05 240)"
  lavender: "oklch(0.65 0.08 290)"
typography:
  display:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "clamp(2.75rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.12em"
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
rounded:
  none: "0px"
  sm: "2px"
  md: "4px"
spacing:
  step-1: "4px"
  step-2: "8px"
  step-3: "12px"
  step-4: "16px"
  step-6: "24px"
  step-8: "32px"
  step-12: "48px"
  step-16: "64px"
  step-24: "96px"
components:
  button-primary:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.cream-pale}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.wine-deep}"
    textColor: "{colors.cream-pale}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
  button-secondary:
    backgroundColor: "{colors.cream-pale}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
  chip-rose:
    backgroundColor: "{colors.rose}"
    textColor: "{colors.wine}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  card-paper:
    backgroundColor: "{colors.cream-pale}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "24px 28px"
  input-paper:
    backgroundColor: "{colors.cream-pale}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
---

# Design System: ideaverse-os

## 1. Overview

**Creative North Star: "The Position-Addressed Zine"**

ideaverse-os is a tech zine made of position-addressed cells. Each section
of the page lives at its own numbered slot, hierarchically nested, cross-
linked, harness-agnostic — exactly like the vault the product builds. The
information architecture mirrors the product architecture; the design IS
the methodology demonstrated. Visitors are not consuming a SaaS landing,
they are reading a self-aware zine that announces its own structure.

The atmosphere is **warm-paper editorial with technical receipts.** Cream
backgrounds carry the page; wine serif headlines anchor identity; ink
body text reads long; muted accent hues thread through diagrams,
chips, and pull quotes the way a careful researcher annotates a printed
document. The system is opinionated and slightly contrarian by design —
the comparison table that names every competitor methodology IS the brand
argument. Every claim cites its source.

This system explicitly rejects: dark-navy-and-cyan SaaS landings, gradient
hero metric grids, glassmorphism cards, animated chatbot mockups, neon-on-
black AI-product aesthetics, terminal-screenshot README-as-website pages,
and beige-sticky-note Notion/Obsidian template galleries. If a section
could appear in any other dev tool's marketing site without changes, it
has failed.

**Important scoping note.** The parent app (`ktncodes-v2`) ships a
different design system: dark theme, cyan accent, Geist + Space Grotesk,
defined in `src/app/globals.css` via CSS custom properties on `:root`.
The ideaverse-os tokens MUST be scoped to the `/ideaverse-os` route and
its descendants — not leaked to `:root`. The current `page.tsx`
fights the parent theme via inline `style={{ ... }}` overrides, which is
the proximate cause of the "looks terrible" report. The redesign moves
these tokens to a route-scoped CSS layer.

**Key Characteristics:**
- Cream-paper foundation with cream-on-cream tonal layering (no shadows).
- Wine serif as identity anchor; ink as the workhorse text color.
- Multi-hue accent palette (rose, amber, blue, lavender) used semantically,
  not decoratively.
- Editorial typography: Lora 700 display, Inter body, Geist Mono code.
- Sharp corners (0-4px max). Hairline 1px borders or no borders at all.
- Position-addressed information architecture. Every section is a numbered
  cell.
- Motion is teaching, not decoration. Reduced-motion gracefully reveals
  static composition.

## 2. Colors: The Editorial Marginalia Palette

The palette reads like a researcher's annotation set on warm paper. One
saturated identity color (wine) carries 30-60% of the surface in brand
register; in product (docs) register the palette compresses to cream + ink
+ one accent at a time.

### Primary
- **Editorial Wine** (`oklch(0.45 0.13 18)`, ~`#9B3F4D`): The identity
  color. Carries every H1, the brand argument, the hero CTA fill, and the
  active-state cues across the system. In brand register, wine claims
  30-60% of viewport surface; in product register, never more than 10%.
- **Editorial Wine Deep** (`oklch(0.38 0.14 18)`, ~`#7F3540`): Hover and
  active states. Pressed-button feel.

### Secondary
- **Quiet Teal** (`oklch(0.55 0.05 195)`, ~`#588889`): H2 and section
  sub-heads. Also taglines, footer meta, eyebrow labels above sections.
  The page's second voice — calmer than wine, never used for emphasis.

### Tertiary
- **Marginalia Rose** (`oklch(0.78 0.06 15)`, ~`#E5B5BC`): Rose-tinted
  chips and "agentic-OS" feel cards. Used sparingly to mark live status
  (v0.0.1 dot, "tracer slice live" badges, route status flags).
- **Highlighter Amber** (`oklch(0.78 0.10 75)`, ~`#E0AE5C`): Energy
  accents — the `$` prompt in the typing terminal, "work" section
  markers, scroll progress indicator. Used like a literal highlighter
  pass on a page.
- **Schematic Blue** (`oklch(0.62 0.05 240)`, ~`#7B95A8`): Cool sections
  that demonstrate the harness-layer / skills architecture. Diagrams,
  data-flow arrows, "skill" tags.
- **Wikilink Lavender** (`oklch(0.65 0.08 290)`, ~`#9B85B8`): Inline
  cross-references to other sections (the page's own wikilinks). Hover
  state on internal anchors.

### Neutral
- **Old-Paper Cream** (`oklch(0.95 0.01 80)`, ~`#F4ECDC`): Default page
  background. The base canvas.
- **Cream Pale** (`oklch(0.97 0.01 80)`): One step lighter — used for
  card surfaces and elevated content blocks via tonal layering.
- **Cream Deep** (`oklch(0.92 0.012 80)`): One step darker — used for
  sectional shifts, pull-quote blocks, comparison-table alternating rows.
- **Notebook Ink** (`oklch(0.30 0.02 280)`, ~`#3C3D52`): Default body
  text. Tinted toward purple-grey, never pure black.
- **Ink Soft** (`oklch(0.45 0.02 280)`): Secondary copy — meta,
  footnotes, captions.

### Named Rules

**The One-Voice Rule.** In product register (concept docs pages), at most
one accent color appears at any given time, occupying ≤10% of viewport
surface. Wine is the default. Mixing accents on a single docs page is
forbidden — choose one.

**The Pure-Black Ban.** `#000` is never used. All neutrals tint toward
purple-grey via the ink hue. `#fff` is never used either — every cream is
warmed.

**The OKLCH-Only Rule.** All tokens are authored in OKLCH. Hex values
appear only in commentary as approximations. Lightness and chroma are
deliberately reduced near 0/100 to avoid garish color at extremes.

## 3. Typography

**Display Font:** Lora (with Georgia, serif fallback)
**Body Font:** Inter (with system-ui, sans-serif fallback)
**Mono Font:** Geist Mono (with ui-monospace, monospace fallback)

**Character:** Lora carries the editorial-essay identity — slightly bookish,
warm, confident at large weight. Inter is the calm workhorse, never showing
off, designed to be read. Geist Mono is the technical voice — install
commands, code blocks, inline code, terminal output. The pairing reads
like a designed essay typeset by someone who cares about reading.

### Hierarchy
- **Display** (Lora 700, `clamp(2.75rem, 6vw, 4.5rem)`, line-height 1.05):
  Hero `<h1>` only. Wine color. Tight tracking.
- **Headline** (Lora 700, `clamp(1.75rem, 3.5vw, 2.5rem)`, line-height 1.1):
  Section `<h2>` openers. Wine color.
- **Title** (Inter 600, 1.125rem, line-height 1.3): Sub-section `<h3>` and
  `<dt>` definition terms. Teal color.
- **Body** (Inter 400, 1.0625rem, line-height 1.6): Default paragraph
  text. Ink color. Cap line length at 65-75ch via `max-width: 38rem` on
  text containers.
- **Label** (Inter 600, 0.75rem, line-height 1.2, letter-spacing 0.12em,
  uppercase): Eyebrow labels above sections, chip text, install-block
  caption ("Install"), button text. Teal or wine depending on context.
- **Mono** (Geist Mono 400, 0.9375rem, line-height 1.5): Install command,
  code blocks, inline `<code>`, file paths in prose. Ink in body, cream
  on dark terminal.

### Named Rules

**The Reader's Length Rule.** Body paragraphs cap at 65-75ch (38rem).
Sidebars and pull-quotes may run shorter. No paragraph runs the full
viewport width.

**The Hierarchy Contrast Rule.** Each step in the type scale must contrast
≥1.25x in size or ≥200 weight units from its parent. Flat scales are
prohibited — readers must feel hierarchy without reading the labels.

**The Mono-for-Code Rule.** Geist Mono is reserved for code, file paths,
shell commands, and JSON keys. It is not used for branding flourishes,
eyebrow labels, or tagline poetry — that's Inter Label's job.

## 4. Elevation

The system is **flat with tonal layering, no shadows.** Depth comes from
three cream values (`cream`, `cream-pale`, `cream-deep`), 1px hairline
borders in tinted ink or wine, and typography weight contrast. The
editorial-zine sensibility forbids glassy lift; the page should feel like
designed paper, not floating chrome.

### Shadow Vocabulary

None. The system has no `box-shadow` tokens.

### Named Rules

**The Flat-Paper Rule.** Surfaces are flat. Depth is communicated through
cream-on-cream tonal shifts (cream-pale lifts, cream-deep recedes) and
1px hairline borders, never through shadow. The only exception is the
focus ring, which uses an outline.

**The Hairline Rule.** Borders are 1px. Wider colored stripes — especially
side-stripe accent borders — are forbidden. If a divider needs more
weight, increase its color saturation, not its thickness.

## 5. Components

### Buttons
- **Shape:** Sharp by default (0px), or 2px max for primary CTAs. Editorial
  print, not glassy chrome.
- **Primary:** Wine background, cream-pale text, label typography (uppercase
  Inter 600, 0.12em letter-spacing). Padding 12px 20px. 1px wine border
  (matches fill — looks like a stamped block).
- **Hover / Focus:** Wine-deep background. `:focus-visible` adds a 2px
  amber outline offset 2px, never a glow.
- **Secondary:** Cream-pale background, ink text, 1px ink-soft border.
  Used for "Read the spec" / "GitHub" / "npm" links.
- **Ghost:** No background, ink text with 1px wine underline on hover.
  Inline-flow link buttons.

### Chips (status, tags)
- **Style:** Rose background (15% alpha) + wine text + 1px wine border at
  30% alpha. Sharp corners (2px radius). Label typography. Padding 4px 10px.
  Optional 1.5px round dot on the leading edge for live-status (v0.0.1).
- **Variants:** rose (default / status), amber (energy / new), blue
  (skill / capability), lavender (link / cross-reference). Color
  determines semantic meaning.

### Cards / Containers
- **Corner Style:** Sharp (0px radius) for editorial sections; 2px max for
  elevated content blocks.
- **Background:** Cream-pale for raised content blocks; cream-deep for
  recessed sections (alternating rows in the comparison table).
- **Border:** 1px wine at 15% alpha for primary content blocks; 1px ink
  at 10% for subdued ones.
- **Internal Padding:** 24px 28px (step-6 step-7) for standard cards;
  32px 40px for hero cards.
- **Shadow Strategy:** None. Tonal cream shifts only.

### Inputs / Fields
- **Style:** Cream-pale background, 1px ink-soft border at 40%, body
  typography, 10px 14px padding, 2px radius.
- **Focus:** Border shifts to 1.5px wine, 2px amber outline-offset for
  keyboard focus visibility. No glow blur.
- **Disabled:** ink-soft text at 50% alpha, hairline border maintained.

### Navigation (in-page anchors and section links)
- **Style:** Inter 600, 0.75rem, uppercase, 0.12em letter-spacing.
- **Default:** ink color.
- **Hover:** wine color, 1px wine underline appears below baseline.
- **Active section (current scroll position):** wine color permanent,
  1.5px wine underline.

### Signature Components

**The Typing-Animated Terminal.** Hero install block. Cream-deep ink
inversion (background `oklch(0.30 0.02 280)`, text `oklch(0.95 0.01 80)`).
Geist Mono. Amber `$` prompt. The command types in on view-enter (700ms
ease-out-quart cadence). Below the prompt, scaffold output reveals line-
by-line on scroll. With `prefers-reduced-motion`, the full command and
output are statically rendered.

**The Comparison Table (Brand Argument).** The page's thesis surface.
Six rows, two columns: System name (mono) and "What's missing" (body).
Alternating cream-pale / cream-deep row backgrounds. Wine 1px border on
the table frame. Sticky-style row highlight on hover (cream-deep one
notch deeper). This is not a feature block; it is the named opinion.

**The Position-Addressed Section Marker.** Every page section opens with
a numbered eyebrow label (e.g., `00 / OVERVIEW`, `10 / WHY`,
`20 / WALKTHROUGH`). Inter Label, teal color, set on the same baseline
grid as the section headline. Mirrors the vault's numbered prefix
convention — the design demonstrates the methodology.

**The Template Gallery Card.** Each of the 6 starter templates renders
as a folder-tree preview block. Card-paper background, 1px wine/15%
border, sharp corners. Folder tree rendered in mono with collapsible
disclosure on hover. Footer band shows a one-line tagline + example user
in body italic.

## 6. Do's and Don'ts

### Do:
- **Do** use OKLCH for all color authoring. Hex is approximation only.
- **Do** keep wine to 30-60% of viewport surface in brand register, ≤10%
  in product register.
- **Do** use cream-on-cream tonal layering for depth. Three cream values
  (`cream`, `cream-pale`, `cream-deep`) is the elevation system.
- **Do** open every section with a numbered eyebrow label
  (`00 / OVERVIEW` style). The position-addressed grid is a brand asset.
- **Do** cite the methodology source for every claim — Karpathy / Milo /
  Chief / Forte / Medin / Cursor / Claude — in pull-quotes, footnotes, or
  inline.
- **Do** cap body text at 65-75ch (38rem max-width on text containers).
- **Do** provide a `prefers-reduced-motion` fallback that statically
  reveals every animated element.
- **Do** scope all ideaverse-os tokens to the `/ideaverse-os/*` route. The
  parent app's dark theme must remain on every other route.
- **Do** show harness-agnostic examples (Cursor / Aider / Codex / Gemini
  CLI) wherever a Claude example appears. Per PRD acceptance criterion.
- **Do** use ASCII-only copy. No em dashes, no smart quotes, no
  ellipsis characters, no "delve".

### Don't:
- **Don't** use `#000` or `#fff`. Every neutral is tinted toward the brand
  hue family.
- **Don't** use side-stripe borders (`border-left` >1px as a colored
  accent). Use full hairline borders or background tints instead.
- **Don't** use gradient text (`background-clip: text` over a gradient).
  Solid wine on cream is the identity. Emphasis via weight or size.
- **Don't** use glassmorphism. No `backdrop-filter: blur(...)` on cards.
  Forbidden by the Flat-Paper Rule.
- **Don't** use hero metric grids (10x faster / 5min setup / 99.9% uptime).
  PRODUCT.md anti-reference.
- **Don't** use the dark-navy-cyan SaaS landing aesthetic. The parent
  ktncodes-v2 site already owns dark; ideaverse-os owns warm-paper
  editorial.
- **Don't** use animated chatbot mockups, abstract 3D blobs, particle
  backgrounds, or "Meet your AI second brain" copy. Per anti-references.
- **Don't** render the page as README-with-a-stylesheet. No shields.io
  badge rows. No table-of-contents sidebars in marketing pages.
- **Don't** use `box-shadow` on any surface. Depth via tonal cream only.
- **Don't** mix accent colors on a single product-register docs page.
  Per the One-Voice Rule.
- **Don't** make motion load-bearing. Every animation must have a
  `prefers-reduced-motion` static-state equivalent.
- **Don't** use beige sticky-note backgrounds or three-pane vault
  screenshots. We're not a Notion influencer template.
- **Don't** assume Claude Code in copy. The product is harness-agnostic.
