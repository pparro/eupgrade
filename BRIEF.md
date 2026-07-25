# eupgrade.me — implementation brief

This covers everything decided in a design/planning session that hasn't been built yet.
Each section is a discrete task. Work through them in order — later ones (guide page)
depend on earlier ones (palette) being in place.

---

## 1. Brand identity

**Name:** Everywhere user-facing, the brand is `eupgrade.me` — one unit, no gap. Update:
- Nav wordmark in `App.jsx`
- `<title>` in `index.html`
- Footer
Style: `eupgrade` in slate, `.me` in green, same weight, no gap, no separate icon color scheme.

**Palette** — replace the current indigo/sky tokens in `styles.css` with:
```css
--bg:#F6F5F2; --bg-2:#EDEBE5; --card:#FFFFFF;
--slate:#2E3538; --slate-2:#4A5457; --ink:#242B2E; --ink-2:#565F62; --muted:#8A9194;
--line:#E4E1D9;
--green:#0C9A6C; --green-deep:#097A54; --green-bg:#E3F6EE;
--bronze:#A97A4B; --bronze-deep:#8C6238; --bronze-bg:#F3E9DC;
```
No navy, no indigo, no bright blue anywhere (including link colors — check nav link hover states,
which were leftover indigo and need to move to `--ink-2` / `--slate`).

**Logo mark (final, locked):** white checkmark on a solid green rounded-square tile. No black,
no secondary accent, no arrow, no plane — deliberately simple.
```svg
<svg viewBox="0 0 40 40">
  <rect x="2" y="2" width="36" height="36" rx="11" fill="#097A54"/>
  <path d="M11 21 L17 27 L29 12" stroke="#fff" stroke-width="4.8"
        stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>
```
Use this as: nav icon (next to wordmark, ~26px), favicon (export at 16/32/180/512px as static
PNGs — don't rely on live SVG scaling for favicon; browsers want fixed raster sizes), and app icon
if one is ever needed. This is a stable, finished asset — do not modify without an explicit design
pass first.

---

## 2. Predictor: move to bottom, tone down

- Remove the `<Read>` gauge/likelihood card from the hero entirely.
- Remove the "Clearance likelihood — early access" locked box from inside the Calculator result.
- Add one calm section just above the footer: heading like "Coming soon: will it actually clear?",
  one sentence explaining we're building predictions from real flight data, no fake numbers, no gauge.
- Reposition the whole site's framing as a **free eUpgrade resource**, not a paid Pro tool. The
  calculator is the hero of the page. Pro section can stay, but make sure Pro's feature list doesn't
  still claim "clearance predictions" as a shipped paid feature — either soften it to the
  tracker/alerts features that are real today, or mark it "coming to Pro" consistent with the
  hero section above.

---

## 3. "How it works" section rewrite

Remove any Super Elite–specific framing — the tool applies to every Aeroplan status tier, and
to no-status flyers on Latitude fares. (Exception: the "Super Elite — add-on waived" badge in the
calculator result stays as-is; that one is factually Super-Elite-specific and correct.)

Replace the three cards with plain explanations of what the calculator actually shows:
1. How many eUpgrade credits the upgrade costs, plus any cash add-on
2. When the clearance window opens, and the 36-hour waitlist cutoff
3. That it works for any route, fare, and status — not just top-tier flyers

---

## 4. Calculator: route-based inputs

Already built and working — port from the existing `Calculator.jsx` / `airports.js` (route entry
with auto-computed distance and zone) if not already merged into main. Confirm:
- From/To airport selects replace raw mileage entry
- "Your Aeroplan status" is its own labeled field, prominent
- Segment summary line shows computed distance + zone (e.g. "YYZ→NRT · 6,399 mi · International")
- Cost card says "eUpgrade credits" in full, never "cr"

---

## 5. Rotating hero headline

Cycle every ~3.8s through 5 lines with a soft fade (see existing `RotatingHeadline` component):
- "Will your Air Canada upgrade actually clear?"
- "Stop letting your eUpgrades go to waste."
- "eUpgrades expiring? Spend them where they count."
- "Know before you book if that upgrade will clear."
- "Turn credits into front-cabin seats."

---

## 6. New page: `/guide` — "eUpgrades, explained simply"

This is a full new route, not a modification of the homepage. Add React Router (or equivalent)
if not already present.

**Add an entry point on the homepage:** a calm link near the top — "New to eUpgrades? Start here →"
— pointing to `/guide`. This matters: the calculator is useless to someone who doesn't know what
an eUpgrade is, and this is currently the only way in for that person.

**Content and interactive widget:** fully written and built already — port directly from the
working file. Structure:
1. What is an eUpgrade (coupon analogy)
2. Where credits come from — real per-status numbers: 25K=5, 35K=10, 50K=15, 75K=20, Super
   Elite=30 credits. Correct the credit-card myth explicitly: cards do NOT grant credits, a
   premium card extends validity to 24 months and gives a priority tiebreaker — nothing more.
3. What an upgrade costs (route/fare/cabin, tightened copy)
4. The catch — requesting isn't clearing; the upgrade list ranking (cabin → status → fare →
   check-in time); "stop looking at the seat map" callout
5. Interactive clearance-window explainer — **vertical stepped timeline** (not a slider, not a
   horizontal bar — both were tried and rejected for overlap/confusion issues). Status + region +
   AC fare-brand dropdown (Economy Basic/Standard/Comfort/Flex/Latitude, Premium Economy
   Lowest/Flexible) drives a plain-language step list: booking → window opens (or "clears
   immediately" for flexible fares) → 36 hours before departure → departure day.
6. "So you're on the list. Now what?" — check-in closes 60 minutes before departure (same for
   domestic and international as of the 2024 change, no more 45/55 split), upgrade list runs
   ~5 minutes later (~55 min before departure), ranked by the same cabin→status→fare→check-in
   order. Include "check in right at 24 hours" tip and "you board, you lose" note.
7. Five-line recap, then a CTA button back to `#calculator`.

**Important:** the widget currently has its own copy of window-day numbers and fare list for
portability. When integrating, have it import from `rules.js` instead, so the guide and the
calculator can never silently drift apart when the charts are updated.

---

## 7. SEO / share preview tags

Add to `index.html` `<head>`:
```html
<title>Air Canada eUpgrade Calculator — Cost, Credits & Clearance | eupgrade.me</title>
<meta name="description" content="Free tool to check any Air Canada flight: how many eUpgrade credits an upgrade costs, when your clearance window opens, and whether it's worth using your credits. Any route, fare, and Aeroplan status." />

<meta property="og:type" content="website" />
<meta property="og:url" content="https://eupgrade.me" />
<meta property="og:title" content="Will your Air Canada upgrade clear?" />
<meta property="og:description" content="See what an eUpgrade costs, when your window opens, and whether it's worth using your credits — free, for any route and status." />
<meta property="og:image" content="https://eupgrade.me/og.png" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Will your Air Canada upgrade clear?" />
<meta name="twitter:description" content="Free eUpgrade cost, window, and clearance tool for Air Canada flyers." />
<meta name="twitter:image" content="https://eupgrade.me/og.png" />
```
Needs a real `public/og.png` (1200×630) or the image tags will show broken previews — generate one
using the new palette/logo (green tile mark + "eupgrade.me — Will your upgrade clear?" on the
stone/slate palette) rather than shipping the meta tags without it.

---

## Verification before push

1. `npm run dev`, click through: homepage → guide link → guide page → widget interactions →
   back to calculator → pricing.
2. Confirm no leftover indigo/blue anywhere (nav links, buttons, focus rings).
3. Confirm the predictor gauge is gone from the hero and calculator, present only as the calm
   "coming soon" section near the footer.
4. Test the share preview: after deploy, paste the live URL into iMessage or use a card-validator
   tool to confirm the OG title/image render correctly (previews cache, so a `?v=2` query string
   helps force a fresh fetch when testing).
5. `npm run build` locally before pushing to catch any errors early.
