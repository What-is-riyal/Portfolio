# AI collection visuals and homepage preview links

- Removed the decorative orbit, background canvas, and radial wash from the AI collection hero. The hero uses one text column and no longer reserves an empty visual column or a full viewport of height.
- All five visible AI projects now use the same code-native paper-and-ink SVG poster system in `js/projects.js`, styled in `css/ai-safety.css`. Motifs represent feed rankers, agent conversations, synthetic-media distribution policy, document changes, and self-report/control instruments. They are illustrations, not measured result charts. Existing source figures and case-study assets remain unchanged.
- Card-only poster selection does not replace the actual figures used in case-study pages or other registry render modes. Project text, status, links, and archive settings are preserved.
- Converted all five large homepage preview panels to native project links. The active panel accepts pointer input and keyboard focus; inactive panels have `tabindex=-1`, `aria-hidden=true`, and `inert`. The hover/focus controller updates all those states together.
- Updated the registry's preview renderer to produce the same link markup. Keyboard focus has a visible outline, and hover underlines the preview caption.
- Checked HTML nesting, JavaScript syntax, all five card render outputs and local targets, preview-to-row destinations, pointer/focus activation, inactive inert states, and previous homepage regressions. Browser rendering remains unverified because native browser access has not been approved.

## Missing-preview follow-up

- Converted the five inline illustrations into self-contained SVG image assets with embedded styles and explicit dimensions. Collection cards now use ordinary image elements and the existing image sizing rules, with a minimum visual height, rather than depending on page styles for inline SVG fills.
- The five files are `assets/img/ais/corda-cover.svg`, `werewolf-cover.svg`, `seal-it-cover.svg`, `policy-diff-cover.svg`, and `response-atlas-cover.svg`. Source paper figures remain unchanged.
- Updated cache versions for the card registry and collection stylesheet. Confirmed via the local server's returned HTML that the hero orbit/canvas had been removed; also added a page-specific rule suppressing any old hero visual markup.
- All five SVG assets parse as XML; each rendered card references an existing image, and all homepage preview-link regressions still pass. Actual visual rendering remains unverified.
