const API_URL = "http://localhost:3000";

function setToken(token) {
    localStorage.setItem("jwt_token", token);
}

function getToken() {
    return localStorage.getItem("jwt_token");
}

function isAuthenticated() {
    return !!getToken();
}

function logout() {
    localStorage.removeItem("jwt_token");
    window.location.href = "login.html";
}

function redirectIfNotAuthenticated() {
    if (!isAuthenticated()) {
        window.location.href = "login.html";
    }
}

function redirectIfAuthenticated() {
    if (isAuthenticated()) {
        window.location.href = "dashboard.html";
    }
}

// Wrapper for fetch that automatically adds the Authorization header
async function authenticatedFetch(url, options = {}) {
    const token = getToken();
    const headers = {
        ...options.headers,
        "Authorization": `Bearer ${token}`
    };
    
    const response = await fetch(`${API_URL}${url}`, { ...options, headers });
    
    // Automatically logout if the token is expired/invalid
    if (response.status === 401) {
        logout();
    }
    return response;
}