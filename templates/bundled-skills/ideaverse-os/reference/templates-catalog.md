# Templates Catalog

The 6 starter templates available in Phase 4 of the build interview. Each defines the `20-` and `30-` user-domain folder structure. Asset files live in `templates/starter/<name>/` inside the ideaverse-os package.

---

## How to use this catalog

During `build --phase=domains`, show the user the template list below. After they pick one:

1. Read `templates/starter/<name>/folders.txt` -- one sub-folder path per line (relative to vault root).
2. Apply any slug renames the user requested (e.g., `work` -> `engineering`).
3. Create each folder path under the vault root. Use the LLM's file-write tools or `mkdir -p`.
4. Drop a `CONTEXT.md` in the root of each domain slot (`20-<slug>/CONTEXT.md`, `30-<slug>/CONTEXT.md`).
5. Read `templates/starter/<name>/compass-example.md` and surface as a one-time tip (not auto-written to vault).
6. Update `00-agentic-OS/paths.json` with the domain paths.

Full instructions in `reference/build-domains.md`.

---

## Templates

### work-personal (default)

**Tagline:** Default Western knowledge-worker split. Two domains: your job and the rest of your life.

**Best for:** Software engineers, managers, analysts, most employed professionals.

**Folder tree:**
```
20-work/
  _bugs/
  _features/
  _other-work-items/
  reference/
    guides/
    concepts/
    tools/
  product/
30-personal/
  career/
  learning/
  portfolio/
  finances/
```

---

### creative

**Tagline:** Two domains: the craft and the business of selling the craft.

**Best for:** Writers, designers, illustrators, musicians, photographers.

**Folder tree:**
```
20-craft/
  drafts/
  finished/
  references/
  process-notes/
30-business/
  clients/
  finances/
  contracts/
  marketing/
```

---

### researcher-builder

**Tagline:** Two domains: the questions you are investigating and the things you are shipping.

**Best for:** Academics, scientists, independent researchers, developer-researchers.

**Folder tree:**
```
20-research/
  papers/
  experiments/
  notes/
  reading-list/
30-building/
  projects/
  prototypes/
  archives/
  tooling/
```

---

### trader-investor

**Tagline:** Two domains: what you hold and what you are studying.

**Best for:** Active traders, angel investors, crypto participants.

**Folder tree:**
```
20-portfolio/
  positions/
  trades/
  pnl/
  watchlist/
30-research/
  macro/
  companies/
  thesis/
  sectors/
```

---

### dayjob-sideproject

**Tagline:** Two domains: the thing paying the bills and the thing you are building toward.

**Best for:** Consultants, employed-but-building professionals, indie hackers.

**Folder tree:**
```
20-dayjob/
  clients-or-employer/
  reference/
  meetings/
30-sideproject/
  product/
  growth/
  operations/
  legal/
```

---

### solo

**Tagline:** One domain. For people whose life and work blur into a single focus area.

**Best for:** Focused builders, solopreneurs, single-mission researchers.

**Notes:** No 30- slot. paths.json reflects a single domain.

**Folder tree:**
```
20-work/
  projects/
  reference/
  archive/
```

---

### custom

No preset structure. The LLM runs open-ended exploration questions (see `build-domains.md`, "If user picks Custom" section) and generates a bespoke folder tree from the user's answers.
