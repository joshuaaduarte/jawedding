// ============================================================
// Photo Configuration
// ============================================================
// Replace the placeholder URLs below with real photo URLs when
// you're ready. No other code changes are needed — the entire
// site reads images from this single file.
//
// To upload photos easily, use the Vercel Blob upload in the
// admin panel (coming soon), or paste any direct image URL.
// ============================================================

export const PHOTOS = {
  // Hero image on the public landing page
  hero: "https://picsum.photos/seed/weddinghero/1800/1200",

  // Venue / location photos
  coast:    "https://picsum.photos/seed/montereycoast/1600/1000",
  venue:    "https://picsum.photos/seed/weddingvenue/1600/1000",
  portrait: "https://picsum.photos/seed/weddingportrait/1200/1200",

  // Couple moments — appear in the photo wall and gallery sections
  moment1: "https://picsum.photos/seed/weddingmoment1/1200/900",
  moment2: "https://picsum.photos/seed/weddingmoment2/1200/900",
  moment3: "https://picsum.photos/seed/weddingmoment3/1200/900",
  moment4: "https://picsum.photos/seed/weddingmoment4/1200/900",
  moment5: "https://picsum.photos/seed/weddingmoment5/1200/900",
  moment6: "https://picsum.photos/seed/weddingmoment6/1200/900",
} as const;
