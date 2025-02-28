const express = require("express");
const { check } = require("express-validator");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

// Signup Route
router.post(
    "/signup",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Enter a valid email").isEmail(),
        check("password", "Password must be at least 6 characters").isLength({ min: 6 })
    ],
    signup
);

// Login Route
router.post(
    "/login",
    [
        check("email", "Enter a valid email").isEmail(),
        check("password", "Password is required").exists()
    ],
    login
);

module.exports = router;
