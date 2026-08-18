/* ================= DEPARTMENT · SALES ================= */
(function (G) {
  'use strict';
  G.views = G.views || {};
  const E = G.engine;

  function scriptBlock(title, text) {
    return `<div class="card tight">
      <div class="split"><b>${G.esc(title)}</b>
        <button class="btn sm right" data-copy="${G.esc(text)}">Copy</button></div>
      <div class="script" style="margin-top:9px"><pre>${G.esc(text)}</pre></div>
    </div>`;
  }

  G.views.sales = {
    title: 'Sales',
    render: function (p) {
      const n = G.niche(p);
      const f = Number(p.followers) || 0;
      const now = E.monthlyGain(p, f, 1);
      const rev = E.revenue(p, now.reach);
      const fn = rev.funnel;
      const cap = E.capacity(p);
      const rc = E.rateCard(p);
      const re = E.reverseEngineer(p);
      const offers = E.offers(p);
      const primary = E.primaryOffer(p);
      const kw = G.content.KEYWORDS[0];

      /* ---- offer ladder ---- */
      const ladderRows = offers.map((o) => [
        '<b>' + G.esc(o.name) + '</b><div class="muted">' + G.esc(o.promise) + '</div>',
        '<span class="pill ' + (o.type === 'High ticket' ? 'hot' : o.type === 'Lead magnet' ? 'info' : 'acc') + '">' + G.esc(o.type) + '</span>',
        o.price ? G.money(o.price) : 'Free',
        o.unlocked ? '<span class="pill ok">Live now</span>' : '<span class="pill">at ' + G.fmt(o.gate) + '</span>',
        G.esc(o.deliver)
      ]);

      /* ---- funnel ---- */
      const steps = [
        ['Monthly impressions', G.fmt(fn.reach), '100%', 'Content is the top of funnel. Nothing else works if this is small.'],
        ['Unique people reached', G.fmt(fn.uniqueReach), G.pct(E.uniqueFactor(cap.totalMonth), 0), 'The same people see many of your posts. Only unique humans can become customers.'],
        ['Profile visits', G.comma(fn.visits), G.pct(E.FUNNEL.profileVisitRate), 'Driven by your hook + your bio. A weak bio wastes every view.'],
        ['Inbound leads (DM / link)', G.comma(fn.inboundLeads), G.pct(E.FUNNEL.leadRate) + ' of visits', 'Requires a CTA that asks for a keyword or a click.'],
        ['Outbound conversations', G.comma(fn.outboundConvos), cap.dmsPerDay + ' DMs/day', 'The part nobody does. It is why small accounts still make money.'],
        ['Total qualified conversations', '<b>' + G.comma(fn.totalLeads) + '</b>', '—', 'This is your real pipeline number. Track it weekly.'],
        ['Sales', '<b>' + G.comma(rev.lines.reduce((s, l) => s + (l.kind === 'Sponsorship' ? 0 : l.units), 0)) + '</b>',
          G.pct(E.closeRate(primary ? primary.price : 999)), 'Close rate falls as price rises — that is normal, not a failure.']
      ].map((r) => [r[0], r[1], r[2], r[3]]);

      /* ---- revenue lines ---- */
      const revRows = rev.lines.map((l) => [
        '<b>' + G.esc(l.name) + '</b>' + (l.capped ? ' <span class="pill warn">delivery capped</span>' : ''),
        G.esc(l.kind), G.money(l.price),
        l.units < 1 ? l.units.toFixed(1) : G.comma(l.units), '<b>' + G.money(l.revenue) + '</b>'
      ]);
      revRows.push(['<b>Total</b>', '', '', '', '<b>' + G.money(rev.total) + '</b>']);

      /* ---- reverse engineering ---- */
      const reBox = G.card('Reverse-engineering ' + G.money(re.target) + '/month', `
        <p class="muted" style="margin-bottom:12px">Working backwards from the target instead of forwards from wishful thinking.</p>
        ${G.table(['What has to be true', '#Number', 'Note'], [
        ['Primary offer', G.esc(re.offer.name), 'at ' + G.money(re.offer.price)],
        ['Sales needed per month', '<b>' + Math.ceil(re.salesNeeded) + '</b>', 'not per quarter — per month'],
        ['Close rate at this price', G.pct(re.close), 'assumes a real conversation, not a broadcast'],
        ['Qualified conversations needed', '<b>' + Math.ceil(re.leadsNeeded) + '</b>', 'the single number to manage'],
        ['…of which outbound DMs give you', Math.round(re.outbound), cap.dmsPerDay + ' DMs/day at ' + G.pct(E.FUNNEL.dmReplyRate, 0) + ' reply rate'],
        ['…so inbound must produce', Math.ceil(re.inboundNeeded), 'from content'],
        ['Profile visits needed', G.comma(re.visitsNeeded), ''],
        ['Monthly reach needed', '<b>' + G.fmt(re.reachNeeded) + '</b>', 'you currently generate ' + G.fmt(re.currentReach)],
        ['Posts needed per month', '<b>' + Math.ceil(re.postsNeeded) + '</b>', 'you currently ship ' + re.postsNow]
      ])}
        <div class="callout ${re.tone === 'ok' ? 'ok' : re.tone === 'hot' ? 'warn' : ''}"><b>Sales verdict:</b> ${G.esc(re.verdict)}
        ${re.tone !== 'ok' ? ' At your current reach, the price that would clear the target is <b>' + G.money(re.priceForCurrentReach) + '</b> per sale.' : ''}</div>`);

      /* ---- DM scripts ---- */
      const you = p.handle || 'me';
      const s1 = 'Hey! Here\'s the ' + (primary ? primary.name : 'guide') + ' I mentioned 👇\n[link]\n\nQuick one so I don\'t send you random stuff — what are you working on with ' +
        n.short.toLowerCase() + ' right now?';
      const s2 = 'Got it. Two quick questions and I\'ll tell you straight whether I can help:\n\n1. How long have you been trying to fix this?\n2. What have you already tried that didn\'t work?';
      const s3 = 'Based on that, here\'s what I\'d do:\n\n• ' + (n.audience.pains[0] || 'The main blocker') + ' is the real blocker, not effort.\n• The fastest fix is ' + (n.ideas[0] || 'the first step in the plan') + '.\n\nI do exactly this inside ' +
        (primary ? primary.name : 'my program') + ' — ' + G.money(primary ? primary.price : 999) + ', ' + (primary ? primary.deliver : '') +
        '. Want me to send the details?';
      const s4 = 'No worries at all — timing matters more than motivation.\n\nI\'ll leave it here: when you\'re ready, reply "' + kw + '" and I\'ll pick it back up. In the meantime this post covers the first step: [link]';
      const s5 = 'Hey — following up once because you asked about ' + n.short.toLowerCase() + ' two weeks ago.\n\nDid you get a chance to try the first step? If it worked, tell me what changed. If it didn\'t, tell me where it broke and I\'ll fix it for you free.';

      const brandPitch = 'Subject: ' + (p.handle || 'Creator') + ' × [Brand] — ' + n.short + ' collaboration\n\n' +
        'Hi [Name],\n\n' +
        'I run ' + (p.handle || '[handle]') + ', a ' + n.label.toLowerCase() + ' page with ' + G.comma(f) + ' followers — ' +
        n.audience.age + ', mostly ' + n.audience.who + '.\n\n' +
        'Recent performance:\n' +
        '• Average reel reach: ' + G.fmt(E.reachPerPost(p, f, 1).reel) + '\n' +
        '• Engagement rate: ' + G.pct(E.tier(f).er, 1) + ' (category benchmark ~' + G.pct(E.tier(f).er * 0.7, 1) + ')\n' +
        '• Audience: ' + (p.market === 'IN' ? 'India-first' : p.market === 'US' ? 'US/Western' : 'Global') + '\n\n' +
        'I\'d like to propose one integrated reel + 3 stories with a tracked link — ' + G.money(rc.bundle) + ', including 30-day usage rights. ' +
        'I only take products I would recommend without payment, so if there\'s a fit I\'ll send a concept first.\n\n' +
        'Deck and rate card attached. Happy to run a paid test before any longer commitment.\n\n' +
        'Thanks,\n[Your name]';

      /* ---- rate card ---- */
      const rcRows = [
        ['Story frame (1)', G.money(rc.story)],
        ['Static post / carousel', G.money(rc.staticPost)],
        ['Reel (integrated)', G.money(rc.reel)],
        ['Bundle: 1 reel + 3 stories + usage', '<b>' + G.money(rc.bundle) + '</b>'],
        ['Monthly ambassador retainer', G.money(rc.monthlyRetainer)]
      ].map((r) => [r[0], r[1]]);

      const tactics = [
        '<b>Never pitch in the first message.</b> Ask a question. A reply rate above 40% only happens when the first DM costs nothing to answer.',
        '<b>Sell in stories, not in the feed.</b> Feed posts buy reach; stories convert the people reach already delivered.',
        '<b>Use one keyword per launch.</b> "Comment ' + kw + '" concentrates comment volume and creates a clean DM list.',
        '<b>Price on outcome, not hours.</b> ' + G.esc(n.audience.desires[0] || 'The result') + ' is what they are buying; the deliverable is just the packaging.',
        '<b>Follow up three times.</b> Most sales happen on message 2 and 3. One follow-up is not persistence, it is politeness.',
        '<b>Take payment in the DM.</b> Every extra click costs conversions — a payment link beats a landing page at your size.',
        '<b>Raise the price after every 10 sales.</b> If nobody flinches, you are underpriced and subsidising your own business.'
      ];

      return `
        <div class="page-head">
          <div class="eyebrow">Department 02 · Sales</div>
          <h1>Monetisation & funnel</h1>
          <p class="lead">Followers are not revenue. Revenue is conversations × close rate × price. This department manages those three numbers.</p>
        </div>
        <div class="kpis">
          ${G.kpi('Pipeline / month', G.comma(fn.totalLeads), 'qualified conversations')}
          ${G.kpi('Revenue run-rate', G.money(rev.total), 'at current reach', rev.total >= (p.revTarget || 0) ? 'ok' : 'warn')}
          ${G.kpi('Primary offer', primary ? G.money(primary.price) : '—', primary ? primary.name : 'nothing unlocked yet')}
          ${G.kpi('Brand deal value', rc.dealsPerMonth ? G.money(rc.bundle) : 'Locked', rc.dealsPerMonth ? rc.dealsPerMonth + ' deal(s)/month realistic' : 'unlocks at ' + G.fmt(8000) + ' followers')}
        </div>

        <div class="section"><h2>Offer ladder</h2>
          <p class="muted">Sell the cheapest thing that solves a real problem first. Ascend people; do not open with the expensive offer.</p>
          ${G.card('Products & services', G.table(['Offer', 'Type', '#Price', 'Status', 'What they get'], ladderRows))}
        </div>

        <div class="section"><h2>The funnel, with your numbers</h2>
          ${G.card('Instagram → DM → offer', G.table(['Stage', '#Monthly', '#Rate', 'What controls it'], steps))}
          ${G.card('Revenue by line', G.table(['Line', 'Kind', '#Price', '#Units/mo', '#Revenue/mo'], revRows) +
        (rev.presale ? '<div class="callout warn"><b>Nothing is unlocked yet at your size — so this is modelled as a pre-sale.</b> ' +
          'You do not need an audience to make the first sale; you need ' + Math.ceil(rev.lines[0].units) +
          ' people who trust you. Sell it in DMs before you build it, then build it for the people who paid.</div>' : '') +
        (rev.lines.some((l) => l.capped) ? '<div class="callout"><b>Delivery capped:</b> the funnel would produce more buyers than one person can serve ' +
          '(' + E.DELIVERY_CAP.high + ' high-ticket and ' + E.DELIVERY_CAP.mid + ' mid-ticket clients a month). ' +
          'That is the signal to raise the price or productise the delivery — not to chase more reach.</div>' : ''))}
        </div>

        <div class="section"><h2>Target maths</h2>${reBox}</div>

        <div class="section"><h2>DM sales sequence</h2>
          <p class="muted">Copy these. Change the wording to sound like you — keep the structure.</p>
          <div class="grid g2">
            ${scriptBlock('1 · Deliver + open the loop', s1)}
            ${scriptBlock('2 · Qualify (never skip)', s2)}
            ${scriptBlock('3 · Diagnose then offer', s3)}
            ${scriptBlock('4 · The graceful no', s4)}
            ${scriptBlock('5 · Follow-up at day 14', s5)}
            ${scriptBlock('6 · Brand partnership pitch', brandPitch)}
          </div>
        </div>

        <div class="section"><h2>Brand deal rate card</h2>
          ${G.card('Your rates at ' + G.comma(f) + ' followers',
        G.table(['Deliverable', '#Rate'], rcRows) +
        `<div class="callout"><b>How this is calculated:</b> ${G.money(rc.perK)} per 1,000 followers per reel —
          the ${G.esc(n.short)} category multiplier (${n.cpm}×) applied to a
          ${p.market === 'IN' ? 'India' : p.market === 'US' ? 'US' : 'global'} baseline. Quote the bundle, never the single story.
          Always charge separately for usage rights and exclusivity; that is where brands quietly take the most value.</div>
          ${rc.dealsPerMonth === 0 ? '<div class="callout warn"><b>Not yet.</b> Below 8K followers, pitch product seeding and affiliate commission instead of a flat fee — then use those case studies to charge cash later.</div>' : ''}`)}
        </div>

        <div class="section"><h2>Conversion tactics</h2>${G.card('What actually moves the number', G.ol(tactics))}</div>`;
    }
  };
})(window.IGOS);
