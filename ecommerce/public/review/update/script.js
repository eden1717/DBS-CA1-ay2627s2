const reviewId = Number(
    new URLSearchParams(window.location.search).get("id")
);

document.addEventListener("DOMContentLoaded", async () => {
    if (!checkAuth()) return;

    document.getElementById("updateForm")
        .addEventListener("submit", updateReview);

    await loadReview();
});

// Retrieve existing review
async function loadReview() {
    try {
        const data = await apiRequest(
            "/api/review/retrieve/all"
        );

        const review = data.reviews.find(
            item => Number(item.id) === reviewId
        );

        if (!review) {
            throw new Error("Review not found or access denied.");
        }

        document.getElementById("productName").textContent =
            review.productName;

        document.getElementById("reviewText").value =
            review.reviewText;

        setupStars(review.rating);
        setupCounter();

        document.getElementById("submitBtn").disabled = false;

    } catch (err) {
        showMessage(err.message);
    }
}

// Submit updated review
async function updateReview(event) {
    event.preventDefault();

    const button = document.getElementById("submitBtn");
    button.disabled = true;

    const rating =
        Number(document.getElementById("rating").value);

    const reviewText =
        document.getElementById("reviewText").value;

    try {
        const data = await apiRequest(
            "/api/review/update",
            "PUT",
            {
                reviewId,
                rating,
                reviewText
            }
        );

        showMessage(data.message, "success");

        setTimeout(() => {
            window.location.href = "/review/retrieve/all/";
        }, 1000);

    } catch (err) {
        showMessage(err.message);
        button.disabled = false;
    }
}