export default function Timeline({ days, any }) {
  const span = any ? 15 : Math.max(days || 0, 1.2);
  const openPct = any ? 4 : Math.max(4, 100 - (days / span) * 100);
  const wallPct = 100 - ((36 / 24) / span) * 100;
  return (
    <div className="tl">
      <div className="cap">Clearance window · time to departure</div>
      <div className="track">
        <div className="rail">
          <div className="open" style={{ left: openPct + "%", right: "0%" }} />
          <div className="wall" style={{ left: Math.max(openPct, wallPct) + "%", right: "0%" }} />
        </div>
        <div className="mk" style={{ left: openPct + "%" }}>
          <div className="t" /><div className="x">{any ? "request" : `T-${days}d`}<br />opens</div>
        </div>
        <div className="mk wall" style={{ left: wallPct + "%" }}>
          <div className="t" /><div className="x">T-36h<br />waitlist</div>
        </div>
        <div className="mk dep" style={{ left: "100%" }}>
          <div className="t" /><div className="x">departure</div>
        </div>
      </div>
    </div>
  );
}
