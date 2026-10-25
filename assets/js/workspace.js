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

  rootEl.innerHTML = `
    <div class="container">
      <div class="tool-top-bar">
        <ol class="breadcrumbs">
          <li><a href="${root}">All Tools</a></li>
          <li>›</li>
          <li>${tool.title}</li>
        </ol>
        <span class="hot-badge">🔒 100% Local & Private</span>
      </div>
      <div class="tool-title-wrap">
        <h1>${tool.h1}</h1>
        <p>${tool.intro}</p>
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
          ${related.map((r) => `
            <a href="${root}tools/${r.id}/" class="tool-card">
              <div class="tool-icon">${ICONS[r.iconKey] || ICONS.resize}</div>
              <div class="tool-card-body"><h3>${r.title}</h3><p>${r.shortDesc}</p></div>
            </a>
          `).join("")}
        </div>
      </div>
    </div>
  `;

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
  mount.innerHTML = `
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
          <div class="dropzone-icon">${ICONS[tool.iconKey] || ICONS.resize}</div>
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
  `;

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
      html.push(`
        <div class="control-group">
          <label>Output Format</label>
          <div class="segmented-group" id="fmt-seg">
            <button type="button" class="seg-btn ${curFmt === "original" ? "active" : ""}" data-fmt="original">Auto</button>
            <button type="button" class="seg-btn ${curFmt === "image/jpeg" ? "active" : ""}" data-fmt="image/jpeg">JPG</button>
            <button type="button" class="seg-btn ${curFmt === "image/png" ? "active" : ""}" data-fmt="image/png">PNG</button>
            <button type="button" class="seg-btn ${curFmt === "image/webp" ? "active" : ""}" data-fmt="image/webp">WebP</button>
          </div>
        </div>
      `);
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

      statsBar.innerHTML = `
        <div class="stat-card"><div class="stat-label">Original</div><div class="stat-val">${currentSource.width}×${currentSource.height} • ${formatBytes(currentSource.size)}</div></div>
        <div class="stat-card"><div class="stat-label">Output</div><div class="stat-val">${outW}×${outH} • ${formatBytes(currentBlob.size)} ${deltaBadge}</div></div>
        <div class="stat-card"><div class="stat-label">Ratio & Format</div><div class="stat-val">${getAspectRatioString(outW, outH)} • ${mimeToExtension(currentBlob.type).toUpperCase()}</div></div>
      `;
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
    a.download = sanitizeFilename(currentSource.name.replace(/\.[^/.]+$/, "") + "-" + tool.id, mimeToExtension(currentBlob.type));
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
  mount.innerHTML = `
    <div class="studio-grid">
      <div class="studio-panel">
        <div class="panel-head">1. Batch Settings</div>
        <div class="control-group"><label>Select Images (Up to 25)</label><input type="file" id="blk-f" accept="image/*" multiple class="input-field" /></div>
        <div class="control-group"><label>Scale (%)</label><input type="number" id="blk-p" class="input-field" value="${tool.defaults.pct || 100}" /></div>
        <div class="control-group"><label>Output Format</label><select id="blk-fmt" class="select-field"><option value="image/webp">WebP</option><option value="image/jpeg">JPG</option><option value="image/png">PNG</option></select></div>
        <button type="button" class="btn btn-primary btn-block" id="blk-run">⚡ Process Batch</button>
        <button type="button" class="btn btn-secondary btn-block" id="blk-zip" style="margin-top:0.5rem;display:none;">📦 Download All (.ZIP)</button>
      </div>
      <div class="studio-panel">
        <div class="panel-head"><span>2. Processed Queue</span><span id="blk-count">0 files</span></div>
        <ul class="queue-list" id="blk-q"></ul>
      </div>
    </div>
  `;
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
