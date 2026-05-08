# ideaverse-os Design System

> Your knowledge base, written by conversation.

This project contains the visual + content design system for **ideaverse-os**, a one-command CLI that bootstraps a position-addressed, LLM-agnostic knowledge vault. It pairs **Karpathy's raw → wiki pattern** with conversational ingestion baked in.

The system covers the **marketing site** (the `/ideaverse-os` route on `ktncodes-v2`, served at `ideaverse-os.ktncodes.com`) and the **vault skin** (the Obsidian-resident output the CLI produces). The two are tonally consistent — same wine + cream + marginalia palette — but typographically different (the site is Lora/Inter/Geist Mono; the vault is DM Serif / Comfortaa / iA Writer Quattro).

The brand is opinionated, ASCII-only, receipts-first. Read every section below before producing copy or layout.

---

## Sources

All material was extracted from `ktnCodes/ideaverse-os@main` on GitHub:

- `DESIGN.md` — color tokens, type scale, components, do's and don'ts (locked)
- `DESIGN.json` — same, machine-readable (used to derive `colors_and_type.css`)
- `PRODUCT.md` — register, users, brand personality, anti-references, principles
- `README.md` — product summary
- `docs/SHAPE_landing_page.md` — landing-page brief, section structure, named anchors
- `docs/font-guide.md` — vault skin font stack (Comfortaa / iA Writer / DM Serif)
- `docs/images/*.png` — vault homepage + folder-structure screenshots

Local copies live at `DESIGN.md`, `DESIGN.json`, `PRODUCT.md`, `docs/`, and `assets/`.

The marketing site itself is a separate Next.js codebase at `ktnCodes/ktnCodesPortfolioV2` → `ktncodes-v2/src/app/ideaverse-os/` — not imported here. Production CSS lives behind `[data-theme="ideaverse-os"]` in `globals.css`.

---

## Index

| Path | What it is |
|---|---|
| `colors_and_type.css` | Token + semantic CSS — single import for any prototype |
| `fonts/fonts.css` | Google Fonts loader (Lora / Inter / Geist Mono) |
| `assets/` | Logos, screenshots, vault homepage, font-stack reference |
| `preview/` | One-purpose cards used by the Design System tab |
| `ui_kits/marketing/` | The `/ideaverse-os` landing page recreation (`index.html` + `Components.jsx` + `marketing.css`) |
| `DESIGN.md`, `DESIGN.json`, `PRODUCT.md` | Source of truth from the repo |
| `docs/` | Imported design + font guides + reference images |
| `SKILL.md` | Agent-Skill manifest — drop this folder into a Claude Code skill slot and invoke it directly |

---

## Content fundamentals

> Confident craftsperson meets curious interviewer. Synthesizing, attentive, opinionated.

### Voice rules (from PRODUCT.md, treat as binding)

- **Names sources.** Every claim cites the methodology it borrows from — Karpathy / Milo / Chief / Forte / Medin / Cursor / Claude.
- **No marketing fluff.** Banned phrases: "transform your workflow", "10x", "supercharge", "unleash", "delve", "harness the power of".
- **First person where it earns its place.** Kevin built the project; the site can say so once. After that, the page speaks as the project.
- **Asks questions in headers and pull-quotes.** Mirrors the interview cadence the CLI runs.
- **Harness-agnostic.** Wherever a Claude example appears, show Cursor / Aider / Codex / Gemini CLI alongside.
- **ASCII-only.** No em dashes (`—` is forbidden in copy), no smart quotes, no ellipsis character (`…`), no bullet glyphs other than `-`.

### Tone & casing

- **You vs. I:** "You" addresses the reader directly. "I" only when Kevin specifically signs the line ("I built this because…"). Default neutral voice is the project speaking in third person about itself.
- **Sentence case for titles.** Display headlines are sentence case, not title case: "Your knowledge base, written by conversation." not "Your Knowledge Base, Written by Conversation."
- **UPPERCASE for labels only.** Eyebrows, button text, section markers, chips. Letter-spacing 0.12em, never elsewhere.
- **Lowercase for the brand.** Always `ideaverse-os`. Never `Ideaverse-OS` in body copy. The vault metaphor (`Ideaverse`, `Vault Foundation`) does cap, because those are filesystem nouns.

### Emoji & symbols

- **No emoji.** Anywhere. The brand is ASCII zine, not slack-channel.
- **Allowed unicode:** none beyond ASCII. Even arrows are `->` not `→` in copy. (Code samples and diagrams may use `→`; running prose may not.)
- **Mathematical / typographic chars:** never use `•`, `–`, `—`, `…`, `"`, `"`, `'`, `'`. Use `-`, `--`, `...`, `"`, `'`.

### Copywriting examples

| Use | Skip |
|---|---|
| `Karpathy's wiki pattern with conversational ingestion baked in.` | `Revolutionary AI-powered knowledge synthesis.` |
| `One command writes the harness layer, the routers, and a position-addressed skeleton.` | `Get started in seconds with our intuitive CLI.` |
| `npx ideaverse-os init ~/my-vault` | `Sign up for early access.` |
| `Karpathy raw -> wiki / No template; you build it manually` | `Other tools do X. We do Y.` |
| `v0.0.1 - tracer slice live - v1.0 coming` | `🚀 Now in beta!` |

### Microcopy

- Buttons read as commands: **RUN THE INTERVIEW**, **VIEW ON GITHUB**, **READ THE PRD**.
- Status badges are mono and dated: `v0.0.1 - tracer slice live - v1.0 coming`.
- Comparison-row "what's missing" lines are matter-of-fact, not snarky: `No template; you build it manually` not `Lol nothing here.`

---

## Visual foundations

### Color motifs

- **Cream-paper foundation.** Cream (`oklch(0.95 0.01 80)`) carries every page. Cream-pale lifts; cream-deep recedes. Three cream values, no shadow — that's the elevation system.
- **Wine as identity.** Editorial Wine (`oklch(0.45 0.13 18)`) anchors every H1 and primary CTA. Wine claims **30–60%** of viewport surface in brand register, ≤10% in product (docs) register.
- **Multi-hue accents, semantic only.** Teal (h2/eyebrow), rose (status), amber (energy/prompt/focus), blue (skill/diagram), lavender (cross-reference). One accent per docs page — the **One-Voice Rule**.
- **No pure black or white.** `#000` and `#fff` are banned. Every neutral is tinted toward purple-grey (ink) or warm yellow (cream).
- **OKLCH-only.** All tokens authored in OKLCH; hex appears only as commentary approximation.

### Type motifs

- **Lora 700 wine** for display and headline. Editorial-essay identity — slightly bookish, warm, confident at large weight.
- **Inter** for everything else (body, title, label, button text). Calm workhorse.
- **Geist Mono** reserved for code, file paths, shell commands, JSON keys. Never for branding flourishes.
- **Capped reading length.** Body paragraphs `max-width: 38rem` (65–75ch). No paragraph runs the full viewport.
- **Hierarchy contrast rule.** Each step in the type scale contrasts ≥1.25× in size or ≥200 weight units from its parent.

### Backgrounds

- **No imagery in the chrome.** No hero photos, no full-bleed video, no gradient meshes, no abstract 3D.
- **Cream tonal layering.** Sections shift between `--cream`, `--cream-pale`, `--cream-deep`. That's the entire background system.
- **The dark stamped install block.** The single inversion in the system: ink background, cream text, amber `$` prompt. Used in the hero and at the bottom-of-page CTA.
- **No textures, no patterns, no grain.** The page is designed paper, not a scanned document. (The vault skin uses the same cream paper, but again — flat, no texture.)

### Animation

- **Easing.** Two curves only: `cubic-bezier(0.25, 1, 0.50, 1)` (`--ease-out-quart`, default) and `cubic-bezier(0.16, 1, 0.30, 1)` (`--ease-out-expo`, settle).
- **Durations.** Fast 200ms (hover), medium 700ms (typing terminal, grid stagger), slow 1200ms (timeline phase transitions).
- **No bounces, no springs, no shake.** The brand is editorial; motion teaches, not performs.
- **Fades and small translations only.** Cells fade-up 8px, not slide-in 200px.
- **Reduced motion is load-bearing.** Every animation has a `prefers-reduced-motion` static fallback. Motion is additive, never required.

### Hover & press

- **Hover.** Color deepens: `--wine` → `--wine-deep`. Cream surfaces gain `--cream-deep`. Underlines appear on links and ghost buttons (1px wine, on the baseline). No transforms, no scales, no shadows.
- **Press.** Same as hover — color stays deep. The brand is restrained; we don't shrink buttons. Add a 1px outline-offset of amber when keyboard-focused.
- **Focus.** Always `2px solid var(--amber)` outline at `outline-offset: 2px`. Never glow blur. Never inset.

### Borders & shadows

- **Hairline only.** All borders are 1px. Wider colored stripes — especially side-stripe accents (`border-left: 4px solid <color>`) — are forbidden. **The Hairline Rule.**
- **No shadow.** Anywhere. **The Flat-Paper Rule.** Depth is communicated through cream-on-cream tonal shifts and 1px hairline borders, never through `box-shadow`.
- **Border colors.** `oklch(0.45 0.13 18 / 0.15)` for primary blocks; `oklch(0.30 0.02 280 / 0.10)` for subdued ones; full wine for active/focused states.

### Transparency & blur

- **Almost never.** No glassmorphism. `backdrop-filter: blur()` is forbidden by the Flat-Paper Rule.
- **Allowed transparency.** Border alphas (15%, 30%, 40%) for hairlines. Chip backgrounds at 15–20% of their accent. Nothing else.

### Imagery vibe

- The brand has no photography. Reference imagery (vault homepage, folder-structure) is rendered, not photographed — warm cream paper with wine accents, scanned at flat lighting.
- If we ever add imagery: warm light, no grain, restrained palette mapping (cream + wine + a single accent). No portraits, no lifestyle shots, no abstract 3D.

### Corner radii

- **Sharp by default.** `--r-none: 0`. Editorial print, not glassy chrome.
- **2px** (`--r-sm`) on primary CTAs and inputs.
- **4px** (`--r-md`) is the absolute maximum for any rectangular surface.
- **Pill (`999px`)** is reserved for the **status badge only**. Nowhere else in the system gets a pill.

### Cards

- Background `--cream-pale`, 1px wine/15% border, **0px radius** (sharp), padding `24px 28px` standard / `32px 40px` for hero cards. **No shadow ever.**
- Heading inside cards: Inter 600, teal. Body: Inter 400, ink.
- Cards are **flat tonal lifts**, not floating chrome.

### Layout rules

- **Page max** `1080–1200px`. **Reader max** `38rem` for paragraphs.
- **Position-addressed grid.** Major sections are numbered (`00 / OVERVIEW`, `10 / WHY`, `20 / WALKTHROUGH`, `30 / TEMPLATES`, `40 / INSTALL`). The eyebrow opens every section. **Practice what you preach.**
- **No fixed elements.** No sticky nav, no floating action button, no overlay banners. The page is a flat document.
- **No modals, no popovers.** All affordances live in the document flow.
- **Mobile.** Pinning disables below 768px. Comparison-table rows stack. Templates stack.

### Scope rule (production)

The ideaverse-os tokens **must be scoped** to the `/ideaverse-os/*` route — never leaked to `:root`. The parent `ktncodes-v2` site uses a dark theme; mixing the two is the canonical failure mode the redesign exists to fix.

---

## Iconography

ideaverse-os has **no icon system**. The brand argues against decoration: signal carries via type, color, position-addressed numbering, and one-line callouts. Every place a SaaS landing would put an icon, we put a numbered eyebrow or a mono prefix instead.

What this means in practice:

- **No icon font.** No Heroicons, no Lucide, no Font Awesome bundled.
- **No SVG glyph set.** No "feature icons" sitting next to feature blurbs.
- **No emoji.** Anywhere. Brand-binding.
- **No unicode glyphs in copy.** ASCII only — `->` not `→`, `--` not `—`.
- **The amber `$`** is the closest thing to an icon — the dollar prompt in the install block. That's it.
- **Numbered prefixes** (`00 /`, `10 /`, `99 /`) act as the wayfinding system. They are functional, not decorative.

If a future surface genuinely needs an icon (e.g. a copy-to-clipboard button), use a 1.5px stroke Lucide glyph — `--ink` color, no fill — and **flag the substitution to Kevin**. Default position is: don't.

The vault skin (Obsidian) uses Obsidian's built-in Lucide-based icon set in the sidebar. That's product chrome, not brand surface, and is left as Obsidian renders it.

### Reference assets

| Path | What |
|---|---|
| `assets/vault-homepage.png` | The Obsidian vault homepage — the "designed paper" the CLI produces |
| `assets/vault-folder-structure.png` | Sidebar with the position-addressed prefixes coloured by the marginalia palette |
| `assets/font-stack.png` | DM Serif / Comfortaa / iA Writer Quattro reference (vault skin) |
| `assets/me-md.png` | `me.md` identity file rendered in vault — the centerpiece artifact |

There is no logo file. The wordmark is **type-only**: `ideaverse-os` set in Lora 700 wine on cream, lowercase. That's the mark. If a square avatar is needed, use a wine-on-cream "io" with a 1px wine hairline border at 4px radius — see `preview/brand-wordmark.html` for the reference treatment.

---

## Vault skin (the product)

The vault that the CLI produces ships with its own Obsidian theme. Its tokens are **adjacent to** the marketing brand — same hues, different fonts.

| Slot | Vault skin | Marketing site |
|---|---|---|
| Body | **Comfortaa** (rounded geometric sans) | Inter |
| Interface (sidebar, tabs) | **iA Writer Quattro S** (proportional mono) | Inter |
| Headings | **DM Serif Display** | Lora |
| Background | Same `--cream` family | Same `--cream` family |
| Folder colors | Wine, rose, amber, teal, blue, lavender — semantic per top-level prefix | Same palette, same semantics |

If you build something that lives **inside** the vault (a dashboard, a Dataview rendering, a snippet), use the vault font stack. If you build something that lives **outside** the vault (the marketing site, a slide deck pitching the project, a docs page), use the marketing stack.

---

## Open questions for Kevin

A few things this system flags and would like you to confirm:

1. **No logo asset.** The brand is wordmark-only. If you ever want a square mark / favicon / OG image distinct from the wordmark, we need a brief.
2. **Geist Mono via Google Fonts.** Vercel ships Geist Mono via `geist-font` and Google Fonts. We use the Google Fonts CDN. If you'd prefer self-hosted woff2, drop them in `fonts/` and replace the `@import` in `fonts/fonts.css`.
3. **DM Serif / Comfortaa / iA Writer Quattro** are not bundled. The Obsidian vault expects them locally; we can't ship them through this design system without licence checks. The vault skin section here is descriptive, not generative — flag at design time if you need vault-resident components.
4. **No emoji rule.** Confirmed binding. If a surface ever needs visual variety beyond the marginalia accents, the path is more numbered eyebrows / chips, not glyphs.
