document.addEventListener("DOMContentLoaded", () => {

    // --- Configuración base de SweetAlert (evita repetir el objeto 4 veces) ---
    const swalBase = {
        confirmButtonText: "OK",
        confirmButtonColor: "var(--marron)",
        background: "var(--crema)",
        customClass: {
            popup: "swal-custom",
            title: "swal-title",
            content: "swal-content",
            confirmButton: "swal-button"
        }
    };

    // --- Newsletter con SweetAlert ---
    const formNewsletter = document.getElementById("form-newsletter");
    const emailInput = formNewsletter?.querySelector('input[name="email"]');

    if (formNewsletter && emailInput) {
        const submitBtn = formNewsletter.querySelector("button[type='submit']");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        formNewsletter.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();

            // Validación: campo vacío
            if (!email) {
                Swal.fire({
                    ...swalBase,
                    icon: "warning",
                    title: "Email obligatorio",
                    text: "Por favor, ingresá un email.",
                }).then(() => emailInput.focus());
                return;
            }

            // Validación: formato inválido
            if (!emailRegex.test(email)) {
                Swal.fire({
                    ...swalBase,
                    icon: "warning",
                    title: "Email inválido",
                    text: "Por favor, ingresá un email válido.",
                }).then(() => emailInput.focus());
                return;
            }

            // FIX: deshabilitar botón durante el envío para evitar clicks múltiples
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Enviando...";
            }

            try {
                const response = await fetch(
                    "https://formsubmit.co/ajax/laclave.fitnessclub@gmail.com",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email,
                            _subject: "Nueva suscripción al newsletter",
                        }),
                    }
                );

                // FIX: FormSubmit puede devolver 200 con success:false en el body
                const result = await response.json().catch(() => null);
                const enviado = response.ok && result?.success !== "false" && result?.success !== false;

                if (enviado) {
                    Swal.fire({
                        ...swalBase,
                        icon: "success",
                        title: "¡Suscripción exitosa!",
                        text: "Gracias por suscribirte al newsletter.",
                    }).then(() => {
                        formNewsletter.reset(); // FIX: reset después de cerrar el modal, no antes
                        emailInput.focus();
                    });
                } else {
                    throw new Error("FormSubmit devolvió success: false");
                }

            } catch (error) {
                console.error("[Newsletter]", error);
                Swal.fire({
                    ...swalBase,
                    icon: "error",
                    title: "Error al enviar",
                    text: "No se pudo enviar. Intentá nuevamente más tarde.",
                }).then(() => emailInput.focus());

            } finally {
                // FIX: siempre rehabilitar el botón al terminar, haya éxito o error
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Suscribirme";
                }
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
        whatsappLink.href = `https://wa.me/${phoneNumber}?text=${message}`;
        whatsappLink.setAttribute("aria-label", "Chatear con nosotros en WhatsApp");
    }
});
