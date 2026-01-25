// assets/js/includes.js
// Carrega partials em qualquer ambiente:
// - Local (http://localhost:5500/)
// - GitHub Pages (https://danwolker.github.io/socapasautomotivas/)

function getBasePath() {
  // Se você quiser forçar via <meta name="app-base" content="/socapasautomotivas/">
  const meta = document.querySelector('meta[name="app-base"]');
  if (meta?.content) return meta.content.replace(/\/+$/, '') + '/';

  // Detecta automaticamente quando estiver no GitHub Pages
  const path = window.location.pathname; // ex: /socapasautomotivas/pages/products.html
  const parts = path.split('/').filter(Boolean);

  // Se estiver em github.io, o primeiro segmento geralmente é o nome do repo
  // /socapasautomotivas/...
  if (window.location.hostname.endsWith('github.io') && parts.length > 0) {
    return `/${parts[0]}/`;
  }

  // Ambiente “raiz” (local / servidor normal)
  return '/';
}

const BASE = getBasePath();

function normalizeIncludePath(p) {
  // Aceita:
  // /components/x.html   -> BASE + components/x.html
  // components/x.html    -> BASE + components/x.html
  // ./components/x.html  -> BASE + components/x.html
  // ../components/x.html -> resolve relativo pela URL atual (mantém funcionando)
  if (!p) return p;

  // se já for URL absoluta (http/https), não mexe
  if (/^https?:\/\//i.test(p)) return p;

  // se começar com "/", remove e cola no BASE
  if (p.startsWith('/')) return BASE + p.replace(/^\/+/, '');

  // se começar com "./", remove e cola no BASE
  if (p.startsWith('./')) return BASE + p.replace(/^\.\//, '');

  // se for relativo simples "components/x.html"
  if (!p.startsWith('../')) return BASE + p.replace(/^\/+/, '');

  // ../ mantém relativo normal
  return p;
}

async function loadPartial(el, url) {
  const finalUrl = normalizeIncludePath(url);

  try {
    const res = await fetch(finalUrl, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();
    el.innerHTML = html;
    el.removeAttribute('data-include');
  } catch (err) {
    console.error(`Erro ao carregar componente: ${url}`, err);
    el.innerHTML = `<div style="padding:12px;border:1px solid rgba(255,255,255,.1);border-radius:12px;background:rgba(255,255,255,.03);color:rgba(233,238,246,.85)">
      Erro ao carregar componente: <strong>${url}</strong>
    </div>`;
  }
}

export async function includePartials() {
  const nodes = Array.from(document.querySelectorAll('[data-include]'));
  await Promise.all(
    nodes.map((el) => loadPartial(el, el.getAttribute('data-include')))
  );
}
