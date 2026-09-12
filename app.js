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
     4. PROJECT LIGHTBOX PREVIEW
     ========================================================== */
  const lightbox = document.getElementById('projectLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');
  const previewBtns = document.querySelectorAll('.btn-preview-project');

  const projectDetails = [
    {
      img: 'assets/images/pillar-event.jpg',
      title: "Stands & Foires Internationales",
      desc: "Création scénographique, mobilier sur-mesure et merchandising d'envergure pour des événements corporate de premier plan au Sénégal."
    },
    {
      img: 'assets/images/pillar-web.jpg',
      title: "Plateforme Digitale Institutionnelle",
      desc: "Portail web haute performance conçu pour maximiser le taux de conversion avec tableau de bord en temps réel et architecture moderne."
    },
    {
      img: 'assets/images/pillar-branding.jpg',
      title: "Identité Visuelle & Charte 360°",
      desc: "Conception complète de l'identité de marque : papeterie de luxe, packaging éco-responsable et guide de style pour marque haut de gamme."
    },
    {
      img: 'assets/images/pillar-audiovisual.jpg',
      title: "Spot Institutionnel 4K & Motion 3D",
      desc: "Campagne vidéo corporate diffusée sur les chaînes nationales et réseaux sociaux, mettant en avant le dynamisme et l'innovation."
    }
  ];

  previewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pIndex = parseInt(btn.getAttribute('data-project'), 10);
      const data = projectDetails[pIndex] || projectDetails[0];

      lightboxImg.src = data.img;
      lightboxTitle.textContent = data.title;
      lightboxDesc.textContent = data.desc;
      lightbox.classList.remove('hidden');
    });
  });

  if (closeLightboxBtn && lightbox) {
    closeLightboxBtn.addEventListener('click', () => lightbox.classList.add('hidden'));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.add('hidden');
    });
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
     9. CONTACT FORM SUBMISSION
     ========================================================== */
  const mainContactForm = document.getElementById('mainContactForm');
  const formSuccessMessage = document.getElementById('form-success-message');

  if (mainContactForm) {
    mainContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (formSuccessMessage) {
        formSuccessMessage.classList.remove('hidden');
        mainContactForm.reset();
        setTimeout(() => {
          formSuccessMessage.classList.add('hidden');
        }, 8000);
      }
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
