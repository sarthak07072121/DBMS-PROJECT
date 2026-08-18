/* Bundles the app into one self-contained HTML file (dist/growth-os.html).
   Usage: node build.js
   The multi-file source stays the source of truth; this is only for
   publishing/sharing a single file. */
const fs = require('fs');
const path = require('path');

const root = __dirname;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'assets/app.css'), 'utf8');

const scripts = (html.match(/<script src="([^"]+)"><\/script>/g) || [])
  .map((tag) => tag.replace(/<script src="|"><\/script>/g, ''));

const body = html
  .replace(/[\s\S]*?<body>/, '')
  .replace(/<\/body>[\s\S]*/, '')
  .replace(/<script src="[^"]+"><\/script>\s*/g, '')
  .trim();

const fonts = 'https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800' +
  '&family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap';

const out = [
  '<title>Instagram Growth OS</title>',
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  '<link rel="stylesheet" href="' + fonts + '">',
  '<style>\n' + css + '\n</style>',
  '',
  body,
  '',
  scripts.map((s) =>
    '<script>\n/* ' + s + ' */\n' + fs.readFileSync(path.join(root, s), 'utf8') + '\n</script>'
  ).join('\n')
].join('\n');

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist/growth-os.html'), out);
console.log('dist/growth-os.html — ' + (out.length / 1024).toFixed(1) + ' KB, ' + scripts.length + ' scripts inlined');
