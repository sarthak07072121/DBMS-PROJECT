/* ================= DEPARTMENT · FINANCE ================= */
(function (G) {
  'use strict';
  G.views = G.views || {};
  const E = G.engine;

  const TOOLS = [
    { name: 'Canva Pro', use: 'Carousels, covers, templates', cost: 500, need: 'essential' },
    { name: 'CapCut / VN', use: 'Reel editing + auto captions', cost: 0, need: 'essential' },
    { name: 'Metricool / Later (free tier)', use: 'Scheduling + analytics', cost: 0, need: 'essential' },
    { name: 'Notion / Google Sheets', use: 'Content database & pipeline', cost: 0, need: 'essential' },
    { name: 'ManyChat', use: 'Comment-to-DM automation', cost: 1300, need: 'at 2K followers' },
    { name: 'Email tool (MailerLite free)', use: 'Own your audience off-platform', cost: 0, need: 'at 1K followers' },
    { name: 'Payment link (Razorpay / Stripe)', use: 'Take money inside the DM', cost: 0, need: 'before first sale' },
    { name: 'Freelance editor', use: 'Buys back ~40% of production time', cost: 12000, need: 'at 3K followers' },
    { name: 'Stock/B-roll subscription', use: 'Fills gaps you cannot film', cost: 800, need: 'optional' },
    { name: 'Paid boosting budget', use: 'Amplify already-proven posts only', cost: 3000, need: 'when a post beats 3× average' }
  ];

  G.views.finance = {
    title: 'Finance',
    render: function (p) {
      const f = Number(p.followers) || 0;
      const now = E.monthlyGain(p, f, 1);
      const rev = E.revenue(p, now.reach);
      const alloc = E.budget(p);
      const led = E.ledgerSummary();
      const budget = Number(p.budget) || 0;
      const t = E.tier(f);

      const allocRows = alloc.map((a) => [
        '<b>' + G.esc(a.label) + '</b>', G.pct(a.pct, 0), G.money(a.amount),
        {
          tools: 'Never more than one paid tool per job. Free tiers first, always.',
          promotion: budget > 0 ? 'Only boost posts already above 2× your average reach. Boosting a weak post buys a bigger audience for a bad idea.' : 'Zero until organic works.',
          outsourcing: 'Editing first, design second, writing last.',
          learning: 'Study accounts that are 10× your size in your niche — not generic creator advice.',
          buffer: 'Do not spend it. It exists so a bad month does not stop production.'
        }[a.key]
      ]);

      const toolRows = TOOLS.map((tl) => [
        '<b>' + G.esc(tl.name) + '</b>', G.esc(tl.use),
        tl.cost ? G.money(tl.cost) + '/mo' : '<span class="pill ok">Free</span>',
        tl.need === 'essential' ? '<span class="pill acc">Get today</span>' : '<span class="pill">' + G.esc(tl.need) + '</span>'
      ]);
      const essentialCost = TOOLS.filter((tl) => tl.need === 'essential').reduce((s, tl) => s + tl.cost, 0);

      /* unit economics */
      const primary = E.primaryOffer(p) || { name: 'core offer', price: 999 };
      const leads = rev.funnel.totalLeads;
      const cac = leads > 0 ? budget / Math.max(1, leads * E.closeRate(primary.price)) : 0;
      const ltv = primary.price * 1.6;  // 60% of buyers take a second thing over 12 months
      const econRows = [
        ['Monthly cash cost', G.money(budget), 'Tools + outsourcing + promotion'],
        ['Cost per qualified conversation', G.money(leads > 0 ? budget / leads : 0), 'Content is the cheapest lead source you will ever have'],
        ['Customer acquisition cost (CAC)', G.money(cac), 'What one buyer costs you in cash'],
        ['Average order value', G.money(primary.price), primary.name],
        ['Estimated 12-month LTV', G.money(ltv), 'Assumes 60% of buyers purchase once more'],
        ['LTV : CAC', cac > 0 ? (ltv / cac).toFixed(1) + ' : 1' : '∞', 'Below 3:1 means you are buying revenue, not building a business'],
        ['Gross margin on digital', '~92%', 'Digital products have no COGS — this is why they come before physical']
      ].map((r) => [r[0], '<b>' + r[1] + '</b>', r[2]]);

      const breakeven = budget > 0 ? Math.ceil(budget / Math.max(1, primary.price)) : 0;

      /* ledger UI */
      const ledRows = (G.store.ledger || []).slice().reverse().map((r) => [
        G.esc(r.date),
        r.type === 'revenue' ? '<span class="pill ok">In</span>' : '<span class="pill hot">Out</span>',
        G.esc(r.label),
        (r.type === 'revenue' ? '+' : '−') + G.money(Number(r.amount), { raw: true }),
        '<button class="btn sm" data-del-ledger="' + G.esc(r.id) + '">Remove</button>'
      ]);

      const ledgerCard = G.card('ROI ledger — log every rupee', `
        <div class="form-row">
          <label class="field" style="margin:0"><span>Date</span><input id="lgDate" type="date" value="${G.today()}"></label>
          <label class="field" style="margin:0"><span>Type</span><select id="lgType"><option value="expense">Expense</option><option value="revenue">Revenue</option></select></label>
          <label class="field" style="margin:0"><span>What for</span><input id="lgLabel" type="text" placeholder="e.g. editor · ebook sale"></label>
          <label class="field" style="margin:0"><span>Amount (${G.curSym()})</span><input id="lgAmt" type="number" min="0" value="0"></label>
          <button id="lgAdd" class="btn primary" style="margin-bottom:14px">Add entry</button>
        </div>
        ${ledRows.length ? G.table(['Date', 'Type', 'Detail', '#Amount', ''], ledRows)
          : '<p class="muted">Nothing logged yet. Log the first tool subscription and the first sale — a business that is not measured is a hobby with expenses.</p>'}`);

      const rules = [
        '<b>Revenue before tools.</b> Every subscription must be paid for by money the account already made. The free tier is enough until it demonstrably is not.',
        '<b>Never boost an unproven post.</b> Paid promotion multiplies whatever is already there, including failure.',
        '<b>Reinvest 40% of profit until Stage 3.</b> Editor first — it is the only purchase that increases output capacity.',
        '<b>Keep a 2-month runway of fixed costs.</b> Cancelling an editor mid-quarter costs more than the savings.',
        '<b>Price increases beat cost cuts.</b> A 20% price rise moves profit far more than any tool you can cancel.',
        '<b>Track revenue per post.</b> ' + G.money(rev.total / Math.max(1, E.capacity(p).totalMonth)) + ' per post right now — that is the number to grow, not follower count.'
      ];

      return `
        <div class="page-head">
          <div class="eyebrow">Department 03 · Finance</div>
          <h1>Capital allocation & unit economics</h1>
          <p class="lead">${budget > 0
          ? 'You have ' + G.money(budget) + '/month of capital. Finance decides where it goes and proves whether it came back.'
          : 'You have no cash budget, so your capital is time. That is workable — but every hour still has to earn its return.'}</p>
        </div>
        <div class="kpis">
          ${G.kpi('Monthly budget', G.money(budget), t.label)}
          ${G.kpi('Projected revenue', G.money(rev.total), 'from the funnel model', rev.total > budget ? 'ok' : 'warn')}
          ${G.kpi('Projected profit', G.money(rev.total - budget), rev.total > budget ? 'positive' : 'investment phase', rev.total - budget >= 0 ? 'ok' : 'hot')}
          ${G.kpi('Logged ROI', led.exp > 0 ? led.roi.toFixed(1) + '×' : '—', 'actual, from your ledger', led.roi >= 2 ? 'ok' : led.exp > 0 ? 'warn' : '')}
          ${G.kpi('Break-even', breakeven ? breakeven + ' sales' : 'Already', 'to cover monthly spend')}
        </div>

        <div class="section"><h2>Budget allocation</h2>
          <p class="muted">Allocation changes with stage. At ${t.label.toLowerCase()} the money belongs where it is below.</p>
          ${G.card('This month', G.table(['Line', '#Share', '#Amount', 'Rule'], allocRows) +
        (budget < essentialCost ? `<div class="callout warn"><b>Under-capitalised:</b> the essential stack costs about ${G.money(essentialCost)}/month.
          Below that, use only free tiers — do not cut posting frequency to pay for software.</div>` : ''))}
        </div>

        <div class="section"><h2>Tool stack</h2>
          ${G.card('Buy in this order', G.table(['Tool', 'Job', '#Cost', 'When'], toolRows) +
          `<div class="callout"><b>Essential stack: ${G.money(essentialCost)}/month.</b> Everything else is optional until
          revenue justifies it. Tool collecting is the most common way creators feel productive while going backwards.</div>`)}
        </div>

        <div class="section"><h2>Unit economics</h2>
          ${G.card('What one customer is worth', G.table(['Metric', '#Value', 'Why it matters'], econRows))}
        </div>

        <div class="section"><h2>Actual money (not projections)</h2>${ledgerCard}
          ${led.exp || led.rev ? `<div class="kpis" style="margin-top:14px">
            ${G.kpi('Logged revenue', G.money(led.rev, { raw: true }), 'all time', 'ok')}
            ${G.kpi('Logged expenses', G.money(led.exp, { raw: true }), 'all time')}
            ${G.kpi('Profit', G.money(led.profit, { raw: true }), G.pct(led.margin, 0) + ' margin', led.profit >= 0 ? 'ok' : 'hot')}
            ${G.kpi('ROI', led.exp > 0 ? led.roi.toFixed(2) + '×' : '—', 'revenue ÷ spend', led.roi >= 2 ? 'ok' : 'warn')}
          </div>` : ''}
        </div>

        <div class="section"><h2>Financial policy</h2>${G.card('Standing rules', G.ol(rules))}</div>`;
    },

    mount: function () {
      const add = G.$('#lgAdd');
      if (add) {
        add.onclick = function () {
          const amt = Math.round(G.toBase(Number(G.$('#lgAmt').value) || 0));
          const label = G.$('#lgLabel').value.trim();
          if (!amt || !label) { G.toast('Add a label and an amount'); return; }
          G.store.ledger.push({
            id: 'l' + Date.now(), date: G.$('#lgDate').value || G.today(),
            type: G.$('#lgType').value, label: label, amount: amt
          });
          G.save(); G.render(); G.toast('Logged');
        };
      }
      G.$$('[data-del-ledger]').forEach((b) => {
        b.onclick = function () {
          const id = b.getAttribute('data-del-ledger');
          G.store.ledger = G.store.ledger.filter((r) => r.id !== id);
          G.save(); G.render();
        };
      });
    }
  };
})(window.IGOS);
