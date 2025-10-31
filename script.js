// Collapsible
document.querySelectorAll('.collapsible > .header').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const parent = btn.parentElement;
    const content = parent.querySelector('.content');
    const open = content.style.display === 'block';
    document.querySelectorAll('.collapsible .content').forEach(c=>c.style.display='none');
    document.querySelectorAll('.collapsible .chev').forEach(ch=>ch.textContent='+');
    if(!open){ content.style.display='block'; parent.querySelector('.chev').textContent='−'; setTimeout(()=>parent.scrollIntoView({behavior:'smooth',block:'center'}),150); } else { content.style.display='none'; parent.querySelector('.chev').textContent='+'; }
  });
});

// Speech synthesis: speak FR then EN
function speakPair(fr,en){
  if(!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const frUt = new SpeechSynthesisUtterance(fr); frUt.lang='fr-FR'; frUt.rate=1; frUt.pitch=1;
  const enUt = new SpeechSynthesisUtterance(en); enUt.lang='en-GB'; enUt.rate=1; enUt.pitch=1;
  frUt.onend = ()=>{ window.speechSynthesis.speak(enUt); };
  window.speechSynthesis.speak(frUt);
}
document.querySelectorAll('.audio').forEach(b=>b.addEventListener('click', ()=>speakPair(b.dataset.fr, b.dataset.en)));

// Smooth scroll for header links
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click', function(e){ const t = document.querySelector(this.getAttribute('href')); if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); } }));

// Form submission with Formspree
document.getElementById('reservationForm').addEventListener('submit', function(e){
  e.preventDefault();
  const conf = document.getElementById('confirmation');
  const data = new FormData(this);
  fetch('https://formspree.io/f/movpkoej', { method:'POST', body: data, headers:{ 'Accept':'application/json' } })
    .then(response=>{
      if(response.ok){ conf.style.display='block'; conf.textContent='✅ Merci ! Nous avons bien reçu votre demande, vous serez contacté très bientôt par e-mail.'; this.reset(); }
      else { conf.style.display='block'; conf.textContent='⚠️ Une erreur est survenue. Veuillez réessayer.'; }
    })
    .catch(()=>{ conf.style.display='block'; conf.textContent='❌ Erreur de connexion.'; });
});

// Welcome disappear after 4s then remove
setTimeout(()=>{ const w = document.getElementById('welcome'); if(w){ w.style.transition='opacity .7s ease'; w.style.opacity='0'; setTimeout(()=> w.remove(),800); } }, 4000);

// reveal sections on scroll
const obs = new IntersectionObserver((entries)=>{ entries.forEach(en=>{ if(en.isIntersecting) en.target.classList.add('visible'); }); }, {threshold:0.18});
for(const s of document.querySelectorAll('main > section')) obs.observe(s);
