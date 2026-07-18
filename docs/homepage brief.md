# Homepage build brief — Priyal Shrivastava portfolio

Next.js (App Router), React, TypeScript, GSAP. Homepage only. This brief is the single source of truth. If anything here conflicts with an older brief in the repo, this wins. Read it fully and produce a design + motion plan for approval **before** scaffolding.

---

## Who this is for

Priyal Shrivastava. UX researcher. CMU MHCI, graduating summer 2026. Seven years across fintech, social commerce, and AI.

Primary reader: a UXR hiring manager or recruiter, skimming, many tabs open. They want to know, fast: can she run a study, does she know what the finding meant, is she someone worth talking to. Everything on the page serves that reader. Secondary readers (PhD advisors, policy people) should find it credible, but no element is designed for them.

The guiding principle, from a UXR hiring lead: a research portfolio isn't a flashy visual showcase, it's a self-portrait of how someone thinks. So the page is quiet, personal, and lets the work carry it. The references are karinasirqueira.com and dionpieters.dev: plain human voice, calm weighted motion, work-forward, the designer gets out of the way.

---

## The locked visual system

Do not redesign this. It was decided over many iterations. Your job is to execute it with craft, not reinterpret it.

**Ground:** full white, `#FFFFFF`. Near-black ink for type, `#1A1A18`. Muted grey for secondary text, `#6B6E68`.

**The Mondrian-as-vibe grid.** The page is structured on an asymmetric grid inspired by Mondrian, but rendered as a *whisper*, not a reproduction. Rules:
- Grid lines are thin (1px) and low-opacity (~30%), some solid, some dotted (1.5px). 
- **Lines live in the gutters between content cells only. A line must never cross text, the diagram, or any content.** This is the hard rule that a previous version broke. Content sits inside a cell with padding on all sides; the line runs along the cell border, through empty space. Build on a real CSS grid with named tracks so this is structural, not eyeballed.
- The grid is asymmetric and a little irregular, the way Mondrian is. Not an even 12-column. A wide cell, a narrow cell, an off-center rail.
- The same column rails carry down the entire page, so the grid is the site's actual skeleton, not a hero-only decoration. Every section aligns to it.

**Primary marks.** Small primary-color marks (red `#D42A20`, yellow `#EFC020`) sit on grid intersections, in the margins, as punctuation. A ~11px solid red square, a ~24px open yellow outline, sparse. Never over content. Two or three per screen, maximum. They are jewelry on the frame, not panels. If they appear on every section they stop meaning anything, so use them rarely.

**The working accent is dark blue, `#1A3F9E`.** This does all the real accent work: active nav, links, the diagram's primary circle, the one emphasized line of copy, hover states. Red and yellow are punctuation; blue is the workhorse. One accent doing the labor, two doing the accents.

**Type:**
- **Fraunces** (variable serif) for Priyal's voice: the hero line, her story, anything that is her talking. Light weight (~340), tight leading, negative tracking. It should read like a person wrote it.
- **Space Grotesk** for everything structural: nav, labels, metadata, the ledger's technical lines, small uppercase text. Wide tracking on the uppercase labels.
- Load both via `next/font`. Await `document.fonts.ready` before any GSAP measurement.

**The hero diagram (locked device).** Two overlapping circles, "people" and "technology," with "research" in the overlap (that's Priyal). A larger *dashed* ring encloses both, labeled "policy", the wider frame. This encodes her actual view: the work is the people-and-technology seam, and policy is the container around it she reaches for, not a co-equal third circle. The circles drift slowly and continuously (slight translate, ~9–11s ease-in-out loops). The outer ring breathes (barely-perceptible scale, ~14s). Keep it in real SVG, all labels as real `<text>`.

---

## The motion system

The signature motion is the concept of the whole site, so it gets its own system, not one-off effects.

**Central principle: rigid at rest, organic on contact.** Everything is a strict grid when still. On hover or focus, straight lines bend into curves. This is Priyal's actual thesis, that technology is rigid and people are organic, expressed as an interaction. It is the reason the site is memorable. Build it deliberately.

**1. Grid lines curve on hover.** This is the hero motion. When the cursor approaches a grid line (or a section is hovered), the nearest straight rule bends, easing from a straight `<line>`/`<path>` into a gentle curve, then settles back when the cursor leaves. 
- Implement grid lines as SVG `<path>` elements (not CSS borders) so they can morph. A straight path `M x1 y1 L x2 y2` eases to a quadratic curve `M x1 y1 Q cx cy x2 y2`, where the control point offset is driven by cursor proximity.
- The bend follows the cursor: the line bows *toward* or *away from* the pointer, control point derived from pointer position relative to the line.
- Ease is soft and weighted (GSAP `power2.out`, ~0.5–0.8s settle). No snapping, no springiness, no overshoot. It should feel like the line has mass and is reluctantly yielding, then relaxing back.
- Respect a proximity radius so lines far from the cursor stay straight. Only the near ones react.

**2. The diagram responds to the cursor.** The overlapping circles already drift on their own. On hover over the diagram, the circles ease slightly toward each other (the overlap deepens, "research" grows fractionally), and the dashed policy ring tightens a touch. Releasing returns to the idle drift. Same soft weighted ease.

**3. Link and row hover.** Nav items and work-ledger rows: on hover, the dark-blue underline draws in from left to right (a line growing, not a fade), and any arrow marks move ~6px. Text itself does not move. Keep it quiet.

**4. Primary marks.** The small red/yellow marks react subtly to a nearby cursor: the open yellow square can rotate a few degrees, the red square can shift a pixel or two. Barely-there life, not attention-seeking.

**5. Page entry.** On load, the grid draws itself: lines wipe in from their origin points (stroke-dashoffset animation), fast and confident, ~700ms total, then the hero type and diagram settle in. One calm entrance, not a sequence of fade-ups. After this, the grid never re-animates on its own; it only reacts to the cursor.

**Motion engineering:**
- One `gsap.context()` per section, cleaned up on unmount.
- Use `quickTo` / `quickSetter` for cursor-driven line bending so it stays 60fps; do not create a new tween per mousemove.
- Transforms and path morphs only. Never animate layout properties.
- Throttle pointer math to animation frames.
- **`prefers-reduced-motion`: all lines stay straight and static, the diagram stops drifting and sits in a resting composition, the entry wipe becomes an instant appear. Everything remains fully legible and usable. The curve-on-hover is a delight, never load-bearing.**
- No smooth-scroll library. Native scroll. Recruiters scroll fast and use cmd+F.

---

## Page structure and real copy

Use this copy close to verbatim. It is in Priyal's voice and was hard-won; do not "improve" it into marketing language. Where something is a placeholder for her to supply, it is marked `TODO`.

**01 — Hero.** The Mondrian grid, the diagram on one side, and:
- Eyebrow (Space Grotesk, uppercase): `Priyal Shrivastava — UX Researcher`
- Line (Fraunces, large): **I work where people and technology meet.**
- Sub (smaller): Research is the part in the middle, and that part is me. **Policy is the frame around it all.** (the bolded clause in dark blue)
- Baseline metadata (Space Grotesk, small): `Currently — CMU MHCI '26` · `Available 2026`
- Minimal nav: `Work / About / Contact`, active item in dark blue.

**02 — Selected work.** The heart of the page. Not cards. A quiet ledger aligned to the grid. Each row: the project, and a technical line beneath in Space Grotesk (company · year · method · outcome). Row hover uses the blue underline-draw from the motion system. Rows link to case study pages (routes can be stubs).

Real projects, in this order. Claims/findings are `TODO` because Priyal writes those; do not invent them. Verified facts included:
1. **Razorpay — SME onboarding redesign.** 2021. Low-digital-literacy merchants. Result: +51% form-filling conversion, form time 14→5 min, support tickets down 43%. Tag: Shipped.
2. **Microsoft — MiniOWA retention study.** 2025. Mixed methods, 36 interviews, 300+ surveys.
3. **Meesho — community for the next billion users.** 2020. Women in semi-urban and rural India, 40+ qualitative interviews. (Note: research was conducted in Hindi; language was context, not the study variable. Do NOT describe this as multilingual/nine-language research.)
4. **Razorpay — D2C validation.** She led research: 40+ merchant interviews, focus groups, ~1000 survey respondents.
5. **Razorpay — website evaluation.** Mixed method, a site with 1M+ daily visits.
6. **Microsoft — Copilot trust white paper.** Strategic synthesis on trust-first AI adoption. NDA-constrained: describe the lens, never company internals.

**03 — About / her story.** Fraunces, first person, plain. This is where the human lives. Arc, in her voice:
- She was a designer first, but her heart was always in research. She moved to the research team as it was forming, because she realized she needed data to push back on decisions, and as a designer she didn't have it.
- The origin (place this here, NOT in the hero): she had social anxiety growing up, so everyone became a case study, if she could understand people, she could fit in. Research was a survival instinct before it was a job. Keep this close to how she said it; it is the truest line on the page.
- What she studies: how people and technology meet, and what that does to us, cognitively, socially, culturally. She is HCI/HCD, not psychology, the technology is always half the object. Never frame her as studying people alone.
- Her theory of change (this is the through-line that makes the governance interest coherent, keep the structure): she wants technology to be good for people and the internet to be safe for people. She works in industry first, because if a company cares, that's the easiest place to get alignment and actually change something. When that won't move, policy is the external force. And underneath it all, academic research is the foundation, surfacing the problems so someone can act. One belief about how change happens, with her positioned at whichever level is closest to working.
- The note to end on, in her words, plainly, with the dry humor intact: she wants to be on the right side of history. To use technology for **not bad**. To keep AI from ending in humanity's doom. Say it plainly; it lands harder without a slogan wrapper.

**04 — The human section.** So the page reads as a full person, not a CV. Light, warm, aligned to the grid. She sings, has organized concerts, plays instruments, fosters cats, has held leadership roles. Frame it not as a disconnected fun-facts row but as more of the same instinct from her story: understanding people, bringing them together, caring for things that can't speak for themselves. `TODO` for specifics she wants included.

**05 — The wall (signature feature).** Anonymous visitor contributions: one short sentence about a time technology got something wrong about them. Submissions go to a moderation queue with a simple admin approve view. Seed with a few believable notes marked `TODO_SEED`. This is the one place with an organic, off-grid hand, a visitor's sentence enters slightly rotated, breaking the strict grid, the human interrupting the machine. Closing line: **I collect these and carry them into the rooms where things get built.**

**06 — Close.** Email, LinkedIn, Google Scholar, CV. Space Grotesk. A small `made by a human` note. The grid resolves out.

---

## Deployment (GitHub Pages, static export)

Repo `What-is-riyal/Portfolio`, serves at `https://what-is-riyal.github.io/Portfolio`.

`next.config.js`: `output: 'export'`, `images: { unoptimized: true }`, `basePath: '/Portfolio'`, `assetPrefix: '/Portfolio'`, `trailingSlash: true`. Note the capital `P` — paths are case-sensitive. Add an empty `.nojekyll` to the exported output root (GitHub runs Jekyll, which drops the `_next` folder otherwise). Never hardcode leading-slash asset paths; use `next/font`, `next/link`. Deploy via GitHub Actions, don't commit `/out`. Verify locally with `npx serve out` before pushing.

(If the repo is renamed to `what-is-riyal.github.io`, delete `basePath` and `assetPrefix`.)

---

## Content truth rules — non-negotiable

A fabricated fact is a fatal error for a research portfolio.
- Invent no metric, sample size, finding, quote, date, or claim. Everything unverified is `TODO`. The verified numbers above are the only numbers; use them exactly.
- Do not describe the Meesho work as multilingual research. It was in Hindi. Language was context, not the variable.
- Microsoft Copilot work is NDA-constrained: the lens is hers to describe, internals are not.
- No stock photography. Every visual is code (SVG, grid, type).
- Do not surface: TAIGA (class project), DEFER-Bench (nothing to show), any prior RA work that has ended.

## Voice rules
- Zero em dashes and zero double hyphens anywhere. Hard ban, check output.
- Plain human language. No slogans, no "leverage / seamless / robust / passionate about / crafting." If a sentence sounds like a brand, rewrite it as a person.
- Vary sentence length. Keep her dry, direct, slightly funny register.
- Sentence case for headings. End sections on a concrete note, no wrap-up bows.

## Strictly avoid
Gradients, glassmorphism, bento grids, feature cards, rounded floating containers, pill buttons, glow, particles, fake terminals, generic icons, stock illustration, constant fade-ups, blur. A solid-block literal Mondrian (we chose the whisper version deliberately). Any layout that would look unchanged on a SaaS marketing page.

## Where you have freedom
The exact grid proportions, the precise line-bend physics, the diagram's idle motion, section composition within the locked system. The palette, the type roles, the copy, the diagram concept, the curve-on-hover principle, and the truth rules are fixed.

## First step
Do not scaffold yet. Read this brief, then return: the grid definition (tracks, where lines and marks sit), the type scale, and your approach to the line-bending motion (how you'll morph SVG paths on cursor proximity at 60fps). Wait for approval.

## TODO list for Priyal (put in README as a comment)
- [ ] Six project findings/claims, in her words, one per project
- [ ] Remaining receipts per project (method, n where not listed above)
- [ ] Her story section prose (or approve a draft written from the notes above)
- [ ] Human-section specifics she wants shown
- [ ] Seed notes for the wall
- [ ] Case study routes/slugs
- [ ] Confirm Google Scholar + LinkedIn + CV links
