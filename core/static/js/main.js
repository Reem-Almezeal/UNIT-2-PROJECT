document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const langToggle = document.getElementById("lang-toggle");
    const body = document.body;
    const htmlTag = document.documentElement;
    const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 900,
            once: true
        });
    }

    /* =========================
       THEME
    ========================= */
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        if (themeIcon) {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            body.classList.toggle("dark-mode");

            const isDark = body.classList.contains("dark-mode");
            localStorage.setItem("theme", isDark ? "dark" : "light");

            if (themeIcon) {
                if (isDark) {
                    themeIcon.classList.remove("fa-moon");
                    themeIcon.classList.add("fa-sun");
                } else {
                    themeIcon.classList.remove("fa-sun");
                    themeIcon.classList.add("fa-moon");
                }
            }
        });
    }

    /* =========================
       LANGUAGE
    ========================= */
const savedLang = localStorage.getItem("siteLanguage") || "en";
applyLanguage(savedLang);

if (langToggle) {
    langToggle.addEventListener("click", function () {
        const currentLang = htmlTag.getAttribute("lang") || "en";
        const newLang = currentLang === "en" ? "ar" : "en";

        console.log("Current:", currentLang);
        console.log("New:", newLang);

        applyLanguage(newLang);
    });
}

function applyLanguage(lang) {
    console.log("Applying language:", lang);

    if (lang === "ar") {
        htmlTag.setAttribute("lang", "ar");
        htmlTag.setAttribute("dir", "rtl");
        if (langToggle) langToggle.textContent = "EN";
    } else {
        htmlTag.setAttribute("lang", "en");
        htmlTag.setAttribute("dir", "ltr");
        if (langToggle) langToggle.textContent = "AR";
    }

    const elements = document.querySelectorAll(".translate-text");
    console.log("Found translate elements:", elements.length);

    elements.forEach((el) => {
        const text = lang === "ar" ? el.dataset.ar : el.dataset.en;
        if (text !== undefined) {
            el.textContent = text;
        }
    });

    localStorage.setItem("siteLanguage", lang);
}
});