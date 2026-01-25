// assets/js/includes.js

export function getBasePath() {
  const meta = document.querySelector('meta[name="app-base"]');
  if (meta?.content) return meta.content.replace(/\/+$/, '') + '/';

  const { hostname, pathname } = window.location;

  if (hostname.endsWith('github.io')) {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length > 0) return `/${parts[0]}/`; // "/socapasautomotivas/"
  }

  return '/';
}

export function withBase(path) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;

  const BASE = getBasePath();

  if (path.startsWith('/')) return BASE + path.replace(/^\/+/, '');
  if (path.startsWith('./')) return BASE + path.replace(/^\.\//, '');

  if (!path.startsWith('../')) return BASE + path.replace(/^\/+/, '');

  return path;
}

async function loadPartial(el, url) {
  const finalUrl = withBase(url);

  try {
    const res = await fetch(finalUrl, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    el.innerHTML = await res.text();
    el.removeAttribute('data-include');
  } catch (err) {
    console.error(`Erro ao carregar componente: ${url}`, err);
    el.innerHTML = `<div style="padding:12px;border:1px solid rgba(255,255,255,.1);border-radius:12px;background:rgba(255,255,255,.03);color:rgba(233,238,246,.85)">
      Erro ao carregar componente: <strong>${url}</strong>
    </div>`;
  }
}

function fixLinksToBase(root = document) {
  const BASE = getBasePath();

  // Reescreve links que começam com "/" para respeitar o repo do Pages
  root.querySelectorAll('a[href^="/"]').forEach((a) => {
    const href = a.getAttribute('href') || '/';
    if (href.startsWith(BASE)) return; // já está ok
    a.setAttribute('href', withBase(href));
  });

  // Reescreve imagens absolutas também (se você usar "/assets/img/...")
  root.querySelectorAll('img[src^="/"]').forEach((img) => {
    const src = img.getAttribute('src') || '/';
    if (src.startsWith(BASE)) return;
    img.setAttribute('src', withBase(src));
  });
}

export async function includePartials() {
  const nodes = Array.from(document.querySelectorAll('[data-include]'));
  await Promise.all(nodes.map((el) => loadPartial(el, el.getAttribute('data-include'))));

  // Depois de injetar HTML, corrige os href/src absolutos
  fixLinksToBase(document);
}
