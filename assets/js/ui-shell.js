import { SITE_CONFIG } from "./config.js";

export function getRootPrefix() {
  return document.body.dataset.root || "./";
}

export function initShell() {
  const saved = localStorage.getItem("pixelkit-theme");
  if (saved === "dark" || saved === "light") document.documentElement.setAttribute("data-theme", saved);
  renderHeader();
  renderFooter();
}

function renderHeader() {
  const mount = document.getElementById("header-mount");
  if (!mount) return;
  const root = getRootPrefix();
  mount.innerHTML = `
    <header class="site-header">
      <div class="container header-inner">
        <a href="${root}" class="brand-logo">
          <svg viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="16" fill="#4F46E5"/><path d="M16 43L26 30L34 40L41 32L48 43H16Z" fill="#fff"/><circle cx="41" cy="23" r="4.5" fill="#A5B4FC"/></svg>
          <span>${SITE_CONFIG.brandName}</span>
          <span class="brand-badge">Studio</span>
        </a>
        <ul class="nav-links" id="primary-nav">
          <li><a href="${root}tools/image-compressor/">Compress</a></li>
          <li><a href="${root}tools/target-file-size/">20KB / 50KB</a></li>
          <li><a href="${root}tools/image-resizer/">Resize</a></li>
          <li><a href="${root}tools/passport-photo-maker/">Passport ID</a></li>
          <li><a href="${root}tools/signature-resizer/">Signature</a></li>
          <li><a href="${root}tools/image-converter/">Convert</a></li>
          <li><a href="${root}tools/bulk-image-resizer/">Bulk ZIP</a></li>
        </ul>
        <div class="header-actions">
          <button type="button" class="icon-btn" id="theme-toggle-btn" aria-label="Toggle theme" title="Toggle Dark/Light Mode">◐</button>
          <button type="button" class="icon-btn mobile-menu-toggle" id="mobile-menu-btn" aria-label="Menu">☰</button>
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
            <h4>${SITE_CONFIG.brandName} Studio</h4>
            <p>100% Client-Side Image Processing. Zero server uploads, zero watermarks, instant local exports.</p>
          </div>
          <div class="footer-col">
            <h4>Top Tools</h4>
            <ul>
              <li><a href="${root}tools/target-file-size/">Compress to 20KB / 50KB</a></li>
              <li><a href="${root}tools/passport-photo-maker/">Passport Photo Maker</a></li>
              <li><a href="${root}tools/signature-resizer/">Signature Resizer</a></li>
              <li><a href="${root}tools/image-resizer/">Image Resizer</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Convert & Batch</h4>
            <ul>
              <li><a href="${root}tools/image-converter/">Format Converter</a></li>
              <li><a href="${root}tools/png-to-jpg/">PNG to JPG</a></li>
              <li><a href="${root}tools/bulk-image-resizer/">Bulk Image Resizer</a></li>
              <li><a href="${root}tools/collage-maker/">Photo Collage Grid</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Legal & Info</h4>
            <ul>
              <li><a href="${root}pages/about/">About</a></li>
              <li><a href="${root}pages/privacy-policy/">Privacy Policy</a></li>
              <li><a href="${root}pages/terms/">Terms</a></li>
              <li><a href="${root}pages/faq/">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div style="border-top:1px solid var(--border);padding-top:1rem;display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
          <span>© ${new Date().getFullYear()} ${SITE_CONFIG.brandName}</span>
          <span>Powered by HTML5 Canvas & Web APIs</span>
        </div>
      </div>
    </footer>
  `;
}
