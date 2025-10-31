// 🌍 Gestion de la langue
const frBtn = document.getElementById('frBtn');
const enBtn = document.getElementById('enBtn');
const lessons = document.querySelectorAll('.lesson');
const title = document.querySelector('title');
const sections = document.querySelectorAll('section h3');

frBtn.addEventListener('click', () => setLanguage('fr'));
enBtn.addEventListener('click', () => setLanguage('en'));

function setLanguage(lang) {
  if (lang === 'fr') {
    title.textContent = "FrenchEnglishStudio";
    sections[0].textContent = "Leçons";
    sections[1].textContent = "Réserver un cours";
    lessons.forEach(l => l.querySelector('h4').textContent = l.getAttribute('data-fr'));
  } else {
    title.textContent = "FrenchEnglishStudio";
    sections[0].textContent = "Lessons";
    sections[1].textContent = "Book a class";
    lessons.forEach(l => l.querySelector('h4').textContent = l.getAttribute('data-en'));
  }
}

// 💌 Formulaire de réservation
document.getElementById('reservationForm').addEventListener('submit', function(e){
  e.preventDefault();
  const conf = document.getElementById('confirmation');
  const data = new FormData(this);

  // 🔗 Simulation de l’envoi (remplacer par Formspree si besoin)
  setTimeout(() => {
    conf.style.display = 'block';
    conf.textContent = '✅ Merci ! Nous avons bien reçu votre demande, vous serez contacté très bientôt par e-mail.';
    this.reset();
  }, 800);
});

// ✨ Animation des sections au défilement
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 1s ease forwards';
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('section').forEach(sec => {
  sec.style.opacity = 0;
  observer.observe(sec);
});
