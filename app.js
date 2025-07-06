// Navegación simple y profesional
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    document.querySelectorAll('main > section').forEach(s => s.style.display = 'none');
    document.querySelector(this.getAttribute('href')).style.display = '';
    e.preventDefault();
    setTimeout(() => document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:"smooth"}), 60);
  });
});
window.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('main > section').forEach(s=>s.style.display='none');
  document.querySelector('#inicio').style.display='';
});

// Modal reutilizable
window.showModal = function(title, body) {
  const modal = document.getElementById('modal');
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = body;
  modal.showModal();
};
document.querySelector('.modal .btn').onclick = () => document.getElementById('modal').close();

// Carrusel profesional
const carouselData = [
  {title: "Taller de actualización", img: "assets/flayer1.jpg", desc: "Participa en nuestro taller de intervención clínica avanzada."},
  {title: "Nuevo artículo", img: "assets/flayer2.jpg", desc: "Consulta nuestro último artículo en revista internacional."},
  {title: "Evento anual", img: "assets/flayer3.jpg", desc: "Inscríbete al evento anual de salud mental."}
];
let ci = 0;
function renderCarousel() {
  const el = document.getElementById('carousel');
  el.innerHTML = '';
  carouselData.forEach((item, idx) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide' + (idx === ci ? ' active' : '');
    slide.innerHTML = `<img src="${item.img}" alt="${item.title}"><h3>${item.title}</h3><p>${item.desc}</p>`;
    el.appendChild(slide);
  });
  // Controls
  let controls = document.createElement('div');
  controls.className = 'carousel-controls';
  controls.innerHTML = `<button id="carouselPrev">&#8592;</button><button id="carouselNext">&#8594;</button>`;
  el.appendChild(controls);
  document.getElementById('carouselPrev').onclick = function() {
    ci = (ci <= 0) ? carouselData.length - 1 : ci - 1; renderCarousel();
  };
  document.getElementById('carouselNext').onclick = function() {
    ci = (ci >= carouselData.length - 1) ? 0 : ci + 1; renderCarousel();
  };
}
window.addEventListener('DOMContentLoaded', renderCarousel);

// Blog dinámico
const blogEntries = [
  {title: "El impacto emocional de las noticias virales", date: "2025-07-01", body: "Exploramos cómo las noticias virales afectan la salud mental y cómo abordarlas desde la psicología clínica."},
  {title: "¿Qué es el burnout y cómo prevenirlo?", date: "2025-06-26", body: "El síndrome de burnout es cada vez más común. Aquí te damos estrategias basadas en evidencia para prevenirlo."}
];
function renderBlog() {
  const el = document.getElementById('blog-list');
  el.innerHTML = '';
  blogEntries.forEach(entry => {
    const div = document.createElement('div');
    div.className = 'blog-entry';
    div.innerHTML = `<h4>${entry.title}</h4><span class="date">${entry.date}</span><p>${entry.body}</p>`;
    el.appendChild(div);
  });
}
window.addEventListener('DOMContentLoaded', renderBlog);