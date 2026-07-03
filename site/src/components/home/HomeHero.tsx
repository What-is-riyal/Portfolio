"use client";

import { useState } from "react";
import Image from "next/image";
import { heroCodes, site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

const codeOrder = ["who", "how", "sowhat", "now"] as const;

export function HomeHero() {
  const [activeCode, setActiveCode] = useState<(typeof codeOrder)[number]>("who");

  return (
    <section className="pt-10 pb-16 sm:pt-14 sm:pb-20">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
          <div>
            <Reveal>
              <p className="mb-5 text-sm font-semibold text-muted">
                User researcher · MHCI at Carnegie Mellon, Class of 2026
              </p>
              <h1 className="max-w-[22ch] text-[clamp(2rem,5.5vw,3.4rem)] leading-[1.08] font-extrabold tracking-[-0.035em]">
                Hi, I&apos;m Priyal. I ask{" "}
                <button
                  type="button"
                  className={cn(
                    "relative inline cursor-pointer border-b-2 border-transparent font-inherit transition-colors",
                    activeCode === "who" && "border-accent text-accent",
                  )}
                  onMouseEnter={() => setActiveCode("who")}
                  onFocus={() => setActiveCode("who")}
                  onClick={() => setActiveCode("who")}
                >
                  people
                  <sup className="ml-0.5 text-[0.45em] font-bold tracking-wide text-accent">
                    who
                  </sup>
                </button>{" "}
                <button
                  type="button"
                  className={cn(
                    "relative inline cursor-pointer border-b-2 border-transparent font-inherit transition-colors",
                    activeCode === "how" && "border-accent text-accent",
                  )}
                  onMouseEnter={() => setActiveCode("how")}
                  onFocus={() => setActiveCode("how")}
                  onClick={() => setActiveCode("how")}
                >
                  questions
                  <sup className="ml-0.5 text-[0.45em] font-bold tracking-wide text-accent">
                    how
                  </sup>
                </button>{" "}
                <span className="font-serif italic font-normal">for a living.</span> Then I make
                sure the answers{" "}
                <button
                  type="button"
                  className={cn(
                    "relative inline cursor-pointer border-b-2 border-transparent font-inherit transition-colors",
                    activeCode === "sowhat" && "border-accent text-accent",
                  )}
                  onMouseEnter={() => setActiveCode("sowhat")}
                  onFocus={() => setActiveCode("sowhat")}
                  onClick={() => setActiveCode("sowhat")}
                >
                  change what gets built.
                  <sup className="ml-0.5 text-[0.45em] font-bold tracking-wide text-accent">
                    so what
                  </sup>
                </button>
              </h1>
              <p className="mt-6 max-w-[52ch] text-lg text-muted">
                Lately, the questions are about{" "}
                <button
                  type="button"
                  className={cn(
                    "inline cursor-pointer border-b-2 border-transparent font-inherit text-foreground transition-colors",
                    activeCode === "now" && "border-accent text-accent",
                  )}
                  onMouseEnter={() => setActiveCode("now")}
                  onFocus={() => setActiveCode("now")}
                  onClick={() => setActiveCode("now")}
                >
                  AI and trust
                  <sup className="ml-0.5 text-[0.55em] font-bold tracking-wide text-accent">
                    now
                  </sup>
                </button>
                .
              </p>
              <p className="mt-4 max-w-[58ch] font-serif text-sm italic text-muted">
                (my intro, coded the way I&apos;d code a transcript. these days AI helps me move
                through transcripts faster; the coding judgments stay mine, which is rather the
                point of this site.)
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mx-auto lg:mx-0">
            <div className="relative h-[180px] w-[180px] overflow-hidden rounded-2xl border border-border sm:h-[220px] sm:w-[220px]">
              <Image
                src={site.profileImage}
                alt="Portrait of Priyal Shrivastava"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 180px, 220px"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {heroCodes.map((card, i) => (
            <Reveal key={card.id} delay={0.05 * i}>
              <button
                type="button"
                onMouseEnter={() => setActiveCode(card.id)}
                onFocus={() => setActiveCode(card.id)}
                onClick={() => setActiveCode(card.id)}
                className={cn(
                  "h-full w-full rounded-2xl border p-5 text-left transition-all",
                  activeCode === card.id
                    ? "border-accent bg-surface shadow-[0_20px_40px_-28px_rgba(29,64,200,0.35)]"
                    : "border-border bg-white hover:border-accent/30",
                )}
              >
                <p className="mb-2 font-serif text-lg italic text-accent">{card.label}</p>
                <p className="text-[0.95rem] leading-relaxed text-muted">{card.text}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
