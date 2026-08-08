/**
 * Hero diagram — people ∩ technology → research, ringed by policy.
 *
 * Usage:
 *   Diagram.mountAndInit(container)
 *   Diagram.mountBackdrop(heroEl)  // dim + lit chimney layers
 *
 * Requires GSAP and Motion (js/motion.js) for drift; spotlight works without.
 */
(function (global) {
  const CX = 210;
  const CY = 214;
  const ORIGIN = `${CX} ${CY}`;

  const labelStyle =
    'font-family: var(--font-archivo), sans-serif; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase';

  function svgMarkup(theme, opts) {
    const dark = theme === 'dark';
    const hideLabels = !!(opts && opts.hideLabels);
    const stroke = dark ? 'rgba(255,255,255,0.55)' : 'var(--ink)';
    const strokeSoft = dark ? 'rgba(255,255,255,0.32)' : 'var(--ink)';
    const label = dark ? 'rgba(255,255,255,0.78)' : 'var(--ink)';
    const muted = dark ? 'rgba(255,255,255,0.45)' : 'var(--grey)';
    const glow = 'var(--glow-soft, var(--glow, #9D91FF))';
    const strokeOp = dark ? '1' : '0.7';
    const ringOp = dark ? '1' : '0.45';
    const labels = hideLabels
      ? ''
      : `
  <text x="104" y="${CY + 4}" text-anchor="middle" fill="${label}" style="${labelStyle}">people</text>
  <text x="316" y="${CY + 4}" text-anchor="middle" fill="${label}" style="${labelStyle}">technology</text>
  <text x="${CX}" y="${CY + 30}" text-anchor="middle" fill="${glow}" style="${labelStyle}">research</text>
  <text x="${CX}" y="34" text-anchor="middle" fill="${muted}" style="${labelStyle}">policy</text>`;

    return `
<svg class="hero-diagram" viewBox="0 0 420 420" width="100%" role="img"
  aria-label="Two overlapping circles, people and technology, with research in the overlap. A wider dashed ring around both is labeled policy."
  style="max-width: 460px; display: block; margin: 0 auto; overflow: visible">
  <g data-hover="ring">
    <g data-drift="ring">
      <circle cx="${CX}" cy="${CY}" r="196" fill="none" stroke="${strokeSoft}" stroke-opacity="${ringOp}"
        stroke-width="1.5" stroke-dasharray="1 8" stroke-linecap="round"/>
    </g>
  </g>
  <g data-hover="people">
    <g data-drift="people">
      <circle cx="158" cy="${CY}" r="112" fill="none" stroke="${stroke}" stroke-opacity="${strokeOp}" stroke-width="1.5"/>
    </g>
  </g>
  <g data-hover="tech">
    <g data-drift="tech">
      <circle cx="262" cy="${CY}" r="112" fill="none" stroke="${stroke}" stroke-opacity="${strokeOp}" stroke-width="1.5"/>
    </g>
  </g>
  <g data-hover="research">
    <g data-drift="research">
      <circle cx="${CX}" cy="${CY}" r="7" fill="${glow}"/>
    </g>
  </g>
  ${labels}
</svg>`;
  }

  /** @param {HTMLElement} container */
  function mount(container, theme, opts) {
    container.innerHTML = svgMarkup(theme || 'light', opts).trim();
    return container.querySelector('svg');
  }

  /** @param {SVGElement} root */
  function init(root) {
    if (!root || typeof gsap === 'undefined' || !global.Motion) return () => {};
    const { EASE, DRIFT_A, DRIFT_B, BREATHE, HOVER_SETTLE, reducedMotion } = global.Motion;
    if (reducedMotion()) return () => {};

    const ctx = gsap.context(() => {
      gsap.to(root.querySelector('[data-drift="people"]'), {
        x: 6,
        y: -4,
        duration: DRIFT_A,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(root.querySelector('[data-drift="tech"]'), {
        x: -5,
        y: 5,
        duration: DRIFT_B,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(root.querySelector('[data-drift="research"]'), {
        x: 1,
        y: 2,
        duration: DRIFT_A,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(root.querySelector('[data-drift="ring"]'), {
        scale: 1.02,
        transformOrigin: '50% 50%',
        svgOrigin: ORIGIN,
        duration: BREATHE,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, root);

    const enter = () => {
      gsap.to(root.querySelector('[data-hover="people"]'), { x: 10, duration: HOVER_SETTLE, ease: EASE });
      gsap.to(root.querySelector('[data-hover="tech"]'), { x: -10, duration: HOVER_SETTLE, ease: EASE });
      gsap.to(root.querySelector('[data-hover="research"]'), {
        scale: 1.28,
        svgOrigin: ORIGIN,
        duration: HOVER_SETTLE,
        ease: EASE,
      });
      gsap.to(root.querySelector('[data-hover="ring"]'), {
        scale: 0.965,
        svgOrigin: ORIGIN,
        duration: HOVER_SETTLE,
        ease: EASE,
      });
    };
    const leave = () => {
      gsap.to(root.querySelector('[data-hover="people"]'), { x: 0, duration: HOVER_SETTLE, ease: EASE });
      gsap.to(root.querySelector('[data-hover="tech"]'), { x: 0, duration: HOVER_SETTLE, ease: EASE });
      gsap.to(root.querySelector('[data-hover="research"]'), {
        scale: 1,
        svgOrigin: ORIGIN,
        duration: HOVER_SETTLE,
        ease: EASE,
      });
      gsap.to(root.querySelector('[data-hover="ring"]'), {
        scale: 1,
        svgOrigin: ORIGIN,
        duration: HOVER_SETTLE,
        ease: EASE,
      });
    };

    root.addEventListener('pointerenter', enter);
    root.addEventListener('pointerleave', leave);

    return () => {
      root.removeEventListener('pointerenter', enter);
      root.removeEventListener('pointerleave', leave);
      ctx.revert();
    };
  }

  /** @param {HTMLElement} container */
  function mountAndInit(container) {
    const svg = mount(container, 'light');
    return init(svg);
  }

  /**
   * Backdrop mode: dim + lit layers under the hero, chimney spotlight follows cursor.
   * @param {HTMLElement} hero
   */
  function mountBackdrop(hero) {
    if (!hero) return () => {};
    const wrap = hero.querySelector('.home-hero__diagram');
    const dimHost = hero.querySelector('[data-diagram]');
    const litHost = hero.querySelector('[data-diagram-lit]');
    if (!wrap || !dimHost || !litHost) return () => {};

    // Geometry always; labels only in the lit chimney so they never sit on the bio.
    const dimSvg = mount(dimHost, 'dark', { hideLabels: true });
    const litSvg = mount(litHost, 'dark');
    litSvg.querySelectorAll('circle[stroke]').forEach((c) => {
      c.setAttribute('stroke-opacity', '1');
      if (c.getAttribute('stroke-dasharray')) {
        c.setAttribute('stroke', 'rgba(255,255,255,0.6)');
      } else {
        c.setAttribute('stroke', 'rgba(255,255,255,0.92)');
      }
    });
    const litLabels = litSvg.querySelectorAll('text');
    litLabels.forEach((t) => {
      if (t.textContent === 'research') t.setAttribute('fill', 'var(--glow-soft, #9D91FF)');
      else if (t.textContent === 'policy') t.setAttribute('fill', 'rgba(255,255,255,0.58)');
      else t.setAttribute('fill', 'rgba(255,255,255,0.95)');
      t.style.opacity = '0';
      t.style.transition = 'opacity 0.25s ease';
    });
    function setLabels(on) {
      litLabels.forEach((t) => {
        t.style.opacity = on ? '1' : '0';
      });
    }

    // Drift can respect reduced motion; chimney still tracks (opacity-only).
    const cleanups = [init(dimSvg), init(litSvg)];

    let hot = false;
    let raf = 0;
    let pendingX = 0;
    let pendingY = 0;
    let hasPending = false;

    function setSpot(clientX, clientY) {
      const rect = wrap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      wrap.style.setProperty('--spot-x', `${Math.max(-8, Math.min(108, x))}%`);
      wrap.style.setProperty('--spot-y', `${Math.max(-8, Math.min(108, y))}%`);

      const dx = x / 100 - 0.5;
      const dy = y / 100 - 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const r = 150 + (1 - Math.min(1, dist * 1.4)) * 55;
      wrap.style.setProperty('--spot-r', `${r}px`);
    }

    function onMove(e) {
      pendingX = e.clientX;
      pendingY = e.clientY;
      hasPending = true;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!hasPending) return;
        setSpot(pendingX, pendingY);
        if (!hot) {
          hot = true;
          hero.classList.add('is-diagram-hot');
          setLabels(true);
        }
      });
    }

    function restSpot() {
      wrap.style.setProperty('--spot-x', '50%');
      wrap.style.setProperty('--spot-y', '50%');
      wrap.style.setProperty('--spot-r', '140px');
    }

    function onLeave() {
      hot = false;
      hasPending = false;
      hero.classList.remove('is-diagram-hot');
      setLabels(false);
      restSpot();
    }

    hero.addEventListener('pointermove', onMove, { passive: true });
    hero.addEventListener('mousemove', onMove, { passive: true });
    hero.addEventListener('pointerleave', onLeave);
    hero.addEventListener('mouseleave', onLeave);
    restSpot();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      hero.removeEventListener('mouseleave', onLeave);
      hero.classList.remove('is-diagram-hot');
      cleanups.forEach((fn) => fn && fn());
    };
  }

  global.Diagram = { mount, init, mountAndInit, mountBackdrop, svgMarkup };
})(typeof window !== 'undefined' ? window : globalThis);
