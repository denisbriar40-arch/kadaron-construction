(() => {
  const $ = (s, c=document) => c.querySelector(s);
  const menuButton = $('#menuButton');
  const mobileNav = $('#mobileNav');

  menuButton?.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    mobileNav.setAttribute('aria-hidden', String(!open));
  });

  mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded','false');
    mobileNav?.setAttribute('aria-hidden','true');
  }));

  const header = $('.site-header');
  const setHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 20);
  setHeader();
  window.addEventListener('scroll', setHeader, {passive:true});

  const revealTargets = document.querySelectorAll('.service-row,.cap,.steps li,.trust__items>div,.portfolio-note,.intro__statement,.intro__body');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    revealTargets.forEach(el => el.classList.add('reveal'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){ entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, {threshold:.08, rootMargin:'0px 0px -35px'});
    revealTargets.forEach(el => observer.observe(el));
  }

  const form = $('#quoteForm');
  const status = $('#formStatus');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const message = [
      'Hello Kadaron Construction,',
      '',
      'I would like to discuss a project.',
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      `Project type: ${data.get('type')}`,
      '',
      `Project details: ${data.get('message')}`
    ].join('\n');

    status.textContent = 'Opening WhatsApp with your enquiry…';
    const url = `https://wa.me/2347069577000?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  });

  $('#year').textContent = new Date().getFullYear();
})();