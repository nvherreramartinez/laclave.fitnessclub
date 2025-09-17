document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('[data-slider]');

    sliders.forEach(slider => {
        const slides = slider.querySelector('.slides');
        const totalSlides = slides.children.length;
        let index = 0;

        function mostrarSlide(i) {
            slides.style.transform = `translateX(-${i * 100}%)`;
        }

        function avanzar() {
            index = (index + 1) % totalSlides;
            mostrarSlide(index);
        }

        mostrarSlide(index);
        setInterval(avanzar, 4000);
    });

    // Ordenar actividades alfabéticamente y alternar fila-reversa
    const contenedor = document.querySelector('.actividades');
    const actividades = Array.from(contenedor.querySelectorAll('.actividad'));

    actividades.sort((a, b) => {
        const tituloA = a.querySelector('h2').textContent.trim().toUpperCase();
        const tituloB = b.querySelector('h2').textContent.trim().toUpperCase();
        return tituloA.localeCompare(tituloB);
    });

    contenedor.innerHTML = '';

    actividades.forEach((actividad, index) => {
        actividad.classList.remove('fila-reversa');
        if (index % 2 === 1) {
            actividad.classList.add('fila-reversa');
        }
        contenedor.appendChild(actividad);
    });
});