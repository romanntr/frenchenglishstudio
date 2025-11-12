// --- Données de cours ---
const cours = {
  "Les couleurs": ["rouge", "bleu", "vert", "jaune", "noir", "blanc"],
  "Les jours de la semaine": ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"],
  "Les verbes de base": ["être", "avoir", "aller", "faire", "dire", "voir"]
};

// --- Affichage des cours ---
const coursContainer = document.getElementById("cours-container");
if (coursContainer) {
  for (const [titre, mots] of Object.entries(cours)) {
    const section = document.createElement("section");
    section.innerHTML = `<h3>${titre}</h3>`;
    mots.forEach(mot => {
      const div = document.createElement("div");
      div.className = "mot-audio";
      div.innerHTML = `${mot} <button onclick="parler('${mot}')">🔊</button>`;
      section.appendChild(div);
    });
    coursContainer.appendChild(section);
  }
}

// --- Lecture vocale ---
function parler(texte) {
  const synth = window.speechSynthesis;
  const voix = synth.getVoices().find(v => v.lang.startsWith('fr'));
  const utterance = new SpeechSynthesisUtterance(texte);
  utterance.voice = voix;
  synth.speak(utterance);
}

// --- Quiz ---
const quizContainer = document.getElementById("quiz-container");
if (quizContainer) {
  const questions = [
    { question: "Comment dit-on 'rouge' en anglais ?", options: ["red", "blue", "green"], answer: "red" },
    { question: "Quel jour vient après lundi ?", options: ["mardi", "vendredi", "dimanche"], answer: "mardi" },
    { question: "Quel verbe signifie 'to be' ?", options: ["avoir", "être", "aller"], answer: "être" }
  ];

  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `<h4>${q.question}</h4>`;
    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => {
        alert(opt === q.answer ? "✅ Bonne réponse !" : "❌ Mauvaise réponse !");
      };
      div.appendChild(btn);
    });
    quizContainer.appendChild(div);
  });
}

// --- Réservation ---
const form = document.getElementById("reservation-form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("confirmation").textContent = "✅ Votre demande a été envoyée à kalel.cours@gmail.com";
    form.reset();
  });
}
