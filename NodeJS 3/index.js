const express = require('express');
const router = express.Router();

const LOCK_TIMEOUT_MS = 60 * 1000; // 1 minute lock timeout

// GET /api/seats - View all available seats
router.get('/seats', (req, res) => {
    const seats = req.app.locals.seats;
    res.status(200).json(seats);
});

// POST /api/lock - Temporarily lock a seat
router.post('/lock', (req, res) => {
    const seats = req.app.locals.seats;
    const { seatId, userId } = req.body;

    if (!seatId || !userId) {
        return res.status(400).json({ message: 'seatId and userId are required.' });
    }

    const seat = seats[seatId];

    if (!seat) {
        return res.status(404).json({ message: 'Seat not found.' });
    }

    const now = Date.now();

    // Check seat status
    if (seat.status === 'booked') {
        return res.status(409).json({ message: 'Seat is already booked.' });
    }

    // A seat can be locked if it's available OR if its existing lock has expired
    if (seat.status === 'available' || (seat.status === 'locked' && now > seat.lockExpiresAt)) {
        seat.status = 'locked';
        seat.lockedBy = userId;
        seat.lockExpiresAt = now + LOCK_TIMEOUT_MS;
        return res.status(200).json({ message: `Seat ${seatId} locked successfully by ${userId}.` });
    }

    // If we reach here, the seat is locked by someone else and the lock is still valid
    return res.status(409).json({ message: 'Seat is currently locked by another user.' });
});

// POST /api/confirm - Confirm a seat booking
router.post('/confirm', (req, res) => {
    const seats = req.app.locals.seats;
    const { seatId, userId } = req.body;

    if (!seatId || !userId) {
        return res.status(400).json({ message: 'seatId and userId are required.' });
    }

    const seat = seats[seatId];

    if (!seat) {
        return res.status(404).json({ message: 'Seat not found.' });
    }

    // You can only confirm a seat that you have locked
    if (seat.status !== 'locked' || seat.lockedBy !== userId) {
        return res.status(403).json({ message: 'You do not have a lock on this seat. Please lock it first.' });
    }
    
    // Check if lock has expired
    if (Date.now() > seat.lockExpiresAt) {
        // Reset the seat so someone else can lock it
        seat.status = 'available';
        seat.lockedBy = null;
        seat.lockExpiresAt = null;
        return res.status(410).json({ message: 'Your lock has expired. Please lock the seat again.' });
    }
    
    // Confirm the booking
    seat.status = 'booked';
    seat.lockedBy = null; // Clear lock info
    seat.lockExpiresAt = null;

    return res.status(200).json({ message: `Booking for seat ${seatId} confirmed successfully for ${userId}.` });
});


module.exports = router;