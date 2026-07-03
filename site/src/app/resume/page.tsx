import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Priyal Shrivastava: user researcher, MHCI at Carnegie Mellon, previously Razorpay, Microsoft, and Meesho.",
};

const jobs = [
  {
    title: "Research Assistant, Viewpoints Lab",
    dates: "Sept 2025 – ongoing",
    org: "Carnegie Mellon University, Pittsburgh",
    bullets: [{ text: "Research assistant under Prof. Tom Costello, working on misinformation and AI persuasion." }],
  },
  {
    title: "UX Researcher (contract via Kadence)",
    dates: "Sept 2024 – Feb 2025",
    org: "Microsoft, Bangalore",
    bullets: [
      {
        text: "Wrote a white paper with identified opportunity areas to guide the integration of Copilot in Outlook, focused on trust, transparency, learnability, and user control.",
        href: "/work/microsoft-copilot-trust",
      },
      {
        text: "Conducted a mixed-method study with a 300+ user survey and 30+ interviews across geographies to improve the Outlook experience on mobile browsers.",
        href: "/work/microsoft-retention",
      },
    ],
  },
  {
    title: "Senior UX Researcher",
    dates: "April 2024 – July 2024",
    org: "Razorpay, Bangalore",
  },
  {
    title: "UX Researcher",
    dates: "Oct 2022 – March 2024",
    org: "Razorpay, Bangalore",
    bullets: [
      {
        text: "Refined the value proposition and strategy for a new B2C product vertical through 3 focus group discussions, 25+ interviews with participatory design activities, and a 1000+ respondent market survey, earning buy-in from CXOs and leadership.",
        href: "/work/razorpay-d2c",
      },
      {
        text: "Created value maps from in-depth interviews with 30+ users on how companies derive value from neobanks, shaping business strategy and the roadmap for the following financial year.",
      },
      {
        text: "Proposed and conducted an in-depth UX audit and usability test of the company's website, visited by 1M+ people daily, and of the onboarding flow, to understand SMEs' mental models around filling forms.",
        href: "/work/razorpay-website-evaluation",
      },
      {
        text: "Evangelized research across the organization by setting up 2 customer empathy programs and running full-day workshops for 50+ product managers and designers.",
      },
    ],
  },
  {
    title: "Product Designer",
    dates: "July 2021 – Oct 2022",
    org: "Razorpay, Bangalore",
    bullets: [
      {
        text: "Redesigned the onboarding flow for SME merchants with low tech literacy: form-filling conversion up 51%, completion time down from 14 to 5 minutes, support tickets down 43%.",
        href: "/work/razorpay-onboarding",
      },
      {
        text: "Designed multiple experiments to improve merchants' first-time user experience.",
      },
    ],
  },
  {
    title: "User Research Intern",
    dates: "May 2020 – July 2020",
    org: "Meesho, Bangalore",
    bullets: [
      {
        text: "Studied community building for women from semi-urban and rural India through secondary research, surveys, and 40+ qualitative interviews, for a product with 10M+ downloads.",
      },
      {
        text: "Led a research study on the effects of language and socio-cultural factors in research and design for the next billion users.",
        href: "/work/meesho-vernacular",
      },
      {
        text: "Ran a workshop with design and product stakeholders on biases around low-tech-literacy users.",
      },
    ],
  },
  {
    title: "Founding Member",
    dates: "Aug 2020 – present",
    org: "User Research India, remote",
    bullets: [
      {
        text: "Building the User Research India initiative with industry leaders: sharing insight about the UXR ecosystem in India and engaging leadership to invest in research across sectors.",
      },
    ],
  },
  {
    title: "Co-founder",
    dates: "Dec 2019 – Sept 2020",
    org: "MadAhead, remote",
    bullets: [
      {
        text: "Developed the strategy and experience for an online \"pass the story\" game, live on the Google Play Store.",
      },
      {
        text: "Led a team of 5 designers and UX writers, collaborating with engineering on implementation.",
      },
    ],
  },
];

export default function ResumePage() {
  return (
    <SiteShell progressColor="var(--accent)">
      <Container className="pb-20">
        <section className="flex flex-col gap-8 pt-24 pb-8 sm:flex-row sm:items-end sm:justify-between sm:pt-32">
          <Reveal>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] font-extrabold tracking-[-0.035em]">
              Resume<em className="font-serif italic font-normal text-accent">.</em>
            </h1>
            <p className="mt-3 text-[0.95rem] text-muted">
              Priyal Shrivastava ·{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-accent">
                {site.email}
              </a>{" "}
              ·{" "}
              <Link
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent"
              >
                LinkedIn
              </Link>
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <a
              href={site.resumePdf}
              download
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-14px_rgba(29,64,200,0.6)]"
            >
              ↓ Download PDF
            </a>
          </Reveal>
        </section>

        <section className="border-t border-border py-9">
          <div className="grid gap-6 sm:grid-cols-[200px_1fr] sm:gap-10">
            <p className="pt-1 text-xs font-extrabold uppercase tracking-[0.12em] text-accent">
              Experience
            </p>
            <div className="space-y-8">
              {jobs.map((job, i) => (
                <Reveal key={job.title + job.dates} delay={0.03 * i}>
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h3 className="text-[1.05rem] font-extrabold tracking-[-0.01em]">{job.title}</h3>
                      <span className="text-sm font-semibold text-muted">{job.dates}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{job.org}</p>
                    {job.bullets ? (
                      <ul className="mt-3 space-y-1">
                        {job.bullets.map((bullet) => (
                          <li
                            key={bullet.text.slice(0, 40)}
                            className="relative pl-5 text-[0.95rem] leading-relaxed text-[#3c3c44]"
                          >
                            <span className="absolute top-[0.65rem] left-0 h-1.5 w-1.5 rounded-full bg-accent/35" />
                            {bullet.text}
                            {bullet.href ? (
                              <>
                                {" "}
                                <Link href={bullet.href} className="font-semibold text-accent">
                                  Case study
                                </Link>
                              </>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border py-9">
          <div className="grid gap-6 sm:grid-cols-[200px_1fr] sm:gap-10">
            <p className="pt-1 text-xs font-extrabold uppercase tracking-[0.12em] text-accent">
              Education
            </p>
            <div className="space-y-5">
              <Reveal>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-extrabold">Carnegie Mellon University</h3>
                    <p className="text-sm text-muted">Masters in Human-Computer Interaction</p>
                  </div>
                  <span className="text-sm font-semibold text-muted">2025 – 2026</span>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-extrabold">Indian Institute of Technology (IIT) Guwahati</h3>
                    <p className="text-sm text-muted">Bachelor of Design · GPA 9.13/10</p>
                  </div>
                  <span className="text-sm font-semibold text-muted">2017 – 2021</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-9">
          <div className="grid gap-6 sm:grid-cols-[200px_1fr] sm:gap-10">
            <p className="pt-1 text-xs font-extrabold uppercase tracking-[0.12em] text-accent">
              Skills &amp; courses
            </p>
            <div className="space-y-5">
              {[
                {
                  title: "Methodology",
                  body: "Qualitative interviews, surveys, usability testing, contextual inquiry, participatory research, focus group discussions.",
                },
                {
                  title: "Software",
                  body: "UI and prototyping: Figma, Webflow, Principle. Visual design: Illustrator, Photoshop, InDesign, Procreate. Repositories: Marvin, UserTesting. Data analytics: Looker, Clarity, R.",
                },
                {
                  title: "Courses",
                  body: "Augmenting Intelligence, Statistics & Modelling, Service Design, Ethics & Policy Issues in Computing, User-Centered Research & Evaluation, Persuasive Design, Design Strategy & Management, Consumer Research, Design Analysis.",
                },
              ].map((block, i) => (
                <Reveal key={block.title} delay={0.04 * i}>
                  <div>
                    <h4 className="mb-2 text-xs font-extrabold uppercase tracking-[0.06em]">
                      {block.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-muted">{block.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </SiteShell>
  );
}
