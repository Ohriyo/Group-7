redirectIfAuthenticated(); // Prevents logged-in users from seeing the register page

document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    const errorDiv = document.getElementById("error-message");
    const successDiv = document.getElementById("success-message");
    const btn = document.getElementById("register-btn");

    // Reset messages and trigger loading animation
    errorDiv.style.display = "none";
    successDiv.style.display = "none";
    btn.disabled = true;
    btn.textContent = "Creating Account...";

    try {
        const res = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await res.json();

        if (data.success) {
            // Show success message and redirect to login after a short delay
            successDiv.textContent = "Registration successful! Redirecting to login...";
            successDiv.style.display = "block";
            
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        } else {
            // Display error (e.g., "Email already in use")
            errorDiv.textContent = data.message;
            errorDiv.style.display = "block";
            btn.disabled = false;
            btn.textContent = "Sign Up";
        }
    } catch (err) {
        errorDiv.textContent = "Network error. Please make sure the server is running.";
        errorDiv.style.display = "block";
        btn.disabled = false;
        btn.textContent = "Sign Up";
    }
});