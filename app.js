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

  if (btnArcPrev && btnArcNext) {
    btnArcPrev.addEventListener('click', () => updateArcCarousel(currentActiveIndex - 1));
    btnArcNext.addEventListener('click', () => updateArcCarousel(currentActiveIndex + 1));
  }

  arcDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      updateArcCarousel(idx);
    });
  });

  arcCards.forEach(card => {
    card.addEventListener('click', () => {
      const cardIdx = Array.from(arcCards).indexOf(card);
      updateArcCarousel(cardIdx);
    });
  });

  // Auto rotate slowly every 7 seconds
  let autoRotateInterval = setInterval(() => {
    updateArcCarousel(currentActiveIndex + 1);
  }, 7000);

  const heroWrapper = document.querySelector('.hero-3d-wrapper');
  if (heroWrapper) {
    heroWrapper.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
    heroWrapper.addEventListener('mouseleave', () => {
      autoRotateInterval = setInterval(() => updateArcCarousel(currentActiveIndex + 1), 7000);
    });
  }

  /* ==========================================================
     2. MOBILE MENU DRAWER
     ========================================================== */
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });

    // Close when clicking nav links
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileDrawer.classList.add('hidden'));
    });
  }

  /* ==========================================================
     3. PORTFOLIO CATEGORY FILTER
     ========================================================== */
  const filterBtns = document.querySelectorAll('.portfolio-filters .filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================
     4. REAL PROJECTS DATA & MULTI-IMAGES LIGHTBOX ENGINE
     ========================================================== */
  const realProjects = [
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
        'assets/portfolio/dp-world-cover.png'
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
        'assets/portfolio/tournee-can.webp'
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
        'assets/portfolio/sonaged.webp'
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
        'assets/portfolio/goodies-aner.png'
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
        'assets/portfolio/caf-awards.webp'
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
        'assets/portfolio/senelec-motion.png'
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
        'assets/portfolio/dhl.webp'
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
        'assets/portfolio/goodies-noom.png'
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
        'assets/portfolio/crous.png'
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
        'assets/portfolio/colle-sow-ardo.webp'
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
        'assets/portfolio/gsef.webp'
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
        'assets/portfolio/sonacos.webp'
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
        'assets/portfolio/ergobit-locaux.webp'
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
        'assets/portfolio/sentrak.png'
      ]
    }
  ];

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
      const pIndex = parseInt(card.getAttribute('data-project'), 10);
      openLightbox(isNaN(pIndex) ? 0 : pIndex, 0);
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
     5. TESTIMONIALS SLIDER (Inspiration Vidéo Pinterest)
     ========================================================== */
  const testimonialTrack = document.getElementById('testimonialTrack');
  const btnTestimonialPrev = document.getElementById('testimonial-prev');
  const btnTestimonialNext = document.getElementById('testimonial-next');
  const slides = document.querySelectorAll('.testimonial-slide');
  let currentSlide = 0;

  function updateTestimonials(slideIndex) {
    if (!testimonialTrack || slides.length === 0) return;
    const maxSlide = window.innerWidth >= 1024 ? slides.length - 3 : window.innerWidth >= 768 ? slides.length - 2 : slides.length - 1;
    currentSlide = Math.max(0, Math.min(slideIndex, Math.max(0, maxSlide)));
    
    const slideWidth = slides[0].offsetWidth;
    testimonialTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }

  if (btnTestimonialPrev && btnTestimonialNext) {
    btnTestimonialPrev.addEventListener('click', () => updateTestimonials(currentSlide - 1));
    btnTestimonialNext.addEventListener('click', () => updateTestimonials(currentSlide + 1));
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

  // E. Soumission classique du formulaire avec confirmation
  const interactiveBriefForm = document.getElementById('interactiveBriefForm');
  const briefSuccessBanner = document.getElementById('brief-success-banner');
  if (interactiveBriefForm) {
    interactiveBriefForm.addEventListener('submit', (e) => {
      e.preventDefault();
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

  // F. Transfert instantané du brief formaté sur WhatsApp
  const btnSendBriefWhatsapp = document.getElementById('btnSendBriefWhatsapp');
  if (btnSendBriefWhatsapp) {
    btnSendBriefWhatsapp.addEventListener('click', () => {
      const name = document.getElementById('briefName')?.value.trim() || 'Client Intéressé';
      const company = document.getElementById('briefCompany')?.value.trim() || 'Particulier / Entreprise';
      const email = document.getElementById('briefEmail')?.value.trim() || 'Non spécifié';
      const phone = document.getElementById('briefPhone')?.value.trim() || 'Non spécifié';
      const msg = document.getElementById('briefMessage')?.value.trim() || 'Demande d\'accompagnement global';

      const polesStr = selectedPoles.length > 0 ? selectedPoles.join(', ') : 'Général / Multi-pôles';
      
      const whatsappText = `*NOUVEAU BRIEF PROJET - KREATIV'PULSE*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Nom :* ${name}\n` +
        `🏢 *Organisation :* ${company}\n` +
        `📧 *Email :* ${email}\n` +
        `📞 *Tél / WA :* ${phone}\n\n` +
        `🎯 *Pôles sélectionnés :* ${polesStr}\n` +
        `💰 *Budget indicatif :* ${selectedBudget}\n` +
        `⏱️ *Calendrier :* ${selectedTimeline}\n\n` +
        `📝 *Détails du brief :*\n${msg}\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `Transmis depuis le Configurateur Interactif Kreativ'Pulse.`;
      
      window.open(`https://wa.me/221776442442?text=${encodeURIComponent(whatsappText)}`, '_blank');
    });
  }

  /* ==========================================================
     10. SCROLL ACTIVE LINK SPY
     ========================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

});
