const express = require("express");
const router = express.Router();
const SavedNews = require("../models/savedNews"); // Ensure correct path


// Save news to MongoDB
router.post("/save", async (req, res) => {

    const { title, description, imageUrl, newsUrl, author, date, source } = req.body;

        if (!title || !newsUrl ) {
            return res.status(400).json({ error: "Title and newsUrl are required" });
        }


    try {
        
        
        const newNews = new SavedNews({
            title,
            description,
            imageUrl,
            newsUrl,
            author,
            date,
            source
        });

        await newNews.save();
        res.status(201).json({ message: "News saved successfully!" });
    } catch (error) {
        console.error("Error saving news:", error);
        res.status(500).json({ error: "Internal Server Error" });

    }
});

// Get saved news
router.get("/get", async (req, res) => {
    try {
        const savedNews = await SavedNews.find();
        res.status(200).json(savedNews);
    } catch (error) {
        console.error("Error fetching saved news:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete saved news
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await SavedNews.findByIdAndDelete(id);
        res.status(200).json({ message: "News deleted successfully!" });
    } catch (error) {
        console.error("Error deleting news:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
