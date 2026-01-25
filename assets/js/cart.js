const CART_KEY = "socapas_cart_v1";

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) ?? [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

export function addToCart(item) {
  const cart = getCart();
  const idx = cart.findIndex(p => p.id === item.id);

  if (idx >= 0) {
    cart[idx].qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  saveCart(cart);
}

export function removeFromCart(id) {
  const cart = getCart().filter(p => p.id !== id);
  saveCart(cart);
}

export function setQty(id, qty) {
  const cart = getCart().map(p => {
    if (p.id === id) return { ...p, qty: Math.max(1, qty) };
    return p;
  });
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

export function getTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((acc, p) => acc + (p.price * p.qty), 0);
  return { subtotal, items: cart.reduce((a,p)=>a+p.qty,0) };
}

export function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function updateCartBadge() {
  const el = document.querySelector("[data-cart-badge]");
  if (!el) return;
  const { items } = getTotals();
  el.textContent = String(items);
  el.style.display = items > 0 ? "inline-flex" : "none";
}
