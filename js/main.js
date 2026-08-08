/**
 * Homepage boot — hero diagram + nav contrast on scroll.
 * Mondrian rails removed; Copilot full-width layout.
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

  function bootHeroEntrance() {
    const hero = document.querySelector('.home-hero');
    if (!hero) return;
    requestAnimationFrame(() => {
      hero.classList.add('is-ready');
    });
  }

  function boot() {
    const diagramHost = document.querySelector('[data-diagram]');
    if (diagramHost && globalThis.Diagram) {
      Diagram.mountAndInit(diagramHost);
    }
    bootNavContrast();
    bootHeroEntrance();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
