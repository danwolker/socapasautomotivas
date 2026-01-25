// assets/js/catalog/page-catalog.js

const brl = (v) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(str) {
  return escapeHtml(str);
}

async function loadJson(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Falha ao carregar ${path} (HTTP ${res.status}) ${txt}`);
  }
  return await res.json();
}

function setActiveNavByKey(activeKey) {
  document.querySelectorAll(".navbar .nav-link").forEach((a) => {
    a.classList.remove("active");
    a.removeAttribute("aria-current");
  });

  const link = document.querySelector(`.navbar .nav-link[data-nav="${activeKey}"]`);
  if (link) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
}

function renderCards(items) {
  const grid = document.querySelector("[data-products-grid]");
  if (!grid) return;

  grid.innerHTML = items
    .map((it) => {
      const price = typeof it.fromPrice === "number" ? brl(it.fromPrice) : "";
      const tag = it.tag
        ? `<span class="badge text-bg-warning">${escapeHtml(it.tag)}</span>`
        : "";
      const img = it.image || "/assets/img/products/placeholder.jpg";

      return `
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
          <article class="card-dark p-4 h-100">
            <div class="ratio ratio-4x3 rounded-4 overflow-hidden mb-3">
              <img
                src="${escapeAttr(img)}"
                alt="${escapeAttr(it.name || "")}"
                loading="lazy"
                style="object-fit:cover;width:100%;height:100%;"
              />
            </div>

            <div class="d-flex align-items-start justify-content-between gap-2 mb-2">
              <h3 class="h6 fw-bold mb-0">${escapeHtml(it.name || "")}</h3>
              ${tag}
            </div>

            <div class="small text-secondary mb-3">${escapeHtml(it.desc || "")}</div>

            <div class="d-flex align-items-center justify-content-between mt-auto pt-2">
              <div class="small-muted">A partir de</div>
              <div class="fw-bold">${price}</div>
            </div>
          </article>
        </div>
      `;
    })
    .join("");
}

function setText(sel, value) {
  const el = document.querySelector(sel);
  if (el) el.textContent = value ?? "";
}

export async function initCatalogPage({ jsonPath, activeNavKey }) {
  const skeleton = document.querySelector("[data-products-skeleton]");
  const grid = document.querySelector("[data-products-grid]");
  const empty = document.querySelector("[data-products-empty]");
  const info = document.querySelector("[data-products-info]");

  // estado inicial
  if (skeleton) skeleton.style.display = "";
  if (grid) grid.style.display = "none";
  if (empty) empty.style.display = "none";
  if (info) info.textContent = "Carregando...";

  try {
    const data = await loadJson(jsonPath);

    // textos
    setText("[data-products-kicker]", data.kicker || "Catálogo");
    setText("[data-products-title]", data.title || "PRODUTOS");
    setText("[data-products-sub]", data.subtitle || "");

    // nav ativo
    setActiveNavByKey(activeNavKey);

    const items = Array.isArray(data.categories) ? data.categories : [];

    if (!items.length) {
      if (info) info.textContent = "Nenhum item encontrado";
      if (skeleton) skeleton.style.display = "none";
      if (grid) grid.style.display = "none";
      if (empty) empty.style.display = "";
      return;
    }

    if (info) info.textContent = `${items.length} itens disponíveis`;

    renderCards(items);

    if (skeleton) skeleton.style.display = "none";
    if (empty) empty.style.display = "none";
    if (grid) grid.style.display = "";
  } catch (err) {
    if (info) info.textContent = `Erro ao carregar catálogo.`;
    if (skeleton) skeleton.style.display = "none";
    if (grid) grid.style.display = "none";
    if (empty) empty.style.display = "";

    // deixa um erro visível no console pra depurar rápido
    console.error(err);
  }
}
