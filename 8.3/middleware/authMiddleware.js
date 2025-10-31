
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware 1: Authentication
 * Verifies the JWT is valid and attaches the user payload to req.user
 */
function checkAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            // Token is invalid (e.g., expired, wrong signature)
            return res.status(403).json({ message: 'Access denied. Invalid token.' });
        }
        
        // Token is valid, attach the user payload (id, username, role)
        req.user = user;
        next();
    });
}

/**
 * Middleware 2: Authorization (Role Checking)
 * This is a "factory" function. It returns a middleware function
 * that checks if the user's role is in the allowed 'roles' array.
 * * It MUST run *after* checkAuth.
 */
function checkRole(roles) {
    return (req, res, next) => {
        // checkAuth should have already run and attached req.user
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required, but user not found on request.' });
        }
        
        if (!roles.includes(req.user.role)) {
            // User is authenticated, but not authorized for this route
            return res.status(403).json({ 
                message: `Forbidden. You must have one of the following roles: [${roles.join(', ')}]`,
                yourRole: req.user.role 
            });
        }
        
        // User has the correct role, proceed
        next();
    };
}

module.exports = {
    checkAuth,
    checkRole
};
