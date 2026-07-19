'use client';

/**
 * The hero device (locked concept).
 *
 * Two overlapping circles, people and technology. Research sits in the overlap;
 * that is Priyal. A wider dashed ring encloses both, labeled policy: the frame
 * she reaches for, not a co-equal third circle. Blue does the primary work
 * (the research core), ink draws the two circles as a whisper.
 *
 * Idle: circles drift on slow offset sine loops (~10-11s); the policy ring
 * breathes (~14s). On hover the circles ease toward each other, the overlap
 * deepens, research grows a fraction, and the policy ring tightens. Releasing
 * returns to the idle drift, same soft weighted ease.
 *
 * Inner groups carry the drift, outer groups carry the hover, so the two
 * compose through SVG nesting without fighting over one transform.
 *
 * prefers-reduced-motion: no drift, no breathe, no hover. The SVG's base
 * positions are already a valid resting composition, fully legible.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { EASE, DRIFT_A, DRIFT_B, BREATHE, HOVER_SETTLE, reducedMotion } from '@/lib/motion';

const CX = 210;
const CY = 214;
const ORIGIN = `${CX} ${CY}`;

export default function Diagram() {
  const rootRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to('[data-drift="people"]', {
        x: 6, y: -4, duration: DRIFT_A, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
      gsap.to('[data-drift="tech"]', {
        x: -5, y: 5, duration: DRIFT_B, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
      gsap.to('[data-drift="research"]', {
        x: 1, y: 2, duration: DRIFT_A, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
      gsap.to('[data-drift="ring"]', {
        scale: 1.02, transformOrigin: '50% 50%', svgOrigin: ORIGIN,
        duration: BREATHE, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
    }, root);

    const enter = () => {
      gsap.to('[data-hover="people"]', { x: 10, duration: HOVER_SETTLE, ease: EASE });
      gsap.to('[data-hover="tech"]', { x: -10, duration: HOVER_SETTLE, ease: EASE });
      gsap.to('[data-hover="research"]', {
        scale: 1.28, svgOrigin: ORIGIN, duration: HOVER_SETTLE, ease: EASE,
      });
      gsap.to('[data-hover="ring"]', {
        scale: 0.965, svgOrigin: ORIGIN, duration: HOVER_SETTLE, ease: EASE,
      });
    };
    const leave = () => {
      gsap.to('[data-hover="people"]', { x: 0, duration: HOVER_SETTLE, ease: EASE });
      gsap.to('[data-hover="tech"]', { x: 0, duration: HOVER_SETTLE, ease: EASE });
      gsap.to('[data-hover="research"]', {
        scale: 1, svgOrigin: ORIGIN, duration: HOVER_SETTLE, ease: EASE,
      });
      gsap.to('[data-hover="ring"]', {
        scale: 1, svgOrigin: ORIGIN, duration: HOVER_SETTLE, ease: EASE,
      });
    };

    root.addEventListener('pointerenter', enter);
    root.addEventListener('pointerleave', leave);
    return () => {
      root.removeEventListener('pointerenter', enter);
      root.removeEventListener('pointerleave', leave);
      ctx.revert();
    };
  }, []);

  const label = { fontFamily: 'var(--font-grotesk), sans-serif', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase' as const };

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 420 420"
      width="100%"
      role="img"
      aria-label="Two overlapping circles, people and technology, with research in the overlap. A wider dashed ring around both is labeled policy."
      style={{ maxWidth: 460, display: 'block', margin: '0 auto', overflow: 'visible' }}
    >
      {/* policy ring: the wider frame */}
      <g data-hover="ring">
        <g data-drift="ring">
          <circle
            cx={CX} cy={CY} r={196}
            fill="none" stroke="var(--ink)" strokeOpacity={0.45}
            strokeWidth={1.5} strokeDasharray="1 8" strokeLinecap="round"
          />
        </g>
      </g>

      {/* people */}
      <g data-hover="people">
        <g data-drift="people">
          <circle cx={158} cy={CY} r={112} fill="none" stroke="var(--ink)" strokeOpacity={0.7} strokeWidth={1.5} />
        </g>
      </g>

      {/* technology */}
      <g data-hover="tech">
        <g data-drift="tech">
          <circle cx={262} cy={CY} r={112} fill="none" stroke="var(--ink)" strokeOpacity={0.7} strokeWidth={1.5} />
        </g>
      </g>

      {/* research: the overlap, the blue primary, that is her */}
      <g data-hover="research">
        <g data-drift="research">
          <circle cx={CX} cy={CY} r={7} fill="var(--blue)" />
        </g>
      </g>

      {/* labels, real text */}
      <text x={104} y={CY + 4} textAnchor="middle" fill="var(--ink)" style={label}>people</text>
      <text x={316} y={CY + 4} textAnchor="middle" fill="var(--ink)" style={label}>technology</text>
      <text x={CX} y={CY + 30} textAnchor="middle" fill="var(--blue)" style={label}>research</text>
      <text x={CX} y={34} textAnchor="middle" fill="var(--grey)" style={label}>policy</text>
    </svg>
  );
}
