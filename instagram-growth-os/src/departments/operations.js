/* ================= DEPARTMENT · OPERATIONS ================= */
(function (G) {
  'use strict';
  G.views = G.views || {};
  const E = G.engine;

  const STAGES = ['Idea', 'Script', 'Shoot / Design', 'Edit', 'Caption & SEO', 'Scheduled', 'Published'];

  const SOP = {
    'Idea': ['Pulled from a comment, DM, or a competitor post that outperformed', 'One sentence: who it is for and what changes for them', 'Assign a pillar — if it fits no pillar, kill it'],
    'Script': ['Hook written first, in under 12 words', '3 beats maximum, each one actionable', 'CTA chosen deliberately: save, share, comment or link'],
    'Shoot / Design': ['Film in one batch, same lighting, phone locked on a stand', 'Shoot 2 hook variants for every reel — cheap insurance', 'Get 10 seconds of extra B-roll for the middle sag'],
    'Edit': ['First frame carries the payoff, on screen, readable at thumbnail size', 'Captions burned in — 60%+ watch on mute', 'No cut longer than 2.5 seconds'],
    'Caption & SEO': ['First line repeats the hook — it is the only line shown before "more"', 'Keywords in the caption and the alt text; Instagram search reads both', '12 hashtags: 2 broad, 4 mid, 6 niche'],
    'Scheduled': ['Posted at the slot in the calendar, not whenever you finish', 'Story teaser queued 30 minutes before', 'First comment ready to pin'],
    'Published': ['Reply to every comment in the first 60 minutes', 'Log reach, saves, shares and follows at 24h and 72h', 'Winner? Rebuild it in another format within 7 days']
  };

  G.views.operations = {
    title: 'Operations',
    render: function (p) {
      const cap = E.capacity(p);
      const sprint = G.content.sprint(p);
      const cal = G.content.calendar(p, G.store.calendarStart, 7);
      const times = G.content.TIMES[p.market] || G.content.TIMES.GLOBAL;

      /* kanban */
      const board = STAGES.map((st, si) => {
        const items = (G.store.pipeline || []).filter((c) => c.stage === st);
        return `<div class="kcol"><h5><span>${G.esc(st)}</span><span>${items.length}</span></h5>
          ${items.map((c) => `
            <div class="kitem">
              <div class="kt">${G.esc(c.title)}</div>
              <div class="muted" style="font-size:10px;margin-bottom:6px">${G.esc(c.format || '')}${c.date ? ' · ' + G.prettyDate(c.date) : ''}</div>
              <div class="kb">
                ${si > 0 ? `<button data-move="${c.id}" data-dir="-1">←</button>` : ''}
                ${si < STAGES.length - 1 ? `<button data-move="${c.id}" data-dir="1">→</button>` : ''}
                <button data-del-card="${c.id}">✕</button>
              </div>
            </div>`).join('') || '<div class="muted" style="font-size:11px">empty</div>'}
        </div>`;
      }).join('');

      const wipWarn = (G.store.pipeline || []).filter((c) => c.stage !== 'Published').length;

      /* weekly system */
      const sprintRows = sprint.map((s) => [
        '<b>' + G.esc(s.day) + '</b>', G.esc(s.block), s.hrs + ' h',
        s.tasks.map(G.esc).join(' · ')
      ]);

      /* next 7 days */
      const upcoming = cal.map((d) => [
        G.dayName(d.date) + ' ' + G.prettyDate(d.date),
        d.format === 'rest' ? '<span class="pill">Engagement only</span>' : '<span class="pill acc">' + G.esc(d.format) + '</span>',
        G.esc(d.topic),
        d.time
      ]);

      const automation = [
        '<b>Comment → DM automation.</b> One keyword per post. It converts public reach into a private conversation without you being online.',
        '<b>Scheduling.</b> A week queued in advance means a bad day cannot break the streak. This is the single highest-ROI system here.',
        '<b>Saved replies.</b> Store your 8 most-sent DM answers as templates. Reply time drops from minutes to seconds.',
        '<b>Content database.</b> Every published post with reach, saves, shares and follows. After 30 posts it tells you what to make — you stop guessing.',
        '<b>Repurposing rule.</b> Every reel above 2× average reach gets rebuilt as a carousel within 7 days. Free content, proven demand.',
        '<b>Idea inbox.</b> One note on your phone. Every question anyone asks you goes in it. You will never open the app with nothing to say.'
      ];

      return `
        <div class="page-head">
          <div class="eyebrow">Department 04 · Operations</div>
          <h1>The production system</h1>
          <p class="lead">Consistency is not discipline — it is inventory. The queue is what protects you on the days motivation does not show up.</p>
        </div>
        <div class="kpis">
          ${G.kpi('Weekly output', cap.totalWeek + ' posts', cap.perWeek.reel + ' reels · ' + cap.perWeek.carousel + ' carousels · ' + cap.perWeek.static + ' static')}
          ${G.kpi('Stories/day', cap.storiesPerDay, times.story)}
          ${G.kpi('Engagement quota', cap.commentsPerDay + ' comments', cap.dmsPerDay + ' DMs/day')}
          ${G.kpi('Work in pipeline', wipWarn + ' pieces', wipWarn >= cap.totalWeek * 2 ? 'healthy buffer' : 'below the 2-week buffer', wipWarn >= cap.totalWeek * 2 ? 'ok' : 'warn')}
        </div>

        <div class="section">
          <h2>Content pipeline</h2>
          <p class="muted">Idea → Script → Shoot → Edit → Caption → Schedule → Publish. Nothing skips a stage.</p>
          <div class="card">
            <div class="card-head"><h3>Kanban board</h3>
              <div class="split">
                <button id="seedBoard" class="btn sm">Pull next 7 days from calendar</button>
                <button id="addCard" class="btn sm primary">+ Add idea</button>
              </div>
            </div>
            <div class="kanban">${board}</div>
            ${wipWarn < cap.totalWeek * 2 ? `<div class="callout warn"><b>Buffer rule:</b> keep at least ${cap.totalWeek * 2} pieces in the pipeline
              (two weeks). You are at ${wipWarn}. Load the board before you post another thing.</div>` : ''}
          </div>
        </div>

        <div class="section"><h2>Stage SOPs</h2>
          <p class="muted">A piece does not move right until every box in its stage is true.</p>
          <div class="grid g3">
            ${STAGES.map((s) => `<div class="card tight"><h4>${G.esc(s)}</h4>${G.bullets(SOP[s].map(G.esc))}</div>`).join('')}
          </div>
        </div>

        <div class="section"><h2>Weekly operating rhythm</h2>
          ${G.card('The sprint', G.table(['Day', 'Block', '#Time', 'Tasks'], sprintRows))}
        </div>

        <div class="section"><h2>Next 7 days</h2>
          ${G.card('Publishing schedule', G.table(['Date', 'Format', 'Topic', 'Slot'], upcoming))}
        </div>

        <div class="section"><h2>Automation & leverage</h2>
          ${G.card('Systems that replace willpower', G.ol(automation))}
        </div>`;
    },

    mount: function () {
      const add = G.$('#addCard');
      if (add) add.onclick = function () {
        const t = prompt('Content idea (one line):');
        if (!t) return;
        G.store.pipeline.push({ id: 'c' + Date.now() + Math.random().toString(36).slice(2, 5), title: t, stage: 'Idea', format: 'idea' });
        G.save(); G.render();
      };

      const seed = G.$('#seedBoard');
      if (seed) seed.onclick = function () {
        const p = G.store.profile;
        const cal = G.content.calendar(p, G.store.calendarStart, 7).filter((d) => d.format !== 'rest');
        let n = 0;
        cal.forEach((d) => {
          const exists = (G.store.pipeline || []).some((c) => c.date === d.date && c.title === d.topic);
          if (exists) return;
          G.store.pipeline.push({
            id: 'c' + Date.now() + n + Math.random().toString(36).slice(2, 5),
            title: d.topic, stage: 'Idea', format: d.format, date: d.date
          });
          n++;
        });
        G.save(); G.render(); G.toast(n ? n + ' pieces loaded into the pipeline' : 'Already loaded');
      };

      G.$$('[data-move]').forEach((b) => {
        b.onclick = function () {
          const id = b.getAttribute('data-move');
          const dir = Number(b.getAttribute('data-dir'));
          const card = G.store.pipeline.find((c) => c.id === id);
          if (!card) return;
          const i = STAGES.indexOf(card.stage);
          card.stage = STAGES[G.clamp(i + dir, 0, STAGES.length - 1)];
          G.save(); G.render();
        };
      });
      G.$$('[data-del-card]').forEach((b) => {
        b.onclick = function () {
          const id = b.getAttribute('data-del-card');
          G.store.pipeline = G.store.pipeline.filter((c) => c.id !== id);
          G.save(); G.render();
        };
      });
    }
  };
})(window.IGOS);
