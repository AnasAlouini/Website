document.addEventListener("DOMContentLoaded", function () {
    // Gestion des comptes à rebours
    const countdowns = document.querySelectorAll("span[id^='countdown_']");

    countdowns.forEach(span => {
        const eventTime = new Date(span.getAttribute("data-time")).getTime();
        const isPastEvent = span.classList.contains('countdown-past');

        const updateCountdown = () => {
            const now = new Date().getTime();
            const diff = eventTime - now;

            if (isPastEvent || diff <= 0) {
                // Pour les événements passés
                const timePassed = now - eventTime;
                const daysPassed = Math.floor(timePassed / (1000 * 60 * 60 * 24));

                if (daysPassed === 0) {
                    span.textContent = "Aujourd'hui";
                } else if (daysPassed === 1) {
                    span.textContent = "Hier";
                } else {
                    span.textContent = `Il y a ${daysPassed}j`;
                }
                return;
            }

            // Pour les événements futurs
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');

            if (days > 0) {
                span.textContent = `Dans ${days}j ${hours}:${minutes}`;
            } else {
                span.textContent = `Dans ${hours}:${minutes}:${seconds}`;
            }
        };

        updateCountdown();
        if (!isPastEvent) {
            setInterval(updateCountdown, 1000);
        }
    });
