// ================================================================
// routes/orders.js  –  Order CRUD endpoints
// ENEB453 Lab 4 Reference Project
//
// Base URL: /api/orders
// ================================================================

const express = require('express');
const router  = express.Router();
const pool    = require('../db/connection');

// GET /api/orders
// Return ALL orders with customer + product details (JOIN).
router.get('/', async (req, res) => {
  try {
    // TODO: Write a SELECT ... JOIN query across orders, customers, products.
    // Example:
    //   SELECT
    //     o.order_id, o.quantity, o.total_price, o.status, o.order_date,
    //     c.name  AS customer_name, c.email,
    //     p.name  AS product_name,  p.price AS unit_price
    //   FROM orders o
    //   JOIN customers c ON o.customer_id = c.customer_id
    //   JOIN products  p ON o.product_id  = p.product_id
    //   ORDER BY o.order_date DESC

    res.status(501).json({ error: 'TODO: Implement GET /api/orders' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders/:id
// Return a SINGLE order with full JOIN details.
router.get('/:id', async (req, res) => {
  try {
    // TODO: Same JOIN query as above but add WHERE o.order_id = ?
    //       Return 404 if not found.

    res.status(501).json({ error: 'TODO: Implement GET /api/orders/:id' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/orders
// Place a NEW order.
router.post('/', async (req, res) => {
  try {
    // TODO:
    //   1. Destructure customer_id, product_id, quantity from req.body.
    //   2. Validate all three fields are present and positive integers.
    //   3. Look up the product price:
    //        const [[product]] = await pool.query(
    //          'SELECT price FROM products WHERE product_id = ?', [product_id]
    //        );
    //        if (!product) return res.status(404).json({ error: 'Product not found.' });
    //   4. Calculate total_price = product.price * quantity.
    //   5. INSERT the order row.
    //   6. Return 201 { order_id: result.insertId, total_price }.

    res.status(501).json({ error: 'TODO: Implement POST /api/orders' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/orders/:id/status
// Update ONLY the status field of an order.
router.patch('/:id/status', async (req, res) => {
  const VALID_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
  try {
    // TODO:
    //   1. Get id from req.params and status from req.body.
    //   2. If status is not in VALID_STATUSES → return 400.
    //   3. UPDATE orders SET status = ? WHERE order_id = ?
    //   4. Return 404 if affectedRows === 0.
    //   5. Return 200 { message: `Order updated to ${status}.` }.

    res.status(501).json({ error: 'TODO: Implement PATCH /api/orders/:id/status' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/orders/:id
// Delete (cancel) an order.
router.delete('/:id', async (req, res) => {
  try {
    // TODO:
    //   1. DELETE WHERE order_id = req.params.id.
    //   2. Return 200 { message: 'Order deleted.' }.
    //   3. Return 404 if affectedRows === 0.

    res.status(501).json({ error: 'TODO: Implement DELETE /api/orders/:id' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
