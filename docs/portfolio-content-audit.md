# Portfolio content audit

Working record for claims, project status, public artifacts, and publication risks. This file is internal and is not linked from the site.

## Verified claims

| Project | Claim used on site | Evidence in workspace | Action |
| --- | --- | --- | --- |
| Razorpay onboarding | 51% increase in form-filling conversion; completion time reduced from 14 to 5 minutes; 43% reduction in support tickets | `resume.html`; earlier case-study implementation described these values as resume-verified | Replace the unsupported 63% / 50% / 64% values everywhere |
| Outlook mobile web | 36 interviews across six behavior groups; 300+ survey responses | Current case study gives the exact interview count; resume summarizes it as 30+ | Use 36 on the case study and cards; 30+ remains an acceptable rounded résumé form, but exact wording is preferable |
| CORDA | Six ranking rules | `Resources/AIS/RecSys_2026_paper_1263.pdf`, Sections 2.3 and 4 | Update the résumé from four to six |
| CORDA | Current results are from a 1,123-tick exploratory run; planned design uses 3,000 agents and 5,000 ticks | `Resources/AIS/RecSys_2026_paper_1263.pdf`, Sections 1, 4, and 6 | Keep the two stages visibly separate |
| Werewolf | Qwen3-4B trained for 200 RL steps; reported checkpoints 0, 19, 39, and 59; three evaluation games per checkpoint | `Resources/AIS/CS11830_Project (3).pdf`, Sections 3.3 and 4 | Label all checkpoint findings exploratory |
| Werewolf | Nine qualitative tactics; friendly betrayal extends the starting MentalManip taxonomy | `Resources/AIS/CS11830_Project (3).pdf`, Appendix A.2 | Present this as the primary contribution |
| SEAL IT | 77 teams and 144 participants across three tracks; first place in the Deepfakes and Election Integrity track | Competition context supplied for the portfolio; current policy case | Standardize résumé and site wording |
| CHI paper | Preregistered experiment with 207 participants | Homepage publication record and ACM link | Retain |

## Status labels

| Project | Public status |
| --- | --- |
| Lost in Transcription | Published, CHI 2026 |
| Task-level Human-AI Complementarity | Accepted poster |
| CORDA | Working paper; exploratory results |
| Werewolf | Working paper; exploratory study |
| SEAL IT | First-place policy proposal |
| Policy Diff Observatory | Prototype with recorded snapshots |
| Response Atlas | Research instrument; data collection has not produced portfolio-ready results |
| Algorithmic Polarization | Early governance concept; archive until construct validity is established |

## Publication blockers

### Public files

`Resources/` is ignored by the root repository. Links from portfolio pages to papers and embedded tools will fail in a normal git-based deployment. Public, sanitized artifacts must be moved to a tracked location before publication. The Response Atlas `.env` file and local Netlify state must never be included.

### Policy Diff Observatory

- The working copy contains a Monday GitHub Actions schedule, but the workflow and current pipeline are uncommitted in its nested repository.
- The latest recorded successful check is 2026-08-15.
- Public wording must say `prototype` or `recorded snapshots` until scheduled runs are committed and verified in the live repository.

### Response Atlas

- No saved study results are present in the workspace.
- The portfolio may describe the protocol and instrument, but should not report preliminary findings yet.
- The interactive app requires a Netlify function and provider configuration. It should be deployed separately and linked from the portfolio rather than embedded from an ignored local directory.

### Confidentiality review

Completed safeguards:

- Replaced Outlook participant, colleague, and internal-document screenshots with public method diagrams.
- Removed Razorpay D2C screenshots containing participant faces, names, and internal proposition material.
- Removed Razorpay onboarding screenshots containing personal contact information, internal workshop names, prototype email addresses, and an internal award document.
- Removed internal workshop boards from the website-evaluation case; retained public-facing website stimuli.

Before publication, confirm the permission and source for the remaining employer-reported figures, including the website study's 10% conversion increase and 90% recommendation adoption, and the onboarding study's 8-of-11 preference result.

## Writing standard

- Headings name the section: `Investment decision`, `Research design`, `Preliminary results`.
- A sentence below the heading states the argument or finding.
- Claims use a concrete actor, action, evidence, and decision.
- Status and limitations appear beside results, not only at the end.
- Project pages describe what the work does. Limitations describe the boundary of the evidence without defensive language.
