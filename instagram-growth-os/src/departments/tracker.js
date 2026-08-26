/* ================= EXECUTION · BOARD REPORT ================= */
(function (G) {
  'use strict';
  G.views = G.views || {};
  const E = G.engine;

  G.views.tracker = {
    title: 'Board Report',
    render: function (p) {
      const logs = (G.store.logs || []).slice().sort((a, b) => a.date < b.date ? -1 : 1);
      const proj = E.project(p, 6, 'base');
      const first = logs[0], last = logs[logs.length - 1];

      const gained = logs.length > 1 ? last.followers - first.followers : 0;
      const weeks = logs.length > 1
        ? Math.max(1, (new Date(last.date) - new Date(first.date)) / (7 * 864e5)) : 0;
      const perWeek = weeks ? gained / weeks : 0;
      const perMonth = perWeek * 4.33;
      const projMonthly = proj[0].net;
      const ratio = projMonthly ? perMonth / projMonthly : 0;

      const revTotal = logs.reduce((s, l) => s + Number(l.revenue || 0), 0);
      const postsTotal = logs.reduce((s, l) => s + Number(l.posts || 0), 0);
      const followersPerPost = postsTotal ? gained / postsTotal : 0;

      const rows = logs.slice().reverse().map((l, i, arr) => {
        const prev = arr[i + 1];
        const delta = prev ? l.followers - prev.followers : 0;
        return [
          G.esc(l.date),
          G.comma(l.followers),
          prev ? (delta >= 0 ? '<span style="color:#2fd08a">+' + G.comma(delta) + '</span>' : '<span style="color:#ff4d6d">' + G.comma(delta) + '</span>') : '—',
          G.fmt(l.reach || 0),
          G.money(Number(l.revenue || 0), { raw: true }),
          l.posts || 0,
          l.posts ? (((l.reach || 0) / l.posts) | 0).toLocaleString('en-IN') : '—',
          '<button class="btn sm" data-del-log="' + G.esc(l.id) + '">Remove</button>'
        ];
      });

      let diagnosis, tone;
      if (!logs.length) { diagnosis = 'No data yet. Log your first entry today — it becomes the baseline everything is measured against.'; tone = ''; }
      else if (logs.length === 1) { diagnosis = 'Baseline recorded. Come back next Sunday; one point is not a trend.'; tone = ''; }
      else if (ratio >= 1) { diagnosis = 'Ahead of plan at ' + Math.round(ratio * 100) + '% of the base case. Do not change the strategy — increase the volume of whatever is working and raise your price.'; tone = 'ok'; }
      else if (ratio >= 0.6) { diagnosis = 'Tracking at ' + Math.round(ratio * 100) + '% of plan. The system works; the hooks are the constraint. Test 3 openings on your best-performing topic this week.'; tone = 'warn'; }
      else if (ratio > 0) { diagnosis = 'At ' + Math.round(ratio * 100) + '% of plan. Two usual causes: posting below target volume, or hooks that only speak to existing followers. Check non-follower reach share first — it tells you which one it is.'; tone = 'hot'; }
      else { diagnosis = 'Flat or declining. Stop making new content for one week. Rebuild your three best-performing posts with new hooks and republish them.'; tone = 'hot'; }

      return `
        <div class="page-head">
          <div class="eyebrow">Execution · Weekly board meeting</div>
          <h1>Board Report</h1>
          <p class="lead">Projections are a hypothesis. This page is the evidence. Log one row every Sunday — it takes 90 seconds.</p>
        </div>
        <div class="kpis">
          ${G.kpi('Followers', last ? G.comma(last.followers) : G.comma(p.followers), last ? 'as of ' + G.prettyDate(last.date) : 'from your profile setup')}
          ${G.kpi('Actual growth/month', perMonth ? '+' + G.comma(perMonth) : '—', 'plan says +' + G.comma(projMonthly), ratio >= 1 ? 'ok' : ratio >= 0.6 ? 'warn' : ratio > 0 ? 'hot' : '')}
          ${G.kpi('Followers per post', followersPerPost ? followersPerPost.toFixed(1) : '—', 'the real efficiency metric')}
          ${G.kpi('Revenue logged', G.money(revTotal, { raw: true }), logs.length + ' week(s) recorded')}
          ${G.kpi('Vs plan', ratio ? Math.round(ratio * 100) + '%' : '—', 'actual ÷ base case', ratio >= 1 ? 'ok' : ratio >= 0.6 ? 'warn' : ratio ? 'hot' : '')}
        </div>

        <div class="callout ${tone === 'ok' ? 'ok' : tone === 'hot' ? 'warn' : ''}"><b>Board verdict:</b> ${G.esc(diagnosis)}</div>

        ${G.card('Growth — actual vs projected',
          '<div class="chart-wrap"><canvas id="chart"></canvas></div><div id="chartLegend"></div>')}

        ${G.card('Log this week', `
          <div class="log-row" style="margin-bottom:14px">
            <label class="field" style="margin:0"><span>Week ending</span><input id="tkDate" type="date" value="${G.today()}"></label>
            <label class="field" style="margin:0"><span>Followers</span><input id="tkF" type="number" min="0" value="${last ? last.followers : p.followers}"></label>
            <label class="field" style="margin:0"><span>Reach (7d)</span><input id="tkR" type="number" min="0" value="0"></label>
            <label class="field" style="margin:0"><span>Revenue (${G.curSym()})</span><input id="tkRev" type="number" min="0" value="0"></label>
            <label class="field" style="margin:0"><span>Posts</span><input id="tkP" type="number" min="0" value="${E.capacity(p).totalWeek}"></label>
            <button id="tkAdd" class="btn primary" style="margin-bottom:14px">Log</button>
          </div>
          ${rows.length ? G.table(['Week', '#Followers', '#Change', '#Reach', '#Revenue', '#Posts', '#Reach/post', ''], rows)
          : '<p class="muted">No entries yet.</p>'}`)}

        ${G.card('How to read this', G.bullets([
          '<b>Reach per post falling while followers rise</b> — your content is being served to your own audience, not to strangers. Change the hook, not the topic.',
          '<b>Followers rising but revenue flat</b> — you are growing the wrong audience, or you never actually made an offer. Check which.',
          '<b>Revenue rising but followers flat</b> — good problem. You have a working funnel. Now increase the input volume.',
          '<b>One post far above the rest</b> — that is not luck, it is a signal. Rebuild it in three formats within ten days.',
          '<b>Everything flat for three weeks</b> — the niche is not the problem. The hook discipline is.'
        ]))}`;
    },

    mount: function () {
      const p = G.store.profile;
      const add = G.$('#tkAdd');
      if (add) add.onclick = function () {
        G.store.logs.push({
          id: 't' + Date.now(),
          date: G.$('#tkDate').value || G.today(),
          followers: Number(G.$('#tkF').value) || 0,
          reach: Number(G.$('#tkR').value) || 0,
          revenue: Math.round(G.toBase(Number(G.$('#tkRev').value) || 0)),
          posts: Number(G.$('#tkP').value) || 0
        });
        G.store.profile.followers = Number(G.$('#tkF').value) || G.store.profile.followers;
        G.save(); G.render(); G.toast('Week logged — profile follower count updated');
      };
      G.$$('[data-del-log]').forEach((b) => {
        b.onclick = function () {
          G.store.logs = G.store.logs.filter((l) => l.id !== b.getAttribute('data-del-log'));
          G.save(); G.render();
        };
      });

      /* ---- chart ---- */
      const S = G.chart.SERIES();
      const proj = E.project(p, 6, 'base');
      const projected = [{ x: 0, y: Number(p.followers) || 0 }]
        .concat(proj.map((m, i) => ({ x: i + 1, y: m.end })));

      const sorted = (G.store.logs || []).slice().sort((a, b) => a.date < b.date ? -1 : 1);
      const t0 = sorted.length ? new Date(sorted[0].date) : null;
      const actual = sorted.map((l) => ({
        x: (new Date(l.date) - t0) / (30.4 * 864e5),
        y: l.followers
      }));

      const series = [
        { name: 'Projected (base case)', color: S[0], area: true, dashed: true, points: projected }
      ];
      if (actual.length) series.push({ name: 'Actual logged', color: S[1], points: actual });

      G.chart.line(G.$('#chart'), {
        series: series,
        height: 250,
        xMax: 6,
        xLabel: 'M',
        yFormat: G.fmt,
        tipX: (v) => 'Month ' + Math.round(v)
      });
      const lg = G.$('#chartLegend');
      if (lg) lg.innerHTML = G.chart.legend(series);
    }
  };
})(window.IGOS);
