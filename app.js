// app.js - leçons dynamiques avec audio
const lessons = [
  {
    title: "🎨 Les couleurs",
    words: [
      {fr:"Rouge", en:"Red", audioFr:"audio/rouge_fr.wav", audioEn:"audio/red_en.wav"},
      {fr:"Bleu", en:"Blue", audioFr:"audio/bleu_fr.wav", audioEn:"audio/blue_en.wav"},
      {fr:"Vert", en:"Green", audioFr:"audio/vert_fr.wav", audioEn:"audio/green_en.wav"},
      {fr:"Jaune", en:"Yellow", audioFr:"audio/jaune_fr.wav", audioEn:"audio/yellow_en.wav"},
      {fr:"Noir", en:"Black", audioFr:"audio/noir_fr.wav", audioEn:"audio/black_en.wav"}
    ]
  },
  {
    title: "📅 Les jours de la semaine",
    words: [
      {fr:"Lundi", en:"Monday", audioFr:"audio/lundi_fr.wav", audioEn:"audio/monday_en.wav"},
      {fr:"Mardi", en:"Tuesday", audioFr:"audio/mardi_fr.wav", audioEn:"audio/tuesday_en.wav"},
      {fr:"Mercredi", en:"Wednesday", audioFr:"audio/mercredi_fr.wav", audioEn:"audio/wednesday_en.wav"},
      {fr:"Jeudi", en:"Thursday", audioFr:"audio/jeudi_fr.wav", audioEn:"audio/thursday_en.wav"},
      {fr:"Vendredi", en:"Friday", audioFr:"audio/vendredi_fr.wav", audioEn:"audio/friday_en.wav"}
    ]
  },
  {
    title: "🗣️ Les verbes de base",
    words: [
      {fr:"Être", en:"To be", audioFr:"audio/etre_fr.wav", audioEn:"audio/tobe_en.wav"},
      {fr:"Avoir", en:"To have", audioFr:"audio/avoir_fr.wav", audioEn:"audio/tohave_en.wav"},
      {fr:"Aller", en:"To go", audioFr:"audio/aller_fr.wav", audioEn:"audio/togo_en.wav"},
      {fr:"Faire", en:"To do / make", audioFr:"audio/faire_fr.wav", audioEn:"audio/todo_en.wav"},
      {fr:"Parler", en:"To speak", audioFr:"audio/parler_fr.wav", audioEn:"audio/tospeak_en.wav"}
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('lessons-container');
  if (!container) return;

  lessons.forEach(lesson => {
    const card = document.createElement('div');
    card.className = 'lesson-card';

    const h3 = document.createElement('h3');
    h3.textContent = lesson.title;
    card.appendChild(h3);

    const ul = document.createElement('ul');
    lesson.words.forEach(w => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="word">${w.fr}</span><span class="translation">${w.en}</span>
        <div>
          <button class="btn-audio" data-src="${w.audioFr}">🔊 FR</button>
          <button class="btn-audio" data-src="${w.audioEn}">🔊 EN</button>
        </div>`;
      li.querySelector('.word').addEventListener('click', () => {
        const tr = li.querySelector('.translation');
        tr.style.display = tr.style.display === 'inline' ? 'none' : 'inline';
      });
      ul.appendChild(li);
    });

    card.appendChild(ul);
    container.appendChild(card);
  });

  document.addEventListener('click', e => {
    if (e.target.classList.contains('btn-audio')) {
      const src = e.target.dataset.src;
      const a = new Audio(src);
      a.play().catch(()=>{ console.log('audio not found', src); });
    }
  });
});
