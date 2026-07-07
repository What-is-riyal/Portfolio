import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export type DiagramVariant =
  | "synthesis-process"
  | "trust-ladder"
  | "trust-stack";

type CaseDiagramProps = {
  variant: DiagramVariant;
  kicker?: string;
  title?: string;
  intro?: string;
  caption?: string;
  accent: string;
  dark?: boolean;
};

/**
 * Bespoke inline-SVG diagrams for the Copilot synthesis case study.
 * Everything here is drawn from scratch so no NDA'd feature names, internal
 * study titles, or roadmap details leave the building — only the shape of
 * the argument.
 */
export function CaseDiagram({
  variant,
  kicker,
  title,
  intro,
  caption,
  accent,
  dark,
}: CaseDiagramProps) {
  return (
    <section className={dark ? "bg-ink py-12 text-white sm:py-16" : "py-10 sm:py-14"}>
      <Container>
        <Reveal>
          {kicker ? (
            <p
              className="mb-4 text-xs font-bold uppercase tracking-[0.14em]"
              style={{ color: accent }}
            >
              {kicker}
            </p>
          ) : null}
          {title ? (
            <h2
              className={`max-w-[24ch] text-[clamp(1.7rem,4vw,2.6rem)] leading-[1.12] font-extrabold tracking-[-0.03em] ${
                dark ? "text-white" : ""
              }`}
            >
              {title}
            </h2>
          ) : null}
          {intro ? (
            <div className={`prose-block mt-6 max-w-[680px] ${dark ? "prose-dark" : ""}`}>
              <p>{intro}</p>
            </div>
          ) : null}
        </Reveal>

        <Reveal delay={0.08}>
          <figure className="mt-10">
            <div
              className={`overflow-x-auto rounded-2xl border p-5 sm:p-8 ${
                dark ? "border-white/10 bg-white/[0.03]" : "border-border bg-surface"
              }`}
            >
              {variant === "synthesis-process" ? (
                <SynthesisProcess accent={accent} dark={dark} />
              ) : null}
              {variant === "trust-ladder" ? (
                <TrustLadder accent={accent} dark={dark} />
              ) : null}
              {variant === "trust-stack" ? (
                <TrustStack accent={accent} dark={dark} />
              ) : null}
            </div>
            {caption ? (
              <figcaption
                className={`mt-3 text-sm leading-relaxed ${dark ? "text-white/55" : "text-muted"}`}
              >
                {caption}
              </figcaption>
            ) : null}
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}

function useInk(dark?: boolean) {
  return {
    ink: dark ? "#f4f4f6" : "#16161a",
    sub: dark ? "rgba(255,255,255,0.62)" : "#5b5b66",
    line: dark ? "rgba(255,255,255,0.22)" : "#c9c9d4",
    card: dark ? "rgba(255,255,255,0.06)" : "#ffffff",
    cardBorder: dark ? "rgba(255,255,255,0.16)" : "#e2e2ea",
  };
}

/* ------------------------------------------------------------------ */
/* 1. Synthesis process — six studies + social listening → paper       */
/* ------------------------------------------------------------------ */

function SynthesisProcess({ accent, dark }: { accent: string; dark?: boolean }) {
  const c = useInk(dark);
  const studies = [
    "Task-management deep dive",
    "Prioritisation study",
    "Concept focus group",
    "Time-away (OOF) research",
    "Drafting & tone study",
    "Mental-health & focus study",
  ];

  return (
    <svg
      viewBox="0 0 900 420"
      className="h-auto w-full min-w-[680px]"
      role="img"
      aria-label="Six internal studies plus public social listening are coded as one corpus, then synthesised into a single point-of-view paper with a trust framework, design guidelines, and a feature checklist."
    >
      {/* Column 1: inputs */}
      <text x="20" y="30" fontSize="13" fontWeight="700" fill={accent} letterSpacing="1.5">
        INPUTS
      </text>
      {studies.map((label, i) => {
        const y = 50 + i * 52;
        return (
          <g key={label}>
            <rect
              x="20"
              y={y}
              width="230"
              height="40"
              rx="8"
              fill={c.card}
              stroke={c.cardBorder}
            />
            <text x="36" y={y + 25} fontSize="14" fill={c.ink}>
              {label}
            </text>
          </g>
        );
      })}
      <g>
        <rect
          x="20"
          y={50 + 6 * 52}
          width="230"
          height="40"
          rx="8"
          fill="none"
          stroke={accent}
          strokeDasharray="5 4"
        />
        <text x="36" y={50 + 6 * 52 + 25} fontSize="14" fill={accent} fontWeight="600">
          Public social listening
        </text>
      </g>

      {/* connectors to coding */}
      {Array.from({ length: 7 }).map((_, i) => {
        const y = 70 + i * 52;
        return (
          <path
            key={i}
            d={`M250 ${y} C320 ${y}, 320 210, 380 210`}
            fill="none"
            stroke={c.line}
            strokeWidth="1.5"
          />
        );
      })}

      {/* Column 2: coding */}
      <rect x="380" y="150" width="180" height="120" rx="12" fill={accent} opacity="0.12" />
      <rect x="380" y="150" width="180" height="120" rx="12" fill="none" stroke={accent} />
      <text x="470" y="195" fontSize="15" fontWeight="700" fill={dark ? "#fff" : c.ink} textAnchor="middle">
        Coded as one
      </text>
      <text x="470" y="216" fontSize="15" fontWeight="700" fill={dark ? "#fff" : c.ink} textAnchor="middle">
        corpus
      </text>
      <text x="470" y="240" fontSize="12" fill={c.sub} textAnchor="middle">
        needs · contradictions
      </text>
      <text x="470" y="256" fontSize="12" fill={c.sub} textAnchor="middle">
        gaps across studies
      </text>

      <path d="M560 210 L620 210" fill="none" stroke={c.line} strokeWidth="1.5" markerEnd="url(#arrow)" />

      {/* Column 3: outputs */}
      <text x="640" y="120" fontSize="13" fontWeight="700" fill={accent} letterSpacing="1.5">
        ONE POV PAPER
      </text>
      {[
        "A progressive trust model",
        "Three design prerequisites",
        "A feature go / no-go checklist",
      ].map((label, i) => {
        const y = 140 + i * 54;
        return (
          <g key={label}>
            <rect x="640" y={y} width="240" height="42" rx="8" fill={c.card} stroke={c.cardBorder} />
            <text x="656" y={y + 26} fontSize="13.5" fill={c.ink}>
              {label}
            </text>
          </g>
        );
      })}

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill={c.line} />
        </marker>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Trust ladder — automation is earned, level by level              */
/* ------------------------------------------------------------------ */

function TrustLadder({ accent, dark }: { accent: string; dark?: boolean }) {
  const c = useInk(dark);
  const rungs = [
    {
      level: "L1",
      mode: "On demand",
      title: "Assist me with myself",
      body: "Summarise, organise, suggest — only when asked.",
    },
    {
      level: "L2",
      mode: "Proactive",
      title: "Anticipate for me",
      body: "Surface priorities before I ask — once the basics prove reliable.",
    },
    {
      level: "L3",
      mode: "Delegated",
      title: "Act across my tools",
      body: "Handle tasks beyond the inbox, with oversight and an easy undo.",
    },
    {
      level: "L4",
      mode: "Automatic",
      title: "Work on my behalf",
      body: "Take independent action — the role a feature earns last, not first.",
    },
  ];

  return (
    <svg
      viewBox="0 0 900 360"
      className="h-auto w-full min-w-[680px]"
      role="img"
      aria-label="A four-level ladder from on-demand assistance to automatic action. Trust and transparency rise as automation deepens; each level must be earned before the next."
    >
      {/* baseline axis */}
      <text x="20" y="28" fontSize="13" fontWeight="700" fill={accent} letterSpacing="1.2">
        LESS AUTOMATION →→→ MORE AUTOMATION
      </text>
      <text x="20" y="346" fontSize="12.5" fill={c.sub}>
        Each level must earn the next: transparency and control come first, automation last.
      </text>

      {rungs.map((r, i) => {
        const x = 20 + i * 218;
        const h = 150 + i * 34;
        const y = 300 - h;
        return (
          <g key={r.level}>
            <rect
              x={x}
              y={y}
              width="200"
              height={h}
              rx="12"
              fill={accent}
              opacity={0.1 + i * 0.16}
            />
            <rect x={x} y={y} width="200" height={h} rx="12" fill="none" stroke={accent} opacity="0.5" />
            <text x={x + 16} y={y + 30} fontSize="22" fontWeight="800" fill={dark ? "#fff" : accent}>
              {r.level}
            </text>
            <text x={x + 16} y={y + 52} fontSize="12" fontWeight="700" fill={c.sub} letterSpacing="0.5">
              {r.mode.toUpperCase()}
            </text>
            <text x={x + 16} y={y + 78} fontSize="15" fontWeight="700" fill={c.ink}>
              {r.title}
            </text>
            <foreignObject x={x + 14} y={y + 88} width="176" height={h - 96}>
              <div
                style={{
                  fontSize: "11.5px",
                  lineHeight: 1.4,
                  color: c.sub,
                }}
              >
                {r.body}
              </div>
            </foreignObject>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Trust stack — the layered guideline model                        */
/* ------------------------------------------------------------------ */

function TrustStack({ accent, dark }: { accent: string; dark?: boolean }) {
  const c = useInk(dark);
  const layers = [
    {
      name: "Interface layer",
      sub: "Transparency & control",
      body: "Show what it did and why; make every action reviewable, correctable, reversible.",
    },
    {
      name: "Intelligence layer",
      sub: "Learning & adaptation",
      body: "Improve from each correction; carry memory across sessions instead of starting fresh.",
    },
    {
      name: "Foundation layer",
      sub: "Accuracy & reliability",
      body: "Get names, dates, and context right first. Prefer an underconfident correct answer to a confident wrong one.",
    },
  ];

  return (
    <svg
      viewBox="0 0 900 340"
      className="h-auto w-full min-w-[680px]"
      role="img"
      aria-label="A three-layer stack. Foundation: accuracy and reliability. Intelligence: learning and adaptation. Interface: transparency and control. Nothing higher holds unless the layer below it does."
    >
      <text x="20" y="28" fontSize="13" fontWeight="700" fill={accent} letterSpacing="1.2">
        THE OUTCOME: A LAYERED STANDARD EVERY FEATURE IS HELD TO
      </text>
      {layers.map((l, i) => {
        const y = 50 + i * 92;
        const inset = (2 - i) * 48;
        return (
          <g key={l.name}>
            <rect
              x={40 + inset}
              y={y}
              width={820 - inset * 2}
              height="76"
              rx="10"
              fill={accent}
              opacity={0.1 + i * 0.09}
            />
            <rect
              x={40 + inset}
              y={y}
              width={820 - inset * 2}
              height="76"
              rx="10"
              fill="none"
              stroke={accent}
              opacity="0.55"
            />
            <text x={60 + inset} y={y + 30} fontSize="16" fontWeight="800" fill={c.ink}>
              {l.name}
            </text>
            <text x={60 + inset} y={y + 50} fontSize="13" fontWeight="600" fill={dark ? "#fff" : accent}>
              {l.sub}
            </text>
            <text x={60 + inset} y={y + 68} fontSize="12" fill={c.sub}>
              {l.body}
            </text>
          </g>
        );
      })}
      <text x="450" y="332" fontSize="12.5" fill={c.sub} textAnchor="middle">
        Read bottom-up: nothing higher holds unless the layer beneath it does.
      </text>
    </svg>
  );
}
