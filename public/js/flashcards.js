document.getElementById("flashcard-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer").value;

    const response = await fetch("/api/flashcards/custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer })
    });

    if (response.ok) {
        alert("Flashcard added successfully!");
        document.getElementById("flashcard-form").reset();
    }
});


async function checkAnswer(isCorrect) {
    const response = await fetch("/api/flashcards/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCorrect })
    });

    const data = await response.json();
    document.getElementById("user-level").textContent = data.level;
}
