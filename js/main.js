/**
 * KADARON CONSTRUCTION — main.js
 * Navigation, mobile menu, scroll effects, project lightbox, form validation
 */

(function () {
  'use strict';

  /* ============================================================
     UTILITY
  ============================================================ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ============================================================
     COPYRIGHT YEAR
  ============================================================ */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============================================================
     NAVIGATION — sticky + scrolled state
  ============================================================ */
  const nav = $('#nav');

  function updateNav() {
    if (!nav) return;
    const atTop = window.scrollY < 60;
    nav.classList.toggle('nav--scrolled', !atTop);
  }

  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  /* ============================================================
     SMOOTH SCROLL — nav links + any href="#..."
  ============================================================ */
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const target = $(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = nav ? nav.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top, behavior: 'smooth' });
    // Close mobile menu if open
    closeMobileMenu();
  });

  /* ============================================================
     MOBILE MENU
  ============================================================ */
  const burger     = $('#navBurger');
  const mobileMenu = $('#mobileMenu');
  const mobileClose = $('#mobileClose');

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    burger && burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    mobileClose && mobileClose.focus();
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    burger && burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    burger && burger.focus();
  }

  burger && burger.addEventListener('click', openMobileMenu);
  mobileClose && mobileClose.addEventListener('click', closeMobileMenu);

  // Trap focus in mobile menu
  mobileMenu && mobileMenu.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileMenu();
  });

  /* ============================================================
     SCROLL REVEAL
  ============================================================ */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced) {
    const revealEls = $$('.about__inner, .services__header, .service-card, .projects__header, .project-item, .process__step, .why__item, .contact__info, .contact__form-wrap, .statement__content, .cta-band__inner');

    revealEls.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ============================================================
     PROJECT LIGHTBOX
  ============================================================ */
  const lightbox        = $('#lightbox');
  const lightboxBackdrop = $('#lightboxBackdrop');
  const lightboxClose   = $('#lightboxClose');
  const lightboxImg     = $('#lightboxImg');
  const lightboxTitle   = $('#lightboxTitle');
  const lightboxCat     = $('#lightboxCat');
  const lightboxDesc    = $('#lightboxDesc');
  const lightboxPrev    = $('#lightboxPrev');
  const lightboxNext    = $('#lightboxNext');

  let projectItems = [];
  let currentProjectIdx = -1;

  function buildProjectData() {
    projectItems = $$('.project-item').map(el => ({
      title: el.dataset.title || '',
      cat:   el.dataset.cat   || '',
      desc:  el.dataset.desc  || '',
      img:   el.querySelector('.project-item__img')?.src || '',
      alt:   el.querySelector('.project-item__img')?.alt || '',
    }));
  }

  function openLightbox(idx) {
    if (!lightbox || idx < 0 || idx >= projectItems.length) return;
    currentProjectIdx = idx;
    const p = projectItems[idx];

    lightboxImg.src   = p.img;
    lightboxImg.alt   = p.alt;
    lightboxTitle.textContent = p.title;
    lightboxCat.textContent   = p.cat;
    lightboxDesc.textContent  = p.desc;

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lightboxClose && lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Return focus to the triggering item
    const items = $$('.project-item');
    if (items[currentProjectIdx]) items[currentProjectIdx].focus();
  }

  function navigateProject(dir) {
    const next = currentProjectIdx + dir;
    if (next >= 0 && next < projectItems.length) {
      openLightbox(next);
    }
  }

  buildProjectData();

  $$('.project-item').forEach((el, idx) => {
    el.addEventListener('click', () => openLightbox(idx));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  lightboxClose    && lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop && lightboxBackdrop.addEventListener('click', closeLightbox);
  lightboxPrev     && lightboxPrev.addEventListener('click', () => navigateProject(-1));
  lightboxNext     && lightboxNext.addEventListener('click', () => navigateProject(1));

  lightbox && lightbox.addEventListener('keydown', (e) => {
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   navigateProject(-1);
    if (e.key === 'ArrowRight')  navigateProject(1);
  });

  /* ============================================================
     CONTACT FORM — frontend validation
    ============================================================
    NOTE: This form is currently frontend-only (static GitHub Pages).
    To enable email submissions, add one of these integrations:

    OPTION A — Formspree (easiest):
      1. Sign up at https://formspree.io
      2. Create a new form and get your endpoint URL
      3. Set: form.action = "https://formspree.io/f/YOUR_ID"
      4. Replace the fetch() call below with a standard form POST:
         form.method = "POST"

    OPTION B — EmailJS (no backend needed):
      1. Sign up at https://emailjs.com
      2. Create a service, template, and get your keys
      3. Include EmailJS SDK: <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js">
      4. Call emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY') here

    OPTION C — Netlify Forms:
      1. Deploy on Netlify
      2. Add `netlify` attribute to the <form> tag
      3. Remove the JS submit handler below
  ============================================================ */
  const contactForm = $('#contactForm');
  const formSuccess = $('#formSuccess');
  const formSubmit  = $('#formSubmit');

  const validators = {
    fname:  { el: $('#fname'),  err: $('#fname-error'),  check: v => v.trim().length >= 2,  msg: 'Please enter your full name.' },
    femail: { el: $('#femail'), err: $('#femail-error'), check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Please enter a valid email address.' },
    ftype:  { el: $('#ftype'),  err: $('#ftype-error'),  check: v => v !== '',              msg: 'Please select a project type.' },
    fmsg:   { el: $('#fmsg'),   err: $('#fmsg-error'),   check: v => v.trim().length >= 20, msg: 'Please provide at least 20 characters describing your project.' },
  };

  function validateField(key) {
    const v = validators[key];
    if (!v.el || !v.err) return true;
    const val = v.el.value;
    const valid = v.check(val);
    v.el.classList.toggle('is-error', !valid);
    v.err.textContent = valid ? '' : v.msg;
    return valid;
  }

  // Live validation on blur
  Object.keys(validators).forEach(key => {
    const el = validators[key].el;
    if (el) {
      el.addEventListener('blur', () => validateField(key));
      el.addEventListener('input', () => {
        if (el.classList.contains('is-error')) validateField(key);
      });
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Validate all fields
      const valid = Object.keys(validators).map(validateField).every(Boolean);
      if (!valid) {
        // Focus the first error
        const firstError = contactForm.querySelector('.is-error');
        if (firstError) firstError.focus();
        return;
      }

      // Disable submit while processing
      if (formSubmit) {
        formSubmit.disabled = true;
        formSubmit.textContent = 'Sending…';
      }

      /*
        ---- INTEGRATION POINT ----
        Replace this simulated response with your chosen backend call.
        Examples:

        // Formspree:
        fetch('https://formspree.io/f/YOUR_ID', {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' },
        }).then(r => r.ok ? showSuccess() : showError())
          .catch(showError);

        // EmailJS:
        emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', contactForm, 'PUBLIC_KEY')
          .then(showSuccess, showError);
      */

      // Temporary: simulate network request (remove when integrating real backend)
      setTimeout(() => {
        showFormSuccess();
      }, 1200);
    });
  }

  function showFormSuccess() {
    if (formSuccess) {
      formSuccess.hidden = false;
    }
    if (formSubmit) {
      formSubmit.disabled = false;
      formSubmit.textContent = 'Send Project Request';
    }
    contactForm && contactForm.reset();
  }

  /* ============================================================
     ACTIVE NAV LINK — highlight on scroll
  ============================================================ */
  const sections = $$('section[id]');
  const navLinks = $$('.nav__link');

  function updateActiveLink() {
    let current = '';
    const navH = nav ? nav.offsetHeight : 80;

    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= navH + 80) current = sec.id;
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href').slice(1);
      link.classList.toggle('nav__link--active', href === current);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

})();
