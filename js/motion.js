/**
 * Motion constants — v2 Mondrian system.
 * Ported from cca3c36:site/lib/motion.ts
 */
(function (global) {
  const Motion = {
    EASE: 'power2.out',
    ENTRY_TOTAL: 0.7,
    ENTRY_STAGGER: 0.06,
    BEND_RADIUS: 180,
    BEND_MAX: 26,
    BEND_SETTLE: 0.65,
    BEND_FOLLOW: 0.4,
    BUMP_HALF: 160,
    MARK_RADIUS: 120,
    MARK_ROTATE: 4,
    MARK_NUDGE: 2,
    reducedMotion() {
      return (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    },
  };
  global.Motion = Motion;
})(typeof window !== 'undefined' ? window : globalThis);
