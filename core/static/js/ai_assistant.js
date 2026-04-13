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

    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const chatBody = document.getElementById("chatBody");
    const suggestionChips = document.querySelectorAll(".suggestion-chip");

    if (!chatForm || !chatInput || !chatBody) return;

    function getCookie(name) {
        let cookieValue = null;

        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");

            for (let cookie of cookies) {
                cookie = cookie.trim();

                if (cookie.startsWith(name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }

        return cookieValue;
    }

    function addMessage(text, type) {
        const message = document.createElement("div");
        message.className = `chat-message ${type}`;
        message.innerHTML = text.replace(/\n/g, "<br>");
        chatBody.appendChild(message);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    async function sendMessageToAPI(message) {
        addMessage(message, "user-msg");

        const loading = document.createElement("div");
        loading.className = "chat-message bot-msg loading-message";
        loading.textContent = "Thinking...";
        chatBody.appendChild(loading);
        chatBody.scrollTop = chatBody.scrollHeight;

        try {
            const response = await fetch("/ai-chat-api/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken")
                },
                body: JSON.stringify({
                    message: message
                })
            });

            const data = await response.json();

            loading.remove();

            if (data.reply) {
                addMessage(data.reply, "bot-msg");
            } else {
                addMessage(data.error || "Something went wrong.", "bot-msg");
            }
        } catch (error) {
            loading.remove();
            addMessage("Connection error.", "bot-msg");
            console.error(error);
        }
    }

    chatForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        chatInput.value = "";
        sendMessageToAPI(userMessage);
    });

    suggestionChips.forEach((chip) => {
        chip.addEventListener("click", function () {
            const text = this.textContent.trim();
            if (!text) return;
            sendMessageToAPI(text);
        });
    });
});