/* Curated per-flight data for /flights/{number} pages, derived from the parsed
   AC schedule (yyz-yvr-route-detail.json). SCHEDULE ONLY — aircraft, frequency,
   cabin *type* (from widebody status). No seat counts, no fares, no availability;
   those aren't in the schedule and must not be implied. Aircraft assignments are
   a snapshot (effective 31JUL26+) and drift as AC republishes — re-pull and
   revise the date-anchored segments rather than saying "currently". */
export const FLIGHTS = {
  "ac033": {
    flight: "AC033",
    origin: { code: "YYZ", city: "Toronto" },
    dest: { code: "YVR", city: "Vancouver" },
    frequency: "daily",
    widebody: true, // AC033 is consistently widebody on this schedule
    hasBusiness: true,
    hasPremiumEconomy: true,
    // Date-anchored so the page states a season, not a stale "currently".
    aircraftSchedule: [
      { name: "Boeing 787-9", from: "31 Jul 2026", to: "29 Sep 2026" },
      { name: "Boeing 777-200LR", from: "30 Sep 2026", to: "28 Feb 2027" },
    ],
    note: "Both aircraft on AC033 carry a lie-flat Business cabin and Premium Economy, which makes it one of the better eUpgrade targets on the Toronto–Vancouver route.",
  },

  "ac185": {
    flight: "AC185",
    origin: { code: "YYZ", city: "Toronto" },
    dest: { code: "YVR", city: "Vancouver" },
    frequency: "daily",
    widebody: true, // consistently widebody — no narrowbody segments
    hasBusiness: true,
    hasPremiumEconomy: true,
    aircraftSchedule: [
      { name: "Boeing 777-300ER", from: "31 Jul 2026", to: "24 Oct 2026" },
      { name: "Boeing 787-9", from: "25 Oct 2026", to: "28 Feb 2027" },
    ],
    note: "Like AC033, AC185 stays widebody all season — both the 777-300ER and 787-9 carry a lie-flat Business cabin and Premium Economy, so the eUpgrade math is among the best on Toronto–Vancouver.",
  },
};

export const flightSlug = (flightNumber) => flightNumber.toLowerCase();
