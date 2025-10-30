// --- Données des leçons ---
const lessons = [
  {
    title: "🎨 Les couleurs",
    words: [
      ["Rouge", "Red"],
      ["Bleu", "Blue"],
      ["Vert", "Green"],
      ["Jaune", "Yellow"],
      ["Noir", "Black"]
    ]
  },
  {
    title: "📅 Les jours de la semaine",
    words: [
      ["Lundi", "Monday"],
      ["Mardi", "Tuesday"],
      ["Mercredi", "Wednesday"],
      ["Jeudi", "Thursday"],
      ["Vendredi", "Friday"]
    ]
  },
  {
    title: "🗣️ Les verbes de base",
    words: [
      ["Être", "To be"],
      ["Avoir", "To have"],
      ["Aller", "To go"],
      ["Faire", "To do / make"],
      ["Parler", "To speak"]
    ]
  }
];

// --- Génération automatique des leçons ---
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".lessons-container");
  if (!container) return;

  container.innerHTML = ""; // Vide le conteneur

  lessons.forEach(lesson => {
    const section = document.createElement("div");
    section.classList.add("lesson-card");

    const title = document.createElement("h3");
    title.textContent = lesson.title;
    section.appendChild(title);

    const list = document.createElement("ul");
    lesson.words.forEach(([fr, en]) => {
      const li = document.createElement("li");
      li.innerHTML = `${fr} — <span class="translation" style="display:none;">${en}</span>`;
      li.addEventListener("click", () => {
        const translation = li.querySelector(".translation");
        translation.style.display = translation.style.display === "none" ? "inline" : "none";
      });
      list.appendChild(li);
    });

    section.appendChild(list);
    container.appendChild(section);
  });
});
