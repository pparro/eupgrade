import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Logo from "./components/Logo.jsx";
import { ROUTES, routeSlug } from "./routes-data.js";
import { RULES, FARES, band } from "./rules.js";
import { distanceMiles, zoneFor, airport } from "./airports.js";

const FARE_LABEL = Object.fromEntries(FARES);
const ZONE_LABEL = { NA_SUN: "North America / Sun", INTERNATIONAL: "International" };

/* Live cost rows straight from the rules engine, so this page and the
   calculator can never show different numbers for the same route + band. */
function costRows(zone, miles, cabin, purchase = "CASH") {
  const b = band(zone, miles);
  const chart = RULES.charts[`${zone}|${cabin}|${purchase}`];
  if (!b || !chart) return [];
  return chart
    .map(([fare, classes, cells]) => {
      const cell = cells[b];
      if (!cell) return null;
      const [credits, addon = 0, isMin = false, seWaive = false] = cell;
      return {
        fare,
        fareLabel: FARE_LABEL[fare] || fare,
        classes: classes === "ALL" ? "All booking classes" : classes.join(", "),
        credits,
        addon,
        isMin,
        seWaive,
      };
    })
    .filter(Boolean);
}

function CostTable({ zone, miles, cabin, title }) {
  const rows = costRows(zone, miles, cabin);
  if (!rows.length) return null;
  const anyWaive = rows.some((r) => r.seWaive);
  return (
    <div className="route-table-wrap">
      <h3>{title}</h3>
      <table className="route-table">
        <thead>
          <tr><th>Fare brand</th><th>Booking classes</th><th>eUpgrade credits</th><th>Cash add-on</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.fareLabel}</td>
              <td className="mono">{r.classes}</td>
              <td><b>{r.credits}</b></td>
              <td>{r.addon > 0 ? `${r.isMin ? "from " : ""}$${r.addon}${r.seWaive ? "*" : ""}` : "$0"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {anyWaive && <p className="route-fine">* Cash add-on is waived for Super Elite members on international upgrades.</p>}
    </div>
  );
}

function NotFound({ slug }) {
  // Resolve an unbuilt slug (e.g. a related-route link) into a friendly page.
  const [oc, dc] = (slug || "").toUpperCase().split("-");
  const o = oc && airport(oc), d = dc && airport(dc);
  return (
    <div className="routepage">
      <nav><div className="wrap">
        <a className="brand" href="/"><Logo /><span className="word">eupgrade<span className="me">.me</span></span></a>
        <a className="back" href="/#calculator">← Back to the calculator</a>
      </div></nav>
      <main><div className="gwrap prose" style={{ textAlign: "center", paddingTop: 40 }}>
        <div className="eyebrow">Route guide</div>
        <h1 style={{ margin: "10px 0 12px" }}>
          {o && d ? `${o.city} (${o.code}) → ${d.city} (${d.code})` : "This route"}
        </h1>
        <p>We haven't published a full guide for this route yet — it's on the list. In the meantime, the calculator works for every route, fare, and status.</p>
        <div className="cta" style={{ marginTop: 28 }}>
          <h3>Check this route now</h3>
          <p>See the exact eUpgrade cost and clearance window for any flight.</p>
          <a href="/#calculator">Open the calculator →</a>
        </div>
        <p style={{ marginTop: 24 }}><Link className="c3-link" to="/guide">Read the full eUpgrade guide →</Link></p>
      </div></main>
    </div>
  );
}

export default function RoutePage() {
  const { slug } = useParams();
  const data = ROUTES[slug];

  useEffect(() => {
    if (!data) return;
    const prevTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta ? meta.content : null;
    document.title = `${data.origin.city} to ${data.dest.city} eUpgrade Guide — Air Canada Clearance Rules | eupgrade.me`;
    if (meta) meta.content = `How Air Canada eUpgrade works on ${data.origin.city}–${data.dest.city} flights: cabin config, eUpgrade credit cost, fare classes, and clearance priority.`;
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc != null) meta.content = prevDesc;
    };
  }, [data]);

  if (!data) return <NotFound slug={slug} />;

  const O = data.origin, D = data.dest;
  const pair = `${O.code}–${D.code}`;
  const miles = distanceMiles(O.code, D.code);
  const zone = zoneFor(O.code, D.code);
  const hasPE = data.cabins.premiumEconomy != null;

  return (
    <div className="routepage">
      <nav><div className="wrap">
        <a className="brand" href="/"><Logo /><span className="word">eupgrade<span className="me">.me</span></span></a>
        <a className="back" href="/#calculator">← Back to the calculator</a>
      </div></nav>

      <main>
        <header><div className="gwrap">
          <div className="eyebrow">Air Canada eUpgrade Guide</div>
          <h1>{O.city} ({O.code}) <span className="g">→</span> {D.city} ({D.code})</h1>
          <p className="route-stats">
            <span>Distance: <b>{data.distanceKm.toLocaleString()} km</b></span>
            <span>Typical aircraft: <b>{data.aircraft}</b></span>
            <span>Flight time: <b>~{data.flightTime}</b></span>
          </p>
        </div></header>

        <div className="gwrap prose">
          <p>Flying from {O.city} to {D.city} on Air Canada and wondering about eUpgrade? Here's what applies on this specific route — cabin layout, which fares are eligible, what it costs in eUpgrade credits, and how clearance priority works. We're building a live clearance-odds tracker for {pair}; until we have enough flight history to back a real number, here's exactly how the rules apply.</p>

          <h2>Cabin on this route</h2>
          <p>The {data.aircraft.split(" / ")[0]} flying {pair} is typically configured with:</p>
          <ul>
            <li><b>{data.cabins.business}</b> Business Class seats</li>
            {hasPE && <li><b>{data.cabins.premiumEconomy}</b> Premium Economy seats</li>}
            <li><b>{data.cabins.economy}</b> Economy seats</li>
          </ul>
          <p className="route-fine">Route flown {data.frequency}.</p>

          <h2>What it costs to eUpgrade on {pair}</h2>
          <CostTable zone={zone} miles={miles} cabin="J" title="Upgrade to Business" />
          {hasPE && <CostTable zone={zone} miles={miles} cabin="PY" title="Upgrade to Premium Economy" />}
          <p className="route-fine">Costs shown are Air Canada's published eUpgrade credit rates for this cabin distance band ({ZONE_LABEL[zone]}) — they apply the same way across every route in this distance tier, not just {pair}. Exact cost depends on your specific booking class; the <Link to="/#calculator">calculator</Link> works it out for your trip.</p>

          <h2>Clearance priority on this route</h2>
          <p>Like every eUpgrade request, priority on {pair} is set by:</p>
          <ol>
            <li><b>Aeroplan Elite tier</b> — Super Elite &gt; 75K &gt; 50K &gt; 35K &gt; 25K</li>
            <li><b>Status tenure / match date</b> within tier</li>
            <li><b>Fare class booked</b> — higher fare classes clear first within the same tier</li>
          </ol>
          {data.routeNote && <p>{data.routeNote}</p>}
          <p>For the general clearance window timeline (when requests typically clear relative to departure), see our <Link to="/guide">full eUpgrade guide</Link>.</p>

          <h2>Real clearance data for this route — coming soon</h2>
          <p>We're tracking live fare-class availability and crowdsourced clearance outcomes for {pair}. Once we have enough flights logged, this section will show actual clearance probability by fare class and days-before-departure, with honest confidence intervals — not just what the rules say should happen, but what actually does.</p>
          <p><a className="c3-link" href="/#predictor">Get notified when this route has data →</a></p>

          <h2>Other routes from {O.city}</h2>
          <ul className="route-links">
            {data.related.map((r) => (
              <li key={r.code}>
                <Link to={`/routes/${routeSlug(O.code, r.code)}`}>{O.city} → {r.city} ({r.code})</Link>
              </li>
            ))}
          </ul>
        </div>

        <footer><div className="gwrap">
          <div className="disc">eUpgrade costs and rules shown here are based on Air Canada's published eUpgrade credit chart combined with our own tracking of fare-class availability. Where we don't yet have enough flight history for a route, we show you the rules rather than guessing. Read more about <Link to="/guide">how eUpgrade clearance works</Link>.</div>
        </div></footer>
      </main>
    </div>
  );
}
