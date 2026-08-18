/* ================= GROWTH OS · growth + revenue engine =================
   The single source of truth for every number in the app. Departments
   never invent figures; they read them from here.
   All assumptions are named constants so they can be argued with.
======================================================================= */
(function (G) {
  'use strict';

  const E = G.engine = {};

  /* ---------------- business stages ---------------- */
  E.TIERS = [
    { key: 'foundation', label: 'Stage 0 · Foundation', min: 0, max: 999, cold: 900, er: 0.080, churn: 0.015, focus: 'Find the 3 content angles that work. Revenue is a distraction below 500 followers — except for pre-selling.' },
    { key: 'traction', label: 'Stage 1 · Traction', min: 1000, max: 9999, cold: 2200, er: 0.060, churn: 0.018, focus: 'Double down on the winning format and launch your first paid offer. This is where a page becomes a business.' },
    { key: 'authority', label: 'Stage 2 · Authority', min: 10000, max: 49999, cold: 6000, er: 0.045, churn: 0.020, focus: 'Systemise production, hire an editor, raise prices, add brand deals as a second revenue line.' },
    { key: 'scale', label: 'Stage 3 · Scale', min: 50000, max: 249999, cold: 15000, er: 0.030, churn: 0.022, focus: 'You are a media company. Team, recurring revenue, and owned distribution (email/WhatsApp) outrank follower count.' },
    { key: 'enterprise', label: 'Stage 4 · Media Business', min: 250000, max: Infinity, cold: 35000, er: 0.022, churn: 0.025, focus: 'Diversify platforms and productise. Instagram becomes a channel, not the business.' }
  ];

  E.tier = function (followers) {
    followers = Math.max(0, followers || 0);
    return E.TIERS.find((t) => followers >= t.min && followers <= t.max) || E.TIERS[E.TIERS.length - 1];
  };
  E.nextTier = function (followers) {
    const i = E.TIERS.indexOf(E.tier(followers));
    return E.TIERS[i + 1] || null;
  };

  /* ---------------- production capacity ---------------- */
  /* Hours it realistically costs to ship one finished piece, start to publish. */
  E.COST_H = { reel: 1.4, carousel: 1.1, static: 0.45 };
  E.MIX = { reel: 0.60, carousel: 0.25, static: 0.15 };

  E.capacity = function (p) {
    const hours = G.clamp(Number(p.hours) || 8, 1, 80);
    const overhead = Math.min(hours * 0.35, 5);        // engagement, DMs, analytics, admin
    const prod = Math.max(0.5, hours - overhead);
    const avgCost = E.COST_H.reel * E.MIX.reel + E.COST_H.carousel * E.MIX.carousel + E.COST_H.static * E.MIX.static;
    let total = G.clamp(Math.round(prod / avgCost), 3, 14);

    const reel = Math.max(2, Math.round(total * E.MIX.reel));
    const carousel = Math.max(1, Math.round(total * E.MIX.carousel));
    const staticP = Math.max(0, total - reel - carousel);
    total = reel + carousel + staticP;

    return {
      hours, overhead: Math.round(overhead * 10) / 10, prodHours: Math.round(prod * 10) / 10,
      perWeek: { reel, carousel, static: staticP },
      totalWeek: total, totalMonth: Math.round(total * 4.33),
      storiesPerDay: hours >= 12 ? 4 : hours >= 7 ? 3 : 2,
      dmsPerDay: hours >= 12 ? 15 : hours >= 7 ? 10 : 6,
      commentsPerDay: hours >= 12 ? 40 : hours >= 7 ? 30 : 20
    };
  };

  /* ---------------- reach model ---------------- */
  E.MARKET = { IN: 1.15, US: 0.80, GLOBAL: 1.00 };
  E.NONFOLLOWER = { reel: 0.78, carousel: 0.55, static: 0.35 };
  E.FOLLOW_RATE = { reel: 0.0140, carousel: 0.0260, static: 0.0120 };

  E.reachPerPost = function (p, followers, quality) {
    const n = G.niche(p);
    const t = E.tier(followers);
    const q = quality == null ? 1 : quality;
    const cold = t.cold * n.reach * (E.MARKET[p.market] || 1) * q;
    return {
      reel: cold + followers * 0.85,
      carousel: cold * 0.40 + followers * 0.55,
      static: cold * 0.15 + followers * 0.45
    };
  };

  /* New followers a month of output produces at a given size. */
  E.monthlyGain = function (p, followers, quality) {
    const cap = E.capacity(p);
    const reach = E.reachPerPost(p, followers, quality);
    let gained = 0, totalReach = 0;
    ['reel', 'carousel', 'static'].forEach((f) => {
      const posts = cap.perWeek[f] * 4.33;
      const r = reach[f] * posts;
      totalReach += r;
      gained += r * E.NONFOLLOWER[f] * E.FOLLOW_RATE[f];
    });
    const lost = followers * E.tier(followers).churn;
    return { gained, lost, net: gained - lost, reach: totalReach };
  };

  /* Ramp: nobody's first month performs like their sixth. */
  E.RAMP = [0.55, 0.80, 1.00, 1.10, 1.15, 1.20];
  E.SCENARIO = { conservative: 0.60, base: 1.00, aggressive: 1.75 };

  E.project = function (p, months, scenario) {
    months = months || 6;
    const mult = E.SCENARIO[scenario || 'base'];
    let f = Math.max(0, Number(p.followers) || 0);
    const rows = [];
    for (let m = 0; m < months; m++) {
      const q = (E.RAMP[Math.min(m, E.RAMP.length - 1)]) * mult;
      const step = E.monthlyGain(p, f, q);
      const start = f;
      f = Math.max(0, f + step.net);
      rows.push({
        month: m + 1, start: Math.round(start), end: Math.round(f),
        gained: Math.round(step.gained), lost: Math.round(step.lost),
        net: Math.round(step.net), reach: Math.round(step.reach),
        tier: E.tier(f).label
      });
    }
    return rows;
  };

  E.projectAll = function (p, months) {
    return {
      conservative: E.project(p, months, 'conservative'),
      base: E.project(p, months, 'base'),
      aggressive: E.project(p, months, 'aggressive')
    };
  };

  /* ---------------- funnel ---------------- */
  E.FUNNEL = {
    profileVisitRate: 0.032,   // of total reach
    leadRate: 0.070,           // of profile visits (bio link + DM keyword)
    dmReplyRate: 0.30,         // of outbound DMs sent
    outboundQualityRate: 0.55  // outbound replies that are actually a fit
  };

  /* A solo operator cannot deliver unlimited services, however big the funnel.
     Digital products scale; human hours do not. */
  E.DELIVERY_CAP = { mid: 25, high: 8 };

  E.closeRate = function (price) {
    if (price <= 999) return 0.12;
    if (price <= 4999) return 0.07;
    if (price <= 19999) return 0.040;
    return 0.022;
  };

  /* Total reach counts the same person many times. The more you post, the
     larger that overlap — so unique humans grow far slower than impressions.
     Without this, big accounts model absurd revenue. */
  E.uniqueFactor = function (postsPerMonth) {
    return 1 / (1 + Math.max(0, postsPerMonth) / 30);
  };

  E.funnel = function (p, monthlyReach) {
    const cap = E.capacity(p);
    const unique = monthlyReach * E.uniqueFactor(cap.totalMonth);
    const visits = unique * E.FUNNEL.profileVisitRate;
    const inboundLeads = visits * E.FUNNEL.leadRate;
    const outboundConvos = cap.dmsPerDay * 30 * E.FUNNEL.dmReplyRate * E.FUNNEL.outboundQualityRate;
    return {
      reach: monthlyReach,
      uniqueReach: unique,
      visits,
      inboundLeads,
      outboundConvos,
      totalLeads: inboundLeads + outboundConvos
    };
  };

  /* ---------------- offers ---------------- */
  E.offers = function (p) {
    const n = G.niche(p);
    const f = Number(p.followers) || 0;
    return n.offers.map((o) => Object.assign({}, o, {
      unlocked: f >= o.gate,
      gapToUnlock: Math.max(0, o.gate - f)
    }));
  };

  E.primaryOffer = function (p) {
    const offers = E.offers(p).filter((o) => o.price > 0);
    const unlocked = offers.filter((o) => o.unlocked);
    const goal = p.goal || 'both';
    if (!unlocked.length) return offers[0];
    if (goal === 'money') return unlocked[unlocked.length - 1];   // push the highest ticket available
    return unlocked[0];                                           // lowest friction first
  };

  /* Brand-deal rate card. Base ₹350 per 1,000 followers per reel, adjusted
     for niche advertiser demand, market, and engagement quality. */
  E.rateCard = function (p) {
    const n = G.niche(p);
    const f = Math.max(0, Number(p.followers) || 0);
    const marketMult = p.market === 'US' ? 3.0 : p.market === 'GLOBAL' ? 1.6 : 1.0;
    const perK = 350 * n.cpm * marketMult;
    const reel = (f / 1000) * perK;
    return {
      perK,
      story: Math.max(500, reel * 0.25),
      staticPost: Math.max(800, reel * 0.55),
      reel: Math.max(1500, reel),
      bundle: Math.max(3000, reel * 1.9),           // 1 reel + 3 stories + usage
      monthlyRetainer: Math.max(8000, reel * 3.4),
      dealsPerMonth: f >= 50000 ? 3 : f >= 20000 ? 2 : f >= 8000 ? 1 : 0
    };
  };

  /* ---------------- revenue model ---------------- */
  E.revenue = function (p, monthlyReach) {
    const fn = E.funnel(p, monthlyReach);
    const offers = E.offers(p).filter((o) => o.price > 0 && o.unlocked);
    const rc = E.rateCard(p);
    const lines = [];

    /* Nothing unlocked yet? You can still pre-sell in the DMs from day one —
       that is exactly how a small account gets its first revenue. */
    if (!offers.length) {
      const cheapest = E.offers(p).filter((o) => o.price > 0).sort((a, b) => a.price - b.price)[0];
      if (cheapest) {
        const buyers = fn.totalLeads * E.closeRate(cheapest.price) * 0.5;
        lines.push({ name: cheapest.name + ' (pre-sale)', price: cheapest.price, units: buyers,
          revenue: buyers * cheapest.price, kind: 'Pre-sale', presale: true });
      }
      const totalP = lines.reduce((s, l) => s + l.revenue, 0);
      return { funnel: fn, lines: lines, total: totalP, perFollower: totalP / Math.max(1, Number(p.followers) || 1), presale: true };
    }

    const low = offers.filter((o) => o.price <= 2000)[0];
    const mid = offers.filter((o) => o.price > 2000 && o.price <= 9999)[0];
    const high = offers.filter((o) => o.price >= 10000)[0];

    if (low) {
      const buyers = fn.totalLeads * E.closeRate(low.price) * 0.85;
      lines.push({ name: low.name, price: low.price, units: buyers, revenue: buyers * low.price, kind: 'Digital product' });
    }
    if (mid) {
      const raw = fn.totalLeads * 0.35 * E.closeRate(mid.price);
      const buyers = Math.min(raw, E.DELIVERY_CAP.mid);
      lines.push({ name: mid.name, price: mid.price, units: buyers, revenue: buyers * mid.price, kind: 'Service',
        capped: raw > buyers });
    }
    if (high) {
      const raw = fn.totalLeads * 0.16 * E.closeRate(high.price);
      const buyers = Math.min(raw, E.DELIVERY_CAP.high);
      lines.push({ name: high.name, price: high.price, units: buyers, revenue: buyers * high.price, kind: 'High ticket',
        capped: raw > buyers });
    }
    if (rc.dealsPerMonth > 0) {
      lines.push({ name: 'Brand partnerships', price: rc.bundle, units: rc.dealsPerMonth, revenue: rc.bundle * rc.dealsPerMonth, kind: 'Sponsorship' });
    }

    const total = lines.reduce((s, l) => s + l.revenue, 0);
    return { funnel: fn, lines, total, perFollower: total / Math.max(1, Number(p.followers) || 1) };
  };

  /* Reverse-engineer the revenue target: what has to be true. */
  E.reverseEngineer = function (p) {
    const target = Math.max(0, Number(p.revTarget) || 0);
    const offer = E.primaryOffer(p) || { name: 'your core offer', price: 1000 };
    const close = E.closeRate(offer.price);
    const salesNeeded = target / Math.max(1, offer.price);
    const leadsNeeded = salesNeeded / close;
    const cap = E.capacity(p);
    const outbound = cap.dmsPerDay * 30 * E.FUNNEL.dmReplyRate * E.FUNNEL.outboundQualityRate;
    const inboundNeeded = Math.max(0, leadsNeeded - outbound);
    const visitsNeeded = inboundNeeded / E.FUNNEL.leadRate;
    const reachNeeded = visitsNeeded / E.FUNNEL.profileVisitRate;

    const now = E.monthlyGain(p, Number(p.followers) || 0, 1);
    const postsNow = cap.totalMonth;
    const reachPerPost = now.reach / Math.max(1, postsNow);
    const postsNeeded = reachNeeded / Math.max(1, reachPerPost);

    let verdict, tone;
    if (reachNeeded <= now.reach) { verdict = 'Reachable with your current output. Execution, not strategy, is the bottleneck.'; tone = 'ok'; }
    else if (postsNeeded <= postsNow * 1.8) { verdict = 'Close. Either raise output ~' + Math.ceil((postsNeeded / postsNow - 1) * 100) + '% or raise your price.'; tone = 'warn'; }
    else { verdict = 'Not reachable by posting harder. Raise price or add a higher-ticket offer — the maths says volume alone will not close this gap.'; tone = 'hot'; }

    return {
      target, offer, close, salesNeeded, leadsNeeded, outbound, inboundNeeded,
      visitsNeeded, reachNeeded, postsNeeded, postsNow, currentReach: now.reach, verdict, tone,
      priceForCurrentReach: target / Math.max(0.01, (E.funnel(p, now.reach).totalLeads * close))
    };
  };

  /* ---------------- 30-day sprint ----------------
     A short aggressive push is a different problem from steady compounding.
     Steady growth is arithmetic; a sprint target is mostly decided by whether
     one post breaks out. So the model treats breakouts as what they are —
     a probability you can raise with volume, not an outcome you can schedule.
  ------------------------------------------------- */

  E.SPRINT = {
    breakoutMultiple: 25,      // a breakout reaches ~25× your normal reel…
    breakoutFloor: 150000,     // …but never less than this, because a reel that
                               //    takes off is drawn from the platform's ceiling,
                               //    not from the size of your own audience
    breakoutFollowRate: 0.018, // cold viewers convert better on a breakout
    baseBreakoutRate: 0.020,   // chance any one disciplined reel breaks out
    hoursPerReel: 1.1          // sprint pace: batched, lighter edits
  };

  /* How far a post travels when it does break out. A 300-follower account and a
     30,000-follower account can land the same viral reel — which is exactly why
     a sprint from a small base is a real, if uncertain, possibility. */
  E.breakoutReach = function (p, ownReelReach) {
    const n = G.niche(p);
    const floor = E.SPRINT.breakoutFloor * n.reach * (E.MARKET[p.market] || 1);
    return Math.max(floor, ownReelReach * E.SPRINT.breakoutMultiple);
  };

  /* P(X >= k) for X ~ Poisson(lambda) — the chance of getting enough breakouts. */
  E.poissonAtLeast = function (k, lambda) {
    if (k <= 0) return 1;
    if (lambda <= 0) return 0;
    let term = Math.exp(-lambda), cum = term;
    for (let i = 1; i < k; i++) {
      term *= lambda / i;
      cum += term;
    }
    return Math.max(0, Math.min(1, 1 - cum));
  };

  /* Volume costs polish. Three reels a day means less time on each hook, each
     edit, each cover — so intensity buys shots on goal at a discount, never 1:1. */
  E.sprintQuality = (perDay) => Math.pow(0.85, Math.max(0, perDay - 1));

  E.breakoutRate = function (p) {
    const n = G.niche(p);
    /* Broad niches break out more often; narrow B2B niches rarely do. */
    return E.SPRINT.baseBreakoutRate * (n.reach / 1.2);
  };

  /* One scenario: `perDay` reels a day for `days` days. */
  E.sprintScenario = function (p, target, days, perDay) {
    const followers = Math.max(0, Number(p.followers) || 0);
    const quality = E.sprintQuality(perDay);
    const reach = E.reachPerPost(p, followers, quality);
    const posts = Math.round(perDay * days);

    /* Baseline: what the reels deliver without any post breaking out. */
    const perPost = reach.reel * E.NONFOLLOWER.reel * E.FOLLOW_RATE.reel;
    const churn = followers * E.tier(followers).churn * (days / 30);
    const baseline = Math.max(0, perPost * posts - churn);

    const pBreak = E.breakoutRate(p) * quality;
    const breakoutReach = E.breakoutReach(p, reach.reel);
    const perBreakout = breakoutReach * E.NONFOLLOWER.reel * E.SPRINT.breakoutFollowRate;
    const lambda = posts * pBreak;

    const gap = Math.max(0, target - baseline);
    const breakoutsNeeded = Math.ceil(gap / Math.max(1, perBreakout));
    const pHit = gap <= 0 ? 1 : E.poissonAtLeast(breakoutsNeeded, lambda);

    return {
      perDay, posts, days, quality,
      hoursPerWeek: perDay * 7 * E.SPRINT.hoursPerReel,
      baseline, perPost, perBreakout, breakoutReach, pBreak, lambda,
      pAnyBreakout: 1 - Math.pow(1 - pBreak, posts),
      breakoutsNeeded,
      expected: baseline + lambda * perBreakout,
      pHit
    };
  };

  E.sprint = function (p, target, days, perDay) {
    target = Math.max(1, Number(target) || 5000);
    days = Math.max(7, Number(days) || 30);
    const options = [1, 2, 3].map((n) => E.sprintScenario(p, target, days, n));
    const chosen = E.sprintScenario(p, target, days, perDay || 2);
    const capacityHours = Number(p.hours) || 10;

    let verdict, tone;
    if (chosen.baseline >= target) {
      verdict = 'Reachable on volume alone. No breakout required — just do not miss a day.';
      tone = 'ok';
    } else if (chosen.pHit >= 0.5) {
      verdict = 'A genuine coin flip. ' + Math.round(chosen.pHit * 100) + '% at this intensity, and the odds are yours to raise.';
      tone = 'ok';
    } else if (chosen.pHit >= 0.15) {
      verdict = 'A long shot, but not fantasy — about ' + Math.round(chosen.pHit * 100) + '%. It needs ' +
        chosen.breakoutsNeeded + ' post' + (chosen.breakoutsNeeded === 1 ? '' : 's') + ' to break out, and that is not something you can schedule.';
      tone = 'warn';
    } else {
      verdict = 'Not honest to plan for. At ' + Math.round(chosen.pHit * 100) + '%, this is a lottery ticket, not a target. ' +
        'The number this system actually delivers in ' + days + ' days is around ' + G.nice(chosen.expected) + '.';
      tone = 'hot';
    }

    return {
      target, days, chosen, options,
      requiredPerDay: target / days,
      capacityGap: chosen.hoursPerWeek - capacityHours,
      verdict, tone,
      honestTarget: G.nice(chosen.expected)
    };
  };

  /* Day-by-day structure. Four phases, because a 30-day push that does the
     same thing on day 28 as on day 3 has learned nothing. */
  E.sprintPhases = function (days) {
    const q = Math.round(days / 4);
    return [
      { name: 'Test', from: 1, to: q,
        goal: 'Find which hook style and which topic actually travel.',
        rule: 'Three different hook styles per topic. Change one variable at a time or you learn nothing.' },
      { name: 'Double down', from: q + 1, to: q * 2,
        goal: 'Kill what failed, remake what worked.',
        rule: 'Any post above 2× your average gets rebuilt with a new hook within 48 hours.' },
      { name: 'Amplify', from: q * 2 + 1, to: q * 3,
        goal: 'Borrow distribution instead of building it.',
        rule: 'Two collab posts and two trend-matched posts this week. Collabs put you in front of an audience you did not earn yet.' },
      { name: 'Push', from: q * 3 + 1, to: days,
        goal: 'Highest volume of the sprint, aimed only at proven formats.',
        rule: 'No experiments left. Every post is a variant of something that already worked.' }
    ];
  };

  /* ---------------- goal tracking ---------------- */
  E.goalStatus = function (p) {
    const proj = E.project(p, 6, 'base');
    const end = proj[proj.length - 1].end;
    const target = Number(p.followerTarget) || 0;
    const rev = E.revenue(p, E.monthlyGain(p, Number(p.followers) || 0, 1).reach);
    return {
      projected6m: end,
      followerTarget: target,
      followerGap: target - end,
      onTrackFollowers: end >= target,
      projectedRevenue: rev.total,
      revTarget: Number(p.revTarget) || 0,
      onTrackRevenue: rev.total >= (Number(p.revTarget) || 0)
    };
  };

  /* Engagement benchmark for the current size. */
  E.engagementTargets = function (p) {
    const f = Math.max(1, Number(p.followers) || 1);
    const t = E.tier(f);
    return {
      erTarget: t.er,
      likesPerPost: f * t.er * 0.82,
      commentsPerPost: f * t.er * 0.06,
      savesPerPost: f * t.er * 0.10,
      sharesPerPost: f * t.er * 0.09,
      reelViewsTarget: E.reachPerPost(p, f, 1).reel
    };
  };
})(window.IGOS);
