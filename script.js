// === FrenchEnglishStudio - Voix automatique ===

// Liste des leçons bilingues
const lessons = {
  couleurs: {
    fr: ["Rouge", "Bleu", "Vert", "Jaune", "Noir"],
    en: ["Red", "Blue", "Green", "Yellow", "Black"]
  },
  jours: {
    fr: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
    en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  },
  verbes: {
    fr: ["Être", "Avoir", "Aller", "Faire", "Parler"],
    en: ["To be", "To have", "To go", "To do", "To speak"]
  }
};

// Générer le contenu HTML des leçons
function generateLessons() {
  const container = document.getElementById("lessons");
  container.innerHTML = "";

  for (const [cat, data] of Object.entries(lessons)) {
    const section = document.createElement("section");
    section.classList.add("lesson");

    const title = document.createElement("h2");
    title.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    section.appendChild(title);

    const grid = document.createElement("div");
    grid.classList.add("grid");

    for (let i = 0; i < data.fr.length; i++) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <p class="fr">${data.fr[i]}</p>
        <p class="en">${data.en[i]}</p>
      `;
      card.addEventListener("click", () => speakWord(data.fr[i], "fr-FR", data.en[i], "en-GB"));
      grid.appendChild(card);
    }

    section.appendChild(grid);
    container.appendChild(section);
  }
}

// Fonction pour faire parler les mots
function speakWord(frenchWord, frVoice, englishWord, enVoice) {
  const synth = window.speechSynthesis;

  // Phrase française
  const frUtter = new SpeechSynthesisUtterance(frenchWord);
  frUtter.lang = "fr-FR";
  frUtter.pitch = 1;
  frUtter.rate = 1;
  frUtter.volume = 1;

  // Phrase anglaise
  const enUtter = new SpeechSynthesisUtterance(englishWord);
  enUtter.lang = "en-GB";
  enUtter.pitch = 1;
  enUtter.rate = 1;
  enUtter.volume = 1;

  // Lecture séquentielle
  synth.cancel();
  synth.speak(frUtter);
  frUtter.onend = () => synth.speak(enUtter);
}

// Charger les leçons à l'ouverture de la page
window.onload = generateLessons;
