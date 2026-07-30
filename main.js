const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const planner = document.querySelector('#learning-planner');
const participantNumber = document.querySelector('#participant-number');
const participantRange = document.querySelector('#participant-range');
const toast = document.querySelector('[data-toast]');
const pricingTeamSize = document.querySelector('#pricing-team-size');
const pricingBauToggle = document.querySelector('#pricing-bau-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const managerEmailDialog = document.querySelector('#manager-email-dialog');
const managerEmailSubject = document.querySelector('#manager-email-subject');
const managerEmailBody = document.querySelector('#manager-email-body');
const MIN_CORPORATE_TEAM_SIZE = 4;
const merchDialog = document.querySelector('#merch-dialog');
const merchDialogImage = document.querySelector('#merch-dialog-image');
const merchOrderProduct = document.querySelector('#merch-order-product');
const merchOrderCategory = document.querySelector('#merch-order-category');
const merchOrderUnitPrice = document.querySelector('#merch-order-unit-price');
const merchColourOptions = document.querySelector('#merch-colour-options');
const merchSizeOptions = document.querySelector('#merch-size-options');
const merchQtyOutput = document.querySelector('#merch-qty');
const merchOrderTotal = document.querySelector('#merch-order-total');

const programmes = {
  executive: {
    name: 'The Data-Smart Executive',
    outcome: 'Understand the numbers in the room, challenge assumptions and know what to ask data and AI teams.',
    capacity: 12,
    protectCapacity: 8,
    basePrice: 10000,
    additionalCohort: 8000,
    learningDays: { protect: '2 focused session days', balanced: '1 focused session day', fast: '1 focused session day' },
    calendarRhythm: { protect: 'Two short leadership sessions', balanced: 'One 90-minute briefing', fast: 'One 90-minute briefing' },
    contactLabel: 'The Data-Smart Executive',
    approvalBenefits: ['help our leaders understand analytics, dashboards and AI without a long technical course', 'improve the questions we ask about KPIs, evidence and decision risk'],
    approvalGoal: 'help leadership make more confident data-informed decisions and communicate more clearly with data teams',
    format: '90 min + guided Q&A'
  },
  business: {
    name: 'Data Confidence for Business Professionals',
    outcome: 'Understand data, reports and analytics in the context of everyday business work.',
    capacity: 15,
    protectCapacity: 8,
    basePrice: 18500,
    additionalCohort: 12500,
    learningDays: { protect: '4 focused session days', balanced: '3 focused session days', fast: '2 half-days' },
    calendarRhythm: { protect: 'Short sessions spaced to protect BAU', balanced: 'Three focused sessions', fast: 'Two half-day blocks' },
    contactLabel: 'Data Confidence for Business Professionals',
    approvalBenefits: ['help business users understand reports, KPIs and analytical language', 'show people how data can support the work they already do'],
    approvalGoal: 'build practical data confidence without requiring everyone to become a technical analyst',
    format: '3 × 75 min + follow-up support'
  },
  managers: {
    name: 'Decision Intelligence for Managers',
    outcome: 'Turn KPIs, evidence and business questions into clearer management decisions.',
    capacity: 12,
    protectCapacity: 6,
    basePrice: 29500,
    additionalCohort: 19500,
    learningDays: { protect: '4 focused session days', balanced: '3 focused session days', fast: '2 half-days' },
    calendarRhythm: { protect: 'Short sessions spaced to protect BAU', balanced: 'Three focused sessions', fast: 'Two half-day blocks' },
    contactLabel: 'Decision Intelligence for Managers',
    approvalBenefits: ['improve problem framing and KPI-led performance conversations', 'help managers turn reporting into clear decisions and accountable action'],
    approvalGoal: 'make management conversations more decisive, evidence-led and action-oriented',
    format: '3 × 90 min + applied support'
  },
  storytelling: {
    name: 'Data Storytelling & Dashboard Decision Design',
    outcome: 'Build reports and stories that people understand, trust and act on.',
    capacity: 10,
    protectCapacity: 6,
    basePrice: 42500,
    additionalCohort: 27500,
    learningDays: { protect: '5 focused session days', balanced: '4 focused session days', fast: '3 focused session days' },
    calendarRhythm: { protect: 'Short sessions spaced to protect BAU', balanced: 'Four focused sessions', fast: 'Three grouped sessions' },
    contactLabel: 'Data Storytelling & Dashboard Decision Design',
    approvalBenefits: ['improve the clarity, usability and adoption of our dashboards', 'help analysts explain insight in a concise, decision-ready way'],
    approvalGoal: 'reduce reporting friction and create outputs stakeholders can understand, trust and act on',
    format: '4 × 2 hrs + dashboard review support'
  },
  powerbi: {
    name: 'Power BI Foundations',
    outcome: 'Build practical Power BI reporting skills around real business questions and useful dashboards.',
    capacity: 10,
    protectCapacity: 6,
    basePrice: 32500,
    additionalCohort: 22000,
    learningDays: { protect: '5 focused session days', balanced: '4 focused session days', fast: '3 focused session days' },
    calendarRhythm: { protect: 'Short sessions spaced to protect BAU', balanced: 'Four focused sessions', fast: 'Three grouped sessions' },
    contactLabel: 'Power BI Foundations',
    approvalBenefits: ['build practical Power BI capability around meaningful business problems', 'reduce report rework and dependence on ad-hoc support'],
    approvalGoal: 'develop reporting skills that translate into better day-to-day delivery',
    format: '4 × 2 hrs + follow-up support'
  },
  fabric: {
    name: 'Microsoft Fabric Foundations',
    outcome: 'Understand how Fabric supports modern data work and build practical confidence using its core experiences.',
    capacity: 10,
    protectCapacity: 6,
    basePrice: 32500,
    additionalCohort: 22000,
    learningDays: { protect: '5 focused session days', balanced: '4 focused session days', fast: '3 focused session days' },
    calendarRhythm: { protect: 'Short sessions spaced to protect BAU', balanced: 'Four focused sessions', fast: 'Three grouped sessions' },
    contactLabel: 'Microsoft Fabric Foundations',
    approvalBenefits: ['help our team understand where Microsoft Fabric fits and how its core experiences work together', 'build a shared foundation before making larger technical or platform decisions'],
    approvalGoal: 'create practical Fabric understanding without overwhelming learners with unnecessary technical depth',
    format: '4 × 2 hrs + follow-up support'
  }
};

const individualCourses = {
  analytics: { name: 'Analytics Foundations for Everyone', price: 1250, format: '2 × 90-minute live sessions', benefits: ['understand what data analytics is and the business questions it can answer', 'build a strong foundation without needing a technical background'] },
  role: { name: 'Data Confidence for Your Role', price: 1500, format: '2 × 90-minute sessions plus follow-up support', benefits: ['understand how data can support my current role', 'read reports and KPIs with more confidence and ask better questions'] },
  visualisation: { name: 'Visualisation Fundamentals', price: 1250, format: '2 × 90-minute live sessions', benefits: ['choose clearer charts and avoid misleading visuals', 'make business information easier for others to understand'] },
  story: { name: 'Data Storytelling Foundations', price: 1750, format: '3 × 90-minute sessions plus follow-up support', benefits: ['turn numbers into a clear message', 'explain context and recommend the next action with confidence'] }
};


const merchProducts = {
  hoodie: {
    name: 'Notabot Core Hoodie',
    category: 'Outer layer',
    price: 749,
    image: 'assets/images/merch/core-hoodie.webp',
    colours: ['White', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
  },
  longsleeve: {
    name: 'Notabot Signal Long Sleeve',
    category: 'Everyday essential',
    price: 449,
    image: 'assets/images/merch/signal-long-sleeve.webp',
    colours: ['Black', 'White'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
  },
  cap: {
    name: 'Notabot Studio Cap',
    category: 'Daily signal',
    price: 299,
    image: 'assets/images/merch/performance-flatlay.webp',
    colours: ['Black'],
    sizes: ['Adjustable']
  },
  performance: {
    name: 'Notabot Flow Performance Hoodie',
    category: 'Movement layer',
    price: 649,
    image: 'assets/images/merch/flow-performance.webp',
    colours: ['Graphite'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
  },
  bundle: {
    name: 'The Field Kit Bundle',
    category: 'Best-value bundle',
    price: 1299,
    image: 'assets/images/merch/field-kit-bundle.webp',
    colours: ['Light kit', 'Dark kit'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
  }
};

let selectedMerchKey = 'hoodie';
let selectedMerchColour = 'White';
let selectedMerchSize = 'M';
let selectedMerchQty = 1;

const supportOptions = {
  core: { price: 0, label: 'Follow-up support included' },
  readout: { price: 7500, label: 'Leadership summary' },
  continuity: { price: 15000, label: '30-day team support' }
};

const impactOptions = {
  later: { label: 'Choose during the scope call', shortLabel: 'Choose later' },
  youth: { label: 'Youth education', shortLabel: 'Youth education' },
  digital: { label: 'Digital inclusion', shortLabel: 'Digital inclusion' },
  women: { label: 'Women in technology', shortLabel: 'Women in technology' },
  employment: { label: 'Employment readiness', shortLabel: 'Employment readiness' },
  nominate: { label: 'A verified organisation nominated by the client', shortLabel: 'Nominate a verified organisation' }
};

const IMPACT_RATE = 0.02;
const IMPACT_CAP = 5000;

const money = {
  format(value) {
    return `R${Math.round(value).toLocaleString('en-US')}`;
  }
};

function selectedValue(name) {
  return planner?.querySelector(`input[name="${name}"]:checked`)?.value;
}

function clampParticipants(value) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return 10;
  return Math.min(40, Math.max(MIN_CORPORATE_TEAM_SIZE, parsed));
}

function splitCohorts(total, count) {
  const base = Math.floor(total / count);
  const remainder = total % count;
  return Array.from({ length: count }, (_, index) => base + (index < remainder ? 1 : 0));
}

function calculateProgrammeEstimate(programmeKey, participants, bau = 'balanced', support = 'core', impact = 'later') {
  const programme = programmes[programmeKey];
  const safeParticipants = clampParticipants(participants);
  const cohortCapacity = bau === 'protect' ? programme.protectCapacity : programme.capacity;
  const cohorts = safeParticipants <= 5 ? 1 : Math.ceil(safeParticipants / cohortCapacity);
  const cohortSizes = splitCohorts(safeParticipants, cohorts);
  const maxAway = Math.max(...cohortSizes);

  // Corporate programmes are priced per cohort, not per person.
  // The advertised base price is always the minimum programme fee;
  // additional cohort fees apply only when the chosen structure requires more groups.
  let price = programme.basePrice + Math.max(0, cohorts - 1) * programme.additionalCohort;
  price += supportOptions[support]?.price || 0;
  const impactAmount = Math.min(IMPACT_CAP, Math.round(price * IMPACT_RATE));

  return {
    programmeKey,
    programme,
    bau,
    participants: safeParticipants,
    support,
    impact,
    impactAmount,
    impactLabel: impactOptions[impact]?.label || impactOptions.later.label,
    cohorts,
    cohortSizes,
    maxAway,
    learningDays: programme.learningDays[bau],
    calendarRhythm: programme.calendarRhythm[bau],
    price,
    perPerson: Math.round(price / safeParticipants)
  };
}

function getPlan() {
  const programmeKey = selectedValue('programme') || 'business';
  const bau = selectedValue('bau') || 'protect';
  const participants = clampParticipants(participantNumber?.value || 10);
  const support = selectedValue('support') || 'core';
  const impact = selectedValue('impact') || 'later';
  return calculateProgrammeEstimate(programmeKey, participants, bau, support, impact);
}

function cohortDescription(plan) {
  if (plan.cohorts === 1) return `${plan.programmeKey === 'executive' ? '1 leadership group' : '1 group'} of ${plan.participants}`;
  const equal = plan.cohortSizes.every(size => size === plan.cohortSizes[0]);
  if (equal) return `${plan.cohorts} groups of ${plan.cohortSizes[0]}`;
  return `${plan.cohorts} groups · ${plan.cohortSizes.join(' + ')}`;
}

function planSummary(plan) {
  return [
    plan.programme.name,
    `${plan.participants} participants`,
    cohortDescription(plan),
    `Maximum ${plan.maxAway} away from BAU at once`,
    `Live learning days: ${plan.learningDays}`,
    `Suggested rhythm: ${plan.calendarRhythm}`, 
    `Estimated investment: ${money.format(plan.price)}`,
    `Effective investment: ${money.format(plan.perPerson)} per person`,
    `Support: ${supportOptions[plan.support].label}`,
    `Notabot impact contribution: approximately ${money.format(plan.impactAmount)} to ${plan.impactLabel}`
  ].join(' | ');
}

function managerEmailContent(plan) {
  const programme = plan.programme;
  const benefits = programme.approvalBenefits || [programme.outcome];
  const subject = `Approval request — ${programme.name} for our team`;
  const rhythm = plan.calendarRhythm.charAt(0).toLowerCase() + plan.calendarRhythm.slice(1);
  const support = supportOptions[plan.support].label;
  const body = [
    'Hi [Manager’s name],',
    '',
    `I’d like to request approval for the ${programme.name} programme for ${plan.participants} members of our team.`,
    '',
    'I believe this is worth considering because it would help us:',
    `• ${benefits[0]}.`,
    `• ${benefits[1]}.`,
    `• ${programme.approvalGoal}.`,
    '',
    'The delivery model is designed to protect BAU rather than remove the full team at once:',
    `• ${cohortDescription(plan)}.`,
    `• A maximum of ${plan.maxAway} ${plan.maxAway === 1 ? 'person is' : 'people are'} away from BAU at one time.`,
    `• ${plan.learningDays}; ${rhythm}.`,
    `• Support included: ${support}.`,
    '',
    `The estimated programme fee is ${money.format(plan.price)} in total. This is priced per cohort rather than multiplied per person; at the selected team size it works out to approximately ${money.format(plan.perPerson)} per participant. Final pricing would be confirmed after a short scope call.`,
    '',
    `The programme also includes Notabot’s 2% Impact Commitment. Based on this estimate, Notabot would fund an approximate ${money.format(plan.impactAmount)} contribution to ${plan.impactLabel.toLowerCase()}, provide transparent proof of payment and issue an Impact Certificate. This is included in the programme fee and is not an additional charge.`,
    '',
    'May I arrange a short conversation with Notabot to validate the fit, delivery dates, impact preference and final scope before we make a commitment?',
    '',
    'Regards,',
    '[Your name]'
  ].join('\n');
  return { subject, body };
}

function updateManagerEmail(plan = getPlan()) {
  const content = managerEmailContent(plan);
  if (managerEmailSubject) managerEmailSubject.value = content.subject;
  if (managerEmailBody) managerEmailBody.value = content.body;
  return content;
}

function updateSelectedCard(programmeKey) {
  document.querySelectorAll('[data-programme-card]').forEach(card => {
    card.classList.toggle('selected-programme', card.dataset.programmeCard === programmeKey);
  });
}

function updatePricingCards() {
  if (!pricingTeamSize) return;
  const participants = clampParticipants(pricingTeamSize.value);
  const bau = pricingBauToggle?.checked ? 'protect' : 'balanced';

  Object.keys(programmes).forEach(programmeKey => {
    const estimate = calculateProgrammeEstimate(programmeKey, participants, bau, 'core', 'later');
    const priceElement = document.querySelector(`[data-programme-price="${programmeKey}"]`);
    const personElement = document.querySelector(`[data-programme-per-person="${programmeKey}"]`);
    const cohortsElement = document.querySelector(`[data-programme-cohorts="${programmeKey}"]`);

    if (priceElement) priceElement.textContent = money.format(estimate.price);
    if (personElement) personElement.textContent = `${money.format(estimate.perPerson)} per person`;
    if (cohortsElement) cohortsElement.textContent = `${cohortDescription(estimate)} · ${estimate.programme.format}`;
  });
}

function updatePlan() {
  if (!planner) return;
  const plan = getPlan();
  participantNumber.value = String(plan.participants);
  participantRange.value = String(plan.participants);

  document.querySelector('#result-title').textContent = plan.programme.name;
  document.querySelector('#result-outcome').textContent = plan.programme.outcome;
  document.querySelector('#result-participants').textContent = String(plan.participants);
  document.querySelector('#result-cohorts').textContent = cohortDescription(plan);
  document.querySelector('#result-bau').textContent = `${plan.maxAway} ${plan.maxAway === 1 ? 'person' : 'people'}`;
  document.querySelector('#result-window').textContent = plan.learningDays;
  const daysNote = document.querySelector('#result-days-note');
  if (daysNote) daysNote.textContent = `${plan.calendarRhythm}. Each learning day is a focused session, not a full day away from BAU.`;
  document.querySelector('#result-price').textContent = money.format(plan.price);
  document.querySelector('#result-per-person').textContent = `${money.format(plan.perPerson)} per participant`;
  const priceNote = document.querySelector('#result-price-note');
  if (priceNote) priceNote.textContent = plan.cohorts === 1
    ? `One cohort programme fee. The per-participant figure is shown only to help compare value.`
    : `${plan.cohorts} cohorts are required for the selected BAU structure. The per-participant figure is shown only to help compare value.`;

  const impactAmount = document.querySelector('#result-impact');
  const impactCause = document.querySelector('#result-impact-cause');
  if (impactAmount) impactAmount.textContent = money.format(plan.impactAmount);
  if (impactCause) impactCause.textContent = plan.impactLabel;

  const impactExampleAmount = document.querySelector('#impact-example-amount');
  const impactExampleProgramme = document.querySelector('#impact-example-programme');
  const impactExampleCause = document.querySelector('#impact-example-cause');
  if (impactExampleAmount) impactExampleAmount.textContent = money.format(plan.impactAmount);
  if (impactExampleProgramme) impactExampleProgramme.textContent = plan.programme.name;
  if (impactExampleCause) impactExampleCause.textContent = impactOptions[plan.impact]?.shortLabel || impactOptions.later.shortLabel;

  const includes = document.querySelector('#result-includes');
  const items = ['Role-based live facilitation', 'Applied business exercises', 'Participant toolkit and follow-up support', 'Digital completion badge', '2% Notabot-funded impact contribution'];
  if (plan.support === 'readout') items.push('Leadership summary');
  if (plan.support === 'continuity') items.push('30-day team support');
  includes.innerHTML = items.map(item => `<li>${item}</li>`).join('');

  const contactNeed = document.querySelector('#contact-need');
  const matchingOption = [...contactNeed.options].find(option => option.textContent === plan.programme.contactLabel);
  if (matchingOption) contactNeed.value = matchingOption.value;

  const impactSelect = document.querySelector('#contact-impact');
  if (impactSelect) impactSelect.value = plan.impact;

  const teamSize = document.querySelector('input[name="teamSize"]');
  if (teamSize) teamSize.value = String(plan.participants);

  const hiddenSummary = document.querySelector('#plan-summary-field');
  if (hiddenSummary) hiddenSummary.value = planSummary(plan);

  updateManagerEmail(plan);
  updateSelectedCard(plan.programmeKey);
}

function selectProgramme(programmeKey) {
  const radio = planner?.querySelector(`input[name="programme"][value="${programmeKey}"]`);
  if (radio) radio.checked = true;
  markPlannerStep(1);
  if (pricingTeamSize && participantNumber) participantNumber.value = pricingTeamSize.value;
  if (pricingBauToggle) {
    const bauRadio = planner?.querySelector(`input[name="bau"][value="${pricingBauToggle.checked ? 'protect' : 'balanced'}"]`);
    if (bauRadio) bauRadio.checked = true;
  }
  updatePlan();
  document.querySelector('#planner')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2200);
}

function initNavigation() {
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 18);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? (window.scrollY / max) * 100 : 0;
    document.querySelector('[data-scroll-progress]')?.style.setProperty('width', `${value}%`);
  }, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = mobileMenu?.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(Boolean(open)));
  });
  mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));
}

function initReveal() {
  if (reducedMotion) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

function initManifesto() {
  const panels = [...document.querySelectorAll('[data-question-panel]')];
  const jumps = [...document.querySelectorAll('[data-question-jump]')];
  const counter = document.querySelector('[data-question-count]');
  if (!panels.length) return;

  const setActive = index => {
    const safeIndex = Math.max(0, Math.min(panels.length - 1, index));
    panels.forEach((panel, panelIndex) => {
      const active = panelIndex === safeIndex;
      panel.classList.toggle('active', active);
      panel.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    jumps.forEach((button, buttonIndex) => {
      const active = buttonIndex === safeIndex;
      button.classList.toggle('active', active);
      button.setAttribute('aria-current', active ? 'true' : 'false');
      button.setAttribute('aria-selected', active ? 'true' : 'false');
      button.tabIndex = active ? 0 : -1;
    });
    if (counter) counter.textContent = `${String(safeIndex + 1).padStart(2, '0')} / ${String(panels.length).padStart(2, '0')}`;
  };

  jumps.forEach((button, index) => {
    button.setAttribute('role', 'tab');
    button.addEventListener('click', () => setActive(index));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === 'ArrowLeft') next = (index - 1 + jumps.length) % jumps.length;
      if (event.key === 'ArrowRight') next = (index + 1) % jumps.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = jumps.length - 1;
      setActive(next);
      jumps[next]?.focus();
    });
  });

  setActive(0);
}

function initDecisionDemo() {
  const demo = document.querySelector('[data-decision-demo]');
  if (!demo) return;
  const tabs = [...demo.querySelectorAll('[data-demo-step]')];
  const panels = [...demo.querySelectorAll('[data-demo-panel]')];
  const back = demo.querySelector('[data-demo-back]');
  const next = demo.querySelector('[data-demo-next]');
  const counter = demo.querySelector('[data-demo-counter]');
  const stageLabel = demo.querySelector('[data-demo-stage-label]');
  const kpi = demo.querySelector('[data-demo-kpi]');
  const kpiLabel = demo.querySelector('[data-demo-kpi-label]');
  const evidence = demo.querySelector('[data-demo-evidence]');
  const visual = demo.querySelector('.analytics-case-visual');
  const copy = demo.querySelector('.analytics-story-copy');
  let current = 0;

  const states = [
    { stage:'Alert received', kpi:'−12%', label:'Friday revenue', evidence:['Demand?','Data quality?','Operations?'], next:'Investigate the drop →' },
    { stage:'Evidence checked', kpi:'3', label:'clues investigated', evidence:['Traffic steady','Orders steady','One region'], next:'Follow the evidence →' },
    { stage:'Cause found', kpi:'1', label:'dispatch delay', evidence:['Demand healthy','Cut-off missed','Backlog growing'], next:'Make the decision →' },
    { stage:'Action chosen', kpi:'✓', label:'right problem fixed', evidence:['Clear backlog','Protect demand','Track recovery'], next:'Replay the case ↺' }
  ];

  const render = index => {
    current = Math.max(0, Math.min(states.length - 1, index));
    const state = states[current];
    tabs.forEach((tab, i) => {
      const active = i === current;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel, i) => {
      const active = i === current;
      panel.hidden = !active;
      panel.classList.toggle('active', active);
    });
    if (counter) counter.textContent = `Part ${current + 1} of ${states.length}`;
    if (stageLabel) stageLabel.textContent = state.stage;
    if (kpi) kpi.textContent = state.kpi;
    if (kpiLabel) kpiLabel.textContent = state.label;
    if (evidence) evidence.innerHTML = state.evidence.map(item => `<span class="${current ? 'confirmed' : ''}">${item}</span>`).join('');
    if (back) back.disabled = current === 0;
    if (next) next.textContent = state.next;
    demo.dataset.demoState = String(current);
  };

  const update = index => {
    const safe = index < 0 ? 0 : index >= states.length ? 0 : index;
    if (!reducedMotion && window.gsap && copy && visual) {
      window.gsap.to([copy, visual], {opacity:.28, y:8, duration:.16, ease:'power1.out', onComplete:() => {
        render(safe);
        window.gsap.fromTo([visual, copy], {opacity:.35, y:12}, {opacity:1, y:0, duration:.42, stagger:.05, ease:'power3.out'});
      }});
    } else render(safe);
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => update(index));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      update(nextIndex);
      tabs[nextIndex]?.focus();
    });
  });
  back?.addEventListener('click', () => update(current - 1));
  next?.addEventListener('click', () => update(current + 1));
  render(0);
}

function initGsapEnhancements() {
  if (reducedMotion || !window.gsap) return;
  const { gsap } = window;
  if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

  gsap.from('.hero-copy .eyebrow, .hero-lead, .hero-actions, .hero-action-note', {
    opacity: 0,
    y: 22,
    duration: .7,
    stagger: .09,
    delay: .15,
    ease: 'power3.out',
    clearProps: 'transform,opacity'
  });
  gsap.from('.hero-orbit', {
    opacity: 0,
    scale: .92,
    duration: 1.05,
    delay: .25,
    ease: 'power3.out',
    clearProps: 'transform,opacity'
  });

  if (!window.ScrollTrigger) return;
  gsap.utils.toArray('.v16-reveal').forEach(element => {
    gsap.from(element, {
      opacity: 0,
      y: 34,
      duration: .75,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: { trigger: element, start: 'top 86%', once: true }
    });
  });
}

function initParallax() {
  if (reducedMotion) return;
  const items = [...document.querySelectorAll('[data-parallax]')];
  if (!items.length) return;
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    items.forEach(item => {
      const speed = Number(item.dataset.parallax || 0);
      const rect = item.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;
      item.style.transform = `translate3d(0, ${y * speed}px, 0)`;
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

function initMagnetic() {
  if (reducedMotion || window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll('.magnetic').forEach(element => {
    element.addEventListener('mousemove', event => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate(${x * .12}px, ${y * .12}px)`;
    });
    element.addEventListener('mouseleave', () => { element.style.transform = ''; });
  });
}

function initTilt() {
  if (reducedMotion || window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', event => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateY = (px - .5) * 7;
      const rotateX = (.5 - py) * 7;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const dot = document.querySelector('[data-cursor-dot]');
  const ring = document.querySelector('[data-cursor-ring]');
  if (!dot || !ring) return;
  let tx = 0, ty = 0, rx = 0, ry = 0;
  window.addEventListener('mousemove', event => {
    tx = event.clientX; ty = event.clientY;
    dot.style.left = `${tx}px`; dot.style.top = `${ty}px`;
    document.body.classList.add('cursor-ready');
  });
  const animate = () => {
    rx += (tx - rx) * .16; ry += (ty - ry) * .16;
    ring.style.left = `${rx}px`; ring.style.top = `${ry}px`;
    requestAnimationFrame(animate);
  };
  animate();
  document.querySelectorAll('a,button,select,input,textarea,.tilt-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

function initMethodRail() {
  const rail = document.querySelector('[data-method-rail]');
  if (!rail || window.matchMedia('(pointer: coarse)').matches) return;
  rail.addEventListener('wheel', event => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      rail.scrollLeft += event.deltaY * .8;
      event.preventDefault();
    }
  }, { passive: false });
}

function initDataCore() {
  const canvas = document.querySelector('#data-core');
  const hero = document.querySelector('.hero');
  if (!canvas || !hero || reducedMotion || window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 720) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  let width = 0, height = 0, dpr = 1;
  let pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
  let time = 0;
  const points = [];
  const count = window.innerWidth < 700 ? 240 : 520;

  function fibonacciSphere(index, total) {
    const phi = Math.acos(1 - 2 * (index + .5) / total);
    const theta = Math.PI * (1 + Math.sqrt(5)) * index;
    return {
      x: Math.cos(theta) * Math.sin(phi),
      y: Math.sin(theta) * Math.sin(phi),
      z: Math.cos(phi),
      phase: Math.random() * Math.PI * 2,
      size: .55 + Math.random() * 1.35
    };
  }
  for (let i = 0; i < count; i += 1) points.push(fibonacciSphere(i, count));

  function resize() {
    const rect = hero.getBoundingClientRect();
    width = rect.width; height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);
  hero.addEventListener('pointermove', event => {
    const rect = hero.getBoundingClientRect();
    targetX = ((event.clientX - rect.left) / rect.width - .5) * .75;
    targetY = ((event.clientY - rect.top) / rect.height - .5) * .55;
  });
  hero.addEventListener('pointerleave', () => { targetX = 0; targetY = 0; });

  function rotate(point, ax, ay) {
    let { x, y, z } = point;
    const cy = Math.cos(ay), sy = Math.sin(ay);
    const cx = Math.cos(ax), sx = Math.sin(ax);
    const x1 = x * cy - z * sy;
    const z1 = x * sy + z * cy;
    const y1 = y * cx - z1 * sx;
    const z2 = y * sx + z1 * cx;
    return { x: x1, y: y1, z: z2 };
  }

  function draw() {
    time += .0045;
    pointerX += (targetX - pointerX) * .035;
    pointerY += (targetY - pointerY) * .035;
    ctx.clearRect(0, 0, width, height);

    const centerX = width * (window.innerWidth < 900 ? .5 : .75);
    const centerY = height * (window.innerWidth < 900 ? .66 : .48);
    const radius = Math.min(width, height) * (window.innerWidth < 900 ? .23 : .27);
    const rotationY = time + pointerX;
    const rotationX = -.17 + pointerY;

    const projected = points.map((p, index) => {
      const wobble = 1 + Math.sin(time * 2.2 + p.phase) * .018;
      const r = rotate({ x: p.x * wobble, y: p.y * wobble, z: p.z * wobble }, rotationX, rotationY);
      const perspective = 1.15 / (2.15 - r.z);
      return {
        index,
        x: centerX + r.x * radius * perspective,
        y: centerY + r.y * radius * perspective,
        z: r.z,
        alpha: .12 + (r.z + 1) * .36,
        size: p.size * (.7 + perspective * .9)
      };
    }).sort((a, b) => a.z - b.z);

    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < projected.length; i += 1) {
      const p = projected[i];
      const hue = p.z > .25 ? '121,226,220' : p.z > -.2 ? '121,191,255' : '111,130,255';
      ctx.beginPath();
      ctx.fillStyle = `rgba(${hue},${Math.max(.05, p.alpha)})`;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      if (i % 9 === 0 && i + 1 < projected.length) {
        const q = projected[i + 1];
        const dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist < 42) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(121,191,255,${.07 * p.alpha})`;
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    }
    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(draw);
  }
  draw();
}

function openManagerDialog(content) {
  if (managerEmailSubject) managerEmailSubject.value = content.subject;
  if (managerEmailBody) managerEmailBody.value = content.body;
  if (typeof managerEmailDialog?.showModal === 'function') managerEmailDialog.showModal();
  else managerEmailDialog?.setAttribute('open', '');
  window.setTimeout(() => managerEmailSubject?.focus(), 80);
}

function individualManagerEmail(courseKey) {
  const course = individualCourses[courseKey];
  return {
    subject: `Approval request — ${course.name}`,
    body: [
      'Hi [Manager’s name],',
      '',
      `I’d like to request approval to attend ${course.name}.`,
      '',
      'The course is designed for non-technical professionals and would help me:',
      `• ${course.benefits[0]}.`,
      `• ${course.benefits[1]}.`,
      '• apply the learning directly in my current role.',
      '',
      `The format is ${course.format}. The estimated investment is ${money.format(course.price)} per person.`,
      '',
      'May I register my interest and confirm the next available public cohort with Notabot?',
      '',
      'Regards,',
      '[Your name]'
    ].join('\n')
  };
}

function setPricingTeamSize(value) {
  if (!pricingTeamSize) return;
  pricingTeamSize.value = String(clampParticipants(value));
  document.querySelectorAll('[data-team-size]').forEach(button => {
    button.classList.toggle('active', Number(button.dataset.teamSize) === Number(pricingTeamSize.value));
  });
  updatePricingCards();
}

function initPlanner() {
  planner?.addEventListener('change', updatePlan);
  participantRange?.addEventListener('input', event => {
    participantNumber.value = String(clampParticipants(event.target.value));
    updatePlan();
  });
  participantNumber?.addEventListener('input', event => {
    const value = clampParticipants(event.target.value);
    participantRange.value = String(value);
    updatePlan();
  });
  participantNumber?.addEventListener('blur', updatePlan);
  document.querySelector('[data-decrement]')?.addEventListener('click', () => {
    participantNumber.value = String(clampParticipants(Number(participantNumber.value) - 1));
    updatePlan();
  });
  document.querySelector('[data-increment]')?.addEventListener('click', () => {
    participantNumber.value = String(clampParticipants(Number(participantNumber.value) + 1));
    updatePlan();
  });
  pricingTeamSize?.addEventListener('input', () => setPricingTeamSize(pricingTeamSize.value));
  document.querySelector('[data-pricing-decrement]')?.addEventListener('click', () => setPricingTeamSize(Number(pricingTeamSize.value) - 1));
  document.querySelector('[data-pricing-increment]')?.addEventListener('click', () => setPricingTeamSize(Number(pricingTeamSize.value) + 1));
  document.querySelectorAll('[data-team-size]').forEach(button => button.addEventListener('click', () => setPricingTeamSize(button.dataset.teamSize)));
  pricingBauToggle?.addEventListener('change', updatePricingCards);
  document.querySelectorAll('.estimate-button').forEach(button => {
    button.addEventListener('click', () => selectProgramme(button.dataset.programme));
  });
  document.querySelectorAll('.individual-interest').forEach(button => {
    button.addEventListener('click', () => {
      const course = individualCourses[button.dataset.course];
      const need = document.querySelector('#contact-need');
      if (need) need.value = course.name === 'Data Confidence for Your Role' ? 'Data Confidence for Your Role — Individual' : course.name;
      const audience = document.querySelector('select[name="audience"]');
      if (audience) audience.value = 'Individual learner';
      const size = document.querySelector('input[name="teamSize"]');
      if (size) size.value = '1';
      document.querySelector('#contact')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  });
  document.querySelectorAll('[data-individual-approval]').forEach(button => {
    button.addEventListener('click', () => openManagerDialog(individualManagerEmail(button.dataset.individualApproval)));
  });
  document.querySelector('#copy-plan')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(planSummary(getPlan()));
      showToast('Plan summary copied.');
    } catch {
      showToast('Copy unavailable in this browser.');
    }
  });

  document.querySelector('#open-manager-email')?.addEventListener('click', () => openManagerDialog(managerEmailContent(getPlan())));
  document.querySelector('#close-manager-email')?.addEventListener('click', () => managerEmailDialog?.close());
  managerEmailDialog?.addEventListener('click', event => {
    if (event.target === managerEmailDialog) managerEmailDialog.close();
  });
  document.querySelector('#copy-manager-email')?.addEventListener('click', async () => {
    const content = `${managerEmailSubject?.value || ''}

${managerEmailBody?.value || ''}`.trim();
    try {
      await navigator.clipboard.writeText(content);
      showToast('Manager motivation email copied.');
    } catch {
      showToast('Copy unavailable in this browser.');
    }
  });
  document.querySelector('#open-manager-mail')?.addEventListener('click', () => {
    const subject = managerEmailSubject?.value || managerEmailContent(getPlan()).subject;
    const body = managerEmailBody?.value || managerEmailContent(getPlan()).body;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}


function merchChoiceButtons(container, values, selected, onSelect) {
  if (!container) return;
  container.innerHTML = '';
  values.forEach(value => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = value;
    button.classList.toggle('active', value === selected);
    button.setAttribute('aria-pressed', String(value === selected));
    button.addEventListener('click', () => {
      onSelect(value);
      [...container.children].forEach(child => {
        const active = child.textContent === value;
        child.classList.toggle('active', active);
        child.setAttribute('aria-pressed', String(active));
      });
    });
    container.appendChild(button);
  });
}

function merchOrderSummary() {
  const product = merchProducts[selectedMerchKey];
  const name = document.querySelector('#merch-name')?.value?.trim() || '[Your name]';
  const email = document.querySelector('#merch-email')?.value?.trim() || 'Not provided';
  const location = document.querySelector('#merch-location')?.value?.trim() || 'To be confirmed';
  const total = product.price * selectedMerchQty;
  return {
    subject: `Notabot merch preorder — ${product.name}`,
    body: [
      'Hi Notabot Studio,',
      '',
      `I would like to reserve the following item from the Notabot Field Kit:`,
      '',
      `Product: ${product.name}`,
      `Colour: ${selectedMerchColour}`,
      `Size: ${selectedMerchSize}`,
      `Quantity: ${selectedMerchQty}`,
      `Estimated merchandise total: ${money.format(total)}`,
      `Delivery city / area: ${location}`,
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      'I understand that stock, garment details, delivery cost and the final delivery date will be confirmed before payment.',
      '',
      'Thanks'
    ].join('\n')
  };
}

function updateMerchTotal() {
  const product = merchProducts[selectedMerchKey];
  if (merchQtyOutput) merchQtyOutput.textContent = String(selectedMerchQty);
  if (merchOrderTotal) merchOrderTotal.textContent = money.format(product.price * selectedMerchQty);
}

function openMerchDialog(productKey) {
  const product = merchProducts[productKey] || merchProducts.hoodie;
  selectedMerchKey = productKey in merchProducts ? productKey : 'hoodie';
  selectedMerchColour = product.colours[0];
  selectedMerchSize = product.sizes.includes('M') ? 'M' : product.sizes[0];
  selectedMerchQty = 1;

  if (merchDialogImage) {
    merchDialogImage.src = product.image;
    merchDialogImage.alt = product.name;
  }
  if (merchOrderProduct) merchOrderProduct.textContent = product.name;
  if (merchOrderCategory) merchOrderCategory.textContent = product.category;
  if (merchOrderUnitPrice) merchOrderUnitPrice.textContent = `${money.format(product.price)} each`;

  merchChoiceButtons(merchColourOptions, product.colours, selectedMerchColour, value => {
    selectedMerchColour = value;
  });
  merchChoiceButtons(merchSizeOptions, product.sizes, selectedMerchSize, value => {
    selectedMerchSize = value;
  });
  updateMerchTotal();

  if (typeof merchDialog?.showModal === 'function') merchDialog.showModal();
  else merchDialog?.setAttribute('open', '');
  window.setTimeout(() => merchColourOptions?.querySelector('button')?.focus(), 80);
}

function initMerch() {
  document.querySelectorAll('[data-merch-product]').forEach(button => {
    button.addEventListener('click', () => openMerchDialog(button.dataset.merchProduct));
  });

  document.querySelector('#close-merch-dialog')?.addEventListener('click', () => merchDialog?.close());
  merchDialog?.addEventListener('click', event => {
    if (event.target === merchDialog) merchDialog.close();
  });

  document.querySelector('#merch-qty-minus')?.addEventListener('click', () => {
    selectedMerchQty = Math.max(1, selectedMerchQty - 1);
    updateMerchTotal();
  });
  document.querySelector('#merch-qty-plus')?.addEventListener('click', () => {
    selectedMerchQty = Math.min(20, selectedMerchQty + 1);
    updateMerchTotal();
  });

  document.querySelector('#merch-copy-order')?.addEventListener('click', async () => {
    const content = merchOrderSummary();
    try {
      await navigator.clipboard.writeText(`${content.subject}\n\n${content.body}`);
      showToast('Merch preorder request copied.');
    } catch {
      showToast('Copy unavailable in this browser.');
    }
  });

  document.querySelector('#merch-email-order')?.addEventListener('click', () => {
    const content = merchOrderSummary();
    window.location.href = `mailto:hello@notabot.studio?subject=${encodeURIComponent(content.subject)}&body=${encodeURIComponent(content.body)}`;
  });
}


function initContactForm() {
  const form = document.querySelector('#contact-form');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = `Notabot learning plan enquiry — ${data.get('organisation') || data.get('name')}`;
    const body = [
      `Name: ${data.get('name')}`,
      `Work email: ${data.get('email')}`,
      `Organisation: ${data.get('organisation')}`,
      `Role: ${data.get('role') || 'Not provided'}`,
      `Audience: ${data.get('audience')}`,
      `Team size: ${data.get('teamSize')}`,
      `Capability need: ${data.get('need')}`,
      `Preferred impact cause: ${data.get('impactCause') || 'Choose during the scope call'}`,
      '',
      'What needs to improve:',
      `${data.get('message') || 'Not provided'}`,
      '',
      'Learning-plan estimate:',
      `${data.get('planSummary') || planSummary(getPlan())}`
    ].join('\n');
    window.location.href = `mailto:hello@notabot.studio?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}


const plannerTouchedSteps = new Set();
let plannerQuestCelebrated = false;

const confidenceLevels = [
  { max: 25, name: 'Data Explorer', kicker: 'Foundation badge unlocked', message: 'You are at a strong starting point. The next step is learning the language of data and building confidence with everyday examples.' },
  { max: 50, name: 'Confident Questioner', kicker: 'Questioning badge unlocked', message: 'You already look for context. The next step is becoming more consistent when challenging numbers, reports and AI-generated answers.' },
  { max: 75, name: 'Insight Interpreter', kicker: 'Interpretation badge unlocked', message: 'You can see the signal. The next step is connecting evidence to causes, decisions and clearer communication.' },
  { max: 100, name: 'Decision Builder', kicker: 'Decision badge unlocked', message: 'You already think beyond the number. The next step is sharpening the way you influence action, tell the story and guide others.' }
];

const confidenceRecommendations = {
  executive: { type: 'programme', key: 'executive', name: 'The Data-Smart Executive', reason: 'A focused route to understanding analytics, KPIs, dashboards and AI without a long technical course.' },
  business: { type: 'programme', key: 'business', name: 'Data Confidence for Your Role', reason: 'Plain-language learning linked to the work you already do.' },
  managers: { type: 'programme', key: 'managers', name: 'Decision Intelligence for Managers', reason: 'Build stronger KPI conversations, problem framing and action-oriented decisions.' },
  storytelling: { type: 'programme', key: 'storytelling', name: 'Data Storytelling & Decision Design', reason: 'Turn analysis into reports and stories that people understand, trust and act on.' },
  powerbi: { type: 'programme', key: 'powerbi', name: 'Power BI Foundations', reason: 'Build practical reporting and dashboard skills around real business questions.' },
  fabric: { type: 'programme', key: 'fabric', name: 'Microsoft Fabric Foundations', reason: 'Understand how the platform fits together without unnecessary technical overload.' }
};

function triggerConfetti(originX = window.innerWidth / 2, pieces = 34) {
  if (reducedMotion) return;
  const palette = ['#79e2dc', '#6f82ff', '#79bfff', '#f6df70', '#91e5b2'];
  for (let index = 0; index < pieces; index += 1) {
    const piece = document.createElement('i');
    piece.className = 'confetti-piece';
    const x = Math.max(12, Math.min(window.innerWidth - 12, originX + (Math.random() - .5) * 260));
    piece.style.left = `${x}px`;
    piece.style.setProperty('--piece-color', palette[index % palette.length]);
    piece.style.setProperty('--drift', `${(Math.random() - .5) * 320}px`);
    piece.style.setProperty('--spin', `${Math.round((Math.random() * 900) + 360)}deg`);
    piece.style.setProperty('--duration', `${1.25 + Math.random() * .75}s`);
    piece.style.animationDelay = `${Math.random() * .18}s`;
    piece.style.width = `${5 + Math.random() * 6}px`;
    piece.style.height = `${8 + Math.random() * 10}px`;
    document.body.appendChild(piece);
    window.setTimeout(() => piece.remove(), 2400);
  }
}

function getIndividualRecommendation(score) {
  if (score <= 25) return { type: 'individual', key: 'analytics', name: 'Analytics Foundations for Everyone', reason: 'Start with the language of data, the questions analytics answers and simple business examples.' };
  if (score <= 50) return { type: 'individual', key: 'role', name: 'Data Confidence for Your Role', reason: 'Apply data thinking to the job you already do and become more confident with reports and KPIs.' };
  if (score <= 75) return { type: 'individual', key: 'visualisation', name: 'Visualisation Fundamentals', reason: 'Strengthen the way you read, choose and explain charts and business information.' };
  return { type: 'individual', key: 'story', name: 'Data Storytelling Foundations', reason: 'Build on your judgement by shaping clear messages, context and recommendations.' };
}

function confidenceResult(role, score) {
  const level = confidenceLevels.find(item => score <= item.max) || confidenceLevels.at(-1);
  const recommendation = role === 'individual' ? getIndividualRecommendation(score) : (confidenceRecommendations[role] || confidenceRecommendations.business);
  return { role, score, level, recommendation };
}

function saveConfidencePassport(result) {
  try { localStorage.setItem('notabotConfidencePassport', JSON.stringify(result)); } catch { /* storage is optional */ }
}

function loadConfidencePassport() {
  try {
    const saved = localStorage.getItem('notabotConfidencePassport');
    return saved ? JSON.parse(saved) : null;
  } catch { return null; }
}

function renderConfidencePassport(result, restored = false) {
  if (!result) return;
  const score = Number(result.score) || 0;
  const level = result.level || confidenceLevels.find(item => score <= item.max) || confidenceLevels[0];
  const recommendation = result.recommendation || (result.role === 'individual' ? getIndividualRecommendation(score) : confidenceRecommendations[result.role]) || confidenceRecommendations.business;
  const ring = document.querySelector('#passport-score-ring');
  const status = document.querySelector('#passport-status');
  const resultBox = document.querySelector('#passport-result');
  if (ring) ring.style.setProperty('--score', String(score));
  const scoreElement = document.querySelector('#passport-score');
  if (scoreElement) scoreElement.textContent = String(score);
  const kicker = document.querySelector('#passport-badge-kicker');
  const title = document.querySelector('#passport-level');
  const message = document.querySelector('#passport-message');
  const programme = document.querySelector('#passport-programme');
  const reason = document.querySelector('#passport-reason');
  if (kicker) kicker.textContent = level.kicker;
  if (title) title.textContent = level.name;
  if (message) message.textContent = level.message;
  if (programme) programme.textContent = recommendation.name;
  if (reason) reason.textContent = recommendation.reason;
  if (status) { status.textContent = restored ? 'Saved passport' : 'Path unlocked'; status.classList.add('unlocked'); }
  document.querySelector('[data-passport-achievement="role"]')?.classList.add('unlocked');
  document.querySelector('[data-passport-achievement="judgement"]')?.classList.add('unlocked');
  document.querySelector('[data-passport-achievement="path"]')?.classList.add('unlocked');
  if (resultBox) resultBox.hidden = false;
  document.querySelector('.confidence-passport')?.classList.add('completed');
  result.recommendation = recommendation;
  result.level = level;
  document.querySelector('#use-passport-path')?.setAttribute('data-result-type', recommendation.type);
  document.querySelector('#use-passport-path')?.setAttribute('data-result-key', recommendation.key);
}

function initConfidenceGame() {
  const game = document.querySelector('#confidence-game');
  if (!game) return;
  const steps = [...game.querySelectorAll('[data-game-step]')];
  const next = document.querySelector('#game-next');
  const back = document.querySelector('#game-back');
  const progressLabel = document.querySelector('#game-progress-label');
  const progressFill = document.querySelector('#game-progress-fill');
  const selectionStatus = document.querySelector('#game-selection-status');
  const challengeCard = document.querySelector('#confidence-game-card');
  let current = 0;

  steps.forEach(step => { step.tabIndex = -1; });
  const selectedInStep = step => step.querySelector('input:checked');
  const answeredScenarios = () => ['gameQ1','gameQ2','gameQ3'].filter(name => game.querySelector(`input[name="${name}"]:checked`)).length;

  const setAchievementStates = (completed = false) => {
    const roleItem = document.querySelector('[data-passport-achievement="role"]');
    const judgementItem = document.querySelector('[data-passport-achievement="judgement"]');
    const pathItem = document.querySelector('[data-passport-achievement="path"]');
    const roleChosen = Boolean(game.querySelector('input[name="gameRole"]:checked'));
    const scenarios = answeredScenarios();

    [roleItem, judgementItem, pathItem].forEach(item => item?.classList.remove('current', 'upcoming', 'unlocked'));
    if (completed) {
      roleItem?.classList.add('unlocked');
      judgementItem?.classList.add('unlocked');
      pathItem?.classList.add('unlocked');
      return;
    }
    if (roleChosen) roleItem?.classList.add('unlocked');
    else roleItem?.classList.add('current');

    if (!roleChosen) judgementItem?.classList.add('upcoming');
    else if (scenarios >= 2) judgementItem?.classList.add('unlocked');
    else judgementItem?.classList.add('current');

    pathItem?.classList.add('upcoming');
  };

  const updateSelectionStatus = (hasSelection, error = false) => {
    if (!selectionStatus) return;
    selectionStatus.classList.toggle('ready', hasSelection && !error);
    selectionStatus.classList.toggle('error', error);
    const icon = selectionStatus.querySelector('span');
    const copy = selectionStatus.querySelector('strong');
    if (error) {
      if (icon) icon.textContent = '!';
      if (copy) copy.textContent = 'Choose one answer before continuing';
    } else if (hasSelection) {
      if (icon) icon.textContent = '✓';
      if (copy) copy.textContent = 'Selection confirmed — continue when ready';
    } else {
      if (icon) icon.textContent = '○';
      if (copy) copy.textContent = 'Select one answer to continue';
    }
  };

  const updateGameView = ({ moveFocus = false } = {}) => {
    steps.forEach((step, index) => step.classList.toggle('active', index === current));
    if (progressLabel) progressLabel.textContent = `Step ${current + 1} of ${steps.length}`;
    if (progressFill) progressFill.style.width = `${((current + 1) / steps.length) * 100}%`;
    if (back) back.disabled = current === 0;
    if (next) next.innerHTML = current === steps.length - 1 ? 'Unlock my result <span aria-hidden="true">✦</span>' : 'Continue <span aria-hidden="true">→</span>';

    const hasSelection = Boolean(selectedInStep(steps[current]));
    if (next) {
      next.disabled = !hasSelection;
      next.setAttribute('aria-disabled', String(!hasSelection));
    }
    updateSelectionStatus(hasSelection);
    setAchievementStates(false);

    if (moveFocus) {
      challengeCard?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      window.setTimeout(() => steps[current]?.focus({ preventScroll: true }), reducedMotion ? 0 : 350);
    }
  };

  game.addEventListener('change', event => {
    const step = event.target.closest('[data-game-step]');
    if (!step) return;
    const hasSelection = Boolean(selectedInStep(step));
    if (step === steps[current] && next) {
      next.disabled = !hasSelection;
      next.setAttribute('aria-disabled', String(!hasSelection));
      updateSelectionStatus(hasSelection);
      if (hasSelection && selectionStatus) {
        const rect = selectionStatus.getBoundingClientRect();
        if (rect.bottom > window.innerHeight - 84 || rect.top < 90) {
          window.setTimeout(() => selectionStatus.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' }), 80);
        }
      }
    }
    setAchievementStates(false);
  });

  next?.addEventListener('click', () => {
    if (!selectedInStep(steps[current])) {
      updateSelectionStatus(false, true);
      steps[current].querySelector('input')?.focus();
      return;
    }
    if (current < steps.length - 1) {
      current += 1;
      updateGameView({ moveFocus: true });
      return;
    }
    const role = game.querySelector('input[name="gameRole"]:checked')?.value || 'business';
    const rawScore = ['gameQ1','gameQ2','gameQ3'].reduce((total, name) => total + Number(game.querySelector(`input[name="${name}"]:checked`)?.value || 0), 0);
    const score = Math.round((rawScore / 9) * 100);
    const result = confidenceResult(role, score);
    saveConfidencePassport(result);
    renderConfidencePassport(result);
    setAchievementStates(true);
    if (selectionStatus) {
      selectionStatus.classList.add('ready');
      selectionStatus.querySelector('span').textContent = '✓';
      selectionStatus.querySelector('strong').textContent = 'Challenge complete — your learning path is ready';
    }
    if (next) { next.disabled = true; next.setAttribute('aria-disabled', 'true'); next.innerHTML = 'Result unlocked <span aria-hidden="true">✓</span>'; }
    triggerConfetti(document.querySelector('.confidence-passport')?.getBoundingClientRect().left || window.innerWidth / 2, 42);
    showToast(`${result.level.name} badge unlocked.`);
    document.querySelector('.confidence-passport')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  });

  back?.addEventListener('click', () => {
    if (current > 0) {
      current -= 1;
      updateGameView({ moveFocus: true });
    }
  });

  document.querySelector('#restart-confidence-game')?.addEventListener('click', () => {
    game.reset();
    current = 0;
    document.querySelector('#passport-result').hidden = true;
    document.querySelector('.confidence-passport')?.classList.remove('completed');
    document.querySelector('#passport-score-ring')?.style.setProperty('--score', '0');
    document.querySelector('#passport-score').textContent = '—';
    document.querySelector('#passport-badge-kicker').textContent = 'Your badge is waiting';
    document.querySelector('#passport-level').textContent = 'Complete the challenge';
    document.querySelector('#passport-message').textContent = 'Answer four quick steps to unlock a positive starting level and a learning path matched to your role.';
    const status = document.querySelector('#passport-status');
    if (status) { status.textContent = 'Not started'; status.classList.remove('unlocked'); }
    if (next) next.disabled = true;
    try { localStorage.removeItem('notabotConfidencePassport'); } catch { /* optional */ }
    updateGameView({ moveFocus: true });
  });

  document.querySelector('#use-passport-path')?.addEventListener('click', event => {
    const type = event.currentTarget.dataset.resultType;
    const key = event.currentTarget.dataset.resultKey;
    document.querySelectorAll('.path-recommended').forEach(item => item.classList.remove('path-recommended'));
    if (type === 'programme') {
      const target = document.querySelector(`[data-programme-card="${key}"]`);
      if (target) {
        selectProgramme(key);
        target.classList.add('path-recommended');
      } else {
        window.location.href = `organisations.html?recommend=${encodeURIComponent(key)}#programmes`;
      }
    } else {
      const target = document.querySelector(`[data-course-card="${key}"]`);
      if (target) {
        target.classList.add('path-recommended');
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center', inline: 'center' });
      } else {
        window.location.href = `individuals.html?recommend=${encodeURIComponent(key)}#individuals`;
      }
    }
  });

  document.querySelector('#copy-passport-result')?.addEventListener('click', async () => {
    const saved = loadConfidencePassport();
    if (!saved) return;
    const recommendation = saved.recommendation || confidenceRecommendations[saved.role] || getIndividualRecommendation(saved.score);
    const text = `My Notabot Data Confidence result: ${saved.level?.name || 'Confidence path'} — ${saved.score}/100. Recommended next step: ${recommendation.name}. ${recommendation.reason}`;
    try { await navigator.clipboard.writeText(text); showToast('Confidence result copied.'); }
    catch { showToast('Copy unavailable in this browser.'); }
  });

  const saved = loadConfidencePassport();
  if (saved) renderConfidencePassport(saved, true);
  updateGameView();
  if (saved) setAchievementStates(true);
}

function updatePlannerQuest() {
  const total = 5;
  const count = plannerTouchedSteps.size;
  const percentage = (count / total) * 100;
  const label = document.querySelector('#planner-progress-label');
  const fill = document.querySelector('#planner-progress-fill');
  const pill = document.querySelector('#plan-unlock-pill');
  if (label) label.textContent = count === total ? 'Learning plan unlocked' : `${count} of ${total} choices confirmed`;
  if (fill) fill.style.width = `${percentage}%`;
  document.querySelectorAll('[data-plan-dot]').forEach(dot => dot.classList.toggle('complete', Number(dot.dataset.planDot) <= count));
  if (pill) {
    pill.textContent = count === total ? 'Plan unlocked' : 'Live estimate';
    pill.classList.toggle('unlocked', count === total);
  }
  try { localStorage.setItem('notabotPlannerQuest', JSON.stringify([...plannerTouchedSteps])); } catch { /* optional */ }
  if (count === total && !plannerQuestCelebrated) {
    plannerQuestCelebrated = true;
    const rect = document.querySelector('.planner-form')?.getBoundingClientRect();
    triggerConfetti(rect ? rect.left + rect.width / 2 : window.innerWidth / 2, 30);
    showToast('Learning plan unlocked.');
  }
}

function markPlannerStep(step) {
  const safe = Number(step);
  if (!safe || safe < 1 || safe > 5) return;
  plannerTouchedSteps.add(safe);
  updatePlannerQuest();
}

function initPlannerQuest() {
  if (!planner) return;
  try {
    const stored = JSON.parse(localStorage.getItem('notabotPlannerQuest') || '[]');
    stored.forEach(mark => plannerTouchedSteps.add(Number(mark)));
  } catch { /* optional */ }
  const fieldsets = [...planner.querySelectorAll('fieldset')];
  fieldsets.forEach((fieldset, index) => {
    const step = index + 1;
    fieldset.dataset.planStep = String(step);
    fieldset.addEventListener('change', () => markPlannerStep(step));
    fieldset.addEventListener('input', event => {
      if (event.target.matches('input[type="range"],input[type="number"]')) markPlannerStep(step);
    });
  });
  document.querySelector('[data-decrement]')?.addEventListener('click', () => markPlannerStep(2));
  document.querySelector('[data-increment]')?.addEventListener('click', () => markPlannerStep(2));
  document.querySelector('#request-plan')?.addEventListener('click', () => {
    if (plannerTouchedSteps.size === 5) triggerConfetti(window.innerWidth * .72, 24);
  });
  updatePlannerQuest();
}

function init() {
  requestAnimationFrame(() => document.body.classList.add('loaded'));
  document.querySelectorAll('[data-year]').forEach(element => { element.textContent = String(new Date().getFullYear()); });
  initNavigation();
  initReveal();
  initGsapEnhancements();
  initDecisionDemo();
  initParallax();
  initMagnetic();
  initTilt();
  initCursor();
  initMethodRail();
  initDataCore();
  initConfidenceGame();
  initPlanner();
  initPlannerQuest();
  initMerch();
  initContactForm();
  const mobileCta = document.querySelector('[data-mobile-cta]');
  const ctaBlockingSections = [...document.querySelectorAll('#top,#how-it-works,#audience-paths,#confidence-challenge,#programmes,#tools,#individuals,#merch,#planner,#impact,#contact')];
  if (mobileCta && 'IntersectionObserver' in window) {
    const visibleBlockingSections = new Set();
    const mobileObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visibleBlockingSections.add(entry.target);
        else visibleBlockingSections.delete(entry.target);
      });
      mobileCta.classList.toggle('hidden', visibleBlockingSections.size > 0);
    }, { threshold: .08 });
    ctaBlockingSections.forEach(section => mobileObserver.observe(section));
  }
  const params = new URLSearchParams(window.location.search);
  const requestedProgramme = params.get('programme');
  if (planner && requestedProgramme && programmes[requestedProgramme]) {
    const radio = planner.querySelector(`input[name="programme"][value="${requestedProgramme}"]`);
    if (radio) radio.checked = true;
  }
  const requestedIndividual = params.get('individual');
  if (requestedIndividual && individualCourses[requestedIndividual]) {
    const need = document.querySelector('#contact-need');
    if (need) {
      const course = individualCourses[requestedIndividual];
      need.value = course.name === 'Data Confidence for Your Role' ? 'Data Confidence for Your Role — Individual' : course.name;
    }
  }
  const recommendedKey = params.get('recommend');
  if (recommendedKey) {
    const recommendedCard = document.querySelector(`[data-programme-card="${recommendedKey}"], [data-course-card="${recommendedKey}"]`);
    if (recommendedCard) {
      recommendedCard.classList.add('path-recommended');

      // The quiz recommendation receives the premium visual treatment.
      // No programme is permanently favoured before the visitor completes the challenge.
      if (recommendedCard.classList.contains('programme-plan')) {
        document.querySelectorAll('.programme-plan-recommended').forEach(card => card.classList.remove('programme-plan-recommended'));
        recommendedCard.classList.add('programme-plan-recommended');

        const topline = recommendedCard.querySelector('.plan-topline');
        if (topline && !topline.querySelector('.recommendation-tag')) {
          const tag = document.createElement('b');
          tag.className = 'recommendation-tag';
          tag.textContent = 'Your match';
          tag.setAttribute('aria-label', 'Recommended for you');
          topline.appendChild(tag);
        }
      }

      window.setTimeout(() => recommendedCard.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center', inline: 'center' }), 260);
    }
  }
  updatePricingCards();
  updatePlan();
}

init();


// V17: restrained GSAP choreography for static information cards.
window.addEventListener('load', () => {
  if (!window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const gsap = window.gsap;
  if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
  const animateGroup = (selector) => {
    const items = gsap.utils.toArray(selector);
    if (!items.length) return;
    gsap.from(items, {
      y: 34,
      opacity: 0,
      duration: .72,
      stagger: .09,
      ease: 'power3.out',
      scrollTrigger: window.ScrollTrigger ? {trigger: items[0].parentElement, start: 'top 82%', once: true} : undefined
    });
  };
    animateGroup('.tool-training-grid .tool-training-card');
  animateGroup('.home-outcomes article');
  animateGroup('.subpage-proof span');
  if (document.body.classList.contains('merch-page')) {
    gsap.from('.merch-page-hero h1, .merch-page-hero p, .merch-page-hero .button', {y: 28, opacity: 0, duration: .8, stagger: .11, ease: 'power3.out'});
    gsap.to('.merch-page-orbit', {rotation: 360, duration: 36, repeat: -1, ease: 'none'});
  }
});
