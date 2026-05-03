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
  coast:    "https://images.unsplash.com/photo-1559505520-a7f905ccea87?w=1600&h=1000&fit=crop&q=80",
  venue:    "https://picsum.photos/seed/weddingvenue/1600/1000",
  portrait: "https://picsum.photos/seed/weddingportrait/1200/1200",

  // Couple moments — appear in the photo wall and gallery sections
  moment1: "https://picsum.photos/seed/weddingmoment1/1200/900",
  moment2: "https://picsum.photos/seed/weddingmoment2/1200/900",
  moment3: "https://picsum.photos/seed/weddingmoment3/1200/900",
  moment4: "https://picsum.photos/seed/weddingmoment4/1200/900",
  moment5: "https://picsum.photos/seed/weddingmoment5/1200/900",
  moment6: "https://picsum.photos/seed/weddingmoment6/1200/900",

  // Things to do — real photos of each location (Unsplash, free to use)
  placeAquarium:    "https://images.unsplash.com/photo-1536094517470-a9784e41e283?w=1200&h=800&fit=crop&q=80",
  placeCanneryRow:  "https://images.unsplash.com/photo-1640919570875-f3cf2b3a6320?w=1200&h=800&fit=crop&q=80",
  placeCarmel:      "https://images.unsplash.com/photo-1553482040-74fd9f7eff29?w=1200&h=800&fit=crop&q=80",
  placePointLobos:  "https://images.unsplash.com/photo-1721707037238-3ed427483949?w=1200&h=800&fit=crop&q=80",
  place17Mile:      "https://images.unsplash.com/photo-1713811248658-266de384a9ff?w=1200&h=800&fit=crop&q=80",
  placeCarmelVal:   "https://images.unsplash.com/photo-1717351112327-e5c50e7a2ee0?w=1200&h=800&fit=crop&q=80",
  placeBigSur:      "https://images.unsplash.com/photo-1757715661266-70ec8851cef0?w=1200&h=800&fit=crop&q=80",
  placeSantaCruz:   "https://images.unsplash.com/photo-1630220123539-c020fbae7813?w=1200&h=800&fit=crop&q=80",
  placeHalfMoon:    "https://images.unsplash.com/photo-1578494183711-0fef04267c03?w=1200&h=800&fit=crop&q=80",
  placeSF:          "https://images.unsplash.com/photo-1610312278520-bcc893a3ff1d?w=1200&h=800&fit=crop&q=80",
  placeOakland:     "https://images.unsplash.com/photo-1576848444197-a582052713b7?w=1200&h=800&fit=crop&q=80",

  // Honeymoon destinations — replace with real travel photos when ready
  destJapan:     "https://picsum.photos/seed/japan-kyoto-temple/1200/800",
  destGuatemala: "https://picsum.photos/seed/guatemala-lake-atitlan/1200/800",
} as const;
