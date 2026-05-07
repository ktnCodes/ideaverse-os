# Product

## Register

brand

(Note: the site has a split. Marketing surfaces — hero, philosophy, walkthrough,
template gallery, install CTAs — are brand register. MDX concept docs pages use
product register: Restrained palette, cream + ink + one accent <=10%, dense
information design. This file owns the brand register; concept-doc styling
follows product.md and the docs-specific rules in DESIGN.md.)

## Users

**Potential users on GitHub** (PRD-locked target). Concretely: technical solo
operators and indie builders who already know the ground references — Karpathy's
raw -> wiki, Nick Milo's Ideaverse-OS, Tiago Forte's PARA, Cole Medin's AI
second brain, AI Impact's infinite_brain. They use Claude Code, Cursor, Aider,
Codex, or Gemini CLI. They've tried building a knowledge base before and bounced
off something — too manual, too rigid, too Claude-only, too template-heavy, too
academic. They want something that thinks with them, not at them.

Visiting context: they followed a link from a community thread, friend's share,
Hacker News post, or tweet. They have 60 seconds to decide whether to copy the
install command (PRD acceptance criterion), and 5 minutes if they want to
understand the synthesis story.

## Product Purpose

ideaverse-os is a one-command bootstrap (`npx ideaverse-os init`) that scaffolds
a position-addressed knowledge vault, then runs an LLM-driven 5-phase interview
(compass -> identity -> workflow -> domains -> optional layers) that compiles
the user's purpose, identity, workflow, and domain split into a custom-tailored
second brain. The CLI is the product; the interview is the experience. The
output is something that feels authored-for-you, that grows with you, that
never forgets.

The site exists to make a visitor want the interview. Working tagline:
*"Your knowledge base, written by conversation."*

Success = a visitor who pastes the install command into their terminal AND
understands why this synthesis is different from every other PKM template
they've seen. Two audiences, one page: the hot lead who copies the command in
30s (above-the-fold install + typing-animated terminal), and the depth reader
who scrolls for the comparison table, philosophy, walkthrough, and template
gallery.

The differentiator the page must communicate: **conversational ingestion**.
ideaverse-os is Karpathy's wiki pattern with conversational ingestion baked
in. Paste a YouTube link, save a page via Obsidian Web Clipper, or describe
what you learned; the bundled `ideaverse-capture` skill dispatches to the right
handler, refreshes the relevant cortex article, cross-links, logs the daily
note. One turn. Zero ceremony.

## Brand Personality

Confident craftsperson meets curious interviewer. Opinionated, receipts-first,
slightly contrarian about how every existing system makes the wrong tradeoff.
But also warm and attentive when previewing the conversational cadence of the
CLI itself. The page should feel like a designed essay written by a person —
specifically Kevin — not a SaaS landing written by a marketing team.

3-word personality: synthesizing, attentive, opinionated.

Voice rules:
- Names sources. Every claim cites the methodology it borrows from (Karpathy /
  Milo / Chief / Forte / Medin / Cursor / Claude).
- No marketing fluff. No "transform your workflow" copy.
- Speaks in first person where it earns its place. Kevin built this; the page
  can say so once.
- Asks questions in headers and pull-quotes. The page mirrors the interview
  cadence the CLI runs.
- ASCII only. No em dashes. No smart quotes. No "delve". Per Kevin's soul.md.
- Harness-agnostic. Never assume Claude Code. Show Cursor / Aider / Codex /
  Gemini CLI examples wherever Claude appears (PRD acceptance criterion).

## Anti-references

What this site explicitly does NOT look like:

- **Generic dev-tool SaaS landing.** No Linear/Vercel/Stripe cyan-on-navy
  gradient hero. No hero metric grids (10x faster / 5min setup /
  99.9% uptime). No glassmorphism cards. No "trusted by" logo bar. No
  "Built for developers" template headlines.
- **AI-product hero patterns.** No gradient text. No animated chatbot
  mockup. No "Meet your AI second brain" copy. No neon-on-black. No
  abstract 3D blobs or particle backgrounds.
- **Open-source CLI README-as-website.** No terminal-screenshot hero. No
  shields.io badge row. No table-of-contents sidebar. No README content
  rendered with a stylesheet calling itself a landing page.
- **Notion/Obsidian template gallery vibes.** No three-pane vault screenshot
  hero. No "second brain" influencer marketing copy. No beige sticky-note
  aesthetic.

## Design Principles

1. **Synthesis is the thesis.** ideaverse-os exists because every other system
   made the wrong tradeoff. The comparison table isn't a feature block; it's
   the brand argument. Every section reinforces "we picked the best from each
   methodology, not the kitchen sink."

2. **Preview the interview.** The CLI's value is the conversation it has with
   you. Show real questions the build interview asks (compass / identity /
   workflow / domains / optional). Let visitors taste the personality-test
   cadence before they install. The page is a trailer for the dialogue.

3. **Receipts over rhetoric.** Every claim cites its source. Footnotes, pull
   quotes, named references. Reads like a tech zine, not a launch page.

4. **Motion as teaching.** Scroll-driven choreography is not decoration. Each
   animation reveals architecture: how position-addressed prefixes work, how
   raw flows into cortex, how capture routes. Motion is additive — graceful
   `prefers-reduced-motion` fallback to a well-composed static composition.

5. **Practice what you preach.** The page is built like the product: position-
   addressed information architecture, one canonical place per idea, cross-
   linked, harness-agnostic. The site is a working demo of the methodology.

## Accessibility & Inclusion

WCAG 2.1 AA target.

- All interactive elements keyboard-reachable with visible focus indicators.
- Body text contrast >=4.5:1, large text >=3:1.
- `prefers-reduced-motion` disables scroll-driven choreography and reveals
  static, well-composed sections. Motion is additive, not load-bearing.
- Semantic HTML (proper heading hierarchy, landmarks). Code blocks have copy
  buttons with `aria-label`.
- Color is never the only carrier of meaning (especially in the comparison
  table and the architecture diagrams).
- Mobile breakpoints: 360px, 768px, 1024px, 1440px. Touch targets >=44px.
- LCP target <1.5s on 4G (PRD acceptance criterion).
