import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./components/Logo.jsx";
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

function NotifyForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };
  if (done) {
    return (
      <div className="notify-done">
        <span className="ok">&#10003;</span> Thanks — we'll email you when predictions go live.
      </div>
    );
  }
  return (
    <form className="notify" onSubmit={submit}>
      <input
        type="email"
        required
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Notify me</button>
    </form>
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
        <div className="brand"><Logo /><span className="word">eupgrade<span className="me">.me</span></span></div>
        <div className="nav-links">
          <Link to="/guide">Guide</Link>
          <a href="#how">How it works</a>
          <a href="#calculator">Calculator</a>
          <a href="#pricing">Pricing</a>
          <a className="nav-cta" href="#calculator">Check a flight</a>
        </div>
      </div></nav>

      <header><div className="wrap">
        <div className="pill rise d1"><span className="d"></span> A free eUpgrade tool for Aeroplan flyers</div>
        <RotatingHeadline />
        <p className="lede rise d2">Understand your eUpgrade instantly — free. Check any Air Canada flight and see exactly what the upgrade costs in credits, any cash add-on, and when your clearance window opens.</p>
        <Link className="guide-link rise d2" to="/guide">New to eUpgrades? Start here &rarr;</Link>

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
          <span><span className="ok">&#10003;</span> Free — every route &amp; status</span>
          <span><span className="ok">&#10003;</span> Independent — not Air Canada</span>
        </div>
      </div></header>

      <section id="how"><div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">How it works</div>
          <h2>One clear answer for any flight</h2>
          <p>Enter your flight and status. The calculator shows you exactly where you stand — for any Aeroplan tier, or no status at all on a Latitude fare.</p>
        </div>
        <div className="cards3">
          <div className="c3"><div className="ic">&#9678;</div><h3>What it costs</h3><p>The exact number of eUpgrade credits your upgrade needs for that route and fare — plus any cash add-on Air Canada charges on top.</p></div>
          <div className="c3"><div className="ic">&#9719;</div><h3>When you can request</h3><p>When your clearance window opens for your status, and the 36-hour cutoff before departure after which every request is waitlisted.</p></div>
          <div className="c3"><div className="ic">&#9992;</div><h3>Works for everyone</h3><p>Every route, every fare brand, every Aeroplan status — including flyers with no status at all upgrading a Latitude fare.</p></div>
        </div>
      </div></section>

      <section style={{ paddingTop: 8 }}><div className="wrap"><Calculator trip={trip} setTrip={setTrip} /></div></section>

      <Pricing />

      <section><div className="wrap">
        <div className="sec-head"><div className="eyebrow">Straight answers</div><h2>Good to know</h2></div>
        <div className="faq">
          <div><div className="q">Do you tell me if my upgrade will clear?</div><div className="a">Not yet — that's what we're building. The calculator gives you the cost and timing today; clearance predictions from real flight data are coming soon, and you can sign up below to hear when they land.</div></div>
          <div><div className="q">Is this affiliated with Air Canada?</div><div className="a">No — it's an independent tool built by a frequent flyer. Costs come from Air Canada's published charts. Always confirm in the AC app before you travel.</div></div>
          <div><div className="q">Is it really free?</div><div className="a">Yes. The calculator is free for any route, fare and status, with no sign-up. Pro is optional and only adds planning tools on top.</div></div>
          <div><div className="q">What does Pro add?</div><div className="a">It tracks your credit balance and expiry, alerts you the moment a flight's request window opens, and points you at the best-value flights to burn credits on before they reset.</div></div>
        </div>
      </div></section>

      <section id="predictor" className="soon-band"><div className="wrap">
        <div className="soon-inner">
          <div className="eyebrow">Coming soon</div>
          <h2>Coming soon: will it actually clear?</h2>
          <p>We're building upgrade-clearance predictions from real flight data — so you'll know your odds before you commit a credit. Want to know when it's ready?</p>
          <NotifyForm />
        </div>
      </div></section>

      <footer><div className="wrap">
        <div className="disc"><b style={{ color: "var(--ink-2)" }}>eupgrade<span style={{ color: "var(--muted)" }}>.me</span></b> is an independent tool and is not affiliated with, endorsed by, or sponsored by Air Canada or Aeroplan. "Air Canada", "Aeroplan" and "eUpgrade" are trademarks of their respective owners, referenced only to describe the program this tool helps you navigate. Likelihood estimates are just that — estimates. Always confirm details in the Air Canada app before travelling.</div>
        <div className="foot-links"><a href="#calculator">Calculator</a><a href="#pricing">Pricing</a><a href="#how">How it works</a></div>
      </div></footer>
    </>
  );
}
