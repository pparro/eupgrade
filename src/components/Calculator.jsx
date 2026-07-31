import { useMemo } from "react";
import { Link } from "react-router-dom";
import { quote, windowInfo, TIERS, FARES, CLASSES } from "../rules.js";
import { AIRPORTS, distanceMiles, zoneFor, airport } from "../airports.js";
import { ROUTES, routeSlug } from "../routes-data.js";
import Timeline from "./Timeline.jsx";

const AP_OPTIONS = AIRPORTS.map((a) => (
  <option key={a.code} value={a.code}>{a.code} · {a.city}</option>
));

export default function Calculator({ trip, setTrip }) {
  const set = (k, v) => setTrip((s) => ({ ...s, [k]: v }));

  const miles = useMemo(() => distanceMiles(trip.from, trip.to), [trip.from, trip.to]);
  const zone = useMemo(() => zoneFor(trip.from, trip.to), [trip.from, trip.to]);

  const res = useMemo(() => {
    if (!miles || !zone) return null;
    return quote({
      tier: trip.status, zone, miles,
      fare: trip.fare, cls: trip.cls, cabin: trip.cabin, purchase: trip.purchase,
    });
  }, [miles, zone, trip.status, trip.fare, trip.cls, trip.cabin, trip.purchase]);

  const win = useMemo(
    () => (zone ? windowInfo(trip.status, zone, trip.fare) : null),
    [trip.status, zone, trip.fare]
  );

  const A = airport(trip.from), B = airport(trip.to);
  const sameAirport = trip.from === trip.to;
  const routeGuide = ROUTES[routeSlug(trip.from, trip.to)];

  return (
    <div className="board" id="calculator">
      <div className="board-head">Upgrade cost &amp; window<span className="free">Free</span></div>
      <div className="board-body">
        <div className="grid">
          <label className="field"><div className="lab">From</div>
            <select value={trip.from} onChange={(e) => set("from", e.target.value)}>{AP_OPTIONS}</select></label>
          <label className="field"><div className="lab">To</div>
            <select value={trip.to} onChange={(e) => set("to", e.target.value)}>{AP_OPTIONS}</select></label>

          <label className="field"><div className="lab">Your Aeroplan status</div>
            <select value={trip.status} onChange={(e) => set("status", e.target.value)}>
              {TIERS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
          <label className="field"><div className="lab">Upgrade to</div>
            <select value={trip.cabin} onChange={(e) => set("cabin", e.target.value)}>
              <option value="J">Business</option>
              <option value="PY">Premium Economy</option></select></label>

          <label className="field"><div className="lab">Fare brand</div>
            <select value={trip.fare} onChange={(e) => set("fare", e.target.value)}>
              {FARES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
          <label className="field"><div className="lab">Booking class</div>
            <select value={trip.cls} onChange={(e) => set("cls", e.target.value)}>
              {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}</select>
            <div className="hint">The single letter on your ticket. Not sure? It's in your booking confirmation.</div></label>

          <label className="field"><div className="lab">Ticket type</div>
            <select value={trip.purchase} onChange={(e) => set("purchase", e.target.value)}>
              <option value="CASH">Cash fare</option>
              <option value="REWARD">Points / reward</option></select></label>
          <div className="field"><div className="lab">Segment</div>
            <div className="segbox">
              {A && B && miles
                ? <><b>{A.code}&rarr;{B.code}</b> · {miles.toLocaleString()} mi · {zone === "NA_SUN" ? "North America / Sun" : "International"}</>
                : "Choose two airports"}
            </div>
          </div>
        </div>

        <div className="result" aria-live="polite">
          {sameAirport ? (
            <div className="ineligible">Origin and destination are the same — choose two different airports to see the cost.</div>
          ) : !res ? (
            <div className="ineligible">Pick your origin and destination to see the cost.</div>
          ) : !res.ok ? (
            <div className="ineligible">{res.why}</div>
          ) : (
            <>
              <div className="figures">
                <div className="fig"><div className="k">eUpgrade credits</div>
                  <div className="v accent">{res.credits}</div></div>
                <div className="fig"><div className="k">Cash add-on</div>
                  {res.addon > 0
                    ? <div className="v">{res.isMin ? "from " : ""}${res.addon}<small> CAD</small></div>
                    : <div className="v accent">$0</div>}
                  {res.waived && <span className="badge">Super Elite — add-on waived</span>}
                </div>
              </div>
              <Timeline days={win.days} any={win.any} />
              <div className="note"><span>&#9873;</span><div>
                <b>{win.txt}</b> Anything inside 36 hours of departure is waitlisted regardless of open seats, and settled at the gate once check-in closes.
              </div></div>
              {routeGuide && (
                <Link className="route-guide-link" to={`/routes/${routeGuide.slug}`}>
                  <span>&#128220;</span> Read the full {A.code}&rarr;{B.code} eUpgrade route guide &rarr;
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
