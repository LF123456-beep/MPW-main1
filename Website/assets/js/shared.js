(function () {
  'use strict';

  // Keep the complete company lockup consistent on every page.
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo && !navLogo.querySelector('.nav-wordmark')) {
    const wordmark = document.createElement('a');
    wordmark.href = 'index.html';
    wordmark.className = 'nav-wordmark';
    wordmark.setAttribute('aria-label', 'Muniqo Performante');
    wordmark.innerHTML =
      '<span class="nav-wordmark-main">MUNIQO</span>' +
      '<span class="nav-wordmark-sub">Performante</span>';
    navLogo.appendChild(wordmark);
  }

  // Consistent contact option on every page.
  const footer = document.querySelector('footer');
  if (footer && !document.querySelector('.global-contact-cta')) {
    const isGerman = document.documentElement.lang === 'de';
    const contactCta = document.createElement('section');
    contactCta.className = 'global-contact-cta';
    contactCta.setAttribute('aria-label', isGerman ? 'Kontakt aufnehmen' : 'Get in touch');
    contactCta.innerHTML = isGerman
      ? '<div class="global-contact-copy"><h2>Fragen zu unseren Lösungen?</h2><p>Schreiben Sie uns kurz oder vereinbaren Sie einen persönlichen Call. Wir besprechen Ihre Anwendung direkt und unverbindlich.</p></div><div class="global-contact-actions"><a href="ContactUs.html">Nachricht schreiben</a><a href="ContactUs.html#telefon">Anrufen</a></div>'
      : '<div class="global-contact-copy"><h2>Questions about our solutions?</h2><p>Send us a message or arrange a personal call. We will discuss your application directly and without obligation.</p></div><div class="global-contact-actions"><a href="ContactUs.html">Send a message</a><a href="ContactUs.html#phone">Call us</a></div>';
    footer.before(contactCta);
  }

  // ── Scroll Progress + Header ──
  const sTop = document.getElementById('scrollProgressTop');
  const sDot  = document.getElementById('scrollProgressDot');
  const sBot  = document.getElementById('scrollProgressBottom');
  const hdr   = document.getElementById('header');

  function onScroll() {
    const st = window.scrollY;
    const dh = document.documentElement.scrollHeight - window.innerHeight;
    const p  = dh > 0 ? (st / dh) * 100 : 0;
    const ps = p + '%';
    if (sTop) sTop.style.setProperty('--progress', ps);
    if (sDot)  sDot.style.setProperty('--progress', ps);
    if (sBot)  sBot.style.setProperty('--progress', ps);

    // Pages can override t-calculation via window.__headerScrollT
    const t = typeof window.__headerScrollT === 'function'
      ? window.__headerScrollT(st)
      : Math.min(Math.max((st - 100) / 300, 0), 1);

    if (hdr) {
      hdr.style.background     = `rgba(9,9,10,${(t * 0.55).toFixed(2)})`;
      hdr.style.backdropFilter = `blur(${(t * 18).toFixed(1)}px)`;
      if (window.innerWidth >= 900) {
        hdr.style.padding = `${(24 - t * 8).toFixed(1)}px 48px`;
        document.documentElement.style.setProperty('--nav-y', `${(60 - t * 8).toFixed(1)}px`);
      }
    }
  }

  window.addEventListener('scroll',    onScroll, { passive: true });
  window.addEventListener('touchmove', onScroll, { passive: true });
  window.addEventListener('resize',    onScroll);
  onScroll();

  // ── Mobile Menu ──
  const mobToggle = document.getElementById('mobToggle');
  const navLinks  = document.getElementById('navLinks');

  if (mobToggle && navLinks) {
    mobToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      if (isOpen) {
        const sy = window.scrollY;
        document.body.style.cssText = `overflow:hidden;position:fixed;top:-${sy}px;left:0;right:0;`;
        document.body.dataset.scrollY = sy;
      } else {
        const sy = parseFloat(document.body.dataset.scrollY || 0);
        document.body.style.cssText = '';
        window.scrollTo(0, sy);
      }
    });
  }

  // ── Nav Close ──
  const navClose = document.getElementById('navClose');
  if (navClose && navLinks) {
    navClose.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const sy = parseFloat(document.body.dataset.scrollY || 0);
      document.body.style.cssText = '';
      window.scrollTo(0, sy);
    });
  }
})();
