/* ================= GROWTH OS · niche resolution =================
   Thirty niches are preset. Everything else in the world is handled by
   resolving what someone typed: first against the presets' aliases, and
   failing that into one of eight families, each with its own templates.
   The goal is that nobody types a niche and gets a generic plan.
============================================================== */
(function (G) {
  'use strict';

  /* ---------------- families ---------------- */
  G.FAMILIES = {
    skill: {
      label: 'Skill & craft',
      keys: 'learn, practice, technique, training, lessons, tutorial, beginner, coaching, mastery, drills, hobby, instrument, craft skill',
      reach: 1.25, cpm: 1.0, buyRate: 1.15,
      who: 'self-taught beginners and improvers practising {NICHE} on their own',
      pains: ['practising for months with no visible improvement', 'tutorials that skip the step they are stuck on', 'no feedback from anyone who actually knows', 'plateau with no idea what to change', 'no structured path from beginner to competent'],
      desires: ['visible progress they can point at', 'doing it without thinking', 'being good enough to be paid', 'confidence in front of other people'],
      objections: ['I do not have the right equipment', 'I started too late', 'I have no natural talent for it'],
      pillars: [
        ['Slow breakdowns', 30, 'Copyable beats impressive. Slow enough to follow is the whole promise.'],
        ['Common mistakes', 25, 'Naming the exact error someone is making is the fastest way to earn trust.'],
        ['Progress & proof', 20, 'Your own improvement over time is the evidence that the method works.'],
        ['Gear & setup', 15, 'High search demand, and it is where affiliate revenue lives.'],
        ['Practice systems', 10, 'How to practise beats what to practise, and it sells your program.']
      ],
      ideas: [
        'the {NICHE} mistake that keeps you stuck', 'this {NICHE} skill broken down slowly',
        'what I would practise if I started {NICHE} again', '10 minutes of this beats an hour of {NICHE} practice',
        'the {NICHE} gear worth buying and what to skip', 'a year of {NICHE} — first day to now',
        'the {NICHE} drill nobody teaches beginners', 'practising {NICHE} with no space and no equipment',
        'why your {NICHE} looks stiff and how to fix it', 'the {NICHE} fundamentals everyone skips',
        'how to practise {NICHE} without a coach', 'getting paid for {NICHE} — the honest path'
      ],
      offers: [
        ['Free starter drill pack', 'Lead magnet', 0, 0, 'A week of structured practice for an email — the easiest yes in any skill niche.', 'PDF + demo videos'],
        ['{NICHE} beginner program', 'Digital product', 999, 1500, 'They do not lack information, they lack a sequence. Sell the sequence.', '6-week program + video library'],
        ['Video feedback / review', 'Productised service', 1500, 3000, 'They send a clip, you annotate it. Fully asynchronous.', 'Annotated breakdown + corrective drills'],
        ['1:1 coaching', 'High ticket', 15000, 5000, 'Few students, deep results, and the testimonials feed everything else.', '8 sessions with ongoing feedback'],
        ['Workshop', 'High ticket', 8000, 10000, 'Group teaching prices far above a PDF and generates a month of content.', 'Live or in-person session, limited seats']
      ],
      visual: 'Shoot from the angle that shows the mechanic. Slow motion on the key moment, repeat it three times before explaining, on-screen counts and arrows, real ambient sound rather than music.',
      brands: ['{NICHE} equipment', 'learning platforms', 'tools & accessories'],
      proof: ['your own progress over time', 'students who improved', 'before and after clips']
    },

    body: {
      label: 'Body & health',
      keys: 'health, body, physical, weight, muscle, diet, nutrition, therapy, pain, posture, energy, medical, recovery, rehab, hormones',
      reach: 1.35, cpm: 1.2, buyRate: 1.1,
      who: 'people whose {NICHE} results have stalled despite genuine effort',
      pains: ['effort with nothing to show for it', 'advice that contradicts itself everywhere they look', 'no time for what the plans demand', 'quitting in week three every time', 'not knowing what is normal and what is a problem'],
      desires: ['a visible change within 30 days', 'energy that lasts the whole day', 'a plan simple enough to actually follow', 'feeling in control of their own body'],
      objections: ['my body is different', 'I have no time', 'I have tried everything already'],
      pillars: [
        ['Myth-busting', 25, 'This space is full of confident nonsense. Correcting it is instant authority.'],
        ['Actionable how-to', 30, 'The saves engine — people bookmark what they intend to do tonight.'],
        ['Proof & transformation', 20, 'Nothing converts like a real result with a real timeline.'],
        ['Mechanism explained', 15, 'Why the body does this. It is what makes the advice believable.'],
        ['Personal story', 10, 'The trust that turns a follower into a client.']
      ],
      ideas: [
        'the {NICHE} advice that is quietly wrong', 'the 3 things that gave me 80% of my {NICHE} results',
        '5 minutes a day of this changes {NICHE} more than an hour of the usual', 'what actually happens in your body during {NICHE}',
        'a full day of {NICHE} done properly', '30 days of {NICHE} — honest before and after',
        'the {NICHE} mistake beginners make in week one', '{NICHE} when you have no time and no equipment',
        'the {NICHE} numbers nobody explains to you', 'why you plateaued on {NICHE}, and the fix',
        'what I would tell someone starting {NICHE} today', 'the {NICHE} habit that survived the bad weeks'
      ],
      offers: [
        ['Free 7-day starter plan', 'Lead magnet', 0, 0, 'A week of structure for an email. Highest opt-in rate there is.', 'PDF plan + checklist'],
        ['{NICHE} guide', 'Digital product', 599, 800, 'First revenue, and proof people will pay before you build anything bigger.', 'PDF guide + tracker'],
        ['Personalised plan', 'Productised service', 2999, 2000, 'Highest revenue per follower at a small size.', 'Intake form, custom plan, one revision'],
        ['Coaching program', 'High ticket', 18000, 5000, 'Six clients is a serious income from a small account.', '12 weeks, weekly check-ins, plan updates'],
        ['Brand partnerships', 'Sponsorship', 0, 8000, 'Only after your own offers work. Never recommend what you would not use.', 'Integrated reel + stories']
      ],
      visual: 'High contrast, real settings, hard cuts, big bold captions with one word emphasised, before and after in identical lighting and angle, voice always above the music.',
      brands: ['supplements & nutrition', 'apparel & equipment', 'health apps & services'],
      proof: ['your own documented change', 'client results with timelines', 'sources you cite']
    },

    money: {
      label: 'Money & business',
      keys: 'money, business, income, sell, selling, clients, revenue, profit, invest, trading, market, sales, ecommerce, shop, side hustle, earn, salary, pricing',
      reach: 1.10, cpm: 1.8, buyRate: 1.3,
      who: 'people trying to earn from {NICHE} and unsure which lever actually moves money',
      pains: ['effort that does not convert into income', 'no idea what to charge', 'advice from people who never did it', 'inconsistent months with no floor', 'no system, only hustle'],
      desires: ['predictable monthly income', 'charging without flinching', 'a business that runs without them', 'proof they can point at'],
      objections: ['my market is different', 'I have no audience or capital', 'that only worked because you started early'],
      pillars: [
        ['Numbers & case studies', 25, 'Specific figures are the credibility currency here. Vague advice is worthless.'],
        ['Playbooks', 30, 'Step-by-step systems get saved and implemented, which is what grows the account.'],
        ['Contrarian takes', 20, 'Comment volume drives distribution, and this space is full of lazy consensus.'],
        ['Proof & receipts', 15, 'Screenshots close what content alone cannot.'],
        ['Founder story', 10, 'People buy from a person with a track record, not a tips account.']
      ],
      ideas: [
        'what {NICHE} actually pays, with real numbers', 'the {NICHE} pricing mistake costing you the most',
        'how I got my first client in {NICHE}', 'the {NICHE} system that replaced 10 hours a week',
        'a full month of {NICHE} revenue broken down', 'the {NICHE} advice that is quietly bad',
        'starting {NICHE} with no audience and no budget', 'the {NICHE} offer that finally sold',
        'why cheap clients in {NICHE} cost the most', 'the {NICHE} mistake that cost me real money',
        'how to raise {NICHE} prices without losing everyone', 'what I would do differently starting {NICHE} today'
      ],
      offers: [
        ['Free checklist / template', 'Lead magnet', 0, 0, 'Opens DM conversations with exactly the people who can pay you.', '1-page checklist + script'],
        ['{NICHE} toolkit', 'Digital product', 1299, 400, 'Solves a painful immediate problem — the fastest first sale in this space.', 'Templates, calculator, scripts'],
        ['Audit call', 'Productised service', 4999, 1500, 'One hour, one recording, one plan. No delivery overhead.', '60-min call + recorded action plan'],
        ['Consulting retainer', 'High ticket', 25000, 5000, 'Four retainers is a full income from a sub-10K account.', 'Monthly: 2 calls + async review'],
        ['Cohort / course', 'High ticket', 15000, 8000, 'Sells in launches, twice a year, hard.', 'Live cohort + templates + community']
      ],
      visual: 'Talking head with b-roll of real work, screenshots of invoices and dashboards with numbers visible and names blurred, whiteboard frames for the maths, calm confident delivery — no shouting hustle edits.',
      brands: ['SaaS & tools', 'payment and finance platforms', 'education platforms'],
      proof: ['real revenue screenshots', 'client results with numbers', 'your own P&L']
    },

    creative: {
      label: 'Creative & making',
      keys: 'design, create, creative, make, making, build, craft, aesthetic, visual, style, brand, animation, writing, content creation, editing',
      reach: 1.40, cpm: 0.9, buyRate: 0.95,
      who: 'self-taught creators building a {NICHE} practice and hoping to be paid for it',
      pains: ['work that looks amateur and they cannot say why', 'no consistent style of their own', 'comparison with people years ahead', 'no idea how to price the work', 'projects abandoned halfway'],
      desires: ['a style people recognise instantly', 'getting paid for what they make', 'finishing things', 'work they are proud to show'],
      objections: ['I do not have the software or gear', 'I am not naturally creative', 'nobody would pay for mine'],
      pillars: [
        ['Process & timelapse', 30, 'Watching something appear is the most watchable format there is.'],
        ['One technique', 25, 'Isolated, demonstrated, immediately usable. This is what gets saved.'],
        ['Before & after', 20, 'The reveal does the persuading for you.'],
        ['Tools & setup', 15, 'Search demand plus natural affiliate revenue.'],
        ['Getting paid', 10, 'Moves an audience of hobbyists toward the thing you sell.']
      ],
      ideas: [
        'the {NICHE} fix that makes work look professional', 'a full {NICHE} piece start to finish',
        'the {NICHE} tools worth paying for', 'how I found my style in {NICHE}',
        'the same {NICHE} work one year apart', 'the {NICHE} rule I break on purpose',
        'my full {NICHE} process in 60 seconds', 'how I price {NICHE} work',
        'fixing a {NICHE} piece I nearly deleted', 'the {NICHE} shortcut that saves hours',
        'building a {NICHE} portfolio with no clients', 'what I get asked most about {NICHE}'
      ],
      offers: [
        ['Free asset / template pack', 'Lead magnet', 0, 0, 'Creators collect tools reflexively. Fastest list build there is.', 'Templates, presets or assets'],
        ['{NICHE} asset pack', 'Digital product', 799, 1000, 'Made once, sold forever, and it spreads your look through other people\'s work.', 'Full pack + walkthrough video'],
        ['Client work', 'Service', 3500, 1000, 'The account is a portfolio. Book the actual work.', 'Commissioned {NICHE} project'],
        ['{NICHE} course', 'Digital product', 2499, 5000, 'Your process is the product. Record it once.', '10 lessons + working files'],
        ['Portfolio review', 'Productised service', 2500, 3000, 'One call, immediate value, no delivery overhead.', '45-min review + written notes']
      ],
      visual: 'Overhead or over-shoulder framing, timelapse with the reveal held at the end, hands and tools in frame, the work itself the brightest thing on screen, satisfying process audio kept loud.',
      brands: ['creative software', 'hardware & tools', 'materials & supplies', 'print services'],
      proof: ['your portfolio', 'client work delivered', 'progress over years']
    },

    lifestyle: {
      label: 'Lifestyle & living',
      keys: 'lifestyle, home, living, daily, routine, product, review, shopping, decor, minimal, organise, vlog, city, local, family life, budget living',
      reach: 1.45, cpm: 1.3, buyRate: 0.9,
      who: 'people trying to make their everyday {NICHE} better without a big budget',
      pains: ['inspiration everywhere and instructions nowhere', 'everything appealing is unaffordable', 'no idea where to start', 'money wasted on things that did not help', 'no time for elaborate routines'],
      desires: ['a life that feels intentional', 'getting it right the first time they buy', 'something people compliment', 'less friction in the everyday'],
      objections: ['that is out of my budget', 'my situation is too different', 'I do not have the space or time'],
      pillars: [
        ['Before & after', 30, 'The reach engine. Lead with the after, always.'],
        ['Budget and sourcing', 25, 'Where to get it and what it cost is the information nobody publishes.'],
        ['Practical fixes', 20, 'Small changes with visible results are what get saved.'],
        ['Honest reviews', 15, 'Being the person who says what is not worth buying is the position.'],
        ['Day in the life', 10, 'Personality and reach, but never the whole account.']
      ],
      ideas: [
        'this {NICHE} upgrade for under ₹2,000', 'the {NICHE} change with the biggest impact',
        'what {NICHE} actually costs per month, itemised', 'the {NICHE} purchase I regret',
        '{NICHE} in a small space or a rental', 'my full {NICHE} routine, unedited',
        'the {NICHE} mistakes that waste money', 'where I actually buy {NICHE} things',
        'a complete {NICHE} setup on a real budget', 'the {NICHE} habit that stuck',
        '{NICHE} before and after, same angle', 'answering the {NICHE} question I get most'
      ],
      offers: [
        ['Free checklist / starter guide', 'Lead magnet', 0, 0, 'Catches people at the start, before they spend anything.', 'Checklist + budget template'],
        ['Affiliate storefront', 'Affiliate', 0, 500, 'Every "where is that from" comment is unclaimed commission.', 'Curated shoppable links'],
        ['{NICHE} guide / source list', 'Digital product', 699, 2000, 'Your sourcing knowledge is what people actually want.', 'Guide, source list, budget sheet'],
        ['Consultation', 'Productised service', 3000, 5000, 'Remote advice has no travel cost and scales past local clients.', '45-min call + written plan'],
        ['Brand partnerships', 'Sponsorship', 0, 6000, 'This space monetises through brands earlier than through products.', 'Integrated reel + stories + code']
      ],
      visual: 'Same camera position for before and after with a hard cut between, wide shots that show context, natural daylight, prices on screen for everything, one consistent warm grade across the whole grid.',
      brands: ['home & consumer brands', 'e-commerce platforms', 'appliances & products'],
      proof: ['your own space or setup over time', 'itemised real costs', 'follower recreations']
    },

    knowledge: {
      label: 'Knowledge & teaching',
      keys: 'explain, teach, education, learn about, history, science, philosophy, psychology, facts, analysis, research, theory, study of, guide to',
      reach: 1.25, cpm: 1.1, buyRate: 1.15,
      who: 'curious people who want {NICHE} explained properly rather than dumbed down',
      pains: ['explanations that are either too shallow or unreadable', 'no idea what to trust', 'learning that never connects to anything useful', 'forgetting everything within a week', 'no path from curiosity to competence'],
      desires: ['genuinely understanding it', 'being the person who can explain it', 'knowledge they can use', 'a structured path through the subject'],
      objections: ['this is too complicated for me', 'I do not have the background', 'when would I ever use this'],
      pillars: [
        ['Explainers', 30, 'Complex made simple without being made wrong. That is the entire value proposition.'],
        ['Myth correction', 25, 'Fixing a widely held misconception is the fastest authority there is.'],
        ['Frameworks', 20, 'Screenshot-able structure gets saved, and saves drive reach.'],
        ['Topical analysis', 15, 'Attach to attention that already exists rather than creating it.'],
        ['Sources & credibility', 10, 'Showing your working is what separates you from confident guessing.']
      ],
      ideas: [
        '{NICHE} explained in 60 seconds, properly', 'the biggest misconception about {NICHE}',
        'the {NICHE} framework that makes the rest click', 'what nobody tells you about {NICHE}',
        'how {NICHE} actually works, step by step', 'the {NICHE} question I get asked constantly',
        'a beginner roadmap for {NICHE}', 'the {NICHE} detail everyone skips over',
        'why {NICHE} matters more than people think', 'the free resources that beat paid {NICHE} courses',
        'the {NICHE} thing I was wrong about', 'how to remember what you learn about {NICHE}'
      ],
      offers: [
        ['Free starter guide', 'Lead magnet', 0, 0, 'Turns passive interest into an owned audience.', 'PDF primer + reading list'],
        ['{NICHE} course or notes', 'Digital product', 999, 1000, 'Structure is the product. They have the information already.', 'Lessons + notes + exercises'],
        ['Live workshop', 'Productised service', 1499, 4000, 'Scales without inventory — one session, unlimited seats.', '90-min live session + recording'],
        ['Cohort program', 'High ticket', 12000, 8000, 'Cohorts sell out from small accounts when the audience is serious.', '4-week live cohort + community'],
        ['1:1 tutoring / consulting', 'High ticket', 15000, 3000, 'Small number of clients, high value, strong testimonials.', 'Package of sessions']
      ],
      visual: 'One idea per frame, big readable type, diagrams built in front of the viewer rather than appearing finished, calm delivery with deliberate pauses, restrained palette so the information is the loudest thing.',
      brands: ['education platforms', 'books & publishers', 'software & research tools'],
      proof: ['your credentials or track record', 'sources cited on screen', 'student outcomes']
    },

    tech: {
      label: 'Tech & tools',
      keys: 'app, software, tool, platform, digital, online, website, computer, phone, gadget, automation, system, workflow, plugin, device',
      reach: 1.35, cpm: 1.6, buyRate: 1.15,
      who: 'people who want {NICHE} to save them real hours rather than add another subscription',
      pains: ['drowning in repetitive work', 'too many tools and no system', 'setup guides that skip the hard part', 'paying for things they do not use', 'fear of being left behind'],
      desires: ['doing a day of work in an hour', 'building things without a team', 'being the person who knows this', 'a setup that just works'],
      objections: ['this needs technical skill', 'the free version is useless', 'I will never keep it up'],
      pillars: [
        ['Demos', 30, 'Screen-recorded results are the most re-shared format in tech.'],
        ['Workflows', 25, 'A tool list is forgettable. A workflow gets bookmarked and built.'],
        ['News & reaction', 20, 'Surf search spikes you did not have to create.'],
        ['Build in public', 15, 'Turns viewers into a waitlist for whatever you ship.'],
        ['Cost & alternatives', 10, 'Saving people money is the fastest way to be trusted.']
      ],
      ideas: [
        '{NICHE} that replaced half my toolstack', 'automate this with {NICHE} in 10 minutes',
        'the {NICHE} setup I wish I had on day one', '{NICHE} tools that are genuinely free',
        'my full {NICHE} workflow, screen recorded', 'the {NICHE} feature nobody turns on',
        'stop paying for these {NICHE} subscriptions', '{NICHE} for people who are not technical',
        'the fastest way to learn {NICHE}', 'what {NICHE} still cannot do',
        'the {NICHE} mistake that cost me a week', 'a real {NICHE} build, start to finish'
      ],
      offers: [
        ['Free template / prompt pack', 'Lead magnet', 0, 0, 'Tech audiences trade an email for utility instantly.', 'Templates + setup guide'],
        ['{NICHE} workflow vault', 'Digital product', 799, 400, 'Templates outsell courses here — people want the artefact.', 'Vault of workflows and templates'],
        ['Done-for-you setup', 'Productised service', 7500, 1500, 'Businesses pay for outcomes, not education. Best margin at a small size.', 'One system built, documented, handed over'],
        ['Cohort for teams', 'High ticket', 15000, 5000, 'B2B budgets, no price resistance.', '6 live sessions + workflow library'],
        ['Brand deals — software', 'Sponsorship', 0, 7000, 'SaaS pays 2–3× consumer rates and renews monthly.', 'Demo reel + tracked link']
      ],
      visual: 'Screen recordings at 1.5× with cursor highlighting, dark app themes with one neon accent on the key click, each step named on screen, the payoff shown in the first three seconds.',
      brands: ['SaaS & apps', 'hardware & peripherals', 'cloud & hosting', 'education platforms'],
      proof: ['live screen recordings', 'real outputs and hours saved', 'things you actually shipped']
    },

    entertainment: {
      label: 'Entertainment & fandom',
      keys: 'fan, fandom, movie, film, tv, series, celebrity, reaction, anime, cricket fan, football fan, music fan, culture, pop culture, trending, review show',
      reach: 1.60, cpm: 0.9, buyRate: 0.6,
      who: 'fans of {NICHE} who want opinion and detail, not a recap they could get anywhere',
      pains: ['recaps with no actual insight', 'takes that are just consensus repeated', 'missing the detail that mattered', 'nobody to talk about it with'],
      desires: ['a take worth arguing with', 'noticing what everyone else missed', 'belonging to a community that cares as much'],
      objections: ['I have seen this take everywhere', 'spoilers', 'that is just your opinion'],
      pillars: [
        ['Detail nobody caught', 30, 'The share trigger of every fandom. Being first or being sharpest.'],
        ['Hot takes', 25, 'Disagreement is distribution. Defend it in the comments and reach compounds.'],
        ['Breakdowns', 20, 'Depth is what turns a casual viewer into a follower.'],
        ['Topical reaction', 15, 'Free reach from attention that already exists — but it dates fast.'],
        ['Community', 10, 'Fandoms follow people who make them feel part of something.']
      ],
      ideas: [
        'the {NICHE} detail everyone missed', 'my honest {NICHE} take — and why I will defend it',
        'ranking every {NICHE} moment', 'the {NICHE} theory that actually holds up',
        'what {NICHE} got right that nobody credits', '{NICHE} explained for people who came in late',
        'the most overrated thing in {NICHE}', 'breaking down the {NICHE} scene frame by frame',
        'the {NICHE} moment that changed everything', 'answering the {NICHE} debate once and for all',
        'my {NICHE} tier list', 'the {NICHE} thing I was completely wrong about'
      ],
      offers: [
        ['Brand collaborations', 'Sponsorship', 0, 10000, 'The main revenue line here, and it starts earlier than in most spaces.', 'Integrated feature or sponsored breakdown'],
        ['Merch', 'Physical product', 799, 30000, 'Fandoms buy identity. Only once a phrase or symbol has genuinely stuck.', 'Print-on-demand run'],
        ['Paid community', 'Subscription', 199, 20000, 'Recurring, and the community sustains itself between your posts.', 'Private space + early access'],
        ['Content work for brands', 'Service', 25000, 5000, 'Brands pay for the skill, not only the audience. Works well below 10K.', 'Scripted content for their channels'],
        ['Live events / watchalongs', 'High ticket', 499, 25000, 'Highest margin, and the audience is already assembled.', 'Ticketed live event']
      ],
      visual: 'Payoff in the first three seconds, hard cuts with no dead air, clips and stills with your commentary layered over, captions always, high energy but never longer than the idea deserves.',
      brands: ['streaming & entertainment platforms', 'consumer apps', 'merch & collectibles'],
      proof: ['takes that aged well', 'community size and activity', 'brand work you have done']
    }
  };

  /* ---------------- resolution ---------------- */
  function words(s) {
    return String(s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 2);
  }

  /* "stock" and "stocks" are the same intent — match on a crude stem. */
  function stem(w) {
    return w.replace(/(ies)$/, 'y').replace(/(es|s)$/, '');
  }

  /* Score typed text against every preset's aliases, label and key. */
  G.resolveNiche = function (text) {
    const ws = words(text);
    if (!ws.length) return null;
    let best = null;

    Object.keys(G.NICHES).forEach((key) => {
      const n = G.NICHES[key];
      const hay = (key + ' ' + n.label + ' ' + n.short + ' ' + n.aliases).toLowerCase();
      const aliases = n.aliases.split(',').map((a) => a.trim()).filter(Boolean);
      let score = 0;

      aliases.forEach((a) => {
        /* A whole alias phrase appearing in the text is a strong signal. */
        if (a.indexOf(' ') > -1 && text.toLowerCase().indexOf(a) > -1) score += 6;
      });
      const stems = aliases.map(stem);
      ws.forEach((w) => {
        const sw = stem(w);
        if (aliases.indexOf(w) > -1 || stems.indexOf(sw) > -1) score += 4;   // alias hit
        else if (hay.indexOf(sw) > -1) score += 1.5;                          // appears somewhere
      });
      if (score > 0 && (!best || score > best.score)) best = { key: key, score: score };
    });

    return best && best.score >= 4 ? best : null;
  };

  /* Classify anything unmatched into a family. */
  G.classifyFamily = function (text) {
    const ws = words(text);
    let best = { key: 'skill', score: 0 };
    Object.keys(G.FAMILIES).forEach((key) => {
      const f = G.FAMILIES[key];
      const keys = f.keys.split(',').map((k) => k.trim());
      let score = 0;
      keys.forEach((k) => {
        if (k.indexOf(' ') > -1 && text.toLowerCase().indexOf(k) > -1) score += 3;
      });
      ws.forEach((w) => { if (keys.indexOf(w) > -1) score += 2; });
      if (score > best.score) best = { key: key, score: score };
    });
    return best.key;
  };

  /* Build a full niche object from a family template. */
  function fromFamily(familyKey, name) {
    const f = G.FAMILIES[familyKey];
    const tag = name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 14) || 'niche';
    const fill = (s) => String(s).replace(/\{NICHE\}/g, name);

    return {
      label: name.replace(/^\w/, (c) => c.toUpperCase()),
      short: name.replace(/^\w/, (c) => c.toUpperCase()),
      category: f.label,
      aliases: name,
      custom: true,
      family: familyKey,
      familyLabel: f.label,
      reach: f.reach, cpm: f.cpm, buyRate: f.buyRate,
      positioning: 'the clearest, most practical voice in ' + name + ' for people who are actually trying',
      audience: {
        age: '20–35',
        who: fill(f.who),
        interests: [name + ' basics', name + ' tools and gear', name + ' results and case studies', 'common ' + name + ' mistakes', name + ' shortcuts'],
        pains: f.pains.map(fill),
        desires: f.desires.map(fill),
        objections: f.objections.map(fill)
      },
      pillars: f.pillars.map((p) => ({ name: p[0], pct: p[1], why: p[2] })),
      ideas: f.ideas.map(fill),
      offers: f.offers.map((o) => ({
        name: fill(o[0]), type: o[1], price: o[2], gate: o[3], promise: fill(o[4]), deliver: fill(o[5])
      })),
      hashtags: {
        broad: ['#' + tag, '#reels', '#explorepage', '#instagood'],
        mid: ['#' + tag + 'tips', '#' + tag + 'forbeginners', '#' + tag + 'daily', '#' + tag + 'community', '#learn' + tag, '#' + tag + 'india'],
        niche: ['#' + tag + 'beginner', '#' + tag + 'hacks', '#' + tag + 'journey', '#' + tag + 'guide', '#' + tag + 'basics', '#daily' + tag, '#' + tag + 'coach', '#' + tag + '2026']
      },
      visual: f.visual,
      brands: f.brands.map(fill),
      proof: f.proof.map(fill)
    };
  }

  /* What did we match this profile to, and how? Used by the UI to be honest
     about whether someone got a preset or a generated plan. */
  G.nicheMatch = function (profile) {
    profile = profile || G.store.profile || {};
    if (profile.nicheKey && G.NICHES[profile.nicheKey]) {
      return { kind: 'preset', key: profile.nicheKey, label: G.NICHES[profile.nicheKey].label };
    }
    const typed = (profile.customNiche || '').trim();
    if (!typed) return { kind: 'preset', key: 'fitness', label: G.NICHES.fitness.label };

    const hit = G.resolveNiche(typed);
    if (hit) {
      return { kind: 'matched', key: hit.key, label: G.NICHES[hit.key].label, typed: typed };
    }
    const fam = G.classifyFamily(typed);
    return { kind: 'family', key: fam, label: G.FAMILIES[fam].label, typed: typed };
  };

  G.niche = function (profile) {
    profile = profile || G.store.profile || {};
    const m = G.nicheMatch(profile);

    if (m.kind === 'family') {
      return fromFamily(m.key, (profile.customNiche || 'your niche').trim());
    }
    const base = G.NICHES[m.key];
    if (m.kind === 'matched') {
      /* Keep the preset's intelligence, but wear the name they actually typed —
         including a handful of ideas phrased in their exact words, so someone
         who typed "crochet" is not handed only woodworking topics. */
      const out = Object.assign({}, base);
      out.label = m.typed.replace(/^\w/, (c) => c.toUpperCase());
      out.short = out.label;
      out.matchedFrom = base.label;
      const fam = G.FAMILIES[G.classifyFamily(m.typed)];
      const own = fam.ideas.slice(0, 4).map((s) => s.replace(/\{NICHE\}/g, m.typed));
      out.ideas = own.concat(base.ideas);
      return out;
    }
    return base;
  };

  G.nicheName = function (profile) {
    profile = profile || G.store.profile || {};
    if (profile.nicheKey && G.NICHES[profile.nicheKey]) return G.NICHES[profile.nicheKey].label;
    return (profile.customNiche || 'Your niche').replace(/^\w/, (c) => c.toUpperCase());
  };
})(window.IGOS);
