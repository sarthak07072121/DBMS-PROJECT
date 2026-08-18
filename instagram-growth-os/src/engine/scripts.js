/* ================= GROWTH OS · scriptwriting engine =================
   Frameworks, hook laboratory and the script builder. Everything the
   Script Writer department turns a topic into.
==================================================================== */
(function (G) {
  'use strict';
  const S = G.scripts = {};

  /* Words per second at a natural talking-head pace (≈145 wpm). */
  S.WPS = 2.4;
  S.LENGTHS = { reel: 38, carousel: 0, static: 0, story: 12 };

  /* ---------------- frameworks ---------------- */
  S.FRAMEWORKS = [
    {
      key: 'pas', short: 'PAS', name: 'Problem → Agitate → Solve',
      best: 'Pain-led topics. Use when the audience already feels the ache and just needs a way out.',
      beats: [
        { t: 'Problem', sec: '0–3s', do: 'State the pain in their words, not yours. No preamble, no "hey guys".' },
        { t: 'Agitate', sec: '3–9s', do: 'Name what it is costing them if nothing changes. One consequence, made concrete.' },
        { t: 'Solve', sec: '9–32s', do: 'Three steps, numbered on screen. Each one doable today without a follow-up question.' },
        { t: 'Proof', sec: '32–42s', do: 'A number, a screenshot, or a before/after. Promise without proof does not convert.' },
        { t: 'CTA', sec: '42–50s', do: 'One action, one sentence.' }
      ]
    },
    {
      key: 'mythbust', short: 'Myth-bust', name: 'Myth → Truth → Method',
      best: 'Authority building. The fastest way to be remembered is to correct something they believe today.',
      beats: [
        { t: 'The myth', sec: '0–3s', do: 'Say the belief out loud, exactly as they would say it.' },
        { t: 'Why it spread', sec: '3–8s', do: 'Show why it sounds right. This is what stops the audience feeling stupid.' },
        { t: 'The truth', sec: '8–18s', do: 'The correction, in one clean sentence. Slow down here.' },
        { t: 'The method', sec: '18–38s', do: 'What to do instead, step by step.' },
        { t: 'CTA', sec: '38–45s', do: 'Ask them to share it with whoever taught them the myth.' }
      ]
    },
    {
      key: 'listicle', short: 'Rapid list', name: 'Rapid list',
      best: 'High completion rate and easy to batch. Best for broad-reach topics and carousels.',
      beats: [
        { t: 'Promise', sec: '0–3s', do: 'Number + payoff. "5 things that…" — the number is the hook.' },
        { t: 'Item 1', sec: '3–12s', do: 'Strongest item first. Never save the best for last on Instagram.' },
        { t: 'Item 2', sec: '12–20s', do: 'Change the visual here — this is where drop-off spikes.' },
        { t: 'Item 3', sec: '20–28s', do: 'Shortest item. Keep the rhythm moving.' },
        { t: 'Items 4–5', sec: '28–40s', do: 'Fastest cuts of the whole video.' },
        { t: 'CTA', sec: '40–46s', do: 'Save — a list is useless watched once.' }
      ]
    },
    {
      key: 'tutorial', short: 'Tutorial', name: 'Result-first tutorial',
      best: 'How-to topics. Showing the finished thing first buys you the 30 seconds to explain it.',
      beats: [
        { t: 'The result', sec: '0–3s', do: 'Show the finished outcome before explaining anything.' },
        { t: 'The claim', sec: '3–7s', do: 'How long it takes and what it needs. Remove the excuse early.' },
        { t: 'Steps', sec: '7–35s', do: 'Real-time or sped-up. Every step numbered on screen.' },
        { t: 'The catch', sec: '35–42s', do: 'The one thing people get wrong. This is why they follow you.' },
        { t: 'CTA', sec: '42–50s', do: 'Save it for when they actually try it.' }
      ]
    },
    {
      key: 'story', short: 'Story arc', name: 'Story arc',
      best: 'Founder content and proof posts. Story is what makes people buy from you rather than from someone better.',
      beats: [
        { t: 'The moment', sec: '0–4s', do: 'Drop them into the scene. A date, a number, a place. No setup.' },
        { t: 'The stakes', sec: '4–12s', do: 'What you stood to lose. Vulnerability here is the whole mechanism.' },
        { t: 'The turn', sec: '12–25s', do: 'What changed, and what you did differently.' },
        { t: 'The lesson', sec: '25–38s', do: 'Generalise it into something they can use tomorrow.' },
        { t: 'CTA', sec: '38–45s', do: 'Invite the reply: ask what their version of this is.' }
      ]
    },
    {
      key: 'bab', short: 'Before/After', name: 'Before → After → Bridge',
      best: 'Transformation and results content. The highest-retention structure that exists.',
      beats: [
        { t: 'Before', sec: '0–4s', do: 'The starting state, unflattering and specific.' },
        { t: 'After', sec: '4–10s', do: 'The end state, shown not described. Cut between the two.' },
        { t: 'Bridge', sec: '10–35s', do: 'Exactly what happened in between. This is the value.' },
        { t: 'Timeline', sec: '35–43s', do: 'How long it really took. Honesty here beats a bigger claim.' },
        { t: 'CTA', sec: '43–50s', do: 'Offer the same path.' }
      ]
    },
    {
      key: 'contrarian', short: 'Contrarian', name: 'Contrarian take',
      best: 'Comment velocity. Disagreement is distribution — but only defend a position you can actually back.',
      beats: [
        { t: 'The stance', sec: '0–3s', do: 'State the unpopular position flatly. No hedging, no "in my opinion".' },
        { t: 'Steelman', sec: '3–10s', do: 'Give the other side its best argument. Skipping this makes you look cheap.' },
        { t: 'Your evidence', sec: '10–28s', do: 'Why you still disagree. Specifics, not vibes.' },
        { t: 'The nuance', sec: '28–38s', do: 'When the other side is right. This is what makes it credible instead of clickbait.' },
        { t: 'CTA', sec: '38–45s', do: 'Ask for the counter-argument in the comments. Then actually reply.' }
      ]
    },
    {
      key: 'casestudy', short: 'Case study', name: 'Case study',
      best: 'Selling without pitching. Numbers do the persuasion so you never have to.',
      beats: [
        { t: 'The number', sec: '0–3s', do: 'Lead with the outcome figure. It is the hook.' },
        { t: 'The starting point', sec: '3–10s', do: 'Where they began — relatable, unimpressive.' },
        { t: 'What we changed', sec: '10–30s', do: 'Three specific decisions. Name the trade-offs.' },
        { t: 'What did not work', sec: '30–38s', do: 'Include one failure. It is the most trust-building line in the script.' },
        { t: 'CTA', sec: '38–48s', do: 'Soft offer: "if you want this run on yours, comment {KW}".' }
      ]
    }
  ];

  S.framework = (key) => S.FRAMEWORKS.find((f) => f.key === key) || S.FRAMEWORKS[0];

  /* Trim to a word boundary — on-screen text cut mid-word looks broken. */
  S.clip = function (s, n) {
    if (s.length <= n) return s;
    const cut = s.slice(0, n);
    const sp = cut.lastIndexOf(' ');
    return (sp > n * 0.5 ? cut.slice(0, sp) : cut).replace(/[ ,.;:-]+$/, '') + '…';
  };

  /* Beat timings are written for humans ("9–32s"), so parse rather than split. */
  S.range = function (sec) {
    const m = String(sec).match(/(\d+)\D+?(\d+)/);
    return m ? { from: Number(m[1]), to: Number(m[2]) } : { from: 0, to: 10 };
  };

  /* ---------------- hook laboratory ---------------- */
  S.HOOK_TYPES = [
    { key: 'callout', name: 'Callout', tpl: '“{Pain}” — if that is you, start here.', why: 'Self-selects your exact viewer in under a second.' },
    { key: 'negative', name: 'Warning', tpl: '{T}. Watch this before you try it.', why: 'Loss aversion out-performs gain framing almost every time.' },
    { key: 'number', name: 'Numbered', tpl: '3 things that changed everything for me: {t}.', why: 'A number sets the length expectation, so people commit to watching.' },
    { key: 'curiosity', name: 'Curiosity gap', tpl: 'Nobody actually explains this: {t}.', why: 'Opens a loop the brain wants closed. Do not over-use it.' },
    { key: 'result', name: 'Result-first', tpl: '{Desire} — here is the method: {t}.', why: 'Leads with the outcome instead of the process.' },
    { key: 'contrarian', name: 'Contrarian', tpl: '“{T}” is bad advice. Here is what works instead.', why: 'Drives comments, and comments drive reach.' },
    { key: 'question', name: 'Question', tpl: '{Pain}. Here is why, and what to do instead: {t}.', why: 'They answer in their head, which counts as engagement.' },
    { key: 'timebound', name: 'Time-bound', tpl: '60 seconds, then decide for yourself: {t}.', why: 'Names the cost of watching, which lowers the barrier.' },
    { key: 'story', name: 'Story open', tpl: 'Two years lost to this — {pain}. What fixed it: {t}.', why: 'A person talking beats a tip being delivered.' },
    { key: 'proof', name: 'Proof-led', tpl: '90 days later, this is the result: {t}.', why: 'Evidence in the first frame earns the next thirty seconds.' }
  ];

  S.hooksFor = function (topic, p, seed) {
    const n = G.niche(p);
    const r = G.rng((seed || 1) * 7919 + topic.length);
    const pain = n.audience.pains[Math.floor(r() * n.audience.pains.length)] || 'keep starting over';
    const desire = (n.audience.desires[Math.floor(r() * n.audience.desires.length)] || 'results');
    const up = (x) => x.charAt(0).toUpperCase() + x.slice(1);
    return S.HOOK_TYPES.map((h) => ({
      type: h.name, why: h.why,
      line: h.tpl.replace(/\{T\}/g, up(topic)).replace(/\{t\}/g, topic)
        .replace(/\{Desire\}/g, up(desire)).replace(/\{desire\}/g, desire)
        .replace(/\{Pain\}/g, up(pain)).replace(/\{pain\}/g, pain)
    }));
  };

  /* A hook either passes all five or gets rewritten. No partial credit. */
  S.HOOK_TESTS = [
    { t: 'Under 12 words', s: 'If it does not fit on one line of on-screen text, it is not a hook yet.' },
    { t: 'Specific, not categorical', s: '"Cut 300 calories at breakfast" beats "eat healthier".' },
    { t: 'Names the viewer or their pain', s: 'They should recognise themselves before deciding to scroll.' },
    { t: 'Promises one thing', s: 'Two promises in a hook means neither one lands.' },
    { t: 'Readable at thumbnail size', s: 'Say it out loud and show it on screen. Both, always.' }
  ];

  /* ---------------- script builder ---------------- */
  S.build = function (topic, frameworkKey, p, seed) {
    const n = G.niche(p);
    const f = S.framework(frameworkKey);
    const r = G.rng((seed || 1) * 104729 + topic.length * 31);
    const pain = n.audience.pains[Math.floor(r() * n.audience.pains.length)];
    const desire = n.audience.desires[Math.floor(r() * n.audience.desires.length)];
    const objection = n.audience.objections[Math.floor(r() * n.audience.objections.length)];
    const kw = G.content.KEYWORDS[Math.floor(r() * G.content.KEYWORDS.length)];
    const hooks = S.hooksFor(topic, p, seed);
    const hook = hooks[Math.floor(r() * hooks.length)];

    const beats = f.beats.map((b, i) => {
      const range = S.range(b.sec);
      const secs = Math.max(1, range.to - range.from);
      return {
        t: b.t, sec: b.sec, do: b.do.replace('{KW}', kw),
        words: Math.max(6, Math.round(secs * S.WPS)),
        line: S.beatLine(b, i, { topic: topic, pain: pain, desire: desire, objection: objection, kw: kw })
      };
    });

    const totalSecs = S.range(f.beats[f.beats.length - 1].sec).to;

    return {
      topic: topic, framework: f, hook: hook.line, hookType: hook.type,
      hookAlts: G.shuffle(hooks, r).slice(0, 4).filter((h) => h.line !== hook.line).slice(0, 3),
      beats: beats, keyword: kw,
      seconds: totalSecs,
      words: Math.round(totalSecs * S.WPS),
      cta: S.cta(f.key, kw),
      onScreen: ['HOOK: ' + S.clip(topic, 28).toUpperCase()].concat(beats.slice(1, -1).map((b, i) => (i + 1) + ' · ' + b.t.toUpperCase())),
      retention: G.content.RETENTION[Math.floor(r() * G.content.RETENTION.length)],
      objection: objection, pain: pain, desire: desire
    };
  };

  S.beatLine = function (b, i, ctx) {
    const t = ctx.topic;
    const map = {
      'Problem': 'Say it plainly: "' + ctx.pain + '." Then stop talking for half a second.',
      'The myth': 'Quote the belief exactly as people say it, about ' + t + '.',
      'Promise': 'Open with the number and the payoff of ' + t + '.',
      'The result': 'Show the finished result of ' + t + ' before a single word of explanation.',
      'The moment': 'Start mid-scene. A date, a number, a room — no setup.',
      'Before': 'Show the starting state honestly, no flattering angle.',
      'The stance': 'State it flat: most advice about ' + t + ' is wrong.',
      'The number': 'Lead with the outcome figure. That number is your hook.',
      'CTA': ctx.kw ? 'One line, one action. If you are collecting leads, ask for "' + ctx.kw + '" in the comments.' : 'One line, one action.'
    };
    return map[b.t] || null;
  };

  S.cta = function (key, kw) {
    return {
      pas: 'Save this — you will need it the next time it happens.',
      mythbust: 'Send this to whoever told you the opposite.',
      listicle: 'Save it. A list watched once is a list forgotten.',
      tutorial: 'Save this for when you actually sit down to do it.',
      story: 'What is your version of this? Tell me below.',
      bab: 'Comment "' + kw + '" and I will send you the exact path.',
      contrarian: 'Tell me why I am wrong — I read every comment.',
      casestudy: 'Comment "' + kw + '" if you want this run on yours.'
    }[key] || 'Save this.';
  };

  /* ---------------- voice rules ---------------- */
  S.VOICE = [
    { t: 'Cut every word before the first idea', s: '"Hey guys, so today I wanted to talk about…" costs you 40% of viewers. Start at the idea.' },
    { t: 'One sentence, one idea', s: 'If a sentence needs a comma to survive, split it.' },
    { t: 'Second person, always', s: '"You" is the most persuasive word in any script. "People" is the weakest.' },
    { t: 'Concrete nouns and real numbers', s: '"₹250 a day" lands. "Affordable" does not.' },
    { t: 'Say it, then show it', s: 'Every claim on screen as text within one second of being spoken.' },
    { t: 'No throat-clearing before the CTA', s: '"So yeah, that is pretty much it" — delete it. Cut straight to the ask.' },
    { t: 'Read it out loud before filming', s: 'If you stumble reading it, the viewer stumbles hearing it. Rewrite that line.' }
  ];

  S.CUTS = [
    ['just, really, actually, basically, literally', 'Filler. Delete on sight — none of them change the meaning.'],
    ['I think, in my opinion, kind of, sort of', 'Hedging. It reads as low confidence and costs you authority.'],
    ['very, super, extremely', 'Weak intensifiers. Use a stronger noun or verb instead.'],
    ['So…, Alright…, Okay so…', 'Verbal throat-clearing. The edit should start after these.'],
    ['obviously, of course, everyone knows', 'Makes the viewer who did not know feel stupid. They leave.'],
    ['Long clauses with "which" and "that"', 'Split into two sentences. Spoken scripts have no room for subordinate clauses.']
  ];

  /* ---------------- DM and outreach scripts ----------------
     Sales conversations are scripts too, so they live in the writing room. */
  S.dmScripts = function (p) {
    const n = G.niche(p);
    const offer = G.engine.primaryOffer(p);
    const kw = G.content.KEYWORDS[0];
    const price = offer ? G.money(offer.price) : '';
    return [
      { t: 'Reply to a keyword comment', s: 'Hey! Here is the thing I mentioned 👇\n[link]\n\nQuick one so I do not send you random stuff — what are you working on with ' + n.short.toLowerCase() + ' right now?' },
      { t: 'Qualify before you offer anything', s: 'Got it. Two quick questions and I will tell you straight whether I can help:\n\n1. How long have you been trying to fix this?\n2. What have you already tried that did not work?' },
      { t: 'Diagnose, then offer', s: 'Based on that, here is what I would do:\n\n• ' + (n.audience.pains[0] || 'The main blocker') + ' is the real blocker, not effort.\n• The fastest fix is ' + (n.ideas[0] || 'the first step') + '.\n\nI do exactly this inside ' + (offer ? offer.name : 'my program') + (price ? ' — ' + price : '') + '. Want the details?' },
      { t: 'Reply to a story reply', s: 'Ha, glad that one landed. Out of curiosity — is that something you are dealing with right now, or already sorted?' },
      { t: 'The graceful no', s: 'No worries at all — timing matters more than motivation.\n\nWhen you are ready, reply "' + kw + '" and I will pick it up. In the meantime this covers step one: [link]' },
      { t: 'Follow-up at day 14', s: 'Hey — following up once because you asked about ' + n.short.toLowerCase() + ' two weeks ago.\n\nDid you try the first step? If it worked, tell me what changed. If it did not, tell me where it broke and I will fix it for you free.' },
      { t: 'Collab pitch to a bigger account', s: 'Hey [name] — I make ' + n.label.toLowerCase() + ' content for the same audience as you.\n\nI will write, film and edit a collab reel end to end, you just approve it and we post it as a collab. Zero work on your side. Want me to send a concept first?' }
    ];
  };
})(window.IGOS);
