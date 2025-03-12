const express = require('express');
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword } = require('../controllers/authController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

// User Registration Route
router.post('/register', registerUser);

// User Login Route
router.post('/login', loginUser);

// User Logout Route
router.post('/logout', authenticateUser, logoutUser);

// Forgot Password Route (Request Password Reset)
router.post('/forgot-password', forgotPassword);

// Reset Password Route (Set New Password)
router.post('/reset-password/:token', resetPassword);

module.exports = router;
