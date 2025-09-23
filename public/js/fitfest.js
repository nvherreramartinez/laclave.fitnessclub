import { events } from './eventos.js';

const eventList = document.getElementById("event-list");

// Render dinámico de eventos
function renderizarEventos() {
    events.forEach(event => {
        const a = document.createElement("a");
        a.className = `event ${event.evento}`;
        a.href = event.link;
        a.target = "_blank";

        a.innerHTML = `
            <div class="date">
                <span class="mes">${event.mes}</span>
                <span class="dia">${event.dia}</span>
                <span class="fecha">${event.fecha}</span>
            </div>
            <div class="icono">
                <img src="${event.categoriaIcon}" alt="icono categoría">
            </div>
            <div class="details">
                <p class="hora">${event.hora}</p>
                <p class="titulo">${event.titulo}</p>
                <p>${event.gimnasio}</p>
                <p>${event.barrio} – ${event.provincia}</p>
            </div>
        `;

        eventList.appendChild(a);
    });
}

// Ejecutar el renderizado de eventos
renderizarEventos();

// Añadir soporte para eventos táctiles en las tarjetas de .fitness-fest-container
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('touchstart', () => {
        card.style.transform = 'scale(1.05)'; // Escala la tarjeta al tocarla
        card.style.transition = 'transform 0.3s ease'; // Suaviza la transición
    });
    card.addEventListener('touchend', () => {
        card.style.transform = 'scale(1)'; // Revierte la escala al dejar de tocar
    });
});