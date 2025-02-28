const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getAllNews } = require("../controllers/newsController");

const router = express.Router();

// Get all news - Example route (can be customized)
router.get("/", authMiddleware, getAllNews);

module.exports = router;
