document.addEventListener("DOMContentLoaded", function () {
    const revealElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });

    if (window.gsap) {
        gsap.to(".ring-one", {
            rotation: 360,
            duration: 18,
            repeat: -1,
            ease: "none"
        });

        gsap.to(".ring-two", {
            rotation: -360,
            duration: 14,
            repeat: -1,
            ease: "none"
        });

        gsap.to(".ring-three", {
            rotation: 360,
            duration: 10,
            repeat: -1,
            ease: "none"
        });

        gsap.to(".node-1", { y: -8, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".node-2", { y: 8, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".node-3", { y: -6, duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".node-4", { y: 9, duration: 3.1, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".node-5", { y: -7, duration: 2.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".node-6", { y: 7, duration: 2.9, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }
});
