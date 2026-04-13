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
  hero: "https://onuxjtvcfocptampxthj.supabase.co/storage/v1/object/public/photos/hero.jpg",

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

  // Things to do — replace each URL with a real photo of that location
  placeAquarium:    "https://picsum.photos/seed/monterey-aquarium/1200/800",
  placeCanneryRow:  "https://picsum.photos/seed/cannery-row/1200/800",
  placeCarmel:      "https://picsum.photos/seed/carmel-by-the-sea/1200/800",
  placePointLobos:  "https://picsum.photos/seed/point-lobos/1200/800",
  place17Mile:      "https://picsum.photos/seed/17-mile-drive/1200/800",
  placeCarmelVal:   "https://picsum.photos/seed/carmel-valley-wine/1200/800",
  placeBigSur:      "https://picsum.photos/seed/big-sur-highway/1200/800",
  placeSantaCruz:   "https://picsum.photos/seed/santa-cruz-boardwalk/1200/800",
  placeHalfMoon:    "https://picsum.photos/seed/half-moon-bay/1200/800",
  placeSF:          "https://picsum.photos/seed/san-francisco-bay/1200/800",
  placeOakland:     "https://picsum.photos/seed/oakland-temescal/1200/800",

  // Honeymoon destinations — replace with real travel photos when ready
  destJapan:     "https://picsum.photos/seed/japan-kyoto-temple/1200/800",
  destGuatemala: "https://picsum.photos/seed/guatemala-lake-atitlan/1200/800",
} as const;
