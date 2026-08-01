import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Logo from "./components/Logo.jsx";
import CostTable, { ZONE_LABEL } from "./components/CostTable.jsx";
import Timeline from "./components/Timeline.jsx";
import ExampleNote from "./components/ExampleNote.jsx";
import { FLIGHTS } from "./flights-data.js";
import { flightSeo } from "./seo.js";
import { useHead } from "./use-head.js";
import { windowInfo } from "./rules.js";
import { distanceMiles, zoneFor } from "./airports.js";

const KM = (mi) => Math.round(mi * 1.60934);

function NotFound({ flight }) {
  return (
    <div className="routepage">
      <nav><div className="wrap">
        <a className="brand" href="/"><Logo /><span className="word">eupgrade<span className="me">.me</span></span></a>
        <a className="back" href="/#calculator">← Back to the calculator</a>
      </div></nav>
      <main><div className="gwrap prose" style={{ textAlign: "center", paddingTop: 40 }}>
        <div className="eyebrow">Flight guide</div>
        <h1 style={{ margin: "10px 0 12px" }}>Air Canada {flight || "flight"}</h1>
        <p>We haven't published a guide for this flight yet — it's on the list. In the meantime, the calculator gives you the exact eUpgrade cost and clearance window for any route, fare, and status.</p>
        <div className="cta" style={{ marginTop: 28 }}>
          <h3>Check your upgrade now</h3>
          <p>See the exact eUpgrade cost and clearance window for any flight.</p>
          <a href="/#calculator">Open the calculator →</a>
        </div>
      </div></main>
    </div>
  );
}

export default function FlightPage() {
  const { flight: slug } = useParams();
  const data = FLIGHTS[(slug || "").toLowerCase()];
  useHead(useMemo(() => (data ? flightSeo(data) : null), [data]));

  if (!data) return <NotFound flight={(slug || "").toUpperCase()} />;

  const O = data.origin, D = data.dest;
  const pair = `${O.code}–${D.code}`;
  const miles = distanceMiles(O.code, D.code);
  const zone = zoneFor(O.code, D.code);
  // Representative clearance window (50K, Economy Flex) — it shifts with status.
  const win = windowInfo("K50", zone, "Y_FLEX");

  return (
    <div className="routepage">
      <nav><div className="wrap">
        <a className="brand" href="/"><Logo /><span className="word">eupgrade<span className="me">.me</span></span></a>
        <a className="back" href="/#calculator">← Back to the calculator</a>
      </div></nav>

      <main>
        <header><div className="gwrap">
          <div className="eyebrow">Air Canada flight guide</div>
          <h1>{data.flight} <span className="g">·</span> {O.city} ({O.code}) → {D.city} ({D.code})</h1>
          <p className="route-stats">
            <span>Frequency: <b>{data.frequency}</b></span>
            <span>Distance: <b>{KM(miles).toLocaleString()} km</b></span>
            <span>Cabin: <b>{data.hasPremiumEconomy ? "Business + Premium Economy" : "Business"}</b></span>
          </p>
        </div></header>

        <div className="gwrap prose">
          <ExampleNote />

          <p>Flying Air Canada <b>{data.flight}</b> from {O.city} to {D.city} and wondering about an eUpgrade? Here's what applies to this specific flight — the aircraft it flies, the cabins on board, what an upgrade costs in credits, and how the clearance window works.</p>

          <h2>Aircraft on {data.flight}</h2>
          <p>{data.flight} is a {data.widebody ? "widebody" : "narrowbody"} service, so it carries {data.hasPremiumEconomy ? <>a lie-flat <b>Business</b> cabin and <b>Premium Economy</b></> : <>a <b>Business</b> cabin</>}. This season it flies:</p>
          <ul>
            {data.aircraftSchedule.map((s, i) => (
              <li key={i}><b>{s.name}</b> — {s.from} to {s.to}</li>
            ))}
          </ul>
          {data.note && <p className="route-fine">{data.note}</p>}

          <h2>What an eUpgrade costs on {data.flight}</h2>
          <CostTable zone={zone} miles={miles} cabin="J" title="Upgrade to Business" />
          {data.hasPremiumEconomy && <CostTable zone={zone} miles={miles} cabin="PY" title="Upgrade to Premium Economy" />}
          <p className="route-fine">Costs are Air Canada's published eUpgrade credit rates for this cabin distance band ({ZONE_LABEL[zone]}) — the same across every {pair}-tier route. Exact cost depends on your booking class; the <Link to="/#calculator">calculator</Link> works it out for your trip.</p>

          <h2>When your request can clear</h2>
          <p>Your status sets how early your request becomes eligible. Here's the window for a <b>50K</b> flyer on an <b>Economy Flex</b> fare — it slides earlier with higher status, and there's a hard 36-hour cutoff before departure after which everything is settled at the gate:</p>
          <Timeline days={win.days} any={win.any} />
          <p className="route-fine">Window shifts with your status and fare. See the <Link to="/guide">full clearance-window guide</Link>, or run your exact trip through the <Link to="/#calculator">calculator</Link>.</p>

          <h2>Real clearance predictions — in testing</h2>
          <p>Whether {data.flight} actually clears on a given date depends on live fare-bucket availability, which the published charts can't tell you. We're building that into a clearance-probability model from real flight data — it's in testing, and we won't show a number until it's validated.</p>
          <p><a className="c3-link" href="/#predictor">Get notified when predictions go live →</a></p>

          <h2>More on this route</h2>
          <ul className="route-links">
            <li><Link to="/routes/yyz-yvr">All Air Canada flights on {O.city} → {D.city}</Link></li>
            <li><Link to="/guide">How Air Canada eUpgrades work</Link></li>
          </ul>
        </div>

        <footer><div className="gwrap">
          <div className="disc">Schedule and aircraft data reflect Air Canada's published network file (effective 31 Jul 2026) and can change as AC republishes. eUpgrade costs come from Air Canada's published charts. Clearance predictions are not yet live. Always confirm details in the Air Canada app before travelling.</div>
        </div></footer>
      </main>
    </div>
  );
}
