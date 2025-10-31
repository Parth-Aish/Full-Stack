
require('dotenv').config(); // Load .env variables
const express = require('express');

// --- Import Routes ---
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// --- Use Routes ---
// All auth routes will be prefixed with /auth
app.use('/auth', authRoutes);
// All protected/public API routes will be prefixed with /api
app.use('/api', protectedRoutes);

// --- Start Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
