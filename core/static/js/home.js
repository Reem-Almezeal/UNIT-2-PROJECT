document.addEventListener("DOMContentLoaded", function () {
    const introOverlay = document.getElementById("introOverlay");
    const enterFutureBtn = document.getElementById("enterFutureBtn");
    const homeContent = document.querySelector(".home-hero-content");
    const footer = document.querySelector(".site-footer");




    const revealElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach((element) => {
        observer.observe(element);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const statNumbers = document.querySelectorAll(".impact-number");

    if (!statNumbers.length) return;

    let hasAnimated = false;

    const statsSection = document.querySelector(".impact-stats-section");

    if (!statsSection) return;

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute("data-target"), 10) || 0;
        const duration = 1800;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeOut * target);

            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasAnimated) {
                    statNumbers.forEach((number) => animateCounter(number));
                    hasAnimated = true;
                    observer.disconnect();
                }
            });
        },
        {
            threshold: 0.25
        }
    );

    observer.observe(statsSection);
});