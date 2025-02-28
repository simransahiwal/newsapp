const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const authRoutes = require("./routes/authRoutes");
const newsRoutes = require("./routes/newsRoutes");
const dataRoutes = require("./routes/dataRoutes"); 
const savedNewsRoutes = require("./routes/savedNewsRoutes");

// Adjust path as necessary
// const mongoose = require("mongoose");

require("dotenv").config(); 

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    // origin: "http://localhost:3000",  //use for local testing (frontend)
    // origin: "https://newsapp-frontend-pxec.onrender.com",   //use for online render (frontend)
    origin:"https://newsapp2403.netlify.app" ,
    credentials: true,
}));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/news", newsRoutes);
app.use("/data", dataRoutes);
app.use("/savedNews", savedNewsRoutes);  // New route for saved news

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



