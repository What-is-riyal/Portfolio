# Loop plan: Copilot design system sitewide

**Branch:** `portfolio-v2-2026-08-06`  
**Trigger:** **STOPPED locally** — no further ticks; do not commit/push unless asked  
**Tick budget:** one phase slice per 30m wake (max ~15–20 min work; leave headroom)  
**Last updated:** 2026-08-07  
**Iteration:** 4  
**Lock:** `.loop/copilot-revamp.lock` (PID + started ISO; stale after 25m)

---

## Mission (non-negotiable)

Revamp the **entire portfolio chrome** to match the **Microsoft Copilot showpiece design language** (source of truth: original `work/microsoft-copilot-trust.html` at commit `d123522` / pre-Mondrian remap), while keeping:

1. **Content fidelity** — do not rewrite case-study or page body copy. Especially **do not disturb Microsoft project content** (Copilot + Retention narrative, interactives, images).
2. **Wavy Mondrian lines** — keep `js/mondrian-lines.js` (rails that bend toward cursor). Recolor to Copilot tokens; place creatively on home / about / play / resume / non-MS case studies.
3. **Consistency** — one palette, one type stack, one shell language across Work / Play / About / Resume and all non-MS projects.

### Design source of truth (Copilot)

| Token | Value |
|-------|--------|
| Ink | `#0B0B0C` |
| Paper | `#FFFFFF` |
| Glow (light) | `#4F46E5` |
| Glow (dark surfaces) | `#9D91FF` |
| Type | **Archivo** (structure UI) + **Fraunces** (voice / italic emphasis) |
| Atmosphere | subtle grain overlay; soft indigo orb on dark heroes; progress bar optional on long pages |
| Radius | soft cards ~10–16px where Copilot uses them; avoid Mondrian hard-grid “poster” look as the primary read |
| Retire | Space Grotesk as primary; Mondrian `#1A3F9E` blue as primary accent; red/yellow punctuation marks as default |

**Keep from Mondrian:** gutter rails + bendy SVG lines; hero diagram can stay if recolored to glow/ink.

### Do not touch

- `Resources/` (read-only)
- `site/` (abandoned Next.js)
- Microsoft **content** in `work/microsoft-copilot-trust.html` and `work/microsoft-retention.html` (restore Copilot page **tokens/fonts** to original indigo/Archivo if currently Mondrian-remapped; leave sections/copy/interactives intact)
- Invented copy, paraphrased Webflow text

---

## Repo targets

```
index.html, about.html, play.html, resume.html
work/razorpay-*.html, work/meesho-vernacular.html, work/madahead.html
css/tokens.css, css/shell.css, css/pages.css, css/case-study.css, css/grid.css
js/mondrian-lines.js (recolor only), js/diagram.js (recolor if needed)
```

Microsoft pages: chrome/token restore only; no content edits.

---

## Phases (one slice per tick)

### Phase A — Foundation (tokens + shell) ← DONE iter 1
- [x] Rewrite `css/tokens.css` to Copilot system (ink/paper/glow/Archivo/Fraunces)
- [x] Update `css/shell.css`, `css/grid.css` line colors to ink/glow
- [x] Global font link pattern: Archivo + Fraunces (all HTML heads)
- [x] Recolor Mondrian lines / diagram strokes to `--glow` / ink
- [x] Restore Copilot page `:root` to original indigo (content untouched)
- [x] Smoke: homepage + Copilot load without broken CSS
- [x] Commit + push

### Phase B — Homepage ← DONE iter 2
- [x] Restyle `index.html` + `css/pages.css` home sections to Copilot atmosphere (dark hero optional OR light paper with glow accents — prefer Copilot-like dark intro band + paper body, or full paper with indigo accents; keep wavy lines)
- [x] Work ledger, about blurb, wall/contact use Archivo/Fraunces + glow
- [x] Browser check desktop + narrow
- [x] Commit + push

### Phase C — About / Play / Resume ← DONE iter 3
- [x] Restyle `about.html`, `play.html`, `resume.html` to same system
- [x] Keep wavy lines where they already exist or add sparingly
- [x] Commit + push

### Phase D — Non-MS case studies (content locked) ← DONE iter 4
Do **one or two pages per tick** max. Restyle chrome/CSS only; Webflow body copy stays.

- [x] Shared `css/case-study.css` → Copilot tokens (headers, labels, prose color, borders)
- [x] `work/razorpay-d2c.html`
- [x] `work/razorpay-website-evaluation.html`
- [x] `work/razorpay-onboarding.html`
- [x] `work/meesho-vernacular.html`
- [x] `work/madahead.html`
- [x] Commit + push after each page or after a tight pair

### Phase E — Retention chrome + site polish ← DONE (local, uncommitted)
- [x] Align Retention **shell/nav/tokens** lightly with Copilot family without breaking its light showpiece content
- [x] Cross-page nav active states, footer, focus rings
- [x] Kill leftover Mondrian blue / Space Grotesk references in live pages
- [x] Final browser pass on all routes
- [ ] Commit + push — **skipped; keep local per user**

### Phase F — Done ← STOPPED
- [x] Mark plan COMPLETE; stop loop (do not re-arm)
- [x] Leave a short summary in this file under “Completion log”

---

## Tick protocol (every wake)

1. **Acquire lock** — if `.loop/copilot-revamp.lock` exists and age < 25m, skip tick (log and exit). Else write PID + ISO.
2. Read this plan; find first unchecked `[ ]` in the current phase.
3. Do **only that slice** (or one page). Do not mark “done” without a visual/browser check of the changed page.
4. **Verification gate:** load page via `python3 -m http.server` if needed; confirm fonts/colors; no content diffs in MS pages (git diff should not rewrite prose).
5. Commit with a clear message; `git push -u origin HEAD` when network available.
6. Update checkboxes + Iteration N + Completion log line.
7. Release lock.
8. If Phase F complete → kill loop PID and stop. Else leave 30m sleeper running.

### Anti-patterns (learned)

- Do **not** dump Webflow class soup into a thin shell and check the box.
- Do **not** rewrite case-study body text.
- Do **not** thrash every 3 minutes — this loop is **30m** to save tokens.
- Prefer shared CSS changes that lift many pages over one-off inline style dumps.

---

## Completion log

| Iter | UTC | Slice | Result |
|------|-----|-------|--------|
| 0 | 2026-08-06 | plan + arm loop | armed |
| 1 | 2026-08-06 | Phase A foundation | tokens/shell/fonts Copilot; wavy lines kept; Copilot indigo restored |
| 2 | 2026-08-06 | Phase B homepage | dark Copilot hero + grain/orb; wavy lines via difference blend; paper work ledger |
| 3 | 2026-08-06 | Phase C about/play/resume | Copilot kickers, grain, wavy rails on about/play; resume glow/Archivo |
| 4 | 2026-08-06 | Phase D case studies | Copilot case-study.css + grain/rails/kickers on all non-MS projects |
| 5 | 2026-08-07 | Phase E local + stop loops | Retention indigo + Archivo polish left uncommitted; loops killed |

---

## Loop arming commands

```bash
mkdir -p .loop
# kill any prior copilot/portfolio loops first
while true; do
  sleep 1800
  echo 'AGENT_LOOP_TICK_copilot_revamp {"prompt":"Execute next unchecked slice in docs/loop-plans/copilot-system-revamp.md. One slice only. Follow tick protocol. Commit+push if verified. Stop loop when Phase F complete."}'
done
```

Notify regex: `^AGENT_LOOP_TICK_copilot_revamp`
