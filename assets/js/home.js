import { initShell, getRootPrefix } from "./ui-shell.js";
import { TOOLS, TOOL_CATEGORIES } from "./tool-registry.js";
import { validateAndDecodeFile, formatBytes, getAspectRatioString } from "./image-engine.js";

document.addEventListener("DOMContentLoaded", () => {
  initShell();
  const popMount = document.getElementById("popular-tools-grid");
  if (popMount) popMount.innerHTML = TOOLS.filter((t) => t.popular).map(cardHTML).join("");
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
    if (sClear) sClear.style.display = sInput.value ? "block" : "none";
    renderDir(activeCat, sInput.value);
  });
  sClear?.addEventListener("click", () => {
    sInput.value = ""; sClear.style.display = "none"; renderDir(activeCat, "");
  });
  const qFile = document.getElementById("hero-quick-file");
  const qRes = document.getElementById("hero-quick-result");
  qFile?.addEventListener("change", async () => {
    const f = qFile.files?.[0];
    if (!f) return;
    try {
      const info = await validateAndDecodeFile(f);
      qRes.innerHTML = '<div style="margin-top:0.75rem;padding:0.7rem;background:var(--bg-surface);border-radius:6px;border:1px solid var(--border);font-size:0.84rem;"><strong>' + info.name + '</strong><br>' + info.width + ' × ' + info.height + ' px (' + getAspectRatioString(info.width, info.height) + ') • ' + formatBytes(info.size) + '</div>';
      URL.revokeObjectURL(info.objectUrl);
    } catch (err) {
      qRes.innerHTML = '<p style="color:var(--error);font-size:0.84rem;margin-top:0.5rem;">' + err.message + '</p>';
    }
  });
});

function cardHTML(tool) {
  const root = getRootPrefix();
  const cat = TOOL_CATEGORIES.find((c) => c.id === tool.category);
  return '<a href="' + root + 'tools/' + tool.id + '/" class="tool-card"><div class="tool-card-top"><span class="tool-icon">' + tool.icon + '</span><span class="badge">' + (cat ? cat.name : tool.category) + '</span></div><h3>' + tool.title + '</h3><p>' + tool.shortDesc + '</p></a>';
}
function renderDir(cat, q) {
  const mount = document.getElementById("all-tools-grid");
  const empty = document.getElementById("search-empty-state");
  const count = document.getElementById("tools-count-label");
  if (!mount) return;
  const query = q.trim().toLowerCase();
  const list = TOOLS.filter((t) => (cat === "all" || t.category === cat) && (!query || t.title.toLowerCase().includes(query) || t.shortDesc.toLowerCase().includes(query) || t.keywords.some((k) => k.includes(query))));
  if (count) count.textContent = "Showing " + list.length + " of " + TOOLS.length + " tools";
  if (!list.length) { mount.innerHTML = ""; if (empty) empty.style.display = "block"; }
  else { if (empty) empty.style.display = "none"; mount.innerHTML = list.map(cardHTML).join(""); }
}
