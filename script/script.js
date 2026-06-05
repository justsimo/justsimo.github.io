/* =========================================================================
   Simone Gatto — comportamento del sito (file unico, consolidato)
   Include: loader, AOS, menu mobile, smooth-scroll, scroll-spy, freccia su,
   toggle hard-skills su mobile. Nessuno script inline in index.html.
   ========================================================================= */
(function (window, document, $) {
  'use strict';

  function init() {
    /* ---------------- LOADER (artificiale, volutamente mantenuto) ------- */
    const loadingPage = document.querySelector('.loading-page');
    const countEl = document.getElementById('count');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.querySelector('.progress-container');

    if (!loadingPage || !countEl || !progressBar) {
      const noScroll = document.getElementById('no-scrollbar') || document.body;
      if (noScroll) noScroll.style.overflowY = 'auto';
    } else {
      let count = 0;
      let rafId = null;
      let loaderStarted = false;

      const setAriaValue = (v) => {
        if (progressContainer) progressContainer.setAttribute('aria-valuenow', String(v));
        progressBar.setAttribute('aria-valuenow', String(v));
      };

      const updateLoader = () => {
        loaderStarted = true;
        if (count < 100) {
          count++;
          countEl.textContent = count;
          progressBar.style.width = count + '%';
          setAriaValue(count);
          rafId = requestAnimationFrame(updateLoader);
        } else if (rafId) {
          cancelAnimationFrame(rafId);
        }
      };

      setTimeout(function () { if (!loaderStarted) updateLoader(); }, 200);

      window.addEventListener('load', function () {
        setTimeout(function () {
          loadingPage.style.transition = 'opacity 200ms ease';
          loadingPage.style.opacity = '0';
          setTimeout(function () {
            if (loadingPage.parentNode) loadingPage.parentNode.removeChild(loadingPage);
          }, 250);
        }, 1500);

        setTimeout(function () {
          const noScroll = document.getElementById('no-scrollbar') || document.body;
          if (noScroll) noScroll.style.overflowY = 'auto';
        }, 1500);
      });
    }

    /* ---------------- AOS ----------------------------------------------- */
    if (window.AOS && typeof window.AOS.init === 'function') {
      window.AOS.init({
        disable: () => window.innerWidth < 768,
        duration: 550,
        easing: 'ease-out',
        once: true,
        mirror: false,
        offset: 80
      });
    }

    /* ---------------- NAV: altezza dinamica (--nav-h) ------------------- */
    const nav = document.getElementById('navbar');
    const setNavHeightVar = () => {
      const h = nav ? nav.offsetHeight : 72;
      document.documentElement.style.setProperty('--nav-h', h + 'px');
    };
    setNavHeightVar();

    /* ---------------- NAV: menu mobile (lock scroll, chiusura) ---------- */
    const collapse = document.getElementById('navbarText');
    const body = document.body;
    const hasBsCollapse = !!($ && $.fn && typeof $.fn.collapse === 'function');

    if (collapse) {
      collapse.addEventListener('show.bs.collapse', () => { body.style.overflow = 'hidden'; });
      collapse.addEventListener('hidden.bs.collapse', () => { body.style.overflow = ''; });
    }

    // Fallback toggler se Bootstrap collapse non è disponibile (CDN bloccato)
    const toggler = document.querySelector('.navbar-toggler');
    if (toggler && collapse && !hasBsCollapse) {
      toggler.addEventListener('click', () => {
        const open = collapse.classList.toggle('show');
        toggler.setAttribute('aria-expanded', String(open));
        body.style.overflow = open ? 'hidden' : '';
      });
    }

    // Chiudi il menu toccando fuori (mobile/tablet)
    document.addEventListener('click', (e) => {
      if (!collapse) return;
      const isToggle = e.target.closest('.navbar-toggler');
      const isInside = e.target.closest('#navbarText');
      if (!isToggle && !isInside && collapse.classList.contains('show')) {
        if (hasBsCollapse) $(collapse).collapse('hide');
        else collapse.classList.remove('show');
        body.style.overflow = '';
      }
    }, { passive: true });

    /* ---------------- SCROLL-SPY + stato attivo ------------------------- */
    const links = Array.from(document.querySelectorAll('#navbar .nav-link[href^="#"]'));
    const idToItem = new Map(links.map(a => [a.getAttribute('href').slice(1), a.closest('.nav-item')]));

    // Mappa: ogni sezione -> voce di nav. Le sotto-sezioni ereditano il "genitore".
    const sectionToNav = {
      home: 'home', aboutme: 'aboutme', 'fun-facts': 'aboutme',
      research: 'research', portfolio: 'portfolio', techstack: 'portfolio',
      career: 'career', experience: 'career', activities: 'activities', contacts: 'contacts'
    };

    const setActive = (navId) => {
      links.forEach(a => {
        const li = a.closest('.nav-item');
        if (li) li.classList.remove('is-active', 'active');
        a.removeAttribute('aria-current');
      });
      const li = idToItem.get(navId);
      if (li) {
        li.classList.add('is-active');
        const a = li.querySelector('.nav-link');
        if (a) a.setAttribute('aria-current', 'page');
      }
    };

    const sections = Object.keys(sectionToNav)
      .map(id => document.getElementById(id))
      .filter(Boolean);

    let currentNav = null;
    let lockActiveUntil = 0; // blocca lo spy durante lo smooth scroll

    const getNavOffset = () => {
      const h = nav ? nav.offsetHeight : 72;
      const top = nav ? (nav.getBoundingClientRect().top || 0) : 0;
      return Math.round(h + top + 16);
    };

    let raf = 0;
    const spy = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (Date.now() < lockActiveUntil) return;
        const probe = getNavOffset() + Math.round(window.innerHeight * 0.2);
        let bestSec = null, bestTop = -Infinity;
        for (const sec of sections) {
          const r = sec.getBoundingClientRect();
          if (r.top <= probe && r.bottom > probe) { bestSec = sec; break; }
          if (r.top <= probe && r.top > bestTop) { bestTop = r.top; bestSec = sec; }
        }
        if (bestSec) {
          const navId = sectionToNav[bestSec.id];
          if (navId && navId !== currentNav) { currentNav = navId; setActive(navId); }
        }
      });
    };

    let observer = null;
    const buildObserver = () => {
      if (observer) observer.disconnect();
      const navH = getNavOffset();
      observer = new IntersectionObserver(() => {
        if (Date.now() < lockActiveUntil) return;
        spy();
      }, {
        root: null,
        rootMargin: '-' + navH + 'px 0px -30% 0px',
        threshold: [0, 0.01, 0.1, 0.25, 0.5, 0.75, 1]
      });
      sections.forEach(sec => observer.observe(sec));
    };

    window.addEventListener('scroll', spy, { passive: true });
    window.addEventListener('resize', () => { setNavHeightVar(); buildObserver(); spy(); });

    buildObserver();

    // Stato iniziale
    const initialId = location.hash ? location.hash.slice(1) : (sections[0] ? sections[0].id : null);
    if (initialId && sectionToNav[initialId]) { currentNav = sectionToNav[initialId]; setActive(currentNav); }
    spy();

    /* ---------------- SMOOTH SCROLL (unico meccanismo) ------------------ */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Posizione di LAYOUT (documento) di un elemento: usa offsetTop, che
    // ignora le transform CSS (es. l'animazione fade-up di AOS). Con
    // getBoundingClientRect le transform falserebbero la misura → overshoot.
    const docTopOf = (el) => {
      let y = 0;
      while (el && el !== document.body && el !== document.documentElement) {
        y += el.offsetTop;
        el = el.offsetParent;
      }
      return y;
    };

    // Animazione di scroll manuale a requestAnimationFrame: affidabile a
    // prescindere da quale elemento sia il contenitore di scroll (html o body),
    // dove invece scrollTo({behavior:'smooth'}) a volte non viene animato.
    const getScrollY = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    let scrollRAF = 0;
    const animateScrollTo = (toY, duration) => {
      if (scrollRAF) { cancelAnimationFrame(scrollRAF); scrollRAF = 0; }
      const startY = getScrollY();
      const dist = toY - startY;
      if (prefersReduced || Math.abs(dist) < 2) { window.scrollTo(0, toY); return; }
      const t0 = performance.now();
      const stepFn = (now) => {
        const p = Math.min(1, (now - t0) / duration);
        window.scrollTo(0, Math.round(startY + dist * easeInOutQuad(p)));
        scrollRAF = p < 1 ? requestAnimationFrame(stepFn) : 0;
      };
      scrollRAF = requestAnimationFrame(stepFn);
    };

    // Spazio extra SOPRA il titolo per sezioni specifiche (in px).
    const extraTop = { aboutme: 64 };

    const scrollToHash = (hash) => {
      const id = hash.slice(1);
      const section = document.getElementById(id);
      if (!section) return;
      lockActiveUntil = Date.now() + 1100;
      const navId = sectionToNav[id];
      if (navId) { currentNav = navId; setActive(navId); }

      let targetY;
      if (id === 'home') {
        targetY = 0; // la hero è in cima
      } else {
        // Allinea il TITOLO visibile della sezione (non il bordo della sezione,
        // che ha molto padding) appena sotto la navbar fissa.
        const heading = section.querySelector('h2:not(.sr-only)') || section;
        targetY = docTopOf(heading) - getNavOffset() - (extraTop[id] || 0);
      }
      targetY = Math.max(0, Math.round(targetY));
      animateScrollTo(targetY, 600);
      history.replaceState(null, '', hash);
    };

    const onAnchorClick = (e, anchor) => {
      const hash = anchor.hash;
      if (!hash || hash.charAt(0) !== '#') return;
      if (!document.getElementById(hash.slice(1))) return;
      e.preventDefault();

      // Se il menu è aperto: chiudi e scrolla dopo la chiusura (mobile/tablet)
      if (collapse && collapse.classList.contains('show')) {
        if (hasBsCollapse) {
          const onHidden = () => {
            collapse.removeEventListener('hidden.bs.collapse', onHidden);
            requestAnimationFrame(() => scrollToHash(hash));
          };
          collapse.addEventListener('hidden.bs.collapse', onHidden);
          $(collapse).collapse('hide');
        } else {
          collapse.classList.remove('show');
          requestAnimationFrame(() => scrollToHash(hash));
        }
        body.style.overflow = '';
      } else {
        scrollToHash(hash);
      }
    };

    links.forEach(a => a.addEventListener('click', (e) => onAnchorClick(e, a)));

    /* ---------------- FRECCIA SU: visibilità + click ------------------- */
    const up = document.querySelector('.up-arrow');
    if (up) {
      const SHOW_AT = 400;
      const toggleUp = () => { up.classList.toggle('is-visible', window.scrollY > SHOW_AT); };
      toggleUp();
      window.addEventListener('scroll', toggleUp, { passive: true });
      up.addEventListener('click', (e) => onAnchorClick(e, up));
    }

    /* ---------------- MOBILE: toggle hard-skills nei project-card ------- */
    (function () {
      const mql = window.matchMedia('(max-width: 900px)');
      const cards = Array.from(document.querySelectorAll('.project-card'));

      const enable = () => {
        cards.forEach((card, idx) => {
          const list = card.querySelector('.subtitle-blocks');
          if (!list || card.classList.contains('has-toggle')) return;
          list.id = list.id || ('skills-list-' + idx);
          list.setAttribute('aria-hidden', 'true');

          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'skills-toggle';
          btn.setAttribute('aria-controls', list.id);
          btn.setAttribute('aria-expanded', 'false');
          btn.textContent = 'See hard skills';

          btn.addEventListener('click', () => {
            const open = list.getAttribute('aria-hidden') === 'false';
            list.setAttribute('aria-hidden', open ? 'true' : 'false');
            btn.setAttribute('aria-expanded', String(!open));
            btn.textContent = open ? 'See Hard Skills' : 'Hide Hard Skills';
          });

          card.insertBefore(btn, list);
          card.classList.add('has-toggle');
        });
      };

      const disable = () => {
        cards.forEach(card => {
          const btn = card.querySelector('.skills-toggle');
          const list = card.querySelector('.subtitle-blocks');
          if (btn) btn.remove();
          if (list) list.setAttribute('aria-hidden', 'false');
          card.classList.remove('has-toggle');
        });
      };

      const apply = () => { mql.matches ? enable() : disable(); };
      apply();
      if (mql.addEventListener) mql.addEventListener('change', apply);
      else if (mql.addListener) mql.addListener(apply);
    })();

  } // end init

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window, document, window.jQuery);
