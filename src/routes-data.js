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

  "yyz-yvr": {
    slug: "yyz-yvr",
    origin: { code: "YYZ", city: "Toronto" },
    dest: { code: "YVR", city: "Vancouver" },
    distanceKm: 3350,
    aircraft: "Boeing 787-9 / 777 · Airbus A321 & A220",
    flightTime: "5h 20m",
    frequency: "up to 21 flights a day",
    cabins: null, // varies by flight number — see the widebody/narrowbody split below
    hasPremiumEconomy: true, // on the widebody flights
    routeNote:
      "Toronto–Vancouver is flown by a real mix of aircraft, and that mix is the whole eUpgrade story here: the widebody flights carry a lie-flat Business cabin and Premium Economy, while the narrowbody flights have a smaller recliner Business cabin and no Premium Economy at all — worse upgrade math for the same credits.",
    // Classified from the parsed AC schedule (yyz-yvr-route-detail.json).
    flights: {
      always: ["AC033", "AC185", "AC187"],
      sometimes: ["AC101", "AC105", "AC107", "AC109", "AC111", "AC117", "AC119", "AC121", "AC125", "AC131", "AC181", "AC183"],
      narrow: ["AC103", "AC113", "AC115", "AC123", "AC127", "AC129"],
    },
    related: [
      { code: "LHR", city: "London" },
      { code: "JFK", city: "New York" },
      { code: "LAX", city: "Los Angeles" },
      { code: "CDG", city: "Paris" },
      { code: "NRT", city: "Tokyo" },
    ],
  },
};

export const flightSlug = (flightNumber) => flightNumber.toLowerCase();

export const routeSlug = (originCode, destCode) =>
  `${originCode.toLowerCase()}-${destCode.toLowerCase()}`;
