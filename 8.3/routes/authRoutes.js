
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Mock user database with roles
const users = [
    { id: 1, username: 'admin', password: 'password123', role: 'admin' },
    { id: 2, username: 'mod', password: 'password123', role: 'moderator' },
    { id: 3, username: 'user', password: 'password123', role: 'user' }
];

/**
 * @route   POST /auth/login
 * @desc    Logs in a user and returns a JWT containing their role
 */
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Find user
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // --- CRITICAL: Add user's role to the JWT payload ---
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role  // This is the key for RBAC
    };
    
    // Sign the token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({
        message: 'Logged in successfully!',
        token: token,
        user: payload
    });
});

module.exports = router;
