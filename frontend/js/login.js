redirectIfAuthenticated(); // Don't show login if already logged in

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorDiv = document.getElementById("error-message");
    const btn = document.getElementById("login-btn");

    btn.disabled = true;
    btn.textContent = "Loading...";

    try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        
        const data = await res.json();

        if (data.success) {
            setToken(data.token);
            window.location.href = "dashboard.html";
        } else {
            errorDiv.textContent = data.message;
            errorDiv.style.display = "block";
        }
    } catch (err) {
        errorDiv.textContent = "Network error. Please try again.";
        errorDiv.style.display = "block";
    } finally {
        btn.disabled = false;
        btn.textContent = "Login";
    }
});