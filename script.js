/* --------------------------
   Données : leçons et quiz
   -------------------------- */
const DATA = {
  lessons: {
    "Salutations": [
      { fr: "Bonjour", en: "Hello" },
      { fr: "Bonsoir", en: "Good evening" },
      { fr: "Au revoir", en: "Goodbye" },
      { fr: "Merci", en: "Thank you" }
    ],
    "Les couleurs": [
      { fr: "Rouge", en: "Red" },
      { fr: "Bleu", en: "Blue" },
      { fr: "Vert", en: "Green" },
      { fr: "Jaune", en: "Yellow" },
      { fr: "Noir", en: "Black" },
      { fr: "Blanc", en: "White" }
    ],
    "Jours de la semaine": [
      { fr: "Lundi", en: "Monday" },
      { fr: "Mardi", en: "Tuesday" },
      { fr: "Mercredi", en: "Wednesday" },
      { fr: "Jeudi", en: "Thursday" },
      { fr: "Vendredi", en: "Friday" },
      { fr: "Samedi", en: "Saturday" },
      { fr: "Dimanche", en: "Sunday" }
    ],
    "Verbes de base": [
      { fr: "Être", en: "To be" },
      { fr: "Avoir", en: "To have" },
      { fr: "Aller", en: "To go" },
      { fr: "Faire", en: "To do/make" }
    ],
    "Animaux": [
      { fr: "Chat", en: "Cat" },
      { fr: "Chien", en: "Dog" },
      { fr: "Oiseau", en: "Bird" }
    ],
    "Nourriture": [
      { fr: "Pain", en: "Bread" },
      { fr: "Eau", en: "Water" },
      { fr: "Pomme", en: "Apple" }
    ]
  }
};

/* --------------------------
   UTIL : voix (Web Speech)
   -------------------------- */
function getVoice(langPrefix = "fr") {
  const voices = speechSynthesis.getVoices();
  // Prioritise a female voice if available
  const v = voices.find(v => v.lang.startsWith(langPrefix) && /female|frau|frau|anna|sara|karen|victoria/i.test((v.name || "").toLowerCase()));
  if (v) return v;
  // otherwise first voice that matches prefix
  const any = voices.find(v => v.lang.startsWith(langPrefix));
  return any || voices[0] || null;
}

function speak(text, lang = "fr-FR") {
  if (!("speechSynthesis" in window)) return alert("Synthèse vocale non disponible sur ce navigateur.");
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 1;
  u.pitch = 1.05;
  const voice = getVoice(lang.startsWith("fr") ? "fr" : "en");
  if (voice) u.voice = voice;
  speechSynthesis.speak(u);
}

/* --------------------------
   GÉNÉRATION DES LEÇONS
   -------------------------- */
function renderLessons() {
  const root = document.getElementById("lessons-root");
  if (!root) return;
  root.innerHTML = "";
  for (const [title, words] of Object.entries(DATA.lessons)) {
    const card = document.createElement("section");
    card.className = "card";
    const h = document.createElement("h3");
    h.textContent = title;
    card.appendChild(h);

    words.forEach(item => {
      const row = document.createElement("div");
      row.className = "lesson-card";
      const label = document.createElement("div");
      label.className = "label";
      label.innerHTML = `<strong>${item.fr}</strong> — <em>${item.en}</em>`;
      const btn = document.createElement("button");
      btn.className = "audio-btn";
      btn.textContent = "🔊";
      btn.title = `Écouter "${item.fr}"`;
      btn.onclick = () => {
        // speak FR then EN
        speak(item.fr, "fr-FR");
        setTimeout(() => speak(item.en, "en-US"), 700);
      };
      row.appendChild(label);
      row.appendChild(btn);
      card.appendChild(row);
    });

    root.appendChild(card);
  }
}

/* --------------------------
   QUIZ : génération et logique
   -------------------------- */
function buildQuizControls() {
  const sel = document.getElementById("quiz-category");
  const quizArea = document.getElementById("quiz-area");
  if (!sel) return;
  sel.innerHTML = "";
  Object.keys(DATA.lessons).forEach(key => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = key;
    sel.appendChild(opt);
  });
  // start button
  const startBtn = document.getElementById("start-quiz");
  if (startBtn) startBtn.onclick = () => startQuiz(sel.value);
}

function randomSample(arr, n) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function startQuiz(category) {
  const quizArea = document.getElementById("quiz-area");
  const resultEl = document.getElementById("quiz-result");
  quizArea.innerHTML = "";
  resultEl.innerHTML = "";
  const items = DATA.lessons[category] || [];
  if (!items.length) { quizArea.textContent = "Aucune donnée pour cette catégorie."; return; }

  // Compose questions: for each sampled item, build 3 distractors + correct
  const sample = randomSample(items, Math.min(8, items.length));
  let score = 0;
  sample.forEach((item, idx) => {
    const q = document.createElement("div");
    q.className = "question";
    const qTitle = document.createElement("p");
    qTitle.innerHTML = `<strong>${idx+1}. Écoutez et choisissez la bonne traduction (fr → en)</strong>`;
    q.appendChild(qTitle);

    // play button
    const playBtn = document.createElement("button");
    playBtn.className = "audio-btn";
    playBtn.textContent = "🔊";
    playBtn.style.marginLeft = "10px";
    playBtn.onclick = () => speak(item.fr, "fr-FR");
    qTitle.appendChild(playBtn);

    // options: correct + 3 random others from pool
    const choicesPool = items.map(x => x.en).filter(e => e !== item.en);
    const distractors = randomSample(choicesPool, Math.min(3, choicesPool.length));
    const options = randomSample([item.en, ...distractors], Math.min(4, 1 + distractors.length));

    options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.textContent = opt;
      btn.onclick = () => {
        if (btn.clicked) return; // already answered this question
        btn.clicked = true;
        if (opt === item.en) {
          btn.classList.add("correct");
          score++;
          // mark others as disabled
        } else {
          btn.classList.add("wrong");
          // highlight correct one
          Array.from(q.querySelectorAll(".option")).forEach(o => {
            if (o.textContent === item.en) o.classList.add("correct");
          });
        }
        // disable all options
        Array.from(q.querySelectorAll(".option")).forEach(o => o.disabled = true);
      };
      q.appendChild(btn);
    });

    quizArea.appendChild(q);
  });

  // show final button
  const finish = document.createElement("div");
  finish.style.marginTop = "12px";
  const btnFinish = document.createElement("button");
  btnFinish.className = "btn";
  btnFinish.textContent = "Afficher le score";
  btnFinish.onclick = () => {
    resultEl.innerHTML = `<h3>Votre score : ${score}/${sample.length}</h3>`;
  };
  finish.appendChild(btnFinish);
  quizArea.appendChild(finish);
}

/* --------------------------
   RÉSERVATION : envoi simple + confirmation
   (Formspree or fallback)
   -------------------------- */
function setupReservation() {
  const form = document.getElementById("reservation-form");
  const conf = document.getElementById("reservation-confirm");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    // Basic client-side validation
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    if (!name || !email) {
      conf.textContent = "Veuillez renseigner votre nom et votre email.";
      conf.style.color = "#ffb3b3";
      return;
    }

    // Try to send to Formspree endpoint (replace endpoint if you have your own)
    // NOTE: to receive directly at kalel.cours@gmail.com you must configure Formspree to forward to that email.
    fetch("https://formspree.io/f/mnqeeoyz", {
      method: "POST",
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(resp => {
      if (resp.ok) {
        conf.textContent = "✅ Votre demande a bien été envoyée. Nous vous contacterons bientôt.";
        conf.style.color = "#9fffa8";
        form.reset();
      } else {
        // fallback message
        conf.textContent = "✅ Envoi local : votre demande est prête. (Si l'envoi automatique a échoué, vérifiez la configuration Formspree.)";
        conf.style.color = "#ffd28a";
      }
    }).catch(() => {
      conf.textContent = "✅ Envoi local : votre demande a bien été prise (connexion au service d'envoi indisponible).";
      conf.style.color = "#ffd28a";
    });
  });
}

/* --------------------------
   INITIALISATION au chargement
   -------------------------- */
window.addEventListener("DOMContentLoaded", () => {
  // render lessons only on cours.html
  renderLessons();

  // quiz page setup
  buildQuizControls();

  // reservation
  setupReservation();

  // ensure voices loaded (some browsers load voices asynchronously)
  if (speechSynthesis && speechSynthesis.getVoices().length === 0) {
    speechSynthesis.onvoiceschanged = () => { /* no-op: getVoice will use updated list */ };
  }
});
