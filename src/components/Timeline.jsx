export default function Timeline({ days, any }) {
  const span = any ? 15 : Math.max(days || 0, 1.2);
  const openPct = any ? 4 : Math.max(4, 100 - (days / span) * 100);
  const wallPct = 100 - ((36 / 24) / span) * 100;

  // One source for both the pinned desktop markers and the stacked mobile
  // legend, so the two representations can never disagree.
  const points = [
    {
      cls: "",
      pct: openPct,
      head: any ? "request" : `T-${days}d`,
      sub: "opens",
      legend: any ? "Opens right away — no waiting window" : `Window opens — ${days} ${days === 1 ? "day" : "days"} before departure`,
    },
    { cls: "wall", pct: wallPct, head: "T-36h", sub: "waitlist", legend: "Waitlist cutoff — 36 hours before departure" },
    { cls: "dep", pct: 100, head: "departure", sub: "", legend: "Departure" },
  ];

  return (
    <div className="tl">
      <div className="cap">Clearance window · time to departure</div>
      <div className="track">
        <div className="rail">
          <div className="open" style={{ left: openPct + "%", right: "0%" }} />
          <div className="wall" style={{ left: Math.max(openPct, wallPct) + "%", right: "0%" }} />
        </div>
        {points.map((p, i) => (
          <div className={"mk " + p.cls} style={{ left: p.pct + "%" }} key={i}>
            <div className="t" />
            <div className="x">{p.head}{p.sub && <><br />{p.sub}</>}</div>
          </div>
        ))}
      </div>
      <ul className="tl-legend">
        {points.map((p, i) => (
          <li className={p.cls} key={i}><span className="dot" />{p.legend}</li>
        ))}
      </ul>
    </div>
  );
}
