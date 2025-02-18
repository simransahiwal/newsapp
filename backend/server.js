const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const authRoutes = require("./routes/authRoutes");
const newsRoutes = require("./routes/newsRoutes");
const dataRoutes = require("./routes/dataRoutes"); 
// Adjust path as necessary
// const mongoose = require("mongoose");

require("dotenv").config(); 

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    // origin: "http://localhost:3000",  // Replace with your frontend URL
    origin: "https://newsapp-xmx1.onrender.com/",
    credentials: true,
}));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/news", newsRoutes);
app.use("/data", dataRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// mongoose
//   .connect("mongodb://localhost:27017/your-database-name", { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB", err);
//   });

