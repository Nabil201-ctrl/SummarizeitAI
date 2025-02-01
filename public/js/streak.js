async function updateStreak() {
    const response = await fetch("/api/streak");
    const data = await response.json();
    document.getElementById("streak-count").textContent = data.streak;
}

updateStreak();
