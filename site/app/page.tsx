import Link from 'next/link';
import MondrianLines, { MarkSpec } from '@/components/MondrianLines';
import Diagram from '@/components/Diagram';
import Wall from '@/components/Wall';
import { WORK } from '@/lib/work';

// Primary marks: punctuation at rail x rule intersections, in gutter space
// only, never over content. Two or three across the whole page, no more.
const MARKS: MarkSpec[] = [
  { rail: 2, rule: 0, kind: 'red' },
  { rail: 0, rule: 2, kind: 'yellow' },
  { rail: 3, rule: 3, kind: 'red' },
];

export default function Home() {
  return (
    <div className="page" style={{ position: 'relative', width: '100%' }}>
      <MondrianLines marks={MARKS} />

      <a href="#work" className="skip-link sg-nav">Skip to the work</a>

      {/* minimal fixed nav */}
      <nav
        aria-label="Primary"
        className="sg-nav"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40,
          display: 'flex', justifyContent: 'space-between',
          padding: '18px clamp(20px, 4vw, 56px)',
          mixBlendMode: 'multiply', pointerEvents: 'none',
        }}
      >
        <span style={{ pointerEvents: 'auto', letterSpacing: '0.04em' }}>Priyal Shrivastava</span>
        <span style={{ display: 'flex', gap: 'clamp(16px, 2vw, 32px)', pointerEvents: 'auto' }}>
          <a href="#work" className="u-draw">Work</a>
          <a href="#about" className="u-draw">About</a>
          <a href="#contact" className="u-draw accent">Contact</a>
        </span>
      </nav>

      <main className="site-content">
        {/* 01 — Hero */}
        <section className="frame" style={{ minHeight: '92vh', alignItems: 'center', paddingTop: '14vh' }}>
          {/* rail markers: the SVG overlay reads rail x-positions from these */}
          <div className="m-c1 rail-markers" aria-hidden="true" />
          <div className="m-g1 rail-markers" aria-hidden="true" />
          <div className="m-g2 rail-markers" aria-hidden="true" />
          <div className="m-c3 rail-markers" aria-hidden="true" />

          <div className="cell-a">
            <p className="sg-label" style={{ marginBottom: 'clamp(20px, 4vh, 40px)' }}>
              Priyal Shrivastava, UX Researcher
            </p>
            <h1 className="voice-hero" style={{ marginBottom: 'clamp(20px, 3vh, 32px)' }}>
              I work where people and technology meet.
            </h1>
            <p className="voice-sub" style={{ maxWidth: '32ch', marginBottom: 'clamp(28px, 5vh, 52px)' }}>
              Research is the part in the middle, and that part is me.{' '}
              <strong className="accent" style={{ fontWeight: 340 }}>Policy is the frame around it all.</strong>
            </p>
            <p className="sg-meta">
              Currently CMU MHCI &rsquo;26 &nbsp;·&nbsp; Available 2026
            </p>
          </div>

          <div className="cell-c" style={{ alignSelf: 'center' }}>
            <Diagram />
          </div>
        </section>

        <div className="rule-gap" data-rule="0" data-from="0" data-to="3" />

        {/* 02 — Selected work */}
        <section id="work" className="frame" style={{ scrollMarginTop: '80px' }}>
          <div className="cell-a">
            <h2 className="sg-label" style={{ marginBottom: 'clamp(28px, 5vh, 56px)' }}>Selected work</h2>
          </div>
          <div className="cell-full" style={{ gridColumn: 'c1 / page-r', paddingTop: 0 }}>
            <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 5vh, 64px)' }}>
              {WORK.map((w) => (
                <li key={w.slug} className="frame" style={{ gridColumn: 'c1 / page-r' }}>
                  <Link
                    href={`/work/${w.slug}/`}
                    className="cell-a"
                    style={{ display: 'block', gridColumn: 'c1 / g1' }}
                  >
                    <span className="voice-row u-draw" style={{ display: 'inline-block' }}>{w.project}</span>
                    <span className="arrow-shift accent" aria-hidden="true" style={{ marginLeft: 10 }}>→</span>
                    <span className="voice-sub" style={{ display: 'block', color: 'var(--grey)', marginTop: 8, fontStyle: 'italic' }}>
                      {w.claim === 'TODO_CLAIM' ? 'Her finding goes here.' : w.claim}
                    </span>
                  </Link>
                  <div className="cell-c" style={{ gridColumn: 'c3 / page-r', alignSelf: 'end' }}>
                    <p className="sg-tech" style={{ lineHeight: 1.6 }}>{w.tech}</p>
                    {w.tag && <p className="sg-label accent" style={{ marginTop: 8 }}>{w.tag}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="rule-gap" data-rule="1" data-from="0" data-to="3" />

        {/* 03 — About / her story */}
        <section id="about" className="frame" style={{ scrollMarginTop: '80px' }}>
          <div className="cell-a">
            <h2 className="sg-label" style={{ marginBottom: 'clamp(24px, 4vh, 44px)' }}>About</h2>
            {/* TODO: draft in her voice from the brief notes. Needs her approval. */}
            <div className="voice-prose" style={{ display: 'flex', flexDirection: 'column', gap: '1.4em' }}>
              <p>I was a designer first. My heart was always in research, and when the research team was forming I moved over, because I kept losing arguments I knew I was right about. As a designer I had taste. I did not have data. Research was how I got it.</p>
              <p>Before it was a job it was a survival instinct. I grew up with social anxiety, so everyone around me became a case study. If I could understand people, I could fit in. I never really stopped.</p>
              <p>What I study is how people and technology meet, and what that does to us: cognitively, socially, culturally. The technology is always half the object. I am not studying people alone, I am studying the seam.</p>
              <p>Here is what I believe about change. I want technology to be good for people, and the internet to be safe for people. Industry is the first place I try, because if a company already cares, that is the easiest place to actually move something. When that will not move, policy is the outside force. And underneath both, academic research surfaces the problem so someone can act on it. Same belief, three levels, and I stand at whichever one is closest to working.</p>
              <p>The short version: I want to be on the right side of history. To use technology for not bad. To help keep AI from ending in our doom. I mean that plainly.</p>
            </div>
          </div>
        </section>

        <div className="rule-gap" data-rule="2" data-from="0" data-to="3" data-dotted="true" />

        {/* 04 — The human section */}
        <section className="frame">
          <div className="cell-a">
            <h2 className="sg-label" style={{ marginBottom: 'clamp(24px, 4vh, 44px)' }}>Away from the work</h2>
            <p className="voice-prose" style={{ marginBottom: '1.2em' }}>
              It is the same instinct, pointed elsewhere. Understanding people, bringing them together, looking after things that cannot speak for themselves.
            </p>
            <p className="voice-prose">
              I sing, and I have organized concerts. I play instruments. I foster cats. I have held leadership roles I cared about. {/* TODO: specifics she wants included */}
            </p>
          </div>
        </section>

        <div className="rule-gap" data-rule="3" data-from="0" data-to="3" />

        {/* 05 — The wall */}
        <section className="frame">
          <div className="cell-full" style={{ gridColumn: 'c1 / page-r' }}>
            <h2 className="sg-label" style={{ marginBottom: 'clamp(24px, 4vh, 44px)' }}>The wall</h2>
            <Wall />
            <p className="voice-opener" style={{ marginTop: 'clamp(48px, 8vh, 96px)', maxWidth: '24ch' }}>
              I collect these and carry them into the rooms where things get built.
            </p>
          </div>
        </section>

        <div className="rule-gap" data-rule="4" data-from="0" data-to="3" />

        {/* 06 — Close. The grid resolves out here. */}
        <section id="contact" className="frame" style={{ paddingBottom: '12vh', scrollMarginTop: '80px' }}>
          <span data-rails-end aria-hidden="true" />
          <div className="cell-a">
            <ul className="sg-nav" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <li><a className="u-draw" href="mailto:priyalshri1@gmail.com">priyalshri1@gmail.com</a></li>
              <li><a className="u-draw" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn<span className="arrow-shift" aria-hidden="true"> ↗</span></a>{/* TODO: confirm URL */}</li>
              <li><a className="u-draw" href="https://scholar.google.com/" target="_blank" rel="noopener noreferrer">Google Scholar<span className="arrow-shift" aria-hidden="true"> ↗</span></a>{/* TODO: confirm URL */}</li>
              <li><a className="u-draw" href="#" target="_blank" rel="noopener noreferrer">CV<span className="arrow-shift" aria-hidden="true"> ↗</span></a>{/* TODO: link CV */}</li>
            </ul>
          </div>
          <div className="cell-c" style={{ gridColumn: 'c3 / page-r', alignSelf: 'end' }}>
            <p className="sg-meta">made by a human</p>
          </div>
        </section>
      </main>
    </div>
  );
}
