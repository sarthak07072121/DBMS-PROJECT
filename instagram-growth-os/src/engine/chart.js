/* ================= GROWTH OS · chart component =================
   One line/area renderer for every chart in the app.

   The old per-view canvas code sized itself from `clientWidth` at render
   time, before layout had settled — the bitmap ended up narrower than the
   element and the browser stretched it, which is why axis labels looked
   smeared. This measures the parent's content box, re-measures on resize,
   and repaints from stored state.
============================================================== */
(function (G) {
  'use strict';
  const C = G.chart = {};

  function css(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  C.SERIES = () => [css('--s1'), css('--s2'), css('--s3')];

  /* opts: { series:[{name,color,dashed,area,points:[{x,y}]}], xMax, xLabel, yFormat, tipX } */
  C.line = function (canvas, opts) {
    if (!canvas) return;
    const wrap = canvas.parentElement;
    let state = null;

    function draw() {
      /* Measure the box we actually occupy, not a guess. */
      const box = wrap.getBoundingClientRect();
      const cssW = Math.max(240, Math.round(box.width));
      const cssH = opts.height || 240;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      canvas.style.width = cssW + 'px';
      canvas.style.height = cssH + 'px';

      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);

      const all = opts.series.reduce((a, s) => a.concat(s.points), []);
      const maxY = Math.max(1, all.reduce((m, p) => Math.max(m, p.y), 0)) * 1.08;
      const maxX = opts.xMax || Math.max(1, all.reduce((m, p) => Math.max(m, p.x), 0));

      const pad = { l: 56, r: 18, t: 14, b: 28 };
      const X = (x) => pad.l + (x / maxX) * (cssW - pad.l - pad.r);
      const Y = (y) => cssH - pad.b - (y / maxY) * (cssH - pad.t - pad.b);

      const fmt = opts.yFormat || G.fmt;
      const inkMuted = css('--tx-3');

      /* recessive grid */
      ctx.strokeStyle = css('--grid');
      ctx.lineWidth = 1;
      ctx.font = '11px ' + css('--mono');
      ctx.fillStyle = inkMuted;
      ctx.textBaseline = 'middle';
      for (let i = 0; i <= 4; i++) {
        const v = (maxY / 4) * i;
        const y = Math.round(Y(v)) + 0.5;
        ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(cssW - pad.r, y); ctx.stroke();
        ctx.textAlign = 'right';
        ctx.fillText(fmt(v), pad.l - 10, y);
      }

      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      const step = Math.max(1, Math.round(maxX / 6));
      for (let x = 0; x <= maxX; x += step) {
        ctx.fillText((opts.xLabel || 'M') + x, X(x), cssH - pad.b + 9);
      }

      /* series */
      opts.series.forEach((s) => {
        if (!s.points.length) return;
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 2;
        ctx.setLineDash(s.dashed ? [5, 4] : []);
        ctx.lineJoin = 'round';
        ctx.beginPath();
        s.points.forEach((p, i) => { i ? ctx.lineTo(X(p.x), Y(p.y)) : ctx.moveTo(X(p.x), Y(p.y)); });
        ctx.stroke();
        ctx.setLineDash([]);

        if (s.area) {
          ctx.beginPath();
          s.points.forEach((p, i) => { i ? ctx.lineTo(X(p.x), Y(p.y)) : ctx.moveTo(X(p.x), Y(p.y)); });
          ctx.lineTo(X(s.points[s.points.length - 1].x), Y(0));
          ctx.lineTo(X(s.points[0].x), Y(0));
          ctx.closePath();
          ctx.globalAlpha = 0.10;
          ctx.fillStyle = s.color;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        /* endpoint marker, ringed against the surface so overlaps stay readable */
        const last = s.points[s.points.length - 1];
        ctx.beginPath();
        ctx.arc(X(last.x), Y(last.y), 4.5, 0, 7);
        ctx.fillStyle = s.color; ctx.fill();
        ctx.lineWidth = 2; ctx.strokeStyle = css('--surface'); ctx.stroke();
      });

      state = { cssW, cssH, X, Y, maxX, pad };
    }

    /* ---- hover: crosshair + tooltip ---- */
    let tip = wrap.querySelector('.chart-tip');
    if (!tip) {
      tip = document.createElement('div');
      tip.className = 'chart-tip hidden';
      wrap.appendChild(tip);
    }

    function nearest(mx) {
      if (!state) return null;
      const xVal = ((mx - state.pad.l) / (state.cssW - state.pad.l - state.pad.r)) * state.maxX;
      let best = null;
      opts.series.forEach((s) => {
        s.points.forEach((p) => {
          const d = Math.abs(p.x - xVal);
          if (!best || d < best.d) best = { d: d, x: p.x };
        });
      });
      return best;
    }

    canvas.onmousemove = function (e) {
      if (!state) return;
      const r = canvas.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const near = nearest(mx);
      if (!near || near.d > state.maxX * 0.12) { tip.classList.add('hidden'); return; }

      const rows = opts.series.map((s) => {
        const pt = s.points.reduce((a, p) =>
          (!a || Math.abs(p.x - near.x) < Math.abs(a.x - near.x)) ? p : a, null);
        if (!pt || Math.abs(pt.x - near.x) > 0.5) return '';
        return '<div class="ct-row"><i class="ct-dot" style="background:' + s.color + '"></i>' +
          G.esc(s.name) + '<span class="ct-v">' + (opts.yFormat || G.comma)(pt.y) + '</span></div>';
      }).filter(Boolean).join('');

      tip.innerHTML = '<div class="ct-x">' + G.esc((opts.tipX || ((v) => 'Month ' + v))(near.x)) + '</div>' + rows;
      tip.style.left = state.X(near.x) + 'px';
      tip.style.top = (state.pad.t + 8) + 'px';
      tip.classList.remove('hidden');
    };
    canvas.onmouseleave = function () { tip.classList.add('hidden'); };

    draw();
    /* Repaint when the layout actually changes — this is what stops the stretch. */
    if (window.ResizeObserver) {
      if (canvas._ro) canvas._ro.disconnect();
      canvas._ro = new ResizeObserver(() => draw());
      canvas._ro.observe(wrap);
    }
    return draw;
  };

  C.legend = function (series) {
    return '<div class="legend">' + series.map((s) =>
      '<span><i style="background:' + s.color + (s.dashed ? ';opacity:.65' : '') + '"></i>' +
      G.esc(s.name) + '</span>').join('') + '</div>';
  };
})(window.IGOS);
