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
  const items = ['Role-based live facilitation', 'Applied business exercises', 'Participant toolkit and follow-up support', '2% Notabot-funded impact contribution'];
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

function init() {
  requestAnimationFrame(() => document.body.classList.add('loaded'));
  document.querySelectorAll('[data-year]').forEach(element => { element.textContent = String(new Date().getFullYear()); });
  initNavigation();
  initReveal();
  initManifesto();
  initParallax();
  initMagnetic();
  initTilt();
  initCursor();
  initMethodRail();
  initDataCore();
  initPlanner();
  initContactForm();
  const mobileCta = document.querySelector('[data-mobile-cta]');
  const ctaBlockingSections = [...document.querySelectorAll('#top,#programmes,#tools,#individuals,#planner,#impact,#contact')];
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
  updatePricingCards();
  updatePlan();
}

init();
