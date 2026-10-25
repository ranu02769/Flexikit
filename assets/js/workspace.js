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

  rootEl.innerHTML = `
    <div class="container">
      <ol class="breadcrumbs"><li><a href="${root}">Home</a></li><li>/</li><li><a href="${root}#all-tools">Tools</a></li><li>/</li><li>${tool.title}</li></ol>
      <div class="tool-header"><h1>${tool.h1}</h1><p>${tool.intro}</p></div>
      <div id="status-banner" class="status-banner" role="status" aria-live="polite"></div>
      <div id="workspace-dynamic"></div>
      <div class="editorial-grid section-block">
        <div class="panel">
          <h2>How to Use ${tool.title}</h2>
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
            ${related.map((r) => '<li><a href="' + root + 'tools/' + r.id + '/">' + r.icon + ' ' + r.title + '</a></li>').join("")}
            <li><a href="${root}#all-tools">Explore All ${TOOLS.length} Tools →</a></li>
          </ul>
        </aside>
      </div>
    </div>
  `;

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
  mount.innerHTML = `
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
  `;

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
