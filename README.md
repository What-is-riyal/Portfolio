# Priyal Shrivastava — portfolio homepage

Next.js (App Router) + TypeScript + GSAP. Static-exported to GitHub Pages.
Source lives in [`site/`](site/). The design and motion system is documented in
[`docs/homepage-brief.md`](docs/homepage-brief.md); case study pages will inherit
`site/styles/tokens.css` and `site/lib/motion.ts`.

## Develop

```bash
cd site
npm install
npm run dev        # http://localhost:3000/Portfolio
```

## Build and verify the static export

```bash
cd site
npm run build      # writes site/out, then touches out/.nojekyll
npx serve out      # confirm the grid, fonts, and routes resolve under /Portfolio
```

Deploy is automatic: pushing to `main` runs `.github/workflows/deploy.yml`,
which builds `site/` and publishes `site/out` to Pages. Do not commit `out/`.

`basePath` is `/Portfolio` (capital P, Pages paths are case-sensitive). If the
repo is renamed to `what-is-riyal.github.io`, delete `basePath` and `assetPrefix`
in `site/next.config.js`.

<!--
TODO for Priyal (this is the launch checklist; nothing below is invented for her):

- [ ] Six project findings/claims, in her words, one per project
      (site/lib/work.ts, each `claim` is TODO_CLAIM)
- [ ] Remaining receipts per project: method, n, outcome where marked
      TODO_ in site/lib/work.ts
- [ ] Approve or rewrite the About draft (site/app/page.tsx, section 03)
      written from the brief notes, in her voice
- [ ] Human-section specifics she wants shown (section 04)
- [ ] Real seed notes for the wall (site/components/Wall.tsx, SEEDS array)
- [ ] The wall needs a real backend + moderation before launch. Current
      /admin view is a client-only localStorage stub with no auth.
- [ ] Confirm case study routes/slugs (site/lib/work.ts)
- [ ] Confirm Google Scholar, LinkedIn, and CV links (section 06)
-->
