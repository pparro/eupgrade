# eupgrade.me — Product Brief

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Aeroplan flyers (any status tier, including none) checking whether an Air Canada
eUpgrade will clear on a specific flight. Two audiences are served as equals:

- **Experienced status flyers** who already know eUpgrades and want a fast, dense
  cost-and-timing answer.
- **Newcomers** who just earned credits (or hold a Latitude fare with no status)
  and don't yet know what an eUpgrade is — they enter through the `/guide` on-ramp.

## Product Purpose

A free, honest resource that answers, for **any** Air Canada route, fare, and
Aeroplan status: how many eUpgrade credits an upgrade costs, any cash add-on, and
when the clearance window opens (including the 36-hour waitlist cutoff). Success is
a flyer confidently deciding whether and when to spend credits — no login, no
guessing, no fake prediction.

## Positioning

An accurate calculator on a transparent rules engine, paired with honesty about
what isn't yet knowable. Where others omit clearance or imply certainty, this shows
availability only as a clearly-labelled range — never a fabricated percentage — and
states plainly that true clearance prediction is unbuilt. The moat is trust.

## Operating Context

Single-page marketing site plus a dedicated `/guide` route. The landing page
persuades a first-time visitor; the calculator and guide help someone complete a
task and understand a concept they didn't know before. Homepage flow: rotating hero
→ calculator (the hero of the page) → how it works → FAQ → Pro → a calm "coming
soon" clearance-prediction band above the footer. The calculator takes route-based
inputs (From/To airports with auto-computed distance and zone) plus a prominent
Aeroplan-status field. Deploy target: GitHub → Vercel → `eupgrade.me`.

## Capabilities and Constraints

- **Source of truth:** `src/rules.js` holds all credits, cash add-ons, clearance
  windows, and the availability heuristic. The `/guide` widget imports from it so
  the two surfaces cannot drift.
- **Unverified value:** whether the Super Elite add-on waiver extends to
  international Premium Economy (flagged in `rules.js`). Don't present PY pricing as
  certain until confirmed.
- **Terminology:** always "eUpgrade credits" in full, never "cr". eUpgrades apply
  to every tier and to no-status flyers on Latitude fares — never frame the tool as
  top-tier-only. The "Super Elite — add-on waived" badge is correct as-is.
- **Credit-card correction (must stay accurate):** cards do **not** grant credits; a
  premium card extends validity to 24 months and gives a priority tiebreaker.
- **Requesting ≠ clearing:** the upgrade list ranks cabin → status → fare →
  check-in time; check-in closes 60 min before departure (domestic and
  international alike, post-2024), list runs ~5 min later.
- **Pro (committed roadmap):** a real planned paid tier — credit-balance/expiry
  tracking, window-opening alerts, best-value flights. Pro must not claim clearance
  predictions as a shipped feature.
- **Clearance predictor (committed, pending validation):** genuinely intended but
  gated on two unanswered questions — (1) whether readable inventory predicts
  clearance, and (2) whether it can be pulled at scale within Air Canada's ToS.
  Until both are answered, no copy may imply a working predictor exists.
- Stack: Vite + React 18 + React Router 6; single `styles.css` with CSS-var tokens.

## Brand Commitments

- **Name:** rendered everywhere as `eupgrade.me` as one unit — `eupgrade` in slate,
  `.me` in green, same weight, no gap.
- **Logo (locked):** white checkmark on a solid green (`#097A54`) rounded-square
  tile — no black, no secondary accent, no arrow, no plane. Do not modify without an
  explicit design pass.
- **Voice:** grounded and specific, not hype-y — closer to a knowledgeable friend
  than a startup pitch deck. No airline-marketing gloss, no generic SaaS "unlock
  your potential" energy. States what it can't do as readily as what it can.
- **Anti-references:** no purple/indigo gradients, no glassmorphism, no generic
  AI-startup look; no navy/black/bright-blue. Never reference Air Canada's actual
  brand assets — no AC red, no maple leaf, nothing that could look like an official
  Air Canada product.
- **Independence:** an independent tool, not affiliated with or endorsed by Air
  Canada or Aeroplan; the footer disclaimer is a required, durable element.

## Evidence on Hand

- Working, deployable calculator and rules engine (`src/rules.js`,
  `src/components/Calculator.jsx`, `src/airports.js`).
- Full `/guide` page with an interactive clearance-window explainer (`src/Guide.jsx`).
- Real per-status credit grants: 25K = 5, 35K = 10, 50K = 15, 75K = 20, Super
  Elite = 30 credits.
- Brand assets in `public/` (favicons, apple-touch-icon, `og.png`).
- **Not on hand (do not fabricate):** a trained predictor, a live availability feed,
  the Pro backend, user testimonials, customer counts, or clearance-success stats.

## Product Principles

1. **Correct for everyone, not just elites.** Every tier and fare gets accurate
   numbers; the tool is never framed as top-tier-only.
2. **Honesty over hype.** Ranges, not fake percentages; say plainly what isn't built
   yet. Never sell future-flight predictions before they're validated.
3. **One source of truth.** All rules data lives in the rules layer; every surface
   reads from it.
4. **Free calculator as the front door.** The calculator (and the guide that makes
   it usable to newcomers) is the public good; Pro adds planning tools on top.
5. **Both audiences, no second class.** Speed and density for pros, a clear on-ramp
   for newcomers.
