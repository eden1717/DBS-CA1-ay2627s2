// Check whether member is logged in
function checkAuth() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/auth/login";
        return false;
    }

    document.getElementById("navUsername").textContent =
        localStorage.getItem("username") || "User";

    return true;
}

// Logout
function logout() {
    localStorage.clear();
    window.location.href = "/auth/login";
}

// Send authenticated API requests
async function apiRequest(url, method = "GET", body) {
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer " + localStorage.getItem("token")
        }
    };

    if (body !== undefined) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (response.status === 401 || response.status === 403) {
        logout();
        throw new Error("Please log in again.");
    }

    const data = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(data.message || "Something went wrong.");
    }

    return data;
}

// Display success or error messages
function showMessage(message, type = "error") {
    const element = document.getElementById("message");

    element.textContent = message;
    element.className = "message " + type;
}

// Format timestamps
function formatDate(value) {
    const date = new Date(value);

    if (!value || Number.isNaN(date.getTime())) {
        return "N/A";
    }

    return date.toLocaleString("en-SG");
}

// Convert rating into stars
function displayStars(rating) {
    const value = Number(rating);

    return "★".repeat(value) + "☆".repeat(5 - value);
}

// Set up interactive star rating
function setupStars(initialRating = 0) {
    const buttons = document.querySelectorAll(".star");
    const input = document.getElementById("rating");

    function selectRating(value) {
        input.value = value;

        buttons.forEach(button => {
            const selected =
                Number(button.dataset.value) <= value;

            button.classList.toggle("active", selected);
            button.setAttribute(
                "aria-pressed",
                String(selected)
            );
        });
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            selectRating(Number(button.dataset.value));
        });
    });

    selectRating(initialRating);
}

// Set up review character counter
function setupCounter() {
    const textarea = document.getElementById("reviewText");
    const counter = document.getElementById("counter");

    function updateCounter() {
        counter.textContent =
            textarea.value.length + " / 1000 characters";
    }

    textarea.addEventListener("input", updateCounter);
    updateCounter();
}

// Escape text before displaying it in HTML
function escapeHTML(value) {
    const element = document.createElement("div");
    element.textContent = String(value ?? "");
    return element.innerHTML;
}