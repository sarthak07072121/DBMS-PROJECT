/* ================= GROWTH OS · install + offline =================
   Registers the service worker and surfaces the install prompt.
   Both are no-ops when unsupported (file://, older browsers, iOS Safari
   which has no beforeinstallprompt) — the app must work regardless.
================================================================= */
(function (G) {
  'use strict';

  const isStandalone = () =>
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent);

  /* ---- service worker: makes it load instantly and work offline ---- */
  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {
        /* Offline support is a bonus, never a requirement. */
      });
    });
  }

  /* ---- install prompt ---- */
  let deferred = null;

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferred = e;
    G.showInstall();
  });

  window.addEventListener('appinstalled', function () {
    deferred = null;
    try { localStorage.setItem('igos.installed', '1'); } catch (err) { }
    const b = G.$('#btnInstall');
    if (b) b.classList.add('hidden');
    G.toast('Installed — open it from your home screen');
  });

  G.showInstall = function () {
    const b = G.$('#btnInstall');
    if (!b) return;
    if (isStandalone()) { b.classList.add('hidden'); return; }
    if (deferred || isIOS()) b.classList.remove('hidden');
  };

  G.install = function () {
    if (deferred) {
      deferred.prompt();
      deferred.userChoice.then(function () { deferred = null; });
      return;
    }
    /* iOS gives no programmatic install — tell them where the button is. */
    if (isIOS()) {
      G.toast('Tap Share, then "Add to Home Screen"');
      return;
    }
    G.toast('Use your browser menu → Install app');
  };
})(window.IGOS);
