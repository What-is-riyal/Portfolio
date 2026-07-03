export const site = {
  name: "Priyal Shrivastava",
  title: "Priyal Shrivastava, User Researcher",
  description:
    "Priyal Shrivastava is a user researcher focused on trust and safety, responsible AI, and the people most affected by technology decisions. MHCI at Carnegie Mellon, previously Razorpay, Microsoft, and Meesho.",
  email: "priyalshri1@gmail.com",
  linkedin: "https://www.linkedin.com/in/priyalshri/",
  resumePdf: "/resume/priyal-resume-uxr.pdf",
  profileImage: "/images/profile/priyal.png",
} as const;

export const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/play", label: "Play" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
] as const;

export const heroCodes = [
  {
    id: "who",
    label: "who",
    text: "Payments merchants, first-time internet users, everyday email users. Many with low tech literacy: the people research usually struggles to reach.",
  },
  {
    id: "how",
    label: "how",
    text: "Interviews, surveys, usability tests, focus groups, participatory design. 4+ years at Razorpay, Microsoft, and Meesho.",
  },
  {
    id: "sowhat",
    label: "so what",
    text: "Redesigned flows that lifted conversion, product roadmaps, and one multi-million-dollar investment decision.",
  },
  {
    id: "now",
    label: "now",
    text: "Human-AI communication and digital trust at Carnegie Mellon, with coursework in Responsible AI and Ethics & Policy in Computing.",
  },
] as const;

export const skimStats = [
  {
    value: "4+",
    text: "years leading research at Razorpay, Microsoft, and Meesho",
    href: "/#about",
  },
  {
    value: "51%",
    text: "conversion lift after redesigning merchant onboarding to ask one question at a time",
    href: "/work/razorpay-onboarding",
  },
  {
    value: "1M+",
    text: "daily visits to the website we evaluated before it launched",
    href: "/work/razorpay-website-evaluation",
  },
  {
    value: "90%",
    text: "of that study's recommendations incorporated before the site shipped",
    href: "/work/razorpay-website-evaluation",
  },
  {
    value: "1000+",
    text: "survey respondents, with 25+ interviews and 3 focus groups, behind one investment decision",
    href: "/work/razorpay-d2c",
  },
] as const;

export const credentials = [
  {
    tag: "CHI 2026",
    text: "Second author, full paper: Lost in Transcription: Subtitle Errors in Automatic Speech Recognition Reduce Speaker and Content Evaluations.",
  },
  {
    tag: "1st place",
    text: "US AI Policy Hackathon, deepfakes and elections track.",
  },
  {
    tag: "Community",
    text: "Executive member of CASI; co-facilitator of an AI Governance reading group.",
  },
  {
    tag: "Book",
    text: "Contributed interviews and data collection to UXR in India: A Historical Perspective by Achyutha Sharma, on how UX research practice evolved in India.",
    href: "https://drive.google.com/file/d/1OE4_fKTRbh5BZhSPK1xqvbna47DufFee/view",
  },
] as const;

export const aboutChips = [
  "Responsible AI",
  "Low tech literacy users",
  "Service design",
  "Insights → Action",
] as const;
