const express = require("express");
const router = express.Router();

// Example GET route
router.get("/api/data", (req, res) => {
  const exampleData = {
    message: "Hello from the backend!",
    data: [1, 2, 3, 4, 5], // Example data to send back to the frontend
  };
  res.json(exampleData); // Send the data as a JSON response
});

module.exports = router;
