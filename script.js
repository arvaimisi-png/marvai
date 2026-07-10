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
  
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});

});
