/* ================= DEPARTMENT · IDEA GENERATOR ================= */
(function (G) {
  'use strict';
  G.views = G.views || {};
  const I = G.ideas;

  G.views.ideagen = {
    title: 'Idea Generator',
    render: function (p) {
      const n = G.niche(p);
      const count = G.store.ideaCount || 20;
      const seed = G.store.ideaSeed || G.store.seed || 1;
      const list = I.generate(p, count, seed);
      const vault = G.store.ideaVault || [];
      const cap = G.engine.capacity(p);
      const avg = list.reduce((s, i) => s + i.score.total, 0) / Math.max(1, list.length);
      const weeksCovered = (vault.length / Math.max(1, cap.totalWeek)).toFixed(1);

      const cards = list.map((i) => {
        const saved = vault.some((v) => v.title === i.title);
        const pct = (i.score.total / 25) * 100;
        return `<div class="card tight">
          <div class="split" style="margin-bottom:6px">
            <span class="pill ${i.score.total >= 20 ? 'ok' : i.score.total >= 16 ? 'acc' : ''}">${G.esc(i.score.label)}</span>
            <span class="pill">${G.esc(i.format)}</span>
            <span class="right muted" style="font-size:11px">${i.score.total}/25</span>
          </div>
          <div style="font-weight:600;line-height:1.35;margin-bottom:5px">${G.esc(i.title)}</div>
          <div class="bar"><i style="width:${pct}%"></i></div>
          <div class="muted" style="margin:8px 0 10px;font-size:12px">${G.esc(i.angle)} · ${G.esc(i.why)}</div>
          <div class="split" style="gap:6px">
            <button class="btn sm ${saved ? '' : 'primary'}" data-save-idea="${G.esc(i.id)}" ${saved ? 'disabled' : ''}>${saved ? 'In vault' : 'Save'}</button>
            <button class="btn sm" data-script-idea="${G.esc(i.topic)}">Write script</button>
            <button class="btn sm" data-pipe-idea="${G.esc(i.title)}" data-pipe-format="${G.esc(i.format)}">→ Pipeline</button>
          </div>
        </div>`;
      }).join('');

      /* angle multiplier for one topic */
      const focus = G.store.angleTopic || n.ideas[0];
      const angleRows = I.ANGLES.map((a) => {
        const sc = I.score(a, p);
        return [
          '<b>' + G.esc(a.name) + '</b>',
          G.esc(a.tpl.replace('{t}', focus)),
          '<span class="pill ' + (sc.total >= 20 ? 'ok' : sc.total >= 16 ? 'acc' : '') + '">' + sc.total + '/25</span>',
          G.esc(a.fmt),
          '<button class="btn sm" data-script-idea="' + G.esc(focus) + '">Script</button>'
        ];
      });

      const topicOptions = n.ideas.map((t) =>
        `<option value="${G.esc(t)}" ${t === focus ? 'selected' : ''}>${G.esc(t)}</option>`).join('');

      const vaultHtml = vault.length ? G.table(['Idea', 'Angle', '#Score', 'Format', ''],
        vault.slice().reverse().map((v) => [
          '<b>' + G.esc(v.title) + '</b>', G.esc(v.angle), v.score + '/25', G.esc(v.format),
          '<button class="btn sm" data-script-idea="' + G.esc(v.topic) + '">Script</button> ' +
          '<button class="btn sm" data-pipe-idea="' + G.esc(v.title) + '" data-pipe-format="' + G.esc(v.format) + '">→ Pipeline</button> ' +
          '<button class="btn sm" data-del-idea="' + G.esc(v.id) + '">Remove</button>'
        ])) : '<p class="muted">Empty. Save the ideas you would actually make — the vault is what stops you opening the app with nothing to say.</p>';

      const seasons = I.seasons(p).map((s) => [
        '<b>' + G.esc(s.m) + '</b>', G.esc(s.moment), G.esc(s.angle)
      ]);

      return `
        <div class="page-head">
          <div class="eyebrow">Department 03 · Idea Generator</div>
          <h1>The idea machine</h1>
          <p class="lead">Running out of ideas is a systems failure, not a creativity failure. This department combines
          your niche's proven topics with twelve angles, scores each combination, and ranks them so you make the good ones first.</p>
        </div>
        <div class="kpis">
          ${G.kpi('Ideas on screen', list.length, 'ranked by score')}
          ${G.kpi('Average score', avg.toFixed(1) + '/25', 'across this batch')}
          ${G.kpi('In the vault', vault.length, vault.length ? weeksCovered + ' weeks of output' : 'save the ones you will make', vault.length >= cap.totalWeek * 2 ? 'ok' : 'warn')}
          ${G.kpi('Combinations available', (n.ideas.length * I.ANGLES.length), n.ideas.length + ' topics × ' + I.ANGLES.length + ' angles')}
        </div>

        <div class="card">
          <div class="card-head"><h3>Generate</h3>
            <div class="split">
              <select id="igCount" style="width:auto">
                ${[12, 20, 40].map((c) => `<option value="${c}" ${c === count ? 'selected' : ''}>${c} ideas</option>`).join('')}
              </select>
              <button id="igGen" class="btn primary sm">New batch</button>
            </div>
          </div>
          <p class="muted">Every idea is scored out of 25 on search demand, emotion, specificity, provability and how well it
          walks toward what you sell — weighted for your <b>${G.esc(p.goal)}</b> goal.</p>
        </div>

        <div class="grid g3" style="margin-bottom:20px">${cards}</div>

        <div class="section"><h2>Angle multiplier</h2>
          <p class="muted">One topic is twelve posts. This is how a small idea bank lasts a year.</p>
          ${G.card('Every angle on one topic', `
            <label class="field"><span>Topic</span><select id="igTopic">${topicOptions}</select></label>
            ${G.table(['Angle', 'The post', '#Score', 'Format', ''], angleRows)}`)}
        </div>

        <div class="section"><h2>Idea vault</h2>
          ${G.card('Saved ideas', vaultHtml, vault.length ? '<button id="igClear" class="btn sm">Clear vault</button>' : '')}
        </div>

        <div class="section"><h2>Where ideas come from</h2>
          <p class="muted">Observed ideas beat invented ones every time. These are the six inputs — work them on a quota.</p>
          ${G.card('Input sources', G.table(['Source', 'How to work it', 'Quota'],
        I.SOURCES.map((s) => ['<b>' + G.esc(s[0]) + '</b>', G.esc(s[1]), '<span class="pill acc">' + G.esc(s[2]) + '</span>'])))}
        </div>

        <div class="section"><h2>Before you make it</h2>
          ${G.card('Five filters', G.bullets(I.FILTERS.map((f) => '<b>' + G.esc(f.t) + '</b> — ' + G.esc(f.s))))}
        </div>

        <div class="section"><h2>Seasonal demand</h2>
          <p class="muted">Plan against the calendar the audience already lives in.</p>
          ${G.card('Twelve months of ' + G.esc(n.short), G.table(['Month', 'Moment', 'What to make'], seasons))}
        </div>`;
    },

    mount: function () {
      const p = G.store.profile;
      const gen = G.$('#igGen');
      if (gen) gen.onclick = function () {
        G.store.ideaSeed = Math.floor(Math.random() * 1e8);
        G.store.ideaCount = Number(G.$('#igCount').value) || 20;
        G.save(); G.render(); G.toast('New batch generated');
      };
      const cnt = G.$('#igCount');
      if (cnt) cnt.onchange = function () {
        G.store.ideaCount = Number(cnt.value) || 20;
        G.save(); G.render();
      };
      const tp = G.$('#igTopic');
      if (tp) tp.onchange = function () {
        G.store.angleTopic = tp.value;
        G.save(); G.render();
      };

      G.$$('[data-save-idea]').forEach((b) => {
        b.onclick = function () {
          const list = I.generate(p, G.store.ideaCount || 20, G.store.ideaSeed || G.store.seed || 1);
          const idea = list.find((x) => x.id === b.getAttribute('data-save-idea'));
          if (!idea) return;
          G.store.ideaVault.push({
            id: 'v' + Date.now() + Math.random().toString(36).slice(2, 5),
            title: idea.title, topic: idea.topic, angle: idea.angle,
            format: idea.format, score: idea.score.total, date: G.today()
          });
          G.save(); G.render(); G.toast('Saved to the vault');
        };
      });
      G.$$('[data-del-idea]').forEach((b) => {
        b.onclick = function () {
          G.store.ideaVault = (G.store.ideaVault || []).filter((v) => v.id !== b.getAttribute('data-del-idea'));
          G.save(); G.render();
        };
      });
      const clr = G.$('#igClear');
      if (clr) clr.onclick = function () {
        if (!confirm('Clear every saved idea?')) return;
        G.store.ideaVault = []; G.save(); G.render();
      };
      G.$$('[data-script-idea]').forEach((b) => {
        b.onclick = function () {
          G.store.scriptTopic = b.getAttribute('data-script-idea');
          G.save(); G.go('scriptwriter');
        };
      });
      G.$$('[data-pipe-idea]').forEach((b) => {
        b.onclick = function () {
          const title = b.getAttribute('data-pipe-idea');
          if ((G.store.pipeline || []).some((c) => c.title === title)) { G.toast('Already in the pipeline'); return; }
          G.store.pipeline.push({
            id: 'c' + Date.now() + Math.random().toString(36).slice(2, 5),
            title: title, stage: 'Idea', format: b.getAttribute('data-pipe-format')
          });
          G.save(); G.toast('Added to the Operations pipeline');
          G.render();
        };
      });
    }
  };
})(window.IGOS);
