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
export const TOOLS = [
  {
    "id": "image-resizer",
    "title": "Image Resizer",
    "category": "resize",
    "popular": true,
    "mode": "single",
    "icon": "↔",
    "shortDesc": "Resize JPG, PNG, and WebP images by exact pixels or percentage.",
    "h1": "Free Online Image Resizer",
    "intro": "Change image width and height in pixels or scale by percentage while locking aspect ratio.",
    "keywords": [
      "resize image",
      "change dimensions",
      "scale photo"
    ],
    "defaults": {
      "scaleMode": "px",
      "lockAspect": true,
      "format": "original",
      "quality": 0.92
    },
    "presets": [
      {
        "label": "HD (1280×720)",
        "w": 1280,
        "h": 720
      },
      {
        "label": "Full HD (1920×1080)",
        "w": 1920,
        "h": 1080
      },
      {
        "label": "Square (1080×1080)",
        "w": 1080,
        "h": 1080
      }
    ]
  },
  {
    "id": "image-compressor",
    "title": "Image Compressor",
    "category": "compress",
    "popular": true,
    "mode": "single",
    "icon": "⚡",
    "shortDesc": "Reduce JPG and WebP file size with live before/after byte comparison.",
    "h1": "Compress Images Online",
    "intro": "Adjust compression quality and inspect exact byte savings before downloading.",
    "keywords": [
      "compress image",
      "reduce file size",
      "optimize jpg"
    ],
    "defaults": {
      "format": "image/jpeg",
      "quality": 0.75,
      "bgColor": "#ffffff"
    }
  },
  {
    "id": "target-file-size",
    "title": "Target File Size Compressor",
    "category": "compress",
    "popular": true,
    "mode": "single",
    "icon": "🎯",
    "shortDesc": "Compress photos toward a target KB limit like 20 KB, 50 KB, or 100 KB.",
    "h1": "Compress Image to Target KB Size",
    "intro": "Automatically runs a multi-pass quality search in your browser to reach your target KB limit.",
    "keywords": [
      "compress to 50kb",
      "20kb photo",
      "100kb image"
    ],
    "defaults": {
      "targetKb": 50,
      "format": "image/jpeg",
      "allowDownscale": true,
      "bgColor": "#ffffff"
    },
    "kbPresets": [
      20,
      50,
      100,
      200
    ]
  },
  {
    "id": "image-cropper",
    "title": "Image Cropper",
    "category": "crop-rotate",
    "popular": true,
    "mode": "single",
    "icon": "✂",
    "shortDesc": "Crop images freely or lock to 1:1, 16:9, 4:3, and portrait ratios.",
    "h1": "Crop Image Online",
    "intro": "Frame the exact region you want to keep using aspect ratio presets or custom crop coordinates.",
    "keywords": [
      "crop photo",
      "trim image",
      "1:1 square crop"
    ],
    "defaults": {
      "cropRatio": "free",
      "cropX": 10,
      "cropY": 10,
      "cropW": 80,
      "cropH": 80,
      "format": "original"
    }
  },
  {
    "id": "image-converter",
    "title": "Image Converter",
    "category": "convert",
    "popular": true,
    "mode": "single",
    "icon": "⇄",
    "shortDesc": "Convert images between JPG, PNG, and WebP formats in your browser.",
    "h1": "Online Image Format Converter",
    "intro": "Convert between JPG, PNG, and WebP with configurable background fill for transparent images.",
    "keywords": [
      "convert image",
      "jpg png webp"
    ],
    "defaults": {
      "format": "image/webp",
      "quality": 0.9,
      "bgColor": "#ffffff"
    }
  },
  {
    "id": "jpg-to-png",
    "title": "JPG to PNG Converter",
    "category": "convert",
    "popular": false,
    "mode": "single",
    "icon": "PNG",
    "shortDesc": "Convert JPEG photos into lossless PNG files.",
    "h1": "Convert JPG to PNG Online",
    "intro": "Export any JPG or JPEG image into a lossless PNG container directly in your browser.",
    "keywords": [
      "jpg to png",
      "jpeg to png"
    ],
    "defaults": {
      "format": "image/png",
      "lockFormat": true
    }
  },
  {
    "id": "png-to-jpg",
    "title": "PNG to JPG Converter",
    "category": "convert",
    "popular": false,
    "mode": "single",
    "icon": "JPG",
    "shortDesc": "Convert transparent PNG images to JPG with custom background color.",
    "h1": "Convert PNG to JPG Online",
    "intro": "Choose a clean background fill color (white by default) and convert PNG files to JPEG.",
    "keywords": [
      "png to jpg",
      "transparent png to jpg"
    ],
    "defaults": {
      "format": "image/jpeg",
      "lockFormat": true,
      "quality": 0.9,
      "bgColor": "#ffffff"
    }
  },
  {
    "id": "webp-converter",
    "title": "WebP Converter",
    "category": "convert",
    "popular": false,
    "mode": "single",
    "icon": "W",
    "shortDesc": "Convert images to or from modern WebP format.",
    "h1": "Online WebP Image Converter",
    "intro": "Encode images into lightweight WebP files or convert WebP back to PNG/JPG.",
    "keywords": [
      "webp converter",
      "to webp"
    ],
    "defaults": {
      "format": "image/webp",
      "quality": 0.88
    }
  },
  {
    "id": "png-to-webp",
    "title": "PNG to WebP",
    "category": "convert",
    "popular": false,
    "mode": "single",
    "icon": "P→W",
    "shortDesc": "Compress PNG graphics into smaller WebP files while preserving transparency.",
    "h1": "Convert PNG to WebP Online",
    "intro": "WebP supports transparency like PNG while reducing file sizes significantly.",
    "keywords": [
      "png to webp",
      "transparent webp"
    ],
    "defaults": {
      "format": "image/webp",
      "lockFormat": true,
      "quality": 0.9
    }
  },
  {
    "id": "jpg-to-webp",
    "title": "JPG to WebP",
    "category": "convert",
    "popular": false,
    "mode": "single",
    "icon": "J→W",
    "shortDesc": "Convert JPG photos into modern WebP images for faster websites.",
    "h1": "Convert JPG to WebP Online",
    "intro": "Optimize photographs for modern browsers by exporting JPG files to WebP.",
    "keywords": [
      "jpg to webp",
      "jpeg to webp"
    ],
    "defaults": {
      "format": "image/webp",
      "lockFormat": true,
      "quality": 0.85
    }
  },
  {
    "id": "webp-to-jpg",
    "title": "WebP to JPG",
    "category": "convert",
    "popular": false,
    "mode": "single",
    "icon": "W→J",
    "shortDesc": "Turn WebP images into universally compatible JPEG files.",
    "h1": "Convert WebP to JPG Online",
    "intro": "Convert downloaded WebP files into standard JPG format for forms and editors.",
    "keywords": [
      "webp to jpg",
      "webp to jpeg"
    ],
    "defaults": {
      "format": "image/jpeg",
      "lockFormat": true,
      "quality": 0.92,
      "bgColor": "#ffffff"
    }
  },
  {
    "id": "rotate-image",
    "title": "Rotate Image",
    "category": "crop-rotate",
    "popular": false,
    "mode": "single",
    "icon": "↻",
    "shortDesc": "Rotate images 90° clockwise, counterclockwise, or 180°.",
    "h1": "Rotate Image Online",
    "intro": "Fix sideways or upside-down photos and export with updated dimensions.",
    "keywords": [
      "rotate photo",
      "turn image 90 degrees"
    ],
    "defaults": {
      "rotate": 0,
      "format": "original"
    }
  },
  {
    "id": "flip-image",
    "title": "Flip Image",
    "category": "crop-rotate",
    "popular": false,
    "mode": "single",
    "icon": "⇄",
    "shortDesc": "Mirror images horizontally or vertically with one click.",
    "h1": "Flip & Mirror Image Online",
    "intro": "Flip selfies or graphics horizontally or vertically directly in your browser.",
    "keywords": [
      "flip image",
      "mirror photo"
    ],
    "defaults": {
      "flipH": false,
      "flipV": false,
      "format": "original"
    }
  },
  {
    "id": "image-dimensions",
    "title": "Image Dimensions Finder",
    "category": "utilities",
    "popular": false,
    "mode": "inspector",
    "icon": "📐",
    "shortDesc": "Check exact pixel width, height, aspect ratio, MIME type, and byte size.",
    "h1": "Check Image Dimensions & File Details",
    "intro": "Inspect natural pixel dimensions, aspect ratio, and file size locally.",
    "keywords": [
      "image dimensions",
      "check photo size"
    ],
    "defaults": {}
  },
  {
    "id": "image-upscaler-guide",
    "title": "Image Resolution & Upscaling Guide",
    "category": "utilities",
    "popular": false,
    "mode": "guide",
    "icon": "ℹ",
    "shortDesc": "Learn how browser interpolation works vs. true AI super-resolution.",
    "h1": "Understanding Image Upscaling vs. Browser Resizing",
    "intro": "An honest technical breakdown of browser bicubic interpolation vs. neural super-resolution.",
    "keywords": [
      "image upscaler guide",
      "high dpi resize"
    ],
    "defaults": {}
  },
  {
    "id": "passport-photo-maker",
    "title": "Passport Photo Maker",
    "category": "photo-id",
    "popular": true,
    "mode": "single",
    "icon": "🪪",
    "shortDesc": "Crop portraits to common ID dimensions (2×2 in, 35×45 mm) or print sheets.",
    "h1": "Online Passport & ID Photo Cropper",
    "intro": "Frame portrait photos using standard 300 DPI reference sizes or generate a 4×6 print sheet.",
    "keywords": [
      "passport size photo",
      "2x2 inch photo",
      "35x45mm photo"
    ],
    "defaults": {
      "w": 600,
      "h": 600,
      "lockAspect": true,
      "printSheet": false,
      "format": "image/jpeg",
      "quality": 0.95,
      "bgColor": "#ffffff"
    },
    "presets": [
      {
        "label": "2×2 in (600×600 px)",
        "w": 600,
        "h": 600
      },
      {
        "label": "35×45 mm (413×531 px)",
        "w": 413,
        "h": 531
      },
      {
        "label": "Exam Portal (200×230 px)",
        "w": 200,
        "h": 230
      }
    ]
  },
  {
    "id": "signature-resizer",
    "title": "Signature Resizer",
    "category": "photo-id",
    "popular": true,
    "mode": "single",
    "icon": "✍",
    "shortDesc": "Resize scanned signatures to exam portal dimensions and KB limits.",
    "h1": "Online Signature Image Resizer",
    "intro": "Format signature scans to common application dimensions (140×60 px) and compress under 20 KB.",
    "keywords": [
      "signature resizer",
      "140x60 signature",
      "20kb signature"
    ],
    "defaults": {
      "w": 140,
      "h": 60,
      "lockAspect": false,
      "targetKb": 20,
      "format": "image/jpeg",
      "bgColor": "#ffffff"
    },
    "presets": [
      {
        "label": "140×60 px (Standard)",
        "w": 140,
        "h": 60
      },
      {
        "label": "300×100 px",
        "w": 300,
        "h": 100
      }
    ]
  },
  {
    "id": "youtube-thumbnail-resizer",
    "title": "YouTube Thumbnail Resizer",
    "category": "social",
    "popular": true,
    "mode": "single",
    "icon": "▶",
    "shortDesc": "Format images to 1280×720 px (16:9) and keep file size under 2 MB.",
    "h1": "YouTube Thumbnail Resizer",
    "intro": "Resize cover graphics to standard 16:9 YouTube thumbnail dimensions.",
    "keywords": [
      "youtube thumbnail size",
      "1280x720 resizer"
    ],
    "defaults": {
      "w": 1280,
      "h": 720,
      "lockAspect": true,
      "format": "image/jpeg",
      "quality": 0.9
    },
    "presets": [
      {
        "label": "1280×720 (HD)",
        "w": 1280,
        "h": 720
      },
      {
        "label": "1920×1080 (FHD)",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "id": "instagram-image-resizer",
    "title": "Instagram Image Resizer",
    "category": "social",
    "popular": false,
    "mode": "single",
    "icon": "📷",
    "shortDesc": "Resize photos for Square (1:1), Portrait (4:5), and Story (9:16) posts.",
    "h1": "Instagram Photo Resizer",
    "intro": "Prepare images for Instagram feed, portrait, and story dimensions.",
    "keywords": [
      "instagram size",
      "1080x1350 resizer"
    ],
    "defaults": {
      "w": 1080,
      "h": 1350,
      "lockAspect": true,
      "format": "image/jpeg",
      "quality": 0.92
    },
    "presets": [
      {
        "label": "Portrait (1080×1350)",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "Square (1080×1080)",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "Story (1080×1920)",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "id": "facebook-image-resizer",
    "title": "Facebook Image Resizer",
    "category": "social",
    "popular": false,
    "mode": "single",
    "icon": "f",
    "shortDesc": "Resize images for shared links, feed posts, and cover photos.",
    "h1": "Facebook Image Resizer",
    "intro": "Use presets for common Facebook post and cover dimensions.",
    "keywords": [
      "facebook post size",
      "1200x630 resizer"
    ],
    "defaults": {
      "w": 1200,
      "h": 630,
      "lockAspect": true,
      "format": "image/jpeg",
      "quality": 0.9
    },
    "presets": [
      {
        "label": "Link Post (1200×630)",
        "w": 1200,
        "h": 630
      },
      {
        "label": "Square (1080×1080)",
        "w": 1080,
        "h": 1080
      }
    ]
  },
  {
    "id": "image-to-base64",
    "title": "Image to Base64",
    "category": "utilities",
    "popular": false,
    "mode": "base64-encode",
    "icon": "{ }",
    "shortDesc": "Encode images into Base64 Data URLs or raw strings for HTML/CSS.",
    "h1": "Convert Image to Base64 Online",
    "intro": "Generate a Data URL to embed small icons directly into HTML, CSS, or JSON.",
    "keywords": [
      "image to base64",
      "data url generator"
    ],
    "defaults": {}
  },
  {
    "id": "base64-to-image",
    "title": "Base64 to Image",
    "category": "utilities",
    "popular": false,
    "mode": "base64-decode",
    "icon": "🖼",
    "shortDesc": "Decode Base64 strings or Data URLs back into downloadable image files.",
    "h1": "Convert Base64 to Image Online",
    "intro": "Paste a valid Base64 image string or Data URL to preview and download the decoded image.",
    "keywords": [
      "base64 to image",
      "decode data url"
    ],
    "defaults": {}
  },
  {
    "id": "grayscale-image",
    "title": "Grayscale Image Converter",
    "category": "effects",
    "popular": false,
    "mode": "single",
    "icon": "◑",
    "shortDesc": "Convert color photos to black-and-white with adjustable intensity.",
    "h1": "Convert Image to Grayscale Online",
    "intro": "Apply clean black-and-white desaturation with a live intensity slider.",
    "keywords": [
      "grayscale image",
      "black and white photo"
    ],
    "defaults": {
      "grayscale": 100,
      "format": "original"
    }
  },
  {
    "id": "rounded-corners-image",
    "title": "Rounded Corners Image",
    "category": "effects",
    "popular": false,
    "mode": "single",
    "icon": "▢",
    "shortDesc": "Add smooth rounded corners to any photo and export as transparent PNG.",
    "h1": "Round Image Corners Online",
    "intro": "Adjust corner radius in pixels and export as PNG or WebP to preserve transparent corners.",
    "keywords": [
      "round corners image",
      "border radius photo"
    ],
    "defaults": {
      "borderRadius": 48,
      "format": "image/png"
    }
  },
  {
    "id": "circular-image-cropper",
    "title": "Circular Image Cropper",
    "category": "effects",
    "popular": false,
    "mode": "single",
    "icon": "◯",
    "shortDesc": "Crop avatars and profile pictures into a circle with transparent background.",
    "h1": "Crop Image into a Circle Online",
    "intro": "Create circular profile avatars exported in PNG or WebP format with alpha transparency.",
    "keywords": [
      "circle crop",
      "round profile picture"
    ],
    "defaults": {
      "circleCrop": true,
      "format": "image/png"
    }
  },
  {
    "id": "add-image-border",
    "title": "Add Border to Image",
    "category": "effects",
    "popular": false,
    "mode": "single",
    "icon": "▣",
    "shortDesc": "Frame photos with a solid colored border of custom pixel thickness.",
    "h1": "Add Border to Image Online",
    "intro": "Frame your image with a clean solid-color border.",
    "keywords": [
      "add border to photo",
      "image frame"
    ],
    "defaults": {
      "borderWidth": 24,
      "borderColor": "#ffffff",
      "format": "original"
    }
  },
  {
    "id": "image-watermark",
    "title": "Add Watermark to Image",
    "category": "effects",
    "popular": false,
    "mode": "single",
    "icon": "©",
    "shortDesc": "Stamp customizable copyright text over your photos locally.",
    "h1": "Watermark Images Online",
    "intro": "Add custom text, font size, and position to protect your visual work.",
    "keywords": [
      "add watermark",
      "text overlay photo"
    ],
    "defaults": {
      "watermarkText": "© PixelKit",
      "watermarkOpacity": 75,
      "watermarkSize": 36,
      "watermarkColor": "#ffffff",
      "watermarkPos": "bottom-right",
      "format": "original"
    }
  },
  {
    "id": "blur-image",
    "title": "Blur Image",
    "category": "effects",
    "popular": false,
    "mode": "single",
    "icon": "≈",
    "shortDesc": "Apply smooth Gaussian blur to photos with adjustable radius.",
    "h1": "Blur Image Online",
    "intro": "Soften backgrounds or obscure details with an adjustable blur radius.",
    "keywords": [
      "blur photo",
      "gaussian blur"
    ],
    "defaults": {
      "blurRadius": 8,
      "format": "original"
    }
  },
  {
    "id": "pixelate-image",
    "title": "Pixelate Image",
    "category": "effects",
    "popular": false,
    "mode": "single",
    "icon": "▦",
    "shortDesc": "Create retro pixel-art effects or censor sensitive image details.",
    "h1": "Pixelate Image Online",
    "intro": "Adjust pixel block size to create 8-bit styles or obscure private text.",
    "keywords": [
      "pixelate image",
      "mosaic censor"
    ],
    "defaults": {
      "pixelSize": 12,
      "format": "original"
    }
  },
  {
    "id": "meme-maker",
    "title": "Meme Maker",
    "category": "effects",
    "popular": false,
    "mode": "single",
    "icon": "💬",
    "shortDesc": "Add classic bold top and bottom captions with black stroke outline.",
    "h1": "Free Online Meme Generator",
    "intro": "Upload any image, type your top and bottom text, and export immediately.",
    "keywords": [
      "meme maker",
      "top bottom text image"
    ],
    "defaults": {
      "memeTop": "WHEN CODE COMPILES",
      "memeBottom": "ON THE FIRST TRY",
      "memeFontSize": 44,
      "format": "image/jpeg",
      "quality": 0.92
    }
  },
  {
    "id": "collage-maker",
    "title": "Photo Collage Maker",
    "category": "effects",
    "popular": false,
    "mode": "collage",
    "icon": "⊞",
    "shortDesc": "Combine 2 to 4 images into side-by-side, vertical, or 2×2 grid layouts.",
    "h1": "Online Photo Collage Maker",
    "intro": "Select multiple photos, pick a grid layout, adjust spacing, and export a combined image.",
    "keywords": [
      "collage maker",
      "combine photos"
    ],
    "defaults": {
      "layout": "grid-2x2",
      "gap": 16,
      "bgColor": "#ffffff",
      "canvasSize": 1200
    }
  },
  {
    "id": "bulk-image-resizer",
    "title": "Bulk Image Resizer",
    "category": "bulk",
    "popular": true,
    "mode": "bulk",
    "icon": "📚",
    "shortDesc": "Resize up to 25 images in your browser with per-file status tracking.",
    "h1": "Bulk Image Resizer Online",
    "intro": "Select multiple images at once, apply shared scale settings, and download each processed file.",
    "keywords": [
      "bulk resize images",
      "batch photo resizer"
    ],
    "defaults": {
      "scaleMode": "pct",
      "pct": 50,
      "format": "image/jpeg",
      "quality": 0.9
    }
  },
  {
    "id": "bulk-image-converter",
    "title": "Bulk Image Converter",
    "category": "bulk",
    "popular": false,
    "mode": "bulk",
    "icon": "🗂",
    "shortDesc": "Batch-convert multiple JPG, PNG, and WebP files locally.",
    "h1": "Bulk Image Format Converter",
    "intro": "Convert a queue of images to WebP, JPG, or PNG in one batch.",
    "keywords": [
      "batch image converter",
      "bulk png to webp"
    ],
    "defaults": {
      "scaleMode": "pct",
      "pct": 100,
      "format": "image/webp",
      "quality": 0.88,
      "bgColor": "#ffffff"
    }
  }
];
export function getToolById(id) {
  return TOOLS.find((t) => t.id === id) || null;
}
