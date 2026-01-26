// assets/js/includes.js

function normalizeBase(s) {
  if (!s) return "/";
  return s.replace(/\/+$/, "") + "/";
}

function getBaseHref() {
  const base = document.querySelector("base[href]");
  if (!base) return null;

  // base.href sempre vira absoluto (ex: https://danwolker.github.io/socapasautomotivas/)
  // então a gente usa isso como raiz confiável.
  return base.href;
}

/**
 * Monta uma URL absoluta a partir de um caminho relativo/absoluto,
 * respeitando <base href="..."> quando existir.
 */
export function toAbsUrl(path) {
  if (!path) return path;

  // já é URL absoluta (http/https)
  if (/^https?:\/\//i.test(path)) return path;

  const baseHref = getBaseHref();
  const base = baseHref || window.location.origin + getBasePath(); // fallback

  // new URL resolve "./", "../", "assets/..." etc.
  return new URL(path, base).toString();
}

/**
 * Retorna a base do projeto (ex.: "/socapasautomotivas/") apenas como fallback.
 * Se existir <base>, a resolução principal vai usar base.href.
 */
export function getBasePath() {
  const meta = document.querySelector('meta[name="app-base"]');
  if (meta?.content) return normalizeBase(meta.content);

  const { hostname, pathname } = window.location;

  if (hostname.endsWith("github.io")) {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length > 0) return `/${parts[0]}/`;
  }

  return "/";
}

/**
 * Mantemos withBase por compatibilidade com seu código antigo,
 * mas agora ela só garante "./" quando necessário e converte pra absoluto.
 */
export function withBase(path) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;

  // Se vier "assets/..." sem ./, corrigimos para "./assets/..."
  const normalized =
    path.startsWith("assets/") ? `./${path}` :
    path.startsWith("components/") ? `./${path}` :
    path;

  return toAbsUrl(normalized);
}

async function loadPartial(el, url) {
  const finalUrl = withBase(url);

  try {
    const res = await fetch(finalUrl, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status} (${finalUrl})`);

    el.innerHTML = await res.text();
    el.removeAttribute("data-include");
  } catch (err) {
    console.error(`Erro ao carregar componente: ${url}`, err);
    el.innerHTML = `
      <div style="padding:12px;border:1px solid rgba(255,255,255,.1);border-radius:12px;background:rgba(255,255,255,.03);color:rgba(233,238,246,.85)">
        Erro ao carregar componente: <strong>${url}</strong>
      </div>
    `;
  }
}

/**
 * Reescreve href/src relativos dentro dos componentes para ficarem consistentes.
 * Aqui o segredo é: NÃO mexer em hash (#), mailto, tel, http(s) etc.
 */
function fixComponentLinks(root = document) {
  // Corrige <a href="assets/..."> => "./assets/..."
  root.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href") || "";

    if (!href) return;
    if (href.startsWith("#")) return;
    if (/^(mailto:|tel:|https?:\/\/)/i.test(href)) return;

    // Se for "assets/..." ou "pages/..." sem ./, padroniza
    if (
      href.startsWith("assets/") ||
      href.startsWith("pages/") ||
      href.startsWith("components/")
    ) {
      a.setAttribute("href", `./${href}`);
    }
  });

  root.querySelectorAll("img[src]").forEach((img) => {
    const src = img.getAttribute("src") || "";
    if (!src) return;
    if (/^https?:\/\//i.test(src)) return;

    if (src.startsWith("assets/") || src.startsWith("components/")) {
      img.setAttribute("src", `./${src}`);
    }
  });
}

export async function includePartials() {
  const nodes = Array.from(document.querySelectorAll("[data-include]"));

  // carrega tudo
  await Promise.all(nodes.map((el) => loadPartial(el, el.getAttribute("data-include"))));

  // corrige links internos dos componentes
  fixComponentLinks(document);

  // evento global: o DOM já tem navbar/footer e afins
  window.dispatchEvent(new Event("partials:loaded"));
}
