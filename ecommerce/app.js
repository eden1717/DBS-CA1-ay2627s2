require("dotenv").config();
const express = require("express");
const path = require("path");

// Import routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const reviewRoutes = require("./routes/reviews");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/review", reviewRoutes);

// Serve HTML pages

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "auth", "login", "index.html"));
});

// Login page
app.get("/auth/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "auth", "login", "index.html"));
});

// Register page
app.get("/auth/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "auth", "register", "index.html"));
});

// Product page
app.get("/product/retrieve", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "product", "retrieve", "index.html"));
});

// Create review page
app.get("/review/create", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "review", "create", "index.html"));
});

// Retrieve all reviews page
app.get("/review/retrieve/all", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "review", "retrieve", "all", "index.html"));
});

// Update review page
app.get("/review/update", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "review", "update", "index.html"));
});

// Delete review page
app.get("/review/delete", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "review", "delete", "index.html"));
});

// Admin dashboard page
app.get("/admin/dashboard/salesOrderSummary", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin", "dashboard", "salesOrderSummary", "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});