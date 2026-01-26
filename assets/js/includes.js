// assets/js/includes.js

function normalizeBase(s) {
  if (!s) return "/";
  return s.replace(/\/+$/, "") + "/";
}

/**
 * Retorna a base do projeto (ex.: "/socapasautomotivas/") para casos onde NÃO
 * existe <base href="..."> no HTML.
 */
export function getBasePath() {
  // 1) Se você quiser forçar via meta (opcional)
  const meta = document.querySelector('meta[name="app-base"]');
  if (meta?.content) return normalizeBase(meta.content);

  // 2) GitHub Pages (project pages)
  const { hostname, pathname } = window.location;
  if (hostname.endsWith("github.io")) {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length > 0) return `/${parts[0]}/`; // "/socapasautomotivas/"
  }

  // 3) Default
  return "/";
}

/**
 * Se o HTML tiver <base href="...">, não precisa mexer em nada:
 * o browser já resolve "./assets/..." corretamente.
 *
 * Só aplicamos base manualmente se NÃO existir <base>.
 */
export function withBase(path) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;

  const baseTag = document.querySelector("base[href]");
  if (baseTag) {
    // Com <base>, caminhos relativos já funcionam.
    // Se vier algum absoluto do tipo "/assets/...", deixamos como está
    // porque o fixLinksToBase vai tratar somente se necessário.
    return path;
  }

  const BASE = getBasePath();

  if (path.startsWith("/")) return BASE + path.replace(/^\/+/, "");
  if (path.startsWith("./")) return BASE + path.replace(/^\.\//, "");
  if (path.startsWith("../")) return path; // mantém relativo "pra cima"

  // "assets/..." sem ./ -> corrigimos
  return BASE + path.replace(/^\/+/, "");
}

async function loadPartial(el, url) {
  const finalUrl = withBase(url);

  try {
    const res = await fetch(finalUrl, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    el.innerHTML = await res.text();
    el.removeAttribute("data-include");
  } catch (err) {
    console.error(`Erro ao carregar componente: ${url}`, err);
    el.innerHTML = `<div style="padding:12px;border:1px solid rgba(255,255,255,.1);border-radius:12px;background:rgba(255,255,255,.03);color:rgba(233,238,246,.85)">
      Erro ao carregar componente: <strong>${url}</strong>
    </div>`;
  }
}

/**
 * Esse "fix" só é útil quando dentro dos seus HTMLs/componentes você usa links
 * absolutos tipo "/pages/..." ou "/assets/...".
 *
 * Se você padronizar TUDO em "./pages/..." e "./assets/...", ele quase não faz nada.
 */
function fixLinksToBase(root = document) {
  const baseTag = document.querySelector("base[href]");
  if (baseTag) {
    // Com <base>, o ideal é evitar reescritas agressivas:
    // o browser resolve os relativos sozinho.
    return;
  }

  const BASE = getBasePath();

  root.querySelectorAll('a[href^="/"]').forEach((a) => {
    const href = a.getAttribute("href") || "/";
    if (href.startsWith(BASE)) return;
    a.setAttribute("href", BASE + href.replace(/^\/+/, ""));
  });

  root.querySelectorAll('img[src^="/"]').forEach((img) => {
    const src = img.getAttribute("src") || "/";
    if (src.startsWith(BASE)) return;
    img.setAttribute("src", BASE + src.replace(/^\/+/, ""));
  });
}

export async function includePartials() {
  const nodes = Array.from(document.querySelectorAll("[data-include]"));
  await Promise.all(
    nodes.map((el) => loadPartial(el, el.getAttribute("data-include")))
  );

  fixLinksToBase(document);
}
