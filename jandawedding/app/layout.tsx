import type { Metadata } from "next";
import "./globals.css";
import { getLocale } from "@/lib/locale";

export const metadata: Metadata = {
  title: "Jane & Alex Wedding",
  description: "Wedding details, weekend timeline, travel info, and RSVP.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
