
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Mock user database
const users = [
    { id: 1, username: 'admin', password: 'password123' }
];

/**
 * @route   POST /auth/login
 * @desc    Logs in a user and returns a JWT
 */
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Find user
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Create payload
    const payload = {
        id: user.id,
        username: user.username
    };
    
    // Sign the token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({
        message: 'Logged in successfully!',
        token: token
    });
});

module.exports = router;
