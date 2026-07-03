import Image from "next/image";
import Link from "next/link";
import type { Project, ProjectSection } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SiteShell } from "@/components/layout/SiteShell";

function ProjectImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-10 overflow-hidden rounded-2xl border border-border">
      <div className="relative aspect-[16/10] w-full bg-surface sm:aspect-auto sm:min-h-0">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="h-auto w-full object-cover"
          sizes="(max-width: 1080px) 100vw, 1080px"
        />
      </div>
      {caption ? (
        <figcaption className="border-t border-border bg-surface px-4 py-3 text-sm leading-relaxed text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function SectionBlock({
  section,
  accent,
  accentOnDark,
}: {
  section: ProjectSection;
  accent: string;
  accentOnDark: string;
}) {
  if (section.type === "nda") {
    return (
      <Reveal>
        <div className="mb-8 rounded-2xl border border-border bg-surface px-5 py-4 text-sm leading-relaxed text-muted">
          {section.text}
        </div>
      </Reveal>
    );
  }

  if (section.type === "images") {
    return (
      <Reveal>
        <div
          className={
            section.pair
              ? "my-10 grid gap-6 md:grid-cols-2"
              : "my-10"
          }
        >
          {section.images.map((image) => (
            <ProjectImage key={image.src} {...image} />
          ))}
        </div>
      </Reveal>
    );
  }

  if (section.type === "moves") {
    return (
      <section className="py-10 sm:py-14">
        <Container>
          <Reveal>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
              {section.kicker}
            </p>
            <h2 className="max-w-[24ch] text-[clamp(1.7rem,4vw,2.6rem)] leading-[1.12] font-extrabold tracking-[-0.03em]">
              {section.title}
            </h2>
            {section.intro ? (
              <div className="prose-block mt-6 max-w-[680px]">
                <p>{section.intro}</p>
              </div>
            ) : null}
          </Reveal>

          <div className="mt-10 max-w-[760px] divide-y divide-border border-t border-border">
            {section.moves.map((move, i) => (
              <Reveal key={move.num} delay={0.04 * i}>
                <div className="grid gap-4 py-8 sm:grid-cols-[72px_1fr] sm:gap-6">
                  <span
                    className="font-serif text-[2.5rem] italic leading-none"
                    style={{ color: accent }}
                  >
                    {move.num}
                  </span>
                  <div>
                    <h3 className="mb-3 text-xl font-extrabold tracking-[-0.01em]">{move.title}</h3>
                    <div className="prose-block">
                      {move.paragraphs.map((p) => (
                        <p key={p.slice(0, 40)}>{p}</p>
                      ))}
                    </div>
                    {move.image ? <ProjectImage {...move.image} /> : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  const dark = section.type === "reflection" ? section.dark : section.dark;
  const title = section.title;
  const paragraphs = section.paragraphs;
  const kicker = section.type === "prose" ? section.kicker : undefined;

  return (
    <section className={dark ? "bg-ink py-12 text-white sm:py-16" : "py-10 sm:py-14"}>
      <Container>
        <Reveal>
          {kicker ? (
            <p
              className="mb-4 text-xs font-bold uppercase tracking-[0.14em]"
              style={{ color: dark ? accentOnDark : accent }}
            >
              {kicker}
            </p>
          ) : section.type === "reflection" ? (
            <p
              className="mb-4 text-xs font-bold uppercase tracking-[0.14em]"
              style={{ color: accentOnDark }}
            >
              What I learned
            </p>
          ) : null}
          <h2
            className={`max-w-[24ch] text-[clamp(1.7rem,4vw,2.6rem)] leading-[1.12] font-extrabold tracking-[-0.03em] ${
              dark ? "text-white" : ""
            }`}
          >
            {title}
          </h2>
          <div className={`prose-block mt-6 max-w-[680px] ${dark ? "prose-dark" : ""}`}>
            {paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function CaseStudyPage({ project }: { project: Project }) {
  return (
    <SiteShell progressColor={project.accent} footerFlush>
      <article>
        <section
          className={`px-0 pt-8 pb-10 sm:pt-12 sm:pb-14 ${
            project.heroDark ? "bg-ink text-white" : "bg-white"
          }`}
        >
          <Container>
            <Reveal>
              <Link
                href="/#work"
                className={`mb-8 inline-flex text-sm font-semibold ${
                  project.heroDark ? "text-white/60 hover:text-white" : "text-muted hover:text-accent"
                }`}
              >
                ← Back to work
              </Link>
              <p
                className={`mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] ${
                  project.heroDark ? "text-white/55" : "text-muted"
                }`}
              >
                <span
                  className="inline-block h-px w-8"
                  style={{ backgroundColor: project.heroDark ? project.accentOnDark : project.accent }}
                />
                {project.eyebrow}
              </p>
              <p
                className="mb-3 font-serif text-[clamp(1rem,2vw,1.25rem)] italic"
                style={{ color: project.heroDark ? project.accentOnDark : project.accent }}
              >
                The question
              </p>
              <h1 className="max-w-[18ch] text-[clamp(2rem,6vw,4.5rem)] leading-[1.05] font-extrabold tracking-[-0.04em]">
                {project.headline}
              </h1>
              <p
                className={`mt-6 max-w-[56ch] text-[clamp(1rem,2vw,1.2rem)] leading-relaxed ${
                  project.heroDark ? "text-white/70" : "text-muted"
                }`}
              >
                {project.standfirst}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.chips.map((chip) => (
                  <span
                    key={chip}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                      project.heroDark
                        ? "border-white/15 text-white/75"
                        : "border-border text-muted"
                    }`}
                    style={
                      chip.includes("NDA") || chip.includes("51%") || chip.includes("Under")
                        ? {
                            borderColor: `${project.accent}66`,
                            color: project.heroDark ? project.accentOnDark : project.accent,
                          }
                        : undefined
                    }
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div
                className={`mt-12 grid gap-6 border-t pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ${
                  project.heroDark ? "border-white/10" : "border-border"
                }`}
              >
                {project.snapshot.map((item) => (
                  <div key={item.label}>
                    <p
                      className={`mb-2 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] ${
                        project.heroDark ? "text-white/45" : "text-muted"
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className={`text-[0.95rem] font-semibold leading-snug ${project.heroDark ? "text-white" : ""}`}>
                      {item.value}
                    </p>
                    {item.detail ? (
                      <p className={`mt-1 text-xs ${project.heroDark ? "text-white/55" : "text-muted"}`}>
                        {item.detail}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>

        {project.sections.map((section, i) => (
          <SectionBlock
            key={`${section.type}-${i}`}
            section={section}
            accent={project.accent}
            accentOnDark={project.accentOnDark}
          />
        ))}
      </article>
    </SiteShell>
  );
}
