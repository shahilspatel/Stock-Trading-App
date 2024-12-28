// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const stocksController = require('./controllers/stocksController');
const authenticate = require('./middleware/auth');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));


// Routes
app.use('/stocks', stocksController);

app.use('/', (req, res) => {
    res.json({"message": "Route not found"})
})

// Default route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
