// assets/js/products.js
// Catálogo por LINHA (menu) -> carrega APENAS um arquivo de catálogo por vez.
// - ?cat=tradicional | premium300 | peluciada | acessorios
// - Renderiza as CATEGORIAS como cards (não produtos finais)
// - Botão "Ver detalhes" -> /pages/product.html?linha=<linha>&categoria=<id>

import { bootstrapCartUI } from "./cart.js";

const CAT_TO_MODULE = {
  tradicional: () => import("./catalog/tradicional.js").then((m) => m.CATALOG_TRADICIONAL),
  premium300: () => import("./catalog/premium300.js").then((m) => m.CATALOG_PREMIUM300),
  peluciada: () => import("./catalog/peluciada.js").then((m) => m.CATALOG_PELUCIADA),
  acessorios: () => import("./catalog/acessorios.js").then((m) => m.CATALOG_ACESSORIOS),
};

function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function setHeader(meta) {
  const k = document.getElementById("catKicker");
  const t = document.getElementById("catTitle");
  const s = document.getElementById("catSub");

  if (!meta) {
    k.textContent = "Catálogo";
    t.textContent = "PRODUTOS";
    s.textContent = "Escolha sua categoria e veja detalhes.";
    return;
  }

  k.textContent = meta.kicker || "Catálogo";
  t.textContent = meta.title || "PRODUTOS";
  s.textContent = meta.subtitle || "";
}

function setActivePill(cat) {
  const pills = document.querySelectorAll(".cat-pills .pill");
  pills.forEach((a) => a.classList.remove("is-active"));

  // Se não tem cat, marca "Todos"
  if (!cat) {
    const all = [...pills].find((a) => a.getAttribute("href") === "/pages/products.html");
    if (all) all.classList.add("is-active");
    return;
  }

  const active = [...pills].find((a) => (a.getAttribute("href") || "").includes(`?cat=${cat}`));
  if (active) active.classList.add("is-active");
}

function getLineLabel(cat) {
  if (cat === "tradicional") return "Capa Tradicional";
  if (cat === "premium300") return "Capa Premium 300";
  if (cat === "peluciada") return "Capa Premium Peluciada";
  if (cat === "acessorios") return "Acessórios";
  return "Todos";
}

function safeImage(src) {
  // se você ainda não tiver imagens, isso evita quebrar layout
  // e mantém o card premium com placeholder.
  return src || "";
}

function cardHTML(line, c, brl) {
  const hasImg = !!c.image;

  const media = hasImg
    ? `
      <div class="prod-media prod-media--img">
        <img src="${safeImage(c.image)}" alt="${c.name}" loading="lazy" />
        <div class="prod-media-chip">${c.tag || "Premium"}</div>
      </div>
    `
    : `
      <div class="prod-media">
        <div class="prod-media-glow"></div>
        <div class="prod-media-mark">SoCapas</div>
        <div class="prod-media-chip">${c.tag || "Premium"}</div>
      </div>
    `;

  const price = typeof c.fromPrice === "number" ? brl(c.fromPrice) : "Sob consulta";

  return `
    <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
      <article class="prod-card card-dark card-hover p-4 h-100 d-flex flex-column" data-reveal>
        ${media}

        <div class="d-flex justify-content-between align-items-start mt-3 mb-2">
          <span class="badge badge-soft">${c.tag || "Destaque"}</span>
          <span class="small-muted text-uppercase" style="letter-spacing:.12em">${line}</span>
        </div>

        <h3 class="prod-title mb-2">${c.name}</h3>
        <p class="text-secondary prod-desc mb-4">${c.desc || ""}</p>

        <div class="mt-auto">
          <div class="mb-3 d-flex align-items-baseline gap-2 flex-wrap">
            <span class="small-muted">a partir de</span>
            <span class="price">${price}</span>
          </div>

          <div class="d-grid gap-2">
            <a
              class="btn btn-ghost"
              href="/pages/product.html?linha=${encodeURIComponent(line)}&categoria=${encodeURIComponent(c.id)}"
            >
              Ver detalhes
            </a>
          </div>
        </div>
      </article>
    </div>
  `;
}

function revealOnScroll() {
  const els = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((ent) => {
        if (ent.isIntersecting) {
          ent.target.classList.add("is-visible");
          io.unobserve(ent.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => io.observe(el));
}

async function loadCatalogByCat(cat) {
  if (!cat || !CAT_TO_MODULE[cat]) return null;
  return await CAT_TO_MODULE[cat]();
}

function showLoading(on) {
  const skel = document.getElementById("productsSkeleton");
  const grid = document.getElementById("productsGrid");
  const empty = document.getElementById("emptyState");

  if (on) {
    if (skel) skel.style.display = "flex";
    if (grid) grid.style.display = "none";
    if (empty) empty.style.display = "none";
  } else {
    if (skel) skel.style.display = "none";
  }
}

async function render() {
  const cat = (qs("cat") || "").trim();

  const info = document.getElementById("resultsInfo");
  const grid = document.getElementById("productsGrid");
  const empty = document.getElementById("emptyState");

  showLoading(true);

  // Se não vier cat, a gente pode cair no "tradicional" como default,
  // ou deixar "Todos" (mas você quer menu bem definido).
  // Aqui vou usar "tradicional" como default pra manter UX mais firme.
  const effectiveCat = cat && CAT_TO_MODULE[cat] ? cat : "tradicional";

  const catalog = await loadCatalogByCat(effectiveCat);

  // Header + pills
  setHeader(catalog);
  setActivePill(effectiveCat);

  if (!catalog || !Array.isArray(catalog.categories)) {
    showLoading(false);
    if (grid) grid.style.display = "none";
    if (empty) empty.style.display = "block";
    if (info) info.textContent = "0 resultados";
    return;
  }

  const lineLabel = getLineLabel(effectiveCat);
  const brl = catalog.format?.brl || ((v) => `${v}`);

  // render
  const list = catalog.categories;

  showLoading(false);

  if (!list.length) {
    if (grid) grid.style.display = "none";
    if (empty) empty.style.display = "block";
    if (info) info.textContent = `0 resultados em "${lineLabel}"`;
    return;
  }

  if (empty) empty.style.display = "none";
  if (grid) {
    grid.style.display = "flex";
    grid.innerHTML = list.map((c) => cardHTML(lineLabel, c, brl)).join("");
  }

  if (info) info.textContent = `${list.length} categoria(s) em "${lineLabel}"`;

  revealOnScroll();
}

function init() {
  bootstrapCartUI();
  render();
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("partials:loaded", init);
