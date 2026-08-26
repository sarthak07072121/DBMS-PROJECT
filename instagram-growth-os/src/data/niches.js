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
      category: 'Health & Body',
      aliases: 'gym, workout, weight loss, fat loss, bodybuilding, muscle, calisthenics, personal trainer, home workout, abs, strength, crossfit, running, marathon',
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
      category: 'Money',
      aliases: 'money, investing, stock, stocks, stock market, share market, mutual funds, sip, crypto, bitcoin, trading, tax, savings, budgeting, wealth, insurance, credit card, personal finance, financial freedom',
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
      category: 'Tech',
      aliases: 'ai, artificial intelligence, chatgpt, software, saas, coding, programming, automation, no code, gadgets, apps, productivity tools, prompt engineering, developer',
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
      category: 'Money',
      aliases: 'business, entrepreneur, startup, freelance, freelancing, agency, clients, marketing agency, consulting, side hustle, ecommerce, dropshipping, smma, solopreneur',
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
      category: 'Lifestyle',
      aliases: 'food, cooking, recipes, chef, baking, cakes, restaurant, street food, meal prep, vegan, vegetarian, healthy eating, kitchen, home cook, nutrition recipes',
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
      category: 'Lifestyle',
      aliases: 'fashion, style, outfit, ootd, clothing, streetwear, grooming, menswear, womenswear, thrift, shoes, sneakers, accessories, styling, wardrobe',
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
      category: 'Knowledge',
      aliases: 'study, exam, upsc, jee, neet, cat, gate, student, school, college, placement, resume, interview, career prep, notes, competitive exam, coaching',
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
      category: 'Knowledge',
      aliases: 'self improvement, motivation, discipline, mindset, habits, productivity, focus, confidence, personal growth, stoicism, morning routine, self help, journaling',
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
    },

    beauty: {
      label: 'Beauty & Skincare',
      short: 'Beauty',
      category: 'Lifestyle',
      aliases: 'beauty, skincare, makeup, cosmetics, haircare, nails, acne, glow, grwm, dermatology, self care, salon, hair, skin',
      reach: 1.45, cpm: 1.6, buyRate: 0.9,
      positioning: 'the one who reads the ingredient list so nobody has to waste money on marketing',
      audience: {
        age: '18–34', who: 'students and working women, first-time skincare buyers, acne sufferers',
        interests: ['skincare routines', 'affordable dupes', 'makeup tutorials', 'ingredient science', 'hair care'],
        pains: ['spent thousands on products that did nothing', 'acne that never fully clears', 'no idea which ingredients clash', 'routines built for skin types that are not theirs', 'makeup that looks wrong in daylight'],
        desires: ['clear skin without a 12-step routine', 'looking effortless', 'buying right the first time', 'confidence without makeup'],
        objections: ['my skin is too sensitive', 'that brand is not available here', 'I do not have time for a routine']
      },
      pillars: [
        { name: 'Ingredient education', pct: 30, why: 'The differentiator in a niche full of unexplained recommendations.' },
        { name: 'Routines & tutorials', pct: 25, why: 'Saves engine — people bookmark what they intend to copy.' },
        { name: 'Dupes & budget picks', pct: 20, why: 'Price is the hook. "Under ₹500 that beats the ₹3,000" travels.' },
        { name: 'Before / after', pct: 15, why: 'Proof sells the products and the consultations both.' },
        { name: 'Myth-busting', pct: 10, why: 'Correcting bad beauty advice is fast authority.' }
      ],
      ideas: [
        'the 4-step routine that actually clears acne', 'ingredients you must never layer together',
        'the ₹300 product that outperforms the ₹3,000 one', 'why your sunscreen is pilling',
        'reading a skincare label in 60 seconds', 'a full routine for oily skin in Indian humidity',
        'the makeup base that survives 12 hours', 'what dermatologists actually recommend vs what ads say',
        '30 days of one active — honest before and after', 'the hair fall fix nobody sells you',
        'drugstore dupes for the products on everyone\'s shelf', 'the order to apply everything, finally explained'
      ],
      offers: [
        { name: 'Free skin-type quiz + routine PDF', type: 'Lead magnet', price: 0, gate: 0, promise: 'Segments your audience by skin type, which makes every future offer relevant.', deliver: 'Quiz + 3 routine PDFs' },
        { name: 'Routine builder ebook', type: 'Digital product', price: 499, gate: 800, promise: 'Impulse-priced, solves the single most common question you get.', deliver: 'PDF with routines by skin type and budget' },
        { name: 'Affiliate storefront', type: 'Affiliate', price: 0, gate: 500, promise: 'You are already driving purchases — get paid for them from day one.', deliver: 'Curated links, refreshed monthly' },
        { name: '1:1 skin consultation', type: 'Productised service', price: 2500, gate: 4000, promise: 'High margin, no inventory. Frame as education, never as medical advice.', deliver: '30-min call + written routine plan' },
        { name: 'Brand deals — skincare & cosmetics', type: 'Sponsorship', price: 0, gate: 6000, promise: 'Beauty brands buy at small sizes. Protect trust by refusing what you would not use.', deliver: 'Reel + stories + code' }
      ],
      hashtags: {
        broad: ['#skincare', '#beauty', '#makeup', '#glowup'],
        mid: ['#skincareroutine', '#acnetreatment', '#skincaretips', '#makeuptutorial', '#indianskincare', '#haircare'],
        niche: ['#skincareindia', '#acnejourney', '#oilyskinroutine', '#budgetskincare', '#ingredientfocused', '#skincareforbeginners', '#indianbeauty', '#sunscreendaily']
      },
      visual: 'Soft natural window light, close-up skin texture shots, clean flat-lays on a single-colour surface, on-screen ingredient names, honest unfiltered before/after in the same lighting and angle.',
      brands: ['skincare brands', 'cosmetics', 'haircare', 'derma clinics'],
      proof: ['your own unfiltered progress', 'reader results you can repost', 'ingredient sources you cite']
    },

    travel: {
      label: 'Travel & Places',
      short: 'Travel',
      category: 'Lifestyle',
      aliases: 'travel, trip, tourism, backpacking, solo travel, hotels, flights, itinerary, vanlife, road trip, budget travel, destinations, hiking, adventure',
      reach: 1.50, cpm: 1.3, buyRate: 0.85,
      positioning: 'the one who makes a trip bookable instead of merely beautiful',
      audience: {
        age: '20–38', who: 'first-time travellers, budget backpackers, couples planning a trip, remote workers',
        interests: ['itineraries', 'cheap flights', 'hidden spots', 'solo travel safety', 'stay recommendations'],
        pains: ['beautiful reels with no useful information', 'no idea what a trip actually costs', 'planning takes longer than the trip', 'tourist traps and overpriced stays', 'travelling solo feels unsafe'],
        desires: ['a trip that fits their budget', 'places without the crowd', 'a plan they can copy exactly', 'the confidence to go alone'],
        objections: ['I cannot afford it', 'I do not have leave', 'it is not safe for me']
      },
      pillars: [
        { name: 'Copyable itineraries', pct: 30, why: 'Saves engine. A dreamy shot gets a like; an itinerary gets bookmarked.' },
        { name: 'Real costs', pct: 25, why: 'Nobody publishes honest budgets. Doing it makes you the trusted source.' },
        { name: 'Hidden spots', pct: 20, why: 'Discovery drives shares and tags.' },
        { name: 'Logistics & hacks', pct: 15, why: 'Visa, transport, booking timing — the boring stuff people desperately need.' },
        { name: 'Story & atmosphere', pct: 10, why: 'This is what makes the account feel like a person, not a listing site.' }
      ],
      ideas: [
        '3 days in this city for under ₹8,000, itemised', 'the booking window that halves flight prices',
        'places locals go instead of the famous spot', 'what a week here really costs, receipt by receipt',
        'the packing list after 30 trips', 'solo travel safety rules that actually matter',
        'the visa process, step by step, no agent', 'how to find stays that are not on the booking apps',
        'the mistake that cost me a whole day at the airport', 'best time of year for this place and why',
        'a complete copy-paste itinerary for first-timers', 'transport from the airport without getting scammed'
      ],
      offers: [
        { name: 'Free 3-day itinerary PDF', type: 'Lead magnet', price: 0, gate: 0, promise: 'Travel audiences trade an email for a plan instantly.', deliver: 'PDF itinerary + budget sheet' },
        { name: 'Full itinerary pack', type: 'Digital product', price: 799, gate: 1500, promise: 'You already did the research for your own trip. Sell the artefact.', deliver: 'Day-by-day plan, maps, bookings, budgets' },
        { name: 'Affiliate bookings', type: 'Affiliate', price: 0, gate: 500, promise: 'Hotels and gear pay commission on trips you are already inspiring.', deliver: 'Tracked booking and gear links' },
        { name: 'Trip planning call', type: 'Productised service', price: 3000, gate: 5000, promise: 'One hour of your knowledge is worth more than a hundred saves.', deliver: '45-min call + custom plan doc' },
        { name: 'Hosted group trip', type: 'High ticket', price: 45000, gate: 20000, promise: 'The endgame in travel. Ten people is a real income and a permanent community.', deliver: 'Small-group trip you host and organise' }
      ],
      hashtags: {
        broad: ['#travel', '#wanderlust', '#travelgram', '#explore'],
        mid: ['#budgettravel', '#solotravel', '#travelitinerary', '#traveltips', '#indiatravel', '#backpacking'],
        niche: ['#budgettravelindia', '#solotravelindia', '#itineraryplanner', '#hiddengems', '#offbeattravel', '#travelonabudget', '#weekendgetaway', '#travelhacks']
      },
      visual: 'Wide establishing shot in frame one, movement in every clip, on-screen price and place name at all times, golden-hour grade kept consistent, no drone shot longer than two seconds without information on screen.',
      brands: ['tourism boards', 'hotels & stays', 'luggage & gear', 'travel insurance & forex'],
      proof: ['receipts and real costs', 'unedited footage of the actual stay', 'follower trips you inspired']
    },

    photography: {
      label: 'Photography & Videography',
      short: 'Photography',
      category: 'Creative',
      aliases: 'photography, photographer, camera, lens, dslr, mirrorless, editing, lightroom, portrait, wedding photography, videography, filmmaking, cinematography, mobile photography',
      reach: 1.20, cpm: 1.0, buyRate: 1.15,
      positioning: 'the one who proves the gear mattered less than the decision',
      audience: {
        age: '18–35', who: 'hobbyists with a first camera, phone shooters, aspiring wedding and product shooters',
        interests: ['composition', 'editing presets', 'gear comparisons', 'lighting', 'client work'],
        pains: ['photos look flat compared to what they saw', 'bought expensive gear and improved nothing', 'editing takes hours and still looks off', 'no idea how to price client work', 'cannot get past friends-and-family clients'],
        desires: ['a recognisable personal style', 'paid client work', 'shots that look professional', 'confidence in manual mode'],
        objections: ['my camera is not good enough', 'I only have a phone', 'the market is saturated']
      },
      pillars: [
        { name: 'Before / after edits', pct: 30, why: 'The single highest-retention format in this niche — the reveal does the work.' },
        { name: 'Technique breakdowns', pct: 25, why: 'Composition and light are what people actually lack.' },
        { name: 'Gear reality checks', pct: 20, why: 'High search demand and it positions you as honest rather than sponsored.' },
        { name: 'Client & business', pct: 15, why: 'Where the money is, and where the audience quietly wants to go.' },
        { name: 'Behind the shoot', pct: 10, why: 'Process content builds the trust that books jobs.' }
      ],
      ideas: [
        'the same photo with a ₹80,000 camera and a phone', 'one edit that fixes 90% of flat photos',
        'the light you already have at home, used properly', 'composition rules ranked by how much they matter',
        'my full Lightroom edit in 60 seconds', 'what I charge and how I got there',
        'posing people who hate being photographed', 'the settings I use in every low light situation',
        'a full wedding shoot, start to delivery', 'phone camera settings people never turn on',
        'building a portfolio with no clients yet', 'the gear I regret buying'
      ],
      offers: [
        { name: 'Free preset pack', type: 'Lead magnet', price: 0, gate: 0, promise: 'The single most requested thing in this niche. Trade it for an email.', deliver: '5 presets + install guide' },
        { name: 'Preset / LUT pack', type: 'Digital product', price: 999, gate: 1000, promise: 'Zero marginal cost, permanent income, and it spreads your look.', deliver: '20 presets + video walkthrough' },
        { name: 'Portfolio review', type: 'Productised service', price: 2500, gate: 3000, promise: 'One call, one recording, immediate value.', deliver: '45-min review + written notes' },
        { name: 'Shoot workshop', type: 'High ticket', price: 12000, gate: 8000, promise: 'Small in-person groups price high and generate a month of content.', deliver: 'Full-day hands-on workshop, 8 seats' },
        { name: 'Client photography work', type: 'Service', price: 35000, gate: 2000, promise: 'The account is a portfolio and a lead source. Book the actual work.', deliver: 'Event, wedding or product shoot' }
      ],
      hashtags: {
        broad: ['#photography', '#photographer', '#photooftheday', '#camera'],
        mid: ['#portraitphotography', '#lightroomediting', '#photographytips', '#mobilephotography', '#weddingphotography', '#videography'],
        niche: ['#photographyindia', '#beforeandafteredit', '#lightroompreset', '#naturallightportrait', '#photographybeginner', '#indianweddingphotographer', '#phonephotographytips', '#cinematiclook']
      },
      visual: 'Split-screen before/after with a hard wipe, the final image held on screen for two full seconds, screen recordings of the edit at 2x, your hands and the camera in frame, muted grade so the photos are the brightest thing on screen.',
      brands: ['camera & lens brands', 'editing software', 'memory & storage', 'lighting gear'],
      proof: ['your actual portfolio', 'client galleries', 'raw-to-final comparisons']
    },

    art: {
      label: 'Art & Illustration',
      short: 'Art',
      category: 'Creative',
      aliases: 'art, drawing, painting, sketch, illustration, digital art, procreate, artist, doodle, calligraphy, anime art, portrait drawing, watercolour, crafts art',
      reach: 1.45, cpm: 0.8, buyRate: 0.9,
      positioning: 'the artist who shows the ugly middle stage, not just the finished piece',
      audience: {
        age: '15–30', who: 'self-taught artists, students, hobbyists, aspiring freelance illustrators',
        interests: ['drawing tutorials', 'art supplies', 'digital tools', 'style development', 'commissions'],
        pains: ['art looks wrong and they cannot say why', 'no consistent style', 'comparison with artists who started earlier', 'no idea how to price commissions', 'motivation dies mid-piece'],
        desires: ['a style people recognise', 'getting paid to draw', 'visible improvement', 'finishing what they start'],
        objections: ['I do not have a tablet', 'I cannot draw from imagination', 'nobody would pay for mine']
      },
      pillars: [
        { name: 'Process & timelapse', pct: 30, why: 'Watching something appear is the most hypnotic format on the platform.' },
        { name: 'Technique fixes', pct: 25, why: 'Naming the specific error is what turns viewers into followers.' },
        { name: 'Supplies & tools', pct: 15, why: 'High search demand and easy affiliate revenue.' },
        { name: 'Progress & story', pct: 20, why: 'A year-of-progress post is the most shared thing in this niche.' },
        { name: 'Art business', pct: 10, why: 'Moves an audience of hobbyists toward paying you.' }
      ],
      ideas: [
        'the one fix that makes faces stop looking wrong', 'a full piece start to finish in 45 seconds',
        'cheap supplies that beat the expensive ones', 'how I found my style — the honest version',
        'drawing the same thing 1 year apart', 'the colour rule that changed my work',
        'procreate settings I wish I knew on day one', 'how I price commissions',
        'fixing a piece I nearly threw away', 'anatomy shortcuts that actually hold up',
        'shading explained without theory', 'what I draw when I have no ideas'
      ],
      offers: [
        { name: 'Free brush / practice pack', type: 'Lead magnet', price: 0, gate: 0, promise: 'Artists collect tools. This is the fastest opt-in in the niche.', deliver: 'Brush set + practice sheet PDF' },
        { name: 'Brush pack / procreate set', type: 'Digital product', price: 399, gate: 1000, promise: 'Impulse price, infinite supply, spreads your look through other people\'s work.', deliver: 'Brushes, palettes, install guide' },
        { name: 'Commissions', type: 'Service', price: 3500, gate: 1000, promise: 'The most direct income in art. Open a limited slot count so it stays scarce.', deliver: 'Custom portrait or illustration' },
        { name: 'Beginner drawing course', type: 'Digital product', price: 2499, gate: 5000, promise: 'Your process is the product. Record it once, sell it forever.', deliver: '10 lessons + practice files' },
        { name: 'Prints & merch', type: 'Physical product', price: 799, gate: 10000, promise: 'Only once demand is proven — inventory is where artists lose money.', deliver: 'Print-on-demand, no upfront stock' }
      ],
      hashtags: {
        broad: ['#art', '#drawing', '#artist', '#illustration'],
        mid: ['#digitalart', '#procreate', '#sketchbook', '#arttutorial', '#artistsoninstagram', '#painting'],
        niche: ['#artprocess', '#drawingtips', '#procreateart', '#artprogress', '#selftaughtartist', '#indianartist', '#characterdesign', '#artcommissions']
      },
      visual: 'Overhead fixed camera, timelapse with the reveal held at the end, hands and tool visible, paper or canvas filling the frame, quiet audio so the pencil or brush is audible.',
      brands: ['art supplies', 'tablets & styluses', 'creative software', 'print services'],
      proof: ['your progress over years', 'commission gallery', 'client and buyer reactions']
    },

    music: {
      label: 'Music & Production',
      short: 'Music',
      category: 'Creative',
      aliases: 'music, singing, guitar, piano, producer, music production, beats, fl studio, ableton, mixing, mastering, songwriting, rap, instrument, band, dj',
      reach: 1.35, cpm: 0.9, buyRate: 1.0,
      positioning: 'the one who shows the ten seconds where a track actually becomes good',
      audience: {
        age: '16–32', who: 'bedroom producers, self-taught instrumentalists, singers, aspiring artists',
        interests: ['production tutorials', 'gear and plugins', 'theory made simple', 'covers', 'release strategy'],
        pains: ['tracks sound amateur next to released music', 'finishing nothing', 'theory feels like homework', 'no idea how to get heard', 'mixing that never sits right'],
        desires: ['a release they are proud of', 'their sound recognised', 'playing without thinking', 'an audience that listens'],
        objections: ['I do not have the gear', 'I never learned theory', 'the market is impossible']
      },
      pillars: [
        { name: 'Before / after production', pct: 30, why: 'The A/B is instantly understandable and endlessly rewatchable.' },
        { name: 'Technique in 30 seconds', pct: 25, why: 'One trick, demonstrated, beats any explanation.' },
        { name: 'Theory made practical', pct: 20, why: 'Turns the boring thing into the useful thing.' },
        { name: 'Performance & covers', pct: 15, why: 'Reach — people share music they enjoy, not music they learn from.' },
        { name: 'Artist business', pct: 10, why: 'Release, distribution and money. Nobody teaches this well.' }
      ],
      ideas: [
        'the one plugin move that makes vocals sit', 'this chord progression is in half the songs you love',
        'a beat from nothing in 60 seconds', 'why your mix sounds muddy — and the fix',
        'the cheapest setup that sounds professional', 'how I finish tracks instead of abandoning them',
        'theory you can use tonight, no notation', 'the difference between mixing and mastering, demonstrated',
        'turning a voice memo into a finished song', 'how streaming payouts actually work',
        'the reference track method', 'recording vocals in an untreated room'
      ],
      offers: [
        { name: 'Free sample / preset pack', type: 'Lead magnet', price: 0, gate: 0, promise: 'Producers download packs reflexively. Fastest list build in the niche.', deliver: '20 samples + 5 presets' },
        { name: 'Sample pack / preset bank', type: 'Digital product', price: 799, gate: 1500, promise: 'Made once, sold forever, and it puts your sound in other people\'s tracks.', deliver: 'Full pack with stems and presets' },
        { name: 'Mixing / mastering service', type: 'Service', price: 4000, gate: 2000, promise: 'Steady income from an audience that already trusts your ears.', deliver: 'One track mixed and mastered, 2 revisions' },
        { name: '1:1 production coaching', type: 'High ticket', price: 15000, gate: 6000, promise: 'Small number of serious students, deep results, strong testimonials.', deliver: '6 sessions with project feedback' },
        { name: 'Brand deals — plugins & gear', type: 'Sponsorship', price: 0, gate: 12000, promise: 'Plugin companies pay well and repeat at every release.', deliver: 'Demo reel + discount code' }
      ],
      hashtags: {
        broad: ['#music', '#producer', '#musician', '#singer'],
        mid: ['#musicproduction', '#beatmaker', '#homestudio', '#mixingandmastering', '#songwriting', '#guitarist'],
        niche: ['#bedroomproducer', '#flstudio', '#abletonlive', '#musicproductiontips', '#vocalmixing', '#indianmusician', '#independentartist', '#musictheorytips']
      },
      visual: 'Screen recording of the DAW with the waveform visible, A/B toggle shown on screen, close-ups of hands on the instrument or controller, audio never compressed under music — the sound is the content.',
      brands: ['plugin & software companies', 'audio interfaces & mics', 'instruments', 'distribution platforms'],
      proof: ['your released tracks and streams', 'client mixes A/B', 'student results']
    },

    gaming: {
      label: 'Gaming & Esports',
      short: 'Gaming',
      category: 'Entertainment',
      aliases: 'gaming, gamer, esports, bgmi, pubg, valorant, free fire, minecraft, gta, cod, streaming, twitch, gameplay, mobile gaming, pc build',
      reach: 1.55, cpm: 1.1, buyRate: 0.6,
      positioning: 'the one whose clips teach a skill instead of only showing off',
      audience: {
        age: '14–28', who: 'mobile and PC gamers, aspiring streamers, competitive players',
        interests: ['gameplay clips', 'settings and sensitivity', 'patch meta', 'setups and builds', 'streamer culture'],
        pains: ['stuck at the same rank for months', 'settings copied from pros that feel wrong', 'no idea how to start streaming to nobody', 'device or PC that cannot keep up', 'tilt after losses'],
        desires: ['ranking up visibly', 'clips their friends share', 'a following from playing', 'reaction speed and aim'],
        objections: ['my device is weak', 'I do not have time to grind', 'I am too old to start']
      },
      pillars: [
        { name: 'Skill breakdowns', pct: 30, why: 'A clip that teaches gets saved. A clip that flexes gets scrolled.' },
        { name: 'Highlight clips', pct: 25, why: 'Raw reach. The share driver of the whole niche.' },
        { name: 'Settings & setup', pct: 20, why: 'Enormous search demand and it repeats with every patch.' },
        { name: 'Meta & news', pct: 15, why: 'Free distribution from attention you did not have to create.' },
        { name: 'Personality & story', pct: 10, why: 'Gaming audiences follow people, not gameplay.' }
      ],
      ideas: [
        'the sensitivity setting that fixed my aim', 'this rotation wins you the endgame every time',
        'settings for low-end devices that actually help', 'why you keep losing the 1v1 — frame by frame',
        'the drill that took me up two ranks', 'best loadout after this patch, ranked',
        'a full match with my thinking narrated', 'the mistake 90% of players make in the first minute',
        'my setup and what it actually cost', 'how to start streaming when nobody is watching',
        'reaction time training that is not a myth', 'what pros do differently in the same situation'
      ],
      offers: [
        { name: 'Free settings + sensitivity guide', type: 'Lead magnet', price: 0, gate: 0, promise: 'The most-asked question in gaming, packaged.', deliver: 'PDF settings guide by device' },
        { name: 'Coaching session', type: 'Productised service', price: 999, gate: 3000, promise: 'Ranked players pay to rank up. Screen-share is the whole delivery.', deliver: '1-hour VOD review + drills' },
        { name: 'Discord community', type: 'Subscription', price: 199, gate: 5000, promise: 'Recurring revenue and a squad that shows up to every stream.', deliver: 'Private server, scrims, coaching nights' },
        { name: 'Merch drop', type: 'Physical product', price: 899, gate: 25000, promise: 'Gaming audiences buy identity, not utility. Only once the community exists.', deliver: 'Limited print-on-demand run' },
        { name: 'Brand deals — games & peripherals', type: 'Sponsorship', price: 0, gate: 15000, promise: 'The main revenue line in gaming. Needs scale before it pays properly.', deliver: 'Sponsored gameplay + code' }
      ],
      hashtags: {
        broad: ['#gaming', '#gamer', '#esports', '#gameplay'],
        mid: ['#bgmi', '#valorant', '#mobilegaming', '#gamingclips', '#gamingsetup', '#streamer'],
        niche: ['#bgmitips', '#valoranttips', '#gamingindia', '#ranktips', '#gamingmontage', '#lowendpc', '#sensitivitysettings', '#indiangamer']
      },
      visual: 'Screen capture at full framerate, kill or key moment in frame one, facecam small in the corner, on-screen callouts pointing at the exact input, punchy sound design, cuts on every action.',
      brands: ['game publishers', 'peripherals & phones', 'energy drinks', 'gaming chairs & PCs'],
      proof: ['your rank and stats', 'clip results', 'students who ranked up']
    },

    parenting: {
      label: 'Parenting & Family',
      short: 'Parenting',
      category: 'Lifestyle',
      aliases: 'parenting, mom, dad, baby, toddler, kids, newborn, pregnancy, motherhood, fatherhood, child development, family, momlife, parenting tips',
      reach: 1.40, cpm: 1.3, buyRate: 1.05,
      positioning: 'the parent who says the quiet part out loud and then offers something that works',
      audience: {
        age: '25–42', who: 'new parents, parents of toddlers, working mothers, expecting couples',
        interests: ['sleep and feeding', 'child development', 'activities', 'discipline without shouting', 'mum guilt'],
        pains: ['no sleep and no help', 'guilt about every decision', 'contradictory advice from family and internet', 'screen time battles', 'losing their own identity'],
        desires: ['a child who sleeps', 'calm mornings', 'confidence in their own decisions', 'time that is theirs'],
        objections: ['every child is different', 'that will not work with mine', 'I do not have the time or support']
      },
      pillars: [
        { name: 'Practical solutions', pct: 30, why: 'Exhausted parents save what solves tonight, not what inspires.' },
        { name: 'Relatable truth', pct: 25, why: 'The highest-share format here — parents send these to each other constantly.' },
        { name: 'Development & science', pct: 20, why: 'Authority. It is what separates you from a diary account.' },
        { name: 'Activities & routines', pct: 15, why: 'Screenshot-able, repeatable, endlessly reusable.' },
        { name: 'Parent wellbeing', pct: 10, why: 'The most under-served topic in the niche, and the most emotionally loyal.' }
      ],
      ideas: [
        'the bedtime routine that finally worked', 'what to say instead of shouting',
        'fussy eater fixes that are not bribery', '10 minutes of this replaces an hour of screen time',
        'the developmental reason behind the tantrum', 'what nobody tells you about the first 6 weeks',
        'activities with things already in your house', 'the morning routine that stopped the chaos',
        'how to handle unsolicited advice from family', 'sleep regressions, explained and survived',
        'the thing I got wrong as a first-time parent', 'dividing the invisible work fairly'
      ],
      offers: [
        { name: 'Free routine / sleep guide', type: 'Lead magnet', price: 0, gate: 0, promise: 'Solves the single most desperate problem your audience has.', deliver: 'PDF routine by age' },
        { name: 'Activity pack / printables', type: 'Digital product', price: 399, gate: 1000, promise: 'Low price, instant download, bought at 11pm by an exhausted parent.', deliver: 'Printables, activity cards, schedules' },
        { name: 'Sleep or feeding consult', type: 'Productised service', price: 3000, gate: 4000, promise: 'Parents pay real money for sleep. Stay within your qualifications.', deliver: '45-min call + written plan + follow-up' },
        { name: 'Parenting course', type: 'Digital product', price: 4999, gate: 10000, promise: 'Record once. This audience buys when the pain peaks, which is constantly.', deliver: '8 modules + printables + community' },
        { name: 'Brand deals — baby & family', type: 'Sponsorship', price: 0, gate: 8000, promise: 'Strong category with high trust requirements — never take what you would not use.', deliver: 'Integrated reel + stories' }
      ],
      hashtags: {
        broad: ['#parenting', '#momlife', '#family', '#baby'],
        mid: ['#toddlerlife', '#newmom', '#parentingtips', '#momsofinstagram', '#gentleparenting', '#babysleep'],
        niche: ['#indianmom', '#toddleractivities', '#parentinghacks', '#sleeptraining', '#firsttimemom', '#momguilt', '#positiveparenting', '#workingmom']
      },
      visual: 'Real home settings, no staging, natural light, child faces optional — hands and backs of heads work fine, on-screen text carrying the whole message for mute viewing at 2am, warm soft grade.',
      brands: ['baby care & food', 'toys & learning', 'strollers & gear', 'family services'],
      proof: ['your own children\'s progress', 'parent messages you can repost', 'qualifications if you have them']
    },

    relationships: {
      label: 'Relationships & Dating',
      short: 'Relationships',
      category: 'Knowledge',
      aliases: 'relationships, dating, love, marriage, couple, breakup, attachment, communication, situationship, red flags, boundaries, romance, dating advice',
      reach: 1.55, cpm: 0.9, buyRate: 0.95,
      positioning: 'the one who explains the pattern instead of taking sides',
      audience: {
        age: '20–38', who: 'single people dating, couples in friction, people recovering from a breakup',
        interests: ['communication', 'attachment styles', 'red flags', 'breakup recovery', 'long-term compatibility'],
        pains: ['the same fight on repeat', 'attracting the same wrong person', 'not being able to say what they mean', 'anxiety between texts', 'staying too long in the wrong thing'],
        desires: ['being understood', 'a relationship that feels calm', 'walking away without guilt', 'trusting their own judgement'],
        objections: ['my situation is different', 'they will never change', 'this is just pop psychology']
      },
      pillars: [
        { name: 'Patterns explained', pct: 30, why: 'Naming a pattern someone is living inside is the strongest hook in this niche.' },
        { name: 'Scripts & what to say', pct: 25, why: 'Concrete words to use. This is what gets saved and used the same night.' },
        { name: 'Hard truths', pct: 20, why: 'Highest share rate — people send these instead of saying it themselves.' },
        { name: 'Story & example', pct: 15, why: 'Makes the abstract land.' },
        { name: 'Self-work', pct: 10, why: 'Moves the audience from blaming to acting, which is where your offer lives.' }
      ],
      ideas: [
        'what to say instead of "you never listen"', 'the four behaviours that predict a breakup',
        'why you keep choosing the same person in different bodies', 'attachment styles in 45 seconds, no jargon',
        'the difference between a boundary and an ultimatum', 'how to have the conversation you keep avoiding',
        'green flags nobody talks about', 'texting anxiety and what it is actually telling you',
        'repairing after a fight, step by step', 'when leaving is the healthy choice',
        'the questions to ask before getting serious', 'rebuilding trust after it broke'
      ],
      offers: [
        { name: 'Free conversation scripts', type: 'Lead magnet', price: 0, gate: 0, promise: 'Exact words for the hardest conversations. Extremely high opt-in.', deliver: 'PDF of 10 scripts' },
        { name: 'Workbook / guide', type: 'Digital product', price: 699, gate: 1500, promise: 'Emotional timing sells. People buy at 1am after a fight.', deliver: 'Workbook + exercises + audio' },
        { name: '1:1 coaching session', type: 'Productised service', price: 3500, gate: 4000, promise: 'High willingness to pay. Be explicit that coaching is not therapy.', deliver: '60-min call + action plan' },
        { name: 'Couples course', type: 'Digital product', price: 5999, gate: 12000, promise: 'Two buyers, one purchase. Highest-value product in the niche.', deliver: '6 modules + exercises for two' },
        { name: 'Membership community', type: 'Subscription', price: 599, gate: 15000, promise: 'Recurring, and the community does much of the support work itself.', deliver: 'Group calls + private space' }
      ],
      hashtags: {
        broad: ['#relationships', '#love', '#dating', '#couples'],
        mid: ['#relationshipadvice', '#datingtips', '#attachmentstyles', '#healthyrelationships', '#breakuprecovery', '#communication'],
        niche: ['#relationshipcoach', '#datingadviceforwomen', '#anxiousattachment', '#redflagsindating', '#relationshiptips', '#couplegoalsreal', '#selfworthfirst', '#boundariesmatter']
      },
      visual: 'Direct-to-camera at eye level, one idea per video, plain background so nothing competes with the face, subtitles always, calm pacing — urgency undermines the authority this niche needs.',
      brands: ['dating apps', 'therapy & wellness platforms', 'books', 'journals'],
      proof: ['client outcomes with permission', 'your credentials', 'follower messages describing change']
    },

    mentalhealth: {
      label: 'Mental Health & Emotional Wellbeing',
      short: 'Mental Health',
      category: 'Knowledge',
      aliases: 'mental health, anxiety, depression, therapy, burnout, stress, trauma, healing, emotional health, overthinking, self care mental, psychology, mindfulness',
      reach: 1.40, cpm: 0.9, buyRate: 0.9,
      positioning: 'the one who explains what is happening in the body, not just what to feel',
      audience: {
        age: '18–35', who: 'students and young professionals under pressure, people in therapy or considering it',
        interests: ['anxiety tools', 'burnout', 'nervous system', 'therapy explained', 'boundaries'],
        pains: ['overthinking that will not stop', 'exhausted but cannot rest', 'shame about needing help', 'coping strategies that stopped working', 'no affordable access to therapy'],
        desires: ['a quieter mind', 'understanding why they react that way', 'functioning again', 'not feeling broken'],
        objections: ['therapy is too expensive', 'nothing works for me', 'I should be able to handle this alone']
      },
      pillars: [
        { name: 'Explain the mechanism', pct: 30, why: 'Understanding why the body does this is itself relieving — and it is your authority.' },
        { name: 'Tools you can use now', pct: 25, why: 'One technique, demonstrated, usable in the next five minutes.' },
        { name: 'Validation', pct: 20, why: 'Highest share rate. People send these instead of explaining themselves.' },
        { name: 'Myth correction', pct: 15, why: 'This niche is full of harmful oversimplification. Correcting it earns trust fast.' },
        { name: 'Personal story', pct: 10, why: 'Removes the distance. Share what is healed, not what is raw.' }
      ],
      ideas: [
        'what is actually happening in your body during a panic response', 'the 90-second rule for an emotion',
        'why you are tired after doing nothing', 'grounding that works in public without anyone noticing',
        'burnout is not laziness — here is the difference', 'how to ask for help without over-explaining',
        'the difference between rest and distraction', 'what therapy actually looks like in session one',
        'overthinking at night — the practical fix', 'boundaries when saying no feels impossible',
        'the coping habit that stopped working and why', 'what to say to someone struggling'
      ],
      offers: [
        { name: 'Free coping toolkit', type: 'Lead magnet', price: 0, gate: 0, promise: 'Immediate relief in exchange for an email. Highest opt-in in the niche.', deliver: 'PDF of techniques + audio exercise' },
        { name: 'Workbook / journal', type: 'Digital product', price: 599, gate: 2000, promise: 'Low price, real utility, no clinical claims required.', deliver: 'Printable workbook + prompts' },
        { name: 'Group workshop', type: 'Productised service', price: 999, gate: 5000, promise: 'Scales without inventory and builds community at the same time.', deliver: '90-min live session + recording' },
        { name: 'Therapy / coaching practice', type: 'High ticket', price: 15000, gate: 3000, promise: 'If you are qualified, the account is the best client pipeline you will ever build.', deliver: 'Package of sessions' },
        { name: 'Membership', type: 'Subscription', price: 499, gate: 15000, promise: 'Consistent support, recurring revenue, lower emotional load than 1:1.', deliver: 'Monthly calls + private community' }
      ],
      hashtags: {
        broad: ['#mentalhealth', '#anxiety', '#wellbeing', '#selfcare'],
        mid: ['#mentalhealthawareness', '#anxietyrelief', '#burnoutrecovery', '#therapytools', '#mindfulness', '#emotionalhealth'],
        niche: ['#anxietytips', '#nervoussystemregulation', '#mentalhealthindia', '#therapyexplained', '#overthinkinghelp', '#groundingtechniques', '#burnoutprevention', '#healingjourney']
      },
      visual: 'Calm and slow. Soft light, muted palette, no jump cuts, direct address or gentle b-roll, subtitles always, silence used deliberately. Anything frantic contradicts the message.',
      brands: ['therapy platforms', 'meditation apps', 'journals & books', 'wellness products'],
      proof: ['your qualifications, stated plainly', 'follower messages with permission', 'sources you cite']
    },

    pets: {
      label: 'Pets & Animal Care',
      short: 'Pets',
      category: 'Lifestyle',
      aliases: 'pets, dog, cat, puppy, kitten, pet care, dog training, veterinary, animals, pet food, rescue, dog grooming',
      reach: 1.60, cpm: 1.0, buyRate: 0.7,
      positioning: 'the one whose cute clips quietly teach owners something they were getting wrong',
      audience: {
        age: '18–40', who: 'first-time dog and cat owners, rescuers, people about to get a pet',
        interests: ['training', 'nutrition', 'health signs', 'breed information', 'enrichment'],
        pains: ['destructive behaviour they cannot stop', 'conflicting training advice', 'expensive vet surprises', 'not knowing what is normal', 'guilt about leaving the pet alone'],
        desires: ['a calm well-behaved pet', 'a longer healthier life for them', 'understanding what the animal is saying', 'confidence as an owner'],
        objections: ['my dog is too old to train', 'that breed is different', 'I do not have time for training']
      },
      pillars: [
        { name: 'Training that works', pct: 30, why: 'Cute gets reach; training gets follows. Pair them in the same video.' },
        { name: 'Health & warning signs', pct: 25, why: 'Fear-of-missing-something drives saves and shares to other owners.' },
        { name: 'Cute + informative', pct: 20, why: 'The reach engine. Never post cute without one line of value.' },
        { name: 'Cost & products', pct: 15, why: 'High affiliate potential and genuinely useful.' },
        { name: 'Rescue & story', pct: 10, why: 'The emotional core that turns viewers into a community.' }
      ],
      ideas: [
        'the recall command that actually holds outdoors', 'signs your pet is in pain that owners miss',
        'stop the leash pulling in one week', 'what this behaviour is actually telling you',
        'the ₹200 enrichment that ends destructive chewing', 'human foods that are quietly dangerous',
        'how much a dog really costs per month, itemised', 'separation anxiety, fixed properly',
        'first 48 hours with a rescue', 'grooming at home without the fight',
        'the vet visit checklist nobody gives you', 'why your cat does that, explained'
      ],
      offers: [
        { name: 'Free new-owner checklist', type: 'Lead magnet', price: 0, gate: 0, promise: 'Captures people at the exact moment they get a pet and need everything.', deliver: 'PDF checklist + first-week schedule' },
        { name: 'Training guide', type: 'Digital product', price: 599, gate: 1500, promise: 'Solves the behaviour problem that made them follow you.', deliver: 'PDF + demonstration videos' },
        { name: 'Affiliate product picks', type: 'Affiliate', price: 0, gate: 500, promise: 'Owners buy constantly. You are already recommending — get paid.', deliver: 'Curated gear and food links' },
        { name: '1:1 behaviour consult', type: 'Productised service', price: 2500, gate: 5000, promise: 'Owners at their wits\' end pay quickly. Stay inside your competence.', deliver: '45-min video consult + plan' },
        { name: 'Brand deals — pet food & products', type: 'Sponsorship', price: 0, gate: 10000, promise: 'Loyal category with repeat contracts, and audiences hold you to high standards.', deliver: 'Integrated reel + code' }
      ],
      hashtags: {
        broad: ['#dog', '#cat', '#pets', '#petsofinstagram'],
        mid: ['#dogtraining', '#puppytraining', '#petcare', '#dogsofinstagram', '#catsofinstagram', '#rescuedog'],
        niche: ['#dogtrainingtips', '#indiandogs', '#petcaretips', '#puppyparenting', '#dogbehaviour', '#indiestreetdogs', '#catbehaviour', '#petnutrition']
      },
      visual: 'Get the camera down to animal eye level, natural light, capture real behaviour rather than staged tricks, on-screen text explaining what is happening, keep clips under 3 seconds each.',
      brands: ['pet food', 'toys & accessories', 'vet & insurance services', 'grooming products'],
      proof: ['your own animal\'s progress over time', 'client dogs before and after', 'credentials if you have them']
    },

    homedecor: {
      label: 'Home Decor & Interiors',
      short: 'Home Decor',
      category: 'Lifestyle',
      aliases: 'home decor, interior design, interiors, home makeover, furniture, room makeover, apartment, rental decor, organisation, home styling, house tour, small space',
      reach: 1.45, cpm: 1.4, buyRate: 0.9,
      positioning: 'the one who makes a rented, ordinary space look intentional on a real budget',
      audience: {
        age: '24–42', who: 'renters, first-home buyers, newly married couples, small-space dwellers',
        interests: ['budget makeovers', 'small space solutions', 'organisation', 'furniture sourcing', 'colour and light'],
        pains: ['a space that feels cramped and dark', 'cannot make permanent changes in a rental', 'everything inspiring is unaffordable', 'clutter that returns within a week', 'no idea where to start'],
        desires: ['a home that feels calm', 'a space people compliment', 'more usable room without moving', 'doing it without a designer'],
        objections: ['I am renting', 'my space is too small', 'that costs more than my whole budget']
      },
      pillars: [
        { name: 'Before / after', pct: 30, why: 'The single most watched format in interiors. Lead with the after.' },
        { name: 'Budget sourcing', pct: 25, why: 'Where to buy it and what it cost is the information nobody gives.' },
        { name: 'Small-space fixes', pct: 20, why: 'Most of your audience lives in less space than they want.' },
        { name: 'Renter-safe hacks', pct: 15, why: 'Enormous under-served audience — everything else assumes ownership.' },
        { name: 'Design principles', pct: 10, why: 'Teaches the why, which is what makes people trust you with a paid project.' }
      ],
      ideas: [
        'this room transformed for under ₹15,000, itemised', 'the lighting change that made the room feel twice as big',
        'renter-safe upgrades with zero drilling', 'the 3 mistakes making your space feel cramped',
        'where I actually buy furniture that looks expensive', 'a small bedroom, completely reorganised',
        'the colour rule that fixes a dull room', 'kitchen storage that survived six months',
        'styling a shelf so it does not look cluttered', 'a full home tour with prices on screen',
        'what designers do first in any room', 'the ₹500 change with the biggest impact'
      ],
      offers: [
        { name: 'Free room-planning checklist', type: 'Lead magnet', price: 0, gate: 0, promise: 'Catches people at the start of a project, before they spend anything.', deliver: 'Checklist + budget template' },
        { name: 'Source list / mood board pack', type: 'Digital product', price: 799, gate: 2000, promise: 'Your sourcing knowledge is the product people actually want.', deliver: 'Source list, boards, palettes' },
        { name: 'Affiliate storefront', type: 'Affiliate', price: 0, gate: 1000, promise: 'Every "where is that from" comment is unclaimed commission.', deliver: 'Curated shoppable links' },
        { name: 'E-design consultation', type: 'Productised service', price: 6000, gate: 5000, promise: 'Remote design has no travel cost and scales far past local clients.', deliver: 'Layout, mood board, shopping list' },
        { name: 'Full design project', type: 'High ticket', price: 60000, gate: 8000, promise: 'The account is a portfolio. Two projects a month is a full income.', deliver: 'End-to-end room or home design' }
      ],
      hashtags: {
        broad: ['#homedecor', '#interiordesign', '#home', '#decor'],
        mid: ['#smallspaces', '#budgetdecor', '#rentalfriendly', '#roommakeover', '#homestyling', '#interiors'],
        niche: ['#indianhomedecor', '#budgethomedecor', '#rentalapartment', '#smallapartmentdesign', '#homeorganisation', '#beforeandafterhome', '#indianinteriors', '#diyhomedecor']
      },
      visual: 'Same camera position for before and after, hard cut between them, wide shots that show the whole room, natural daylight, prices on screen for every item, one warm consistent grade across the entire grid.',
      brands: ['furniture & home stores', 'paint brands', 'appliances', 'e-commerce marketplaces'],
      proof: ['your own space over time', 'client project photos', 'itemised real budgets']
    },
    diy: {
      label: 'DIY, Crafts & Making',
      short: 'DIY',
      category: 'Creative',
      aliases: 'diy, craft, crafts, handmade, woodworking, resin, knitting, crochet, sewing, repair, restoration, upcycle, maker, 3d printing, home improvement',
      reach: 1.55, cpm: 1.0, buyRate: 0.8,
      positioning: 'the one who makes a thing look genuinely achievable with what people already own',
      audience: {
        age: '20–45', who: 'weekend hobbyists, people furnishing a first home, small handmade sellers',
        interests: ['step-by-step builds', 'tool basics', 'upcycling', 'selling handmade', 'cheap materials'],
        pains: ['tutorials that skip the hard step', 'projects abandoned halfway', 'expensive tools for one job', 'results that look obviously homemade', 'no space to work'],
        desires: ['making something people admire', 'saving money by doing it themselves', 'a side income from making', 'a skill that is theirs'],
        objections: ['I do not have those tools', 'I have no space', 'mine would never look like that']
      },
      pillars: [
        { name: 'Full builds', pct: 30, why: 'Start-to-finish satisfies completely and gets watched twice.' },
        { name: 'Skill in 30 seconds', pct: 25, why: 'One technique, isolated. This is what gets saved.' },
        { name: 'Tools & materials', pct: 20, why: 'High search intent and natural affiliate revenue.' },
        { name: 'Fails & fixes', pct: 15, why: 'Showing the failure is what makes people believe they can try.' },
        { name: 'Selling handmade', pct: 10, why: 'Moves hobbyists toward the offer you actually sell.' }
      ],
      ideas: [
        'this build cost ₹800 and looks like ₹8,000', 'the joint that stops everything wobbling',
        'tools worth buying vs tools to borrow', 'turning something broken into something better',
        'the finish that separates homemade from handmade', 'a full project with only hand tools',
        'the mistake that ruins resin every time', 'how I price what I make',
        'workspace setup in a rented flat', 'materials from the hardware shop you are ignoring',
        'restoring a piece nobody wanted', 'the beginner project that teaches five skills'
      ],
      offers: [
        { name: 'Free project plan', type: 'Lead magnet', price: 0, gate: 0, promise: 'A plan with measurements is worth an email to anyone who wants to build it.', deliver: 'PDF plan + cut list + materials' },
        { name: 'Plan / pattern pack', type: 'Digital product', price: 499, gate: 1500, promise: 'You already made the thing. The plan costs nothing more to sell.', deliver: 'Plans, patterns, cut lists' },
        { name: 'Affiliate tool picks', type: 'Affiliate', price: 0, gate: 500, promise: 'Every build is a tool recommendation. Get paid for it.', deliver: 'Curated tool and material links' },
        { name: 'Sell what you make', type: 'Physical product', price: 2500, gate: 3000, promise: 'The most direct revenue. Make to order so inventory never traps your cash.', deliver: 'Made-to-order pieces, limited slots' },
        { name: 'Workshop / class', type: 'High ticket', price: 6000, gate: 8000, promise: 'In-person or live online, both price far above a PDF.', deliver: 'Hands-on session, small group' }
      ],
      hashtags: {
        broad: ['#diy', '#handmade', '#craft', '#maker'],
        mid: ['#woodworking', '#diyprojects', '#upcycle', '#craftideas', '#homeimprovement', '#diyhome'],
        niche: ['#diyindia', '#beginnerwoodworking', '#handmadeindia', '#diyfurniture', '#resinart', '#smallspaceworkshop', '#craftbusiness', '#toolsforbeginners']
      },
      visual: 'Overhead and over-shoulder alternating, the finished object in frame one, satisfying process sound kept loud, measurements on screen, hard cuts between stages, no step skipped silently.',
      brands: ['tool brands', 'hardware & materials', 'craft suppliers', 'home improvement retailers'],
      proof: ['the finished pieces', 'customer orders shipped', 'your workspace over time']
    },

    realestate: {
      label: 'Real Estate & Property',
      short: 'Real Estate',
      category: 'Money',
      aliases: 'real estate, property, realtor, housing, rent, buying a home, apartment, flat, land, home loan, mortgage, investment property, broker, builder',
      reach: 1.05, cpm: 1.8, buyRate: 1.2,
      positioning: 'the one who shows the numbers a broker would rather you did not calculate',
      audience: {
        age: '28–48', who: 'first-time buyers, renters weighing a purchase, small property investors, NRIs',
        interests: ['property tours', 'loan and EMI maths', 'locality comparisons', 'rental yield', 'legal checks'],
        pains: ['no idea if a price is fair', 'loan maths they cannot verify', 'fear of legal and title problems', 'brokers with hidden incentives', 'buying at the wrong time'],
        desires: ['owning without being cheated', 'a property that appreciates', 'rental income', 'clarity before committing decades'],
        objections: ['prices are too high right now', 'renting is smarter', 'I do not have the down payment']
      },
      pillars: [
        { name: 'Numbers & maths', pct: 30, why: 'EMI, yield and true cost. The most valuable and least published content in the niche.' },
        { name: 'Property tours', pct: 25, why: 'Reach engine. Always put the price on screen or the tour is entertainment.' },
        { name: 'Legal & process', pct: 20, why: 'Fear-driven saves. Buyers are terrified of what they do not know.' },
        { name: 'Locality intelligence', pct: 15, why: 'Hyper-local knowledge is your unfair advantage over national accounts.' },
        { name: 'Deals & case studies', pct: 10, why: 'Proof that you know what you are talking about — and it generates leads.' }
      ],
      ideas: [
        'the true cost of a ₹50 lakh flat over 20 years', 'rent vs buy, with the actual numbers',
        'this locality in 90 seconds — price, commute, schools', 'the documents to check before paying anything',
        'why the carpet-area difference matters more than the price', 'rental yield ranked across the city',
        'a full tour with the real asking price on screen', 'the negotiation that saved ₹4 lakh',
        'home loan mistakes that cost lakhs in interest', 'what builders do not put in the brochure',
        'the ₹0 checks you can do yourself before a site visit', 'how much down payment you actually need'
      ],
      offers: [
        { name: 'Free buyer checklist', type: 'Lead magnet', price: 0, gate: 0, promise: 'Captures serious buyers at the research stage, months before they transact.', deliver: 'Legal + inspection checklist PDF' },
        { name: 'EMI & yield calculator pack', type: 'Digital product', price: 999, gate: 2000, promise: 'Cheap, useful, and it filters your list down to real buyers.', deliver: 'Sheets + walkthrough video' },
        { name: 'Buyer consultation', type: 'Productised service', price: 5000, gate: 3000, promise: 'One call at a decision worth lakhs is trivially easy to justify.', deliver: '60-min call + shortlist review' },
        { name: 'Brokerage / advisory', type: 'High ticket', price: 150000, gate: 2000, promise: 'One closed transaction dwarfs every other revenue line here.', deliver: 'End-to-end representation on a purchase' },
        { name: 'Developer partnerships', type: 'Sponsorship', price: 0, gate: 15000, promise: 'Pays extremely well. Disclose it every time or you lose the trust that earns it.', deliver: 'Project feature + tour + leads' }
      ],
      hashtags: {
        broad: ['#realestate', '#property', '#home', '#investment'],
        mid: ['#propertyinvestment', '#homebuying', '#realestatetips', '#housetour', '#homeloan', '#rentalproperty'],
        niche: ['#realestateindia', '#propertyindia', '#firsttimehomebuyer', '#emicalculator', '#rentvsbuy', '#realestateinvesting', '#propertytour', '#homeloantips']
      },
      visual: 'Steady walking tour shots, price and carpet area permanently on screen, wide angle without distortion, natural light, calculations shown as clean full-screen graphics, credible pacing over hype.',
      brands: ['developers', 'home loan providers', 'furnishing brands', 'legal & valuation services'],
      proof: ['transactions you closed', 'client testimonials', 'your licence and track record']
    },

    automotive: {
      label: 'Cars, Bikes & Automotive',
      short: 'Automotive',
      category: 'Entertainment',
      aliases: 'cars, car, bike, motorcycle, automotive, auto, driving, ev, electric vehicle, car review, modification, road test, mechanic, car care, scooter',
      reach: 1.40, cpm: 1.4, buyRate: 0.8,
      positioning: 'the one who tells you what to buy for your actual budget and use, not what is exciting',
      audience: {
        age: '20–40', who: 'first-time buyers, enthusiasts, commuters comparing options, EV-curious',
        interests: ['reviews and comparisons', 'ownership costs', 'modifications', 'maintenance', 'new launches'],
        pains: ['reviews that never mention running costs', 'dealer pressure and hidden charges', 'no idea what a used vehicle is worth', 'service centre overcharging', 'choosing between two similar options'],
        desires: ['buying the right one first time', 'lower running costs', 'a vehicle that holds value', 'confidence at the service centre'],
        objections: ['it is out of my budget', 'resale is bad on that one', 'EV charging is not practical for me']
      },
      pillars: [
        { name: 'Honest reviews', pct: 30, why: 'The whole niche is sponsored. Being unsponsored is the position.' },
        { name: 'Ownership cost maths', pct: 25, why: 'Nobody publishes 5-year cost. Doing it makes you the reference.' },
        { name: 'Comparisons', pct: 20, why: 'Highest search intent — people compare exactly two options before buying.' },
        { name: 'Maintenance & care', pct: 15, why: 'Evergreen saves and it keeps existing owners following you.' },
        { name: 'Drives & culture', pct: 10, why: 'Reach and personality. Where the enthusiasm lives.' }
      ],
      ideas: [
        'the 5-year cost of owning this, itemised', 'these two cars, same budget — which one and why',
        'the hidden charges on your on-road price', 'what to check before buying used',
        'EV vs petrol with the real maths for your commute', 'service centre upsells to refuse',
        'the mileage figure nobody actually gets', 'modifications worth doing and ones that kill resale',
        'a full honest review with the flaws first', 'what ₹8 lakh actually buys you right now',
        'monsoon and summer care that prevents big bills', 'why the resale on this one is so poor'
      ],
      offers: [
        { name: 'Free buying checklist', type: 'Lead magnet', price: 0, gate: 0, promise: 'People about to spend lakhs will absolutely give you an email.', deliver: 'PDF checklist + cost calculator' },
        { name: 'Ownership cost calculator', type: 'Digital product', price: 499, gate: 2000, promise: 'Simple tool, real utility, filters serious buyers.', deliver: 'Sheet + guide' },
        { name: 'Buying consultation', type: 'Productised service', price: 2500, gate: 5000, promise: 'One call before a lakhs-level purchase pays for itself instantly.', deliver: '45-min call + shortlist + negotiation notes' },
        { name: 'Affiliate & dealer referrals', type: 'Affiliate', price: 0, gate: 3000, promise: 'Accessories, insurance and dealer referrals all pay. Disclose every one.', deliver: 'Tracked links and referrals' },
        { name: 'Brand deals — manufacturers & accessories', type: 'Sponsorship', price: 0, gate: 20000, promise: 'The dominant revenue line, but it is exactly what erodes the trust you built.', deliver: 'Review + drive feature' }
      ],
      hashtags: {
        broad: ['#cars', '#bikes', '#automotive', '#car'],
        mid: ['#carreview', '#bikelife', '#electricvehicle', '#carsofinstagram', '#automobile', '#motorcycle'],
        niche: ['#carsindia', '#bikesindia', '#carbuyingtips', '#evindia', '#usedcartips', '#carmaintenance', '#carcomparison', '#ownershipcost']
      },
      visual: 'Rolling shots and static walkarounds, engine and exhaust audio kept prominent, price and variant permanently on screen, one honest flaw shown on camera every review, cool neutral grade.',
      brands: ['manufacturers', 'accessories & tyres', 'insurance', 'car care products'],
      proof: ['long-term ownership of what you review', 'real bills and service invoices', 'disclosed sponsorships']
    },

    sports: {
      label: 'Sports & Athletic Skill',
      short: 'Sports',
      category: 'Health & Body',
      aliases: 'sports, football, soccer, cricket, basketball, badminton, tennis, athlete, coaching, skills, training drills, boxing, mma, swimming, athletics',
      reach: 1.45, cpm: 1.2, buyRate: 0.8,
      positioning: 'the coach who breaks a skill down slowly enough that it is actually copyable',
      audience: {
        age: '14–30', who: 'school and club players, weekend amateurs, aspiring competitive athletes',
        interests: ['skill drills', 'match analysis', 'conditioning', 'gear', 'pro technique'],
        pains: ['plateaued despite practising', 'no coach or structured plan', 'injuries that keep returning', 'not being selected', 'technique copied wrong from clips'],
        desires: ['a skill that works under pressure', 'selection', 'moving like the players they watch', 'staying injury-free'],
        objections: ['I have no proper facility', 'I started too late', 'I do not have anyone to train with']
      },
      pillars: [
        { name: 'Drills to copy', pct: 30, why: 'Copyable is the whole promise. Solo drills perform best — most viewers train alone.' },
        { name: 'Technique breakdown', pct: 25, why: 'Slow motion plus annotation is the format that builds authority fastest.' },
        { name: 'Conditioning & injury', pct: 20, why: 'The part that quietly decides careers and that nobody covers well.' },
        { name: 'Match analysis', pct: 15, why: 'Rides existing attention around games people already watched.' },
        { name: 'Journey & mindset', pct: 10, why: 'Turns a drill account into someone people follow.' }
      ],
      ideas: [
        'the drill that fixed my first touch in two weeks', 'this technique in slow motion, annotated',
        'training alone with no equipment', 'the warm-up that prevented my recurring injury',
        'why your shot lacks power — it is not your arm', 'what the pro does differently in the same moment',
        'a full solo session you can copy today', 'the footwork nobody teaches beginners',
        'conditioning for people with 20 minutes', 'gear that matters and gear that does not',
        'the mental routine before a match', 'getting selected: what coaches actually watch for'
      ],
      offers: [
        { name: 'Free drill pack', type: 'Lead magnet', price: 0, gate: 0, promise: 'A week of solo drills for an email. Very high opt-in with young athletes.', deliver: 'PDF + demo videos' },
        { name: 'Training program', type: 'Digital product', price: 999, gate: 2000, promise: 'Structure is what they lack. Sell the plan, not the motivation.', deliver: '8-week program with video library' },
        { name: 'Video technique analysis', type: 'Productised service', price: 1500, gate: 4000, promise: 'They send a clip, you annotate it. Fully asynchronous and scalable.', deliver: 'Annotated video breakdown + drills' },
        { name: '1:1 or small-group coaching', type: 'High ticket', price: 12000, gate: 5000, promise: 'In person or online, this is where the real income sits.', deliver: 'Monthly coaching block' },
        { name: 'Brand deals — sportswear & gear', type: 'Sponsorship', price: 0, gate: 15000, promise: 'Good category, and product seeding starts far earlier than cash deals.', deliver: 'Training reel + code' }
      ],
      hashtags: {
        broad: ['#sports', '#football', '#cricket', '#athlete'],
        mid: ['#footballskills', '#crickettraining', '#basketballtraining', '#sportstraining', '#athletetraining', '#drills'],
        niche: ['#footballdrills', '#cricketcoaching', '#solotraining', '#skilldevelopment', '#sportsindia', '#injuryprevention', '#youthathlete', '#techniquebreakdown']
      },
      visual: 'Shoot from the angle that shows the mechanic, slow motion on the key frame, annotation arrows and freeze frames, real pitch or court sound, repeat the movement three times before explaining it.',
      brands: ['sportswear & footwear', 'equipment', 'sports nutrition', 'academies & leagues'],
      proof: ['your own playing level', 'athletes you have coached', 'before/after technique clips']
    },

    comedy: {
      label: 'Comedy & Entertainment',
      short: 'Comedy',
      category: 'Entertainment',
      aliases: 'comedy, funny, memes, skits, standup, humour, humor, entertainment, satire, parody, relatable, sketch, prank, roast',
      reach: 1.70, cpm: 0.9, buyRate: 0.5,
      positioning: 'the one whose jokes are about a life the audience is actually living',
      audience: {
        age: '16–35', who: 'a broad general audience, students, young professionals who share content in group chats',
        interests: ['relatable situations', 'observational humour', 'trends and formats', 'characters', 'topical jokes'],
        pains: ['a boring feed', 'a day that needs breaking up', 'situations they cannot say out loud themselves'],
        desires: ['a genuine laugh', 'something to send to friends', 'feeling seen in a ridiculous moment'],
        objections: ['seen this format already', 'it went on too long']
      },
      pillars: [
        { name: 'Relatable situations', pct: 35, why: 'Recognition is the share trigger. "This is literally you" is the entire business.' },
        { name: 'Characters', pct: 20, why: 'A recurring character is the only durable asset in comedy — it makes people follow, not just laugh.' },
        { name: 'Trend formats', pct: 20, why: 'Free distribution. Take the format, change the content.' },
        { name: 'Topical & observational', pct: 15, why: 'Timely reach, but it dates fast — never build the whole account on it.' },
        { name: 'Behind the scenes', pct: 10, why: 'Turns a joke account into a person people follow.' }
      ],
      ideas: [
        'the group chat when someone suggests splitting the bill', 'every Indian parent on a phone call',
        'the meeting that should have been an email, dramatised', 'types of people in every gym',
        'when the WiFi goes down at the worst moment', 'the friend who is always "5 minutes away"',
        'first day at work vs six months in', 'how everyone acts during a power cut',
        'the interview question everyone lies about', 'ordering food with an indecisive group',
        'the relative who asks about marriage at every function', 'monday morning versus friday evening, same person'
      ],
      offers: [
        { name: 'Brand collaborations', type: 'Sponsorship', price: 0, gate: 10000, promise: 'The main revenue line in comedy, and it comes earlier here than in most niches.', deliver: 'Branded skit with product woven in' },
        { name: 'Merch', type: 'Physical product', price: 799, gate: 30000, promise: 'Catchphrases become merch. Only once a phrase has genuinely stuck.', deliver: 'Print-on-demand tees and prints' },
        { name: 'Live shows & tickets', type: 'High ticket', price: 499, gate: 25000, promise: 'The highest-margin path for comedy, and the audience is already yours.', deliver: 'Ticketed live performance' },
        { name: 'Content writing for brands', type: 'Service', price: 25000, gate: 5000, promise: 'Brands pay for the skill, not just the audience. Works far below 10K followers.', deliver: 'Scripted content for a brand\'s channels' },
        { name: 'Paid community / extras', type: 'Subscription', price: 199, gate: 50000, promise: 'Only for a deeply attached audience — comedy fans follow widely and commit rarely.', deliver: 'Unreleased sketches, early access' }
      ],
      hashtags: {
        broad: ['#comedy', '#funny', '#memes', '#relatable'],
        mid: ['#comedyreels', '#indiancomedy', '#skits', '#funnyvideos', '#standupcomedy', '#humour'],
        niche: ['#relatablecontent', '#desicomedy', '#officehumour', '#collegelifehumour', '#indianparents', '#sketchcomedy', '#comedyindia', '#dailyrelatable']
      },
      visual: 'Punchline in the first three seconds, hard cuts with no dead air, one costume or prop per character so switches read instantly, clear audio above everything, captions for mute viewing, under 30 seconds.',
      brands: ['consumer apps', 'FMCG', 'telecom & fintech', 'entertainment platforms'],
      proof: ['share counts', 'recurring character recognition', 'brand work you have done']
    },

    spirituality: {
      label: 'Spirituality & Astrology',
      short: 'Spirituality',
      category: 'Knowledge',
      aliases: 'spirituality, astrology, tarot, meditation, manifestation, horoscope, zodiac, numerology, vedic, chakra, energy, mindfulness spiritual, healing spiritual, law of attraction',
      reach: 1.50, cpm: 0.8, buyRate: 1.0,
      positioning: 'the one who offers a practice, not a prediction',
      audience: {
        age: '20–40', who: 'people in transition — new job, breakup, move, loss — seeking meaning and structure',
        interests: ['daily practice', 'astrology readings', 'meditation', 'manifestation', 'symbolism'],
        pains: ['feeling directionless', 'anxiety about the future', 'practices started and abandoned', 'scepticism from people around them', 'overwhelmed by conflicting systems'],
        desires: ['calm and clarity', 'a sense of direction', 'a daily practice that sticks', 'trusting their intuition'],
        objections: ['I do not believe in this', 'I do not have time to meditate', 'it feels self-indulgent']
      },
      pillars: [
        { name: 'Daily practice', pct: 30, why: 'A practice they can do tonight beats a philosophy they cannot use.' },
        { name: 'Readings & interpretation', pct: 25, why: 'The reach engine. Collective readings pull enormous non-follower traffic.' },
        { name: 'Explain the system', pct: 20, why: 'Teaching the framework builds credibility beyond prediction.' },
        { name: 'Reflection & story', pct: 15, why: 'The emotional core that turns viewers into a community.' },
        { name: 'Grounded scepticism', pct: 10, why: 'Acknowledging limits is what makes the rest believable.' }
      ],
      ideas: [
        'the 5-minute practice for a chaotic morning', 'your chart\'s first house, explained simply',
        'what this card actually means in context', 'manifestation without the magical thinking',
        'a breathing practice that works in public', 'the difference between intuition and anxiety',
        'reading for the collective this week', 'grounding when everything feels unstable',
        'the ritual I do before any big decision', 'what the moon phase practically means for planning',
        'starting a practice when you are sceptical', 'journalling prompts for a hard week'
      ],
      offers: [
        { name: 'Free practice guide', type: 'Lead magnet', price: 0, gate: 0, promise: 'A gentle, immediately usable practice in exchange for an email.', deliver: 'PDF + guided audio' },
        { name: 'Guided audio / meditation pack', type: 'Digital product', price: 499, gate: 1500, promise: 'Recorded once, delivered forever, and it becomes part of their routine.', deliver: 'Audio set + practice calendar' },
        { name: '1:1 reading or session', type: 'Productised service', price: 2500, gate: 2000, promise: 'The core income here, and it starts working at a very small size.', deliver: '45-min personal session + recording' },
        { name: 'Course or cohort', type: 'High ticket', price: 8000, gate: 10000, promise: 'Teach the system instead of only performing it — far more scalable.', deliver: '4-week live course + materials' },
        { name: 'Membership circle', type: 'Subscription', price: 399, gate: 12000, promise: 'Recurring revenue and a community that sustains itself between your posts.', deliver: 'Monthly circle, readings, practice space' }
      ],
      hashtags: {
        broad: ['#spirituality', '#astrology', '#meditation', '#mindfulness'],
        mid: ['#tarotreading', '#manifestation', '#zodiacsigns', '#spiritualjourney', '#dailypractice', '#numerology'],
        niche: ['#vedicastrology', '#tarotcommunity', '#meditationpractice', '#spiritualindia', '#moonphases', '#journalprompts', '#innerwork', '#astrologyreadings']
      },
      visual: 'Warm low light, candle and natural textures, slow deliberate movement, handwriting and physical objects on camera, calm voice with space between sentences, no urgency and no countdown timers.',
      brands: ['wellness products', 'meditation apps', 'books & decks', 'retreats'],
      proof: ['client sessions with permission', 'your own documented practice', 'how long you have studied']
    },

    books: {
      label: 'Books & Reading',
      short: 'Books',
      category: 'Knowledge',
      aliases: 'books, reading, bookstagram, literature, novels, book review, book recommendations, authors, writing, poetry, fiction, non fiction, reader',
      reach: 1.25, cpm: 0.7, buyRate: 0.7,
      positioning: 'the one whose recommendation is worth more than a rating out of five',
      audience: {
        age: '18–40', who: 'readers rebuilding a habit, students, people who want to read more but do not',
        interests: ['recommendations', 'summaries and ideas', 'reading habits', 'author deep-dives', 'aesthetic shelves'],
        pains: ['a reading slump that will not break', 'buying books they never finish', 'no idea what to read next', 'no time to read', 'forgetting everything they read'],
        desires: ['finishing books again', 'a shelf that means something', 'ideas they can actually use', 'being someone who reads'],
        objections: ['I have no time', 'I cannot focus on a book anymore', 'books are expensive']
      },
      pillars: [
        { name: 'Recommendations with a reason', pct: 30, why: '"Read this if you feel X" outperforms any list of titles.' },
        { name: 'Ideas from the book', pct: 25, why: 'Deliver the value, not the summary. This is what gets saved.' },
        { name: 'Reading habit', pct: 20, why: 'The real problem your audience has is not what to read, it is reading at all.' },
        { name: 'Aesthetic & shelf', pct: 15, why: 'The reach engine of bookstagram. Beautiful, but it does not build authority alone.' },
        { name: 'Author & industry', pct: 10, why: 'Depth that separates you from an account posting covers.' }
      ],
      ideas: [
        'read this if you are in a slump', 'the one idea from this book worth the whole read',
        'how I went from 2 books a year to 30', 'books that are actually short — start here',
        'the note system that made me remember what I read', 'a book for each mood, ranked',
        'why you keep abandoning books at page 40', 'the classic that is genuinely worth it',
        'building a shelf on a student budget', 'fiction that changed how I think',
        'reading when you have 15 minutes a day', 'the book everyone recommends that I disagree with'
      ],
      offers: [
        { name: 'Free reading list / tracker', type: 'Lead magnet', price: 0, gate: 0, promise: 'Readers love a system. The tracker is the easiest opt-in in the niche.', deliver: 'Notion tracker + curated list' },
        { name: 'Reading guide / notes pack', type: 'Digital product', price: 399, gate: 2000, promise: 'Low price, real utility, and it suits a student wallet.', deliver: 'Summaries, notes template, curated lists' },
        { name: 'Affiliate book links', type: 'Affiliate', price: 0, gate: 500, promise: 'You are already driving purchases. Small commissions, but constant.', deliver: 'Tracked links to every recommendation' },
        { name: 'Book club membership', type: 'Subscription', price: 299, gate: 8000, promise: 'Recurring revenue and the community carries most of the activity.', deliver: 'Monthly pick, discussion, live call' },
        { name: 'Publisher partnerships', type: 'Sponsorship', price: 0, gate: 15000, promise: 'Modest fees, but early copies and access cost publishers nothing.', deliver: 'Featured review + giveaway' }
      ],
      hashtags: {
        broad: ['#books', '#reading', '#bookstagram', '#booklover'],
        mid: ['#bookrecommendations', '#bookreview', '#currentlyreading', '#booksofinstagram', '#readingchallenge', '#bookshelf'],
        niche: ['#bookstagramindia', '#readingslump', '#booksummary', '#indianauthors', '#readmorebooks', '#bookrecsforyou', '#annualreadingchallenge', '#readinghabit']
      },
      visual: 'Natural light on the physical book, hands turning pages, one quote on screen at a time held long enough to read, warm paper-toned grade, quiet audio, no rushed cuts — the pace should feel like reading.',
      brands: ['publishers', 'e-readers & audiobooks', 'stationery', 'bookstores'],
      proof: ['your genuine reading record', 'annotated copies', 'follower reading streaks']
    },

    language: {
      label: 'Language Learning',
      short: 'Language',
      category: 'Knowledge',
      aliases: 'language, english, spoken english, ielts, french, spanish, german, japanese, korean, language learning, grammar, vocabulary, accent, fluency, translation',
      reach: 1.30, cpm: 1.1, buyRate: 1.2,
      positioning: 'the one who gets people speaking badly on day one instead of studying silently for a year',
      audience: {
        age: '16–35', who: 'job seekers needing English, exam candidates, hobby learners, people relocating',
        interests: ['everyday phrases', 'pronunciation', 'grammar shortcuts', 'exam prep', 'immersion methods'],
        pains: ['understand it but cannot speak it', 'embarrassed by mistakes in front of others', 'years of study with no fluency', 'grammar rules that never transfer to conversation', 'no one to practise with'],
        desires: ['speaking without translating in their head', 'a job that requires the language', 'sounding natural', 'confidence in a room'],
        objections: ['I am too old to learn', 'I have no one to practise with', 'my accent is too strong']
      },
      pillars: [
        { name: 'Use it today', pct: 30, why: 'One phrase, used in a real situation. Immediately valuable, endlessly repeatable.' },
        { name: 'Common mistakes', pct: 25, why: 'Recognition drives shares — every learner makes the same errors.' },
        { name: 'Pronunciation', pct: 20, why: 'The most requested and hardest to self-diagnose. Video is the perfect medium.' },
        { name: 'Method & habit', pct: 15, why: 'How to learn beats what to learn, and it sells your program.' },
        { name: 'Culture & context', pct: 10, why: 'Why a phrase lands or does not — the part textbooks never explain.' }
      ],
      ideas: [
        'say this instead — it sounds natural', 'the mistake almost every learner makes with this word',
        'the 10 phrases that cover most conversations', 'pronunciation fix in 20 seconds',
        'how to think in the language instead of translating', 'grammar rule you can ignore entirely',
        'a real conversation broken down line by line', 'what to say when you do not understand',
        'the 15-minute daily routine that got me fluent', 'formal vs casual — when to use which',
        'the exam mistake that costs the most marks', 'practising alone when you have no partner'
      ],
      offers: [
        { name: 'Free phrase pack + audio', type: 'Lead magnet', price: 0, gate: 0, promise: 'Instantly usable, and audio makes it feel like a real product.', deliver: '50 phrases + native audio' },
        { name: 'Course / phrasebook', type: 'Digital product', price: 1499, gate: 2000, promise: 'Language learners buy readily — the pain is career-shaped, not hobby-shaped.', deliver: 'Video lessons + audio + workbook' },
        { name: 'Speaking practice sessions', type: 'Productised service', price: 1200, gate: 3000, promise: 'The one thing they cannot get free anywhere. Recurring by nature.', deliver: '45-min 1:1 conversation + corrections' },
        { name: 'Exam prep intensive', type: 'High ticket', price: 12000, gate: 8000, promise: 'Deadline-driven and high-stakes — the strongest willingness to pay in this niche.', deliver: '6-week batch with mocks and feedback' },
        { name: 'Brand deals — edtech & apps', type: 'Sponsorship', price: 0, gate: 15000, promise: 'Language apps spend heavily, but never promote one that competes with your own course.', deliver: 'Integrated lesson + code' }
      ],
      hashtags: {
        broad: ['#language', '#english', '#learning', '#languagelearning'],
        mid: ['#spokenenglish', '#englishspeaking', '#ielts', '#vocabulary', '#pronunciation', '#learnenglish'],
        niche: ['#englishspeakingpractice', '#spokenenglishindia', '#ieltspreparation', '#englishgrammartips', '#dailyvocabulary', '#languagelearningtips', '#speakfluently', '#accenttraining']
      },
      visual: 'Text on screen for every single phrase, clear front-facing audio, mouth visible for pronunciation shots, slow repetition twice, colour-coded correct versus incorrect, no background music under speech.',
      brands: ['edtech & language apps', 'test prep', 'study abroad services', 'headphones'],
      proof: ['learner audio before and after', 'exam scores achieved', 'your own qualifications']
    },

    career: {
      label: 'Career & Corporate Life',
      short: 'Career',
      category: 'Money',
      aliases: 'career, job, corporate, linkedin, resume, interview, salary, promotion, workplace, hr, recruiter, job search, office, professional, negotiation',
      reach: 1.15, cpm: 1.5, buyRate: 1.3,
      positioning: 'the one who says what actually happens inside the hiring room',
      audience: {
        age: '22–40', who: 'job seekers, early-career professionals, people stuck at one level, career switchers',
        interests: ['resume and LinkedIn', 'interviews', 'salary negotiation', 'promotions', 'office politics'],
        pains: ['applications that vanish without a reply', 'underpaid and unsure how to ask', 'passed over for promotion repeatedly', 'no idea how decisions are really made', 'stuck in a role with no growth'],
        desires: ['a better offer', 'being paid what they are worth', 'a title that opens doors', 'work that is not draining'],
        objections: ['my industry does not work that way', 'I do not have the right degree', 'negotiating will cost me the offer']
      },
      pillars: [
        { name: 'Insider mechanics', pct: 30, why: 'What actually happens behind the process. The highest-value content you can publish.' },
        { name: 'Scripts & templates', pct: 25, why: 'Exact words for the email, the negotiation, the review. Saved and used immediately.' },
        { name: 'Resume & profile', pct: 20, why: 'Enormous search volume and the easiest thing to convert into a paid review.' },
        { name: 'Career strategy', pct: 15, why: 'Long-horizon thinking that separates you from tip accounts.' },
        { name: 'Workplace reality', pct: 10, why: 'Relatable reach that brings in people who were not searching for advice.' }
      ],
      ideas: [
        'what recruiters do in the first 7 seconds of your resume', 'the exact words to negotiate salary',
        'why your applications get no reply', 'answer "tell me about yourself" in 60 seconds',
        'the LinkedIn headline that gets recruiters messaging you', 'how promotion decisions are actually made',
        'the email that gets your manager to act', 'switching industries without starting from zero',
        'what to say when asked your expected salary', 'red flags in an interview — from the candidate\'s side',
        'the performance review prep nobody does', 'building a case for a raise with evidence'
      ],
      offers: [
        { name: 'Free resume template + checklist', type: 'Lead magnet', price: 0, gate: 0, promise: 'The single most requested thing in this niche. Enormous opt-in rate.', deliver: 'ATS-safe template + checklist' },
        { name: 'Interview / negotiation toolkit', type: 'Digital product', price: 1299, gate: 1000, promise: 'A ₹1,299 product that adds lakhs to a salary is an easy decision.', deliver: 'Scripts, frameworks, question bank' },
        { name: 'Resume review + mock interview', type: 'Productised service', price: 3500, gate: 2000, promise: 'High willingness to pay, no delivery overhead, immediate testimonials.', deliver: 'Line-by-line review + 45-min mock' },
        { name: 'Career coaching package', type: 'High ticket', price: 25000, gate: 6000, promise: 'A handful of clients is a full income, and the results are dramatic and quotable.', deliver: '6 sessions across 3 months' },
        { name: 'Corporate workshops', type: 'High ticket', price: 60000, gate: 10000, promise: 'Companies have budgets individuals do not. One booking beats a month of products.', deliver: 'Half-day workshop for a company team' }
      ],
      hashtags: {
        broad: ['#career', '#job', '#work', '#professional'],
        mid: ['#careeradvice', '#jobsearch', '#resumetips', '#interviewtips', '#linkedintips', '#salarynegotiation'],
        niche: ['#careeradviceindia', '#jobsearchtips', '#atsresume', '#interviewpreparation', '#careergrowth', '#workplacetips', '#promotiontips', '#careerswitch']
      },
      visual: 'Clean and professional without being corporate-stock. Screen recordings of real documents with names blurred, side-by-side before/after of a resume line, calm confident delivery, restrained neutral palette.',
      brands: ['job platforms', 'edtech & certifications', 'resume tools', 'corporate SaaS'],
      proof: ['offers your clients received', 'your own hiring or recruiting experience', 'salary increases with numbers']
    },

    wellness: {
      label: 'Wellness, Yoga & Holistic Health',
      short: 'Wellness',
      category: 'Health & Body',
      aliases: 'wellness, yoga, holistic health, ayurveda, nutrition, sleep, gut health, hormones, pilates, stretching, breathwork, women health, detox, immunity',
      reach: 1.35, cpm: 1.2, buyRate: 1.1,
      positioning: 'the one who separates what is evidence-backed from what is merely ancient or merely trendy',
      audience: {
        age: '24–45', who: 'people with desk-job bodies, women tracking hormonal health, anyone recovering from burnout',
        interests: ['mobility and yoga', 'sleep', 'gut and hormone health', 'nutrition basics', 'stress'],
        pains: ['constantly tired despite sleeping', 'back and neck pain from sitting', 'bloating and digestion nobody explains', 'wellness advice that contradicts itself', 'no time for a two-hour routine'],
        desires: ['energy through the whole day', 'a body that does not hurt', 'sleeping properly', 'feeling in control of their health'],
        objections: ['I have no time', 'I am not flexible', 'that sounds like pseudoscience']
      },
      pillars: [
        { name: 'Do it with me', pct: 30, why: 'Follow-along content gets saved and repeated — repetition is retention.' },
        { name: 'Explain the mechanism', pct: 25, why: 'Why the body does this. It is what separates you from wellness noise.' },
        { name: 'Evidence vs myth', pct: 20, why: 'This niche is drowning in claims. Sorting them is the position.' },
        { name: 'Routines for real lives', pct: 15, why: 'Ten minutes at a desk beats a perfect routine nobody does.' },
        { name: 'Personal practice', pct: 10, why: 'Consistency shown over months is the proof.' }
      ],
      ideas: [
        '5 minutes that undo eight hours of sitting', 'why you are tired after a full night of sleep',
        'the stretch order that finally fixed my lower back', 'gut health without buying a single supplement',
        'what actually helps bloating, and what does not', 'a 10-minute morning routine at your desk',
        'the sleep change with the biggest measurable effect', 'ayurveda claims: what holds up and what does not',
        'breathwork you can do in a meeting', 'hormonal health basics nobody explained',
        'building flexibility when you are not flexible', 'the supplement tier list — evidence ranked'
      ],
      offers: [
        { name: 'Free 7-day routine', type: 'Lead magnet', price: 0, gate: 0, promise: 'A week of ten-minute sessions is an easy yes for a tired audience.', deliver: 'PDF + follow-along videos' },
        { name: 'Program / guide', type: 'Digital product', price: 999, gate: 1500, promise: 'Structure sells. They do not need more information, they need a sequence.', deliver: '4-week program with video library' },
        { name: '1:1 sessions', type: 'Productised service', price: 2500, gate: 3000, promise: 'Online sessions have no room hire and no travel — margin is close to total.', deliver: 'Live 1:1 class or consultation' },
        { name: 'Group programme / retreat', type: 'High ticket', price: 18000, gate: 8000, promise: 'Cohorts and retreats price high and produce your best testimonials.', deliver: 'Multi-week cohort or weekend retreat' },
        { name: 'Brand deals — wellness products', type: 'Sponsorship', price: 0, gate: 10000, promise: 'Lucrative but the category is full of unsupported claims. Refuse those.', deliver: 'Integrated routine reel' }
      ],
      hashtags: {
        broad: ['#wellness', '#yoga', '#health', '#selfcare'],
        mid: ['#yogapractice', '#mobility', '#guthealth', '#sleephygiene', '#holistichealth', '#stretching'],
        niche: ['#deskstretches', '#yogaforbeginners', '#guthealthtips', '#ayurvedadaily', '#wellnessindia', '#morningmobility', '#hormonehealth', '#breathworkpractice']
      },
      visual: 'Full body in frame with room to move, natural light, plain uncluttered floor space, real-time demonstration rather than sped-up, on-screen timers and counts, calm audio with the voice clearly above any music.',
      brands: ['wellness & supplements', 'yoga and activewear', 'sleep products', 'health platforms'],
      proof: ['your own practice over years', 'student progress', 'qualifications and sources cited']
    },

    dance: {
      label: 'Dance & Choreography',
      short: 'Dance',
      category: 'Creative',
      aliases: 'dance, dancer, choreography, hiphop, bollywood dance, classical dance, kathak, bharatanatyam, contemporary, dance tutorial, dance cover, freestyle, ballet, salsa',
      reach: 1.55, cpm: 0.9, buyRate: 0.85,
      positioning: 'the one who breaks a routine down slowly enough that beginners actually finish it',
      audience: {
        age: '14–32', who: 'self-taught dancers, students, wedding performers, class-goers',
        interests: ['tutorials', 'choreography', 'trending routines', 'technique', 'performances'],
        pains: ['can copy steps but look stiff', 'tutorials too fast to follow', 'no studio or space at home', 'self-conscious about being watched', 'no foundation, only copied routines'],
        desires: ['moving like it is effortless', 'performing without freezing', 'a routine ready for the wedding', 'confidence in their body'],
        objections: ['I have no rhythm', 'I have no space', 'I started too late']
      },
      pillars: [
        { name: 'Slow tutorials', pct: 30, why: 'Break it to counts. This is the format that turns viewers into followers.' },
        { name: 'Performance clips', pct: 25, why: 'Reach engine. People share dance they enjoy watching.' },
        { name: 'Technique & basics', pct: 20, why: 'Body isolation, posture, musicality — what makes copied steps look real.' },
        { name: 'Trend routines', pct: 15, why: 'Free distribution when the audio is already moving.' },
        { name: 'Journey & practice', pct: 10, why: 'Progress content is the most motivating thing in this niche.' }
      ],
      ideas: [
        'this routine broken into 8 counts, slowly', 'the reason your moves look stiff',
        'body isolation drill for absolute beginners', 'a wedding routine anyone can learn in a week',
        'dancing in a small room without breaking anything', 'musicality: hitting the beat instead of chasing it',
        'the warm-up that prevents dance injuries', 'a year of practice, first day to now',
        'freestyle when your mind goes blank', 'the classical basic that improves every style',
        'front and back angles of the same routine', 'how to practise without a mirror'
      ],
      offers: [
        { name: 'Free beginner routine', type: 'Lead magnet', price: 0, gate: 0, promise: 'One complete learnable routine builds enormous goodwill fast.', deliver: 'Tutorial series + practice track' },
        { name: 'Choreography / tutorial pack', type: 'Digital product', price: 799, gate: 2000, promise: 'Filmed once, sold forever, and every buyer performs your work publicly.', deliver: 'Multi-angle tutorials + counts' },
        { name: 'Online classes', type: 'Productised service', price: 1500, gate: 3000, promise: 'Live classes scale past any studio\'s floor space.', deliver: 'Weekly live class + recording' },
        { name: 'Wedding choreography', type: 'High ticket', price: 35000, gate: 3000, promise: 'The highest-paying work in dance, and the account is the portfolio that books it.', deliver: 'Full sangeet choreography and rehearsals' },
        { name: 'Workshops', type: 'High ticket', price: 12000, gate: 10000, promise: 'City workshops sell out from a modest following and generate a month of content.', deliver: 'In-person workshop, limited seats' }
      ],
      hashtags: {
        broad: ['#dance', '#dancer', '#choreography', '#dancevideo'],
        mid: ['#dancetutorial', '#hiphopdance', '#bollywooddance', '#dancecover', '#dancersofinstagram', '#contemporarydance'],
        niche: ['#dancetutorialforbeginners', '#weddingchoreography', '#sangeetdance', '#danceindia', '#slowtutorial', '#bodyisolation', '#freestyledance', '#classicaldanceindia']
      },
      visual: 'Full body always in frame with headroom, fixed camera at chest height, mirror and front angle side by side, counts on screen, slow version before full speed, audio unclipped and beat-synced cuts.',
      brands: ['activewear & shoes', 'music platforms', 'dance academies', 'event companies'],
      proof: ['your performances', 'students performing your choreography', 'progress over time']
    }
  };
})(window.IGOS);
