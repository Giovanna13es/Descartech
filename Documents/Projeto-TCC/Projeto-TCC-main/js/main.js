// Carrossel automático
let slideIndex = 0;
let slides;

document.addEventListener("DOMContentLoaded", () => {
  slides = document.querySelectorAll(".slide");
  mostrarSlides();
});

function mostrarSlides() {
  // Esconde todos os slides
  slides.forEach(slide => slide.classList.remove("ativo"));

  // Vai para o próximo
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  // Mostra o slide atual
  slides[slideIndex - 1].classList.add("ativo");

  // Troca a cada 4 segundos
  setTimeout(mostrarSlides, 2000);
}
