# Design Brief: ideaverse-os Landing Page Redesign

Output of `$impeccable shape` run on 2026-05-06. Confirmed by Kevin. Ready
for `$impeccable craft` handoff.

Strategic anchors (read these first):
- [`PRODUCT.md`](../PRODUCT.md) — register, users, brand personality, anti-references, principles
- [`DESIGN.md`](../DESIGN.md) — color tokens, typography, components, do's and don'ts
- PRD: `MyIdeaverse/Ideaverse/50-research-library/Spikes/SPIKE_ideaverse_OS_skill_rewrite.md`

Foundation already shipped (preceding craft):
- Route-scoped CSS layer at `[data-theme="ideaverse-os"]` in `ktncodes-v2/src/app/globals.css`
- Lora font loaded via `ktncodes-v2/src/app/ideaverse-os/layout.tsx`
- `page.tsx` refactored to Tailwind utilities resolving to scoped tokens
- Visually verified at `http://localhost:3000/ideaverse-os` (cream theme, Lora serif, parent app theme intact)

---

## 1. Feature Summary

Production redesign of the `/ideaverse-os` landing page on `ktncodes-v2`
(subdomain rewrite to `ideaverse-os.ktncodes.com`). Single scrolling page
that converts GitHub-discovering technical operators into people who run
`npx ideaverse-os init`. The page is the brand argument — synthesis of
Karpathy / Milo / Forte / Medin methodologies — and a trailer for the
interview the CLI runs.

## 2. Primary User Action

Copy the install command and decide to run it within 60s (PRD acceptance
criterion), with 5 minutes of optional depth for readers who scroll for
the synthesis story.

## 3. Design Direction

- **Color strategy:** Committed (per PRODUCT.md / DESIGN.md). Wine carries
  30-60% of viewport surface in brand context. Cream-on-cream tonal
  layering for non-wine surfaces.
- **Theme scene sentence:** *A second-brain-curious developer in a quiet
  room, one laptop open in the late afternoon, deciding whether to spend
  ten minutes letting a tool interview them about their work.* Forces a
  warm-paper light theme — not dark, not neutral white. Cream.
- **Named anchor references:** impeccable.style (the user's stated
  inspiration — for scroll-driven choreography, density, and motion-as-
  teaching), Stripe Press / Are.na (for editorial typography and zine-like
  layout), Linear's changelog pages (for restrained-but-confident
  craftsperson voice).
- **Per-surface override:** none. The page is fully brand register.

## 4. Scope

| | |
|---|---|
| Fidelity | Production-ready |
| Breadth | Single scrolling page, full hero-to-footer |
| Interactivity | Shipped-quality components, real Framer Motion (already in `ktncodes-v2` deps) for scroll-driven moments |
| Time intent | Polish until shipped |

## 5. Layout Strategy

Synthesis-first arc. Five sections, edge-to-edge cream canvas with
constrained text columns (max 38rem for body) and signature components
allowed to break the column for emphasis.

| # | Section | Hierarchy weight | What it does |
|---|---|---|---|
| 00 | Hero | Heaviest visual weight | Identity (Lora wine h1) + tagline + typing-animated terminal install + "Why this exists in one sentence" |
| 10 | Why | Major | Comparison table as the brand thesis. STATIC reveal — keeps the table dense and readable. Below the table, the "and here's what we picked from each" synthesis paragraph names sources. |
| 20 | Walkthrough | Heaviest content weight | Two motion-driven sub-blocks: (a) **Position-addressed grid** snaps into place as the user enters the section — the vault skeleton (numbered prefixes 00- / 10- / 20- / ... / 99-) materializes, each cell labeling itself; (b) **Five-phase interview timeline** — pinned scroll section walking through compass → identity → workflow → domains → optional, with 1-2 real sample questions per phase. |
| 30 | Templates | Major | **Template gallery morph** — 6 starter templates as mono folder trees that transform between templates on hover, showing how interview answers shape structure. |
| 40 | Install + Footer | Strong, terminal | Second install CTA, harness-agnostic copy showing Cursor / Aider / Codex / Gemini variants, GitHub / npm links, MIT credit, "position-addressed since 2026". |

Every section opens with a numbered eyebrow label
(`00 / OVERVIEW`, `10 / WHY`, `20 / WALKTHROUGH`, `30 / TEMPLATES`,
`40 / INSTALL`) — the position-addressed grid is a brand asset
(DESIGN.md "Practice what you preach").

## 6. Key States

| Block | States required |
|---|---|
| Hero typing terminal | Default (typing animation), reduced-motion (full output statically rendered), copy-success (clipboard write, 2s confirmation), copy-failed (graceful fallback, manual select hint) |
| Comparison table | Default; mobile (responsive — stacks rows vertically, system name above what's missing) |
| Position-addressed grid | Pre-scroll (hidden / off-screen), entering (cells fade in cell-by-cell), settled (full grid visible, hairline borders), reduced-motion (full grid statically rendered) |
| Five-phase interview timeline | Pinned-entered, scrolled-progress (1-5 phase indicator), scrolled-completed, reduced-motion (all phases vertically stacked, no pinning) |
| Template gallery | Default (one template visible), hover (morphs to selected), keyboard-active (visible focus ring on selected card), mobile (no morph — vertical stack, all 6 trees visible), reduced-motion (no morph, manual select via tabs or buttons) |
| Install footer block | Default; copy-success; small viewports (CTAs stack) |

## 7. Interaction Model

- **Scroll-as-narrator.** Page reveals are scroll-driven. Each major
  section transition has a `prefers-reduced-motion` fallback that reveals
  fully on entry without choreography.
- **Hero typing animation** auto-plays on view-enter (700ms ease-out-quart).
  Click on the install block copies command, shows "copied" pill (amber
  bg, 2s).
- **Position-addressed grid** uses Framer Motion `whileInView` with
  stagger. Cells animate in cream-deep → cream-pale tonal lift, no
  shadows.
- **Five-phase timeline** is a scroll-pinned section. As user scrolls,
  vertical progress indicator advances and the active phase's sample
  question fades in/out. Each phase header is wine; sample questions are
  ink. After phase 5, the section unpins.
- **Template gallery morph:** hover or keyboard-focus on a template card
  transforms its folder-tree contents to show that template. Motion is a
  200ms cross-fade between trees, not a physical morph.
- **Keyboard navigability:** all interactive elements reachable via Tab.
  Scroll-pinned section is escapable via Tab past its content.
- **No modals. No overlays. No floating popovers.** The page is a flat
  document.

## 8. Content Requirements

| Need | Source |
|---|---|
| Hero h1 + tagline | Existing (locked) |
| Hero install command | Existing (`npx ideaverse-os init ~/my-vault`) |
| Hero "Why this exists" 1-sentence intro under tagline | NEW — must mention "position-addressed", "harness-agnostic", "interview" |
| Why section — comparison table | Existing (5 systems + ideaverse-os filling-in row needs adding) |
| Why section — synthesis paragraph beneath table | NEW — "Here's what we kept from each, and what we changed" |
| 20 / Walkthrough — position-addressed grid labels | NEW — `00-agentic-OS`, `10-cortex`, `20-work` (or domain1), `30-personal` (or domain2), `40-raw`, `50-research-library`, `60-skills`, `70-daily`, `80-visualization`, `99-archive` |
| 20 / Walkthrough — 5-phase timeline | NEW — 1-2 real sample questions per phase. Source from PRD §"Build interview" or `idea-kickoff` skill |
| 30 / Templates — 6 starter template names + taglines + example users | Existing in PRD Appendix A: Work+Personal, Creative, Researcher+Builder, Trader/Investor, Day-job+Side-project, Solo, Custom |
| 30 / Templates — folder trees per template | NEW — synthesize from the position-addressed prefix scheme + per-template variations |
| 40 / Install — harness-agnostic command examples | NEW — Cursor / Aider / Codex / Gemini CLI invocation snippets after npx |

**Microcopy / dynamic ranges:**
- Status badge text: "v0.0.1 — tracer slice live · v1.0 coming" → must
  update with version. Drive from `package.json` version at build time.
- Sample interview questions per phase: 1-2 questions max each. Real
  questions, not placeholder.

## 9. Recommended References for Craft

Most valuable during craft:
- `frontend-design:frontend-design` — for the actual build (production-
  grade, distinctive, avoids generic AI aesthetics)
- `superpowers:test-driven-development` — for component-level state
  coverage (typing animation, copy, grid reveal, timeline pin, gallery
  morph, reduced-motion)
- `superpowers:writing-plans` — to slice this into commits (foundation
  already done; next slices are hero, why, walkthrough, templates,
  install)
- DESIGN.md (already written) — token reference

## 10. Open Questions

To resolve during craft, not blocking the brief:

1. **Real sample interview questions per phase.** The brief assumes Kevin
   can supply 1-2 real questions per phase from the actual build interview
   script (or from PRD §"Build interview" if it details them). If only
   paraphrases are available, the timeline component can use placeholder
   questions marked as illustrative.
2. **Folder-tree contents per template.** Synthesize from the position-
   addressed scheme + each template's domain split. Final tree contents
   may need Kevin's review for credibility.
3. **`Custom` template card.** With 6 + Custom = 7 cards, the gallery
   either: (a) shows 7 cards in a 3+4 / 4+3 grid; (b) shows 6 in a 2x3
   grid + Custom as a leading "blank slate" card; (c) treats Custom as a
   footer CTA below the gallery. Recommendation: option (b) — Custom as
   the leading card frames the gallery as "or build your own."
4. **Mobile breakpoint behavior for the scroll-pinned five-phase
   timeline.** Pinning on mobile is finicky. Recommendation: disable
   pinning below 768px; show all 5 phases vertically stacked with sample
   questions visible.
5. **Status badge auto-update.** Drive from `package.json` version + a
   simple "release status" line in the page metadata, or keep manually
   edited? Recommendation: derive `version` from `package.json` at build
   time via Next.js `metadata` export.
6. **Capture flow demo (deferred):** Kevin's stated differentiator. Strong
   candidate for v2/v1.1. Brief notes it but does not include in scope.

---

**Status:** Brief confirmed 2026-05-06. Ready for `$impeccable craft`.
