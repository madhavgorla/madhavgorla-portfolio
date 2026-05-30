// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (!link) return;
    if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// Scroll reveal
const reveals = document.querySelectorAll('.project-card, .skill-col, .timeline-card, .cert-card, .stat, .info-box');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('reveal', 'visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 4 * 0.08) + 's';
  revealObs.observe(el);
});

// Contact form — EmailJS
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('.send-btn');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  status.textContent = '';

  emailjs.sendForm('service_py3a34g', 'template_n9dxs3f', form)
    .then(() => {
      status.textContent = '✅ Message sent! I will get back to you soon.';
      status.className = 'form-status success';
      form.reset();
      setTimeout(() => { status.textContent = ''; }, 5000);
    })
    .catch((error) => {
      status.textContent = '❌ Failed to send. Please try again or email me directly.';
      status.className = 'form-status error';
      console.error('EmailJS error:', error);
    })
    .finally(() => {
      btn.textContent = 'SEND MESSAGE';
      btn.disabled = false;
    });
});
