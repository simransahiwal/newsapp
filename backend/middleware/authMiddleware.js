// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//     const token = req.header("x-auth-token");
//     if (!token) {
//         return res.status(401).json({ msg: "No token, authorization denied" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded.userId;
//         next();
//     } catch (error) {
//         res.status(401).json({ msg: "Token is not valid" });
//     }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // Check for token in the Authorization header
    const token = req.header("Authorization")?.split(' ')[1];  // This splits 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;  // Attach user data to request
        next();  // Proceed to the next middleware/route handler
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};

module.exports = authMiddleware;
