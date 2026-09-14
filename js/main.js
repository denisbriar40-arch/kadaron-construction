(function(){
  'use strict';

  // Year
  var yr = document.getElementById('yr');
  if(yr) yr.textContent = new Date().getFullYear();

  // Nav scroll
  var hdr = document.getElementById('siteHeader');
  function onScroll(){
    if(!hdr) return;
    hdr.classList.toggle('scrolled', window.scrollY > 30);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  // Smooth scroll
  document.addEventListener('click', function(e){
    var a = e.target.closest('a[href^="#"]');
    if(!a) return;
    var t = document.querySelector(a.getAttribute('href'));
    if(!t) return;
    e.preventDefault();
    var navH = hdr ? hdr.offsetHeight : 76;
    window.scrollTo({top: t.getBoundingClientRect().top + window.scrollY - navH, behavior:'smooth'});
    closeMobile();
  });

  // Mobile menu
  var btn = document.getElementById('hamburger');
  var mob = document.getElementById('mobileNav');

  function openMobile(){
    if(!mob) return;
    mob.classList.add('open');
    mob.setAttribute('aria-hidden','false');
    if(btn) btn.setAttribute('aria-expanded','true');
    document.body.classList.add('menu-open');
  }
  function closeMobile(){
    if(!mob) return;
    mob.classList.remove('open');
    mob.setAttribute('aria-hidden','true');
    if(btn) btn.setAttribute('aria-expanded','false');
    document.body.classList.remove('menu-open');
  }
  if(btn) btn.addEventListener('click', function(){
    mob.classList.contains('open') ? closeMobile() : openMobile();
  });
  if(mob) mob.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeMobile();
  });

  // Scroll reveal
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduceMotion){
    var els = document.querySelectorAll('.reveal');
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){
          en.target.classList.add('visible');
          obs.unobserve(en.target);
        }
      });
    },{rootMargin:'0px 0px -60px 0px', threshold:0.08});
    els.forEach(function(el){ obs.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){
      el.classList.add('visible');
    });
  }

  // ── CONTACT FORM — Formspree AJAX ──────────────────────────
  var form    = document.getElementById('contactForm');
  var submit  = document.getElementById('formSubmit');
  var success = document.getElementById('formSuccess');

  function validateForm(){
    var ok = true;
    var fields = [
      {id:'fname',  check: function(v){ return v.trim().length >= 2; }},
      {id:'femail', check: function(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }},
      {id:'ftype',  check: function(v){ return v !== ''; }},
      {id:'fmsg',   check: function(v){ return v.trim().length >= 10; }}
    ];
    fields.forEach(function(f){
      var el = document.getElementById(f.id);
      if(!el) return;
      if(!f.check(el.value)){
        el.style.borderColor = '#e53935';
        ok = false;
      } else {
        el.style.borderColor = '';
      }
    });
    return ok;
  }

  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(!validateForm()) return;

      if(submit){
        submit.disabled = true;
        submit.textContent = 'Sending…';
      }

      fetch('https://formspree.io/f/xbgjvnbe', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
      .then(function(res){
        if(res.ok){
          if(success) success.style.display = 'block';
          form.reset();
          form.querySelectorAll('input,select,textarea').forEach(function(el){
            el.style.borderColor = '';
          });
        } else {
          alert('Something went wrong. Please email kadaron85@gmail.com directly.');
        }
        if(submit){
          submit.disabled = false;
          submit.textContent = 'Send Project Request';
        }
      })
      .catch(function(){
        alert('Network error. Please email kadaron85@gmail.com directly.');
        if(submit){
          submit.disabled = false;
          submit.textContent = 'Send Project Request';
        }
      });
    });
  }

})();
