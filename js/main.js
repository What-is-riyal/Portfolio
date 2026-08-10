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
      '.home-governance__item, .home-work__row, .home-about__title, .home-about__copy, .home-about__aside'
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

  function bootHumanField() {
    document.querySelectorAll('[data-human-field]').forEach((canvas) => {
      const host = canvas.closest('[data-field-host]');
      if (!host) return;

      const context = canvas.getContext('2d');
      if (!context) return;
      const density = Number(canvas.dataset.humanField) || 54;
      const accentColor = canvas.dataset.dotColor || '84, 70, 184';
      const mutedColor = canvas.dataset.dotColorMuted || '30, 29, 34';
      const lineColor = canvas.dataset.lineColor || accentColor;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const points = Array.from({ length: density }, (_, index) => ({
        x: ((index * 47) % 101) / 100,
        y: ((index * 71 + 13) % 103) / 102,
        phase: index * 0.74,
        wavePhase: ((index * 47) % 101) / 101 * Math.PI * 2.4,
        speed: 0.35 + (index % 7) * 0.045,
        radius: 1.1 + (index % 4) * 0.38
      }));
      const pointer = { x: -1000, y: -1000 };
      let width = 0;
      let height = 0;
      let frame = 0;

      const resize = () => {
        const rect = host.getBoundingClientRect();
        const scale = Math.min(window.devicePixelRatio || 1, 2);
        width = rect.width;
        height = rect.height;
        canvas.width = Math.round(width * scale);
        canvas.height = Math.round(height * scale);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.setTransform(scale, 0, 0, scale, 0, 0);
      };

      const draw = (time) => {
        context.clearRect(0, 0, width, height);
        const t = reducedMotion ? 0 : time * 0.00028;
        const live = points.map((point) => {
          const x = point.x * width + Math.sin(t * point.speed + point.phase) * 18;
          const y = point.y * height + Math.sin(t * 1.6 + point.wavePhase) * 20 + Math.cos(t * point.speed * 0.8 + point.phase) * 8;
          const distance = Math.hypot(x - pointer.x, y - pointer.y);
          const influence = Math.max(0, 1 - distance / 150);
          const angle = Math.atan2(y - pointer.y, x - pointer.x);
          return {
            x: x + Math.cos(angle) * influence * 24,
            y: y + Math.sin(angle) * influence * 24,
            radius: point.radius + influence * 1.6
          };
        });

        for (let a = 0; a < live.length; a += 1) {
          for (let b = a + 1; b < live.length; b += 1) {
            const distance = Math.hypot(live[a].x - live[b].x, live[a].y - live[b].y);
            if (distance > 104) continue;
            context.beginPath();
            context.moveTo(live[a].x, live[a].y);
            context.lineTo(live[b].x, live[b].y);
            context.strokeStyle = `rgba(${lineColor}, ${((1 - distance / 104) * 0.09).toFixed(3)})`;
            context.lineWidth = 0.75;
            context.stroke();
          }
        }

        live.forEach((point, index) => {
          context.beginPath();
          context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
          context.fillStyle = index % 5 === 0 ? `rgba(${accentColor}, 0.28)` : `rgba(${mutedColor}, 0.17)`;
          context.fill();
        });

        if (!reducedMotion) frame = window.requestAnimationFrame(draw);
      };

      host.addEventListener('pointermove', (event) => {
        const rect = host.getBoundingClientRect();
        pointer.x = event.clientX - rect.left;
        pointer.y = event.clientY - rect.top;
      }, { passive: true });
      host.addEventListener('pointerleave', () => {
        pointer.x = -1000;
        pointer.y = -1000;
      });

      resize();
      draw(0);
      window.addEventListener('resize', resize);
      document.addEventListener('visibilitychange', () => {
        if (reducedMotion) return;
        if (document.hidden) window.cancelAnimationFrame(frame);
        else frame = window.requestAnimationFrame(draw);
      });
    });
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

  function boot() {
    bootDiagram();
    bootNavContrast();
    bootHeroEntrance();
    bootMotionReveals();
    bootCardTilt();
    bootFieldFiles();
    bootHumanField();
    bootResearchCursor();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
