# Vibrant Grants copy: evidence and editorial decisions

Sources are local PDFs under Resources/vibrant-grants-case-study. Page numbers refer to PDF pages. These files are not copied into the public site.

## Discovery and scope

- Final Report - Small File (1).pdf, pp. 24–30: interviews with eight non-NSR nonprofit leaders, fieldwork with five clients, and a survey of 72 community members. The survey examined community information and interpretation/use of the Vibrancy Index; it was not NSR's recurring impact survey.
- Final report, pp. 29–30: NSR selected making community data actionable as the spring direction. Rebuilding the entire portal was beyond scope.
- Final report, pp. 33–37: nine divergent prototypes explored with 18 participants, including grant support, collaboration, financial management, and community/civic data. Grant applications became the central interaction, with discovery before and reporting after.
- Divergent Prototype Testing Report.pdf, pp. 20–31: five co-design participants reviewed 20 probes across four support categories and five support modes. Grant support received the strongest category endorsement. Budgeting was supporting infrastructure; trusted introductions were preferred to automated networking.
- Iterative Prototype Testing Report.pdf, pp. 21–27: grant matching was a bottleneck. An initial 11-factor relevance metric was reviewed with peers, team members, and five NSR staff. Staff added matching-fund and reimbursement requirements, bringing the set to 13.

## AI decisions and evaluation

- Divergent report, pp. 64–68: 18 scenarios across seven capability categories, drawn from four prototypes. Zero-shot and conversational prompts; a shared base system prompt for conversational scenarios. Each scenario used a single prompt and only one model was evaluated.
- Divergent report, p. 68: affordability influenced model selection. No model pricing or measured operating savings are asserted.
- Divergent report, pp. 69–72: scenario 03 compared a chat transcript and a program report. The model identified a reporting-year conflict and four numerical discrepancies; it also flagged missing information. Separate extraction from agreeing sources produced redundancy. The scenario is marked partial in the detailed table. Prompt refinement is recommended, not documented as retested.
- Divergent report, pp. 70–72: absent fields stayed absent; missing-data conversations could move on. Scenario 11 requested confirmation before research-plan updates, but the narrative flags that it did not clearly signal overwriting existing work.
- No raw model response transcript is supplied in these PDFs. The website's real case is explicitly a summary of documented observations. The three invented input/response pairs retain their illustrative labels.
- Final report, p. 66: scheduling ingestion, caching webpage hashes, and using the Gemini Batch API are future operating recommendations, not measured savings or completed maintenance features.

## Review and research impact

- Divergent report, pp. 32–37: four NSR staff walkthroughs confirmed collection friction. Manual intake was concentrated in one role; other staff were advisory/coordination-focused. Clients write grant reports, with NSR providing advice.
- Divergent report, p. 34: staff-set topic checklists, editable summaries, no automatic sending/finalizing, and escalation for confusion/frustration were described in the staff-facing intake prototype.
- Final report, p. 60: final client-facing reporting flow replaced AI-controlled readiness with user control. Source-labeled suggestions, an accepted-data record, manually added sections when parsing fails, and a review stage before analysis.
- Final report, p. 61: living data profile supports reuse and user deletion of sources.
- Final report, pp. 63–66: working application with remaining integration work. The page keeps one sentence of status, focusing the ending on research impact.
- Broader personal study ownership is not expanded. The user subsequently confirmed that she personally graded the model responses; that ownership is now stated in the eval section.

## Source inconsistencies handled conservatively

- Prototype/source material says 93 people heard from; final report says 96. Neither aggregate is used on the page. The snapshot and homepage use the verified 72-response community survey and 18 AI scenarios.
- The earlier prototype's 36-person aggregate and its breakdown do not align cleanly with the new report's phase samples. The page uses phase-specific samples from the final report rather than summing potentially overlapping studies. Whether the same people participated in both phases is not established.
- The divergent report names Gemini Flash 1.5 in methods and Gemini Flash 3.5 in model-selection rationale. The user confirmed that the executed model was 3.5. The page now uses Gemini 3.5 Flash and the report's May–June 2026 study period.
- The detailed result table/narrative records 16 passes and two partials, while the conclusion says 18/18 passed. The page does not publish an aggregate rate; it describes the documented scenario-level findings.
- The report's executive summary says analysis is ongoing, while its later sections contain results. The page attributes results to those later recorded findings without claiming additional rounds.
- The user subsequently confirmed five runs per scenario. The public case study uses that first-hand correction. It does not infer an aggregate pass rate or run-by-run consistency from the initial report's scenario summaries.
- The user confirmed that run-by-run grades were not retained. The public table contains qualitative scenario observations from the detailed findings, not invented five-column scores. Per the user's annotation, scenario 11 is a partial pass for the warning gap noted in the narrative instead of being represented as a measured critical failure.
- Exact prompt version identifiers, generation settings, and whether every input was synthetic versus anonymized are not established. These are not invented in the methodology summary.
- Prompt consolidation and overwrite-warning changes are described as recommended. Source visibility and client approval are described as product controls shaped by research; the page does not claim that every UI control resulted from a model failure or that prompt changes were retested.
- The user described an observed stopping failure: the assistant continued asking questions after sufficient information was available. She also confirmed the resulting change: an enough-information message, with final move-ahead authority in the UI. Per her annotation, it is numbered 19 in the scenario table. The methodology still distinguishes the original 18-scenario / 90-response set from this additional check. No additional run count or successful retest is inferred.

## October 13 annotation pass

- Addressed the 29 synced page comments through copy and layout edits. Removed duplicate summary/grading/contribution sections, reduced repeat framing, made research sample counts pills, and made findings-to-changes a table.
- Maya is an explicitly illustrative client, not a documented research participant or a sourced persona. The referenced final summer presentation was not present in the project folder or repository file inventory during this pass.
- The final report describes 20 concepts and three connected stages of the selected grant workflow. It does not establish an intermediate shortlist of exactly three candidate concepts; the page does not invent that shortlist.
- The final report, p. 55, documents starting relevance weights informed by 10 subject matter experts. The page retains the separately documented five-staff review of the 11 initial criteria and two added factors. It does not label all 10 expert inputs as interviews.
- Public funding context: CEP's State of Nonprofits 2026, https://cep.org/report-backpacks/state-of-nonprofits-2026/, reports that 57% of nonprofit CEOs surveyed said foundation grants had become harder to obtain since January 2025. This is linked directly on the page and not described as an NSR discovery finding.
- The stress test about registrations, visits, and survey respondents remains clearly illustrative. No observed model performance is inferred from it.

## Summer presentation follow-up

- Read all text in the newly added 84-page `[FINAL] SUMMER PRESENTATION-compressed.pdf`, and visually inspected slides 8, 11, 15, 38, 52, 55, and 67.
- Slides 8–16 provide the illustrative Maya story: community work by day, grant searching/writing at night, difficulty using NSR's data, strong anecdotes without supporting evidence, and missing records at reporting time. The page now uses this narrative rather than an invented generic biography. Maya remains labelled illustrative, not a real interview participant.
- `maya-program.png` is a rendered excerpt of the original hand-drawn artwork on slide 11. The PDF is unchanged. The image is not newly AI-generated.
- Slides 20–21 document fragmented grant discovery across grantor websites and word of mouth.
- Slide 38 records ten heuristic evaluators, nine endorsing all heuristics, and seven proposed additions of which two were retained. The public grant-matching block now uses this documented feedback. This is not an aggregate LLM-evaluation result.
- Slides 49–52 show source statistics, plain-language explanations, county comparisons, and suggested use in applications/reports; this now makes the application-support block more concrete.
- Slide 55 identifies storytelling, AI mistakes, empowerment, and operating cost as reasons not to write the whole application. The page keeps client authorship and explains the additional model-use/review burden without claiming measured savings.
- Slide 66 gives 17/18 feasibility successes, differing from the divergent report's summary and detailed outcomes. No new aggregate performance metric was added, and no run-level consistency was inferred.

## Research evidence, participant scope, and interaction tradeoffs

- The discovery section now distinguishes three findings across study phases instead of treating funding urgency as the main research contribution. Each observation identifies its population and phase; later think-aloud results are not presented as initial discovery evidence.
- Finding 1: divergent report pp. 23 and 28, clients C05 and C08 preferred capability-building/coaching and asked for stronger supporting evidence and post-grant support. C05's learning quote is authentic. No invented participant anecdote is added.
- Finding 2: divergent report pp. 34–36, NSR staff described absent participant counts, repeated questions across disconnected surveys, and gaps discovered at report-writing time. The quoted client reply is explicitly recounted by staff, not a direct researcher-client transcript.
- Finding 3 / review controls: iterative report pp. 13 and 33, C05 asked "Are they pulling, or just suggesting?" and struggled with an unsourced regional peer average. The page connects these observations to source visibility and approval controls while stating that error-detection effectiveness was not yet established.
- `stakeholder-system-map.png` is a rendered excerpt of the original kickoff system map in the final report p. 14. It is not a new inferred map. The public participant table separately distinguishes research samples from ecosystem stakeholders.
- The participant table records interview, fieldwork, community-survey, co-design, staff-walkthrough, divergent-prototype, and iterative think-aloud samples separately. The five co-design participants were three NSR clients, one board member, and one collaborating stakeholder (divergent report p. 21). The later seven were five clients and two other nonprofit leaders (final report p. 38). No unique aggregate or disjointness is inferred.
- Opportunity comparison: divergent report pp. 22–30 documents 1 / 0.5 / 0 concept scoring, grant-support category total 12.5, budgeting 4.5, an operating-system preference from the collaborating stakeholder, budgeting interest from C08, and warm-introduction preferences. Connector's 9.0 is a support-mode score, not a category score, and is not mixed into the category comparison.
- The opportunity table explains fit with existing NSR grant advice and data as product reasoning, not a newly measured feasibility score. It explicitly keeps ranking validation and LLM feasibility checks separate from concept preference.
- Interaction format: iterative report pp. 16–17 documents C05's simpler guided reporting, C12's sequential metrics understanding, and C04's preference for the denser dashboard despite finding guidance less intimidating. These support offering different levels of guidance, not a claim of experimentally established adaptive-chatbot superiority. Digital skill was not quantified.
- Next evaluation now explicitly tests whether clients detect unsupported claims and misleading comparisons, trace them to sources, and correct/reject them before approval. No existing performance claim for these review controls is invented.

## Product direction, AI strategy, and UX refinement

- The page now explicitly preserves the distinction requested by the user: discovery and product research narrowed the grant-support direction; product strategy allocated work to coded ranking, contextual AI support, and client review; behavioral evaluation refined the UX within that direction.
- Ownership language remains bounded to confirmed co-led research, AI-strategy work, and defining/grading expected model behaviors. It does not claim personal engineering ownership, sole study leadership, or ownership of every prototype change.
- The stopping failure is the lead evaluation case. Observed failure and prototype interaction changes are based on the user's first-hand account. Reliable stopping and effectiveness of move-ahead controls are still unvalidated; no successful retest is asserted.
- A real conflict-detection case shows the documented input/output in summary form, its criterion, partial-pass judgment, and proposed consolidation change. The reports do not supply a verbatim input/output transcript, so none is invented.
- Scenario-level Pass is explicitly an observed expected behavior, not all-five-run success. No run-level consistency or aggregate pass percentage is inferred.
- Scenario 08 checked an individual grant against four supplied criteria (divergent report pp. 70 and 72). This is an interpretation task, distinct from the 13-factor coded search ranking. The page does not claim this model test validated or replaced the ranking formula, and does not invent names for the four criteria.
- The illustrative stress test now distinguishes registrations, attendance occasions, unique attendees, and evidence of benefit. A sign-in sheet can help establish unique attendance, but cannot by itself establish benefit. Self-reported confidence applies only to the survey respondents.
- The user confirmed that NSR secured an implementation grant. The public ending includes this status without inventing a funder, amount, award date, deployment status, or subsequent user outcomes.
- `source-approval-detail.png` is an enlarged rendered excerpt of the original final-report p. 60 prototype. It makes annual-survey source labels and conversation-source approval visible. The full earlier screenshot remains available in the assets but is not displayed redundantly.
- Timeline and persona remain visible at a secondary scale. The complete 19-check inventory follows the consequential observed cases; no primary scenarios are hidden behind a disclosure.

## Editorial compression and early product evidence

- The user subsequently requested expandable supporting material. This supersedes the earlier instruction to keep the full scenario inventory exposed: research methods, timeline, participant scope, scoring explanation, and system map are now in a research appendix; all 19 scenarios, criteria, illustrative stress test, and roadmap are in an evaluation appendix. The two observed failure stories remain in the main narrative.
- Removed the unused Maya persona and the funding and evaluation-process diagrams from the page. Source assets remain intact. Kept the rules-versus-AI workflow and the original kickoff map in the research appendix, with a concrete account of the relationship it showed.
- Added the real reporting screen near the introduction and surfaced implementation funding there. The source/approval crop later shows the controls alongside their rationale.
- Removed repetitive methodological defenses from the participant descriptions and evaluation narrative. Retained the run-level uncertainty once in the evaluation appendix, because it affects interpretation of Pass labels.
- Iterative report p. 24 identifies five MHCI peer reviewers, five NSR staff subject-matter experts, and a separate internal exercise with four other capstone team members. The main page uses the named external reviewer groups and the resulting two added criteria instead of relying on nine-of-ten endorsement as proof of ranking quality.
- Co-design scoring now states the common denominator: five concepts per category rated by five participants, maximum 25 per category. The comparable scores are 12.5/25 and 4.5/25; participant reasoning leads the visible story.
- The delivery statement names coded ranking, the grant-ingestion pipeline, and seven AI integrations (summer presentation slides 79–82) instead of vague initial-backend language. It does not imply a production deployment or a completed client pilot.
- Reduced project-specific heading sizes and section spacing, removed uppercase kicker treatment, and made mobile navigation a single compact primary row above a thinner section row. Existing measured anchor offsets still apply.
- Added a page-level background-field opt-out to the shared shell and enabled it only for Vibrant Grants. Other portfolio pages keep their existing particle behavior.

## October 14 language edit

- Read the entire public case study, its homepage preview/casefile, and its project-listing entry before editing. Also inspected passages in the Copilot case study for author voice without changing that page.
- Edited headings, body copy, appendix descriptions, scenario observations, captions, accessibility labels, navigation labels, and metadata. Updated the homepage and project registry to match. The layout, assets, anchor IDs, study counts, model/date, participant quotations, grading outcomes, and implementation status are preserved.
- Replaced rhetorical or dramatic headings with section/task names, including Research findings, Co-design sessions, Guided and dashboard views, Testing the assistant, Stopping the conversation, and Combining a transcript and report.
- Read the revised copy continuously, then removed repeated explanations of authorship, grant-support rationale, and delivery status. Kept factual limitations about participant overlap and per-run grading once in the appropriate appendix.
- Responsive table labels were updated to match their new headers. Longer method labels use the existing wrapping styles; no typography or layout sizes were changed in this language pass.
- Structural checks and JavaScript syntax checks passed. Native Arc access for visual review was not approved, so no rendered-browser clipping or line-wrap verification is claimed.

## October 14 narrative restoration

- Read the current public page, the earlier Resources prototype, and original discovery, co-design, iterative-testing, and evaluation passages from the reports. The Resources prototype supplies the earlier version used for comparison. Its unsupported aggregate participant counts were not restored.
- Expanded the account of NSR's mentoring role and staff capacity, fragmented grant discovery, the separate community-data survey, missing reporting records, and co-design preferences. Kept staff walkthroughs identified as later prototype work rather than attributing them to initial discovery.
- Moved the detailed coded-ranking and AI allocation rationale into connected paragraphs. The existing sketch now supplies a shorter visual comparison. The reporting explanation and illustrative conversation follow in a single reading column.
- Kept evaluation purpose, scenario derivation, prompt structure, fixed model and period, confirmed five runs per original scenario, personal defining/grading role, all seven criteria, observed cases, full scenario inventory, and next testing steps visible outside disclosures.
- Expanded recorded successful behavior and conflict-detection findings without inventing raw input/output transcripts. Scenario-level judgments remain qualitative; no aggregate reliability or run-level performance is inferred.
- The additional stopping check remains outside the original 18-scenario / 90-response total, and is explicitly labelled in both its narrative and result-table row. Prototype move-ahead controls are distinguished from proposed synthesis/overwrite prompt changes and unvalidated retests.
- Read the main narrative continuously after editing, removed a repeated ranking-scope disclaimer from the table, and checked HTML nesting, local links/assets, ARIA references, scenario visibility, and existing measured navigation offsets. Arc access was declined for this turn, so rendered browser verification remains outstanding.

## Visual reading hierarchy follow-up

- Replaced long discovery paragraphs with observation-to-product-implication lanes. The community survey percentages and comparable co-design category scores use proportional bars; no evaluation pass rates or new quantitative findings were introduced.
- Moved the reporting screenshot out of the brief and placed it after the client observations that motivated source and approval controls. CSS frames the relevant interface area, with numbered annotations for existing records, conversation approval, and review. Clicking still opens the unchanged full artifact. The redundant source-approval crop was removed from the page, not deleted from assets.
- Kept the established hand-drawn grant-task diagram, moving the rules/AI rationale into its stages and preserving cost, maintenance, ranking-review populations, and 13-factor scope.
- Added specific task-to-scenario mappings and schematic diagrams for the stopping failure and conflict-detection observation. These diagrams summarize reported behavior; they are not new transcripts, screenshots of outputs, or retest results.
- The original 18-scenario method, all seven criteria, all 19 inventory rows, scenario-level scoring limitation, ownership, model/period, and implemented versus proposed changes remain visible. Research and illustrative stress-test disclosures remain secondary.
- Main-page text decreased from approximately 3,361 to 2,458 words, primarily by removing repetition and presenting relationships visually. Structural, asset, ARIA, and navigation-offset checks passed. Mobile styles stack the finding lanes, prompt mappings, annotations, and evaluation comparisons. Browser rendering remains unverified because access was previously declined.

## Visual hierarchy and storytelling review

- Audited the current HTML and desktop/mobile style rules for the prominent reading path. Requested native Arc access again for the user's requested scroll-through; access was not approved. This was a source/style review, not an observed browser attention test or rendered clipping check.
- Primary section headings now identify staff-capacity constraints, securing funding, the choice of grant support, Vibrant Grants' search-to-reporting scope, missing reporting details, evaluation, and implementation funding. The product section explicitly identifies what the team developed before presenting the task/AI diagram.
- Removed visible survey bars and moved co-design scoring into a disclosure. Population counts remain in ordinary supporting text. Reduced individual-case heading sizes, run-total type size, and the oversized conflict-count treatment; the stopping interaction retains greater emphasis than other test cases.
- Reduced hero chips, removed the repeated early implementation-grant line and evaluation-purpose banner, removed the redundant survey/calls/chatbot diagram, and replaced the discovery implication boxes with plain linked columns. No new cards or banners were introduced.
- The grant-process caption identifies the product and distinguishes coded search ranking from contextual AI support. The stopping diagram labels its observed failure and prototype change explicitly. The reporting screen is introduced as a prototype, and its caption identifies the source/approval task.
- Mobile uses the existing source-approval detail through a responsive picture element. Pin positions change to match that crop; the review-stage pin is hidden because it is outside the detail. Caption text directs readers to the complete artifact for that step. The original image files were not modified.
- The full 19-check inventory is now supporting detail, while evaluation purpose, scenario derivation, prompts, model/period/runs, role, seven criteria, successes, observed failures, judgments, implemented/recommended changes, limitations, and next testing remain visible. The distinction between the original 18/90 and the additional stopping check is preserved.
- HTML nesting, local assets (including the mobile source), ARIA references, disclosure content, and measured navigation-offset tests passed. Actual normal-size desktop and mobile browser review remains outstanding.

## Evaluation as a portfolio story

- Following the user's latest direction, replaced the long evaluation section with a brief account of scenario design, repeated runs, defining expectations, grading, and the model/period. The six compact criteria rows preserve the original behaviors while combining extraction and synthesis.
- Kept the additional stopping check as the only evaluation example and retained its observed-behavior / prototype-change diagram. It remains described as an additional check, rather than silently included in the original 18 scenarios.
- Removed the two other case breakdowns, full result inventory, illustrative stress test, scoring definitions, 90-response total, record-keeping declarations, and detailed evaluation roadmap from the public page. The reports and prior evidence notes preserve those underlying records.
- System-prompt changes are described as decisions informed by failures; no successful prompt retest or model reliability is claimed. The confirmed enough-information message and move-ahead control are described as prototype changes.
- Updated the reflection, outcome testing wording, social description, and Vibrant-only homepage/registry evidence text to avoid referring readers back to the removed cases or response-total emphasis.
- Structural/local-asset/ARIA checks and registry JavaScript syntax checks passed. No new rendered-browser verification is claimed.

## Explanatory visuals and homepage follow-up

- Added a code-native overlap sketch showing client needs meeting NSR's existing grant advice, community data, and coaching. Added a prompt-to-model-to-human-review sketch explaining the two evaluation input formats. Both summarize confirmed project facts and keep the stopping check as the only detailed evaluation example.
- Generated a new torn-paper homepage collage with the built-in image-generation tool, using the existing Copilot collage as a style reference. It is an editorial illustration, not a screenshot or participant photograph. Full prompt, source, and saved asset paths are in `docs/vibrant-grants-collage.md`.
- Updated the homepage preview, project registry, and social-preview asset. The old research-board thumbnail was preserved. The latest preview wording is “Can an AI chatbot collect reliable data for nonprofit grant reports?”
- Removed onboarding from the homepage list and preview panels, adjusted the five remaining indices/counters, and marked the registry entry archived. Its case-study HTML and assets remain intact.
- Retrieved NSR's unchanged official logo from the asset linked in its official homepage header. CSS shows the orange sun portion in the homepage brand slot. The full downloaded logo is retained.
- Replaced the homepage AI Safety & Governance ranker-flow graphic with a code-native collection poster related to Play's typographic treatment. It combines large textured AI lettering with eval, audit, and policy motifs; it does not imply the collection is one project. Play itself is unchanged.
- Structural/asset/ARIA checks, registry syntax checks, and homepage registry/preview-index checks were run. No actual rendered-browser desktop/mobile verification is claimed.

## October 14 new annotation pass

- Read all 31 pending comments and their element text/selectors from the synced annotation file. Made NSR's ask more prominent, removed its extra qualifier, added the brief research-to-funding transition, and moved the overlap diagram into the introduction.
- Replaced repeated method paragraphs with study pills. Main-page cohorts remain labelled as non-NSR leaders, NSR clients, community respondents, co-design stakeholders, staff, and later think-aloud participants; no unique aggregate is implied.
- Explained the grant process before the findings and replaced vague headings about work, data, and reporting gaps with grant search, community statistics used in applications, and missing activity/attendance records.
- Reframed the co-design section around coaching clients through their own applications and tied the retained client quotation to that decision. Removed the repeated choice-of-grants framing, opportunity table, and scoring disclosure per the comments.
- Rebuilt the grant-support panels as normal flex layouts with consistent heading space, visible borders, and wrapping badges. The ranking text now introduces the recommendation algorithm before its 13 criteria, and application support names census figures and neighborhood indicators.
- The reporting section explains why fixed surveys required time-intensive staff calls/interviews. Removed the invented attendance chat entirely instead of removing its illustrative label. The real prototype screenshot now supplies the example conversation, with a larger desktop presentation and explanatory source/approval/review notes.
- Removed the disconnected guidance/dashboard findings, trust quote, and methodological defenses from the main page. Updated the evaluation diagram to “Review” and added “Example of a failure” above the stopping case. The original 18 cases and additional stopping check remain distinct.
- Preserved source images and original reports. Annotation statuses were not changed in the external annotation file; the changes are recorded here in the workspace.
- Structural/asset/ARIA checks, measured navigation tests, and homepage/AI-card regressions passed. No browser-rendered review is claimed.

## October 15 research story and data collection

- Removed the research appendix disclosure. The research timeline image is now visible. The participant table is replaced by a five-step story (kickoff mapping, discovery, divergent prototypes and co-design, staff walkthroughs, iterative think-alouds), each giving why the study ran, what we learned, and what changed in the product. All counts, quotes, and changes come from the entries above; the standalone co-design section is folded into step 03.
- The sample-overlap caveat is kept as one line under the story. The 51%/35% survey figures appear once, in the discovery step.
- Restored the chatbot-as-data-collection framing from the Resources prototype: surveys could not probe answers, staff follow-up was costly, and the chatbot sits between survey and interview. Added a survey/chatbot/interview comparison, the four chatbot rules, and the `chatbot-flow.jpg` prototype screen. The invented attendance chat stays removed.
- No rendered-browser check: no headless browser available in this pass.

## October 15 annotation pass

- Research story trimmed to kickoff, discovery, and divergent prototypes/co-design so it flows straight into the grant process. Staff-walkthrough step removed per comment; its substance remains in the data-collection section. Think-aloud step moved to a "Testing with clients" section after evaluation. Sample-overlap note removed per comment.
- Reflection retitled "Learnings" and rewritten around evaluating a non-deterministic model: five runs per scenario, grading against defined behaviors, and the conversation-level stopping failure. The fix is described as the enough-information message plus the client move-ahead control, matching the confirmed account; no prompt retest is claimed.
- Added the team photo (Resources/vibrant-grants-case-study/8CBD6973-A33F-4967-A4C6-0AE6AC034094_1_105_c.jpeg; an earlier pick of Resources/Photos/IMG_9927.jpeg was wrong and replaced) below delivery as assets/img/vibrant-grants/team.jpg, resized and with all EXIF, including GPS, removed.
- The Oct 14 "ui is broken" grant-process comment predates the panel rebuild; it was left open for visual confirmation.

## October 15 annotation pass 2

- Research section: removed heading and intro line; timeline image now full container width; dropped "open at full size" from its caption.
- Product & AI: heading is the user's question about AI cost and best use; intro paragraph removed. Ranking explains that a model call would make ranking less reliable (non-deterministic, untraceable). Data explanation says AI fits because explanations must be personal to the client's program and grant. Reporting stage is framed as the opportunity to explore a chatbot for data collection, highlighted, with a link down to the Data collection section.
- Evaluation: retitled "Evaluating the chatbot", tinted background, and the user's FigJam eval board (Resources/vibrant-grants-case-study/Screenshot 2026-10-15 at 11.12.50 AM.png → assets/img/vibrant-grants/eval-board.jpg) added after the scenarios.
- Stopping case rewritten from the user's account: the chatbot moved clients through sections on its own for a seamless flow, couldn't end the conversation once it had enough information, so it now says the information is sufficient and the client marks the section complete.
- Client testing heading rephrased to "Showing clients where the information came from".
- Oct 15 follow-up: the reporting panel keeps the same styling as the others. A smooth curved SVG arrow starts at the bottom edge of that panel and ends above the "Data collection" label in the next section. A small inline script positions it on load, font load, and resize; its colour switches from the light on-dark blue to the paper accent at the section boundary.

## October 15 annotation pass 3

- Product & AI: kicker now "Where to use AI, and where not". Badges state the verdict (No AI / AI). Each panel's reasoning sits in a highlighted "Why AI" / "Why not AI" box: ranking (non-deterministic model calls would make ranking unreliable), community data (explanations must be personal to the client's program and grant), reporting (a survey can't follow up; a chatbot can). Criteria-review pills removed.
- Evaluation: removed the document/conversation test sketch; the model and period line is kept as larger standalone text.
- Pass 3 follow-up: discovery and divergent/co-design steps now state what we wanted to find out and give each method with its reason (interviews with non-NSR leaders for reach beyond current clients; fieldwork because NSR could introduce its clients and in-person observation showed more than interviews; community survey to hear from the people organizations serve; divergent prototypes for concrete side-by-side comparison; co-design with 5 participants over 20 concepts in four support categories and five delivery modes). Survey pill shortened to "Survey". Client testing reframed as "Evaluating with clients" with why / what we did / what we learned; resulting source, approval, and review changes are folded into what we learned.
