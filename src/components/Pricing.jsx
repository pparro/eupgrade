import { useState } from "react";

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  return (
    <section id="pricing" style={{ background: "linear-gradient(180deg,transparent,#eef1fa)" }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Pricing</div>
          <h2>Free to check. Pro to plan ahead.</h2>
          <p>Check any flight departing in the next 3 days for free — see the tool work on real availability. Pro unlocks every future date, plus the tools that keep your credits from expiring.</p>
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
              <li><span className="c">&#10003;</span> Clearance window + 36-hour wall</li>
              <li><span className="c">&#10003;</span> Likelihood read for flights within 3 days</li>
              <li><span className="c">&#10003;</span> Every route, fare &amp; status tier</li>
            </ul>
            <a className="btn ghost" href="#calculator">Check a flight</a>
          </div>
          <div className="plan pro">
            <div className="tag">Most popular</div>
            <h3>Pro</h3>
            <div className="price">{annual ? "$4.17" : "$4.99"}<small>/mo</small></div>
            <div className="cy">{annual ? "$49.99 billed yearly" : "billed monthly · cancel anytime"}</div>
            <ul>
              <li><span className="c">&#10003;</span> Likelihood reads for <b>any future date</b></li>
              <li><span className="c">&#10003;</span> <b>Credit-expiry tracker</b> — never lose a credit</li>
              <li><span className="c">&#10003;</span> <b>Window-opening alerts</b> the moment you're eligible</li>
              <li><span className="c">&#10003;</span> Best-value flights to spend credits on</li>
              <li><span className="c">&#10003;</span> Saved trips &amp; multi-segment planning</li>
            </ul>
            <a className="btn primary" href="#pricing">Start 7-day free trial</a>
          </div>
        </div>
      </div>
    </section>
  );
}
