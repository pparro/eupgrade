// schedule-utils.ts
// Utilities for turning Air Canada's published network schedule into
// flight-specific and route-specific example pages on eupgrade.me.
//
// Source: schedule-normalized.json (parsed from AC's published network file,
// effective 31JUL26 onward). This is SCHEDULE data only — origin, destination,
// flight number, aircraft type, day-of-week pattern, and the date range each
// pattern is valid for. It does NOT contain seat maps, fare classes, or
// availability. Do not use it as an input to the Beta-Binomial model or to
// claim real-time clearance data — it's for populating the *structure* of
// example/marketing pages (which flights exist, what aircraft they fly,
// how often), not the prediction itself.

export interface ScheduleRecord {
  flight: string;              // e.g. "AC001"
  originCity: string;
  originCode: string;          // IATA e.g. "YYZ"
  destCity: string;
  destCode: string;
  aircraftCode: string;        // e.g. "77W"
  aircraftName: string;        // e.g. "Boeing 777-300ER"
  cabinCategory: 'regional' | 'narrowbody_mainline' | 'widebody_international' | 'unknown';
  widebody: boolean;
  stops: number;
  daysOfWeek: string[];        // ["Mon","Tue",...]
  effectiveStart: string;      // ISO date
  effectiveEnd: string;        // ISO date
}

export interface RouteIndexEntry {
  originCity: string;
  destCity: string;
  flights: string[];
  widebodyFlights: string[];
}

export interface FlightIndexEntry {
  routes: string[];            // ["YYZ-LHR"] or multiple for connecting rotations
  aircraft: string[];          // all aircraft codes ever flown under this number
  widebody: boolean;
  singleRoute: boolean;        // true for ~96% of flight numbers — safe to build a
                                // single "/flights/AC001" page for these
}

// --- Loading (adapt to however you're serving static JSON / Supabase) ---
// import scheduleData from './data/schedule-normalized.json';
// import routeIndex from './data/route-index.json';
// import flightIndex from './data/flight-index.json';

/**
 * Pick candidate flight numbers for building "/flights/[flightNumber]" example
 * pages. Prioritizes widebody, single-route, international flights — these
 * are the ones eUpgrade users actually care about (meaningful R/N inventory,
 * a real J or PY cabin, credit costs worth calculating).
 */
export function pickExampleFlights(
  flightIndex: Record<string, FlightIndexEntry>,
  limit = 50
): string[] {
  return Object.entries(flightIndex)
    .filter(([, v]) => v.widebody && v.singleRoute)
    .map(([flightNum]) => flightNum)
    .slice(0, limit);
}

/**
 * Pick candidate "/routes/[origin]-[destination]" pages: routes with at least
 * one widebody flight (i.e. a real J cabin worth modeling).
 */
export function pickExampleRoutes(
  routeIndex: Record<string, RouteIndexEntry>,
  limit = 50
): string[] {
  return Object.entries(routeIndex)
    .filter(([, v]) => v.widebodyFlights.length > 0)
    .map(([routeKey]) => routeKey)
    .slice(0, limit);
}

/**
 * Get the current/most-relevant schedule record for a flight number as of a
 * given date — i.e. which aircraft is this flight *currently* flying, since
 * aircraft type can change several times per season on the same flight number.
 */
export function getCurrentAircraft(
  scheduleData: ScheduleRecord[],
  flightNumber: string,
  asOfDate: string // ISO date, defaults to today in calling code
): ScheduleRecord | undefined {
  return scheduleData.find(
    (r) =>
      r.flight === flightNumber &&
      r.effectiveStart <= asOfDate &&
      r.effectiveEnd >= asOfDate
  );
}

/**
 * All schedule segments for a flight number, sorted by effective date —
 * useful for showing "this flight has flown 787-9, 787-8, and 777-300ER
 * this season" context on a flight page, and for picking a stable
 * representative aircraft when the type varies.
 */
export function getFlightHistory(
  scheduleData: ScheduleRecord[],
  flightNumber: string
): ScheduleRecord[] {
  return scheduleData
    .filter((r) => r.flight === flightNumber)
    .sort((a, b) => a.effectiveStart.localeCompare(b.effectiveStart));
}

/**
 * Every flight number serving a given origin/destination pair — for building
 * a route comparison page (this is also the data source for the Pro-tier
 * "all flights between two cities" route-comparison search).
 */
export function getFlightsForRoute(
  routeIndex: Record<string, RouteIndexEntry>,
  originCode: string,
  destCode: string
): RouteIndexEntry | undefined {
  return routeIndex[`${originCode}-${destCode}`];
}

/**
 * Maps aircraft category to a cabin-config hint used to select the right
 * eUpgrade credit chart / clearance-window defaults from eupgrade-rules.v1.json.
 * Widebody international flights use full J (lie-flat) + PY where equipped;
 * narrowbody mainline uses recliner J with no PY; regional jets generally
 * don't carry an eUpgrade-eligible J cabin — flag these for exclusion from
 * upgrade-probability pages entirely rather than showing a misleading example.
 */
export function getCabinConfigHint(rec: ScheduleRecord): {
  hasBusinessCabin: boolean;
  hasPremiumEconomy: boolean;
} {
  switch (rec.cabinCategory) {
    case 'widebody_international':
      return { hasBusinessCabin: true, hasPremiumEconomy: true };
    case 'narrowbody_mainline':
      return { hasBusinessCabin: true, hasPremiumEconomy: false };
    case 'regional':
    default:
      return { hasBusinessCabin: false, hasPremiumEconomy: false };
  }
}
