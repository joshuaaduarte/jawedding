import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Placeholder images (used until real photos are uploaded)
      { protocol: "https", hostname: "picsum.photos" },
      // Unsplash — location photos for Things to Do & Stay pages
      { protocol: "https", hostname: "images.unsplash.com" },
      // Vercel Blob — used when you upload real photos via the admin panel
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      // Supabase Storage — alternative option
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
