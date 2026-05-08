---
name: ideaverse-os-design
description: Use this skill to generate well-branded interfaces and assets for ideaverse-os, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. Pull in `colors_and_type.css` from the skill root for tokens — every prototype should `@import` it so the wine/cream/ink palette and Lora/Inter/Geist Mono stack arrive for free.

If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand. Note the production scope rule: ideaverse-os tokens must be scoped to the `/ideaverse-os/*` route on `ktncodes-v2` — never leaked to `:root`. The parent app's dark theme must remain on every other route.

When the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions about audience and surface, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Hard brand rules (binding)

These are stated bluntly because they're easy to violate accidentally:

- **No `#000`, no `#fff`.** Author all color in OKLCH.
- **No emoji, anywhere.** ASCII only in copy: `->` not `→`, `--` not `—`, `...` not `…`, `"` not `"`.
- **No `box-shadow`.** Depth comes from three cream values plus 1px hairline borders. The Flat-Paper Rule.
- **No glassmorphism.** No `backdrop-filter: blur()`.
- **No gradient text.** Solid wine on cream is the identity.
- **No side-stripe borders.** Wider colored stripes are forbidden — full hairline borders or background tints instead.
- **No hero metric grids** (10x faster / 5min setup / 99.9% uptime).
- **No animated chatbot mockups, abstract 3D, or particle backgrounds.**
- **Don't assume Claude Code.** Show Cursor / Aider / Codex / Gemini wherever Claude appears.
- **One-Voice Rule** for docs register: at most one accent color per page, ≤10% surface.
- **Reader's Length Rule:** body paragraphs cap at `38rem` (65–75ch).

## File map

- `README.md` — full visual + content foundations. Read first.
- `colors_and_type.css` — token + semantic CSS. Single import.
- `fonts/fonts.css` — Google Fonts loader (Lora / Inter / Geist Mono).
- `assets/` — vault homepage, folder-structure screenshots, font-stack reference.
- `preview/` — small one-purpose cards. Useful as gut-checks while designing.
- `ui_kits/marketing/` — full landing-page recreation with reusable React components. Read `Components.jsx` to lift `<InstallBlock>`, `<ComparisonTable>`, `<PositionGrid>`, `<PhaseTimeline>`, `<TemplateCard>`.
- `DESIGN.md` / `DESIGN.json` / `PRODUCT.md` — source of truth, copied from the upstream repo.
- `docs/` — landing-page brief and font guide.
