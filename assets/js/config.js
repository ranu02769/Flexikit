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
