/* ================= EXECUTION · TODAY'S STANDUP ================= */
(function (G) {
  'use strict';
  G.views = G.views || {};
  const E = G.engine;

  function tasksFor(p, dateISO) {
    const cap = E.capacity(p);
    const sprint = G.content.sprint(p);
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date(dateISO + 'T00:00:00').getDay()];
    const block = sprint.find((s) => s.day === dayName);
    const cal = G.content.calendar(p, G.store.calendarStart, 35);
    const todays = cal.filter((d) => d.date === dateISO);
    const primary = E.primaryOffer(p);
    const out = [];

    todays.forEach((d, i) => {
      if (d.format === 'rest') {
        out.push({ id: 'post' + i, dept: 'Marketing', t: 'No post today — run the engagement day', s: 'Stories only. Use the day to reply, comment and open DM conversations.' });
      } else {
        out.push({
          id: 'post' + i, dept: 'Marketing',
          t: 'Publish the ' + d.format + ' at ' + d.time + ' — "' + d.topic + '"',
          s: 'Hook: ' + d.hook + ' · CTA: ' + d.cta + '. Open the Content Studio for the full script.'
        });
        out.push({ id: 'hour' + i, dept: 'Marketing', t: 'Reply to every comment in the first 60 minutes', s: 'Comment velocity in hour one decides whether the post gets a second distribution push.' });
      }
    });

    if (block) {
      /* Scripting work belongs to the writing room, everything else to Operations. */
      const dept = /script|research/i.test(block.block) ? 'Script Writer' : 'Operations';
      block.tasks.forEach((t, i) => out.push({ id: 'sp' + i, dept: dept, t: t, s: block.block + ' block · ~' + block.hrs + 'h' }));
    }

    out.push({ id: 'eng', dept: 'Marketing', t: cap.commentsPerDay + ' comments on bigger accounts in your niche', s: 'Posts under 2 hours old, accounts 3–10× your size. Add something useful, never "🔥".' });
    out.push({ id: 'dm', dept: 'Marketing', t: cap.dmsPerDay + ' DMs — question first, never a pitch', s: 'Target people who commented on those posts. Your only goal is a reply.' });
    out.push({ id: 'story', dept: 'Marketing', t: 'Post ' + cap.storiesPerDay + ' stories, at least one with a poll or question sticker', s: 'Story replies are the warmest leads you will get all day.' });
    out.push({ id: 'idea', dept: 'Idea Generator', t: 'Add 3 ideas to the vault from questions people asked you today', s: 'Real questions outperform invented topics every time. Save them before you forget them.' });

    if (dayName === 'Sunday') {
      out.push({ id: 'log', dept: 'CEO', t: 'Log this week\'s followers, reach and revenue in the Board Report', s: 'Unmeasured weeks turn into unmeasured quarters.' });
      out.push({ id: 'review', dept: 'CEO', t: 'Pick one thing to repeat and one thing to kill', s: 'Look at the top and bottom post of the week. Decide, do not deliberate.' });
    }
    if (dayName === 'Friday' && primary) {
      out.push({ id: 'offer', dept: 'CEO', t: 'Pitch ' + primary.name + ' in stories', s: G.money(primary.price) + ' · ' + primary.deliver + '. Sell on Friday and Sunday — that is when intent peaks.' });
    }
    return out;
  }

  G.views.daily = {
    title: "Today's Standup",
    render: function (p) {
      const date = G.today();
      const tasks = tasksFor(p, date);
      const done = G.store.tasks[date] || {};
      const doneCount = tasks.filter((t) => done[t.id]).length;
      const pctDone = tasks.length ? doneCount / tasks.length : 0;

      /* streak: consecutive days back from today with >=70% completion */
      let streak = 0;
      for (let i = 0; i < 90; i++) {
        const d = G.addDays(date, -i);
        const tl = tasksFor(p, d);
        const dn = G.store.tasks[d] || {};
        const hit = tl.length && tl.filter((t) => dn[t.id]).length / tl.length >= 0.7;
        if (hit) streak++;
        else if (i > 0) break;   // today still in progress does not break yesterday's streak
      }

      const groups = {};
      tasks.forEach((t) => { (groups[t.dept] = groups[t.dept] || []).push(t); });

      const listHtml = Object.keys(groups).map((dept) => `
        <div class="card tight">
          <div class="card-head" style="margin-bottom:8px"><h3>${G.esc(dept)}</h3>
            <span class="pill">${groups[dept].filter((t) => done[t.id]).length}/${groups[dept].length}</span></div>
          ${groups[dept].map((t) => `
            <div class="check ${done[t.id] ? 'done' : ''}" data-task="${G.esc(t.id)}">
              <div class="box">✓</div>
              <div><div class="c-t">${G.esc(t.t)}</div><div class="c-s">${G.esc(t.s)}</div></div>
            </div>`).join('')}
        </div>`).join('');

      const cap = E.capacity(p);
      const one = p.goal === 'money'
        ? 'Send the ' + cap.dmsPerDay + ' DMs. Everything else on this list is optional today.'
        : 'Publish the post and reply to every comment for an hour. Everything else is optional today.';

      return `
        <div class="page-head">
          <div class="eyebrow">Step 3 · Combined action plan</div>
          <h1>${G.dayName(date)}, ${G.prettyDate(date)}</h1>
          <p class="lead">Every department's output collapsed into one list. Work top to bottom.</p>
        </div>
        <div class="kpis">
          ${G.kpi('Completed today', doneCount + '/' + tasks.length, G.pct(pctDone, 0), pctDone >= 0.7 ? 'ok' : pctDone >= 0.4 ? 'warn' : 'hot')}
          ${G.kpi('Streak', streak + (streak === 1 ? ' day' : ' days'), '70%+ completion counts', streak >= 3 ? 'ok' : '')}
          ${G.kpi('Output target', cap.totalWeek + '/week', cap.perWeek.reel + ' reels · ' + cap.perWeek.carousel + ' carousels')}
          ${G.kpi('Pipeline', (G.store.pipeline || []).filter((c) => c.stage !== 'Published').length + ' pieces', 'keep 2 weeks of buffer')}
        </div>
        <div class="bar" style="height:9px;margin-bottom:20px"><i style="width:${(pctDone * 100).toFixed(0)}%"></i></div>
        <div class="callout ok"><b>If you only do one thing today:</b> ${G.esc(one)}</div>
        <div class="grid g2">${listHtml}</div>
        <div class="section" style="margin-top:24px">
          ${G.card('Weekly non-negotiables', G.bullets([
        'Ship every scheduled post — a missed slot is a missed compounding cycle, not a missed post.',
        'Keep two weeks of content in the pipeline at all times.',
        'Every post gets a deliberate CTA. Reach without a next step is entertainment.',
        'One rest day. Burnout costs more than any single week of output.',
        'Sunday review, 30 minutes, same slot: numbers, repeat one thing, kill one thing.'
      ].map(G.esc)))}
        </div>`;
    },

    mount: function () {
      const date = G.today();
      G.$$('[data-task]').forEach((el) => {
        el.onclick = function () {
          const id = el.getAttribute('data-task');
          G.store.tasks[date] = G.store.tasks[date] || {};
          if (G.store.tasks[date][id]) delete G.store.tasks[date][id];
          else G.store.tasks[date][id] = true;
          G.save(); G.render();
        };
      });
    }
  };
})(window.IGOS);
