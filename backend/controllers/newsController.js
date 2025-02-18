const News = require("../models/News");

// Fetch all news
const getAllNews = async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: "Error fetching news", error });
    }
};

// Add a news article
const addNews = async (req, res) => {
    try {
        const newNews = new News(req.body);
        await newNews.save();
        res.status(201).json({ message: "News added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding news", error });
    }
};

module.exports = { getAllNews, addNews };
