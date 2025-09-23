document.addEventListener("DOMContentLoaded", () => {
    // --- Newsletter ---
    const formNewsletter = document.getElementById("form-newsletter");
    const emailInput = formNewsletter?.querySelector('input[name="email"]');

    if (formNewsletter && emailInput) {
        formNewsletter.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email) {
                Swal.fire({
                    icon: "warning",
                    title: "Email obligatorio",
                    text: "Por favor, ingresa un email.",
                    confirmButtonText: "OK",
                    confirmButtonColor: "var(--marron)",
                    background: "var(--crema)",
                    customClass: {
                        popup: "swal-custom",
                        title: "swal-title",
                        content: "swal-content",
                        confirmButton: "swal-button"
                    }
                }).then(() => emailInput.focus());
                return;
            }

            if (!emailRegex.test(email)) {
                Swal.fire({
                    icon: "warning",
                    title: "Email inválido",
                    text: "Por favor, ingresa un email válido.",
                    confirmButtonText: "OK",
                    confirmButtonColor: "var(--marron)",
                    background: "var(--crema)",
                    customClass: {
                        popup: "swal-custom",
                        title: "swal-title",
                        content: "swal-content",
                        confirmButton: "swal-button"
                    }
                }).then(() => emailInput.focus());
                return;
            }

            const data = {
                email,
                _subject: "Nueva suscripción al newsletter",
            };

            try {
                const response = await fetch(
                    "https://formsubmit.co/ajax/laclave.fitnessclub@gmail.com",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    }
                );

                if (response.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "¡Suscripción exitosa!",
                        text: "Gracias por suscribirte al newsletter.",
                        confirmButtonText: "OK",
                        confirmButtonColor: "var(--marron)",
                        background: "var(--crema)",
                        customClass: {
                            popup: "swal-custom",
                            title: "swal-title",
                            content: "swal-content",
                            confirmButton: "swal-button"
                        }
                    }).then(() => emailInput.focus());
                    formNewsletter.reset();
                } else {
                    throw new Error("Error al enviar");
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo enviar. Intentá nuevamente más tarde.",
                    confirmButtonText: "OK",
                    confirmButtonColor: "var(--marron)",
                    background: "var(--crema)",
                    customClass: {
                        popup: "swal-custom",
                        title: "swal-title",
                        content: "swal-content",
                        confirmButton: "swal-button"
                    }
                }).then(() => emailInput.focus());
            }
        });
    }

    // --- WhatsApp dinámico ---
    const whatsappLink = document.getElementById("whatsapp-link");
    if (whatsappLink) {
        const phoneNumber = "5493518676680";
        const message = encodeURIComponent(
            "Hola, quiero más información sobre sus servicios."
        );
        const url = `https://wa.me/${phoneNumber}?text=${message}`;
        whatsappLink.href = url;
        whatsappLink.setAttribute("aria-label", "Chatear con nosotros en WhatsApp");
    }
});