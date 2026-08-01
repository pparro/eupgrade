import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./components/Logo.jsx";
import Calculator from "./components/Calculator.jsx";
import Pricing from "./components/Pricing.jsx";
import { subscribeEmail } from "./notify.js";
import { airport } from "./airports.js";

const BASE_TRIP = {
  from: "YYZ", to: "NRT", status: "SUPER_ELITE",
  cabin: "J", fare: "Y_FLEX", cls: "V", purchase: "CASH",
};

// Pre-fill the calculator from ?from=YYZ&to=YVR when arriving from a route or
// flight page. Only accept codes that are real airports so a bad link falls
// back to the defaults rather than breaking the calculator.
function initialTrip() {
  if (typeof window === "undefined") return BASE_TRIP;
  const q = new URLSearchParams(window.location.search);
  const from = (q.get("from") || "").toUpperCase();
  const to = (q.get("to") || "").toUpperCase();
  return {
    ...BASE_TRIP,
    from: airport(from) ? from : BASE_TRIP.from,
    to: airport(to) ? to : BASE_TRIP.to,
  };
}

function NotifyForm({ cta = "Get early access" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | done | error
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!value || status === "submitting") return;
    setStatus("submitting");
    setError("");
    try {
      await subscribeEmail(value);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(
        err.code === "not-configured"
          ? "Early access isn't open just yet — check back soon."
          : "Something went wrong. Please try again."
      );
    }
  };

  if (status === "done") {
    return (
      <div className="notify-done" role="status">
        <span className="ok">&#10003;</span> You're on the list — we'll email you the moment the forecast goes live.
      </div>
    );
  }

  const busy = status === "submitting";
  return (
    <>
      <form className="notify" onSubmit={submit}>
        <input
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          aria-label="Email address"
          placeholder="you@email.com"
          value={email}
          disabled={busy}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={busy || !email.trim()}>
          {busy ? "Adding you…" : cta}
        </button>
      </form>
      {status === "error" && <p className="notify-error" role="alert">{error}</p>}
    </>
  );
}

export default function App() {
  const [trip, setTrip] = useState(initialTrip);

  // Scroll to the calculator after render when linked with #calculator (the
  // browser's native hash scroll can fire before React paints the section).
  useEffect(() => {
    if (window.location.hash !== "#calculator") return;
    const el = document.getElementById("calculator");
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
  }, []);

  return (
    <>
      <nav><div className="wrap">
        <div className="brand"><Logo /><span className="word">eupgrade<span className="me">.me</span></span></div>
        <div className="nav-links">
          <a href="#predictions">Predictions</a>
          <a href="#calculator">Calculator</a>
          <Link to="/guide">Guide</Link>
          <a href="#pricing">Pricing</a>
          <a className="nav-cta" href="#early-access">Get early access</a>
        </div>
      </div></nav>

      <main>
        <header id="predictions"><div className="wrap">
          <div className="pill rise d1"><span className="d"></span> Prediction model — in development</div>
          <h1 className="hero-h1 rise d2">See how likely your upgrade is <span className="g">to clear.</span></h1>
          <p className="lede rise d2">We got tired of guessing whether an eUpgrade would clear — so we're building the forecast Air Canada never gave us.</p>
          <p className="hero-tertiary rise d3">It'll weigh seat inventory, historical clearance patterns, and more. It's not live yet — join the early-access list and we'll tell you the moment it is.</p>
          <div className="hero-cta rise d3"><NotifyForm /></div>
          <a className="ghost-link rise d4" href="#calculator">Or try the free calculator &rarr;</a>
        </div></header>

        <section id="how"><div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">How the forecast will work</div>
            <h2>Two ways to find your upgrade's chances</h2>
            <p>Both are part of the prediction model we're building. Live today: the free calculator further down gives you the exact cost and clearance window.</p>
          </div>
          <div className="paths">
            <div className="path">
              <div className="path-top"><span className="ic">&#128197;</span><span className="soon-tag">Coming soon</span></div>
              <h3>Explore a route</h3>
              <p>Flexible on dates? Enter a route like Toronto &rarr; London and see upcoming dates colour-coded by clearance probability — so you can book, or shift your trip toward, the best ones.</p>
            </div>
            <div className="path">
              <div className="path-top"><span className="ic">&#127919;</span><span className="soon-tag">Coming soon</span></div>
              <h3>Check a specific flight</h3>
              <p>Already booked? Enter your flight, status, and cabin for a full probability breakdown of that exact upgrade.</p>
            </div>
          </div>
        </div></section>

        <section><div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">Free today</div>
            <h2>The eUpgrade calculator</h2>
            <p>While the forecast is in the works, this is live and free — the exact credit cost, any cash add-on, and your clearance window for any Air Canada flight.</p>
          </div>
          <div style={{ marginTop: 30 }}><Calculator trip={trip} setTrip={setTrip} /></div>
        </div></section>

        <section id="features"><div className="wrap">
          <div className="sec-head"><div className="eyebrow">What you get</div><h2>Free forever — Pro when the forecast lands</h2></div>
          <div className="feat-hero">
            <div className="feat-tag pro">Pro · Coming soon</div>
            <h3>Flight-specific probability forecast</h3>
            <p>The heart of it: a clear, honest probability that your exact upgrade clears — built from real flight data once we've logged enough of it. This is what the whole model is for.</p>
          </div>
          <div className="feat-grid">
            <div className="feat"><span className="feat-live">&#10003; Live</span><b>Credit cost calculator</b><span>Exact credits and cash add-on for any route, fare, and status.</span></div>
            <div className="feat"><span className="feat-live">&#10003; Live</span><b>Clearance window guide</b><span>When your request can clear, and the 36-hour cutoff.</span></div>
            <div className="feat"><span className="feat-live">&#10003; Live</span><b>Per-route guides</b><span>Cabin config, cost, and priority for specific routes.</span></div>
            <div className="feat"><span className="feat-tag">Free · Soon</span><b>Route explorer</b><span>A calendar of dates, colour-coded by clearance probability.</span></div>
            <div className="feat"><span className="feat-tag pro">Pro · Soon</span><b>Window-opening alerts</b><span>A ping the moment your upgrade window opens.</span></div>
            <div className="feat"><span className="feat-tag pro">Pro · Soon</span><b>Route comparison</b><span>Every flight on a route, sortable by clearance probability.</span></div>
          </div>
        </div></section>

        <Pricing />

        <section><div className="wrap">
          <div className="sec-head"><div className="eyebrow">Before you ask</div><h2>Good to know</h2></div>
          <div className="faq">
            <div><div className="q">How accurate is the prediction?</div><div className="a">We can't say yet — the model is still in development. We'll publish validated accuracy from real flights before it ever sits behind a paywall. No numbers until they're real.</div></div>
            <div><div className="q">Is this affiliated with Air Canada?</div><div className="a">No — it's an independent tool built by a frequent flyer. Costs come from Air Canada's published charts. Always confirm in the AC app before you travel.</div></div>
            <div><div className="q">Do you sell my data?</div><div className="a">No. We don't sell your data. The only thing we collect right now is an email address, and only if you choose to join the early-access list.</div></div>
            <div><div className="q">What's the difference between Free and Pro?</div><div className="a">The calculator and guides are free forever. Pro will add the flight-specific forecast, window-opening alerts, and route comparison once the model is live.</div></div>
          </div>
          <div style={{ textAlign: "center", marginTop: 26 }}>
            <Link className="guide-link" to="/faq">More questions? See the full FAQ &rarr;</Link>
          </div>
        </div></section>

        <section id="early-access" className="soon-band"><div className="wrap">
          <div className="soon-inner">
            <div className="eyebrow">Early access</div>
            <h2>Be first to know if your upgrade will clear</h2>
            <p>Get early access to the prediction model — or use the free calculator right now.</p>
            <NotifyForm />
            <a className="ghost-link" href="#calculator" style={{ marginTop: 18 }}>Open the calculator &rarr;</a>
          </div>
        </div></section>
      </main>

      <footer><div className="wrap">
        <div className="disc"><b style={{ color: "var(--ink-2)" }}>eupgrade<span style={{ color: "var(--muted)" }}>.me</span></b> is an independent tool and is not affiliated with, endorsed by, or sponsored by Air Canada or Aeroplan. "Air Canada", "Aeroplan" and "eUpgrade" are trademarks of their respective owners, referenced only to describe the program this tool helps you navigate. The prediction model is in development; the calculator reflects Air Canada's published charts — always confirm details in the Air Canada app before travelling.</div>
        <div className="foot-links"><a href="#calculator">Calculator</a><Link to="/guide">Guide</Link><Link to="/faq">FAQ</Link><a href="#pricing">Pricing</a></div>
      </div></footer>
    </>
  );
}
