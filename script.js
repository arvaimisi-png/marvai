document.addEventListener('DOMContentLoaded', () => {

  // 1. TAB/PAGE WALTÓ LOGIKA
  const navLinks = document.querySelectorAll('.nav-link, .brand-name, .nav-btn');
  const sections = document.querySelectorAll('.page-section');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const contactForm = document.getElementById('contactForm');

  function switchPage(targetId) {
    sections.forEach(section => section.classList.remove('active'));

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-target') === targetId) {
        link.classList.add('active');
      }
    });

    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = element.getAttribute('data-target');
      if (targetId) switchPage(targetId);
    });
  });

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // 2. NYELVVÁLTÓ (HU / EN)
  const langHuBtn = document.getElementById('lang-hu');
  const langEnBtn = document.getElementById('lang-en');
  const htmlTag = document.documentElement;

  function setLanguage(lang) {
    htmlTag.setAttribute('data-lang', lang);
    localStorage.setItem('preferredLang', lang);

    if (lang === 'hu') {
      langHuBtn.classList.add('active');
      langEnBtn.classList.remove('active');
    } else {
      langEnBtn.classList.add('active');
      langHuBtn.classList.remove('active');
    }
  }

  if (langHuBtn && langEnBtn) {
    langHuBtn.addEventListener('click', () => setLanguage('hu'));
    langEnBtn.addEventListener('click', () => setLanguage('en'));
  }

  // Beállítás betöltése localStorage-ból
  const savedLang = localStorage.getItem('preferredLang') || 'hu';
  setLanguage(savedLang);

  // 3. KAPCSOLATI ŰRLAP KEZELÉSE
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentLang = htmlTag.getAttribute('data-lang');
      if (currentLang === 'en') {
        alert('Thank you for your message! I will get back to you soon.');
      } else {
        alert('Köszönöm az üzenetet! Hamarosan felveszem Önnel a kapcsolatot.');
      }
      contactForm.reset();
    });
  }

});
