const { query } = require("../config/database");

// Create review
const createReview = async (memberId, productId, rating, reviewText) => {
    const result = await query(
        "SELECT public.create_review($1, $2, $3, $4) AS id",
        [memberId, productId, rating, reviewText]
    );

    return result.rows[0];
};

// Retrieve all reviews
const getReviews = async (memberId) => {
    const result = await query(
        "SELECT * FROM public.get_reviews($1)",
        [memberId]
    );

    return result.rows;
};

// Update review
const updateReview = async (memberId, reviewId, rating, reviewText) => {
    const result = await query(
        "SELECT public.update_review($1, $2, $3, $4) AS id",
        [memberId, reviewId, rating, reviewText]
    );

    return result.rows[0];
};

// Delete review
const deleteReview = async (memberId, reviewId) => {
    const result = await query(
        "SELECT public.delete_review($1, $2) AS id",
        [memberId, reviewId]
    );

    return result.rows[0];
};

module.exports = {
    createReview,
    getReviews,
    updateReview,
    deleteReview
};