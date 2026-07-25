# eupgrade

Air Canada eUpgrade cost, clearance-window, and likelihood tool. Vite + React.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the build locally
```

## Project layout

```
index.html              Vite entry, loads fonts + /src/main.jsx
src/
  main.jsx              React root
  App.jsx               page composition (nav, hero, sections, footer)
  styles.css            all styles (design tokens as CSS vars at top)
  rules.js              eUpgrade engine + data — the source of truth for
                        credits, add-ons, clearance windows, and the
                        availability heuristic. Ported from eupgrade-rules.v1.json.
  components/
    Read.jsx            the likelihood "Read" card (availability → band)
    Calculator.jsx      cost + window calculator
    Timeline.jsx        clearance-window strip
    Pricing.jsx         free / Pro plans
```

The single most important file is `src/rules.js`. When Air Canada changes the
charts, edit that one file. One value in it is still unverified — the Super
Elite add-on waiver on international Premium Economy — flagged in the file header.

## Ship it: GitHub → Vercel → eupgrade.me

### 1. Push to GitHub
```bash
git init && git add . && git commit -m "eupgrade v0.1"
# create an empty repo on github.com, then:
git remote add origin git@github.com:YOU/eupgrade.git
git push -u origin main
```

### 2. Deploy on Vercel
- vercel.com → New Project → import the repo.
- Framework preset: **Vite** (auto-detected). Build `npm run build`, output `dist`.
- Deploy. You get a `*.vercel.app` URL immediately.

### 3. Point eupgrade.me (GoDaddy) at Vercel
In Vercel: Project → Settings → Domains → add `eupgrade.me`. Vercel shows the
records to set. Then in **GoDaddy → your domain → DNS**:

- **Apex (`eupgrade.me`)**: add an **A record**, host `@`, value = the IP Vercel
  gives you (currently `76.76.21.21`, but use whatever Vercel shows).
- **www**: add a **CNAME**, host `www`, value `cname.vercel-dns.com`.

Delete any GoDaddy "parked" A record on `@` first, or it'll conflict. DNS takes
minutes to a few hours; Vercel issues HTTPS automatically once it resolves.
Simpler alternative: switch GoDaddy's nameservers to Vercel's and let Vercel
manage DNS — Vercel will offer this during domain setup.

## Environment variables (only when you add Supabase)

The current build has no backend. When you wire submissions/auth:

1. Copy `.env.example` → `.env.local`, fill in the two `VITE_SUPABASE_*` values.
2. Set the same two in Vercel → Settings → Environment Variables.
3. Only the **anon** key belongs here. It's safe in client code; Row Level
   Security protects the data. Never expose the service_role key.

## What this is and isn't

**Is:** a correct, deployable calculator plus an honest, clearly-labelled
availability heuristic shown as a range, not a fake percentage.

**Isn't (yet):** a trained predictor, a live availability feed, or the Pro
backend. Those come after two things are settled — (1) whether an externally
readable inventory bucket actually predicts clearance, and (2) whether you can
pull that availability at scale within terms of service. Don't sell future-flight
predictions before both are answered.
