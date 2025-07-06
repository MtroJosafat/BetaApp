function showSection(sectionId, navLink) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');

  document.querySelectorAll('header nav a').forEach(link => {
    link.classList.remove('active');
  });
  if (navLink) navLink.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Reiniciar carrusel si vuelves a Home
  if (sectionId === "home" && window.carouselInit) {
    window.carouselInit();
  }
}

// Carrusel minimalista (publicaciones en homepage)
function carouselInit() {
  const publicaciones = document.querySelectorAll('#todas-publicaciones .card');
  const carousel = document.getElementById('carousel');
  const dotsContainer = document.getElementById('carousel-dots');
  if (!carousel || publicaciones.length === 0) return;

  // Vaciar carrusel y dots
  carousel.innerHTML = '';
  dotsContainer.innerHTML = '';

  // Clonar publicaciones como slides
  const slides = Array.from(publicaciones).map(card => {
    const slide = card.cloneNode(true);
    slide.classList.add('carousel-card');
    slide.classList.remove('card');
    return slide;
  });

  // Añadir al carrusel
  slides.forEach(slide => carousel.appendChild(slide));

  // Estado carrusel
  let idx = 0, interval = null;
  // Crear dots
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Ir a publicación ${i+1}`);
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  }
  // Función para mostrar slide
  function goToSlide(newIdx) {
    idx = newIdx;
    carousel.style.transform = `translateX(-${100*idx}%)`;
    Array.from(dotsContainer.children).forEach((d,i) =>
      d.classList.toggle('active', i === idx)
    );
    resetInterval();
  }
  // Auto-movimiento
  function nextSlide() {
    idx = (idx + 1) % slides.length;
    goToSlide(idx);
  }
  function resetInterval() {
    if (interval) clearInterval(interval);
    interval = setInterval(nextSlide, 4000);
  }
  // Inicial
  goToSlide(0);
  resetInterval();

  // Guardar para reiniciar al cambiar de sección
  window.carouselInit = carouselInit;
}

window.onload = () => {
  const firstNav = document.querySelector('header nav a');
  showSection('home', firstNav);
  carouselInit();
};