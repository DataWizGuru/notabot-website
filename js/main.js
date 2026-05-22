const menuToggle = document.querySelector('[data-menu-toggle]');
const navLinks = document.querySelector('[data-nav-links]');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    document.body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const quoteForm = document.querySelector('[data-quote-form]');
if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(quoteForm);
    const name = encodeURIComponent(form.get('name') || '');
    const email = encodeURIComponent(form.get('email') || '');
    const service = encodeURIComponent(form.get('service') || '');
    const message = encodeURIComponent(form.get('message') || '');
    const subject = `Notabot enquiry from ${name || 'website visitor'}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AService: ${service}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    window.location.href = `mailto:hello@notabot.studio?subject=${subject}&body=${body}`;
  });
}


// Fluent-style interactive tilt for the hero surface. It is subtle and disabled on touch/reduced motion.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (!prefersReducedMotion && canHover) {
  document.querySelectorAll('[data-tilt-card]').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = -((y / rect.height) - 0.5) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  });
}

// Add a compact scrolled state to make navigation feel more app-like.
const header = document.querySelector('.header');
const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });
