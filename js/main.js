/**
 * Homepage boot — wavy rails + hero diagram + Copilot nav contrast.
 */
(function () {
  function bootNavContrast() {
    const body = document.body;
    if (!body.classList.contains('page-home')) return;
    const hero = document.querySelector('.home-hero');
    if (!hero) return;

    const sync = () => {
      const past = window.scrollY > hero.offsetHeight - 72;
      body.classList.toggle('is-scrolled-past-hero', past);
    };
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
  }

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

    bootNavContrast();
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
