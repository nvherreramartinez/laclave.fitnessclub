document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".indice-legales a");
    const secciones = document.querySelectorAll(".detalle-legales section");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            handleSectionChange(link);
        });

        // Soporte para teclado
        link.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSectionChange(link);
            }
        });
    });

    function handleSectionChange(link) {
        const id = link.getAttribute("href").substring(1);
        const seccion = document.getElementById(id);

        // Cerrar todas las secciones y quitar aria-current
        secciones.forEach(sec => sec.classList.remove("activo"));
        links.forEach(l => l.removeAttribute("aria-current"));

        // Abrir la sección seleccionada y marcar enlace activo
        seccion.classList.add("activo");
        link.setAttribute("aria-current", "true");

        // Desplazar suavemente con margen en móviles
        const offset = window.innerWidth <= 480 ? 20 : 0; // Margen en móviles
        seccion.scrollIntoView({ behavior: "smooth", block: "start" });

        // Mover foco para accesibilidad
        seccion.setAttribute("tabindex", "-1"); // Hacer la sección enfocable
        seccion.focus();
    }
});