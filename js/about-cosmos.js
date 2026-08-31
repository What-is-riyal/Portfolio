(function () {
  const desk = document.querySelector('[data-about-cosmos]');
  const viewer = document.querySelector('[data-object-viewer]');
  if (!desk || !viewer) return;

  const dialog = viewer.querySelector('.about-viewer__dialog');
  const openers = Array.from(document.querySelectorAll('[data-open-object]'));
  const closers = Array.from(viewer.querySelectorAll('[data-close-viewer]'));
  const panels = Array.from(viewer.querySelectorAll('[data-object-panel]'));
  const magazine = viewer.querySelector('[data-magazine]');
  const magazinePages = magazine ? Array.from(magazine.querySelectorAll('[data-magazine-page]')) : [];
  const magazineCurrent = magazine && magazine.querySelector('[data-magazine-current]');
  const magazinePrevious = magazine && magazine.querySelector('[data-magazine-previous]');
  const magazineNext = magazine && magazine.querySelector('[data-magazine-next]');
  let activeMagazinePage = 0;
  let lastTrigger = null;

  const showMagazinePage = (pageNumber) => {
    if (!magazinePages.length) return;
    activeMagazinePage = Math.min(magazinePages.length - 1, Math.max(0, pageNumber));
    magazinePages.forEach((page, index) => page.classList.toggle('is-active', index === activeMagazinePage));
    if (magazineCurrent) magazineCurrent.textContent = String(activeMagazinePage + 1);
    if (magazinePrevious) magazinePrevious.disabled = activeMagazinePage === 0;
    if (magazineNext) magazineNext.disabled = activeMagazinePage === magazinePages.length - 1;
  };

  const openViewer = (trigger) => {
    const panelName = trigger.dataset.openObject;
    const panel = panels.find((candidate) => candidate.dataset.objectPanel === panelName);
    if (!panel) return;

    lastTrigger = trigger;
    const triggerRect = trigger.getBoundingClientRect();
    viewer.style.setProperty('--viewer-origin-x', `${((triggerRect.left + triggerRect.width / 2) / window.innerWidth) * 100}%`);
    viewer.style.setProperty('--viewer-origin-y', `${((triggerRect.top + triggerRect.height / 2) / window.innerHeight) * 100}%`);
    panels.forEach((candidate) => candidate.classList.toggle('is-active', candidate === panel));
    if (panelName === 'magazine') showMagazinePage((Number(trigger.dataset.openPage) || 1) - 1);

    viewer.classList.add('is-open');
    viewer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-about-viewer-open');
    window.setTimeout(() => viewer.querySelector('.about-viewer__close').focus(), 30);
  };

  const closeViewer = () => {
    if (!viewer.classList.contains('is-open')) return;
    viewer.classList.remove('is-open');
    viewer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-about-viewer-open');
    panels.forEach((panel) => panel.classList.remove('is-active'));
    if (lastTrigger) lastTrigger.focus();
  };

  openers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      if (trigger.dataset.justDragged === 'true') {
        event.preventDefault();
        delete trigger.dataset.justDragged;
        return;
      }
      openViewer(trigger);
    });
  });

  closers.forEach((closer) => closer.addEventListener('click', closeViewer));
  if (magazinePrevious) magazinePrevious.addEventListener('click', () => showMagazinePage(activeMagazinePage - 1));
  if (magazineNext) magazineNext.addEventListener('click', () => showMagazinePage(activeMagazinePage + 1));
  showMagazinePage(0);

  document.addEventListener('keydown', (event) => {
    if (!viewer.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeViewer();
      return;
    }

    const magazinePanel = viewer.querySelector('[data-object-panel="magazine"].is-active');
    if (magazinePanel && event.key === 'ArrowLeft') showMagazinePage(activeMagazinePage - 1);
    if (magazinePanel && event.key === 'ArrowRight') showMagazinePage(activeMagazinePage + 1);

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

  const cosmicObjects = Array.from(desk.querySelectorAll('[data-cosmic-object]'));
  const cursorOrbit = desk.querySelector('[data-cosmos-cursor]');
  const movableObjects = Array.from(desk.querySelectorAll('[data-cosmic-movable]'));
  let drag = null;

  cosmicObjects.forEach((object) => {
    const activate = () => { desk.dataset.activeObject = object.dataset.cosmicObject; };
    const deactivate = () => {
      if (desk.dataset.activeObject === object.dataset.cosmicObject) delete desk.dataset.activeObject;
    };
    object.addEventListener('pointerenter', activate);
    object.addEventListener('pointerleave', deactivate);
    object.addEventListener('focus', activate);
    object.addEventListener('blur', deactivate);
  });

  let cursorFrame = 0;
  let cursorX = 0;
  let cursorY = 0;

  desk.addEventListener('pointermove', (event) => {
    if (event.pointerType && event.pointerType !== 'mouse') return;
    const rect = desk.getBoundingClientRect();
    cursorX = event.clientX - rect.left;
    cursorY = event.clientY - rect.top;
    if (cursorFrame) return;

    cursorFrame = window.requestAnimationFrame(() => {
      if (cursorOrbit) {
        cursorOrbit.style.left = `${cursorX}px`;
        cursorOrbit.style.top = `${cursorY}px`;
      }
      const normalizedX = (cursorX / rect.width) * 2 - 1;
      const normalizedY = (cursorY / rect.height) * 2 - 1;
      desk.style.setProperty('--cosmos-x', normalizedX.toFixed(3));
      desk.style.setProperty('--cosmos-y', normalizedY.toFixed(3));
      desk.style.setProperty('--cosmos-bg-x', `${(normalizedX * 18).toFixed(2)}px`);
      desk.style.setProperty('--cosmos-bg-y', `${(normalizedY * 18).toFixed(2)}px`);
      desk.style.setProperty('--cosmos-near-x', `${(normalizedX * -7).toFixed(2)}px`);
      desk.style.setProperty('--cosmos-near-y', `${(normalizedY * -7).toFixed(2)}px`);
      desk.style.setProperty('--cosmos-far-x', `${(normalizedX * 3).toFixed(2)}px`);
      desk.style.setProperty('--cosmos-far-y', `${(normalizedY * 3).toFixed(2)}px`);
      cursorFrame = 0;
    });
  });

  desk.addEventListener('pointerleave', () => {
    desk.style.setProperty('--cosmos-x', '0');
    desk.style.setProperty('--cosmos-y', '0');
    desk.style.setProperty('--cosmos-bg-x', '0px');
    desk.style.setProperty('--cosmos-bg-y', '0px');
    desk.style.setProperty('--cosmos-near-x', '0px');
    desk.style.setProperty('--cosmos-near-y', '0px');
    desk.style.setProperty('--cosmos-far-x', '0px');
    desk.style.setProperty('--cosmos-far-y', '0px');
  });

  const randomTilt = (object) => {
    const direction = Math.random() < 0.5 ? -1 : 1;
    object.style.setProperty('--artifact-tilt', `${(direction * (2 + Math.random() * 3.5)).toFixed(2)}deg`);
  };

  const startDragging = (event, object) => {
    if (!window.matchMedia('(min-width: 621px)').matches) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    const objectRect = object.getBoundingClientRect();
    const deskRect = desk.getBoundingClientRect();
    drag = {
      object,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      grabX: event.clientX - objectRect.left,
      grabY: event.clientY - objectRect.top,
      deskLeft: deskRect.left,
      deskTop: deskRect.top,
      width: objectRect.width,
      height: objectRect.height,
      moved: false,
      placed: false,
    };
    object.setPointerCapture(event.pointerId);
  };

  const moveDragging = (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const distance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
    if (distance < 6 && !drag.moved) return;
    event.preventDefault();

    if (!drag.placed) {
      const objectRect = drag.object.getBoundingClientRect();
      const deskRect = desk.getBoundingClientRect();
      drag.object.style.width = `${drag.width}px`;
      drag.object.style.height = `${drag.height}px`;
      // artifacts are centred on their coordinates (translate -50%/-50%),
      // so left/top address the centre, not the top-left corner
      drag.object.style.left = `${objectRect.left - deskRect.left + drag.width / 2}px`;
      drag.object.style.top = `${objectRect.top - deskRect.top + drag.height / 2}px`;
      drag.object.style.right = 'auto';
      drag.object.style.bottom = 'auto';
      drag.object.classList.add('is-dragging');
      document.body.classList.add('is-moving-cosmic-artifact');
      randomTilt(drag.object);
      drag.placed = true;
    }

    drag.moved = true;
    const halfW = drag.width / 2;
    const halfH = drag.height / 2;
    const maxLeft = Math.max(halfW, desk.clientWidth - halfW);
    const maxTop = Math.max(halfH, desk.clientHeight - halfH);
    const left = Math.min(maxLeft, Math.max(halfW, event.clientX - drag.deskLeft - drag.grabX + halfW));
    const top = Math.min(maxTop, Math.max(halfH, event.clientY - drag.deskTop - drag.grabY + halfH));
    drag.object.style.left = `${left}px`;
    drag.object.style.top = `${top}px`;
  };

  const endDragging = (event) => {
    if (!drag || (event && event.pointerId !== drag.pointerId)) return;
    const object = drag.object;
    if (drag.moved) {
      object.dataset.justDragged = 'true';
      window.setTimeout(() => delete object.dataset.justDragged, 160);
    }
    object.classList.remove('is-dragging');
    document.body.classList.remove('is-moving-cosmic-artifact');
    drag = null;
  };

  movableObjects.forEach((object) => {
    object.style.touchAction = 'none';
    object.addEventListener('dragstart', (event) => event.preventDefault());
    object.addEventListener('pointerdown', (event) => startDragging(event, object));
    object.addEventListener('pointermove', moveDragging);
    object.addEventListener('pointerup', endDragging);
    object.addEventListener('pointercancel', endDragging);
  });

  window.addEventListener('blur', () => endDragging());
})();
