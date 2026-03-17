import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getAuthenticatedGuest } from "@/lib/auth";
import { PHOTOS } from "@/lib/photos";
import { getLocale } from "@/lib/locale";
import { LanguageSwitcher } from "@/components/language-switcher";

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
          registry: "Registry",
          stay: "Stay",
          things: "To Do",
          carpool: "Carpool",
        };

  const navItems = [
    { href: "/portal", label: t.home },
    { href: "/portal/registry", label: t.registry },
    { href: "/portal/stay", label: t.stay },
    { href: "/portal/things-to-do", label: t.things },
    { href: "/portal/carpool", label: t.carpool },
  ];

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f5f2e8_0%,#f6f7f5_50%,#eaf1ef_100%)] text-stone-800">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-8">
        {/* Portal header */}
        <header className="overflow-hidden rounded-3xl border border-stone-200 bg-white/85 shadow-sm backdrop-blur">
          <div className="relative h-44">
            <Image
              src={PHOTOS.coast}
              alt="Portal banner"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.24em] text-emerald-100">
                  {t.guestPortal}
                </p>
                <h1 className="mt-1 truncate font-serif text-3xl text-white">
                  {t.welcome}, {guest.firstName}
                </h1>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <LanguageSwitcher locale={locale} />
                <form action="/api/logout" method="post">
                  <button
                    type="submit"
                    className="h-10 rounded-full border border-white/70 bg-white/10 px-4 text-xs uppercase tracking-[0.18em] text-white backdrop-blur transition hover:bg-white/20"
                  >
                    {t.logout}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Mobile-friendly nav — scrollable horizontally, large tap targets */}
          <nav
            aria-label="Portal navigation"
            className="flex overflow-x-auto px-4 py-1 scrollbar-none sm:px-6"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 px-3 py-4 text-xs uppercase tracking-[0.16em] text-stone-600 transition hover:text-stone-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        {children}
      </div>
    </main>
  );
}
