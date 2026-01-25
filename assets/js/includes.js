// assets/js/includes.js
// Inject HTML partials into any element with [data-include].
// Works with a local server (python http.server, etc.).

export async function includePartials(root = document) {
  const nodes = [...root.querySelectorAll("[data-include]")];

  await Promise.all(
    nodes.map(async (el) => {
      const path = el.getAttribute("data-include");
      if (!path) return;

      try {
        const res = await fetch(path, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const html = await res.text();
        el.innerHTML = html;
      } catch (err) {
        el.innerHTML = `
          <div style="padding:16px;border:1px solid rgba(255,255,255,.12);border-radius:14px;background:rgba(255,0,0,.06);color:rgba(255,255,255,.85)">
            <strong>Erro ao carregar componente:</strong> <code>${path}</code>
          </div>
        `;
        // opcional: log para debug
        console.error("Include failed:", path, err);
      }
    })
  );
}
