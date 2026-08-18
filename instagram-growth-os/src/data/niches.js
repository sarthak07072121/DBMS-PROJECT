/* ================= GROWTH OS · niche intelligence library =================
   Every department reads from here. Change a niche, and positioning, offers,
   pricing, hooks, calendar, hashtags and brand-deal rate cards all change.
========================================================================== */
(function (G) {
  'use strict';

  /* reach     = how far cold traffic travels in this niche (broad vs narrow)
     cpm       = brand-deal premium (advertiser demand per 1K followers)
     buyRate   = how readily this audience pays for information products     */

  G.NICHES = {

    fitness: {
      label: 'Fitness & Body Transformation',
      short: 'Fitness',
      reach: 1.30, cpm: 1.0, buyRate: 1.05,
      positioning: 'the no-nonsense coach for people who have failed diets before',
      audience: {
        age: '18–34', who: 'students, early-career professionals, new gym members',
        interests: ['gym & home workouts', 'protein and diet hacks', 'body recomposition', 'sports & athletes', 'supplements'],
        pains: ['training for months with no visible change', 'confused by contradictory advice online', 'no time for 6-day gym splits', 'eating "healthy" but not losing fat', 'motivation dies after 2 weeks'],
        desires: ['visible abs / lean look', 'strength numbers going up', 'a plan they can actually follow', 'to look good in photos', 'energy through the day'],
        objections: ['I don\'t have gym access', 'coaching is too expensive', 'my genetics are bad', 'I tried a plan before and quit']
      },
      pillars: [
        { name: 'Myth-busting', pct: 25, why: 'Cheapest way to earn authority — correct a belief they hold today.' },
        { name: 'Actionable how-to', pct: 30, why: 'Saves + shares. This is the growth engine.' },
        { name: 'Transformation proof', pct: 20, why: 'Sells. Nothing converts like before/after and client results.' },
        { name: 'Relatable/humour', pct: 15, why: 'Broad reach — pulls in non-followers who never search fitness.' },
        { name: 'Founder story / BTS', pct: 10, why: 'Builds the parasocial trust that closes DMs.' }
      ],
      ideas: [
        'the 3 exercises that built 80% of my chest', 'why your abs are not showing at 15% body fat',
        'a full day of eating at 2,200 calories on ₹250', 'the cheapest high-protein Indian foods ranked',
        'how to fix rounded shoulders in 4 weeks', '5 minutes of this beats 30 minutes of cardio',
        'gym beginner mistakes I see every single day', 'the 4-week plan I give every new client',
        'how much protein you actually need (with the math)', 'training to failure vs leaving reps in reserve',
        'no-gym home workout that actually builds muscle', 'what 90 days of consistency really looks like',
        'the supplement tier list — buy, maybe, never', 'how to eat out and still hit your macros',
        'why you regained the weight (and the fix)', 'progressive overload explained in 30 seconds'
      ],
      offers: [
        { name: 'Free 7-Day Starter Plan (lead magnet)', type: 'Lead magnet', price: 0, gate: 0, promise: 'Trades a PDF for a DM conversation — the top of your entire funnel.', deliver: '1 PDF, 7 workouts, 1 grocery list' },
        { name: 'Beginner Fat-Loss Blueprint (ebook)', type: 'Digital product', price: 499, gate: 300, promise: 'First cash. Proves people will pay before you build anything bigger.', deliver: '40-page PDF + macro calculator sheet' },
        { name: 'Custom Diet + Training Plan', type: 'Productised service', price: 2999, gate: 1500, promise: 'Highest margin per hour at a small account size.', deliver: 'Intake form, 1 plan, 1 revision, 30-day WhatsApp support' },
        { name: '12-Week 1:1 Coaching', type: 'High ticket', price: 18000, gate: 4000, promise: 'The real business. 6 clients = a full-time income.', deliver: 'Weekly check-ins, video form reviews, plan updates' },
        { name: 'Brand deals — supplements & apparel', type: 'Sponsorship', price: 0, gate: 8000, promise: 'Only after the product ladder works. Never the first revenue line.', deliver: '1 reel + 3 stories + usage rights' }
      ],
      hashtags: {
        broad: ['#fitness', '#gym', '#workout', '#fitnessmotivation', '#health'],
        mid: ['#fatlossjourney', '#homeworkout', '#gymtips', '#indianfitness', '#fitnesstips', '#bodytransformation', '#strengthtraining'],
        niche: ['#fatlossindia', '#beginnergymtips', '#proteinindia', '#bodyrecomp', '#gymbeginners', '#dietplanindia', '#fitnesscoachindia', '#indiangymrat']
      },
      visual: 'High-contrast gym footage, hard cuts on the beat, big bold sans-serif captions (Anton/Montserrat Black), one-word emphasis in yellow, before/after split screens, no background music louder than voice.',
      brands: ['whey & supplements', 'activewear', 'protein snacks', 'fitness apps', 'home equipment'],
      proof: ['client before/after grids', 'your own lift numbers', 'certifications', 'screenshots of client messages']
    },

    finance: {
      label: 'Personal Finance & Investing',
      short: 'Finance',
      reach: 1.15, cpm: 1.9, buyRate: 1.25,
      positioning: 'the person who explains money the way a friend would, not a bank would',
      audience: {
        age: '22–40', who: 'first-job earners, salaried professionals, small business owners',
        interests: ['mutual funds & SIPs', 'stock market basics', 'tax saving', 'side income', 'credit cards & credit score'],
        pains: ['salary disappears by the 20th', 'no idea where to start investing', 'terrified of losing money in stocks', 'paying more tax than needed', 'no emergency fund'],
        desires: ['first ₹10 lakh corpus', 'passive income', 'financial independence', 'buying a house without drowning', 'looking smart about money'],
        objections: ['I earn too little to invest', 'markets are gambling', 'this is too complicated', 'I will start next month']
      },
      pillars: [
        { name: 'Explainers', pct: 30, why: 'Complex→simple is the entire value proposition of this niche.' },
        { name: 'Money mistakes', pct: 25, why: 'Loss aversion drives shares harder than gain framing.' },
        { name: 'Frameworks & numbers', pct: 20, why: 'Screenshot-able math = saves, which the algorithm weights heavily.' },
        { name: 'News/trend reaction', pct: 15, why: 'Rides existing search demand — budget day, rate changes, market crashes.' },
        { name: 'Credibility & story', pct: 10, why: 'Money advice without a face and a track record does not convert.' }
      ],
      ideas: [
        'the 50-30-20 rule and why it fails in Indian cities', 'how ₹5,000/month becomes ₹1 crore (real math)',
        'the tax deductions salaried people forget every year', 'index fund vs FD — 10 year comparison',
        'the emergency fund order of operations', 'credit card churning without destroying your score',
        'what your CIBIL score actually measures', '3 mutual fund red flags in the fact sheet',
        'the real cost of a ₹12 lakh car on a ₹80k salary', 'how compounding actually looks year by year',
        'old vs new tax regime — pick in 60 seconds', 'the ₹0 to first investment checklist',
        'why your SIP is down and what not to do', 'side income ideas ranked by hourly rate',
        'insurance you need vs insurance you are sold', 'how I track every rupee in one sheet'
      ],
      offers: [
        { name: 'Free Money Starter Kit (lead magnet)', type: 'Lead magnet', price: 0, gate: 0, promise: 'A budget sheet in exchange for a DM — highest opt-in rate in this niche.', deliver: 'Google Sheet budget tracker + 1-page checklist' },
        { name: 'Personal Finance Starter Course', type: 'Digital product', price: 999, gate: 500, promise: 'Finance audiences buy earlier than any other niche. Do not wait for 10K.', deliver: '8 short videos + 3 sheets + private community' },
        { name: 'Investment Portfolio Review', type: 'Productised service', price: 3500, gate: 2000, promise: 'One call, one report — no advisory licence needed if framed as education.', deliver: '45-min call + written summary. Educational, not regulated advice.' },
        { name: 'Money Systems Cohort (live, 4 weeks)', type: 'High ticket', price: 12000, gate: 6000, promise: 'Cohorts sell out from a small account because the audience is high-income.', deliver: '4 live sessions, templates, Q&A, recordings' },
        { name: 'Brand deals — broker/fintech apps', type: 'Sponsorship', price: 0, gate: 10000, promise: 'The highest CPM category on Instagram. Guard your credibility ruthlessly.', deliver: '1 reel + link-in-bio + 3 stories' }
      ],
      hashtags: {
        broad: ['#personalfinance', '#money', '#investing', '#finance', '#wealth'],
        mid: ['#moneytips', '#mutualfunds', '#stockmarketindia', '#financialfreedom', '#taxsaving', '#sipinvestment', '#financialliteracy'],
        niche: ['#personalfinanceindia', '#moneytipsindia', '#indianstockmarket', '#sipindia', '#taxsavingindia', '#salariedemployee', '#firemovementindia', '#budgetingtips']
      },
      visual: 'Clean dark or off-white backgrounds, one number per frame at huge size, green/red for gain/loss, screen recordings of real sheets and app screens, subtle zoom, no meme fonts — credibility is the aesthetic.',
      brands: ['stock brokers', 'fintech & UPI apps', 'insurance', 'credit cards', 'edtech'],
      proof: ['real portfolio screenshots (blur amounts)', 'your credentials', 'testimonials with numbers', 'track record over time']
    },

    tech: {
      label: 'Tech, AI & Digital Tools',
      short: 'Tech / AI',
      reach: 1.35, cpm: 1.7, buyRate: 1.15,
      positioning: 'the person who finds the tool 6 months before everyone else and shows the workflow',
      audience: {
        age: '20–38', who: 'students, developers, marketers, freelancers, founders',
        interests: ['AI tools', 'automation', 'productivity software', 'coding', 'gadgets'],
        pains: ['drowning in repetitive work', 'tool overwhelm — 40 tabs, no system', 'scared AI will make the job obsolete', 'cannot code but need software', 'wasting money on subscriptions'],
        desires: ['do 8 hours of work in 1', 'build things without a team', 'be the AI person at work', 'freelance income from tools'],
        objections: ['this needs coding', 'the free version is useless', 'I will forget how to use it']
      },
      pillars: [
        { name: 'Tool demos', pct: 30, why: 'Screen-recorded results are the most re-shared format in tech.' },
        { name: 'Workflows & automations', pct: 25, why: 'Depth = saves. A tool list is forgettable, a workflow is bookmarked.' },
        { name: 'AI news reaction', pct: 20, why: 'Free distribution — you surf search spikes you did not create.' },
        { name: 'Build-in-public', pct: 15, why: 'Turns viewers into a product waitlist.' },
        { name: 'Career/skills', pct: 10, why: 'Broadens reach beyond the tool-obsessed core.' }
      ],
      ideas: [
        '5 AI tools that replaced my ₹20k/month stack', 'automate your entire invoicing in 10 minutes',
        'the prompt structure that fixes 90% of bad outputs', 'build an app with zero code in one sitting',
        'AI tools that are actually free (no trial trap)', 'how I research 10x faster with one workflow',
        'ChatGPT vs Claude vs Gemini for real work', 'the folder system that ends tab chaos',
        'turn one long video into 30 posts automatically', 'stop paying for these 4 subscriptions',
        'the AI skill that pays the most right now', 'my full second-brain setup in 60 seconds',
        'scrape any website into a spreadsheet, no code', 'the fastest way to learn any tool',
        'what AI still cannot do (and why that is your job)', 'automate client onboarding end to end'
      ],
      offers: [
        { name: 'Free Prompt/Tool Pack (lead magnet)', type: 'Lead magnet', price: 0, gate: 0, promise: 'Tech audiences trade emails for utility instantly.', deliver: '50 prompts + tool list in Notion' },
        { name: 'AI Workflow Vault', type: 'Digital product', price: 799, gate: 400, promise: 'Templates outsell courses in tech — people want the artifact, not the lecture.', deliver: 'Notion vault: 20 workflows, prompts, automations' },
        { name: 'Automation Setup (done-for-you)', type: 'Productised service', price: 7500, gate: 1500, promise: 'Businesses pay for outcomes, not education. Highest margin at low follower counts.', deliver: '1 automation built, documented, handed over' },
        { name: 'AI for Business — 3-week cohort', type: 'High ticket', price: 15000, gate: 5000, promise: 'B2B buyers, expense-account budgets, no price resistance.', deliver: '6 live sessions + workflow library + support channel' },
        { name: 'Brand deals — SaaS & AI tools', type: 'Sponsorship', price: 0, gate: 7000, promise: 'SaaS pays 2–3x consumer rates and repeats monthly.', deliver: '1 demo reel + tracked link + story set' }
      ],
      hashtags: {
        broad: ['#ai', '#tech', '#technology', '#productivity', '#software'],
        mid: ['#aitools', '#automation', '#chatgpt', '#nocode', '#techtips', '#futureofwork', '#saas'],
        niche: ['#aiworkflow', '#promptengineering', '#notiontemplates', '#aiforbusiness', '#automationtools', '#buildinpublic', '#aiproductivity', '#techtoolsindia']
      },
      visual: 'Screen recordings at 1.5x speed, cursor highlight, dark IDE/app themes, neon accent on the key click, text overlay naming each step, 3-second payoff shown in the first frame.',
      brands: ['SaaS tools', 'AI startups', 'laptops & peripherals', 'edtech', 'cloud/hosting'],
      proof: ['live screen recordings', 'real outputs and time saved', 'client automations', 'your own shipped products']
    },

    business: {
      label: 'Business, Freelancing & Entrepreneurship',
      short: 'Business',
      reach: 1.10, cpm: 1.8, buyRate: 1.3,
      positioning: 'the operator who shows the actual mechanics, not motivational quotes',
      audience: {
        age: '21–40', who: 'freelancers, agency owners, small business owners, aspiring founders',
        interests: ['client acquisition', 'pricing', 'personal branding', 'systems', 'case studies'],
        pains: ['feast-or-famine client flow', 'underpricing and resenting clients', 'trading time for money with no ceiling', 'no idea how to get the first customer', 'burnout from doing everything'],
        desires: ['predictable monthly revenue', 'charging premium without flinching', 'a business that runs without them', 'quitting the job'],
        objections: ['my market is different', 'I have no audience yet', 'I cannot afford ads', 'this only works for you']
      },
      pillars: [
        { name: 'Case studies & numbers', pct: 25, why: 'Specific numbers are the credibility currency of business content.' },
        { name: 'Playbooks & systems', pct: 30, why: 'The save-and-implement format that grows accounts fastest here.' },
        { name: 'Contrarian takes', pct: 20, why: 'Comment volume drives distribution; disagreement is fuel.' },
        { name: 'Founder journey', pct: 15, why: 'The story is what makes people buy from you, not the tips.' },
        { name: 'Client/DM proof', pct: 10, why: 'Screenshots close deals that content alone cannot.' }
      ],
      ideas: [
        'the cold DM that got me 3 clients this week', 'how I priced my first ₹50k project',
        'the 4-question discovery call script', 'why cheap clients cost the most',
        'the onboarding doc that killed my scope creep', 'how to get testimonials before you have clients',
        'my exact offer stack and what each tier earns', 'the mistake that cost me ₹2 lakh',
        'freelance rates by skill — what to actually charge', 'how to raise prices without losing clients',
        'a full breakdown of a ₹1L month (revenue, cost, profit)', 'the 3 systems every one-person business needs',
        'how to find clients with zero audience', 'stop selling hours — sell this instead',
        'the follow-up sequence that doubles replies', 'when to hire your first person'
      ],
      offers: [
        { name: 'Free Client-Getting Checklist', type: 'Lead magnet', price: 0, gate: 0, promise: 'Opens DM conversations with exactly the people who can pay you.', deliver: '1-page checklist + DM script' },
        { name: 'Freelance Pricing Toolkit', type: 'Digital product', price: 1299, gate: 400, promise: 'Solves a painful, immediate problem — fastest first sale in this niche.', deliver: 'Rate calculator, proposal template, contract' },
        { name: 'Business Audit Call', type: 'Productised service', price: 4999, gate: 1500, promise: 'One hour, one recording, one action plan. No delivery overhead.', deliver: '60-min call + recorded Loom action plan' },
        { name: '1:1 Consulting Retainer', type: 'High ticket', price: 25000, gate: 5000, promise: 'Four retainers is a serious income from a sub-10K account.', deliver: 'Monthly: 2 calls + async review + templates' },
        { name: 'Brand deals — B2B tools', type: 'Sponsorship', price: 0, gate: 10000, promise: 'Optional here. Your own offers almost always pay more than sponsors.', deliver: 'Integrated demo in a case-study reel' }
      ],
      hashtags: {
        broad: ['#business', '#entrepreneur', '#marketing', '#startup', '#success'],
        mid: ['#freelancing', '#smallbusinesstips', '#clientacquisition', '#solopreneur', '#agencylife', '#businessgrowth', '#personalbranding'],
        niche: ['#freelancerindia', '#agencyowner', '#coldemail', '#pricingstrategy', '#onepersonbusiness', '#servicebusiness', '#businesssystems', '#indianentrepreneur']
      },
      visual: 'Talking head + b-roll of real work, whiteboard/annotation frames, screenshots of invoices and DMs (redacted), clean serif or bold sans captions, calm confident delivery — no shouting hustle edits.',
      brands: ['SaaS', 'payment tools', 'coworking', 'business banking', 'courses'],
      proof: ['invoice and payment screenshots', 'client results with numbers', 'DM conversations', 'your own P&L']
    },

    food: {
      label: 'Food, Recipes & Cooking',
      short: 'Food',
      reach: 1.55, cpm: 0.9, buyRate: 0.8,
      positioning: 'the cook who makes restaurant results possible in a normal kitchen',
      audience: {
        age: '18–45', who: 'students cooking alone, home cooks, working parents, hostel/PG residents',
        interests: ['quick recipes', 'street food', 'meal prep', 'baking', 'budget eating'],
        pains: ['no time to cook after work', 'same 5 meals on repeat', 'recipes that need 20 ingredients', 'food that never looks like the video', 'wasting groceries'],
        desires: ['impress people with one dish', 'eat well on a budget', 'cook without a recipe', 'a week of meals sorted'],
        objections: ['I do not have that equipment', 'that ingredient is not available here', 'too much effort']
      },
      pillars: [
        { name: 'Fast recipes (<60s)', pct: 35, why: 'Highest completion rate = highest reach in food.' },
        { name: 'Technique & fixes', pct: 20, why: 'Turns casual viewers into followers who trust you.' },
        { name: 'Budget / meal prep', pct: 20, why: 'Saves engine — people bookmark to actually cook it.' },
        { name: 'Food discovery / trends', pct: 15, why: 'Rides trending audio and locations for cold reach.' },
        { name: 'Behind the kitchen', pct: 10, why: 'Personality is what separates you from a recipe database.' }
      ],
      ideas: [
        '15-minute dinner with 5 ingredients', 'the ₹50 meal that tastes like ₹500',
        'restaurant-style gravy base you can freeze', 'hostel cooking with just a kettle',
        'high-protein vegetarian meals that are not paneer', 'one dough, five snacks',
        'the mistake making your rice sticky', 'meal prep for the whole week in 90 minutes',
        'street food at home without deep frying', 'what chefs do to onions that you do not',
        '3 sauces that upgrade any boring meal', 'a lunchbox that survives till 1pm',
        'the fastest breakfast with 30g protein', 'leftover rice into something people fight over',
        'baking without an oven, actually working', 'the spice order that changes everything'
      ],
      offers: [
        { name: 'Free 7-Day Meal Plan', type: 'Lead magnet', price: 0, gate: 0, promise: 'Recipe audiences opt in fast — build the list from day one.', deliver: 'PDF plan + grocery list' },
        { name: 'Recipe Ebook / Meal Plan Pack', type: 'Digital product', price: 399, gate: 1000, promise: 'Low ticket, high volume. Price for impulse, not deliberation.', deliver: '30 recipes, printable cards, grocery lists' },
        { name: 'Sponsored recipe integration', type: 'Sponsorship', price: 0, gate: 5000, promise: 'Food monetises through brands earlier than through products.', deliver: 'Recipe reel featuring product + usage rights' },
        { name: 'Live cooking workshop', type: 'Productised service', price: 999, gate: 6000, promise: 'Scales without inventory — one hour, unlimited seats.', deliver: '90-min live class + recording + recipe pack' },
        { name: 'Own product line (masala / sauce / tool)', type: 'Physical product', price: 899, gate: 30000, promise: 'The real endgame in food — margin you own, not rent. Unit price is low; the volume and the repeat purchase are the business.', deliver: 'Small-batch launch to your warmest 1,000 followers' }
      ],
      hashtags: {
        broad: ['#food', '#recipe', '#cooking', '#foodie', '#homemade'],
        mid: ['#quickrecipes', '#indianfood', '#mealprep', '#budgetmeals', '#easyrecipes', '#vegetarianrecipes', '#foodreels'],
        niche: ['#hostelcooking', '#15minutemeals', '#indianrecipesathome', '#highproteinveg', '#lunchboxideas', '#streetfoodathome', '#cookingforone', '#budgetcookingindia']
      },
      visual: 'Overhead top-down shots, natural light, tight sizzle audio (never bury it under music), 1–2s per step, the finished dish in frame one, warm colour grade, hands-only works fine — no face needed.',
      brands: ['FMCG & spices', 'cookware', 'grocery delivery', 'appliances', 'restaurants'],
      proof: ['consistent food quality', 'your kitchen setup', 'audience recreations (repost them)', 'chef background if any']
    },

    fashion: {
      label: 'Fashion, Style & Grooming',
      short: 'Fashion',
      reach: 1.40, cpm: 1.3, buyRate: 0.95,
      positioning: 'the stylist for normal bodies and normal budgets, not runway fantasy',
      audience: {
        age: '18–32', who: 'college students, first-job professionals, wedding-season shoppers',
        interests: ['outfit ideas', 'affordable brands', 'grooming', 'occasion dressing', 'thrifting'],
        pains: ['full wardrobe, nothing to wear', 'clothes never fit right', 'no budget for designer', 'looks good in store, bad in photos', 'no personal style'],
        desires: ['look expensive cheaply', 'be the best dressed at the event', 'a wardrobe that works together', 'compliments'],
        objections: ['that will not suit my body type', 'too expensive', 'not available in my city']
      },
      pillars: [
        { name: 'Outfit formulas', pct: 30, why: 'Repeatable rules beat one-off outfits — that is what gets saved.' },
        { name: 'Budget finds & hauls', pct: 25, why: 'Price is the hook. "Under ₹999" outperforms "styling tips".' },
        { name: 'Fit & body-type fixes', pct: 20, why: 'Solves the actual pain, converts casual viewers to followers.' },
        { name: 'Trend decode', pct: 15, why: 'Timely reach — trend audio plus trend topic compounds.' },
        { name: 'Transformations', pct: 10, why: 'Before/after is the highest-retention format in style.' }
      ],
      ideas: [
        '5 outfits from 10 pieces', 'the fit rule that makes cheap clothes look expensive',
        'under ₹999 haul that does not look under ₹999', 'what to wear to a wedding when you hate kurtas',
        'the 3 colours that work on Indian skin tones', 'why your shirt looks wrong (it is the shoulder seam)',
        'thrift store finds, styled 3 ways', 'the grooming 20 minutes that changes everything',
        'office wear that is not boring', 'how to dress if you are under 5\'7"',
        'one jacket, five looks', 'the accessories that actually matter',
        'first date outfit breakdown', 'seasonal capsule wardrobe under ₹5,000',
        'shoes ranked by how much they upgrade a fit', 'tailoring hacks worth ₹200'
      ],
      offers: [
        { name: 'Free Capsule Wardrobe Guide', type: 'Lead magnet', price: 0, gate: 0, promise: 'Captures the buyer intent that hauls create.', deliver: 'PDF: 15 pieces, 30 outfits' },
        { name: 'Affiliate storefront', type: 'Affiliate', price: 0, gate: 500, promise: 'Earn from day one — you are already driving purchases for free.', deliver: 'Curated affiliate links, updated weekly' },
        { name: 'Style Guide / Lookbook', type: 'Digital product', price: 599, gate: 2000, promise: 'Cheap, visual, impulse-priced.', deliver: 'Digital lookbook + shopping links' },
        { name: 'Personal Styling Session', type: 'Productised service', price: 3500, gate: 3000, promise: 'Premium 1:1 that only needs a handful of clients per month.', deliver: 'Wardrobe audit call + custom shopping list' },
        { name: 'Brand deals & seeding', type: 'Sponsorship', price: 0, gate: 6000, promise: 'Fashion brands buy at smaller sizes than most niches.', deliver: 'Styling reel + story set + discount code' }
      ],
      hashtags: {
        broad: ['#fashion', '#style', '#ootd', '#outfit', '#streetstyle'],
        mid: ['#mensfashion', '#womensfashion', '#budgetfashion', '#stylingtips', '#indianfashion', '#fashionreels', '#grooming'],
        niche: ['#affordablefashionindia', '#outfitideasindia', '#capsulewardrobe', '#collegeoutfits', '#weddingguestoutfit', '#thriftstyle', '#fitcheckindia', '#styletipsformen']
      },
      visual: 'Clean single-colour walls, full-body framing with headroom, transition cuts on beat drops, price tags as on-screen text, consistent colour grade across the grid — your profile must look like one brand.',
      brands: ['clothing labels', 'footwear', 'grooming & skincare', 'accessories', 'e-commerce platforms'],
      proof: ['your own consistent aesthetic', 'follower recreations', 'brand collaborations', 'before/after styling']
    },

    education: {
      label: 'Study, Exams & Career Skills',
      short: 'Education',
      reach: 1.20, cpm: 1.2, buyRate: 1.2,
      positioning: 'the senior who already cracked it and gives the shortcut nobody else shares',
      audience: {
        age: '16–28', who: 'school & college students, exam aspirants, job seekers',
        interests: ['study techniques', 'exam strategy', 'placements', 'resume & interviews', 'skill courses'],
        pains: ['studying long hours with low marks', 'no strategy, only syllabus', 'procrastination and phone addiction', 'rejected without interviews', 'no clarity on career path'],
        desires: ['top rank / good college', 'a job offer', 'study less, score more', 'to feel in control'],
        objections: ['my college is not tier 1', 'no time — I have classes', 'free resources are enough']
      },
      pillars: [
        { name: 'Technique & systems', pct: 30, why: 'Evergreen saves; this is the compounding library of your page.' },
        { name: 'Exam/topic breakdowns', pct: 25, why: 'Search-driven, seasonal spikes you can plan a year ahead.' },
        { name: 'Motivation with substance', pct: 20, why: 'Broad reach — but always attach one concrete action.' },
        { name: 'Career & placement', pct: 15, why: 'This is where the money is; move followers here deliberately.' },
        { name: 'Personal journey', pct: 10, why: 'Your result is the proof that justifies the advice.' }
      ],
      ideas: [
        'the revision method that beat re-reading', 'how I studied 6 hours without burning out',
        'the note format that made revision 3x faster', 'active recall in 60 seconds',
        'what toppers do in the last 30 days', 'resume mistakes that get auto-rejected',
        'how to answer "tell me about yourself"', 'the free resources that beat paid courses',
        'phone addiction fix that actually held', 'how to plan a syllabus backwards from the exam',
        'the 2-hour deep work block that replaced 6 lazy hours', 'skills that get hired in 2026',
        'how to build a portfolio with no experience', 'cold email to get an internship',
        'the mock test routine that fixed my accuracy', 'exam-day plan hour by hour'
      ],
      offers: [
        { name: 'Free Study Planner', type: 'Lead magnet', price: 0, gate: 0, promise: 'Students will not pay first — but they will hand over an email instantly.', deliver: 'Notion/PDF planner + revision tracker' },
        { name: 'Notes / Question Bank', type: 'Digital product', price: 299, gate: 800, promise: 'Volume play. Price for a student wallet, sell to thousands.', deliver: 'Subject notes PDF + PYQ set' },
        { name: 'Resume & Interview Review', type: 'Productised service', price: 1499, gate: 2000, promise: 'Career pain has real money behind it, unlike exam pain.', deliver: 'Line-by-line review + 30-min mock call' },
        { name: 'Crash Course / Mentorship Batch', type: 'High ticket', price: 6999, gate: 8000, promise: 'Cohorts around exam season — sell twice a year, hard.', deliver: '6-week live batch, doubt sessions, tests' },
        { name: 'Brand deals — edtech & apps', type: 'Sponsorship', price: 0, gate: 12000, promise: 'Edtech pays well but audiences punish bad recommendations fast.', deliver: 'Integrated reel + code + stories' }
      ],
      hashtags: {
        broad: ['#study', '#education', '#student', '#motivation', '#career'],
        mid: ['#studytips', '#studymotivation', '#examtips', '#placement', '#studygram', '#interviewtips', '#collegelife'],
        niche: ['#studytipsindia', '#upscpreparation', '#jeeneet', '#activerecall', '#studyplanner', '#campusplacement', '#resumetips', '#studywithme']
      },
      visual: 'Desk POV shots, handwritten notes on camera, timelapse study clips, clean whiteboard explainers, calm lo-fi audio under a clear voice, text-heavy carousels with one idea per slide.',
      brands: ['edtech platforms', 'stationery', 'test-prep', 'laptops & tablets', 'productivity apps'],
      proof: ['your rank/score/offer letter', 'student results', 'your actual notes', 'mentee testimonials']
    },

    selfimprovement: {
      label: 'Self-Improvement & Mindset',
      short: 'Self-Improvement',
      reach: 1.45, cpm: 1.0, buyRate: 1.0,
      positioning: 'the person who replaces vague motivation with systems that survive a bad week',
      audience: {
        age: '18–35', who: 'students and young professionals in a rebuild phase',
        interests: ['habits', 'discipline', 'focus', 'confidence', 'morning routines'],
        pains: ['motivation for 3 days then collapse', 'scrolling instead of doing', 'no discipline without pressure', 'comparison and low self-worth', 'feeling behind everyone'],
        desires: ['become someone they respect', 'discipline that does not need motivation', 'focus for real work', 'confidence in rooms'],
        objections: ['I have tried habit tracking', 'this is common sense', 'my situation is different']
      },
      pillars: [
        { name: 'Systems over motivation', pct: 30, why: 'The differentiator in a niche drowning in quotes.' },
        { name: 'Hard truths', pct: 25, why: 'Highest share rate — people send these to friends.' },
        { name: 'Routines & protocols', pct: 20, why: 'Concrete steps get saved; abstractions get liked and forgotten.' },
        { name: 'Story & failure', pct: 15, why: 'Vulnerability is the trust engine in this niche.' },
        { name: 'Book/idea breakdowns', pct: 10, why: 'Borrowed authority while you build your own.' }
      ],
      ideas: [
        'the 2-day rule that saved my consistency', 'why motivation fails and what replaces it',
        'my morning routine with the boring parts included', 'how to stop scrolling in 3 steps',
        'the discipline formula nobody explains', 'what 90 days of one habit actually changed',
        'the identity shift behind every real change', 'how to rebuild after falling off completely',
        'the environment design that made focus automatic', 'what I would tell 18-year-old me',
        'the 5-minute rule for starting anything', 'how to stop comparing yourself online',
        'the weekly review that runs my life', 'confidence is a byproduct, not a goal',
        'the hardest year taught me these 3 things', 'stop setting goals, set minimums'
      ],
      offers: [
        { name: 'Free Habit System Template', type: 'Lead magnet', price: 0, gate: 0, promise: 'Converts passive scrollers into an owned audience.', deliver: 'Notion habit OS + weekly review template' },
        { name: 'Discipline Playbook', type: 'Digital product', price: 699, gate: 1000, promise: 'Impulse-priced, emotionally-timed purchase. Sell on Sunday nights.', deliver: 'Ebook + 30-day tracker + audio' },
        { name: 'Accountability Group (monthly)', type: 'Subscription', price: 499, gate: 3000, promise: 'Recurring revenue — the most valuable line in this whole business.', deliver: 'Private group, weekly check-in, monthly call' },
        { name: '1:1 Coaching', type: 'High ticket', price: 15000, gate: 6000, promise: 'Few clients, deep work, strong testimonials that feed everything else.', deliver: '8 sessions over 8 weeks + async support' },
        { name: 'Brand deals — apps & books', type: 'Sponsorship', price: 0, gate: 15000, promise: 'Low CPM niche. Prioritise your own recurring offer instead.', deliver: 'Story series + integrated reel' }
      ],
      hashtags: {
        broad: ['#motivation', '#mindset', '#selfimprovement', '#discipline', '#growth'],
        mid: ['#habits', '#productivity', '#selfdevelopment', '#morningroutine', '#focus', '#personalgrowth', '#mentalstrength'],
        niche: ['#atomichabits', '#disciplineoverMotivation', '#habitbuilding', '#deepwork', '#selfimprovementdaily', '#5amclub', '#stoicmindset', '#growthmindsetdaily']
      },
      visual: 'Cinematic b-roll (walking, desk, gym, city), slow push-ins, muted colour grade, voiceover-first with subtitles, one sentence on screen at a time, silence used deliberately before the key line.',
      brands: ['habit & meditation apps', 'books/audiobooks', 'coffee & supplements', 'journals', 'courses'],
      proof: ['your own documented change', 'client transformations', 'consistency streak on the page itself']
    }
  };

  /* ---------- generic fallback for any custom niche ---------- */
  G.GENERIC = {
    label: 'Custom niche',
    short: 'Custom',
    reach: 1.15, cpm: 1.2, buyRate: 1.0,
    positioning: 'the clearest, most practical voice in {NICHE} for beginners',
    audience: {
      age: '20–35', who: 'beginners and intermediates actively searching for {NICHE} help',
      interests: ['{NICHE} basics', '{NICHE} tools and gear', 'results and case studies', 'common mistakes', 'shortcuts'],
      pains: ['too much contradictory {NICHE} advice online', 'no step-by-step path from zero', 'tried and quit before seeing results', 'cannot tell good {NICHE} advice from bad', 'no time to figure it out alone'],
      desires: ['a visible result within 30 days', 'a plan they can follow without thinking', 'to be respected for their {NICHE} skill', 'to save money and time'],
      objections: ['it will not work for my situation', 'I do not have the money/gear/time', 'I have tried something like this before']
    },
    pillars: [
      { name: 'Beginner how-to', pct: 30, why: 'Biggest addressable audience — most people in any niche are beginners.' },
      { name: 'Myth-busting', pct: 25, why: 'Correcting a belief is the fastest way to earn authority.' },
      { name: 'Proof & results', pct: 20, why: 'What converts followers into buyers.' },
      { name: 'Trend & reaction', pct: 15, why: 'Free reach from demand you did not have to create.' },
      { name: 'Personal story', pct: 10, why: 'Makes you a person, not an account.' }
    ],
    ideas: [
      'the beginner mistakes everyone makes in {NICHE}', 'what I wish I knew before starting {NICHE}',
      'the 5 things that gave me 80% of my {NICHE} results', 'a complete beginner roadmap for {NICHE}',
      '{NICHE} on a budget — what to buy and what to skip', 'the fastest way to get your first result in {NICHE}',
      'the biggest myth in {NICHE}, debunked', 'my exact {NICHE} routine, unedited',
      '30 days of {NICHE} — honest results', 'the tools I actually use for {NICHE}',
      'how to fix the most common {NICHE} problem', '{NICHE} in 60 seconds for complete beginners',
      'why most people quit {NICHE} in week 2', 'the free resources that beat paid {NICHE} courses',
      'answering the questions I get most about {NICHE}', 'a day in my life doing {NICHE}'
    ],
    offers: [
      { name: 'Free starter guide ({NICHE})', type: 'Lead magnet', price: 0, gate: 0, promise: 'Every business starts by turning attention into an owned list.', deliver: '1-page PDF checklist + quick-start steps' },
      { name: 'Beginner ebook / template pack', type: 'Digital product', price: 599, gate: 500, promise: 'Prove willingness to pay before you build anything bigger.', deliver: 'PDF guide + templates' },
      { name: 'Personalised plan / audit', type: 'Productised service', price: 2999, gate: 1500, promise: 'Highest revenue per follower at a small account size.', deliver: 'Intake form + custom plan + 1 revision' },
      { name: '1:1 coaching / done-for-you', type: 'High ticket', price: 15000, gate: 5000, promise: 'The offer that makes this a real business, not a side hustle.', deliver: 'Multi-week engagement with weekly calls' },
      { name: 'Brand partnerships', type: 'Sponsorship', price: 0, gate: 8000, promise: 'Comes last. Sponsor money is rented; product money is owned.', deliver: '1 integrated reel + stories + usage rights' }
    ],
    hashtags: {
      broad: ['#{TAG}', '#reels', '#explorepage', '#viral', '#instagood'],
      mid: ['#{TAG}tips', '#{TAG}forbeginners', '#{TAG}life', '#{TAG}daily', '#{TAG}community', '#learn{TAG}', '#{TAG}india'],
      niche: ['#{TAG}beginner', '#{TAG}hacks', '#{TAG}coach', '#{TAG}journey', '#{TAG}2026', '#{TAG}guide', '#{TAG}basics', '#daily{TAG}']
    },
    visual: 'Bright, high-contrast footage; the payoff visible in frame one; large readable captions; consistent 3-colour palette across every post so the grid reads as one brand.',
    brands: ['tools & gear in {NICHE}', 'apps & software', 'courses & edtech', 'e-commerce brands'],
    proof: ['your own documented results', 'follower wins you can repost', 'process transparency', 'consistency over time']
  };

  /* Resolve the niche object for a profile, filling {NICHE}/{TAG} tokens. */
  G.niche = function (profile) {
    profile = profile || G.store.profile || {};
    const base = G.NICHES[profile.nicheKey];
    if (base) return base;

    const name = (profile.customNiche || 'your niche').trim();
    const tag = name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 14) || 'niche';
    const fill = (s) => String(s).replace(/\{NICHE\}/g, name).replace(/\{TAG\}/g, tag);
    const walk = (v) => Array.isArray(v) ? v.map(walk)
      : (v && typeof v === 'object') ? Object.keys(v).reduce((o, k) => (o[k] = walk(v[k]), o), {})
        : (typeof v === 'string' ? fill(v) : v);

    const out = walk(G.GENERIC);
    out.label = name.replace(/^\w/, (c) => c.toUpperCase());
    out.short = out.label;
    out.custom = true;
    return out;
  };

  /* Human label for the current niche */
  G.nicheName = function (profile) {
    profile = profile || G.store.profile || {};
    return G.NICHES[profile.nicheKey]
      ? G.NICHES[profile.nicheKey].label
      : (profile.customNiche || 'Your niche');
  };
})(window.IGOS);
