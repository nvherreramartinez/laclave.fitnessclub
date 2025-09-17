document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".indice-legales a");
    const secciones = document.querySelectorAll(".detalle-legales section");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const id = link.getAttribute("href").substring(1);

            // Cerrar todas las secciones
            secciones.forEach(sec => sec.classList.remove("activo"));

            // Abrir solo la seleccionada
            const seccion = document.getElementById(id);
            seccion.classList.add("activo");

            // Desplazar suavemente
            seccion.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
});