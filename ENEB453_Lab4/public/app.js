// ================================================================
// app.js  –  Shared utilities loaded on every page
// ENEB453 Lab 4 Reference Project
// ================================================================

// ----------------------------------------------------------------
// Simple in-browser cart (uses sessionStorage as a placeholder).
//
// TODO (Lab 4 – Bonus): Replace sessionStorage with real orders
// by calling POST /api/orders when a customer adds to cart.
// ----------------------------------------------------------------

const BASE_URL = ''; // Empty = same origin (http://localhost:3000)

/** Update the cart badge in the navbar */
function updateCartBadge() {
  const cart  = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById('cartCount');
  if (badge) badge.textContent = total;
}

function getCart() {
  try {
    return JSON.parse(sessionStorage.getItem('cart') || '[]');
  } catch {
    return [];
  }
}

function saveCart(cart) {
  sessionStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
}

/**
 * Add a product to the in-browser cart.
 * Called from index.html product cards.
 *
 * TODO (Lab 4): After adding to the local cart, also
 * call POST /api/orders to persist the order in MySQL.
 */
function addToCart(productId, productName = '', price = 0) {
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, name: productName, price, qty: 1 });
  }
  saveCart(cart);

  // Small visual feedback
  showToast(`Added to cart!`);
}

// ----------------------------------------------------------------
// Toast notification
// ----------------------------------------------------------------
function showToast(message, type = 'success') {
  // Remove existing toast
  const old = document.getElementById('snToast');
  if (old) old.remove();

  const toast = document.createElement('div');
  toast.id = 'snToast';
  toast.textContent = message;
  Object.assign(toast.style, {
    position:     'fixed',
    bottom:       '1.5rem',
    right:        '1.5rem',
    background:   type === 'error' ? '#dc2626' : '#16a34a',
    color:        'white',
    padding:      '0.75rem 1.25rem',
    borderRadius: '10px',
    fontSize:     '0.9rem',
    fontWeight:   '600',
    boxShadow:    '0 4px 16px rgba(0,0,0,0.18)',
    zIndex:       '9999',
    transition:   'opacity .3s',
    fontFamily:   'DM Sans, sans-serif',
  });

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 350);
  }, 2500);
}

// ----------------------------------------------------------------
// Generic fetch helper with error handling
//
// TODO (Lab 4): All API calls in product_app.js,
// orders_app.js, and signup_app.js should use this helper
// so errors are handled consistently.
// ----------------------------------------------------------------
async function apiFetch(endpoint, options = {}) {
  const defaultHeaders = { 'Content-Type': 'application/json' };
  const res = await fetch(BASE_URL + endpoint, {
    ...options,
    headers: { ...defaultHeaders, ...(options.headers || {}) },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data.error || data.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

// Run on every page load
updateCartBadge();
