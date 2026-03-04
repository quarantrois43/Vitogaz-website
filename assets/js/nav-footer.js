/**
 * VITOGAZ MADAGASCAR — Shared Nav & Footer Injection
 * Injects the shared navigation and footer into all inner pages.
 */

const NAV_HTML = `
<nav class="nav nav--light" role="navigation" aria-label="Navigation principale">
  <div class="nav__inner">
    <a href="index.html" class="nav__logo" aria-label="Vitogaz Madagascar — Accueil">
      <div class="nav__logo-svg" aria-hidden="true"></div>
      <div>
        <div class="nav__logo-text" style="color:var(--color-navy)">Vito<span>gaz</span></div>
        <span class="nav__logo-sub" style="color:var(--color-text-muted)">Madagascar</span>
      </div>
    </a>
    <ul class="nav__links" role="list">
      <li class="nav__item">
        <a href="groupe.html" class="nav__link" style="color:var(--color-gray-700)">
          Groupe <span class="nav__link-arrow">▾</span>
        </a>
        <div class="nav__mega">
          <a href="groupe.html#vision" class="nav__mega-item">
            <div class="nav__mega-icon">🏛</div>
            <div><div class="nav__mega-title">Notre Vision</div><div class="nav__mega-desc">Mission, valeurs et ambitions stratégiques</div></div>
          </a>
          <a href="groupe.html#histoire" class="nav__mega-item">
            <div class="nav__mega-icon">📅</div>
            <div><div class="nav__mega-title">Notre Histoire</div><div class="nav__mega-desc">Trajectoire de croissance depuis 2003</div></div>
          </a>
          <a href="groupe.html#gouvernance" class="nav__mega-item">
            <div class="nav__mega-icon">👔</div>
            <div><div class="nav__mega-title">Gouvernance</div><div class="nav__mega-desc">Direction générale et conseil d'administration</div></div>
          </a>
          <a href="rse.html" class="nav__mega-item">
            <div class="nav__mega-icon">🌿</div>
            <div><div class="nav__mega-title">RSE & ESG</div><div class="nav__mega-desc">Engagements environnementaux et sociétaux</div></div>
          </a>
        </div>
      </li>
      <li class="nav__item">
        <a href="solutions.html" class="nav__link" style="color:var(--color-gray-700)">
          Solutions BtoB <span class="nav__link-arrow">▾</span>
        </a>
        <div class="nav__mega">
          <a href="solutions.html#industrie" class="nav__mega-item">
            <div class="nav__mega-icon">🏭</div>
            <div><div class="nav__mega-title">Industrie</div><div class="nav__mega-desc">Procédés industriels haute capacité</div></div>
          </a>
          <a href="solutions.html#hotellerie" class="nav__mega-item">
            <div class="nav__mega-icon">🏨</div>
            <div><div class="nav__mega-title">Hôtellerie</div><div class="nav__mega-desc">Établissements hôteliers et restauration</div></div>
          </a>
          <a href="solutions.html#distribution" class="nav__mega-item">
            <div class="nav__mega-icon">🚚</div>
            <div><div class="nav__mega-title">Distribution</div><div class="nav__mega-desc">Programme revendeurs agréés</div></div>
          </a>
          <a href="solutions.html#institutions" class="nav__mega-item">
            <div class="nav__mega-icon">🏛</div>
            <div><div class="nav__mega-title">Institutions</div><div class="nav__mega-desc">Marchés publics et organismes d'État</div></div>
          </a>
        </div>
      </li>
      <li class="nav__item"><a href="securite.html" class="nav__link" style="color:var(--color-gray-700)">Sécurité</a></li>
      <li class="nav__item"><a href="logistique.html" class="nav__link" style="color:var(--color-gray-700)">Logistique</a></li>
      <li class="nav__item"><a href="rse.html" class="nav__link" style="color:var(--color-gray-700)">RSE</a></li>
      <li class="nav__item"><a href="actualites.html" class="nav__link" style="color:var(--color-gray-700)">Actualités</a></li>
    </ul>
    <a href="contact.html" class="nav__cta">Demander un devis</a>
    <button class="nav__menu-btn" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mobile-menu">
      <span style="background:var(--color-navy)"></span>
      <span style="background:var(--color-navy)"></span>
      <span style="background:var(--color-navy)"></span>
    </button>
  </div>
  <div class="nav__mobile" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu mobile">
    <button class="nav__mobile-close" aria-label="Fermer le menu">✕</button>
    <a href="index.html" class="nav__mobile-link">Accueil</a>
    <a href="groupe.html" class="nav__mobile-link">Groupe & Vision</a>
    <a href="solutions.html" class="nav__mobile-link">Solutions BtoB</a>
    <a href="securite.html" class="nav__mobile-link">Sécurité & Conformité</a>
    <a href="logistique.html" class="nav__mobile-link">Logistique</a>
    <a href="rse.html" class="nav__mobile-link">RSE & ESG</a>
    <a href="carrieres.html" class="nav__mobile-link">Carrières</a>
    <a href="actualites.html" class="nav__mobile-link">Actualités</a>
    <a href="partenaire.html" class="nav__mobile-link">Devenir partenaire</a>
    <a href="contact.html" class="nav__mobile-cta">Demander un devis</a>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer class="footer" role="contentinfo">
  <div class="footer__top">
    <div class="container">
      <div class="footer__grid">
        <div>
          <div class="footer__brand-logo">Vito<span>gaz</span> Madagascar</div>
          <p class="footer__brand-desc">Leader de la distribution de gaz à Madagascar depuis 2003. Fournisseur de référence pour l'industrie, l'hôtellerie et les institutions publiques malagasy.</p>
          <div class="footer__social" aria-label="Réseaux sociaux">
            <a href="#" class="footer__social-link" aria-label="LinkedIn">in</a>
            <a href="#" class="footer__social-link" aria-label="Facebook">f</a>
            <a href="#" class="footer__social-link" aria-label="Twitter">𝕏</a>
          </div>
          <div class="footer__certifications" style="margin-top:1.5rem;">
            <span class="footer__cert-badge">ISO 9001</span>
            <span class="footer__cert-badge">OHSAS 18001</span>
            <span class="footer__cert-badge">ADR</span>
            <span class="footer__cert-badge">ATEX</span>
          </div>
        </div>
        <div>
          <div class="footer__nav-title">Groupe</div>
          <ul class="footer__nav-list">
            <li><a href="groupe.html" class="footer__nav-link">Notre histoire</a></li>
            <li><a href="groupe.html#vision" class="footer__nav-link">Vision & Mission</a></li>
            <li><a href="groupe.html#gouvernance" class="footer__nav-link">Gouvernance</a></li>
            <li><a href="rse.html" class="footer__nav-link">RSE & ESG</a></li>
            <li><a href="carrieres.html" class="footer__nav-link">Carrières</a></li>
            <li><a href="actualites.html" class="footer__nav-link">Actualités</a></li>
          </ul>
        </div>
        <div>
          <div class="footer__nav-title">Solutions BtoB</div>
          <ul class="footer__nav-list">
            <li><a href="solutions.html#industrie" class="footer__nav-link">Industrie</a></li>
            <li><a href="solutions.html#hotellerie" class="footer__nav-link">Hôtellerie</a></li>
            <li><a href="solutions.html#distribution" class="footer__nav-link">Distribution</a></li>
            <li><a href="solutions.html#immobilier" class="footer__nav-link">Immobilier</a></li>
            <li><a href="solutions.html#institutions" class="footer__nav-link">Institutions</a></li>
            <li><a href="securite.html" class="footer__nav-link">Sécurité</a></li>
            <li><a href="logistique.html" class="footer__nav-link">Logistique</a></li>
          </ul>
        </div>
        <div>
          <div class="footer__nav-title">Contact</div>
          <ul class="footer__nav-list">
            <li><a href="contact.html" class="footer__nav-link">Siège — Antananarivo</a></li>
            <li><a href="tel:+261200000000" class="footer__nav-link">+261 20 XX XX XX</a></li>
            <li><a href="mailto:contact@vitogaz.mg" class="footer__nav-link">contact@vitogaz.mg</a></li>
          </ul>
          <div style="margin-top:1.5rem;">
            <div class="footer__nav-title">Urgences 24/7</div>
            <a href="tel:+261320000000" class="footer__nav-link" style="color:var(--color-orange);font-weight:600;font-size:0.9375rem;">+261 32 XX XX XX</a>
          </div>
          <div style="margin-top:2rem;">
            <a href="contact.html" class="btn btn--primary" style="width:100%;text-align:center;">Demander un devis</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="footer__bottom">
      <p class="footer__copyright">&copy; <span class="footer-year"></span> Vitogaz Madagascar. Tous droits réservés.</p>
      <nav class="footer__legal" aria-label="Liens légaux">
        <a href="#" class="footer__legal-link">Mentions légales</a>
        <a href="#" class="footer__legal-link">Politique de confidentialité</a>
        <a href="#" class="footer__legal-link">Cookies</a>
        <a href="#" class="footer__legal-link">CGV</a>
      </nav>
    </div>
  </div>
</footer>`;

// Auto-inject into pages that have placeholder elements
document.addEventListener('DOMContentLoaded', () => {
  // Update footer years
  document.querySelectorAll('.footer-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});
