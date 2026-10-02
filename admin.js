/**
 * KREATIV'PULSE — STUDIO ADMIN SUITE ENGINE (admin.js)
 * Minimalist Dark Luxury CMS & Frontend Synchronizer
 * 0 Emojis · 100% Crisp SVGs & Clean Typographic Hierarchy
 */

(function () {
  'use strict';

  // --- 1. LOCALSTORAGE KEYS ---
  const ADMIN_STORAGE_KEY_AUTH = 'kp_admin_auth';
  const ADMIN_STORAGE_KEY_PROJECTS = 'kp_custom_projects';
  const ADMIN_STORAGE_KEY_LEADS = 'kp_leads';
  const ADMIN_STORAGE_KEY_SETTINGS = 'kp_agency_settings';
  const ADMIN_STORAGE_KEY_PASSWORD = 'kp_admin_password';

  function getAdminPassword() {
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEY_PASSWORD);
      if (stored && stored.trim().length > 0) return stored.trim();
    } catch (e) {}
    return '2026';
  }

  function setAdminPassword(newPass) {
    localStorage.setItem(ADMIN_STORAGE_KEY_PASSWORD, newPass.trim());
  }

  function resetAdminPassword() {
    localStorage.removeItem(ADMIN_STORAGE_KEY_PASSWORD);
  }

  // Coordonnées officielles de l'agence (Sicap Liberté 5)
  const defaultAgencySettings = {
    phone: '+221 33 827 80 80',
    mobile: '+221 77 000 00 00',
    whatsapp: '+221 77 644 24 42',
    email: 'contact@kreativpulse.net',
    address: 'Sicap Liberté 5/C Immeuble Adja Binta Ndiaye n° 5656, Dakar — Sénégal',
    hours: 'Lundi – Vendredi : 08h30 – 18h00'
  };

  // Les 15 projets réels authentiques de Kreativ'Pulse (Fallback garanti avec multi-photos)
  const defaultPortfolioProjects = [
    {
      id: 'colle-sow-ardo',
      title: "Showroom 40 Ans Collé Sow Ardo",
      client: "Maison Collé Sow Ardo",
      category: "branding",
      categoryLabel: "Branding & Mode",
      year: "2025",
      tagline: "Habillage Vitrines, Signalétique Dorée & Scénographie Haute Couture",
      desc: "Aménagement d'exception et habillage vitré pour le 40ème anniversaire de la célèbre maison de couture sénégalaise.",
      deliverables: ["Vitrophanie Intégrale Haute Précision", "Marquage Doré Spécial 40 Ans", "Signalétique Intérieure Showroom"],
      cover: "assets/portfolio/colle-sow-ardo.webp",
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
      title: "Aménagement Stand & Pavillon GSEF",
      client: "GSEF Dakar",
      category: "event",
      categoryLabel: "Événementiel & Pavillons",
      year: "2024",
      tagline: "Architecture Événementielle & Stand Forum Mondial",
      desc: "Conception et fabrication du pavillon d'exposition officiel pour le Forum Mondial de l'Économie Sociale et Solidaire.",
      deliverables: ["Stand Modulaire 36m²", "Totems Graphiques Piliers", "Comptoir d'Accueil Personnalisé"],
      cover: "assets/portfolio/gsef.webp",
      images: [
        'assets/portfolio/gsef.webp',
        'assets/portfolio/gsef-1.webp',
        'assets/portfolio/gsef-2.jpg',
        'assets/portfolio/gsef-3.jpg'
      ]
    },
    {
      id: 'sonacos',
      title: "Branding Siège & Célébration 50 Ans SONACOS",
      client: "SONACOS Sénégal",
      category: "branding",
      categoryLabel: "Branding Bâtiment & Flotte",
      year: "2025",
      tagline: "Habillage Monumental de Façade & Balcons d'Entreprise",
      desc: "Projet monumental d'habillage architectural des façades et balcons du siège de la SONACOS à l'occasion du cinquantenaire.",
      deliverables: ["Habillage Architectural Multi-niveaux", "Bandeaux Façade Haute Résistance", "Enseignes Rétro-éclairées"],
      cover: "assets/portfolio/sonacos.webp",
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
      id: 'senelec',
      title: "Campagne Woyofal SENELEC",
      client: "SENELEC",
      category: "digital",
      categoryLabel: "Campagnes & Digital",
      year: "2025",
      tagline: "Électrification Citoyenne & Supports Digitaux",
      desc: "Production de contenus vidéo en motion design expliquant les nouvelles grilles tarifaires et mesures d'économie d'énergie.",
      deliverables: ["Supports de Communication Réseau", "Visuels Campagne Digitale", "Flyers et Affiches Agences"],
      cover: "assets/portfolio/senelec-motion.png",
      images: [
        'assets/portfolio/senelec-motion.png',
        'assets/portfolio/senelec-1.png'
      ]
    },
    {
      id: 'dpworld',
      title: "Journée Carrière DP World",
      client: "DP World Dakar",
      category: "event",
      categoryLabel: "Événementiel & RH",
      year: "2026",
      tagline: "Scénographie Complète & Espace Recrutement",
      desc: "Organisation visuelle et scénographie de la Journée Carrière DP World sous le thème 'Our world is our future'.",
      deliverables: ["Podium & Pupitre Officiel", "Écrans LED & Régie Vidéo", "Photocall Monumental", "Signalétique RH"],
      cover: "assets/portfolio/dp-world-cover.png",
      images: [
        'assets/portfolio/dp-world-cover.png',
        'assets/portfolio/dpworld-1.png',
        'assets/portfolio/dpworld-2.png',
        'assets/portfolio/dpworld-3.png'
      ]
    },
    {
      id: 'sogip',
      title: "Centre des Expositions SOGIP",
      client: "SOGIP Diamniadio",
      category: "event",
      categoryLabel: "Événementiel & Stands",
      year: "2025",
      tagline: "Scénographie, Banderoles & Signalétique Grand Format",
      desc: "Conception architecturale et habillage événementiel pour l'accueil des délégations officielles au Centre des Expositions de Diamniadio.",
      deliverables: ["Habillage Façade Grand Format", "Scénographie d'Accueil", "Signalétique Directionnelle"],
      cover: "assets/portfolio/sogip-cover.webp",
      images: [
        'assets/portfolio/sogip-cover.webp',
        'assets/portfolio/sogip-1.jpg',
        'assets/portfolio/sogip-2.jpg',
        'assets/portfolio/sogip-3.jpg',
        'assets/portfolio/sogip-4.jpg'
      ]
    },
    {
      id: 'sonaged',
      title: "SONAGED Sénégal Propre",
      client: "SONAGED",
      category: "branding",
      categoryLabel: "Branding Industriel",
      year: "2025",
      tagline: "Campagne Nationale Éco-Gestes & Salubrité",
      desc: "Campagne d'habillage des véhicules de salubrité publique sur l'ensemble de la métropole dakaroise. Marquage haute visibilité jour/nuit.",
      deliverables: ["Marquage Adhésif Industriel", "Traitement Résistant Intempéries", "Signalétique Sécurité & Numéro Vert"],
      cover: "assets/portfolio/sonaged.webp",
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
      id: 'tournee-can',
      title: "Bus Sénégal Champion d'Afrique",
      client: "Fédération Sénégalaise de Football",
      category: "branding",
      categoryLabel: "Branding & Flotte",
      year: "2025",
      tagline: "Total Covering & Habillage de Flotte Officielle",
      desc: "Marquage intégral grand format (total covering) du bus officiel des Lions du Sénégal à l'occasion de la grande tournée triomphale.",
      deliverables: ["Total Covering Intégral", "Vinyle Ultra-Résistant Anti-UV", "Habillage Vitres Micro-perforé"],
      cover: "assets/portfolio/tournee-can.webp",
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
      id: 'dhl',
      title: "Campagnes B2B DHL Express Sénégal",
      client: "DHL Express",
      category: "event",
      categoryLabel: "Événementiel Corporate",
      year: "2025",
      tagline: "Supports Commerciaux & Offres Spéciales",
      desc: "Aménagement d'un espace lounge exclusif pour la direction et les clients stratégiques de DHL.",
      deliverables: ["Scénographie Espace Lounge", "Totem & Signalétique Jaune/Rouge", "Mise en Lumière Ambiance VIP"],
      cover: "assets/portfolio/dhl.webp",
      images: [
        'assets/portfolio/dhl.webp',
        'assets/portfolio/dhl-1.webp',
        'assets/portfolio/dhl-2.jpg',
        'assets/portfolio/dhl-3.jpg',
        'assets/portfolio/dhl-4.jpg'
      ]
    },
    {
      id: 'caf-awards',
      title: "Scénographie CAF Awards Dakar",
      client: "CAF / Ministère des Sports",
      category: "event",
      categoryLabel: "Audiovisuel & Cérémonie",
      year: "2025",
      tagline: "Scénographie TV Monumentale & Régie Multimédia",
      desc: "Conception scénographique 3D pour la prestigieuse cérémonie des CAF Awards. Arche lumineuse centrale, murs d'images LED circulaires.",
      deliverables: ["Scénographie 3D Circulaire", "Mur d'Écrans LED Haute Définition", "Régie Multimédia Live"],
      cover: "assets/portfolio/caf-awards.webp",
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
      id: 'aner',
      title: "Goodies & Coffrets Institutionnels ANER",
      client: "Agence Nationale Énergies Renouvelables",
      category: "goodies",
      categoryLabel: "Goodies & Papeterie",
      year: "2026",
      tagline: "Papeterie de Luxe, Clés USB Bois & Calendriers 2026",
      desc: "Création et fabrication de la collection d'objets promotionnels pour l'Agence Nationale pour les Énergies Renouvelables.",
      deliverables: ["Agendas Cuir Gravés Logo", "Calendriers de Bureau 2026", "Clés USB Bois Éco-responsables", "Fanions de Table Officiels"],
      cover: "assets/portfolio/goodies-aner.png",
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
      id: 'crous',
      title: "Campus Diamniadio CROUS",
      client: "CROUS Diamniadio",
      category: "digital",
      categoryLabel: "Digital & Social Media",
      year: "2025",
      tagline: "Création Graphique & Community Management Institutionnel",
      desc: "Conception de séries de visuels institutionnels pour les temps forts de l'année pour les canaux sociaux du CROUS.",
      deliverables: ["Gabarits Social Media", "Campagnes Thématiques", "Illustrations Graphiques", "Retouche & Traitement d'Images"],
      cover: "assets/portfolio/crous.png",
      images: [
        'assets/portfolio/crous.png',
        'assets/portfolio/crous-1.png'
      ]
    },
    {
      id: 'noom',
      title: "Objets Publicitaires VIP Noom Hotel",
      client: "Noom Hotel Dakar Sea Plaza",
      category: "goodies",
      categoryLabel: "Objets Publicitaires Luxe",
      year: "2026",
      tagline: "Cadeaux d'Affaires Haut de Gamme & Goodies Hôteliers",
      desc: "Développement d'articles d'accueil de prestige pour les suites et événements corporate du prestigieux palace dakarois.",
      deliverables: ["Coffrets d'Accueil VIP", "Stylos Métal Gravure Laser", "Carnets Personnalisés", "Objets Souvenirs Hôteliers"],
      cover: "assets/portfolio/goodies-noom.png",
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
      id: 'ergobit',
      title: "Locaux & Signalétique Ergobit",
      client: "Ergobit Consulting",
      category: "branding",
      categoryLabel: "Branding Espaces Corporates",
      year: "2025",
      tagline: "Cloisons Vitrées Sablées & Décoration Corporate",
      desc: "Aménagement graphique complet des bureaux et espaces d'accueil d'Ergobit Consulting à Dakar.",
      deliverables: ["Films Dépolis Sablés Graphiques", "Signalétique Salles & Direction", "Panneaux Muraux Identitaires"],
      cover: "assets/portfolio/ergobit-locaux.webp",
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
      title: "Campagnes Digitales Sentrak",
      client: "Sentrak Logistics / SILS",
      category: "digital",
      categoryLabel: "Digital & Réseaux Sociaux",
      year: "2025",
      tagline: "Direction Artistique Social Media Logistique",
      desc: "Campagnes B2B et temps forts d'entreprise (Octobre Rose, vœux annuels, sécurité portuaire) sur LinkedIn.",
      deliverables: ["Direction Artistique Social Media", "Campagne Octobre Rose Corporate", "Visuels Temps Forts"],
      cover: "assets/portfolio/sentrak.png",
      images: [
        'assets/portfolio/sentrak.png',
        'assets/portfolio/sentrak-1.png'
      ]
    }
  ];

  // Demandes de démonstration basées sur les formulaires réels du site public (Panier & Contact)
  const defaultSampleLeads = [
    {
      id: 'lead-1',
      type: 'devis_panier',
      name: 'Aïssatou Diop',
      company: 'SENELEC Direction Générale',
      city: 'Dakar (Plateau)',
      email: 'a.diop@senelec.sn',
      phone: '+221 77 820 14 14',
      timeline: 'Standard (2 à 3 semaines)',
      budget: '1 500 000 à 5 000 000 FCFA',
      deliveryOption: true,
      callOption: true,
      notes: 'Marquage logo SENELEC en gravure laser sur les stylos et sérigraphie 2 couleurs sur les mugs isothermes. Livraison souhaitée directement au siège.',
      items: [
        { name: 'Bouteille Isotherme Slim', ref: '007108', qty: 100, image: 'assets/catalogue/134301-home_default_bouteille-isotherme-slim.jpg' },
        { name: 'Coffret Signature Kraft', ref: '009717', qty: 50, image: 'assets/catalogue/144059-home_default_coffret-signature-kraft.jpg' },
        { name: 'Stylo Bambou Luxe', ref: '005935', qty: 200, image: 'assets/catalogue/144238-home_default_stylo-bambou-luxe.jpg' }
      ],
      date: new Date(Date.now() - 3600000 * 3).toISOString(),
      status: 'new'
    },
    {
      id: 'lead-2',
      type: 'contact_studio',
      name: 'Cheikh Tidiane Sy',
      company: 'Sentrak Logistics SA',
      email: 'c.sy@sentrak.sn',
      phone: '+221 78 430 55 22',
      msg: 'Bonjour l\'équipe Kreativ\'Pulse, nous souhaitons renouveler l\'ensemble de notre signalétique portuaire et habiller 4 nouveaux véhicules de liaison sur Dakar et Diamniadio. Pouvons-nous caler une réunion au siège de Liberté 5 ?',
      date: new Date(Date.now() - 86400000).toISOString(),
      status: 'processed'
    },
    {
      id: 'lead-3',
      type: 'devis_panier',
      name: 'Mamadou Lamine Ndiaye',
      company: 'DP World Dakar',
      city: 'Diamniadio',
      email: 'm.ndiaye@dpworld.com',
      phone: '+221 77 310 99 88',
      timeline: 'Urgent (< 10 jours ouvrés)',
      budget: 'Plus de 5 000 000 FCFA',
      deliveryOption: true,
      callOption: true,
      notes: 'Kits d\'accueil VIP pour l\'inauguration du nouveau terminal logistique. Écrans totems et coffrets VIP à marquer aux couleurs de l\'événement.',
      items: [
        { name: 'Coffret Milkys', ref: '009131', qty: 150, image: 'assets/catalogue/142069-home_default_coffret-milkys.jpg' },
        { name: 'Coffret High-Tech Noir', ref: '008667', qty: 100, image: 'assets/catalogue/141656-home_default_coffret-high-tech-noir.jpg' }
      ],
      date: new Date(Date.now() - 172800000).toISOString(),
      status: 'processed'
    }
  ];

  // Helper Toast minimaliste sans emoji
  function showAdminToast(msg, type = 'success') {
    const container = document.getElementById('adminToastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'admin-toast';
    
    const iconSvg = type === 'success'
      ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
      : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

    toast.innerHTML = `<span class="shrink-0">${iconSvg}</span><span>${msg}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  // --- 2. AUTHENTIFICATION MINIMALISTE & GESTION MOT DE PASSE ---
  function initAuth() {
    const authOverlay = document.getElementById('adminAuthOverlay');
    const mainDashboard = document.getElementById('adminMainDashboard');
    const pinForm = document.getElementById('adminLoginForm');
    const pinInput = document.getElementById('adminPinInput');
    const btnDemoLogin = document.getElementById('btnDemoLogin');
    const btnLogout = document.getElementById('btnAdminLogout');
    const btnMobileLogout = document.getElementById('btnAdminMobileLogout');
    const authErrorMsg = document.getElementById('adminAuthError');

    const checkSession = () => {
      const isAuth = sessionStorage.getItem(ADMIN_STORAGE_KEY_AUTH) === 'true';
      if (isAuth) {
        if (authOverlay) authOverlay.classList.add('hidden');
        if (mainDashboard) mainDashboard.classList.remove('hidden');
        const hash = (window.location.hash || '').replace('#', '');
        switchTab(hash && viewTitles[hash] ? hash : 'overview');
      } else {
        if (authOverlay) authOverlay.classList.remove('hidden');
        if (mainDashboard) mainDashboard.classList.add('hidden');
      }
    };

    if (pinForm) {
      pinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const entered = (pinInput?.value || '').trim();
        const currentPass = getAdminPassword();
        const isDefault = currentPass === '2026';
        const isMatch = entered === currentPass || (isDefault && (entered === 'admin' || entered === 'kreativ'));

        if (isMatch) {
          sessionStorage.setItem(ADMIN_STORAGE_KEY_AUTH, 'true');
          showAdminToast('Session Studio déverrouillée');
          checkSession();
        } else {
          if (authErrorMsg) {
            authErrorMsg.textContent = isDefault 
              ? 'Code incorrect. (Code par défaut : 2026)' 
              : 'Code ou mot de passe incorrect.';
            authErrorMsg.classList.remove('hidden');
          }
          pinInput.classList.add('border-red-500');
          setTimeout(() => pinInput.classList.remove('border-red-500'), 1500);
        }
      });
    }

    if (btnDemoLogin) {
      btnDemoLogin.addEventListener('click', () => {
        sessionStorage.setItem(ADMIN_STORAGE_KEY_AUTH, 'true');
        showAdminToast('Accès direct autorisé');
        checkSession();
      });
    }

    const handleLogout = () => {
      sessionStorage.removeItem(ADMIN_STORAGE_KEY_AUTH);
      showAdminToast('Session fermée');
      checkSession();
    };

    if (btnLogout) btnLogout.addEventListener('click', handleLogout);
    if (btnMobileLogout) btnMobileLogout.addEventListener('click', handleLogout);

    checkSession();
  }

  // --- 3. NAVIGATION PAR ONGLETS & ROUTAGE HASH (MOBILE FIRST) ---
  const viewTitles = {
    overview: "Vue d'ensemble",
    portfolio: "Portfolio & Projets",
    catalog: "Catalogue Objets & Signalétique",
    leads: "Boîte de réception des Devis",
    settings: "Paramètres de l'Agence"
  };

  const viewShortBadges = {
    overview: "Aperçu",
    portfolio: "Projets",
    catalog: "Boutique",
    leads: "Devis",
    settings: "Réglages"
  };

  function closeMobileDrawer() {
    const sidebar = document.getElementById('adminSidebar');
    const backdrop = document.getElementById('adminMobileBackdrop');
    if (sidebar) sidebar.classList.remove('is-open');
    if (backdrop) backdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function openMobileDrawer() {
    const sidebar = document.getElementById('adminSidebar');
    const backdrop = document.getElementById('adminMobileBackdrop');
    if (sidebar) sidebar.classList.add('is-open');
    if (backdrop) backdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function switchTab(tab) {
    if (!tab || !viewTitles[tab]) tab = 'overview';
    const navItems = document.querySelectorAll('.admin-sidebar-nav-item');
    const mobileNavBtns = document.querySelectorAll('.admin-mobile-nav-btn');
    const tabPanels = document.querySelectorAll('.admin-tab-panel');
    const breadcrumbCurrent = document.getElementById('breadcrumbCurrentView');
    const mobileHeaderActiveBadge = document.getElementById('mobileHeaderActiveBadge');

    // Sidebar desktop/drawer items
    navItems.forEach(n => {
      if (n.getAttribute('data-tab') === tab) {
        n.classList.add('active');
      } else {
        n.classList.remove('active');
      }
    });

    // Mobile Bottom Tab Bar items
    mobileNavBtns.forEach(btn => {
      if (btn.getAttribute('data-tab') === tab) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Tab Panels
    tabPanels.forEach(panel => {
      if (panel.id === `tab-${tab}`) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    });

    if (breadcrumbCurrent && viewTitles[tab]) {
      breadcrumbCurrent.textContent = viewTitles[tab];
    }

    if (mobileHeaderActiveBadge && viewShortBadges[tab]) {
      mobileHeaderActiveBadge.textContent = viewShortBadges[tab];
    }

    // Fermer le tiroir sur mobile lors du changement d'onglet
    closeMobileDrawer();

    try {
      if (tab === 'overview') renderDashboardOverview();
      if (tab === 'portfolio') renderPortfolioManager();
      if (tab === 'catalog') renderCatalogManager();
      if (tab === 'leads') renderLeadsManager();
      if (tab === 'settings') renderSettingsManager();
    } catch (err) {
      console.error('Erreur lors du rendu de l\'onglet ' + tab, err);
    }
  }

  if (typeof window !== 'undefined') {
    window.switchAdminTab = switchTab;
  }

  function initNavigation() {
    // Écouteurs sur la sidebar (desktop & drawer)
    const navItems = document.querySelectorAll('.admin-sidebar-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = item.getAttribute('data-tab');
        if (tab) {
          window.location.hash = tab;
          switchTab(tab);
        }
      });
    });

    // Écouteurs sur la bottom bar mobile
    const mobileNavBtns = document.querySelectorAll('.admin-mobile-nav-btn');
    mobileNavBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = btn.getAttribute('data-tab');
        if (tab) {
          window.location.hash = tab;
          switchTab(tab);
        }
      });
    });

    // Contrôles du Drawer Mobile (Hamburger, Croix, Backdrop)
    const btnMenuToggle = document.getElementById('btnAdminMobileMenuToggle');
    const btnCloseSidebar = document.getElementById('btnAdminCloseSidebar');
    const mobileBackdrop = document.getElementById('adminMobileBackdrop');

    if (btnMenuToggle) {
      btnMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        openMobileDrawer();
      });
    }

    if (btnCloseSidebar) {
      btnCloseSidebar.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMobileDrawer();
      });
    }

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', () => {
        closeMobileDrawer();
      });
    }

    window.addEventListener('hashchange', () => {
      const hash = (window.location.hash || '').replace('#', '');
      if (hash && viewTitles[hash]) {
        switchTab(hash);
      }
    });

    const initialHash = (window.location.hash || '').replace('#', '');
    if (initialHash && viewTitles[initialHash]) {
      switchTab(initialHash);
    }
  }

  // --- 4. GESTION DES DONNÉES ---
  function getCustomProjects() {
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEY_PROJECTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          let modified = false;
          const healed = parsed.map(p => {
            const fallback = defaultPortfolioProjects.find(dp => dp.id === p.id) || {};
            let cover = p.cover || fallback.cover || 'assets/portfolio/sentrak.png';
            if (cover === 'assets/portfolio/senelec.png') { cover = 'assets/portfolio/senelec-motion.png'; modified = true; }
            if (cover === 'assets/portfolio/aner.png') { cover = 'assets/portfolio/goodies-aner.png'; modified = true; }
            if (cover === 'assets/portfolio/can.png') { cover = 'assets/portfolio/tournee-can.webp'; modified = true; }
            if (cover === 'assets/portfolio/dhl.png') { cover = 'assets/portfolio/dhl.webp'; modified = true; }
            if (cover === 'assets/portfolio/caf.png') { cover = 'assets/portfolio/caf-awards.webp'; modified = true; }
            if (cover === 'assets/portfolio/sonaged.png') { cover = 'assets/portfolio/sonaged.webp'; modified = true; }
            if (cover === 'assets/portfolio/bhs.png') { cover = 'assets/portfolio/dp-world-cover.png'; modified = true; }

            const images = (Array.isArray(p.images) && p.images.length > 0)
              ? p.images.map(img => {
                  if (img === 'assets/portfolio/senelec.png') return 'assets/portfolio/senelec-motion.png';
                  if (img === 'assets/portfolio/aner.png') return 'assets/portfolio/goodies-aner.png';
                  if (img === 'assets/portfolio/can.png') return 'assets/portfolio/tournee-can.webp';
                  return img;
                })
              : (Array.isArray(fallback.images) && fallback.images.length > 0 ? fallback.images : [cover]);

            return {
              ...p,
              categoryLabel: p.categoryLabel || fallback.categoryLabel || 'RÉALISATION',
              deliverables: (Array.isArray(p.deliverables) && p.deliverables.length > 0) ? p.deliverables : (fallback.deliverables || ['Direction Artistique']),
              cover,
              images
            };
          });
          if (modified) {
            try { localStorage.setItem(ADMIN_STORAGE_KEY_PROJECTS, JSON.stringify(healed)); } catch (err) {}
          }
          return healed;
        }
      }
    } catch (e) {}
    return [...defaultPortfolioProjects];
  }

  function saveCustomProjects(projects) {
    localStorage.setItem(ADMIN_STORAGE_KEY_PROJECTS, JSON.stringify(projects));
  }

  function getLeads() {
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEY_LEADS);
      if (stored) {
        let parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filtrer et purger uniquement les anciens mocks obsolètes sans supprimer les vraies nouvelles demandes
          const cleaned = parsed.filter(l => {
            const isOldDummy = (l.name === 'Amadou Diallo' || l.name === 'Fatou Binetou Ndiaye' || (l.poles && !l.items && !l.type)) && (!l.items || l.items.length === 0);
            return !isOldDummy;
          });

          if (cleaned.length > 0) {
            if (cleaned.length !== parsed.length) {
              localStorage.setItem(ADMIN_STORAGE_KEY_LEADS, JSON.stringify(cleaned));
            }
            return cleaned;
          }
        }
      }
    } catch (e) {}
    saveLeads(defaultSampleLeads);
    return [...defaultSampleLeads];
  }

  function saveLeads(leads) {
    localStorage.setItem(ADMIN_STORAGE_KEY_LEADS, JSON.stringify(leads));
  }

  function getAgencySettings() {
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEY_SETTINGS);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return { ...defaultAgencySettings };
  }

  function saveAgencySettings(settings) {
    localStorage.setItem(ADMIN_STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  }

  // --- 5. VUE D'ENSEMBLE (OVERVIEW) ---
  function renderDashboardOverview() {
    const projects = getCustomProjects();
    const leads = getLeads();

    const elKpiProjects = document.getElementById('kpi-projects-count');
    const elKpiLeads = document.getElementById('kpi-leads-count');
    const elKpiCatalog = document.getElementById('kpi-catalog-count');
    const catalog = getCustomCatalog();

    if (elKpiProjects) elKpiProjects.textContent = projects.length;
    if (elKpiLeads) elKpiLeads.textContent = leads.length;
    if (elKpiCatalog) elKpiCatalog.textContent = catalog.length;

    const mobileLeadsBadge = document.getElementById('mobileBadgeLeadsCount');
    if (mobileLeadsBadge) {
      mobileLeadsBadge.textContent = leads.length;
      if (leads.length === 0) {
        mobileLeadsBadge.classList.add('opacity-30');
      } else {
        mobileLeadsBadge.classList.remove('opacity-30');
      }
    }

    // Rendu des 4 dernières demandes
    const recentLeadsList = document.getElementById('overview-recent-leads');
    if (recentLeadsList) {
      if (leads.length === 0) {
        recentLeadsList.innerHTML = `<div class="p-6 text-center text-gray-500 text-xs">Aucune demande reçue pour le moment.</div>`;
      } else {
        recentLeadsList.innerHTML = leads.slice(0, 4).map(l => {
          const isProcessed = l.status === 'processed';
          const cleanPhone = (l.phone || '').replace(/[^0-9]/g, '');
          const isDevisPanier = l.type === 'devis_panier' || (l.items && l.items.length > 0);
          const typeLabel = isDevisPanier ? 'Devis Boutique' : 'Message Studio';
          const typeBadge = isDevisPanier
            ? `<span class="admin-badge admin-badge-cyan"><span class="admin-badge-dot"></span>${typeLabel}</span>`
            : `<span class="admin-badge admin-badge-orange"><span class="admin-badge-dot"></span>${typeLabel}</span>`;

          const formattedDate = new Date(l.date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
          });

          const subDetail = isDevisPanier
            ? `${l.items ? l.items.length + ' article(s) commandé(s)' : 'Articles boutique'}${l.city ? ' · ' + l.city : ''}`
            : (l.company || 'Contact direct');

          return `
            <div class="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <span class="font-semibold text-sm text-white truncate">${l.name}</span>
                  ${typeBadge}
                </div>
                <div class="text-xs text-gray-400 mt-0.5 truncate">${subDetail}</div>
                <div class="text-[11px] text-gray-500 mt-1">${formattedDate}</div>
              </div>
              <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <span class="admin-badge ${isProcessed ? 'admin-badge-green' : 'admin-badge-orange'}">
                  <span class="admin-badge-dot"></span>
                  ${isProcessed ? 'Traité' : 'Nouveau'}
                </span>
                <a href="https://wa.me/${cleanPhone}?text=Bonjour%20${encodeURIComponent(l.name)}%2C%20direction%20Kreativ%27Pulse%20Dakar%20suite%20%C3%A0%20votre%20demande." target="_blank" class="p-2 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-black transition-all flex items-center justify-center" title="Répondre sur WhatsApp">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                </a>
              </div>
            </div>
          `;
        }).join('');
      }
    }
  }

  // --- 6. GESTION DU PORTFOLIO ---
  function renderPortfolioManager() {
    const listContainer = document.getElementById('portfolio-items-table-body');
    const searchInput = document.getElementById('portfolio-search-input');
    const projects = getCustomProjects();

    const searchTerm = (searchInput?.value || '').toLowerCase().trim();

    const filtered = projects.filter(p => {
      const q = searchTerm;
      return !q || (p.title && p.title.toLowerCase().includes(q)) || 
                   (p.client && p.client.toLowerCase().includes(q)) || 
                   (p.category && p.category.toLowerCase().includes(q));
    });

    if (listContainer) {
      if (filtered.length === 0) {
        listContainer.innerHTML = `<tr><td colspan="6" class="text-center py-10 text-gray-500 text-xs">Aucun projet trouvé pour cette recherche.</td></tr>`;
      } else {
        listContainer.innerHTML = filtered.map(p => `
          <tr data-id="${p.id}">
            <td class="w-14">
              <img src="${p.cover || 'assets/portfolio/sentrak.png'}" alt="${p.title}" class="w-11 h-11 object-contain rounded-lg border border-white/10 bg-black/60 p-0.5" onerror="this.src='assets/portfolio/sentrak.png'" />
            </td>
            <td>
              <div class="font-semibold text-white text-xs sm:text-sm">${p.title}</div>
              <div class="text-[11px] text-gray-400 mt-0.5">${p.tagline || ''}</div>
            </td>
            <td>
              <span class="text-xs text-gray-300 font-medium">${p.client || 'Client Privé'}</span>
            </td>
            <td>
              <span class="admin-badge admin-badge-orange">
                <span class="admin-badge-dot"></span>
                ${p.categoryLabel || p.category}
              </span>
            </td>
            <td>
              <span class="text-xs text-gray-400 font-mono">${p.year || '2025'}</span>
            </td>
            <td class="text-right whitespace-nowrap">
              <button type="button" class="btn-edit-project btn-admin-secondary text-xs px-2.5 py-1 mr-1" data-id="${p.id}">
                Modifier
              </button>
              <button type="button" class="btn-delete-project btn-admin-danger text-xs px-2.5 py-1" data-id="${p.id}">
                Supprimer
              </button>
            </td>
          </tr>
        `).join('');

        // Listeners Édition / Suppression
        listContainer.querySelectorAll('.btn-edit-project').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const found = projects.find(item => item.id === id);
            if (found) openProjectEditModal(found);
          });
        });

        listContainer.querySelectorAll('.btn-delete-project').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            if (confirm('Confirmez-vous la suppression de ce projet ?')) {
              const toDelete = projects.find(item => item.id === id);
              const updated = projects.filter(item => item.id !== id);
              saveCustomProjects(updated);
              if (window.KreativDB && typeof window.KreativDB.deleteProject === 'function') {
                window.KreativDB.deleteProject(toDelete ? (toDelete.id || toDelete.title) : id).catch(() => {});
              }
              showAdminToast('Projet retiré du portfolio');
              renderPortfolioManager();
              renderDashboardOverview();
            }
          });
        });
      }
    }
  }

  // --- 6.B GESTIONNAIRE D'UPLOAD D'IMAGES & MULTI-PHOTOS ---
  let currentCoverImage = 'assets/portfolio/sentrak.png';
  let currentGalleryImages = [];

  // Compresseur & Redimensionneur d'image client-side via HTML5 Canvas
  function optimizeAndReadImage(file, maxDimension = 1400, quality = 0.84) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith('image/')) {
        return reject(new Error('Fichier image invalide.'));
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve({
            dataUrl,
            width,
            height,
            name: file.name,
            sizeKb: Math.round(dataUrl.length / 1024)
          });
        };
        img.onerror = () => reject(new Error('Impossible de lire l\'image'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
      reader.readAsDataURL(file);
    });
  }

  function setCoverPreview(src, filename = 'Image du projet', meta = 'Prête pour le portfolio') {
    const dropzone = document.getElementById('coverDropzone');
    const previewBox = document.getElementById('coverPreviewBox');
    const previewImg = document.getElementById('coverPreviewImg');
    const fileNameEl = document.getElementById('coverFileName');
    const fileMetaEl = document.getElementById('coverFileMeta');
    const coverUrlInput = document.getElementById('projEditCover');

    if (src) {
      currentCoverImage = src;
      if (previewImg) previewImg.src = src;
      if (fileNameEl) fileNameEl.textContent = filename;
      if (fileMetaEl) fileMetaEl.textContent = meta;
      if (coverUrlInput) coverUrlInput.value = src.startsWith('data:') ? '' : src;

      if (dropzone) dropzone.classList.add('hidden');
      if (previewBox) previewBox.classList.remove('hidden');
    } else {
      currentCoverImage = 'assets/portfolio/sentrak.png';
      if (previewImg) previewImg.src = '';
      if (coverUrlInput) coverUrlInput.value = '';

      if (dropzone) dropzone.classList.remove('hidden');
      if (previewBox) previewBox.classList.add('hidden');
    }
  }

  function renderGalleryThumbs() {
    const container = document.getElementById('galleryThumbsContainer');
    const btnAdd = document.getElementById('btnAddGalleryPhoto');
    if (!container || !btnAdd) return;

    // Supprimer tous les thumbs existants sauf le bouton d'ajout
    container.querySelectorAll('.admin-gallery-thumb').forEach(el => el.remove());

    currentGalleryImages.forEach((imgSrc, idx) => {
      const thumb = document.createElement('div');
      thumb.className = 'admin-gallery-thumb';
      thumb.innerHTML = `
        <img src="${imgSrc}" alt="Photo galerie ${idx + 1}" onerror="this.src='assets/portfolio/sentrak.png'" />
        <button type="button" class="btn-remove-thumb" title="Retirer cette photo" data-idx="${idx}">×</button>
      `;
      container.insertBefore(thumb, btnAdd);
    });

    container.querySelectorAll('.btn-remove-thumb').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        if (!isNaN(idx)) {
          currentGalleryImages.splice(idx, 1);
          renderGalleryThumbs();
        }
      });
    });
  }

  async function handleCoverFiles(files) {
    if (!files || files.length === 0) return;
    try {
      showAdminToast(`Optimisation de ${files.length} visuel(s)...`, 'info');
      const firstOpt = await optimizeAndReadImage(files[0]);
      setCoverPreview(firstOpt.dataUrl, firstOpt.name, `${firstOpt.width}×${firstOpt.height}px · ~${firstOpt.sizeKb} Ko`);

      // Si plusieurs fichiers sont sélectionnés dans la modale projet, les suivants vont dans la galerie Lightbox !
      if (files.length > 1) {
        for (let i = 1; i < files.length; i++) {
          const galleryOpt = await optimizeAndReadImage(files[i]);
          currentGalleryImages.push(galleryOpt.dataUrl);
        }
        renderGalleryThumbs();
        showAdminToast(`Couverture + ${files.length - 1} photo(s) ajoutée(s) à la galerie !`);
      } else {
        showAdminToast('Image de couverture prête');
      }
    } catch (err) {
      showAdminToast('Format d\'image non supporté', 'danger');
    }
  }

  // --- IMPORT PAR LOT (MULTI-PROJETS DIRECTS) ---
  async function handleBatchProjectsUpload(files) {
    if (!files || files.length === 0) return;
    const projects = getCustomProjects();
    let importedCount = 0;

    showAdminToast(`Importation de ${files.length} projet(s) en cours...`, 'info');

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type || !file.type.startsWith('image/')) continue;

      try {
        const opt = await optimizeAndReadImage(file, 1400, 0.84);

        // Nettoyage automatique du nom de fichier pour un titre propre
        let cleanTitle = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_.]+/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        cleanTitle = cleanTitle.split(' ')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(' ');

        if (!cleanTitle || cleanTitle.length < 2) {
          cleanTitle = 'Projet Visuel ' + (projects.length + 1);
        }

        const newId = 'proj-' + Date.now() + '-' + i;
        const newProj = {
          id: newId,
          title: cleanTitle,
          client: "Kreativ'Pulse Studio",
          category: "digital",
          categoryLabel: "Campagnes & Digital",
          year: String(new Date().getFullYear()),
          tagline: "Création Visuelle & Communication Digitale",
          desc: `Réalisation créative et conception graphique d'impact produite par Kreativ'Pulse (${cleanTitle}).`,
          deliverables: ["Direction Artistique", "Déclinaisons Multi-Formats", "Visuels HD"],
          cover: opt.dataUrl,
          images: [opt.dataUrl]
        };

        projects.unshift(newProj);
        importedCount++;

        // Persistance Supabase
        if (window.KreativDB && typeof window.KreativDB.saveProject === 'function') {
          window.KreativDB.saveProject(newProj).catch(() => {});
        }
      } catch (err) {
        console.warn('[Admin] Erreur import lot projet:', file.name, err);
      }
    }

    if (importedCount > 0) {
      saveCustomProjects(projects);
      renderPortfolioManager();
      renderDashboardOverview();
      showAdminToast(`${importedCount} projet(s) importé(s) avec succès dans le portfolio !`);
    } else {
      showAdminToast('Aucune image valide trouvée pour l\'importation', 'danger');
    }
  }

  // --- IMPORT PAR LOT (MULTI-PRODUITS DIRECTS) ---
  async function handleBatchProductsUpload(files) {
    if (!files || files.length === 0) return;
    const customCatalog = getCustomCatalog();
    let importedCount = 0;

    showAdminToast(`Importation de ${files.length} article(s) en cours...`, 'info');

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type || !file.type.startsWith('image/')) continue;

      try {
        const opt = await optimizeAndReadImage(file, 1200, 0.85);

        let cleanName = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_.]+/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        cleanName = cleanName.split(' ')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(' ');

        if (!cleanName || cleanName.length < 2) {
          cleanName = 'Goodies Publicitaire ' + (customCatalog.length + 1);
        }

        const newId = 'prod_' + Date.now() + '_' + i;
        const newRef = 'KP' + Math.floor(100000 + Math.random() * 900000);

        const newProd = {
          id: newId,
          ref: newRef,
          name: cleanName,
          description: `Objet publicitaire et goodies personnalisable de haute qualité par Kreativ'Pulse.`,
          image: opt.dataUrl,
          url: '',
          universeSlug: '10-objets-publicitaires',
          universeLabel: 'Objets publicitaires',
          subSlug: 'goodies-sur-mesure',
          subLabel: 'Goodies sur-mesure',
          itemSlug: 'goodies-sur-mesure',
          itemLabel: 'Goodies sur-mesure',
          specs: ['Personnalisation Dakar', 'Qualité Premium', 'Livraison Express'],
          techniques: ['Sérigraphie', 'Gravure Laser', 'Marquage DTF'],
          matieres: ['Métal / Inox', 'Coton Bio', 'Bambou écologique']
        };

        customCatalog.unshift(newProd);
        importedCount++;
      } catch (err) {
        console.warn('[Admin] Erreur import lot produit:', file.name, err);
      }
    }

    if (importedCount > 0) {
      saveCustomCatalog(customCatalog);
      renderCatalogManager();
      renderDashboardOverview();
      showAdminToast(`${importedCount} article(s) importé(s) avec succès dans le catalogue !`);
    } else {
      showAdminToast('Aucune image valide trouvée pour l\'importation', 'danger');
    }
  }

  // Modale d'ajout / modification de projet
  const modalProject = document.getElementById('modalProjectEditor');
  const formProject = document.getElementById('formProjectEditor');

  function openProjectEditModal(project = null) {
    if (!modalProject) return;
    const isNew = !project;
    document.getElementById('modalProjectTitle').textContent = isNew ? 'Nouveau projet portfolio' : 'Modifier le projet';
    document.getElementById('projEditId').value = project ? project.id : 'proj-' + Date.now();
    document.getElementById('projEditTitle').value = project ? project.title : '';
    document.getElementById('projEditClient').value = project ? project.client : '';
    document.getElementById('projEditCategory').value = project ? project.category : 'branding';
    document.getElementById('projEditYear').value = project ? project.year : '2026';
    document.getElementById('projEditTagline').value = project ? (project.tagline || '') : '';
    document.getElementById('projEditDesc').value = project ? (project.desc || '') : '';
    document.getElementById('projEditDeliverables').value = project && project.deliverables ? project.deliverables.join(', ') : '';

    // Initialiser l'image de couverture
    const initialCover = project ? (project.cover || 'assets/portfolio/sentrak.png') : null;
    if (initialCover) {
      setCoverPreview(initialCover, project.title ? `${project.title} (Couverture)` : 'Image actuelle', 'Image enregistrée');
    } else {
      setCoverPreview(null);
    }

    // Initialiser les images de galerie
    currentGalleryImages = project && Array.isArray(project.images) ? project.images.filter(img => img !== initialCover) : [];
    renderGalleryThumbs();

    // Réinitialiser sur l'onglet upload de fichier
    const tabFile = document.getElementById('tabUploadCoverModeFile');
    if (tabFile) tabFile.click();

    modalProject.classList.add('active');
  }

  // Initialisation des écouteurs de la modale
  function initModalUploadListeners() {
    const dropzone = document.getElementById('coverDropzone');
    const fileInput = document.getElementById('coverFileInput');
    const btnReplace = document.getElementById('btnReplaceCover');
    const btnRemove = document.getElementById('btnRemoveCover');
    const tabModeFile = document.getElementById('tabUploadCoverModeFile');
    const tabModeUrl = document.getElementById('tabUploadCoverModeUrl');
    const paneFile = document.getElementById('coverUploadFilePane');
    const paneUrl = document.getElementById('coverUploadUrlPane');
    const urlInput = document.getElementById('projEditCover');
    const galleryInput = document.getElementById('galleryFileInput');

    // Switch Onglet Upload vs URL
    if (tabModeFile && tabModeUrl && paneFile && paneUrl) {
      tabModeFile.addEventListener('click', () => {
        tabModeFile.classList.add('active');
        tabModeUrl.classList.remove('active');
        paneFile.classList.remove('hidden');
        paneUrl.classList.add('hidden');
      });

      tabModeUrl.addEventListener('click', () => {
        tabModeUrl.classList.add('active');
        tabModeFile.classList.remove('active');
        paneUrl.classList.remove('hidden');
        paneFile.classList.add('hidden');
        if (urlInput && currentCoverImage && !currentCoverImage.startsWith('data:')) {
          urlInput.value = currentCoverImage;
        }
      });
    }

    // Drag and Drop Couverture
    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());

      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });

      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
      });

      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          handleCoverFiles(e.dataTransfer.files);
        }
      });

      fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files.length > 0) {
          handleCoverFiles(fileInput.files);
        }
      });
    }

    if (btnReplace && fileInput) {
      btnReplace.addEventListener('click', () => fileInput.click());
    }

    if (btnRemove) {
      btnRemove.addEventListener('click', () => {
        setCoverPreview(null);
      });
    }

    // Écouteur sur le champ texte URL si modifié manuellement
    if (urlInput) {
      urlInput.addEventListener('input', () => {
        const val = urlInput.value.trim();
        if (val) {
          currentCoverImage = val;
          const previewImg = document.getElementById('coverPreviewImg');
          if (previewImg) previewImg.src = val;
        }
      });
    }

    // Upload Multi-Photos pour la Galerie
    if (galleryInput) {
      galleryInput.addEventListener('change', async () => {
        if (!galleryInput.files || galleryInput.files.length === 0) return;
        showAdminToast(`Traitement de ${galleryInput.files.length} photo(s)...`, 'info');

        for (let i = 0; i < galleryInput.files.length; i++) {
          try {
            const opt = await optimizeAndReadImage(galleryInput.files[i]);
            currentGalleryImages.push(opt.dataUrl);
          } catch (err) {
            console.warn('Erreur lecture photo galerie', err);
          }
        }
        renderGalleryThumbs();
        showAdminToast('Galerie mise à jour');
        galleryInput.value = '';
      });
    }
  }

  if (formProject) {
    formProject.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('projEditId').value;
      const projects = getCustomProjects();
      const catVal = document.getElementById('projEditCategory').value;
      const catMap = {
        branding: 'Branding & Mode',
        event: 'Événementiel & Sommets',
        digital: 'Campagnes & Digital',
        print: 'Signalétique & Print'
      };

      const deliverables = document.getElementById('projEditDeliverables').value
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      // Déterminer la couverture finale (Upload direct ou URL saisie)
      const paneUrl = document.getElementById('coverUploadUrlPane');
      const urlInput = document.getElementById('projEditCover');
      let finalCover = currentCoverImage;

      if (paneUrl && !paneUrl.classList.contains('hidden') && urlInput && urlInput.value.trim()) {
        finalCover = urlInput.value.trim();
      }

      if (!finalCover) {
        finalCover = 'assets/portfolio/sentrak.png';
      }

      // Concaténer la couverture et les images de galerie
      const finalImages = [finalCover, ...currentGalleryImages.filter(img => img !== finalCover)];

      const projectData = {
        id: id,
        title: document.getElementById('projEditTitle').value.trim(),
        client: document.getElementById('projEditClient').value.trim(),
        category: catVal,
        categoryLabel: catMap[catVal] || 'Expertise 360',
        year: document.getElementById('projEditYear').value.trim() || '2026',
        tagline: document.getElementById('projEditTagline').value.trim(),
        desc: document.getElementById('projEditDesc').value.trim(),
        deliverables: deliverables.length > 0 ? deliverables : ['Création sur mesure', 'Direction artistique'],
        cover: finalCover,
        images: finalImages
      };

      const existingIndex = projects.findIndex(p => p.id === id);
      if (existingIndex >= 0) {
        projects[existingIndex] = { ...projects[existingIndex], ...projectData };
        showAdminToast(`Projet « ${projectData.title} » actualisé avec ses visuels`);
      } else {
        projects.unshift(projectData);
        showAdminToast(`Nouveau projet « ${projectData.title} » ajouté avec succès`);
      }

      saveCustomProjects(projects);
      if (window.KreativDB && typeof window.KreativDB.saveProject === 'function') {
        window.KreativDB.saveProject(projectData).catch(() => {});
      }
      modalProject.classList.remove('active');
      renderPortfolioManager();
      renderDashboardOverview();
    });
  }

  // --- 7. GESTION DU CATALOGUE (+200 PRODUITS) & UPLOADER PRODUIT ---
  const ADMIN_STORAGE_KEY_CATALOG = 'kp_custom_catalog';
  let currentProdImage = 'assets/logos/kreativpulse-icon.webp';
  let cachedBaseCatalog = null;

  function buildBaseCatalogProducts() {
    if (cachedBaseCatalog && cachedBaseCatalog.length > 0) return cachedBaseCatalog;

    const list = [];
    const seen = new Set();
    const subMap = {};

    if (typeof KP_CATALOG_CATEGORIES !== 'undefined' && Array.isArray(KP_CATALOG_CATEGORIES)) {
      KP_CATALOG_CATEGORIES.forEach(universe => {
        if (!universe.sub || !Array.isArray(universe.sub)) return;

        universe.sub.forEach(sub => {
          const meta = {
            universeSlug: universe.slug,
            universeLabel: universe.label,
            subSlug: sub.slug,
            subLabel: sub.label,
            techniques: sub.techniques || [],
            matieres: sub.matieres || []
          };
          subMap[sub.slug] = meta;

          if (sub.items && Array.isArray(sub.items)) {
            sub.items.forEach(item => {
              subMap[item.slug] = {
                ...meta,
                subLabel: item.label || sub.label
              };
            });
          }
        });
      });
    }

    if (typeof KP_CATALOG_PRODUCTS !== 'undefined' && typeof KP_CATALOG_PRODUCTS === 'object') {
      Object.keys(KP_CATALOG_PRODUCTS).forEach(key => {
        const prods = KP_CATALOG_PRODUCTS[key];
        if (!Array.isArray(prods)) return;

        const meta = subMap[key] || {
          universeSlug: '10-objets-publicitaires',
          universeLabel: 'Objets publicitaires',
          subSlug: key,
          subLabel: key,
          techniques: ['Sérigraphie', 'Tampographie'],
          matieres: []
        };

        prods.forEach((p, idx) => {
          if (!p || !p.name) return;
          const cleanRef = String(p.ref || '').trim();
          const uniqueKey = (cleanRef || idx) + '__' + p.name;
          if (seen.has(uniqueKey)) return;
          seen.add(uniqueKey);

          list.push({
            id: 'prod_' + (cleanRef ? cleanRef.replace(/[^a-zA-Z0-9_-]/g, '_') : (key + '_' + idx)),
            ref: cleanRef || '000000',
            name: p.name,
            description: p.description || '',
            image: p.image || 'assets/logos/kreativpulse-icon.webp',
            url: p.url || '',
            universeSlug: meta.universeSlug,
            universeLabel: meta.universeLabel,
            subSlug: meta.subSlug,
            subLabel: meta.subLabel,
            techniques: meta.techniques,
            technique: meta.techniques.join(', '),
            matieres: meta.matieres,
            matiere: meta.matieres.join(', ')
          });
        });
      });
    }

    cachedBaseCatalog = list;
    return list;
  }

  function getCustomCatalog() {
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEY_CATALOG);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}

    return buildBaseCatalogProducts();
  }

  function saveCustomCatalog(catalog) {
    localStorage.setItem(ADMIN_STORAGE_KEY_CATALOG, JSON.stringify(catalog));
    cachedBaseCatalog = catalog;
    if (typeof window !== 'undefined') {
      window.allCatalogProducts = catalog;
    }
  }

  function setProdImagePreview(src, filename = 'Photo du produit', meta = 'Prête pour le catalogue') {
    const dropzone = document.getElementById('prodDropzone');
    const previewBox = document.getElementById('prodPreviewBox');
    const previewImg = document.getElementById('prodPreviewImg');
    const fileNameEl = document.getElementById('prodFileName');
    const fileMetaEl = document.getElementById('prodFileMeta');
    const urlInput = document.getElementById('prodEditImage');

    if (src) {
      currentProdImage = src;
      if (previewImg) previewImg.src = src;
      if (fileNameEl) fileNameEl.textContent = filename;
      if (fileMetaEl) fileMetaEl.textContent = meta;
      if (urlInput) urlInput.value = src.startsWith('data:') ? '' : src;

      if (dropzone) dropzone.classList.add('hidden');
      if (previewBox) previewBox.classList.remove('hidden');
    } else {
      currentProdImage = 'assets/logos/kreativpulse-icon.webp';
      if (previewImg) previewImg.src = '';
      if (urlInput) urlInput.value = '';

      if (dropzone) dropzone.classList.remove('hidden');
      if (previewBox) previewBox.classList.add('hidden');
    }
  }

  async function handleProdFile(file) {
    try {
      showAdminToast('Optimisation de la photo produit...', 'info');
      const optimized = await optimizeAndReadImage(file, 1200, 0.85);
      setProdImagePreview(optimized.dataUrl, optimized.name, `${optimized.width}×${optimized.height}px · ~${optimized.sizeKb} Ko`);
      showAdminToast('Photo produit prête');
    } catch (err) {
      showAdminToast('Format d\'image non supporté', 'danger');
    }
  }

  // Modale d'ajout / modification de produit
  const modalProduct = document.getElementById('modalProductEditor');
  const formProduct = document.getElementById('formProductEditor');

  function openProductEditModal(product = null) {
    if (!modalProduct) return;
    const isNew = !product;
    document.getElementById('modalProductTitle').textContent = isNew ? 'Nouveau produit boutique' : 'Modifier le produit';
    document.getElementById('prodEditId').value = product ? product.id : 'prod_' + Date.now();
    document.getElementById('prodEditName').value = product ? product.name : '';
    document.getElementById('prodEditRef').value = product ? product.ref : '00' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('prodEditUniverse').value = product ? (product.universeSlug || '10-objets-publicitaires') : '10-objets-publicitaires';
    document.getElementById('prodEditSubLabel').value = product ? (product.subLabel || '') : '';
    document.getElementById('prodEditTechnique').value = product ? (Array.isArray(product.techniques) ? product.techniques.join(', ') : (product.technique || '')) : '';
    document.getElementById('prodEditMatiere').value = product ? (Array.isArray(product.matieres) ? product.matieres.join(', ') : (product.matiere || '')) : '';
    document.getElementById('prodEditDesc').value = product ? (product.description || '') : '';

    const initialImg = product ? (product.image || 'assets/logos/kreativpulse-icon.webp') : null;
    if (initialImg) {
      setProdImagePreview(initialImg, product.name ? `${product.name} (Visuel)` : 'Image actuelle', 'Image enregistrée');
    } else {
      setProdImagePreview(null);
    }

    const tabFile = document.getElementById('tabUploadProdModeFile');
    if (tabFile) tabFile.click();

    modalProduct.classList.add('active');
  }

  function initProductModalListeners() {
    const dropzone = document.getElementById('prodDropzone');
    const fileInput = document.getElementById('prodFileInput');
    const btnReplace = document.getElementById('btnReplaceProdImg');
    const btnRemove = document.getElementById('btnRemoveProdImg');
    const tabModeFile = document.getElementById('tabUploadProdModeFile');
    const tabModeUrl = document.getElementById('tabUploadProdModeUrl');
    const paneFile = document.getElementById('prodUploadFilePane');
    const paneUrl = document.getElementById('prodUploadUrlPane');
    const urlInput = document.getElementById('prodEditImage');

    if (tabModeFile && tabModeUrl && paneFile && paneUrl) {
      tabModeFile.addEventListener('click', () => {
        tabModeFile.classList.add('active');
        tabModeUrl.classList.remove('active');
        paneFile.classList.remove('hidden');
        paneUrl.classList.add('hidden');
      });

      tabModeUrl.addEventListener('click', () => {
        tabModeUrl.classList.add('active');
        tabModeFile.classList.remove('active');
        paneUrl.classList.remove('hidden');
        paneFile.classList.add('hidden');
        if (urlInput && currentProdImage && !currentProdImage.startsWith('data:')) {
          urlInput.value = currentProdImage;
        }
      });
    }

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());

      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });

      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
      });

      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleProdFile(e.dataTransfer.files[0]);
        }
      });

      fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files[0]) {
          handleProdFile(fileInput.files[0]);
        }
      });
    }

    if (btnReplace && fileInput) {
      btnReplace.addEventListener('click', () => fileInput.click());
    }

    if (btnRemove) {
      btnRemove.addEventListener('click', () => setProdImagePreview(null));
    }

    if (urlInput) {
      urlInput.addEventListener('input', () => {
        const val = urlInput.value.trim();
        if (val) {
          currentProdImage = val;
          const previewImg = document.getElementById('prodPreviewImg');
          if (previewImg) previewImg.src = val;
        }
      });
    }
  }

  if (formProduct) {
    formProduct.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('prodEditId').value;
      const catalog = getCustomCatalog();
      const universeVal = document.getElementById('prodEditUniverse').value;

      const universeMap = {
        '10-objets-publicitaires': 'Objets publicitaires',
        '11-decorations-numeriques': 'Décoration numérique',
        '12-salons-evenements': 'Salons & événements',
        '13-presentoirs-affichages': 'Présentoirs & affichage'
      };

      const paneUrl = document.getElementById('prodUploadUrlPane');
      const urlInput = document.getElementById('prodEditImage');
      let finalImg = currentProdImage;

      if (paneUrl && !paneUrl.classList.contains('hidden') && urlInput && urlInput.value.trim()) {
        finalImg = urlInput.value.trim();
      }

      if (!finalImg) {
        finalImg = 'assets/logos/kreativpulse-icon.webp';
      }

      const techArr = document.getElementById('prodEditTechnique').value
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const matArr = document.getElementById('prodEditMatiere').value
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const productData = {
        id: id,
        ref: document.getElementById('prodEditRef').value.trim() || '000000',
        name: document.getElementById('prodEditName').value.trim(),
        description: document.getElementById('prodEditDesc').value.trim(),
        image: finalImg,
        universeSlug: universeVal,
        universeLabel: universeMap[universeVal] || 'Boutique',
        subLabel: document.getElementById('prodEditSubLabel').value.trim() || 'Standard',
        subSlug: (document.getElementById('prodEditSubLabel').value.trim() || 'standard').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        technique: techArr.length > 0 ? techArr.join(', ') : 'Standard',
        techniques: techArr,
        matiere: matArr.length > 0 ? matArr.join(', ') : '',
        matieres: matArr,
        url: ''
      };

      const existingIndex = catalog.findIndex(p => p.id === id);
      if (existingIndex >= 0) {
        catalog[existingIndex] = { ...catalog[existingIndex], ...productData };
        showAdminToast(`Article « ${productData.name} » actualisé`);
      } else {
        catalog.unshift(productData);
        showAdminToast(`Nouvel article « ${productData.name} » ajouté en boutique`);
      }

      saveCustomCatalog(catalog);
      modalProduct.classList.remove('active');
      renderCatalogManager();
      renderDashboardOverview();
    });
  }

  let catalogPageLimit = 50;

  function renderCatalogManager() {
    const tableBody = document.getElementById('catalog-items-table-body');
    const searchInput = document.getElementById('catalog-admin-search');
    const universeFilter = document.getElementById('catalog-admin-universe-filter');
    const countInfo = document.getElementById('catalog-count-info');
    const btnLoadMore = document.getElementById('btnLoadMoreProducts');

    const products = getCustomCatalog();
    const searchTerm = (searchInput?.value || '').toLowerCase().trim();
    const uni = universeFilter?.value || 'all';

    const filtered = products.filter(p => {
      const matchUni = (uni === 'all' || p.universeSlug === uni);
      const matchSearch = (!searchTerm || 
        (p.name && p.name.toLowerCase().includes(searchTerm)) || 
        (p.ref && p.ref.toLowerCase().includes(searchTerm)) || 
        (p.subLabel && p.subLabel.toLowerCase().includes(searchTerm)) ||
        (p.matiere && p.matiere.toLowerCase().includes(searchTerm)) ||
        (p.technique && p.technique.toLowerCase().includes(searchTerm))
      );
      return matchUni && matchSearch;
    });

    const paginated = filtered.slice(0, catalogPageLimit);

    if (countInfo) {
      countInfo.textContent = `Affichage de ${paginated.length} sur ${filtered.length} article(s) trouvé(s) (${products.length} au total en boutique)`;
    }

    if (btnLoadMore) {
      if (paginated.length < filtered.length) {
        btnLoadMore.classList.remove('hidden');
        btnLoadMore.textContent = `Afficher 50 articles supplémentaires (${paginated.length} / ${filtered.length})`;
      } else {
        btnLoadMore.classList.add('hidden');
      }
    }

    if (tableBody) {
      if (filtered.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="text-center py-10 text-gray-500 text-xs">Aucun article trouvé pour cette recherche ou cet univers.</td></tr>`;
      } else {
        tableBody.innerHTML = paginated.map(p => `
          <tr data-id="${p.id}">
            <td class="w-14">
              <img src="${p.image || 'assets/logos/kreativpulse-icon.webp'}" alt="${p.name}" class="w-10 h-10 object-contain rounded-lg bg-black/40 border border-white/10 p-1" onerror="this.src='assets/logos/kreativpulse-icon.webp'" />
            </td>
            <td>
              <div class="font-semibold text-white text-xs sm:text-sm">${p.name}</div>
              <div class="text-[11px] text-gray-400 font-mono mt-0.5">Réf: ${p.ref}</div>
            </td>
            <td>
              <span class="admin-badge admin-badge-cyan">
                <span class="admin-badge-dot"></span>
                ${p.universeLabel || 'Boutique'}
              </span>
            </td>
            <td>
              <span class="text-xs text-gray-300 font-medium">${p.subLabel || 'Standard'}</span>
              ${p.technique ? `<div class="text-[10px] text-gray-500 mt-0.5">${p.technique}</div>` : ''}
            </td>
            <td class="text-right whitespace-nowrap">
              <button type="button" class="btn-edit-product btn-admin-secondary text-xs px-2.5 py-1 mr-1" data-id="${p.id}">
                Modifier
              </button>
              <button type="button" class="btn-delete-product btn-admin-danger text-xs px-2.5 py-1" data-id="${p.id}">
                Supprimer
              </button>
            </td>
          </tr>
        `).join('');

        tableBody.querySelectorAll('.btn-edit-product').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const found = products.find(item => item.id === id);
            if (found) openProductEditModal(found);
          });
        });

        tableBody.querySelectorAll('.btn-delete-product').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            if (confirm('Confirmez-vous la suppression de cet article de la boutique ?')) {
              const updated = products.filter(item => item.id !== id);
              saveCustomCatalog(updated);
              showAdminToast('Article retiré du catalogue');
              renderCatalogManager();
              renderDashboardOverview();
            }
          });
        });
      }
    }
  }

  // --- 8. GESTION DES LEADS & DEVIS ---
  function renderLeadsManager() {
    const container = document.getElementById('leads-list-container');
    const leads = getLeads();

    if (container) {
      if (leads.length === 0) {
        container.innerHTML = `
          <div class="p-12 text-center text-gray-500 admin-card">
            <div class="font-semibold text-white mb-1">Aucune demande reçue</div>
            <div class="text-xs text-gray-400">Les formulaires remplis sur le site public apparaîtront automatiquement ici.</div>
          </div>
        `;
      } else {
        container.innerHTML = leads.map(l => {
          const isProcessed = l.status === 'processed';
          const cleanPhone = (l.phone || '').replace(/[^0-9]/g, '');
          const isDevisPanier = l.type === 'devis_panier' || (l.items && l.items.length > 0);
          const isEstimation = l.type === 'estimation_express';
          
          let typeBadge = `<span class="admin-badge admin-badge-orange text-[11px] py-0.5 px-2"><span class="admin-badge-dot"></span>Studio Contact</span>`;
          if (isDevisPanier) {
            typeBadge = `<span class="admin-badge admin-badge-cyan text-[11px] py-0.5 px-2"><span class="admin-badge-dot"></span>Devis Boutique</span>`;
          } else if (isEstimation) {
            typeBadge = `<span class="admin-badge admin-badge-purple text-[11px] py-0.5 px-2"><span class="admin-badge-dot"></span>Estimation</span>`;
          }

          const formattedDate = new Date(l.date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
          });

          // WhatsApp direct message
          let waText = `Bonjour ${encodeURIComponent(l.name)}, direction Kreativ'Pulse Dakar suite à votre message transmis depuis notre site web.`;
          if (isDevisPanier) {
            waText = `Bonjour ${encodeURIComponent(l.name)}, direction Kreativ'Pulse Dakar suite à votre demande de devis pour vos objets publicitaires (${encodeURIComponent(l.company || 'votre commande')}).`;
          } else if (isEstimation) {
            waText = `Bonjour ${encodeURIComponent(l.name)}, direction Kreativ'Pulse suite à votre demande d'estimation pour vos projets digitaux et communication.`;
          }

          const nameParts = (l.name || 'Client').trim().split(/\s+/);
          const initials = nameParts.length >= 2 
            ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
            : (nameParts[0][0] || 'C').toUpperCase();

          const totalUnits = (l.items && Array.isArray(l.items))
            ? l.items.reduce((acc, it) => acc + (parseInt(it.qty) || 1), 0)
            : 0;

          return `
            <div class="admin-lead-card p-4 sm:p-5 space-y-3" data-lead-id="${l.id}">
              
              <!-- Top Row: Avatar + Client Info + Status/Date -->
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm" style="background: linear-gradient(135deg, rgba(255,117,0,0.18), rgba(255,85,0,0.08)); border: 1px solid rgba(255,117,0,0.3); color: #FF7500;">
                    ${initials}
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <h4 class="font-bold text-white text-sm sm:text-base truncate tracking-tight leading-snug">${l.name}</h4>
                      ${typeBadge}
                    </div>
                    ${l.company ? `<div class="text-xs text-gray-400 font-medium truncate mt-0.5">${l.company}</div>` : ''}
                  </div>
                </div>

                <!-- Status & Date -->
                <div class="flex flex-col items-end gap-1 shrink-0">
                  <span class="admin-badge ${isProcessed ? 'admin-badge-green' : 'admin-badge-orange'} text-[11px] py-0.5 px-2">
                    <span class="admin-badge-dot"></span>
                    ${isProcessed ? 'Traité' : 'Nouveau'}
                  </span>
                  <span class="text-[10px] text-gray-500 font-mono">${formattedDate}</span>
                </div>
              </div>

              <!-- Contact & Specs Chips Strip -->
              <div class="flex flex-wrap items-center gap-1.5 pt-0.5">
                ${l.phone && l.phone !== 'Non spécifié' && l.phone !== 'Non renseigné' ? `
                  <a href="tel:${cleanPhone}" class="admin-contact-chip group" title="Appeler ce contact">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-400 group-hover:stroke-orange transition-colors"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <span>${l.phone}</span>
                  </a>
                ` : ''}
                ${l.email && l.email !== 'Non spécifié' && l.email !== 'Non renseigné' ? `
                  <a href="mailto:${l.email}" class="admin-contact-chip group" title="Envoyer un email">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-cyan-400 group-hover:stroke-orange transition-colors"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <span class="max-w-[170px] truncate">${l.email}</span>
                  </a>
                ` : ''}
                ${l.city ? `
                  <span class="admin-contact-chip text-cyan-300 border-cyan-500/20 bg-cyan-500/10">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>${l.city}</span>
                  </span>
                ` : ''}
                ${l.budget ? `
                  <span class="admin-contact-chip text-gray-300">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                    <span class="truncate max-w-[150px]">${l.budget}</span>
                  </span>
                ` : ''}
                ${l.timeline ? `
                  <span class="admin-contact-chip text-gray-400">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span class="truncate max-w-[150px]">${l.timeline}</span>
                  </span>
                ` : ''}
              </div>

              <!-- Content / Articles Preview -->
              ${isDevisPanier ? `
                <div class="space-y-2 pt-0.5">
                  <div class="flex items-center justify-between text-[11px] text-gray-400">
                    <span class="font-semibold text-white/80 uppercase tracking-wider text-[10px]">
                      Panier : ${l.items ? l.items.length : 0} réf. (${totalUnits} unités)
                    </span>
                    ${l.deliveryOption || l.callOption ? `
                      <span class="text-orange text-[10px] truncate">
                        ${[l.deliveryOption !== false ? 'Livraison' : null, l.callOption !== false ? 'Rappel 24h' : null].filter(Boolean).join(' · ')}
                      </span>
                    ` : ''}
                  </div>

                  <!-- Compact Items Grid -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    ${(l.items || []).map(item => `
                      <div class="flex items-center gap-2.5 p-2 rounded-xl bg-black/40 border border-white/5">
                        <img src="${item.image || 'assets/logos/kreativpulse-icon.webp'}" alt="${item.name}" class="w-9 h-9 object-contain rounded-lg bg-white/[0.03] border border-white/10 shrink-0 p-0.5" onerror="this.src='assets/logos/kreativpulse-icon.webp'" />
                        <div class="min-w-0 flex-1">
                          <div class="text-xs font-medium text-white truncate">${item.name}</div>
                          <div class="text-[10px] text-gray-500 font-mono truncate">Réf: ${item.ref || '000000'}${item.subLabel ? ' · ' + item.subLabel : ''}</div>
                        </div>
                        <span class="text-xs font-bold text-orange px-2 py-0.5 rounded-md bg-orange/10 border border-orange/20 shrink-0 font-mono">
                          x${item.qty || 1}
                        </span>
                      </div>
                    `).join('')}
                  </div>

                  ${l.notes || (l.msg && !l.items) ? `
                    <div class="p-2.5 rounded-xl bg-black/40 border-l-2 border-orange/40 border-y border-r border-white/5 text-xs text-gray-300 leading-relaxed">
                      <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mb-0.5">Précisions client :</span>
                      ${l.notes || l.msg}
                    </div>
                  ` : ''}
                </div>
              ` : (isEstimation ? `
                <div class="p-2.5 rounded-xl bg-black/40 border-l-2 border-purple-500/50 border-y border-r border-white/5 text-xs text-gray-300 space-y-1">
                  <div class="text-orange font-semibold">${l.poles ? l.poles.join(' · ') : 'Services créatifs'}</div>
                  <div class="text-gray-400 text-xs">${l.msg || ''}</div>
                </div>
              ` : `
                <div class="p-2.5 rounded-xl bg-black/40 border-l-2 border-orange/50 border-y border-r border-white/5 text-xs text-gray-300 leading-relaxed">
                  <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mb-0.5">Message client :</span>
                  ${l.msg || 'Aucun message textuel fourni.'}
                </div>
              `)}

              <!-- Unified Single-Row Footer Actions -->
              <div class="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
                <button type="button" class="btn-toggle-lead-status btn-admin-secondary text-xs py-1.5 px-3 flex items-center gap-1.5" data-id="${l.id}">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>${isProcessed ? 'Marquer nouveau' : 'Marquer traité'}</span>
                </button>
                <div class="flex items-center gap-1.5">
                  <a href="https://wa.me/${cleanPhone}?text=${waText}" target="_blank" class="admin-wa-btn py-1.5 px-3">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                    <span>WhatsApp</span>
                  </a>
                  <button type="button" class="btn-delete-lead btn-admin-danger text-xs p-2" data-id="${l.id}" title="Supprimer la demande">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                  </button>
                </div>
              </div>

            </div>
          `;
        }).join('');

        container.querySelectorAll('.btn-toggle-lead-status').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const leadsList = getLeads();
            const target = leadsList.find(item => item.id === id);
            if (target) {
              target.status = target.status === 'processed' ? 'new' : 'processed';
              saveLeads(leadsList);
              if (window.KreativDB) window.KreativDB.updateLeadStatus(id, target.status);
              showAdminToast('Statut mis à jour');
              renderLeadsManager();
              renderDashboardOverview();
            }
          });
        });

        container.querySelectorAll('.btn-delete-lead').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            if (confirm('Supprimer cette demande ?')) {
              const updated = leads.filter(item => item.id !== id);
              saveLeads(updated);
              if (window.KreativDB) window.KreativDB.deleteLead(id);
              showAdminToast('Demande supprimée');
              renderLeadsManager();
              renderDashboardOverview();
            }
          });
        });
      }
    }
  }

  // --- 9. PARAMÈTRES DE L'AGENCE ---
  function renderSettingsManager() {
    const settings = getAgencySettings();
    const fAddress = document.getElementById('settingAddress');
    const fPhone = document.getElementById('settingPhone');
    const fWhatsApp = document.getElementById('settingWhatsApp');
    const fEmail = document.getElementById('settingEmail');
    const fHours = document.getElementById('settingHours');

    if (fAddress) fAddress.value = settings.address || defaultAgencySettings.address;
    if (fPhone) fPhone.value = settings.phone || defaultAgencySettings.phone;
    if (fWhatsApp) fWhatsApp.value = settings.whatsapp || defaultAgencySettings.whatsapp;
    if (fEmail) fEmail.value = settings.email || defaultAgencySettings.email;
    if (fHours) fHours.value = settings.hours || defaultAgencySettings.hours;

    // Mise à jour de l'indicateur d'état du mot de passe
    const badgePass = document.getElementById('badgeCurrentPasswordStatus');
    if (badgePass) {
      const isCustom = !!localStorage.getItem(ADMIN_STORAGE_KEY_PASSWORD);
      if (isCustom) {
        badgePass.textContent = 'Code Personnalisé Actif';
        badgePass.className = 'admin-badge admin-badge-green text-[10px] shrink-0 font-mono';
      } else {
        badgePass.textContent = 'Code par défaut (2026)';
        badgePass.className = 'admin-badge admin-badge-cyan text-[10px] shrink-0 font-mono';
      }
    }
  }

  const formSettings = document.getElementById('formAgencySettings');
  if (formSettings) {
    formSettings.addEventListener('submit', (e) => {
      e.preventDefault();
      const updated = {
        address: document.getElementById('settingAddress')?.value.trim() || defaultAgencySettings.address,
        phone: document.getElementById('settingPhone')?.value.trim() || defaultAgencySettings.phone,
        whatsapp: document.getElementById('settingWhatsApp')?.value.trim() || defaultAgencySettings.whatsapp,
        email: document.getElementById('settingEmail')?.value.trim() || defaultAgencySettings.email,
        hours: document.getElementById('settingHours')?.value.trim() || defaultAgencySettings.hours
      };
      saveAgencySettings(updated);
      showAdminToast('Coordonnées de l\'agence enregistrées');
    });
  }

  // Gestion du changement de mot de passe Studio
  const formPassword = document.getElementById('formAdminPassword');
  if (formPassword) {
    formPassword.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentInput = document.getElementById('adminCurrentPassword');
      const newInput = document.getElementById('adminNewPassword');
      const confirmInput = document.getElementById('adminConfirmPassword');
      const errBox = document.getElementById('passwordErrorMsg');

      const currentVal = (currentInput?.value || '').trim();
      const newVal = (newInput?.value || '').trim();
      const confirmVal = (confirmInput?.value || '').trim();

      const activePass = getAdminPassword();
      const isDefault = activePass === '2026';
      const isCurrentValid = currentVal === activePass || (isDefault && (currentVal === 'admin' || currentVal === 'kreativ'));

      if (!isCurrentValid) {
        if (errBox) {
          errBox.textContent = 'Le mot de passe actuel saisi est incorrect.';
          errBox.classList.remove('hidden');
        }
        if (currentInput) {
          currentInput.classList.add('border-red-500');
          setTimeout(() => currentInput.classList.remove('border-red-500'), 1500);
        }
        return;
      }

      if (newVal.length < 4) {
        if (errBox) {
          errBox.textContent = 'Le nouveau mot de passe doit comporter au moins 4 caractères.';
          errBox.classList.remove('hidden');
        }
        return;
      }

      if (newVal !== confirmVal) {
        if (errBox) {
          errBox.textContent = 'La confirmation ne correspond pas au nouveau mot de passe.';
          errBox.classList.remove('hidden');
        }
        if (confirmInput) {
          confirmInput.classList.add('border-red-500');
          setTimeout(() => confirmInput.classList.remove('border-red-500'), 1500);
        }
        return;
      }

      if (errBox) errBox.classList.add('hidden');
      setAdminPassword(newVal);
      formPassword.reset();
      showAdminToast('Mot de passe Studio mis à jour avec succès');
      renderSettingsManager();
    });
  }

  const btnResetPasswordDefault = document.getElementById('btnResetPasswordDefault');
  if (btnResetPasswordDefault) {
    btnResetPasswordDefault.addEventListener('click', () => {
      if (confirm('Rétablir le code d\'accès par défaut (2026) pour l\'Espace Admin ?')) {
        resetAdminPassword();
        const errBox = document.getElementById('passwordErrorMsg');
        if (errBox) errBox.classList.add('hidden');
        const formPassword = document.getElementById('formAdminPassword');
        if (formPassword) formPassword.reset();
        showAdminToast('Code par défaut (2026) rétabli');
        renderSettingsManager();
      }
    });
  }

  // Toggle visibilité des mots de passe
  document.querySelectorAll('.btn-toggle-password-visibility').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          btn.classList.add('text-orange');
          btn.classList.remove('text-gray-400');
        } else {
          input.type = 'password';
          btn.classList.remove('text-orange');
          btn.classList.add('text-gray-400');
        }
      }
    });
  });

  // --- 10. EXPORT JSON & RESTAURATION ---
  const btnExportAllData = document.getElementById('btnExportAllData');
  if (btnExportAllData) {
    btnExportAllData.addEventListener('click', () => {
      const dataPackage = {
        exportedAt: new Date().toISOString(),
        agency: "Kreativ'Pulse Dakar (Sicap Liberté 5)",
        settings: getAgencySettings(),
        projects: getCustomProjects(),
        leads: getLeads()
      };

      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataPackage, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `kreativpulse_backup_${new Date().toISOString().slice(0,10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      showAdminToast('Sauvegarde JSON téléchargée');
    });
  }

  const btnResetDefaults = document.getElementById('btnResetDefaults');
  if (btnResetDefaults) {
    btnResetDefaults.addEventListener('click', () => {
      if (confirm('Restaurer toutes les données initiales de l\'agence ?')) {
        localStorage.removeItem(ADMIN_STORAGE_KEY_PROJECTS);
        localStorage.removeItem(ADMIN_STORAGE_KEY_SETTINGS);
        showAdminToast('Données réinitialisées');
        renderDashboardOverview();
        renderPortfolioManager();
        renderSettingsManager();
      }
    });
  }

  // --- 11. INITIALISATION ---
  document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    initNavigation();
    initModalUploadListeners();
    initProductModalListeners();

    const searchCat = document.getElementById('catalog-admin-search');
    const uniCat = document.getElementById('catalog-admin-universe-filter');
    const btnLoadMore = document.getElementById('btnLoadMoreProducts');

    if (searchCat) {
      searchCat.addEventListener('input', () => {
        catalogPageLimit = 50;
        renderCatalogManager();
      });
    }

    if (uniCat) {
      uniCat.addEventListener('change', () => {
        catalogPageLimit = 50;
        renderCatalogManager();
      });
    }

    if (btnLoadMore) {
      btnLoadMore.addEventListener('click', () => {
        catalogPageLimit += 50;
        renderCatalogManager();
      });
    }

    const btnNewProd = document.getElementById('btnAddNewProduct');
    if (btnNewProd) {
      btnNewProd.addEventListener('click', () => openProductEditModal(null));
    }

    const searchProj = document.getElementById('portfolio-search-input');
    if (searchProj) searchProj.addEventListener('input', renderPortfolioManager);

    const btnNewProj = document.getElementById('btnAddNewProject');
    if (btnNewProj) {
      btnNewProj.addEventListener('click', () => openProjectEditModal(null));
    }

    const btnRefreshLeads = document.getElementById('btnRefreshLeads');
    if (btnRefreshLeads) {
      btnRefreshLeads.addEventListener('click', () => {
        btnRefreshLeads.classList.add('opacity-50');
        renderLeadsManager();
        renderDashboardOverview();
        showAdminToast('Demandes de devis actualisées');
        setTimeout(() => btnRefreshLeads.classList.remove('opacity-50'), 350);
      });
    }

    // Écouteur pour actualisation automatique en direct inter-onglets (LocalStorage)
    window.addEventListener('storage', (e) => {
      if (e.key === ADMIN_STORAGE_KEY_LEADS) {
        renderDashboardOverview();
        renderLeadsManager();
        showAdminToast('Nouvelle demande reçue depuis le site public !');
      }
    });

    // Synchronisation automatique en arrière-plan avec Supabase PostgreSQL (Leads)
    if (window.KreativDB && typeof window.KreativDB.getLeads === 'function') {
      window.KreativDB.getLeads().then(remoteLeads => {
        if (Array.isArray(remoteLeads) && remoteLeads.length > 0) {
          renderDashboardOverview();
          renderLeadsManager();
        }
      }).catch(() => {});
    }

    // Synchronisation automatique des projets avec Supabase (Portabilité mobile/multi-appareils)
    async function syncAdminProjects() {
      if (!window.KreativDB || typeof window.KreativDB.getProjects !== 'function') return;
      try {
        const cloudProjects = await window.KreativDB.getProjects();
        const localProjects = getCustomProjects();

        // 1. Pousser les projets locaux vers Supabase s'ils n'y sont pas encore
        if (Array.isArray(localProjects)) {
          for (const lp of localProjects) {
            const isDefault = defaultPortfolioProjects.some(dp => dp.id === lp.id || dp.title.trim().toLowerCase() === lp.title.trim().toLowerCase());
            if (!isDefault) {
              const inCloud = cloudProjects.some(cp => cp.title.trim().toLowerCase() === lp.title.trim().toLowerCase());
              if (!inCloud) {
                await window.KreativDB.saveProject(lp);
              }
            }
          }
        }

        // 2. Mettre à jour la vue locale avec les projets Supabase
        const latestCloud = await window.KreativDB.getProjects();
        if (Array.isArray(latestCloud) && latestCloud.length > 0) {
          const formatted = latestCloud.map(cp => ({
            id: cp.id,
            title: cp.title,
            client: cp.client || "Kreativ'Pulse Studio",
            category: cp.category || 'digital',
            categoryLabel: (cp.category === 'branding' ? 'Branding & Mode' : cp.category === 'event' ? 'Événementiel & Sommets' : cp.category === 'print' ? 'Signalétique & Print' : 'Campagnes & Digital'),
            year: cp.year || String(new Date().getFullYear()),
            tagline: cp.description || '',
            desc: cp.description || '',
            deliverables: ["Direction Artistique", "Déclinaisons Multi-Formats", "Visuels HD"],
            cover: cp.image_url || 'assets/portfolio/sentrak.png',
            images: (Array.isArray(cp.gallery_urls) && cp.gallery_urls.length > 0) ? cp.gallery_urls : [cp.image_url || 'assets/portfolio/sentrak.png']
          }));

          const nonDupDefaults = defaultPortfolioProjects.filter(dp =>
            !formatted.some(cp => cp.title.trim().toLowerCase() === dp.title.trim().toLowerCase())
          );

          const merged = [...formatted, ...nonDupDefaults];
          saveCustomProjects(merged);
          renderPortfolioManager();
          renderDashboardOverview();
        }
      } catch (e) {
        console.warn('[Admin] Sync projets cloud passif:', e);
      }
    }

    setTimeout(syncAdminProjects, 500);

    // Recharger automatiquement quand l'onglet redevient actif
    window.addEventListener('focus', () => {
      renderDashboardOverview();
      renderLeadsManager();
      syncAdminProjects();
      if (window.KreativDB && typeof window.KreativDB.getLeads === 'function') {
        window.KreativDB.getLeads().then(remoteLeads => {
          if (Array.isArray(remoteLeads) && remoteLeads.length > 0) {
            renderDashboardOverview();
            renderLeadsManager();
          }
        }).catch(() => {});
      }
    });

    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.admin-modal-backdrop').forEach(m => m.classList.remove('active'));
      });
    });
  });

})();
