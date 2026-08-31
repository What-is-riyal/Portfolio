/* About — "Depth"
   Window scroll position drives a 3D camera through the research argument,
   then out into a field of five facets. Scroll is never hijacked: this file
   never calls preventDefault on wheel or touch, and the whole scene is a
   normal sticky-positioned element inside a tall, ordinary document. */

(function () {
  document.body.classList.remove('no-js');

  var section = document.querySelector('[data-depth]');
  var stage = section && section.querySelector('.depth__stage');
  var camera = document.querySelector('[data-camera]');
  var dustHost = document.querySelector('[data-dust]');
  var viewer = document.querySelector('[data-viewer]');
  if (!section || !stage || !camera || !viewer) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var isNarrow = window.matchMedia('(max-width: 900px)');
  var skipScene = function () { return reduceMotion.matches || isNarrow.matches; };

  var CAM_TOTAL = 8400;

  /* ---------------------------------------------------------------- dust */

  if (dustHost && !skipScene()) {
    for (var i = 0; i < 70; i++) {
      var mote = document.createElement('i');
      mote.className = 'dust__mote';
      var size = 1 + Math.random() * 2;
      mote.style.width = size + 'px';
      mote.style.height = size + 'px';
      mote.style.setProperty('--x', (Math.random() * 1800 - 900).toFixed(0) + 'px');
      mote.style.setProperty('--y', (Math.random() * 1200 - 600).toFixed(0) + 'px');
      mote.style.setProperty('--z', (-Math.random() * 9400 - 200).toFixed(0) + 'px');
      var baseOpacity = 0.25 + Math.random() * 0.55;
      mote.dataset.baseOpacity = baseOpacity.toFixed(2);
      mote.style.background = Math.random() < 0.6 ? '#9D91FF' : '#FFFFFF';
      dustHost.appendChild(mote);
    }
  }

  /* ------------------------------------------------------------- layers */

  function readZ(el) {
    var raw = getComputedStyle(el).getPropertyValue('--z');
    return parseFloat(raw) || 0;
  }

  var plateEls = Array.prototype.slice.call(camera.querySelectorAll('.plate'));
  var facetEls = Array.prototype.slice.call(camera.querySelectorAll('.facet'));
  var moteEls = Array.prototype.slice.call(camera.querySelectorAll('.dust__mote'));

  var layers = [];
  plateEls.forEach(function (el) { layers.push({ el: el, z: readZ(el), base: 1, lastO: -1, lastB: -1 }); });
  facetEls.forEach(function (el) { layers.push({ el: el, z: readZ(el), base: 1, lastO: -1, lastB: -1 }); });
  moteEls.forEach(function (el) {
    layers.push({ el: el, z: readZ(el), base: parseFloat(el.dataset.baseOpacity) || 0.5, lastO: -1, lastB: -1 });
  });

  /* ---------------------------------------------------------- the loop */

  var camPx = 0;
  var tiltX = 0, tiltY = 0, tiltXTarget = 0, tiltYTarget = 0;
  var arrived = false;

  /* Single rAF loop for the whole scene: reads the section's bounding rect
     once per frame, derives camera position from it, and updates every
     layer from cached {el, z} entries — no per-layer DOM reads. */
  function frame() {
    if (skipScene()) return; // reduced-motion / narrow viewport: stop for good

    var rect = section.getBoundingClientRect();
    var travel = rect.height - window.innerHeight;
    var p = travel > 0 ? -rect.top / travel : 0;
    if (p < 0) p = 0;
    if (p > 1) p = 1;
    camPx = p * CAM_TOTAL;

    tiltX += (tiltXTarget - tiltX) * 0.08;
    tiltY += (tiltYTarget - tiltY) * 0.08;

    camera.style.setProperty('--cam', camPx.toFixed(1) + 'px');
    camera.style.setProperty('--tilt-x', tiltX.toFixed(3) + 'deg');
    camera.style.setProperty('--tilt-y', tiltY.toFixed(3) + 'deg');

    for (var i = 0; i < layers.length; i++) {
      var L = layers[i];
      var ez = L.z + camPx;
      var o, b;

      if (ez < -5200) { o = 0; b = 6; }
      else if (ez < -3600) { o = (ez + 5200) / 1600; b = 6 * (1 - o); }
      else if (ez <= -120) { o = 1; b = 0; }
      else if (ez <= 260) { o = 1 - (ez + 120) / 380; b = 10 * (1 - o); }
      else { o = 0; b = 10; }

      o = Math.max(0, Math.min(1, o)) * L.base;

      if (Math.abs(o - L.lastO) > 0.01) {
        L.el.style.opacity = o.toFixed(2);
        L.lastO = o;
      }
      if (Math.abs(b - L.lastB) > 0.2) {
        L.el.style.filter = b > 0.15 ? 'blur(' + b.toFixed(1) + 'px)' : '';
        L.lastB = b;
      }
      var hidden = ez > 260 || o <= 0.01;
      var wasHidden = L.el.style.visibility === 'hidden';
      if (hidden !== wasHidden) L.el.style.visibility = hidden ? 'hidden' : 'visible';
    }

    if (p > 0.9 && !arrived) {
      arrived = true;
      stage.classList.add('is-arrived');
    } else if (p < 0.88 && arrived) {
      arrived = false;
      stage.classList.remove('is-arrived');
    }

    window.requestAnimationFrame(frame);
  }

  if (!skipScene()) {
    window.requestAnimationFrame(frame);

    stage.addEventListener('pointermove', function (event) {
      if (event.pointerType !== 'mouse') return;
      var rect = stage.getBoundingClientRect();
      var nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      var ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      tiltYTarget = nx * 2.5;
      tiltXTarget = ny * -2;
    });

    stage.addEventListener('pointerleave', function () {
      tiltXTarget = 0;
      tiltYTarget = 0;
    });
  }

  /* keyboard: focusing a facet before arrival jumps the page there so the
     user can see what they focused, rather than tabbing into invisible space */
  facetEls.forEach(function (facet) {
    facet.addEventListener('focus', function () {
      if (skipScene() || arrived) return;
      var rect = section.getBoundingClientRect();
      var travel = rect.height - window.innerHeight;
      var target = window.scrollY + rect.top + travel * 0.92;
      window.scrollTo({ top: target, behavior: 'smooth' });
    });
  });

  /* ---------------------------------------------------------------- viewer */

  var dialog = viewer.querySelector('.viewer__dialog');
  var panels = Array.prototype.slice.call(viewer.querySelectorAll('[data-panel]'));
  var closers = Array.prototype.slice.call(viewer.querySelectorAll('[data-close]'));
  var openers = Array.prototype.slice.call(document.querySelectorAll('[data-open]'));
  var lastTrigger = null;

  function openViewer(trigger) {
    var name = trigger.dataset.open;
    var panel = panels.filter(function (p) { return p.dataset.panel === name; })[0];
    if (!panel) return;

    lastTrigger = trigger;
    var rect = trigger.getBoundingClientRect();
    viewer.style.setProperty('--origin-x', (((rect.left + rect.width / 2) / window.innerWidth) * 100) + '%');
    viewer.style.setProperty('--origin-y', (((rect.top + rect.height / 2) / window.innerHeight) * 100) + '%');

    panels.forEach(function (p) { p.classList.toggle('is-active', p === panel); });

    viewer.classList.add('is-open');
    viewer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-viewer-open');
    window.setTimeout(function () {
      var close = viewer.querySelector('.viewer__close');
      if (close) close.focus({ preventScroll: true });
    }, 30);
  }

  function closeViewer() {
    if (!viewer.classList.contains('is-open')) return;
    viewer.classList.remove('is-open');
    viewer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-viewer-open');
    panels.forEach(function (p) { p.classList.remove('is-active'); });
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  }

  openers.forEach(function (trigger) {
    trigger.addEventListener('click', function () { openViewer(trigger); });
  });
  closers.forEach(function (closer) { closer.addEventListener('click', closeViewer); });

  document.addEventListener('keydown', function (event) {
    if (!viewer.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeViewer();
      return;
    }

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
