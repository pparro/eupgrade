/* Single source of truth for per-page SEO (title/description/OG). Imported by
   the client (use-head.js sets it on navigation) AND by scripts/prerender.mjs
   (bakes it into static HTML per route at build time). Keep this plain data —
   no React imports — so the Node prerender step can import it directly. */
export const SITE = "https://eupgrade.me";

export const PAGE_SEO = {
  "/": {
    title: "Air Canada eUpgrades Explained — How to Use, Check & Not Waste Your Credits | eupgrade.me",
    description:
      "Learn how Air Canada eUpgrades work, calculate exactly what an upgrade costs, and find out how to get upgraded before your credits expire. Free for every Aeroplan status.",
    ogTitle: "Will your Air Canada upgrade clear?",
    ogDescription:
      "See what an eUpgrade costs, when your window opens, and whether it's worth using your credits — free, for any route and status.",
  },
  "/guide": {
    title: "How Air Canada eUpgrades Work: Cost, Clearance & Priority (2026 Guide) | eupgrade.me",
    description:
      "How Air Canada eUpgrades work in plain language: where credits come from, what an upgrade costs, when your clearance window opens, how the upgrade list is ranked, and how eUpgrade compares to paid upgrades.",
    ogTitle: "Air Canada eUpgrades, explained simply",
    ogDescription:
      "Where credits come from, what upgrades cost, and how clearance windows and the upgrade list really work.",
  },
  "/faq": {
    title: "Air Canada eUpgrade FAQ — Your Questions, Answered | eupgrade.me",
    description:
      "Straight answers on Air Canada eUpgrades: costs and add-ons, credit expiry, clearance timing, upgrading companions, partner airlines, and the edge cases that trip people up.",
    ogTitle: "Air Canada eUpgrade questions & answers",
    ogDescription:
      "The eUpgrade details that trip people up — costs, expiry, timing, companions, partner airlines — answered plainly.",
  },
};

// Per-route SEO, derived from a route-data object (used by RoutePage + prerender).
export function routeSeo(r) {
  const pair = `${r.origin.city}–${r.dest.city}`;
  return {
    title: `${r.origin.city} to ${r.dest.city} eUpgrade Guide — Air Canada Clearance Rules | eupgrade.me`,
    description: `How Air Canada eUpgrade works on ${pair} flights: cabin config, eUpgrade credit cost, fare classes, and clearance priority.`,
  };
}

// Per-flight SEO, derived from a flight-data object (used by FlightPage + prerender).
export function flightSeo(f) {
  return {
    title: `Air Canada ${f.flight}: ${f.origin.city} to ${f.dest.city} eUpgrade Guide | eupgrade.me`,
    description: `Air Canada ${f.flight} (${f.origin.code}–${f.dest.code}): aircraft, cabins, what an eUpgrade costs in credits, and how clearance works on this ${f.origin.city}–${f.dest.city} flight.`,
  };
}
