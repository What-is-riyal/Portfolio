/**
 * Hero diagram: people and products overlap in research, ringed by context.
 *
 * Usage:
 *   const svg = Diagram.mount(container, 'dark')
 *   Diagram.init(svg)
 *
 * Requires GSAP and Motion (js/motion.js) for drift. The diagram remains
 * complete and readable if motion is unavailable.
 */
(function (global) {
  const CX = 210;
  const CY = 214;
  const ORIGIN = `${CX} ${CY}`;

  const labelStyle =
    'font-family: var(--font-archivo), sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase';

  function svgMarkup(theme, opts) {
    const dark = theme === 'dark';
    const hideLabels = !!(opts && opts.hideLabels);
    const stroke = dark ? 'rgba(255,255,255,0.55)' : 'var(--ink)';
    const strokeSoft = dark ? 'rgba(255,255,255,0.36)' : 'var(--ink)';
    const label = dark ? 'rgba(255,255,255,0.94)' : 'var(--ink)';
    const muted = dark ? 'rgba(255,255,255,0.82)' : 'var(--grey)';
    const glow = 'var(--glow-soft, var(--glow, #9D91FF))';
    const strokeOp = dark ? '1' : '0.7';
    const ringOp = dark ? '1' : '0.45';
    const labels = hideLabels
      ? ''
      : `
  <text x="104" y="${CY + 4}" text-anchor="middle" fill="${label}" style="${labelStyle}">people</text>
  <text x="316" y="${CY + 4}" text-anchor="middle" fill="${label}" style="${labelStyle}">technology</text>
  <text x="${CX}" y="${CY + 30}" text-anchor="middle" fill="${glow}" style="${labelStyle}">focus</text>
  <text x="${CX}" y="54" text-anchor="middle" fill="${muted}" style="${labelStyle}">policy</text>`;

    return `
<svg class="hero-diagram" viewBox="0 0 420 420" width="100%" role="img"
  aria-label="Two overlapping circles, people and technology, with my focus in the overlap. A wider dashed ring around both is labeled policy."
  style="max-width: 460px; display: block; margin: 0 auto; overflow: visible">
  <g data-hover="ring">
    <g data-drift="ring">
      <circle cx="${CX}" cy="${CY}" r="205" fill="none" stroke="${strokeSoft}" stroke-opacity="${ringOp}"
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

  global.Diagram = { mount, init, svgMarkup };
})(typeof window !== 'undefined' ? window : globalThis);
