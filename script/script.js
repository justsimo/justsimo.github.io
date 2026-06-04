(function (window, document, $) {
  'use strict';

  function init() {
    // ELEMENTI LOADER
    const loadingPage = document.querySelector('.loading-page');
    const countEl = document.getElementById('count');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.querySelector('.progress-container');

    // fallback se manca qualcosa
    if (!loadingPage || !countEl || !progressBar) {
      const noScroll = document.getElementById('no-scrollbar') || document.body;
      if (noScroll) noScroll.style.overflowY = 'auto';
      return;
    }

    // progresso con requestAnimationFrame
    let count = 0;
    let rafId = null;
    let loaderStarted = false;

    function setAriaValue(v) {
      if (progressContainer) progressContainer.setAttribute('aria-valuenow', String(v));
      progressBar.setAttribute('aria-valuenow', String(v));
    }

    function updateLoader() {
      loaderStarted = true;
      if (count < 100) {
        count++;
        countEl.textContent = count;
        progressBar.style.width = count + '%';
        setAriaValue(count);
        rafId = requestAnimationFrame(updateLoader);
      } else {
        if (rafId) cancelAnimationFrame(rafId);
      }
    }

    // avvia animazione loader
    setTimeout(function () {
      if (!loaderStarted) updateLoader();
    }, 200);

    // al caricamento completo della pagina
    window.addEventListener('load', function () {
      setTimeout(function () {
        // fade out via CSS transition
        loadingPage.style.transition = 'opacity 200ms ease';
        loadingPage.style.opacity = '0';

        // rimozione dal DOM per accessibilità
        setTimeout(function () {
          if (loadingPage.parentNode) {
            loadingPage.parentNode.removeChild(loadingPage);
          }
        }, 250);
      }, 1500);

      // riabilita lo scroll
      setTimeout(function () {
        const noScroll = document.getElementById('no-scrollbar') || document.body;
        if (noScroll) noScroll.style.overflowY = 'auto';
      }, 1500);
    });

    /* NAV / Smooth scroll */
    if ($ && typeof $.fn.animate === 'function') {
      // click su link della navbar
      $(document).on('click', ".navbar-collapse ul li a[href^='#']", function (e) {
        const target = this.hash;
        if (!target) return;
        e.preventDefault();
        const $dest = $(target);
        if ($dest.length) {
          $('html, body').animate({ scrollTop: $dest.offset().top }, 600, function () {
            history.pushState(null, '', target);
          });
        }
      });

      // click su freccia up
      $(document).on('click', ".up-arrow[href^='#']", function (e) {
        const target = this.hash;
        if (!target) return;
        e.preventDefault();
        const $dest = $(target);
        if ($dest.length) {
          $('html, body').animate({ scrollTop: $dest.offset().top }, 600, function () {
            history.pushState(null, '', target);
          });
        }
      });
    }

    // Inizializza AOS (fix al disable)
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

    // Navbar toggler fallback: keeps mobile menu usable if CDN scripts are blocked.
    const toggler = document.querySelector('.navbar-toggler');
    const collapseEl = document.getElementById('navbarText');
    const bootstrapCollapseAvailable = !!($ && $.fn && typeof $.fn.collapse === 'function');
    if (toggler && collapseEl && !bootstrapCollapseAvailable) {
      toggler.addEventListener('click', function () {
        const open = collapseEl.classList.toggle('show');
        toggler.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
      });
    }

    // click su freccia up
    if ($ && typeof $.fn.animate === 'function') {
      $(document).on('click', ".up-arrow[href^='#']", function (e) {
        const target = this.hash;
        if (!target) return;
        e.preventDefault();
        const $dest = $(target);
        if ($dest.length) {
          $('html, body').animate({ scrollTop: $dest.offset().top }, 600, function () {
            history.pushState(null, '', target);
          });
        }
      });
    }
    
  } // end init

  // Avvio init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window, document, window.jQuery);
