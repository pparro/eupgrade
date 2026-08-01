import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Logo from "./components/Logo.jsx";
import CostTable, { ZONE_LABEL } from "./components/CostTable.jsx";
import ExampleNote from "./components/ExampleNote.jsx";
import { ROUTES, routeSlug, flightSlug } from "./routes-data.js";
import { routeSeo } from "./seo.js";
import { useHead } from "./use-head.js";
import { distanceMiles, zoneFor, airport } from "./airports.js";

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
        <h1 style={{ margin: "10px auto 12px" }}>
          {o && d ? `${o.city} (${o.code}) → ${d.city} (${d.code})` : "This route"}
        </h1>
        <p>We haven't published a full guide for this route yet — it's on the list. In the meantime, the calculator works for every route, fare, and status.</p>
        <div className="cta" style={{ marginTop: 28 }}>
          <h3>Check this route now</h3>
          <p>See the exact eUpgrade cost and clearance window for any flight.</p>
          <a href={o && d ? `/?from=${oc}&to=${dc}#calculator` : "/#calculator"}>Open the calculator →</a>
        </div>
        <p style={{ marginTop: 24 }}><Link className="c3-link" to="/guide">Read the full eUpgrade guide →</Link></p>
      </div></main>
    </div>
  );
}

export default function RoutePage() {
  const { slug } = useParams();
  const data = ROUTES[slug];
  useHead(useMemo(() => (data ? routeSeo(data) : null), [data]));

  if (!data) return <NotFound slug={slug} />;

  const O = data.origin, D = data.dest;
  const pair = `${O.code}–${D.code}`;
  const miles = distanceMiles(O.code, D.code);
  const zone = zoneFor(O.code, D.code);
  const calcHref = `/?from=${O.code}&to=${D.code}#calculator`;
  const hasPE = data.cabins ? data.cabins.premiumEconomy != null : !!data.hasPremiumEconomy;
  const flightCount = data.flights
    ? data.flights.always.length + data.flights.sometimes.length + data.flights.narrow.length
    : 0;

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

          <ExampleNote />

          {data.cabins && (
            <>
              <h2>Cabin on this route</h2>
              <p>The {data.aircraft.split(" / ")[0]} flying {pair} is typically configured with:</p>
              <ul>
                <li><b>{data.cabins.business}</b> Business Class seats</li>
                {hasPE && <li><b>{data.cabins.premiumEconomy}</b> Premium Economy seats</li>}
                <li><b>{data.cabins.economy}</b> Economy seats</li>
              </ul>
              <p className="route-fine">Route flown {data.frequency}.</p>
            </>
          )}

          {data.flights && (
            <>
              <h2>Flights on {pair}</h2>
              <p>{O.city}–{D.city} is served by <b>{flightCount} flight numbers</b> a day, on everything from widebody Boeing 787s and 777s to narrowbody Airbus A321s and A220s. That aircraft mix is the whole eUpgrade story — only the widebody flights carry Premium Economy and a lie-flat Business cabin.</p>
              <div className="flight-groups">
                <div className="flight-group">
                  <div className="fg-head"><span className="fg-tag wide">Always widebody</span> lie-flat Business + Premium Economy</div>
                  <div className="flight-chips">
                    {data.flights.always.map((f) => <Link key={f} className="flight-chip" to={`/flights/${flightSlug(f)}`}>{f}</Link>)}
                  </div>
                </div>
                <div className="flight-group">
                  <div className="fg-head"><span className="fg-tag wide-soft">Sometimes widebody</span> widebody on select dates — check the date</div>
                  <div className="flight-chips">
                    {data.flights.sometimes.map((f) => <Link key={f} className="flight-chip" to={`/flights/${flightSlug(f)}`}>{f}</Link>)}
                  </div>
                </div>
                <div className="flight-group">
                  <div className="fg-head"><span className="fg-tag narrow">Narrowbody</span> recliner Business, no Premium Economy</div>
                  <div className="flight-chips">
                    {data.flights.narrow.map((f) => <Link key={f} className="flight-chip" to={`/flights/${flightSlug(f)}`}>{f}</Link>)}
                  </div>
                </div>
              </div>
              <p className="route-fine">Flight numbers link to per-flight guides — we're publishing them one at a time, starting with <Link to="/flights/ac033">AC033</Link>, the daily widebody flagship. Aircraft assignments are a schedule snapshot and shift through the season.</p>
            </>
          )}

          <h2>What it costs to eUpgrade on {pair}</h2>
          <CostTable zone={zone} miles={miles} cabin="J" title="Upgrade to Business" />
          {hasPE && <CostTable zone={zone} miles={miles} cabin="PY" title="Upgrade to Premium Economy" />}
          <p className="route-fine">Costs shown are Air Canada's published eUpgrade credit rates for this cabin distance band ({ZONE_LABEL[zone]}) — they apply the same way across every route in this distance tier, not just {pair}. Exact cost depends on your specific booking class; the <a href={calcHref}>calculator</a> works it out for your trip.</p>

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
