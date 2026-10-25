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
  const base = (name || "image").replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]+/g, "-").slice(0, 60) || "pixelkit-image";
  return base + "." + ext.replace(/^\./, "");
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
