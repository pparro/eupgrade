import { useState, useMemo } from "react";
import Logo from "./components/Logo.jsx";
import { useHead } from "./use-head.js";
import { PAGE_SEO } from "./seo.js";
import { RULES, TIERS, FARES, isLat } from "./rules.js";

/* The window numbers and fare list come straight from rules.js so this guide
   and the calculator can never silently drift apart when the charts change.
   isLat() == "flexible fare that clears anytime for status holders". */
const STATUS_LABEL = Object.fromEntries(TIERS);
const FARE_LABEL = Object.fromEntries(FARES);

function windowModel(status, zone, fareV) {
  if (fareV === "Y_BASIC") return { kind: "BASIC" };
  const cfg = RULES.windows[status];
  if (isLat(fareV)) {
    if (cfg.lat === "ANY") return { kind: "ANYTIME" };
    // no-status flexible fare: fixed window
    return { kind: "WINDOW", days: cfg.lat[zone] };
  }
  if (!cfg.non) return { kind: "NOSTATUS_REG" };
  return { kind: "WINDOW", days: cfg.non[zone] };
}

function Explainer() {
  const [status, setStatus] = useState("K25");
  const [zone, setZone] = useState("INTERNATIONAL");
  const [fareV, setFareV] = useState("Y_FLEX");

  const model = useMemo(() => windowModel(status, zone, fareV), [status, zone, fareV]);

  const steps =
    model.kind === "ANYTIME"
      ? [
          { dot: "open", title: "The moment you book", sub: "This fare has no waiting window. If Air Canada has upgrade space, your request can clear right away.", below: "open" },
          { dot: "wall", title: "36 hours before departure", sub: "Advance clearing stops. Anyone still waiting is now settled at the airport.", below: "gate" },
          { dot: "gate", title: "Departure day", sub: "The upgrade list runs about 55 minutes before departure, right at the gate — ranked by cabin, status, then fare.", below: null },
        ]
      : model.kind === "WINDOW"
      ? [
          { dot: "book", title: "When you book", sub: "Your credits come out and the request goes in — but it just sits waitlisted for now.", below: "wait" },
          { dot: "open", title: `Your window opens — ${model.days} days before departure`, sub: "Now your request can actually clear, if Air Canada has opened up upgrade space.", below: "open" },
          { dot: "wall", title: "36 hours before departure", sub: "Advance clearing stops. Anyone still waiting is now settled at the airport.", below: "gate" },
          { dot: "gate", title: "Departure day", sub: "The upgrade list runs about 55 minutes before departure, right at the gate — ranked by cabin, status, then fare.", below: null },
        ]
      : [];

  return (
    <div className="widget">
      <div className="widget-head"><span className="dot"></span>Your clearance window, from booking to boarding</div>
      <div className="widget-body">
        <div className="controls">
          <div className="ctrl"><div className="lab">Your status</div>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              {TIERS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select></div>
          <div className="ctrl"><div className="lab">Where you're flying</div>
            <select value={zone} onChange={(e) => setZone(e.target.value)}>
              <option value="NA_SUN">North America / Sun</option>
              <option value="INTERNATIONAL">International</option>
            </select></div>
          <div className="ctrl"><div className="lab">Your fare</div>
            <select value={fareV} onChange={(e) => setFareV(e.target.value)}>
              {FARES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select></div>
        </div>

        {model.kind === "BASIC" && (
          <div className="verdict wait"><span className="ico">🚫</span>
            <div>Economy Basic can't be upgraded.<small>Basic fares aren't eligible for eUpgrades at all — you'd need Standard or higher to upgrade this trip.</small></div></div>
        )}
        {model.kind === "NOSTATUS_REG" && (
          <div className="verdict wait"><span className="ico">✋</span>
            <div>Without status, only Latitude fares can upgrade.<small>Pick a Latitude fare — Economy or Premium Economy — to see how the window works with no status.</small></div></div>
        )}

        {(model.kind === "ANYTIME" || model.kind === "WINDOW") && (
          <>
            <div className="vtl-intro">
              At <b>{STATUS_LABEL[status]}</b> flying <b>{zone === "NA_SUN" ? "within North America / Sun" : "internationally"}</b> on <b>{FARE_LABEL[fareV]}</b>, here's how your upgrade plays out:
            </div>
            <div className="vtl">
              {steps.map((s, i) => (
                <div className={"vstep " + s.dot} key={i}>
                  <span className="vdot"></span>
                  {s.below && <span className={"vline " + s.below}></span>}
                  <div className="vttl">{s.title}</div>
                  <div className="vsub">{s.sub}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Guide() {
  useHead(PAGE_SEO["/guide"]);
  return (
    <div className="guide">
      <nav><div className="wrap">
        <a className="brand" href="/"><Logo /><span className="word">eupgrade<span className="me">.me</span></span></a>
        <a className="back" href="/#calculator">← Back to the calculator</a>
      </div></nav>

      <main>
      <header><div className="gwrap">
        <div className="kicker">🎓 New here? Start with this.</div>
        <h1>Air Canada eUpgrades, <span className="g">explained simply</span></h1>
        <p className="sub">If you just got Aeroplan status and have no idea what these "eUpgrade credits" in your account are — this is for you. Five minutes, no jargon.</p>
      </div></header>

      <div className="gwrap prose">
        <h2><span className="n">01</span>What even is an eUpgrade?</h2>
        <p>You booked an economy ticket. An <b>eUpgrade</b> is a way to move up to a nicer cabin — Premium Economy or Business — on that same flight, without buying a whole new ticket.</p>
        <div className="analogy"><span className="tag">Think of it like</span>
          A coupon that upgrades the seat you already paid for. You spend <b>eUpgrade credits</b> — little tokens that sit in your Aeroplan account — and in return you get bumped up front, if there's room. That "if there's room" part matters, and we'll get to it.</div>

        <h2><span className="n">02</span>Where do the credits come from?</h2>
        <p>You earn eUpgrade credits by having <b>Aeroplan status</b>. Each status tier comes with its own starting allotment — the higher your status, the more credits you get. Here's what each tier starts with:</p>
        <div className="tiers">
          <div className="tier"><div className="lv">25K</div><div className="cr">5 credits</div></div>
          <div className="tier"><div className="lv">35K</div><div className="cr">10 credits</div></div>
          <div className="tier"><div className="lv">50K</div><div className="cr">15 credits</div></div>
          <div className="tier"><div className="lv">75K</div><div className="cr">20 credits</div></div>
          <div className="tier"><div className="lv">Super Elite</div><div className="cr">30 credits</div></div>
        </div>
        <p className="fine">Those are the starting numbers. Fly more and you can earn additional credits as you hit milestones through the year, so heavy travellers end up with more than the baseline.</p>
        <p>And here's the one a lot of people miss: if you got status through a <b>status match</b> — say from your Marriott or Hyatt account — you probably have a stack of these credits sitting in your account right now, whether you realized it or not.</p>
        <div className="analogy"><span className="tag">One myth to clear up</span>
          An Aeroplan credit card <b>doesn't hand you eUpgrade credits</b>. What a premium Aeroplan card does is <b>make your credits last longer</b> — 24 months instead of 12 — and give you a small edge if two people are otherwise tied for the same seat. Handy, but the credits themselves come from status, not the card.</div>

        <h2><span className="n">03</span>What does an upgrade cost?</h2>
        <p>The price of an upgrade — in credits — comes down to three things:</p>
        <div className="costgrid">
          <div className="costitem"><span className="ci">✈</span><b>How far</b> you're flying</div>
          <div className="costitem"><span className="ci">🎟</span><b>What fare</b> you booked</div>
          <div className="costitem"><span className="ci">💺</span><b>Which cabin</b> you're moving up to</div>
        </div>
        <p>It ranges from a <b>single credit</b> on a short hop to <b>twenty or more</b> on a long international flight. Cheaper fares can also add a small <b>cash top-up</b>. Rather than work it out by hand, let the calculator do it — that's what it's for.</p>

        <h2><span className="n">04</span>The catch nobody tells you</h2>
        <p>Here's what trips everyone up: <strong>spending credits doesn't guarantee the seat.</strong></p>
        <p>You <b>request</b> the upgrade, and your credits come out of your account right away. But the upgrade only <b>clears</b> if Air Canada has opened up room for upgrades on that flight. If they haven't, you don't lose your credits — you just join <b>the upgrade list</b> and wait.</p>
        <div className="analogy"><span className="tag">The seat map lies — ignore it</span>
          You'd think you could peek at the seat map and count the empty business seats. Don't. A cabin that looks half-empty can be fully sold to people who just haven't picked seats yet, and a cabin that looks full can have upgrade room behind the scenes. The seat map tells you almost nothing about your odds.</div>
        <p>Now, the upgrade list isn't first-come-first-served. It's a <b>ranking</b>, and where you land on it is decided by a stack of tiebreakers, in this rough order:</p>
        <div className="ladder">
          <div className="rung"><span className="rn">1</span><div><b>Your cabin</b> — if you're already in Premium Economy hoping for Business, you sit ahead of everyone coming from economy.</div></div>
          <div className="rung"><span className="rn">2</span><div><b>Your status</b> — Super Elite outranks 75K, which outranks 50K, and so on down. This is the big one.</div></div>
          <div className="rung"><span className="rn">3</span><div><b>Your fare</b> — a more flexible, more expensive ticket beats a cheaper one at the same status.</div></div>
          <div className="rung"><span className="rn">4</span><div><b>When you checked in</b> — the final tiebreaker when everything above is equal.</div></div>
        </div>
        <p>So two people with the exact same status can still rank differently based on their fare and check-in time. That's why the same flight is a near-lock for one person and a long shot for another.</p>
        <p>The other half of the puzzle is <b>timing</b> — when your request is even allowed to clear. That's the part called <b>clearance windows</b>, and it's the most misunderstood piece of all. Let's make it obvious.</p>

        <h2><span className="n">05</span>Clearance windows, made visual</h2>
        <p>A clearance window is the <b>head start your status gives you</b>. The more status you have, the earlier your request becomes eligible to clear before the flight — so you get first pick of any open seats before lower tiers even get in line.</p>
        <p>And there's a hard cutoff at the end: <b>inside 36 hours of departure, nothing clears in advance anymore</b>. Everyone still waiting gets settled at the airport once check-in closes, ranked by that same priority list from above. So an upgrade that hasn't cleared by then isn't dead — it just comes down to who's ahead of you at the gate.</p>
        <p>Play with it below. Change your status and watch the window slide earlier or later, and swap fares to see when it clears immediately versus waits for a window.</p>

        <Explainer />

        <h2><span className="n">06</span>So you're on the list. Now what?</h2>
        <p>If your upgrade hasn't cleared in advance, everything comes down to one moment: <b>the airport</b>.</p>
        <p>Check-in closes <b>60 minutes before departure</b> (that's now the same for domestic and international flights). About <b>five minutes after that — roughly 55 minutes before departure — Air Canada runs the upgrade list</b>. It works down the ranking from earlier: cabin, then status, then fare, then check-in time. If a seat is still open when it reaches your name, you're in.</p>
        <div className="analogy"><span className="tag">The one habit that helps</span>
          Since check-in time is the final tiebreaker, <b>checking in right at the 24-hour mark</b> can quietly move you ahead of people who left it late. It's the one lever you actually control.</div>
        <p>Two things worth knowing for that final stretch. If you clear an upgrade to Business at the gate, the Premium Economy seat you were sitting in opens up — so people waiting for PY can clear right behind you. And once you physically board the plane, you generally drop off the list. There's a saying for it among frequent flyers: <b>"you board, you lose."</b> If you're still hoping, it's usually worth waiting near the gate until your name is called rather than boarding early.</p>

        <div className="recap">
          <div className="eyebrow" style={{ marginBottom: 10 }}>The whole thing in five lines</div>
          <ul>
            <li><b>eUpgrade credits</b> come from Aeroplan status — 5 at 25K up to 30 at Super Elite (a status match counts too).</li>
            <li>You <b>spend them to move up a cabin</b> on a flight you already booked.</li>
            <li>The <b>cost</b> depends on distance, fare, and cabin — sometimes plus a cash top-up.</li>
            <li>Requesting isn't clearing — if there's no room you join <b>the upgrade list</b>, ranked by cabin, status, fare, then check-in.</li>
            <li>Your <b>status decides how early you're eligible</b>; if it hasn't cleared, the list runs ~55 minutes before departure at the gate.</li>
          </ul>
        </div>

        <div className="cta">
          <h3>Now put it to work</h3>
          <p>See exactly what your next upgrade costs and when your window opens.</p>
          <a href="/#calculator">Check your flight →</a>
        </div>
      </div>
      </main>

      <footer><div className="gwrap">
        <div className="disc"><b style={{ color: "var(--ink-2)" }}>eupgrade<span style={{ color: "var(--muted)" }}>.me</span></b> is an independent tool and is not affiliated with, endorsed by, or sponsored by Air Canada or Aeroplan. "Air Canada", "Aeroplan" and "eUpgrade" are trademarks of their respective owners, referenced here only to describe the program this guide explains. Details can change — always confirm in the Air Canada app.</div>
      </div></footer>
    </div>
  );
}
