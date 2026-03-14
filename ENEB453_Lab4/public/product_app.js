// ================================================================
// product_app.js  –  Products page logic
// ENEB453 Lab 4 Reference Project
//
// In Lab 3 this file used an in-memory array.
// In Lab 4 every operation calls the Express REST API.
// ================================================================

// ----------------------------------------------------------------
// State
// ----------------------------------------------------------------
let allProducts = [];      // local cache of products from the API
let editingId   = null;    // null = adding, number = editing

// ================================================================
// 1.  LOAD PRODUCTS
// ================================================================

/**
 * Fetches all products from the backend and renders them.
 *
 * TODO: Complete this function.
 *   1. Call GET /api/products (use apiFetch from app.js).
 *   2. Store the result in allProducts.
 *   3. Call renderProducts(allProducts).
 *   4. Update the product count label (#productCount).
 *   5. Handle errors – show a message in #product-list.
 */
async function loadProducts(search = '') {
  const grid = document.getElementById('product-list');
  if (!grid) return;

  // Show loading spinner
  grid.innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Loading products…</p>
    </div>`;

  try {
    // TODO: Build the endpoint URL.
    //       If search is not empty, append ?search=<search> to the URL.
    const endpoint = search ? `/api/products?search=${encodeURIComponent(search)}` : '/api/products';

    // TODO: Replace this placeholder with a real apiFetch call.
    // allProducts = await apiFetch(endpoint);
    allProducts = []; // ← remove this line when you implement the TODO above

    renderProducts(allProducts);

    const countEl = document.getElementById('productCount');
    if (countEl) countEl.textContent = `Showing ${allProducts.length} product${allProducts.length !== 1 ? 's' : ''}`;

  } catch (err) {
    grid.innerHTML = `<p style="color:var(--danger);padding:2rem;">Failed to load products: ${err.message}</p>`;
  }
}

// ================================================================
// 2.  RENDER PRODUCTS
// ================================================================

/**
 * Renders an array of product objects as cards in #product-list.
 *
 * TODO: Each card must include:
 *   - Product name, description, price, stock quantity.
 *   - An "Edit" button that calls editProduct(product).
 *   - A "Delete" button that calls deleteProduct(product.product_id).
 *   - An "Add to Cart" button that calls addToCart(product.product_id).
 */
function renderProducts(products) {
  const grid = document.getElementById('product-list');
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="loading-state">
        <p>No products found.</p>
      </div>`;
    return;
  }

  // TODO: Replace the placeholder HTML below with a real template
  //       that uses data from the products array.
  grid.innerHTML = products.map((p, i) => `
    <div class="product-card" style="animation-delay:${i * 0.05}s">
      <div class="product-img">${getProductEmoji(p.name)}</div>
      <div class="product-info">
        <h3>${escapeHtml(p.name)}</h3>
        <p class="product-desc">${escapeHtml(p.description || 'No description.')}</p>
        <p class="stock-info">In stock: ${p.stock_quantity ?? '—'}</p>
        <div class="product-footer">
          <span class="price">$${Number(p.price).toFixed(2)}</span>
          <div style="display:flex;gap:.4rem;">
            <button class="btn btn-sm btn-outline" onclick="editProduct(${JSON.stringify(p).replace(/"/g, '&quot;')})">Edit</button>
            <button class="btn btn-sm btn-danger"  onclick="deleteProduct(${p.product_id})">Delete</button>
          </div>
        </div>
        <button class="btn btn-sm btn-primary" style="width:100%;margin-top:.6rem;"
          onclick="addToCart(${p.product_id}, '${escapeHtml(p.name)}', ${p.price})">
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

// ================================================================
// 3.  ADD / EDIT PRODUCT (Form Submit)
// ================================================================

/**
 * Handles the product form submission.
 * Decides whether to CREATE (POST) or UPDATE (PUT) based on editingId.
 *
 * TODO:
 *   - Collect values from #productName, #productPrice,
 *     #productStock, #productDesc.
 *   - If editingId is null  → call POST /api/products.
 *   - If editingId is a number → call PUT /api/products/:id.
 *   - On success: reload the product list, reset the form,
 *     and show a success message in #formMessage.
 *   - On error: show the error message in #formMessage.
 */
async function handleProductSubmit(event) {
  event.preventDefault();

  const name        = document.getElementById('productName').value.trim();
  const price       = parseFloat(document.getElementById('productPrice').value);
  const stock       = parseInt(document.getElementById('productStock').value) || 0;
  const description = document.getElementById('productDesc').value.trim();

  const msgEl = document.getElementById('formMessage');

  // Basic client-side validation
  if (!name || isNaN(price) || price < 0) {
    showMessage(msgEl, 'error', 'Please provide a valid name and price.');
    return;
  }

  const body = { name, price, stock_quantity: stock, description };

  try {
    if (editingId === null) {
      // ── CREATE ──────────────────────────────────────────────
      // TODO: Call POST /api/products with body using apiFetch.
      // const result = await apiFetch('/api/products', { method: 'POST', body: JSON.stringify(body) });
      // showMessage(msgEl, 'success', `Product added! ID: ${result.product_id}`);

      showMessage(msgEl, 'error', 'TODO: Implement POST /api/products in Lab 4.');

    } else {
      // ── UPDATE ──────────────────────────────────────────────
      // TODO: Call PUT /api/products/:id with body using apiFetch.
      // await apiFetch(`/api/products/${editingId}`, { method: 'PUT', body: JSON.stringify(body) });
      // showMessage(msgEl, 'success', 'Product updated successfully.');

      showMessage(msgEl, 'error', 'TODO: Implement PUT /api/products/:id in Lab 4.');
    }

    resetForm();
    await loadProducts();

  } catch (err) {
    showMessage(msgEl, 'error', err.message);
  }
}

// ================================================================
// 4.  EDIT – pre-fill the form
// ================================================================

/**
 * Populates the form with an existing product's data for editing.
 *
 * TODO: This function already sets up the form UI.
 *       Make sure handleProductSubmit sends a PUT when editingId is set.
 */
function editProduct(product) {
  editingId = product.product_id;

  document.getElementById('editProductId').value = product.product_id;
  document.getElementById('productName').value   = product.name;
  document.getElementById('productPrice').value  = product.price;
  document.getElementById('productStock').value  = product.stock_quantity || 0;
  document.getElementById('productDesc').value   = product.description || '';

  document.getElementById('formTitle').textContent  = '✏️ Edit Product';
  document.getElementById('submitBtn').textContent  = 'Save Changes';
  document.getElementById('cancelBtn').style.display = 'inline-flex';

  document.getElementById('productForm').scrollIntoView({ behavior: 'smooth' });
}

function cancelEdit() {
  resetForm();
}

function resetForm() {
  editingId = null;
  document.getElementById('productForm').reset();
  document.getElementById('editProductId').value    = '';
  document.getElementById('formTitle').textContent  = '➕ Add New Product';
  document.getElementById('submitBtn').textContent  = 'Add Product';
  document.getElementById('cancelBtn').style.display = 'none';
  document.getElementById('formMessage').style.display = 'none';
}

// ================================================================
// 5.  DELETE PRODUCT
// ================================================================

/**
 * Deletes a product by ID.
 *
 * TODO: Call DELETE /api/products/:id using apiFetch.
 *       On success, call loadProducts() to refresh the grid.
 *       On error, show a toast with showToast(msg, 'error').
 */
async function deleteProduct(id) {
  if (!confirm('Delete this product? Any related orders will also be removed.')) return;

  try {
    // TODO: Implement the DELETE call.
    // await apiFetch(`/api/products/${id}`, { method: 'DELETE' });
    // showToast('Product deleted.');
    // await loadProducts();

    showToast('TODO: Implement DELETE /api/products/:id in Lab 4.', 'error');

  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ================================================================
// 6.  SEARCH
// ================================================================

let searchTimer;

/**
 * Debounced search – waits 350ms after the user stops typing
 * before calling the API.
 *
 * TODO: Confirm that loadProducts(term) passes the search
 *       parameter to GET /api/products?search=<term>.
 */
function handleSearch(term) {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    loadProducts(term.trim());
  }, 350);
}

// ================================================================
// Helpers
// ================================================================

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getProductEmoji(name = '') {
  const n = name.toLowerCase();
  if (n.includes('laptop') || n.includes('computer')) return '🖥️';
  if (n.includes('mouse'))   return '🖱️';
  if (n.includes('hub') || n.includes('usb')) return '🔌';
  if (n.includes('keyboard')) return '⌨️';
  if (n.includes('monitor') || n.includes('screen')) return '🖥️';
  if (n.includes('headphone') || n.includes('audio')) return '🎧';
  if (n.includes('phone'))   return '📱';
  return '📦';
}

function showMessage(el, type, msg) {
  if (!el) return;
  el.textContent     = msg;
  el.className       = `form-message ${type}`;
  el.style.display   = 'block';
}

// ── Init ─────────────────────────────────────────────────────────
loadProducts();
