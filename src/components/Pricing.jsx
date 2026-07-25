import { useState } from "react";

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  return (
    <section id="pricing" style={{ background: "linear-gradient(180deg,transparent,#eef1fa)" }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Pricing</div>
          <h2>Free to use. Pro if you plan ahead.</h2>
          <p>The calculator is free for every route, fare and status — no sign-up. Pro is optional: it keeps your credits from expiring and tells you the moment you can request.</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <div className="toggle">
            <button className={annual ? "" : "on"} onClick={() => setAnnual(false)}>Monthly</button>
            <button className={annual ? "on" : ""} onClick={() => setAnnual(true)}>Annual <span className="save">SAVE 16%</span></button>
          </div>
        </div>
        <div className="plans">
          <div className="plan">
            <h3>Free</h3><div className="price">$0</div><div className="cy">Always.</div>
            <ul>
              <li><span className="c">&#10003;</span> Full cost &amp; add-on calculator</li>
              <li><span className="c">&#10003;</span> Clearance window + 36-hour cutoff</li>
              <li><span className="c">&#10003;</span> Every route, fare &amp; status tier</li>
              <li><span className="c">&#10003;</span> No sign-up, no limits</li>
            </ul>
            <a className="btn ghost" href="#calculator">Check a flight</a>
          </div>
          <div className="plan pro">
            <div className="tag">Most popular</div>
            <h3>Pro</h3>
            <div className="price">{annual ? "$4.17" : "$4.99"}<small>/mo</small></div>
            <div className="cy">{annual ? "$49.99 billed yearly" : "billed monthly · cancel anytime"}</div>
            <ul>
              <li><span className="c">&#10003;</span> <b>Credit-expiry tracker</b> — never lose a credit</li>
              <li><span className="c">&#10003;</span> <b>Window-opening alerts</b> the moment you're eligible</li>
              <li><span className="c">&#10003;</span> Best-value flights to spend credits on</li>
              <li><span className="c">&#10003;</span> Saved trips &amp; multi-segment planning</li>
              <li><span className="c">&#10003;</span> Early access to clearance predictions</li>
            </ul>
            <a className="btn primary" href="#pricing">Start 7-day free trial</a>
          </div>
        </div>
      </div>
    </section>
  );
}
