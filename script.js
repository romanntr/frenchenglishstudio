// Lecture vocale automatique
function playVoice(text) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = text.includes('the') ? 'en-US' : 'fr-FR';
  utter.pitch = 1.1;
  utter.rate = 1;
  synth.speak(utter);
}

// Gestion du formulaire
document.getElementById('reservationForm').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('confirmation').textContent = "✅ Merci ! Votre demande de réservation a été envoyée avec succès.";
  this.reset();
});
