// ================================================================
// signup_app.js  –  Signup / Customer management page logic
// ENEB453 Lab 4 Reference Project
// ================================================================

// ================================================================
// 1.  HANDLE SIGNUP FORM
// ================================================================

/**
 * Handles the customer registration form submission.
 *
 * TODO:
 *   1. Collect name, email, phone, address from the form.
 *   2. Validate: name and email are required.
 *   3. Call POST /api/customers with the data as JSON.
 *   4. On success (201):
 *        - Show a success message with the assigned customer_id.
 *        - Optionally redirect to index.html after 2 seconds.
 *   5. On duplicate email error (the server returns ER_DUP_ENTRY):
 *        - Show "This email is already registered." in #signupMessage.
 *   6. On other errors: show the error message.
 */
async function handleSignup(event) {
  event.preventDefault();

  const name    = document.getElementById('signupName').value.trim();
  const email   = document.getElementById('signupEmail').value.trim();
  const phone   = document.getElementById('signupPhone').value.trim();
  const address = document.getElementById('signupAddress').value.trim();
  const msgEl   = document.getElementById('signupMessage');
  const btn     = document.getElementById('signupBtn');

  // Clear previous errors
  document.getElementById('nameError').textContent  = '';
  document.getElementById('emailError').textContent = '';

  // Client-side validation
  let valid = true;
  if (!name || name.length < 2) {
    document.getElementById('nameError').textContent = 'Name must be at least 2 characters.';
    valid = false;
  }
  if (!email || !email.includes('@')) {
    document.getElementById('emailError').textContent = 'Please enter a valid email address.';
    valid = false;
  }
  if (!valid) return;

  btn.textContent = 'Creating account…';
  btn.disabled    = true;

  try {
    // TODO: Replace with real API call.
    // const result = await apiFetch('/api/customers', {
    //   method: 'POST',
    //   body: JSON.stringify({ name, email, phone, address }),
    // });
    // showMessage(msgEl, 'success',
    //   `Account created! Your Customer ID is ${result.customer_id}. Redirecting…`);
    // event.target.reset();
    // setTimeout(() => window.location.href = 'index.html', 2000);

    showMessage(msgEl, 'error', 'TODO: Implement POST /api/customers in Lab 4.');

  } catch (err) {
    // TODO: Check if err.message includes 'ER_DUP_ENTRY' or 'Duplicate' to show a
    //       user-friendly message about the email already existing.
    showMessage(msgEl, 'error', err.message);
  } finally {
    btn.textContent = 'Create Account';
    btn.disabled    = false;
  }
}

// ================================================================
// 2.  LOAD ALL CUSTOMERS (Admin view)
// ================================================================

/**
 * Fetches all customers from GET /api/customers and renders
 * rows in #customer-tbody.
 *
 * TODO:
 *   1. Call GET /api/customers using apiFetch.
 *   2. Pass the result to renderCustomers(customers).
 *   3. Handle errors.
 */
async function loadCustomers() {
  const tbody = document.getElementById('customer-tbody');
  if (!tbody) return;

  tbody.innerHTML = `
    <tr>
      <td colspan="6" class="empty-state">
        <div class="spinner"></div>
        <p>Loading customers…</p>
      </td>
    </tr>`;

  try {
    // TODO: Replace with real API call.
    // const customers = await apiFetch('/api/customers');
    // renderCustomers(customers);

    renderCustomers([]); // ← remove when TODO is implemented

  } catch (err) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state" style="color:var(--danger);">
          Failed to load customers: ${err.message}
        </td>
      </tr>`;
  }
}

// ================================================================
// 3.  RENDER CUSTOMERS
// ================================================================

/**
 * Renders customer rows into #customer-tbody.
 *
 * TODO:
 *   Each row needs a "Delete" button that calls deleteCustomer(id).
 *   Warn users that deleting a customer also deletes their orders
 *   (due to ON DELETE CASCADE).
 */
function renderCustomers(customers) {
  const tbody = document.getElementById('customer-tbody');
  if (!tbody) return;

  if (customers.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">No customers yet.</td>
      </tr>`;
    return;
  }

  tbody.innerHTML = customers.map(c => `
    <tr>
      <td><strong>${c.customer_id}</strong></td>
      <td>${escapeHtml(c.name)}</td>
      <td>${escapeHtml(c.email)}</td>
      <td>${escapeHtml(c.phone || '—')}</td>
      <td><small>${formatDate(c.created_at)}</small></td>
      <td>
        <!-- TODO: onclick should call deleteCustomer(${c.customer_id}) -->
        <button class="btn btn-danger btn-sm" onclick="deleteCustomer(${c.customer_id})">
          Delete
        </button>
      </td>
    </tr>
  `).join('');
}

// ================================================================
// 4.  DELETE CUSTOMER
// ================================================================

/**
 * Deletes a customer by ID.
 *
 * TODO:
 *   Call DELETE /api/customers/:id using apiFetch.
 *   Warn: "This will also delete all orders for this customer."
 *   On success, call loadCustomers() to refresh the table.
 */
async function deleteCustomer(id) {
  if (!confirm(`Delete customer #${id}?\n\nWARNING: All orders for this customer will also be deleted.`)) return;

  try {
    // TODO: Replace with real API call.
    // await apiFetch(`/api/customers/${id}`, { method: 'DELETE' });
    // showToast(`Customer #${id} deleted.`);
    // await loadCustomers();

    showToast('TODO: Implement DELETE /api/customers/:id in Lab 4.', 'error');

  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ================================================================
// Helpers
// ================================================================

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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
