const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');  // Adjust the path if necessary
const knex = require('knex')(knexConfig);  // Initialize Knex using the knexfile

// GET all stocks
router.get('/', async (req, res, next) => {
    try {
        const stocks = await knex('stocks').select('*');  // Query all stocks
        res.json(stocks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch stocks' });
    }
});

// GET stock by ID
router.get('/:id', async (req, res) => {
    try {
        const stock = await knex('stocks').where('id', req.params.id).first();  // Query stock by ID
        if (!stock) return res.status(404).json({ message: 'Stock not found' });
        res.json(stock);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching stock' });
    }
});

// POST a new stock
router.post('/', async (req, res) => {
    const { symbol, name, price, volume } = req.body;  // Accept volume along with other stock data
    if (!symbol || !name || !price || !volume) {
        return res.status(400).json({ message: 'Invalid input' });
    }
    try {
        const [newStock] = await knex('stocks').insert({ symbol, name, price, volume })
                                              .returning('*');  // Insert and return the newly created stock
        res.status(201).json(newStock);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to create stock' });
    }
});

// PUT (update) a stock
router.put('/:id', async (req, res) => {
    const { symbol, name, price, volume } = req.body;  // Accept volume for updating as well
    try {
        const stock = await knex('stocks').where('id', req.params.id).first();  // Find stock by ID
        if (!stock) return res.status(404).json({ message: 'Stock not found' });

        // Update fields if they exist in the request body
        const updatedStock = await knex('stocks')
            .where('id', req.params.id)
            .update({ symbol, name, price, volume })
            .returning('*');  // Return the updated stock

        res.json(updatedStock[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to update stock' });
    }
});

// DELETE a stock
router.delete('/:id', async (req, res) => {
    try {
        const stock = await knex('stocks').where('id', req.params.id).first();  // Find stock by ID
        if (!stock) return res.status(404).json({ message: 'Stock not found' });

        await knex('stocks').where('id', req.params.id).del();  // Delete stock by ID
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to delete stock' });
    }
});

module.exports = router;
