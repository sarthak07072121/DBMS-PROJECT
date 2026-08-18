/* ================= GROWTH OS · content generation engine =================
   Turns a niche + capacity into a dated calendar, and any calendar slot
   into a shootable script, caption, hashtag set and story sequence.
========================================================================= */
(function (G) {
  'use strict';

  const C = G.content = {};

  /* ---------------- hooks ---------------- */
  C.HOOKS = [
    'Nobody tells beginners this: {t}.',
    'Here is {t} — in 45 seconds.',
    'Save this: {t}.',
    'I wish someone showed me {t} on day one.',
    '{T} — and why most people get it completely wrong.',
    '3 minutes to understand {t}.',
    'The truth about {t}.',
    'I tested {t}. Here is what actually happened.',
    'If you fix one thing this week, make it {t}.',
    'This is {t}, explained the way it should have been.',
    'Stop scrolling if {pain}.',
    'You do not have a talent problem. You have a {t} problem.',
    'Everyone gets {t} wrong. Including me, for two years.',
    'The 1% who get {desire} do {t}. The rest do not.',
    '{T}. Watch this before you try again.',
    'This is the {t} breakdown I get asked for every single week.'
  ];

  C.RETENTION = [
    'Cut every pause — no silence longer than 0.3s.',
    'Change camera angle or B-roll every 2 seconds.',
    'Put the payoff on screen in frame 1 so they stay for the how.',
    'Open on movement, never on a static face.',
    'Ask a question at second 6 that they answer in their head.',
    'Show the end result first, then rewind to the process.',
    'Add one unexpected visual at the 40% mark — that is where drop-off spikes.',
    'End one beat before they expect it, so the loop restarts.'
  ];

  C.CTAS = {
    save: { line: 'Save this — you will need it the next time you try.', why: 'Saves are weighted heavily for reach. Use on how-to and framework posts.' },
    share: { line: 'Send this to the one person who needs to hear it.', why: 'Shares are the single strongest reach signal. Use on emotional / contrarian posts.' },
    comment: { line: 'Comment "{KW}" and I will send you the full breakdown.', why: 'Turns reach into DM conversations — the top of your sales funnel.' },
    follow: { line: 'Follow for the rest of this series — part 2 drops {DAY}.', why: 'Use only on posts that already delivered value. Otherwise it reads as begging.' },
    link: { line: 'Full guide in bio. Free.', why: 'Moves people to an owned channel you are not renting from Instagram.' },
    question: { line: 'Which one are you stuck on? Tell me below.', why: 'Comment velocity in the first hour decides whether the post gets a second push.' }
  };

  C.KEYWORDS = ['PLAN', 'GUIDE', 'START', 'FIX', 'BLUEPRINT', 'SYSTEM', 'KIT', 'STEPS'];

  /* Best posting windows (local time), by market. */
  C.TIMES = {
    IN: { reel: '8:00 PM', carousel: '1:00 PM', static: '9:00 AM', story: '9 AM · 2 PM · 9 PM' },
    US: { reel: '7:00 PM', carousel: '12:00 PM', static: '8:00 AM', story: '8 AM · 12 PM · 8 PM' },
    GLOBAL: { reel: '7:30 PM', carousel: '1:00 PM', static: '9:00 AM', story: '9 AM · 1 PM · 8 PM' }
  };

  /* ---------------- calendar ---------------- */
  /* Post-priority order of weekdays: Tue, Wed, Thu, Mon, Fri, Sat, Sun */
  const DAY_PRIORITY = [2, 3, 4, 1, 5, 6, 0];

  C.calendar = function (p, startISO, days) {
    days = days || 28;
    startISO = startISO || G.store.calendarStart || G.today();
    const n = G.niche(p);
    const cap = G.engine.capacity(p);
    const r = G.rng(G.store.seed + (Number(p.followers) || 0));
    const ideas = G.shuffle(n.ideas, r);
    const hooks = G.shuffle(C.HOOKS, r);
    const times = C.TIMES[p.market] || C.TIMES.GLOBAL;

    /* weighted pillar sequence */
    const pillarBag = [];
    n.pillars.forEach((pl) => {
      for (let i = 0; i < Math.max(1, Math.round(pl.pct / 5)); i++) pillarBag.push(pl.name);
    });
    const pillars = G.shuffle(pillarBag, r);

    const out = [];
    let ideaI = 0, hookI = 0, pillarI = 0;

    for (let w = 0; w * 7 < days; w++) {
      /* build this week's slot list */
      const slots = []
        .concat(Array(cap.perWeek.reel).fill('reel'))
        .concat(Array(cap.perWeek.carousel).fill('carousel'))
        .concat(Array(cap.perWeek.static).fill('static'));

      /* Never fill all 7 days: one engagement-only day per week is a
         deliberate part of the system, not an accident of capacity. */
      const weekDays = {};
      let si = 0;
      for (let d = 0; d < 6 && si < slots.length; d++) {
        weekDays[DAY_PRIORITY[d]] = slots[si++];
      }
      while (si < slots.length) {                     // overflow doubles up on the best days
        const d = DAY_PRIORITY[(si - 6) % 6];
        weekDays[d] = weekDays[d] + '+' + slots[si];
        si++;
      }

      for (let d = 0; d < 7; d++) {
        const idx = w * 7 + d;
        if (idx >= days) break;
        const date = G.addDays(startISO, idx);
        const dow = new Date(date + 'T00:00:00').getDay();
        const fmtRaw = weekDays[dow];

        if (!fmtRaw) {
          out.push({
            date, dow, format: 'rest', pillar: 'Engagement',
            topic: 'No post — engagement + DM day',
            hook: '', cta: 'comment', time: times.story, idx
          });
          continue;
        }

        fmtRaw.split('+').forEach((format, k) => {
          const topic = C.variant(ideas[ideaI % ideas.length], Math.floor(ideaI / ideas.length));
          ideaI++;
          const pillar = pillars[pillarI++ % pillars.length];
          const hookT = hooks[hookI++ % hooks.length];
          out.push({
            date, dow, format, pillar, topic,
            hook: C.fillHook(hookT, topic, n),
            cta: C.pickCta(pillar, format, p),
            time: k === 0 ? times[format] : times.static,
            idx, retention: C.RETENTION[(idx + k) % C.RETENTION.length]
          });
        });
      }
    }
    return out;
  };

  /* Reruns of an idea get a new angle rather than a straight repeat —
     the topic is proven, only the door changes. */
  C.VARIANTS = [
    'the mistakes version', 'part 2 — what nobody adds', 'the 30-second version',
    'with real numbers', 'the objections answered', 'for complete beginners'
  ];
  C.variant = function (topic, pass) {
    return pass <= 0 ? topic : topic + ' — ' + C.VARIANTS[(pass - 1) % C.VARIANTS.length];
  };

  C.fillHook = function (tpl, topic, n) {
    const pain = (n.audience.pains[0] || 'you keep starting over').toLowerCase();
    const desire = (n.audience.desires[0] || 'results').toLowerCase();
    const T = topic.charAt(0).toUpperCase() + topic.slice(1);
    return tpl.replace(/\{T\}/g, T).replace(/\{t\}/g, topic)
      .replace(/\{pain\}/g, pain).replace(/\{desire\}/g, desire);
  };

  C.pickCta = function (pillar, format, p) {
    const goal = p.goal || 'both';
    if (/proof|transformation|case|credibility|story|journey/i.test(pillar)) return goal === 'followers' ? 'follow' : 'comment';
    if (/myth|contrarian|hard truth|relatable|humour|trend|news|reaction/i.test(pillar)) return 'share';
    if (/how-to|actionable|framework|system|playbook|technique|recipe|formula|routine|explainer|budget|workflow|demo|outfit|breakdown/i.test(pillar)) return format === 'carousel' ? 'save' : 'save';
    return goal === 'money' ? 'comment' : 'question';
  };

  /* ---------------- script generation ---------------- */
  C.script = function (day, p) {
    const n = G.niche(p);
    const r = G.rng(G.store.seed + day.idx * 977 + day.date.replace(/-/g, '') * 1);
    const pain = n.audience.pains[Math.floor(r() * n.audience.pains.length)];
    const pain2 = n.audience.pains[Math.floor(r() * n.audience.pains.length)];
    const desire = n.audience.desires[Math.floor(r() * n.audience.desires.length)];
    const objection = n.audience.objections[Math.floor(r() * n.audience.objections.length)];
    const kw = C.KEYWORDS[Math.floor(r() * C.KEYWORDS.length)];
    const cta = C.CTAS[day.cta] || C.CTAS.save;
    const ctaLine = cta.line.replace('{KW}', kw).replace('{DAY}', G.dayName(G.addDays(day.date, 2)) + 'day');

    const beats = [
      { t: 'Frame the cost', s: 'Name the pain out loud: "' + pain + '". One sentence. Do not soften it — they need to feel seen in the first 5 seconds.' },
      { t: 'The wrong way', s: 'Show the common approach to \u201c' + day.topic + '\u201d and why it stalls. Being specific here is what makes you credible.' },
      { t: 'The actual method', s: 'Give the 3 steps. Numbers on screen. No theory — the viewer should be able to do step 1 today without asking a follow-up question.' },
      { t: 'Kill the objection', s: 'Address "' + objection + '" in one line before they can type it in the comments.' },
      { t: 'Show the payoff', s: 'Tie it back to ' + desire + '. Proof beats promise — screenshot, before/after, or a real number.' }
    ];

    const onScreen = [
      day.hook.length > 42 ? day.hook.slice(0, 40).trim() + '…' : day.hook,
      'STEP 1', 'STEP 2', 'STEP 3', ctaLine.length > 30 ? 'SAVE THIS' : ctaLine.toUpperCase()
    ];

    const caption = C.caption(day, p, { kw: kw, ctaLine: ctaLine, pain: pain, pain2: pain2, desire: desire });

    return {
      format: day.format,
      hook: day.hook,
      hookAlts: C.altHooks(day, n, r),
      beats: beats,
      cta: ctaLine,
      ctaWhy: cta.why,
      loop: 'Final line loops back to the hook: end on "' + (day.topic.charAt(0).toUpperCase() + day.topic.slice(1)) + '" so a replay feels intentional.',
      onScreen: onScreen,
      broll: C.broll(day, n, r),
      cover: C.cover(day),
      retention: day.retention || C.RETENTION[0],
      caption: caption,
      hashtags: C.hashtags(p, day),
      slides: day.format === 'carousel' ? C.slides(day, p, { pain: pain, desire: desire, ctaLine: ctaLine }) : null,
      stories: C.stories(day, p, kw),
      keyword: kw
    };
  };

  C.altHooks = function (day, n, r) {
    return G.shuffle(C.HOOKS, r).slice(0, 3).map((h) => C.fillHook(h, day.topic, n))
      .filter((h) => h !== day.hook).slice(0, 2);
  };

  C.broll = function (day, n, r) {
    const generic = [
      'Hands doing the actual thing (no stock footage — yours, phone quality is fine)',
      'A screen recording or close-up of the detail you are describing',
      'One wide establishing shot to reset the eye at the halfway point',
      'A quick text-only frame for the single most quotable line'
    ];
    return G.shuffle(generic, r).slice(0, 3).concat(['Style reference: ' + n.visual.split('.')[0] + '.']);
  };

  C.cover = function (day) {
    const words = day.topic.replace(/^(the|my|a|how to|why|what) /i, '').split(' ').slice(0, 4).join(' ');
    return words.toUpperCase() + (day.format === 'carousel' ? ' →' : '');
  };

  C.caption = function (day, p, ctx) {
    const n = G.niche(p);
    const kwLine = day.cta === 'comment'
      ? '\n\nComment "' + ctx.kw + '" and I will send it over.'
      : '';
    const seo = C.seoLine(p, day);
    return day.hook + '\n\n' +
      'Most people get stuck here: ' + ctx.pain.toLowerCase() + '. That is not a discipline problem — it is a method problem.\n\n' +
      '1. ' + C.stepLine(day, 1) + '\n' +
      '2. ' + C.stepLine(day, 2) + '\n' +
      '3. ' + C.stepLine(day, 3) + '\n\n' +
      'Do this for 14 days and the difference shows up where it matters: ' + ctx.desire.toLowerCase() + '.\n\n' +
      ctx.ctaLine + kwLine + '\n\n' + seo;
  };

  /* Deliberately topic-agnostic: instructions that stay grammatical whatever
     the topic phrase happens to be. The topic lives in the hook and the beats. */
  C.stepLine = function (day, i) {
    const shapes = [
      'Start with the smallest version you can finish today — not the ideal version.',
      'Remove the one step you added because someone online said you had to.',
      'Write it down. If it is not tracked, it did not happen.',
      'Repeat it on the days you do not feel like it. That is the entire game.',
      'Measure the result at day 14, not day 3.',
      'Cut anything that is not directly moving this forward.',
      'Do it at the same time every day so it stops needing a decision.',
      'Copy someone who already has the result before inventing your own version.'
    ];
    return shapes[(day.idx + i * 3) % shapes.length];
  };

  C.seoLine = function (p, day) {
    const name = G.nicheName(p).toLowerCase();
    return '📌 ' + name + ' · ' + day.pillar.toLowerCase() + ' · ' + day.topic;
  };

  /* Instagram treats the first words and the alt text as search signal. */
  C.hashtags = function (p, day) {
    const n = G.niche(p);
    const r = G.rng(G.store.seed + (day ? day.idx : 0) * 31 + 7);
    const pickN = (arr, k) => G.shuffle(arr, r).slice(0, k);
    return {
      broad: pickN(n.hashtags.broad, 2),
      mid: pickN(n.hashtags.mid, 4),
      niche: pickN(n.hashtags.niche, 6),
      all: pickN(n.hashtags.broad, 2).concat(pickN(n.hashtags.mid, 4), pickN(n.hashtags.niche, 6))
    };
  };

  C.slides = function (day, p, ctx) {
    const t = day.topic;
    return [
      { n: 1, role: 'Cover', text: C.cover(day) + '\n(small line under it: ' + day.hook.slice(0, 60) + ')' },
      { n: 2, role: 'Agitate', text: 'The problem: ' + ctx.pain + '. One sentence, big type, lots of white space.' },
      { n: 3, role: 'Reframe', text: 'Why the usual advice on \u201c' + t + '\u201d fails. Name the specific mistake, not a vague one.' },
      { n: 4, role: 'Step 1', text: C.stepLine(day, 1) },
      { n: 5, role: 'Step 2', text: C.stepLine(day, 2) },
      { n: 6, role: 'Step 3', text: C.stepLine(day, 3) },
      { n: 7, role: 'Proof', text: 'A screenshot, a number, or a before/after that proves this works. No proof = no conversion.' },
      { n: 8, role: 'CTA', text: ctx.ctaLine + '  ·  Add your @handle and one line of positioning.' }
    ];
  };

  C.stories = function (day, p, kw) {
    const isRest = day.format === 'rest';
    return isRest ? [
      { t: 'Poll', s: 'Two-option poll about a decision your audience faces this week. Polls are the cheapest engagement you will ever buy.' },
      { t: 'Reply prompt', s: 'Question sticker: "What are you stuck on right now?" — every reply is a DM thread, and DMs are where money happens.' },
      { t: 'Answer a DM publicly', s: 'Screenshot a question (blur the name), answer it in 15 seconds. Shows you are reachable.' },
      { t: 'Soft pitch', s: 'One frame mentioning what you help people with, and how to ask for it.' }
    ] : [
      { t: 'Teaser (before posting)', s: 'Show one frame of today\'s content with "posting this in 30 min" — primes your warm audience to engage in the first hour.' },
      { t: 'Post share', s: 'Reshare the post to story with a sticker pointing at it and one line of extra context.' },
      { t: 'Poll', s: '"Did you already know this?" Yes / No. The result becomes tomorrow\'s content idea.' },
      { t: 'DM driver', s: 'Question sticker or "reply ' + kw + ' for the full version". Converts reach into conversations.' },
      { t: 'Behind the scenes', s: 'One unpolished frame of you making it. Trust is built in stories, not in reels.' }
    ];
  };

  /* ---------------- weekly production sprint ---------------- */
  C.sprint = function (p) {
    const cap = G.engine.capacity(p);
    const h = cap.hours;
    return [
      { day: 'Monday', block: 'Research & scripting', hrs: Math.max(1, Math.round(h * 0.15)), tasks: ['Pull 10 ideas from comments, DMs and saved posts', 'Write ' + cap.totalWeek + ' hooks — keep the 4 best', 'Script the week\'s reels in one sitting'] },
      { day: 'Tuesday', block: 'Batch production', hrs: Math.max(1, Math.round(h * 0.25)), tasks: ['Film all ' + cap.perWeek.reel + ' reels back to back, one outfit change max', 'Record voiceovers in one take pass', 'Dump footage into the editing folder'] },
      { day: 'Wednesday', block: 'Edit & design', hrs: Math.max(1, Math.round(h * 0.25)), tasks: ['Edit reels (captions, cuts, covers)', 'Design ' + cap.perWeek.carousel + ' carousels from the template file', 'Write all captions in one pass'] },
      { day: 'Thursday', block: 'Schedule & optimise', hrs: Math.max(1, Math.round(h * 0.1)), tasks: ['Schedule the full week', 'Write alt text + keywords for search', 'Prepare story frames for each post day'] },
      { day: 'Friday', block: 'Sales & outreach', hrs: Math.max(1, Math.round(h * 0.1)), tasks: [cap.dmsPerDay + ' targeted DMs to warm leads', 'Follow up every unanswered conversation from last week', 'Pitch 2 brands or 2 collab partners'] },
      { day: 'Saturday', block: 'Engagement sprint', hrs: Math.max(1, Math.round(h * 0.1)), tasks: [cap.commentsPerDay + ' comments on bigger accounts in your niche', 'Reply to every comment on your own posts', 'Engage with 20 accounts that follow competitors'] },
      { day: 'Sunday', block: 'Board review', hrs: Math.max(1, Math.round(h * 0.05)), tasks: ['Log followers, reach, revenue in the Board Report', 'Identify the top and bottom post of the week', 'Decide one thing to repeat and one to kill'] }
    ];
  };
})(window.IGOS);
