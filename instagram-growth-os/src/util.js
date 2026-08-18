/* ================= GROWTH OS · util + store ================= */
window.IGOS = window.IGOS || {};

(function (G) {
  'use strict';

  const KEY = 'igos.v1';

  /* ---------- dom ---------- */
  G.$ = (s, r) => (r || document).querySelector(s);
  G.$$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  G.esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  /* ---------- math / format ---------- */
  G.clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
  G.round = (n, step) => Math.round(n / step) * step;

  G.nice = function (n) {                       // round to a believable-looking number
    n = Math.round(n);
    if (n >= 100000) return G.round(n, 5000);
    if (n >= 10000) return G.round(n, 500);
    if (n >= 1000) return G.round(n, 50);
    if (n >= 100) return G.round(n, 10);
    return n;
  };

  G.fmt = function (n) {                        // 12400 -> 12.4K
    n = Math.round(n || 0);
    if (Math.abs(n) >= 1e7) return (n / 1e7).toFixed(1).replace(/\.0$/, '') + 'Cr';
    if (Math.abs(n) >= 1e5) return (n / 1e5).toFixed(1).replace(/\.0$/, '') + 'L';
    if (Math.abs(n) >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return String(n);
  };
  G.comma = (n) => Math.round(n || 0).toLocaleString('en-IN');
  G.pct = (n, d) => (n * 100).toFixed(d == null ? 1 : d) + '%';

  /* INR is the internal unit of account. USD is a display/entry conversion. */
  const RATE = 85;
  G.RATE = RATE;
  G.curSym = () => ((G.store.profile && G.store.profile.currency) === 'USD' ? '$' : '₹');
  G.toBase = (v, cur) => ((cur || (G.store.profile && G.store.profile.currency)) === 'USD' ? Number(v) * RATE : Number(v));
  G.fromBase = (v, cur) => ((cur || (G.store.profile && G.store.profile.currency)) === 'USD' ? Number(v) / RATE : Number(v));

  G.money = function (inr, opts) {
    opts = opts || {};
    const cur = (G.store.profile && G.store.profile.currency) || 'INR';
    let v = cur === 'USD' ? inr / RATE : inr;
    v = opts.raw ? Math.round(v) : G.nice(v);
    const sym = cur === 'USD' ? '$' : '₹';
    const sign = v < 0 ? '-' : '';
    v = Math.abs(v);
    if (opts.short) return sign + sym + G.fmt(v);
    return sign + sym + Math.round(v).toLocaleString(cur === 'USD' ? 'en-US' : 'en-IN');
  };
  G.moneyRange = (a, b) => G.money(a) + '–' + G.money(b);

  /* ---------- deterministic randomness (stable regeneration) ---------- */
  G.rng = function (seed) {
    let s = seed >>> 0 || 1;
    return function () {
      s ^= s << 13; s >>>= 0;
      s ^= s >> 17;
      s ^= s << 5; s >>>= 0;
      return s / 4294967296;
    };
  };
  G.pick = (arr, r) => arr[Math.floor(r() * arr.length) % arr.length];
  G.shuffle = function (arr, r) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  /* ---------- dates ---------- */
  G.today = () => new Date().toISOString().slice(0, 10);
  G.addDays = function (iso, n) {
    const d = new Date(iso + 'T00:00:00');
    d.setDate(d.getDate() + n);
    return d.toISOString().slice(0, 10);
  };
  G.dayName = (iso) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(iso + 'T00:00:00').getDay()];
  G.prettyDate = (iso) => new Date(iso + 'T00:00:00')
    .toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  /* ---------- store ---------- */
  const BLANK = {
    profile: null,
    seed: 20260818,
    view: 'ceo',
    tasks: {},        // { 'YYYY-MM-DD': { taskId: true } }
    pipeline: [],     // kanban cards
    ledger: [],       // money in / out
    logs: [],         // weekly metric snapshots
    calendarStart: null,
    notes: {}
  };

  G.store = JSON.parse(JSON.stringify(BLANK));

  G.load = function () {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) G.store = Object.assign(JSON.parse(JSON.stringify(BLANK)), JSON.parse(raw));
    } catch (e) { /* first run / private mode */ }
    return G.store;
  };
  G.save = function () {
    try { localStorage.setItem(KEY, JSON.stringify(G.store)); } catch (e) { }
  };
  G.wipe = function () {
    try { localStorage.removeItem(KEY); } catch (e) { }
    G.store = JSON.parse(JSON.stringify(BLANK));
  };

  /* ---------- ui helpers ---------- */
  let toastT;
  G.toast = function (msg) {
    const t = G.$('#toast');
    t.textContent = msg;
    t.classList.remove('hidden');
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.add('hidden'), 2200);
  };
  G.copy = function (text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); G.toast('Copied to clipboard'); }
    catch (e) { G.toast('Copy failed — select manually'); }
    document.body.removeChild(ta);
  };
  /* Saving a file works two ways: an ordinary blob download when the app is
     opened from disk or a server, and the host's mediated save when it runs
     as a published Artifact (where blob downloads are inert). */
  function blobSave(name, text, mime) {
    const b = new Blob([text], { type: mime || 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(b);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  G.download = function (name, text, mime) {
    const host = window.claude;
    if (!host || typeof host.use !== 'function') { blobSave(name, text, mime); G.toast('Downloaded ' + name); return; }

    host.use('downloads').then(function (dl) {
      if (!dl) { blobSave(name, text, mime); G.toast('Downloaded ' + name); return; }
      dl.save({ filename: name, data: text })
        .then(function () { G.toast('Saved ' + name); })
        .catch(function (err) {
          const code = err && err.code;
          if (code === 'declined') { G.toast('Download cancelled'); return; }
          if (code === 'rate_limited') { G.toast('One save at a time — try again in a moment'); return; }
          if (code === 'rejected_extension' || code === 'extension_not_enabled') {
            const alt = name.replace(/\.[^.]+$/, '') + '.txt';
            dl.save({ filename: alt, data: text })
              .then(function () { G.toast('Saved as ' + alt); })
              .catch(function () { G.toast('This viewer cannot save files — use "Copy" instead'); });
            return;
          }
          G.toast('This viewer cannot save files — use "Copy" instead');
        });
    }).catch(function () { blobSave(name, text, mime); });
  };

  /* ---------- small render helpers ---------- */
  G.kpi = (label, value, sub, tone) =>
    `<div class="kpi ${tone || ''}"><div class="k-l">${G.esc(label)}</div>
     <div class="k-v">${value}</div><div class="k-s">${sub || ''}</div></div>`;

  G.card = (title, body, right) =>
    `<div class="card"><div class="card-head"><h3>${G.esc(title)}</h3>${right || ''}</div>${body}</div>`;

  G.table = (heads, rows) =>
    `<div class="table-wrap"><table><thead><tr>${heads.map((h) =>
      `<th class="${/^#/.test(h) ? 'num' : ''}">${G.esc(h.replace(/^#/, ''))}</th>`).join('')}</tr></thead>
     <tbody>${rows.map((r) => `<tr>${r.map((c, i) =>
      `<td class="${/^#/.test(heads[i]) ? 'num' : ''}">${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

  G.bullets = (arr) => `<ul class="bullets">${arr.map((b) => `<li>${b}</li>`).join('')}</ul>`;
  G.ol = (arr) => `<ol class="ol">${arr.map((b) => `<li>${b}</li>`).join('')}</ol>`;
})(window.IGOS);
