document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#bookingForm');
  const conf = document.querySelector('#confirmation');

  // Animation du message de bienvenue
  const welcomeMsg = document.querySelector('.welcome-message');
  if (welcomeMsg) {
    setTimeout(() => {
      welcomeMsg.style.opacity = 1;
      welcomeMsg.style.transform = 'translateY(0)';
    }, 500);
    setTimeout(() => {
      welcomeMsg.style.opacity = 0;
      welcomeMsg.style.transform = 'translateY(-20px)';
    }, 4000);
  }

  // Gestion de l'envoi du formulaire
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      conf.classList.remove('hidden');
      form.reset();
    } else {
      conf.textContent = "❌ Une erreur est survenue. Veuillez réessayer.";
      conf.classList.remove('hidden');
    }
  });
});
