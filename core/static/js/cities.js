document.addEventListener("DOMContentLoaded", function () {
    const revealElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach((element) => {
        observer.observe(element);
    });

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const moveX = (x / rect.width - 0.5) * 10;
            const moveY = (y / rect.height - 0.5) * 10;

            card.style.transform = 'translateY(-10px) rotateX(${-moveY}deg) rotateY(${moveX}deg)';
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
});