/* ================= DEPARTMENT · MARKETING ================= */
(function (G) {
  'use strict';
  G.views = G.views || {};
  const E = G.engine;

  G.views.marketing = {
    title: 'Marketing',
    render: function (p) {
      const n = G.niche(p);
      const cap = E.capacity(p);
      const cal = G.content.calendar(p, G.store.calendarStart, 28);
      const tags = G.content.hashtags(p);
      const et = E.engagementTargets(p);
      const times = G.content.TIMES[p.market] || G.content.TIMES.GLOBAL;

      /* calendar grid, aligned to weekday columns */
      const first = cal[0];
      const pad = new Date(first.date + 'T00:00:00').getDay();
      const byDate = {};
      cal.forEach((d) => { (byDate[d.date] = byDate[d.date] || []).push(d); });
      const dates = Object.keys(byDate).sort();

      const cells = [];
      for (let i = 0; i < pad; i++) cells.push('<div></div>');
      dates.forEach((date) => {
        const items = byDate[date];
        const main = items[0];
        cells.push(`<button class="cday" data-day="${main.idx}" data-date="${date}">
          <div class="cd-n">${G.dayName(date).toUpperCase()} ${G.prettyDate(date)}</div>
          ${items.map((d) => `
            <div class="cd-f f-${d.format}">${d.format === 'rest' ? 'ENGAGE' : d.format.toUpperCase()}</div>
            <div class="cd-t">${G.esc(d.topic.length > 52 ? d.topic.slice(0, 50) + '…' : d.topic)}</div>`).join('')}
          <div class="cd-p">${G.esc(main.pillar)} · ${main.format === 'rest' ? 'stories only' : main.time}</div>
        </button>`);
      });

      const counts = cal.reduce((a, d) => { a[d.format] = (a[d.format] || 0) + 1; return a; }, {});

      /* hooks bank */
      const r = G.rng(G.store.seed + 5);
      const hookBank = G.shuffle(n.ideas, r).slice(0, 8).map((t, i) =>
        G.content.fillHook(G.content.HOOKS[i % G.content.HOOKS.length], t, n));

      const growth = [
        '<b>Non-follower reach is the only growth metric.</b> If under 60% of a reel\'s views come from non-followers, the hook failed — the content did not.',
        '<b>One hook, one idea.</b> Every reel earns attention in the first 1.5 seconds or it does not exist. Write the hook before the script, always.',
        '<b>Test 3 hooks per winning topic.</b> When a topic performs, remake it with a different opening within 10 days. Same idea, new door.',
        '<b>Ride trending audio only when the idea already fits.</b> Trend-first content converts nobody; trend-wrapped niche content compounds.',
        '<b>Reply to every comment in hour one.</b> Comment velocity in the first 60 minutes is what decides whether the post gets a second distribution push.',
        '<b>Collaborate up.</b> One collab post with an account 3–5× your size beats a month of solo posting. Offer to make the content for them.',
        '<b>Post the winner again in 30 days.</b> Fewer than 10% of your followers saw it. Repetition builds recognition — new posts build reach.',
        '<b>Bio does the closing.</b> Line 1: who you help + the outcome. Line 2: proof. Line 3: one CTA. Nothing else.'
      ];

      const engage = [
        [cap.commentsPerDay + ' comments/day', 'On posts under 2 hours old from accounts 3–10× your size. Add value, never "great post 🔥".'],
        [cap.dmsPerDay + ' DMs/day', 'To people who commented on those posts. Question first, never a pitch.'],
        [cap.storiesPerDay + ' stories/day', 'At least one with a poll or question sticker. Story replies are the warmest lead source you have.'],
        ['3 collab pitches/week', 'To accounts your size or slightly larger. Offer to write and edit the whole thing.'],
        ['Reply to 100% of comments', 'Within 60 minutes for the first hour after publishing. Non-negotiable.'],
        ['5 saved posts/day', 'From competitors, into a research folder. This becomes next month\'s calendar.']
      ].map((x) => [x[0], x[1]]);

      const benchRows = [
        ['Engagement rate', G.pct(et.erTarget), 'Falls naturally as you grow — that is normal, not decline'],
        ['Likes per post', G.comma(et.likesPerPost), 'The least important number on this page'],
        ['Comments per post', G.comma(et.commentsPerPost), 'Ask a question people can answer in 4 words'],
        ['Saves per post', G.comma(et.savesPerPost), 'The strongest signal you can earn — make things worth returning to'],
        ['Shares per post', G.comma(et.sharesPerPost), 'The fastest route to non-follower reach'],
        ['Reel views', G.fmt(et.reelViewsTarget), 'Below 60% of this three times in a row → change the hook style']
      ].map((x) => [x[0], '<b>' + x[1] + '</b>', x[2]]);

      return `
        <div class="page-head">
          <div class="eyebrow">Department 05 · Marketing</div>
          <h1>Distribution & growth</h1>
          <p class="lead">Operations makes the content. Marketing decides what gets made, when it goes out, and how it reaches people who have never heard of you.</p>
        </div>
        <div class="kpis">
          ${G.kpi('Posts this cycle', (counts.reel || 0) + (counts.carousel || 0) + (counts.static || 0), '28-day calendar')}
          ${G.kpi('Reels', counts.reel || 0, 'the growth engine')}
          ${G.kpi('Carousels', counts.carousel || 0, 'the save engine')}
          ${G.kpi('Engagement days', counts.rest || 0, 'no post — DMs and stories only')}
          ${G.kpi('Best slots', times.reel, 'reels · carousels ' + times.carousel)}
        </div>

        <div class="section">
          <div class="card-head">
            <h2>28-day content calendar</h2>
            <div class="split">
              <button id="regenCal" class="btn sm">Regenerate</button>
              <button id="calCsv" class="btn sm">Export CSV</button>
            </div>
          </div>
          <p class="muted">Click any day to open the full script, caption and hashtags in the Content Studio.</p>
          <div class="card">
            <div class="cal">
              ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => `<div class="cal-h">${d}</div>`).join('')}
              ${cells.join('')}
            </div>
          </div>
        </div>

        <div class="section"><h2>Growth strategy</h2>${G.card('How this account actually grows', G.ol(growth))}</div>

        <div class="section"><h2>Daily engagement quotas</h2>
          ${G.card('The unglamorous work that compounds', G.table(['Quota', 'How to do it properly'], engage))}
        </div>

        <div class="section"><h2>Hook bank</h2>
          ${G.card('Ready to film', G.bullets(hookBank.map(G.esc)),
        '<button class="btn sm" data-copy="' + G.esc(hookBank.join('\n')) + '">Copy all</button>')}
        </div>

        <div class="section"><h2>Hashtag strategy</h2>
          ${G.card('2 broad · 4 mid · 6 niche', `
            <p class="muted" style="margin-bottom:10px">Broad tags give you a lottery ticket. Niche tags give you the right followers.
            Rotate the set every 10 posts so you are not fingerprinted as a repeat poster.</p>
            <h4>Broad (high volume, low odds)</h4><div class="tagcloud">${n.hashtags.broad.map((t) => '<code>' + G.esc(t) + '</code>').join('')}</div>
            <h4 style="margin-top:12px">Mid (your actual category)</h4><div class="tagcloud">${n.hashtags.mid.map((t) => '<code>' + G.esc(t) + '</code>').join('')}</div>
            <h4 style="margin-top:12px">Niche (where you can rank)</h4><div class="tagcloud">${n.hashtags.niche.map((t) => '<code>' + G.esc(t) + '</code>').join('')}</div>
            <div class="copy-row"><button class="btn sm" data-copy="${G.esc(tags.all.join(' '))}">Copy today's set</button></div>
            <div class="callout"><b>Bigger than hashtags:</b> Instagram search now reads your caption, your on-screen text and your alt text.
            Put the words someone would actually type — "${G.esc((n.ideas[0] || '').slice(0, 40))}" — into all three.</div>`)}
        </div>

        <div class="section"><h2>Performance benchmarks</h2>
          ${G.card('What "good" looks like at ' + G.comma(p.followers) + ' followers', G.table(['Metric', '#Target', 'Note'], benchRows))}
        </div>`;
    },

    mount: function () {
      G.$$('.cday').forEach((c) => {
        c.onclick = function () {
          G.store.selectedDay = Number(c.getAttribute('data-day'));
          G.store.selectedDate = c.getAttribute('data-date');
          G.save();
          G.go('dev');
        };
      });
      const rg = G.$('#regenCal');
      if (rg) rg.onclick = function () {
        G.store.seed = Math.floor(Math.random() * 1e8);
        G.save(); G.render(); G.toast('New calendar generated');
      };
      const csv = G.$('#calCsv');
      if (csv) csv.onclick = function () {
        const cal = G.content.calendar(G.store.profile, G.store.calendarStart, 28);
        const rows = [['Date', 'Day', 'Format', 'Pillar', 'Topic', 'Hook', 'CTA', 'Time']]
          .concat(cal.map((d) => [d.date, G.dayName(d.date), d.format, d.pillar, d.topic, d.hook, d.cta, d.time]));
        const out = rows.map((r) => r.map((c) => '"' + String(c).replace(/"/g, '""') + '"').join(',')).join('\n');
        G.download('content-calendar-28day.csv', out, 'text/csv');
      };
    }
  };
})(window.IGOS);
