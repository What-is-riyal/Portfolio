'use client';

/**
 * The wall. Anonymous visitors leave one sentence about a time technology got
 * something wrong about them. This is the only place on the page with an
 * organic, off-grid hand: a submitted note enters slightly rotated, in
 * Fraunces, breaking the strict grid. The human interrupting the machine.
 *
 * Static site, no server. Submissions land in a client-side moderation queue
 * (localStorage 'wall_pending'); a simple admin view at /admin approves them
 * into 'wall_approved', and approved notes join the seeds here. This is a stub:
 * before launch it needs a real backend + moderation. See README TODO.
 */

import { useEffect, useState } from 'react';

// TODO_SEED — believable placeholders for Priyal to replace or approve.
const SEEDS: string[] = [
  'The form insisted my name was too short to be real.',
  'It kept autocorrecting my city to one three thousand miles away.',
  'The camera could not find my face until I stood under a brighter light.',
  'It marked me a bot for typing my address the way I actually write it.',
  'The app assumed I had a car. I do not.',
  'Voice unlock stopped knowing me the week I had a cold.',
  'The survey had no option for the thing that was actually true.',
  'It read my silence on the call as agreement.',
];

const PENDING_KEY = 'wall_pending';
const APPROVED_KEY = 'wall_approved';
const MAX = 140;
// Deterministic small rotations so notes look hand-placed but never reflow.
const rot = (i: number) => ((i * 37) % 7) - 3;

export default function Wall() {
  const [approved, setApproved] = useState<string[]>([]);
  const [value, setValue] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      const a = JSON.parse(localStorage.getItem(APPROVED_KEY) || '[]');
      if (Array.isArray(a)) setApproved(a.filter((s) => typeof s === 'string'));
    } catch {
      /* ignore */
    }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    try {
      const pending = JSON.parse(localStorage.getItem(PENDING_KEY) || '[]');
      pending.push({ text: text.slice(0, MAX), at: Date.now() });
      localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
    } catch {
      /* ignore */
    }
    setValue('');
    setDone(true);
  };

  const notes = [...SEEDS, ...approved];

  return (
    <div>
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(24px, 4vw, 56px)',
          maxWidth: '72ch',
        }}
      >
        {notes.map((n, i) => (
          <li
            key={i}
            className="wall-note"
            style={{ transform: `rotate(${rot(i)}deg)` }}
          >
            {n}
          </li>
        ))}
      </ul>

      <form onSubmit={submit} style={{ marginTop: 'clamp(40px, 6vh, 80px)', maxWidth: '48ch' }}>
        <label htmlFor="wall-input" className="sg-label" style={{ display: 'block', marginBottom: 12 }}>
          Add one, anonymously
        </label>
        <textarea
          id="wall-input"
          value={value}
          maxLength={MAX}
          onChange={(e) => {
            setValue(e.target.value);
            setDone(false);
          }}
          rows={2}
          placeholder="A time technology got something wrong about you."
          className="voice-sub"
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            borderBottom: '1px solid var(--line-color)',
            color: 'var(--ink)',
            padding: '8px 0',
            resize: 'none',
            fontFamily: 'var(--font-fraunces), serif',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <span className="sg-tech" aria-live="polite">
            {done ? 'Thank you. It goes to a queue before it appears.' : `${MAX - value.length} left`}
          </span>
          <button
            type="submit"
            className="sg-nav u-draw accent"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            Send<span className="arrow-shift" aria-hidden="true"> →</span>
          </button>
        </div>
      </form>
    </div>
  );
}
