/**
 * Homepage boot: diagram, entrance, and section-aware nav contrast.
 */
(function () {
  function bootNavContrast() {
    const body = document.body;
    if (!body.classList.contains('page-home')) return;
    const darkSections = Array.from(document.querySelectorAll('[data-nav-theme="dark"]'));

    const sync = () => {
      const navLine = 58;
      const isDark = darkSections.some((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= navLine && rect.bottom > navLine;
      });
      body.classList.toggle('is-nav-on-dark', isDark);
    };
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
  }

  function bootDiagram() {
    const host = document.querySelector('[data-diagram]');
    if (!host || !window.Diagram) return;
    const svg = window.Diagram.mount(host, 'light');
    window.Diagram.init(svg);

    const visual = host.closest('.home-hero__visual');
    if (!visual || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    visual.addEventListener('pointermove', (event) => {
      const rect = visual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      visual.style.setProperty('--venn-x', `${(x * 10).toFixed(1)}px`);
      visual.style.setProperty('--venn-y', `${(y * 10).toFixed(1)}px`);
    });

    visual.addEventListener('pointerleave', () => {
      visual.style.setProperty('--venn-x', '0px');
      visual.style.setProperty('--venn-y', '0px');
    });
  }

  function bootMotionReveals() {
    const items = Array.from(document.querySelectorAll(
      '.home-work__row, .home-editorial-card, .home-about__title, .home-about__copy, .home-about__aside'
    ));
    if (!items.length) return;

    items.forEach((item, index) => {
      item.classList.add('motion-reveal');
      item.style.setProperty('--reveal-delay', `${(index % 4) * 65}ms`);
    });

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    items.forEach((item) => observer.observe(item));
  }

  function bootCardTilt() {
    if (window.matchMedia('(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('.home-work__row').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--tilt-x', `${(x * 3).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${(y * -3).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });
  }

  function bootHomeWorkPreview() {
    const preview = document.querySelector('.home-work__shared-preview');
    if (!preview) return;

    const panels = Array.from(preview.querySelectorAll('[data-preview-index]'));
    const rows = Array.from(document.querySelectorAll('.home-work__row[data-index]'))
      .filter((row) => panels.some((panel) => panel.dataset.previewIndex === row.dataset.index));
    if (!panels.length || !rows.length) return;

    const activate = (index) => {
      panels.forEach((panel) => panel.classList.toggle('is-active', panel.dataset.previewIndex === index));
      rows.forEach((row) => row.classList.toggle('is-preview-active', row.dataset.index === index));
    };

    rows.forEach((row) => {
      row.addEventListener('pointerenter', () => activate(row.dataset.index));
      row.addEventListener('focusin', () => activate(row.dataset.index));
    });

    activate(rows[0].dataset.index);
  }

  function bootFieldFiles() {
    const section = document.querySelector('.home-work--files');
    if (!section) return;
    const list = section.querySelector('.home-work__list');
    const buttons = Array.from(section.querySelectorAll('[data-folder-filter]'));
    const files = Array.from(section.querySelectorAll('[data-folder]'));
    const title = section.querySelector('.field-files__drawer-head h3[data-folder-title]');
    const description = section.querySelector('.field-files__drawer-head > [data-folder-description]');
    const breadcrumb = section.querySelector('[data-folder-breadcrumb]');
    if (!list || !buttons.length || !files.length) return;

    const defaults = {
      title: 'All files',
      description: 'Eleven selected files across research, product work, governance, and experiments.'
    };

    const applyFolder = (folder, animate) => {
      const selected = buttons.find((button) => button.dataset.folderFilter === folder);
      if (!selected) return;
      if (animate) list.classList.add('is-filtering');

      const swap = () => {
        section.dataset.activeFolder = folder;
        files.forEach((file) => {
          const folders = (file.dataset.folder || '').split(/\s+/);
          file.hidden = folder !== 'all' && !folders.includes(folder);
        });
        list.scrollLeft = 0;
        buttons.forEach((button) => {
          const active = button.dataset.folderFilter === folder;
          button.classList.toggle('is-active', active);
          button.setAttribute('aria-pressed', String(active));
        });

        const nextTitle = selected.dataset.folderTitle || defaults.title;
        const nextDescription = selected.dataset.folderDescription || defaults.description;
        if (title) title.textContent = nextTitle;
        if (description) description.textContent = nextDescription;
        if (breadcrumb) breadcrumb.textContent = nextTitle;

        try {
          window.localStorage.setItem('portfolio-field-folder', folder);
        } catch (error) {
          // Folder filtering remains usable when storage is unavailable.
        }
        requestAnimationFrame(() => list.classList.remove('is-filtering'));
      };

      if (animate) window.setTimeout(swap, 130);
      else swap();
    };

    let savedFolder = 'all';
    try {
      savedFolder = window.localStorage.getItem('portfolio-field-folder') || savedFolder;
    } catch (error) {
      // Use the complete archive when storage is unavailable.
    }
    applyFolder(buttons.some((button) => button.dataset.folderFilter === savedFolder) ? savedFolder : 'all', false);

    buttons.forEach((button) => {
      button.addEventListener('click', () => applyFolder(button.dataset.folderFilter, true));
    });

    let dragStartX = 0;
    let dragStartScroll = 0;
    let dragged = false;
    let suppressClick = false;

    list.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      dragStartX = event.clientX;
      dragStartScroll = list.scrollLeft;
      dragged = false;
      list.setPointerCapture(event.pointerId);
    });

    list.addEventListener('pointermove', (event) => {
      if (!list.hasPointerCapture(event.pointerId)) return;
      const distance = event.clientX - dragStartX;
      if (Math.abs(distance) < 5 && !dragged) return;
      dragged = true;
      list.classList.add('is-dragging');
      list.scrollLeft = dragStartScroll - distance;
    });

    const endDrag = (event) => {
      if (!list.hasPointerCapture(event.pointerId)) return;
      list.releasePointerCapture(event.pointerId);
      list.classList.remove('is-dragging');
      if (!dragged) return;
      suppressClick = true;
      window.setTimeout(() => { suppressClick = false; }, 0);
    };

    list.addEventListener('pointerup', endDrag);
    list.addEventListener('pointercancel', endDrag);
    list.addEventListener('click', (event) => {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
    }, true);
  }

  function bootResearchCursor() {
    if (window.matchMedia('(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)').matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'research-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursor);

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const draw = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(draw);
    };

    document.addEventListener('pointermove', (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.classList.add('is-visible');

      const interactive = event.target instanceof Element
        ? event.target.closest('[data-cursor]')
        : null;
      cursor.classList.toggle('is-active', Boolean(interactive));
      cursor.dataset.label = interactive ? interactive.getAttribute('data-cursor') || 'View' : '';
    }, { passive: true });

    document.addEventListener('mouseout', (event) => {
      if (event.relatedTarget) return;
      cursor.classList.remove('is-visible', 'is-active');
    });

    draw();
  }

  function bootHeroEntrance() {
    const hero = document.querySelector('.home-hero');
    if (!hero) return;
    requestAnimationFrame(() => {
      hero.classList.add('is-ready');
    });
  }

  function bootScrollTicker() {
    const track = document.querySelector('.home-pulse__ticker-track');
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let loopWidth = 0;
    const measure = () => {
      loopWidth = track.scrollWidth / 2;
    };

    let ticking = false;
    const update = () => {
      ticking = false;
      if (!loopWidth) return;
      const x = -(window.scrollY % loopWidth);
      track.style.transform = `translateX(${x}px)`;
    };

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });

    window.addEventListener('resize', measure);
    measure();
    update();
  }

  function boot() {
    bootDiagram();
    bootNavContrast();
    bootHeroEntrance();
    bootMotionReveals();
    bootCardTilt();
    bootHomeWorkPreview();
    bootFieldFiles();
    bootScrollTicker();
    bootResearchCursor();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
