// ============================================================
// Photo Configuration
// ============================================================
// All engagement photos are stored in Supabase Storage under
// the "photos/engagement/" prefix in the public "photos" bucket.
// Location photos for "Things to Do" use Unsplash URLs.
// ============================================================

const SB = "https://onuxjtvcfocptampxthj.supabase.co/storage/v1/object/public/photos";

export const PHOTOS = {
  // Hero image on the public landing page
  hero: `${SB}/engagement/golden-kiss-bouquet.jpg`,

  // Engagement photos — featured / editorial slots
  coast:    `${SB}/engagement/walking-away-coastal.jpg`,
  venue:    `${SB}/engagement/bench-forest.jpg`,
  portrait: `${SB}/engagement/face-touch-sky.jpg`,

  // Couple moments — photo wall (landing page) + Our Story chapters
  moment1: `${SB}/engagement/kiss-bouquet-ocean.jpg`,
  moment2: `${SB}/engagement/looking-down-bouquet.jpg`,
  moment3: `${SB}/engagement/embrace-rocks.jpg`,
  moment4: `${SB}/engagement/smiling-bouquet-splash.jpg`,
  moment5: `${SB}/engagement/walking-sandy-path.jpg`,
  moment6: `${SB}/engagement/closeup-bouquet-ocean.jpg`,

  // Additional engagement photos — available for future use
  moment7:  `${SB}/engagement/standing-rocks-waves.jpg`,
  moment8:  `${SB}/engagement/cheek-kiss-ocean.jpg`,
  moment9:  `${SB}/engagement/hands-holding-ring.jpg`,
  moment10: `${SB}/engagement/hands-reaching-rocks.jpg`,
  moment11: `${SB}/engagement/sitting-path-ring.jpg`,
  moment12: `${SB}/engagement/walking-rocks-aerial.jpg`,
  moment13: `${SB}/engagement/kiss-bouquet-ocean.jpg`,

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
