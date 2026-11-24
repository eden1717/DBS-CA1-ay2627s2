const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");
const { verifyToken } = require("../middleware/auth");

// Create review
router.post("/create", verifyToken, reviewController.createReview);

// Retrieve all reviews
router.get("/retrieve/all", verifyToken, reviewController.getReviews);

// Update review
router.put("/update", verifyToken, reviewController.updateReview);

// Delete review
router.delete("/delete", verifyToken, reviewController.deleteReview);

module.exports = router;