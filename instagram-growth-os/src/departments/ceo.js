/* ================= DEPARTMENT · CEO ================= */
(function (G) {
  'use strict';
  G.views = G.views || {};
  const E = G.engine;

  G.views.ceo = {
    title: 'Office of the CEO',
    render: function (p) {
      const n = G.niche(p);
      const t = E.tier(p.followers);
      const next = E.nextTier(p.followers);
      const cap = E.capacity(p);
      const now = E.monthlyGain(p, p.followers, 1);
      const proj = E.projectAll(p, 6);
      const rev = E.revenue(p, now.reach);
      const gs = E.goalStatus(p);
      const re = E.reverseEngineer(p);
      const primary = E.primaryOffer(p);

      const goalWord = p.goal === 'followers' ? 'audience first' : p.goal === 'money' ? 'revenue first' : 'audience and revenue in parallel';

      /* ---- KPI strip ---- */
      const kpis = [
        G.kpi('Followers today', G.comma(p.followers), t.label),
        G.kpi('6-month projection', G.fmt(gs.projected6m), 'base case, ' + cap.totalWeek + ' posts/week', gs.onTrackFollowers ? 'ok' : 'warn'),
        G.kpi('Monthly reach capacity', G.fmt(now.reach), cap.totalMonth + ' posts/month'),
        G.kpi('Revenue run-rate', G.money(rev.total), 'from your unlocked offers', rev.total >= (p.revTarget || 0) ? 'ok' : 'warn'),
        G.kpi('Revenue per 1K followers', G.money(rev.perFollower * 1000), 'the only efficiency metric that matters')
      ].join('');

      /* ---- thesis ---- */
      const thesis = `
        <div class="callout"><b>The one-line thesis.</b> We are building
        <b>${G.esc(n.label)}</b> authority for <b>${G.esc(n.audience.who)}</b> aged ${G.esc(n.audience.age)},
        positioned as <b>${G.esc(n.positioning)}</b>, monetised through
        <b>${G.esc(primary ? primary.name : 'a digital offer')}</b> — optimising for ${goalWord}.</div>
        <p class="lead">A page is not a business. A business has a customer, an offer, a margin and a repeatable
        acquisition channel. Instagram is only the acquisition channel. Everything below is built backwards
        from the offer, not forwards from the posting.</p>`;

      /* ---- audience ---- */
      const aud = `<div class="grid g2">
        ${G.card('Who we are actually selling to', `
          <p class="muted" style="margin-bottom:10px">Age ${G.esc(n.audience.age)} · ${G.esc(n.audience.who)}</p>
          <h4>Interests</h4>${G.bullets(n.audience.interests.map(G.esc))}
          <h4 style="margin-top:14px">They already follow</h4>
          <p class="muted">Accounts in ${G.esc(n.short)} with 50K–500K followers. Those comment sections are your
          research file and your first 1,000 followers — mine them daily.</p>`)}
        ${G.card('Pain → desire map', `
          <h4>Pains (open with these)</h4>${G.bullets(n.audience.pains.map(G.esc))}
          <h4 style="margin-top:14px">Desires (close with these)</h4>${G.bullets(n.audience.desires.map(G.esc))}
          <h4 style="margin-top:14px">Objections (kill these in content)</h4>${G.bullets(n.audience.objections.map(G.esc))}`)}
      </div>`;

      /* ---- pillars ---- */
      const pillars = G.card('Content strategy — pillar allocation',
        n.pillars.map((pl) => `
          <div style="margin-bottom:13px">
            <div class="split"><b>${G.esc(pl.name)}</b><span class="right pill acc">${pl.pct}%</span></div>
            <div class="bar"><i style="width:${pl.pct * 2.6}%"></i></div>
            <div class="muted" style="margin-top:5px">${G.esc(pl.why)}</div>
          </div>`).join('') +
        `<div class="callout warn"><b>Strategy call:</b> this is a
         ${n.pillars[0].pct >= 30 ? n.pillars[0].name.toLowerCase() : 'mixed'}-led page.
         ${p.goal === 'money'
          ? 'Because the goal is revenue, 30% of posts must end in a DM or link CTA — reach without a funnel is a hobby.'
          : 'Because the goal is audience, prioritise share-driving and save-driving posts; sell in stories, not in the feed.'}</div>`,
        '<span class="pill">of every 20 posts</span>');

      /* ---- 90-day OKRs ---- */
      const okrRows = proj.base.slice(0, 3).map((m, i) => {
        const monthRev = E.revenue(p, m.reach);
        const fn = E.funnel(p, m.reach);
        return [
          '<b>Month ' + m.month + '</b>',
          G.comma(m.end),
          '+' + G.comma(m.net),
          G.fmt(m.reach),
          G.comma(Math.round(fn.totalLeads)),
          G.money(monthRev.total),
          ['Ship ' + cap.totalMonth + ' posts. Find 3 winning hooks.',
            'Launch ' + (primary ? primary.name : 'the first paid offer') + '. First 10 sales.',
            'Raise price or add the next offer tier. Hire the first freelancer.'][i]
        ];
      });
      const okrs = G.card('90-day OKRs (base case)',
        G.table(['Period', '#Followers', '#Net add', '#Reach', '#Leads', '#Revenue', 'Primary objective'], okrRows) +
        `<div class="muted" style="margin-top:10px">Base case assumes you actually ship ${cap.totalWeek} posts a week with
        disciplined hooks. Month 1 is discounted to 55% because nobody's first month performs like their sixth.</div>`);

      /* ---- scenarios ---- */
      const scenRows = ['conservative', 'base', 'aggressive'].map((s) => {
        const rows = proj[s];
        return [
          '<b>' + s.charAt(0).toUpperCase() + s.slice(1) + '</b>',
          G.comma(rows[0].end), G.comma(rows[2].end), G.comma(rows[5].end),
          G.money(E.revenue(p, rows[5].reach).total),
          { conservative: 'Inconsistent posting, average hooks, no engagement work.',
            base: 'You follow the operating system in this app.',
            aggressive: 'One or two posts break out; you double down immediately.' }[s]
        ];
      });

      /* ---- goal verdict ---- */
      const verdict = `
        <div class="grid g2">
          <div class="card tight">
            <h4>Follower goal</h4>
            <div class="k-v" style="font-size:22px;font-weight:800;margin:6px 0">
              ${G.comma(gs.projected6m)} <span class="muted" style="font-size:13px">vs target ${G.comma(gs.followerTarget)}</span></div>
            <span class="pill ${gs.onTrackFollowers ? 'ok' : 'hot'}">${gs.onTrackFollowers ? 'On track' : 'Short by ' + G.comma(Math.max(0, gs.followerGap))}</span>
            <p class="muted" style="margin-top:9px">${gs.onTrackFollowers
          ? 'Your capacity is sufficient. Protect consistency — that is the whole risk.'
          : 'Capacity is the binding constraint. Either add ' + Math.ceil((gs.followerTarget / Math.max(1, gs.projected6m) - 1) * cap.totalWeek) + ' posts/week, or extend the deadline. Do not pretend both are fine.'}</p>
          </div>
          <div class="card tight">
            <h4>Revenue goal</h4>
            <div class="k-v" style="font-size:22px;font-weight:800;margin:6px 0">
              ${G.money(rev.total)} <span class="muted" style="font-size:13px">vs target ${G.money(p.revTarget || 0)}</span></div>
            <span class="pill ${gs.onTrackRevenue ? 'ok' : re.tone}">${gs.onTrackRevenue ? 'On track' : 'Gap'}</span>
            <p class="muted" style="margin-top:9px">${G.esc(re.verdict)}</p>
          </div>
        </div>`;

      /* ---- CEO decisions ---- */
      const decisions = [
        `<b>Stage focus.</b> ${G.esc(t.focus)}`,
        next ? `<b>Next milestone.</b> ${G.comma(Math.max(0, next.min - p.followers))} followers to reach ${G.esc(next.label)}, which unlocks
                ${E.offers(p).filter((o) => o.gate > p.followers && o.gate <= next.min).map((o) => G.esc(o.name)).join(', ') || 'higher pricing and brand deals'}.`
          : '<b>Next milestone.</b> You are past follower milestones — the constraint is now product and team, not reach.',
        `<b>Capital.</b> ${p.budget > 0 ? G.money(p.budget) + '/month is allocated. ' : 'You have no budget allocated, so time is your only capital. '}
         ${p.budget >= 5000 ? 'The highest-return line is an editor — it buys back the hours that cap your output.' : 'Spend nothing on ads until one organic post beats 3x your average reach. Boosting weak content just buys a bigger audience for a bad post.'}`,
        `<b>The one number.</b> ${p.goal === 'money'
          ? 'Qualified DM conversations per week. Everything else is vanity until this is above ' + Math.ceil(re.leadsNeeded / 4.33) + '.'
          : 'Non-follower reach share per reel. Below 60% you are talking to yourself; above 75% you are compounding.'}`,
        `<b>What we will not do.</b> No follow-for-follow, no engagement pods, no bought followers. They destroy the ratio the algorithm uses to decide whether to show you to strangers — and they poison the audience quality every future advertiser will audit.`
      ];

      /* ---- risks ---- */
      const risks = G.table(['Risk', 'Likelihood', 'Impact', 'Mitigation'], [
        ['Consistency collapse in week 3', '<span class="pill hot">High</span>', 'Kills compounding', 'Batch a 2-week buffer before launch. Never post from an empty queue.'],
        ['Reach plateau after early spike', '<span class="pill warn">Medium</span>', 'Growth stalls', 'Rotate hooks weekly; retire any format whose reach drops 3 posts in a row.'],
        ['Single-platform dependency', '<span class="pill warn">Medium</span>', 'Existential', 'Move ' + (p.goal === 'money' ? '10%' : '5%') + ' of followers to email/WhatsApp. You own that list; you rent the followers.'],
        ['No offer when audience is hot', '<span class="pill hot">High</span>', 'Revenue lost permanently', 'Have the lead magnet live before you hit ' + G.comma(Math.max(500, p.followers)) + ' followers.'],
        ['Burnout', '<span class="pill warn">Medium</span>', 'Total stop', 'Hard cap at ' + cap.hours + ' hrs/week. One full rest day. Outsource editing first.']
      ]);

      return `
        <div class="page-head">
          <div class="eyebrow">Step 1 · CEO thinking</div>
          <h1>Strategic thesis for ${G.esc(n.label)}</h1>
          <p class="lead">Decisions the rest of the company executes against. Change the inputs and every department re-plans.</p>
        </div>
        <div class="kpis">${kpis}</div>
        ${thesis}
        <div class="section"><h2>Target audience</h2>
          <p class="muted">You cannot write a hook for "everyone". This is the person every post is aimed at.</p>${aud}</div>
        <div class="section"><h2>Content strategy</h2>
          <p class="muted">Fixed allocation stops you drifting into whatever felt fun that day.</p>${pillars}</div>
        <div class="section"><h2>Growth goals</h2>${okrs}
          ${G.card('Six-month scenarios', G.table(['Scenario', '#Month 1', '#Month 3', '#Month 6', '#Rev/mo at M6', 'What it assumes'], scenRows))}
        </div>
        <div class="section"><h2>Are we on track?</h2>${verdict}</div>
        <div class="section"><h2>CEO decisions this quarter</h2>${G.card('Standing orders', G.ol(decisions))}</div>
        <div class="section"><h2>Risk register</h2>${G.card('What kills this business', risks)}</div>`;
    }
  };
})(window.IGOS);
