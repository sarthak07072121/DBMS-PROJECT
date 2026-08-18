# Growth OS — an Instagram business, run like a company

A single-page app that turns three answers — **your niche, your follower count, your goal** —
into a complete operating plan run by seven departments, with the maths behind every number.

Not a checklist of generic creator advice. Every figure on every screen is computed from a
stated model, and every assumption is a named constant you can argue with and change.

## Run it

No build step, no dependencies, no server required.

```
open instagram-growth-os/index.html          # macOS
start instagram-growth-os\index.html         # Windows
xdg-open instagram-growth-os/index.html      # Linux
```

Or serve it (needed only if you want it on your phone over the local network):

```
cd instagram-growth-os && python3 -m http.server 8080
```

Everything is stored in your browser's `localStorage`. Nothing is uploaded anywhere.
"Reset company" wipes it.

## What it does

**Onboarding** asks the three CEO questions, plus capacity (hours/week, budget, market,
currency). Pick one of 8 built-in niches or type your own — a custom niche falls back to a
generic model that fills your niche name into every template.

| Screen | What it gives you |
|---|---|
| **CEO — Strategy** | Positioning, target audience (pains → desires → objections), content-pillar allocation, 90-day OKRs, three growth scenarios, on-track verdict, risk register |
| **HR** | Role definitions with hire triggers and costs, a time audit of your week, the 7-day production sprint, operating rules |
| **Sales** | Offer ladder with follower gates, the funnel with your actual numbers, reverse-engineered revenue target, 6 copy-paste DM scripts, brand-deal rate card |
| **Finance** | Stage-based budget allocation, tool stack with costs, unit economics (CAC / LTV / break-even), and a working ROI ledger |
| **Operations** | A kanban pipeline (Idea → Script → Shoot → Edit → Caption → Schedule → Publish) that seeds itself from the calendar, stage SOPs, automation list |
| **Marketing** | 28-day content calendar — clickable, regenerable, CSV-exportable — plus growth strategy, engagement quotas, hashtag sets, performance benchmarks |
| **Content Studio** | For any calendar slot: hook + alternates, 5-beat script, on-screen text, cover, B-roll, full caption, hashtags, story sequence, carousel slide-by-slide |
| **Today's Standup** | Every department's output collapsed into one checkable daily list, with a streak counter |
| **Board Report** | Log weekly followers/reach/revenue, see actual vs projected on a chart, get a diagnosis |

**Export plan** downloads the whole thing as Markdown.

## The model

All of it lives in `src/engine/growth.js`. The numbers that matter:

- **Stages** — 0–1K, 1K–10K, 10K–50K, 50K–250K, 250K+. Cold reach, engagement benchmarks,
  churn and budget splits all change at these boundaries.
- **Capacity** — hours/week minus engagement overhead, divided by realistic production cost
  per piece (reel 1.4h, carousel 1.1h, static 0.45h), capped at 14 posts/week.
- **Reach** — `cold reach × niche multiplier × market multiplier + followers × format factor`.
- **Follower gain** — non-follower reach × format follow-rate, minus stage churn. A ramp factor
  discounts month 1 to 55%, because nobody's first month performs like their sixth.
- **Funnel** — impressions → *unique* people (audience overlap grows with posting volume) →
  profile visits (3.2%) → leads (7%) → sales (close rate falls as price rises).
- **Delivery caps** — a solo operator can serve 8 high-ticket and 25 mid-ticket clients a month.
  Past that the model tells you to raise prices, not to chase more reach.

Three scenarios are shown throughout: conservative (×0.6), base (×1.0), aggressive (×1.75).
**Base assumes you actually ship what the calendar says.**

Prices are stored in INR. Choosing USD converts at a fixed ₹85 = $1 for entry and display —
convenient, not a live rate, and tool prices reflect Indian pricing.

## Files

```
instagram-growth-os/
├── index.html                  # shell + onboarding wizard
├── assets/app.css              # design system
└── src/
    ├── util.js                 # helpers, store, localStorage
    ├── data/niches.js          # 8 niches + generic fallback — the content brain
    ├── engine/growth.js        # stages, capacity, reach, funnel, revenue, budget
    ├── engine/content.js       # hooks, calendar, scripts, captions, sprint
    ├── departments/*.js        # one file per department view
    └── app.js                  # onboarding, router, Markdown export
```

Adding a niche = adding one object to `src/data/niches.js`. Every department picks it up
automatically.

## Honest limits

- Projections are a model, not a promise. The Board Report exists so reality can correct it —
  log real numbers weekly and trust those over the forecast.
- Reach and conversion constants are informed estimates, not platform data. They are all in
  one place precisely so you can tune them once you have your own numbers.
- The app plans and writes; it does not post. No Instagram API access, no automation of
  engagement — deliberately, because that is what gets accounts restricted.
