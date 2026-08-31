/* About — "The Studio"
   Lamp that follows the cursor (and swings every object's shadow with it),
   pick-up-and-open transitions, draggable objects, a drawer, and a zine. */

(function () {
  const studio = document.querySelector('[data-studio]');
  const viewer = document.querySelector('[data-viewer]');
  if (!studio || !viewer) return;

  const desk = studio.querySelector('[data-desk]');
  const things = Array.from(studio.querySelectorAll('.thing'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isDesktop = () => window.matchMedia('(min-width: 901px)').matches;

  /* ---------------------------------------------------------------- lamp */

  const lampBulb = studio.querySelector('.lamp__bulb');
  let lamp = { x: 0, y: 0 };
  let lampFrame = 0;

  /* At rest the pool sits on the drawn lamp's bulb. On narrow screens that
     lamp is hidden, so fall back to a centred glow. */
  const restingLamp = () => {
    const studioRect = studio.getBoundingClientRect();
    const bulbRect = lampBulb ? lampBulb.getBoundingClientRect() : null;
    if (!bulbRect || !bulbRect.width) {
      return { x: studioRect.width * 0.5, y: studioRect.height * 0.34 };
    }
    return {
      x: bulbRect.left + bulbRect.width / 2 - studioRect.left,
      y: bulbRect.top + bulbRect.height / 2 - studioRect.top,
    };
  };

  /* Shadows point away from the light, and shorten as the light gets close. */
  const castShadows = () => {
    const studioRect = studio.getBoundingClientRect();
    studio.style.setProperty('--lx', `${lamp.x}px`);
    studio.style.setProperty('--ly', `${lamp.y}px`);

    things.forEach((thing) => {
      const rect = thing.getBoundingClientRect();
      const cx = rect.left + rect.width / 2 - studioRect.left;
      const cy = rect.top + rect.height / 2 - studioRect.top;
      const dx = cx - lamp.x;
      const dy = cy - lamp.y;
      const distance = Math.hypot(dx, dy) || 1;
      const nearness = Math.max(0, 1 - distance / 900);
      const length = 6 + (1 - nearness) * 16;

      thing.style.setProperty('--sx', ((dx / distance) * length).toFixed(2));
      thing.style.setProperty('--sy', ((dy / distance) * length * 0.7 + 6).toFixed(2));
      thing.style.setProperty('--heat', nearness.toFixed(3));
    });
  };

  const moveLamp = (x, y) => {
    lamp = { x, y };
    if (lampFrame) return;
    lampFrame = window.requestAnimationFrame(() => {
      castShadows();
      lampFrame = 0;
    });
  };

  const settleLamp = () => {
    const resting = restingLamp();
    moveLamp(resting.x, resting.y);
  };

  if (isDesktop()) {
    studio.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      const rect = studio.getBoundingClientRect();
      moveLamp(event.clientX - rect.left, event.clientY - rect.top);
      studio.classList.add('is-explored');
    });
    studio.addEventListener('pointerleave', settleLamp);
  }

  window.addEventListener('resize', settleLamp, { passive: true });
  settleLamp();
  window.setTimeout(settleLamp, 400); // once webfonts + images have settled

  /* -------------------------------------------------------------- drawer */

  const drawer = studio.querySelector('[data-drawer]');
  const drawerToggle = studio.querySelector('[data-drawer-toggle]');

  if (drawer && drawerToggle) {
    drawerToggle.addEventListener('click', () => {
      const open = drawer.dataset.open !== 'true';
      drawer.dataset.open = String(open);
      drawerToggle.setAttribute('aria-expanded', String(open));
      drawerToggle.querySelector('.drawer__label').textContent = open ? 'Close the drawer' : 'Pull the drawer';
      studio.classList.add('is-explored');
      window.setTimeout(settleLamp, 700);
    });
  }

  /* -------------------------------------------------------------- viewer */

  const dialog = viewer.querySelector('.viewer__dialog');
  const panels = Array.from(viewer.querySelectorAll('[data-panel]'));
  const closers = Array.from(viewer.querySelectorAll('[data-close]'));
  let lastTrigger = null;

  const openViewer = (trigger) => {
    const panel = panels.find((candidate) => candidate.dataset.panel === trigger.dataset.open);
    if (!panel) return;

    lastTrigger = trigger;
    const rect = trigger.getBoundingClientRect();
    viewer.style.setProperty('--origin-x', `${((rect.left + rect.width / 2) / window.innerWidth) * 100}%`);
    viewer.style.setProperty('--origin-y', `${((rect.top + rect.height / 2) / window.innerHeight) * 100}%`);

    panels.forEach((candidate) => candidate.classList.toggle('is-active', candidate === panel));
    if (panel.dataset.panel === 'magazine') showSpread(0);

    trigger.classList.add('is-lifting');
    const delay = reduceMotion.matches ? 0 : 180;

    window.setTimeout(() => {
      viewer.classList.add('is-open');
      viewer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('is-viewer-open');
      viewer.querySelector('.viewer__close').focus({ preventScroll: true });
    }, delay);
  };

  const closeViewer = () => {
    if (!viewer.classList.contains('is-open')) return;
    viewer.classList.remove('is-open');
    viewer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-viewer-open');
    panels.forEach((panel) => panel.classList.remove('is-active'));

    if (lastTrigger) {
      lastTrigger.classList.remove('is-lifting');
      lastTrigger.focus({ preventScroll: true });
    }
    window.setTimeout(settleLamp, 60);
  };

  things.forEach((thing) => {
    thing.addEventListener('click', (event) => {
      if (thing.dataset.justDragged === 'true') {
        event.preventDefault();
        delete thing.dataset.justDragged;
        return;
      }
      studio.classList.add('is-explored');
      openViewer(thing);
    });
  });

  closers.forEach((closer) => closer.addEventListener('click', closeViewer));

  /* ---------------------------------------------------------------- zine */

  const mag = viewer.querySelector('[data-mag]');
  const spreads = mag ? Array.from(mag.querySelectorAll('[data-page]')) : [];
  const magCurrent = mag && mag.querySelector('[data-mag-current]');
  const magPrev = mag && mag.querySelector('[data-mag-prev]');
  const magNext = mag && mag.querySelector('[data-mag-next]');
  let spreadIndex = 0;

  function showSpread(index) {
    if (!spreads.length) return;
    spreadIndex = Math.min(spreads.length - 1, Math.max(0, index));
    spreads.forEach((spread, i) => spread.classList.toggle('is-active', i === spreadIndex));
    if (magCurrent) magCurrent.textContent = String(spreadIndex + 1);
    if (magPrev) magPrev.disabled = spreadIndex === 0;
    if (magNext) magNext.disabled = spreadIndex === spreads.length - 1;
    if (dialog) dialog.scrollTop = 0;
  }

  if (magPrev) magPrev.addEventListener('click', () => showSpread(spreadIndex - 1));
  if (magNext) magNext.addEventListener('click', () => showSpread(spreadIndex + 1));
  showSpread(0);

  /* ------------------------------------------------------------ keyboard */

  document.addEventListener('keydown', (event) => {
    if (!viewer.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeViewer();
      return;
    }

    const zineOpen = viewer.querySelector('[data-panel="magazine"].is-active');
    if (zineOpen && event.key === 'ArrowLeft') showSpread(spreadIndex - 1);
    if (zineOpen && event.key === 'ArrowRight') showSpread(spreadIndex + 1);

    if (event.key === 'Tab' && dialog) {
      const focusable = Array.from(dialog.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'))
        .filter((element) => element.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  /* --------------------------------------------------------------- drag */

  const movable = things.filter((thing) => thing.hasAttribute('data-movable'));
  let drag = null;

  const randomTilt = (thing) => {
    const direction = Math.random() < 0.5 ? -1 : 1;
    thing.style.setProperty('--tilt', `${(direction * (1.5 + Math.random() * 4)).toFixed(2)}deg`);
  };

  const startDrag = (event, thing) => {
    if (!isDesktop() || !desk) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    const rect = thing.getBoundingClientRect();
    const deskRect = desk.getBoundingClientRect();
    drag = {
      thing,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      // offset from the pointer to the object's centre, which is what left/top set
      grabX: event.clientX - (rect.left + rect.width / 2),
      grabY: event.clientY - (rect.top + rect.height / 2),
      deskLeft: deskRect.left,
      deskTop: deskRect.top,
      halfW: rect.width / 2,
      halfH: rect.height / 2,
      moved: false,
    };
    thing.setPointerCapture(event.pointerId);
  };

  const onDrag = (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    if (!drag.moved && Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) < 6) return;
    event.preventDefault();

    if (!drag.moved) {
      drag.moved = true;
      drag.thing.classList.add('is-dragging');
      document.body.classList.add('is-dragging-thing');
      randomTilt(drag.thing);
    }

    const maxX = desk.clientWidth - drag.halfW;
    const maxY = desk.clientHeight - drag.halfH;
    const x = Math.min(maxX, Math.max(drag.halfW, event.clientX - drag.deskLeft - drag.grabX));
    const y = Math.min(maxY, Math.max(drag.halfH, event.clientY - drag.deskTop - drag.grabY));
    drag.thing.style.left = `${x}px`;
    drag.thing.style.top = `${y}px`;

    const studioRect = studio.getBoundingClientRect();
    moveLamp(event.clientX - studioRect.left, event.clientY - studioRect.top);
  };

  const endDrag = (event) => {
    if (!drag || (event && event.pointerId !== drag.pointerId)) return;
    if (drag.moved) {
      const settled = drag.thing;
      settled.dataset.justDragged = 'true';
      window.setTimeout(() => delete settled.dataset.justDragged, 180);
    }
    drag.thing.classList.remove('is-dragging');
    document.body.classList.remove('is-dragging-thing');
    drag = null;
    castShadows();
  };

  movable.forEach((thing) => {
    thing.style.touchAction = 'none';
    thing.addEventListener('dragstart', (event) => event.preventDefault());
    thing.addEventListener('pointerdown', (event) => startDrag(event, thing));
    thing.addEventListener('pointermove', onDrag);
    thing.addEventListener('pointerup', endDrag);
    thing.addEventListener('pointercancel', endDrag);
  });

  window.addEventListener('blur', () => endDrag());
})();
