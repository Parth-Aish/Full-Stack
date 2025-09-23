const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store for seats
// status can be 'available', 'locked', or 'booked'
const seats = {};
const TOTAL_SEATS = 50;
for (let i = 1; i <= TOTAL_SEATS; i++) {
    seats[i] = {
        id: i,
        status: 'available', // 'available', 'locked', 'booked'
        lockedBy: null,      // userId who locked the seat
        lockExpiresAt: null  // timestamp when the lock expires
    };
}

// Make seats available to the routes by attaching to the app object
app.locals.seats = seats;

// Import and use routes
const bookingRoutes = require('./routes/index');
app.use('/api', bookingRoutes);

// Simple route for the root
app.get('/', (req, res) => {
    res.send('Ticket Booking System API is running. Use /api/seats to see seat status.');
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});