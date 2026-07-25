/* Waitlist signup for the "coming soon" predictor.

   Posts straight to the Supabase REST API so no client library is needed.
   To turn it on:
     1. Create a `waitlist` table (e.g. columns: id uuid pk default gen_random_uuid(),
        email text unique not null, created_at timestamptz default now()).
     2. Add an RLS policy allowing INSERT for the `anon` role.
     3. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (see .env.example).
   Until those are set, the form reports honestly that sign-ups aren't open yet
   rather than pretending to capture the address. */

const BASE = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const notifyConfigured = Boolean(BASE && KEY);

export async function subscribeEmail(email) {
  if (!notifyConfigured) {
    const err = new Error("not-configured");
    err.code = "not-configured";
    throw err;
  }

  const res = await fetch(`${BASE}/rest/v1/waitlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ email }),
  });

  // 409 = already on the list (unique-email violation) — that's a success to the user.
  if (!res.ok && res.status !== 409) {
    throw new Error(`signup-failed-${res.status}`);
  }
}
