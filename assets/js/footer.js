// @ts-nocheck
// =============================================================
// Vitogaz Madagascar — Footer partagé
// Modifier ce fichier pour mettre à jour le footer sur toutes les pages
// =============================================================

(function () {
  const footerHTML = `
  <footer class="footer" role="contentinfo">
    <div class="footer__top">
      <div class="container">
        <div class="footer__grid">

          <!-- Brand Column -->
          <div>
            <div class="footer__brand-logo">
              <img src="assets/images/logo-vitogaz.png" alt="Vitogaz Madagascar"
                style="height:48px;width:auto;display:block;margin-bottom:0.5rem;filter:brightness(0) invert(1);" />
            </div>
            <p class="footer__brand-desc">
              Leader de la distribution de gaz à Madagascar depuis 2003. Fournisseur de référence pour l'industrie, l'hôtellerie et les institutions publiques malagasy.
            </p>
            <div class="footer__social" aria-label="Réseaux sociaux">
              <a href="https://www.facebook.com/vitogazmadagascar" class="footer__social-link" aria-label="Facebook Vitogaz" target="_blank" rel="noopener">f</a>
              <a href="https://www.linkedin.com/company/vitogazmadagascar/" class="footer__social-link" aria-label="LinkedIn Vitogaz" target="_blank" rel="noopener">in</a>
              <a href="https://www.instagram.com/vitogazmadagascar?igsh=bHY0NWFpbDdjaHh2" class="footer__social-link" aria-label="Instagram Vitogaz" target="_blank" rel="noopener">ig</a>
              <a href="https://youtube.com/@vitogazmadagascar5079?si=sXqiQYuGLmUkng36" class="footer__social-link" aria-label="YouTube Vitogaz" target="_blank" rel="noopener">yt</a>
              <a href="https://www.tiktok.com/@vitogaz.madagasca?_r=1&_t=ZS-93py7ZNIaY4" class="footer__social-link" aria-label="TikTok Vitogaz" target="_blank" rel="noopener">tk</a>
            </div>
            <div class="footer__certifications" style="margin-top:1.5rem;" aria-label="Certifications">
              <span class="footer__cert-badge">ISO 9001</span>
              <span class="footer__cert-badge">OHSAS 18001</span>
              <span class="footer__cert-badge">ADR</span>
              <span class="footer__cert-badge">ATEX</span>
            </div>
          </div>

          <!-- Navigation Column -->
          <div>
            <div class="footer__nav-title">Groupe</div>
            <ul class="footer__nav-list" role="list">
              <li><a href="groupe.html" class="footer__nav-link">Notre histoire</a></li>
              <li><a href="groupe.html#vision" class="footer__nav-link">Vision &amp; Mission</a></li>
              <li><a href="groupe.html#gouvernance" class="footer__nav-link">Gouvernance</a></li>
              <li><a href="rse.html" class="footer__nav-link">RSE &amp; ESG</a></li>
              <li><a href="carrieres.html" class="footer__nav-link">Carrières</a></li>
              <li><a href="actualites.html" class="footer__nav-link">Actualités</a></li>
            </ul>
          </div>

          <!-- Solutions Column -->
          <div>
            <div class="footer__nav-title">Solutions BtoB</div>
            <ul class="footer__nav-list" role="list">
              <li><a href="solutions.html#industrie" class="footer__nav-link">Industrie</a></li>
              <li><a href="solutions.html#hotellerie" class="footer__nav-link">Hôtellerie</a></li>
              <li><a href="solutions.html#distribution" class="footer__nav-link">Distribution</a></li>
              <li><a href="solutions.html#immobilier" class="footer__nav-link">Immobilier</a></li>
              <li><a href="solutions.html#institutions" class="footer__nav-link">Institutions</a></li>
              <li><a href="securite.html" class="footer__nav-link">Sécurité</a></li>
              <li><a href="logistique.html" class="footer__nav-link">Logistique</a></li>
            </ul>
          </div>

          <!-- Contact Column -->
          <div>
            <div class="footer__nav-title">Contact</div>
            <ul class="footer__nav-list" role="list">
              <li>
                <address style="font-style:normal;">
                  <a href="contact.html" class="footer__nav-link">Siège social —  122, rue Rainandriamampandry Faravohitra, Antananarivo 101 Madagascar</a> 
                </address>
              </li>
              <li><a href="tel:+261200000000" class="footer__nav-link">+261 (20) 22 364 00</a></li>
              <li><a href="mailto:vitogazmada@vitogaz.mg" class="footer__nav-link">contact@vitogaz.mg</a></li>
            </ul>
            <div style="margin-top:1.5rem;">
              <div class="footer__nav-title">Urgences 24/7</div>
              <a href="tel:+261320000000" class="footer__nav-link"
                style="color:var(--color-orange);font-weight:600;font-size:0.9375rem;">
                +261 (20) 22 364 64
              </a>
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
        <p class="footer__copyright">
          &copy; <span id="footer-year"></span> Vitogaz Madagascar. Tous droits réservés.
        </p>
        <nav class="footer__legal" aria-label="Liens légaux">
          <a href="#" class="footer__legal-link">Mentions légales</a>
          <a href="#" class="footer__legal-link">Politique de confidentialité</a>
          <a href="#" class="footer__legal-link">Cookies</a>
          <a href="#" class="footer__legal-link">CGV</a>
        </nav>
      </div>
    </div>
  </footer>
  `;

  // Injecter le footer
  const root = document.getElementById('footer-root');
  if (root) {
    root.outerHTML = footerHTML;
  }

  // Mettre à jour l'année
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();