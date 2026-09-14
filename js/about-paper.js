/* About — paper objects, story viewer, and research zine */
(function () {
  var surface = document.querySelector('[data-surface]');
  var viewer = document.querySelector('[data-viewer]');
  if (!surface || !viewer) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var objects = Array.prototype.slice.call(surface.querySelectorAll('.obj'));
  var dialog = viewer.querySelector('.viewer__dialog');
  var panels = Array.prototype.slice.call(viewer.querySelectorAll('[data-panel]'));
  var closers = Array.prototype.slice.call(viewer.querySelectorAll('[data-close]'));
  var lastTrigger = null;

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    objects.forEach(function (object) { object.classList.add('is-in'); });
  } else {
    var order = 0;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay = (order * 70) + 'ms';
        order += 1;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.18 });
    objects.forEach(function (object) { observer.observe(object); });
  }

  var mag = viewer.querySelector('[data-mag]');
  var spreads = mag ? Array.prototype.slice.call(mag.querySelectorAll('[data-page]')) : [];
  var currentLabel = mag && mag.querySelector('[data-mag-current]');
  var previous = mag && mag.querySelector('[data-mag-prev]');
  var next = mag && mag.querySelector('[data-mag-next]');
  var spreadIndex = 0;

  function showSpread(index) {
    if (!spreads.length) return;
    spreadIndex = Math.min(spreads.length - 1, Math.max(0, index));
    spreads.forEach(function (spread, i) {
      spread.classList.toggle('is-active', i === spreadIndex);
    });
    if (currentLabel) currentLabel.textContent = String(spreadIndex + 1);
    if (previous) previous.disabled = spreadIndex === 0;
    if (next) next.disabled = spreadIndex === spreads.length - 1;
    if (dialog) dialog.scrollTop = 0;
  }

  function revealStory(trigger) {
    var panelName = trigger.dataset.open;
    var panel = panels.filter(function (candidate) {
      return candidate.dataset.panel === panelName;
    })[0];
    if (!panel) return;

    lastTrigger = trigger;
    var rect = trigger.getBoundingClientRect();
    viewer.style.setProperty('--origin-x', (((rect.left + rect.width / 2) / window.innerWidth) * 100) + '%');
    viewer.style.setProperty('--origin-y', (((rect.top + rect.height / 2) / window.innerHeight) * 100) + '%');
    panels.forEach(function (candidate) {
      candidate.classList.toggle('is-active', candidate === panel);
    });
    if (panelName === 'research') showSpread(0);

    viewer.classList.add('is-open');
    viewer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-viewer-open');
    window.setTimeout(function () {
      var close = viewer.querySelector('.viewer__close');
      if (close) close.focus({ preventScroll: true });
    }, 30);
  }

  function openStory(trigger) {
    if (reduceMotion.matches) {
      revealStory(trigger);
      return;
    }
    trigger.classList.add('is-picked');
    window.setTimeout(function () { revealStory(trigger); }, 180);
  }

  function closeStory() {
    if (!viewer.classList.contains('is-open')) return;
    viewer.classList.remove('is-open');
    viewer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-viewer-open');
    panels.forEach(function (panel) { panel.classList.remove('is-active'); });
    if (lastTrigger) {
      lastTrigger.classList.remove('is-picked');
      lastTrigger.focus({ preventScroll: true });
    }
  }

  objects.forEach(function (object) {
    object.addEventListener('click', function () { openStory(object); });
  });
  closers.forEach(function (closer) {
    closer.addEventListener('click', closeStory);
  });
  if (previous) previous.addEventListener('click', function () { showSpread(spreadIndex - 1); });
  if (next) next.addEventListener('click', function () { showSpread(spreadIndex + 1); });
  showSpread(0);

  document.addEventListener('keydown', function (event) {
    if (!viewer.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeStory();
      return;
    }

    if (viewer.querySelector('[data-panel="research"].is-active')) {
      if (event.key === 'ArrowLeft') showSpread(spreadIndex - 1);
      if (event.key === 'ArrowRight') showSpread(spreadIndex + 1);
    }

    if (event.key === 'Tab' && dialog) {
      var focusable = Array.prototype.slice.call(
        dialog.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')
      ).filter(function (element) { return element.offsetParent !== null; });
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

