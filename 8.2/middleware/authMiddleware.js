
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @name    verifyToken
 * @desc    Middleware to verify the JWT
 */
function verifyToken(req, res, next) {
    // Get the 'authorization' header
    const authHeader = req.headers['authorization'];
    
    // Format is "Bearer <TOKEN>"
    const token = authHeader && authHeader.split(' ')[1];
    
    // If no token is provided
    if (token == null) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    
    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, user) => {
        // If token is invalid
        if (err) {
            return res.status(403).json({ message: 'Access denied. Invalid token.' });
        }
        
        // If token is valid, attach payload to request
        req.user = user;
        next(); // Move to the next route handler
    });
}

module.exports = verifyToken;
