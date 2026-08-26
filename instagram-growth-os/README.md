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
currency). Search **30 built-in niches**, or type anything at all — see *Any niche* below.

| Screen | What it gives you |
|---|---|
| **CEO — Strategy** | Positioning, target audience (pains → desires → objections), content-pillar allocation, 90-day OKRs, three growth scenarios, on-track verdict, risk register |
| **HR** | Role definitions with hire triggers and costs, a time audit of your week, the 7-day production sprint, operating rules |
| **Script Writer** | A workbench that turns any topic into a filmable script: 8 frameworks with timing maps and per-beat word budgets, a 10-hook laboratory, voice rules, a delete-on-sight list, DM and collab scripts, and a script vault |
| **Idea Generator** | Your niche's topics × 12 angles, each scored /25 on search demand, emotion, specificity, provability and offer fit, then ranked. Save to a vault, push straight into the Operations pipeline, or send to the Script Writer |
| **Operations** | A kanban pipeline (Idea → Script → Shoot → Edit → Caption → Schedule → Publish) that seeds itself from the calendar, stage SOPs, automation list |
| **Marketing** | 28-day content calendar — clickable, regenerable, CSV-exportable — plus growth strategy, engagement quotas, hashtag sets, performance benchmarks |
| **Content Studio** | For any calendar slot: hook + alternates, 5-beat script, on-screen text, cover, B-roll, full caption, hashtags, story sequence, carousel slide-by-slide |
| **Today's Standup** | Every department's output collapsed into one checkable daily list, with a streak counter |
| **30-Day Sprint** | Set a steep target and get the real odds: breakout probability, expected outcome, a capacity check, a four-phase day-by-day plan and a pace chart |
| **Board Report** | Log weekly followers/reach/revenue, see actual vs projected on a chart, get a diagnosis |

**Export plan** downloads the whole thing as Markdown.

The departments are wired to each other: an idea can be pushed into the Operations
pipeline or opened in the Script Writer in one click, and the Script Writer pulls
topics straight off the Marketing calendar.

## Any niche

Thirty niches ship as full presets (fitness, finance, tech, business, food, fashion,
education, self-improvement, beauty, travel, photography, art, music, gaming, parenting,
relationships, mental health, pets, home decor, DIY, real estate, automotive, sports,
comedy, spirituality, books, language, career, wellness, dance) — each with its own
audience, pillars, offer ladder with prices, hashtag tiers, visual style and reach
multipliers.

Anything else is *resolved*, not ignored:

1. **Alias matching** — "gym and weight loss" resolves to Fitness, "stock market for
   beginners" to Finance, "wedding photography" to Photography. You get the full preset,
   with a handful of topics phrased in your exact words.
2. **Family fallback** — no preset for beekeeping, pottery or mechanical keyboards, so the
   niche is classified into one of eight families (skill, body, money, creative, lifestyle,
   knowledge, tech, entertainment) and every department is generated for it: pillars,
   offers, pricing, hashtags, calendar and scripts.

The onboarding tells you which of the two happened before you commit.

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

Revenue and offer maths still runs; it surfaces on the CEO screen as the run-rate, the
target verdict and the offer the thesis is built around.

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
    ├── data/niches.js          # 30 niche presets — the content brain
    ├── data/families.js       # alias resolution + 8 family templates for anything else
    ├── engine/growth.js        # stages, capacity, reach, funnel, revenue
    ├── engine/content.js       # hooks, calendar, captions, weekly sprint
    ├── engine/scripts.js       # frameworks, hook laboratory, script builder
    ├── engine/ideas.js         # angles, scoring rubric, seasonal demand
    ├── engine/chart.js         # the shared line/area chart with hover tooltips
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

## Design

Light-first, cool and deliberately quiet — a tool you sit inside for an hour, not a landing
page. One steel-blue accent does all the pointing; colour is otherwise reserved for state
and for data series. The dark theme is a soft slate rather than near-black, and the
`Theme` button cycles system → light → dark.

Chart series colours are validated for colour-vision separation against both surfaces
(CVD ΔE ≥ 8, normal-vision ΔE ≥ 15) rather than picked by eye. Charts share one renderer
with hover tooltips, a recessive grid and endpoint markers, and they re-measure on resize
— which is what fixed the stretched axis labels in the first version.

The palette, type scale and component specimens are mirrored in Figma as
**Growth OS — Design System**, with 32 colour variables across Light and Dark collections.
