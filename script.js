// --- 📚 Leçons avec audio ---
const lessons = [
  {
    title: "Les couleurs",
    words: [
      { fr: "Rouge", en: "Red" },
      { fr: "Bleu", en: "Blue" },
      { fr: "Vert", en: "Green" },
      { fr: "Jaune", en: "Yellow" },
      { fr: "Noir", en: "Black" },
    ],
  },
  {
    title: "Les jours de la semaine",
    words: [
      { fr: "Lundi", en: "Monday" },
      { fr: "Mardi", en: "Tuesday" },
      { fr: "Mercredi", en: "Wednesday" },
      { fr: "Jeudi", en: "Thursday" },
      { fr: "Vendredi", en: "Friday" },
      { fr: "Samedi", en: "Saturday" },
      { fr: "Dimanche", en: "Sunday" },
    ],
  },
  {
    title: "Les verbes de base",
    words: [
      { fr: "Être", en: "To be" },
      { fr: "Avoir", en: "To have" },
      { fr: "Aller", en: "To go" },
      { fr: "Faire", en: "To do / make" },
      { fr: "Pouvoir", en: "Can / to be able to" },
    ],
  },
];

// --- 🗣️ Générer les leçons ---
const lessonContainer = document.getElementById("lesson-container");

lessons.forEach((lesson) => {
  const div = document.createElement("div");
  div.innerHTML = `<h3>${lesson.title}</h3>`;

  lesson.words.forEach((word) => {
    const line = document.createElement("div");
    line.className = "lesson-word";
    line.innerHTML = `
      <span>${word.fr} — ${word.en}</span>
      <button class="audio-btn">🔊</button>
    `;
    const btn = line.querySelector(".audio-btn");
    btn.addEventListener("click", () => playAudio(word.en));
    div.appendChild(line);
  });

  lessonContainer.appendChild(div);
});

// --- 🔊 Lecture audio instantanée ---
function playAudio(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = text.match(/[a-z]/i) ? "en-US" : "fr-FR";
  utterance.rate = 1;
  utterance.pitch = 1.1;
  utterance.voice = speechSynthesis.getVoices().find(v => v.lang.startsWith(utterance.lang));
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

// --- 🧩 Quiz interactifs ---
const quizData = [
  {
    question: "Comment dit-on 'Bleu' en anglais ?",
    options: ["Green", "Blue", "Red", "Black"],
    answer: "Blue",
  },
  {
    question: "Comment dit-on 'Vendredi' en anglais ?",
    options: ["Sunday", "Friday", "Thursday", "Saturday"],
    answer: "Friday",
  },
  {
    question: "Que veut dire 'To be' en français ?",
    options: ["Avoir", "Être", "Aller", "Faire"],
    answer: "Être",
  },
];

const quizContainer = document.getElementById("quiz-container");

quizData.forEach((quiz, index) => {
  const div = document.createElement("div");
  div.className = "quiz-question";
  div.innerHTML = `<h3>${index + 1}. ${quiz.question}</h3>`;
  
  quiz.options.forEach((opt) => {
    const btn = document.createElement("div");
    btn.className = "quiz-option";
    btn.textContent = opt;
    btn.addEventListener("click", () => {
      if (opt === quiz.answer) {
        btn.style.background = "rgba(0,255,0,0.3)";
      } else {
        btn.style.background = "rgba(255,0,0,0.3)";
      }
    });
    div.appendChild(btn);
  });

  quizContainer.appendChild(div);
});

// --- 📩 Message de confirmation du formulaire ---
document.getElementById("reservation-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
  })
    .then(() => {
      const msg = document.createElement("p");
      msg.textContent = "✅ Votre demande de réservation a bien été envoyée !";
      msg.style.color = "lightgreen";
      form.appendChild(msg);
      form.reset();
    })
    .catch(() => {
      alert("❌ Une erreur est survenue. Veuillez réessayer.");
    });
});
