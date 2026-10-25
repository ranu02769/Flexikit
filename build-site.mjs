import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
function write(relPath, content) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trimStart(), "utf8");
}

// 1. Static Root Assets
write("favicon.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="14" fill="#2563EB"/>
  <path d="M16 44L26 31L35 42L42 33L48 44H16Z" fill="#ffffff"/>
  <circle cx="42" cy="22" r="5" fill="#93C5FD"/>
  <rect x="12" y="12" width="40" height="40" rx="8" stroke="#ffffff" stroke-width="4"/>
</svg>
`);

write("manifest.webmanifest", JSON.stringify({
  name: "PixelKit — Free Online Image Tools",
  short_name: "PixelKit",
  description: "Resize, compress, crop, and convert images locally in your browser.",
  start_url: "./",
  display: "standalone",
  background_color: "#F8FAFC",
  theme_color: "#2563EB",
  icons: [{ src: "./favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any maskable" }]
}, null, 2));

write("robots.txt", `
User-agent: *
Allow: /
`);

write("_headers", `
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
`);

// 2. CSS Design System
write("assets/css/main.css", `
:root {
  --bg-page: #f8fafc;
  --bg-surface: #ffffff;
  --bg-subtle: #f1f5f9;
  --bg-canvas: #e2e8f0;
  --text-main: #0f172a;
  --text-muted: #475569;
  --text-light: #64748b;
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --primary-soft: #eff6ff;
  --border: #e2e8f0;
  --border-strong: #cbd5e1;
  --success: #15803d;
  --success-bg: #dcfce7;
  --warning: #b45309;
  --warning-bg: #fef3c7;
  --error: #b91c1c;
  --error-bg: #fee2e2;
  --container-max: 1200px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.05);
  --shadow-md: 0 4px 12px rgba(15, 23, 42, 0.08);
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
[data-theme="dark"] {
  --bg-page: #0b0f19;
  --bg-surface: #111827;
  --bg-subtle: #1e293b;
  --bg-canvas: #0f172a;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --text-light: #64748b;
  --primary: #3b82f6;
  --primary-hover: #60a5fa;
  --primary-soft: rgba(59, 130, 246, 0.15);
  --border: #1e293b;
  --border-strong: #334155;
  --success: #4ade80;
  --success-bg: rgba(22, 163, 74, 0.2);
  --warning: #fbbf24;
  --warning-bg: rgba(217, 119, 6, 0.2);
  --error: #f87171;
  --error-bg: rgba(220, 38, 38, 0.2);
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-family: var(--font-sans); color: var(--text-main); background-color: var(--bg-page); line-height: 1.6; -webkit-text-size-adjust: 100%; }
body { min-height: 100vh; display: flex; flex-direction: column; overflow-x: hidden; }
a { color: var(--primary); text-decoration: none; transition: color var(--transition); }
a:hover { color: var(--primary-hover); }
img, svg, canvas { max-width: 100%; display: block; }
button, input, select, textarea { font: inherit; color: inherit; }
button { cursor: pointer; }
:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0; }
.container { width: 100%; max-width: var(--container-max); margin: 0 auto; padding: 0 1rem; }
.announcement-bar { background: var(--primary-soft); color: var(--text-main); border-bottom: 1px solid var(--border); font-size: 0.85rem; padding: 0.5rem 1rem; }
.announcement-inner { max-width: var(--container-max); margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.announcement-close { background: transparent; border: none; color: var(--text-muted); padding: 0.2rem 0.5rem; }
.site-header { position: sticky; top: 0; z-index: 50; background: var(--bg-surface); border-bottom: 1px solid var(--border); }
.header-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; gap: 0.75rem; }
.brand-logo { display: inline-flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 1.2rem; color: var(--text-main); }
.brand-logo svg { width: 30px; height: 30px; }
.nav-links { display: flex; align-items: center; gap: 1.15rem; list-style: none; }
.nav-links a { color: var(--text-muted); font-weight: 500; font-size: 0.92rem; }
.nav-links a:hover { color: var(--text-main); }
.header-actions { display: flex; align-items: center; gap: 0.5rem; }
.mobile-menu-toggle { display: none; background: transparent; border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.35rem 0.6rem; }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.6rem 1.1rem; border-radius: var(--radius-sm); font-weight: 600; font-size: 0.92rem; border: 1px solid transparent; transition: background var(--transition); }
.btn:disabled { opacity: 0.55; cursor: not-allowed; }
.btn-primary { background: var(--primary); color: #ffffff; }
.btn-primary:hover:not(:disabled) { background: var(--primary-hover); color: #ffffff; }
.btn-secondary { background: var(--bg-subtle); color: var(--text-main); border-color: var(--border-strong); }
.btn-secondary:hover:not(:disabled) { background: var(--border); }
.btn-sm { padding: 0.35rem 0.7rem; font-size: 0.8rem; }
.btn-block { width: 100%; }
.hero { padding: 2.25rem 0 1.75rem; border-bottom: 1px solid var(--border); background: var(--bg-surface); }
.hero-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 1.75rem; align-items: center; }
.hero h1 { font-size: clamp(1.75rem, 3.5vw, 2.6rem); line-height: 1.18; margin-bottom: 0.75rem; }
.hero p { font-size: 1rem; color: var(--text-muted); margin-bottom: 1.25rem; max-width: 58ch; }
.hero-cta { display: flex; flex-wrap: wrap; gap: 0.65rem; }
.hero-card { background: var(--bg-subtle); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.15rem; }
.search-section { padding: 1.5rem 0 0.75rem; }
.search-bar-wrap { position: relative; max-width: 680px; margin: 0 auto 1rem; }
.search-input { width: 100%; padding: 0.8rem 2.5rem 0.8rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-strong); background: var(--bg-surface); font-size: 0.95rem; box-shadow: var(--shadow-sm); }
.search-clear { position: absolute; right: 0.65rem; top: 50%; transform: translateY(-50%); background: transparent; border: none; color: var(--text-muted); padding: 0.25rem 0.5rem; display: none; }
.category-pills { display: flex; flex-wrap: wrap; gap: 0.45rem; justify-content: center; }
.pill { background: var(--bg-surface); border: 1px solid var(--border); color: var(--text-muted); padding: 0.35rem 0.8rem; border-radius: 999px; font-size: 0.82rem; font-weight: 500; }
.pill.active, .pill:hover { background: var(--primary); color: #ffffff; border-color: var(--primary); }
.section-block { padding: 1.75rem 0; }
.section-header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 1rem; gap: 1rem; flex-wrap: wrap; }
.section-header h2 { font-size: 1.35rem; }
.tools-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(255px, 1fr)); gap: 0.9rem; }
.tool-card { background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1.15rem; display: flex; flex-direction: column; gap: 0.5rem; transition: border-color var(--transition), box-shadow var(--transition); color: var(--text-main); }
.tool-card:hover { border-color: var(--primary); box-shadow: var(--shadow-md); }
.tool-card-top { display: flex; align-items: center; justify-content: space-between; }
.tool-icon { width: 36px; height: 36px; border-radius: var(--radius-sm); background: var(--primary-soft); color: var(--primary); display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; }
.badge { font-size: 0.7rem; font-weight: 600; padding: 0.18rem 0.5rem; border-radius: 999px; background: var(--bg-subtle); color: var(--text-muted); }
.tool-card h3 { font-size: 1rem; }
.tool-card p { font-size: 0.85rem; color: var(--text-muted); flex-grow: 1; }
.breadcrumbs { display: flex; flex-wrap: wrap; gap: 0.35rem; font-size: 0.82rem; color: var(--text-muted); margin: 1rem 0 0.5rem; list-style: none; }
.tool-header h1 { font-size: clamp(1.4rem, 2.5vw, 2rem); margin-bottom: 0.3rem; }
.tool-header p { color: var(--text-muted); margin-bottom: 1.25rem; font-size: 0.95rem; }
.workspace-grid { display: grid; grid-template-columns: 350px 1fr; gap: 1.25rem; align-items: start; }
.panel { background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1.15rem; }
.panel-title { font-size: 0.98rem; font-weight: 600; margin-bottom: 0.85rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border); }
.dropzone { border: 2px dashed var(--border-strong); border-radius: var(--radius-md); background: var(--bg-subtle); padding: 1.85rem 1rem; text-align: center; cursor: pointer; }
.dropzone:hover, .dropzone.dragover { border-color: var(--primary); background: var(--primary-soft); }
.dropzone h3 { font-size: 1rem; margin-bottom: 0.3rem; }
.dropzone p { font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.85rem; }
.control-group { margin-bottom: 0.9rem; }
.control-group label { display: flex; justify-content: space-between; font-size: 0.84rem; font-weight: 500; margin-bottom: 0.3rem; }
.input-field, .select-field, .textarea-field { width: 100%; padding: 0.5rem 0.7rem; border: 1px solid var(--border-strong); border-radius: var(--radius-sm); background: var(--bg-surface); }
.input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; }
.checkbox-label { display: inline-flex; align-items: center; gap: 0.45rem; font-size: 0.84rem; cursor: pointer; }
.preset-grid { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.35rem; }
.preview-stage { background: var(--bg-canvas); border: 1px solid var(--border); border-radius: var(--radius-sm); min-height: 300px; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 0.75rem; }
.preview-stage canvas { max-height: 440px; width: auto; height: auto; box-shadow: var(--shadow-md); }
.meta-bar { display: flex; flex-wrap: wrap; gap: 0.6rem; justify-content: space-between; margin-top: 0.85rem; padding: 0.65rem; background: var(--bg-subtle); border-radius: var(--radius-sm); font-size: 0.8rem; }
.status-banner { padding: 0.7rem 0.9rem; border-radius: var(--radius-sm); font-size: 0.85rem; margin-bottom: 0.9rem; display: none; }
.status-banner.error { display: block; background: var(--error-bg); color: var(--error); }
.status-banner.success { display: block; background: var(--success-bg); color: var(--success); }
.status-banner.warning { display: block; background: var(--warning-bg); color: var(--warning); }
.queue-list { list-style: none; margin-top: 0.85rem; display: flex; flex-direction: column; gap: 0.45rem; }
.queue-item { display: flex; align-items: center; justify-content: space-between; gap: 0.6rem; padding: 0.6rem 0.75rem; background: var(--bg-subtle); border: 1px solid var(--border); border-radius: var(--radius-sm); font-size: 0.82rem; flex-wrap: wrap; }
.editorial-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 1.25rem; margin-top: 2rem; }
.faq-list details { background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.75rem 0.95rem; margin-bottom: 0.5rem; }
.faq-list summary { font-weight: 600; cursor: pointer; font-size: 0.92rem; }
.faq-list p { margin-top: 0.45rem; color: var(--text-muted); font-size: 0.88rem; }
.site-footer { margin-top: auto; background: var(--bg-surface); border-top: 1px solid var(--border); padding: 2.5rem 0 1.75rem; font-size: 0.84rem; color: var(--text-muted); }
.footer-grid { display: grid; grid-template-columns: 1.4fr repeat(3, 1fr); gap: 1.5rem; margin-bottom: 1.5rem; }
.footer-col h4 { color: var(--text-main); margin-bottom: 0.65rem; font-size: 0.92rem; }
.footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
@media (max-width: 920px) { .hero-grid, .workspace-grid, .editorial-grid, .footer-grid { grid-template-columns: 1fr; } }
@media (max-width: 720px) {
  .mobile-menu-toggle { display: inline-flex; }
  .nav-links { display: none; position: absolute; top: 64px; left: 0; right: 0; background: var(--bg-surface); border-bottom: 1px solid var(--border); flex-direction: column; align-items: flex-start; padding: 1rem; gap: 0.75rem; box-shadow: var(--shadow-md); }
  .nav-links.open { display: flex; }
}
`);

// 3. Config JS
write("assets/js/config.js", `
export const SITE_CONFIG = {
  brandName: "PixelKit",
  tagline: "Free Online Image Tools. Simple, Fast, Private.",
  origin: "https://pixelkit.pages.dev",
  supportContactNote: "Update your contact endpoint or support email inside assets/js/config.js.",
  announcement: {
    enabled: true,
    id: "v1-local-privacy",
    text: "100% Client-Side: Your photos are processed inside your browser and are never uploaded to any server."
  },
  limits: {
    maxFileSizeBytes: 35 * 1024 * 1024,
    maxCanvasDimension: 8192,
    maxBulkFiles: 25
  },
  ads: {
    enabled: false,
    provider: "adsense",
    clientId: ""
  }
};
`);

// 4. Tool Registry JS
const TOOLS_DATA = [
  { id: "image-resizer", title: "Image Resizer", category: "resize", popular: true, mode: "single", icon: "↔", shortDesc: "Resize JPG, PNG, and WebP images by exact pixels or percentage.", h1: "Free Online Image Resizer", intro: "Change image width and height in pixels or scale by percentage while locking aspect ratio.", keywords: ["resize image", "change dimensions", "scale photo"], defaults: { scaleMode: "px", lockAspect: true, format: "original", quality: 0.92 }, presets: [{ label: "HD (1280×720)", w: 1280, h: 720 }, { label: "Full HD (1920×1080)", w: 1920, h: 1080 }, { label: "Square (1080×1080)", w: 1080, h: 1080 }] },
  { id: "image-compressor", title: "Image Compressor", category: "compress", popular: true, mode: "single", icon: "⚡", shortDesc: "Reduce JPG and WebP file size with live before/after byte comparison.", h1: "Compress Images Online", intro: "Adjust compression quality and inspect exact byte savings before downloading.", keywords: ["compress image", "reduce file size", "optimize jpg"], defaults: { format: "image/jpeg", quality: 0.75, bgColor: "#ffffff" } },
  { id: "target-file-size", title: "Target File Size Compressor", category: "compress", popular: true, mode: "single", icon: "🎯", shortDesc: "Compress photos toward a target KB limit like 20 KB, 50 KB, or 100 KB.", h1: "Compress Image to Target KB Size", intro: "Automatically runs a multi-pass quality search in your browser to reach your target KB limit.", keywords: ["compress to 50kb", "20kb photo", "100kb image"], defaults: { targetKb: 50, format: "image/jpeg", allowDownscale: true, bgColor: "#ffffff" }, kbPresets: [20, 50, 100, 200] },
  { id: "image-cropper", title: "Image Cropper", category: "crop-rotate", popular: true, mode: "single", icon: "✂", shortDesc: "Crop images freely or lock to 1:1, 16:9, 4:3, and portrait ratios.", h1: "Crop Image Online", intro: "Frame the exact region you want to keep using aspect ratio presets or custom crop coordinates.", keywords: ["crop photo", "trim image", "1:1 square crop"], defaults: { cropRatio: "free", cropX: 10, cropY: 10, cropW: 80, cropH: 80, format: "original" } },
  { id: "image-converter", title: "Image Converter", category: "convert", popular: true, mode: "single", icon: "⇄", shortDesc: "Convert images between JPG, PNG, and WebP formats in your browser.", h1: "Online Image Format Converter", intro: "Convert between JPG, PNG, and WebP with configurable background fill for transparent images.", keywords: ["convert image", "jpg png webp"], defaults: { format: "image/webp", quality: 0.9, bgColor: "#ffffff" } },
  { id: "jpg-to-png", title: "JPG to PNG Converter", category: "convert", popular: false, mode: "single", icon: "PNG", shortDesc: "Convert JPEG photos into lossless PNG files.", h1: "Convert JPG to PNG Online", intro: "Export any JPG or JPEG image into a lossless PNG container directly in your browser.", keywords: ["jpg to png", "jpeg to png"], defaults: { format: "image/png", lockFormat: true } },
  { id: "png-to-jpg", title: "PNG to JPG Converter", category: "convert", popular: false, mode: "single", icon: "JPG", shortDesc: "Convert transparent PNG images to JPG with custom background color.", h1: "Convert PNG to JPG Online", intro: "Choose a clean background fill color (white by default) and convert PNG files to JPEG.", keywords: ["png to jpg", "transparent png to jpg"], defaults: { format: "image/jpeg", lockFormat: true, quality: 0.9, bgColor: "#ffffff" } },
  { id: "webp-converter", title: "WebP Converter", category: "convert", popular: false, mode: "single", icon: "W", shortDesc: "Convert images to or from modern WebP format.", h1: "Online WebP Image Converter", intro: "Encode images into lightweight WebP files or convert WebP back to PNG/JPG.", keywords: ["webp converter", "to webp"], defaults: { format: "image/webp", quality: 0.88 } },
  { id: "png-to-webp", title: "PNG to WebP", category: "convert", popular: false, mode: "single", icon: "P→W", shortDesc: "Compress PNG graphics into smaller WebP files while preserving transparency.", h1: "Convert PNG to WebP Online", intro: "WebP supports transparency like PNG while reducing file sizes significantly.", keywords: ["png to webp", "transparent webp"], defaults: { format: "image/webp", lockFormat: true, quality: 0.9 } },
  { id: "jpg-to-webp", title: "JPG to WebP", category: "convert", popular: false, mode: "single", icon: "J→W", shortDesc: "Convert JPG photos into modern WebP images for faster websites.", h1: "Convert JPG to WebP Online", intro: "Optimize photographs for modern browsers by exporting JPG files to WebP.", keywords: ["jpg to webp", "jpeg to webp"], defaults: { format: "image/webp", lockFormat: true, quality: 0.85 } },
  { id: "webp-to-jpg", title: "WebP to JPG", category: "convert", popular: false, mode: "single", icon: "W→J", shortDesc: "Turn WebP images into universally compatible JPEG files.", h1: "Convert WebP to JPG Online", intro: "Convert downloaded WebP files into standard JPG format for forms and editors.", keywords: ["webp to jpg", "webp to jpeg"], defaults: { format: "image/jpeg", lockFormat: true, quality: 0.92, bgColor: "#ffffff" } },
  { id: "rotate-image", title: "Rotate Image", category: "crop-rotate", popular: false, mode: "single", icon: "↻", shortDesc: "Rotate images 90° clockwise, counterclockwise, or 180°.", h1: "Rotate Image Online", intro: "Fix sideways or upside-down photos and export with updated dimensions.", keywords: ["rotate photo", "turn image 90 degrees"], defaults: { rotate: 0, format: "original" } },
  { id: "flip-image", title: "Flip Image", category: "crop-rotate", popular: false, mode: "single", icon: "⇄", shortDesc: "Mirror images horizontally or vertically with one click.", h1: "Flip & Mirror Image Online", intro: "Flip selfies or graphics horizontally or vertically directly in your browser.", keywords: ["flip image", "mirror photo"], defaults: { flipH: false, flipV: false, format: "original" } },
  { id: "image-dimensions", title: "Image Dimensions Finder", category: "utilities", popular: false, mode: "inspector", icon: "📐", shortDesc: "Check exact pixel width, height, aspect ratio, MIME type, and byte size.", h1: "Check Image Dimensions & File Details", intro: "Inspect natural pixel dimensions, aspect ratio, and file size locally.", keywords: ["image dimensions", "check photo size"], defaults: {} },
  { id: "image-upscaler-guide", title: "Image Resolution & Upscaling Guide", category: "utilities", popular: false, mode: "guide", icon: "ℹ", shortDesc: "Learn how browser interpolation works vs. true AI super-resolution.", h1: "Understanding Image Upscaling vs. Browser Resizing", intro: "An honest technical breakdown of browser bicubic interpolation vs. neural super-resolution.", keywords: ["image upscaler guide", "high dpi resize"], defaults: {} },
  { id: "passport-photo-maker", title: "Passport Photo Maker", category: "photo-id", popular: true, mode: "single", icon: "🪪", shortDesc: "Crop portraits to common ID dimensions (2×2 in, 35×45 mm) or print sheets.", h1: "Online Passport & ID Photo Cropper", intro: "Frame portrait photos using standard 300 DPI reference sizes or generate a 4×6 print sheet.", keywords: ["passport size photo", "2x2 inch photo", "35x45mm photo"], defaults: { w: 600, h: 600, lockAspect: true, printSheet: false, format: "image/jpeg", quality: 0.95, bgColor: "#ffffff" }, presets: [{ label: "2×2 in (600×600 px)", w: 600, h: 600 }, { label: "35×45 mm (413×531 px)", w: 413, h: 531 }, { label: "Exam Portal (200×230 px)", w: 200, h: 230 }] },
  { id: "signature-resizer", title: "Signature Resizer", category: "photo-id", popular: true, mode: "single", icon: "✍", shortDesc: "Resize scanned signatures to exam portal dimensions and KB limits.", h1: "Online Signature Image Resizer", intro: "Format signature scans to common application dimensions (140×60 px) and compress under 20 KB.", keywords: ["signature resizer", "140x60 signature", "20kb signature"], defaults: { w: 140, h: 60, lockAspect: false, targetKb: 20, format: "image/jpeg", bgColor: "#ffffff" }, presets: [{ label: "140×60 px (Standard)", w: 140, h: 60 }, { label: "300×100 px", w: 300, h: 100 }] },
  { id: "youtube-thumbnail-resizer", title: "YouTube Thumbnail Resizer", category: "social", popular: true, mode: "single", icon: "▶", shortDesc: "Format images to 1280×720 px (16:9) and keep file size under 2 MB.", h1: "YouTube Thumbnail Resizer", intro: "Resize cover graphics to standard 16:9 YouTube thumbnail dimensions.", keywords: ["youtube thumbnail size", "1280x720 resizer"], defaults: { w: 1280, h: 720, lockAspect: true, format: "image/jpeg", quality: 0.9 }, presets: [{ label: "1280×720 (HD)", w: 1280, h: 720 }, { label: "1920×1080 (FHD)", w: 1920, h: 1080 }] },
  { id: "instagram-image-resizer", title: "Instagram Image Resizer", category: "social", popular: false, mode: "single", icon: "📷", shortDesc: "Resize photos for Square (1:1), Portrait (4:5), and Story (9:16) posts.", h1: "Instagram Photo Resizer", intro: "Prepare images for Instagram feed, portrait, and story dimensions.", keywords: ["instagram size", "1080x1350 resizer"], defaults: { w: 1080, h: 1350, lockAspect: true, format: "image/jpeg", quality: 0.92 }, presets: [{ label: "Portrait (1080×1350)", w: 1080, h: 1350 }, { label: "Square (1080×1080)", w: 1080, h: 1080 }, { label: "Story (1080×1920)", w: 1080, h: 1920 }] },
  { id: "facebook-image-resizer", title: "Facebook Image Resizer", category: "social", popular: false, mode: "single", icon: "f", shortDesc: "Resize images for shared links, feed posts, and cover photos.", h1: "Facebook Image Resizer", intro: "Use presets for common Facebook post and cover dimensions.", keywords: ["facebook post size", "1200x630 resizer"], defaults: { w: 1200, h: 630, lockAspect: true, format: "image/jpeg", quality: 0.9 }, presets: [{ label: "Link Post (1200×630)", w: 1200, h: 630 }, { label: "Square (1080×1080)", w: 1080, h: 1080 }] },
  { id: "image-to-base64", title: "Image to Base64", category: "utilities", popular: false, mode: "base64-encode", icon: "{ }", shortDesc: "Encode images into Base64 Data URLs or raw strings for HTML/CSS.", h1: "Convert Image to Base64 Online", intro: "Generate a Data URL to embed small icons directly into HTML, CSS, or JSON.", keywords: ["image to base64", "data url generator"], defaults: {} },
  { id: "base64-to-image", title: "Base64 to Image", category: "utilities", popular: false, mode: "base64-decode", icon: "🖼", shortDesc: "Decode Base64 strings or Data URLs back into downloadable image files.", h1: "Convert Base64 to Image Online", intro: "Paste a valid Base64 image string or Data URL to preview and download the decoded image.", keywords: ["base64 to image", "decode data url"], defaults: {} },
  { id: "grayscale-image", title: "Grayscale Image Converter", category: "effects", popular: false, mode: "single", icon: "◑", shortDesc: "Convert color photos to black-and-white with adjustable intensity.", h1: "Convert Image to Grayscale Online", intro: "Apply clean black-and-white desaturation with a live intensity slider.", keywords: ["grayscale image", "black and white photo"], defaults: { grayscale: 100, format: "original" } },
  { id: "rounded-corners-image", title: "Rounded Corners Image", category: "effects", popular: false, mode: "single", icon: "▢", shortDesc: "Add smooth rounded corners to any photo and export as transparent PNG.", h1: "Round Image Corners Online", intro: "Adjust corner radius in pixels and export as PNG or WebP to preserve transparent corners.", keywords: ["round corners image", "border radius photo"], defaults: { borderRadius: 48, format: "image/png" } },
  { id: "circular-image-cropper", title: "Circular Image Cropper", category: "effects", popular: false, mode: "single", icon: "◯", shortDesc: "Crop avatars and profile pictures into a circle with transparent background.", h1: "Crop Image into a Circle Online", intro: "Create circular profile avatars exported in PNG or WebP format with alpha transparency.", keywords: ["circle crop", "round profile picture"], defaults: { circleCrop: true, format: "image/png" } },
  { id: "add-image-border", title: "Add Border to Image", category: "effects", popular: false, mode: "single", icon: "▣", shortDesc: "Frame photos with a solid colored border of custom pixel thickness.", h1: "Add Border to Image Online", intro: "Frame your image with a clean solid-color border.", keywords: ["add border to photo", "image frame"], defaults: { borderWidth: 24, borderColor: "#ffffff", format: "original" } },
  { id: "image-watermark", title: "Add Watermark to Image", category: "effects", popular: false, mode: "single", icon: "©", shortDesc: "Stamp customizable copyright text over your photos locally.", h1: "Watermark Images Online", intro: "Add custom text, font size, and position to protect your visual work.", keywords: ["add watermark", "text overlay photo"], defaults: { watermarkText: "© PixelKit", watermarkOpacity: 75, watermarkSize: 36, watermarkColor: "#ffffff", watermarkPos: "bottom-right", format: "original" } },
  { id: "blur-image", title: "Blur Image", category: "effects", popular: false, mode: "single", icon: "≈", shortDesc: "Apply smooth Gaussian blur to photos with adjustable radius.", h1: "Blur Image Online", intro: "Soften backgrounds or obscure details with an adjustable blur radius.", keywords: ["blur photo", "gaussian blur"], defaults: { blurRadius: 8, format: "original" } },
  { id: "pixelate-image", title: "Pixelate Image", category: "effects", popular: false, mode: "single", icon: "▦", shortDesc: "Create retro pixel-art effects or censor sensitive image details.", h1: "Pixelate Image Online", intro: "Adjust pixel block size to create 8-bit styles or obscure private text.", keywords: ["pixelate image", "mosaic censor"], defaults: { pixelSize: 12, format: "original" } },
  { id: "meme-maker", title: "Meme Maker", category: "effects", popular: false, mode: "single", icon: "💬", shortDesc: "Add classic bold top and bottom captions with black stroke outline.", h1: "Free Online Meme Generator", intro: "Upload any image, type your top and bottom text, and export immediately.", keywords: ["meme maker", "top bottom text image"], defaults: { memeTop: "WHEN CODE COMPILES", memeBottom: "ON THE FIRST TRY", memeFontSize: 44, format: "image/jpeg", quality: 0.92 } },
  { id: "collage-maker", title: "Photo Collage Maker", category: "effects", popular: false, mode: "collage", icon: "⊞", shortDesc: "Combine 2 to 4 images into side-by-side, vertical, or 2×2 grid layouts.", h1: "Online Photo Collage Maker", intro: "Select multiple photos, pick a grid layout, adjust spacing, and export a combined image.", keywords: ["collage maker", "combine photos"], defaults: { layout: "grid-2x2", gap: 16, bgColor: "#ffffff", canvasSize: 1200 } },
  { id: "bulk-image-resizer", title: "Bulk Image Resizer", category: "bulk", popular: true, mode: "bulk", icon: "📚", shortDesc: "Resize up to 25 images in your browser with per-file status tracking.", h1: "Bulk Image Resizer Online", intro: "Select multiple images at once, apply shared scale settings, and download each processed file.", keywords: ["bulk resize images", "batch photo resizer"], defaults: { scaleMode: "pct", pct: 50, format: "image/jpeg", quality: 0.9 } },
  { id: "bulk-image-converter", title: "Bulk Image Converter", category: "bulk", popular: false, mode: "bulk", icon: "🗂", shortDesc: "Batch-convert multiple JPG, PNG, and WebP files locally.", h1: "Bulk Image Format Converter", intro: "Convert a queue of images to WebP, JPG, or PNG in one batch.", keywords: ["batch image converter", "bulk png to webp"], defaults: { scaleMode: "pct", pct: 100, format: "image/webp", quality: 0.88, bgColor: "#ffffff" } }
];

write("assets/js/tool-registry.js", `
export const TOOL_CATEGORIES = [
  { id: "all", name: "All Tools" },
  { id: "resize", name: "Resize & Dimensions" },
  { id: "compress", name: "Compress Images" },
  { id: "convert", name: "Convert Formats" },
  { id: "crop-rotate", name: "Crop, Rotate & Flip" },
  { id: "photo-id", name: "Photo & Signature" },
  { id: "social", name: "Social Media" },
  { id: "effects", name: "Creative & Effects" },
  { id: "bulk", name: "Bulk Processing" },
  { id: "utilities", name: "Image Utilities" }
];
export const TOOLS = ${JSON.stringify(TOOLS_DATA, null, 2)};
export function getToolById(id) {
  return TOOLS.find((t) => t.id === id) || null;
}
`);

// 5. Image Engine JS
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
  if (!file) throw new Error("Please select an image file first.");
  if (!SUPPORTED_INPUT_TYPES.includes(file.type)) {
    throw new Error("Unsupported file format. Please select a JPG, PNG, or WebP image.");
  }
  if (file.size > SITE_CONFIG.limits.maxFileSizeBytes) {
    throw new Error("File exceeds the 35 MB browser safety limit.");
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
      throw new Error("Image dimensions exceed safe browser canvas limit (8192 px).");
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
      if (!blob) { reject(new Error("Browser failed to encode output image.")); return; }
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
    ctx.font = "600 " + fontSize + "px system-ui, sans-serif";
    ctx.fillStyle = settings.watermarkColor || "#ffffff";
    ctx.globalAlpha = 0.78;
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
  }
  return { blob: bestBlob, quality: bestQuality, achieved: bestBlob.size <= targetBytes, width: previewCanvas.width, height: previewCanvas.height, mime };
}
`);

// 6. UI Shell JS (Relative Prefix Aware for GitHub Pages & Cloudflare Pages)
write("assets/js/ui-shell.js", `
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
  mount.innerHTML = \`
    <header class="site-header">
      <div class="container header-inner">
        <a href="\${root}" class="brand-logo">
          <svg viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="14" fill="#2563EB"/><path d="M16 44L26 31L35 42L42 33L48 44H16Z" fill="#fff"/><circle cx="42" cy="22" r="5" fill="#93C5FD"/></svg>
          <span>\${SITE_CONFIG.brandName}</span>
        </a>
        <button type="button" class="mobile-menu-toggle" id="mobile-menu-btn">Menu ☰</button>
        <ul class="nav-links" id="primary-nav">
          <li><a href="\${root}#all-tools">All Tools (\${TOOLS.length})</a></li>
          <li><a href="\${root}tools/image-resizer/">Resize</a></li>
          <li><a href="\${root}tools/image-compressor/">Compress</a></li>
          <li><a href="\${root}tools/target-file-size/">Target KB</a></li>
          <li><a href="\${root}tools/passport-photo-maker/">Passport & ID</a></li>
          <li><a href="\${root}pages/faq/">FAQ</a></li>
        </ul>
        <div class="header-actions">
          <button type="button" class="btn btn-secondary btn-sm" id="theme-toggle-btn">◐</button>
          <a href="\${root}#all-tools" class="btn btn-primary btn-sm">Tools</a>
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
            <h4>\${SITE_CONFIG.brandName}</h4>
            <p>Fast, private, client-side online image utilities powered by native HTML5 Canvas.</p>
          </div>
          <div class="footer-col">
            <h4>Popular Tools</h4>
            <ul>
              <li><a href="\${root}tools/image-resizer/">Image Resizer</a></li>
              <li><a href="\${root}tools/image-compressor/">Image Compressor</a></li>
              <li><a href="\${root}tools/target-file-size/">Target KB Compressor</a></li>
              <li><a href="\${root}tools/passport-photo-maker/">Passport Photo Maker</a></li>
              <li><a href="\${root}tools/signature-resizer/">Signature Resizer</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>More Utilities</h4>
            <ul>
              <li><a href="\${root}tools/image-converter/">Format Converter</a></li>
              <li><a href="\${root}tools/image-cropper/">Image Cropper</a></li>
              <li><a href="\${root}tools/bulk-image-resizer/">Bulk Image Resizer</a></li>
              <li><a href="\${root}tools/collage-maker/">Photo Collage Maker</a></li>
              <li><a href="\${root}tools/meme-maker/">Meme Maker</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Info & Legal</h4>
            <ul>
              <li><a href="\${root}pages/about/">About</a></li>
              <li><a href="\${root}pages/how-to-use/">How to Use</a></li>
              <li><a href="\${root}pages/faq/">FAQ</a></li>
              <li><a href="\${root}pages/privacy-policy/">Privacy Policy</a></li>
              <li><a href="\${root}pages/terms/">Terms</a></li>
              <li><a href="\${root}pages/disclaimer/">Disclaimer</a></li>
              <li><a href="\${root}pages/contact/">Contact</a></li>
            </ul>
          </div>
        </div>
        <div style="border-top:1px solid var(--border);padding-top:1rem;display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
          <span>© \${new Date().getFullYear()} \${SITE_CONFIG.brandName}.</span>
          <span>100% In-Browser Processing.</span>
        </div>
      </div>
    </footer>
  \`;
}
`);

// 7. Home JS (Relative Links)
write("assets/js/home.js", `
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
`);

// 8. Universal Workspace JS (Relative Links)
write("assets/js/workspace.js", `
import { initShell, getRootPrefix } from "./ui-shell.js";
import { TOOLS, getToolById } from "./tool-registry.js";
import { validateAndDecodeFile, renderTransformedCanvas, canvasToBlob, compressToTargetKb, formatBytes, sanitizeFilename, mimeToExtension } from "./image-engine.js";

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
      <ol class="breadcrumbs"><li><a href="\${root}">Home</a></li><li>/</li><li><a href="\${root}#all-tools">Tools</a></li><li>/</li><li>\${tool.title}</li></ol>
      <div class="tool-header"><h1>\${tool.h1}</h1><p>\${tool.intro}</p></div>
      <div id="status-banner" class="status-banner" role="status" aria-live="polite"></div>
      <div id="workspace-dynamic"></div>
      <div class="editorial-grid section-block">
        <div class="panel">
          <h2>How to Use \${tool.title}</h2>
          <ol style="padding-left:1.2rem;margin:0.6rem 0 1rem;color:var(--text-muted);">
            <li>Select an image from your phone or computer.</li>
            <li>Adjust settings in the panel and inspect the live preview.</li>
            <li>Tap <strong>Download Image</strong> to save the result directly to your device.</li>
          </ol>
          <p style="color:var(--text-muted);font-size:0.88rem;">All processing runs locally inside your browser using the HTML5 Canvas API.</p>
        </div>
        <aside class="panel">
          <h2 class="panel-title">Related Tools</h2>
          <ul style="list-style:none;display:flex;flex-direction:column;gap:0.55rem;">
            \${related.map((r) => '<li><a href="' + root + 'tools/' + r.id + '/">' + r.icon + ' ' + r.title + '</a></li>').join("")}
            <li><a href="\${root}#all-tools">Explore All \${TOOLS.length} Tools →</a></li>
          </ul>
        </aside>
      </div>
    </div>
  \`;

  const dyn = document.getElementById("workspace-dynamic");
  if (tool.mode === "guide") {
    dyn.innerHTML = '<div class="panel"><h2>Browser Resizing vs. Neural Super-Resolution</h2><p style="margin-top:0.6rem;color:var(--text-muted);">Increasing pixel dimensions in a browser uses mathematical bicubic interpolation. For clean resizing, use our <a href="' + root + 'tools/image-resizer/">Image Resizer</a>.</p></div>';
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
  let currentSource = null, currentBlob = null, settings = { ...tool.defaults };
  mount.innerHTML = \`
    <div class="workspace-grid">
      <div class="panel">
        <h2 class="panel-title">1. Settings & Controls</h2>
        <div id="controls-form"></div>
        <div style="display:flex;gap:0.5rem;margin-top:1rem;flex-wrap:wrap;">
          <button type="button" class="btn btn-primary btn-block" id="download-btn" disabled>Download Image</button>
          <button type="button" class="btn btn-secondary btn-sm" id="reset-btn" disabled>Reset</button>
          <button type="button" class="btn btn-secondary btn-sm" id="replace-btn" disabled>New Image</button>
        </div>
      </div>
      <div class="panel">
        <h2 class="panel-title">2. Upload & Live Preview</h2>
        <div id="dropzone-area" class="dropzone" tabindex="0">
          <h3>Tap to Select or Drop an Image</h3>
          <p>Supports JPG, PNG, WebP • 100% Private Local Processing</p>
          <span class="btn btn-primary btn-sm">Choose Image</span>
          <input type="file" id="file-input" accept="image/jpeg,image/png,image/webp" class="sr-only" />
        </div>
        <div id="preview-wrapper" style="display:none;">
          <div class="preview-stage"><canvas id="preview-canvas"></canvas></div>
          <div class="meta-bar" id="meta-bar"></div>
        </div>
      </div>
    </div>
  \`;

  const fileInput = document.getElementById("file-input");
  const dropzone = document.getElementById("dropzone-area");
  const previewWrap = document.getElementById("preview-wrapper");
  const previewCanvas = document.getElementById("preview-canvas");
  const metaBar = document.getElementById("meta-bar");
  const downloadBtn = document.getElementById("download-btn");
  const resetBtn = document.getElementById("reset-btn");
  const replaceBtn = document.getElementById("replace-btn");
  const controlsMount = document.getElementById("controls-form");

  function buildControls() {
    if (tool.mode === "inspector") {
      controlsMount.innerHTML = '<p style="font-size:0.88rem;color:var(--text-muted);">Select an image to inspect exact pixel width, height, aspect ratio, and byte size.</p>';
      return;
    }
    const html = [];
    if (tool.presets?.length) {
      html.push('<div class="control-group"><label>Presets</label><div class="preset-grid">' + tool.presets.map((p) => '<button type="button" class="btn btn-secondary btn-sm" data-pw="' + p.w + '" data-ph="' + p.h + '">' + p.label + '</button>').join("") + '</div></div>');
    }
    if (tool.kbPresets?.length) {
      html.push('<div class="control-group"><label>Target File Size (KB)</label><input type="number" id="ctrl-kb" class="input-field" value="' + (settings.targetKb || 50) + '" /><div class="preset-grid">' + tool.kbPresets.map((k) => '<button type="button" class="btn btn-secondary btn-sm" data-kb="' + k + '">' + k + ' KB</button>').join("") + '</div></div>');
    }
    if (["image-resizer", "passport-photo-maker", "signature-resizer", "youtube-thumbnail-resizer", "instagram-image-resizer", "facebook-image-resizer"].includes(tool.id)) {
      html.push('<div class="input-row control-group"><div><label>Width (px)</label><input type="number" id="ctrl-w" class="input-field" value="' + (settings.w || "") + '" /></div><div><label>Height (px)</label><input type="number" id="ctrl-h" class="input-field" value="' + (settings.h || "") + '" /></div></div><div class="control-group"><label class="checkbox-label"><input type="checkbox" id="ctrl-aspect" ' + (settings.lockAspect ? "checked" : "") + ' /> Lock aspect ratio</label></div>');
    }
    if (tool.id === "passport-photo-maker") {
      html.push('<div class="control-group"><label class="checkbox-label"><input type="checkbox" id="ctrl-sheet" ' + (settings.printSheet ? "checked" : "") + ' /> Create 4×6 in Print Sheet</label></div>');
    }
    if (tool.id === "image-cropper") {
      html.push('<div class="input-row control-group"><div><label>Left (%)</label><input type="number" id="ctrl-cx" class="input-field" value="' + (settings.cropX ?? 10) + '" /></div><div><label>Top (%)</label><input type="number" id="ctrl-cy" class="input-field" value="' + (settings.cropY ?? 10) + '" /></div></div><div class="input-row control-group"><div><label>Width (%)</label><input type="number" id="ctrl-cw" class="input-field" value="' + (settings.cropW ?? 80) + '" /></div><div><label>Height (%)</label><input type="number" id="ctrl-ch" class="input-field" value="' + (settings.cropH ?? 80) + '" /></div></div>');
    }
    if (tool.id === "rotate-image" || tool.id === "flip-image") {
      html.push('<div class="control-group"><label>Rotate & Flip</label><div class="preset-grid"><button type="button" class="btn btn-secondary btn-sm" id="rot-l">↺ -90°</button><button type="button" class="btn btn-secondary btn-sm" id="rot-r">↻ +90°</button><button type="button" class="btn btn-secondary btn-sm" id="flp-h">⇄ Flip H</button><button type="button" class="btn btn-secondary btn-sm" id="flp-v">⇅ Flip V</button></div></div>');
    }
    if (tool.id === "grayscale-image") html.push('<div class="control-group"><label>Grayscale (%)</label><input type="range" id="ctrl-gray" min="0" max="100" value="' + settings.grayscale + '" style="width:100%;" /></div>');
    if (tool.id === "rounded-corners-image") html.push('<div class="control-group"><label>Corner Radius (px)</label><input type="range" id="ctrl-rad" min="0" max="200" value="' + settings.borderRadius + '" style="width:100%;" /></div>');
    if (tool.id === "add-image-border") html.push('<div class="input-row control-group"><div><label>Border (px)</label><input type="number" id="ctrl-bw" class="input-field" value="' + settings.borderWidth + '" /></div><div><label>Color</label><input type="color" id="ctrl-bc" class="input-field" value="' + settings.borderColor + '" style="height:38px;" /></div></div>');
    if (tool.id === "image-watermark") html.push('<div class="control-group"><label>Watermark Text</label><input type="text" id="ctrl-wmt" class="input-field" value="' + settings.watermarkText + '" /></div>');
    if (tool.id === "blur-image") html.push('<div class="control-group"><label>Blur Radius (px)</label><input type="range" id="ctrl-blur" min="0" max="40" value="' + settings.blurRadius + '" style="width:100%;" /></div>');
    if (tool.id === "pixelate-image") html.push('<div class="control-group"><label>Pixel Block Size</label><input type="range" id="ctrl-px" min="1" max="50" value="' + settings.pixelSize + '" style="width:100%;" /></div>');
    if (tool.id === "meme-maker") html.push('<div class="control-group"><label>Top Text</label><input type="text" id="ctrl-mt" class="input-field" value="' + settings.memeTop + '" /></div><div class="control-group"><label>Bottom Text</label><input type="text" id="ctrl-mb" class="input-field" value="' + settings.memeBottom + '" /></div>');

    if (!tool.defaults.lockFormat) {
      html.push('<div class="control-group"><label>Output Format</label><select id="ctrl-fmt" class="select-field"><option value="original">Original Format</option><option value="image/jpeg">JPG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option></select></div>');
    }
    if (tool.id !== "target-file-size") {
      html.push('<div class="control-group"><label>Quality</label><input type="range" id="ctrl-q" min="10" max="100" value="' + Math.round((settings.quality ?? 0.9) * 100) + '" style="width:100%;" /></div>');
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
    kbEl?.addEventListener("input", () => { settings.targetKb = Number(kbEl.value); updatePreview(); });
    controlsMount.querySelectorAll("[data-kb]").forEach((b) => b.addEventListener("click", () => {
      settings.targetKb = Number(b.dataset.kb); if (kbEl) kbEl.value = settings.targetKb; updatePreview();
    }));
    document.getElementById("ctrl-sheet")?.addEventListener("change", (e) => { settings.printSheet = e.target.checked; updatePreview(); });
    ["x", "y", "w", "h"].forEach((k) => document.getElementById("ctrl-c" + k)?.addEventListener("input", (e) => { settings["crop" + k.toUpperCase()] = Number(e.target.value); updatePreview(); }));
    document.getElementById("rot-l")?.addEventListener("click", () => { settings.rotate = ((settings.rotate || 0) - 90) % 360; updatePreview(); });
    document.getElementById("rot-r")?.addEventListener("click", () => { settings.rotate = ((settings.rotate || 0) + 90) % 360; updatePreview(); });
    document.getElementById("flp-h")?.addEventListener("click", () => { settings.flipH = !settings.flipH; updatePreview(); });
    document.getElementById("flp-v")?.addEventListener("click", () => { settings.flipV = !settings.flipV; updatePreview(); });
    document.getElementById("ctrl-gray")?.addEventListener("input", (e) => { settings.grayscale = Number(e.target.value); updatePreview(); });
    document.getElementById("ctrl-rad")?.addEventListener("input", (e) => { settings.borderRadius = Number(e.target.value); updatePreview(); });
    document.getElementById("ctrl-bw")?.addEventListener("input", (e) => { settings.borderWidth = Number(e.target.value); updatePreview(); });
    document.getElementById("ctrl-bc")?.addEventListener("input", (e) => { settings.borderColor = e.target.value; updatePreview(); });
    document.getElementById("ctrl-wmt")?.addEventListener("input", (e) => { settings.watermarkText = e.target.value; updatePreview(); });
    document.getElementById("ctrl-blur")?.addEventListener("input", (e) => { settings.blurRadius = Number(e.target.value); updatePreview(); });
    document.getElementById("ctrl-px")?.addEventListener("input", (e) => { settings.pixelSize = Number(e.target.value); updatePreview(); });
    document.getElementById("ctrl-mt")?.addEventListener("input", (e) => { settings.memeTop = e.target.value; updatePreview(); });
    document.getElementById("ctrl-mb")?.addEventListener("input", (e) => { settings.memeBottom = e.target.value; updatePreview(); });
    document.getElementById("ctrl-fmt")?.addEventListener("change", (e) => { settings.format = e.target.value; updatePreview(); });
    document.getElementById("ctrl-q")?.addEventListener("input", (e) => { settings.quality = Number(e.target.value) / 100; updatePreview(); });
  }

  async function loadFile(file) {
    setBanner("", "");
    try {
      if (currentSource?.objectUrl) URL.revokeObjectURL(currentSource.objectUrl);
      currentSource = await validateAndDecodeFile(file);
      settings = { ...tool.defaults, w: tool.defaults.w || currentSource.width, h: tool.defaults.h || currentSource.height };
      buildControls();
      dropzone.style.display = "none";
      previewWrap.style.display = "block";
      resetBtn.disabled = false;
      replaceBtn.disabled = false;
      await updatePreview();
    } catch (err) { setBanner("error", err.message); }
  }

  async function updatePreview() {
    if (!currentSource) return;
    try {
      if (tool.id === "target-file-size" || (tool.id === "signature-resizer" && settings.targetKb)) {
        const res = await compressToTargetKb(currentSource, settings, previewCanvas);
        currentBlob = res.blob;
        setBanner(res.achieved ? "success" : "warning", (res.achieved ? "Target achieved: " : "Closest size: ") + formatBytes(res.blob.size));
        metaBar.innerHTML = '<span>Original: ' + currentSource.width + '×' + currentSource.height + ' (' + formatBytes(currentSource.size) + ')</span><span>Output: ' + res.width + '×' + res.height + ' (' + formatBytes(res.blob.size) + ')</span>';
      } else {
        const info = renderTransformedCanvas(currentSource, settings, previewCanvas);
        currentBlob = await canvasToBlob(previewCanvas, info.mime, settings.quality ?? 0.92);
        metaBar.innerHTML = '<span>Original: ' + currentSource.width + '×' + currentSource.height + ' (' + formatBytes(currentSource.size) + ')</span><span>Output: ' + info.width + '×' + info.height + ' (' + formatBytes(currentBlob.size) + ')</span>';
      }
      downloadBtn.disabled = false;
    } catch (err) { setBanner("error", err.message); }
  }

  dropzone.addEventListener("click", () => fileInput.click());
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
    a.download = sanitizeFilename(currentSource.name + "-" + tool.id, mimeToExtension(currentBlob.type));
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  });
  buildControls();
}

function initB64Encode(mount) {
  mount.innerHTML = '<div class="workspace-grid"><div class="panel"><h2 class="panel-title">1. Choose Image</h2><input type="file" id="b64-f" accept="image/*" class="input-field" /></div><div class="panel"><h2 class="panel-title">2. Base64 Data URL</h2><textarea id="b64-out" class="textarea-field" rows="6" readonly></textarea><button type="button" class="btn btn-primary btn-sm" id="b64-cp" style="margin-top:0.5rem;" disabled>Copy Base64</button></div></div>';
  const f = document.getElementById("b64-f"), out = document.getElementById("b64-out"), cp = document.getElementById("b64-cp");
  f.addEventListener("change", () => {
    const file = f.files?.[0]; if (!file) return;
    const r = new FileReader();
    r.onload = () => { out.value = String(r.result || ""); cp.disabled = false; };
    r.readAsDataURL(file);
  });
  cp.addEventListener("click", () => { navigator.clipboard.writeText(out.value); setBanner("success", "Copied to clipboard!"); });
}

function initB64Decode(mount) {
  mount.innerHTML = '<div class="workspace-grid"><div class="panel"><h2 class="panel-title">1. Paste Base64</h2><textarea id="b64-in" class="textarea-field" rows="6" placeholder="data:image/png;base64,..."></textarea><button type="button" class="btn btn-primary btn-block" id="b64-dec" style="margin-top:0.5rem;">Decode</button></div><div class="panel"><h2 class="panel-title">2. Preview</h2><div class="preview-stage" id="b64-st"></div><a id="b64-dl" class="btn btn-primary btn-sm" style="display:none;margin-top:0.75rem;" download="decoded.png">Download Image</a></div></div>';
  document.getElementById("b64-dec").addEventListener("click", () => {
    const raw = document.getElementById("b64-in").value.trim();
    if (!raw) return;
    const url = raw.startsWith("data:image/") ? raw : "data:image/png;base64," + raw;
    const img = new Image();
    img.onload = () => {
      const st = document.getElementById("b64-st"); st.innerHTML = ""; st.appendChild(img);
      const dl = document.getElementById("b64-dl"); dl.href = url; dl.style.display = "inline-flex";
    };
    img.src = url;
  });
}

function initCollage(mount) {
  let imgs = [];
  mount.innerHTML = '<div class="workspace-grid"><div class="panel"><h2 class="panel-title">1. Select 2–4 Photos</h2><input type="file" id="col-f" accept="image/*" multiple class="input-field" /><button type="button" class="btn btn-primary btn-block" id="col-dl" style="margin-top:0.75rem;" disabled>Download Collage</button></div><div class="panel"><h2 class="panel-title">2. Collage Preview</h2><div class="preview-stage"><canvas id="col-c" width="1200" height="1200"></canvas></div></div></div>';
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
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "collage.jpg"; a.click();
  });
}

function initBulk(mount, tool) {
  mount.innerHTML = '<div class="workspace-grid"><div class="panel"><h2 class="panel-title">1. Select Multiple Files</h2><input type="file" id="blk-f" accept="image/*" multiple class="input-field" /><div class="control-group" style="margin-top:0.75rem;"><label>Scale (%)</label><input type="number" id="blk-p" class="input-field" value="' + (tool.defaults.pct || 100) + '" /></div><div class="control-group"><label>Format</label><select id="blk-fmt" class="select-field"><option value="image/webp">WebP</option><option value="image/jpeg">JPG</option><option value="image/png">PNG</option></select></div><button type="button" class="btn btn-primary btn-block" id="blk-run">Process Batch</button></div><div class="panel"><h2 class="panel-title">2. Output Queue</h2><ul class="queue-list" id="blk-q"></ul></div></div>';
  document.getElementById("blk-run").addEventListener("click", async () => {
    const files = Array.from(document.getElementById("blk-f").files || []).slice(0, 25);
    const pct = Number(document.getElementById("blk-p").value || 100);
    const format = document.getElementById("blk-fmt").value;
    const q = document.getElementById("blk-q"); q.innerHTML = "";
    const canvas = document.createElement("canvas");
    for (const file of files) {
      const li = document.createElement("li"); li.className = "queue-item"; q.appendChild(li);
      try {
        const src = await validateAndDecodeFile(file);
        renderTransformedCanvas(src, { scaleMode: "pct", pct, format, bgColor: "#ffffff" }, canvas);
        const blob = await canvasToBlob(canvas, format, 0.88);
        URL.revokeObjectURL(src.objectUrl);
        const outName = sanitizeFilename(file.name, mimeToExtension(format));
        li.innerHTML = '<span>' + outName + ' (' + formatBytes(blob.size) + ')</span><a href="' + URL.createObjectURL(blob) + '" download="' + outName + '" class="btn btn-primary btn-sm">Download</a>';
      } catch (e) { li.innerHTML = '<span>' + file.name + '</span><span style="color:var(--error);">Failed</span>'; }
    }
  });
}
`);

// 9. Homepage & 404 (Using ./ relative paths so GitHub Pages subdirectory works!)
write("index.html", `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PixelKit — Free Online Image Tools (Resize, Compress, Crop & Convert)</title>
  <meta name="description" content="Free online image tools to resize, compress to target KB, crop, convert JPG/PNG/WebP, and format passport or signature photos directly in your browser." />
  <link rel="icon" href="./favicon.svg" type="image/svg+xml" />
  <link rel="manifest" href="./manifest.webmanifest" />
  <link rel="stylesheet" href="./assets/css/main.css" />
</head>
<body data-root="./">
  <div id="announcement-mount"></div>
  <div id="header-mount"></div>
  <main>
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <h1>Free Online Image Tools. Simple, Fast, Private.</h1>
          <p>Resize, compress to exact KB targets, crop, and convert your images directly in your browser. No account required and zero server uploads.</p>
          <div class="hero-cta">
            <a href="#all-tools" class="btn btn-primary">Explore All 32 Tools</a>
            <a href="./tools/target-file-size/" class="btn btn-secondary">Compress to 20KB / 50KB</a>
          </div>
        </div>
        <div class="hero-card">
          <h2 style="font-size:1rem;margin-bottom:0.35rem;">Quick Image Dimension Inspector</h2>
          <p style="font-size:0.84rem;color:var(--text-muted);margin-bottom:0.65rem;">Select any photo to check its exact pixel resolution and aspect ratio:</p>
          <input type="file" id="hero-quick-file" accept="image/*" class="input-field" />
          <div id="hero-quick-result"></div>
        </div>
      </div>
    </section>

    <section class="search-section" id="all-tools">
      <div class="container">
        <div class="search-bar-wrap">
          <input type="search" id="tool-search-input" class="search-input" placeholder="Search 32 tools (e.g., '50kb', 'passport', 'signature', 'webp')..." />
          <button type="button" id="tool-search-clear" class="search-clear">✕</button>
        </div>
        <div class="category-pills" id="category-pills"></div>
      </div>
    </section>

    <section class="section-block">
      <div class="container">
        <div class="section-header"><h2>Popular Image Tools</h2></div>
        <div class="tools-grid" id="popular-tools-grid"></div>
      </div>
    </section>

    <section class="section-block">
      <div class="container">
        <div class="section-header">
          <h2>All Image Tools Directory</h2>
          <span id="tools-count-label" style="font-size:0.84rem;color:var(--text-muted);"></span>
        </div>
        <div id="search-empty-state" class="panel" style="display:none;text-align:center;">No matching tools found.</div>
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
  <title>404 Page Not Found | PixelKit</title>
  <link rel="stylesheet" href="./assets/css/main.css" />
</head>
<body data-root="./">
  <div id="header-mount"></div>
  <main class="container section-block" style="text-align:center;padding:4rem 1rem;">
    <h1>404 — Page Not Found</h1>
    <p style="color:var(--text-muted);margin:0.75rem auto 1.5rem;">The requested page was not found.</p>
    <a href="./#all-tools" class="btn btn-primary">Browse All Image Tools</a>
  </main>
  <div id="footer-mount"></div>
  <script type="module">import { initShell } from "./assets/js/ui-shell.js"; initShell();</script>
</body>
</html>
`);

// 10. Generate all 32 Tool Pages (Using ../../ relative paths)
for (const tool of TOOLS_DATA) {
  write("tools/" + tool.id + "/index.html", `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${tool.h1} — PixelKit</title>
  <meta name="description" content="${tool.shortDesc} ${tool.intro}" />
  <link rel="icon" href="../../favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="../../assets/css/main.css" />
</head>
<body data-root="../../">
  <div id="announcement-mount"></div>
  <div id="header-mount"></div>
  <main id="tool-workspace-root" data-tool-id="${tool.id}"></main>
  <div id="footer-mount"></div>
  <script type="module" src="../../assets/js/workspace.js"></script>
</body>
</html>
  `);
}

// 11. Generate Info Pages (Using ../../ relative paths)
const INFO_PAGES = [
  { slug: "about", title: "About PixelKit", body: "PixelKit provides free, privacy-friendly online image utilities that run 100% locally in your web browser." },
  { slug: "contact", title: "Contact Us", body: "Have questions or suggestions? Update your contact email in assets/js/config.js." },
  { slug: "privacy-policy", title: "Privacy Policy", body: "Your images are processed client-side inside your web browser using the HTML5 Canvas API and are never uploaded to our servers." },
  { slug: "terms", title: "Terms of Service", body: "All tools on PixelKit are provided free of charge on an as-is basis." },
  { slug: "disclaimer", title: "Disclaimer", body: "Always verify official government and exam portal photo/signature guidelines before submitting your application." },
  { slug: "how-to-use", title: "How to Use PixelKit", body: "Choose a tool, select an image from your phone or PC, adjust settings, and download immediately." },
  { slug: "faq", title: "Frequently Asked Questions", body: "All 32 tools are free, require no registration, and process images locally on your device." },
  { slug: "blog", title: "Image Optimization Guides", body: "Learn how to compress photos to 20KB/50KB and convert PNG to WebP for faster websites." }
];

for (const p of INFO_PAGES) {
  write("pages/" + p.slug + "/index.html", `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${p.title} | PixelKit</title>
  <link rel="icon" href="../../favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="../../assets/css/main.css" />
</head>
<body data-root="../../">
  <div id="announcement-mount"></div>
  <div id="header-mount"></div>
  <main class="container section-block"><div class="panel"><h1>${p.title}</h1><p style="margin-top:0.75rem;color:var(--text-muted);">${p.body}</p></div></main>
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

console.log("Successfully generated full PixelKit static website with relative paths!");
