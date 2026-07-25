import { readFromAvail } from "../rules.js";

/**
 * The likelihood "Read". Driven by the availability heuristic today; when the
 * trained model (availability-model.ts) is wired in, swap readFromAvail for a
 * call to it — the UI (range + confidence label) already accommodates that.
 */
export default function Read({ iClass = 9 }) {
  const r = readFromAvail(iClass);
  return (
    <div className="read rise d3">
      <div className="read-top">
        <div className="route">
          YYZ <span className="arr">→</span> NRT
          <span className="meta">AC 001 · Business · in 2 days</span>
        </div>
      </div>
      <div className="gauge">
        <div className="band-label">
          <span className={"big " + r.tone}>{r.label}</span>
          <span className="conf">Early access · heuristic</span>
        </div>
        <div className="meter">
          <div className="ci" style={{ left: r.lo * 100 + "%", width: (r.hi - r.lo) * 100 + "%" }} />
          <div className="fill" style={{ width: r.pt * 100 + "%" }} />
        </div>
        <div className="scale"><span>0%</span><span>likelihood range</span><span>100%</span></div>
      </div>
      <div className="read-facts">
        <div className="rf"><div className="k">Business avail</div><div className="v mono">I{iClass}</div></div>
        <div className="rf"><div className="k">Your read</div><div className="v mono">Y&rarr;J</div></div>
        <div className="rf"><div className="k">Est. cost</div><div className="v">20 <small>cr</small></div></div>
      </div>
      <div className="caveat">
        <span>&#8505;&#65038;</span>
        <div><b>Early access.</b> Estimated from premium-cabin availability alone — it shows the ceiling; the actual list of who's waiting still matters. Reads sharpen as flyers share real outcomes.</div>
      </div>
    </div>
  );
}
