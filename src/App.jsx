import { useState, useEffect } from "react";
import Read from "./components/Read.jsx";
import Calculator from "./components/Calculator.jsx";
import Pricing from "./components/Pricing.jsx";
import { AIRPORTS } from "./airports.js";
import { TIERS } from "./rules.js";

const AP_OPTIONS = AIRPORTS.map((a) => (
  <option key={a.code} value={a.code}>{a.code} · {a.city}</option>
));

const HEADLINES = [
  ["Will your Air Canada", "upgrade ", "actually clear?"],
  ["Stop letting your", "eUpgrades ", "go to waste."],
  ["eUpgrades expiring?", "Spend them ", "where they count."],
  ["Know before you book", "if that upgrade ", "will clear."],
  ["Turn credits into", "front-cabin ", "seats."],
];

function RotatingHeadline() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setI((n) => (n + 1) % HEADLINES.length);
        setShow(true);
      }, 350);
    }, 3800);
    return () => clearInterval(t);
  }, []);
  const [a, g, b] = HEADLINES[i];
  return (
    <h1 className="hero-h1">
      <span className={"h-swap " + (show ? "in" : "out")}>
        {a}<br /><span className="g">{g}</span>{b}
      </span>
    </h1>
  );
}

export default function App() {
  const [trip, setTrip] = useState({
    from: "YYZ", to: "NRT", status: "SUPER_ELITE",
    cabin: "J", fare: "Y_FLEX", cls: "V", purchase: "CASH",
  });
  const set = (k, v) => setTrip((s) => ({ ...s, [k]: v }));

  const scrollToCalc = () => {
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav><div className="wrap">
        <div className="brand"><span className="glyph">&uarr;</span>eupgrade</div>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#calculator">Calculator</a>
          <a href="#pricing">Pricing</a>
          <a className="nav-cta" href="#pricing">Try Pro free</a>
        </div>
      </div></nav>

      <header><div className="wrap">
        <div className="pill rise d1"><span className="d"></span> For Aeroplan flyers who hate wasting credits</div>
        <RotatingHeadline />
        <p className="lede rise d2">Check any flight and get a straight answer — what the upgrade costs, when your window opens, and how likely it is to clear based on live premium-cabin availability.</p>

        <div className="search rise d3">
          <div className="search-row">
            <div className="sf br"><div className="k">From</div>
              <select value={trip.from} onChange={(e) => set("from", e.target.value)}>{AP_OPTIONS}</select></div>
            <div className="sf br"><div className="k">To</div>
              <select value={trip.to} onChange={(e) => set("to", e.target.value)}>{AP_OPTIONS}</select></div>
            <div className="sf"><div className="k">Your status</div>
              <select value={trip.status} onChange={(e) => set("status", e.target.value)}>
                {TIERS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
            <button className="go" onClick={scrollToCalc}>Check &rarr;</button>
          </div>
        </div>
        <div className="helper rise d4">
          <span><span className="ok">&#10003;</span> No sign-up to check</span>
          <span><span className="ok">&#10003;</span> Next 3 days free</span>
          <span><span className="ok">&#10003;</span> Independent — not Air Canada</span>
        </div>

        <Read iClass={9} />
      </div></header>

      <section id="how"><div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">How it works</div>
          <h2>Three reads, one clear answer</h2>
          <p>We combine what Air Canada publishes with what only real flyers can see.</p>
        </div>
        <div className="cards3">
          <div className="c3"><div className="ic">&#9678;</div><h3>Cost, exactly</h3><p>Your credits and cash add-on for the specific fare and route — straight from Air Canada's published charts, with the Super Elite waiver applied automatically.</p></div>
          <div className="c3"><div className="ic">&#9719;</div><h3>Timing that matters</h3><p>When your clearance window opens, and the 36-hour wall where every request gets waitlisted. Miss it and even an empty cabin won't help.</p></div>
          <div className="c3"><div className="ic">&#128200;</div><h3>Odds from real space</h3><p>How much premium space is actually open, translated into a plain likelihood — and getting sharper every time a flyer shares a real outcome.</p></div>
        </div>
      </div></section>

      <section style={{ paddingTop: 8 }}><div className="wrap"><Calculator trip={trip} setTrip={setTrip} /></div></section>

      <Pricing />

      <section><div className="wrap">
        <div className="sec-head"><div className="eyebrow">Straight answers</div><h2>Good to know</h2></div>
        <div className="faq">
          <div><div className="q">How can you predict an upgrade?</div><div className="a">We read how much premium-cabin space is open for your flight and turn it into a likelihood. It's an estimate that improves as flyers contribute real outcomes — and we always label how confident it is.</div></div>
          <div><div className="q">Is this affiliated with Air Canada?</div><div className="a">No — it's an independent tool built by a frequent flyer. Costs come from Air Canada's published charts. Always confirm in the AC app before you travel.</div></div>
          <div><div className="q">Why only 3 days free?</div><div className="a">Checking a near-term flight shows the tool working on real, live availability. Pro extends that to any future date so you can plan and book with confidence.</div></div>
          <div><div className="q">What does Pro do beyond predictions?</div><div className="a">It tracks your credit balance and expiry, alerts you the moment a flight's request window opens, and points you at the best-value flights to burn credits on before they reset.</div></div>
        </div>
      </div></section>

      <footer><div className="wrap">
        <div className="disc"><b style={{ color: "var(--ink-2)" }}>eupgrade</b> is an independent tool and is not affiliated with, endorsed by, or sponsored by Air Canada or Aeroplan. "Air Canada", "Aeroplan" and "eUpgrade" are trademarks of their respective owners, referenced only to describe the program this tool helps you navigate. Likelihood estimates are just that — estimates. Always confirm details in the Air Canada app before travelling.</div>
        <div className="foot-links"><a href="#calculator">Calculator</a><a href="#pricing">Pricing</a><a href="#how">How it works</a></div>
      </div></footer>
    </>
  );
}
