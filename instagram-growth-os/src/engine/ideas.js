/* ================= GROWTH OS · idea engine =================
   Topic × angle × format, scored against a fixed rubric so the list
   comes out ranked instead of random.
============================================================ */
(function (G) {
  'use strict';
  const I = G.ideas = {};

  /* Rubric scores are 1–5 per criterion, /25 total.
     search      — is anyone actually looking for this?
     emotion     — does it make someone feel something enough to share?
     specificity — can it be made concrete, or does it stay vague?
     proof       — can you show evidence rather than assert?
     offerFit    — does it walk toward something you sell? */
  I.ANGLES = [
    { key: 'beginner', name: 'Beginner walkthrough', tpl: '{t} — for complete beginners', fmt: 'carousel',
      why: 'Most of any niche is beginners, and beginner queries are what people actually type into search.',
      s: { search: 5, emotion: 2, specificity: 4, proof: 2, offerFit: 4 } },
    { key: 'mistake', name: 'Mistakes', tpl: '3 mistakes people make: {t}', fmt: 'reel',
      why: 'Loss aversion moves people harder than gain. Mistake posts get sent to friends.',
      s: { search: 3, emotion: 5, specificity: 4, proof: 3, offerFit: 4 } },
    { key: 'myth', name: 'Myth-bust', tpl: 'The biggest myth: {t}', fmt: 'reel',
      why: 'Correcting a belief they hold today is the cheapest authority you will ever buy.',
      s: { search: 3, emotion: 4, specificity: 4, proof: 3, offerFit: 5 } },
    { key: 'compare', name: 'Comparison', tpl: '{t} — what works vs what does not', fmt: 'carousel',
      why: 'Comparison content gets saved, argued about in comments, and ranks in search.',
      s: { search: 5, emotion: 3, specificity: 5, proof: 4, offerFit: 3 } },
    { key: 'story', name: 'Personal story', tpl: 'What this cost me before I got it right: {t}', fmt: 'reel',
      why: 'Tips make you useful. Story makes you the person they buy from.',
      s: { search: 1, emotion: 5, specificity: 3, proof: 5, offerFit: 5 } },
    { key: 'list', name: 'Rapid list', tpl: '5 things nobody tells you: {t}', fmt: 'reel',
      why: 'Highest completion rate of any format, which is what the algorithm reads first.',
      s: { search: 3, emotion: 3, specificity: 3, proof: 2, offerFit: 2 } },
    { key: 'tutorial', name: 'Step-by-step', tpl: '{t} — step by step', fmt: 'reel',
      why: 'The saves engine. People bookmark what they intend to actually do.',
      s: { search: 5, emotion: 2, specificity: 5, proof: 4, offerFit: 4 } },
    { key: 'contrarian', name: 'Contrarian take', tpl: 'Unpopular opinion: {t}', fmt: 'reel',
      why: 'Disagreement is distribution. Only take a position you can defend in the comments.',
      s: { search: 2, emotion: 5, specificity: 3, proof: 3, offerFit: 3 } },
    { key: 'data', name: 'Real numbers', tpl: '{t} — the numbers nobody shows you', fmt: 'carousel',
      why: 'Specific numbers are the credibility currency. Screenshot-able content gets saved.',
      s: { search: 4, emotion: 3, specificity: 5, proof: 5, offerFit: 4 } },
    { key: 'qa', name: 'Answer a real question', tpl: 'The question I get every week: {t}', fmt: 'reel',
      why: 'Demand is already proven — someone asked. This is the safest bet on the list.',
      s: { search: 4, emotion: 3, specificity: 4, proof: 3, offerFit: 5 } },
    { key: 'dayinlife', name: 'Day in the life', tpl: 'Day in the life: {t}', fmt: 'reel',
      why: 'Broad reach and parasocial trust. Weak on its own, strong between value posts.',
      s: { search: 2, emotion: 4, specificity: 2, proof: 4, offerFit: 2 } },
    { key: 'transformation', name: 'Before / after', tpl: '{t} — 30 days, honest results', fmt: 'reel',
      why: 'The highest-retention structure there is, and the one that sells without pitching.',
      s: { search: 3, emotion: 5, specificity: 4, proof: 5, offerFit: 5 } }
  ];

  I.angle = (key) => I.ANGLES.find((a) => a.key === key) || I.ANGLES[0];

  I.score = function (angle, p) {
    const s = angle.s;
    const total = s.search + s.emotion + s.specificity + s.proof + s.offerFit;
    /* A revenue-first goal weights offer-fit; an audience-first goal weights sharing. */
    const goal = (p && p.goal) || 'both';
    const tilt = goal === 'money' ? s.offerFit : goal === 'followers' ? s.emotion : (s.offerFit + s.emotion) / 2;
    return {
      parts: s, total: total, weighted: total + tilt,
      label: total >= 20 ? 'Priority' : total >= 16 ? 'Solid' : 'Test it'
    };
  };

  I.generate = function (p, count, seed) {
    const n = G.niche(p);
    const r = G.rng((seed || G.store.seed || 1) + 613);
    const topics = G.shuffle(n.ideas, r);
    const angles = G.shuffle(I.ANGLES, r);
    const out = [];
    for (let i = 0; i < (count || 20); i++) {
      const topic = topics[i % topics.length];
      const angle = angles[(i + Math.floor(i / topics.length)) % angles.length];
      const sc = I.score(angle, p);
      out.push({
        id: 'i' + i + '-' + angle.key,
        title: angle.tpl.replace('{t}', topic),
        topic: topic, angle: angle.name, angleKey: angle.key,
        format: angle.fmt, why: angle.why, score: sc
      });
    }
    return out.sort((a, b) => b.score.weighted - a.score.weighted);
  };

  /* Where ideas come from. Invented ideas underperform observed ones, always. */
  I.SOURCES = [
    ['Your own comments and DMs', 'Every question someone asks you is a post with proven demand. Screenshot it.', 'Daily'],
    ['Competitor top posts', 'Sort 5 accounts by most-liked, all time. Rebuild the winners in your own voice.', '5 saves/day'],
    ['Instagram + YouTube search', 'Type the first three words of a question and read the autocomplete. That is the search demand.', 'Weekly'],
    ['Reddit and Quora threads', 'Long complaints are pain, written out by the audience for free.', 'Weekly'],
    ['Your own last 30 days', 'Whatever you learned, fixed or wasted money on this month is content.', 'Weekly'],
    ['Your best post, again', 'Any post above 2× average gets rebuilt in another format within 10 days.', 'Per winner']
  ];

  I.seasons = function (p) {
    const n = G.niche(p);
    const india = (p.market || 'IN') === 'IN';
    const t = n.ideas;
    const pick = (i) => t[i % t.length];
    return [
      { m: 'January', moment: 'New year resets', angle: 'Beginner content peaks. Publish your definitive "start here" post — ' + pick(0) + '.' },
      { m: 'February', moment: 'Motivation collapse', angle: 'Everyone quit by week 3. "Why you fell off and how to restart" outperforms all month.' },
      { m: 'March', moment: india ? 'Exam season + financial year end' : 'Spring reset', angle: india ? 'Time-pressure content: the fastest version of ' + pick(1) + '.' : 'Refresh and re-plan content.' },
      { m: 'April', moment: india ? 'New financial year' : 'Tax season ends', angle: 'Fresh-start framing again — quarterly planning, new systems.' },
      { m: 'May', moment: 'Summer / holidays', angle: 'Short-form, light, high-share content. Reach is up, attention is down.' },
      { m: 'June', moment: 'Mid-year audit', angle: 'Progress checks and honest half-year reviews. Proof content lands hardest here.' },
      { m: 'July', moment: 'Back to routine', angle: 'System and habit content: ' + pick(2) + '.' },
      { m: 'August', moment: 'Peak attention', angle: 'Your best swing of the year. Launch here, not in December.' },
      { m: 'September', moment: india ? 'Festive build-up' : 'Back to school/work', angle: 'Preparation content and gift/kit guides start now, not in October.' },
      { m: 'October', moment: india ? 'Diwali season' : 'Q4 push', angle: 'Highest commercial intent of the year. Brand deals pay the most in this window.' },
      { m: 'November', moment: india ? 'Post-festive reset' : 'Black Friday', angle: 'Your one discount moment of the year, if you use one at all.' },
      { m: 'December', moment: 'Year in review', angle: 'Retrospectives, lessons, and next-year planning. Warm audience, low competition.' }
    ];
  };

  /* A generated idea is only worth making if it survives these. */
  I.FILTERS = [
    { t: 'Would someone search for this?', s: 'If nobody would ever type it, it needs a stronger emotional angle to earn reach.' },
    { t: 'Can you be specific in 30 seconds?', s: 'If the answer needs five minutes of caveats, it is a carousel, not a reel.' },
    { t: 'Do you have proof?', s: 'A screenshot, a number, a result — yours or a client\'s. Without it, it is an opinion.' },
    { t: 'Does it walk toward what you sell?', s: 'Not every post sells, but every post should point in the same direction.' },
    { t: 'Have you already made it?', s: 'If a version exists and it worked, remaking it beats inventing something new.' }
  ];
})(window.IGOS);
