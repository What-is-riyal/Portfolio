'use client';

/**
 * The Mondrian whisper: every grid line on the site, as SVG paths.
 *
 * Rigid at rest, organic on contact. Lines are dead straight until the cursor
 * comes near; the nearest line bows toward the pointer with a localized,
 * tangent-continuous bump, then relaxes back. This is the site's signature
 * motion, so it is built as a system, not an effect:
 *
 * - Geometry comes from the real CSS grid. Rail x-positions are measured from
 *   marker elements placed in the grid's gutter tracks; horizontal rules sit at
 *   the centerline of empty .rule-gap rows. Lines therefore live in gutters
 *   and margins only and can never cross content while straight.
 * - They can never cross content while BENT either: each line's bow is capped
 *   per side at (empty space on that side - clearance), measured, not assumed.
 * - One gsap.quickTo pair per line, created once. pointermove only records the
 *   cursor; all math runs once per frame on gsap.ticker. No tween is ever
 *   allocated during movement.
 * - prefers-reduced-motion: lines render straight and static, instantly. No
 *   listeners, no ticker, no entry wipe. The bend is a delight, never
 *   load-bearing.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  EASE,
  ENTRY_TOTAL,
  ENTRY_STAGGER,
  BEND_RADIUS,
  BEND_MAX,
  BEND_SETTLE,
  BEND_FOLLOW,
  BUMP_HALF,
  MARK_RADIUS,
  MARK_ROTATE,
  MARK_NUDGE,
  reducedMotion,
} from '@/lib/motion';

export type MarkSpec = {
  rail: 0 | 1 | 2 | 3;
  rule: number; // index into the page's .rule-gap elements, top to bottom
  kind: 'red' | 'yellow';
};

type Axis = 'v' | 'h';

type Line = {
  axis: Axis;
  fixed: number; // x for vertical, y for horizontal
  a: number; // span start along the axis
  b: number; // span end
  dotted: boolean;
  capPos: number; // max bow in +fixed direction (right / down)
  capNeg: number; // max bow in -fixed direction
  el: SVGPathElement;
  st: { u: number; dv: number };
  qU: (v: number) => gsap.core.Tween;
  qDv: (v: number) => gsap.core.Tween;
};

type Mark = {
  x: number;
  y: number;
  kind: 'red' | 'yellow';
  el: SVGGElement;
  qx: (v: number) => gsap.core.Tween;
  qy: (v: number) => gsap.core.Tween;
  qr: (v: number) => gsap.core.Tween;
};

const CTRL = 0.44; // bump control-point distance as a fraction of BUMP_HALF
const CLEAR = 6; // px a bent line always keeps from any content edge

function bumpPath(l: Line): string {
  const { axis, fixed, a, b } = l;
  const { u, dv } = l.st;
  const straight =
    axis === 'v'
      ? `M ${fixed} ${a} L ${fixed} ${b}`
      : `M ${a} ${fixed} L ${b} ${fixed}`;
  if (Math.abs(dv) < 0.05) return straight;

  const W = BUMP_HALF;
  if (b - a < 2 * W + 20) {
    // Short line: a single quadratic bow across the whole span.
    const mid = (a + b) / 2;
    return axis === 'v'
      ? `M ${fixed} ${a} Q ${fixed + dv * 2} ${mid} ${fixed} ${b}`
      : `M ${a} ${fixed} Q ${mid} ${fixed + dv * 2} ${b} ${fixed}`;
  }

  const u0 = Math.min(Math.max(u, a + W), b - W);
  const c = W * CTRL;
  const f = fixed;
  const d = f + dv;
  if (axis === 'v') {
    return (
      `M ${f} ${a} L ${f} ${u0 - W}` +
      ` C ${f} ${u0 - c} ${d} ${u0 - c} ${d} ${u0}` +
      ` C ${d} ${u0 + c} ${f} ${u0 + c} ${f} ${u0 + W}` +
      ` L ${f} ${b}`
    );
  }
  return (
    `M ${a} ${f} L ${u0 - W} ${f}` +
    ` C ${u0 - c} ${f} ${u0 - c} ${d} ${u0} ${d}` +
    ` C ${u0 + c} ${d} ${u0 + c} ${f} ${u0 + W} ${f}` +
    ` L ${b} ${f}`
  );
}

export default function MondrianLines({ marks = [] }: { marks?: MarkSpec[] }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const host = svg?.parentElement?.parentElement; // .site-lines -> page wrapper
    if (!svg || !host) return;

    let lines: Line[] = [];
    let markObjs: Mark[] = [];
    let cursor = { cx: -1e4, cy: -1e4 };
    let hostTop = 0;
    let hostLeft = 0;
    let entered = false;
    let killed = false;
    const ctx = gsap.context(() => {});
    const reduced = reducedMotion();
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
      .matches;

    const ns = 'http://www.w3.org/2000/svg';

    function clear() {
      while (svg!.firstChild) svg!.removeChild(svg!.firstChild);
      lines = [];
      markObjs = [];
    }

    function measureAndBuild() {
      clear();
      const hostRect = host!.getBoundingClientRect();
      hostTop = hostRect.top + window.scrollY;
      hostLeft = hostRect.left + window.scrollX;
      const width = host!.clientWidth;
      const height = host!.scrollHeight;
      svg!.setAttribute('width', String(width));
      svg!.setAttribute('height', String(height));
      svg!.setAttribute('viewBox', `0 0 ${width} ${height}`);

      const rel = (r: DOMRect) => ({
        left: r.left + window.scrollX - hostLeft,
        right: r.right + window.scrollX - hostLeft,
        top: r.top + window.scrollY - hostTop,
        bottom: r.bottom + window.scrollY - hostTop,
        cx: (r.left + r.right) / 2 + window.scrollX - hostLeft,
        cy: (r.top + r.bottom) / 2 + window.scrollY - hostTop,
      });

      const q = (sel: string) => host!.querySelector(sel);
      const mC1 = q('.m-c1'),
        mG1 = q('.m-g1'),
        mG2 = q('.m-g2'),
        mC3 = q('.m-c3');
      if (!mC1 || !mC3) return;

      // How far a line may bow toward a content cell: stay under the cell's
      // own padding, with clearance. Measured from the real computed style.
      const cellEl = host!.querySelector('.cell-a') as HTMLElement | null;
      const cellPad = cellEl
        ? parseFloat(getComputedStyle(cellEl).paddingLeft) || 20
        : 20;
      const capInto = Math.max(0, cellPad - CLEAR);

      const c1 = rel(mC1.getBoundingClientRect());
      const c3 = rel(mC3.getBoundingClientRect());
      const g1 = mG1 && (mG1 as HTMLElement).offsetParent !== null ? rel(mG1.getBoundingClientRect()) : null;
      const g2 = mG2 && (mG2 as HTMLElement).offsetParent !== null ? rel(mG2.getBoundingClientRect()) : null;
      const gutterHalfCap = (g: { left: number; right: number }) =>
        Math.min(BEND_MAX, (g.right - g.left) / 2 - CLEAR);

      // Rails end where the grid resolves out, just before the close.
      const endEl = q('[data-rails-end]');
      const railsEnd = endEl
        ? rel(endEl.getBoundingClientRect()).top
        : height;

      // Rail definitions: position, dash style, per-side bow caps.
      const railDefs: {
        x: number;
        dotted: boolean;
        capPos: number;
        capNeg: number;
      }[] = [];
      railDefs[0] = {
        x: c1.left,
        dotted: false,
        capPos: Math.min(BEND_MAX, capInto), // right, into c1: stay inside its padding
        capNeg: BEND_MAX, // left, into the page margin: free
      };
      if (g1)
        railDefs[1] = {
          x: g1.cx,
          dotted: false,
          capPos: gutterHalfCap(g1),
          capNeg: gutterHalfCap(g1),
        };
      if (g2)
        railDefs[2] = {
          x: g2.cx,
          dotted: true,
          capPos: gutterHalfCap(g2),
          capNeg: gutterHalfCap(g2),
        };
      railDefs[3] = {
        x: c3.right,
        dotted: false,
        capPos: BEND_MAX, // right, into the page margin: free
        capNeg: Math.min(BEND_MAX, capInto), // left, into c3
      };

      const mkPath = (dotted: boolean) => {
        const p = document.createElementNS(ns, 'path');
        p.setAttribute('fill', 'none');
        p.setAttribute('stroke', 'var(--line-color)');
        if (dotted) {
          p.setAttribute('stroke-width', '1.5');
          p.setAttribute('stroke-dasharray', '0.5 7');
          p.setAttribute('stroke-linecap', 'round');
        } else {
          p.setAttribute('stroke-width', '1');
        }
        svg!.appendChild(p);
        return p;
      };

      const addLine = (
        axis: Axis,
        fixed: number,
        a: number,
        b: number,
        dotted: boolean,
        capPos: number,
        capNeg: number,
      ) => {
        const el = mkPath(dotted);
        const st = { u: (a + b) / 2, dv: 0 };
        const line: Line = {
          axis,
          fixed,
          a,
          b,
          dotted,
          capPos: Math.max(0, capPos),
          capNeg: Math.max(0, capNeg),
          el,
          st,
          qU: gsap.quickTo(st, 'u', {
            duration: BEND_FOLLOW,
            ease: EASE,
            onUpdate: () => el.setAttribute('d', bumpPath(line)),
          }),
          qDv: gsap.quickTo(st, 'dv', {
            duration: BEND_SETTLE,
            ease: EASE,
            onUpdate: () => el.setAttribute('d', bumpPath(line)),
          }),
        };
        el.setAttribute('d', bumpPath(line));
        lines.push(line);
        return line;
      };

      // Rails start just below the fixed nav so a rule never crosses nav text.
      const navEl = host!.querySelector('nav');
      const railYTop = navEl
        ? Math.round(navEl.getBoundingClientRect().height) + 12
        : 64;
      railDefs.forEach((rd) => {
        if (rd) addLine('v', rd.x, railYTop, railsEnd, rd.dotted, rd.capPos, rd.capNeg);
      });

      // Horizontal rules: centerlines of the empty .rule-gap rows.
      // data-from / data-to pick which rails they span; data-dotted for style.
      const railX = (i: number): number | null => (railDefs[i] ? railDefs[i].x : null);
      host!.querySelectorAll<HTMLElement>('.rule-gap[data-rule]').forEach((el) => {
        const r = rel(el.getBoundingClientRect());
        const halfGap = (r.bottom - r.top) / 2;
        const cap = Math.min(BEND_MAX, halfGap - CLEAR);
        let x1 = railX(Number(el.dataset.from ?? 0));
        let x2 = railX(Number(el.dataset.to ?? 3));
        if (x1 === null) x1 = c1.left;
        if (x2 === null) x2 = c3.right;
        addLine('h', r.cy, x1, x2, el.dataset.dotted === 'true', cap, cap);
      });

      // Primary marks: punctuation at intersections, in gutter space only.
      const ruleEls = Array.from(
        host!.querySelectorAll<HTMLElement>('.rule-gap[data-rule]'),
      );
      marks.forEach((m) => {
        const rx = railX(m.rail);
        const ruleEl = ruleEls[m.rule];
        if (rx === null || !ruleEl) return;
        const ry = rel(ruleEl.getBoundingClientRect()).cy;
        const g = document.createElementNS(ns, 'g');
        const rect = document.createElementNS(ns, 'rect');
        if (m.kind === 'red') {
          rect.setAttribute('x', String(rx - 5.5));
          rect.setAttribute('y', String(ry - 5.5));
          rect.setAttribute('width', '11');
          rect.setAttribute('height', '11');
          rect.setAttribute('fill', 'var(--red)');
        } else {
          rect.setAttribute('x', String(rx - 12));
          rect.setAttribute('y', String(ry - 12));
          rect.setAttribute('width', '24');
          rect.setAttribute('height', '24');
          rect.setAttribute('fill', 'none');
          rect.setAttribute('stroke', 'var(--yellow)');
          rect.setAttribute('stroke-width', '1.5');
        }
        g.appendChild(rect);
        svg!.appendChild(g);
        gsap.set(g, { transformOrigin: '50% 50%' });
        markObjs.push({
          x: rx,
          y: ry,
          kind: m.kind,
          el: g,
          qx: gsap.quickTo(g, 'x', { duration: BEND_SETTLE, ease: EASE }),
          qy: gsap.quickTo(g, 'y', { duration: BEND_SETTLE, ease: EASE }),
          qr: gsap.quickTo(g, 'rotation', { duration: BEND_SETTLE, ease: EASE }),
        });
      });
    }

    function entry() {
      // The grid draws itself once: fast, confident, ~700ms, then never
      // self-animates again. Solid lines wipe via dashoffset; dotted lines
      // and marks join inside the same single entrance.
      const tl = gsap.timeline();
      lines.forEach((l, i) => {
        const len = l.b - l.a;
        if (!l.dotted) {
          l.el.setAttribute('stroke-dasharray', String(len));
          l.el.setAttribute('stroke-dashoffset', String(len));
          tl.to(
            l.el,
            {
              strokeDashoffset: 0,
              duration: ENTRY_TOTAL * 0.7,
              ease: EASE,
              onComplete: () => {
                l.el.removeAttribute('stroke-dasharray');
                l.el.removeAttribute('stroke-dashoffset');
              },
            },
            i * ENTRY_STAGGER,
          );
        } else {
          gsap.set(l.el, { opacity: 0 });
          tl.to(
            l.el,
            { opacity: 1, duration: ENTRY_TOTAL * 0.5, ease: 'none' },
            i * ENTRY_STAGGER + 0.15,
          );
        }
      });
      markObjs.forEach((m, i) => {
        gsap.set(m.el, { opacity: 0, scale: 0.6 });
        tl.to(
          m.el,
          { opacity: 1, scale: 1, duration: 0.35, ease: EASE },
          ENTRY_TOTAL * 0.55 + i * 0.05,
        );
      });
    }

    // Cursor math, once per frame. pointermove only records the position.
    function tick() {
      const sy = window.scrollY;
      const sx = window.scrollX;
      const px = cursor.cx + sx - hostLeft;
      const py = cursor.cy + sy - hostTop;

      for (const l of lines) {
        const along = l.axis === 'v' ? py : px;
        const across = l.axis === 'v' ? px : py;
        const u = Math.min(Math.max(along, l.a), l.b);
        const axialOut = Math.abs(along - u);
        const d = Math.hypot(across - l.fixed, axialOut);
        if (d < BEND_RADIUS) {
          const k = 1 - d / BEND_RADIUS;
          const side = across >= l.fixed ? 1 : -1;
          const cap = side > 0 ? l.capPos : l.capNeg;
          l.qU(u);
          l.qDv(side * k * k * cap);
        } else if (Math.abs(l.st.dv) > 0.01) {
          l.qDv(0);
        }
      }

      for (const m of markObjs) {
        const d = Math.hypot(px - m.x, py - m.y);
        if (d < MARK_RADIUS) {
          const k = 1 - d / MARK_RADIUS;
          if (m.kind === 'yellow') {
            m.qr(k * MARK_ROTATE * (px > m.x ? 1 : -1));
          } else {
            m.qx(((px - m.x) / MARK_RADIUS) * MARK_NUDGE * 2);
            m.qy(((py - m.y) / MARK_RADIUS) * MARK_NUDGE * 2);
          }
        } else {
          if (m.kind === 'yellow') m.qr(0);
          else {
            m.qx(0);
            m.qy(0);
          }
        }
      }
    }

    const onMove = (e: PointerEvent) => {
      cursor.cx = e.clientX;
      cursor.cy = e.clientY;
    };
    const onLeave = () => {
      cursor.cx = -1e4;
      cursor.cy = -1e4;
    };

    let ro: ResizeObserver | null = null;

    async function boot() {
      await document.fonts.ready;
      if (killed) return;
      measureAndBuild();
      if (!reduced && !entered) {
        entered = true;
        entry();
      }
      if (!reduced && finePointer) {
        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('pointerleave', onLeave);
        gsap.ticker.add(tick);
      }
      let rw = -1;
      let rh = -1;
      ro = new ResizeObserver((entries) => {
        const e = entries[0];
        if (!e) return;
        const w = Math.round(e.contentRect.width);
        const h = Math.round(e.contentRect.height);
        if (w === rw && h === rh) return;
        const first = rw === -1;
        rw = w;
        rh = h;
        if (!first) measureAndBuild();
      });
      ro.observe(host!);
    }
    boot();

    return () => {
      killed = true;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      gsap.ticker.remove(tick);
      ro?.disconnect();
      ctx.revert();
      clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="site-lines" aria-hidden="true">
      <svg ref={svgRef} style={{ display: 'block' }} />
    </div>
  );
}
