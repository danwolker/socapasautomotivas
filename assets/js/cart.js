// assets/js/cart.js
// Carrinho "robusto" via localStorage (sem pagamento).
// Mantém badge de quantidade e total no topo (data-cart-badge / data-cart-total).

const CART_KEY = "socapas_cart_v1";

export function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
  updateCartTotal();
}

export function clearCart() {
  saveCart([]);
}

export function addToCart(item) {
  const cart = getCart();
  const idx = cart.findIndex((p) => p.id === item.id);

  if (idx >= 0) {
    cart[idx].qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  saveCart(cart);
}

export function removeFromCart(id) {
  const cart = getCart().filter((p) => p.id !== id);
  saveCart(cart);
}

export function setQty(id, qty) {
  const cart = getCart().map((p) => {
    if (p.id === id) return { ...p, qty: Math.max(1, Number(qty) || 1) };
    return p;
  });
  saveCart(cart);
}

export function getTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((acc, p) => acc + p.price * p.qty, 0);
  const items = cart.reduce((acc, p) => acc + p.qty, 0);
  return { subtotal, items };
}

export function formatBRL(value) {
  const num = Number(value) || 0;
  return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function updateCartBadge() {
  const el = document.querySelector("[data-cart-badge]");
  if (!el) return;

  const { items } = getTotals();
  el.textContent = String(items);
  el.style.display = items > 0 ? "inline-flex" : "none";
}

export function updateCartTotal() {
  const el = document.querySelector("[data-cart-total]");
  if (!el) return;

  const { subtotal } = getTotals();
  // Mantém o formato “R$ 0,00” no topo
  el.textContent = formatBRL(subtotal).replace("\u00A0", " ");
}

// Para garantir que o topo atualize mesmo sem interação
export function bootstrapCartUI() {
  updateCartBadge();
  updateCartTotal();
}
