/**
 * VITOGAZ MADAGASCAR — Main JavaScript
 * Architecture: Vanilla JS, Performance-first, Accessible
 * Version: 1.0.0
 */

/* ==========================================================================
   1. NAVIGATION — Sticky + Mobile
   ========================================================================== */
class Navigation {
  constructor() {
    this.nav = document.querySelector('.nav');
    this.menuBtn = document.querySelector('.nav__menu-btn');
    this.mobileMenu = document.querySelector('.nav__mobile');
    this.mobileClose = document.querySelector('.nav__mobile-close');
    this.isOpen = false;
    this.scrollThreshold = 60;

    if (this.nav) this.init();
  }

  init() {
    // Scroll listener for sticky nav
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    this.handleScroll();

    // Mobile menu toggle
    if (this.menuBtn) {
      this.menuBtn.addEventListener('click', () => this.openMenu());
    }
    if (this.mobileClose) {
      this.mobileClose.addEventListener('click', () => this.closeMenu());
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.isOpen && !e.target.closest('.nav__mobile') && !e.target.closest('.nav__menu-btn')) {
        this.closeMenu();
      }
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.closeMenu();
    });

    // Active link highlight
    this.setActiveLink();
  }

  handleScroll() {
    if (!this.nav) return;
    const scrolled = window.scrollY > this.scrollThreshold;
    this.nav.classList.toggle('scrolled', scrolled);
  }

  openMenu() {
    this.isOpen = true;
    this.mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    this.menuBtn.setAttribute('aria-expanded', 'true');
  }

  closeMenu() {
    this.isOpen = false;
    this.mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
    this.menuBtn.setAttribute('aria-expanded', 'false');
  }

  setActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link, .nav__mobile-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href === currentPath) {
        link.classList.add('is-active');
        link.style.color = 'var(--color-orange)';
      }
    });
  }
}

/* ==========================================================================
   2. ANIMATED COUNTERS
   ========================================================================== */
class CounterAnimator {
  constructor() {
    this.counters = document.querySelectorAll('[data-counter]');
    this.animated = new Set();
    if (this.counters.length) this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.animated.has(entry.target)) {
            this.animated.add(entry.target);
            this.animate(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.counters.forEach(counter => observer.observe(counter));
  }

  animate(el) {
    const target = parseFloat(el.dataset.counter);
    const duration = parseInt(el.dataset.duration || '2000');
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const start = performance.now();

    const update = (timestamp) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      el.textContent = prefix + (decimals ? current.toFixed(decimals) : Math.floor(current)) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + (decimals ? target.toFixed(decimals) : target) + suffix;
      }
    };

    requestAnimationFrame(update);
  }
}

/* ==========================================================================
   3. SCROLL ANIMATIONS — Intersection Observer
   ========================================================================== */
class ScrollAnimator {
  constructor() {
    this.elements = document.querySelectorAll('.animate-on-scroll');
    if (this.elements.length) this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    this.elements.forEach(el => observer.observe(el));
  }
}

/* ==========================================================================
   4. HERO — Background Ken Burns + Parallax
   ========================================================================== */
class HeroManager {
  constructor() {
    this.hero = document.querySelector('.hero');
    this.bgImage = document.querySelector('.hero__bg-image');
    if (this.hero) this.init();
  }

  init() {
    // Trigger Ken Burns after load
    if (this.bgImage) {
      setTimeout(() => this.bgImage.classList.add('loaded'), 100);
    }

    // Subtle parallax on scroll
    window.addEventListener('scroll', () => {
      if (this.bgImage) {
        const scroll = window.scrollY;
        const parallaxAmount = scroll * 0.3;
        this.bgImage.style.transform = `translateY(${parallaxAmount}px) scale(1.05)`;
      }
    }, { passive: true });
  }
}

/* ==========================================================================
   5. FORM HANDLING
   ========================================================================== */
class ContactForm {
  constructor() {
    this.form = document.querySelector('.form-contact');
    if (this.form) this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Real-time validation
    this.form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(field => {
      field.addEventListener('blur', () => this.validateField(field));
      field.addEventListener('input', () => this.clearError(field));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let error = null;

    if (field.required && !value) {
      error = 'Ce champ est obligatoire.';
    } else if (type === 'email' && value && !this.isValidEmail(value)) {
      error = 'Adresse e-mail invalide.';
    } else if (type === 'tel' && value && !this.isValidPhone(value)) {
      error = 'Numéro de téléphone invalide.';
    }

    this.setError(field, error);
    return !error;
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isValidPhone(phone) {
    return /^[\+]?[\d\s\-\(\)]{8,}$/.test(phone);
  }

  setError(field, message) {
    this.clearError(field);
    if (message) {
      field.style.borderColor = 'var(--color-error)';
      const error = document.createElement('span');
      error.className = 'form-error';
      error.textContent = message;
      error.style.cssText = 'color:var(--color-error);font-size:0.75rem;margin-top:4px;display:block;';
      field.parentNode.appendChild(error);
    }
  }

  clearError(field) {
    field.style.borderColor = '';
    const existing = field.parentNode.querySelector('.form-error');
    if (existing) existing.remove();
  }

  handleSubmit(e) {
    e.preventDefault();
    let isValid = true;

    this.form.querySelectorAll('[required]').forEach(field => {
      if (!this.validateField(field)) isValid = false;
    });

    if (isValid) {
      this.showSuccess();
    }
  }

  showSuccess() {
    const successMsg = document.createElement('div');
    successMsg.innerHTML = `
      <div style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:24px;text-align:center;margin-top:24px;">
        <div style="font-size:2rem;margin-bottom:12px;">✓</div>
        <div style="font-family:'Montserrat',sans-serif;font-weight:700;color:#065f46;font-size:1.125rem;margin-bottom:8px;">
          Demande envoyée avec succès
        </div>
        <div style="color:#6b7280;font-size:0.875rem;">
          Nos équipes commerciales vous contacteront dans les 24 heures ouvrées.
        </div>
      </div>
    `;
    this.form.appendChild(successMsg);
    this.form.querySelectorAll('input, textarea, select, button[type="submit"]').forEach(el => {
      el.disabled = true;
    });

    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/* ==========================================================================
   6. TABS (for Solutions page)
   ========================================================================== */
class TabManager {
  constructor() {
    this.tabContainers = document.querySelectorAll('[data-tabs]');
    this.tabContainers.forEach(container => this.initTabs(container));
  }

  initTabs(container) {
    const tabs = container.querySelectorAll('[data-tab]');
    const panels = container.querySelectorAll('[data-panel]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => {
          t.classList.toggle('is-active', t === tab);
          t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
        });

        panels.forEach(panel => {
          const isTarget = panel.dataset.panel === target;
          panel.classList.toggle('is-active', isTarget);
          panel.setAttribute('aria-hidden', !isTarget);
        });
      });
    });

    // Init first tab
    if (tabs.length) tabs[0].click();
  }
}

/* ==========================================================================
   7. ACCORDION (for FAQ sections)
   ========================================================================== */
class AccordionManager {
  constructor() {
    this.accordions = document.querySelectorAll('.accordion');
    this.accordions.forEach(acc => this.initAccordion(acc));
  }

  initAccordion(accordion) {
    const items = accordion.querySelectorAll('.accordion__item');

    items.forEach(item => {
      const trigger = item.querySelector('.accordion__trigger');
      const content = item.querySelector('.accordion__content');

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close all
        items.forEach(i => {
          i.classList.remove('is-open');
          const c = i.querySelector('.accordion__content');
          if (c) c.style.maxHeight = '0';
        });

        // Open clicked if was closed
        if (!isOpen) {
          item.classList.add('is-open');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }
}

/* ==========================================================================
   8. SMOOTH ANCHOR SCROLL
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-height')) || 80;
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================================================
   9. SCROLL INDICATOR — Clic pour défiler vers la section suivante
   ========================================================================== */
function initScrollIndicator() {
  const scrollIndicator = document.querySelector('.hero__scroll');
  if (!scrollIndicator) return;

  scrollIndicator.style.cursor = 'pointer';

  scrollIndicator.addEventListener('click', () => {
    const nextSection = document.querySelector('.hero + section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/* ==========================================================================
   10. COOKIE BANNER (RGPD placeholder)
   ========================================================================== */
class CookieBanner {
  constructor() {
    this.key = 'vitogaz_cookie_consent';
    if (!localStorage.getItem(this.key)) this.show();
  }

  show() {
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML = `
      <div style="
        position:fixed;bottom:24px;left:24px;right:24px;z-index:9999;
        background:var(--color-navy-dark);border:1px solid rgba(255,255,255,0.1);
        border-radius:12px;padding:20px 24px;
        display:flex;align-items:center;justify-content:space-between;gap:16px;
        flex-wrap:wrap;
        box-shadow:0 24px 64px rgba(0,0,0,0.4);
        max-width:1200px;margin:0 auto;
      ">
        <div style="flex:1;min-width:200px;">
          <div style="font-family:Montserrat,sans-serif;font-weight:700;color:#fff;font-size:0.875rem;margin-bottom:4px;">
            Nous utilisons des cookies
          </div>
          <div style="font-size:0.75rem;color:rgba(255,255,255,0.5);line-height:1.5;">
            Ce site utilise des cookies pour améliorer votre expérience et analyser notre trafic.
            Vos données restent confidentielles conformément à notre politique de confidentialité.
          </div>
        </div>
        <div style="display:flex;gap:12px;flex-shrink:0;">
          <button id="cookie-decline" style="
            padding:8px 16px;border-radius:6px;font-family:Montserrat,sans-serif;
            font-size:0.75rem;font-weight:700;color:rgba(255,255,255,0.5);
            background:transparent;border:1px solid rgba(255,255,255,0.15);cursor:pointer;
            letter-spacing:0.04em;text-transform:uppercase;
          ">Refuser</button>
          <button id="cookie-accept" style="
            padding:8px 20px;border-radius:6px;font-family:Montserrat,sans-serif;
            font-size:0.75rem;font-weight:700;color:#fff;
            background:var(--color-orange,#E8820C);border:none;cursor:pointer;
            letter-spacing:0.04em;text-transform:uppercase;
          ">Accepter</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', () => {
      localStorage.setItem(this.key, 'accepted');
      banner.remove();
    });

    document.getElementById('cookie-decline').addEventListener('click', () => {
      localStorage.setItem(this.key, 'declined');
      banner.remove();
    });
  }
}

/* ==========================================================================
   11. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btn = document.createElement('button');
  btn.innerHTML = '↑';
  btn.setAttribute('aria-label', 'Retour en haut');
  btn.style.cssText = `
    position:fixed;bottom:32px;right:32px;z-index:100;
    width:48px;height:48px;border-radius:50%;
    background:var(--color-navy);color:var(--color-white);
    font-size:1.25rem;font-weight:700;
    border:none;cursor:pointer;
    box-shadow:0 4px 20px rgba(10,31,68,0.3);
    opacity:0;visibility:hidden;
    transition:all 0.25s ease;
    display:flex;align-items:center;justify-content:center;
  `;

  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    const show = window.scrollY > 400;
    btn.style.opacity = show ? '1' : '0';
    btn.style.visibility = show ? 'visible' : 'hidden';
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   12. SVG LOGO INLINE
   ========================================================================== */
function inlineSVGLogo() {
  document.querySelectorAll('.nav__logo-svg').forEach(container => {
    container.innerHTML = `
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="42" height="42" rx="8" fill="#0A1F44"/>
        <path d="M21 8L8 16V26L21 34L34 26V16L21 8Z" stroke="#E8820C" stroke-width="2" fill="none"/>
        <path d="M21 14L15 18V24L21 28L27 24V18L21 14Z" fill="#E8820C" opacity="0.3"/>
        <circle cx="21" cy="21" r="3" fill="#E8820C"/>
      </svg>
    `;
  });
}

/* ==========================================================================
   13. INITIALIZE ALL
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Core modules
  new Navigation();
  new CounterAnimator();
  new ScrollAnimator();
  new HeroManager();
  new ContactForm();
  new TabManager();
  new AccordionManager();

  // Utilities
  initSmoothScroll();
  initScrollIndicator();
  initBackToTop();
  inlineSVGLogo();

  // Cookie banner (RGPD)
  // new CookieBanner(); // Uncomment to enable

  // Page transition
  document.body.classList.add('page-transition');

  console.log('%cVITOGAZ MADAGASCAR', 'color:#E8820C;font-weight:bold;font-size:1.2rem;');
  console.log('%cSite institutionnel BtoB v1.0', 'color:#0A1F44;font-size:0.875rem;');
});

/* ==========================================================================
   14. IMAGE LAZY LOAD FALLBACK (for browsers without loading="lazy")
   ========================================================================== */
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imageObserver.observe(img));
}