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

    const loopTrack = document.querySelector(".events-loop-track");
    const cards = document.querySelectorAll(".event-tall-card");

    if (loopTrack && cards.length) {
        cards.forEach((card) => {
            card.addEventListener("mouseenter", () => {
                loopTrack.style.animationPlayState = "paused";
            });

            card.addEventListener("mouseleave", () => {
                loopTrack.style.animationPlayState = "running";
            });
        });
    }
});