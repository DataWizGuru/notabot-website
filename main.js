const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const planner = document.querySelector('#learning-planner');
const participantNumber = document.querySelector('#participant-number');
const participantRange = document.querySelector('#participant-range');
const supportLevel = document.querySelector('#support-level');
const toast = document.querySelector('[data-toast]');
const pricingTeamSize = document.querySelector('#pricing-team-size');
const pricingBauToggle = document.querySelector('#pricing-bau-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const managerEmailDialog = document.querySelector('#manager-email-dialog');
const managerEmailSubject = document.querySelector('#manager-email-subject');
const managerEmailBody = document.querySelector('#manager-email-body');

const programmes = {
  confidence: {
    name: 'Data Confidence & AI Judgement',
    outcome: 'Build stronger data confidence and AI judgement across business teams.',
    capacity: 15,
    protectCapacity: 8,
    smallPrice: 18500,
    basePrice: 22500,
    additionalCohort: 14000,
    learningDays: { protect: '4 session days / cohort', balanced: '3 delivery days / cohort', fast: '2 half-days / cohort' },
    calendarRhythm: { protect: 'Usually spaced across 3–4 calendar weeks', balanced: 'Usually spaced across 2–3 calendar weeks', fast: 'Usually completed within 1–2 calendar weeks' },
    contactLabel: 'Data Confidence & AI Judgement',
    approvalBenefits: ['improve how we interpret KPIs, dashboards and business evidence', 'strengthen critical judgement when using AI-generated analysis'],
    approvalGoal: 'make more confident, evidence-led decisions without requiring everyone to become a technical analyst',
    format: '3 × 75 min + clinic'
  },
  managers: {
    name: 'Decision Intelligence for Managers',
    outcome: 'Turn KPIs, evidence and business questions into clearer management decisions.',
    capacity: 12,
    protectCapacity: 6,
    smallPrice: 29500,
    basePrice: 34500,
    additionalCohort: 22500,
    learningDays: { protect: '4 session days / cohort', balanced: '3 delivery days / cohort', fast: '2 half-days / cohort' },
    calendarRhythm: { protect: 'Usually spaced across 3–4 calendar weeks', balanced: 'Usually spaced across 2–3 calendar weeks', fast: 'Usually completed within 1–2 calendar weeks' },
    contactLabel: 'Decision Intelligence for Managers',
    approvalBenefits: ['improve problem framing and KPI-led performance conversations', 'help managers convert reporting into clear decisions and accountable action'],
    approvalGoal: 'make management conversations more decisive, evidence-led and action-oriented',
    format: '3 × 90 min + clinic'
  },
  storytelling: {
    name: 'Data Storytelling & Dashboard Decision Design',
    outcome: 'Build reports and stories that people understand, trust and act on.',
    capacity: 10,
    protectCapacity: 6,
    smallPrice: 42500,
    basePrice: 49500,
    additionalCohort: 31000,
    learningDays: { protect: '5 session days / cohort', balanced: '4 delivery days / cohort', fast: '3 delivery days / cohort' },
    calendarRhythm: { protect: 'Usually spaced across 4–5 calendar weeks', balanced: 'Usually spaced across 3–4 calendar weeks', fast: 'Usually completed within 2 calendar weeks' },
    contactLabel: 'Data Storytelling & Dashboard Decision Design',
    approvalBenefits: ['improve the clarity, usability and adoption of our dashboards', 'help analysts communicate insight in a concise, decision-ready way'],
    approvalGoal: 'reduce reporting friction and create outputs that stakeholders can understand, trust and act on',
    format: '4 × 2 hrs + clinic'
  },
  powerbi: {
    name: 'Power BI with Purpose',
    outcome: 'Build practical Power BI capability around real business questions and reports.',
    capacity: 10,
    protectCapacity: 6,
    smallPrice: 47500,
    basePrice: 54500,
    additionalCohort: 34000,
    learningDays: { protect: '6 session days / cohort', balanced: '5 delivery days / cohort', fast: '3 delivery days / cohort' },
    calendarRhythm: { protect: 'Usually spaced across 5–6 calendar weeks', balanced: 'Usually spaced across 4–5 calendar weeks', fast: 'Usually completed within 2–3 calendar weeks' },
    contactLabel: 'Power BI with Purpose',
    approvalBenefits: ['build applied Power BI capability around meaningful business problems', 'reduce report rework and dependence on ad-hoc support'],
    approvalGoal: 'develop practical reporting capability that translates directly into better day-to-day delivery',
    format: '5 × 2 hrs + clinic'
  }
};

const supportOptions = {
  core: { price: 0, label: 'Core programme + clinic' },
  readout: { price: 7500, label: 'Leadership readout' },
  continuity: { price: 15000, label: '30-day capability continuity' }
};

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
  if (Number.isNaN(parsed)) return 4;
  return Math.min(40, Math.max(4, parsed));
}

function splitCohorts(total, count) {
  const base = Math.floor(total / count);
  const remainder = total % count;
  return Array.from({ length: count }, (_, index) => base + (index < remainder ? 1 : 0));
}

function calculateProgrammeEstimate(programmeKey, participants, bau = 'balanced', support = 'core') {
  const programme = programmes[programmeKey];
  const safeParticipants = clampParticipants(participants);
  const cohortCapacity = bau === 'protect' ? programme.protectCapacity : programme.capacity;
  const cohorts = safeParticipants <= 5 ? 1 : Math.ceil(safeParticipants / cohortCapacity);
  const cohortSizes = splitCohorts(safeParticipants, cohorts);
  const maxAway = Math.max(...cohortSizes);

  let price = safeParticipants <= 5
    ? programme.smallPrice
    : programme.basePrice + Math.max(0, cohorts - 1) * programme.additionalCohort;
  price += supportOptions[support]?.price || 0;

  return {
    programmeKey,
    programme,
    bau,
    participants: safeParticipants,
    support,
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
  const programmeKey = selectedValue('programme') || 'confidence';
  const bau = selectedValue('bau') || 'protect';
  const participants = clampParticipants(participantNumber?.value || 12);
  const support = supportLevel?.value || 'core';
  return calculateProgrammeEstimate(programmeKey, participants, bau, support);
}

function cohortDescription(plan) {
  if (plan.cohorts === 1) return `1 cohort of ${plan.participants}`;
  const equal = plan.cohortSizes.every(size => size === plan.cohortSizes[0]);
  if (equal) return `${plan.cohorts} × ${plan.cohortSizes[0]}`;
  return `${plan.cohorts} cohorts · ${plan.cohortSizes.join(' + ')}`;
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
    `Support: ${supportOptions[plan.support].label}`
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
    `The estimated investment is ${money.format(plan.price)} in total, equivalent to approximately ${money.format(plan.perPerson)} per participant. Final pricing would be confirmed after a short scope call.`,
    '',
    'May I arrange a short conversation with Notabot to validate the fit, delivery dates and final scope before we make a commitment?',
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
    const estimate = calculateProgrammeEstimate(programmeKey, participants, bau, 'core');
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
  document.querySelector('#result-per-person').textContent = `${money.format(plan.perPerson)} per person`;

  const includes = document.querySelector('#result-includes');
  const items = ['Role-based live facilitation', 'Applied business exercises', 'Participant toolkit and clinic'];
  if (plan.support === 'readout') items.push('Leadership readout');
  if (plan.support === 'continuity') items.push('30-day capability continuity');
  includes.innerHTML = items.map(item => `<li>${item}</li>`).join('');

  const contactNeed = document.querySelector('#contact-need');
  const matchingOption = [...contactNeed.options].find(option => option.textContent === plan.programme.contactLabel);
  if (matchingOption) contactNeed.value = matchingOption.value;

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
  const section = document.querySelector('.questions');
  const panels = [...document.querySelectorAll('[data-question-panel]')];
  const jumps = [...document.querySelectorAll('[data-question-jump]')];
  const counter = document.querySelector('[data-question-count]');
  if (!section || !panels.length) return;

  const setActive = index => {
    const safeIndex = Math.max(0, Math.min(panels.length - 1, index));
    panels.forEach((panel, panelIndex) => panel.classList.toggle('active', panelIndex === safeIndex));
    jumps.forEach((button, buttonIndex) => {
      const active = buttonIndex === safeIndex;
      button.classList.toggle('active', active);
      button.setAttribute('aria-current', active ? 'step' : 'false');
    });
    if (counter) counter.textContent = `${String(safeIndex + 1).padStart(2, '0')} / ${String(panels.length).padStart(2, '0')}`;
  };

  const update = () => {
    if (window.matchMedia('(max-width: 640px)').matches || reducedMotion) {
      setActive(0);
      return;
    }
    const rect = section.getBoundingClientRect();
    const scrollable = section.offsetHeight - window.innerHeight;
    const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, scrollable)));
    const index = Math.min(panels.length - 1, Math.floor(progress * panels.length));
    setActive(index);
  };

  jumps.forEach(button => button.addEventListener('click', () => {
    const targetIndex = Number(button.dataset.questionJump || 0);
    const scrollable = Math.max(0, section.offsetHeight - window.innerHeight);
    const ratio = panels.length > 1 ? targetIndex / (panels.length - 1) : 0;
    const top = window.scrollY + section.getBoundingClientRect().top + (scrollable * ratio);
    window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
    setActive(targetIndex);
  }));

  setActive(0);
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
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
  if (!canvas || !hero || reducedMotion) return;
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
  pricingTeamSize?.addEventListener('change', updatePricingCards);
  pricingBauToggle?.addEventListener('change', updatePricingCards);
  document.querySelectorAll('.estimate-button').forEach(button => {
    button.addEventListener('click', () => selectProgramme(button.dataset.programme));
  });
  document.querySelector('#copy-plan')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(planSummary(getPlan()));
      showToast('Plan summary copied.');
    } catch {
      showToast('Copy unavailable in this browser.');
    }
  });

  document.querySelector('#open-manager-email')?.addEventListener('click', () => {
    updateManagerEmail(getPlan());
    if (typeof managerEmailDialog?.showModal === 'function') managerEmailDialog.showModal();
    else managerEmailDialog?.setAttribute('open', '');
    window.setTimeout(() => managerEmailSubject?.focus(), 80);
  });
  document.querySelector('#close-manager-email')?.addEventListener('click', () => managerEmailDialog?.close());
  managerEmailDialog?.addEventListener('click', event => {
    if (event.target === managerEmailDialog) managerEmailDialog.close();
  });
  document.querySelector('#copy-manager-email')?.addEventListener('click', async () => {
    const content = `${managerEmailSubject?.value || ''}\n\n${managerEmailBody?.value || ''}`.trim();
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
  updatePricingCards();
  updatePlan();
}

init();
