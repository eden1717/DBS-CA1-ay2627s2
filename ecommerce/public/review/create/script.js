document.addEventListener("DOMContentLoaded", async () => {
    if (!checkAuth()) return;

    setupStars();
    setupCounter();

    document.getElementById("reviewForm")
        .addEventListener("submit", createReview);

    await loadProducts();
});

// Load product dropdown
async function loadProducts() {
    try {
        const data = await apiRequest(
            "/api/product/retrieve/all"
        );

        const select = document.getElementById("productId");

        data.products.forEach(product => {
            const option = document.createElement("option");

            option.value = product.id;
            option.textContent = product.name;

            select.appendChild(option);
        });

        // Preselect product chosen from product page
        const selectedId =
            localStorage.getItem("selectedProductId");

        if (selectedId) {
            select.value = selectedId;
        }

    } catch (err) {
        showMessage(err.message);
    }
}

// Submit review
async function createReview(event) {
    event.preventDefault();

    const button = document.getElementById("submitBtn");
    button.disabled = true;

    const productId =
        Number(document.getElementById("productId").value);

    const rating =
        Number(document.getElementById("rating").value);

    const reviewText =
        document.getElementById("reviewText").value;

    try {
        const data = await apiRequest(
            "/api/review/create",
            "POST",
            {
                productId,
                rating,
                reviewText
            }
        );

        showMessage(data.message, "success");

        localStorage.removeItem("selectedProductId");
        localStorage.removeItem("selectedProductName");

        setTimeout(() => {
            window.location.href = "/review/retrieve/all/";
        }, 1000);

    } catch (err) {
        showMessage(err.message);
        button.disabled = false;
    }
}