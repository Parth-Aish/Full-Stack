const express = require('express');
const crypto = require('crypto'); // Built-in Node.js module for generating IDs
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory data store for the card collection
// We'll pre-populate it with a few cards for testing.
const cards = [
    { id: crypto.randomUUID(), suit: 'Spades', value: 'Ace' },
    { id: crypto.randomUUID(), suit: 'Hearts', value: 'King' },
    { id: crypto.randomUUID(), suit: 'Clubs', value: '7' },
];

// Make the cards array accessible to our routes
app.locals.cards = cards;

// Import and use the card routes
const cardRoutes = require('./routes/index');
app.use('/api', cardRoutes);

// Root endpoint for a basic health check
app.get('/', (req, res) => {
    res.send('Card Collection API is running!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});