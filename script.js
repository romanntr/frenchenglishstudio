// audio buttons: play FR then EN immediately (speechSynthesis)
function speakPair(frText, enText){
  if(!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const fr = new SpeechSynthesisUtterance(frText);
  fr.lang = 'fr-FR'; fr.rate = 1; fr.pitch = 1;
  const en = new SpeechSynthesisUtterance(enText);
  en.lang = 'en-GB'; en.rate = 1; en.pitch = 1;
  fr.onend = ()=>{ window.speechSynthesis.speak(en); };
  window.speechSynthesis.speak(fr);
}
document.querySelectorAll('.audio').forEach(btn=>{
  btn.addEventListener('click', ()=> {
    const fr = btn.dataset.fr; const en = btn.dataset.en;
    speakPair(fr,en);
  });
});

// scroll reveal panels
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('visible');
  });
},{threshold:0.15});
document.querySelectorAll('.panel').forEach(p=>obs.observe(p));

// welcome disappear after 4s
setTimeout(()=>{ const w = document.getElementById('welcome'); if(w){ w.style.transition='opacity .7s ease'; w.style.opacity='0'; setTimeout(()=>w.remove(),800); } }, 4000);

// form via Formspree
const form = document.getElementById('reservationForm');
if(form){
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const conf = document.getElementById('confirmation');
    const data = new FormData(form);
    try{
      const res = await fetch(form.action, { method:'POST', body: data, headers:{ 'Accept':'application/json' } });
      if(res.ok){
        conf.style.display = 'block';
        conf.textContent = '✅ Votre réservation a bien été envoyée !';
        form.reset();
      } else {
        conf.style.display = 'block';
        conf.textContent = '⚠️ Une erreur est survenue. Veuillez réessayer.';
      }
    } catch(err){
      conf.style.display = 'block';
      conf.textContent = '❌ Erreur de connexion.';
    }
  });
}

// smooth nav links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const t = document.querySelector(this.getAttribute('href'));
    if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});
