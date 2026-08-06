/**
 * Homepage boot — Mondrian lines + hero diagram.
 */
(function () {
  function boot() {
    const page = document.querySelector('.page');
    if (page && globalThis.MondrianLines) {
      MondrianLines.init(page, {
        marks: [
          { rail: 2, rule: 0, kind: 'red' },
          { rail: 0, rule: 2, kind: 'yellow' },
          { rail: 3, rule: 3, kind: 'red' },
        ],
      });
    }

    const diagramHost = document.querySelector('[data-diagram]');
    if (diagramHost && globalThis.Diagram) {
      Diagram.mountAndInit(diagramHost);
    }
  }

  function whenReady() {
    if (typeof gsap === 'undefined' || !globalThis.Motion) {
      requestAnimationFrame(whenReady);
      return;
    }
    boot();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', whenReady);
  } else {
    whenReady();
  }
})();
