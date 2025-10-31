
const express = require('express');
const router = express.Router();

// Import both middleware functions
const { checkAuth, checkRole } = require('../middleware/authMiddleware');

/**
 * @route   GET /api/public
 * @desc    A public route anyone can access
 */
router.get('/public', (req, res) => {
    res.json({ message: 'This is a public route. Welcome!' });
});

/**
 * @route   GET /api/profile
 * @desc    A protected route for all logged-in users
 * We use checkAuth, then checkRole to allow all roles.
 */
router.get('/profile', [checkAuth, checkRole(['user', 'moderator', 'admin'])], (req, res) => {
    res.json({
        message: `Welcome to your user profile, ${req.user.username}!`,
        user: req.user
    });
});

/**
 * @route   GET /api/mod/manage
 * @desc    A protected route for Moderators and Admins
 */
router.get('/mod/manage', [checkAuth, checkRole(['moderator', 'admin'])], (req, res) => {
    res.json({
        message: 'This is the Moderator management panel. Only mods and admins here.',
        user: req.user
    });
});

/**
 * @route   GET /api/admin/dashboard
 * @desc    A protected route for Admins ONLY
 */
router.get('/admin/dashboard', [checkAuth, checkRole(['admin'])], (req, res) => {
    res.json({
        message: 'This is the ADMIN dashboard. You have supreme power!',
        user: req.user
    });
});

module.exports = router;
