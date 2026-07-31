import { useMemo, useState } from "react";
import { marked } from "marked";
import Logo from "./components/Logo.jsx";
import { useHead } from "./use-head.js";
import { PAGE_SEO } from "./seo.js";
import { FAQ_CATEGORIES, normalize } from "./faq.js";

marked.setOptions({ mangle: false, headerIds: false });
const md = (s) => ({ __html: marked.parse(s || "") });

/* Presentation layer over the raw markdown categories: clean titles, icons,
   one-line descriptions and display order — keyed by the parser's slug id, so
   the markdown stays the content source while the page controls how it reads. */
const CATEGORY_META = {
  "basics": { title: "The basics", icon: "🧭", blurb: "What eUpgrades are and how they work." },
  "earning-validity": { title: "Earning & expiry", icon: "🎟️", blurb: "Where credits come from and how long they last." },
  "timing-the-upgrade-list": { title: "Timing & clearing", icon: "⏳", blurb: "When you can request, when it clears, and how the list is ranked." },
  "money": { title: "Costs & refunds", icon: "💳", blurb: "Add-on fees, when credits come out, and getting them back." },
  "upgrading-someone-else": { title: "Upgrading others", icon: "👥", blurb: "Companions, nominees, and shared bookings." },
  "a-genuinely-obscure-but-useful-edge-case": { title: "Multi-stop flights", icon: "🛬", blurb: "One flight number with a refuel stop, and split legs." },
  "partner-airlines": { title: "Partner airlines", icon: "🤝", blurb: "Codeshares, partner metal, and where you credit miles." },
  "not-the-same-thing": { title: "Not an eUpgrade", icon: "⚖️", blurb: "Other ways to move up front, and how they differ." },
};
const ORDER = [
  "basics", "earning-validity", "timing-the-upgrade-list", "money",
  "upgrading-someone-else", "a-genuinely-obscure-but-useful-edge-case",
  "partner-airlines", "not-the-same-thing",
];
const RAW = Object.fromEntries(FAQ_CATEGORIES.map((c) => [c.id, c]));
const CATEGORIES = ORDER.filter((id) => RAW[id]).map((id) => ({
  ...RAW[id],
  ...(CATEGORY_META[id] || { title: RAW[id].name, icon: "•", blurb: "" }),
}));

function FaqItem({ item, forceOpen }) {
  const [open, setOpen] = useState(false);
  const expanded = open || forceOpen;
  return (
    <div className={"faq-item" + (expanded ? " open" : "")}>
      <button className="faq-q" aria-expanded={expanded} onClick={() => setOpen((o) => !o)}>
        <span className="faq-qt">{item.question}</span>
        <span className="faq-chev" aria-hidden="true">⌄</span>
      </button>
      {expanded && <div className="faq-a" dangerouslySetInnerHTML={md(item.answerMd)} />}
    </div>
  );
}

export default function Faq() {
  useHead(PAGE_SEO["/faq"]);
  const [q, setQ] = useState("");
  const [allOpen, setAllOpen] = useState(false);
  const query = normalize(q);
  const searching = !!query;

  const cats = useMemo(() => {
    if (!searching) return CATEGORIES;
    return CATEGORIES
      .map((c) => ({ ...c, items: c.items.filter((it) => it.search.includes(query)) }))
      .filter((c) => c.items.length > 0);
  }, [query, searching]);

  const total = useMemo(() => cats.reduce((n, c) => n + c.items.length, 0), [cats]);
  const grandTotal = useMemo(() => CATEGORIES.reduce((n, c) => n + c.items.length, 0), []);

  return (
    <div className="faqpage">
      <nav><div className="wrap">
        <a className="brand" href="/"><Logo /><span className="word">eupgrade<span className="me">.me</span></span></a>
        <a className="back" href="/#calculator">← Back to the calculator</a>
      </div></nav>

      <main>
        <header><div className="gwrap">
          <div className="kicker">❓ {grandTotal} questions, answered</div>
          <h1>eUpgrade <span className="g">questions &amp; answers</span></h1>
          <p className="sub">The details that trip people up, in plain language. Search, or pick a topic below.</p>
        </div></header>

        <div className="gwrap">
          <div className="faq-search">
            <span className="fs-ico" aria-hidden="true">🔍</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search all questions… (e.g. add-on, expiry, companion)"
              aria-label="Search the FAQ"
            />
            {query && <button className="fs-clear" onClick={() => setQ("")} aria-label="Clear search">Clear</button>}
          </div>

          {!searching && (
            <>
              <div className="cat-cards">
                {CATEGORIES.map((c) => (
                  <a className="cat-card" key={c.id} href={"#" + c.id}>
                    <span className="cat-ic">{c.icon}</span>
                    <span className="cat-text">
                      <span className="cat-title">{c.title}</span>
                      <span className="cat-blurb">{c.blurb}</span>
                    </span>
                    {c.items.length > 0 && <span className="cat-count">{c.items.length}</span>}
                  </a>
                ))}
              </div>
              <div className="faq-tools">
                <button className="expand-all" onClick={() => setAllOpen((a) => !a)}>
                  {allOpen ? "Collapse all" : "Expand all"}
                </button>
              </div>
            </>
          )}

          {searching && (
            <p className="faq-count">
              {total === 0
                ? <>No questions match “{q.trim()}”. Try a simpler word.</>
                : <>{total} {total === 1 ? "question" : "questions"} matching “{q.trim()}”.</>}
            </p>
          )}

          {cats.map((c) => (
            <section className="faq-cat" id={c.id} key={c.id}>
              <div className="cat-head">
                <span className="cat-ic lg">{c.icon}</span>
                <div className="cat-head-text">
                  <h2>{c.title}</h2>
                  <p className="cat-desc">{c.blurb}</p>
                </div>
              </div>
              {c.intro.map((p, i) => (
                <div className="faq-intro" key={i} dangerouslySetInnerHTML={md(p)} />
              ))}
              {c.items.length > 0 && (
                <div className="faq-list">
                  {c.items.map((it, i) => (
                    <FaqItem key={i} item={it} forceOpen={searching || allOpen} />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="gwrap">
          <div className="cta">
            <h3>Ready to check your own flight?</h3>
            <p>See what your upgrade costs and when your window opens.</p>
            <a href="/#calculator">Open the calculator →</a>
          </div>
        </div>
      </main>

      <footer><div className="gwrap">
        <div className="disc"><b style={{ color: "var(--ink-2)" }}>eupgrade<span style={{ color: "var(--muted)" }}>.me</span></b> is an independent tool and is not affiliated with, endorsed by, or sponsored by Air Canada or Aeroplan. Some answers reflect patterns widely reported by flyers rather than officially published rules — treat them as strong patterns, not guarantees. Always confirm in the Air Canada app.</div>
      </div></footer>
    </div>
  );
}
