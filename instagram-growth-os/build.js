/* Builds two things from the multi-file source, which stays the source of truth:

     dist/growth-os.html   a body-only fragment for publishing as an Artifact
     public/index.html     a complete, standalone website ready to host anywhere

   Usage: node build.js
*/
const fs = require('fs');
const path = require('path');

const root = __dirname;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'assets/app.css'), 'utf8');

const SITE = {
  name: 'Growth OS',
  title: 'Growth OS — run your Instagram like a business',
  desc: 'Free. Tell it your niche, your follower count and your goal, and it builds the whole operating plan: strategy, a 28-day content calendar, scripts, a scored idea engine and honest growth maths. Works for any niche. Nothing to install, nothing to sign up for.',
  themeLight: '#f4f7fb',
  themeDark: '#141a26'
};

const scripts = (html.match(/<script src="([^"]+)"><\/script>/g) || [])
  .map((tag) => tag.replace(/<script src="|"><\/script>/g, ''));

const body = html
  .replace(/[\s\S]*?<body>/, '')
  .replace(/<\/body>[\s\S]*/, '')
  .replace(/<script src="[^"]+"><\/script>\s*/g, '')
  .trim();

const fonts = 'https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800' +
  '&family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap';

const inlineScripts = scripts.map((s) =>
  '<script>\n/* ' + s + ' */\n' + fs.readFileSync(path.join(root, s), 'utf8') + '\n</script>'
).join('\n');

const fontLinks = [
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  '<link rel="stylesheet" href="' + fonts + '">'
].join('\n');

/* ---------- 1. artifact fragment ---------- */
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist/growth-os.html'), [
  '<title>Instagram Growth OS</title>',
  fontLinks,
  '<style>\n' + css + '\n</style>',
  '',
  body,
  '',
  inlineScripts
].join('\n'));

/* ---------- 2. standalone website ---------- */
/* A real document this time — the Artifact host supplies <head> for the
   fragment above, but a hosted site has to bring its own. */
const site = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${SITE.title}</title>
<meta name="description" content="${SITE.desc}">
<link rel="canonical" href="./">

<meta property="og:type" content="website">
<meta property="og:title" content="${SITE.title}">
<meta property="og:description" content="${SITE.desc}">
<meta property="og:image" content="og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${SITE.title}">
<meta name="twitter:description" content="${SITE.desc}">
<meta name="twitter:image" content="og.png">

<meta name="theme-color" content="${SITE.themeLight}" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="${SITE.themeDark}" media="(prefers-color-scheme: dark)">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="${SITE.name}">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="icon-180.png">
${fontLinks}
<style>
${css}
</style>
</head>
<body>
${body}
${inlineScripts}
</body>
</html>`;

const pub = path.join(root, 'public');
fs.mkdirSync(pub, { recursive: true });
fs.writeFileSync(path.join(pub, 'index.html'), site);

/* Installable on a phone home screen — most of the traffic will be mobile. */
fs.writeFileSync(path.join(pub, 'manifest.webmanifest'), JSON.stringify({
  name: SITE.title,
  short_name: SITE.name,
  description: SITE.desc,
  start_url: './',
  scope: './',
  display: 'standalone',
  background_color: SITE.themeLight,
  theme_color: SITE.themeLight,
  icons: [
    { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    { src: 'icon-180.png', sizes: '180x180', type: 'image/png' },
    { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
  ]
}, null, 2));

fs.writeFileSync(path.join(pub, 'icon.svg'),
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#2f6bd4"/>
  <path d="M14 44 L26 32 L34 38 L50 20" fill="none" stroke="#fff" stroke-width="5"
        stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="50" cy="20" r="4.5" fill="#fff"/>
</svg>`);

fs.writeFileSync(path.join(pub, 'robots.txt'), 'User-agent: *\nAllow: /\n');

/* Netlify / Cloudflare Pages read this. The page is one big self-contained file
   that changes every deploy, so it revalidates while the assets cache. */
fs.writeFileSync(path.join(pub, '_headers'),
`/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
/index.html
  Cache-Control: public, max-age=0, must-revalidate
/og.png
  Cache-Control: public, max-age=604800
/icon-512.png
  Cache-Control: public, max-age=604800
/icon-180.png
  Cache-Control: public, max-age=604800
`);
fs.writeFileSync(path.join(pub, '.nojekyll'), '');

const kb = (p) => (fs.statSync(p).size / 1024).toFixed(1) + ' KB';
console.log('dist/growth-os.html  ' + kb(path.join(root, 'dist/growth-os.html')) + '  (artifact fragment)');
console.log('public/index.html    ' + kb(path.join(pub, 'index.html')) + '  (standalone site)');
console.log('public/              + manifest, icons, og.png, robots.txt, _headers, .nojekyll');
