/* Per-route physical data for the /routes/{slug} pages. Cost figures are NOT
   stored here — they're derived live from rules.js so they can never drift
   from the calculator. Everything below is real-world route data (aircraft,
   seat config, frequency) supplied per route; add an entry to publish a page.

   Phase 1: one worked route (YYZ–LHR). `routeNote` is optional — include it
   only when there's a genuinely route-specific point to make (see BRIEF/spec:
   generic filler is the thin content Google penalizes). */
export const ROUTES = {
  "yyz-lhr": {
    slug: "yyz-lhr",
    origin: { code: "YYZ", city: "Toronto" },
    dest: { code: "LHR", city: "London" },
    distanceKm: 5730,
    aircraft: "Boeing 787-9 / Airbus A330-300",
    flightTime: "7h 15m",
    frequency: "multiple times daily",
    cabins: { business: 20, premiumEconomy: 21, economy: 247 },
    routeNote:
      "This is a high-demand transatlantic business route, so R-class availability (the eUpgrade-eligible bucket) tends to close earlier than on leisure-heavy routes, especially on weekday morning departures.",
    related: [
      { code: "JFK", city: "New York" },
      { code: "LAX", city: "Los Angeles" },
      { code: "CDG", city: "Paris" },
      { code: "NRT", city: "Tokyo" },
      { code: "HKG", city: "Hong Kong" },
    ],
  },
};

export const routeSlug = (originCode, destCode) =>
  `${originCode.toLowerCase()}-${destCode.toLowerCase()}`;
