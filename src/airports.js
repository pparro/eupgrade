/* Airports for route-based distance + zone. Coordinates are approximate — more
   than accurate enough to place a segment in the right eUpgrade distance band.
   region drives the AC zone: NA/Sun regions (CA,US,MX,CB,CM) use the North
   America & Sun charts; everything else uses the International charts. */

export const AIRPORTS = [
  // Canada
  { code: "YYZ", city: "Toronto", region: "CA", lat: 43.68, lon: -79.63 },
  { code: "YUL", city: "Montreal", region: "CA", lat: 45.47, lon: -73.74 },
  { code: "YVR", city: "Vancouver", region: "CA", lat: 49.19, lon: -123.18 },
  { code: "YYC", city: "Calgary", region: "CA", lat: 51.11, lon: -114.02 },
  { code: "YEG", city: "Edmonton", region: "CA", lat: 53.31, lon: -113.58 },
  { code: "YOW", city: "Ottawa", region: "CA", lat: 45.32, lon: -75.67 },
  { code: "YWG", city: "Winnipeg", region: "CA", lat: 49.91, lon: -97.24 },
  { code: "YHZ", city: "Halifax", region: "CA", lat: 44.88, lon: -63.51 },
  { code: "YYJ", city: "Victoria", region: "CA", lat: 48.65, lon: -123.43 },
  { code: "YQB", city: "Quebec City", region: "CA", lat: 46.79, lon: -71.39 },
  // United States
  { code: "JFK", city: "New York JFK", region: "US", lat: 40.64, lon: -73.78 },
  { code: "LGA", city: "New York LGA", region: "US", lat: 40.78, lon: -73.87 },
  { code: "EWR", city: "Newark", region: "US", lat: 40.69, lon: -74.17 },
  { code: "LAX", city: "Los Angeles", region: "US", lat: 33.94, lon: -118.41 },
  { code: "SFO", city: "San Francisco", region: "US", lat: 37.62, lon: -122.38 },
  { code: "ORD", city: "Chicago", region: "US", lat: 41.98, lon: -87.90 },
  { code: "MIA", city: "Miami", region: "US", lat: 25.79, lon: -80.29 },
  { code: "BOS", city: "Boston", region: "US", lat: 42.36, lon: -71.01 },
  { code: "SEA", city: "Seattle", region: "US", lat: 47.45, lon: -122.31 },
  { code: "DEN", city: "Denver", region: "US", lat: 39.86, lon: -104.67 },
  { code: "LAS", city: "Las Vegas", region: "US", lat: 36.08, lon: -115.15 },
  { code: "IAD", city: "Washington DC", region: "US", lat: 38.95, lon: -77.46 },
  { code: "DFW", city: "Dallas", region: "US", lat: 32.90, lon: -97.04 },
  { code: "HNL", city: "Honolulu", region: "US", lat: 21.32, lon: -157.92 },
  // Mexico / Sun
  { code: "CUN", city: "Cancun", region: "MX", lat: 21.04, lon: -86.87 },
  { code: "MEX", city: "Mexico City", region: "MX", lat: 19.44, lon: -99.07 },
  { code: "PVR", city: "Puerto Vallarta", region: "MX", lat: 20.68, lon: -105.25 },
  { code: "SJD", city: "Los Cabos", region: "MX", lat: 23.15, lon: -109.72 },
  // Caribbean
  { code: "NAS", city: "Nassau", region: "CB", lat: 25.04, lon: -77.46 },
  { code: "MBJ", city: "Montego Bay", region: "CB", lat: 18.50, lon: -77.91 },
  { code: "PUJ", city: "Punta Cana", region: "CB", lat: 18.57, lon: -68.36 },
  { code: "HAV", city: "Havana", region: "CB", lat: 22.99, lon: -82.41 },
  { code: "BGI", city: "Barbados", region: "CB", lat: 13.07, lon: -59.49 },
  // Central America
  { code: "LIR", city: "Liberia CR", region: "CM", lat: 10.59, lon: -85.54 },
  { code: "SJO", city: "San Jose CR", region: "CM", lat: 9.99, lon: -84.20 },
  { code: "PTY", city: "Panama City", region: "CM", lat: 9.07, lon: -79.38 },
  // Europe
  { code: "LHR", city: "London", region: "EU", lat: 51.47, lon: -0.45 },
  { code: "CDG", city: "Paris", region: "EU", lat: 49.01, lon: 2.55 },
  { code: "FRA", city: "Frankfurt", region: "EU", lat: 50.04, lon: 8.56 },
  { code: "MUC", city: "Munich", region: "EU", lat: 48.35, lon: 11.79 },
  { code: "ZRH", city: "Zurich", region: "EU", lat: 47.46, lon: 8.55 },
  { code: "FCO", city: "Rome", region: "EU", lat: 41.80, lon: 12.24 },
  { code: "MAD", city: "Madrid", region: "EU", lat: 40.47, lon: -3.56 },
  { code: "BCN", city: "Barcelona", region: "EU", lat: 41.30, lon: 2.08 },
  { code: "AMS", city: "Amsterdam", region: "EU", lat: 52.31, lon: 4.76 },
  { code: "BRU", city: "Brussels", region: "EU", lat: 50.90, lon: 4.48 },
  { code: "DUB", city: "Dublin", region: "EU", lat: 53.42, lon: -6.27 },
  { code: "LIS", city: "Lisbon", region: "EU", lat: 38.77, lon: -9.13 },
  { code: "IST", city: "Istanbul", region: "EU", lat: 41.26, lon: 28.74 },
  { code: "ATH", city: "Athens", region: "EU", lat: 37.94, lon: 23.94 },
  { code: "CPH", city: "Copenhagen", region: "EU", lat: 55.62, lon: 12.65 },
  // Middle East / Africa
  { code: "DXB", city: "Dubai", region: "ME", lat: 25.25, lon: 55.36 },
  { code: "TLV", city: "Tel Aviv", region: "ME", lat: 32.01, lon: 34.89 },
  { code: "CAI", city: "Cairo", region: "AF", lat: 30.11, lon: 31.41 },
  { code: "JNB", city: "Johannesburg", region: "AF", lat: -26.14, lon: 28.25 },
  { code: "NBO", city: "Nairobi", region: "AF", lat: -1.32, lon: 36.93 },
  // Asia / Pacific
  { code: "NRT", city: "Tokyo Narita", region: "AS", lat: 35.77, lon: 140.39 },
  { code: "HND", city: "Tokyo Haneda", region: "AS", lat: 35.55, lon: 139.78 },
  { code: "ICN", city: "Seoul", region: "AS", lat: 37.46, lon: 126.44 },
  { code: "HKG", city: "Hong Kong", region: "AS", lat: 22.31, lon: 113.91 },
  { code: "PVG", city: "Shanghai", region: "AS", lat: 31.14, lon: 121.81 },
  { code: "PEK", city: "Beijing", region: "AS", lat: 40.07, lon: 116.60 },
  { code: "DEL", city: "Delhi", region: "AS", lat: 28.56, lon: 77.10 },
  { code: "BOM", city: "Mumbai", region: "AS", lat: 19.09, lon: 72.87 },
  { code: "SIN", city: "Singapore", region: "AS", lat: 1.36, lon: 103.99 },
  { code: "BKK", city: "Bangkok", region: "AS", lat: 13.69, lon: 100.75 },
  { code: "MNL", city: "Manila", region: "AS", lat: 14.51, lon: 121.02 },
  { code: "SYD", city: "Sydney", region: "OC", lat: -33.95, lon: 151.18 },
  { code: "AKL", city: "Auckland", region: "OC", lat: -37.01, lon: 174.79 },
  // South America
  { code: "GRU", city: "Sao Paulo", region: "SA", lat: -23.43, lon: -46.47 },
  { code: "GIG", city: "Rio de Janeiro", region: "SA", lat: -22.81, lon: -43.25 },
  { code: "SCL", city: "Santiago", region: "SA", lat: -33.39, lon: -70.79 },
  { code: "BOG", city: "Bogota", region: "SA", lat: 4.70, lon: -74.15 },
  { code: "LIM", city: "Lima", region: "SA", lat: -12.02, lon: -77.11 },
  { code: "EZE", city: "Buenos Aires", region: "SA", lat: -34.82, lon: -58.54 },
];

const NA_SUN_REGIONS = new Set(["CA", "US", "MX", "CB", "CM"]);
const BY_CODE = Object.fromEntries(AIRPORTS.map((a) => [a.code, a]));

export function airport(code) {
  return BY_CODE[code] || null;
}

/** Great-circle distance in statute miles. */
export function distanceMiles(a, b) {
  const A = airport(a), B = airport(b);
  if (!A || !B) return null;
  const R = 3958.8, toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(B.lat - A.lat), dLon = toRad(B.lon - A.lon);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(A.lat)) * Math.cos(toRad(B.lat)) * Math.sin(dLon / 2) ** 2;
  return Math.round(R * 2 * Math.asin(Math.sqrt(s)));
}

/** AC zone: NA/Sun if both endpoints are in North America or Sun regions. */
export function zoneFor(a, b) {
  const A = airport(a), B = airport(b);
  if (!A || !B) return null;
  return NA_SUN_REGIONS.has(A.region) && NA_SUN_REGIONS.has(B.region)
    ? "NA_SUN"
    : "INTERNATIONAL";
}
