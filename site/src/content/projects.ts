export type SnapshotItem = {
  label: string;
  value: string;
  detail?: string;
};

export type ProjectMove = {
  num: string;
  title: string;
  paragraphs: string[];
  image?: { src: string; alt: string; caption?: string };
};

export type ProjectSection =
  | {
      type: "prose";
      kicker?: string;
      title: string;
      paragraphs: string[];
      dark?: boolean;
    }
  | { type: "nda"; text: string }
  | {
      type: "moves";
      kicker: string;
      title: string;
      intro?: string;
      moves: ProjectMove[];
    }
  | {
      type: "images";
      images: Array<{ src: string; alt: string; caption?: string }>;
      pair?: boolean;
    }
  | {
      type: "diagram";
      variant: "synthesis-process" | "trust-ladder" | "trust-stack";
      kicker?: string;
      title?: string;
      intro?: string;
      caption?: string;
      dark?: boolean;
    }
  | { type: "reflection"; title: string; paragraphs: string[]; dark?: boolean };

export type Project = {
  slug: string;
  index: number;
  company: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  turnLabel: string;
  turn: string;
  accent: string;
  accentMuted: string;
  accentOnDark: string;
  heroDark?: boolean;
  eyebrow: string;
  headline: string;
  standfirst: string;
  chips: string[];
  snapshot: SnapshotItem[];
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "microsoft-copilot-trust",
    index: 1,
    company: "Microsoft",
    year: "2024–25",
    title: "Earning trust before automating",
    description:
      "A strategic framework for how AI assistance earns progressively deeper roles in people's email",
    tags: ["Strategic synthesis", "Framework", "White paper", "NDA, methods only"],
    turnLabel: "The turn",
    turn: "Adoption looked like a question of capability. The synthesis showed automation is something a feature earns: transparency and control come first.",
    accent: "#4F46E5",
    accentMuted: "#EEEDFB",
    accentOnDark: "#A5B4FC",
    heroDark: true,
    eyebrow: "Microsoft · 2024–25",
    headline: "A point of view for Copilot in Outlook",
    standfirst:
      "Microsoft was pushing Copilot into Outlook one capability at a time, each with its own research behind it, right as the org was consolidating everything under One Outlook. The evidence had piled up; a shared position on what it meant hadn't. I synthesised six studies and a year of public sentiment into a white paper on what people need before they trust an AI assistant in their inbox — and what that says about what to build first.",
    chips: [
      "UX Researcher, contract via Kadence",
      "Sept 2024 – Feb 2025",
      "Point-of-view white paper",
      "Under NDA · method and framework shown",
    ],
    snapshot: [
      { label: "My role", value: "UX Researcher", detail: "contract, via Kadence" },
      { label: "Timeline", value: "Sept 2024 – Feb 2025", detail: "paper delivered Feb 2025" },
      { label: "Working with", value: "Khyati Seth", detail: "lead researcher, Outlook UXR" },
      { label: "Inputs", value: "Six internal studies", detail: "plus a year of public social listening" },
      {
        label: "Deliverable",
        value: "A point-of-view white paper",
        detail: "trust framework, design guidelines, and a feature checklist",
      },
    ],
    sections: [
      {
        type: "nda",
        text: "This work is under NDA. What you see below is my method and the shape of the frameworks I built — redrawn from scratch. Internal findings, feature names, and roadmap details stay out.",
      },
      {
        type: "prose",
        kicker: "Why this mattered",
        title: "The team had a dozen answers and no shared question",
        paragraphs: [
          "Microsoft was moving to One Outlook — a single experience across every device and endpoint — at the same moment Copilot was being pushed into Outlook one capability at a time. The AI work sat across many feature teams, and each had commissioned its own research to justify its own bet. A year in, the organisation held a dozen credible, confident, and quietly conflicting points of view about what an AI assistant in email should be.",
          "That fragmentation was the real problem. As M365 spread Copilot across Word, Teams, and Outlook, no one owned the question underneath all of it: taken together, what are users actually telling us about letting an assistant into their inbox — and what does that mean for what we build first? The team needed one unified way forward, argued from the evidence rather than from whichever study was loudest. That is what I was brought in to write.",
        ],
      },
      {
        type: "prose",
        kicker: "The starting condition",
        title: "Six studies, six vocabularies, one assistant",
        paragraphs: [
          "The inputs were six internal studies — a task-management deep dive, a prioritisation study, a concept focus group, time-away research, a drafting-and-tone study, and a study on focus and mental load — each competent on its own terms, none written to be read beside the others. Where internal evidence ran thin, a year of public social listening filled the gap: what people were saying, unprompted, about living with Copilot.",
          "The job was not a summary of summaries. It was a position: here is what users consistently need, here is exactly where trust breaks, and here is what any feature has to prove before it earns a bigger role in someone's inbox.",
        ],
      },
      {
        type: "diagram",
        variant: "synthesis-process",
        kicker: "The process",
        title: "How six studies became one point of view",
        intro:
          "I treated the accumulated research like a qualitative corpus — coding across studies for recurring needs, contradictions, and gaps, then pressure-testing those codes against public sentiment. The output wasn't a report. It was a framework the whole org could build against, or argue with.",
        caption:
          "Six internal studies and a year of social listening, coded as one corpus, resolved into a single paper: a progressive trust model, three design prerequisites, and a go/no-go checklist.",
      },
      {
        type: "prose",
        kicker: "The reframe",
        title: "Adoption isn't a capability problem. It's a trust problem.",
        paragraphs: [
          "The loudest internal framing was that adoption would follow capability — ship a smarter feature, earn more use. Reading the studies together said something different and more uncomfortable: people were declining automation they technically wanted, because they couldn't see what it did, couldn't correct it, and couldn't predict it. The barriers repeated across every study — inaccuracy on basic facts, opaque automatic actions, an assistant that never seemed to learn.",
          "So the spine of the paper became a single claim: automation is not a starting position a feature is given. It is a role a feature earns, one level of trust at a time.",
        ],
      },
      {
        type: "diagram",
        variant: "trust-ladder",
        dark: true,
        kicker: "The framework",
        title: "Earning trust before automating",
        intro:
          "The model maps assistance onto four levels, from doing nothing until asked to acting independently on the user's behalf. A feature does not get to skip rungs. Each level has to demonstrate accuracy and control at its depth before it earns the next — which turns \"should we automate this?\" into \"has this earned the right to?\"",
        caption:
          "The progressive trust ladder: on-demand → proactive → delegated → automatic. Transparency and control are the price of admission at every rung, not a feature added once adoption stalls.",
      },
      {
        type: "prose",
        kicker: "The prerequisites",
        title: "Three things that have to be true first",
        paragraphs: [
          "Underneath the ladder sit three prerequisites — the conditions that have to hold before users will let an assistant move up a level at all.",
          "Transparency: people need to see what the assistant did and why before they will let it act again. An opaque correct action still erodes trust.",
          "Control: undo, edit, and refuse have to exist at every depth of automation — designed in from the start, not bolted on after adoption stalls.",
          "Predictability: assistance that surprises people in their own inbox costs more trust than assistance that is merely imperfect. Consistency is a feature.",
        ],
      },
      {
        type: "diagram",
        variant: "trust-stack",
        kicker: "The outcome, structured",
        title: "What every feature is now held to",
        intro:
          "The prerequisites became an operating standard: a layered set of trust-and-effectiveness guidelines and a development checklist teams run a proposal through before building. It reads bottom-up — a feature can't claim the transparency layer until the accuracy layer beneath it is solid.",
        caption:
          "The layered guideline model that closed the paper, paired with a checklist covering transparency, accuracy, learning, control, discoverability, risk, and cross-app consistency.",
      },
      {
        type: "reflection",
        title: "What I took from it",
        dark: true,
        paragraphs: [
          "Synthesis is editorial judgment carrying a researcher's name. The hardest calls weren't which findings to include — they were telling a genuine disagreement in the evidence apart from an artifact of how a single study happened to be scoped. Getting that wrong would have baked one team's blind spot into the org's point of view.",
          "The paper's value was quieter than a finding: it gave feature teams a shared language for trust. Debates stopped being about whose study was bigger and started being about whether a proposal cleared the prerequisites. That's the kind of outcome strategic research is for.",
        ],
      },
    ],
  },
  {
    slug: "microsoft-retention",
    index: 2,
    company: "Microsoft",
    year: "2024",
    title: "Why mobile users stay or leave",
    description:
      "Mixed-methods retention research for a consumer email experience on the mobile web",
    tags: ["36 interviews", "Survey", "Segmentation", "NDA, methods only"],
    turnLabel: "The turn",
    turn: "Retention looked like a product question. Mapping people's whole systems of accounts moved the unit of analysis to the ecosystem this product was one endpoint of.",
    accent: "#0369A1",
    accentMuted: "#E3F1FA",
    accentOnDark: "#7DD3FC",
    eyebrow: "Microsoft · 2024",
    headline: "Why people were leaving Outlook on the mobile web",
    standfirst:
      "Usage of Outlook's lightweight mobile browser experience was declining among consumer users, and everyone on the team had a different explanation for it. This was a mixed-methods study, 36 interviews followed by a 300+ response validation survey, that replaced those competing theories with an account of where this product actually sits in people's lives.",
    chips: ["36 interviews", "6 user segments", "300+ survey responses", "Under NDA; method shown"],
    snapshot: [
      { label: "My role", value: "UX Researcher", detail: "contract, via Kadence" },
      { label: "Timeline", value: "2024", detail: "within a Sept 2024 – Feb 2025 contract" },
      { label: "Study lead", value: "Khyati Seth", detail: "lead researcher, with researcher and PM partners" },
      {
        label: "Method",
        value: "Hypothesis workshop, 36 moderated interviews across 6 segments, 300+ response survey",
      },
      { label: "Findings", value: "Under NDA; method and analysis approach shown" },
    ],
    sections: [
      {
        type: "nda",
        text: "Findings and product details are under NDA. This page describes the study design, analysis approach, and the kind of reframing the work produced.",
      },
      {
        type: "prose",
        kicker: "Context",
        title: "Context",
        paragraphs: [
          "The mobile web experience was losing users, and the internal theories multiplied: missing features, performance, notification fatigue, competition from native apps. Each theory had a champion.",
          "The study was designed to replace opinion with evidence: a hypothesis workshop to surface competing theories, qualitative interviews to understand how people actually manage email across devices and accounts, then a survey to test which patterns held at scale.",
        ],
      },
      {
        type: "prose",
        kicker: "Method",
        title: "From hypotheses to a life-map",
        paragraphs: [
          "Interviews were structured around people's whole email ecosystems — primary, secondary, tertiary, and abandoned accounts — not just this product's feature set.",
          "That shift in unit of analysis was the turn: retention was not about fixing one endpoint in isolation but about understanding where this experience sat in a portfolio of accounts people maintained for different purposes.",
        ],
      },
      {
        type: "reflection",
        title: "Reflection",
        dark: true,
        paragraphs: [
          "The most useful deliverable was not a list of fixes but a segmentation model grounded in how people actually route mail — which made prioritization arguments evidence-backed instead of political.",
          "Mixed-methods here meant letting interviews discover the frame and the survey test it, not running both in parallel and hoping they agreed.",
        ],
      },
    ],
  },
  {
    slug: "razorpay-d2c",
    index: 3,
    company: "Razorpay",
    year: "2024",
    title: "Should a B2B fintech bet on consumers?",
    description: "Validating a D2C rewards platform before the company bet on it",
    tags: ["25+ interviews", "3 focus groups", "Survey, 1000+", "Strategic research"],
    turnLabel: "The turn",
    turn: "The proposed value proposition turned out to have very little pull. The participatory exercises inside those interviews surfaced the model that did.",
    accent: "#7C3AED",
    accentMuted: "#F1EAFB",
    accentOnDark: "#C4B5FD",
    eyebrow: "Razorpay · 2024",
    headline: "Should a B2B fintech bet on consumers?",
    standfirst:
      "Razorpay, a B2B payments company, was weighing a strategic move into consumer territory: a rewards marketplace that merchants would fund and consumers would use. Before leadership committed real investment, I designed and ran a study to find out whether demand existed on either side of that marketplace. The research ended up doing more than validating the pitch; it changed what the pitch was.",
    chips: ["Senior UX Researcher", "Strategic research", "25+ interviews", "1000+ survey respondents"],
    snapshot: [
      { label: "My role", value: "Senior UX Researcher" },
      { label: "Timeline", value: "2024" },
      { label: "Method", value: "3 focus groups, 25+ interviews with participatory design, 1000+ respondent survey" },
      { label: "Stakeholders", value: "CXOs and product leadership" },
      { label: "Outcome", value: "Reframed value proposition before major investment" },
    ],
    sections: [
      {
        type: "prose",
        kicker: "Context",
        title: "Context",
        paragraphs: [
          "Leadership was considering a consumer rewards marketplace — merchants funding offers, consumers redeeming them — as Razorpay's entry into B2C. The ask was validation: is there demand, and on which side of the marketplace?",
          "Strategic research at this scale needed to speak to both sides of the market and survive executive scrutiny, which meant mixing qualitative depth with survey scale.",
        ],
      },
      {
        type: "images",
        images: [
          {
            src: "/images/work/d2c/research-framework.png",
            alt: "Research framework diagram for the D2C study",
            caption: "The study design: merchant-side and consumer-side tracks, converging on a value proposition test.",
          },
        ],
      },
      {
        type: "moves",
        kicker: "How the study was designed",
        title: "How the study was designed",
        intro: "Three focus groups, 25+ interviews with participatory exercises, and a 1000+ respondent survey — each instrument answering a different risk.",
        moves: [
          {
            num: "1",
            title: "Focus groups with merchants",
            paragraphs: [
              "Three focus groups surfaced how merchants think about customer incentives — what they would fund, what they would not, and what language they use to describe loyalty.",
            ],
          },
          {
            num: "2",
            title: "Interviews with participatory design",
            paragraphs: [
              "Participatory exercises inside interviews let participants sketch their own reward models. The proposed marketplace model drew little enthusiasm; the exercises surfaced a different model centered on trust and repeat purchase.",
            ],
            image: {
              src: "/images/work/d2c/workshop.png",
              alt: "Participatory design workshop artifacts",
              caption: "Participatory exercises: participants building reward models in their own terms.",
            },
          },
          {
            num: "3",
            title: "1000+ respondent survey",
            paragraphs: [
              "The survey tested the reframed model at scale and gave leadership quantitative backing for the strategic recommendation.",
            ],
          },
        ],
      },
      {
        type: "prose",
        kicker: "The reframing",
        title: "From rewards marketplace to trust layer",
        dark: true,
        paragraphs: [
          "The original pitch — a rewards marketplace — had weak pull on both sides. What the participatory work surfaced was a model merchants could explain to their customers: a trust layer that made repeat purchase feel safe, not a points program.",
          "The recommendation changed what leadership was being asked to fund, not just whether to fund it.",
        ],
      },
      {
        type: "reflection",
        title: "Reflection",
        dark: true,
        paragraphs: [
          "Strategic research earns its keep when it changes the question, not just the answer. Participatory methods were not decoration — they were how the team discovered the model worth testing at scale.",
        ],
      },
    ],
  },
  {
    slug: "razorpay-website-evaluation",
    index: 4,
    company: "Razorpay",
    year: "2023",
    title: "What does a homepage say in ten seconds?",
    description:
      "Mixed-method evaluation of a redesigned website that lifted conversion by 10%",
    tags: ["Impression test", "Usability", "SUS", "Preference test"],
    turnLabel: "The call",
    turn: "The risky path was learning from 1M+ daily visitors after launch. Testing first meant 90% of the recommendations were incorporated before the site went live.",
    accent: "#1D4ED8",
    accentMuted: "#E7EDFB",
    accentOnDark: "#93C5FD",
    eyebrow: "Razorpay · 2023",
    headline: "What does a homepage say in ten seconds?",
    standfirst:
      "Razorpay was about to replace its homepage, a page with over a million daily visitors, with a redesign that traded technical language for a warmer, human voice. No research was planned for the launch. I proposed the study, designed it as a series of small tests that each isolated one way the new page could fail, and delivered the findings in time to act on them. Conversion rose 10% after the tested redesign shipped, and 90% of the recommendations were adopted.",
    chips: ["UX Researcher", "1M+ daily visitors", "90% recommendations adopted", "10% conversion lift"],
    snapshot: [
      { label: "My role", value: "UX Researcher" },
      { label: "Timeline", value: "2023" },
      { label: "Page", value: "Razorpay marketing homepage", detail: "1M+ daily visits" },
      { label: "Method", value: "Impression test, usability, SUS, preference test, premortem, UX audit" },
      { label: "Outcome", value: "90% of recommendations incorporated pre-launch; 10% conversion lift post-launch" },
    ],
    sections: [
      {
        type: "prose",
        kicker: "Context",
        title: "Context",
        paragraphs: [
          "The redesign shifted tone from technical to human — a meaningful bet on a page with more than a million daily visitors. No evaluative research was on the launch plan.",
          "I proposed a battery of small tests, each isolating one failure mode, rather than one monolithic usability study that would blur findings.",
        ],
      },
      {
        type: "images",
        pair: true,
        images: [
          {
            src: "/images/work/website-eval/old-homepage.png",
            alt: "Old Razorpay homepage",
            caption: "Before: technical vocabulary, feature-forward layout.",
          },
          {
            src: "/images/work/website-eval/new-homepage.png",
            alt: "New Razorpay homepage",
            caption: "After: warmer voice — but did it still communicate what Razorpay is in ten seconds?",
          },
        ],
      },
      {
        type: "prose",
        kicker: "Why a battery of small tests",
        title: "Why a battery of small tests, rather than one usability test",
        paragraphs: [
          "A homepage can fail in different ways: wrong first impression, unclear value prop, navigation confusion, distrust. One usability test collapses those into a single score.",
          "Impression testing, preference testing, SUS, a premortem with stakeholders, and a structured UX audit each answered one question cleanly.",
        ],
      },
      {
        type: "images",
        images: [
          {
            src: "/images/work/website-eval/impression-test.png",
            alt: "Impression test setup",
            caption: "Ten-second impression test: what do people think this company does?",
          },
        ],
      },
      {
        type: "prose",
        kicker: "What it led to",
        title: "What it led to",
        dark: true,
        paragraphs: [
          "Findings landed in time for the launch team to act. 90% of recommendations were incorporated before the site went live — the alternative was learning from a million daily visitors after shipping.",
          "Post-launch, conversion rose 10% on the tested design.",
        ],
      },
      {
        type: "reflection",
        title: "Reflection",
        dark: true,
        paragraphs: [
          "Evaluative research at scale is often about timing as much as method. Small, focused instruments made it possible to deliver actionable findings before the launch window closed.",
        ],
      },
    ],
  },
  {
    slug: "razorpay-onboarding",
    index: 5,
    company: "Razorpay",
    year: "2021–22",
    title: "Why did merchants give up before their first payment?",
    description: "Redesigning KYC for low-tech-literacy merchants, lifting conversion by 51%",
    tags: ["Ticket analysis, 150+", "Empathy workshop", "Usability"],
    turnLabel: "The turn",
    turn: "These merchants had all opened bank accounts before, with the same documents. A role play of that counter conversation became the design: one question at a time, with the reason for asking.",
    accent: "#047857",
    accentMuted: "#E6F4EA",
    accentOnDark: "#6EE7B7",
    eyebrow: "Razorpay · 2021–22",
    headline: "Redesigning merchant onboarding around an existing mental model",
    standfirst:
      "To accept payments through Razorpay, a merchant first had to get through a 14-minute compliance form, and a painful share of small merchants never did. I rebuilt the flow around a mental model these merchants already had: opening an account with a helpful bank clerk, one plain question at a time. After launch, form-filling conversion rose 51%, median completion time fell from 14 to 5 minutes, and onboarding support tickets dropped 43%.",
    chips: [
      "Product Designer",
      "July 2021 – Oct 2022",
      "SME merchant onboarding",
      "51% conversion lift · 43% fewer tickets",
    ],
    snapshot: [
      { label: "My role", value: "Product Designer, doing my own research; my first role at Razorpay" },
      { label: "Timeline", value: "July 2021 – Oct 2022" },
      { label: "Users", value: "SME merchants", detail: "many with low tech literacy" },
      {
        label: "Evidence",
        value: "150+ support tickets, 50+ session recordings, teardown workshop, competitive analysis, role play, 11-merchant usability test",
      },
      { label: "Outcome", value: "51% conversion lift; 14 to 5 minutes; 43% fewer tickets; internal MVP award" },
    ],
    sections: [
      {
        type: "prose",
        kicker: "Context",
        title: "Context",
        paragraphs: [
          "Onboarding asked merchants for business details, regulatory KYC, and bank information, spread across a tabbed, dense form that took about 14 minutes when everything went well. For small merchants — a kirana store owner, a home baker — the form spoke the language of compliance, and they ran businesses, not paperwork.",
        ],
      },
      {
        type: "images",
        images: [
          {
            src: "/images/work/onboarding/old-onboarding.png",
            alt: "The old onboarding flow with dense tabbed forms",
            caption: "The old flow: tabbed screens, many fields at once, compliance vocabulary throughout.",
          },
        ],
      },
      {
        type: "moves",
        kicker: "Building the evidence base",
        title: "Building the evidence base",
        intro: "There was no research team attached to this project, so the first decision was to mine the evidence the company already had.",
        moves: [
          {
            num: "1",
            title: "150+ support tickets, coded",
            paragraphs: [
              "I read and coded over 150 onboarding support tickets. They mapped exactly where the form broke people: business-type jargon, buttons that stayed disabled with no explanation, and silence after submission.",
            ],
            image: {
              src: "/images/work/onboarding/ticket-analysis.png",
              alt: "Support ticket excerpts showing onboarding failure modes",
              caption: "Three tickets, three failure types: vocabulary mismatch, dead ends, silence after submission.",
            },
          },
          {
            num: "2",
            title: "50+ session recordings",
            paragraphs: [
              "Hotjar recordings showed what tickets couldn't: long pauses, tab-switching, repeated clicks on a disabled button, and the exits.",
            ],
          },
          {
            num: "3",
            title: "A teardown workshop",
            paragraphs: [
              "Designers and PMs annotated every screen against the ticket and recording evidence — turning an abstract drop-off number into specific, fixable moments.",
            ],
            image: {
              src: "/images/work/onboarding/empathy-workshop.png",
              alt: "FigJam board with onboarding teardown sticky notes",
              caption: "The teardown board: every screen annotated against the evidence.",
            },
          },
        ],
      },
      {
        type: "prose",
        kicker: "The reframe",
        title: "Bank clerk, not compliance form",
        dark: true,
        paragraphs: [
          "These merchants had opened bank accounts before, with the same documents. A role play of that counter conversation — one plain question at a time, with a reason for asking — became the design principle.",
          "One question per screen, conversational copy, progress that felt like a conversation rather than an audit.",
        ],
      },
      {
        type: "images",
        images: [
          {
            src: "/images/work/onboarding/new-onboarding.gif",
            alt: "New one-question-at-a-time onboarding flow",
            caption: "The redesigned flow: one question at a time, with the reason for asking.",
          },
        ],
      },
      {
        type: "prose",
        kicker: "Validation and impact",
        title: "Validation and impact",
        dark: true,
        paragraphs: [
          "Usability testing with 11 merchants validated the flow before launch. After shipping: 51% conversion lift, median completion time from 14 to 5 minutes, onboarding support tickets down 43%.",
        ],
      },
      {
        type: "reflection",
        title: "What I learned",
        dark: true,
        paragraphs: [
          "Low-tech-literacy users are not a separate species — they are people encountering a vocabulary that wasn't built for them. The fix was not simpler words alone but a mental model they already trusted.",
        ],
      },
    ],
  },
  {
    slug: "meesho-vernacular",
    index: 6,
    company: "Meesho",
    year: "2020",
    title: "What gets lost when research is in English?",
    description:
      "Foundational research on language and bias in designing for India's next billion users",
    tags: ["10 expert interviews", "Foundational research"],
    turnLabel: "The turn",
    turn: "Textbook translation made the app harder, and pure transliteration read as noise. The experts converged on the colloquial mix people actually speak, so the report argued for a hybrid.",
    accent: "#BE185D",
    accentMuted: "#FBE7F0",
    accentOnDark: "#F9A8D4",
    eyebrow: "Meesho · 2020",
    headline: "What gets lost when research is in English?",
    standfirst:
      "Meesho's users are largely women from semi-urban and rural India, running reselling businesses on an app designed, and mostly researched, in English. As a research intern, I led a ten-week study on what that gap costs: what translation flattens, what transliteration misses, and which biases creep in when teams build for users they rarely meet. The report gave the design and product teams a working vocabulary for language decisions, and one finding became its own workshop.",
    chips: ["User Research Intern", "10 expert interviews", "Foundational research", "May – July 2020"],
    snapshot: [
      { label: "My role", value: "User Research Intern" },
      { label: "Timeline", value: "10 weeks, May – July 2020" },
      { label: "Method", value: "10 expert interviews, secondary research, stakeholder workshop" },
      { label: "Users", value: "Women resellers", detail: "semi-urban and rural India" },
      { label: "Deliverable", value: "Foundational report on vernacular UX and research bias" },
    ],
    sections: [
      {
        type: "prose",
        kicker: "Context",
        title: "Context",
        paragraphs: [
          "Meesho's resellers operate in Hindi and regional languages, but the product and research apparatus were largely English-first. That gap has costs: translation that flattens intent, transliteration that reads as noise, and research that systematically under-represents the people the product serves.",
        ],
      },
      {
        type: "images",
        images: [
          {
            src: "/images/work/vernacular/interviewee-breakdown.png",
            alt: "Breakdown of expert interview participants",
            caption: "Ten experts across linguistics, UX, and community work — chosen for depth, not convenience sampling.",
          },
        ],
      },
      {
        type: "prose",
        kicker: "The central finding",
        title: "The central finding",
        paragraphs: [
          "Textbook translation made the app harder to use, not easier. Pure transliteration felt like noise. What people actually spoke was a hybrid — colloquial Hindi mixed with English loanwords — and the report argued for designing to that reality rather than to textbook grammar.",
        ],
      },
      {
        type: "images",
        images: [
          {
            src: "/images/work/vernacular/report.png",
            alt: "Report excerpt on vernacular UX recommendations",
            caption: "The report gave teams a vocabulary for language decisions — and one finding became a bias workshop.",
          },
        ],
      },
      {
        type: "reflection",
        title: "Reflection",
        dark: true,
        paragraphs: [
          "Foundational research is often the work of naming the problem before anyone can propose a fix. Here, the contribution was giving teams language for a gap they felt but couldn't quite articulate.",
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
