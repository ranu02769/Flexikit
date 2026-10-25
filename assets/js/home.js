import { initShell, getRootPrefix } from "./ui-shell.js";
import { TOOLS, TOOL_CATEGORIES, ICONS } from "./tool-registry.js";

document.addEventListener("DOMContentLoaded", () => {
  initShell();
  let activeCat = "all";
  const pillsMount = document.getElementById("category-pills");
  if (pillsMount) {
    pillsMount.innerHTML = TOOL_CATEGORIES.map((c) => '<button type="button" class="pill ' + (c.id === "all" ? "active" : "") + '" data-cat="' + c.id + '">' + c.name + '</button>').join("");
    pillsMount.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-cat]");
      if (!btn) return;
      activeCat = btn.dataset.cat;
      pillsMount.querySelectorAll(".pill").forEach((p) => p.classList.toggle("active", p === btn));
      renderDir(activeCat, document.getElementById("tool-search-input")?.value || "");
    });
  }
  renderDir("all", "");

  const sInput = document.getElementById("tool-search-input");
  const sClear = document.getElementById("tool-search-clear");
  sInput?.addEventListener("input", () => {
    if (sClear) sClear.style.display = sInput.value ? "inline-flex" : "none";
    renderDir(activeCat, sInput.value);
  });
  sClear?.addEventListener("click", () => {
    sInput.value = "";
    sClear.style.display = "none";
    renderDir(activeCat, "");
    sInput.focus();
  });
});

function cardHTML(tool) {
  const root = getRootPrefix();
  const svg = ICONS[tool.iconKey] || ICONS.resize;
  return `
    <a href="${root}tools/${tool.id}/" class="tool-card">
      <div class="tool-icon">${svg}</div>
      <div class="tool-card-body">
        <div class="tool-card-title-row">
          <h3>${tool.title}</h3>
          ${tool.popular ? '<span class="hot-badge">Popular</span>' : ''}
        </div>
        <p>${tool.shortDesc}</p>
      </div>
    </a>
  `;
}

function renderDir(cat, q) {
  const mount = document.getElementById("all-tools-grid");
  const empty = document.getElementById("search-empty-state");
  const count = document.getElementById("tools-count-label");
  if (!mount) return;
  const query = q.trim().toLowerCase();
  const list = TOOLS.filter((t) => (cat === "all" || t.category === cat) && (!query || t.title.toLowerCase().includes(query) || t.shortDesc.toLowerCase().includes(query) || t.keywords.some((k) => k.includes(query))));
  if (count) count.textContent = list.length + " Tools";
  if (!list.length) {
    mount.innerHTML = "";
    if (empty) empty.style.display = "block";
  } else {
    if (empty) empty.style.display = "none";
    mount.innerHTML = list.map(cardHTML).join("");
  }
}
