import { SITE_CONFIG } from "./config.js";
import { TOOLS } from "./tool-registry.js";

export function getRootPrefix() {
  return document.body.dataset.root || "./";
}

export function initShell() {
  const saved = localStorage.getItem("pixelkit-theme");
  if (saved === "dark" || saved === "light") document.documentElement.setAttribute("data-theme", saved);
  renderAnnouncement();
  renderHeader();
  renderFooter();
}
function renderAnnouncement() {
  const mount = document.getElementById("announcement-mount");
  if (!mount || !SITE_CONFIG.announcement.enabled) return;
  if (sessionStorage.getItem("dismiss-ann") === "1") return;
  mount.innerHTML = '<div class="announcement-bar"><div class="announcement-inner"><span><strong>Privacy First:</strong> ' + SITE_CONFIG.announcement.text + '</span><button type="button" class="announcement-close" id="dismiss-ann">✕</button></div></div>';
  document.getElementById("dismiss-ann")?.addEventListener("click", () => {
    sessionStorage.setItem("dismiss-ann", "1");
    mount.innerHTML = "";
  });
}
function renderHeader() {
  const mount = document.getElementById("header-mount");
  if (!mount) return;
  const root = getRootPrefix();
  mount.innerHTML = `
    <header class="site-header">
      <div class="container header-inner">
        <a href="${root}" class="brand-logo">
          <svg viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="14" fill="#2563EB"/><path d="M16 44L26 31L35 42L42 33L48 44H16Z" fill="#fff"/><circle cx="42" cy="22" r="5" fill="#93C5FD"/></svg>
          <span>${SITE_CONFIG.brandName}</span>
        </a>
        <button type="button" class="mobile-menu-toggle" id="mobile-menu-btn">Menu ☰</button>
        <ul class="nav-links" id="primary-nav">
          <li><a href="${root}#all-tools">All Tools (${TOOLS.length})</a></li>
          <li><a href="${root}tools/image-resizer/">Resize</a></li>
          <li><a href="${root}tools/image-compressor/">Compress</a></li>
          <li><a href="${root}tools/target-file-size/">Target KB</a></li>
          <li><a href="${root}tools/passport-photo-maker/">Passport & ID</a></li>
          <li><a href="${root}pages/faq/">FAQ</a></li>
        </ul>
        <div class="header-actions">
          <button type="button" class="btn btn-secondary btn-sm" id="theme-toggle-btn">◐</button>
          <a href="${root}#all-tools" class="btn btn-primary btn-sm">Tools</a>
        </div>
      </div>
    </header>
  `;
  document.getElementById("mobile-menu-btn")?.addEventListener("click", () => {
    document.getElementById("primary-nav")?.classList.toggle("open");
  });
  document.getElementById("theme-toggle-btn")?.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("pixelkit-theme", next);
  });
}
function renderFooter() {
  const mount = document.getElementById("footer-mount");
  if (!mount) return;
  const root = getRootPrefix();
  mount.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <h4>${SITE_CONFIG.brandName}</h4>
            <p>Fast, private, client-side online image utilities powered by native HTML5 Canvas.</p>
          </div>
          <div class="footer-col">
            <h4>Popular Tools</h4>
            <ul>
              <li><a href="${root}tools/image-resizer/">Image Resizer</a></li>
              <li><a href="${root}tools/image-compressor/">Image Compressor</a></li>
              <li><a href="${root}tools/target-file-size/">Target KB Compressor</a></li>
              <li><a href="${root}tools/passport-photo-maker/">Passport Photo Maker</a></li>
              <li><a href="${root}tools/signature-resizer/">Signature Resizer</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>More Utilities</h4>
            <ul>
              <li><a href="${root}tools/image-converter/">Format Converter</a></li>
              <li><a href="${root}tools/image-cropper/">Image Cropper</a></li>
              <li><a href="${root}tools/bulk-image-resizer/">Bulk Image Resizer</a></li>
              <li><a href="${root}tools/collage-maker/">Photo Collage Maker</a></li>
              <li><a href="${root}tools/meme-maker/">Meme Maker</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Info & Legal</h4>
            <ul>
              <li><a href="${root}pages/about/">About</a></li>
              <li><a href="${root}pages/how-to-use/">How to Use</a></li>
              <li><a href="${root}pages/faq/">FAQ</a></li>
              <li><a href="${root}pages/privacy-policy/">Privacy Policy</a></li>
              <li><a href="${root}pages/terms/">Terms</a></li>
              <li><a href="${root}pages/disclaimer/">Disclaimer</a></li>
              <li><a href="${root}pages/contact/">Contact</a></li>
            </ul>
          </div>
        </div>
        <div style="border-top:1px solid var(--border);padding-top:1rem;display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
          <span>© ${new Date().getFullYear()} ${SITE_CONFIG.brandName}.</span>
          <span>100% In-Browser Processing.</span>
        </div>
      </div>
    </footer>
  `;
}
