(function(){
  'use strict';

  // Year
  const yr = document.getElementById('yr');
  if(yr) yr.textContent = new Date().getFullYear();

  // Nav scroll state
  const hdr = document.getElementById('siteHeader');
  function onScroll(){
    if(!hdr) return;
    hdr.classList.toggle('scrolled', window.scrollY > 30);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  // Smooth scroll all anchor links
  document.addEventListener('click', function(e){
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    const t = document.querySelector(a.getAttribute('href'));
    if(!t) return;
    e.preventDefault();
    const navH = hdr ? hdr.offsetHeight : 76;
    window.scrollTo({top: t.getBoundingClientRect().top + window.scrollY - navH, behavior:'smooth'});
    closeMobile();
  });

  // Mobile menu
  const btn = document.getElementById('hamburger');
  const mob = document.getElementById('mobileNav');

  function openMobile(){
    if(!mob) return;
    mob.classList.add('open');
    mob.setAttribute('aria-hidden','false');
    btn && btn.setAttribute('aria-expanded','true');
    document.body.classList.add('menu-open');
    mob.querySelector('a') && mob.querySelector('a').focus();
  }
  function closeMobile(){
    if(!mob) return;
    mob.classList.remove('open');
    mob.setAttribute('aria-hidden','true');
    btn && btn.setAttribute('aria-expanded','false');
    document.body.classList.remove('menu-open');
  }

  btn && btn.addEventListener('click', function(){
    mob.classList.contains('open') ? closeMobile() : openMobile();
  });
  mob && mob.addEventListener('keydown', function(e){ if(e.key==='Escape') closeMobile(); });

  // Scroll reveal
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduceMotion){
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){
          en.target.classList.add('visible');
          obs.unobserve(en.target);
        }
      });
    },{rootMargin:'0px 0px -60px 0px', threshold:0.08});
    els.forEach(function(el){ obs.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('visible'); });
  }

  // Contact form
  const form    = document.getElementById('contactForm');
  const submit  = document.getElementById('formSubmit');
  const success = document.getElementById('formSuccess');

  function validate(){
    let ok = true;
    ['fname','femail','ftype','fmsg'].forEach(function(id){
      const el = document.getElementById(id);
      if(!el) return;
      const empty = !el.value.trim();
      const badEmail = id==='femail' && el.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value);
      const tooShort = id==='fmsg' && el.value.trim().length < 15;
      if(empty || badEmail || tooShort){
        el.style.borderColor='#e53935';
        ok = false;
      } else {
        el.style.borderColor='';
      }
    });
    return ok;
  }

  form && form.addEventListener('submit', function(e){
    e.preventDefault();
    if(!validate()) return;
    if(submit){ submit.disabled=true; submit.textContent='Sending…'; }

    /* ── INTEGRATION POINT ──────────────────────────────────────
       Replace the setTimeout below with your chosen method:

       A) Formspree — add action="https://formspree.io/f/YOUR_ID" to the form
          and method="POST", then remove this JS submit handler entirely.

       B) EmailJS:
          emailjs.sendForm('SERVICE_ID','TEMPLATE_ID', form,'PUBLIC_KEY')
            .then(showSuccess, showError);

       C) Netlify Forms — add `netlify` attribute to <form> tag.
    ─────────────────────────────────────────────────────────── */
    setTimeout(showSuccess, 1000);
  });

  function showSuccess(){
    if(success){ success.style.display='block'; }
    if(submit){ submit.disabled=false; submit.textContent='Send Project Request ↗'; }
    form && form.reset();
    form && form.querySelectorAll('input,select,textarea').forEach(function(el){ el.style.borderColor=''; });
  }

})();
