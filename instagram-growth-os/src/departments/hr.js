/* ================= DEPARTMENT · HR ================= */
(function (G) {
  'use strict';
  G.views = G.views || {};
  const E = G.engine;

  const ROLES = [
    { role: 'Content Strategist', owner: 'Founder — never outsource', trigger: 0, cost: 0,
      kpi: 'Winning hooks per week', jd: 'Owns the thesis, the pillars and which ideas get made. This is the role that decides whether the business works, so it stays with you permanently.' },
    { role: 'Video Editor', owner: 'First hire', trigger: 3000, cost: 12000,
      kpi: 'Turnaround < 24h · retention held or improved', jd: 'Cuts reels, adds captions and covers from your raw footage. Buys back the largest single block of your week. Pay per reel (₹300–800) before moving to a retainer.' },
    { role: 'Graphic Designer', owner: 'Second hire', trigger: 8000, cost: 8000,
      kpi: 'Carousel saves per post', jd: 'Owns the carousel template system and the grid aesthetic. Part-time or per-piece; a template pack can delay this hire by months.' },
    { role: 'Scriptwriter / Researcher', owner: 'Third hire', trigger: 20000, cost: 15000,
      kpi: 'Hook test win rate', jd: 'Researches trends and drafts scripts to your structure. Hire only after you can articulate your voice in a written brief — otherwise you will rewrite everything.' },
    { role: 'Community Manager', owner: 'When DMs exceed 30/day', trigger: 15000, cost: 12000,
      kpi: 'First-response time < 2h · qualified leads passed', jd: 'Replies to comments and DMs, qualifies leads against your criteria, books calls. Never let them make the offer — they hand over warm conversations.' },
    { role: 'Analyst (part-time)', owner: 'Founder until Stage 3', trigger: 50000, cost: 6000,
      kpi: 'Weekly report accuracy and speed', jd: 'Pulls the weekly numbers, flags the top and bottom performers, maintains the content database so decisions are evidence-based.' },
    { role: 'Virtual Assistant', owner: 'When admin > 4h/week', trigger: 25000, cost: 9000,
      kpi: 'Hours returned to the founder', jd: 'Scheduling, uploading, invoicing, sourcing UGC, inbox triage. Cheapest hour you will ever buy back.' }
  ];

  G.views.hr = {
    title: 'Human Resources',
    render: function (p) {
      const cap = E.capacity(p);
      const f = Number(p.followers) || 0;
      const sprint = G.content.sprint(p);

      const roleRows = ROLES.map((r) => {
        const active = f >= r.trigger;
        return [
          '<b>' + G.esc(r.role) + '</b><div class="muted">' + G.esc(r.jd) + '</div>',
          G.esc(r.owner),
          r.trigger === 0 ? '<span class="pill acc">Now</span>'
            : active ? '<span class="pill ok">Hire now</span>'
              : '<span class="pill">' + G.fmt(r.trigger) + ' followers</span>',
          r.cost ? G.money(r.cost) + '/mo' : '—',
          G.esc(r.kpi)
        ];
      });

      /* time audit */
      const prod = cap.prodHours;
      const audit = [
        ['Scripting & research', (prod * 0.2).toFixed(1), 'Batch on one day. Never script the morning you film.'],
        ['Filming', (prod * 0.3).toFixed(1), 'One session per week, one lighting setup, all reels in a row.'],
        ['Editing & design', (prod * 0.4).toFixed(1), 'First thing to outsource — it is the biggest block and the easiest to brief.'],
        ['Captions & scheduling', (prod * 0.1).toFixed(1), 'Write all captions in one pass, in the same voice.'],
        ['Engagement & DMs', cap.overhead.toFixed(1), 'Non-negotiable. This is sales, not admin.']
      ].map((r) => [r[0], '<b>' + r[1] + ' h</b>', r[2]]);

      const sprintCards = sprint.map((s) => `
        <div class="card tight">
          <div class="split"><b>${G.esc(s.day)}</b><span class="right pill acc">${s.hrs}h</span></div>
          <div class="muted" style="margin:4px 0 8px">${G.esc(s.block)}</div>
          ${G.bullets(s.tasks.map(G.esc))}
        </div>`).join('');

      const rules = [
        '<b>One owner per output.</b> If two people own the reel, nobody owns the reel.',
        '<b>Brief in writing, always.</b> A 4-line brief (hook, 3 beats, CTA, reference) prevents the rewrite that makes outsourcing feel pointless.',
        '<b>Pay per piece before per month.</b> Retainers are for people who have already proven turnaround on 10 pieces.',
        '<b>Two-week buffer rule.</b> The queue must always hold 14 days of content. The day it holds less, everything else pauses.',
        '<b>Founder never edits.</b> Once an editor exists, your review is approve or reject with one note — not a re-cut.',
        '<b>Weekly 30-minute review, same slot.</b> Numbers, one thing to repeat, one thing to kill. No agenda drift.'
      ];

      return `
        <div class="page-head">
          <div class="eyebrow">Department 01 · HR</div>
          <h1>Org design & operating rhythm</h1>
          <p class="lead">You are ${G.comma(f)} followers in and working ${cap.hours} hours a week. That budget is the real
          constraint on this business — HR exists to spend it on the highest-leverage work and to buy back the rest.</p>
        </div>
        <div class="kpis">
          ${G.kpi('Weekly hours', cap.hours + ' h', 'the company\'s entire labour supply')}
          ${G.kpi('Production hours', cap.prodHours + ' h', 'after ' + cap.overhead + 'h of engagement & admin')}
          ${G.kpi('Output capacity', cap.totalWeek + '/week', cap.perWeek.reel + ' reels · ' + cap.perWeek.carousel + ' carousels · ' + cap.perWeek.static + ' static')}
          ${G.kpi('First hire at', f >= 3000 ? 'Now' : G.fmt(3000) + ' followers', 'video editor, ' + G.money(12000) + '/mo', f >= 3000 ? 'ok' : '')}
        </div>

        <div class="section"><h2>Roles & hiring sequence</h2>
          <p class="muted">Hire in this order. Hiring out of order is how solo creators burn cash before they have revenue.</p>
          ${G.card('Org chart', G.table(['Role', 'Owner', 'Hire trigger', '#Cost', 'KPI'], roleRows))}
        </div>

        <div class="section"><h2>Where your hours actually go</h2>
          ${G.card('Time audit — ' + cap.hours + ' hours/week', G.table(['Activity', '#Hours', 'Rule'], audit) +
        `<div class="callout"><b>Leverage check:</b> editing is ${(cap.prodHours * 0.4).toFixed(1)}h/week.
         At ${G.money(12000)}/month an editor costs roughly ${G.money(12000 / (cap.prodHours * 0.4 * 4.33))}/hour of your time returned —
         worth it the moment one hour of your time earns more than that.</div>`)}
        </div>

        <div class="section"><h2>The weekly sprint</h2>
          <p class="muted">Batching beats daily improvisation. Same block, same day, every week.</p>
          <div class="grid g3">${sprintCards}</div>
        </div>

        <div class="section"><h2>Operating rules</h2>${G.card('Non-negotiables', G.ol(rules))}</div>`;
    }
  };
})(window.IGOS);
