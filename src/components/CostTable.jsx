import { RULES, FARES, band } from "../rules.js";

const FARE_LABEL = Object.fromEntries(FARES);
export const ZONE_LABEL = { NA_SUN: "North America / Sun", INTERNATIONAL: "International" };

/* Cost rows straight from the rules engine, so every page (route, flight, and
   the calculator) shows the same numbers for a given zone + distance band. */
export function costRows(zone, miles, cabin, purchase = "CASH") {
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

export default function CostTable({ zone, miles, cabin, title }) {
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
