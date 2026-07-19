import Link from 'next/link';
import { notFound } from 'next/navigation';
import { WORK } from '@/lib/work';

// Static export needs every dynamic route pre-listed.
export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = WORK.find((w) => w.slug === slug);
  if (!entry) notFound();

  return (
    <main className="site-content frame" style={{ minHeight: '100vh', alignContent: 'start', paddingTop: '18vh' }}>
      <div className="cell-a">
        <Link href="/" className="sg-nav u-draw accent">
          <span className="arrow-shift" aria-hidden="true">← </span>Back
        </Link>
        <h1 className="voice-hero" style={{ margin: '32px 0 20px' }}>{entry.project}</h1>
        <p className="sg-tech" style={{ lineHeight: 1.7, marginBottom: 24 }}>{entry.tech}</p>
        <p className="voice-prose" style={{ color: 'var(--grey)' }}>
          {/* Case study to come; inherits the design system from the homepage. */}
          The full case study is on its way.
        </p>
      </div>
    </main>
  );
}
