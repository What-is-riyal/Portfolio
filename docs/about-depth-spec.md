# Build spec — About page, Design A: "Depth"

**Read this whole file before writing code.** It is a complete build order. Every number in it
is a decision, not a suggestion — if you change one, the thing stops working.

---

## 0. What you are building, in one paragraph

A single About page that opens with Priyal's research argument set as large, readable type
floating at the camera plane. As the visitor scrolls, the camera **dollies forward into the
screen** — the argument's panels approach, grow, soften, and pass by the viewer one at a time,
like driving through them. After the last panel of the argument, the corridor opens out into a
field where five personal facets (music, making, portraits, conferences, cats) sit at different
depths, drift gently, and can be clicked to open a detail panel. The page is dark, quiet, and
slow. It is **not** a starfield screensaver; the type does the work and the depth is the frame.

**Scroll is never hijacked.** The page is a normal, tall, scrollable document. A sticky stage
holds the 3D scene, and the window's scroll *position* drives the camera. Wheel, trackpad,
spacebar, Page Down, keyboard, screen readers, and mobile all behave normally. Do not call
`preventDefault` on wheel or touch events anywhere in this build.

---

## 1. Files

Create exactly these. Do not modify any other file in the repo.

| File | Action |
|---|---|
| `about.html` | Replace entirely |
| `css/about.css` | Replace entirely |
| `js/about.js` | Replace entirely |

Before you touch them, run `git add -A && git commit -m "wip: snapshot before about rebuild"`.
`css/about.css` and `js/about.js` may be untracked; committing first is the only way this is
reversible. **Do this first.**

Delete nothing else. `about-cosmos.html`, `css/about-cosmos.css`, and `js/about-cosmos.js` are a
separate parked design — leave them alone.

---

## 2. Repo conventions you must follow

These already exist and the page depends on them.

- **Body attributes drive the shared shell.** `js/shell.js` reads `data-shell-base` and
  `data-shell-page` off `<body>` and injects the nav into `<div id="site-nav"></div>` and the
  footer into `<div id="site-footer"></div>`. Keep all four of those exactly as they are in the
  current `about.html`.
- **Keep `class="page-about"` on `<body>`.** `css/pages.css` uses it to turn the nav white for
  dark pages. Add `page-depth` alongside it and scope all your new variables to `.page-depth`.
- **Load order in `<head>` stays:** `grid.css`, `shell.css`, `pages.css`, then `about.css`.
  Yours is last so it wins. Bump the `?v=` query on your `about.css` and `about.js` links.
- **Fonts are already loaded:** Archivo (`var(--font-archivo)`) for structure and UI, Fraunces
  (`var(--font-fraunces)`) for italic voice. Do not add a font.
- **Do not use `js/shell.js`'s dot-field canvas.** No `<canvas>`, no `data-human-field`. The
  particles in this design are real 3D DOM elements so they share the camera. A flat canvas
  cannot sit inside a perspective transform and would break the illusion.
- `css/pages.css` has legacy `.about-intro`, `.about-collage`, `.about-snapshot` rules. Do not
  use those class names, and you won't have to fight them.

---

## 3. The content

Use this text verbatim. Do not rewrite, shorten, or "improve" it — it is the substance of the
page and it is already the way she wants it.

### Act I — the argument (five panels, in order)

**Panel 1 — opening.** Kicker: `About me`. Heading: `How does evidence travel?`
Body: *Moving between industry, policy, and academia made me increasingly interested in what
happens between producing evidence and acting on it.*

**Panel 2 — Industry.** Section label: `Industry`.
Body: *In industry, research sits alongside commercial incentives and the pressure to act
quickly. That proximity to decisions gives it influence, while also shaping which questions
receive attention.*
Pull quote: *Close enough to decisions to have influence. Close enough to incentives to feel
their shape.*

**Panel 3 — Policy.** Section label: `Policy`.
Body: *Policy operates at a different scale. Evidence becomes part of a longer process of
negotiation between institutions, public priorities, political realities, and competing ideas of
what progress should look like.*

**Panel 4 — Academia.** Section label: `Academia`.
Body: *Research remains the foundation of how I approach both worlds. Academia offers the depth
and independence needed to examine difficult questions properly, although its insights do not
always travel easily into practice.*
Pull quote: *Depth matters. So does the distance between an insight and the place it needs to
reach.*

**Panel 5 — the turn.** Section label: `The space between`.
Body: *I am less interested in choosing one of these worlds than in building stronger connections
between them: producing careful research, understanding the conditions surrounding a decision,
and helping evidence become useful without pretending it can, or should, make the decision by
itself.*
Then, smaller and dimmer, a transition line: `And when I'm not doing that —`

### Act II — the facets (five cards)

Each card is a photograph plus a title and a one-line subtitle. All images already exist in
`assets/img/about/`.

| id | image | title | subtitle |
|---|---|---|---|
| `research` | `chi-2026.jpg` | Research in motion | CHI · BASIS · policy workshops |
| `music` | `singing-ensemble.jpg` | On air | Hindustani voice, college radio, concerts |
| `making` | `pottery-with-friends.jpg` | Made together | Clay, paint, the CMU Fence |
| `portraits` | `digital-portrait-01.jpg` | Painted slowly | Digital portraits that take forever |
| `cats` | `cats.jpg` | Current management | Six fostered cats, all opinionated |

### Detail panels (opened by clicking a facet)

| id | copy | images |
|---|---|---|
| `research` | *Conference rooms, whiteboards, and the arguments that happen after the slides are done. This is where research stops being a file and starts being a conversation.* | `chi-2026.jpg`, `basis.jpg`, `policy-workshop-web.jpg` |
| `music` | *I am a classically trained Hindustani singer. At university I hosted a radio show, sang with bands, and organised concerts. Apparently I enjoy both being on stage and making sure the stage exists.* | `radio-hosting.jpg`, `singing-ensemble.jpg`, `organizing-concerts.jpg` |
| `making` | *Sometimes that means painting the Carnegie Mellon Fence at 2am. Sometimes it means pottery. The point is usually making something with people I like.* | `pottery-with-friends.jpg`, `painting-the-fence.jpg` |
| `portraits` | *Digital portraits take forever. I make them anyway — mostly because the slowness is the point.* | `digital-portrait-01.jpg`, `digital-portrait-02.jpg` |
| `cats` | Heading: *Special skills, loosely defined.* List: Planning everything · Sleeping anywhere · Removing every corn and carrot · Fitting into improbably small spaces · Examining every possible angle. Closing line: *Basically, a hyperactive potato with a calendar.* | `cats.jpg` |

---

## 4. The 3D system — exact mechanics

This is the part that must be right. Read it twice.

### 4.1 DOM shape

```
<section class="depth" data-depth>          <!-- tall scroll runway -->
  <div class="depth__stage">                 <!-- position: sticky, 100vh -->
    <div class="depth__camera" data-camera>  <!-- everything 3D lives in here -->
      <div class="dust" data-dust></div>     <!-- particles injected by JS -->
      <article class="plate" data-plate data-z="0">     ... </article>
      <article class="plate" data-plate data-z="-1600"> ... </article>
      ...
      <button class="facet" data-facet="music" data-z="-9100" data-x="-320" data-y="140"> ... </button>
      ...
    </div>
    <div class="depth__vignette"></div>      <!-- outside the camera, 2D overlay -->
    <p class="depth__cue" data-cue>Scroll inward</p>
  </div>
</section>
<div class="viewer" data-viewer> ... </div>  <!-- sibling of .depth, NOT inside it -->
```

The `.viewer` overlay must be a **sibling of `.depth`, outside the sticky stage and outside any
element with `perspective` or `overflow: hidden`.** A `position: fixed` element inside a
perspective ancestor gets trapped by it. Put it just before `<div id="site-footer"></div>`.

### 4.2 CSS for the scene

```css
.depth        { position: relative; height: 760vh; }
.depth__stage { position: sticky; top: 0; height: 100vh; overflow: hidden;
                perspective: 900px; perspective-origin: 50% 50%; }
.depth__camera{ position: absolute; inset: 0; transform-style: preserve-3d;
                transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))
                           translateZ(var(--cam, 0px));
                will-change: transform; }
.plate, .facet{ position: absolute; left: 50%; top: 50%;
                transform: translate(-50%, -50%)
                           translate3d(var(--x, 0px), var(--y, 0px), var(--z, 0px));
                backface-visibility: hidden; }
```

`perspective: 900px` and the `--cam` numbers below are tuned to each other. Changing one without
the other will make the motion either sickening or invisible.

### 4.3 The camera math

- `CAM_TOTAL = 8400` (px of forward travel across the whole runway)
- Scroll progress `p`: let `rect = section.getBoundingClientRect()`. Then
  `p = clamp(-rect.top / (rect.height - window.innerHeight), 0, 1)`.
- `cam = p * CAM_TOTAL`, written to the camera element as `--cam: {cam}px`.

**Effective depth** of any layer: `ez = layerZ + cam`.
`ez` is how far the layer is from the camera plane. Negative = still ahead of you. Zero = level
with you. Positive = behind you, blown up and gone.

### 4.4 Layer z positions

| Layer | `--z` |
|---|---|
| Plate 1 (opening) | `0` |
| Plate 2 (Industry) | `-1600` |
| Plate 3 (Policy) | `-3200` |
| Plate 4 (Academia) | `-4800` |
| Plate 5 (the turn) | `-6400` |
| Facet: research | `-9100`, x `0`, y `-40` |
| Facet: music | `-9250`, x `-380`, y `130` |
| Facet: making | `-9000`, x `360`, y `120` |
| Facet: portraits | `-9400`, x `-300`, y `-180` |
| Facet: cats | `-9150`, x `330`, y `-170` |

At `p = 0`, plate 1 sits at `ez = 0` — dead level with the camera, at natural size, perfectly
readable. **The page must open on readable type.** At `p = 1`, `cam = 8400`, so the facets land
at `ez` between `-600` and `-1000`: settled in front of you, all five in view, none passing.

### 4.5 Per-frame visibility (JS, in a rAF loop)

For every plate, facet, and dust particle, compute `ez` and set:

```
opacity:
  ez < -5200            → 0            (too far, not yet arrived)
  -5200 ≤ ez < -3600    → ramp 0 → 1   (fading in from the dark)
  -3600 ≤ ez ≤ -120     → 1            (the readable window)
  -120  < ez ≤ 260      → ramp 1 → 0   (rushing past your face)
  ez > 260              → 0            (gone; also set visibility hidden)

blur (px):
  ez < -3600            → lerp 0 → 6 as it goes further away
  -3600 ≤ ez ≤ -400     → 0            (sharp — this is where reading happens)
  ez > -400             → lerp 0 → 10 as it approaches the camera plane
```

Write these as `el.style.opacity` and `el.style.filter = 'blur(Npx)'`. Round blur to 1 decimal
and skip the write if the value hasn't changed by more than `0.01` opacity / `0.2px` blur —
otherwise you'll thrash style recalc every frame.

Set `visibility: hidden` (not `display: none`) when `ez > 260` or `opacity === 0`, so layout
never reflows.

### 4.6 Mouse tilt

On `pointermove` over the stage (mouse pointer type only), map cursor position to
`--tilt-y = nx * 2.5deg` and `--tilt-x = ny * -2deg`, where `nx`/`ny` are -1..1 from centre.
Ease it — lerp toward the target at `0.08` per frame inside the same rAF loop, never set it
directly from the event. On `pointerleave`, target returns to 0.

### 4.7 Dust

Inject 70 `<i class="dust__mote">` into `[data-dust]` from JS. For each: random `--x` in
`-900..900`, `--y` in `-600..600`, `--z` in `-9600..-200`, size 1–3px, opacity base 0.25–0.8.
They use the same `translate3d` rule as plates and the same `ez` visibility pass. No recycling
needed — over 8400px of travel they all stay inside the corridor.

Colour them `#9D91FF` at 60% and `#FFFFFF` at 40%, randomly. This is the neural-dot motif from
the rest of the site, finally volumetric.

### 4.8 The arrival

When `p > 0.9`, add `.is-arrived` to the stage. That class:
- gives `.facet` `pointer-events: auto` (they are `none` before this, so nothing is clickable
  while it's flying past),
- fades in the facet titles/subtitles,
- fades out `[data-cue]`.

Remove the class when `p` drops back below `0.88` (hysteresis — do not use the same threshold for
both directions or it will flicker).

---

## 5. Visual design

### 5.1 Tokens (scope to `.page-depth`)

```
--void:       #06060B    /* page ground */
--void-lift:  #0E0D18    /* nearest fog */
--ink:        #F2F0FF    /* primary type */
--ink-dim:    rgba(242,240,255,0.58)
--star:       #9D91FF    /* accent, matches site --glow-soft */
--warm:       #FFD8A8    /* single warm accent, used sparingly */
--paper:      #F7F5EF    /* detail panel ground */
--paper-ink:  #16141C
--paper-muted:#5E5966
```

Background of `.depth__stage`: `radial-gradient(120% 90% at 50% 45%, #12111F 0%, #06060B 70%)`.
`.depth__vignette` sits above the camera at `z-index: 5`, `pointer-events: none`, with
`radial-gradient(115% 85% at 50% 50%, transparent 40%, rgba(0,0,0,0.75) 100%)`. It stays 2D — it
is the lens, not part of the scene.

### 5.2 Plates

Width `min(660px, 78vw)`. Text-align left. No background, no box, no border — the type floats in
the dark. This is important: a card would kill the effect.

- Kicker / section label: Archivo, 11px, 700, `letter-spacing: 0.18em`, uppercase, `--star`.
- Heading (plate 1 only): Archivo, `clamp(38px, 5.6vw, 72px)`, 700, `line-height: 0.98`,
  `letter-spacing: -0.035em`, `--ink`.
- Body: Archivo, `clamp(17px, 1.7vw, 22px)`, `line-height: 1.6`, `--ink-dim`, `max-width: 30ch`.
- Pull quote: Fraunces italic, `clamp(20px, 2.2vw, 30px)`, `line-height: 1.35`, `--ink`,
  with a 2px top rule in `rgba(255,255,255,0.2)` and 20px padding above.
- Transition line on plate 5: Fraunces italic, 18px, `--warm`, opacity 0.7.

### 5.3 Facets

Each is a `<button>`, `width: 260px`.
- Image: `aspect-ratio: 4/5`, `object-fit: cover`, `border-radius: 4px`,
  `filter: saturate(0.85) brightness(0.82)`; on hover → `filter: none`, `scale(1.03)`.
- A 1px `rgba(157,145,255,0.25)` inset ring, going to `0.6` on hover.
- Title: Archivo 16px 700 `--ink`. Subtitle: Fraunces italic 13px `--ink-dim`.
- Hover also lifts: add `translateY(-10px)` — but you must apply it as an extra term *inside* the
  existing transform chain, i.e. append to the `translate3d(...)`, not as a separate
  `transform` declaration, or you will wipe out the 3D placement.
  Use a `--hover-y` variable defaulting to `0px` and put `translateY(var(--hover-y))` at the end
  of the chain.
- `transition: --hover-y 0.4s, filter 0.4s;` — and since custom properties don't transition
  without `@property`, register it:
  ```css
  @property --hover-y { syntax: "<length>"; inherits: false; initial-value: 0px; }
  ```

### 5.4 Detail viewer

Reuse this pattern (it is known-good):
- `.viewer` — `position: fixed; inset: 0; z-index: 90; display: grid; place-items: center;`
  hidden via `visibility: hidden; opacity: 0` and a `.is-open` class.
- Backdrop `<button>` filling it, `rgba(4,4,10,0.82)` + `backdrop-filter: blur(10px)`, click to
  close, `cursor: zoom-out`.
- Dialog: `--paper` ground, `border-radius: 10px`, `width: min(1000px, 100%)`,
  `max-height: min(86vh, 820px)`, `overflow: hidden auto`, `role="dialog" aria-modal="true"`.
- It scales in from the clicked facet: before opening, read the trigger's
  `getBoundingClientRect()` and set `--origin-x` / `--origin-y` as percentages of the viewport on
  the viewer; the dialog uses `transform-origin: var(--origin-x) var(--origin-y)` and animates
  `scale(0.88) translateY(20px)` → `none` over `0.5s cubic-bezier(0.19, 1, 0.28, 1)`.
- Close button top-right, sticky, `margin-left: auto` (do **not** use `float` — the panel content
  is a grid and won't wrap around a float).
- On open: add `overflow: hidden` to `<body>`, move focus to the close button.
- On close: restore focus to the facet that opened it.

---

## 6. Accessibility and fallbacks — all of this is required

1. **DOM order is reading order.** Plates 1–5 then facets, in the order given. A screen reader
   walking the page must get the argument in sequence. Use `<h1>` once (plate 1), `<h2>` for each
   section label, `<h3>` for facet titles.
2. **Keyboard.** Facets are real `<button>`s. When a facet receives focus before arrival, jump
   the page scroll to the arrival point so the user can see what they focused — or simpler and
   preferred: give `.facet` `pointer-events: none` but keep them focusable, and on `focus` set
   `window.scrollTo({ top: <arrival scroll position>, behavior: 'smooth' })`.
3. **Escape closes the viewer. Tab is trapped inside the open dialog.** Cycle focus between first
   and last focusable element.
4. **`prefers-reduced-motion: reduce`** — this must be a real fallback, not a slower animation.
   In that media query: set `.depth { height: auto; }`, `.depth__stage { position: static;
   height: auto; overflow: visible; perspective: none; }`,
   `.plate, .facet { position: static; transform: none; opacity: 1 !important;
   filter: none !important; visibility: visible !important; }`, and lay the whole thing out as a
   single-column stack with normal margins. In JS, check the same media query and **skip the
   entire rAF loop and all per-frame style writes.**
5. **No-JS.** Same as above — put the stacked-fallback rules on a `.no-js` body class that JS
   removes on boot, so the page is readable if the script fails.
6. **Mobile (`max-width: 900px`).** Do not ship the 3D corridor on phones — the perspective
   values are tuned for a wide viewport and it will feel broken. Use the exact same stacked
   fallback as reduced-motion. Detect with the media query in both CSS and JS.

---

## 7. Performance rules

- One `requestAnimationFrame` loop for everything. Never one per layer.
- The loop reads `getBoundingClientRect()` on the section **once** per frame and derives
  everything from it. Do not call it inside the per-layer loop.
- Cache the layer list and their `--z` values in a JS array at boot (`{ el, z, isDust }`). Do not
  re-query the DOM or re-read `dataset` per frame.
- Guard every style write behind a change threshold (§4.5).
- `will-change: transform` on `.depth__camera` only. Not on every layer — 80 promoted layers will
  exhaust the compositor.
- Total DOM inside the camera: 5 plates + 5 facets + 70 motes = 80 elements. Do not exceed 100.
- Add `loading="lazy"` and explicit `width`/`height` to every `<img>`.

---

## 8. Known image-weight problem — fix it as part of this build

`assets/img/about/basis.jpg` is 3.4 MB and `chi-2026.jpg` is 3.0 MB. They render at ≤ 500px wide.
Generate resized copies and reference those:

```bash
cd assets/img/about
sips -Z 1600 basis.jpg --out basis-web.jpg
sips -Z 1600 chi-2026.jpg --out chi-2026-web.jpg
```

Use `basis-web.jpg` and `chi-2026-web.jpg` in the markup. Keep the originals on disk.

---

## 9. Definition of done — verify every line before you report finished

Run a local server (`python3 -m http.server 8899`) and check:

- [ ] Page loads with the heading "How does evidence travel?" **readable at natural size**, no
      scroll needed, nothing blurred.
- [ ] Scrolling moves panels toward you; each one is sharp and readable for a comfortable stretch
      before it softens and passes.
- [ ] You can read every one of the five panels without them overlapping each other.
- [ ] At the bottom of the runway all five facets are visible, settled, not moving past.
- [ ] Facets are not clickable until arrival; after arrival, hover lifts them and click opens the
      right panel.
- [ ] The detail panel scales open from the facet you clicked.
- [ ] Escape closes it. Focus returns to the facet. Tab stays inside while open.
- [ ] Nav is white over the dark page and the footer appears below the runway.
- [ ] At 375px wide: single-column stacked page, all content readable, no 3D, no horizontal
      scroll.
- [ ] With "Reduce motion" on in macOS System Settings: stacked page, no rAF loop running
      (verify in the Performance tab that the main thread is idle while scrolling).
- [ ] No console errors. No layout shift while scrolling (check the Layout Shift regions overlay).

---

## 10. Things not to do

- Do not hijack scroll (`preventDefault` on wheel/touch). Ever.
- Do not add Three.js, GSAP, ScrollMagic, Lenis, or any library. Vanilla only — the rest of the
  site is hand-rolled and must stay editable by hand.
- Do not put the `.viewer` inside the sticky stage or any `perspective`/`overflow:hidden` parent.
- Do not use `<canvas>` for the dust.
- Do not put a background, card, or border on the plates.
- Do not animate `margin`, `top`, `left`, `width`, or `height` per frame. Transform and opacity
  only.
- Do not rewrite the copy in §3.
