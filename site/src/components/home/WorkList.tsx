import Link from "next/link";
import { projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { WorkThumb } from "@/components/work/WorkThumb";

export function WorkList() {
  return (
    <section id="work" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <Reveal>
          <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-muted">
            Selected work
            <span className="rounded-full border border-border px-2 py-0.5 text-[0.7rem]">
              06
            </span>
          </p>
          <p className="mb-10 max-w-[62ch] text-muted">
            <span className="hidden sm:inline">
              Hover any project for the turn — the moment the evidence changed the team&apos;s
              mind.
            </span>
            <span className="sm:hidden">
              Each project carries its turn — the moment the evidence changed the team&apos;s
              mind.
            </span>
          </p>
        </Reveal>

        <div className="divide-y divide-border border-y border-border">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={0.03 * i}>
              <Link
                href={`/work/${project.slug}`}
                id={`project-${project.slug.split("-")[0]}`}
                className="group grid grid-cols-1 gap-5 py-7 transition-colors hover:bg-surface/60 sm:grid-cols-[170px_1fr_auto] sm:items-start sm:gap-8 sm:py-8"
              >
                <div
                  className="overflow-hidden rounded-xl border border-border"
                  style={{ backgroundColor: project.accentMuted }}
                  aria-hidden="true"
                >
                  <WorkThumb slug={project.slug} />
                </div>

                <div className="min-w-0">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-muted">
                    <span className="mr-2 text-foreground">{String(project.index).padStart(2, "0")}</span>
                    {project.company} · {project.year}
                  </p>
                  <h2 className="text-[clamp(1.25rem,2.5vw,1.6rem)] font-extrabold tracking-[-0.02em]">
                    {project.title}
                  </h2>
                  <p className="mt-2 max-w-[58ch] text-[0.98rem] leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 hidden max-w-[58ch] text-[0.95rem] leading-relaxed text-foreground/85 group-hover:block sm:block sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                    <span className="mr-2 text-xs font-extrabold uppercase tracking-[0.08em] text-accent">
                      {project.turnLabel}
                    </span>
                    {project.turn}
                  </p>
                </div>

                <span
                  className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors group-hover:border-accent group-hover:text-accent sm:flex"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-10 font-serif text-sm italic text-muted">
            (side quests, including a story-writing game I co-founded, live on the{" "}
            <Link href="/play" className="underline underline-offset-2 hover:text-accent">
              play page
            </Link>
            .)
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
