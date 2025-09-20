document.addEventListener("DOMContentLoaded", () => {
    // --- Newsletter ---
    const formNewsletter = document.getElementById("form-newsletter");
    const feedback = document.getElementById("newsletter-feedback");

    if (formNewsletter) {
        formNewsletter.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = formNewsletter.email.value.trim();
            if (!email) {
                feedback.textContent = "⚠️ El email es obligatorio";
                feedback.className = "error";
                feedback.classList.remove("fade-out");
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
                    feedback.textContent = "✅ ¡Gracias por suscribirte! Ya formas parte del newsletter.";
                    feedback.className = "success";
                    feedback.classList.remove("fade-out");
                    formNewsletter.reset();

                    // Desaparece el mensaje después de 5 segundos
                    setTimeout(() => {
                        feedback.classList.add("fade-out");
                    }, 5000);
                } else {
                    throw new Error("Error al enviar");
                }
            } catch (error) {
                feedback.textContent = "❌ No se pudo enviar. Intentá nuevamente más tarde.";
                feedback.className = "error";
                feedback.classList.remove("fade-out");

                setTimeout(() => {
                    feedback.classList.add("fade-out");
                }, 5000);
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
    }
});
