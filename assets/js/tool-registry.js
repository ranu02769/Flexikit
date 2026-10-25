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
export const ICONS = {
  "resize": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"15 3 21 3 21 9\"/><polyline points=\"9 21 3 21 3 15\"/><line x1=\"21\" y1=\"3\" x2=\"14\" y2=\"10\"/><line x1=\"3\" y1=\"21\" x2=\"10\" y2=\"14\"/></svg>",
  "compress": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg>",
  "target": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><circle cx=\"12\" cy=\"12\" r=\"6\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/></svg>",
  "crop": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 2v14a2 2 0 0 0 2 2h14\"/><path d=\"M18 22V8a2 2 0 0 0-2-2H2\"/></svg>",
  "convert": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"17 1 21 5 17 9\"/><path d=\"M3 11V9a4 4 0 0 1 4-4h14\"/><polyline points=\"7 23 3 19 7 15\"/><path d=\"M21 13v2a4 4 0 0 1-4 4H3\"/></svg>",
  "rotate": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"23 4 23 10 17 10\"/><path d=\"M20.49 15a9 9 0 1 1-2.12-9.36L23 10\"/></svg>",
  "idcard": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\"/><circle cx=\"9\" cy=\"10\" r=\"2\"/><path d=\"M15 8h2\"/><path d=\"M15 12h2\"/><path d=\"M7 16h10\"/></svg>",
  "pen": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 19l7-7 3 3-7 7-3-3z\"/><path d=\"M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z\"/></svg>",
  "social": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"5\"/><path d=\"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z\"/><line x1=\"17.5\" y1=\"6.5\" x2=\"17.51\" y2=\"6.5\"/></svg>",
  "code": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"16 18 22 12 16 6\"/><polyline points=\"8 6 2 12 8 18\"/></svg>",
  "wand": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15 4V2\"/><path d=\"M15 16v-2\"/><path d=\"M8 9h2\"/><path d=\"M20 9h2\"/><path d=\"M17.8 11.8 19 13\"/><path d=\"M15 9h0\"/><path d=\"M17.8 6.2 19 5\"/><path d=\"m3 21 9-9\"/><path d=\"M12.2 6.2 11 5\"/></svg>",
  "grid": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\"/></svg>",
  "stack": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"12 2 2 7 12 12 22 7 12 2\"/><polyline points=\"2 17 12 22 22 17\"/><polyline points=\"2 12 12 17 22 12\"/></svg>"
};
export const TOOLS = [
  {
    "id": "image-resizer",
    "title": "Image Resizer",
    "category": "resize",
    "popular": true,
    "mode": "single",
    "iconKey": "resize",
    "shortDesc": "Exact pixel or percentage resizing with aspect lock.",
    "h1": "Image Resizer",
    "intro": "Resize JPG, PNG, and WebP photos by exact pixel dimensions or percentage.",
    "keywords": [
      "resize image",
      "pixel resizer",
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
        "label": "HD 1280×720",
        "w": 1280,
        "h": 720
      },
      {
        "label": "FHD 1920×1080",
        "w": 1920,
        "h": 1080
      },
      {
        "label": "1:1 1080×1080",
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
    "iconKey": "compress",
    "shortDesc": "Shrink photo byte size up to 80% with live quality control.",
    "h1": "Image Compressor",
    "intro": "Reduce JPG and WebP file size instantly while preserving visual clarity.",
    "keywords": [
      "compress image",
      "reduce photo size",
      "shrink kb"
    ],
    "defaults": {
      "format": "image/jpeg",
      "quality": 0.75,
      "bgColor": "#ffffff"
    }
  },
  {
    "id": "target-file-size",
    "title": "Compress to 20KB / 50KB",
    "category": "compress",
    "popular": true,
    "mode": "single",
    "iconKey": "target",
    "shortDesc": "Hit exact portal limits like 20 KB, 50 KB, or 100 KB.",
    "h1": "Compress Image to Exact KB Size",
    "intro": "Auto-tunes quality and resolution to fit strict 20 KB, 50 KB, or 100 KB form limits.",
    "keywords": [
      "20kb",
      "50kb",
      "100kb",
      "target file size",
      "sarkari form photo"
    ],
    "defaults": {
      "targetKb": 50,
      "format": "image/jpeg",
      "allowDownscale": true,
      "bgColor": "#ffffff"
    },
    "kbPresets": [
      20,
      30,
      50,
      100,
      200
    ]
  },
  {
    "id": "passport-photo-maker",
    "title": "Passport Photo Maker",
    "category": "photo-id",
    "popular": true,
    "mode": "single",
    "iconKey": "idcard",
    "shortDesc": "2×2 inch, 35×45 mm ID presets & 4×6 printable sheet.",
    "h1": "Passport & ID Photo Maker",
    "intro": "Format portraits to 300 DPI passport sizes or generate a 4×6 inch multi-photo print sheet.",
    "keywords": [
      "passport photo",
      "35x45mm",
      "2x2 inch",
      "exam photo"
    ],
    "defaults": {
      "w": 413,
      "h": 531,
      "lockAspect": true,
      "printSheet": false,
      "format": "image/jpeg",
      "quality": 0.94,
      "bgColor": "#ffffff"
    },
    "presets": [
      {
        "label": "35×45 mm (413×531)",
        "w": 413,
        "h": 531
      },
      {
        "label": "2×2 in (600×600)",
        "w": 600,
        "h": 600
      },
      {
        "label": "Exam 200×230 px",
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
    "iconKey": "pen",
    "shortDesc": "140×60 px exam portal preset under 20 KB.",
    "h1": "Signature Image Resizer (10KB–20KB)",
    "intro": "Resize scanned signatures to 140×60 px and compress under 20 KB for online applications.",
    "keywords": [
      "signature resizer",
      "140x60",
      "20kb signature",
      "ssc signature"
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
        "label": "140×60 px (Portal)",
        "w": 140,
        "h": 60
      },
      {
        "label": "300×100 px",
        "w": 300,
        "h": 100
      },
      {
        "label": "256×64 px",
        "w": 256,
        "h": 64
      }
    ]
  },
  {
    "id": "image-cropper",
    "title": "Image Cropper",
    "category": "crop-rotate",
    "popular": true,
    "mode": "single",
    "iconKey": "crop",
    "shortDesc": "Trim photos with 1:1, 16:9, 4:5 presets or custom frame.",
    "h1": "Crop Image Online",
    "intro": "Frame your subject using instant aspect ratio pills or custom offset controls.",
    "keywords": [
      "crop image",
      "square crop",
      "16:9 crop"
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
    "title": "Image Format Converter",
    "category": "convert",
    "popular": true,
    "mode": "single",
    "iconKey": "convert",
    "shortDesc": "Convert between WebP, JPG, and PNG in one tap.",
    "h1": "Image Format Converter",
    "intro": "Fast local conversion between JPG, PNG, and WebP formats.",
    "keywords": [
      "image converter",
      "webp to jpg",
      "png to jpg"
    ],
    "defaults": {
      "format": "image/webp",
      "quality": 0.9,
      "bgColor": "#ffffff"
    }
  },
  {
    "id": "bulk-image-resizer",
    "title": "Bulk Image Resizer (.ZIP)",
    "category": "bulk",
    "popular": true,
    "mode": "bulk",
    "iconKey": "stack",
    "shortDesc": "Batch resize up to 25 images & download as a single ZIP.",
    "h1": "Bulk Image Resizer & ZIP Downloader",
    "intro": "Process up to 25 photos at once and export them individually or as a single .ZIP archive.",
    "keywords": [
      "bulk resize",
      "batch image resizer",
      "zip download"
    ],
    "defaults": {
      "scaleMode": "pct",
      "pct": 50,
      "format": "image/jpeg",
      "quality": 0.9
    }
  },
  {
    "id": "jpg-to-png",
    "title": "JPG to PNG",
    "category": "convert",
    "popular": false,
    "mode": "single",
    "iconKey": "convert",
    "shortDesc": "Convert JPEG photos into lossless PNG files.",
    "h1": "JPG to PNG Converter",
    "intro": "Turn any JPG image into a lossless PNG file locally.",
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
    "title": "PNG to JPG",
    "category": "convert",
    "popular": false,
    "mode": "single",
    "iconKey": "convert",
    "shortDesc": "Convert transparent PNGs to JPG with custom backdrop fill.",
    "h1": "PNG to JPG Converter",
    "intro": "Replace transparent PNG backgrounds with solid white or custom color and export as JPEG.",
    "keywords": [
      "png to jpg",
      "transparent to white jpg"
    ],
    "defaults": {
      "format": "image/jpeg",
      "lockFormat": true,
      "quality": 0.92,
      "bgColor": "#ffffff"
    }
  },
  {
    "id": "webp-converter",
    "title": "WebP Converter",
    "category": "convert",
    "popular": false,
    "mode": "single",
    "iconKey": "convert",
    "shortDesc": "Encode images to next-gen WebP for faster websites.",
    "h1": "WebP Image Converter",
    "intro": "Convert images to or from high-efficiency WebP format.",
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
    "iconKey": "convert",
    "shortDesc": "Shrink transparent PNGs into lightweight WebP graphics.",
    "h1": "PNG to WebP Converter",
    "intro": "Keep full alpha transparency while cutting PNG file size down with WebP.",
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
    "iconKey": "convert",
    "shortDesc": "Convert JPEG photographs into WebP format.",
    "h1": "JPG to WebP Converter",
    "intro": "Make web images load faster by converting JPEG to WebP.",
    "keywords": [
      "jpg to webp"
    ],
    "defaults": {
      "format": "image/webp",
      "lockFormat": true,
      "quality": 0.86
    }
  },
  {
    "id": "webp-to-jpg",
    "title": "WebP to JPG",
    "category": "convert",
    "popular": false,
    "mode": "single",
    "iconKey": "convert",
    "shortDesc": "Turn WebP files into standard universal JPG images.",
    "h1": "WebP to JPG Converter",
    "intro": "Convert WebP images into universally compatible JPEG files.",
    "keywords": [
      "webp to jpg"
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
    "iconKey": "rotate",
    "shortDesc": "Rotate photos 90° left, right, or 180° lossless-style.",
    "h1": "Rotate Image 90° / 180°",
    "intro": "Fix orientation of sideways photos with instant 90° rotation controls.",
    "keywords": [
      "rotate image",
      "turn photo"
    ],
    "defaults": {
      "rotate": 0,
      "format": "original"
    }
  },
  {
    "id": "flip-image",
    "title": "Flip & Mirror Image",
    "category": "crop-rotate",
    "popular": false,
    "mode": "single",
    "iconKey": "rotate",
    "shortDesc": "Mirror images horizontally or vertically.",
    "h1": "Flip Image Horizontally or Vertically",
    "intro": "Mirror selfies and graphics with one tap.",
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
    "id": "youtube-thumbnail-resizer",
    "title": "YouTube Thumbnail Resizer",
    "category": "social",
    "popular": false,
    "mode": "single",
    "iconKey": "social",
    "shortDesc": "1280×720 HD & 1920×1080 16:9 YouTube presets.",
    "h1": "YouTube Thumbnail Resizer (1280×720)",
    "intro": "Format cover images to exact 16:9 YouTube thumbnail dimensions under 2 MB.",
    "keywords": [
      "youtube thumbnail resizer",
      "1280x720"
    ],
    "defaults": {
      "w": 1280,
      "h": 720,
      "lockAspect": true,
      "format": "image/jpeg",
      "quality": 0.92
    },
    "presets": [
      {
        "label": "1280×720 HD",
        "w": 1280,
        "h": 720
      },
      {
        "label": "1920×1080 FHD",
        "w": 1920,
        "h": 1080
      },
      {
        "label": "Banner 2560×1440",
        "w": 2560,
        "h": 1440
      }
    ]
  },
  {
    "id": "instagram-image-resizer",
    "title": "Instagram Resizer",
    "category": "social",
    "popular": false,
    "mode": "single",
    "iconKey": "social",
    "shortDesc": "4:5 Portrait (1080×1350), 1:1 Square & 9:16 Story.",
    "h1": "Instagram Photo Resizer",
    "intro": "One-tap presets for Instagram Portrait (1080×1350), Square, and Story posts.",
    "keywords": [
      "instagram resizer",
      "1080x1350"
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
        "label": "4:5 (1080×1350)",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1 (1080×1080)",
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
    "iconKey": "social",
    "shortDesc": "1200×630 link post, square feed & event cover presets.",
    "h1": "Facebook Image Resizer",
    "intro": "Resize photos for Facebook feed posts, link previews, and covers.",
    "keywords": [
      "facebook resizer",
      "1200x630"
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
        "label": "Post 1200×630",
        "w": 1200,
        "h": 630
      },
      {
        "label": "Square 1080×1080",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "Cover 1920×1005",
        "w": 1920,
        "h": 1005
      }
    ]
  },
  {
    "id": "circular-image-cropper",
    "title": "Circle Avatar Cropper",
    "category": "effects",
    "popular": false,
    "mode": "single",
    "iconKey": "wand",
    "shortDesc": "Crop profile pictures into a circle with transparent corners.",
    "h1": "Circular Profile Picture Cropper",
    "intro": "Export round profile avatars as transparent PNG or WebP.",
    "keywords": [
      "circle crop",
      "round avatar"
    ],
    "defaults": {
      "circleCrop": true,
      "format": "image/png"
    }
  },
  {
    "id": "rounded-corners-image",
    "title": "Rounded Corners",
    "category": "effects",
    "popular": false,
    "mode": "single",
    "iconKey": "wand",
    "shortDesc": "Smooth border-radius corners exported as transparent PNG.",
    "h1": "Round Image Corners",
    "intro": "Add smooth rounded corners with adjustable pixel radius.",
    "keywords": [
      "round corners",
      "border radius image"
    ],
    "defaults": {
      "borderRadius": 48,
      "format": "image/png"
    }
  },
  {
    "id": "grayscale-image",
    "title": "Black & White Filter",
    "category": "effects",
    "popular": false,
    "mode": "single",
    "iconKey": "wand",
    "shortDesc": "Convert color photos to monochrome grayscale.",
    "h1": "Grayscale Image Converter",
    "intro": "Turn color images into clean black-and-white photos.",
    "keywords": [
      "grayscale",
      "black and white"
    ],
    "defaults": {
      "grayscale": 100,
      "format": "original"
    }
  },
  {
    "id": "add-image-border",
    "title": "Add Image Border",
    "category": "effects",
    "popular": false,
    "mode": "single",
    "iconKey": "wand",
    "shortDesc": "Wrap photos in a clean solid frame of custom thickness.",
    "h1": "Add Border Frame to Image",
    "intro": "Add a customizable colored border around any photo.",
    "keywords": [
      "add border",
      "photo frame"
    ],
    "defaults": {
      "borderWidth": 24,
      "borderColor": "#ffffff",
      "format": "original"
    }
  },
  {
    "id": "image-watermark",
    "title": "Text Watermark Studio",
    "category": "effects",
    "popular": false,
    "mode": "single",
    "iconKey": "wand",
    "shortDesc": "Stamp custom copyright text with opacity & position control.",
    "h1": "Add Text Watermark to Image",
    "intro": "Protect your photos with customizable text overlays.",
    "keywords": [
      "watermark image",
      "copyright stamp"
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
    "title": "Gaussian Blur",
    "category": "effects",
    "popular": false,
    "mode": "single",
    "iconKey": "wand",
    "shortDesc": "Smooth background blur with live radius slider.",
    "h1": "Blur Image Online",
    "intro": "Apply smooth Gaussian blur to soften backgrounds or hide details.",
    "keywords": [
      "blur image",
      "gaussian blur"
    ],
    "defaults": {
      "blurRadius": 8,
      "format": "original"
    }
  },
  {
    "id": "pixelate-image",
    "title": "Pixelate & Censor",
    "category": "effects",
    "popular": false,
    "mode": "single",
    "iconKey": "wand",
    "shortDesc": "8-bit mosaic pixelation for retro art or privacy censoring.",
    "h1": "Pixelate Image Online",
    "intro": "Adjust pixel block size to pixelate photos.",
    "keywords": [
      "pixelate image",
      "mosaic"
    ],
    "defaults": {
      "pixelSize": 12,
      "format": "original"
    }
  },
  {
    "id": "meme-maker",
    "title": "Meme Generator",
    "category": "effects",
    "popular": false,
    "mode": "single",
    "iconKey": "wand",
    "shortDesc": "Classic bold Impact top & bottom captions with stroke.",
    "h1": "Online Meme Maker",
    "intro": "Add top and bottom meme captions with crisp black outline.",
    "keywords": [
      "meme maker",
      "caption image"
    ],
    "defaults": {
      "memeTop": "FIRST TRY",
      "memeBottom": "ZERO BUGS",
      "memeFontSize": 44,
      "format": "image/jpeg",
      "quality": 0.92
    }
  },
  {
    "id": "collage-maker",
    "title": "Photo Collage Grid",
    "category": "effects",
    "popular": false,
    "mode": "collage",
    "iconKey": "grid",
    "shortDesc": "Combine 2–4 photos into side-by-side or 2×2 grids.",
    "h1": "Photo Collage Maker",
    "intro": "Merge multiple photos into a clean 2×2 grid or side-by-side layout.",
    "keywords": [
      "collage maker",
      "photo grid"
    ],
    "defaults": {
      "layout": "grid-2x2",
      "gap": 16,
      "bgColor": "#ffffff",
      "canvasSize": 1200
    }
  },
  {
    "id": "bulk-image-converter",
    "title": "Bulk Format Converter (.ZIP)",
    "category": "bulk",
    "popular": false,
    "mode": "bulk",
    "iconKey": "stack",
    "shortDesc": "Batch convert up to 25 files to WebP/JPG/PNG + ZIP export.",
    "h1": "Bulk Image Format Converter",
    "intro": "Convert multiple images at once and download all as a .ZIP archive.",
    "keywords": [
      "bulk converter",
      "batch webp"
    ],
    "defaults": {
      "scaleMode": "pct",
      "pct": 100,
      "format": "image/webp",
      "quality": 0.88,
      "bgColor": "#ffffff"
    }
  },
  {
    "id": "image-dimensions",
    "title": "Resolution & DPI Inspector",
    "category": "utilities",
    "popular": false,
    "mode": "inspector",
    "iconKey": "code",
    "shortDesc": "Instant width, height, aspect ratio, megapixels & byte size.",
    "h1": "Check Image Dimensions & Aspect Ratio",
    "intro": "Inspect exact pixel resolution, aspect ratio, and file size locally.",
    "keywords": [
      "image dimensions",
      "check resolution"
    ],
    "defaults": {}
  },
  {
    "id": "image-to-base64",
    "title": "Image to Base64",
    "category": "utilities",
    "popular": false,
    "mode": "base64-encode",
    "iconKey": "code",
    "shortDesc": "Generate inline Data URL strings for HTML & CSS.",
    "h1": "Image to Base64 Encoder",
    "intro": "Convert icons and images into Base64 Data URLs.",
    "keywords": [
      "image to base64",
      "data url"
    ],
    "defaults": {}
  },
  {
    "id": "base64-to-image",
    "title": "Base64 to Image",
    "category": "utilities",
    "popular": false,
    "mode": "base64-decode",
    "iconKey": "code",
    "shortDesc": "Decode Base64 strings back into downloadable PNG/JPG files.",
    "h1": "Base64 to Image Decoder",
    "intro": "Paste a Base64 payload to preview and download the image.",
    "keywords": [
      "base64 to image",
      "decode base64"
    ],
    "defaults": {}
  },
  {
    "id": "image-upscaler-guide",
    "title": "Upscaling vs Resizing Guide",
    "category": "utilities",
    "popular": false,
    "mode": "guide",
    "iconKey": "code",
    "shortDesc": "Technical comparison of bicubic browser scaling vs neural AI.",
    "h1": "Image Upscaling & DPI Guide",
    "intro": "How browser interpolation works and how to export crisp high-DPI graphics.",
    "keywords": [
      "upscaler guide",
      "dpi guide"
    ],
    "defaults": {}
  }
];
export function getToolById(id) {
  return TOOLS.find((t) => t.id === id) || null;
}
