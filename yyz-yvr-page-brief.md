# YYZ–YVR Route & Flight Page Brief

Source: AC published network schedule (effective 31JUL26 onward), parsed into
`yyz-yvr-route-detail.json`. Schedule data only — no seat/fare-class data.

## Recommended build order

1. **`/flights/ac033`** (flagship) — Toronto → Vancouver, daily.
   - 787-9 (31JUL26–29SEP26), then 777-200LR (30SEP26 onward)
   - Always widebody → always has J + Premium Economy
   - Cleanest single-flight example on the route; build this page first

2. **`/flights/ac185`** (secondary flagship) — same treatment, swaps only
   between 777-300ER and 787-9.

3. **`/routes/yyz-yvr`** — route overview page, listing all 21 flight numbers.
   Split them visibly into two groups so the page teaches something real:
   - **Widebody flights** (AC033, AC101 select dates, AC105, AC107, AC109,
     AC111, AC117, AC119, AC121, AC125, AC131, AC181, AC183, AC185, AC187) —
     flag which are *consistently* widebody (033, 185) vs *sometimes*
     widebody (the rest)
   - **Narrowbody flights** (mostly A321/A220, some 737 MAX) — smaller
     recliner J, no Premium Economy, generally worse upgrade math

## Copy notes / placeholder disclaimer

Until the ten-flight validation test confirms availability-bucket data
predicts clearance, any probability numbers shown on these pages must be
marked as illustrative, not live predictions. Suggested inline disclaimer,
consistent with the existing [Official]/[Community] sourcing convention:

> "Example only — based on typical historical patterns for this route, not
> live availability. Real-time clearance predictions are in testing."

Do not remove this until the validation test passes.

## What's NOT in this data (don't imply it)

- No seat map / fare-class (R/N bucket) data — that comes from Amadeus
- No historical clearance outcomes — that's your crowdsourced screenshot data
- Aircraft assignments will drift from this snapshot as AC republishes
  schedules; treat as directional, re-pull periodically
