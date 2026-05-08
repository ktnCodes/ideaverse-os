// Marketing site UI kit — recreates the /ideaverse-os route from
// ktnCodes/ktnCodesPortfolioV2 faithfully. Kept lilac per design-system
// preference (live site uses wine red).
//
// Loaded by index.html via <script type="text/babel">.

const { useState, useEffect, useRef } = React;

// ---------- Section Label (number / label) ----------
// Mirrors src/app/ideaverse-os/_components/SectionLabel.tsx.
function SectionLabel({ number, label }) {
  return (
    <div className="iv-seclabel">
      <span className="iv-seclabel__num">{number}</span>
      <span className="iv-seclabel__sep">/</span>
      <span className="iv-seclabel__lbl">{label}</span>
    </div>
  );
}
// Keep SectionMarker alias for backwards compatibility with previews.
function SectionMarker({ children }) {
  const text = String(children || "");
  const m = text.match(/^(\d+)\s*\/\s*(.+)$/);
  if (m) return <SectionLabel number={m[1]} label={m[2]} />;
  return <div className="iv-seclabel"><span className="iv-seclabel__lbl">{text}</span></div>;
}

// ---------- Status Badge ----------
// Two call signatures:
//   <StatusBadge>some text</StatusBadge>                       (legacy chip)
//   <StatusBadge version label next />                          (terminal stamp)
function StatusBadge({ children, version, label, next }) {
  if (children !== undefined) {
    return (
      <span className="iv-badge iv-badge--chip">
        <span className="iv-badge__dot iv-badge__dot--strong" aria-hidden="true"></span>
        <span>{children}</span>
      </span>
    );
  }
  return (
    <div className="iv-badge">
      <span className="iv-badge__group">
        <span className="iv-badge__dot iv-badge__dot--strong" aria-hidden="true"></span>
        <span>v{version}</span>
      </span>
      <span className="iv-badge__group">
        <span className="iv-badge__dot" aria-hidden="true"></span>
        <span>{label}</span>
      </span>
      {next ? (
        <span className="iv-badge__group iv-badge__group--soft">
          <span className="iv-badge__dot" aria-hidden="true"></span>
          <span>{next}</span>
        </span>
      ) : null}
    </div>
  );
}

// ---------- Buttons ----------
function PrimaryButton({ children, onClick }) {
  return <button className="iv-btn iv-btn--primary" onClick={onClick}>{children}</button>;
}
function SecondaryButton({ children, onClick }) {
  return <button className="iv-btn iv-btn--secondary" onClick={onClick}>{children}</button>;
}
function GhostLink({ children, href = "#" }) {
  return <a className="iv-ghost" href={href}>{children}</a>;
}

// ---------- Typing Terminal ----------
// Mirrors src/app/ideaverse-os/_components/TypingTerminal.tsx.
function TypingTerminal({ command, scaffoldLines = [], prompt = "$" }) {
  const [typed, setTyped] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 700;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 4);
      setTyped(Math.floor(eased * command.length));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTyped(command.length);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [command]);

  useEffect(() => {
    if (typed < command.length || scaffoldLines.length === 0) return;
    const timers = scaffoldLines.map((_, i) =>
      setTimeout(() => setRevealed((p) => Math.max(p, i + 1)), 240 + i * 120)
    );
    return () => timers.forEach(clearTimeout);
  }, [typed, command.length, scaffoldLines]);

  const copy = () => {
    navigator.clipboard?.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="iv-term">
      <div className="iv-term__chrome">
        <div className="iv-term__title">
          <span className="iv-term__bullet" aria-hidden="true"></span>
          <span>terminal</span>
        </div>
        <button className="iv-term__copy" onClick={copy}>
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <button className="iv-term__body" onClick={copy} title="Click to copy">
        <span className="iv-term__prompt">{prompt}</span>{" "}
        <span>{command.slice(0, typed)}</span>
        {typed < command.length ? <span className="iv-term__caret" aria-hidden="true"></span> : null}
      </button>
      {scaffoldLines.length > 0 ? (
        <div className="iv-term__scaffold">
          {scaffoldLines.map((line, i) => (
            <div
              key={i}
              className="iv-term__line"
              style={{ opacity: i < revealed ? 1 : 0 }}
            >
              {line || " "}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// ---------- Install Block (simple inline typewriter) ----------
// Used inside the hero — single line, dark, click to copy.
function InstallBlock({ command = "npx ideaverse-os init ~/my-vault" }) {
  const [typed, setTyped] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(command.slice(0, i));
      if (i >= command.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [command]);
  const copy = () => {
    navigator.clipboard?.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="iv-install">
      <pre className="iv-install__pre" onClick={copy} title="Click to copy">
        <span className="iv-install__prompt">$</span>{" "}
        <span className="iv-install__cmd">{typed}</span>
        <span className="iv-install__caret" aria-hidden="true">▍</span>
      </pre>
      <button className="iv-install__copy" onClick={copy}>
        {copied ? "COPIED" : "COPY"}
      </button>
    </div>
  );
}

// ---------- Harness Dock (compact rail) ----------
function HarnessDock() {
  const items = [
    { short: "C",  name: "Claude Code" },
    { short: ">_", name: "Cursor" },
    { short: "A",  name: "Aider" },
    { short: "X",  name: "Codex CLI" },
    { short: "G",  name: "Gemini CLI" },
  ];
  return (
    <div className="iv-dock">
      <ul className="iv-dock__row">
        {items.map((h) => (
          <li key={h.short} title={h.name} className="iv-dock__chip">{h.short}</li>
        ))}
      </ul>
      <div className="iv-dock__caption">works in any of these</div>
    </div>
  );
}

// ---------- Vault Demo Panel (three-pane: tree, articles, harness rail) ----------
function VaultDemo() {
  const [openFolder, setOpenFolder] = useState("10-cortex");
  const folders = [
    { name: "00-agentic-OS",       tone: "wine",     count: 12 },
    { name: "10-cortex",           tone: "teal",     count: 3  },
    { name: "20-work",             tone: "amber",    count: 7  },
    { name: "30-personal",         tone: "rose",     count: 5  },
    { name: "40-raw",              tone: "ink-soft", count: 41 },
    { name: "50-research-library", tone: "blue",     count: 9  },
    { name: "60-skills",           tone: "lavender", count: 6  },
    { name: "70-daily",            tone: "ink-soft", count: 18 },
    { name: "80-visualization",    tone: "lavender", count: 2  },
    { name: "99-archive",          tone: "ink-soft", count: 24 },
  ];
  const articles = {
    "10-cortex": [
      { name: "karpathy-pattern.md",          meta: "modified · today" },
      { name: "position-addressed-memory.md", meta: "modified · 2d" },
      { name: "conversational-ingestion.md",  meta: "modified · 5d" },
    ],
    "20-work": [
      { name: "q1-roadmap.md",          meta: "modified · today" },
      { name: "interview-prep.md",      meta: "modified · 1d" },
    ],
    "30-personal": [
      { name: "reading-list.md",        meta: "modified · 3d" },
      { name: "annual-review.md",       meta: "modified · 1w" },
    ],
    "40-raw": [
      { name: "2025-11-04-thought.md",  meta: "captured · today" },
      { name: "yt-clip-3hr-debate.md",  meta: "captured · today" },
      { name: "voice-memo-walk.md",     meta: "captured · 1d" },
    ],
  };
  const open = articles[openFolder] || [];
  return (
    <div className="iv-demo">
      <div className="iv-demo__head">
        <span className="iv-demo__path">~/my-vault</span>
        <span className="iv-demo__caption">Live demo — what daily use looks like</span>
      </div>
      <div className="iv-demo__body iv-demo__body--three">
        <aside className="iv-demo__tree">
          <div className="iv-demo__tree-title">VAULT</div>
          <ul className="iv-demo__tree-list">
            {folders.map((f) => (
              <li key={f.name}
                  className={"iv-demo__folder" + (openFolder === f.name ? " is-open" : "")}
                  onClick={() => setOpenFolder(f.name)}>
                <span className={"iv-demo__bullet iv-demo__bullet--" + f.tone}></span>
                <span className="iv-demo__folder-name">{f.name}</span>
                <span className="iv-demo__folder-count">{f.count}</span>
              </li>
            ))}
          </ul>
        </aside>
        <section className="iv-demo__pane">
          <div className="iv-demo__pane-head">
            <span className="iv-demo__pane-title">{openFolder}</span>
            <span className="iv-demo__pane-meta">{open.length} {open.length === 1 ? "article" : "articles"}</span>
          </div>
          <ul className="iv-demo__articles">
            {open.map((a) => (
              <li key={a.name} className="iv-demo__article">
                <span className="iv-demo__article-name">{a.name}</span>
                <span className="iv-demo__article-meta">{a.meta}</span>
              </li>
            ))}
            {open.length === 0 && (
              <li className="iv-demo__empty">No notes here yet.</li>
            )}
          </ul>
        </section>
        <aside className="iv-demo__rail">
          <div className="iv-demo__rail-title">CAPTURE</div>
          <div className="iv-demo__rail-row">
            <span className="iv-demo__rail-name">ideaverse-capture</span>
            <span className="iv-demo__rail-status">
              <span className="iv-demo__pulse"></span>watching
            </span>
          </div>
          <div className="iv-demo__rail-divider"></div>
          <div className="iv-demo__rail-title">HARNESS</div>
          <div className="iv-demo__rail-icons">
            <span className="iv-demo__harness">C</span>
            <span className="iv-demo__harness">$_</span>
            <span className="iv-demo__harness">A</span>
            <span className="iv-demo__harness">X</span>
            <span className="iv-demo__harness">G</span>
          </div>
          <div className="iv-demo__rail-foot">works in any of these</div>
        </aside>
      </div>
    </div>
  );
}

// ---------- Comparison Table ----------
// Mirrors src/app/ideaverse-os/_components/ComparisonTable.tsx.
// Last row is "us" — wine/lilac bg, amber system, cream detail.
function ComparisonTable({ rows }) {
  return (
    <div className="iv-cmp">
      <div className="iv-cmp__head">
        <div className="iv-cmp__h">System</div>
        <div className="iv-cmp__h">The tradeoff</div>
      </div>
      {rows.map((r, i) => (
        <div className={`iv-cmp__row${r.isUs ? " is-us" : ""}${i % 2 === 1 ? " is-alt" : ""}`} key={i}>
          <div className="iv-cmp__sys">{r.system}</div>
          <div className="iv-cmp__missing">{r.missing}</div>
        </div>
      ))}
    </div>
  );
}

// ---------- "What we kept" attribution grid ----------
function KeptGrid({ items }) {
  return (
    <div className="iv-kept">
      {items.map((k) => (
        <div className="iv-kept__row" key={k.who}>
          <div className="iv-kept__head">
            <span className="iv-kept__who">{k.who}</span>
            <span className="iv-kept__tag">source</span>
          </div>
          <p className="iv-kept__what">{k.what}</p>
          <p className="iv-kept__src">see: {k.src}</p>
        </div>
      ))}
    </div>
  );
}

// ---------- Position Grid (00, 10, 20, ... cells) ----------
function PositionGrid({ cells }) {
  return (
    <div className="iv-grid">
      {cells.map((c) => {
        const isDomain = c.prefix === "20" || c.prefix === "30";
        return (
          <div className={`iv-cell${isDomain ? " iv-cell--domain" : ""}`} key={c.prefix}>
            <div className="iv-cell__top">
              <span className="iv-cell__prefix">{c.prefix}</span>
              <span className="iv-cell__name">{c.name}/</span>
            </div>
            <p className="iv-cell__desc">{c.desc}</p>
            {isDomain ? <span className="iv-cell__tag">shaped by you</span> : null}
          </div>
        );
      })}
    </div>
  );
}

// ---------- Interview Timeline (stacked, with compiles-to block) ----------
// Mirrors the StackedTimeline variant from InterviewTimeline.tsx.
function InterviewTimeline({ phases }) {
  return (
    <ol className="iv-timeline">
      {phases.map((p, i) => (
        <li key={p.name} className="iv-timeline__step">
          <span className="iv-timeline__dot" aria-hidden="true"></span>
          <div className="iv-timeline__eyebrow">Phase 0{i + 1}</div>
          <h3 className="iv-timeline__name">{p.name}</h3>
          <p className="iv-timeline__intent">{p.title}</p>
          <div className="iv-timeline__qs">
            {p.questions.map((q, qi) => (
              <blockquote key={qi} className="iv-timeline__q">
                <span className="iv-timeline__q-tag">Q.</span> <em>{q}</em>
              </blockquote>
            ))}
          </div>
          <div className="iv-fragment">
            <div className="iv-fragment__chrome">
              <span className="iv-fragment__lbl">compiles to</span>
              <span className="iv-fragment__file">{p.compiles}</span>
            </div>
            <pre className="iv-fragment__body">{p.sample}</pre>
          </div>
        </li>
      ))}
    </ol>
  );
}

// ---------- Template Gallery (list + morphing tree) ----------
function TemplateGallery({ templates }) {
  const [active, setActive] = useState(1);
  const t = templates[active];
  const constantTop = [
    { num: "00", name: "agentic-OS" },
    { num: "10", name: "cortex" },
  ];
  const constantBottom = [
    { num: "40", name: "raw" },
    { num: "50", name: "research-library" },
    { num: "60", name: "skills" },
    { num: "70", name: "daily" },
    { num: "80", name: "visualization" },
    { num: "99", name: "archive" },
  ];
  return (
    <div className="iv-tplg">
      <ul className="iv-tplg__list">
        {templates.map((tpl, i) => (
          <li key={tpl.name}>
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`iv-tplg__btn${i === active ? " is-active" : ""}`}
              aria-pressed={i === active}
            >
              <div className="iv-tplg__btn-name">{tpl.name}</div>
              <div className="iv-tplg__btn-tag">{tpl.tagline}</div>
            </button>
          </li>
        ))}
      </ul>
      <div className="iv-tplg__panel">
        <div className="iv-tplg__head">
          <h3 className="iv-tplg__title">{t.name}</h3>
          <div className="iv-tplg__for">
            for: <em>{t.example}</em>
          </div>
        </div>
        <div className="iv-tplg__tree">
          <div className="iv-tplg__root">my-vault/</div>
          {constantTop.map((f) => (
            <div key={f.num} className="iv-tplg__row">
              <span className="iv-tplg__bar">+--</span>
              <span className="iv-tplg__leaf">{f.num}-{f.name}/</span>
            </div>
          ))}
          {t.domains.map((d) => (
            <div key={d.num} className="iv-tplg__row iv-tplg__row--hl">
              <span className="iv-tplg__bar">+--</span>
              <span className="iv-tplg__leaf iv-tplg__leaf--hl">{d.num}-{d.name}/</span>
              {d.intent ? <span className="iv-tplg__intent">{d.intent}</span> : null}
            </div>
          ))}
          {constantBottom.map((f) => (
            <div key={f.num} className="iv-tplg__row">
              <span className="iv-tplg__bar">+--</span>
              <span className="iv-tplg__leaf">{f.num}-{f.name}/</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Harness Snippets ("Same command, every harness") ----------
function HarnessSnippets({ harnesses }) {
  return (
    <div className="iv-hsnips">
      <div className="iv-hsnips__head">Same command, every harness</div>
      <ul className="iv-hsnips__list">
        {harnesses.map((h) => (
          <li key={h.name} className="iv-hsnips__row">
            <span className="iv-hsnips__name">{h.name}</span>
            <span className="iv-hsnips__cmd">/ideaverse-os build</span>
            <span className="iv-hsnips__file">loads via {h.file}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------- Concept Card (read-further) ----------
function ConceptCard({ eyebrow, title, desc, href = "#" }) {
  return (
    <a href={href} className="iv-concept">
      <div className="iv-concept__eyebrow">{eyebrow}</div>
      <h3 className="iv-concept__title">{title}</h3>
      <p className="iv-concept__desc">{desc}</p>
      <div className="iv-concept__more">Read --&gt;</div>
    </a>
  );
}

// ---------- Site Footer ----------
function SiteFooter() {
  return (
    <footer className="iv-footer">
      <div className="iv-footer__links">
        <a href="https://github.com/ktnCodes/ideaverse-os" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.npmjs.com/package/ideaverse-os" target="_blank" rel="noopener noreferrer">npm</a>
        <a href="https://ktncodes.com" target="_blank" rel="noopener noreferrer">ktncodes.com</a>
      </div>
      <p className="iv-footer__meta">
        Built by <a href="https://ktncodes.com" className="iv-footer__name">Kevin Nguyen</a>.
        MIT licensed. Position-addressed since 2026.
      </p>
    </footer>
  );
}

// Backwards-compat shims for legacy preview cards.
function PhaseTimeline(props) { return <InterviewTimeline phases={props.phases} />; }
function TemplateCard({ template }) {
  return (
    <article className="iv-tpl">
      <div className="iv-tpl__head">
        <div className="iv-tpl__name">{template.name}</div>
      </div>
      <div className="iv-tpl__foot">
        <em>{template.tagline}</em>
        <small>e.g. {template.example}</small>
      </div>
    </article>
  );
}
function Chip({ children }) { return <span className="iv-chip">{children}</span>; }

Object.assign(window, {
  SectionLabel, SectionMarker, StatusBadge,
  PrimaryButton, SecondaryButton, GhostLink,
  TypingTerminal, InstallBlock, HarnessDock, VaultDemo,
  ComparisonTable, KeptGrid, PositionGrid, InterviewTimeline,
  TemplateGallery, HarnessSnippets, ConceptCard, SiteFooter,
  PhaseTimeline, TemplateCard, Chip,
});
