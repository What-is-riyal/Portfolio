/**
 * The six projects, in order. Findings/claims are Priyal's to write, so each
 * `claim` is TODO. Only verified facts appear in `tech`; anything unverified is
 * TODO. Do not invent metrics, methods, or outcomes here.
 */

export type Entry = {
  slug: string;
  project: string; // the row title is the project, not the claim
  claim: string; // her finding, in her words — TODO
  tech: string; // company · year · method · outcome (verified only)
  tag?: string;
};

export const WORK: Entry[] = [
  {
    slug: 'razorpay-sme-onboarding',
    project: 'Razorpay, SME onboarding redesign',
    claim: 'TODO_CLAIM',
    tech: 'Razorpay · 2021 · Low digital literacy merchants · +51% form conversion, 14→5 min, tickets down 43%',
    tag: 'Shipped',
  },
  {
    slug: 'microsoft-miniowa-retention',
    project: 'Microsoft, MiniOWA retention study',
    claim: 'TODO_CLAIM',
    tech: 'Microsoft · 2025 · Mixed methods, 36 interviews, 300+ surveys · TODO_OUTCOME',
  },
  {
    slug: 'meesho-next-billion',
    project: 'Meesho, community for the next billion users',
    claim: 'TODO_CLAIM',
    tech: 'Meesho · 2020 · 40+ qualitative interviews, in Hindi · Women in semi-urban and rural India · TODO_OUTCOME',
  },
  {
    slug: 'razorpay-d2c-validation',
    project: 'Razorpay, D2C validation',
    claim: 'TODO_CLAIM',
    tech: 'Razorpay · TODO_YEAR · Led research: 40+ merchant interviews, focus groups, ~1000 survey respondents · TODO_OUTCOME',
  },
  {
    slug: 'razorpay-website-evaluation',
    project: 'Razorpay, website evaluation',
    claim: 'TODO_CLAIM',
    tech: 'Razorpay · TODO_YEAR · Mixed method · Site with 1M+ daily visits · TODO_OUTCOME',
  },
  {
    slug: 'microsoft-copilot-trust',
    project: 'Microsoft, Copilot trust white paper',
    claim: 'TODO_CLAIM',
    tech: 'Microsoft · TODO_YEAR · Strategic synthesis, trust-first AI adoption · NDA constrained, the lens not the internals',
  },
];
