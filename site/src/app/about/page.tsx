import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "About",
  description:
    "Priyal Shrivastava is a user researcher focused on trust, safety, and responsible AI. MHCI at Carnegie Mellon, previously Razorpay, Microsoft, and Meesho.",
};

const credentials = [
  {
    tag: "CHI 2026",
    text: "Second author on a full paper: Lost in Transcription: Subtitle Errors in Automatic Speech Recognition Reduce Speaker and Content Evaluations.",
  },
  {
    tag: "1st place",
    text: "US AI Policy Hackathon, deepfakes and elections track.",
  },
  {
    tag: "Community",
    text: "Executive member of CASI and co-facilitator of an AI Governance reading group at CMU.",
  },
  {
    tag: "Founding member",
    text: "User Research India, an initiative with industry leaders to grow the research ecosystem in India and make the case for research investment across sectors.",
  },
  {
    tag: "Book",
    text: "Contributed interviews and data collection to UXR in India: A Historical Perspective by Achyutha Sharma, on how UX research practice evolved in India.",
    href: "https://drive.google.com/file/d/1OE4_fKTRbh5BZhSPK1xqvbna47DufFee/view",
  },
];

export default function AboutPage() {
  return (
    <SiteShell progressColor="var(--gold-text)" footerFlush>
      <section className="pt-24 pb-10 sm:pt-32 sm:pb-14">
        <Container>
          <Reveal>
            <p className="mb-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted">
              <span className="inline-block h-px w-8 bg-gold-text" />
              About
            </p>
            <h1 className="max-w-[20ch] text-[clamp(2.1rem,5.5vw,4.1rem)] leading-[1.08] font-extrabold tracking-[-0.035em]">
              I&apos;m the person in the meeting who asks{" "}
              <em className="font-serif italic font-normal text-gold-text">&quot;but why?&quot;</em> one
              more time than is polite.
            </h1>
          </Reveal>
        </Container>
      </section>

      <section className="pb-14 sm:pb-20">
        <Container className="grid items-start gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="space-y-5 text-[1.05rem] leading-[1.8] text-[#3c3c44]">
            <Reveal>
              <p>
                I&apos;m Priyal, a user researcher. For 4+ years at{" "}
                <strong className="text-foreground">Razorpay, Microsoft, and Meesho</strong>, I&apos;ve
                asked that question on behalf of people who rarely get asked anything at all: small
                merchants filling out compliance forms, first-time internet users shopping in their
                second language, everyday people deciding whether to trust an AI with their inbox.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                I started as a product designer, and moved to research when I noticed that the quality
                of my designs was capped by the quality of the evidence under them. Since then the work
                has run from foundational studies that reframed strategy, to evaluative work that
                shipped, to a white paper on what people need before they let an AI assistant act for
                them.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Right now I&apos;m at{" "}
                <strong className="text-foreground">Carnegie Mellon (MHCI, Class of 2026)</strong>,
                where I also work as a research assistant in the Viewpoints Lab with Prof. Tom Costello,
                on misinformation and AI persuasion. The throughline of what I want to spend the next
                decade on: how people decide to trust automated systems, and who gets left out when
                those systems are built without asking.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.08} className="order-first lg:order-none">
            <div className="mx-auto max-w-[340px] lg:mx-0">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-border">
                <Image
                  src={site.profileImage}
                  alt="Portrait of Priyal Shrivastava"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 340px"
                />
              </div>
              <p className="mt-3 font-serif text-sm italic text-muted">professionally curious since 2017</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border py-14 sm:py-20">
        <Container>
          <Reveal>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-gold-text">
              Beyond the day job
            </p>
            <h2 className="mb-10 max-w-[20ch] text-[clamp(1.7rem,4vw,2.75rem)] leading-[1.12] font-extrabold tracking-[-0.03em]">
              Things I&apos;ve put my name <em className="font-serif italic font-normal text-gold-text">to</em>
            </h2>
          </Reveal>
          <ul className="max-w-[780px] divide-y divide-border">
            {credentials.map((item, i) => (
              <Reveal key={item.tag} delay={0.04 * i}>
                <li className="grid gap-2 py-5 sm:grid-cols-[120px_1fr] sm:gap-6">
                  <span className="pt-1 text-xs font-extrabold uppercase tracking-[0.08em] text-gold-text">
                    {item.tag}
                  </span>
                  <span className="text-base leading-relaxed text-[#3c3c44]">
                    {item.href ? (
                      <>
                        Contributed interviews and data collection to{" "}
                        <em className="font-serif">UXR in India: A Historical Perspective</em> by
                        Achyutha Sharma, on how UX research practice evolved in India.{" "}
                        <Link
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-gold-text hover:underline"
                        >
                          Read it here
                        </Link>
                        .
                      </>
                    ) : (
                      item.text
                    )}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-border py-14 sm:py-20">
        <Container>
          <Reveal>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-gold-text">
              Education
            </p>
            <h2 className="mb-10 max-w-[24ch] text-[clamp(1.7rem,4vw,2.75rem)] leading-[1.12] font-extrabold tracking-[-0.03em]">
              Trained as a designer, practicing as a{" "}
              <em className="font-serif italic font-normal text-gold-text">researcher</em>
            </h2>
          </Reveal>
          <div className="grid max-w-[780px] gap-6 sm:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl border border-border bg-surface p-7">
                <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-text">
                  2025 – 2026
                </p>
                <h3 className="mb-2 text-lg font-extrabold">Carnegie Mellon University</h3>
                <p className="text-sm leading-relaxed text-muted">
                  Masters in Human-Computer Interaction. Coursework includes Augmenting Intelligence,
                  Statistics &amp; Modelling, Service Design, and Ethics &amp; Policy Issues in Computing.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-border bg-surface p-7">
                <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-text">
                  2017 – 2021
                </p>
                <h3 className="mb-2 text-lg font-extrabold">IIT Guwahati</h3>
                <p className="text-sm leading-relaxed text-muted">
                  Bachelor of Design, GPA 9.13/10. Where the but-why habit got its formal training.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-ink py-16 text-white sm:py-24">
        <Container>
          <Reveal>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-[#E5C45C]">
              Off the clock
            </p>
            <h2 className="mb-6 max-w-[20ch] text-[clamp(1.7rem,4vw,2.75rem)] leading-[1.12] font-extrabold tracking-[-0.03em]">
              The rest of the <em className="font-serif italic font-normal text-[#E5C45C]">transcript</em>
            </h2>
            <p className="max-w-[62ch] text-[1.05rem] leading-[1.8] text-white/75">
              I keep two playlists in heavy rotation: indie music and old Hindi songs, and I will defend
              that combination in any usability session. The rest of what I make for fun, including a
              story-writing game that made it to the Play Store, lives on the{" "}
              <Link href="/play" className="font-semibold text-[#E5C45C] hover:underline">
                play page
              </Link>
              .
            </p>
            <p className="mt-5 max-w-[62ch] text-[1.05rem] leading-[1.8] text-white/75">
              If any of this sounds like someone you&apos;d want asking questions on your team, my inbox
              is open.
            </p>
          </Reveal>
        </Container>
      </section>
    </SiteShell>
  );
}
