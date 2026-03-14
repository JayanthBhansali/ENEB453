// ================================================================
// orders_app.js  –  Orders page logic
// ENEB453 Lab 4 Reference Project
// ================================================================

// ================================================================
// 1.  LOAD ORDERS
// ================================================================

/**
 * Fetches all orders from the backend (with JOIN data) and
 * renders them in the #orders-tbody table.
 *
 * TODO:
 *   1. Call GET /api/orders using apiFetch.
 *   2. Pass the result to renderOrders(orders).
 *   3. Handle errors by displaying a message in the tbody.
 */
async function loadOrders() {
  const tbody = document.getElementById('orders-tbody');
  if (!tbody) return;

  tbody.innerHTML = `
    <tr>
      <td colspan="8" class="empty-state">
        <div class="spinner"></div>
        <p>Loading orders…</p>
      </td>
    </tr>`;

  try {
    // TODO: Replace with real API call.
    // const orders = await apiFetch('/api/orders');
    // renderOrders(orders);

    // Placeholder until TODO is implemented:
    renderOrders([]);

  } catch (err) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="empty-state" style="color:var(--danger);">
          Failed to load orders: ${err.message}
        </td>
      </tr>`;
  }
}

// ================================================================
// 2.  RENDER ORDERS
// ================================================================

/**
 * Renders order rows into #orders-tbody.
 *
 * Each row should display:
 *   order_id | customer_name | product_name | quantity | total_price
 *   | status (as a <select>) | order_date | Delete button
 *
 * TODO:
 *   - The status <select> onChange should call updateOrderStatus(id, newStatus).
 *   - The delete button should call deleteOrder(id).
 *   - Apply the correct CSS class to the status badge (e.g. status-pending).
 */
function renderOrders(orders) {
  const tbody = document.getElementById('orders-tbody');
  if (!tbody) return;

  if (orders.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="empty-state">
          No orders found. Place one above!
        </td>
      </tr>`;
    return;
  }

  const statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

  tbody.innerHTML = orders.map(o => `
    <tr>
      <td><strong>#${o.order_id}</strong></td>
      <td>${escapeHtml(o.customer_name || '—')}<br>
          <small style="color:var(--text-muted)">${escapeHtml(o.email || '')}</small>
      </td>
      <td>${escapeHtml(o.product_name || '—')}</td>
      <td>${o.quantity}</td>
      <td><strong>$${Number(o.total_price).toFixed(2)}</strong></td>
      <td>
        <!-- TODO: onChange should call updateOrderStatus(${o.order_id}, this.value) -->
        <select class="status-select" onchange="updateOrderStatus(${o.order_id}, this.value)">
          ${statuses.map(s => `
            <option value="${s}" ${s === o.status ? 'selected' : ''}>${capitalize(s)}</option>
          `).join('')}
        </select>
      </td>
      <td><small>${formatDate(o.order_date)}</small></td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="deleteOrder(${o.order_id})">
          Delete
        </button>
      </td>
    </tr>
  `).join('');
}

// ================================================================
// 3.  PLACE NEW ORDER (Form Submit)
// ================================================================

/**
 * Handles the new order form submission.
 *
 * TODO:
 *   1. Read customer_id, product_id, quantity from the form.
 *   2. Validate: all fields required, quantity >= 1.
 *   3. Call POST /api/orders with { customer_id, product_id, quantity }.
 *   4. On success (201): show the returned order_id and total_price,
 *      reset the form, and reload the orders table.
 *   5. On error: display the error in #orderMessage.
 */
async function handleOrderSubmit(event) {
  event.preventDefault();

  const customer_id = parseInt(document.getElementById('orderCustomerId').value);
  const product_id  = parseInt(document.getElementById('orderProductId').value);
  const quantity    = parseInt(document.getElementById('orderQuantity').value);
  const msgEl       = document.getElementById('orderMessage');

  // Basic validation
  if (!customer_id || !product_id || !quantity || quantity < 1) {
    showMessage(msgEl, 'error', 'Please fill in all fields. Quantity must be at least 1.');
    return;
  }

  try {
    // TODO: Replace with real API call.
    // const result = await apiFetch('/api/orders', {
    //   method: 'POST',
    //   body: JSON.stringify({ customer_id, product_id, quantity }),
    // });
    // showMessage(msgEl, 'success',
    //   `Order #${result.order_id} placed! Total: $${Number(result.total_price).toFixed(2)}`);
    // event.target.reset();
    // updateEstimatedTotal();
    // await loadOrders();

    showMessage(msgEl, 'error', 'TODO: Implement POST /api/orders in Lab 4.');

  } catch (err) {
    showMessage(msgEl, 'error', err.message);
  }
}

// ================================================================
// 4.  UPDATE ORDER STATUS
// ================================================================

/**
 * Sends a PATCH request to update the status of a single order.
 *
 * TODO:
 *   Call PATCH /api/orders/:id/status with { status } in the body.
 *   On success, show a brief toast notification.
 *   On error, show an error toast and reload the table to reset the select.
 */
async function updateOrderStatus(id, status) {
  try {
    // TODO: Replace with real API call.
    // await apiFetch(`/api/orders/${id}/status`, {
    //   method: 'PATCH',
    //   body: JSON.stringify({ status }),
    // });
    // showToast(`Order #${id} → ${status}`);

    showToast('TODO: Implement PATCH /api/orders/:id/status in Lab 4.', 'error');

  } catch (err) {
    showToast(err.message, 'error');
    loadOrders(); // revert the select
  }
}

// ================================================================
// 5.  DELETE ORDER
// ================================================================

/**
 * Deletes an order by ID.
 *
 * TODO:
 *   Call DELETE /api/orders/:id.
 *   On success, call loadOrders() to refresh the table.
 */
async function deleteOrder(id) {
  if (!confirm(`Delete order #${id}?`)) return;

  try {
    // TODO: Replace with real API call.
    // await apiFetch(`/api/orders/${id}`, { method: 'DELETE' });
    // showToast(`Order #${id} deleted.`);
    // await loadOrders();

    showToast('TODO: Implement DELETE /api/orders/:id in Lab 4.', 'error');

  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ================================================================
// 6.  ESTIMATED TOTAL (real-time UX)
// ================================================================

/**
 * Updates the estimated total shown on the order form
 * based on the selected product and quantity.
 *
 * TODO (Bonus): Fetch the product price from the API
 *   (GET /api/products/:id) and multiply by quantity.
 *   For now, use the hardcoded prices in the <select> options.
 */
const PRODUCT_PRICES = { 1: 999.99, 2: 29.99, 3: 49.99 }; // TODO: fetch dynamically

function updateEstimatedTotal() {
  const productId = parseInt(document.getElementById('orderProductId')?.value);
  const quantity  = parseInt(document.getElementById('orderQuantity')?.value) || 0;
  const el        = document.getElementById('estimatedTotal');
  if (!el) return;

  const price = PRODUCT_PRICES[productId];
  el.textContent = price ? `$${(price * quantity).toFixed(2)}` : '$—';
}

// Wire up real-time total on the order form
document.getElementById('orderProductId')?.addEventListener('change', updateEstimatedTotal);
document.getElementById('orderQuantity')?.addEventListener('input',  updateEstimatedTotal);

// ================================================================
// Helpers
// ================================================================

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

function showMessage(el, type, msg) {
  if (!el) return;
  el.textContent   = msg;
  el.className     = `form-message ${type}`;
  el.style.display = 'block';
}

// ── Init ─────────────────────────────────────────────────────────
loadOrders();
