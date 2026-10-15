/**
 * Project registry — single source of truth for what exists and which track it belongs to.
 *
 * Renders the "ai" track on ai-safety.html.
 *
 * The "uxr" entries are not rendered anywhere today — index.html is the product
 * and UX research portfolio and its cards are hand-written there, tuned to the
 * collage layout. They are kept here as the record of that set, and so a
 * standalone UX research page can be brought back without re-deriving it.
 *
 * Auto-renders into any list item marked:
 *   <li data-projects-mount data-track="ai"></li>
 *
 * Rendered markup matches the hand-written .home-work__row cards in index.html,
 * so no new layout CSS is needed beyond css/ai-safety.css.
 */
(function (global) {
  const PROJECTS = [
    // ---------------------------------------------------------------- ai
    {
      id: 'response-atlas',
      cardImage: {src: 'assets/img/ais/response-atlas-cover.svg', w: 400, h: 260},
      title: 'Exploring reported emotions in language models',
      cardBg: '#17171b',
      index: '01',
      poster: 'profile',
      blurb: 'An experimental interface for comparing emotion reports across prompts, models, and matched controls.',
      track: 'ai',
      href: 'work/model-self-report-lab.html',
      accent: 'violet',
      mark: 'Response Atlas',
      letter: 'RA',
      status: 'Research prototype',
      lead: 'Which emotions do language models report before they answer?',
      chips: ['Model behavior', 'Experiment design', 'Matched controls'],
      casefile: {
        Question: 'Which emotions do language models report before answering, and do those reports hold across models and tasks?',
        Evidence: 'A protocol covering nine emotions and affective states across three matched conditions. Data collection is ongoing.',
        Decision: 'Build and document the instrument first; report no findings until matched controls are complete.'
      }
    },
    {
      id: 'corda',
      cardImage: {src: 'assets/img/ais/corda-cover.svg', w: 400, h: 260},
      title: 'A common testbed for alternative feed rankers',
      cardBg: '#101c1f',
      index: '02',
      previewImage: { src: 'assets/img/ais/corda-results.webp', w: 1224, h: 1584 },
      blurb: 'Six ranking rules, one simulated population, so the tradeoffs between them can finally be compared.',
      track: 'ai',
      href: 'work/recommender-systems-audit.html',
      accent: 'cyan',
      mark: 'CORDA',
      status: 'Working paper',
      lead: 'How should we compare alternatives to engagement-based ranking?',
      image: { src: 'assets/img/ais/corda-engagement.webp', w: 550, h: 265 },
      chips: ['Agent-based simulation', 'Ranker catalog', 'Policy analysis'],
      casefile: {
        Question: 'How can alternative feed-ranking algorithms be compared on one set of policy-relevant measures?',
        Evidence: 'Six ranking rules run against the same 3,000-agent population and seed corpus, reported from one 1,123-tick exploratory run.',
        Decision: 'Publish a ranker catalog and a shared testbed so policy teams can see tradeoffs side by side.'
      }
    },
    {
      id: 'werewolf',
      cardImage: {src: 'assets/img/ais/werewolf-cover.svg', w: 400, h: 260},
      title: 'Deceptive tactics in competitive LLM agents',
      cardBg: '#14131b',
      index: '03',
      previewImage: { src: 'assets/img/ais/werewolf-behaviors.webp', w: 1191, h: 1684 },
      blurb: 'Nine deceptive tactics, named from the transcripts of an agent rewarded for winning.',
      track: 'ai',
      href: 'work/llm-deception-werewolf.html',
      accent: 'charcoal',
      mark: 'Werewolf',
      status: 'Working paper',
      lead: 'What do LLM agents learn when winning requires deception?',
      image: { src: 'assets/img/ais/werewolf-behavior-grid.webp', w: 960, h: 610 },
      chips: ['Multi-agent RL', 'Qualitative taxonomy', 'Transcript analysis'],
      casefile: {
        Question: 'Which tactics do LLM agents develop when they are rewarded for winning a social deception game?',
        Evidence: 'Game transcripts from a Qwen3-4B agent trained for 200 RL steps, read against five baseline models.',
        Decision: 'Name nine deceptive tactics, extending the MentalManip taxonomy with friendly betrayal.'
      }
    },
    {
      id: 'seal-it',
      cardImage: {src: 'assets/img/ais/seal-it-cover.svg', w: 400, h: 260},
      title: 'A federal framework for synthetic election media',
      cardBg: '#f4f0e8',
      index: '04',
      previewImage: { src: 'assets/img/ais/seal-implementation-matrix.webp', w: 1224, h: 1584 },
      blurb: 'Slow the distribution of suspected election deepfakes rather than removing the speech.',
      track: 'ai',
      href: 'work/election-deepfakes-policy.html',
      accent: 'amber',
      mark: 'SEAL IT',
      status: 'First place',
      lead: 'How can policy slow election deepfakes without suppressing speech?',
      image: { src: 'assets/img/ais/seal-priority-matrix.webp', w: 1040, h: 895 },
      chips: ['Policy design', 'Stakeholder analysis', 'Adversarial review'],
      casefile: {
        Question: 'How can the United States reduce the harm of election deepfakes while preserving political speech?',
        Evidence: 'Legal precedent, platform distribution mechanics, and adversarial review, judged across three competition tracks.',
        Decision: 'Slow algorithmic distribution while suspicious content is reviewed, rather than removing it outright.'
      }
    },
    {
      id: 'policy-diff',
      cardImage: {src: 'assets/img/ais/policy-diff-cover.svg', w: 400, h: 260},
      title: 'Tracking changes to AI-company policies',
      cardBg: '#17171b',
      index: '05',
      poster: 'diff',
      blurb: 'A source-linked record of what AI companies quietly change in their published commitments.',
      track: 'ai',
      href: 'work/policy-diff-observatory.html',
      accent: 'coral',
      mark: 'Policy Diff',
      letter: 'PD',
      status: 'Prototype',
      lead: 'What changes when an AI company quietly edits its published policy?',
      chips: ['Change tracking', 'Source archiving', 'Governance infrastructure'],
      casefile: {
        Question: 'How can edits to public AI-company policies be recorded so they can be cited rather than recalled?',
        Evidence: 'Recorded snapshots of policies, model specifications, terms, and safety frameworks across seven companies.',
        Decision: 'Keep a source-linked audit trail of archived sources and Git history.'
      }
    },
    {
      id: 'algorithmic-polarization',
      track: 'ai',
      // docs/portfolio-content-audit.md: hold until construct validity is established.
      // Flip `archived` to false to publish it everywhere.
      archived: true,
      href: 'work/algorithmic-polarization.html',
      accent: 'indigo',
      mark: 'Feed auditing',
      status: 'Early concept',
      lead: 'Can a transparent baseline make feed ranking auditable?',
      image: { src: 'assets/img/ais/polarization-comparator.webp', w: 1440, h: 810 },
      chips: ['Audit design', 'Governance modeling'],
      casefile: {
        Question: 'Can a platform feed be audited by comparing it with a transparent baseline built from the same inputs?',
        Evidence: 'Concept development with a four-person team. Construct validity is not yet established.',
        Decision: 'Hold the concept until the baseline construct can be validated.'
      }
    },

    // --------------------------------------------------------------- uxr
    {
      id: 'vibrant-grants',
      track: 'uxr',
      href: 'work/vibrant-grants.html',
      accent: 'ochre',
      companyLabel: 'New Sun Rising',
      company: 'nsr',
      status: 'Behavioral evaluation',
      lead: 'Finding a role for AI at New Sun Rising',
      blurb: 'Can an AI chatbot collect reliable data for nonprofit grant reports?',
      image: { src: 'assets/img/projects/vibrant-grants-collage-v2.jpg', w: 1402, h: 1122 },
      chips: ['Co-design & think-aloud testing', 'AI strategy', 'Conversational data collection', 'Behavioral LLM evaluation'],
      casefile: {
        Question: 'Where could AI help NSR\'s nonprofit clients?',
        Evidence: 'Discovery and product research, with scenario-based evaluation of the grant assistant.',
        Decision: 'Use coded grant ranking and an AI assistant for collecting and interpreting program information. Clients review the suggestions.'
      }
    },
    {
      id: 'copilot-trust',
      track: 'uxr',
      href: 'work/microsoft-copilot-trust.html',
      accent: 'violet',
      company: 'microsoft',
      companyLabel: 'Microsoft',
      status: 'Framework',
      lead: 'How can Copilot earn users&rsquo; trust?',
      image: { src: 'assets/img/projects/copilot-trust-preview-v2.jpg', w: 1402, h: 1122 },
      chips: ['Research synthesis', 'Literature review', 'Social listening'],
      casefile: {
        Question: 'What do people need before letting Copilot act for them?',
        Evidence: 'Findings from a year of Copilot studies.',
        Decision: 'Give people clear information and control before asking them to trust more automation.'
      }
    },
    {
      id: 'outlook-retention',
      track: 'uxr',
      href: 'work/microsoft-retention.html',
      accent: 'blue',
      company: 'microsoft',
      companyLabel: 'Microsoft',
      status: 'Mixed methods',
      lead: 'What makes people leave Outlook on mobile web?',
      image: { src: 'assets/img/projects/outlook-churn-preview-v2.jpg', w: 1402, h: 1122 },
      chips: ['Interviews', 'Survey', 'Thematic analysis'],
      casefile: {
        Question: 'Why do mobile-web users stay or leave?',
        Evidence: '36 interviews and more than 300 survey responses from six types of users.',
        Decision: 'Improve how people move between their accounts and email apps.'
      }
    },
    {
      id: 'razorpay-onboarding',
      archived: true,
      track: 'uxr',
      href: 'work/razorpay-onboarding.html',
      accent: 'green',
      company: 'razorpay',
      companyLabel: 'Razorpay',
      status: 'Shipped',
      lead: 'How can we optimize onboarding for merchants with low digital literacy?',
      image: { src: 'assets/img/projects/razorpay-onboarding-preview-v2.jpg', w: 1402, h: 1122 },
      chips: ['Session review', 'Ticket analysis', 'Usability testing'],
      casefile: {
        Question: 'Why were small merchants leaving the identity-verification form?',
        Evidence: 'Support tickets, recordings of people using the form, and role-playing exercises.',
        Decision: 'Ask one plain-language question at a time and explain why.'
      }
    },
    {
      id: 'razorpay-website',
      track: 'uxr',
      href: 'work/razorpay-website-evaluation.html',
      accent: 'indigo',
      company: 'razorpay',
      companyLabel: 'Razorpay',
      status: '1M+ views',
      lead: 'How can research keep improving a website right up to launch?',
      image: { src: 'assets/img/projects/razorpay-website-research-preview-v2.jpg', w: 1402, h: 1122 },
      chips: ['Pre-mortem', 'UX audit', 'Impression test', 'Perception test', 'Usability test', 'Preference test'],
      casefile: {
        Question: 'What would the redesigned homepage communicate before launch?',
        Evidence: 'Six kinds of research completed over six weeks.',
        Decision: 'Fix the main problems before the new site launched.'
      }
    },
    {
      id: 'razorpay-d2c',
      track: 'uxr',
      href: 'work/razorpay-d2c.html',
      accent: 'amber',
      company: 'razorpay',
      companyLabel: 'Razorpay',
      status: 'Go / no-go',
      lead: 'Should Razorpay build a consumer rewards product?',
      image: { src: 'assets/img/projects/razorpay-rewards-decision-preview-v2.jpg', w: 1402, h: 1122 },
      chips: ['Interviews', 'Focus groups', 'Participatory design', 'Survey'],
      casefile: {
        Question: 'Should Razorpay build a consumer rewards product?',
        Evidence: '40+ interviews and a survey of more than 1,000 people.',
        Decision: 'Replace the original idea with the rewards model people preferred.'
      }
    },
    {
      id: 'meesho-vernacular',
      track: 'uxr',
      href: 'work/meesho-vernacular.html',
      accent: 'rose',
      company: 'meesho',
      companyLabel: 'Meesho',
      status: 'Field research',
      lead: 'What does it mean to vernacularize a platform?',
      image: { src: 'assets/img/projects/meesho-vernacular-collage-v2.jpg', w: 1402, h: 1122 },
      chips: ['Field research', 'Language study', 'Concept testing'],
      casefile: {
        Question: 'What has to change when a platform is translated for people who do not read English?',
        Evidence: 'Field research with resellers working across languages and literacy levels.',
        Decision: 'Treat vernacularization as a product problem, not a translation problem.'
      }
    }
  ];

  /* Bespoke posters for the two projects with no figure of their own.
     Each draws its project's argument rather than decorating the card. */
  const POSTERS = {
    // Policy Diff Observatory — a published commitment, revised. Two lines
    // struck out, two added, the rest of the document unchanged.
    diff: () => {
      const rows = [
        [120, 'same'], [186, 'same'], [152, 'cut'], [170, 'add'],
        [138, 'same'], [200, 'same'], [110, 'cut'], [164, 'add'],
        [178, 'same'], [128, 'same']
      ];
      const lines = rows.map(([w, kind], i) => {
        const y = 34 + i * 23;
        return `<rect class="p-line p-line--${kind}" x="74" y="${y}" width="${w}" height="9" rx="4.5"/>`
          + `<rect class="p-mark p-mark--${kind}" x="52" y="${y}" width="11" height="9" rx="2"/>`;
      }).join('');
      return `<svg class="poster-svg poster-svg--diff" viewBox="0 0 320 290" fill="none" xmlns="http://www.w3.org/2000/svg">`
        + `<rect class="p-sheet" x="36" y="16" width="248" height="258" rx="3"/>${lines}</svg>`;
    },

    // Response Atlas — nine reported affective states, measured twice.
    // Filled bars are the prompt condition; outlined bars the matched control.
    profile: () => {
      const test = [46, 82, 34, 118, 62, 96, 28, 70, 52];
      const ctrl = [40, 58, 38, 61, 55, 48, 31, 44, 46];
      const base = 236;
      const bars = test.map((h, i) => {
        const x = 40 + i * 28;
        const c = ctrl[i];
        return `<rect class="p-ctrl" x="${x}" y="${base - c}" width="16" height="${c}" rx="3"/>`
          + `<rect class="p-test${h > 90 ? ' is-lit' : ''}" x="${x + 4}" y="${base - h}" width="16" height="${h}" rx="3"/>`;
      }).join('');
      return `<svg class="poster-svg poster-svg--profile" viewBox="0 0 320 290" fill="none" xmlns="http://www.w3.org/2000/svg">`
        + `${bars}<line class="p-axis" x1="32" y1="${base}" x2="288" y2="${base}"/></svg>`;
    }
  };

  // Consistent editorial illustrations for collection cards. These are project motifs,
  // not charts of measured results; actual figures remain in the case studies.
  function researchPoster(label, content) {
    const text = label.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    return `<svg class="research-poster" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">`
      + `<path class="rp-paper" d="M39 24L350 20L369 38L364 235L40 239L33 221Z"/>`
      + `<text class="rp-label" x="58" y="54">${text}</text>${content}</svg>`;
  }
  const CARD_POSTERS = {
    rankers: () => researchPoster('FEED RANKERS',
      `<path class="rp-ink" d="M64 91H130V198H64Z M76 109H116 M76 127H108 M76 145H116 M76 163H102 M76 181H116 M140 144H189 M177 134L190 144L177 154"/>`
      + [0,1,2,3,4,5].map(i => `<rect class="${i % 2 ? 'rp-lilac' : 'rp-teal'}" x="${212+(i%2)*64}" y="${86+Math.floor(i/2)*43}" width="48" height="29" rx="4"/>`).join('')
      + `<path class="rp-ink" d="M231 100H241 M295 100H305 M231 143H241 M295 143H305 M231 186H241 M295 186H305"/>`),
    agents: () => researchPoster('AGENT BEHAVIOR',
      `<path class="rp-muted" d="M108 113L195 173L290 113 M108 113H290"/>`
      + `<path class="rp-paper rp-ink" d="M66 86H155V130H105L83 148V130H66Z M240 84H330V130H312V147L294 130H240Z"/>`
      + `<path class="rp-ink" d="M82 101H136 M82 114H120 M256 100H313 M256 113H298"/>`
      + `<circle class="rp-lilac" cx="109" cy="181" r="15"/><circle class="rp-teal" cx="199" cy="181" r="15"/><circle class="rp-lilac" cx="289" cy="181" r="15"/>`
      + `<path class="rp-ink" d="M83 216Q109 194 135 216 M173 216Q199 194 225 216 M263 216Q289 194 315 216"/>`),
    policy: () => researchPoster('SYNTHETIC MEDIA POLICY',
      `<path class="rp-ink" d="M67 100H155V182H67Z M83 120L121 141L83 162Z M171 140H214 M201 130L215 140L201 150"/>`
      + `<rect class="rp-lilac" x="237" y="105" width="20" height="70" rx="3"/><rect class="rp-lilac" x="268" y="105" width="20" height="70" rx="3"/>`
      + `<path class="rp-teal" d="M259 198L276 215L310 180"/><path class="rp-ink" d="M75 204H169 M75 218H142"/>`),
    revisions: () => researchPoster('POLICY CHANGES',
      `<path class="rp-ink" d="M67 84H332V222H67Z M87 108H263 M87 132H313 M87 156H250 M87 204H294"/>`
      + `<path class="rp-cut" d="M85 153H269"/><path class="rp-teal" d="M88 179H292 M302 179H320 M311 170V188"/>`),
    controls: () => researchPoster('SELF-REPORT & CONTROLS',
      `<path class="rp-ink" d="M65 86H181V215H65Z M218 86H334V215H218Z M89 109H154 M241 109H311 M190 149H210"/>`
      + [0,1,2,3,4,5,6,7,8].map(i => `<rect class="rp-cell" x="${87+(i%3)*25}" y="${128+Math.floor(i/3)*25}" width="15" height="15" rx="3"/><rect class="rp-cell" x="${242+(i%3)*25}" y="${128+Math.floor(i/3)*25}" width="15" height="15" rx="3"/>`).join(''))
  };

  const MICROSOFT_MARK = '<span class="company-logo__mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>';
  const RAZORPAY_LOGO = 'assets/webflow/75bcb367/647795a8a42f6be079200a9a_rzp logo.png';

  function escapeAttr(value) {
    return String(value).replace(/"/g, '&quot;');
  }

  function brandHtml(project, base) {
    if (project.company === 'microsoft') {
      return `<span class="home-work__brand company-logo company-logo--microsoft" aria-label="Microsoft">${MICROSOFT_MARK}</span>`;
    }
    if (project.company === 'razorpay') {
      return `<span class="home-work__brand company-logo company-logo--razorpay" aria-label="Razorpay">`
        + `<img src="${base}${RAZORPAY_LOGO}" alt=""></span>`;
    }
    if (project.company === 'nsr') {
      return `<span class="home-work__brand company-logo company-logo--nsr" aria-label="New Sun Rising">`
        + `<span class="company-logo--nsr__sun" aria-hidden="true"><img src="${base}assets/img/projects/new-sun-rising-logo.png" width="218" height="230" alt=""></span></span>`;
    }
    return `<span class="home-work__brand home-work__wordmark">${project.companyLabel || project.mark || ''}</span>`;
  }

  function visualHtml(project, base) {
    if (project.image) {
      return `<span class="home-work__visual home-work__visual--generated" aria-hidden="true">`
        + `<img class="home-work__image" src="${base}${project.image.src}" width="${project.image.w}" height="${project.image.h}" alt="" loading="lazy">`
        + `</span>`;
    }
    if (project.poster && POSTERS[project.poster]) {
      return `<span class="home-work__visual home-work__visual--poster" aria-hidden="true">${POSTERS[project.poster]()}</span>`;
    }
    const letter = project.letter || (project.mark || '').slice(0, 2);
    return `<span class="home-work__visual home-work__visual--generated home-work__visual--letter" aria-hidden="true">`
      + `<span class="home-work__letter">${letter}</span></span>`;
  }

  function rowHtml(project, base) {
    const chips = [];
    if (project.status) chips.push(`<li class="home-work__chip--status">${project.status}</li>`);
    (project.chips || []).forEach((chip) => chips.push(`<li>${chip}</li>`));

    const casefile = Object.keys(project.casefile || {})
      .map((key) => `<div><dt>${key}</dt><dd>${project.casefile[key]}</dd></div>`)
      .join('');

    const company = project.companyLabel ? ` data-company="${escapeAttr(project.companyLabel)}"` : '';
    const index = project.index ? ` data-index="${project.index}"` : '';

    return `<li class="home-work__row home-work__row--${project.accent}" data-folder="${project.track}" data-cursor="View"${company}${index}>
              <a class="home-work__link" href="${base}${project.href}">
                ${visualHtml(project, base)}
                ${brandHtml(project, base)}
                <span class="home-work__copy">
                  <span class="voice-row">${project.lead}</span>
                </span>
                <span class="home-work__arrow" aria-hidden="true">↗</span>
              </a>
              <ul class="home-work__chips" aria-label="Methods and status">${chips.join('')}</ul>
              <dl class="home-work__casefile">${casefile}</dl>
            </li>`;
  }

  function previewPanelHtml(project, base, position, total) {
    const media = project.previewImage
      ? `<img src="${base}${project.previewImage.src}" width="${project.previewImage.w}" height="${project.previewImage.h}" alt="">`
      : (project.poster && POSTERS[project.poster] ? POSTERS[project.poster]() : '');
    const mediaClass = project.previewImage ? '' : ' home-work__preview-media--poster';
    const active = position === 1;
    return `<a class="home-work__preview-panel${active ? ' is-active' : ''}" data-preview-index="${project.index}" href="${base}${project.href}" tabindex="${active ? '0' : '-1'}" aria-hidden="${!active}"${active ? '' : ' inert'}>`
      + `<span class="home-work__preview-media${mediaClass}">${media}</span>`
      + `<span class="home-work__preview-copy"><small>${project.mark} &middot; ${project.index} / ${String(total).padStart(2, '0')}</small>`
      + `<strong>${project.blurb || project.lead}</strong></span></a>`;
  }

  function cardHtml(project, base) {
    const visual = project.cardImage
      ? `<img src="${base}${project.cardImage.src}" width="${project.cardImage.w}" height="${project.cardImage.h}" alt="" loading="lazy">`
      : project.cardPoster && CARD_POSTERS[project.cardPoster]
      ? CARD_POSTERS[project.cardPoster]()
      : project.image
      ? `<img src="${base}${project.image.src}" width="${project.image.w}" height="${project.image.h}" alt="" loading="lazy">`
      : (project.poster && POSTERS[project.poster] ? POSTERS[project.poster]() : '');
    const keywords = (project.chips || []).map((chip) => `<span>${chip}</span>`).join('');
    const style = project.cardImage || project.cardPoster ? ' style="--card-visual-bg: #eee9df"' : (project.cardBg ? ` style="--card-visual-bg: ${project.cardBg}"` : '');
    return `<a class="play-card play-card--research" href="${base}${project.href}"${style}>`
      + `<div class="play-card__visual" aria-hidden="true">${visual}</div>`
      + `<div class="play-card__body">`
      + `<span class="play-card__external">${project.status || ''}</span>`
      + `<h2>${project.title || project.mark}</h2>`
      + `<p class="play-thumb">${project.blurb || project.lead}</p>`
      + `<div class="play-keywords">${keywords}</div>`
      + `</div></a>`;
  }

  function byTrack(track, options) {
    const opts = options || {};
    const exclude = opts.exclude || [];
    return PROJECTS.filter((project) => {
      if (track && track !== 'all' && project.track !== track) return false;
      if (project.archived && !opts.includeArchived) return false;
      return exclude.indexOf(project.id) === -1;
    });
  }

  function mount(el) {
    const base = el.dataset.projectsBase || document.body.dataset.shellBase || '';
    const items = byTrack(el.dataset.track || 'all', {
      includeArchived: el.dataset.archived === 'true',
      exclude: (el.dataset.exclude || '').split(/\s+/).filter(Boolean)
    });
    el.outerHTML = items.map((project) => rowHtml(project, base)).join('\n            ');
  }

  function mountPreview(el) {
    const base = el.dataset.projectsBase || document.body.dataset.shellBase || '';
    const items = byTrack(el.dataset.track || 'all', {
      includeArchived: el.dataset.archived === 'true',
      exclude: (el.dataset.exclude || '').split(/\s+/).filter(Boolean)
    }).filter((project) => project.index);
    el.innerHTML = items
      .map((project, i) => previewPanelHtml(project, base, i + 1, items.length))
      .join('');
  }

  function mountCards(el) {
    const base = el.dataset.projectsBase || document.body.dataset.shellBase || '';
    const items = byTrack(el.dataset.track || 'all', {
      includeArchived: el.dataset.archived === 'true',
      exclude: (el.dataset.exclude || '').split(/\s+/).filter(Boolean)
    });
    el.innerHTML = items.map((project) => cardHtml(project, base)).join('');
  }

  function init() {
    Array.from(document.querySelectorAll('[data-projects-cards]')).forEach(mountCards);
    Array.from(document.querySelectorAll('[data-projects-preview]')).forEach(mountPreview);
    Array.from(document.querySelectorAll('[data-projects-mount]')).forEach(mount);
  }

  global.PortfolioProjects = { PROJECTS, byTrack, rowHtml, cardHtml, previewPanelHtml, init };
  init();
})(window);
