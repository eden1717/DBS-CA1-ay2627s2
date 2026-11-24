const reviewModel = require("../models/reviewModel");

// Handle database errors
const handleError = (err, res) => {
    console.error(err);

    if (err.code === "P0001") {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    if (err.code === "22P02" || err.code === "22003") {
        return res.status(400).json({
            success: false,
            message: "Invalid input value."
        });
    }

    return res.status(500).json({
        success: false,
        message: "Server error. Please try again."
    });
};

// Create review
const createReview = async (req, res) => {
    try {
        const memberId = req.user.id;
        const { productId, rating, reviewText } = req.body;

        const review = await reviewModel.createReview(
            memberId,
            productId,
            rating,
            reviewText
        );

        res.status(201).json({
            success: true,
            message: "Review created successfully.",
            review
        });

    } catch (err) {
        handleError(err, res);
    }
};

// Retrieve all reviews
const getReviews = async (req, res) => {
    try {
        const memberId = req.user.id;

        const reviews = await reviewModel.getReviews(memberId);

        res.json({
            success: true,
            reviews
        });

    } catch (err) {
        handleError(err, res);
    }
};

// Update review
const updateReview = async (req, res) => {
    try {
        const memberId = req.user.id;
        const { reviewId, rating, reviewText } = req.body;

        const review = await reviewModel.updateReview(
            memberId,
            reviewId,
            rating,
            reviewText
        );

        res.json({
            success: true,
            message: "Review updated successfully.",
            review
        });

    } catch (err) {
        handleError(err, res);
    }
};

// Delete review
const deleteReview = async (req, res) => {
    try {
        const memberId = req.user.id;
        const { reviewId } = req.body;

        const review = await reviewModel.deleteReview(
            memberId,
            reviewId
        );

        res.json({
            success: true,
            message: "Review deleted successfully.",
            review
        });

    } catch (err) {
        handleError(err, res);
    }
};

module.exports = {
    createReview,
    getReviews,
    updateReview,
    deleteReview
};