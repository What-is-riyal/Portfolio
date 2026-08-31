/* About — "The Paper Table"
   Objects reveal on scroll, lift off the table when picked, and open a story
   panel. No drag, no cursor follower, no page-flip beyond the zine itself —
   the visuals carry this page, not the interaction. */

(function () {
  var table = document.querySelector('[data-table]');
  var surface = document.querySelector('[data-surface]');
  var viewer = document.querySelector('[data-viewer]');
  if (!table || !surface || !viewer) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------------------------------------------------------- reveal --- */

  var objects = Array.prototype.slice.call(surface.querySelectorAll('.obj'));

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    objects.forEach(function (obj) { obj.classList.add('is-in'); });
  } else {
    var order = 0;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var obj = entry.target;
        obj.style.transitionDelay = (order * 70) + 'ms';
        order++;
        obj.classList.add('is-in');
        observer.unobserve(obj);
      });
    }, { threshold: 0.2 });
    objects.forEach(function (obj) { observer.observe(obj); });
  }

  /* --------------------------------------------------------------- viewer */

  var dialog = viewer.querySelector('.viewer__dialog');
  var panels = Array.prototype.slice.call(viewer.querySelectorAll('[data-panel]'));
  var closers = Array.prototype.slice.call(viewer.querySelectorAll('[data-close]'));
  var lastTrigger = null;

  function reallyOpen(trigger) {
    var name = trigger.dataset.open;
    var panel = panels.filter(function (p) { return p.dataset.panel === name; })[0];
    if (!panel) return;

    lastTrigger = trigger;
    var rect = trigger.getBoundingClientRect();
    viewer.style.setProperty('--origin-x', (((rect.left + rect.width / 2) / window.innerWidth) * 100) + '%');
    viewer.style.setProperty('--origin-y', (((rect.top + rect.height / 2) / window.innerHeight) * 100) + '%');

    panels.forEach(function (p) { p.classList.toggle('is-active', p === panel); });
    if (panel.dataset.panel === 'research') showSpread(0);

    viewer.classList.add('is-open');
    viewer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-viewer-open');
    window.setTimeout(function () {
      var close = viewer.querySelector('.viewer__close');
      if (close) close.focus({ preventScroll: true });
    }, 30);
  }

  function openObject(trigger) {
    if (reduceMotion.matches) {
      reallyOpen(trigger);
      return;
    }
    trigger.classList.add('is-picked');
    window.setTimeout(function () { reallyOpen(trigger); }, 180);
  }

  function closeViewer() {
    if (!viewer.classList.contains('is-open')) return;
    viewer.classList.remove('is-open');
    viewer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-viewer-open');
    panels.forEach(function (p) { p.classList.remove('is-active'); });
    if (lastTrigger) {
      lastTrigger.classList.remove('is-picked');
      lastTrigger.focus({ preventScroll: true });
    }
  }

  objects.forEach(function (obj) {
    obj.addEventListener('click', function () { openObject(obj); });
  });
  closers.forEach(function (closer) { closer.addEventListener('click', closeViewer); });

  /* ----------------------------------------------------------------- zine */

  var mag = viewer.querySelector('[data-mag]');
  var spreads = mag ? Array.prototype.slice.call(mag.querySelectorAll('[data-page]')) : [];
  var magCurrent = mag && mag.querySelector('[data-mag-current]');
  var magPrev = mag && mag.querySelector('[data-mag-prev]');
  var magNext = mag && mag.querySelector('[data-mag-next]');
  var spreadIndex = 0;

  function showSpread(index) {
    if (!spreads.length) return;
    spreadIndex = Math.min(spreads.length - 1, Math.max(0, index));
    spreads.forEach(function (spread, i) { spread.classList.toggle('is-active', i === spreadIndex); });
    if (magCurrent) magCurrent.textContent = String(spreadIndex + 1);
    if (magPrev) magPrev.disabled = spreadIndex === 0;
    if (magNext) magNext.disabled = spreadIndex === spreads.length - 1;
    if (dialog) dialog.scrollTop = 0;
  }

  if (magPrev) magPrev.addEventListener('click', function () { showSpread(spreadIndex - 1); });
  if (magNext) magNext.addEventListener('click', function () { showSpread(spreadIndex + 1); });
  showSpread(0);

  /* -------------------------------------------------------------- keyboard */

  document.addEventListener('keydown', function (event) {
    if (!viewer.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeViewer();
      return;
    }

    var zineOpen = viewer.querySelector('[data-panel="research"].is-active');
    if (zineOpen && event.key === 'ArrowLeft') showSpread(spreadIndex - 1);
    if (zineOpen && event.key === 'ArrowRight') showSpread(spreadIndex + 1);

    if (event.key === 'Tab' && dialog) {
      var focusable = Array.prototype.slice
        .call(dialog.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'))
        .filter(function (el) { return el.offsetParent !== null; });
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
