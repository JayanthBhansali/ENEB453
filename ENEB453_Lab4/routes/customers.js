// ================================================================
// routes/customers.js  –  Customer CRUD endpoints
// ENEB453 Lab 4 Reference Project
//
// Base URL: /api/customers
// ================================================================

const express = require('express');
const router  = express.Router();
const pool    = require('../db/connection');

// GET /api/customers
// Return ALL customers.
router.get('/', async (req, res) => {
  try {
    // SELECT all rows from the customers table.
    const [rows] = await pool.query('SELECT * FROM customers ORDER BY created_at DESC');
    res.json(rows);
    //res.status(501).json({ error: 'TODO: Implement GET /api/customers' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/customers/:id
// Return a SINGLE customer by customer_id.
router.get('/:id', async (req, res) => {
  try {
    // SELECT one row WHERE customer_id = req.params.id.
    // Return 404 if not found.
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM customers WHERE customer_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found.' });
    }
    res.json(rows[0]);
    //res.status(501).json({ error: 'TODO: Implement GET /api/customers/:id' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/customers
// Create a NEW customer.
router.post('/', async (req, res) => {
  try {
    //   1. Destructure name, email, phone, address from req.body.
    //   2. Validate name and email are present - return 400 if not.
    //   3. INSERT into customers table.
    //   4. Return 201 with { customer_id: result.insertId }.
    // Note: if err.code === 'ER_DUP_ENTRY' - return 409 Conflict.

    const { name, email, phone, address } = req.body;
 
    // Validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }
 
    const [result] = await pool.query(
      'INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)',
      [name, email, phone || null, address || null]
    );
 
    res.status(201).json({
      customer_id: result.insertId,
      message: 'Customer created successfully.',
    });
    //res.status(501).json({ error: 'TODO: Implement POST /api/customers' });
  } catch (err) {
    // Duplicate email
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'This email is already registered.' });
    }
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/customers/:id
// Update an EXISTING customer.
router.put('/:id', async (req, res) => {
  try {
    // TODO:
    //   1. Get id from req.params.
    //   2. Destructure name, email, phone, address from req.body.
    //   3. UPDATE the row. Return 404 if affectedRows === 0.
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
 
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }
 
    const [result] = await pool.query(
      `UPDATE customers
       SET name = ?, email = ?, phone = ?, address = ?
       WHERE customer_id = ?`,
      [name, email, phone || null, address || null, id]
    );
 
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found.' });
    }
 
    res.json({ message: 'Customer updated successfully.' });
    //res.status(501).json({ error: 'TODO: Implement PUT /api/customers/:id' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/customers/:id
// Delete a customer (and cascade-deletes their orders).
router.delete('/:id', async (req, res) => {
  try {
    //   1. DELETE WHERE customer_id = req.params.id.
    //   2. Return 200 { message: 'Customer deleted.' }.
    //   3. Return 404 if affectedRows === 0.
        const { id } = req.params;
 
    const [result] = await pool.query(
      'DELETE FROM customers WHERE customer_id = ?',
      [id]
    );
 
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found.' });
    }
 
    res.status(200).json({ message: 'Customer deleted successfully.' });
    //res.status(501).json({ error: 'TODO: Implement DELETE /api/customers/:id' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
