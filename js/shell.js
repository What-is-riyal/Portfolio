/**
 * Shared site shell — nav + footer for v2 Mondrian pages.
 *
 * Auto-init when body has data-shell-base and data-shell-page:
 *   <body data-shell-base="../" data-shell-page="about">
 *     <div id="site-nav"></div>
 *     ...
 *     <div id="site-footer"></div>
 *
 * Manual: SiteShell.mountNav(el, { base, page })
 */
(function (global) {
  const NAV_ITEMS = [
    { id: 'work', label: 'Work', href: (b) => `${b}index.html#work` },
    { id: 'play', label: 'Play', href: (b) => `${b}play.html` },
    { id: 'about', label: 'About', href: (b) => `${b}about.html` },
    { id: 'resume', label: 'Resume', href: (b) => `${b}resume.html` },
  ];

  const FOOTER_LINKS = [
    { label: 'priyalshri1@gmail.com', href: 'mailto:priyalshri1@gmail.com', external: false },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/priyalshri/',
      external: true,
      suffix: ' ↗',
    },
    { label: 'CV', href: 'resume.html', external: false, suffix: ' ↗', resolveBase: true },
  ];

  function navHtml(opts) {
    const base = opts.base || '';
    const page = opts.page || '';
    const brandHref = `${base}index.html`;
    const links = NAV_ITEMS.map((item) => {
      const href = item.href(base);
      const active = page === item.id ? ' is-active accent' : '';
      return `<li><a href="${href}" class="u-draw${active}">${item.label}</a></li>`;
    }).join('\n          ');

    return `
    <a href="#main" class="skip-link sg-nav">Skip to content</a>
    <nav aria-label="Primary" class="site-nav sg-nav">
      <a href="${brandHref}" class="site-nav__brand u-draw" aria-label="Priyal Shrivastava home"><span class="site-nav__mark" aria-hidden="true">PS.</span></a>
      <ul class="site-nav__links">
          ${links}
      </ul>
    </nav>`;
  }

  function footerHtml(opts) {
    const base = opts.base || '';
    const items = FOOTER_LINKS.map((link) => {
      let href = link.resolveBase ? `${base}${link.href}` : link.href;
      const ext = link.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      const suffix = link.suffix
        ? `<span class="arrow-shift" aria-hidden="true">${link.suffix}</span>`
        : '';
      return `<li><a class="u-draw" href="${href}"${ext}>${link.label}${suffix}</a></li>`;
    }).join('\n          ');

    return `
    <footer class="site-footer" aria-label="Contact">
      <div class="site-footer__inner">
        <ul class="site-footer__links sg-nav">
          ${items}
        </ul>
        <p class="sg-meta site-footer__meta">designed by a human</p>
      </div>
    </footer>`;
  }

  function headLinksHtml(base) {
    const b = base || '';
    return `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,400;0,9..144,600;1,9..144,400;1,9..144,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${b}css/grid.css">
  <link rel="stylesheet" href="${b}css/shell.css">`;
  }

  /** @param {HTMLElement} el @param {{ base?: string, page?: string }} opts */
  function mountNav(el, opts) {
    if (!el) return;
    el.outerHTML = navHtml(opts);
  }

  /** @param {HTMLElement} el @param {{ base?: string }} opts */
  function mountFooter(el, opts) {
    if (!el) return;
    el.outerHTML = footerHtml(opts);
  }

  function readShellOpts() {
    const body = document.body;
    return {
      base: body.getAttribute('data-shell-base') || '',
      page: body.getAttribute('data-shell-page') || '',
    };
  }

  function bootNavContrastFor(selector, bodyClass) {
    const body = document.body;
    if (!body.classList.contains(bodyClass)) return;
    const hero = document.querySelector(selector);
    if (!hero) return;

    const sync = () => {
      const past = window.scrollY > hero.offsetHeight - 72;
      body.classList.toggle('is-scrolled-past-hero', past);
    };
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
  }

  function bootCaseStudyNavContrast() {
    const body = document.body;
    const usesLegacyCaseShell = body.classList.contains('page-case-study');
    const usesSharedDarkHero = body.classList.contains('case-study--dark-hero');
    if (!usesLegacyCaseShell && !usesSharedDarkHero) return;
    const hero = document.querySelector('.cs-hero, .case-hero--dark, .hero-dark');
    if (!hero) return;
    const quote = usesLegacyCaseShell
      ? document.querySelector('.cs-quote-band')
      : document.querySelector('.case-hero--dark + .snapshot, .hero-dark + .snapshot');

    const sync = () => {
      const darkEnd = quote
        ? quote.offsetTop + quote.offsetHeight
        : hero.offsetHeight;
      const past = window.scrollY > darkEnd - 72;
      body.classList.toggle('is-scrolled-past-hero', past);
    };
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
  }

  function bootCaseStudyProgress() {
    const body = document.body;
    if (!body.classList.contains('page-case-study')) return;
    const bar = document.getElementById('cs-progress');
    if (!bar) return;

    const sync = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      bar.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
    };
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
  }

  function bootNavScrim() {
    const body = document.body;
    const nav = document.querySelector('.site-nav');
    if (!nav) return;

    const darkSelectors = [
      '[data-nav-theme="dark"]',
      '.case-hero--dark',
      '.hero-dark',
      '.case-hero--dark + .snapshot',
      '.hero-dark + .snapshot',
      '.case-chapter',
      '.fold-dark',
      '.strip-dark',
      '.case-ending',
      '.closing',
      '.analysis-public',
      '.about-intro',
      '.play-intro',
      '.res-hero-band'
    ].join(',');

    const darkSections = Array.from(document.querySelectorAll(darkSelectors));

    const sync = () => {
      const navProbe = Math.min(58, window.innerHeight - 1);
      const isDark = darkSections.some((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= navProbe && rect.bottom >= navProbe;
      });

      body.classList.toggle('has-nav-scrim', window.scrollY > 24);
      body.classList.toggle('is-nav-on-dark', isDark);
    };

    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
  }

  function bootDotField() {
    if (document.body.classList.contains('case-study')) {
      const darkHosts = document.querySelectorAll('.case-hero--dark, .hero-dark, .case-chapter, .fold-dark, .strip-dark, .case-ending, .closing, .analysis-public');
      darkHosts.forEach((host) => {
        const hasField = Array.from(host.children).some((child) => child.matches('[data-human-field]'));
        if (hasField) return;

        const styles = window.getComputedStyle(document.body);
        const accent = styles.getPropertyValue('--case-accent-dark-rgb').trim() || '169, 159, 255';
        const canvas = document.createElement('canvas');
        canvas.className = 'dark-section__network';
        canvas.dataset.humanField = host.classList.contains('case-ending') || host.classList.contains('closing') ? '58' : '78';
        canvas.dataset.dotColor = accent;
        canvas.dataset.dotColorMuted = '255, 255, 255';
        canvas.dataset.lineColor = accent;
        canvas.setAttribute('aria-hidden', 'true');
        host.dataset.fieldHost = '';
        host.prepend(canvas);
      });
    }

    document.querySelectorAll('[data-human-field]').forEach((canvas) => {
      const host = canvas.closest('[data-field-host]');
      if (!host) return;

      const context = canvas.getContext('2d');
      if (!context) return;
      const density = Number(canvas.dataset.humanField) || 54;
      const accentColor = canvas.dataset.dotColor || '84, 70, 184';
      const mutedColor = canvas.dataset.dotColorMuted || '30, 29, 34';
      const lineColor = canvas.dataset.lineColor || accentColor;
      const scrollDrift = Number(canvas.dataset.scrollDrift) || 0;
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
        const drift = scrollDrift ? window.scrollY * scrollDrift : 0;
        const live = points.map((point) => {
          const rawX = point.x * width + Math.sin(t * point.speed + point.phase) * 18 + drift;
          const x = width ? ((rawX % width) + width) % width : rawX;
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
          context.fillStyle = index % 5 === 0 ? `rgba(${accentColor}, 0.5)` : `rgba(${mutedColor}, 0.32)`;
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

  function autoInit() {
    const opts = readShellOpts();
    mountNav(document.getElementById('site-nav'), opts);
    mountFooter(document.getElementById('site-footer'), opts);
    bootCaseStudyNavContrast();
    bootCaseStudyProgress();
    bootNavScrim();
    bootNavContrastFor('.about-intro', 'page-about');
    bootNavContrastFor('.play-intro', 'page-play');
    bootNavContrastFor('.res-hero-band', 'page-resume');
    bootDotField();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  global.SiteShell = { navHtml, footerHtml, headLinksHtml, mountNav, mountFooter, NAV_ITEMS };
})(typeof window !== 'undefined' ? window : globalThis);
