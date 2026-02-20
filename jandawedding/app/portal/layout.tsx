import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getAuthenticatedGuest } from "@/lib/auth";
import { TEMP_IMAGES } from "@/lib/temp-images";
import { getLocale } from "@/lib/locale";
import { LanguageSwitcher } from "@/components/language-switcher";

export default async function PortalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const guest = await getAuthenticatedGuest();
  if (!guest) {
    redirect("/login");
  }
  const locale = await getLocale();
  const t = locale === "es"
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
        stay: "Places To Stay",
        things: "Things To Do",
        carpool: "Carpool",
      };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f5f2e8_0%,#f6f7f5_50%,#eaf1ef_100%)] px-6 py-8 text-stone-800 sm:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="overflow-hidden rounded-3xl border border-stone-200 bg-white/85 shadow-sm backdrop-blur">
          <div className="relative h-44">
            <Image src={TEMP_IMAGES.coast} alt="Portal banner" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-emerald-100">
                  {t.guestPortal}
                </p>
                <h1 className="mt-1 font-serif text-3xl text-white">
                  {t.welcome}, {guest.firstName}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <LanguageSwitcher locale={locale} />
                <form action="/api/logout" method="post">
                  <button
                    type="submit"
                    className="h-10 rounded-full border border-white/70 bg-white/10 px-5 text-xs uppercase tracking-[0.18em] text-white backdrop-blur transition hover:bg-white/20"
                  >
                    {t.logout}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <nav className="flex flex-wrap gap-4 px-6 py-5 text-xs uppercase tracking-[0.16em] text-stone-600">
            <Link href="/portal">{t.home}</Link>
            <Link href="/portal/registry">{t.registry}</Link>
            <Link href="/portal/stay">{t.stay}</Link>
            <Link href="/portal/things-to-do">{t.things}</Link>
            <Link href="/portal/carpool">{t.carpool}</Link>
          </nav>
        </header>

        {children}
      </div>
    </main>
  );
}
