document.addEventListener("DOMContentLoaded", () => {
    if (!checkAuth()) return;

    loadReviews();
});

// Retrieve member's reviews
async function loadReviews() {
    try {
        const data = await apiRequest(
            "/api/review/retrieve/all"
        );

        renderReviews(data.reviews);

    } catch (err) {
        showMessage(err.message);
    }
}

// Display reviews
function renderReviews(reviews) {
    const list = document.getElementById("reviewList");
    const count = document.getElementById("reviewCount");

    count.textContent = `You have ${reviews.length} review(s).`;

    if (reviews.length === 0) {
        list.innerHTML = `
            <div class="card">
                <h3>No reviews yet</h3>
                <p>You have not written any product reviews.</p>
            </div>
        `;

        return;
    }

    list.innerHTML = reviews.map(review => `
        <div class="card">

            <h3>${escapeHTML(review.productName)}</h3>

            <div class="timestamp">
                Review ID: ${Number(review.id)}
            </div>

            <span class="verified">✓ Verified Purchase</span>

            <div class="rating-display">
                ${displayStars(review.rating)}
            </div>

            <p class="review-text">
                ${escapeHTML(review.reviewText)}
            </p>

            <div class="timestamp">
                Last updated: ${escapeHTML(
                    formatDate(review.updatedAt)
                )}
            </div>

            <div class="actions">

                <a href="/review/update/?id=${Number(review.id)}"
                   class="btn">
                    Update
                </a>

                <a href="/review/delete/?id=${Number(review.id)}"
                   class="btn btn-danger">
                    Delete
                </a>

            </div>

        </div>
    `).join("");
}