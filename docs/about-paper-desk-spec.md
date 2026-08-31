# Build spec — About page, Design B: "The Paper Table"

**Read this whole file before writing code.** It is a complete build order. Every value in it is
a decision, not a suggestion.

This file replaces the earlier `about-scrapbook-spec.md`, which got two things wrong: it showed
photographs upfront instead of objects, and it forced a reading order. Both are corrected here.

---

## 0. What you are building, in one paragraph

The About page is **one of Priyal's paper-cut collages, made interactive.** A cream torn-paper
ground, and scattered across it, six objects rendered in the exact collage style already used for
her project images — a zine, a conference badge, a sketchbook, a cassette, a ceramic bowl, and a
sleeping cat. Each object *stands in for* a part of her life. You don't see a single photograph
until you pick something up. Hovering lifts an object off the paper; clicking opens its story,
and the photographs live in there.

**There is no order.** It is a table, not an essay. The research zine is the largest and most
central object, but it is not a gate, not step one, and nothing is sequenced. A visitor may pick
up the cat first and that is fine.

---

## 1. The two rules that killed the last attempt

1. **Objects, never photographs, on the surface.** The discovery is the point: you see a
   cassette, not a picture of someone singing. Photographs are the reward for clicking. Do not
   put a single photograph on the table.
2. **Objects are image assets, never hand-coded vectors.** A previous build drew a cassette and a
   bowl in SVG paths and CSS gradients. It looked like clipart. If you find yourself writing
   `<path d="…">` to draw a picture of a thing, **stop — you have gone wrong.** Every object on
   this page is a PNG.

---

## 2. Files

| File | Action |
|---|---|
| `about.html` | Replace entirely |
| `css/about.css` | Replace entirely |
| `js/about.js` | Replace entirely |
| `assets/img/about/objects/*.png` | New — see §4 |

**Before you touch anything:** `git add -A && git commit -m "wip: snapshot before about rebuild"`.
`css/about.css` and `js/about.js` may be **untracked**. Committing first is the only way this is
reversible; untracked work that gets overwritten has no undo.

Leave `about-cosmos.html`, `css/about-cosmos.css`, `js/about-cosmos.js` alone (parked design).

---

## 3. The visual system — match the existing collages exactly

The style is already established in `assets/img/projects/copilot-trust-preview-v2.jpg`,
`razorpay-rewards-collage-v3.jpg`, and `meesho-vernacular-collage-v2.jpg`. **Open all three
before you start.** The page must look like it came out of the same studio.

### 3.1 Palette

```
--paper:        #EDE6D6    /* the ground — cream, warm, matte */
--paper-deep:   #E2DAC7    /* torn layer behind, slightly darker */
--paper-white:  #F7F3EA    /* the white deckled edge of a torn piece */
--navy:         #26303F    /* anchor dark; body text */
--cobalt:       #2854C8    /* primary accent */
--periwinkle:   #8B85C9    /* secondary accent */
--mustard:      #F0B429    /* About's warm accent — its signature within the house system */
--ink-muted:    #6B6355
```

Base (cream / navy / cobalt / periwinkle) is constant across the site. **Mustard is this page's
accent** — it appears in the Copilot and Razorpay collages, so it is in-system, and it keeps About
distinct from the coral Meesho piece. Use it for hover states, active marks, and the one or two
places that need warmth. Do not introduce a colour that isn't in this list.

### 3.2 The signature textures

Three things make the collage style read. All three are reproducible in CSS.

**Paper grain on the ground:**
```css
.table {
  background-color: var(--paper);
  position: relative;
}
.table::before {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  opacity: .55; mix-blend-mode: multiply;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(120,104,74,.07) 0 1px, transparent 1px),
    radial-gradient(circle at 70% 60%, rgba(120,104,74,.055) 0 1px, transparent 1px),
    repeating-linear-gradient(93deg, rgba(130,112,80,.03) 0 2px, transparent 2px 7px);
  background-size: 7px 7px, 11px 11px, auto;
}
```

**Halftone dot screen** — used on colour fields, exactly as in the collages:
```css
.halftone {
  background-image: radial-gradient(circle, currentColor 32%, transparent 33%);
  background-size: 5px 5px;
  opacity: .5;
}
```

**Torn paper edges** on the CSS-drawn background shapes (not on the object PNGs — those come with
their own edges baked in). Use an SVG displacement filter:
```html
<filter id="torn-1" x="-8%" y="-8%" width="116%" height="116%">
  <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="4" seed="11" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="17"
                     xChannelSelector="R" yChannelSelector="G"/>
</filter>
```
Make four variants (seeds `11, 3, 27, 41`; `baseFrequency` `0.011`–`0.019`; `scale` `13`–`20`) so
no two torn shapes match.

### 3.3 Background composition

Behind the objects, lay two or three large torn colour fields — the way the collages have a
cobalt wedge in one corner and a navy mass along an edge. Keep them at the page margins, low
contrast, never behind an object's readable label. Give each a different `torn-N` filter and a
halftone overlay on about half of them. These are decoration; they must never compete with the
objects.

---

## 4. The object assets

Six PNGs, transparent background, roughly 1200px on the long edge, under 300 KB each after
compression. Save to `assets/img/about/objects/`.

| File | Object | Stands for |
|---|---|---|
| `zine.png` | A stapled zine / thin folded booklet, lying slightly open | The research argument |
| `badge.png` | A conference lanyard badge on a ribbon | CHI, BASIS, policy workshops |
| `sketchbook.png` | A spiral sketchbook with a stylus resting on it | Digital portraits |
| `cassette.png` | An audio cassette tape | Radio, singing, concerts |
| `bowl.png` | A small hand-thrown ceramic bowl | Making things with people |
| `cat.png` | A cat curled up asleep | The cats, and the misc. skills |

### 4.1 Generation prompts

Generate these externally (any image model). Use the **same prompt skeleton every time** — the
consistency of the set matters more than any single image. Vary only the bracketed object phrase.

> Paper cut collage illustration of **[a single stapled zine booklet lying slightly open]**,
> isolated on a fully transparent background. Built from layered torn cream paper with visible
> white deckled fibrous edges and real paper thickness. Halftone dot screen texture on the
> coloured areas. Flat limited palette: cream #EDE6D6, deep navy #26303F, cobalt blue #2854C8,
> periwinkle #8B85C9, mustard yellow #F0B429. Soft realistic drop shadow beneath each paper
> layer. Matte, slightly desaturated, no gloss, no gradients. Straight-on flat view, no
> perspective, centred, object fills the frame. Editorial craft collage style.
> No text, no words, no letters, no numbers, no signature, no border, no background.

Bracketed phrases for the other five:

- `a conference lanyard badge card hanging from a flat ribbon strap`
- `a spiral-bound sketchbook seen from above with a slim stylus resting diagonally on it`
- `a single audio cassette tape seen straight on`
- `a small hand-thrown ceramic bowl seen from a slight three-quarter angle`
- `a cat curled up asleep, side view, simple rounded shape`

**Include the "no text" clause every time.** Image models will otherwise write garbage lettering
on the zine cover and the cassette label, and it will look broken.

### 4.2 Checking the set

Lay all six side by side before using them. Reject and regenerate any that:
- sit at a different angle or perspective from the rest,
- have a glossy or 3D-rendered feel rather than flat paper,
- introduce a colour outside the palette,
- have any text on them,
- have a solid background instead of transparency.

Getting six consistent images usually takes two or three rounds. That is expected — the set
looking like a set is what makes the page work.

### 4.3 Building before the assets exist

**Do not block on the images.** Build the whole page with placeholders: a `div` at the object's
exact final dimensions, filled with `var(--paper-deep)`, carrying a `torn-N` filter and the
object's name in small navy type. Everything — layout, hover, click, the story panels,
responsive, accessibility — must be finished and verified with placeholders in place. Swapping in
the real PNGs must then be a one-line change per object (`background-image` → `<img src>`), with
no layout consequences.

---

## 5. Layout — the table

`.table` is a full-width surface, `min-height: 100vh`, cream, with the grain overlay and the torn
background shapes. Objects are absolutely positioned at percentage coordinates.

| Object | left | top | width | tilt |
|---|---|---|---|---|
| zine | `42%` | `44%` | `clamp(190px, 19vw, 280px)` | `-4deg` |
| badge | `70%` | `26%` | `clamp(120px, 12vw, 170px)` | `5deg` |
| sketchbook | `18%` | `34%` | `clamp(150px, 15vw, 215px)` | `3deg` |
| cassette | `64%` | `62%` | `clamp(140px, 14vw, 205px)` | `-7deg` |
| bowl | `26%` | `70%` | `clamp(120px, 12vw, 175px)` | `2deg` |
| cat | `84%` | `76%` | `clamp(130px, 13vw, 190px)` | `-2deg` |

Positions are the object's **centre** (`transform: translate(-50%, -50%)` then the tilt). The
arrangement is deliberately uneven — the zine is biggest and near the middle because it carries
the most, not because it comes first. Slight overlaps are good; a real table has them. Verify at
1280px, 1440px, and 1728px that nothing important is occluded.

A page heading sits top-left, clear of every object:

> **Kicker:** About me
> **H1:** Everything's on the table.
> **Line:** Six things I'd tell you about if you asked. Pick up whichever one you like — there's
> no right order.

---

## 6. Interaction

Restrained. The objects are doing the visual work; motion should be subtle.

**Hover / `:focus-visible`** — `0.45s cubic-bezier(0.22, 1, 0.36, 1)`:
- lifts `translateY(-10px)` and straightens toward `rotate(0deg)`
- shadow grows and softens: `drop-shadow(0 6px 10px rgba(60,52,36,.2))` →
  `drop-shadow(0 22px 30px rgba(60,52,36,.3))`. Use `filter: drop-shadow()`, **not**
  `box-shadow` — the PNGs have transparent backgrounds and irregular silhouettes, and box-shadow
  would draw a rectangle around them.
- a label fades in below: object name in Archivo 15px 700 navy, and one line in Fraunces italic
  13px muted. Labels are **hidden until hover** so the table reads as objects, not as a menu.
- the tilt must be applied inside the same transform chain as the position, not as a separate
  `transform` declaration, or the placement is wiped out. Use
  `translate(-50%,-50%) rotate(var(--tilt)) translateY(var(--lift))`.

**Click** — opens that object's story panel (§7). The object itself lifts and fades
(`translateY(-40px) scale(1.1)`, opacity 0) over 180ms first, so it reads as being picked up off
the table; then the panel opens.

**Scroll reveal** — `IntersectionObserver`, threshold `0.2`, objects fade and settle in with a
70ms stagger. Unobserve after firing.

**Do not build:** drag-to-rearrange, a cursor-following light, page-flip, parallax, or ambient
looping animation. The last attempt used all of those to compensate for weak visuals. The visuals
carry it now.

---

## 7. The story panels

One per object. A modal over the table, on cream paper, where the photographs finally appear.

Shared behaviour:
- `.viewer` is `position: fixed; inset: 0; z-index: 90; display: grid; place-items: center`,
  hidden with `visibility: hidden; opacity: 0`, shown with an `.is-open` class.
- **It must be a direct child of `<main>`, immediately before `<div id="site-footer"></div>` —
  never inside `.table` or any element carrying a `filter`.** A filtered ancestor becomes the
  containing block for `position: fixed` and will trap the overlay inside it. This is the single
  most likely structural bug in this build.
- Backdrop `<button>` filling the overlay, `rgba(38,48,63,.62)` + `backdrop-filter: blur(10px)`,
  click closes, `cursor: zoom-out`.
- Dialog: cream `--paper`, `border-radius: 4px`, `width: min(1040px, 100%)`,
  `max-height: min(86vh, 840px)`, `overflow: hidden auto`, `role="dialog" aria-modal="true"`.
- Opens scaling from the object you clicked: read the trigger's `getBoundingClientRect()`, set
  `--origin-x` / `--origin-y` as viewport percentages, and animate `scale(.88) translateY(20px)`
  → `none` over `0.5s cubic-bezier(0.19, 1, 0.28, 1)`.
- Close button top-right, sticky, `margin-left: auto` — **not** `float`, since panel content is
  grid and won't wrap around a float.
- Photographs inside get a thin white paper border and a soft shadow so they read as prints laid
  on the page, tilted `±1.5deg`, straightening on hover.

### Panel content — use this copy verbatim, do not rewrite

**zine — the research argument.** This one is longer than the rest and is paginated into three
spreads with prev/next controls and arrow-key support. Sections in order:

1. *The question* — H2 **How does evidence travel?** — *Moving between industry, policy, and
   academia made me increasingly interested in what happens between producing evidence and acting
   on it.*
2. *Industry* — *In industry, research sits alongside commercial incentives and the pressure to
   act quickly. That proximity to decisions gives it influence, while also shaping which
   questions receive attention.* Pull quote: *Close enough to decisions to have influence. Close
   enough to incentives to feel their shape.*
3. *Policy* — *Policy operates at a different scale. Evidence becomes part of a longer process of
   negotiation between institutions, public priorities, political realities, and competing ideas
   of what progress should look like.*
4. *Academia* — *Research remains the foundation of how I approach both worlds. Academia offers
   the depth and independence needed to examine difficult questions properly, although its
   insights do not always travel easily into practice.* Pull quote: *Depth matters. So does the
   distance between an insight and the place it needs to reach.*
5. *The space between* — *I am less interested in choosing one of these worlds than in building
   stronger connections between them: producing careful research, understanding the conditions
   surrounding a decision, and helping evidence become useful without pretending it can, or
   should, make the decision by itself.*

**badge — research in motion.** *Conference rooms, whiteboards, and the arguments that happen
after the slides are done. This is where research stops being a file and starts being a
conversation.*
Images: `chi-2026-web.jpg` (CHI 2026 · Barcelona), `basis-web.jpg` (BASIS · Berkeley),
`policy-workshop-web.jpg` (Thinking in public).

**sketchbook — portraits.** *Digital portraits take forever. I make them anyway — mostly because
the slowness is the point.*
Images: `digital-portrait-01.jpg`, `digital-portrait-02.jpg`.

**cassette — on air.** *I am a classically trained Hindustani singer. At university I hosted a
radio show, sang with bands, and organised concerts. Apparently I enjoy both being on stage and
making sure the stage exists.*
Images: `radio-hosting.jpg` (College radio), `singing-ensemble.jpg` (Finding harmony),
`organizing-concerts.jpg` (Concert chaos).

**bowl — made together.** *Sometimes that means painting the Carnegie Mellon Fence at 2am.
Sometimes it means pottery. The point is usually making something with people I like.*
Images: `pottery-with-friends.jpg` (Pottery day), `painting-the-fence.jpg` (The Fence).

**cat — current management.** H2 *Special skills, loosely defined.* List: Planning everything ·
Sleeping anywhere · Removing every corn and carrot · Fitting into improbably small spaces ·
Examining every possible angle. Closing line: *Basically, a hyperactive potato with a calendar.*
Image: `cats.jpg`, captioned *Two of the six cats I have fostered. They handled most household
decisions.*

---

## 8. Repo conventions

- Keep `data-shell-base=""` and `data-shell-page="about"` on `<body>`, and keep
  `<div id="site-nav"></div>` / `<div id="site-footer"></div>`. `js/shell.js` injects into them.
- `<body class="page-about page-table">`. **`css/pages.css` forces nav links white for
  `.page-about`** because it assumes a dark page. This page is cream, so they will vanish.
  Override in `css/about.css`:
  ```css
  .page-table .site-nav__brand { color: var(--navy); }
  .page-table .site-nav__links a { color: rgba(38,48,63,.62); }
  .page-table .site-nav__links a:hover,
  .page-table .site-nav__links a.is-active { color: var(--cobalt); }
  .page-table, .page-table > .page { background: var(--paper); color: var(--navy); }
  ```
  **Check this in the browser.** It is the most likely thing to ship broken.
- Head load order stays `grid.css`, `shell.css`, `pages.css`, `about.css`. Bump the `?v=`.
- Fonts already loaded: Archivo (`--font-archivo`), Fraunces (`--font-fraunces`). Add nothing.
- No `<canvas>`, no `data-human-field`, no dot-field on this page.
- Prefix all new classes. Avoid the legacy `.about-intro`, `.about-collage`, `.about-snapshot`
  rules in `css/pages.css`.

### Type

- H1: Archivo, `clamp(38px, 5.6vw, 68px)`, 700, `line-height: .98`, `letter-spacing: -.035em`, navy.
- Kicker / section labels: Archivo 11px 700, `letter-spacing: .18em`, uppercase, cobalt.
- Body: Archivo 16px, `line-height: 1.68`, navy at ~85%, `max-width: 62ch`.
- Pull quotes: Fraunces italic, `clamp(20px, 2.3vw, 30px)`, `line-height: 1.35`, navy, with a 2px
  navy rule above.
- Object labels: Archivo 15px 700 + Fraunces italic 13px muted.

---

## 9. Responsive

- **≥ 1100px:** the table as specified, absolute positioning.
- **760–1100px:** keep the table but scale objects down and pull the outer positions inward
  (`left` values compress toward 50%). Verify no object is clipped.
- **< 760px:** abandon absolute positioning entirely. `.table` becomes a two-column grid of
  objects, tilts reduced to `±1.5deg`, labels **always visible** (there is no hover on touch, so
  hidden labels would make the page unusable). One column below 480px.
- `overflow-x: hidden` on the page wrapper as a backstop. Verify no horizontal scrollbar at 375px.

---

## 10. Accessibility — all required

1. Each object is a `<button>` with a real `aria-label` (e.g. "Open the research zine: how
   evidence travels").
2. Object PNGs are decorative inside their button — `alt=""` — because the button's label already
   names them. Photographs inside the story panels get descriptive `alt`.
3. `:focus-visible` gets `outline: 2px solid var(--cobalt); outline-offset: 4px`. Do not rely on
   the hover lift alone — and because labels are hover-only, **focus must also reveal the label.**
4. Escape closes the panel. Tab cycles within it. Focus returns to the object on close.
5. `<body>` gets `overflow: hidden` while a panel is open.
6. Headings in order: one `<h1>`, `<h2>` per story panel, `<h3>` for subsections.
7. `prefers-reduced-motion: reduce` — remove all transitions and the scroll reveal, render
   everything in final state, show all labels. Keep the static tilts; they aren't motion.

---

## 11. Image weight — fix as part of this build

```bash
cd assets/img/about
sips -Z 1600 basis.jpg --out basis-web.jpg
sips -Z 1600 chi-2026.jpg --out chi-2026-web.jpg
```
Reference `basis-web.jpg` / `chi-2026-web.jpg`. Every `<img>` gets `loading="lazy"` and explicit
`width`/`height`.

---

## 12. Definition of done

Serve with `python3 -m http.server 8899`, then verify every line:

- [ ] **No photograph is visible on the table.** Only objects.
- [ ] The six objects look like one set, and like they came from the same studio as
      `assets/img/projects/copilot-trust-preview-v2.jpg`. Open that file and compare directly.
- [ ] Nothing implies an order — no numbers, no "start here", no sequence.
- [ ] Hovering an object lifts and straightens it and reveals its label.
- [ ] Shadows follow each object's silhouette, not a rectangle around it.
- [ ] Clicking any object lifts it off the table, then opens the right panel from that position.
- [ ] The zine panel paginates across three spreads; arrow keys work.
- [ ] Escape closes; focus returns to the object; Tab stays inside while open.
- [ ] Tabbing through the table shows a visible focus ring **and** the label for each object.
- [ ] Nav links are dark and legible on the cream ground (§8).
- [ ] At 375px: objects in one column, labels always visible, no horizontal scrollbar, all six
      stories reachable.
- [ ] With Reduce Motion on: no animation, all labels visible, page fully usable.
- [ ] No console errors. No `<path>` drawing a picture of an object anywhere in the source.

---

## 13. Things not to do

- No photographs on the table surface.
- No hand-coded SVG or CSS drawings of objects. PNGs only.
- No implied order, numbering, or "begin here" affordance.
- No drag-to-rearrange, cursor follower, page-flip, parallax, or ambient looping animation.
- No libraries. Vanilla CSS and JS.
- No `box-shadow` on the objects — `filter: drop-shadow()` only.
- Do not put the viewer overlay inside `.table` or any filtered element.
- Do not introduce a colour outside §3.1.
- Do not rewrite the copy in §7.
