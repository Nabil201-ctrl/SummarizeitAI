async function checkTrialExpiry() {
    const response = await fetch("/api/user");
    const user = await response.json();

    if (user.premiumExpires && new Date(user.premiumExpires) - Date.now() <= 3 * 24 * 60 * 60 * 1000) {
        alert("Your premium trial expires soon! Upgrade now.");
    }
}

checkTrialExpiry();
