redirectIfNotAuthenticated(); // Kick out if not logged in

async function loadUserData() {
    try {
        const response = await authenticatedFetch("/api/auth/me");
        const data = await response.json();
        
        if (data.success) {
            document.getElementById("welcome-message").textContent = `Welcome, ${data.user.name}`;
        }
    } catch (error) {
        console.error("Error loading user data");
    }
}

loadUserData();

document.getElementById("logout-btn").addEventListener("click", (e) => {
    const btn = e.target;
    const container = document.querySelector(".neo-container");

    btn.disabled = true;
    btn.textContent = "Logging out...";

    setTimeout(() => {
        container.classList.add("fade-out");
    }, 600); 

    setTimeout(() => {
        logout(); 
    }, 1400); 
});