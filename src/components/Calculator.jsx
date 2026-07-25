import { useState, useMemo } from "react";
import { quote, windowInfo, TIERS, FARES, CLASSES } from "../rules.js";
import Timeline from "./Timeline.jsx";

export default function Calculator() {
  const [f, setF] = useState({
    tier: "SUPER_ELITE", zone: "INTERNATIONAL", miles: 7000,
    fare: "Y_FLEX", cls: "V", cabin: "J", purchase: "CASH",
  });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const res = useMemo(() => quote(f), [f]);
  const win = useMemo(() => windowInfo(f.tier, f.zone, f.fare), [f]);

  return (
    <div className="board" id="calculator">
      <div className="board-head">Upgrade cost &amp; window<span className="free">Free</span></div>
      <div className="board-body">
        <div className="grid">
          <label className="field"><div className="lab">Your status</div>
            <select value={f.tier} onChange={(e) => set("tier", e.target.value)}>
              {TIERS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
          <label className="field"><div className="lab">Region</div>
            <select value={f.zone} onChange={(e) => set("zone", e.target.value)}>
              <option value="NA_SUN">North America / Sun</option>
              <option value="INTERNATIONAL">International</option></select></label>
          <label className="field"><div className="lab">Distance (miles)</div>
            <input type="number" value={f.miles} min="0"
              onChange={(e) => set("miles", parseInt(e.target.value || "0"))} />
            <div className="hint">One-way segment distance.</div></label>
          <label className="field"><div className="lab">Upgrade to</div>
            <select value={f.cabin} onChange={(e) => set("cabin", e.target.value)}>
              <option value="J">Business</option>
              <option value="PY">Premium Economy</option></select></label>
          <label className="field"><div className="lab">Fare brand</div>
            <select value={f.fare} onChange={(e) => set("fare", e.target.value)}>
              {FARES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
          <label className="field"><div className="lab">Booking class</div>
            <select value={f.cls} onChange={(e) => set("cls", e.target.value)}>
              {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}</select>
            <div className="hint">The single letter on your ticket.</div></label>
          <label className="field"><div className="lab">Ticket type</div>
            <select value={f.purchase} onChange={(e) => set("purchase", e.target.value)}>
              <option value="CASH">Cash fare</option>
              <option value="REWARD">Points / reward</option></select></label>
        </div>

        <div className="result">
          {!res.ok ? (
            <div className="ineligible">{res.why}</div>
          ) : (
            <>
              <div className="figures">
                <div className="fig"><div className="k">eUpgrade credits</div>
                  <div className="v indigo">{res.credits}</div></div>
                <div className="fig"><div className="k">Cash add-on</div>
                  {res.addon > 0
                    ? <div className="v">{res.isMin ? "from " : ""}${res.addon}<small> CAD</small></div>
                    : <div className="v mint">$0</div>}
                  {res.waived && <span className="badge">Super Elite — add-on waived</span>}
                </div>
              </div>
              <Timeline days={win.days} any={win.any} />
              <div className="note"><span>&#9873;</span><div>
                <b>{win.txt}</b> Anything inside 36 hours of departure is waitlisted regardless of open seats, and settled at the gate once check-in closes.
              </div></div>
              <div className="locked">
                <div className="lk">&#128200;</div>
                <div>
                  <div className="h">Clearance likelihood <span className="soon">Early access</span></div>
                  <div className="s">Estimated from live premium-cabin availability. Search a flight up top to see it.</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
