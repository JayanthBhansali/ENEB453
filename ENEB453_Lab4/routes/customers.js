// ================================================================
// routes/customers.js  –  Customer CRUD endpoints
// ENEB453 Lab 4 Reference Project
//
// Base URL: /api/customers
// ================================================================

const express = require('express');
const router  = express.Router();
const pool    = require('../db/connection');

// ── GET /api/customers ───────────────────────────────────────────
// Return ALL customers.
router.get('/', async (req, res) => {
  try {
    // TODO: SELECT all rows from the customers table.
    // const [rows] = await pool.query('SELECT * FROM customers ORDER BY created_at DESC');
    // res.json(rows);

    res.status(501).json({ error: 'TODO: Implement GET /api/customers' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/customers/:id ───────────────────────────────────────
// Return a SINGLE customer by customer_id.
router.get('/:id', async (req, res) => {
  try {
    // TODO: SELECT one row WHERE customer_id = req.params.id.
    //       Return 404 if not found.

    res.status(501).json({ error: 'TODO: Implement GET /api/customers/:id' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/customers ──────────────────────────────────────────
// Create a NEW customer.
router.post('/', async (req, res) => {
  try {
    // TODO:
    //   1. Destructure name, email, phone, address from req.body.
    //   2. Validate name and email are present → return 400 if not.
    //   3. INSERT into customers table.
    //   4. Return 201 with { customer_id: result.insertId }.
    // Note: if err.code === 'ER_DUP_ENTRY' → return 409 Conflict.

    res.status(501).json({ error: 'TODO: Implement POST /api/customers' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── PUT /api/customers/:id ───────────────────────────────────────
// Update an EXISTING customer.
router.put('/:id', async (req, res) => {
  try {
    // TODO:
    //   1. Get id from req.params.
    //   2. Destructure name, email, phone, address from req.body.
    //   3. UPDATE the row. Return 404 if affectedRows === 0.

    res.status(501).json({ error: 'TODO: Implement PUT /api/customers/:id' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── DELETE /api/customers/:id ────────────────────────────────────
// Delete a customer (and cascade-deletes their orders).
router.delete('/:id', async (req, res) => {
  try {
    // TODO:
    //   1. DELETE WHERE customer_id = req.params.id.
    //   2. Return 200 { message: 'Customer deleted.' }.
    //   3. Return 404 if affectedRows === 0.

    res.status(501).json({ error: 'TODO: Implement DELETE /api/customers/:id' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
