const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware
app.use(cors({
    origin: 'http://127.0.0.1:8080'  // allow the frontend to access this server
}));

// Import routes
const usersRoutes = require('./routes/usersRoutes');
const menuItemsRoutes = require('./routes/menuItemsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');

app.use(usersRoutes);
app.use(menuItemsRoutes);
app.use(ordersRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
