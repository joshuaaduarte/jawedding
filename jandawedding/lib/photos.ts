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

  // Portal banner
  portalBanner: `${SB}/hero.jpg`,

  // Engagement photos — featured / editorial slots
  coast:    `${SB}/engagement/proposal-hilltop.jpg`,
  venue:    `${SB}/engagement/bench-forest.jpg`,
  portrait: `${SB}/engagement/formal-blue-dress.jpg`,

  // Couple moments — photo wall (landing page) + Our Story chapters
  moment1: `${SB}/engagement/standing-rocks-waves.jpg`,
  moment2: `${SB}/engagement/looking-down-bouquet.jpg`,
  moment3: `${SB}/engagement/boat-sunset-kiss.jpg`,
  moment4: `${SB}/engagement/berkeley-graduation.jpg`,
  moment5: `${SB}/engagement/tamu-graduation.jpg`,
  moment6: `${SB}/engagement/avocado-costumes.jpg`,

  // Portal card images
  closeupBouquetOcean: `${SB}/engagement/closeup-bouquet-ocean.jpg`,
  walkingAwayCoastal:  `${SB}/engagement/walking-away-coastal.jpg`,
  cheekKissOcean:      `${SB}/engagement/cheek-kiss-ocean.jpg`,
  walkingSandyPath:    `${SB}/engagement/walking-sandy-path.jpg`,
  embraceRocks:        `${SB}/engagement/embrace-rocks.jpg`,
  smilingBouquetSplash:`${SB}/engagement/smiling-bouquet-splash.jpg`,

  // Additional engagement photos — available for future use
  moment7:  `${SB}/engagement/engagement-ring-tamu.jpg`,
  moment8:  `${SB}/engagement/marathon-golden-sign.jpg`,
  moment9:  `${SB}/engagement/hands-holding-ring.jpg`,
  moment10: `${SB}/engagement/hands-reaching-rocks.jpg`,
  moment11: `${SB}/engagement/golden-gate-selfie.jpg`,
  moment12: `${SB}/engagement/walking-rocks-aerial.jpg`,
  moment13: `${SB}/engagement/proposal-hilltop.jpg`,

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

  // Stay page — real location photos (Unsplash)
  placePacificGrove: "https://images.unsplash.com/photo-1591164115502-09f4edf9f005?w=1200&h=800&fit=crop&q=80",
  placeMontereyPlaza: "https://images.unsplash.com/photo-1674314322081-a1c47e411229?w=1200&h=800&fit=crop&q=80",
  placeDowntownMonterey: "https://images.unsplash.com/photo-1705796271317-28f7f0cf3dc1?w=1200&h=800&fit=crop&q=80",

  // Honeymoon destination
  destJapan: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200&h=800&fit=crop&q=80",
} as const;
