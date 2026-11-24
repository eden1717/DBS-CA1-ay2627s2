const reviewId = Number(
    new URLSearchParams(window.location.search).get("id")
);

document.addEventListener("DOMContentLoaded", async () => {
    if (!checkAuth()) return;

    document.getElementById("deleteBtn")
        .addEventListener("click", deleteReview);

    await loadReview();
});

// Display review before deletion
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

        document.getElementById("reviewRating").textContent =
            displayStars(review.rating);

        document.getElementById("reviewText").textContent =
            review.reviewText;

        document.getElementById("deleteBtn").disabled = false;

    } catch (err) {
        showMessage(err.message);
    }
}

// Delete review
async function deleteReview() {
    const button = document.getElementById("deleteBtn");
    button.disabled = true;

    try {
        const data = await apiRequest(
            "/api/review/delete",
            "DELETE",
            {
                reviewId
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