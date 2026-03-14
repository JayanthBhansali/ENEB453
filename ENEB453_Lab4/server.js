// ================================================================
// server.js  –  Express application entry point
// ENEB453 Lab 4 Reference Project
// ================================================================

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// Middleware 
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes 
// TODO (Lab 4): Uncomment these lines after creating the route files.
const customerRoutes = require('./routes/customers');
const productRoutes  = require('./routes/products');
const orderRoutes    = require('./routes/orders');

app.use('/api/customers', customerRoutes);
app.use('/api/products',  productRoutes);
app.use('/api/orders',    orderRoutes);

// Health Check
app.get('/api/status', (req, res) => {
  res.json({ status: 'OK', message: 'ShopNest API is running.' });
});

// Global Error Handler – Catches unhandled errors and returns a JSON response with error details.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Start ─────
app.listen(PORT, () => {
  console.log(`\n  ShopNest server running → http://localhost:${PORT}\n`);
});
