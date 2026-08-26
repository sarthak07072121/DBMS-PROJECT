/* ================= EXECUTION · 30-DAY SPRINT ================= */
(function (G) {
  'use strict';
  G.views = G.views || {};
  const E = G.engine;

  function conf() {
    const s = G.store.sprint || {};
    return {
      target: s.target || 5000,
      days: s.days || 30,
      perDay: s.perDay || 2,
      start: s.start || G.today(),
      startFollowers: s.startFollowers == null
        ? (G.store.profile ? G.store.profile.followers : 0) : s.startFollowers,
      log: s.log || {}
    };
  }

  G.views.sprint = {
    title: '30-Day Sprint',
    render: function (p) {
      const c = conf();
      const s = E.sprint(p, c.target, c.days, c.perDay);
      const ch = s.chosen;
      const phases = E.sprintPhases(c.days);
      const n = G.niche(p);

      const dates = Object.keys(c.log).sort();
      const latest = dates.length ? c.log[dates[dates.length - 1]] : c.startFollowers;
      const gained = latest - c.startFollowers;
      const dayNo = Math.min(c.days, Math.max(0,
        Math.round((new Date(G.today()) - new Date(c.start)) / 864e5)));
      const requiredSoFar = s.requiredPerDay * dayNo;
      const pace = requiredSoFar > 0 ? gained / requiredSoFar : 0;

      /* intensity comparison */
      const optRows = s.options.map((o) => [
        '<b>' + o.perDay + ' reel' + (o.perDay > 1 ? 's' : '') + '/day</b>' +
        (o.perDay === c.perDay ? ' <span class="pill acc">chosen</span>' : ''),
        o.posts,
        Math.round(o.hoursPerWeek) + ' h/wk',
        G.pct(o.quality, 0),
        G.comma(o.baseline),
        G.pct(o.pAnyBreakout, 0),
        '<b>' + G.pct(o.pHit, 0) + '</b>',
        G.comma(o.expected),
        o.perDay === c.perDay ? '' : '<button class="btn sm" data-intensity="' + o.perDay + '">Use</button>'
      ]);

      /* 30-day plan */
      const planRows = [];
      for (let d = 1; d <= c.days; d++) {
        const ph = phases.find((x) => d >= x.from && d <= x.to) || phases[phases.length - 1];
        const date = G.addDays(c.start, d - 1);
        const isRest = d % 7 === 0;
        planRows.push([
          '<b>Day ' + d + '</b><div class="muted">' + G.dayName(date) + ' ' + G.prettyDate(date) + '</div>',
          '<span class="pill ' + (ph.name === 'Push' ? 'hot' : ph.name === 'Amplify' ? 'warn' : 'acc') + '">' + G.esc(ph.name) + '</span>',
          isRest ? '<span class="muted">0 — recovery</span>' : c.perDay + ' reels',
          G.comma(Math.round(c.startFollowers + s.requiredPerDay * d)),
          G.esc(dayTask(d, ph, c, n, isRest))
        ]);
      }

      const levers = [
        '<b>Shots on goal.</b> Going from ' + c.perDay + ' to ' + Math.min(3, c.perDay + 1) + ' reels a day moves your odds from ' +
        G.pct(ch.pHit, 0) + ' to ' + G.pct(s.options[Math.min(2, c.perDay)].pHit, 0) +
        '. Volume is the only lever fully under your control.',
        '<b>Widen the topic, not the niche.</b> A breakout needs people outside ' + G.esc(n.short.toLowerCase()) +
        ' to care. Frame ' + G.esc(n.short.toLowerCase()) + ' topics around money, time, embarrassment or effort and the addressable audience multiplies.',
        '<b>Collabs are borrowed distribution.</b> One collab reel with an account 5× your size can outperform a week of solo posting. Offer to write, film and edit the whole thing.',
        '<b>Hook first, always.</b> Between two identical videos, the hook decides a 10× difference in reach. Film two hook variants for every single reel — it costs 60 seconds.',
        '<b>First-hour engagement.</b> Reply to every comment for 60 minutes after posting. Comment velocity is what triggers the second distribution push that a breakout needs.',
        '<b>Repost your own winner.</b> If something breaks out on day 12, rebuild it three ways by day 15. Proven demand beats a new idea every time.'
      ];

      const paceTone = pace >= 1 ? 'ok' : pace >= 0.6 ? 'warn' : 'hot';

      return `
        <div class="page-head">
          <div class="eyebrow">Execution · Sprint mode</div>
          <h1>${G.comma(c.target)} followers in ${c.days} days</h1>
          <p class="lead">Steady growth is arithmetic. A target this steep is mostly decided by whether one post breaks out —
          so this page models the odds honestly and then maximises them, rather than pretending a schedule can guarantee it.</p>
        </div>

        <div class="kpis">
          ${G.kpi('Target', '+' + G.fmt(c.target), 'in ' + c.days + ' days from ' + G.comma(c.startFollowers))}
          ${G.kpi('Required per day', '+' + G.comma(s.requiredPerDay), 'every day, no misses')}
          ${G.kpi('Realistic outcome', '+' + G.fmt(ch.expected), 'expected value of this plan', ch.expected >= c.target ? 'ok' : 'warn')}
          ${G.kpi('Chance of hitting it', G.pct(ch.pHit, 0), ch.breakoutsNeeded + ' breakout post(s) needed', s.tone)}
          ${dates.length ? G.kpi('Actual pace', G.pct(pace, 0), '+' + G.comma(gained) + ' by day ' + dayNo, paceTone) : G.kpi('Logged', 'Day 0', 'log your count to start tracking')}
        </div>

        <div class="callout ${s.tone === 'ok' ? 'ok' : 'warn'}"><b>Straight answer:</b> ${G.esc(s.verdict)}</div>

        <div class="card">
          <div class="card-head"><h3>Sprint setup</h3>
            <button id="spReset" class="btn sm">Restart sprint from today</button></div>
          <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px">
            <label class="field" style="margin:0"><span>Follower target</span>
              <input id="spTarget" type="number" min="1" value="${c.target}"></label>
            <label class="field" style="margin:0"><span>Days</span>
              <input id="spDays" type="number" min="7" max="120" value="${c.days}"></label>
            <label class="field" style="margin:0"><span>Reels per day</span>
              <select id="spPerDay">${[1, 2, 3].map((i) => `<option value="${i}" ${i === c.perDay ? 'selected' : ''}>${i}</option>`).join('')}</select></label>
            <label class="field" style="margin:0"><span>Starting followers</span>
              <input id="spStart" type="number" min="0" value="${c.startFollowers}"></label>
          </div>
        </div>

        <div class="section"><h2>What each intensity actually buys you</h2>
          ${G.card('Shots on goal', G.table(
        ['Intensity', '#Posts', '#Time', '#Quality per post', '#Baseline adds', '#Chance of a breakout', '#Chance of hitting target', '#Expected adds', ''], optRows) +
        `<div class="callout"><b>How this is calculated.</b> Each reel has roughly a ${G.pct(ch.pBreak, 1)} chance of breaking out in
          ${G.esc(n.short.toLowerCase())} — a post that reaches about ${G.fmt(ch.breakoutReach)} people. One of those is worth about
          <b>${G.comma(ch.perBreakout)} followers</b>. Your posts without a breakout deliver roughly ${G.comma(ch.perPost)} followers each.
          ${ch.breakoutsNeeded === 0
            ? 'You do not need a breakout at all here — the volume clears the target on its own, so every viral post is upside rather than the plan.'
            : 'The probability column is the chance of getting the ' + ch.breakoutsNeeded + ' breakout' + (ch.breakoutsNeeded === 1 ? '' : 's') + ' you need across ' + ch.posts + ' posts.'}
          Quality per post falls as intensity rises — three a day means less time on every hook and every edit — so more volume buys
          more shots at a discount, never one for one.</div>` +
        (s.capacityGap > 0 ? `<div class="callout warn"><b>Capacity check:</b> ${c.perDay} reels a day is about
          ${Math.round(ch.hoursPerWeek)} hours a week. You told the CEO you have ${p.hours}. That is a
          ${Math.round(s.capacityGap)}-hour gap — either clear the time for 30 days, cut the edit quality to batch faster,
          or drop to ${Math.max(1, c.perDay - 1)} a day and accept the lower odds. Do not pretend the hours will appear.</div>`
          : `<div class="callout ok"><b>Capacity check:</b> ${Math.round(ch.hoursPerWeek)} hours a week fits inside the ${p.hours} you have. No excuse available.</div>`))}
        </div>

        ${G.card('Pace — required vs actual',
          '<div class="chart-wrap"><canvas id="spChart"></canvas></div><div id="spLegend"></div>')}

        ${G.card('Log today', `
          <div class="form-row">
            <label class="field" style="margin:0"><span>Date</span><input id="spDate" type="date" value="${G.today()}"></label>
            <label class="field" style="margin:0"><span>Follower count right now</span><input id="spNow" type="number" min="0" value="${latest}"></label>
            <div></div><div></div>
            <button id="spLog" class="btn primary" style="margin-bottom:14px">Log</button>
          </div>
          ${dates.length ? G.table(['Date', '#Followers', '#Gained', '#Vs required'],
          dates.slice().reverse().map((d) => {
            const day = Math.max(1, Math.round((new Date(d) - new Date(c.start)) / 864e5));
            const g2 = c.log[d] - c.startFollowers;
            const req = s.requiredPerDay * day;
            return [d + ' <span class="muted">(day ' + day + ')</span>', G.comma(c.log[d]), '+' + G.comma(g2),
            '<span class="pill ' + (g2 >= req ? 'ok' : 'hot') + '">' + G.pct(req ? g2 / req : 0, 0) + '</span>'];
          })) : '<p class="muted">Nothing logged yet. Log your count today and again every morning — a sprint you are not measuring daily is just a busy month.</p>'}`)}

        <div class="section"><h2>The ${c.days}-day plan</h2>
          <p class="muted">Four phases. Every seventh day is recovery — sprinting through it costs more output than it buys.</p>
          <div class="grid g4" style="margin-bottom:14px">
            ${phases.map((ph) => `<div class="card tight">
              <div class="split"><b>${G.esc(ph.name)}</b><span class="right pill">Day ${ph.from}–${ph.to}</span></div>
              <div class="muted" style="margin:6px 0">${G.esc(ph.goal)}</div>
              <div style="font-size:12.5px">${G.esc(ph.rule)}</div>
            </div>`).join('')}
          </div>
          ${G.card('Day by day', G.table(['Day', 'Phase', 'Output', '#Target count', 'Focus'], planRows))}
        </div>

        <div class="section"><h2>Levers that move the odds</h2>
          ${G.card('In order of impact', G.ol(levers))}
        </div>

        <div class="section"><h2>What will not work</h2>
          ${G.card('The shortcuts that cost more than they give', G.bullets([
            '<b>Bought followers.</b> They do not watch, so your view-to-follower ratio collapses and the algorithm stops showing you to real people. You would be paying to make the next 30 days harder.',
            '<b>Engagement pods.</b> Engagement from the same 40 accounts on every post signals a closed loop, which is the opposite of the signal that earns cold reach.',
            '<b>Follow/unfollow.</b> Costs hours, converts poorly, and builds an audience with no interest in what you sell.',
            '<b>Giveaway spikes.</b> You will hit a number and lose most of it in three weeks, and the survivors want free things, not your offer.',
            '<b>Reposting other accounts\u2019 viral clips.</b> Reach without attribution to you. The follows do not come, and the account has no identity left to monetise.'
          ]))}
        </div>`;
    },

    mount: function () {
      const p = G.store.profile;
      const c = conf();
      const write = (patch) => {
        G.store.sprint = Object.assign({}, c, patch);
        G.save(); G.render();
      };

      ['spTarget', 'spDays', 'spStart'].forEach((id) => {
        const el = G.$('#' + id);
        if (el) el.onchange = function () {
          write({
            target: Math.max(1, Number(G.$('#spTarget').value) || 5000),
            days: G.clamp(Number(G.$('#spDays').value) || 30, 7, 120),
            startFollowers: Math.max(0, Number(G.$('#spStart').value) || 0)
          });
        };
      });
      const pd = G.$('#spPerDay');
      if (pd) pd.onchange = function () { write({ perDay: Number(pd.value) || 2 }); };
      G.$$('[data-intensity]').forEach((b) => {
        b.onclick = function () { write({ perDay: Number(b.getAttribute('data-intensity')) }); };
      });
      const rs = G.$('#spReset');
      if (rs) rs.onclick = function () {
        if (!confirm('Restart the sprint from today? Your daily log will be cleared.')) return;
        write({ start: G.today(), startFollowers: p.followers, log: {} });
      };
      const lg = G.$('#spLog');
      if (lg) lg.onclick = function () {
        const date = G.$('#spDate').value || G.today();
        const val = Math.max(0, Number(G.$('#spNow').value) || 0);
        const log = Object.assign({}, c.log);
        log[date] = val;
        G.store.profile.followers = val;
        write({ log: log });
        G.toast('Logged — profile follower count updated');
      };

      /* ---- pace chart ---- */
      const S = G.chart.SERIES();
      const sp = E.sprint(p, c.target, c.days, c.perDay);
      const logDates = Object.keys(c.log).sort();

      const series = [
        { name: 'Required pace', color: S[0], dashed: true, points: [
          { x: 0, y: c.startFollowers }, { x: c.days, y: c.startFollowers + c.target }] },
        { name: 'What this plan expects', color: S[2], points: [
          { x: 0, y: c.startFollowers }, { x: c.days, y: c.startFollowers + sp.chosen.expected }] }
      ];
      if (logDates.length) {
        series.push({
          name: 'Your actual count', color: S[1], area: true,
          points: logDates.map((d) => ({
            x: G.clamp(Math.round((new Date(d) - new Date(c.start)) / 864e5), 0, c.days),
            y: c.log[d]
          }))
        });
      }

      G.chart.line(G.$('#spChart'), {
        series: series, height: 250, xMax: c.days, xLabel: 'D',
        yFormat: G.fmt, tipX: (v) => 'Day ' + Math.round(v)
      });
      const slg = G.$('#spLegend');
      if (slg) slg.innerHTML = G.chart.legend(series);
    }
  };

  function dayTask(d, ph, c, n, isRest) {
    if (isRest) return 'No posting. Reply to comments, refill the pipeline, and rest — this is what makes day 8 possible.';
    const idea = n.ideas[(d - 1) % n.ideas.length];
    const tasks = {
      'Test': [
        'Post "' + idea + '" with your most literal hook. This is the control.',
        'Same topic as yesterday, opposite hook style. Change one variable only.',
        'Post "' + idea + '" — lead with the result in frame one.',
        'Comment on 30 posts from accounts 5× your size, all under 2 hours old.',
        'Post "' + idea + '" as a story-led reel. Note which of the three held retention.'
      ],
      'Double down': [
        'Rebuild your best post so far with a new hook. Same idea, new door.',
        'Post "' + idea + '" in the format that won last week.',
        'Kill the format that underperformed twice. Stop making it for the rest of the sprint.',
        'Post "' + idea + '" and pin a comment that continues the idea.',
        'Analyse: which posts had over 70% non-follower reach? Make more of exactly those.'
      ],
      'Amplify': [
        'Send 10 collab pitches. Offer to write, film and edit the entire thing.',
        'Post a trend-matched version of "' + idea + '". Trend audio, your idea.',
        'Publish the collab. Post it as a collab so it lands on both audiences.',
        'Post "' + idea + '" and share it to three relevant story accounts.',
        'Start a numbered series — part 1 today. Series drive profile visits and follows.'
      ],
      'Push': [
        'Post the highest-performing format you have. No experiments left.',
        'Series part 2. Reference part 1 in the first three seconds.',
        'Post "' + idea + '" — your strongest proof asset of the sprint.',
        'Remake your best post of the whole sprint, third variant.',
        'Final push: two posts today, both variants of proven winners.'
      ]
    };
    const list = tasks[ph.name] || tasks['Push'];
    return list[(d - 1) % list.length];
  }
})(window.IGOS);
