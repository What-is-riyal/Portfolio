# DESIGN_LANGUAGE.md

# Portfolio Case Study Design Language

## Canonical references

When creating or modifying portfolio case studies, treat these two pages as the primary visual references:

1. `work/microsoft-copilot-trust.html`
2. `work/microsoft-retention.html`

New pages do **not** need to copy their layouts exactly.

Instead, preserve the visual and storytelling logic that makes these two pages feel like members of the same family.

The goal is:

**A research case study that feels like an editorial story, with evidence made visual.**

Not a generic UX portfolio template.

---

# 1. The core visual character

The Microsoft pages feel:

**Editorial**
Large type, strong pacing, deliberate whitespace, clear narrative sections.

**Research-driven**
Methods, evidence, models, hypotheses, findings, and decisions become visual objects.

**Intelligent but accessible**
The presentation can be sophisticated without looking academic or dense.

**Tactile**
Occasional tilted notes, floating artifacts, interactive diagrams, and subtle movement make the research feel worked-through rather than sterile.

**Restrained**
Most of the page is black, white, grey, and indigo. New colors appear only when they carry meaning.

**Bespoke**
Important ideas get their own visualization rather than being forced into a generic card.

---

# 2. The fundamental rule

## Visualize the argument, not the decoration.

When adding a new section, first ask:

**What is the intellectual move this section is making?**

Then design around that.

Examples from the Microsoft pages:

- competing hypotheses → three evidence stacks
- sequential research process → numbered phases
- increasing autonomy → a staged ladder
- account decay over time → an inbox that visually deteriorates
- relationship between account type and endpoint → interactive routing
- trust principles → three conceptual objects
- scattered research → scattered study cards becoming one coherent point of view

The visual device should embody the idea.

Do not add an illustration simply because a section looks text-heavy.

---

# 3. Page rhythm

Case studies should alternate between:

**Narrative → visual evidence → narrative → model → narrative → artifact**

rather than:

**text → text → text → text**

A long page should have moments where the reader changes mode:

- read
- scan
- compare
- interact
- observe
- continue reading

This creates pacing.

Avoid more than roughly two substantial prose blocks in succession without considering whether the next idea can be expressed spatially or visually.

---

# 4. Standard section anatomy

Most major sections should use some variation of:

### Kicker
Small uppercase editorial label.

### Section headline
Large, bold, declarative.

### Short explanation
Usually one to three paragraphs, constrained in width.

### Evidence / visualization
A diagram, sequence, artifact, comparison, interaction, model, or visual composition.

Do not make every section identical, but preserve this hierarchy.

---

# 5. Typography

Use:

**Archivo** for structure.

**Fraunces Italic** for conceptual or human emphasis.

Archivo should handle:

- page titles
- section headings
- body text
- UI labels
- captions
- metadata
- buttons
- diagram labels

Fraunces should appear selectively in:

- a phrase within a headline
- a research question
- a large number
- stage numbers
- reflective notes
- short quotations
- conceptual labels

Fraunces is punctuation, not the main language.

---

# 6. Hero typography

Case-study heroes should feel substantial.

Typical headline:

`clamp(36px, 6.2vw, 80px)`

Typical properties:

- weight: 800
- line-height: ~1.06
- negative tracking
- maximum width around 18 characters / a short editorial measure

Do not make the page title small simply because it is long.

Allow it to occupy visual space.

Supporting hero copy:

- around 17–21px
- line-height around 1.7
- approximately 54–56 characters wide

The summary should read like a strong opening paragraph, not metadata.

---

# 7. Section typography

Major section headings:

`clamp(30px, 4.5vw, 52px)`

Generally:

- Archivo ExtraBold
- line-height ~1.1
- negative letter spacing
- max-width around 24ch

Body copy:

- ~17px
- ~1.7–1.75 line height
- maximum width around 680px

Do not let long-form prose span the full container.

---

# 8. Color system

Canonical base colors:

### Ink
`#0B0B0C`

### Paper
`#FFFFFF`

### Accent
`#4F46E5`

### Accent on dark
approximately `#9D91FF`

### Muted
approximately `#6B6E68`

### Border
approximately:

`rgba(11, 11, 12, 0.18)`

The palette should remain predominantly neutral.

Accent color communicates:

- active state
- conceptual emphasis
- progression
- selected state
- important label
- relationship
- interaction

Do not use indigo merely to make something prettier.

---

# 9. Dark vs light sections

Both are part of the language.

Use **light sections** for:

- explanation
- methodology
- artifacts
- evidence
- structured comparisons

Use **dark sections** for:

- major conceptual turns
- staged narratives
- immersive interactions
- synthesis
- strong conclusions
- moments where the reader should slow down

Dark sections should feel like punctuation.

Do not alternate dark/light mechanically.

A dark section should correspond to an important narrative shift.

---

# 10. Whitespace

Whitespace is one of the strongest shared characteristics.

Typical major-section padding:

approximately `120px 0`

Larger statement sections may reach:

`150–160px`

Within a section:

- headline to copy: ~24–32px
- copy to visualization: ~48–64px
- related items: 16–28px

The reader should clearly perceive:

**same idea → close**

**new idea → far apart**

Do not compress the case study to reduce scrolling.

Scrolling is acceptable when the page has rhythm.

---

# 11. Container width

Primary content container:

approximately `1120px`

Horizontal padding:

`clamp(20px, 4vw, 40px)`

Long prose should be narrower inside this container.

Not everything should share the same width.

Use:

- narrow width for reasoning
- medium width for sequences
- full container width for models and visualizations

This width variation creates hierarchy.

---

# 12. Editorial labels

Small labels are used extensively.

Typical style:

- 11–13px
- 700–800 weight
- uppercase
- letter-spacing ~0.10–0.16em

Examples:

CONTEXT

METHOD

THE QUESTION

WHAT CHANGED

PRIMARY

FOUNDATION

IMPACT

Use labels to orient the reader, not as decoration.

---

# 13. Numbers as visual anchors

Numbering is a major part of the Microsoft visual grammar.

Use large Fraunces Italic numbers for:

- research phases
- framework stages
- sequences
- findings
- methodological moves

Typical large sequence number:

~44px

Large immersive stage numbers may be much larger.

Numbers create rhythm and let readers scan complicated processes quickly.

---

# 14. Research methods should become sequences

When showing methodology, avoid dumping methods into bullet lists.

Prefer a visible sequence such as:

01
Research framing

02
Interviews

03
Survey

04
Synthesis

Each phase should explain its purpose, not only name the technique.

When useful, structure each phase around:

**Why**
Why this step was necessary.

**What**
What was done.

**How**
How it was executed.

This pattern is especially appropriate for substantial research studies.

---

# 15. Evidence states should be spatial

When contrasting categories such as:

- believed / known / unknown
- before / after
- user / business
- signal / interpretation / implication
- evidence / uncertainty / decision

show the relationship spatially.

Prefer columns, stacks, rails, sequences, matrices, or flows over prose explaining that the categories differ.

The spatial relationship itself should communicate part of the argument.

---

# 16. Cards are allowed only when the object is card-like

The Microsoft pages do use cards, but not indiscriminately.

Good card subjects:

- individual studies
- discrete account types
- methodological stages
- emails
- hypotheses
- distinct conceptual principles

Bad reason for a card:

"There are three things."

If three things form a process, use a process.

If they form a continuum, use a continuum.

If they form evidence, show evidence.

If they are independent objects, cards may be appropriate.

---

# 17. Visual artifacts should retain some materiality

Research should occasionally feel like research-in-progress.

Appropriate visual motifs include:

- sticky notes
- slightly rotated cards
- trackers
- interview guides
- diagrams
- screenshots
- highlighted questions
- evidence clusters

Small imperfections are welcome.

Example behavior:

- rotation around ±1–2°
- tiny hover straightening
- modest shadows
- paper-like treatment

Do not make everything perfectly geometric.

---

# 18. Screenshots and research artifacts

Actual research artifacts should be treated as evidence, not gallery images.

Use:

- meaningful caption
- restrained border
- modest rounding
- plenty of surrounding whitespace

A caption should tell the reader what they are looking at and why it matters.

Avoid captions such as:

"Research artifact."

Prefer:

"A cohort-specific 50-minute interview guide."

or:

"The tracker connecting challenges, insights, opportunities, recommendations, and product actions."

---

# 19. Interactive visualizations

Interactive elements are strongly encouraged **when interaction helps explain the finding.**

Canonical examples:

- changing AI explanations and seeing how the same inbox feels different
- selecting an account type and seeing which endpoints become relevant
- scrolling through lifecycle stages
- progressing through autonomy levels

Interaction must answer a research question.

Do not create interaction solely for novelty.

Ask:

**Will manipulating this help the reader understand the insight faster than reading another paragraph?**

If no, keep it static.

---

# 20. Scrollytelling

Use scrollytelling for:

- progression
- transformation
- lifecycle
- escalation
- staged trust
- before → after
- accumulation

A sticky visualization plus changing explanatory text fits this visual language well.

But reserve it for important ideas.

Do not use multiple elaborate scroll interactions on every page.

One excellent immersive sequence is better than four mediocre ones.

On mobile, scrollytelling should collapse into a straightforward vertical sequence.

---

# 21. Motion

Motion should feel controlled and slightly tactile.

Common motion vocabulary:

### Entrance
Fade + move upward approximately 36px.

### Hover
Move upward approximately 4–6px.

### Slight translation
Around 4px.

### Slight rotation
Around 1°.

### Scale
Around 1.02–1.04.

### Transition timing
Approximately 300–900ms depending on context.

Preferred easing:

`cubic-bezier(0.22, 1, 0.36, 1)`

Avoid bounce-heavy or cartoon motion.

---

# 22. Motion must communicate state

Good:

- a selected endpoint illuminates
- an inbox visually decays as an account becomes abandoned
- a stage indicator fills as the reader progresses
- explanation text appears when explanations are enabled
- a research note straightens when hovered

Bad:

- icons spinning
- cards floating for no reason
- endless parallax
- unrelated decorative particles

Motion should reveal hierarchy, relationship, progression, or interaction.

---

# 23. Gradients

Gradients are allowed only as atmospheric lighting.

The Microsoft pages use extremely restrained radial glows.

Good:

a very low-opacity indigo radial glow behind a hero or dark visualization.

Bad:

- gradient buttons
- rainbow sections
- gradient typography
- blue-purple AI marketing gradients

The gradient should almost disappear if the reader is not looking for it.

---

# 24. Shadows

Shadows are secondary.

Use them mainly for:

- floating research artifacts
- interactive elements lifting on hover
- visual objects that conceptually sit above a surface

Keep shadows broad and faint.

Structural grouping should primarily come from:

spacing + border + alignment.

---

# 25. Borders

Default light border:

`1px solid rgba(11,11,12,0.18)`

Dark surfaces:

low-opacity white borders.

Borders should feel technical and editorial, not decorative.

---

# 26. Corner radius

Typical family:

- cards: 10–16px
- larger visualization shells: 16–20px
- interface rows: 12px
- pills: 999px
- sticky notes: ~2px

Notice that radius depends on object type.

Do not apply one giant global radius.

---

# 27. Pills

Use pills primarily for compact metadata.

Examples:

- interview count
- survey size
- NDA status
- category
- selected state

Typical treatment:

- 13px
- semibold
- 8px vertical / 16px horizontal padding
- thin border
- no heavy fill

Pills should not become a dominant design motif.

---

# 28. Conceptual models

Important research synthesis should receive a distinct visual model.

Examples include:

- autonomy ladder
- trust framework
- account lifecycle
- account-frequency model

When creating a model:

1. identify the variables
2. identify their relationship
3. choose a spatial metaphor
4. label it minimally
5. make the primary insight visually obvious before the explanatory copy is read

Do not default to a flowchart.

---

# 29. Findings

A finding should usually be introduced as a declarative sentence.

Prefer:

**Account type and purpose affected where and how often people checked email.**

over:

**Finding 1: Account Types**

The headline should contain the insight.

Supporting visualizations then explain its structure.

---

# 30. Quotes

Quotes should be used carefully.

Prefer them when they:

- reveal mental model
- expose tension
- capture a recurring sentiment
- make an abstract issue human

Do not fill the page with testimonial cards.

Fraunces can be used selectively for short reflective lines.

---

# 31. Synthesis over documentation

The case study should reveal how evidence changed understanding.

Important narrative transitions include:

**We thought X.**

**The evidence showed Y.**

**That changed the problem to Z.**

**Therefore the product implication was A.**

Visual design should emphasize these transitions.

The reader should not need to reconstruct the argument from a pile of research activities.

---

# 32. Show reasoning

The Microsoft pages often expose intermediate thinking:

- hypotheses
- provenance checks
- working questions
- framework development
- evidence gaps
- limitations

Preserve this.

The portfolio should show research judgment, not merely polished outcomes.

Small working notes or annotations are particularly useful for this.

---

# 33. NDA-friendly design

When primary findings or screens cannot be shown:

Do not replace them with meaningless placeholder visuals.

Instead visualize:

- research architecture
- methodology
- evidence relationships
- conceptual models
- process
- decision logic
- anonymized/synthetic examples
- what was learned at an abstract level

The Microsoft pages demonstrate that an NDA project can still be visually rich without pretending to show proprietary material.

---

# 34. Impact sections

Impact should remain visually restrained.

Use:

- numbered rows
- concise statements
- borders/dividers
- one prominent conclusion if warranted

Avoid giant KPI cards unless actual quantitative outcomes exist.

Do not fabricate magnitude through visual emphasis.

---

# 35. Credit and scope

Be explicit about:

- role
- collaborators
- what you personally did
- what the team did
- constraints
- what happened after your involvement

Visually, these notes can use:

- narrow callouts
- left accent rule
- small label
- readable body copy

They should feel candid, not apologetic.

---

# 36. Hero variants

The two Microsoft pages establish that case studies do not all need identical heroes.

Two canonical approaches exist:

## Light analytical hero

Best for:

- empirical studies
- behavioral research
- mixed methods
- investigation / diagnosis

Characteristics:

- white background
- subtle indigo radial atmosphere
- dark type
- floating evidence objects if useful

## Dark conceptual hero

Best for:

- frameworks
- strategic synthesis
- AI / trust / systems work
- point-of-view pieces

Characteristics:

- near-black background
- white typography
- lighter indigo accent
- restrained atmospheric glow
- more cinematic entrance

Choose based on the intellectual character of the work.

Do not choose based on variety alone.

---

# 37. New visual patterns are encouraged

Claude/Codex may invent new visual devices.

For example, a future project might need:

- confidence spectrum
- decision tree
- stakeholder tension map
- paired timelines
- behavioral funnel
- evidence matrix
- annotated prototype
- risk landscape
- before/after mental model

Do not search for an existing component that can be forced into service.

Design the correct representation.

Then make it belong to this family through:

- type
- palette
- spacing
- border treatment
- restrained motion
- editorial labels
- evidence-first logic

---

# 38. Do not copy Microsoft branding

These pages are portfolio pages about Microsoft work.

The visual language is **Priyal's**, not Microsoft's.

Do not introduce:

- Fluent UI simply because the project involved Microsoft
- Microsoft blue as the main palette
- Windows-like controls unless demonstrating the product
- corporate Microsoft marketing styles

Synthetic Outlook UI may resemble email conceptually, but the surrounding case-study language remains the portfolio's own.

---

# 39. Anti-patterns

Avoid:

- generic UX portfolio cards
- "Problem / Solution / Impact" template repetition
- giant colorful metric boxes
- gradient-filled backgrounds
- generic abstract blobs
- decorative 3D
- glassmorphism
- excessive iconography
- huge rounded containers around every section
- stock mockups
- device frames without purpose
- long walls of research text
- generic process arrows
- gratuitous animations
- five-column dashboards
- SaaS landing-page aesthetics

Especially avoid making research look like a product feature page.

---

# 40. Decision rules for agents

When adding a new element:

### 1. Identify its semantic role.

Is it:

- context
- evidence
- method
- finding
- synthesis
- model
- implication
- artifact
- limitation
- impact

### 2. Decide whether text alone is sufficient.

If yes, use text.

### 3. If visualization helps, identify the relationship.

Is it:

- sequence
- comparison
- hierarchy
- transformation
- grouping
- distribution
- progression
- cause/effect
- mapping

### 4. Choose a visual form that expresses that relationship.

### 5. Apply the portfolio visual grammar.

Archivo structure.

Fraunces accent.

Neutral foundation.

Indigo emphasis.

Subtle borders.

Generous spacing.

Purposeful motion.

### 6. Remove anything that does not contribute to understanding.

---

# 41. Final test

Before shipping a new case-study section, ask:

1. What research idea does this visual communicate?
2. Would the section still make sense without its decoration?
3. Does the visualization reveal a relationship or merely occupy space?
4. Does the page alternate effectively between reading and seeing?
5. Is the actual insight visible in the headline?
6. Are methods presented as reasoning rather than a checklist?
7. Is indigo being used meaningfully?
8. Is Fraunces still an accent rather than the default?
9. Is there enough whitespace?
10. Have we avoided unnecessary cards?
11. Does interaction teach something?
12. Does the visualization degrade gracefully on mobile?
13. Are research artifacts captioned meaningfully?
14. Is the author's contribution represented accurately?
15. Would this section look at home if inserted between sections of either Microsoft case study?

If the answer to the final question is yes, it belongs.

---

# Short instruction for coding agents

When editing this portfolio:

**Use the Microsoft Copilot Trust and Microsoft Retention case studies as the canonical design references. Preserve their editorial, evidence-first research storytelling rather than copying individual layouts. Invent bespoke visualizations when the content warrants them, but use Archivo-led typography, selective Fraunces Italic accents, a black/white/grey foundation, indigo emphasis, generous whitespace, thin borders, restrained radii, and purposeful low-amplitude motion. Visualize relationships in the research; do not decorate empty space.**