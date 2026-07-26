-- Waitlist for the "coming soon" clearance predictor.
-- src/notify.js POSTs { email } to /rest/v1/waitlist using the anon key.
-- Run this once in the Supabase SQL Editor (or via the Supabase CLI).

create table if not exists public.waitlist (
  id         uuid        primary key default gen_random_uuid(),
  email      text        not null unique,
  created_at timestamptz not null default now(),
  -- basic sanity check; the client also validates with type="email"
  constraint waitlist_email_format check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

alter table public.waitlist enable row level security;

-- Public signup: anyone may INSERT their email. There is deliberately NO
-- select/update/delete policy, so the anon key can add to the list but can
-- never read, change, or remove entries. Read the list with the service_role
-- key (server side) or in the Supabase dashboard.
drop policy if exists "anon can join waitlist" on public.waitlist;
create policy "anon can join waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);
