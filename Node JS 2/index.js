const express = require('express');
const crypto = require('crypto');
const router = express.Router();

// GET /api/cards - List all cards in the collection
router.get('/cards', (req, res) => {
    const cards = req.app.locals.cards;
    res.status(200).json(cards);
});

// GET /api/cards/:id - Retrieve a single card by its ID
router.get('/cards/:id', (req, res) => {
    const cards = req.app.locals.cards;
    const { id } = req.params;
    const card = cards.find(c => c.id === id);

    if (card) {
        res.status(200).json(card);
    } else {
        res.status(404).json({ message: 'Card not found.' });
    }
});

// POST /api/cards - Add a new card to the collection
router.post('/cards', (req, res) => {
    const cards = req.app.locals.cards;
    const { suit, value } = req.body;

    if (!suit || !value) {
        return res.status(400).json({ message: 'Both suit and value are required.' });
    }

    const newCard = {
        id: crypto.randomUUID(),
        suit,
        value
    };

    cards.push(newCard);
    res.status(201).json(newCard); // 201 Created is the standard for successful POST
});

// DELETE /api/cards/:id - Delete a card from the collection
router.delete('/cards/:id', (req, res) => {
    const cards = req.app.locals.cards;
    const { id } = req.params;
    const cardIndex = cards.findIndex(c => c.id === id);

    if (cardIndex !== -1) {
        cards.splice(cardIndex, 1); // Remove the card from the array
        res.status(204).send(); // 204 No Content is standard for successful DELETE
    } else {
        res.status(404).json({ message: 'Card not found.' });
    }
});

module.exports = router;