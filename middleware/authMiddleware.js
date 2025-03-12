const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');

// Middleware to verify JWT and authenticate users
const authenticateUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Bearer scheme

        if (!token) {
            return res.status(401).json({ message: "Access Denied. No token provided." });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the token exists in Redis (session validation)
        const storedToken = await redisClient.get(`session:${decoded.id}`);
        if (!storedToken || storedToken !== token) {
            return res.status(401).json({ message: "Invalid or expired session." });
        }

        // Attach user data to request object
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};

// Middleware to restrict access to authenticated users
const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({ message: "Unauthorized. Access restricted." });
    }
    next();
};

// Middleware to check if the user is an admin (role-based access control)
const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access Denied. Admins only." });
    }
    next();
};

module.exports = { authenticateUser, requireAuth, requireAdmin };
