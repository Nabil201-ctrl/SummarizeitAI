(async function () {
    const response = await fetch("/api/user");
    const user = await response.json();

    // Check if user is premium
    if (!user.isPremium) {
        console.warn("Widget access denied: Premium users only.");
        return;
    }

    // Set user-specific settings (theme and difficulty)
    let theme = user.widgetTheme || "light";
    let difficulty = user.aiSettings?.difficulty || "medium";
    document.body.classList.add(`theme-${theme}`);

    // Create the widget button
    let widgetBtn = document.createElement("button");
    widgetBtn.innerText = "Summarize AI";
    widgetBtn.id = "summarize-ai-widget-btn";
    widgetBtn.style = "position:fixed;bottom:20px;right:20px;padding:10px 15px;background:#007bff;color:white;border:none;border-radius:5px;cursor:pointer;z-index:1000;";
    document.body.appendChild(widgetBtn);

    // Handle widget button click
    widgetBtn.onclick = function () {
        let widgetModal = document.getElementById("summarize-ai-widget-modal");
        if (!widgetModal) {
            createWidgetModal(); // Assuming createWidgetModal function is defined elsewhere
        } else {
            widgetModal.style.display = "block";
        }
    };

    // Handle question generation
    let questionCount = localStorage.getItem("premiumQuestionCount") || 10;

    document.getElementById("generate-questions-btn").addEventListener("click", async function () {
        const text = document.getElementById("summarize-text").value;

        const response = await fetch("/api/widget/generate-questions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, numQuestions: questionCount, difficulty })
        });

        const data = await response.json();
        document.getElementById("question-list").innerHTML = data.questions.map(q => `<li>${q}</li>`).join("");
    });
})();
