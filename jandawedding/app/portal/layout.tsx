import Image from "next/image";
import { redirect } from "next/navigation";
import { getAuthenticatedGuest } from "@/lib/auth";
import { PHOTOS } from "@/lib/photos";
import { getLocale } from "@/lib/locale";
import { LanguageSwitcher } from "@/components/language-switcher";
import { PortalNav } from "@/components/portal-nav";

export default async function PortalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const guest = await getAuthenticatedGuest();
  if (!guest) redirect("/login");

  const locale = await getLocale();
  const t =
    locale === "es"
      ? {
          guestPortal: "Portal De Invitados",
          welcome: "Bienvenido",
          logout: "Salir",
          home: "Inicio",
          story: "Nuestra Historia",
          party: "Familia De La Boda",
          registry: "Mesa De Regalos",
          stay: "Hospedaje",
          things: "Qué Hacer",
          carpool: "Auto Compartido",
        }
      : {
          guestPortal: "Guest Portal",
          welcome: "Welcome",
          logout: "Logout",
          home: "Home",
          story: "Our Story",
          party: "Wedding Party",
          registry: "Registry",
          stay: "Stay",
          things: "To Do",
          carpool: "Carpool",
        };

  const navItems = [
    { href: "/portal", label: t.home },
    { href: "/portal/our-story", label: t.story },
    { href: "/portal/bridal-party", label: t.party },
    { href: "/portal/registry", label: t.registry },
    { href: "/portal/stay", label: t.stay },
    { href: "/portal/things-to-do", label: t.things },
    { href: "/portal/carpool", label: t.carpool },
  ];

  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #fbf4e8 0%, #f5f0e8 40%, #edf1ee 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-8">
        {/* ── Portal header ── */}
        <header
          className="overflow-hidden rounded-3xl"
          style={{
            border: "1px solid #e8ddd4",
            boxShadow: "0 8px 32px rgba(45,31,20,0.12)",
          }}
        >
          {/* Banner image */}
          <div className="relative h-56 sm:h-64">
            <Image
              src={PHOTOS.coast}
              alt="Portal banner"
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(20,10,5,0.78) 0%, rgba(20,10,5,0.35) 55%, rgba(20,10,5,0.08) 100%)",
              }}
            />

            {/* Top-right controls */}
            <div className="absolute right-5 top-5 flex items-center gap-2">
              <LanguageSwitcher locale={locale} />
              <form action="/api/logout" method="post">
                <button
                  type="submit"
                  className="h-9 rounded-full px-4 text-xs uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:opacity-80"
                  style={{
                    border: "1px solid rgba(255,255,255,0.5)",
                    background: "rgba(255,255,255,0.08)",
                  }}
                >
                  {t.logout}
                </button>
              </form>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-5 left-6 right-6 sm:bottom-6 sm:left-8">
              <p
                className="text-xs uppercase tracking-[0.38em]"
                style={{ color: "#ddc8b4" }}
              >
                Ana &amp; Joshua &nbsp;·&nbsp; {t.guestPortal}
              </p>
              <h1
                className="mt-2 font-serif italic text-white"
                style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
              >
                {t.welcome}, {guest.firstName}
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <PortalNav items={navItems} />
        </header>

        {children}
      </div>
    </main>
  );
}
