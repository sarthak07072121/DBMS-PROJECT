/* ================= DEPARTMENT · SCRIPT WRITER ================= */
(function (G) {
  'use strict';
  G.views = G.views || {};
  const S = G.scripts;

  function currentTopic(p) {
    if (G.store.scriptTopic) return G.store.scriptTopic;
    const cal = G.content.calendar(p, G.store.calendarStart, 7).filter((d) => d.format !== 'rest');
    return cal.length ? cal[0].topic : G.niche(p).ideas[0];
  }

  G.views.scriptwriter = {
    title: 'Script Writer',
    render: function (p) {
      const n = G.niche(p);
      const topic = currentTopic(p);
      const fwKey = G.store.scriptFramework || 'pas';
      const seed = (G.store.seed || 1) + topic.length;
      const sc = S.build(topic, fwKey, p, seed);
      const hooks = S.hooksFor(topic, p, seed);
      const vault = G.store.scripts || [];
      const cal = G.content.calendar(p, G.store.calendarStart, 28).filter((d) => d.format !== 'rest');

      const plain = [
        'TOPIC: ' + sc.topic,
        'FRAMEWORK: ' + sc.framework.name + '  ·  ' + sc.seconds + 's  ·  ~' + sc.words + ' words',
        '',
        'HOOK (' + sc.hookType + '): ' + sc.hook,
        '',
        sc.beats.map((b) => b.sec + '  ' + b.t.toUpperCase() + ' (~' + b.words + ' words)\n   ' + b.do + (b.line ? '\n   ' + b.line : '')).join('\n\n'),
        '',
        'CTA: ' + sc.cta,
        'RETENTION: ' + sc.retention,
        'ON-SCREEN: ' + sc.onScreen.join(' | ')
      ].join('\n');

      const beatRows = sc.beats.map((b) => [
        '<b>' + G.esc(b.sec) + '</b>',
        '<b>' + G.esc(b.t) + '</b>',
        b.words,
        G.esc(b.do) + (b.line ? '<div class="muted" style="margin-top:4px">' + G.esc(b.line) + '</div>' : '')
      ]);

      const fwOptions = S.FRAMEWORKS.map((f) =>
        `<option value="${f.key}" ${f.key === fwKey ? 'selected' : ''}>${G.esc(f.name)}</option>`).join('');

      const calOptions = ['<option value="">— pick a scheduled topic —</option>']
        .concat(cal.slice(0, 24).map((d) =>
          `<option value="${G.esc(d.topic)}">${G.prettyDate(d.date)} · ${G.esc(d.topic.slice(0, 46))}</option>`)).join('');

      const hookRows = hooks.map((h) => [
        '<span class="pill acc">' + G.esc(h.type) + '</span>',
        '<b>' + G.esc(h.line) + '</b><div class="muted" style="margin-top:3px">' + G.esc(h.why) + '</div>',
        '<button class="btn sm" data-copy="' + G.esc(h.line) + '">Copy</button>'
      ]);

      const fwCards = S.FRAMEWORKS.map((f) => `
        <div class="card tight">
          <div class="split"><b>${G.esc(f.name)}</b>
            <button class="right btn sm ${f.key === fwKey ? 'primary' : ''}" data-fw="${f.key}">${f.key === fwKey ? 'In use' : 'Use'}</button></div>
          <div class="muted" style="margin:5px 0 9px">${G.esc(f.best)}</div>
          ${G.bullets(f.beats.map((b) => '<b>' + G.esc(b.t) + '</b> <span class="muted">' + G.esc(b.sec) + '</span> — ' + G.esc(b.do)))}
        </div>`).join('');

      const dm = S.dmScripts(p).map((d) => `
        <div class="card tight">
          <div class="split"><b>${G.esc(d.t)}</b>
            <button class="btn sm right" data-copy="${G.esc(d.s)}">Copy</button></div>
          <div class="script" style="margin-top:9px"><pre>${G.esc(d.s)}</pre></div>
        </div>`).join('');

      const vaultHtml = vault.length ? G.table(['Saved', 'Topic', 'Framework', ''],
        vault.slice().reverse().map((v) => [
          G.esc(v.date), '<b>' + G.esc(v.topic) + '</b>', G.esc(v.framework),
          '<button class="btn sm" data-load-script="' + G.esc(v.id) + '">Open</button> ' +
          '<button class="btn sm" data-del-script="' + G.esc(v.id) + '">Remove</button>'
        ])) : '<p class="muted">Nothing saved yet. Write one above and hit Save — a script you keep is a script you can rewrite next month instead of starting cold.</p>';

      return `
        <div class="page-head">
          <div class="eyebrow">Department 02 · Script Writer</div>
          <h1>The writing room</h1>
          <p class="lead">A topic is not a video. This department turns one line into a filmable script with a
          structure, a timing map and a hook that earns the first three seconds.</p>
        </div>
        <div class="kpis">
          ${G.kpi('Target length', sc.seconds + 's', '~' + sc.words + ' spoken words')}
          ${G.kpi('Framework', G.esc(sc.framework.short), sc.framework.name + ' · ' + S.FRAMEWORKS.length + ' available')}
          ${G.kpi('Hooks generated', hooks.length, 'for this topic, ' + S.HOOK_TYPES.length + ' types')}
          ${G.kpi('Script vault', vault.length, vault.length ? 'saved and reusable' : 'save your winners', vault.length ? 'ok' : '')}
        </div>

        <div class="card">
          <div class="card-head"><h3>Workbench</h3>
            <div class="split">
              <button id="scRandom" class="btn sm">Surprise me</button>
              <button id="scSave" class="btn sm">Save to vault</button>
              <button class="btn sm primary" data-copy="${G.esc(plain)}">Copy script</button>
            </div>
          </div>
          <div class="grid" style="grid-template-columns:2fr 1fr;gap:12px">
            <label class="field" style="margin:0"><span>Topic</span>
              <input id="scTopic" type="text" value="${G.esc(topic)}" placeholder="what is this video about?"></label>
            <label class="field" style="margin:0"><span>Framework</span>
              <select id="scFw">${fwOptions}</select></label>
          </div>
          <label class="field" style="margin:12px 0 0"><span>Or pull a topic straight from the calendar</span>
            <select id="scCal">${calOptions}</select></label>
        </div>

        <div class="grid g2">
          <div class="card">
            <div class="card-head"><h3>Script</h3><span class="pill info">${G.esc(sc.framework.name)}</span></div>
            <div class="script">
              <div class="sl">Hook · ${G.esc(sc.hookType)}</div>
              <div class="hookline">${G.esc(sc.hook)}</div>
              <div class="sl">Call to action</div><div>${G.esc(sc.cta)}</div>
              <div class="sl">Retention</div><div>${G.esc(sc.retention)}</div>
              <div class="sl">Objection to kill on camera</div><div>&ldquo;${G.esc(sc.objection)}&rdquo;</div>
            </div>
            <h4 style="margin-top:14px">On-screen text</h4>${G.bullets(sc.onScreen.map(G.esc))}
          </div>
          <div class="card">
            <div class="card-head"><h3>Beat sheet</h3><span class="pill">${sc.seconds}s total</span></div>
            ${G.table(['Timing', 'Beat', '#Words', 'What to say'], beatRows)}
            <div class="callout"><b>Word budget:</b> ~${sc.words} words at a natural pace (${S.WPS} words/second).
            Write to that number. Every word over it is a word you will cut in the edit anyway.</div>
          </div>
        </div>

        <div class="section"><h2>Hook laboratory</h2>
          <p class="muted">Same topic, ten doors in. Film the top two and let the numbers pick the winner.</p>
          ${G.card('Ten hooks for &ldquo;' + G.esc(topic) + '&rdquo;', G.table(['Type', 'Hook', ''], hookRows),
        '<button class="btn sm" data-copy="' + G.esc(hooks.map((h) => h.line).join('\n')) + '">Copy all</button>')}
          ${G.card('A hook ships only if all five are true',
          G.bullets(S.HOOK_TESTS.map((t) => '<b>' + G.esc(t.t) + '</b> — ' + G.esc(t.s))))}
        </div>

        <div class="section"><h2>Frameworks</h2>
          <p class="muted">Pick the structure before you write a word. Improvised scripts is why most reels sag at second 12.</p>
          <div class="grid g2">${fwCards}</div>
        </div>

        <div class="section"><h2>Voice & editing pass</h2>
          <div class="grid g2">
            ${G.card('How this account sounds', G.bullets(S.VOICE.map((v) => '<b>' + G.esc(v.t) + '</b> — ' + G.esc(v.s))))}
            ${G.card('Delete on sight', G.table(['Cut this', 'Why'], S.CUTS.map((c) => ['<b>' + G.esc(c[0]) + '</b>', G.esc(c[1])])) +
        '<div class="callout warn"><b>The 30% rule:</b> write the script, then cut a third of the words without losing a single idea. ' +
        'The cut version always outperforms the original.</div>')}
          </div>
        </div>

        <div class="section"><h2>DM & outreach scripts</h2>
          <p class="muted">Conversations are scripts too. These are the ones that turn reach into replies.</p>
          <div class="grid g2">${dm}</div>
        </div>

        <div class="section"><h2>Script vault</h2>${G.card('Saved scripts', vaultHtml)}</div>`;
    },

    mount: function () {
      const p = G.store.profile;
      const apply = function () {
        G.store.scriptTopic = (G.$('#scTopic').value || '').trim() || null;
        G.store.scriptFramework = G.$('#scFw').value;
        G.save(); G.render();
      };
      const t = G.$('#scTopic'); if (t) t.onchange = apply;
      const fw = G.$('#scFw'); if (fw) fw.onchange = apply;
      const cal = G.$('#scCal');
      if (cal) cal.onchange = function () {
        if (!cal.value) return;
        G.store.scriptTopic = cal.value;
        G.save(); G.render();
      };
      G.$$('[data-fw]').forEach((b) => {
        b.onclick = function () {
          G.store.scriptFramework = b.getAttribute('data-fw');
          G.save(); G.render(); window.scrollTo(0, 0);
        };
      });
      const rnd = G.$('#scRandom');
      if (rnd) rnd.onclick = function () {
        const ideas = G.niche(p).ideas;
        G.store.scriptTopic = ideas[Math.floor(Math.random() * ideas.length)];
        G.store.seed = Math.floor(Math.random() * 1e8);
        G.save(); G.render();
      };
      const save = G.$('#scSave');
      if (save) save.onclick = function () {
        const topic = (G.$('#scTopic').value || '').trim();
        if (!topic) { G.toast('Write a topic first'); return; }
        const fwKey = G.$('#scFw').value;
        G.store.scripts.push({
          id: 's' + Date.now(), date: G.today(), topic: topic,
          frameworkKey: fwKey, framework: G.scripts.framework(fwKey).name
        });
        G.save(); G.render(); G.toast('Saved to the vault');
      };
      G.$$('[data-load-script]').forEach((b) => {
        b.onclick = function () {
          const s = (G.store.scripts || []).find((x) => x.id === b.getAttribute('data-load-script'));
          if (!s) return;
          G.store.scriptTopic = s.topic;
          G.store.scriptFramework = s.frameworkKey;
          G.save(); G.render(); window.scrollTo(0, 0);
        };
      });
      G.$$('[data-del-script]').forEach((b) => {
        b.onclick = function () {
          G.store.scripts = (G.store.scripts || []).filter((x) => x.id !== b.getAttribute('data-del-script'));
          G.save(); G.render();
        };
      });
    }
  };
})(window.IGOS);
