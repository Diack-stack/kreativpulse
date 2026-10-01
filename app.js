/**
 * KREATIV'PULSE — SCRIPTS D'INTERACTIONS
 * Carrousel 3D en Arc, Filtres Portfolio, Modales & Expérience Utilisateur
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     1. CARROUSEL 3D EN ARC (Inspiration Aeline & 3D Dark Cards)
     ========================================================== */
  const arcCards = document.querySelectorAll('.arc-card');
  const arcDots = document.querySelectorAll('.arc-dot');
  const btnArcPrev = document.getElementById('arc-prev');
  const btnArcNext = document.getElementById('arc-next');
  let currentActiveIndex = 1; // Start with card 2 (Index 1) centered

  function updateArcCarousel(activeIndex) {
    currentActiveIndex = (activeIndex + arcCards.length) % arcCards.length;

    arcCards.forEach((card, i) => {
      // Calculate circular offset relative to active card
      let offset = (i - currentActiveIndex + arcCards.length) % arcCards.length;
      if (offset > 2) offset -= arcCards.length; // Balance left and right

      card.setAttribute('data-index', offset === -1 ? 0 : offset === 0 ? 1 : offset === 1 ? 2 : 3);
      
      if (offset === 0) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    arcDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentActiveIndex);
    });
  }

  // Auto rotate carousel every 2.5 seconds (selon la demande : 2s à 2.5s max d'arrêt)
  const ROTATE_INTERVAL = 2500;
  let autoRotateInterval = setInterval(() => {
    updateArcCarousel(currentActiveIndex + 1);
  }, ROTATE_INTERVAL);

  function resetAutoRotate() {
    clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(() => {
      updateArcCarousel(currentActiveIndex + 1);
    }, ROTATE_INTERVAL);
  }

  if (btnArcPrev && btnArcNext) {
    btnArcPrev.addEventListener('click', () => {
      updateArcCarousel(currentActiveIndex - 1);
      resetAutoRotate();
    });
    btnArcNext.addEventListener('click', () => {
      updateArcCarousel(currentActiveIndex + 1);
      resetAutoRotate();
    });
  }

  arcDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      updateArcCarousel(idx);
      resetAutoRotate();
    });
  });

  arcCards.forEach(card => {
    card.addEventListener('click', () => {
      const cardIdx = Array.from(arcCards).indexOf(card);
      updateArcCarousel(cardIdx);
      resetAutoRotate();
    });
  });

  const heroWrapper = document.querySelector('.hero-3d-wrapper');
  if (heroWrapper) {
    heroWrapper.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
    heroWrapper.addEventListener('mouseleave', () => resetAutoRotate());
  }

  // Swipe tactile pour le Carrousel 3D Hero sur smartphone
  const carouselStage = document.getElementById('arcCarousel');
  if (carouselStage) {
    let heroTouchStartX = 0;
    let heroTouchStartY = 0;

    carouselStage.addEventListener('touchstart', (e) => {
      heroTouchStartX = e.touches[0].clientX;
      heroTouchStartY = e.touches[0].clientY;
    }, { passive: true });

    carouselStage.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - heroTouchStartX;
      const diffY = touchEndY - heroTouchStartY;

      // Détection de balayage horizontal prédominant (seuil 35px)
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
        if (diffX < 0) {
          updateArcCarousel(currentActiveIndex + 1);
        } else {
          updateArcCarousel(currentActiveIndex - 1);
        }
        resetAutoRotate();
      }
    }, { passive: true });
  }

  /* ==========================================================
     2. MOBILE MENU DRAWER (LUXURY FULLSCREEN OVERLAY)
     ========================================================== */
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');

  function toggleMobileMenu(forceClose = false) {
    if (!mobileDrawer) return;
    const isCurrentlyOpen = !mobileDrawer.classList.contains('hidden');
    const shouldOpen = forceClose ? false : !isCurrentlyOpen;

    if (shouldOpen) {
      mobileDrawer.classList.remove('hidden');
      if (mobileToggle) {
        mobileToggle.classList.add('is-open');
        mobileToggle.setAttribute('aria-expanded', 'true');
      }
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.add('hidden');
      if (mobileToggle) {
        mobileToggle.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }

  if (mobileDrawer) {
    if (mobileToggle) {
      mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
      });
    }

    // Gestion du bouton fermer à l'intérieur du menu
    const mobileCloseBtn = mobileDrawer.querySelector('.mobile-menu-close-btn') || document.getElementById('mobile-menu-close');
    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu(true);
      });
    }

    // Fermeture lors du clic sur les liens de navigation
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMobileMenu(true));
    });

    // Fermeture par la touche Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileDrawer.classList.contains('hidden')) {
        toggleMobileMenu(true);
      }
    });
  }

  /* ==========================================================
     3. PORTFOLIO CATEGORY FILTER
     ========================================================== */
  const filterBtns = document.querySelectorAll('.portfolio-filters .filter-btn, .portfolio-filter-btn');
  const portfolioMobileSelect = document.getElementById('portfolio-mobile-filter-select');

  function applyPortfolioFilter(filterValue) {
    // Synchroniser les boutons desktop
    filterBtns.forEach(b => {
      if (b.getAttribute('data-filter') === filterValue) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // Synchroniser le select déroulant mobile
    if (portfolioMobileSelect && portfolioMobileSelect.value !== filterValue) {
      portfolioMobileSelect.value = filterValue;
    }

    // Filtrer les éléments de la grille
    const allItems = document.querySelectorAll('#portfolioGrid .portfolio-item, .portfolio-item');
    allItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      if (filterValue === 'all' || itemCategory === filterValue) {
        item.style.display = 'block';
        item.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        item.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter') || 'all';
      applyPortfolioFilter(filterValue);
    });
  });

  if (portfolioMobileSelect) {
    portfolioMobileSelect.addEventListener('change', (e) => {
      applyPortfolioFilter(e.target.value);
    });
  }

  // Vérifier si un paramètre d'URL "filter" est présent à l'ouverture
  try {
    const urlFilterParam = new URLSearchParams(window.location.search).get('filter');
    if (urlFilterParam) {
      applyPortfolioFilter(urlFilterParam);
    }
  } catch (err) {
    // Ignore URL parse error
  }

  /* ==========================================================
     4. REAL PROJECTS DATA & MULTI-IMAGES LIGHTBOX ENGINE
     ========================================================== */
  const defaultRealProjects = [
    {
      id: 'sogip',
      category: 'event',
      categoryLabel: 'Événementiel & Stands',
      client: 'SOGIP Diamniadio',
      year: '2025',
      title: "Centre des Expositions SOGIP",
      tagline: "Scénographie, Banderoles & Signalétique Grand Format",
      desc: "Conception architecturale et habillage événementiel pour l'accueil des délégations officielles au Centre des Expositions de Diamniadio (SOGIP). Déploiement de banderoles monumentales, structures autoportantes et signalétique directionnelle.",
      deliverables: ["Habillage Façade Grand Format", "Scénographie d'Accueil", "Signalétique Directionnelle", "Banderoles Haute Définition"],
      cover: 'assets/portfolio/sogip-cover.webp',
      images: [
        'assets/portfolio/sogip-cover.webp',
        'assets/portfolio/sogip-1.jpg',
        'assets/portfolio/sogip-2.jpg',
        'assets/portfolio/sogip-3.jpg',
        'assets/portfolio/sogip-4.jpg'
      ]
    },
    {
      id: 'dpworld',
      category: 'event',
      categoryLabel: 'Événementiel & RH',
      client: 'DP World Dakar',
      year: '2026',
      title: "Journée Carrière DP World",
      tagline: "Scénographie Complète & Espace Recrutement",
      desc: "Organisation visuelle et scénographie de la Journée Carrière DP World sous le thème 'Our world is our future'. Podium présidentiel, écrans LED, photocall d'exposition et stands de recruteurs.",
      deliverables: ["Podium & Pupitre Officiel", "Écrans LED & Régie Vidéo", "Photocall Monumental", "Signalétique RH"],
      cover: 'assets/portfolio/dp-world-cover.png',
      images: [
        'assets/portfolio/dp-world-cover.png',
        'assets/portfolio/dpworld-1.png',
        'assets/portfolio/dpworld-2.png',
        'assets/portfolio/dpworld-3.png'
      ]
    },
    {
      id: 'tournee-can',
      category: 'branding',
      categoryLabel: 'Branding & Flotte',
      client: 'FSF — Fédération Sénégalaise de Football',
      year: '2025',
      title: "Bus Sénégal Champion d'Afrique",
      tagline: "Total Covering & Habillage de Flotte Officielle",
      desc: "Marquage intégral grand format (total covering) du bus officiel des Lions du Sénégal à l'occasion de la grande tournée triomphale. Impression vinyle polymère micro-perforé haute durabilité résistant aux UV.",
      deliverables: ["Total Covering Intégral", "Vinyle Ultra-Résistant Anti-UV", "Habillage Vitres Micro-perforé", "Direction Artistique Champion"],
      cover: 'assets/portfolio/tournee-can.webp',
      images: [
        'assets/portfolio/tournee-can.webp',
        'assets/portfolio/tournee-can-1.webp',
        'assets/portfolio/tournee-can-2.jpg',
        'assets/portfolio/tournee-can-3.jpg',
        'assets/portfolio/tournee-can-4.jpg',
        'assets/portfolio/tournee-can-5.jpg'
      ]
    },
    {
      id: 'sonaged',
      category: 'branding',
      categoryLabel: 'Branding Industriel',
      client: 'SONAGED / UCG Dakar',
      year: '2025',
      title: "Branding Flotte Véhicules SONAGED",
      tagline: "Marquage Industriel pour Bennes & Camions de Propreté",
      desc: "Campagne d'habillage des véhicules de salubrité publique sur l'ensemble de la métropole dakaroise. Marquage haute visibilité jour/nuit et intégration du numéro vert citoyen.",
      deliverables: ["Marquage Adhésif Industriel", "Traitement Résistant Intempéries", "Signalétique Sécurité & Numéro Vert", "Déploiement Multi-sites"],
      cover: 'assets/portfolio/sonaged.webp',
      images: [
        'assets/portfolio/sonaged.webp',
        'assets/portfolio/sonaged-1.webp',
        'assets/portfolio/sonaged-2.jpg',
        'assets/portfolio/sonaged-3.jpg',
        'assets/portfolio/sonaged-4.jpg',
        'assets/portfolio/sonaged-5.jpg'
      ]
    },
    {
      id: 'aner',
      category: 'goodies',
      categoryLabel: 'Goodies & Papeterie',
      client: 'ANER Énergies Renouvelables',
      year: '2026',
      title: "Goodies & Coffrets Institutionnels ANER",
      tagline: "Papeterie de Luxe, Clés USB Bois & Calendriers 2026",
      desc: "Création et fabrication de la collection d'objets promotionnels pour l'Agence Nationale pour les Énergies Renouvelables. Agendas en cuir grainé gravé, calendriers de chevalet, fanions et clés USB écologiques en bois.",
      deliverables: ["Agendas Cuir Gravés Logo", "Calendriers de Bureau 2026", "Clés USB Bois Éco-responsables", "Fanions de Table Officiels"],
      cover: 'assets/portfolio/goodies-aner.png',
      images: [
        'assets/portfolio/goodies-aner.png',
        'assets/portfolio/aner-1.png',
        'assets/portfolio/aner-2.png',
        'assets/portfolio/aner-3.png',
        'assets/portfolio/aner-4.png',
        'assets/portfolio/aner-5.png',
        'assets/portfolio/aner-6.png',
        'assets/portfolio/aner-7.png',
        'assets/portfolio/aner-8.png',
        'assets/portfolio/aner-9.png'
      ]
    },
    {
      id: 'caf-awards',
      category: 'event',
      categoryLabel: 'Audiovisuel & Cérémonie',
      client: 'CAF Afrique',
      year: '2025',
      title: "Scène & Écrans LED CAF Awards",
      tagline: "Scénographie TV Monumentale & Régie Multimédia",
      desc: "Conception scénographique 3D pour la prestigieuse cérémonie des CAF Awards. Arche lumineuse centrale, murs d'images LED circulaires et régie technique pour diffusion télévisuelle internationale.",
      deliverables: ["Scénographie 3D Circulaire", "Mur d'Écrans LED Haute Définition", "Régie Multimédia Live", "Éclairage Scénique TV"],
      cover: 'assets/portfolio/caf-awards.webp',
      images: [
        'assets/portfolio/caf-awards.webp',
        'assets/portfolio/caf-awards-1.webp',
        'assets/portfolio/caf-awards-2.jpg',
        'assets/portfolio/caf-awards-3.jpg',
        'assets/portfolio/caf-awards-4.jpg',
        'assets/portfolio/caf-awards-5.jpg',
        'assets/portfolio/caf-awards-6.jpg',
        'assets/portfolio/caf-awards-7.jpg'
      ]
    },
    {
      id: 'senelec',
      category: 'digital',
      categoryLabel: 'Digital & Motion Design',
      client: 'Senelec Sénégal',
      year: '2026',
      title: "Motion Design — Campagne Tarifaire Senelec",
      tagline: "Capsules Vidéo Pédagogiques 2D/3D pour Réseaux Sociaux",
      desc: "Production de contenus vidéo en motion design expliquant les nouvelles grilles tarifaires et mesures d'économie d'énergie. Modélisation graphique, voix-off et animations dynamiques.",
      deliverables: ["Storyboard & Direction Artistique", "Animation Motion Design 2D/3D", "Formats Carré / Story / Full HD", "Mixage Sonore & Voix-Off"],
      cover: 'assets/portfolio/senelec-motion.png',
      images: [
        'assets/portfolio/senelec-motion.png',
        'assets/portfolio/senelec-1.png'
      ]
    },
    {
      id: 'dhl',
      category: 'event',
      categoryLabel: 'Événementiel Corporate',
      client: 'DHL International Dakar',
      year: '2025',
      title: "Cocktail Dînatoire VIP DHL",
      tagline: "Scénographie de Soirée & Expérience Marque",
      desc: "Aménagement d'un espace lounge exclusif pour la direction et les clients stratégiques de DHL. Éclairage d'ambiance aux couleurs de la marque, mobilier lounge et totem d'accueil lumineux.",
      deliverables: ["Scénographie Espace Lounge", "Totem & Signalétique Jaune/Rouge", "Mise en Lumière Ambiance VIP", "Couverture Photo & Vidéo"],
      cover: 'assets/portfolio/dhl.webp',
      images: [
        'assets/portfolio/dhl.webp',
        'assets/portfolio/dhl-1.webp',
        'assets/portfolio/dhl-2.jpg',
        'assets/portfolio/dhl-3.jpg',
        'assets/portfolio/dhl-4.jpg'
      ]
    },
    {
      id: 'noom',
      category: 'goodies',
      categoryLabel: 'Objets Publicitaires Luxe',
      client: 'Noom Hotel Dakar Sea Plaza',
      year: '2026',
      title: "Objets Publicitaires VIP Noom Hotel",
      tagline: "Cadeaux d'Affaires Haut de Gamme & Goodies Hôteliers",
      desc: "Développement d'articles d'accueil de prestige pour les suites et événements corporate du prestigieux palace dakarois. Finitions premium et marquage délicat.",
      deliverables: ["Coffrets d'Accueil VIP", "Stylos Métal Gravure Laser", "Carnets Personnalisés", "Objets Souvenirs Hôteliers"],
      cover: 'assets/portfolio/goodies-noom.png',
      images: [
        'assets/portfolio/goodies-noom.png',
        'assets/portfolio/noom-1.png',
        'assets/portfolio/noom-2.jpeg',
        'assets/portfolio/noom-3.jpeg',
        'assets/portfolio/noom-4.jpeg',
        'assets/portfolio/noom-5.jpeg',
        'assets/portfolio/noom-6.jpeg',
        'assets/portfolio/noom-7.jpeg'
      ]
    },
    {
      id: 'crous',
      category: 'digital',
      categoryLabel: 'Digital & Social Media',
      client: 'CROUS Diamniadio',
      year: '2025',
      title: "Campagnes Digitales & Visuels Sociaux CROUS",
      tagline: "Création Graphique & Community Management Institutionnel",
      desc: "Conception de séries de visuels institutionnels pour les temps forts de l'année (Fête du Travail, Achoura, Journée de la Femme, Rentrée universitaire) pour les canaux sociaux du CROUS.",
      deliverables: ["Gabarits Social Media", "Campagnes Thématiques", "Illustrations Graphiques", "Retouche & Traitement d'Images"],
      cover: 'assets/portfolio/crous.png',
      images: [
        'assets/portfolio/crous.png',
        'assets/portfolio/crous-1.png'
      ]
    },
    {
      id: 'colle-sow-ardo',
      category: 'branding',
      categoryLabel: 'Branding & Aménagement',
      client: 'Maison Collé Sow Ardo',
      year: '2025',
      title: "Showroom 40 Ans Collé Sow Ardo",
      tagline: "Habillage Vitrines, Signalétique Dorée & Scénographie Haute Couture",
      desc: "Aménagement d'exception et habillage vitré pour le 40ème anniversaire de la célèbre maison de couture sénégalaise Collé Sow Ardo. Marquage vitrophanie haute définition, lettrages dorés et mise en valeur des pièces de collection.",
      deliverables: ["Vitrophanie Intégrale Haute Précision", "Marquage Doré Spécial 40 Ans", "Signalétique Intérieure Showroom", "Direction Artistique Mode"],
      cover: 'assets/portfolio/colle-sow-ardo.webp',
      images: [
        'assets/portfolio/colle-sow-ardo.webp',
        'assets/portfolio/colle-sow-ardo-1.webp',
        'assets/portfolio/colle-sow-ardo-2.jpg',
        'assets/portfolio/colle-sow-ardo-3.jpg',
        'assets/portfolio/colle-sow-ardo-4.jpg'
      ]
    },
    {
      id: 'gsef',
      category: 'event',
      categoryLabel: 'Événementiel & Pavillons',
      client: 'GSEF Dakar',
      year: '2024',
      title: "Aménagement Stand & Pavillon GSEF",
      tagline: "Architecture Événementielle & Stand Forum Mondial",
      desc: "Conception et fabrication du pavillon d'exposition officiel pour le Forum Mondial de l'Économie Sociale et Solidaire (GSEF Dakar). Stands modulaires, totems '10 ans d'engagement', comptoirs d'accueil et infographies grand format.",
      deliverables: ["Stand Modulaire 36m²", "Totems Graphiques Piliers", "Comptoir d'Accueil Personnalisé", "Panneaux Thématiques Trilingues"],
      cover: 'assets/portfolio/gsef.webp',
      images: [
        'assets/portfolio/gsef.webp',
        'assets/portfolio/gsef-1.webp',
        'assets/portfolio/gsef-2.jpg',
        'assets/portfolio/gsef-3.jpg'
      ]
    },
    {
      id: 'sonacos',
      category: 'branding',
      categoryLabel: 'Branding Bâtiment & Flotte',
      client: 'SONACOS Sénégal',
      year: '2025',
      title: "Branding Siège & Célébration 50 Ans SONACOS",
      tagline: "Habillage Monumental de Façade & Balcons d'Entreprise",
      desc: "Projet monumental d'habillage architectural des façades et balcons du siège de la SONACOS à l'occasion du cinquantenaire. Déploiement de bandeaux jaunes et blancs géants, médaillons 50 ans et enseignes lumineuses.",
      deliverables: ["Habillage Architectural Multi-niveaux", "Bandeaux Façade Haute Résistance", "Enseignes Rétro-éclairées", "Médaillons Commémoratifs 50 Ans"],
      cover: 'assets/portfolio/sonacos.webp',
      images: [
        'assets/portfolio/sonacos.webp',
        'assets/portfolio/sonacos-1.webp',
        'assets/portfolio/sonacos-2.jpg',
        'assets/portfolio/sonacos-3.jpg',
        'assets/portfolio/sonacos-4.jpg',
        'assets/portfolio/sonacos-5.jpg'
      ]
    },
    {
      id: 'ergobit',
      category: 'branding',
      categoryLabel: 'Branding & Espaces Corporates',
      client: 'Ergobit Consulting',
      year: '2025',
      title: "Branding & Signalétique des Locaux Ergobit",
      tagline: "Cloisons Vitrées Sablées & Décoration Corporate",
      desc: "Aménagement graphique complet des bureaux et espaces d'accueil d'Ergobit Consulting à Dakar. Pose de films sablés dépolis sur cloisons vitrées, panneaux acoustiques corporate et signalétique des salles de réunion.",
      deliverables: ["Films Dépolis Sablés Graphiques", "Signalétique Salles & Direction", "Panneaux Muraux Identitaires", "Totem d'Accueil"],
      cover: 'assets/portfolio/ergobit-locaux.webp',
      images: [
        'assets/portfolio/ergobit-locaux.webp',
        'assets/portfolio/ergobit-1.jpg',
        'assets/portfolio/ergobit-2.webp',
        'assets/portfolio/ergobit-3.jpg',
        'assets/portfolio/ergobit-4.jpg',
        'assets/portfolio/ergobit-5.jpg'
      ]
    },
    {
      id: 'sentrak',
      category: 'digital',
      categoryLabel: 'Digital & Réseaux Sociaux',
      client: 'Sentrak Logistics / SILS',
      year: '2025',
      title: "Campagnes Digitales & Visuels Sociaux Sentrak",
      tagline: "Direction Artistique & Stratégie Social Media Logistique",
      desc: "Création de séries de visuels institutionnels à fort impact pour Sentrak Logistics et SILS. Campagnes citoyennes (Octobre Rose, 1er Mai Fête du Travail, vœux corporate) renforçant la visibilité B2B sur LinkedIn et réseaux sociaux.",
      deliverables: ["Direction Artistique Social Media", "Campagne Octobre Rose Corporate", "Visuels Temps Forts & Événements", "Gabarits Prêts à l'Emploi"],
      cover: 'assets/portfolio/sentrak.png',
      images: [
        'assets/portfolio/sentrak.png',
        'assets/portfolio/sentrak-1.png'
      ]
    }
  ];

  // Chargement dynamique depuis le localStorage si personnalisé depuis l'Admin Studio
  const realProjects = (() => {
    try {
      const stored = localStorage.getItem('kp_custom_projects');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return defaultRealProjects;
  })();

  if (typeof window !== 'undefined') {
    window.defaultRealProjects = defaultRealProjects;
    window.realProjects = realProjects;
  }

  const lightbox = document.getElementById('projectLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxClient = document.getElementById('lightboxClient');
  const lightboxYear = document.getElementById('lightboxYear');
  const lightboxDeliverables = document.getElementById('lightboxDeliverables');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxCounterText = document.getElementById('lightboxCounterText');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  const lightboxThumbsContainer = document.getElementById('lightboxThumbsContainer');
  const lightboxWhatsappBtn = document.getElementById('lightboxWhatsappBtn');
  const lightboxQuoteBtn = document.getElementById('lightboxQuoteBtn');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');

  let activeProjectIndex = 0;
  let activeImageIndex = 0;

  function updateLightboxView() {
    const project = realProjects[activeProjectIndex];
    if (!project) return;

    const currentImgUrl = project.images[activeImageIndex] || project.cover;
    
    // Smooth image transition
    lightboxImg.style.opacity = '0.3';
    setTimeout(() => {
      lightboxImg.src = currentImgUrl;
      lightboxImg.style.opacity = '1';
    }, 120);

    // Update Text Details
    if (lightboxTitle) lightboxTitle.textContent = project.title;
    if (lightboxDesc) lightboxDesc.textContent = project.desc;
    if (lightboxCategory) lightboxCategory.textContent = project.categoryLabel.toUpperCase();
    if (lightboxClient) lightboxClient.textContent = project.client;
    if (lightboxYear) lightboxYear.textContent = project.year;

    // Update Deliverables Chips
    if (lightboxDeliverables) {
      lightboxDeliverables.innerHTML = '';
      project.deliverables.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'deliverable-tag';
        span.textContent = tag;
        lightboxDeliverables.appendChild(span);
      });
    }

    // Update WhatsApp link with contextual pre-filled text
    if (lightboxWhatsappBtn) {
      const msg = encodeURIComponent(`Bonjour Kreativ'Pulse ! J'ai vu votre réalisation "${project.title}" (${project.client}) et je souhaite réaliser un projet similaire pour mon entreprise.`);
      lightboxWhatsappBtn.href = `https://wa.me/221776442442?text=${msg}`;
    }

    // Multi-Images Controls (Thumbnails, Arrows, Counter)
    const totalImages = project.images.length;
    if (totalImages > 1) {
      if (lightboxCounter) {
        lightboxCounter.style.display = 'flex';
        lightboxCounterText.textContent = `Photo ${activeImageIndex + 1} / ${totalImages}`;
      }
      if (lightboxPrevBtn) lightboxPrevBtn.style.display = 'flex';
      if (lightboxNextBtn) lightboxNextBtn.style.display = 'flex';
      
      // Update or rebuild thumbnail strip
      if (lightboxThumbsContainer) {
        lightboxThumbsContainer.style.display = 'flex';
        lightboxThumbsContainer.innerHTML = '';
        project.images.forEach((imgUrl, idx) => {
          const thumb = document.createElement('img');
          thumb.src = imgUrl;
          thumb.alt = `Miniature ${idx + 1}`;
          thumb.className = `lightbox-thumb ${idx === activeImageIndex ? 'active' : ''}`;
          thumb.addEventListener('click', (e) => {
            e.stopPropagation();
            activeImageIndex = idx;
            updateLightboxView();
          });
          lightboxThumbsContainer.appendChild(thumb);
        });
      }
    } else {
      // Single image project
      if (lightboxCounter) lightboxCounter.style.display = 'none';
      if (lightboxPrevBtn) lightboxPrevBtn.style.display = 'none';
      if (lightboxNextBtn) lightboxNextBtn.style.display = 'none';
      if (lightboxThumbsContainer) lightboxThumbsContainer.style.display = 'none';
    }
  }

  function openLightbox(projectIndex, imgIndex = 0) {
    activeProjectIndex = projectIndex;
    activeImageIndex = imgIndex;
    updateLightboxView();
    if (lightbox) {
      lightbox.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Prevent page scroll
    }
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.add('hidden');
      document.body.style.overflow = ''; // Restore page scroll
    }
  }

  function nextImage() {
    const project = realProjects[activeProjectIndex];
    if (!project || project.images.length <= 1) return;
    activeImageIndex = (activeImageIndex + 1) % project.images.length;
    updateLightboxView();
  }

  function prevImage() {
    const project = realProjects[activeProjectIndex];
    if (!project || project.images.length <= 1) return;
    activeImageIndex = (activeImageIndex - 1 + project.images.length) % project.images.length;
    updateLightboxView();
  }

  // Attach click events to portfolio cards
  const portfolioCards = document.querySelectorAll('.portfolio-item');
  portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      const pid = card.getAttribute('data-project-id');
      let pIndex = -1;
      if (pid) {
        pIndex = realProjects.findIndex(p => p.id === pid);
      }
      if (pIndex === -1) {
        const parsed = parseInt(card.getAttribute('data-project'), 10);
        pIndex = isNaN(parsed) ? 0 : parsed;
      }
      openLightbox(pIndex, 0);
    });
  });

  // Lightbox Navigation Buttons
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
  if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
  if (lightboxQuoteBtn) lightboxQuoteBtn.addEventListener('click', closeLightbox);

  // Close when clicking outside content
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox || lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // Mobile Touch Swipe support for Lightbox
  let touchStartX = 0;
  let touchEndX = 0;
  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) nextImage(); // Swiped left -> next
      if (touchEndX - touchStartX > 50) prevImage(); // Swiped right -> prev
    }, { passive: true });
  }

  /* ==========================================================
     4.B RENDU DES 4 PROJETS VEDETTES ALÉATOIRES (ACCUEIL)
     ========================================================== */
  function renderFeaturedProjects() {
    const featuredPortfolioGrid = document.getElementById('featured-portfolio-grid');
    if (!featuredPortfolioGrid || typeof realProjects === 'undefined' || realProjects.length === 0) return;

    // Mélange aléatoire (Fisher-Yates) d'une copie de realProjects
    const pool = [...realProjects];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // Sélectionner un maximum de 4 projets aléatoires
    const featuredProjects = pool.slice(0, 4);

    featuredPortfolioGrid.innerHTML = featuredProjects.map(project => {
      const pIndex = realProjects.findIndex(p => p.id === project.id);
      const photoCount = (project.images && project.images.length) || 1;
      return `
        <div class="portfolio-item group cursor-pointer" data-project-id="${project.id}" data-project-index="${pIndex}">
          <div class="portfolio-media">
            <span class="portfolio-gallery-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              ${photoCount} photo${photoCount > 1 ? 's' : ''}
            </span>
            <img src="${project.cover}" alt="${project.title}" loading="lazy" />
            <div class="portfolio-hover-overlay">
              <span class="badge-mini text-orange bg-orange/20 border border-orange/40">${(project.categoryLabel || 'RÉALISATION').toUpperCase()}</span>
              <h3 class="text-base font-bold font-outfit text-white mt-2">${project.title}</h3>
              <p class="text-xs text-gray-300 mt-1 line-clamp-2">${project.tagline || project.desc}</p>
              <button type="button" class="btn-preview-project mt-3">Voir la galerie ↗</button>
            </div>
          </div>
          <div class="portfolio-info">
            <div class="flex items-center justify-between text-xs mb-1">
              <span class="font-semibold text-orange">${project.client}</span>
              <span class="text-gray-500">${project.year}</span>
            </div>
            <h4 class="font-outfit font-bold text-sm text-white group-hover:text-orange transition-colors line-clamp-1">${project.title}</h4>
          </div>
        </div>
      `;
    }).join('');

    // Attacher l'événement d'ouverture de la Lightbox
    featuredPortfolioGrid.querySelectorAll('.portfolio-item').forEach(card => {
      card.addEventListener('click', () => {
        const pIndex = parseInt(card.getAttribute('data-project-index'), 10);
        if (!isNaN(pIndex) && pIndex >= 0) {
          openLightbox(pIndex, 0);
        }
      });
    });
  }

  // Initialisation immédiate des 4 projets vedettes
  renderFeaturedProjects();

  // Synchronisation dynamique du portfolio complet (sur realisations.html) si personnalisé via l'Admin
  function syncFullPortfolioGrid() {
    const grid = document.getElementById('portfolioGrid');
    const custom = localStorage.getItem('kp_custom_projects');
    if (!grid || !custom) return;

    try {
      const projects = JSON.parse(custom);
      if (!Array.isArray(projects) || projects.length === 0) return;

      grid.innerHTML = projects.map((p, idx) => `
        <div class="portfolio-item group" data-category="${p.category || 'branding'}" data-project="${idx}" data-project-id="${p.id}">
          <div class="portfolio-media">
            <img src="${p.cover || 'assets/portfolio/sentrak.png'}" alt="${p.title}" loading="lazy" onerror="this.src='assets/portfolio/sentrak.png'" />
            <div class="portfolio-hover-overlay">
              <span class="badge-mini text-orange bg-orange/20 border border-orange/40">${(p.categoryLabel || p.category || 'EXPERTISE').toUpperCase()}</span>
              <h3 class="text-lg font-bold font-outfit text-white mt-2">${p.title}</h3>
              <p class="text-xs text-gray-300 mt-1">${p.tagline || ''}</p>
              <button class="btn-preview-project mt-3">Voir la galerie ↗</button>
            </div>
          </div>
          <div class="portfolio-info">
            <span class="text-xs font-semibold text-orange uppercase tracking-wider">${p.categoryLabel || p.category}</span>
            <h4 class="font-outfit font-bold text-white text-base mt-1">${p.title}</h4>
            <p class="text-xs text-gray-400 mt-1 line-clamp-2">${p.desc || p.tagline || ''}</p>
          </div>
        </div>
      `).join('');

      // Re-lier les écouteurs de clic pour la lightbox
      grid.querySelectorAll('.portfolio-item').forEach(card => {
        card.addEventListener('click', () => {
          const pid = card.getAttribute('data-project-id');
          let pIndex = -1;
          if (pid) pIndex = realProjects.findIndex(p => p.id === pid);
          if (pIndex === -1) {
            const parsed = parseInt(card.getAttribute('data-project'), 10);
            pIndex = isNaN(parsed) ? 0 : parsed;
          }
          openLightbox(pIndex, 0);
        });
      });
    } catch (e) {}
  }

  syncFullPortfolioGrid();

  /* ==========================================================
     5. TESTIMONIALS SLIDER (Inspiration Vidéo Pinterest)
     ========================================================== */
  const testimonialTrack = document.getElementById('testimonialTrack');
  const btnTestimonialPrev = document.getElementById('testimonial-prev');
  const btnTestimonialNext = document.getElementById('testimonial-next');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  const slides = document.querySelectorAll('.testimonial-slide');
  let currentSlide = 0;

  function updateTestimonials(slideIndex) {
    if (!testimonialTrack || slides.length === 0) return;
    const maxSlide = window.innerWidth >= 1024 ? slides.length - 3 : window.innerWidth >= 768 ? slides.length - 2 : slides.length - 1;
    currentSlide = Math.max(0, Math.min(slideIndex, Math.max(0, maxSlide)));
    
    const slideWidth = slides[0].offsetWidth;
    testimonialTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

    testimonialDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  if (btnTestimonialPrev && btnTestimonialNext) {
    btnTestimonialPrev.addEventListener('click', () => updateTestimonials(currentSlide - 1));
    btnTestimonialNext.addEventListener('click', () => updateTestimonials(currentSlide + 1));
  }

  testimonialDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => updateTestimonials(idx));
  });

  // Swipe tactile pour le slider de témoignages sur smartphone
  const testimonialSliderWrapper = document.getElementById('testimonialSliderWrapper');
  if (testimonialSliderWrapper) {
    let testTouchStartX = 0;
    let testTouchStartY = 0;

    testimonialSliderWrapper.addEventListener('touchstart', (e) => {
      testTouchStartX = e.touches[0].clientX;
      testTouchStartY = e.touches[0].clientY;
    }, { passive: true });

    testimonialSliderWrapper.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - testTouchStartX;
      const diffY = touchEndY - testTouchStartY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
        if (diffX < 0) {
          updateTestimonials(currentSlide + 1);
        } else {
          updateTestimonials(currentSlide - 1);
        }
      }
    }, { passive: true });
  }

  window.addEventListener('resize', () => updateTestimonials(currentSlide));

  /* ==========================================================
     6. FAQ ACCORDION
     ========================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(f => f.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  /* ==========================================================
     7. MODAL DEVIS EXPRESS
     ========================================================== */
  const quoteModal = document.getElementById('quoteModal');
  const openQuoteBtns = [
    document.getElementById('btn-open-quote-modal'),
    document.getElementById('btn-hero-quote'),
    document.getElementById('btn-bento-quote'),
    document.getElementById('btn-mobile-quote')
  ];
  const closeQuoteModalBtn = document.getElementById('btn-close-quote-modal');
  const modalQuoteForm = document.getElementById('modalQuoteForm');

  openQuoteBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        if (quoteModal) quoteModal.classList.remove('hidden');
      });
    }
  });

  if (closeQuoteModalBtn && quoteModal) {
    closeQuoteModalBtn.addEventListener('click', () => quoteModal.classList.add('hidden'));
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) quoteModal.classList.add('hidden');
    });
  }

  if (modalQuoteForm) {
    modalQuoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = modalQuoteForm.querySelector('input[type="text"]')?.value || 'Client';
      const phoneInput = modalQuoteForm.querySelector('input[type="tel"]')?.value || 'Non spécifié';
      const emailInput = modalQuoteForm.querySelector('input[type="email"]')?.value || 'Non spécifié';
      const timelineSelect = modalQuoteForm.querySelector('select')?.value || 'Standard';
      const checkedServices = Array.from(modalQuoteForm.querySelectorAll('input[name="services"]:checked')).map(cb => {
        const span = cb.parentElement?.querySelector('span');
        return span ? span.textContent.trim() : cb.value;
      });

      saveLeadToStorage({
        type: 'estimation_express',
        name: nameInput,
        company: 'Estimation Express (Accueil)',
        email: emailInput,
        phone: phoneInput,
        timeline: timelineSelect,
        poles: checkedServices.length > 0 ? checkedServices : ['Services Web & Design'],
        msg: `Demande d'estimation express pour les services : ${checkedServices.join(', ')}`
      });

      alert('✓ Votre estimation a été envoyée ! Un chargé de projet Kreativ\'Pulse prendra contact avec vous sous 24h.');
      quoteModal.classList.add('hidden');
      modalQuoteForm.reset();
    });
  }

  /* ==========================================================
     8. WHATSAPP FLOATING DRAWER
     ========================================================== */
  const whatsappTriggerBtn = document.getElementById('whatsappTriggerBtn');
  const whatsappDrawer = document.getElementById('whatsappDrawer');
  const closeWhatsappDrawer = document.getElementById('closeWhatsappDrawer');
  const btnOpenWhatsappDrawer = document.getElementById('btn-open-whatsapp-drawer');

  if (whatsappTriggerBtn && whatsappDrawer) {
    whatsappTriggerBtn.addEventListener('click', () => {
      whatsappDrawer.classList.toggle('hidden');
    });
  }

  if (btnOpenWhatsappDrawer && whatsappDrawer) {
    btnOpenWhatsappDrawer.addEventListener('click', () => {
      whatsappDrawer.classList.remove('hidden');
      whatsappDrawer.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
  }

  if (closeWhatsappDrawer && whatsappDrawer) {
    closeWhatsappDrawer.addEventListener('click', () => {
      whatsappDrawer.classList.add('hidden');
    });
  }

  /* ==========================================================
     9. CONFIGURATEUR DE BRIEF INTERACTIF & QG DAKAR
     ========================================================== */
  
  // A. Horloge en direct de Dakar (GMT / UTC+0)
  function updateDakarClock() {
    const clockEl = document.getElementById('dakar-clock');
    if (!clockEl) return;
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}:${seconds} GMT`;
  }
  setInterval(updateDakarClock, 1000);
  updateDakarClock();

  // B. Gestion des Pôles, Budget et Calendrier
  const briefChips = document.querySelectorAll('.brief-chip');
  const briefPolesCount = document.getElementById('brief-poles-count');
  const dynamicSummary = document.getElementById('brief-dynamic-summary');
  let selectedPoles = [];
  let selectedBudget = '2M à 5M';
  let selectedTimeline = '1 mois';

  function updateBriefSummary() {
    if (briefPolesCount) {
      const count = selectedPoles.length;
      briefPolesCount.textContent = count === 0 ? '0 pôle sélectionné' : `${count} pôle${count > 1 ? 's' : ''} sélectionné${count > 1 ? 's' : ''}`;
    }
    if (dynamicSummary) {
      const polesText = selectedPoles.length > 0 ? selectedPoles.join(', ') : 'Aucun pôle sélectionné';
      dynamicSummary.innerHTML = `<span class="text-gray-500">Brief :</span> <strong class="text-white">${selectedPoles.length} pôle(s)</strong> (${polesText}) • Budget <strong class="text-cyan">${selectedBudget}</strong> • Délai <strong class="text-orange">${selectedTimeline}</strong>`;
    }
  }

  briefChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      const poleName = chip.getAttribute('data-pole');
      if (chip.classList.contains('active')) {
        if (!selectedPoles.includes(poleName)) selectedPoles.push(poleName);
      } else {
        selectedPoles = selectedPoles.filter(p => p !== poleName);
      }
      updateBriefSummary();
    });
  });

  // Budget Pills
  const budgetPills = document.querySelectorAll('.budget-pill');
  budgetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      budgetPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedBudget = pill.getAttribute('data-budget') || 'À définir';
      updateBriefSummary();
    });
  });

  // Timeline Pills
  const timelinePills = document.querySelectorAll('.timeline-pill');
  timelinePills.forEach(pill => {
    pill.addEventListener('click', () => {
      timelinePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedTimeline = pill.getAttribute('data-timeline') || 'À définir';
      updateBriefSummary();
    });
  });

  // C. Insertion rapide des Quick Tags dans le message
  const quickTags = document.querySelectorAll('.quick-tag');
  const briefMessage = document.getElementById('briefMessage');
  quickTags.forEach(tag => {
    tag.addEventListener('click', () => {
      if (!briefMessage) return;
      const tagText = tag.getAttribute('data-tag');
      if (briefMessage.value.trim().length === 0) {
        briefMessage.value = tagText;
      } else if (!briefMessage.value.includes(tagText)) {
        briefMessage.value += `\n${tagText}`;
      }
      briefMessage.focus();
    });
  });

  // D. Copie rapide dans le presse-papier (Standard / Mobile / Email)
  const copyButtons = document.querySelectorAll('.btn-copy-contact');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (navigator.clipboard && textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.textContent;
          btn.textContent = 'Copié !';
          btn.classList.add('bg-green-500/20', 'text-green-400');
          setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('bg-green-500/20', 'text-green-400');
          }, 2000);
        }).catch(() => {
          prompt('Copiez :', textToCopy);
        });
      }
    });
  });

  // Helper pour enregistrer une demande dans le stockage local pour l'Espace Admin
  function saveLeadToStorage(leadData) {
    try {
      const stored = localStorage.getItem('kp_leads');
      const leads = stored ? JSON.parse(stored) : [];
      leads.unshift({
        id: 'lead-' + Date.now(),
        date: new Date().toISOString(),
        status: 'new',
        ...leadData
      });
      localStorage.setItem('kp_leads', JSON.stringify(leads));
    } catch (e) {}
  }

  // E. Soumission classique du formulaire avec confirmation
  const interactiveBriefForm = document.getElementById('interactiveBriefForm');
  const briefSuccessBanner = document.getElementById('brief-success-banner');
  if (interactiveBriefForm) {
    interactiveBriefForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Enregistrer le lead pour l'Espace Admin
      const briefName = document.getElementById('briefName')?.value.trim() || 'Client Intéressé';
      const briefCompany = document.getElementById('briefCompany')?.value.trim() || 'Particulier';
      const briefEmail = document.getElementById('briefEmail')?.value.trim() || 'Non spécifié';
      const briefPhone = document.getElementById('briefPhone')?.value.trim() || 'Non spécifié';
      const briefMessage = document.getElementById('briefMessage')?.value.trim() || 'Demande via formulaire Studio';
      const briefBudgetEl = document.getElementById('briefBudgetDisplay');
      const briefBudget = briefBudgetEl ? briefBudgetEl.textContent : 'Non spécifié';
      const briefTimelineEl = document.getElementById('briefTimelineSelect');
      const briefTimeline = briefTimelineEl ? briefTimelineEl.value : 'Standard';

      saveLeadToStorage({
        type: 'contact_studio',
        name: briefName,
        company: briefCompany,
        email: briefEmail,
        phone: briefPhone,
        msg: briefMessage
      });

      if (briefSuccessBanner) {
        briefSuccessBanner.classList.remove('hidden');
        interactiveBriefForm.reset();
        briefChips.forEach(c => c.classList.remove('active'));
        selectedPoles = [];
        updateBriefSummary();
        setTimeout(() => {
          briefSuccessBanner.classList.add('hidden');
        }, 8000);
      }
    });
  }

  // F. Transfert instantané du message sur WhatsApp
  const btnSendBriefWhatsapp = document.getElementById('btnSendBriefWhatsapp');
  if (btnSendBriefWhatsapp) {
    btnSendBriefWhatsapp.addEventListener('click', () => {
      const name = document.getElementById('briefName')?.value.trim() || 'Client Intéressé';
      const company = document.getElementById('briefCompany')?.value.trim() || 'Non spécifié';
      const email = document.getElementById('briefEmail')?.value.trim() || 'Non spécifié';
      const phone = document.getElementById('briefPhone')?.value.trim() || 'Non spécifié';
      const msg = document.getElementById('briefMessage')?.value.trim() || 'Demande d\'échange ou collaboration';

      saveLeadToStorage({
        type: 'contact_studio',
        name: name,
        company: company,
        email: email,
        phone: phone,
        msg: msg
      });
      
      const whatsappText = `*NOUVEAU CONTACT - KREATIV'PULSE*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Nom :* ${name}\n` +
        `🏢 *Entreprise / Site :* ${company}\n` +
        `📧 *Email :* ${email}\n\n` +
        `📝 *Message :*\n${msg}\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `Transmis depuis www.kreativpulse.net (Siège Sicap Liberté 5/C)`;
      
      window.open(`https://wa.me/221776442442?text=${encodeURIComponent(whatsappText)}`, '_blank');
    });
  }

  /* ==========================================================
     10. GESTION DU LIEN ACTIF MULTIPAGE (NAVBAR & MOBILE)
     ========================================================== */
  function syncMultipageActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-item');
    
    // Déterminer la page courante
    let pathname = window.location.pathname.toLowerCase();
    let currentFile = pathname.substring(pathname.lastIndexOf('/') + 1);
    
    if (!currentFile || currentFile === '' || currentFile === '/' || currentFile === 'index.html') {
      currentFile = 'index.html';
    }

    function checkIsMatch(href) {
      if (!href) return false;
      const cleanHref = href.toLowerCase().split('#')[0].split('?')[0];
      const targetFile = cleanHref.substring(cleanHref.lastIndexOf('/') + 1);

      // Accueil
      if (currentFile === 'index.html') {
        return targetFile === 'index.html' || targetFile === '' || targetFile === '/';
      }

      // Comparaison sans extension .html (supporte /services et /services.html)
      const currentBase = currentFile.replace('.html', '');
      const targetBase = targetFile.replace('.html', '');

      return currentBase === targetBase;
    }

    // Mettre à jour la Navbar Desktop
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (checkIsMatch(href)) {
        link.classList.add('active');
      } else if (href && !href.startsWith('#')) {
        link.classList.remove('active');
      }
    });

    // Mettre à jour le Menu Mobile
    mobileLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (checkIsMatch(href)) {
        link.classList.add('active');
      } else if (href && !href.startsWith('#')) {
        link.classList.remove('active');
      }
    });
  }

  // Activer immédiatement au chargement
  syncMultipageActiveNav();

  /* ==========================================================
     11. MOTEUR CATALOGUE GOODIES & SIGNALÉTIQUE (BOUTIQUE)
     ========================================================== */
  
  // A. Aplatir et indexer tous les produits avec leurs métadonnées
  let allCatalogProducts = [];
  const subcategoryMetaMap = {};

  if (typeof KP_CATALOG_CATEGORIES !== 'undefined' && typeof KP_CATALOG_PRODUCTS !== 'undefined') {
    KP_CATALOG_CATEGORIES.forEach(universe => {
      if (universe.sub && Array.isArray(universe.sub)) {
        universe.sub.forEach(sub => {
          subcategoryMetaMap[sub.slug] = {
            universeSlug: universe.slug,
            universeLabel: universe.label,
            subSlug: sub.slug,
            subLabel: sub.label,
            specs: sub.specs || [],
            techniques: sub.techniques || [],
            matieres: sub.matieres || []
          };

          // 1. Produits directement associés à la sous-catégorie
          const directProducts = KP_CATALOG_PRODUCTS[sub.slug] || [];
          directProducts.forEach(p => {
            allCatalogProducts.push({
              id: 'prod_' + allCatalogProducts.length,
              ref: p.ref || '000000',
              name: p.name || 'Produit Personnalisé',
              description: p.description || '',
              image: p.image || 'assets/portfolio/sentrak.png',
              url: p.url || '',
              universeSlug: universe.slug,
              universeLabel: universe.label,
              subSlug: sub.slug,
              subLabel: sub.label,
              itemSlug: sub.slug,
              itemLabel: sub.label,
              specs: sub.specs || [],
              techniques: sub.techniques || [],
              matieres: sub.matieres || []
            });
          });

          // 2. Produits associés aux sous-items détaillés (ex: 674-natures-composes, 675-classiques-composes...)
          if (sub.items && Array.isArray(sub.items)) {
            sub.items.forEach(item => {
              subcategoryMetaMap[item.slug] = {
                universeSlug: universe.slug,
                universeLabel: universe.label,
                subSlug: sub.slug,
                subLabel: sub.label,
                itemSlug: item.slug,
                itemLabel: item.label,
                specs: sub.specs || [],
                techniques: sub.techniques || [],
                matieres: sub.matieres || []
              };

              const itemProducts = KP_CATALOG_PRODUCTS[item.slug] || [];
              itemProducts.forEach(p => {
                allCatalogProducts.push({
                  id: 'prod_' + allCatalogProducts.length,
                  ref: p.ref || '000000',
                  name: p.name || 'Produit Personnalisé',
                  description: p.description || '',
                  image: p.image || 'assets/portfolio/sentrak.png',
                  url: p.url || '',
                  universeSlug: universe.slug,
                  universeLabel: universe.label,
                  subSlug: sub.slug,
                  subLabel: sub.label,
                  itemSlug: item.slug,
                  itemLabel: item.label,
                  specs: sub.specs || [],
                  techniques: sub.techniques || [],
                  matieres: sub.matieres || []
                });
              });
            });
          }
        });
      }
    });

    // 3. Filet de sécurité pour les catégories orphelines éventuelles dans KP_CATALOG_PRODUCTS
    Object.keys(KP_CATALOG_PRODUCTS).forEach(key => {
      const alreadyIndexed = allCatalogProducts.some(p => p.itemSlug === key || p.subSlug === key);
      if (!alreadyIndexed) {
        const orphanList = KP_CATALOG_PRODUCTS[key] || [];
        orphanList.forEach(p => {
          allCatalogProducts.push({
            id: 'prod_' + allCatalogProducts.length,
            ref: p.ref || '000000',
            name: p.name || 'Produit Personnalisé',
            description: p.description || '',
            image: p.image || 'assets/portfolio/sentrak.png',
            url: p.url || '',
            universeSlug: '10-objets-publicitaires',
            universeLabel: 'Objets publicitaires',
            subSlug: key,
            subLabel: key,
            itemSlug: key,
            itemLabel: key,
            specs: [],
            techniques: [],
            matieres: []
          });
        });
      }
    });

    // Synchronisation avec les produits modifiés ou ajoutés depuis l'Admin
    try {
      const storedCatalog = localStorage.getItem('kp_custom_catalog');
      if (storedCatalog) {
        const parsed = JSON.parse(storedCatalog);
        if (Array.isArray(parsed) && parsed.length > 0) {
          allCatalogProducts = parsed;
        }
      }
    } catch (e) {
      console.warn('Erreur lecture catalogue personnalisé:', e);
    }
    if (typeof window !== 'undefined') {
      window.allCatalogProducts = allCatalogProducts;
    }
  }

  // Fonction de mélange aléatoire (Fisher-Yates)
  function shuffleCatalogProducts(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  let randomizedAllProducts = shuffleCatalogProducts(allCatalogProducts);

  // B. État du Catalogue
  let catalogState = {
    universe: 'all',
    sub: 'all',
    search: '',
    sort: 'featured',
    visibleCount: 12,
    PAGE_SIZE: 12
  };

  // Support des paramètres d'URL (?universe=... ou ?sub=... ou ?q=...)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('universe')) {
      const u = urlParams.get('universe');
      if (u) catalogState.universe = u;
    }
    if (urlParams.has('sub')) {
      const s = urlParams.get('sub');
      if (s) {
        catalogState.sub = s;
        const meta = subcategoryMetaMap[s];
        if (meta) catalogState.universe = meta.universeSlug;
      }
    }
    if (urlParams.has('q')) {
      catalogState.search = urlParams.get('q') || '';
    }
  } catch(e) {}

  // C. Éléments DOM du Catalogue
  const catalogGrid = document.getElementById('catalog-grid');
  const catalogSearchInput = document.getElementById('catalog-search-input');
  const btnClearSearch = document.getElementById('btn-clear-search');
  const catalogUniverseTabs = document.querySelectorAll('.catalog-universe-tab');
  const catalogSubcategoriesBar = document.getElementById('catalog-subcategories-bar');
  const catalogMobileSubSelect = document.getElementById('catalog-mobile-sub-select');
  const catalogMobileSubCount = document.getElementById('catalog-mobile-sub-count');
  const catalogResultsInfo = document.getElementById('catalog-results-info');
  const catalogSortSelect = document.getElementById('catalog-sort-select');
  const btnCatalogLoadMore = document.getElementById('btn-catalog-load-more');
  const catalogLoadMoreContainer = document.getElementById('catalog-load-more-container');
  const catalogEmptyState = document.getElementById('catalog-empty-state');
  const btnResetCatalogFilter = document.getElementById('btn-reset-catalog-filter');

  // D. Rendu des sous-catégories sous forme de pilules tactiles (Desktop) & liste déroulante premium (Mobile)
  function renderSubcategoryPills(universeSlug) {
    if (!catalogSubcategoriesBar && !catalogMobileSubSelect) return;
    if (catalogSubcategoriesBar) catalogSubcategoriesBar.innerHTML = '';
    if (catalogMobileSubSelect) catalogMobileSubSelect.innerHTML = '';

    let subcategories = [];
    if (typeof KP_CATALOG_CATEGORIES !== 'undefined') {
      if (universeSlug === 'all') {
        // Sélection des sous-catégories phares
        KP_CATALOG_CATEGORIES.forEach(u => {
          if (u.sub) subcategories.push(...u.sub.slice(0, 3));
        });
      } else {
        const found = KP_CATALOG_CATEGORIES.find(u => u.slug === universeSlug);
        if (found && found.sub) subcategories = found.sub;
      }
    }

    if (catalogMobileSubCount) {
      catalogMobileSubCount.textContent = `${subcategories.length + 1} types`;
    }

    // 1. Bouton "Tous les types" Desktop
    if (catalogSubcategoriesBar) {
      const allPill = document.createElement('button');
      allPill.type = 'button';
      allPill.className = `catalog-sub-pill ${catalogState.sub === 'all' ? 'active' : ''}`;
      allPill.textContent = 'Tous les types';
      allPill.addEventListener('click', () => {
        catalogState.sub = 'all';
        catalogState.visibleCount = catalogState.PAGE_SIZE;
        if (catalogState.universe === 'all') {
          randomizedAllProducts = shuffleCatalogProducts(allCatalogProducts);
        }
        renderSubcategoryPills(catalogState.universe);
        renderCatalog();
      });
      catalogSubcategoriesBar.appendChild(allPill);
    }

    // 2. Option "Tous les types" Mobile Select
    if (catalogMobileSubSelect) {
      const allOption = document.createElement('option');
      allOption.value = 'all';
      allOption.textContent = '✦ Tous les types';
      if (catalogState.sub === 'all') allOption.selected = true;
      catalogMobileSubSelect.appendChild(allOption);
    }

    // 3. Rendu des sous-catégories
    subcategories.forEach(s => {
      // Desktop Pill
      if (catalogSubcategoriesBar) {
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = `catalog-sub-pill ${catalogState.sub === s.slug ? 'active' : ''}`;
        pill.textContent = s.label;
        pill.addEventListener('click', () => {
          catalogState.sub = s.slug;
          catalogState.visibleCount = catalogState.PAGE_SIZE;
          renderSubcategoryPills(catalogState.universe);
          renderCatalog();
        });
        catalogSubcategoriesBar.appendChild(pill);
      }

      // Mobile Select Option
      if (catalogMobileSubSelect) {
        const opt = document.createElement('option');
        opt.value = s.slug;
        opt.textContent = s.label;
        if (catalogState.sub === s.slug) opt.selected = true;
        catalogMobileSubSelect.appendChild(opt);
      }
    });

    if (catalogMobileSubSelect) {
      catalogMobileSubSelect.value = catalogState.sub;
    }
  }

  // Écouteur sur la liste déroulante mobile des sous-catégories
  if (catalogMobileSubSelect) {
    catalogMobileSubSelect.addEventListener('change', (e) => {
      catalogState.sub = e.target.value;
      catalogState.visibleCount = catalogState.PAGE_SIZE;
      if (catalogState.universe === 'all' && catalogState.sub === 'all') {
        randomizedAllProducts = shuffleCatalogProducts(allCatalogProducts);
      }
      renderSubcategoryPills(catalogState.universe);
      renderCatalog();
    });
  }

  // E. Filtrage et tri des produits
  function getFilteredCatalogProducts() {
    let list;
    const isAllUniverseAndTypes = catalogState.universe === 'all' && catalogState.sub === 'all';

    // Quand "✦ Tous les univers" et "Tous les types" sont sélectionnés, afficher les produits de manière aléatoire
    if (isAllUniverseAndTypes && !catalogState.search.trim() && catalogState.sort === 'featured') {
      list = randomizedAllProducts.slice();
    } else {
      list = allCatalogProducts.slice();
    }

    // Filtre Univers
    if (catalogState.universe !== 'all') {
      list = list.filter(p => p.universeSlug === catalogState.universe);
    }

    // Filtre Sous-catégorie
    if (catalogState.sub !== 'all') {
      list = list.filter(p => p.subSlug === catalogState.sub || p.itemSlug === catalogState.sub);
    }

    // Filtre Recherche textuelle
    if (catalogState.search.trim()) {
      const q = catalogState.search.toLowerCase().trim();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.ref.toLowerCase().includes(q) ||
        p.subLabel.toLowerCase().includes(q) ||
        (p.itemLabel && p.itemLabel.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q) ||
        p.matieres.some(m => m.toLowerCase().includes(q)) ||
        p.techniques.some(t => t.toLowerCase().includes(q))
      );
    }

    // Tri
    if (catalogState.sort === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (catalogState.sort === 'name-desc') {
      list.sort((a, b) => b.name.localeCompare(a.name));
    }

    return list;
  }

  // F. Rendu principal du catalogue
  function renderCatalog() {
    if (!catalogGrid) return;

    const filtered = getFilteredCatalogProducts();
    const visible = filtered.slice(0, catalogState.visibleCount);

    // Mettre à jour l'info de résultats
    if (catalogResultsInfo) {
      let activeLabel = '';
      if (catalogState.sub !== 'all') {
        const meta = subcategoryMetaMap[catalogState.sub];
        if (meta) activeLabel = ` dans "${meta.subLabel}"`;
      } else if (catalogState.universe !== 'all') {
        const uni = typeof KP_CATALOG_CATEGORIES !== 'undefined' ? KP_CATALOG_CATEGORIES.find(u => u.slug === catalogState.universe) : null;
        if (uni) activeLabel = ` dans "${uni.label}"`;
      }
      catalogResultsInfo.innerHTML = `Affichage de <b>${visible.length}</b> sur <b>${filtered.length}</b> référence${filtered.length > 1 ? 's' : ''}${activeLabel}`;
    }

    // Gérer l'état vide
    if (filtered.length === 0) {
      catalogGrid.innerHTML = '';
      if (catalogEmptyState) {
        catalogEmptyState.classList.remove('hidden');
        const emptyTitle = catalogEmptyState.querySelector('h3');
        const emptyDesc = catalogEmptyState.querySelector('p');
        if (catalogState.sub !== 'all') {
          const meta = subcategoryMetaMap[catalogState.sub];
          const subName = meta ? meta.subLabel : catalogState.sub;
          if (emptyTitle) emptyTitle.textContent = `${subName} — Références sur commande`;
          if (emptyDesc) emptyDesc.textContent = `Les articles pour "${subName}" sont confectionnés et personnalisés à la demande dans nos ateliers de Dakar. Contactez notre équipe pour un devis express ou parcourez nos autres collections.`;
        } else {
          if (emptyTitle) emptyTitle.textContent = `Aucun produit ne correspond à votre recherche`;
          if (emptyDesc) emptyDesc.textContent = `Essayez d'autres mots-clés ou réinitialisez les filtres pour afficher l'ensemble des articles.`;
        }
      }
      if (catalogLoadMoreContainer) catalogLoadMoreContainer.classList.add('hidden');
      return;
    } else {
      if (catalogEmptyState) catalogEmptyState.classList.add('hidden');
    }

    // Générer les cartes
    catalogGrid.innerHTML = visible.map(p => `
      <div class="catalog-product-card" data-id="${p.id}" data-ref="${p.ref}">
        <div class="product-card-media">
          <img src="${p.image}" alt="${p.name}" class="product-card-img" loading="lazy" decoding="async" width="300" height="225" onerror="this.src='assets/portfolio/sentrak.png'" />
          <span class="product-badge-cat">${p.subLabel}</span>
        </div>
        <div class="product-card-body">
          <h4 class="product-card-title">${p.name}</h4>
          <p class="product-card-desc">${p.description || 'Produit personnalisable de haute qualité pour vos événements et communications d\'entreprise.'}</p>
          <div class="product-card-footer">
            <button type="button" class="btn-card-detail" data-id="${p.id}">
              <span><span class="hidden sm:inline">Fiche & </span>Devis</span>
              <span>↗</span>
            </button>
            <button type="button" class="btn-card-quick-add" data-id="${p.id}" aria-label="Ajouter 50 exemplaires au panier de devis" title="Ajouter 50 ex. au panier">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attacher les écouteurs sur les cartes et boutons
    catalogGrid.querySelectorAll('.catalog-product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-card-quick-add')) return;
        const id = card.getAttribute('data-id');
        const prod = allCatalogProducts.find(p => p.id === id);
        if (prod) openProductModal(prod);
      });
    });

    catalogGrid.querySelectorAll('.btn-card-quick-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const prod = allCatalogProducts.find(p => p.id === id);
        if (prod) {
          cartEngine.addItem({
            ref: prod.ref,
            name: prod.name,
            subLabel: prod.subLabel,
            universeLabel: prod.universeLabel,
            image: prod.image,
            qty: 50,
            technique: prod.techniques[0] || 'Marquage standard',
            matiere: prod.matieres[0] || 'Standard'
          });
          showToast(`✓ 50x ${prod.name} ajoutés à votre panier !`);
        }
      });
    });

    // Bouton Charger Plus
    if (catalogLoadMoreContainer) {
      if (catalogState.visibleCount >= filtered.length) {
        catalogLoadMoreContainer.classList.add('hidden');
      } else {
        catalogLoadMoreContainer.classList.remove('hidden');
      }
    }
  }

  // G. Écouteurs sur les filtres et la recherche
  if (catalogSearchInput) {
    let debounceTimer;
    catalogSearchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        catalogState.search = e.target.value;
        catalogState.visibleCount = catalogState.PAGE_SIZE;
        if (btnClearSearch) {
          btnClearSearch.classList.toggle('hidden', !catalogState.search);
        }
        renderCatalog();
      }, 250);
    });
  }

  if (btnClearSearch) {
    btnClearSearch.addEventListener('click', () => {
      if (catalogSearchInput) catalogSearchInput.value = '';
      catalogState.search = '';
      btnClearSearch.classList.add('hidden');
      catalogState.visibleCount = catalogState.PAGE_SIZE;
      renderCatalog();
    });
  }

  if (catalogUniverseTabs) {
    catalogUniverseTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        catalogUniverseTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        catalogState.universe = tab.getAttribute('data-universe');
        catalogState.sub = 'all';
        catalogState.visibleCount = catalogState.PAGE_SIZE;
        if (catalogState.universe === 'all') {
          randomizedAllProducts = shuffleCatalogProducts(allCatalogProducts);
        }
        renderSubcategoryPills(catalogState.universe);
        renderCatalog();
      });
    });
  }

  if (catalogSortSelect) {
    catalogSortSelect.addEventListener('change', (e) => {
      catalogState.sort = e.target.value;
      renderCatalog();
    });
  }

  if (btnCatalogLoadMore) {
    btnCatalogLoadMore.addEventListener('click', () => {
      catalogState.visibleCount += catalogState.PAGE_SIZE;
      renderCatalog();
    });
  }

  if (btnResetCatalogFilter) {
    btnResetCatalogFilter.addEventListener('click', () => {
      catalogState.universe = 'all';
      catalogState.sub = 'all';
      catalogState.search = '';
      randomizedAllProducts = shuffleCatalogProducts(allCatalogProducts);
      if (catalogSearchInput) catalogSearchInput.value = '';
      if (btnClearSearch) btnClearSearch.classList.add('hidden');
      catalogUniverseTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-universe') === 'all'));
      renderSubcategoryPills('all');
      renderCatalog();
    });
  }

  // Synchronisation initiale des tabs univers et recherche
  if (catalogUniverseTabs) {
    catalogUniverseTabs.forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-universe') === catalogState.universe);
    });
  }
  if (catalogSearchInput && catalogState.search) {
    catalogSearchInput.value = catalogState.search;
    if (btnClearSearch) btnClearSearch.classList.remove('hidden');
  }

  // Fonction de défilement fluide vers la section produits
  function scrollToCatalogProducts(smooth = true) {
    const target = document.getElementById('catalog-subcategories-bar') || document.getElementById('catalog-grid') || document.getElementById('catalogue');
    if (!target) return;
    const navOffset = 95;
    const pos = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
    window.scrollTo({
      top: Math.max(0, pos),
      behavior: smooth ? 'smooth' : 'auto'
    });
  }

  // Initialisation du Catalogue
  renderSubcategoryPills(catalogState.universe);
  renderCatalog();

  // Rendu des 4 Produits Vedettes Aléatoires (Accueil)
  function renderFeaturedProducts() {
    const featuredGrid = document.getElementById('featured-products-grid');
    if (!featuredGrid || typeof allCatalogProducts === 'undefined' || allCatalogProducts.length === 0) return;

    // Produits avec images réelles
    const pool = allCatalogProducts.filter(p => p.image && !p.image.includes('placeholder'));
    
    // Mélange aléatoire (Fisher-Yates)
    const shuffled = shuffleCatalogProducts(pool.length > 0 ? pool : allCatalogProducts);
    
    // Sélectionner un maximum de 4 produits aléatoires
    const featuredList = shuffled.slice(0, 4);

    featuredGrid.innerHTML = featuredList.map(p => `
      <div class="catalog-product-card" data-id="${p.id}" data-ref="${p.ref}">
        <div class="product-card-media">
          <img src="${p.image}" alt="${p.name}" class="product-card-img" loading="lazy" onerror="this.src='assets/portfolio/sentrak.png'" />
          <span class="product-badge-cat">${p.subLabel}</span>
        </div>
        <div class="product-card-body flex flex-col justify-between">
          <div>
            <h4 class="product-card-title">${p.name}</h4>
            <p class="product-card-desc">${p.description || 'Produit personnalisable de haute qualité pour vos événements et communications d\'entreprise.'}</p>
          </div>
          <div class="product-card-footer mt-4">
            <button type="button" class="btn-card-detail" data-id="${p.id}">
              <span><span class="hidden sm:inline">Fiche & </span>Devis</span>
              <span>↗</span>
            </button>
            <button type="button" class="btn-card-quick-add" data-id="${p.id}" aria-label="Ajouter 50 exemplaires au panier de devis" title="Ajouter 50 ex. au panier">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Écouteurs pour ouvrir la modale produit
    featuredGrid.querySelectorAll('.catalog-product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-card-quick-add')) return;
        const id = card.getAttribute('data-id');
        const prod = allCatalogProducts.find(p => p.id === id);
        if (prod) openProductModal(prod);
      });
    });

    // Écouteurs pour l'ajout rapide
    featuredGrid.querySelectorAll('.btn-card-quick-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const prod = allCatalogProducts.find(p => p.id === id);
        if (prod) {
          cartEngine.addItem({
            ref: prod.ref,
            name: prod.name,
            subLabel: prod.subLabel,
            universeLabel: prod.universeLabel,
            image: prod.image,
            qty: 50,
            technique: prod.techniques[0] || 'Marquage standard',
            matiere: prod.matieres[0] || 'Standard'
          });
          showToast(`✓ 50x ${prod.name} ajoutés à votre panier !`);
        }
      });
    });
  }

  renderFeaturedProducts();

  // Scroll automatique au chargement initial si un filtre d'URL est présent
  if (typeof window !== 'undefined' && window.location.pathname.includes('catalogue')) {
    try {
      const initialParams = new URLSearchParams(window.location.search);
      if (initialParams.has('sub') || initialParams.has('universe') || initialParams.has('q')) {
        setTimeout(() => scrollToCatalogProducts(false), 120);
        setTimeout(() => scrollToCatalogProducts(true), 350);
      }
    } catch(err) {}
  }

  // H. Liaison Méga-Menu vers Catalogue avec fermeture immédiate et scroll automatique
  const megaMenuDropdowns = document.querySelectorAll('.mega-menu-dropdown');
  const navMegaContainers = document.querySelectorAll('.nav-has-megamenu');

  function closeAllMegaMenus() {
    megaMenuDropdowns.forEach(d => d.classList.add('is-closed'));
    setTimeout(() => {
      megaMenuDropdowns.forEach(d => d.classList.remove('is-closed'));
    }, 450);
  }

  navMegaContainers.forEach(container => {
    container.addEventListener('mouseleave', () => {
      megaMenuDropdowns.forEach(d => d.classList.remove('is-closed'));
    });
  });

  document.querySelectorAll('.mega-cat-title, .mega-sub-link').forEach(link => {
    const uSlug = link.getAttribute('data-filter-universe');
    const sSlug = link.getAttribute('data-filter-sub');

    // Mettre à jour l'attribut href pour navigation inter-pages
    if (uSlug) {
      link.setAttribute('href', `catalogue.html?universe=${encodeURIComponent(uSlug)}`);
    } else if (sSlug) {
      link.setAttribute('href', `catalogue.html?sub=${encodeURIComponent(sSlug)}`);
    }

    link.addEventListener('click', (e) => {
      // Fermer instantanément le méga-menu
      closeAllMegaMenus();
      link.blur();

      // Si on est déjà sur la page catalogue, filtrer en direct sans recharger
      if (window.location.pathname.includes('catalogue')) {
        e.preventDefault();
        if (uSlug) {
          catalogState.universe = uSlug;
          catalogState.sub = 'all';
          catalogState.visibleCount = catalogState.PAGE_SIZE;
          catalogUniverseTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-universe') === uSlug));
          renderSubcategoryPills(uSlug);
          try {
            history.pushState(null, '', `catalogue.html?universe=${encodeURIComponent(uSlug)}`);
          } catch(err) {}
        } else if (sSlug) {
          const meta = subcategoryMetaMap[sSlug];
          if (meta) {
            catalogState.universe = meta.universeSlug;
            catalogState.sub = sSlug;
            catalogState.visibleCount = catalogState.PAGE_SIZE;
            catalogUniverseTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-universe') === meta.universeSlug));
            renderSubcategoryPills(meta.universeSlug);
          } else {
            catalogState.sub = sSlug;
          }
          try {
            history.pushState(null, '', `catalogue.html?sub=${encodeURIComponent(sSlug)}`);
          } catch(err) {}
        }
        renderCatalog();
        setTimeout(() => {
          scrollToCatalogProducts(true);
        }, 50);
      }
    });
  });

  /* ==========================================================
     12. MODALE FICHE PRODUIT DÉTAILLÉE
     ========================================================== */
  const productDetailModal = document.getElementById('productDetailModal');
  const closeProductModalBtn = document.getElementById('closeProductModalBtn');
  const modalProductImg = document.getElementById('modalProductImg');
  const modalProductRef = document.getElementById('modalProductRef');
  const modalProductUniverse = document.getElementById('modalProductUniverse');
  const modalProductSub = document.getElementById('modalProductSub');
  const modalProductTitle = document.getElementById('modalProductTitle');
  const modalProductDesc = document.getElementById('modalProductDesc');
  const modalProductSpecs = document.getElementById('modalProductSpecs');
  const modalQtyMinus = document.getElementById('modalQtyMinus');
  const modalQtyInput = document.getElementById('modalQtyInput');
  const modalQtyPlus = document.getElementById('modalQtyPlus');
  const modalBtnAddToCart = document.getElementById('modalBtnAddToCart');
  const modalBtnProductWhatsapp = document.getElementById('modalBtnProductWhatsapp');

  let currentModalProduct = null;

  function openProductModal(prod) {
    if (!productDetailModal || !prod) return;
    currentModalProduct = prod;

    if (modalProductImg) modalProductImg.src = prod.image;
    if (modalProductRef) modalProductRef.textContent = `RÉF. ${prod.ref}`;
    if (modalProductUniverse) modalProductUniverse.textContent = prod.universeLabel;
    if (modalProductSub) modalProductSub.textContent = prod.subLabel;
    if (modalProductTitle) modalProductTitle.textContent = prod.name;
    if (modalProductDesc) modalProductDesc.textContent = prod.description || 'Produit personnalisable de haute qualité pour vos événements et communications d\'entreprise.';
    if (modalQtyInput) modalQtyInput.value = 50;

    // Badges Spécifications & Marquages
    if (modalProductSpecs) {
      const allTags = [];
      if (prod.specs) prod.specs.forEach(s => allTags.push(`<b>${s.label}:</b> ${s.value}`));
      if (prod.techniques) prod.techniques.forEach(t => allTags.push(`✦ ${t}`));
      if (prod.matieres) prod.matieres.forEach(m => allTags.push(`🏷️ ${m}`));

      modalProductSpecs.innerHTML = allTags.map(tag => `
        <span class="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px]">${tag}</span>
      `).join('');
    }

    // Bouton WhatsApp direct pour ce produit
    if (modalBtnProductWhatsapp) {
      const msg = `Bonjour Kreativ'Pulse, je souhaite des informations et un devis pour le produit : *${prod.name}* (Réf. ${prod.ref}, ${prod.subLabel}).`;
      modalBtnProductWhatsapp.href = `https://wa.me/221776442442?text=${encodeURIComponent(msg)}`;
    }

    productDetailModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProductModal() {
    if (!productDetailModal) return;
    productDetailModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeProductModalBtn) {
    closeProductModalBtn.addEventListener('click', closeProductModal);
  }

  if (productDetailModal) {
    productDetailModal.addEventListener('click', (e) => {
      if (e.target === productDetailModal) closeProductModal();
    });
  }

  function syncQtyPresets(val) {
    document.querySelectorAll('.qty-preset-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-qty') === String(val));
    });
  }

  if (modalQtyMinus && modalQtyInput) {
    modalQtyMinus.addEventListener('click', () => {
      const cur = parseInt(modalQtyInput.value || 50);
      const step = cur > 100 ? 50 : (cur > 20 ? 10 : 5);
      const nextVal = Math.max(1, cur - step);
      modalQtyInput.value = nextVal;
      syncQtyPresets(nextVal);
    });
  }

  if (modalQtyPlus && modalQtyInput) {
    modalQtyPlus.addEventListener('click', () => {
      const cur = parseInt(modalQtyInput.value || 50);
      const step = cur >= 100 ? 50 : (cur >= 20 ? 10 : 5);
      const nextVal = cur + step;
      modalQtyInput.value = nextVal;
      syncQtyPresets(nextVal);
    });
  }

  modalQtyInput?.addEventListener('input', () => {
    syncQtyPresets(modalQtyInput.value);
  });

  document.querySelectorAll('.qty-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-qty');
      if (modalQtyInput) {
        modalQtyInput.value = q;
        syncQtyPresets(q);
      }
    });
  });

  if (modalBtnAddToCart) {
    modalBtnAddToCart.addEventListener('click', () => {
      if (!currentModalProduct) return;
      const qty = parseInt(modalQtyInput?.value || 50);
      cartEngine.addItem({
        ref: currentModalProduct.ref,
        name: currentModalProduct.name,
        subLabel: currentModalProduct.subLabel,
        universeLabel: currentModalProduct.universeLabel,
        image: currentModalProduct.image,
        qty: qty,
        technique: currentModalProduct.techniques[0] || 'Marquage standard',
        matiere: currentModalProduct.matieres[0] || 'Standard'
      });
      showToast(`✓ ${qty}x ${currentModalProduct.name} ajoutés à votre panier !`);
      closeProductModal();
    });
  }

  /* ==========================================================
     13. MOTEUR PANIER DE DEVIS (LOCALSTORAGE & TUNNEL DE COMMANDE)
     ========================================================== */
  const cartEngine = {
    STORAGE_KEY: 'kp_cart',

    getItems() {
      try {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
      } catch (e) {
        return [];
      }
    },

    saveItems(items) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
      this.updateBadges();
    },

    addItem(item) {
      const items = this.getItems();
      const existing = items.find(i => i.ref === item.ref);
      if (existing) {
        existing.qty += item.qty;
      } else {
        items.push({
          id: `${item.ref}-${Date.now()}`,
          ...item
        });
      }
      this.saveItems(items);
    },

    updateQty(id, qty) {
      let items = this.getItems();
      items = items.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i);
      this.saveItems(items);
      renderCartUI();
    },

    removeItem(id) {
      let items = this.getItems();
      items = items.filter(i => i.id !== id);
      this.saveItems(items);
      renderCartUI();
    },

    clear() {
      this.saveItems([]);
      renderCartUI();
    },

    getTotalCount() {
      return this.getItems().length;
    },

    getTotalUnits() {
      return this.getItems().reduce((sum, item) => sum + (parseInt(item.qty) || 0), 0);
    },

    updateBadges() {
      const count = this.getTotalCount();
      const allBadges = document.querySelectorAll('.cart-badge-count, #cart-badge-count, #mobile-cart-badge-count');

      allBadges.forEach(b => {
        if (!b) return;
        b.textContent = count > 99 ? '99+' : count;
        if (count > 0) {
          b.classList.remove('hidden');
          b.classList.add('bump');
          setTimeout(() => b.classList.remove('bump'), 300);
        } else {
          b.classList.add('hidden');
        }
      });
    }
  };

  // Initialisation des badges panier
  cartEngine.updateBadges();

  // Éléments DOM du Panier
  const cartModal = document.getElementById('cartModal');
  const btnOpenCart = document.getElementById('btn-open-cart');
  const btnMobileOpenCart = document.getElementById('btn-mobile-open-cart');
  const closeCartModalBtn = document.getElementById('closeCartModalBtn');
  const btnClearCart = document.getElementById('btnClearCart');
  const btnContinueShopping = document.getElementById('btnContinueShopping');
  const btnProceedToStep2 = document.getElementById('btnProceedToStep2');
  const btnBackToStep1 = document.getElementById('btnBackToStep1');
  const cartStepTab1 = document.getElementById('cartStepTab1');
  const cartStepTab2 = document.getElementById('cartStepTab2');
  const cartStep1Content = document.getElementById('cartStep1Content');
  const cartStep2Content = document.getElementById('cartStep2Content');
  const cartSuccessContent = document.getElementById('cartSuccessContent');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartStep1Summary = document.getElementById('cartStep1Summary');
  const cartSummaryItemCount = document.getElementById('cartSummaryItemCount');
  const cartSummaryTotalQty = document.getElementById('cartSummaryTotalQty');
  const cartQuoteForm = document.getElementById('cartQuoteForm');
  const btnSendQuoteWhatsapp = document.getElementById('btnSendQuoteWhatsapp');
  const btnCloseSuccessModal = document.getElementById('btnCloseSuccessModal');

  function openCartModal() {
    if (!cartModal) return;
    cartModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setCartStep(1);
    renderCartUI();
  }

  function closeCartModal() {
    if (!cartModal) return;
    cartModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function setCartStep(step) {
    if (step === 1) {
      if (cartStep1Content) cartStep1Content.classList.remove('hidden');
      if (cartStep2Content) cartStep2Content.classList.add('hidden');
      if (cartSuccessContent) cartSuccessContent.classList.add('hidden');
      if (cartStepTab1) {
        cartStepTab1.className = 'cart-step-pill active';
      }
      if (cartStepTab2) {
        cartStepTab2.className = 'cart-step-pill';
      }
    } else if (step === 2) {
      if (cartStep1Content) cartStep1Content.classList.add('hidden');
      if (cartStep2Content) cartStep2Content.classList.remove('hidden');
      if (cartSuccessContent) cartSuccessContent.classList.add('hidden');
      if (cartStepTab1) {
        cartStepTab1.className = 'cart-step-pill completed';
      }
      if (cartStepTab2) {
        cartStepTab2.className = 'cart-step-pill active';
      }
      // Scroll doux vers le haut du formulaire
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else if (step === 3) {
      if (cartStep1Content) cartStep1Content.classList.add('hidden');
      if (cartStep2Content) cartStep2Content.classList.add('hidden');
      if (cartSuccessContent) cartSuccessContent.classList.remove('hidden');
      if (cartStepTab1) cartStepTab1.className = 'cart-step-pill completed';
      if (cartStepTab2) cartStepTab2.className = 'cart-step-pill completed';
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  }

  function renderCartUI() {
    if (!cartItemsList) return;
    const items = cartEngine.getItems();

    if (cartSummaryItemCount) cartSummaryItemCount.textContent = items.length;
    if (cartSummaryTotalQty) cartSummaryTotalQty.textContent = cartEngine.getTotalUnits();

    if (items.length === 0) {
      if (cartStep1Summary) cartStep1Summary.classList.add('hidden');
      cartItemsList.innerHTML = `
        <div class="text-center py-12 px-4 rounded-3xl bg-surface/40 border border-white/10 text-gray-400 space-y-4">
          <div class="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mx-auto text-orange">🛍️</div>
          <div class="space-y-1">
            <h4 class="font-outfit font-bold text-white text-lg sm:text-xl">Votre panier de devis est vide</h4>
            <p class="text-xs sm:text-sm max-w-sm mx-auto text-gray-400 leading-relaxed">
              Sélectionnez des objets publicitaires, coffrets d'affaires ou supports de signalétique dans notre boutique pour chiffrer votre projet.
            </p>
          </div>
          <div class="pt-2">
            <a href="catalogue.html" class="btn-primary inline-flex items-center justify-center gap-2 py-3 px-5 text-xs uppercase font-bold tracking-wider whitespace-nowrap max-w-full">
              <span>Découvrir le catalogue</span>
              <span class="text-white/80 font-normal hidden sm:inline">(+200 réf.)</span>
              <span>→</span>
            </a>
          </div>
        </div>
      `;
      if (btnProceedToStep2) {
        btnProceedToStep2.disabled = true;
        btnProceedToStep2.classList.add('opacity-50', 'pointer-events-none');
      }
      return;
    } else {
      if (cartStep1Summary) cartStep1Summary.classList.remove('hidden');
      if (btnProceedToStep2) {
        btnProceedToStep2.disabled = false;
        btnProceedToStep2.classList.remove('opacity-50', 'pointer-events-none');
      }
    }

    cartItemsList.innerHTML = items.map(item => `
      <div class="p-4 rounded-2xl bg-surface border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-white/20">
        <div class="flex items-center gap-3.5 min-w-0">
          <div class="w-16 h-16 rounded-xl bg-black/50 border border-white/10 p-1 shrink-0 flex items-center justify-center overflow-hidden">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-contain" onerror="this.src='assets/logos/kreativpulse-icon.webp'" />
          </div>
          <div class="min-w-0">
            <span class="text-[10px] text-orange font-bold uppercase tracking-wider">${item.subLabel || 'Goodies'} • RÉF. ${item.ref}</span>
            <h5 class="text-sm sm:text-base font-outfit font-bold text-white truncate">${item.name}</h5>
            <div class="flex flex-wrap items-center gap-2 text-[11px] text-gray-400 mt-0.5">
              <span>Technique : <strong class="text-gray-200">${item.technique || 'Standard'}</strong></span>
              ${item.matiere ? `<span>• Matière : <strong class="text-gray-200">${item.matiere}</strong></span>` : ''}
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
          <div class="flex items-center gap-1.5">
            <span class="text-[11px] text-gray-400 hidden sm:inline mr-1">Qté :</span>
            <div class="qty-stepper">
              <button type="button" class="qty-stepper-btn btn-minus btn-cart-minus" data-id="${item.id}" title="Diminuer" aria-label="Diminuer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <input type="number" min="1" value="${item.qty}" class="qty-stepper-input cart-qty-input" data-id="${item.id}" />
              <button type="button" class="qty-stepper-btn btn-plus btn-cart-plus" data-id="${item.id}" title="Augmenter" aria-label="Augmenter">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
          </div>
          <button type="button" class="btn-cart-remove text-gray-400 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors" data-id="${item.id}" title="Supprimer cet article">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>
    `).join('');

    // Écouteurs sur les éléments du panier
    cartItemsList.querySelectorAll('.btn-cart-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const item = items.find(i => i.id === id);
        if (item) {
          const step = item.qty > 50 ? 25 : (item.qty > 10 ? 10 : 1);
          cartEngine.updateQty(id, Math.max(1, item.qty - step));
        }
      });
    });

    cartItemsList.querySelectorAll('.btn-cart-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const item = items.find(i => i.id === id);
        if (item) {
          const step = item.qty >= 50 ? 25 : (item.qty >= 10 ? 10 : 1);
          cartEngine.updateQty(id, item.qty + step);
        }
      });
    });

    cartItemsList.querySelectorAll('.cart-qty-input').forEach(input => {
      input.addEventListener('change', () => {
        const id = input.getAttribute('data-id');
        const val = parseInt(input.value) || 1;
        cartEngine.updateQty(id, Math.max(1, val));
      });
    });

    cartItemsList.querySelectorAll('.btn-cart-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        cartEngine.removeItem(id);
      });
    });
  }

  // Événements d'ouverture / fermeture du Panier
  if (btnOpenCart) btnOpenCart.addEventListener('click', openCartModal);
  if (btnMobileOpenCart) btnMobileOpenCart.addEventListener('click', openCartModal);
  if (closeCartModalBtn) closeCartModalBtn.addEventListener('click', closeCartModal);
  if (btnContinueShopping) btnContinueShopping.addEventListener('click', closeCartModal);

  if (cartModal) {
    cartModal.addEventListener('click', (e) => {
      if (e.target === cartModal) closeCartModal();
    });
  }

  if (btnClearCart) {
    btnClearCart.addEventListener('click', () => {
      if (confirm('Voulez-vous vider tous les articles de votre panier de devis ?')) {
        cartEngine.clear();
      }
    });
  }

  if (btnProceedToStep2) {
    btnProceedToStep2.addEventListener('click', () => {
      if (cartEngine.getItems().length > 0) {
        setCartStep(2);
      } else {
        showToast('Ajoutez au moins un produit pour continuer');
      }
    });
  }

  if (btnBackToStep1) {
    btnBackToStep1.addEventListener('click', () => setCartStep(1));
  }

  if (cartStepTab1) {
    cartStepTab1.addEventListener('click', () => setCartStep(1));
  }

  if (cartStepTab2) {
    cartStepTab2.addEventListener('click', () => {
      if (cartEngine.getItems().length > 0) {
        setCartStep(2);
      } else {
        showToast('Votre panier de devis est vide');
      }
    });
  }

  // Synchronisation inter-onglets (si l'utilisateur ajoute un produit dans un autre onglet)
  window.addEventListener('storage', (e) => {
    if (e.key === cartEngine.STORAGE_KEY) {
      cartEngine.updateBadges();
      if (cartItemsList) renderCartUI();
    }
  });

  // INITIALISATION IMMÉDIATE DU PANIER (notamment sur la page panier.html)
  if (cartItemsList) {
    setCartStep(1);
    renderCartUI();
  }

  // Soumission du Devis par Formulaire
  if (cartQuoteForm) {
    cartQuoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const firstName = document.getElementById('quoteFirstName')?.value || 'Client';
      const lastName = document.getElementById('quoteLastName')?.value || '';
      const email = document.getElementById('quoteEmail')?.value || 'Non spécifié';
      const phone = document.getElementById('quotePhone')?.value || 'Non spécifié';
      const company = document.getElementById('quoteCompany')?.value || 'Particulier / Entreprise';
      const city = document.getElementById('quoteCity')?.value || 'Dakar';
      const timeline = document.getElementById('quoteTimeline')?.value || 'Standard (2 à 3 semaines)';
      const budget = document.getElementById('quoteBudget')?.value || '500 000 à 1 500 000 FCFA';
      const notes = document.getElementById('quoteNotes')?.value || 'Aucune note particulière';
      const deliveryOpt = document.getElementById('quoteOptionDelivery')?.checked ?? true;
      const callOpt = document.getElementById('quoteOptionCall')?.checked ?? true;
      const items = cartEngine.getItems();

      // Enregistrer le lead structuré dans le stockage admin
      saveLeadToStorage({
        type: 'devis_panier',
        name: `${firstName} ${lastName}`.trim(),
        company: company,
        email: email,
        phone: phone,
        city: city,
        timeline: timeline,
        budget: budget,
        deliveryOption: deliveryOpt,
        callOption: callOpt,
        notes: notes,
        items: items.map(i => ({
          name: i.name,
          ref: i.ref,
          qty: i.qty,
          image: i.image,
          subLabel: i.subLabel || 'Boutique'
        })),
        msg: `Articles (${cartEngine.getTotalUnits()} unités) :\n${items.map(i => `- ${i.name} [Réf. ${i.ref}] (x${i.qty})`).join('\n')}\nVille de livraison: ${city}\nNotes: ${notes}`
      });

      const successName = document.getElementById('successClientName');
      if (successName) successName.textContent = firstName;

      const submitBtn = document.getElementById('btnSubmitQuoteForm');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Envoi en cours...</span>`;
      }

      setTimeout(() => {
        cartEngine.clear();
        setCartStep(3);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Envoyer ma demande de devis</span> <span>✓</span>`;
        }
      }, 1200);
    });
  }

  // Transmission Directe sur WhatsApp
  if (btnSendQuoteWhatsapp) {
    btnSendQuoteWhatsapp.addEventListener('click', () => {
      const items = cartEngine.getItems();
      if (items.length === 0) {
        alert('Votre panier est vide. Veuillez ajouter au moins un produit.');
        return;
      }

      const firstName = document.getElementById('quoteFirstName')?.value.trim() || 'Client';
      const lastName = document.getElementById('quoteLastName')?.value.trim() || '';
      const email = document.getElementById('quoteEmail')?.value.trim() || 'Non spécifié';
      const phone = document.getElementById('quotePhone')?.value.trim() || 'Non spécifié';
      const company = document.getElementById('quoteCompany')?.value.trim() || 'Particulier / Entreprise';
      const city = document.getElementById('quoteCity')?.value.trim() || 'Dakar';
      const timeline = document.getElementById('quoteTimeline')?.value || 'Standard (2 à 3 semaines)';
      const budget = document.getElementById('quoteBudget')?.value || '500 000 à 1 500 000 FCFA';
      const notes = document.getElementById('quoteNotes')?.value.trim() || 'Aucune note particulière';
      const deliveryOpt = document.getElementById('quoteOptionDelivery')?.checked ?? true;
      const callOpt = document.getElementById('quoteOptionCall')?.checked ?? true;

      // Enregistrer le lead structuré dans le stockage admin
      saveLeadToStorage({
        type: 'devis_panier',
        name: `${firstName} ${lastName}`.trim(),
        company: company,
        email: email,
        phone: phone,
        city: city,
        timeline: timeline,
        budget: budget,
        deliveryOption: deliveryOpt,
        callOption: callOpt,
        notes: notes,
        items: items.map(i => ({
          name: i.name,
          ref: i.ref,
          qty: i.qty,
          image: i.image,
          subLabel: i.subLabel || 'Boutique'
        })),
        msg: `Articles (${cartEngine.getTotalUnits()} unités) :\n${items.map(i => `- ${i.name} [Réf. ${i.ref}] (x${i.qty})`).join('\n')}\nVille de livraison: ${city}\nNotes: ${notes}`
      });

      let itemsText = '';
      items.forEach((item, idx) => {
        itemsText += `  ${idx + 1}. *${item.name}* (Réf. ${item.ref})\n     → Quantité : *${item.qty} exemplaires*\n     → Sous-catégorie : ${item.subLabel}\n`;
      });

      const whatsappMsg = `*DEMANDE DE DEVIS — KREATIV'PULSE DAKAR*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Client :* ${firstName} ${lastName}\n` +
        `🏢 *Société :* ${company}\n` +
        `📞 *Tél/WhatsApp :* ${phone}\n` +
        `📧 *Email :* ${email}\n` +
        `📍 *Lieu de livraison :* ${city}\n` +
        `⏱️ *Délai :* ${timeline}\n` +
        `💰 *Budget indicatif :* ${budget}\n\n` +
        `📦 *ARTICLES SÉLECTIONNÉS (${cartEngine.getTotalUnits()} unités au total) :*\n` +
        itemsText + `\n` +
        `📝 *Précisions / Marquage :*\n${notes}\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `Transmis depuis www.kreativpulse.net (Boutique & Devis)`;

      window.open(`https://wa.me/221776442442?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
    });
  }

  if (btnCloseSuccessModal) {
    btnCloseSuccessModal.addEventListener('click', closeCartModal);
  }

  /* ==========================================================
     14. NEWSLETTER FOOTER (SOUMISSION & FEEDBACK)
     ========================================================== */
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const btnNewsletterSubmit = document.getElementById('btn-newsletter-submit');
  const newsletterFeedback = document.getElementById('newsletter-feedback');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail?.value.trim();
      if (!email) return;

      if (btnNewsletterSubmit) {
        btnNewsletterSubmit.disabled = true;
        btnNewsletterSubmit.innerHTML = `<span>...</span>`;
      }

      setTimeout(() => {
        if (newsletterFeedback) {
          newsletterFeedback.className = 'text-xs text-center font-bold py-1.5 px-3 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30';
          newsletterFeedback.textContent = `✓ Merci ! Vous êtes bien inscrit(e) à notre newsletter mensuelle.`;
          newsletterFeedback.classList.remove('hidden');
        }
        if (newsletterEmail) newsletterEmail.value = '';
        if (btnNewsletterSubmit) {
          btnNewsletterSubmit.disabled = false;
          btnNewsletterSubmit.innerHTML = `<span>Inscrit !</span>`;
        }
        setTimeout(() => {
          if (btnNewsletterSubmit) btnNewsletterSubmit.innerHTML = `<span>S'inscrire</span>`;
        }, 3500);
      }, 700);
    });
  }

  /* ==========================================================
     15. UTILITAIRE NOTIFICATION TOAST
     ========================================================== */
  function showToast(message) {
    let toast = document.getElementById('kp-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'kp-toast';
      toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#161922] border border-orange/40 text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-full shadow-2xl flex items-center gap-2 transition-all duration-300 opacity-0 pointer-events-none translate-y-4';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
      toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      toast.classList.remove('opacity-100', 'translate-y-0');
    }, 3200);
  }

});
