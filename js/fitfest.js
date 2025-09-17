import { events } from './eventos.js';

const eventList = document.getElementById("event-list");

// Render dinámico
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
renderizarEventos();