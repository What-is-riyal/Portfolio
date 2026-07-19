/**
 * Motion constants. One source of truth; case study pages import this too.
 * Register: soft and weighted. power2.out everywhere. No springs, no overshoot.
 */

export const EASE = 'power2.out';

/** Entry: the grid draws itself once, fast and confident, then never self-animates again. */
export const ENTRY_TOTAL = 0.7; // seconds for the whole wipe
export const ENTRY_STAGGER = 0.06;

/** Cursor-driven line bending */
export const BEND_RADIUS = 180;      // px; lines beyond this stay straight
export const BEND_MAX = 26;          // px; hard cap, always < gutter/2 - padding so a
                                     // bent line can never enter a content cell
export const BEND_SETTLE = 0.65;     // s; the line yields and relaxes, reluctantly
export const BEND_FOLLOW = 0.4;      // s; apex tracks the cursor a touch faster
export const BUMP_HALF = 160;        // px; half-height of the localized bow window

/** Diagram idle drift: slow, continuous, barely there */
export const DRIFT_A = 10;           // s, people circle loop
export const DRIFT_B = 11;           // s, technology circle loop
export const BREATHE = 14;           // s, policy ring
export const HOVER_SETTLE = 0.7;     // s, circles easing toward each other

/** Marks near-cursor reaction */
export const MARK_RADIUS = 120;
export const MARK_ROTATE = 4;        // deg, yellow outline
export const MARK_NUDGE = 2;         // px, red square

export const reducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
