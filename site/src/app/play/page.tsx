import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Play",
  description:
    "The things Priyal Shrivastava makes when nobody is measuring: a story-writing game, and other side quests.",
};

const playItems = [
  {
    title: "A pass-the-story game, live on the Play Store",
    kicker: "MadAhead · co-founder · 2019–20",
    body: "Co-founded a \"pass the story\" game where strangers write a story together, one absurd chunk at a time. I developed the strategy and experience, and led a team of 5 designers and UX writers through to launch on the Google Play Store.",
    featured: true,
  },
  {
    title: "This slot is saved",
    kicker: "Side quest",
    body: "A project is on its way here, once its photos are dug out of the camera roll.",
    placeholder: true,
  },
  {
    title: "So is this one",
    kicker: "Side quest",
    body: "Some things take longer to photograph than to make.",
    placeholder: true,
  },
];

function MadAheadArt() {
  return (
    <svg viewBox="0 0 170 124" fill="none" className="h-auto w-[60%]" aria-hidden="true">
      <rect x="30" y="30" width="56" height="74" rx="6" fill="#FFFFFF" stroke="#A16207" strokeWidth="2" transform="rotate(-8 58 67)" />
      <rect x="58" y="26" width="56" height="74" rx="6" fill="#FFFFFF" stroke="#A16207" strokeWidth="2" transform="rotate(4 86 63)" />
      <rect x="88" y="30" width="56" height="74" rx="6" fill="#FCE88A" stroke="#A16207" strokeWidth="2" transform="rotate(12 116 67)" />
    </svg>
  );
}

export default function PlayPage() {
  return (
    <SiteShell progressColor="var(--gold-text)" footerFlush>
      <section className="pt-24 pb-10 sm:pt-32 sm:pb-14">
        <Container>
          <Reveal>
            <p className="mb-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted">
              <span className="inline-block h-px w-8 bg-gold-text" />
              Play
            </p>
            <h1 className="max-w-[20ch] text-[clamp(2.1rem,5.5vw,4.1rem)] leading-[1.08] font-extrabold tracking-[-0.035em]">
              Things I make when nobody is <em className="font-serif italic font-normal text-gold-text">measuring.</em>
            </h1>
            <p className="mt-6 max-w-[56ch] text-[1.05rem] leading-relaxed text-muted">
              Research is the day job. This page is everything that happens off the clock: side quests,
              experiments, and the occasional thing that escaped onto an app store.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container className="grid gap-7 md:grid-cols-2">
          {playItems.map((item, i) => (
            <Reveal key={item.title} delay={0.05 * i}>
              <article
                className={`overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-[0_26px_52px_-32px_rgba(161,98,7,0.35)] ${
                  item.placeholder ? "border-dashed hover:shadow-none" : "border-border hover:border-gold-text/40"
                }`}
              >
                <div
                  className={`flex aspect-[16/10] items-center justify-center ${
                    item.featured ? "bg-[#F8F0DC]" : "bg-[repeating-linear-gradient(45deg,#FBFBFA,#FBFBFA_12px,#F4F3F0_12px,#F4F3F0_24px)]"
                  }`}
                >
                  {item.featured ? (
                    <MadAheadArt />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-muted text-xl">
                        +
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.06em]">Photo coming soon</span>
                    </div>
                  )}
                </div>
                <div className="p-6 sm:p-7">
                  <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-text">
                    {item.kicker}
                  </p>
                  <h2 className="mb-3 text-xl font-extrabold tracking-[-0.015em]">{item.title}</h2>
                  <p className="text-[0.95rem] leading-relaxed text-muted">{item.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="bg-ink py-16 text-white sm:py-24">
        <Container>
          <Reveal>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-[#E5C45C]">
              Soundtrack disclosure
            </p>
            <h2 className="mb-5 max-w-[26ch] text-[clamp(1.6rem,3.6vw,2.5rem)] leading-[1.15] font-extrabold tracking-[-0.03em]">
              Everything above was made to indie music and old Hindi{" "}
              <em className="font-serif italic font-normal text-[#E5C45C]">songs</em>
            </h2>
            <p className="max-w-[58ch] text-[1.02rem] leading-relaxed text-white/70">
              Usually in alternation, occasionally in the same hour, always at a volume my neighbors have
              opinions about. If you have recommendations for either playlist, that&apos;s a perfectly
              good reason to email me.
            </p>
          </Reveal>
        </Container>
      </section>
    </SiteShell>
  );
}
