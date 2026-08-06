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
    {
      label: 'Google Scholar',
      href: 'https://scholar.google.com/citations?user=PLACEHOLDER',
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
      <a href="${brandHref}" class="site-nav__brand u-draw">Priyal Shrivastava</a>
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
    <footer class="site-footer frame" aria-label="Contact">
      <div class="cell-a">
        <ul class="site-footer__links sg-nav">
          ${items}
        </ul>
      </div>
      <div class="cell-c site-footer__meta">
        <p class="sg-meta">made by a human</p>
      </div>
    </footer>`;
  }

  function headLinksHtml(base) {
    const b = base || '';
    return `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,340;9..144,360&family=Space+Grotesk:wght@400;500&display=swap" rel="stylesheet">
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

  function autoInit() {
    const opts = readShellOpts();
    mountNav(document.getElementById('site-nav'), opts);
    mountFooter(document.getElementById('site-footer'), opts);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  global.SiteShell = { navHtml, footerHtml, headLinksHtml, mountNav, mountFooter, NAV_ITEMS };
})(typeof window !== 'undefined' ? window : globalThis);
