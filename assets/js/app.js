// assets/js/app.js
// Catálogo mock + render da Home (Destaques) e hooks de carrinho.
// Base pronta para filtrar por categoria (usaremos no products.html depois).

import {
  addToCart,
  bootstrapCartUI,
  formatBRL,
} from "./cart.js";

/**
 * Catálogo mock
 * cat: tradicional | premium300 | peluciada | acessorios
 */
export const PRODUCTS = [
  {
    id: "trad-hatch",
    cat: "tradicional",
    title: "Capa Tradicional — Hatch",
    price: 380.0,
    oldPrice: 400.0,
    tag: "Sob medida",
    short: "Encaixe firme e visual limpo para o dia a dia.",
    featured: true,
    bestSeller: false,
  },
  {
    id: "prem300-sedan",
    cat: "premium300",
    title: "Capa Premium 300 — Sedan",
    price: 419.9,
    oldPrice: 450.0,
    tag: "Proteção",
    short: "Acabamento reforçado com toque premium.",
    featured: true,
    bestSeller: true,
  },
  {
    id: "pelu-suv",
    cat: "peluciada",
    title: "Capa Premium Peluciada — SUV",
    price: 469.9,
    oldPrice: 499.9,
    tag: "Premium",
    short: "Camada interna macia e caimento impecável.",
    featured: true,
    bestSeller: true,
  },
  {
    id: "moto",
    cat: "tradicional",
    title: "Capa para Motos",
    price: 279.9,
    oldPrice: 299.9,
    tag: "Compacta",
    short: "Prática, resistente e fácil de lavar.",
    featured: true,
    bestSeller: false,
  },

  // extras (para o catálogo depois)
  {
    id: "trad-pickup",
    cat: "tradicional",
    title: "Capa Tradicional — Pickup",
    price: 399.9,
    oldPrice: 429.9,
    tag: "Versátil",
    short: "Proteção consistente com ótimo custo-benefício.",
    featured: false,
    bestSeller: true,
  },
  {
    id: "prem300-crossover",
    cat: "premium300",
    title: "Capa Premium 300 — Crossover",
    price: 439.9,
    oldPrice: 469.9,
    tag: "Premium",
    short: "Para quem quer acabamento e presença premium.",
    featured: false,
    bestSeller: false,
  },
  {
    id: "acess-luva",
    cat: "acessorios",
    title: "Luva de Limpeza (Microfibra)",
    price: 49.9,
    oldPrice: 59.9,
    tag: "Acessório",
    short: "Toque suave para manter o brilho sem riscos.",
    featured: false,
    bestSeller: true,
  },
  {
    id: "acess-spray",
    cat: "acessorios",
    title: "Spray de Proteção (uso externo)",
    price: 79.9,
    oldPrice: 89.9,
    tag: "Acessório",
    short: "Ajuda a conservar e reduzir sujeira no tecido.",
    featured: false,
    bestSeller: false,
  },
];

function productCard(p) {
  const old = p.oldPrice
    ? `<span class="price-old">${formatBRL(p.oldPrice).replace("\u00A0"," ")}</span>`
    : "";

  return `
    <div class="col-12 col-sm-6 col-lg-3">
      <div class="card-dark card-hover p-4 h-100 d-flex flex-column">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <span class="badge badge-soft">${p.tag}</span>
          <span class="small-muted text-uppercase" style="letter-spacing:.12em">${p.cat}</span>
        </div>

        <h5 class="mb-2" style="font-weight:850">${p.title}</h5>
        <p class="text-secondary mb-4">${p.short}</p>

        <div class="mt-auto">
          <div class="mb-3">
            ${old}
            <span class="price">${formatBRL(p.price).replace("\u00A0"," ")}</span>
          </div>

          <div class="d-grid gap-2">
            <a class="btn btn-ghost" href="./pages/product.html?id=${encodeURIComponent(p.id)}">Ver detalhes</a>
            <button class="btn btn-gold" data-add-to-cart="${p.id}">Adicionar ao carrinho</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderHomeFeatured() {
  const grid = document.querySelector("[data-home-grid]");
  if (!grid) return;

  const featured = PRODUCTS.filter((p) => p.featured);
  grid.innerHTML = featured.map(productCard).join("");
}

function bindCartButtons() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add-to-cart]");
    if (!btn) return;

    const id = btn.getAttribute("data-add-to-cart");
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;

    addToCart({
      id: p.id,
      title: p.title,
      price: p.price,
      cat: p.cat,
    });

    // feedback rápido “premium”
    const original = btn.textContent;
    btn.textContent = "Adicionado ✓";
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = original || "Adicionar ao carrinho";
      btn.disabled = false;
    }, 900);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  // atualiza badge + total do carrinho no topo
  bootstrapCartUI();

  // home: destaques
  renderHomeFeatured();

  // hooks do carrinho
  bindCartButtons();
});
