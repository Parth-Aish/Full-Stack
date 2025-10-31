
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

/**
 * @route   GET /api/public
 * @desc    A public route anyone can access
 */
router.get('/public', (req, res) => {
    res.json({ message: 'This is a public route. Welcome!' });
});

/**
 * @route   GET /api/profile
 * @desc    A protected route, requires a valid JWT
 * 'verifyToken' is our middleware
 */
router.get('/profile', verifyToken, (req, res) => {
    // We can access req.user because verifyToken added it
    res.json({
        message: `Welcome, ${req.user.username}! This is your private profile.`,
        user: req.user
    });
});

module.exports = router;
