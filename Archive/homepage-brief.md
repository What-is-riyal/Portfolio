# Build the homepage for Priyal Shrivastava's portfolio

Next.js (App Router), React, TypeScript, GSAP ScrollTrigger. Homepage only. Project case study pages come later and will inherit the design system you establish here, so every token, type role, and motion primitive must be documented and exported, not inlined.

## The bar

Four rules carry the craft here, and they are the reason this brief is written at this level of detail:

1. Scenes transform instead of crossfading. Nothing fades up.
2. Typography is the material. Not a delivery vehicle for copy sitting inside a layout.
3. Theme changes are hard cuts with meaning, not gradients between moods.
4. No decoration without an argument. If you cannot say what a thing is doing, delete it.

Now the counterweight, and it is just as important. This is not a scroll film. Do not pin for 1000vh. Do not build a cinematic title sequence. The reader is a hiring manager with a stack of tabs open, and every second before they reach the work is a cost. Spend all of that craft on a page a skimmer can finish in 40 seconds and a curious reader can spend five minutes inside.

The failure mode on one side is a SaaS template. On the other side is an art project that buries the evidence. Both are fatal.

## Who this is for

Priyal Shrivastava. UX researcher. CMU MHCI, graduating summer 2026. Seven years across fintech, social commerce, and AI, now researching how people decide whether to trust AI systems.

Primary reader: a UXR hiring manager or recruiter. They are asking three questions in this order. Can she run a study. Does she know what the finding was. Is she interesting. The page answers them in that order.

Secondary readers: PhD advisors, policy and governance people, PMs. They should find the page credible and see the governance thread, but nothing is designed for them. If a choice serves a PI at the recruiter's expense, the recruiter wins.

## Positioning (locked copy, use verbatim)

- Headline: **Technology is easy to build. People are the hard part.**
- Sub: **I study people so we get it right: better products, smarter rules, a world where everyone thrives with technology, not despite it.**

## Creative direction

**Big claim, small receipts.**

Every unit on this page has the same two-part structure, and that structure is the concept. A finding, stated enormous. The evidence for it, stated small and technical, directly beneath. That is what research is, and it is the one thing a portfolio can prove that a resume cannot: not that she ran the study, but that she knew what the study meant.

Never label a project by its deliverable. Not "Onboarding Redesign." The claim is the thing she found, in her words, at 12 to 18vw. The receipts are the method, the n, the outcome, set at 11px in mono. The gap between those two sizes is the whole design.

Scenes transform from what is already on screen. Type reflows and rescales into the next composition. Rules extend into grids. A claim compresses into a row. Never reset with a fade.

## Visual system

Colors:
- Bone: `#E8E8E0` (cool paper, not cream, resist any drift toward warm beige)
- Ink: `#111311`
- Graphite: `#6B6E68`
- Rule: `#C6C7BE`
- Void: `#0B0C0A`
- Signal: `#1B2FD9` (ultramarine)

At least 85% of the page is bone and ink. Signal appears on active states, the resolved word in the noise fold, and one full-bleed climax. Nowhere else.

Theme rhythm, hard cuts, no crossfades:
bone → void (noise fold) → bone (work) → signal (climax) → bone (close)

Type, three families, three jobs, no overlap:
- **Archivo Variable** (wght + wdth axes) for claims only. Never for UI. The width axis is functional: claims animate from condensed to expanded as they resolve.
- **Newsreader** for prose. She writes for a living, and the page should look like it.
- **Spline Sans Mono** for receipts, labels, counters, nav, metadata. Tabular numerals on.

Scale: claims 12 to 18vw with tight leading (0.85) and negative tracking. Prose at 19px, max 62ch. Receipts at 11px, uppercase, wide tracking. Nothing between 19px and 12vw. That absence is the point.

Layout: asymmetric editorial. Left-weighted claims, right-hung receipts, a visible baseline grid that the work ledger snaps to. Hairline rules only where they encode structure (a ledger row boundary is real, a decorative divider is not).

## Signature element: the noise fold

This is the one bold thing on the page. Everything else stays quiet so this can land.

It sits between the intro and the work ledger, and it does structural work: it hands the reader from "who is this" into "here is the evidence," by stating the method once, loudly. Hundreds of messy human fragments converge into one sentence a team can act on. That is not a metaphor for her job. It is a literal description of it.

Spec:
- Background cuts hard to void. Full viewport, pinned for roughly 120vh, scrub 0.8.
- A field of 300 to 500 text fragments drifts at varied depths, sizes, and opacities. On scroll they migrate inward, thin out, and the survivors align to a single line.
- The final line resolves in Archivo, signal color, and holds. Then the scene cuts back to bone and the resolved line becomes the ledger's first row.
- **The fragments must be real research material.** Transcript scraps, survey verbatims, field note lines, in the languages they were collected in (nine Indian languages from the Meesho fieldwork, plus English). This is the part nobody else's site can render. Random particles are banned. If the corpus is placeholder, the fold is decoration and should be cut.
- Corpus lives in `/data/fragments.ts` as a plain typed array with a language tag per fragment. Ship it seeded with clearly marked `TODO_PLACEHOLDER` strings so Priyal can swap the real corpus in without touching the component. Leave a comment at the top of the file stating the swap is required before launch.
- Canvas or transformed DOM, whichever holds 60fps at 500 nodes. Devanagari, Bengali, Tamil, Telugu, and the rest must render correctly, so if canvas breaks shaping, use DOM.

Non-negotiable: the resolved line is in the DOM as plain text and readable at first paint. The fold works with JS off. Under `prefers-reduced-motion` it is a static composition, fragments at rest around the line, no pin, no scrub. The animation is a gift to the curious, never a toll on the skimmer.

## Page storyboard

**00. No loader.** A 1.5 second loading sequence costs a recruiter 1.5 seconds. First paint is the hero.

**01. Hero (bone).** The headline at maximum scale, cropped at the right edge, one line breaking hard. Archivo resolves from condensed to expanded once on load, 700ms, then never again. Sub in Newsreader below. Receipts row in mono along the baseline: name, `UX RESEARCHER`, `CARNEGIE MELLON MHCI '26`, `AVAILABLE 2026`. A real skip link to the work ledger, styled as part of the composition, not hidden. On scroll, the headline scales down and parks in the corner as the wordmark. Do not fade it out.

**02. Intro (bone).** Three or four short paragraphs, Newsreader, asymmetric column, one honest voice. The arc: designer who got tired of losing arguments to opinions and moved into research to win them with evidence. Then fieldwork in India with people coming online for the first time into systems never designed for them. Then AI, and the same question with higher stakes. Written like a person talking, not a bio. See tone rules below.

**03. Noise fold (void).** As specced above.

**04. Work ledger (bone).** Six entries. Not cards. A ledger.

Each entry, full width, one per scroll beat:
- The claim, 12 to 18vw, Archivo
- The receipts beneath, mono, single line: company / year / method / n / outcome
- On enter, the claim widens on the wdth axis and the receipts type in. On exit, the claim compresses to a single ledger row that stays on screen as the next claim rises. By the sixth, the previous five sit as a stack of compressed rows above. The page builds its own index.
- Row hover: signal underline, arrow moves 6px. Click goes to the case study (routes can be stubs for now).

The six, in this order:
1. Razorpay, SME onboarding redesign. Low tech literacy merchants.
2. Microsoft, MiniOWA retention study. Primary mixed methods, 36 interviews, 300+ surveys.
3. Meesho, vernacular languages. Emerging internet users, nine Indian languages.
4. Razorpay, D2C validation. She led research: 40+ merchant interviews, focus groups, ~1000 survey respondents.
5. Razorpay, website evaluation. Mixed method, a site with 1M+ daily visits.
6. Microsoft, Copilot white paper. Strategic synthesis on trust-first AI adoption. NDA constrained, so the claim is about the lens, never about the company's internals.

Every claim line is `TODO_CLAIM` for now. Do not invent findings. Format demo only, so you understand the shape:

> **They didn't distrust the form. They distrusted the money.**
> `RAZORPAY / 2021 / MODERATED SESSIONS + FUNNEL ANALYSIS / n=[TODO] / SHIPPED`

**05. Everything else (bone).** The work above is the case. This is the compressed appendix, one mono ledger, no claims, no scale: CHI 2026 paper (`Lost in Transcription`, second author, with Kowe Kadoma and Mor Naaman, Cornell Tech), first place at the US AI Policy Hackathon (SEAL IT Act, with Simi), CORDA research fellowship at Open Democracy, the Policy Diff Observatory, contributor to `UXR in India: A Historical Perspective`, CASI executive board and AI governance reading group. Six to eight rows, tight, links out. It should read like a footnote, because that is what it is next to shipped research.

**06. Climax (signal, full bleed).** The only large color moment on the page. Ink type on ultramarine, oversized, locked to a strict grid. This is her actual intellectual claim, and she has to be willing to defend it in an interview.

Pick one, `TODO_PRIYAL_CHOOSE`:
- `ADOPTION ISN'T CONSENT.`
- `NOBODY CHOSE THIS.`
- `MOST PEOPLE DIDN'T CHOOSE AI. IT ARRIVED.`

Begin cropped inside one letter, zoom out until the statement is readable, hold, then compress to her name. The zoom is a scrub, not an autoplay.

**07. The wall (bone).** Anonymous visitor contributions. One sentence, 140 characters, about a time technology got something wrong about them. Submissions go to a moderation queue with a simple admin approve view. Seed with six to ten believable notes marked `TODO_SEED`.

In this system the wall is the only place with an organic hand. Everything above is grid, hairline, and machine-set type. A visitor's sentence enters slightly off-grid, in a hand-adjacent face, at a small rotation. The human interrupting the instrument. That contrast is the entire reason it works, so do not make it a card grid and do not add tape or paper skeuomorphism.

Closing line: **I collect these and carry them into the rooms where things get built.**

**08. Close (bone).** Email, LinkedIn, Scholar, CV. Mono. A live clock next to `made by a human`. A huge cropped wordmark bleeding below the viewport.

## Navigation

Fixed, mono, minimal: `PRIYAL SHRIVASTAVA / 01 WORK / 02 WRITING / 03 ABOUT / CV ↗`

A hairline progress rail. Active section marker in signal. Nav inverts to bone type on the void and signal folds. It must never overlap a claim.

## Motion and engineering

- One GSAP timeline per fold, one `gsap.context()` per component, cleaned up on unmount.
- Scrub 0.6 to 1.0. No bounce, no spring, no overshoot.
- **No smooth scroll library.** No Lenis. Recruiters scroll fast and use cmd+F, and momentum hijacking fights both. Native scroll, and let it be sharp.
- Transforms, clip-path, and masks only. Never animate layout properties.
- All text is real HTML. No text in canvas except the noise fragments, and the resolved line stays in the DOM regardless.
- `next/font` for all three families, `document.fonts.ready` awaited before any ScrollTrigger calculation, `ScrollTrigger.refresh()` on font load and on breakpoint change.
- No WebGL. If the noise fold needs it, the fold is over-built.
- Target 60fps and Lighthouse 95+ on performance and accessibility. The hero must be interactive before the noise fold's corpus loads.
- Export the token system to `/styles/tokens.css` and `/lib/motion.ts`. The case study pages will import both.

## Responsive and accessibility

Art direct 1440, 1280, 1024, 768, 430, 390, 360 separately.

On mobile the ledger's compression stack becomes a simple sticky index, and claims drop to 22 to 28vw with the receipts wrapping to two lines. The noise fold keeps its pin but halves the fragment count. Nothing horizontal.

Semantic HTML, one `h1`, real landmarks, keyboard navigable in full, visible focus rings in signal, skip link, alt text on everything, verified contrast at every theme cut (check bone-on-void and ink-on-signal specifically, do not assume). `prefers-reduced-motion` removes every pin, scrub, and zoom while leaving all content readable and every route reachable.

## Deployment (GitHub Pages, static export)

Repo: `What-is-riyal/Portfolio`. Live URL: `https://what-is-riyal.github.io/Portfolio`.

There is no server. Next.js must build to plain static files.

`next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/Portfolio',
  assetPrefix: '/Portfolio',
  trailingSlash: true,
};

module.exports = nextConfig;
```

Note the capital `P` in `basePath`. GitHub Pages paths are case sensitive and `/portfolio` will 404 every asset while looking correct in the editor.

**If the repo gets renamed to `what-is-riyal.github.io`**, delete `basePath`, `assetPrefix`, and this note. The site then serves from the root.

Also required:
- An empty `.nojekyll` file in the published output root. GitHub Pages runs Jekyll by default, Jekyll ignores folders starting with an underscore, and Next.js puts every stylesheet and script in `_next`. Without `.nojekyll` the site serves as unstyled HTML with no error. Copy it into `/out` as part of the build, not just into the repo root, or the export overwrites it.
- A GitHub Actions workflow that builds and deploys to Pages on push. Do not commit the `/out` folder.
- Because `basePath` is set, never hardcode a leading-slash path in JSX. Use `next/link` and `next/image`, or read `basePath` from config. A hardcoded `/fonts/archivo.woff2` will 404 in production and work perfectly in local dev, which is the worst class of bug on this stack.

Verify the built export locally before the first push: `npx serve out` and confirm the noise fold, fonts, and routes all resolve.

## Content truth rules

This is a research portfolio, and a fabricated number is a fatal error for this audience. It is the one failure that cannot be edited out later.

- Do not invent any metric, sample size, percentage, date, or finding. Every one is `TODO_[SPECIFIC]` until Priyal supplies it.
- Do not invent quotes, testimonials, logos, or client names beyond the six companies named above.
- No stock photography. Every visual is code: SVG, canvas, CSS. If a photo slot is genuinely needed, use a labeled placeholder.
- The Microsoft Copilot work is NDA constrained. The lens and the approach are hers to describe. Internals are not.
- Do not surface: TAIGA (class project only), DEFER-Bench (nothing to show), any Tom Costello RA work (ended).

## Tone rules for all copy

- Zero em dashes. Zero double hyphens. This is a hard ban, check before you output.
- No `leverage`, `delve`, `landscape`, `showcase`, `foster`, `robust`, `seamless`, `crucial`, `pivotal`, `valuable insights`.
- Vary sentence length hard. A short sentence next to a long one.
- Specificity is the voice. Replace every adjective with a fact. `The team thought it was friction. Twelve sessions in, it was trust.` beats any amount of `mixed-methods excellence`.
- Sentence case headings. No wrap-up bows. End on the last concrete fact.
- Humble, curious, playful. Never clinical, never self-congratulatory.

## Strictly avoid

Gradients and gradient text. Glassmorphism. Bento grids. Feature cards. Rounded floating containers. Pill buttons. Neon glow. Random particles. Fake terminals. Generic icons. Stock illustration. Constant fade-ups. Blur as texture. Warm cream backgrounds with a terracotta accent. Numbered eyebrows on things that are not sequences. Any layout that would appear unchanged on a SaaS marketing page. Decorative motion with no argument behind it.

## Where you have freedom

Composition, crop, grid, the exact mechanics of every transformation, the ledger's compression behavior, the noise fold's physics, the wall's hand. The palette, the three type roles, the section order, the locked copy, and the truth rules are fixed. Within that, take a real risk and justify it in a comment.

## TODO list for Priyal (leave as a comment block in `README.md`)

- [ ] Real fragment corpus for the noise fold, with language tags
- [ ] Six claim lines, one per project, in her words
- [ ] All receipts: year, method, n, outcome, per project
- [ ] Resolve the onboarding conversion number (three different figures are floating: +63%, +118%, +51%, and support tickets at −43%). Only one survives.
- [ ] Pick the climax statement
- [ ] Seed notes for the wall
- [ ] Confirm the case study routes and slugs
