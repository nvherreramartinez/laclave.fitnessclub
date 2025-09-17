document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const enterButton = document.getElementById('enterButton');
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('acceptCookies');
    const configBtn = document.getElementById('configCookies');
    const openSettings = document.getElementById('open-cookie-settings');

    const today = new Date().toISOString().split('T')[0];
    const lastVisit = localStorage.getItem('lastVisitDate');

    // Mostrar bienvenida si no se mostró hoy
    if (lastVisit !== today) {
        welcomeScreen.classList.remove('hidden');
    } else {
        welcomeScreen.classList.add('hidden');
        showCookieBanner();
    }

    enterButton?.addEventListener('click', () => {
        welcomeScreen.classList.add('hidden');
        localStorage.setItem('lastVisitDate', today);
        showCookieBanner();
    });

    // Función para mostrar banner de cookies
    function showCookieBanner() {
        if (!localStorage.getItem('cookiesAccepted')) {
            cookieBanner.classList.add('show');
        }
    }

    acceptBtn?.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.remove('show');
    });

    openSettings?.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('cookiesAccepted');
        cookieBanner.classList.add('show');
    });
});

// Función para verificar si las cookies están aceptadas
document.addEventListener("DOMContentLoaded", () => {
    const cookieBanner = document.getElementById("cookieBanner");
    const acceptBtn = document.getElementById("acceptCookies");
    const configBtn = document.getElementById("configCookies");
    const modal = document.getElementById("cookieModal");
    const closeModal = document.getElementById("closeCookieModal");
    const saveSettings = document.getElementById("saveCookieSettings");

    // Aceptar todas las cookies
    acceptBtn.addEventListener("click", () => {
        localStorage.setItem("cookiesAccepted", "all");
        cookieBanner.style.display = "none";
    });

    // Abrir modal al hacer click en Configurar
    configBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });

    // Cerrar modal
    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    // Guardar configuración
    saveSettings.addEventListener("click", () => {
        const analytics = document.getElementById("analyticsCookies").checked;
        const ads = document.getElementById("adsCookies").checked;
        localStorage.setItem("cookiesAccepted", JSON.stringify({analytics, ads}));
        modal.classList.add("hidden");
        cookieBanner.style.display = "none";
    });

    // Mostrar banner solo si no se aceptaron cookies antes
    if (!localStorage.getItem("cookiesAccepted")) {
        cookieBanner.style.display = "flex";
    } else {
        cookieBanner.style.display = "none";
    }
});