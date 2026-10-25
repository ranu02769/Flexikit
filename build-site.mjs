import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
function write(relPath, content) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trimStart(), "utf8");
}

// 1. Root Static Assets
write("favicon.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <defs>
    <linearGradient id="pkGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop stop-color="#4F46E5"/>
      <stop offset="1" stop-color="#2563EB"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="url(#pkGrad)"/>
  <rect x="12" y="12" width="40" height="40" rx="9" stroke="#ffffff" stroke-width="3.5" stroke-opacity="0.9"/>
  <path d="M16 43L26 30L34 40L41 32L48 43H16Z" fill="#ffffff"/>
  <circle cx="41" cy="23" r="4.5" fill="#A5B4FC"/>
</svg>
`);

write("manifest.webmanifest", JSON.stringify({
  name: "PixelKit Studio — Free Image Tools",
  short_name: "PixelKit",
  description: "Fast, private, app-grade image resizer, compressor, cropper & converter.",
  start_url: "./",
  display: "standalone",
  background_color: "#F8FAFC",
  theme_color: "#4F46E5",
  icons: [{ src: "./favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any maskable" }]
}, null, 2));

write("robots.txt", `
User-agent: *
Allow: /

Sitemap: https://pixelkit.pages.dev/sitemap.xml
`);

write("_headers", `
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
`);

// 2. First-Class App UI CSS Design System
write("assets/css/main.css", `
:root {
  --bg-page: #f8fafc;
  --bg-surface: #ffffff;
  --bg-glass: rgba(255, 255, 255, 0.86);
  --bg-subtle: #f1f5f9;
  --bg-hover: #e2e8f0;
  --bg-studio: #0f172a;
  --text-main: #0f172a;
  --text-muted: #475569;
  --text-light: #64748b;
  --primary: #4f46e5;
  --primary-hover: #4338ca;
  --primary-soft: #eef2ff;
  --primary-border: #c7d2fe;
  --border: #e2e8f0;
  --border-strong: #cbd5e1;
  --success: #059669;
  --success-bg: #ecfdf5;
  --warning: #d97706;
  --warning-bg: #fffbeb;
  --error: #dc2626;
  --error-bg: #fef2f2;
  --container-max: 1220px;
  --radius-xs: 6px;
  --radius-sm: 10px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --shadow-xs: 0 1px 2px rgba(15, 23, 42, 0.04);
  --shadow-sm: 0 4px 12px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04);
  --shadow-md: 0 12px 24px -4px rgba(15, 23, 42, 0.08), 0 4px 8px -2px rgba(15, 23, 42, 0.04);
  --shadow-primary: 0 6px 16px -3px rgba(79, 70, 229, 0.35);
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif;
  --transition: 160ms cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="dark"] {
  --bg-page: #090d16;
  --bg-surface: #111827;
  --bg-glass: rgba(17, 24, 39, 0.86);
  --bg-subtle: #1e293b;
  --bg-hover: #334155;
  --bg-studio: #060911;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --text-light: #64748b;
  --primary: #6366f1;
  --primary-hover: #818cf8;
  --primary-soft: rgba(99, 102, 241, 0.14);
  --primary-border: rgba(99, 102, 241, 0.35);
  --border: #1e293b;
  --border-strong: #334155;
  --success: #34d399;
  --success-bg: rgba(5, 150, 105, 0.16);
  --warning: #fbbf24;
  --warning-bg: rgba(217, 119, 6, 0.16);
  --error: #f87171;
  --error-bg: rgba(220, 38, 38, 0.16);
  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 12px 24px rgba(0, 0, 0, 0.45);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-family: var(--font-sans); color: var(--text-main); background-color: var(--bg-page); line-height: 1.5; -webkit-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; }
body { min-height: 100vh; display: flex; flex-direction: column; overflow-x: hidden; }
a { color: inherit; text-decoration: none; }
img, svg, canvas { max-width: 100%; display: block; }
button, input, select, textarea { font: inherit; color: inherit; }
button { cursor: pointer; background: none; border: none; }
:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0; }

.container { width: 100%; max-width: var(--container-max); margin: 0 auto; padding: 0 1.25rem; }

/* Frosted Glass App Header */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-glass);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  gap: 1rem;
}
.brand-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 800;
  font-size: 1.15rem;
  letter-spacing: -0.02em;
  color: var(--text-main);
}
.brand-logo svg { width: 30px; height: 30px; border-radius: 8px; }
.brand-badge {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  background: var(--primary-soft);
  color: var(--primary);
}
.nav-links { display: flex; align-items: center; gap: 0.25rem; list-style: none; }
.nav-links a {
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.88rem;
  padding: 0.45rem 0.75rem;
  border-radius: var(--radius-xs);
  transition: all var(--transition);
}
.nav-links a:hover { color: var(--text-main); background: var(--bg-subtle); }
.header-actions { display: flex; align-items: center; gap: 0.5rem; }
.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-xs);
  border: 1px solid var(--border);
  background: var(--bg-surface);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: all var(--transition);
}
.icon-btn:hover { color: var(--text-main); border-color: var(--border-strong); background: var(--bg-subtle); }
.mobile-menu-toggle { display: none; }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.65rem 1.15rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 0.9rem;
  border: 1px solid transparent;
  transition: all var(--transition);
  white-space: nowrap;
}
.btn:active:not(:disabled) { transform: scale(0.98); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-primary {
  background: var(--primary);
  color: #ffffff;
  box-shadow: var(--shadow-primary);
}
.btn-primary:hover:not(:disabled) { background: var(--primary-hover); }
.btn-secondary {
  background: var(--bg-surface);
  color: var(--text-main);
  border-color: var(--border-strong);
  box-shadow: var(--shadow-xs);
}
.btn-secondary:hover:not(:disabled) { background: var(--bg-subtle); }
.btn-sm { padding: 0.4rem 0.75rem; font-size: 0.8rem; border-radius: var(--radius-xs); }
.btn-block { width: 100%; }

/* Compact SaaS Hero + Search Command Center */
.hero-compact {
  padding: 2.25rem 0 1.25rem;
  text-align: center;
  background: radial-gradient(circle at 50% 0%, var(--primary-soft) 0%, transparent 70%);
}
.hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.28rem 0.75rem;
  border-radius: 999px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 0.85rem;
  box-shadow: var(--shadow-xs);
}
.hero-pill span.dot { width: 7px; height: 7px; border-radius: 50%; background: var(--success); }
.hero-compact h1 {
  font-size: clamp(1.65rem, 3.8vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-bottom: 0.5rem;
}
.hero-compact p {
  font-size: 0.96rem;
  color: var(--text-muted);
  max-width: 52ch;
  margin: 0 auto 1.35rem;
}

/* Command Search Bar */
.search-box {
  position: relative;
  max-width: 600px;
  margin: 0 auto 1.25rem;
}
.search-box svg.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--text-light);
  pointer-events: none;
}
.search-input {
  width: 100%;
  padding: 0.85rem 2.6rem 0.85rem 2.75rem;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--border-strong);
  background: var(--bg-surface);
  font-size: 0.95rem;
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  transition: border-color var(--transition), box-shadow var(--transition);
}
.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--primary-soft);
}
.search-clear {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--bg-subtle);
  color: var(--text-muted);
  font-size: 0.75rem;
  display: none;
  align-items: center;
  justify-content: center;
}

/* Swipeable App Category Tabs */
.category-scroll-wrap {
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  margin: 0 -1.25rem;
  padding: 0.25rem 1.25rem;
}
.category-scroll-wrap::-webkit-scrollbar { display: none; }
.category-pills {
  display: inline-flex;
  gap: 0.45rem;
  min-width: max-content;
}
.pill {
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 600;
  background: var(--bg-surface);
  color: var(--text-muted);
  border: 1px solid var(--border);
  transition: all var(--transition);
  white-space: nowrap;
}
.pill:hover { color: var(--text-main); border-color: var(--border-strong); }
.pill.active {
  background: var(--primary);
  color: #ffffff;
  border-color: var(--primary);
  box-shadow: var(--shadow-xs);
}

/* App Tool Cards Grid */
.section-block { padding: 1.5rem 0; }
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 0.75rem;
}
.section-header h2 {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 0.85rem;
}
.tool-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1rem 1.1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
  transition: all var(--transition);
  box-shadow: var(--shadow-xs);
  position: relative;
}
.tool-card:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
.tool-icon {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  background: var(--primary-soft);
  color: var(--primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.tool-icon svg { width: 22px; height: 22px; }
.tool-card-body { flex: 1; min-width: 0; }
.tool-card-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  margin-bottom: 0.2rem;
}
.tool-card h3 {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-main);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tool-card p {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.hot-badge {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  background: var(--success-bg);
  color: var(--success);
  flex-shrink: 0;
}

/* Studio Workspace (Tool Page) */
.tool-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 1rem 0 0.75rem;
}
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-light);
  list-style: none;
}
.breadcrumbs a:hover { color: var(--primary); }
.tool-title-wrap { margin-bottom: 1rem; }
.tool-title-wrap h1 {
  font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}
.tool-title-wrap p {
  font-size: 0.88rem;
  color: var(--text-muted);
}

.studio-grid {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 1.25rem;
  align-items: start;
}
.studio-panel {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.15rem;
  box-shadow: var(--shadow-sm);
}
.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.88rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

/* Controls & Tactile Inputs */
.control-group { margin-bottom: 1rem; }
.control-group label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 0.4rem;
}
.val-pill {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: var(--radius-xs);
  background: var(--primary-soft);
  color: var(--primary);
}
.input-field, .select-field, .textarea-field {
  width: 100%;
  padding: 0.55rem 0.75rem;
  border: 1.5px solid var(--border-strong);
  border-radius: var(--radius-xs);
  background: var(--bg-surface);
  font-size: 0.88rem;
  font-weight: 500;
  transition: border-color var(--transition);
}
.input-field:focus, .select-field:focus, .textarea-field:focus {
  outline: none;
  border-color: var(--primary);
}
.input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; }

/* Segmented Format & Ratio Pills */
.segmented-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(64px, 1fr));
  gap: 0.35rem;
  background: var(--bg-subtle);
  padding: 0.25rem;
  border-radius: var(--radius-xs);
}
.seg-btn {
  padding: 0.4rem 0.5rem;
  border-radius: 5px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  text-align: center;
  transition: all var(--transition);
}
.seg-btn.active {
  background: var(--bg-surface);
  color: var(--primary);
  box-shadow: var(--shadow-xs);
}

.preset-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.35rem;
}
.chip-btn {
  padding: 0.32rem 0.65rem;
  border-radius: var(--radius-xs);
  font-size: 0.76rem;
  font-weight: 600;
  background: var(--bg-subtle);
  color: var(--text-muted);
  border: 1px solid var(--border);
  transition: all var(--transition);
}
.chip-btn:hover, .chip-btn.active {
  background: var(--primary-soft);
  color: var(--primary);
  border-color: var(--primary-border);
}

/* Custom Range Slider */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  background: var(--border-strong);
  border-radius: 999px;
  outline: none;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--primary);
  border: 2px solid #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

/* Upload Dropzone */
.dropzone {
  border: 2px dashed var(--border-strong);
  border-radius: var(--radius-md);
  background: var(--bg-subtle);
  padding: 2.75rem 1.25rem;
  text-align: center;
  cursor: pointer;
  transition: all var(--transition);
}
.dropzone:hover, .dropzone.dragover {
  border-color: var(--primary);
  background: var(--primary-soft);
}
.dropzone-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: var(--bg-surface);
  color: var(--primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.85rem;
  box-shadow: var(--shadow-sm);
}
.dropzone h3 { font-size: 1.02rem; font-weight: 700; margin-bottom: 0.25rem; }
.dropzone p { font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1rem; }

/* Studio Canvas Stage */
.stage-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.65rem;
  flex-wrap: wrap;
}
.preview-stage {
  background-color: var(--bg-studio);
  background-image:
    linear-gradient(45deg, rgba(255,255,255,0.04) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(255,255,255,0.04) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.04) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.04) 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0;
  border-radius: var(--radius-sm);
  min-height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  overflow: hidden;
}
.preview-stage canvas, .preview-stage img {
  max-height: 440px;
  width: auto;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

/* Live Stats Bar */
.stats-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.6rem;
  margin-top: 0.85rem;
}
.stat-card {
  background: var(--bg-subtle);
  border: 1px solid var(--border);
  border-radius: var(--radius-xs);
  padding: 0.55rem 0.75rem;
}
.stat-label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; color: var(--text-light); }
.stat-val { font-size: 0.88rem; font-weight: 700; color: var(--text-main); margin-top: 0.1rem; display: flex; align-items: center; gap: 0.4rem; }
.delta-pill {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.1rem 0.4rem;
  border-radius: 999px;
}
.delta-pill.saved { background: var(--success-bg); color: var(--success); }
.delta-pill.larger { background: var(--warning-bg); color: var(--warning); }

.status-banner {
  padding: 0.65rem 0.9rem;
  border-radius: var(--radius-xs);
  font-size: 0.84rem;
  font-weight: 600;
  margin-bottom: 0.85rem;
  display: none;
}
.status-banner.error { display: block; background: var(--error-bg); color: var(--error); }
.status-banner.success { display: block; background: var(--success-bg); color: var(--success); }
.status-banner.warning { display: block; background: var(--warning-bg); color: var(--warning); }

/* Queue List */
.queue-list { list-style: none; margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.45rem; }
.queue-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.6rem 0.8rem;
  background: var(--bg-subtle);
  border: 1px solid var(--border);
  border-radius: var(--radius-xs);
  font-size: 0.82rem;
}

/* Concise SEO Steps & FAQ */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.85rem;
  margin-top: 1.75rem;
}
.step-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.95rem 1.05rem;
}
.step-num {
  display: inline-flex;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: var(--primary-soft);
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 800;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.4rem;
}
.step-card h3 { font-size: 0.9rem; font-weight: 700; margin-bottom: 0.2rem; }
.step-card p { font-size: 0.8rem; color: var(--text-muted); }

.faq-list details {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
}
.faq-list summary { font-weight: 700; font-size: 0.9rem; cursor: pointer; }
.faq-list p { margin-top: 0.4rem; color: var(--text-muted); font-size: 0.85rem; }

/* Minimal Footer */
.site-footer {
  margin-top: auto;
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
  padding: 2rem 0 1.5rem;
  font-size: 0.82rem;
  color: var(--text-muted);
}
.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.25rem;
}
.footer-col h4 { color: var(--text-main); margin-bottom: 0.55rem; font-size: 0.86rem; font-weight: 700; }
.footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.35rem; }
.footer-col a:hover { color: var(--primary); }

@media (max-width: 900px) {
  .studio-grid, .steps-grid, .footer-grid { grid-template-columns: 1fr; }
}
@media (max-width: 680px) {
  .mobile-menu-toggle { display: inline-flex; }
  .nav-links {
    display: none;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border);
    flex-direction: column;
    align-items: stretch;
    padding: 0.75rem 1rem;
    box-shadow: var(--shadow-md);
  }
  .nav-links.open { display: flex; }
  .tools-grid { grid-template-columns: 1fr; }
}
`);

// 3. Config JS
write("assets/js/config.js", `
export const SITE_CONFIG = {
  brandName: "PixelKit",
  origin: "https://pixelkit.pages.dev",
  limits: {
    maxFileSizeBytes: 35 * 1024 * 1024,
    maxCanvasDimension: 8192,
    maxBulkFiles: 25
  }
};
`);

// 4. SVG Icons & 32 Tools Registry
const SVG_ICONS = {
  resize: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',
  compress: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  crop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/></svg>',
  convert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
  rotate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
  idcard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M15 8h2"/><path d="M15 12h2"/><path d="M7 16h10"/></svg>',
  pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg>',
  social: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  wand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8 19 13"/><path d="M15 9h0"/><path d="M17.8 6.2 19 5"/><path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  stack: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>'
};

const TOOLS_DATA = [
  { id: "image-resizer", title: "Image Resizer", category: "resize", popular: true, mode: "single", iconKey: "resize", shortDesc: "Exact pixel or percentage resizing with aspect lock.", h1: "Image Resizer", intro: "Resize JPG, PNG, and WebP photos by exact pixel dimensions or percentage.", keywords: ["resize image", "pixel resizer", "scale photo"], defaults: { scaleMode: "px", lockAspect: true, format: "original", quality: 0.92 }, presets: [{ label: "HD 1280×720", w: 1280, h: 720 }, { label: "FHD 1920×1080", w: 1920, h: 1080 }, { label: "1:1 1080×1080", w: 1080, h: 1080 }] },
  { id: "image-compressor", title: "Image Compressor", category: "compress", popular: true, mode: "single", iconKey: "compress", shortDesc: "Shrink photo byte size up to 80% with live quality control.", h1: "Image Compressor", intro: "Reduce JPG and WebP file size instantly while preserving visual clarity.", keywords: ["compress image", "reduce photo size", "shrink kb"], defaults: { format: "image/jpeg", quality: 0.75, bgColor: "#ffffff" } },
  { id: "target-file-size", title: "Compress to 20KB / 50KB", category: "compress", popular: true, mode: "single", iconKey: "target", shortDesc: "Hit exact portal limits like 20 KB, 50 KB, or 100 KB.", h1: "Compress Image to Exact KB Size", intro: "Auto-tunes quality and resolution to fit strict 20 KB, 50 KB, or 100 KB form limits.", keywords: ["20kb", "50kb", "100kb", "target file size", "sarkari form photo"], defaults: { targetKb: 50, format: "image/jpeg", allowDownscale: true, bgColor: "#ffffff" }, kbPresets: [20, 30, 50, 100, 200] },
  { id: "passport-photo-maker", title: "Passport Photo Maker", category: "photo-id", popular: true, mode: "single", iconKey: "idcard", shortDesc: "2×2 inch, 35×45 mm ID presets & 4×6 printable sheet.", h1: "Passport & ID Photo Maker", intro: "Format portraits to 300 DPI passport sizes or generate a 4×6 inch multi-photo print sheet.", keywords: ["passport photo", "35x45mm", "2x2 inch", "exam photo"], defaults: { w: 413, h: 531, lockAspect: true, printSheet: false, format: "image/jpeg", quality: 0.94, bgColor: "#ffffff" }, presets: [{ label: "35×45 mm (413×531)", w: 413, h: 531 }, { label: "2×2 in (600×600)", w: 600, h: 600 }, { label: "Exam 200×230 px", w: 200, h: 230 }] },
  { id: "signature-resizer", title: "Signature Resizer", category: "photo-id", popular: true, mode: "single", iconKey: "pen", shortDesc: "140×60 px exam portal preset under 20 KB.", h1: "Signature Image Resizer (10KB–20KB)", intro: "Resize scanned signatures to 140×60 px and compress under 20 KB for online applications.", keywords: ["signature resizer", "140x60", "20kb signature", "ssc signature"], defaults: { w: 140, h: 60, lockAspect: false, targetKb: 20, format: "image/jpeg", bgColor: "#ffffff" }, presets: [{ label: "140×60 px (Portal)", w: 140, h: 60 }, { label: "300×100 px", w: 300, h: 100 }, { label: "256×64 px", w: 256, h: 64 }] },
  { id: "image-cropper", title: "Image Cropper", category: "crop-rotate", popular: true, mode: "single", iconKey: "crop", shortDesc: "Trim photos with 1:1, 16:9, 4:5 presets or custom frame.", h1: "Crop Image Online", intro: "Frame your subject using instant aspect ratio pills or custom offset controls.", keywords: ["crop image", "square crop", "16:9 crop"], defaults: { cropRatio: "free", cropX: 10, cropY: 10, cropW: 80, cropH: 80, format: "original" } },
  { id: "image-converter", title: "Image Format Converter", category: "convert", popular: true, mode: "single", iconKey: "convert", shortDesc: "Convert between WebP, JPG, and PNG in one tap.", h1: "Image Format Converter", intro: "Fast local conversion between JPG, PNG, and WebP formats.", keywords: ["image converter", "webp to jpg", "png to jpg"], defaults: { format: "image/webp", quality: 0.9, bgColor: "#ffffff" } },
  { id: "bulk-image-resizer", title: "Bulk Image Resizer (.ZIP)", category: "bulk", popular: true, mode: "bulk", iconKey: "stack", shortDesc: "Batch resize up to 25 images & download as a single ZIP.", h1: "Bulk Image Resizer & ZIP Downloader", intro: "Process up to 25 photos at once and export them individually or as a single .ZIP archive.", keywords: ["bulk resize", "batch image resizer", "zip download"], defaults: { scaleMode: "pct", pct: 50, format: "image/jpeg", quality: 0.9 } },
  { id: "jpg-to-png", title: "JPG to PNG", category: "convert", popular: false, mode: "single", iconKey: "convert", shortDesc: "Convert JPEG photos into lossless PNG files.", h1: "JPG to PNG Converter", intro: "Turn any JPG image into a lossless PNG file locally.", keywords: ["jpg to png", "jpeg to png"], defaults: { format: "image/png", lockFormat: true } },
  { id: "png-to-jpg", title: "PNG to JPG", category: "convert", popular: false, mode: "single", iconKey: "convert", shortDesc: "Convert transparent PNGs to JPG with custom backdrop fill.", h1: "PNG to JPG Converter", intro: "Replace transparent PNG backgrounds with solid white or custom color and export as JPEG.", keywords: ["png to jpg", "transparent to white jpg"], defaults: { format: "image/jpeg", lockFormat: true, quality: 0.92, bgColor: "#ffffff" } },
  { id: "webp-converter", title: "WebP Converter", category: "convert", popular: false, mode: "single", iconKey: "convert", shortDesc: "Encode images to next-gen WebP for faster websites.", h1: "WebP Image Converter", intro: "Convert images to or from high-efficiency WebP format.", keywords: ["webp converter", "to webp"], defaults: { format: "image/webp", quality: 0.88 } },
  { id: "png-to-webp", title: "PNG to WebP", category: "convert", popular: false, mode: "single", iconKey: "convert", shortDesc: "Shrink transparent PNGs into lightweight WebP graphics.", h1: "PNG to WebP Converter", intro: "Keep full alpha transparency while cutting PNG file size down with WebP.", keywords: ["png to webp", "transparent webp"], defaults: { format: "image/webp", lockFormat: true, quality: 0.9 } },
  { id: "jpg-to-webp", title: "JPG to WebP", category: "convert", popular: false, mode: "single", iconKey: "convert", shortDesc: "Convert JPEG photographs into WebP format.", h1: "JPG to WebP Converter", intro: "Make web images load faster by converting JPEG to WebP.", keywords: ["jpg to webp"], defaults: { format: "image/webp", lockFormat: true, quality: 0.86 } },
  { id: "webp-to-jpg", title: "WebP to JPG", category: "convert", popular: false, mode: "single", iconKey: "convert", shortDesc: "Turn WebP files into standard universal JPG images.", h1: "WebP to JPG Converter", intro: "Convert WebP images into universally compatible JPEG files.", keywords: ["webp to jpg"], defaults: { format: "image/jpeg", lockFormat: true, quality: 0.92, bgColor: "#ffffff" } },
  { id: "rotate-image", title: "Rotate Image", category: "crop-rotate", popular: false, mode: "single", iconKey: "rotate", shortDesc: "Rotate photos 90° left, right, or 180° lossless-style.", h1: "Rotate Image 90° / 180°", intro: "Fix orientation of sideways photos with instant 90° rotation controls.", keywords: ["rotate image", "turn photo"], defaults: { rotate: 0, format: "original" } },
  { id: "flip-image", title: "Flip & Mirror Image", category: "crop-rotate", popular: false, mode: "single", iconKey: "rotate", shortDesc: "Mirror images horizontally or vertically.", h1: "Flip Image Horizontally or Vertically", intro: "Mirror selfies and graphics with one tap.", keywords: ["flip image", "mirror photo"], defaults: { flipH: false, flipV: false, format: "original" } },
  { id: "youtube-thumbnail-resizer", title: "YouTube Thumbnail Resizer", category: "social", popular: false, mode: "single", iconKey: "social", shortDesc: "1280×720 HD & 1920×1080 16:9 YouTube presets.", h1: "YouTube Thumbnail Resizer (1280×720)", intro: "Format cover images to exact 16:9 YouTube thumbnail dimensions under 2 MB.", keywords: ["youtube thumbnail resizer", "1280x720"], defaults: { w: 1280, h: 720, lockAspect: true, format: "image/jpeg", quality: 0.92 }, presets: [{ label: "1280×720 HD", w: 1280, h: 720 }, { label: "1920×1080 FHD", w: 1920, h: 1080 }, { label: "Banner 2560×1440", w: 2560, h: 1440 }] },
  { id: "instagram-image-resizer", title: "Instagram Resizer", category: "social", popular: false, mode: "single", iconKey: "social", shortDesc: "4:5 Portrait (1080×1350), 1:1 Square & 9:16 Story.", h1: "Instagram Photo Resizer", intro: "One-tap presets for Instagram Portrait (1080×1350), Square, and Story posts.", keywords: ["instagram resizer", "1080x1350"], defaults: { w: 1080, h: 1350, lockAspect: true, format: "image/jpeg", quality: 0.92 }, presets: [{ label: "4:5 (1080×1350)", w: 1080, h: 1350 }, { label: "1:1 (1080×1080)", w: 1080, h: 1080 }, { label: "Story (1080×1920)", w: 1080, h: 1920 }] },
  { id: "facebook-image-resizer", title: "Facebook Image Resizer", category: "social", popular: false, mode: "single", iconKey: "social", shortDesc: "1200×630 link post, square feed & event cover presets.", h1: "Facebook Image Resizer", intro: "Resize photos for Facebook feed posts, link previews, and covers.", keywords: ["facebook resizer", "1200x630"], defaults: { w: 1200, h: 630, lockAspect: true, format: "image/jpeg", quality: 0.9 }, presets: [{ label: "Post 1200×630", w: 1200, h: 630 }, { label: "Square 1080×1080", w: 1080, h: 1080 }, { label: "Cover 1920×1005", w: 1920, h: 1005 }] },
  { id: "circular-image-cropper", title: "Circle Avatar Cropper", category: "effects", popular: false, mode: "single", iconKey: "wand", shortDesc: "Crop profile pictures into a circle with transparent corners.", h1: "Circular Profile Picture Cropper", intro: "Export round profile avatars as transparent PNG or WebP.", keywords: ["circle crop", "round avatar"], defaults: { circleCrop: true, format: "image/png" } },
  { id: "rounded-corners-image", title: "Rounded Corners", category: "effects", popular: false, mode: "single", iconKey: "wand", shortDesc: "Smooth border-radius corners exported as transparent PNG.", h1: "Round Image Corners", intro: "Add smooth rounded corners with adjustable pixel radius.", keywords: ["round corners", "border radius image"], defaults: { borderRadius: 48, format: "image/png" } },
  { id: "grayscale-image", title: "Black & White Filter", category: "effects", popular: false, mode: "single", iconKey: "wand", shortDesc: "Convert color photos to monochrome grayscale.", h1: "Grayscale Image Converter", intro: "Turn color images into clean black-and-white photos.", keywords: ["grayscale", "black and white"], defaults: { grayscale: 100, format: "original" } },
  { id: "add-image-border", title: "Add Image Border", category: "effects", popular: false, mode: "single", iconKey: "wand", shortDesc: "Wrap photos in a clean solid frame of custom thickness.", h1: "Add Border Frame to Image", intro: "Add a customizable colored border around any photo.", keywords: ["add border", "photo frame"], defaults: { borderWidth: 24, borderColor: "#ffffff", format: "original" } },
  { id: "image-watermark", title: "Text Watermark Studio", category: "effects", popular: false, mode: "single", iconKey: "wand", shortDesc: "Stamp custom copyright text with opacity & position control.", h1: "Add Text Watermark to Image", intro: "Protect your photos with customizable text overlays.", keywords: ["watermark image", "copyright stamp"], defaults: { watermarkText: "© PixelKit", watermarkOpacity: 75, watermarkSize: 36, watermarkColor: "#ffffff", watermarkPos: "bottom-right", format: "original" } },
  { id: "blur-image", title: "Gaussian Blur", category: "effects", popular: false, mode: "single", iconKey: "wand", shortDesc: "Smooth background blur with live radius slider.", h1: "Blur Image Online", intro: "Apply smooth Gaussian blur to soften backgrounds or hide details.", keywords: ["blur image", "gaussian blur"], defaults: { blurRadius: 8, format: "original" } },
  { id: "pixelate-image", title: "Pixelate & Censor", category: "effects", popular: false, mode: "single", iconKey: "wand", shortDesc: "8-bit mosaic pixelation for retro art or privacy censoring.", h1: "Pixelate Image Online", intro: "Adjust pixel block size to pixelate photos.", keywords: ["pixelate image", "mosaic"], defaults: { pixelSize: 12, format: "original" } },
  { id: "meme-maker", title: "Meme Generator", category: "effects", popular: false, mode: "single", iconKey: "wand", shortDesc: "Classic bold Impact top & bottom captions with stroke.", h1: "Online Meme Maker", intro: "Add top and bottom meme captions with crisp black outline.", keywords: ["meme maker", "caption image"], defaults: { memeTop: "FIRST TRY", memeBottom: "ZERO BUGS", memeFontSize: 44, format: "image/jpeg", quality: 0.92 } },
  { id: "collage-maker", title: "Photo Collage Grid", category: "effects", popular: false, mode: "collage", iconKey: "grid", shortDesc: "Combine 2–4 photos into side-by-side or 2×2 grids.", h1: "Photo Collage Maker", intro: "Merge multiple photos into a clean 2×2 grid or side-by-side layout.", keywords: ["collage maker", "photo grid"], defaults: { layout: "grid-2x2", gap: 16, bgColor: "#ffffff", canvasSize: 1200 } },
  { id: "bulk-image-converter", title: "Bulk Format Converter (.ZIP)", category: "bulk", popular: false, mode: "bulk", iconKey: "stack", shortDesc: "Batch convert up to 25 files to WebP/JPG/PNG + ZIP export.", h1: "Bulk Image Format Converter", intro: "Convert multiple images at once and download all as a .ZIP archive.", keywords: ["bulk converter", "batch webp"], defaults: { scaleMode: "pct", pct: 100, format: "image/webp", quality: 0.88, bgColor: "#ffffff" } },
  { id: "image-dimensions", title: "Resolution & DPI Inspector", category: "utilities", popular: false, mode: "inspector", iconKey: "code", shortDesc: "Instant width, height, aspect ratio, megapixels & byte size.", h1: "Check Image Dimensions & Aspect Ratio", intro: "Inspect exact pixel resolution, aspect ratio, and file size locally.", keywords: ["image dimensions", "check resolution"], defaults: {} },
  { id: "image-to-base64", title: "Image to Base64", category: "utilities", popular: false, mode: "base64-encode", iconKey: "code", shortDesc: "Generate inline Data URL strings for HTML & CSS.", h1: "Image to Base64 Encoder", intro: "Convert icons and images into Base64 Data URLs.", keywords: ["image to base64", "data url"], defaults: {} },
  { id: "base64-to-image", title: "Base64 to Image", category: "utilities", popular: false, mode: "base64-decode", iconKey: "code", shortDesc: "Decode Base64 strings back into downloadable PNG/JPG files.", h1: "Base64 to Image Decoder", intro: "Paste a Base64 payload to preview and download the image.", keywords: ["base64 to image", "decode base64"], defaults: {} },
  { id: "image-upscaler-guide", title: "Upscaling vs Resizing Guide", category: "utilities", popular: false, mode: "guide", iconKey: "code", shortDesc: "Technical comparison of bicubic browser scaling vs neural AI.", h1: "Image Upscaling & DPI Guide", intro: "How browser interpolation works and how to export crisp high-DPI graphics.", keywords: ["upscaler guide", "dpi guide"], defaults: {} }
];

write("assets/js/tool-registry.js", `
export const TOOL_CATEGORIES = [
  { id: "all", name: "All Tools" },
  { id: "compress", name: "Compress" },
  { id: "resize", name: "Resize" },
  { id: "photo-id", name: "Passport & Sign" },
  { id: "convert", name: "Convert" },
  { id: "crop-rotate", name: "Crop & Rotate" },
  { id: "social", name: "Social Media" },
  { id: "effects", name: "Effects & Meme" },
  { id: "bulk", name: "Bulk + ZIP" },
  { id: "utilities", name: "Developer" }
];
export const ICONS = ${JSON.stringify(SVG_ICONS, null, 2)};
export const TOOLS = ${JSON.stringify(TOOLS_DATA, null, 2)};
export function getToolById(id) {
  return TOOLS.find((t) => t.id === id) || null;
}
`);

// 5. Image Engine JS + Pure Vanilla JS ZIP Archive Builder
write("assets/js/image-engine.js", `
import { SITE_CONFIG } from "./config.js";
const SUPPORTED_INPUT_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/bmp"];

export function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
  if (bytes < 1024) return bytes + " B";
  const kb = bytes / 1024;
  if (kb < 1024) return kb.toFixed(1) + " KB";
  return (kb / 1024).toFixed(2) + " MB";
}
export function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
export function getAspectRatioString(w, h) {
  if (!w || !h) return "—";
  const d = gcd(Math.round(w), Math.round(h));
  return Math.round(w / d) + ":" + Math.round(h / d);
}
export function sanitizeFilename(name, ext) {
  const base = (name || "image").replace(/\\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]+/g, "-").slice(0, 60) || "pixelkit-image";
  return base + "." + ext.replace(/^\\./, "");
}
export function mimeToExtension(mime) {
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "jpg";
}
export async function validateAndDecodeFile(file) {
  if (!file) throw new Error("Select an image file first.");
  if (!SUPPORTED_INPUT_TYPES.includes(file.type)) {
    throw new Error("Unsupported format. Use JPG, PNG, or WebP.");
  }
  if (file.size > SITE_CONFIG.limits.maxFileSizeBytes) {
    throw new Error("File exceeds the 35 MB safety limit.");
  }
  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Corrupted or unreadable image file."));
      el.src = objectUrl;
    });
    if (img.naturalWidth > SITE_CONFIG.limits.maxCanvasDimension || img.naturalHeight > SITE_CONFIG.limits.maxCanvasDimension) {
      URL.revokeObjectURL(objectUrl);
      throw new Error("Dimensions exceed safe 8192 px canvas limit.");
    }
    return { file, objectUrl, image: img, width: img.naturalWidth, height: img.naturalHeight, mime: file.type, size: file.size, name: file.name };
  } catch (err) {
    URL.revokeObjectURL(objectUrl);
    throw err;
  }
}
export function canvasToBlob(canvas, mime, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) { reject(new Error("Canvas encoding failed.")); return; }
      resolve(blob);
    }, mime, quality);
  });
}
export function renderTransformedCanvas(source, settings, targetCanvas) {
  const img = source.image;
  const rot = Number(settings.rotate || 0) % 360;
  const isRotated90 = Math.abs(rot) === 90 || Math.abs(rot) === 270;
  const cxPct = Math.max(0, Math.min(95, Number(settings.cropX ?? 0)));
  const cyPct = Math.max(0, Math.min(95, Number(settings.cropY ?? 0)));
  const cwPct = Math.max(5, Math.min(100 - cxPct, Number(settings.cropW ?? 100)));
  const chPct = Math.max(5, Math.min(100 - cyPct, Number(settings.cropH ?? 100)));
  const sx = Math.round((cxPct / 100) * source.width);
  const sy = Math.round((cyPct / 100) * source.height);
  const sw = Math.max(1, Math.round((cwPct / 100) * source.width));
  const sh = Math.max(1, Math.round((chPct / 100) * source.height));

  let outW = Number(settings.w) || sw;
  let outH = Number(settings.h) || sh;
  if (settings.scaleMode === "pct" && settings.pct) {
    const factor = Math.max(1, Math.min(500, Number(settings.pct))) / 100;
    outW = Math.max(1, Math.round(sw * factor));
    outH = Math.max(1, Math.round(sh * factor));
  }
  if (settings.circleCrop) {
    const side = Math.min(outW, outH);
    outW = side; outH = side;
  }
  const borderW = Math.max(0, Number(settings.borderWidth || 0));
  const finalW = (isRotated90 ? outH : outW) + borderW * 2;
  const finalH = (isRotated90 ? outW : outH) + borderW * 2;

  targetCanvas.width = finalW;
  targetCanvas.height = finalH;
  const ctx = targetCanvas.getContext("2d");
  ctx.clearRect(0, 0, finalW, finalH);

  const exportMime = settings.format === "original" || !settings.format ? source.mime : settings.format;
  if (exportMime === "image/jpeg" || settings.fillBg) {
    ctx.fillStyle = settings.bgColor || "#ffffff";
    ctx.fillRect(0, 0, finalW, finalH);
  }
  if (borderW > 0) {
    ctx.fillStyle = settings.borderColor || "#ffffff";
    ctx.fillRect(0, 0, finalW, finalH);
  }
  ctx.save();
  ctx.translate(borderW, borderW);
  const innerW = isRotated90 ? outH : outW;
  const innerH = isRotated90 ? outW : outH;

  if (settings.circleCrop) {
    ctx.beginPath();
    ctx.arc(innerW / 2, innerH / 2, Math.min(innerW, innerH) / 2, 0, Math.PI * 2);
    ctx.clip();
  } else if (Number(settings.borderRadius) > 0) {
    const r = Math.min(Number(settings.borderRadius), innerW / 2, innerH / 2);
    ctx.beginPath();
    ctx.roundRect(0, 0, innerW, innerH, r);
    ctx.clip();
  }
  const filters = [];
  if (Number(settings.grayscale) > 0) filters.push("grayscale(" + Math.min(100, Number(settings.grayscale)) + "%)");
  if (Number(settings.blurRadius) > 0) filters.push("blur(" + Math.min(50, Number(settings.blurRadius)) + "px)");
  if (filters.length) ctx.filter = filters.join(" ");

  ctx.translate(innerW / 2, innerH / 2);
  if (rot !== 0) ctx.rotate((rot * Math.PI) / 180);
  ctx.scale(settings.flipH ? -1 : 1, settings.flipV ? -1 : 1);

  const pxBlock = Number(settings.pixelSize || 0);
  if (pxBlock > 1) {
    const off = document.createElement("canvas");
    off.width = Math.max(1, Math.floor(outW / pxBlock));
    off.height = Math.max(1, Math.floor(outH / pxBlock));
    off.getContext("2d").drawImage(img, sx, sy, sw, sh, 0, 0, off.width, off.height);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(off, 0, 0, off.width, off.height, -outW / 2, -outH / 2, outW, outH);
  } else {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, sx, sy, sw, sh, -outW / 2, -outH / 2, outW, outH);
  }
  ctx.restore();

  if (settings.watermarkText && settings.watermarkText.trim()) {
    ctx.save();
    const fontSize = Math.max(12, Number(settings.watermarkSize || 32));
    ctx.font = "700 " + fontSize + "px system-ui, sans-serif";
    ctx.fillStyle = settings.watermarkColor || "#ffffff";
    ctx.globalAlpha = Math.max(0.1, Math.min(1, Number(settings.watermarkOpacity || 75) / 100));
    const pad = Math.max(16, borderW + 16);
    const metrics = ctx.measureText(settings.watermarkText);
    let wx = finalW - metrics.width - pad;
    let wy = finalH - pad;
    if (settings.watermarkPos === "center") { wx = (finalW - metrics.width) / 2; wy = finalH / 2; }
    else if (settings.watermarkPos === "top-left") { wx = pad; wy = pad + fontSize; }
    ctx.fillText(settings.watermarkText, Math.max(8, wx), wy);
    ctx.restore();
  }
  if (settings.memeTop || settings.memeBottom) {
    ctx.save();
    const fontSize = Math.max(16, Number(settings.memeFontSize || 42));
    ctx.font = "800 " + fontSize + "px Impact, sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = Math.max(3, Math.round(fontSize / 10));
    if (settings.memeTop) {
      const t = String(settings.memeTop).toUpperCase();
      ctx.strokeText(t, finalW / 2, fontSize + 14);
      ctx.fillText(t, finalW / 2, fontSize + 14);
    }
    if (settings.memeBottom) {
      const b = String(settings.memeBottom).toUpperCase();
      ctx.strokeText(b, finalW / 2, finalH - 18);
      ctx.fillText(b, finalW / 2, finalH - 18);
    }
    ctx.restore();
  }
  if (settings.printSheet) {
    const single = document.createElement("canvas");
    single.width = finalW; single.height = finalH;
    single.getContext("2d").drawImage(targetCanvas, 0, 0);
    targetCanvas.width = 1800; targetCanvas.height = 1200;
    const sCtx = targetCanvas.getContext("2d");
    sCtx.fillStyle = "#ffffff"; sCtx.fillRect(0, 0, 1800, 1200);
    const gap = 36;
    const cols = Math.max(1, Math.floor((1800 - gap) / (finalW + gap)));
    const rows = Math.max(1, Math.floor((1200 - gap) / (finalH + gap)));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = gap + c * (finalW + gap);
        const y = gap + r * (finalH + gap);
        sCtx.drawImage(single, x, y);
        sCtx.strokeStyle = "#cbd5e1";
        sCtx.strokeRect(x, y, finalW, finalH);
      }
    }
  }
  return { width: targetCanvas.width, height: targetCanvas.height, mime: exportMime === "image/gif" || exportMime === "image/bmp" ? "image/png" : exportMime };
}

export async function compressToTargetKb(source, settings, previewCanvas) {
  const targetBytes = Math.max(5, Number(settings.targetKb || 50)) * 1024;
  const mime = settings.format === "image/webp" ? "image/webp" : "image/jpeg";
  const workingSettings = { ...settings, format: mime };
  renderTransformedCanvas(source, workingSettings, previewCanvas);
  let low = 0.05, high = 0.95, bestBlob = null, bestQuality = high;
  for (let i = 0; i < 7; i++) {
    const mid = Number(((low + high) / 2).toFixed(3));
    const blob = await canvasToBlob(previewCanvas, mime, mid);
    if (blob.size <= targetBytes) { bestBlob = blob; bestQuality = mid; low = mid; }
    else { high = mid; }
  }
  if (!bestBlob) {
    bestBlob = await canvasToBlob(previewCanvas, mime, 0.05);
    bestQuality = 0.05;
    if (settings.allowDownscale && bestBlob.size > targetBytes) {
      let scale = 0.85;
      while (scale >= 0.25 && bestBlob.size > targetBytes) {
        const sw = Math.max(60, Math.round((settings.w || source.width) * scale));
        const sh = Math.max(40, Math.round((settings.h || source.height) * scale));
        renderTransformedCanvas(source, { ...workingSettings, w: sw, h: sh }, previewCanvas);
        bestBlob = await canvasToBlob(previewCanvas, mime, 0.55);
        bestQuality = 0.55;
        scale -= 0.15;
      }
    }
  }
  return { blob: bestBlob, quality: bestQuality, achieved: bestBlob.size <= targetBytes, width: previewCanvas.width, height: previewCanvas.height, mime };
}

// Pure Vanilla JS ZIP Creator (Zero Dependencies)
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c >>> 0;
  }
  return t;
})();

function crc32(bytes) {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

export async function createZipBlob(filesArray) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const item of filesArray) {
    const nameBytes = encoder.encode(item.name);
    const data = new Uint8Array(await item.blob.arrayBuffer());
    const crc = crc32(data);

    const localHeader = new Uint8Array(30 + nameBytes.length);
    const lv = new DataView(localHeader.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(6, 0, true);
    lv.setUint16(8, 0, true);
    lv.setUint16(10, 0, true);
    lv.setUint16(12, 0, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, data.length, true);
    lv.setUint32(22, data.length, true);
    lv.setUint16(26, nameBytes.length, true);
    lv.setUint16(28, 0, true);
    localHeader.set(nameBytes, 30);

    const centralHeader = new Uint8Array(46 + nameBytes.length);
    const cv = new DataView(centralHeader.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(8, 0, true);
    cv.setUint16(10, 0, true);
    cv.setUint16(12, 0, true);
    cv.setUint16(14, 0, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, data.length, true);
    cv.setUint32(24, data.length, true);
    cv.setUint16(28, nameBytes.length, true);
    cv.setUint16(30, 0, true);
    cv.setUint16(32, 0, true);
    cv.setUint16(34, 0, true);
    cv.setUint16(36, 0, true);
    cv.setUint32(38, 0, true);
    cv.setUint32(42, offset, true);
    centralHeader.set(nameBytes, 46);

    localParts.push(localHeader, data);
    centralParts.push(centralHeader);
    offset += localHeader.length + data.length;
  }

  const centralSize = centralParts.reduce((a, b) => a + b.length, 0);
  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(8, filesArray.length, true);
  ev.setUint16(10, filesArray.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, offset, true);

  return new Blob([...localParts, ...centralParts, eocd], { type: "application/zip" });
}
`);

// 6. UI Shell JS
write("assets/js/ui-shell.js", `
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
  mount.innerHTML = \`
    <header class="site-header">
      <div class="container header-inner">
        <a href="\${root}" class="brand-logo">
          <svg viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="16" fill="#4F46E5"/><path d="M16 43L26 30L34 40L41 32L48 43H16Z" fill="#fff"/><circle cx="41" cy="23" r="4.5" fill="#A5B4FC"/></svg>
          <span>\${SITE_CONFIG.brandName}</span>
          <span class="brand-badge">Studio</span>
        </a>
        <ul class="nav-links" id="primary-nav">
          <li><a href="\${root}tools/image-compressor/">Compress</a></li>
          <li><a href="\${root}tools/target-file-size/">20KB / 50KB</a></li>
          <li><a href="\${root}tools/image-resizer/">Resize</a></li>
          <li><a href="\${root}tools/passport-photo-maker/">Passport ID</a></li>
          <li><a href="\${root}tools/signature-resizer/">Signature</a></li>
          <li><a href="\${root}tools/image-converter/">Convert</a></li>
          <li><a href="\${root}tools/bulk-image-resizer/">Bulk ZIP</a></li>
        </ul>
        <div class="header-actions">
          <button type="button" class="icon-btn" id="theme-toggle-btn" aria-label="Toggle theme" title="Toggle Dark/Light Mode">◐</button>
          <button type="button" class="icon-btn mobile-menu-toggle" id="mobile-menu-btn" aria-label="Menu">☰</button>
        </div>
      </div>
    </header>
  \`;
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
  mount.innerHTML = \`
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <h4>\${SITE_CONFIG.brandName} Studio</h4>
            <p>100% Client-Side Image Processing. Zero server uploads, zero watermarks, instant local exports.</p>
          </div>
          <div class="footer-col">
            <h4>Top Tools</h4>
            <ul>
              <li><a href="\${root}tools/target-file-size/">Compress to 20KB / 50KB</a></li>
              <li><a href="\${root}tools/passport-photo-maker/">Passport Photo Maker</a></li>
              <li><a href="\${root}tools/signature-resizer/">Signature Resizer</a></li>
              <li><a href="\${root}tools/image-resizer/">Image Resizer</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Convert & Batch</h4>
            <ul>
              <li><a href="\${root}tools/image-converter/">Format Converter</a></li>
              <li><a href="\${root}tools/png-to-jpg/">PNG to JPG</a></li>
              <li><a href="\${root}tools/bulk-image-resizer/">Bulk Image Resizer</a></li>
              <li><a href="\${root}tools/collage-maker/">Photo Collage Grid</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Legal & Info</h4>
            <ul>
              <li><a href="\${root}pages/about/">About</a></li>
              <li><a href="\${root}pages/privacy-policy/">Privacy Policy</a></li>
              <li><a href="\${root}pages/terms/">Terms</a></li>
              <li><a href="\${root}pages/faq/">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div style="border-top:1px solid var(--border);padding-top:1rem;display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
          <span>© \${new Date().getFullYear()} \${SITE_CONFIG.brandName}</span>
          <span>Powered by HTML5 Canvas & Web APIs</span>
        </div>
      </div>
    </footer>
  \`;
}
`);

// 7. Home JS
write("assets/js/home.js", `
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
  return \`
    <a href="\${root}tools/\${tool.id}/" class="tool-card">
      <div class="tool-icon">\${svg}</div>
      <div class="tool-card-body">
        <div class="tool-card-title-row">
          <h3>\${tool.title}</h3>
          \${tool.popular ? '<span class="hot-badge">Popular</span>' : ''}
        </div>
        <p>\${tool.shortDesc}</p>
      </div>
    </a>
  \`;
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
`);

// 8. Studio Workspace Controller JS
write("assets/js/workspace.js", `
import { initShell, getRootPrefix } from "./ui-shell.js";
import { TOOLS, getToolById, ICONS } from "./tool-registry.js";
import { validateAndDecodeFile, renderTransformedCanvas, canvasToBlob, compressToTargetKb, formatBytes, getAspectRatioString, sanitizeFilename, mimeToExtension, createZipBlob } from "./image-engine.js";

document.addEventListener("DOMContentLoaded", () => {
  initShell();
  const rootEl = document.getElementById("tool-workspace-root");
  if (!rootEl) return;
  const tool = getToolById(rootEl.dataset.toolId);
  if (!tool) return;
  const root = getRootPrefix();
  const related = TOOLS.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 4);

  rootEl.innerHTML = \`
    <div class="container">
      <div class="tool-top-bar">
        <ol class="breadcrumbs">
          <li><a href="\${root}">All Tools</a></li>
          <li>›</li>
          <li>\${tool.title}</li>
        </ol>
        <span class="hot-badge">🔒 100% Local & Private</span>
      </div>
      <div class="tool-title-wrap">
        <h1>\${tool.h1}</h1>
        <p>\${tool.intro}</p>
      </div>
      <div id="status-banner" class="status-banner" role="status" aria-live="polite"></div>
      <div id="workspace-dynamic"></div>

      <div class="steps-grid">
        <div class="step-card"><div class="step-num">1</div><h3>Select Image</h3><p>Drop or pick a JPG, PNG, or WebP photo from your device.</p></div>
        <div class="step-card"><div class="step-num">2</div><h3>Tune Settings</h3><p>Use 1-tap presets or sliders with live byte & pixel preview.</p></div>
        <div class="step-card"><div class="step-num">3</div><h3>Instant Save</h3><p>Download directly to your phone or PC with zero watermarks.</p></div>
      </div>

      <div class="section-block">
        <div class="section-header"><h2>Related Tools</h2></div>
        <div class="tools-grid">
          \${related.map((r) => \`
            <a href="\${root}tools/\${r.id}/" class="tool-card">
              <div class="tool-icon">\${ICONS[r.iconKey] || ICONS.resize}</div>
              <div class="tool-card-body"><h3>\${r.title}</h3><p>\${r.shortDesc}</p></div>
            </a>
          \`).join("")}
        </div>
      </div>
    </div>
  \`;

  const dyn = document.getElementById("workspace-dynamic");
  if (tool.mode === "guide") {
    dyn.innerHTML = '<div class="studio-panel"><h2>Bicubic Resizing vs. Neural Upscaling</h2><p style="margin-top:0.5rem;color:var(--text-muted);font-size:0.9rem;">Standard browser canvas scaling uses high-quality bicubic interpolation. To resize dimensions cleanly, open our <a href="' + root + 'tools/image-resizer/" style="color:var(--primary);font-weight:700;">Image Resizer</a>.</p></div>';
  } else if (tool.mode === "base64-encode") {
    initB64Encode(dyn);
  } else if (tool.mode === "base64-decode") {
    initB64Decode(dyn);
  } else if (tool.mode === "collage") {
    initCollage(dyn, tool);
  } else if (tool.mode === "bulk") {
    initBulk(dyn, tool);
  } else {
    initSingle(dyn, tool);
  }
});

function setBanner(type, msg) {
  const el = document.getElementById("status-banner");
  if (!el) return;
  el.className = msg ? "status-banner " + type : "status-banner";
  el.textContent = msg || "";
}

function initSingle(mount, tool) {
  let currentSource = null, currentBlob = null, settings = { ...tool.defaults }, showingOriginal = false;
  mount.innerHTML = \`
    <div class="studio-grid">
      <div class="studio-panel">
        <div class="panel-head"><span>Studio Controls</span><button type="button" id="reset-btn" class="chip-btn" disabled>Reset</button></div>
        <div id="controls-form"></div>
        <div style="display:flex;flex-direction:column;gap:0.5rem;margin-top:1.1rem;">
          <button type="button" class="btn btn-primary btn-block" id="download-btn" disabled>⬇ Download Image</button>
          <button type="button" class="btn btn-secondary btn-sm btn-block" id="replace-btn" disabled>Choose Another Image</button>
        </div>
      </div>

      <div class="studio-panel">
        <div class="stage-toolbar">
          <span style="font-size:0.82rem;font-weight:700;color:var(--text-muted);" id="file-label">Workspace Preview</span>
          <button type="button" class="chip-btn" id="compare-btn" style="display:none;">👁 Hold to Compare Original</button>
        </div>
        <div id="dropzone-area" class="dropzone" tabindex="0">
          <div class="dropzone-icon">\${ICONS[tool.iconKey] || ICONS.resize}</div>
          <h3>Tap to Upload or Drop Image</h3>
          <p>JPG, PNG, WebP up to 35 MB • Instant Local Processing</p>
          <span class="btn btn-primary btn-sm">Select Photo</span>
          <input type="file" id="file-input" accept="image/jpeg,image/png,image/webp" class="sr-only" />
        </div>
        <div id="preview-wrapper" style="display:none;">
          <div class="preview-stage">
            <canvas id="preview-canvas"></canvas>
            <img id="original-compare-img" style="display:none;" alt="Original preview" />
          </div>
          <div class="stats-bar" id="stats-bar"></div>
        </div>
      </div>
    </div>
  \`;

  const fileInput = document.getElementById("file-input");
  const dropzone = document.getElementById("dropzone-area");
  const previewWrap = document.getElementById("preview-wrapper");
  const previewCanvas = document.getElementById("preview-canvas");
  const origImg = document.getElementById("original-compare-img");
  const compareBtn = document.getElementById("compare-btn");
  const fileLabel = document.getElementById("file-label");
  const statsBar = document.getElementById("stats-bar");
  const downloadBtn = document.getElementById("download-btn");
  const resetBtn = document.getElementById("reset-btn");
  const replaceBtn = document.getElementById("replace-btn");
  const controlsMount = document.getElementById("controls-form");

  function buildControls() {
    if (tool.mode === "inspector") {
      controlsMount.innerHTML = '<p style="font-size:0.84rem;color:var(--text-muted);">Select any photo to inspect exact pixel width, height, aspect ratio, megapixels, and byte size.</p>';
      return;
    }
    const html = [];
    if (tool.presets?.length) {
      html.push('<div class="control-group"><label>1-Tap Presets</label><div class="preset-chips">' + tool.presets.map((p) => '<button type="button" class="chip-btn" data-pw="' + p.w + '" data-ph="' + p.h + '">' + p.label + '</button>').join("") + '</div></div>');
    }
    if (tool.kbPresets?.length) {
      html.push('<div class="control-group"><label>Target Size (KB) <span class="val-pill" id="lbl-kb">' + (settings.targetKb || 50) + ' KB</span></label><input type="number" id="ctrl-kb" class="input-field" min="5" max="5000" value="' + (settings.targetKb || 50) + '" /><div class="preset-chips">' + tool.kbPresets.map((k) => '<button type="button" class="chip-btn" data-kb="' + k + '">' + k + ' KB</button>').join("") + '</div></div>');
    }
    if (["image-resizer", "passport-photo-maker", "signature-resizer", "youtube-thumbnail-resizer", "instagram-image-resizer", "facebook-image-resizer"].includes(tool.id)) {
      html.push('<div class="input-row control-group"><div><label>Width (px)</label><input type="number" id="ctrl-w" class="input-field" value="' + (settings.w || "") + '" /></div><div><label>Height (px)</label><input type="number" id="ctrl-h" class="input-field" value="' + (settings.h || "") + '" /></div></div><div class="control-group"><label style="justify-content:flex-start;gap:0.5rem;cursor:pointer;"><input type="checkbox" id="ctrl-aspect" ' + (settings.lockAspect ? "checked" : "") + ' /> Lock Aspect Ratio</label></div>');
    }
    if (tool.id === "passport-photo-maker") {
      html.push('<div class="control-group"><label style="justify-content:flex-start;gap:0.5rem;cursor:pointer;"><input type="checkbox" id="ctrl-sheet" ' + (settings.printSheet ? "checked" : "") + ' /> 4×6 Inch Printable Multi-Photo Sheet</label></div>');
    }
    if (tool.id === "image-cropper") {
      html.push('<div class="control-group"><label>Aspect Ratio</label><div class="preset-chips"><button type="button" class="chip-btn" data-cr="free">Free</button><button type="button" class="chip-btn" data-cr="1:1">1:1 Square</button><button type="button" class="chip-btn" data-cr="16:9">16:9</button><button type="button" class="chip-btn" data-cr="4:5">4:5 Portrait</button></div></div><div class="input-row control-group"><div><label>Left Offset (%)</label><input type="range" id="ctrl-cx" min="0" max="80" value="' + (settings.cropX ?? 10) + '" /></div><div><label>Top Offset (%)</label><input type="range" id="ctrl-cy" min="0" max="80" value="' + (settings.cropY ?? 10) + '" /></div></div><div class="input-row control-group"><div><label>Crop Width (%)</label><input type="range" id="ctrl-cw" min="15" max="100" value="' + (settings.cropW ?? 80) + '" /></div><div><label>Crop Height (%)</label><input type="range" id="ctrl-ch" min="15" max="100" value="' + (settings.cropH ?? 80) + '" /></div></div>');
    }
    if (tool.id === "rotate-image" || tool.id === "flip-image") {
      html.push('<div class="control-group"><label>Transform</label><div class="segmented-group"><button type="button" class="seg-btn" id="rot-l">↺ -90°</button><button type="button" class="seg-btn" id="rot-r">↻ +90°</button><button type="button" class="seg-btn" id="flp-h">⇄ Flip H</button><button type="button" class="seg-btn" id="flp-v">⇅ Flip V</button></div></div>');
    }
    if (tool.id === "grayscale-image") html.push('<div class="control-group"><label>Grayscale Intensity <span class="val-pill" id="lbl-gray">' + settings.grayscale + '%</span></label><input type="range" id="ctrl-gray" min="0" max="100" value="' + settings.grayscale + '" /></div>');
    if (tool.id === "rounded-corners-image") html.push('<div class="control-group"><label>Corner Radius <span class="val-pill" id="lbl-rad">' + settings.borderRadius + ' px</span></label><input type="range" id="ctrl-rad" min="0" max="220" value="' + settings.borderRadius + '" /></div>');
    if (tool.id === "add-image-border") html.push('<div class="input-row control-group"><div><label>Thickness (px)</label><input type="number" id="ctrl-bw" class="input-field" value="' + settings.borderWidth + '" /></div><div><label>Frame Color</label><input type="color" id="ctrl-bc" class="input-field" value="' + settings.borderColor + '" style="height:38px;" /></div></div>');
    if (tool.id === "image-watermark") html.push('<div class="control-group"><label>Watermark Text</label><input type="text" id="ctrl-wmt" class="input-field" value="' + settings.watermarkText + '" /></div><div class="input-row control-group"><div><label>Size (px)</label><input type="number" id="ctrl-wms" class="input-field" value="' + settings.watermarkSize + '" /></div><div><label>Position</label><select id="ctrl-wmp" class="select-field"><option value="bottom-right">Bottom Right</option><option value="center">Center</option><option value="top-left">Top Left</option></select></div></div>');
    if (tool.id === "blur-image") html.push('<div class="control-group"><label>Blur Strength <span class="val-pill" id="lbl-blur">' + settings.blurRadius + ' px</span></label><input type="range" id="ctrl-blur" min="0" max="40" value="' + settings.blurRadius + '" /></div>');
    if (tool.id === "pixelate-image") html.push('<div class="control-group"><label>Pixel Block Size <span class="val-pill" id="lbl-px">' + settings.pixelSize + ' px</span></label><input type="range" id="ctrl-px" min="1" max="50" value="' + settings.pixelSize + '" /></div>');
    if (tool.id === "meme-maker") html.push('<div class="control-group"><label>Top Caption</label><input type="text" id="ctrl-mt" class="input-field" value="' + settings.memeTop + '" /></div><div class="control-group"><label>Bottom Caption</label><input type="text" id="ctrl-mb" class="input-field" value="' + settings.memeBottom + '" /></div>');

    if (!tool.defaults.lockFormat) {
      const curFmt = settings.format || "original";
      html.push(\`
        <div class="control-group">
          <label>Output Format</label>
          <div class="segmented-group" id="fmt-seg">
            <button type="button" class="seg-btn \${curFmt === "original" ? "active" : ""}" data-fmt="original">Auto</button>
            <button type="button" class="seg-btn \${curFmt === "image/jpeg" ? "active" : ""}" data-fmt="image/jpeg">JPG</button>
            <button type="button" class="seg-btn \${curFmt === "image/png" ? "active" : ""}" data-fmt="image/png">PNG</button>
            <button type="button" class="seg-btn \${curFmt === "image/webp" ? "active" : ""}" data-fmt="image/webp">WebP</button>
          </div>
        </div>
      \`);
    }
    if (tool.id !== "target-file-size") {
      const qVal = Math.round((settings.quality ?? 0.9) * 100);
      html.push('<div class="control-group"><label>Quality <span class="val-pill" id="lbl-q">' + qVal + '%</span></label><input type="range" id="ctrl-q" min="10" max="100" value="' + qVal + '" /></div>');
    }
    controlsMount.innerHTML = html.join("");

    const wEl = document.getElementById("ctrl-w"), hEl = document.getElementById("ctrl-h"), aspEl = document.getElementById("ctrl-aspect");
    wEl?.addEventListener("input", () => {
      settings.w = Number(wEl.value);
      if (aspEl?.checked && currentSource && settings.w > 0) { settings.h = Math.round((settings.w * currentSource.height) / currentSource.width); if (hEl) hEl.value = settings.h; }
      updatePreview();
    });
    hEl?.addEventListener("input", () => {
      settings.h = Number(hEl.value);
      if (aspEl?.checked && currentSource && settings.h > 0) { settings.w = Math.round((settings.h * currentSource.width) / currentSource.height); if (wEl) wEl.value = settings.w; }
      updatePreview();
    });
    controlsMount.querySelectorAll("[data-pw]").forEach((b) => b.addEventListener("click", () => {
      settings.w = Number(b.dataset.pw); settings.h = Number(b.dataset.ph);
      if (wEl) wEl.value = settings.w; if (hEl) hEl.value = settings.h; updatePreview();
    }));
    const kbEl = document.getElementById("ctrl-kb");
    kbEl?.addEventListener("input", () => {
      settings.targetKb = Number(kbEl.value);
      const l = document.getElementById("lbl-kb"); if (l) l.textContent = settings.targetKb + " KB";
      updatePreview();
    });
    controlsMount.querySelectorAll("[data-kb]").forEach((b) => b.addEventListener("click", () => {
      settings.targetKb = Number(b.dataset.kb);
      if (kbEl) kbEl.value = settings.targetKb;
      const l = document.getElementById("lbl-kb"); if (l) l.textContent = settings.targetKb + " KB";
      updatePreview();
    }));
    document.getElementById("ctrl-sheet")?.addEventListener("change", (e) => { settings.printSheet = e.target.checked; updatePreview(); });
    ["x", "y", "w", "h"].forEach((k) => document.getElementById("ctrl-c" + k)?.addEventListener("input", (e) => { settings["crop" + k.toUpperCase()] = Number(e.target.value); updatePreview(); }));
    controlsMount.querySelectorAll("[data-cr]").forEach((b) => b.addEventListener("click", () => {
      const r = b.dataset.cr;
      if (r === "free") { settings.cropX = 0; settings.cropY = 0; settings.cropW = 100; settings.cropH = 100; }
      else if (r === "1:1") { settings.cropX = 10; settings.cropY = 10; settings.cropW = 80; settings.cropH = 80; }
      else if (r === "16:9") { settings.cropX = 5; settings.cropY = 20; settings.cropW = 90; settings.cropH = 56; }
      else if (r === "4:5") { settings.cropX = 15; settings.cropY = 5; settings.cropW = 70; settings.cropH = 88; }
      buildControls(); updatePreview();
    }));
    document.getElementById("rot-l")?.addEventListener("click", () => { settings.rotate = ((settings.rotate || 0) - 90) % 360; updatePreview(); });
    document.getElementById("rot-r")?.addEventListener("click", () => { settings.rotate = ((settings.rotate || 0) + 90) % 360; updatePreview(); });
    document.getElementById("flp-h")?.addEventListener("click", () => { settings.flipH = !settings.flipH; updatePreview(); });
    document.getElementById("flp-v")?.addEventListener("click", () => { settings.flipV = !settings.flipV; updatePreview(); });
    document.getElementById("ctrl-gray")?.addEventListener("input", (e) => { settings.grayscale = Number(e.target.value); document.getElementById("lbl-gray").textContent = settings.grayscale + "%"; updatePreview(); });
    document.getElementById("ctrl-rad")?.addEventListener("input", (e) => { settings.borderRadius = Number(e.target.value); document.getElementById("lbl-rad").textContent = settings.borderRadius + " px"; updatePreview(); });
    document.getElementById("ctrl-bw")?.addEventListener("input", (e) => { settings.borderWidth = Number(e.target.value); updatePreview(); });
    document.getElementById("ctrl-bc")?.addEventListener("input", (e) => { settings.borderColor = e.target.value; updatePreview(); });
    document.getElementById("ctrl-wmt")?.addEventListener("input", (e) => { settings.watermarkText = e.target.value; updatePreview(); });
    document.getElementById("ctrl-wms")?.addEventListener("input", (e) => { settings.watermarkSize = Number(e.target.value); updatePreview(); });
    document.getElementById("ctrl-wmp")?.addEventListener("change", (e) => { settings.watermarkPos = e.target.value; updatePreview(); });
    document.getElementById("ctrl-blur")?.addEventListener("input", (e) => { settings.blurRadius = Number(e.target.value); document.getElementById("lbl-blur").textContent = settings.blurRadius + " px"; updatePreview(); });
    document.getElementById("ctrl-px")?.addEventListener("input", (e) => { settings.pixelSize = Number(e.target.value); document.getElementById("lbl-px").textContent = settings.pixelSize + " px"; updatePreview(); });
    document.getElementById("ctrl-mt")?.addEventListener("input", (e) => { settings.memeTop = e.target.value; updatePreview(); });
    document.getElementById("ctrl-mb")?.addEventListener("input", (e) => { settings.memeBottom = e.target.value; updatePreview(); });
    document.getElementById("fmt-seg")?.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-fmt]");
      if (!btn) return;
      settings.format = btn.dataset.fmt;
      document.querySelectorAll("#fmt-seg .seg-btn").forEach((b) => b.classList.toggle("active", b === btn));
      updatePreview();
    });
    document.getElementById("ctrl-q")?.addEventListener("input", (e) => {
      const v = Number(e.target.value);
      settings.quality = v / 100;
      document.getElementById("lbl-q").textContent = v + "%";
      updatePreview();
    });
  }

  async function loadFile(file) {
    setBanner("", "");
    try {
      if (currentSource?.objectUrl) URL.revokeObjectURL(currentSource.objectUrl);
      currentSource = await validateAndDecodeFile(file);
      origImg.src = currentSource.objectUrl;
      fileLabel.textContent = currentSource.name;
      settings = { ...tool.defaults, w: tool.defaults.w || currentSource.width, h: tool.defaults.h || currentSource.height };
      buildControls();
      dropzone.style.display = "none";
      previewWrap.style.display = "block";
      compareBtn.style.display = "inline-flex";
      resetBtn.disabled = false;
      replaceBtn.disabled = false;
      await updatePreview();
    } catch (err) { setBanner("error", err.message); }
  }

  async function updatePreview() {
    if (!currentSource) return;
    try {
      let outW = 0, outH = 0;
      if (tool.id === "target-file-size" || (tool.id === "signature-resizer" && settings.targetKb)) {
        const res = await compressToTargetKb(currentSource, settings, previewCanvas);
        currentBlob = res.blob;
        outW = res.width; outH = res.height;
        setBanner(res.achieved ? "success" : "warning", (res.achieved ? "✓ Target achieved: " : "Closest possible size: ") + formatBytes(res.blob.size));
      } else {
        const info = renderTransformedCanvas(currentSource, settings, previewCanvas);
        currentBlob = await canvasToBlob(previewCanvas, info.mime, settings.quality ?? 0.92);
        outW = info.width; outH = info.height;
      }
      const diffBytes = currentBlob.size - currentSource.size;
      const diffPct = Math.round((diffBytes / currentSource.size) * 100);
      const deltaBadge = diffBytes <= 0
        ? '<span class="delta-pill saved">' + diffPct + '%</span>'
        : '<span class="delta-pill larger">+' + diffPct + '%</span>';

      statsBar.innerHTML = \`
        <div class="stat-card"><div class="stat-label">Original</div><div class="stat-val">\${currentSource.width}×\${currentSource.height} • \${formatBytes(currentSource.size)}</div></div>
        <div class="stat-card"><div class="stat-label">Output</div><div class="stat-val">\${outW}×\${outH} • \${formatBytes(currentBlob.size)} \${deltaBadge}</div></div>
        <div class="stat-card"><div class="stat-label">Ratio & Format</div><div class="stat-val">\${getAspectRatioString(outW, outH)} • \${mimeToExtension(currentBlob.type).toUpperCase()}</div></div>
      \`;
      downloadBtn.disabled = false;
    } catch (err) { setBanner("error", err.message); }
  }

  // Hold to compare original vs output
  const showOrig = () => { if (!currentSource) return; previewCanvas.style.display = "none"; origImg.style.display = "block"; };
  const hideOrig = () => { if (!currentSource) return; origImg.style.display = "none"; previewCanvas.style.display = "block"; };
  compareBtn.addEventListener("pointerdown", showOrig);
  compareBtn.addEventListener("pointerup", hideOrig);
  compareBtn.addEventListener("pointerleave", hideOrig);

  dropzone.addEventListener("click", () => fileInput.click());
  dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("dragover"); });
  dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
  dropzone.addEventListener("drop", (e) => {
    e.preventDefault(); dropzone.classList.remove("dragover");
    if (e.dataTransfer?.files?.[0]) loadFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener("change", () => { if (fileInput.files?.[0]) loadFile(fileInput.files[0]); });
  resetBtn.addEventListener("click", () => {
    if (!currentSource) return;
    settings = { ...tool.defaults, w: tool.defaults.w || currentSource.width, h: tool.defaults.h || currentSource.height };
    buildControls(); updatePreview();
  });
  replaceBtn.addEventListener("click", () => { fileInput.value = ""; fileInput.click(); });
  downloadBtn.addEventListener("click", () => {
    if (!currentBlob || !currentSource) return;
    const url = URL.createObjectURL(currentBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = sanitizeFilename(currentSource.name.replace(/\\.[^/.]+$/, "") + "-" + tool.id, mimeToExtension(currentBlob.type));
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  });
  buildControls();
}

function initB64Encode(mount) {
  mount.innerHTML = '<div class="studio-grid"><div class="studio-panel"><div class="panel-head">1. Select Image</div><input type="file" id="b64-f" accept="image/*" class="input-field" /></div><div class="studio-panel"><div class="panel-head">2. Base64 Data URL</div><textarea id="b64-out" class="textarea-field" rows="6" readonly placeholder="Data URL will appear here..."></textarea><button type="button" class="btn btn-primary btn-sm" id="b64-cp" style="margin-top:0.6rem;" disabled>Copy Base64 String</button></div></div>';
  const f = document.getElementById("b64-f"), out = document.getElementById("b64-out"), cp = document.getElementById("b64-cp");
  f.addEventListener("change", () => {
    const file = f.files?.[0]; if (!file) return;
    const r = new FileReader();
    r.onload = () => { out.value = String(r.result || ""); cp.disabled = false; };
    r.readAsDataURL(file);
  });
  cp.addEventListener("click", () => { navigator.clipboard.writeText(out.value); setBanner("success", "✓ Base64 copied to clipboard!"); });
}

function initB64Decode(mount) {
  mount.innerHTML = '<div class="studio-grid"><div class="studio-panel"><div class="panel-head">1. Paste Base64</div><textarea id="b64-in" class="textarea-field" rows="6" placeholder="data:image/png;base64,..."></textarea><button type="button" class="btn btn-primary btn-block" id="b64-dec" style="margin-top:0.6rem;">Decode & Preview</button></div><div class="studio-panel"><div class="panel-head">2. Output Image</div><div class="preview-stage" id="b64-st"></div><a id="b64-dl" class="btn btn-primary btn-sm" style="display:none;margin-top:0.75rem;" download="decoded.png">⬇ Download Image</a></div></div>';
  document.getElementById("b64-dec").addEventListener("click", () => {
    const raw = document.getElementById("b64-in").value.trim();
    if (!raw) return;
    const url = raw.startsWith("data:image/") ? raw : "data:image/png;base64," + raw;
    const img = new Image();
    img.onload = () => {
      const st = document.getElementById("b64-st"); st.innerHTML = ""; st.appendChild(img);
      const dl = document.getElementById("b64-dl"); dl.href = url; dl.style.display = "inline-flex";
    };
    img.onerror = () => setBanner("error", "Invalid Base64 string.");
    img.src = url;
  });
}

function initCollage(mount) {
  let imgs = [];
  mount.innerHTML = '<div class="studio-grid"><div class="studio-panel"><div class="panel-head">1. Select 2 to 4 Photos</div><input type="file" id="col-f" accept="image/*" multiple class="input-field" /><button type="button" class="btn btn-primary btn-block" id="col-dl" style="margin-top:0.85rem;" disabled>⬇ Download Collage</button></div><div class="studio-panel"><div class="panel-head">2. 2×2 Grid Preview</div><div class="preview-stage"><canvas id="col-c" width="1200" height="1200"></canvas></div></div></div>';
  const f = document.getElementById("col-f"), c = document.getElementById("col-c"), dl = document.getElementById("col-dl");
  f.addEventListener("change", async () => {
    imgs = [];
    for (const file of Array.from(f.files || []).slice(0, 4)) {
      try { imgs.push(await validateAndDecodeFile(file)); } catch {}
    }
    if (!imgs.length) return;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, 1200, 1200);
    const cells = [{ x: 16, y: 16, w: 576, h: 576 }, { x: 608, y: 16, w: 576, h: 576 }, { x: 16, y: 608, w: 576, h: 576 }, { x: 608, y: 608, w: 576, h: 576 }];
    cells.forEach((cell, i) => {
      if (!imgs[i]) return;
      ctx.drawImage(imgs[i].image, cell.x, cell.y, cell.w, cell.h);
    });
    dl.disabled = false;
  });
  dl.addEventListener("click", async () => {
    const blob = await canvasToBlob(c, "image/jpeg", 0.92);
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "pixelkit-collage.jpg"; a.click();
  });
}

function initBulk(mount, tool) {
  let processedBatch = [];
  mount.innerHTML = \`
    <div class="studio-grid">
      <div class="studio-panel">
        <div class="panel-head">1. Batch Settings</div>
        <div class="control-group"><label>Select Images (Up to 25)</label><input type="file" id="blk-f" accept="image/*" multiple class="input-field" /></div>
        <div class="control-group"><label>Scale (%)</label><input type="number" id="blk-p" class="input-field" value="\${tool.defaults.pct || 100}" /></div>
        <div class="control-group"><label>Output Format</label><select id="blk-fmt" class="select-field"><option value="image/webp">WebP</option><option value="image/jpeg">JPG</option><option value="image/png">PNG</option></select></div>
        <button type="button" class="btn btn-primary btn-block" id="blk-run">⚡ Process Batch</button>
        <button type="button" class="btn btn-secondary btn-block" id="blk-zip" style="margin-top:0.5rem;display:none;">📦 Download All (.ZIP)</button>
      </div>
      <div class="studio-panel">
        <div class="panel-head"><span>2. Processed Queue</span><span id="blk-count">0 files</span></div>
        <ul class="queue-list" id="blk-q"></ul>
      </div>
    </div>
  \`;
  const zipBtn = document.getElementById("blk-zip");
  document.getElementById("blk-run").addEventListener("click", async () => {
    const files = Array.from(document.getElementById("blk-f").files || []).slice(0, 25);
    if (!files.length) { setBanner("error", "Select images first."); return; }
    const pct = Number(document.getElementById("blk-p").value || 100);
    const format = document.getElementById("blk-fmt").value;
    const q = document.getElementById("blk-q"); q.innerHTML = "";
    processedBatch = [];
    const canvas = document.createElement("canvas");
    for (const file of files) {
      const li = document.createElement("li"); li.className = "queue-item"; q.appendChild(li);
      try {
        const src = await validateAndDecodeFile(file);
        renderTransformedCanvas(src, { scaleMode: "pct", pct, format, bgColor: "#ffffff" }, canvas);
        const blob = await canvasToBlob(canvas, format, 0.88);
        URL.revokeObjectURL(src.objectUrl);
        const outName = sanitizeFilename(file.name, mimeToExtension(format));
        processedBatch.push({ name: outName, blob });
        li.innerHTML = '<span><strong>' + outName + '</strong> (' + formatBytes(blob.size) + ')</span><a href="' + URL.createObjectURL(blob) + '" download="' + outName + '" class="btn btn-primary btn-sm">Save</a>';
      } catch { li.innerHTML = '<span>' + file.name + '</span><span style="color:var(--error);">Failed</span>'; }
    }
    document.getElementById("blk-count").textContent = processedBatch.length + " ready";
    if (processedBatch.length > 0) zipBtn.style.display = "inline-flex";
  });

  zipBtn.addEventListener("click", async () => {
    if (!processedBatch.length) return;
    const zipBlob = await createZipBlob(processedBatch);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(zipBlob);
    a.download = "pixelkit-batch.zip";
    a.click();
  });
}
`);

// 9. Clean, Zero-Fluff App Homepage
write("index.html", `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PixelKit Studio — Free Online Image Resizer, 20KB Compressor & Converter</title>
  <meta name="description" content="Fast, private browser studio with 32 free image tools: compress to 20KB/50KB, resize pixels, make passport & signature photos, crop, and convert WebP/PNG/JPG." />
  <link rel="icon" href="./favicon.svg" type="image/svg+xml" />
  <link rel="manifest" href="./manifest.webmanifest" />
  <link rel="stylesheet" href="./assets/css/main.css" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PixelKit Studio",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" }
  }
  </script>
</head>
<body data-root="./">
  <div id="header-mount"></div>
  <main>
    <section class="hero-compact">
      <div class="container">
        <div class="hero-pill"><span class="dot"></span> 100% In-Browser • Zero Server Uploads</div>
        <h1>Pro Image Tools. Zero Wait.</h1>
        <p>Resize, hit exact 20KB/50KB limits, format passport IDs, and convert images locally on your device.</p>

        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="search" id="tool-search-input" class="search-input" placeholder="Search 32 tools (e.g. 20kb, passport, signature, webp, crop)..." autocomplete="off" />
          <button type="button" id="tool-search-clear" class="search-clear" aria-label="Clear">✕</button>
        </div>

        <div class="category-scroll-wrap">
          <div class="category-pills" id="category-pills"></div>
        </div>
      </div>
    </section>

    <section class="section-block" id="all-tools">
      <div class="container">
        <div class="section-header">
          <h2>All Studio Tools</h2>
          <span id="tools-count-label" class="val-pill">32 Tools</span>
        </div>
        <div id="search-empty-state" class="studio-panel" style="display:none;text-align:center;padding:2rem;">
          <h3>No matching tool found</h3>
          <p style="color:var(--text-muted);font-size:0.85rem;margin-top:0.25rem;">Try searching for "compress", "50kb", "passport", or "webp".</p>
        </div>
        <div class="tools-grid" id="all-tools-grid"></div>
      </div>
    </section>
  </main>
  <div id="footer-mount"></div>
  <script type="module" src="./assets/js/home.js"></script>
</body>
</html>
`);

write("404.html", `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>404 Not Found | PixelKit Studio</title>
  <link rel="stylesheet" href="./assets/css/main.css" />
</head>
<body data-root="./">
  <div id="header-mount"></div>
  <main class="container section-block" style="text-align:center;padding:4rem 1rem;">
    <h1>404 — Tool Not Found</h1>
    <p style="color:var(--text-muted);margin:0.5rem auto 1.25rem;">Jump back to the studio directory below.</p>
    <a href="./" class="btn btn-primary">Open All Tools</a>
  </main>
  <div id="footer-mount"></div>
  <script type="module">import { initShell } from "./assets/js/ui-shell.js"; initShell();</script>
</body>
</html>
`);

// 10. Generate all 32 Tool Pages with Rich WebApplication & FAQ Schema
for (const tool of TOOLS_DATA) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": tool.h1 + " — PixelKit Studio",
        "description": tool.shortDesc + " " + tool.intro,
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is the " + tool.title + " free and private?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. It runs 100% locally inside your web browser using the HTML5 Canvas API. Your photos are never uploaded to any server." }
          },
          {
            "@type": "Question",
            "name": "Which image formats are supported?",
            "acceptedAnswer": { "@type": "Answer", "text": "You can upload and process JPG, JPEG, PNG, and WebP files up to 35 MB on mobile or desktop." }
          }
        ]
      }
    ]
  };

  write("tools/" + tool.id + "/index.html", `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${tool.h1} Free Online (No Upload) — PixelKit Studio</title>
  <meta name="description" content="${tool.shortDesc} ${tool.intro} 100% free, private in-browser processing." />
  <link rel="icon" href="../../favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="../../assets/css/main.css" />
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body data-root="../../">
  <div id="header-mount"></div>
  <main id="tool-workspace-root" data-tool-id="${tool.id}"></main>
  <div id="footer-mount"></div>
  <script type="module" src="../../assets/js/workspace.js"></script>
</body>
</html>
  `);
}

// 11. Concise Info Pages
const INFO_PAGES = [
  { slug: "about", title: "About PixelKit Studio", body: "PixelKit Studio is a fast, client-side web application suite for resizing, compressing, and converting images without uploading files to external servers." },
  { slug: "contact", title: "Contact", body: "Need help or have a feature request? Configure your contact details in assets/js/config.js." },
  { slug: "privacy-policy", title: "Privacy Policy", body: "All image processing happens locally on your device via HTML5 Canvas and Blob APIs. We never upload or store your photos." },
  { slug: "terms", title: "Terms of Service", body: "PixelKit Studio tools are provided free of charge on an as-is basis." },
  { slug: "disclaimer", title: "Disclaimer", body: "Always verify official government and exam portal specifications before submitting passport or signature files." },
  { slug: "how-to-use", title: "How to Use", body: "Pick any tool, select a photo, adjust presets or sliders, and download immediately." },
  { slug: "faq", title: "FAQ", body: "All 32 tools work offline-style in your browser with zero watermarks or registration." },
  { slug: "blog", title: "Optimization Guides", body: "Tips for compressing exam signatures under 20KB and converting PNG to WebP." }
];

for (const p of INFO_PAGES) {
  write("pages/" + p.slug + "/index.html", `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${p.title} | PixelKit Studio</title>
  <link rel="icon" href="../../favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="../../assets/css/main.css" />
</head>
<body data-root="../../">
  <div id="header-mount"></div>
  <main class="container section-block"><div class="studio-panel" style="max-width:720px;margin:0 auto;"><h1>${p.title}</h1><p style="margin-top:0.6rem;color:var(--text-muted);">${p.body}</p></div></main>
  <div id="footer-mount"></div>
  <script type="module">import { initShell } from "../../assets/js/ui-shell.js"; initShell();</script>
</body>
</html>
  `);
}

// 12. Sitemap
const urls = [
  "https://pixelkit.pages.dev/",
  ...TOOLS_DATA.map((t) => "https://pixelkit.pages.dev/tools/" + t.id + "/"),
  ...INFO_PAGES.map((p) => "https://pixelkit.pages.dev/pages/" + p.slug + "/")
];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => "  <url><loc>" + u + "</loc></url>").join("\n")}\n</urlset>`);

console.log("PixelKit Studio V2 built successfully!");
