import Link from "next/link";
import { aboutChips, credentials } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export function AboutBand() {
  return (
    <section id="about" className="scroll-mt-24 bg-ink py-14 text-white sm:py-16">
      <Container>
        <Reveal>
          <p className="mb-8 text-xs font-bold uppercase tracking-[0.14em] text-white/55">
            About me
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="space-y-5 text-[1.02rem] leading-relaxed text-white/75">
              <p>
                I&apos;ve spent <strong className="text-white">4+ years leading research</strong> at
                Razorpay, Microsoft, and Meesho: strategic studies that shaped roadmaps, evaluative
                work that shipped, and redesigns I ran end to end. A lot of it has meant sitting with
                people whom research usually skips — everyday users, people with low tech literacy —
                and getting teams to actually act on what they said.
              </p>
              <p>
                At <strong className="text-white">Carnegie Mellon (MHCI, Class of 2026)</strong>{" "}
                I&apos;m pointing that experience at AI: coursework in Augmenting Intelligence,
                Responsible AI, and Ethics &amp; Policy in Computing, and a growing conviction that
                whether AI earns people&apos;s trust is a research question before it&apos;s an
                engineering one.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {aboutChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/80"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-gold">
                Beyond the day job
              </p>
              <ul className="space-y-5">
                {credentials.map((item) => (
                  <li key={item.tag} className="grid gap-2 sm:grid-cols-[88px_1fr] sm:gap-4">
                    <span className="text-xs font-extrabold uppercase tracking-[0.08em] text-gold">
                      {item.tag}
                    </span>
                    <span className="text-[0.98rem] leading-relaxed text-white/75">
                      {"href" in item ? (
                        <>
                          Contributed interviews and data collection to{" "}
                          <em className="font-serif">UXR in India: A Historical Perspective</em> by
                          Achyutha Sharma, on how UX research practice evolved in India.{" "}
                          <Link
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-gold hover:underline"
                          >
                            Read it here
                          </Link>
                        </>
                      ) : (
                        item.text
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
