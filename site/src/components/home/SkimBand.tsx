import Link from "next/link";
import { skimStats } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export function SkimBand() {
  return (
    <section className="bg-ink py-14 text-white sm:py-16">
      <Container>
        <Reveal>
          <p className="mb-8 text-xs font-bold uppercase tracking-[0.14em] text-white/55">
            For the skimmers
          </p>
        </Reveal>
        <ul className="space-y-0">
          {skimStats.map((stat, i) => (
            <Reveal key={stat.href + stat.value} delay={0.04 * i}>
              <li className="border-b border-white/10 last:border-b-0">
                <Link
                  href={stat.href}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 py-5 transition-colors hover:text-gold sm:grid-cols-[120px_1fr_auto] sm:items-center sm:gap-6"
                >
                  <span className="font-serif text-[clamp(1.6rem,4vw,2.2rem)] italic text-gold">
                    {stat.value}
                  </span>
                  <span className="text-[0.98rem] leading-relaxed text-white/75 group-hover:text-white">
                    {stat.text}
                  </span>
                  <span className="hidden text-gold sm:inline" aria-hidden="true">
                    ↓
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.2}>
          <p className="mt-8 font-serif text-sm italic text-white/50">
            (every number links to the project that produced it. the long versions are better.)
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
