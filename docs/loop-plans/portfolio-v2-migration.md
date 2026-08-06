# Loop plan: Portfolio v2 (HTML migration)

**Branch:** `portfolio-v2-2026-08-06`  
**Trigger:** Every **3 minutes** (local loop, PID restarted after 5m loop killed).  
**Tick budget:** One iteration must finish within **5 minutes** (hard stop at **7 minutes**).  
**Last updated:** 2026-08-06  
**Iteration:** 15  
**Lock status:** idle *(do not edit by hand while a run is active)*

---

## Mission (non-negotiable)

Rebuild Priyal's portfolio as **plain static HTML** on GitHub Pages.

| Rule | Detail |
|------|--------|
| **Content fidelity** | All Webflow project copy, headings, captions, lists, quotes, and metrics must be **byte-for-byte faithful** to `Resources/webflow/` exports. **Do not add, remove, reword, paraphrase, or “improve” a single word.** |
| **Assets fidelity** | Images and media come from `Resources/webflow/` (deduplicated into `assets/`). Do not substitute, crop differently, or replace unless the export is broken and Priyal approves a fix. |
| **UI only** | Layout, typography, grid, motion, nav shell, and presentation may change. **Body copy inside case studies does not.** |
| **Copilot exception** | `work/microsoft-copilot-trust.html` is **not** on Webflow. It may use rewritten content already on `funny-text-on-main-design` / `Resources/` PDF — still no invented facts. |
| **Outlook retention exception** | `work/microsoft-retention.html` is **not** on Webflow. Use Khyati UXfolio HTML + Priyal’s materials as reference; Priyal’s POV only. |
| **Do not touch** | `Resources/` (read-only archive), `site/` (abandoned Next.js — ignore entirely), `Archive/` |

If better copy requires a word change → **stop and ask Priyal**. Never write it yourself.

---

## Design reference (UI target — not content source)

**Inspiration lives on another branch.** Do not merge that branch. **Port the visual system to HTML.**

| Reference | Location |
|-----------|----------|
| Branch | `claude/new-branch-oys0jm` |
| Tip commit | `cca3c36` — *Build homepage: sections, hero diagram, wall, routes, deploy pipeline* |
| Read via git | `git show cca3c36:site/...` |

### Locked visual system (from `site/styles/tokens.css` + `docs/homepage brief.md`)

- **Ground:** `#FFFFFF`
- **Ink:** `#1A1A18` · **Grey:** `#6B6E68`
- **Accent (workhorse):** `#1A3F9E` — links, nav active, diagram emphasis
- **Punctuation only:** red `#D42A20`, yellow `#EFC020` — sparse grid marks, 2–3 per viewport max
- **Type:** Fraunces (voice) + Space Grotesk (structure)
- **Grid:** asymmetric CSS grid; **lines only in gutters**, never crossing text or diagrams
- **Signature motion:** SVG rails bend toward cursor on hover (port `MondrianLines.tsx` logic to vanilla JS + GSAP in `js/mondrian-lines.js`)
- **Hero diagram:** overlapping circles (people / technology / research) + dashed policy ring — SVG, real `<text>` labels
- **Homepage sections (shell only):** hero → selected work ledger → about → away from work → the wall → contact

**Important:** The reference homepage uses **new marketing copy** (“I work where people and technology meet.”). That copy is **NOT** Webflow. For v2:

- **Case study pages:** Webflow body text only.
- **Homepage hero/about:** Either (a) transplant verbatim from `Resources/webflow/homepage.html`, or (b) if using the Mondrian homepage shell, **pull hero/about strings from the Webflow export**, not from `cca3c36` or `docs/homepage brief.md`, unless Priyal explicitly locks new homepage copy in a later iteration.

---

## Repo map (what we edit)

```
portfolio-v2/
├── index.html              ← rebuild (Webflow homepage content + new UI)
├── about.html              ← rebuild
├── play.html               ← rebuild
├── resume.html             ← rebuild (Webflow links to Drive; use Resources PDF)
├── work/
│   ├── razorpay-d2c.html
│   ├── razorpay-onboarding.html
│   ├── razorpay-website-evaluation.html
│   ├── meesho-vernacular.html
│   ├── microsoft-copilot-trust.html    ← EXCEPTION (not Webflow)
│   └── microsoft-retention.html        ← EXCEPTION (not Webflow)
├── css/                    ← new design system (tokens, grid, type)
├── js/                     ← mondrian-lines.js, diagram.js, main.js
├── assets/                 ← single deduplicated asset pool (from webflow exports)
└── Resources/              ← READ ONLY — never commit changes here
```

### Webflow export → page map

| `Resources/webflow/` export | Live URL | Output file |
|-----------------------------|----------|-------------|
| `homepage.html` | `/` | `index.html` |
| `About me.html` | `/about` | `about.html` |
| `Play.html` | `/play` | `play.html` |
| `D2C.html` | `/projects/d2c` | `work/razorpay-d2c.html` |
| `Razorpay Website Evaluation.html` | `/projects/rzpwebsiteut` | `work/razorpay-website-evaluation.html` |
| `Razorpay Onboarding Redesign.html` | `/401` | `work/razorpay-onboarding.html` |
| `Vernacular languages in digital products.html` | `/projects/meesho` | `work/meesho-vernacular.html` |
| `MadAhead.html` | `/projects/mad-ahead` | `work/madahead.html` *(new — was missing from old rebuild)* |

---

## Work queue

Update checkboxes each iteration. **One page (or one clear sub-task) per loop pass.** Do not batch entire site in one commit unless explicitly instructed.

### Phase A — Foundation
- [x] A1. Add `css/tokens.css` + `css/grid.css` ported from reference tokens/globals (HTML, not React)
- [x] A2. Add `js/mondrian-lines.js` — port bend logic from `cca3c36:site/components/MondrianLines.tsx` + `site/lib/motion.ts`
- [x] A3. Add `js/diagram.js` — port hero diagram from `cca3c36:site/components/Diagram.tsx`
- [x] A4. Build shared HTML partials or consistent nav/footer pattern across pages
- [x] A5. Deduplicate assets: script or manifest mapping `assets/` ← `Resources/webflow/` (one copy per hash)

### Phase B — Webflow pages (content verbatim)
- [x] B1. `about.html`
- [x] B2. `play.html`
- [x] B3. `work/razorpay-d2c.html`
- [x] B4. `work/razorpay-website-evaluation.html`
- [x] B5. `work/razorpay-onboarding.html` *(strip password-gate markup from export)*
- [x] B6. `work/meesho-vernacular.html`
- [x] B7. `work/madahead.html`
- [x] B8. `index.html` *(homepage — Webflow content in new shell)*

### Phase C — Non-Webflow pages
- [x] C1. `work/microsoft-copilot-trust.html` — keep rewrite; apply new UI shell only
- [x] C2. `work/microsoft-retention.html` — Priyal POV; apply new UI shell only
- [ ] C3. `resume.html` — link/serve `Resources/priyal_resume_UXR.pdf`

### Phase D — Ship
- [ ] D1. Mobile + iPad pass on every page
- [ ] D2. `prefers-reduced-motion` pass (lines static, no drift)
- [ ] D3. GitHub Pages deploy config / verify paths
- [ ] D4. Final content diff audit (see verification below)

---

## Concurrency — one run at a time (mandatory)

Ticks every 5 minutes can overlap if a task runs long. **Never run two iterations in parallel.**

### Lock file

| Item | Value |
|------|--------|
| Path | `.loop/portfolio-v2.lock` (repo root, **gitignored**) |
| Format | JSON: `{ "started_at": "<ISO8601>", "iteration": N, "task": "A1", "pid": "<optional>" }` |
| Stale after | **10 minutes** (2 missed ticks → assume crashed/stuck run) |

### At the very start of every tick — before pre-flight

```bash
# 1. If lock exists AND age < 10 minutes → SKIP this tick entirely
# 2. If lock exists AND age >= 10 minutes → delete lock (stale), log in Notes, proceed
# 3. If no lock → create lock with current task id, then proceed
```

**If SKIP (another run in progress):**

1. Do **not** checkout, edit, commit, or push anything.
2. Append one line to **Notes for next run**: `Skipped tick <ISO time>: lock held by task <id> since <started_at>.`
3. Do **not** increment Iteration counter.
4. Exit immediately. Report: `SKIPPED — concurrent run active`.

**When the run finishes (success, failure, or abort):**

1. **Always** delete `.loop/portfolio-v2.lock` in a `finally`-equivalent step (last action before exit).
2. If you had to stop mid-task due to the 7-minute budget, revert partial edits, release lock, note `ABORTED — time budget` in Notes.

**Never:**

- Commit the lock file.
- Force-delete a lock younger than 10 minutes unless Priyal explicitly says the other agent is dead.
- Start task execution without holding the lock.

---

## Every loop iteration — run in this order

### 0. Read this file first
Load current iteration number, queue status, lock rules, and “Notes for next run” before doing anything.

### 0b. Acquire lock (see Concurrency section)
Skip entire tick if another run holds a fresh lock. Create lock before step 1.

### 1. Pre-flight — conflicts & hygiene

```bash
git fetch origin
git status
git branch --show-current   # MUST be portfolio-v2-2026-08-06
```

**Stop without committing if any of these are true:**

| Check | Action if failed |
|-------|------------------|
| Wrong branch | `git checkout portfolio-v2-2026-08-06` and stop |
| Uncommitted changes you did not make this run | Stop; report dirty files |
| Branch behind `origin/portfolio-v2-2026-08-06` | `git pull --rebase origin portfolio-v2-2026-08-06` |
| Merge conflicts | Stop; list conflicted files; do not guess resolutions |
| Changes under `Resources/` | **Revert.** Archive is read-only. |
| Changes under `site/` | **Revert** unless this plan explicitly says otherwise (it does not). |

**Hygiene checklist:**
- [ ] No edits to `Resources/**`
- [ ] No edits to `site/**` (except deleting untracked junk optional — ask first)
- [ ] No new dependencies at repo root unless required for static site (GSAP CDN is OK)
- [ ] No `.env`, secrets, or credentials
- [ ] Working scope is exactly **one** queue item from Phase A–D

### 2. Pick exactly one task

Choose the **first unchecked** item in Phase A → B → C → D. If blocked (missing asset, copy ambiguity), document in “Notes for next run” and pick the next unblocked item or stop.

### 3. Execute the task

**For Webflow pages (Phase B):**

1. Open the matching `Resources/webflow/*.html` export.
2. Extract **all visible text** into an inventory (headings, paragraphs, captions, list items, link labels, alt text where it carries meaning).
3. Build/replace the output HTML page with **new UI shell** (grid, nav, CSS, Mondrian lines).
4. Paste content **verbatim** from the export into the body region.
5. Point images at deduplicated `assets/` paths (same file as export, not re-exported CDN unless local missing).
6. Run verification (step 4 below) **before** commit.

**For UI-only work (Phase A, shell on exception pages):**

- Port from `git show cca3c36:site/...` into plain HTML/CSS/JS.
- Do not import React/Next.js.

### 4. Verification (required before commit)

**Content diff (Webflow pages):**

```bash
# Extract visible text from export and rebuilt page; compare normalized whitespace.
# Every sentence in the export body must appear unchanged in the output.
# ZERO new sentences in the case study body.
```

Manual checks:
- [ ] Side-by-side: export vs built page — no word diffs in body copy
- [ ] All local `src=` / `href=` asset paths resolve
- [ ] Page works at 375px, 768px, 1280px widths
- [ ] `prefers-reduced-motion: reduce` — site usable with static lines

**If content diff fails → do not commit. Fix or stop.**

### 5. Update this loop plan

Before committing, edit **this file**:

1. Increment `Iteration` counter.
2. Check off completed queue item(s).
3. Update `Last updated` date.
4. Write **Notes for next run** (1–5 bullets): what was done, what’s next, blockers, assets still missing.

### 6. Commit & push

Only if verification passed.

```bash
git add <explicit files — never git add -A blindly>
git commit -m "<type>: <short why>"

# Examples:
# feat: transplant about page body verbatim from Webflow export
# style: port Mondrian grid tokens to css/tokens.css
# fix: dedupe menu.svg into single assets path

git push origin portfolio-v2-2026-08-06
```

**Commit rules:**
- One logical task per commit.
- Never commit changes to `Resources/`.
- Never commit `site/node_modules`, `site/.next`, `site/out` — add to `.gitignore` if needed.
- Commit message describes **why**, not a file list.

### 7. Release lock (always)

Delete `.loop/portfolio-v2.lock` — even if the run failed, was skipped mid-flight, or did not commit.

### 8. End state

Report to Priyal:
- **Status:** `COMPLETED` | `SKIPPED (lock)` | `ABORTED (time)` | `FAILED (no commit)`
- Iteration number (only if work ran)
- Task completed or deferred
- Verification result
- Next queued task
- Any blockers requiring human decision

**Time budget:** If step 3 is not done by minute 5, wrap up verification/commit. If still running at minute 7, revert uncommitted work, release lock, abort.

---

## Known archive gaps (do not invent content to fill)

| Gap | Mitigation |
|-----|------------|
| Onboarding: missing file `8fee0af9-7938-42dd-ab71-e408a6f17cd6` | Flag in notes; try Webflow CDN URL or ask Priyal to re-export |
| Onboarding: password-gate HTML at top of export | Strip UI wrapper; keep project body |
| Khyati retention: 6 missing images in UXfolio export | Not blocking Webflow pages; flag for retention page |
| MadAhead: Figma/Vimeo embeds | Static images OK; embeds may need network — note in page |

---

## Notes for next run

- **Iteration 15 done:** C2 — `work/microsoft-retention.html` wrapped in v2 shell (nav via shell.js; page content unchanged).
- **Next task:** C3 — `resume.html`.
- **3m loop** — PID 48683, monitored terminal `654861.txt`.

---

## Automation / loop prompt (paste into `/loop 5m` or Cursor Automation)

```
Read docs/loop-plans/portfolio-v2-migration.md in full.

Branch: portfolio-v2-2026-08-06. Time budget: 5 min target, 7 min hard stop.

CONCURRENCY FIRST:
- If .loop/portfolio-v2.lock exists and is < 10 minutes old → SKIPPED tick only; no edits; exit.
- If lock is stale (>= 10 min) → remove lock, note it, continue.
- Otherwise create lock, run one iteration, ALWAYS delete lock before exit.

Then one iteration:
1. Pre-flight (branch, pull, hygiene — no Resources/ or site/ edits)
2. First unchecked queue task only
3. Verify content fidelity (zero word changes on Webflow pages)
4. Update loop plan (iteration++, checkboxes, notes) — skip iteration++ if SKIPPED
5. Commit and push if verification passed
6. Release lock

Hard rule: Webflow body copy is immutable. UI-only changes. HTML at repo root, not Next.js.
Design reference: git show cca3c36:site/ on branch claude/new-branch-oys0jm (port to plain HTML/CSS/JS).
```
