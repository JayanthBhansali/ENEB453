// ================================================================
// routes/products.js  –  Product CRUD endpoints
// ENEB453 Lab 4 Reference Project
//
// Base URL: /api/products
// ================================================================

const express = require('express');
const router  = express.Router();
const pool    = require('../db/connection');

// GET /api/products
// Return ALL products. Supports optional ?search= query param.
router.get('/', async (req, res) => {
  try {
    // TODO:
    //   If req.query.search exists, add WHERE name LIKE '%search%'.
    //   Otherwise return all products.
    // Example:
    //   const search = req.query.search;
    //   if (search) {
    //     const [rows] = await pool.query(
    //       'SELECT * FROM products WHERE name LIKE ? ORDER BY created_at DESC',
    //       [`%${search}%`]
    //     );
    //     return res.json(rows);
    //   }
    //   const [rows] = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    //   res.json(rows);

    res.status(501).json({ error: 'TODO: Implement GET /api/products' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id
// Return a SINGLE product by product_id.
router.get('/:id', async (req, res) => {
  try {
    // TODO: SELECT one product WHERE product_id = req.params.id.
    //       Return 404 { error: 'Product not found.' } if missing.

    res.status(501).json({ error: 'TODO: Implement GET /api/products/:id' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products
// Create a NEW product.
router.post('/', async (req, res) => {
  try {
    // TODO:
    //   1. Destructure name, description, price, stock_quantity from req.body.
    //   2. Validate: name is required; price must be a positive number.
    //   3. INSERT the product.
    //   4. Return 201 { product_id: result.insertId, name, price }.

    res.status(501).json({ error: 'TODO: Implement POST /api/products' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/products/:id
// Update an EXISTING product.
router.put('/:id', async (req, res) => {
  try {
    // TODO:
    //   1. Get id from req.params.
    //   2. Destructure updatable fields from req.body.
    //   3. UPDATE the product. Return 404 if affectedRows === 0.
    //   4. Return 200 { message: 'Product updated.' }.

    res.status(501).json({ error: 'TODO: Implement PUT /api/products/:id' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/products/:id 
// Delete a product (and cascade-deletes related orders).
router.delete('/:id', async (req, res) => {
  try {
    // TODO:
    //   1. DELETE WHERE product_id = req.params.id.
    //   2. Return 200 { message: 'Product deleted.' }.
    //   3. Return 404 if affectedRows === 0.

    res.status(501).json({ error: 'TODO: Implement DELETE /api/products/:id' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
