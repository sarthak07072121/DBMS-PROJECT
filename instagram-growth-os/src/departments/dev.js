/* ================= DEPARTMENT · DEVELOPMENT / CONTENT STUDIO ================= */
(function (G) {
  'use strict';
  G.views = G.views || {};

  G.views.dev = {
    title: 'Content Studio',
    render: function (p) {
      const n = G.niche(p);
      const cal = G.content.calendar(p, G.store.calendarStart, 28).filter((d) => d.format !== 'rest');
      if (!cal.length) return '<p class="lead">No posts scheduled. Increase your weekly hours in the CEO settings.</p>';

      let idx = cal.findIndex((d) => d.idx === G.store.selectedDay);
      if (idx < 0) idx = 0;
      const day = cal[idx];
      const s = G.content.script(day, p);

      const options = cal.map((d, i) =>
        `<option value="${i}" ${i === idx ? 'selected' : ''}>${G.dayName(d.date)} ${G.prettyDate(d.date)} · ${d.format} · ${G.esc(d.topic.slice(0, 44))}</option>`
      ).join('');

      /* full plain-text export of this piece */
      const plain = [
        day.format.toUpperCase() + ' · ' + G.prettyDate(day.date) + ' · ' + day.time,
        'PILLAR: ' + day.pillar,
        'TOPIC: ' + day.topic,
        '',
        'HOOK (0-3s): ' + s.hook,
        '',
        'SCRIPT:',
        s.beats.map((b, i) => (i + 1) + '. ' + b.t + ' — ' + b.s).join('\n'),
        '',
        'CTA: ' + s.cta,
        'LOOP: ' + s.loop,
        '',
        'ON-SCREEN TEXT: ' + s.onScreen.join(' | '),
        'COVER: ' + s.cover,
        'RETENTION NOTE: ' + s.retention,
        '',
        'CAPTION:',
        s.caption,
        '',
        'HASHTAGS: ' + s.hashtags.all.join(' '),
        '',
        'STORIES:',
        s.stories.map((x) => '• ' + x.t + ': ' + x.s).join('\n')
      ].join('\n');

      const beatsHtml = s.beats.map((b, i) => `
        <div class="sl">${i + 1} · ${G.esc(b.t)}</div><div>${G.esc(b.s)}</div>`).join('');

      const slidesHtml = s.slides ? `
        ${G.card('Carousel — slide by slide', G.table(['#', 'Role', 'What goes on the slide'],
        s.slides.map((sl) => [sl.n, '<b>' + G.esc(sl.role) + '</b>', G.esc(sl.text)])) +
        '<div class="callout"><b>Design rule:</b> one idea per slide, 8 words maximum in the headline, ' +
        'and the same template every time so your grid reads as one brand. Slide 1 decides the reach; slide 8 decides the revenue.</div>')}` : '';

      return `
        <div class="page-head">
          <div class="eyebrow">Department 06 · Development / Content</div>
          <h1>Content Studio</h1>
          <p class="lead">Every scheduled slot, written out: hook, script, on-screen text, caption, hashtags and the story sequence around it.</p>
        </div>

        <div class="card">
          <div class="card-head">
            <div style="flex:1;min-width:260px">
              <label class="field" style="margin:0"><span>Pick a slot from the calendar</span>
                <select id="daySel">${options}</select></label>
            </div>
            <div class="split">
              <button class="btn sm" id="prevDay">←</button>
              <button class="btn sm" id="nextDay">→</button>
              <button class="btn sm primary" data-copy="${G.esc(plain)}">Copy everything</button>
            </div>
          </div>
          <div class="split" style="gap:8px">
            <span class="pill acc">${G.esc(day.format)}</span>
            <span class="pill">${G.esc(day.pillar)}</span>
            <span class="pill info">post at ${G.esc(day.time)}</span>
            <span class="pill">${G.dayName(day.date)} ${G.prettyDate(day.date)}</span>
          </div>
        </div>

        <div class="grid g2">
          <div class="card">
            <div class="card-head"><h3>Script</h3>
              <button class="btn sm" data-copy="${G.esc(s.hook + '\n\n' + s.beats.map((b, i) => (i + 1) + '. ' + b.t + ' — ' + b.s).join('\n') + '\n\n' + s.cta)}">Copy script</button></div>
            <div class="script">
              <div class="sl">Hook · 0–3 seconds</div>
              <div class="hookline">${G.esc(s.hook)}</div>
              ${beatsHtml}
              <div class="sl">Call to action</div>
              <div>${G.esc(s.cta)}</div>
              <div class="muted" style="margin-top:6px">${G.esc(s.ctaWhy)}</div>
              <div class="sl">Loop</div><div>${G.esc(s.loop)}</div>
            </div>
            ${s.hookAlts.length ? `<h4 style="margin-top:14px">Alternative hooks — test these on the same topic</h4>
              ${G.bullets(s.hookAlts.map(G.esc))}` : ''}
          </div>

          <div class="card">
            <div class="card-head"><h3>Caption</h3>
              <button class="btn sm" data-copy="${G.esc(s.caption + '\n\n' + s.hashtags.all.join(' '))}">Copy caption + tags</button></div>
            <div class="script"><pre>${G.esc(s.caption)}</pre></div>
            <h4 style="margin-top:14px">Hashtags (2 broad · 4 mid · 6 niche)</h4>
            <div class="tagcloud">${s.hashtags.all.map((t) => '<code>' + G.esc(t) + '</code>').join('')}</div>
            <h4 style="margin-top:14px">Comment-to-DM keyword</h4>
            <p class="muted">Set your automation to trigger on <b>${G.esc(s.keyword)}</b>. Pin a comment with it so late viewers still convert.</p>
          </div>
        </div>

        <div class="grid g2">
          ${G.card('Shot list & on-screen text', `
            <h4>On-screen text (in order)</h4>${G.bullets(s.onScreen.map(G.esc))}
            <h4 style="margin-top:14px">Cover / thumbnail</h4>
            <div class="script" style="font-size:20px;font-weight:800;text-align:center;padding:22px">${G.esc(s.cover)}</div>
            <h4 style="margin-top:14px">B-roll</h4>${G.bullets(s.broll.map(G.esc))}
            <div class="callout"><b>Retention note:</b> ${G.esc(s.retention)}</div>`)}
          ${G.card('Story sequence for this day', G.table(['Frame', 'What to post'],
        s.stories.map((x) => ['<b>' + G.esc(x.t) + '</b>', G.esc(x.s)])))}
        </div>

        ${slidesHtml}

        <div class="section"><h2>House style</h2>
          <div class="grid g2">
            ${G.card('Editing & visual identity', `<p>${G.esc(n.visual)}</p>
              <h4 style="margin-top:12px">Fixed rules</h4>
              ${G.bullets([
          'Same 3 colours on every cover — your grid should be recognisable at thumbnail size.',
          'One font family, two weights. Nothing else.',
          'Burned-in captions on every reel, positioned above the UI safe zone.',
          'Your face or your hands in the first frame — a text-only opener loses 30% of viewers.',
          'Audio levelled so voice sits above the music, never under it.'
        ].map(G.esc))}`)}
            ${G.card('Proof assets to build', `<p class="muted">Content earns attention. Proof converts it. Collect these deliberately.</p>
              ${G.bullets(n.proof.map(G.esc))}
              <div class="callout"><b>Rule:</b> every 10th post is proof. Without it you are a content account, not a business.</div>`)}
          </div>
        </div>

        <div class="section"><h2>Idea vault — ${G.esc(n.label)}</h2>
          ${G.card('16 topics your audience is already searching for',
          `<div class="grid g2">
              <div>${G.bullets(n.ideas.slice(0, 8).map(G.esc))}</div>
              <div>${G.bullets(n.ideas.slice(8).map(G.esc))}</div>
            </div>`,
          '<button class="btn sm" data-copy="' + G.esc(n.ideas.join('\n')) + '">Copy all</button>')}
        </div>`;
    },

    mount: function () {
      const sel = G.$('#daySel');
      const cal = G.content.calendar(G.store.profile, G.store.calendarStart, 28).filter((d) => d.format !== 'rest');
      const jump = function (i) {
        i = G.clamp(i, 0, cal.length - 1);
        G.store.selectedDay = cal[i].idx;
        G.save(); G.render();
      };
      if (sel) sel.onchange = function () { jump(Number(sel.value)); };
      const cur = Math.max(0, cal.findIndex((d) => d.idx === G.store.selectedDay));
      const pv = G.$('#prevDay'); if (pv) pv.onclick = function () { jump(cur - 1); };
      const nx = G.$('#nextDay'); if (nx) nx.onclick = function () { jump(cur + 1); };
    }
  };
})(window.IGOS);
