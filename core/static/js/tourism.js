document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".tourismSwiper", {
        slidesPerView: 1.15,
        spaceBetween: 22,
        speed: 900,
        loop: true,
        grabCursor: true,
        centeredSlides: false,
        autoplay: {
            delay: 3200,
            disableOnInteraction: false
        },
        pagination: {
            el: ".tourism-pagination",
            clickable: true
        },
        breakpoints: {
            768: {
                slidesPerView: 1.4
            },
            992: {
                slidesPerView: 2
            }
        }
    });

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

    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray(".experience-card").forEach((card, index) => {
            gsap.from(card, {
                y: 60,
                opacity: 0,
                duration: 0.9,
                delay: index * 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 88%"
                }
            });
        });

        gsap.from(".cities-hero-content", {
            y: 40,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out"
        });

        gsap.from(".tourism-immersive-media", {
            x: -60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".tourism-immersive-wrap",
                start: "top 78%"
            }
        });

        gsap.from(".tourism-immersive-content", {
            x: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".tourism-immersive-wrap",
                start: "top 78%"
            }
        });
    }
});