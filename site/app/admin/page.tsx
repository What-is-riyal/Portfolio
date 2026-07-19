'use client';

/**
 * Wall moderation, stub. Reads pending submissions from localStorage, lets an
 * admin approve or discard. Approved notes appear on the wall. This is a
 * client-only stand-in with no auth and no server; before launch the wall
 * needs a real backend and a real moderation queue. See README TODO.
 */

import { useEffect, useState } from 'react';

type Pending = { text: string; at: number };

export default function Admin() {
  const [pending, setPending] = useState<Pending[]>([]);
  const [approved, setApproved] = useState<string[]>([]);

  const load = () => {
    try {
      setPending(JSON.parse(localStorage.getItem('wall_pending') || '[]'));
      setApproved(JSON.parse(localStorage.getItem('wall_approved') || '[]'));
    } catch {
      /* ignore */
    }
  };
  useEffect(load, []);

  const resolve = (i: number, keep: boolean) => {
    const next = [...pending];
    const [item] = next.splice(i, 1);
    localStorage.setItem('wall_pending', JSON.stringify(next));
    setPending(next);
    if (keep && item) {
      const a = [...approved, item.text];
      localStorage.setItem('wall_approved', JSON.stringify(a));
      setApproved(a);
    }
  };

  return (
    <main className="site-content" style={{ padding: 'clamp(40px, 8vh, 96px) clamp(20px, 6vw, 80px)', maxWidth: 720 }}>
      <h1 className="sg-label" style={{ marginBottom: 8 }}>Wall moderation (stub)</h1>
      <p className="sg-tech" style={{ marginBottom: 40 }}>
        Client-only, this device only. Not real moderation. {pending.length} pending, {approved.length} approved.
      </p>

      {pending.length === 0 && <p className="voice-prose">Nothing waiting.</p>}

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {pending.map((p, i) => (
          <li key={p.at} style={{ borderBottom: '1px solid var(--line-color)', paddingBottom: 20 }}>
            <p className="voice-sub" style={{ marginBottom: 12 }}>{p.text}</p>
            <div style={{ display: 'flex', gap: 24 }}>
              <button className="sg-nav u-draw accent" onClick={() => resolve(i, true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Approve</button>
              <button className="sg-nav u-draw" onClick={() => resolve(i, false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--grey)' }}>Discard</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
