/* ================= GROWTH OS · shell, onboarding, router ================= */
(function (G) {
  'use strict';
  const E = G.engine;

  /* ---------------- onboarding ---------------- */
  const wz = { step: 1, max: 4, niche: null, goal: 'both' };

  function buildNicheGrid() {
    const grid = G.$('#nicheGrid');
    grid.innerHTML = Object.keys(G.NICHES).map((k) => {
      const n = G.NICHES[k];
      return `<button class="niche-chip" data-niche="${k}">
        <b>${G.esc(n.short)}</b><small>${G.esc(n.label)}</small></button>`;
    }).join('');
    G.$$('.niche-chip').forEach((b) => {
      b.onclick = function () {
        G.$$('.niche-chip').forEach((x) => x.classList.remove('selected'));
        b.classList.add('selected');
        wz.niche = b.getAttribute('data-niche');
        G.$('#customNiche').value = '';
      };
    });
    G.$('#customNiche').oninput = function () {
      if (this.value.trim()) {
        G.$$('.niche-chip').forEach((x) => x.classList.remove('selected'));
        wz.niche = null;
      }
    };
  }

  function dots() {
    G.$('#wzDots').innerHTML = Array.from({ length: wz.max }, (_, i) =>
      `<span class="dot ${i + 1 <= wz.step ? 'on' : ''}"></span>`).join('');
  }

  function showStep(n) {
    wz.step = G.clamp(n, 1, wz.max);
    G.$$('.wz-step').forEach((s) => s.classList.toggle('hidden', Number(s.dataset.step) !== wz.step));
    G.$('#wzBack').style.visibility = wz.step === 1 ? 'hidden' : 'visible';
    G.$('#wzNext').textContent = wz.step === wz.max ? 'Build my business plan' : 'Next';
    dots();
  }

  function tierPreview() {
    const f = Number(G.$('#followers').value) || 0;
    const t = E.tier(f);
    const next = E.nextTier(f);
    G.$('#tierPreview').innerHTML =
      `<b>${G.esc(t.label)}</b> — ${G.esc(t.focus)}` +
      (next ? `<div class="muted" style="margin-top:6px">${G.comma(next.min - f)} followers to ${G.esc(next.label)}.</div>` : '');
  }

  function validateStep() {
    if (wz.step === 1 && !wz.niche && !G.$('#customNiche').value.trim()) {
      G.toast('Pick a niche or type your own — nothing else can be decided without it');
      return false;
    }
    return true;
  }

  function finishOnboarding() {
    const cur = G.$('#currency').value;
    const toBase = (v) => Math.max(0, Math.round(G.toBase(Number(v) || 0, cur)));
    const profile = {
      nicheKey: wz.niche,
      customNiche: G.$('#customNiche').value.trim(),
      handle: G.$('#handle').value.trim(),
      followers: Math.max(0, Number(G.$('#followers').value) || 0),
      currentRev: toBase(G.$('#currentRev').value),
      goal: wz.goal,
      followerTarget: Math.max(0, Number(G.$('#followerTarget').value) || 0),
      revTarget: toBase(G.$('#revTarget').value),
      hours: G.clamp(Number(G.$('#hours').value) || 10, 1, 80),
      budget: toBase(G.$('#budget').value),
      face: G.$('#face').value,
      market: G.$('#market').value,
      currency: cur,
      created: G.today()
    };
    G.store.profile = profile;
    G.store.calendarStart = G.today();
    G.store.seed = 20260818;
    G.save();
    G.$('#onboarding').classList.add('hidden');
    G.$('#app').classList.remove('hidden');
    G.render();
  }

  function initOnboarding() {
    buildNicheGrid();
    showStep(1);
    G.$('#followers').oninput = tierPreview;
    tierPreview();
    G.$('#currency').onchange = function () {
      const sym = this.value === 'USD' ? '$' : '₹';
      G.$$('.cur-sym').forEach((s) => { s.textContent = sym; });
      /* re-scale the placeholder targets so the defaults stay sensible */
      const scale = this.value === 'USD' ? 1 / G.RATE : G.RATE;
      ['#revTarget', '#budget', '#currentRev'].forEach((id) => {
        const el = G.$(id);
        const v = Number(el.value) || 0;
        if (v) el.value = Math.max(0, Math.round(v * scale / 10) * 10);
      });
    };
    G.$$('#goalRow .choice').forEach((b) => {
      b.onclick = function () {
        G.$$('#goalRow .choice').forEach((x) => x.classList.remove('selected'));
        b.classList.add('selected');
        wz.goal = b.getAttribute('data-goal');
      };
    });
    G.$('#wzNext').onclick = function () {
      if (!validateStep()) return;
      if (wz.step === wz.max) finishOnboarding();
      else showStep(wz.step + 1);
    };
    G.$('#wzBack').onclick = function () { showStep(wz.step - 1); };
  }

  /* ---------------- router ---------------- */
  G.go = function (view) {
    G.store.view = view;
    G.save();
    G.render();
    window.scrollTo(0, 0);
  };

  G.render = function () {
    const p = G.store.profile;
    if (!p) return;
    const view = G.views[G.store.view] ? G.store.view : 'ceo';

    /* sidebar org card */
    const t = E.tier(p.followers);
    const cap = E.capacity(p);
    G.$('#orgCard').innerHTML = `
      <div class="oc-niche">${G.esc(G.nicheName(p))}</div>
      <div class="muted" style="font-size:11px;margin-top:2px">${G.esc(p.handle || t.label)}</div>
      <div class="oc-row"><span>Followers</span><b>${G.comma(p.followers)}</b></div>
      <div class="oc-row"><span>Stage</span><b>${G.esc(t.label.split('·')[1] ? t.label.split('·')[1].trim() : t.label)}</b></div>
      <div class="oc-row"><span>Output</span><b>${cap.totalWeek}/wk</b></div>
      <div class="oc-row"><span>Goal</span><b>${G.esc(p.goal)}</b></div>`;

    G.$$('.nav-item').forEach((b) => b.classList.toggle('active', b.dataset.view === view));
    const main = G.$('#main');
    main.innerHTML = G.views[view].render(p);
    if (G.views[view].mount) G.views[view].mount();

    /* global copy delegation */
    G.$$('[data-copy]').forEach((b) => {
      b.onclick = function () { G.copy(b.getAttribute('data-copy')); };
    });
  };

  /* ---------------- markdown export ---------------- */
  function exportPlan() {
    const p = G.store.profile;
    const n = G.niche(p);
    const cap = E.capacity(p);
    const now = E.monthlyGain(p, p.followers, 1);
    const rev = E.revenue(p, now.reach);
    const re = E.reverseEngineer(p);
    const proj = E.project(p, 6, 'base');
    const cal = G.content.calendar(p, G.store.calendarStart, 28);
    const rc = E.rateCard(p);
    const L = [];

    L.push('# Instagram Business Plan — ' + G.nicheName(p));
    L.push('_Generated by Growth OS on ' + G.today() + (p.handle ? ' for ' + p.handle : '') + '_\n');

    L.push('## 1. CEO Summary\n');
    L.push('- **Niche:** ' + G.nicheName(p));
    L.push('- **Positioning:** ' + n.positioning);
    L.push('- **Audience:** ' + n.audience.who + ', age ' + n.audience.age);
    L.push('- **Stage:** ' + E.tier(p.followers).label + ' (' + G.comma(p.followers) + ' followers)');
    L.push('- **Goal:** ' + p.goal + ' — ' + G.comma(p.followerTarget) + ' followers and ' + G.money(p.revTarget) + '/month within 6 months');
    L.push('- **Capacity:** ' + cap.hours + ' hrs/week → ' + cap.totalWeek + ' posts/week (' +
      cap.perWeek.reel + ' reels, ' + cap.perWeek.carousel + ' carousels, ' + cap.perWeek.static + ' static)');
    L.push('- **6-month projection (base case):** ' + G.comma(proj[5].end) + ' followers');
    L.push('- **Revenue run-rate at current reach:** ' + G.money(rev.total) + '/month');
    L.push('- **Verdict:** ' + re.verdict + '\n');

    L.push('### Top 3 pains to open content with');
    n.audience.pains.slice(0, 3).forEach((x) => L.push('- ' + x));
    L.push('\n### Content pillars');
    n.pillars.forEach((pl) => L.push('- **' + pl.name + ' — ' + pl.pct + '%**: ' + pl.why));

    L.push('\n## 2. HR Department\n');
    L.push('| Role | Hire trigger | Cost | KPI |');
    L.push('|---|---|---|---|');
    L.push('| Content Strategist | now (you) | — | winning hooks/week |');
    L.push('| Video Editor | 3K followers | ' + G.money(12000) + '/mo | <24h turnaround |');
    L.push('| Graphic Designer | 8K followers | ' + G.money(8000) + '/mo | carousel saves |');
    L.push('| Community Manager | 15K followers | ' + G.money(12000) + '/mo | qualified leads passed |');
    L.push('\n**Weekly sprint**\n');
    G.content.sprint(p).forEach((s) => L.push('- **' + s.day + ' (' + s.hrs + 'h · ' + s.block + ')**: ' + s.tasks.join('; ')));

    L.push('\n## 3. Sales Department\n');
    L.push('| Offer | Type | Price | Status |');
    L.push('|---|---|---|---|');
    E.offers(p).forEach((o) => L.push('| ' + o.name + ' | ' + o.type + ' | ' + (o.price ? G.money(o.price) : 'Free') + ' | ' +
      (o.unlocked ? 'live' : 'unlocks at ' + G.fmt(o.gate)) + ' |'));
    L.push('\n**Funnel (monthly):** ' + G.fmt(rev.funnel.reach) + ' reach → ' + G.comma(rev.funnel.visits) +
      ' profile visits → ' + G.comma(rev.funnel.totalLeads) + ' conversations → ' + G.money(rev.total) + ' revenue.');
    L.push('\n**To hit ' + G.money(re.target) + '/month:** ' + Math.ceil(re.salesNeeded) + ' sales of ' + re.offer.name +
      ' → ' + Math.ceil(re.leadsNeeded) + ' qualified conversations → ' + G.fmt(re.reachNeeded) + ' monthly reach.');
    L.push('\n**Brand deal rate card:** story ' + G.money(rc.story) + ' · reel ' + G.money(rc.reel) +
      ' · bundle ' + G.money(rc.bundle) + ' · retainer ' + G.money(rc.monthlyRetainer) + '/mo.');

    L.push('\n## 4. Finance Department\n');
    L.push('| Line | Share | Amount |');
    L.push('|---|---|---|');
    E.budget(p).forEach((b) => L.push('| ' + b.label + ' | ' + G.pct(b.pct, 0) + ' | ' + G.money(b.amount) + ' |'));
    L.push('\n- Projected revenue: ' + G.money(rev.total) + '/mo · Budget: ' + G.money(p.budget) + '/mo · Projected profit: ' + G.money(rev.total - p.budget));
    L.push('- Revenue per post: ' + G.money(rev.total / Math.max(1, cap.totalMonth)));

    L.push('\n## 5. Operations Department\n');
    L.push('Pipeline: Idea → Script → Shoot/Design → Edit → Caption & SEO → Scheduled → Published.');
    L.push('\n- Output: ' + cap.totalWeek + ' posts/week, ' + cap.storiesPerDay + ' stories/day');
    L.push('- Engagement quota: ' + cap.commentsPerDay + ' comments/day, ' + cap.dmsPerDay + ' DMs/day');
    L.push('- Buffer rule: never fewer than ' + cap.totalWeek * 2 + ' pieces in the pipeline');

    L.push('\n## 6. Marketing Department — 28-day calendar\n');
    L.push('| Date | Day | Format | Pillar | Topic | Hook | CTA | Time |');
    L.push('|---|---|---|---|---|---|---|---|');
    cal.forEach((d) => L.push('| ' + d.date + ' | ' + G.dayName(d.date) + ' | ' + d.format + ' | ' + d.pillar +
      ' | ' + d.topic + ' | ' + d.hook.replace(/\|/g, '/') + ' | ' + d.cta + ' | ' + d.time + ' |'));
    L.push('\n**Hashtag set:** ' + G.content.hashtags(p).all.join(' '));

    L.push('\n## 7. Development / Content Department\n');
    const sample = cal.filter((d) => d.format !== 'rest').slice(0, 3);
    sample.forEach((d) => {
      const s = G.content.script(d, p);
      L.push('\n### ' + G.prettyDate(d.date) + ' · ' + d.format + ' · ' + d.topic);
      L.push('**Hook:** ' + s.hook + '\n');
      s.beats.forEach((b, i) => L.push((i + 1) + '. **' + b.t + '** — ' + b.s));
      L.push('\n**CTA:** ' + s.cta);
      L.push('\n**Caption:**\n\n> ' + s.caption.replace(/\n/g, '\n> '));
      L.push('\n**Hashtags:** ' + s.hashtags.all.join(' '));
    });
    L.push('\n**House style:** ' + n.visual);

    L.push('\n## 8. Final combined daily action plan\n');
    L.push('1. Publish the scheduled post at its slot — never improvise the time.');
    L.push('2. Reply to every comment for the first 60 minutes.');
    L.push('3. ' + cap.commentsPerDay + ' comments on larger accounts in the niche.');
    L.push('4. ' + cap.dmsPerDay + ' DMs — question first, never a pitch.');
    L.push('5. ' + cap.storiesPerDay + ' stories, at least one poll or question sticker.');
    L.push('6. Add 3 content ideas from real questions people asked you.');
    L.push('7. Move every pipeline card one stage to the right.');
    L.push('8. Sunday only: log the week\'s numbers, repeat one thing, kill one thing.');

    G.download('instagram-business-plan.md', L.join('\n'), 'text/markdown');
  }

  /* ---------------- boot ---------------- */
  function boot() {
    G.load();
    G.$$('.nav-item').forEach((b) => { b.onclick = function () { G.go(b.dataset.view); }; });
    G.$('#btnExport').onclick = exportPlan;
    G.$('#btnReset').onclick = function () {
      if (!confirm('Reset the company? Your profile, pipeline, ledger and logs will be deleted.')) return;
      G.wipe();
      location.reload();
    };

    if (G.store.profile) {
      G.$('#app').classList.remove('hidden');
      G.render();
    } else {
      G.$('#onboarding').classList.remove('hidden');
      initOnboarding();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window.IGOS);
