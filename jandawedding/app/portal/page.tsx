import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAuthenticatedGuest } from "@/lib/auth";
import { PHOTOS } from "@/lib/photos";
import { getLocale } from "@/lib/locale";

export default async function PortalPage() {
  const guest = await getAuthenticatedGuest();
  if (!guest) redirect("/login");

  const locale = await getLocale();

  const t =
    locale === "es"
      ? {
          note: "Un Mensaje Para Ti",
          rsvpTitle: "Confirmación",
          rsvpDesc: "Confirma tu asistencia y déjanos un mensaje.",
          rsvpCta: "Confirmar ahora",
          featuredLabel: "Para explorar",
          itineraryTitle: "Tu Agenda",
          itineraryDesc: "Todos tus eventos del fin de semana.",
          storyTitle: "Nuestra Historia",
          storyDesc: "Cómo se conocieron Ana y Joshua.",
          moreLabel: "Más información",
          links: [
            { href: "/portal/bridal-party", title: "Familia de la Boda", desc: "Conoce a las personas especiales del día." },
            { href: "/portal/registry", title: "Mesa de Regalos", desc: "Nuestros deseos para el nuevo hogar." },
            { href: "/portal/stay", title: "Hospedaje", desc: "Hoteles y alojamiento recomendados." },
            { href: "/portal/things-to-do", title: "Qué Hacer", desc: "Descubre Monterey antes o después de la boda." },
            { href: "/portal/travel-board", title: "Tablero De Viaje", desc: "Coordina el transporte con otros invitados." },
          ],
        }
      : {
          note: "A Note For You",
          rsvpTitle: "RSVP",
          rsvpDesc: "Confirm your attendance and leave us a message for Ana & Joshua.",
          rsvpCta: "Confirm now",
          featuredLabel: "Explore",
          itineraryTitle: "Your Itinerary",
          itineraryDesc: "All your events across the weekend.",
          storyTitle: "Our Story",
          storyDesc: "How Ana & Joshua met and fell in love.",
          moreLabel: "More",
          links: [
            { href: "/portal/bridal-party", title: "Wedding Party", desc: "Meet the special people standing by our side." },
            { href: "/portal/registry", title: "Registry", desc: "Our wishes for our new home together." },
            { href: "/portal/stay", title: "Stay", desc: "Recommended hotels and accommodations nearby." },
            { href: "/portal/things-to-do", title: "To Do", desc: "Discover Monterey before or after the wedding." },
            { href: "/portal/travel-board", title: "Travel Board", desc: "Share your travel plans and connect with other guests." },
          ],
        };

  return (
    <div className="space-y-5">
      {/* ── Personalised note ── */}
      {(() => {
        const noteText = locale === "es"
          ? (guest.anecdoteEs || guest.anecdote)
          : guest.anecdote;
        return noteText ? (
        <section
          className="grid gap-0 overflow-hidden rounded-3xl md:grid-cols-[1fr_320px]"
          style={{
            border: "1px solid #e8ddd4",
            background: "rgba(251, 244, 232, 0.92)",
          }}
        >
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <p
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: "#c9a0a0" }}
            >
              {t.note}
            </p>
            <p
              className="mt-1 font-serif leading-none select-none"
              style={{ fontSize: "4rem", color: "#e8ddd4", lineHeight: 1 }}
              aria-hidden
            >
              &ldquo;
            </p>
            <p
              className="-mt-3 font-serif italic leading-8"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                color: "#3d2b1f",
              }}
            >
              {noteText}
            </p>
          </div>
          <div className="relative hidden h-full min-h-[220px] md:block">
            <Image
              src={PHOTOS.portrait}
              alt="A note for you"
              fill
              className="object-cover"
            />
          </div>
        </section>
        ) : null;
      })()}

      {/* ── RSVP — primary featured card ── */}
      <Link
        href="/portal/rsvp"
        className="group block rounded-3xl p-8 sm:p-10 transition hover:opacity-95"
        style={{ background: "#2d1f14" }}
      >
        <p
          className="text-xs uppercase tracking-[0.32em]"
          style={{ color: "#c9a0a0" }}
        >
          ✦ &nbsp; {t.rsvpTitle}
        </p>
        <h2
          className="mt-2 font-serif italic"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#f5ece0" }}
        >
          {t.rsvpDesc}
        </h2>
        <p
          className="mt-5 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs uppercase tracking-[0.22em] transition group-hover:gap-3"
          style={{ borderColor: "#c9a0a0", color: "#f0e0d0" }}
        >
          {t.rsvpCta} <span aria-hidden>→</span>
        </p>
      </Link>

      {/* ── Featured pair ── */}
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { href: "/portal/itinerary", title: t.itineraryTitle, desc: t.itineraryDesc, photo: PHOTOS.venue },
          { href: "/portal/our-story", title: t.storyTitle, desc: t.storyDesc, photo: PHOTOS.coast },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group relative overflow-hidden rounded-2xl"
            style={{ minHeight: "200px" }}
          >
            <Image src={card.photo} alt={card.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(20,10,5,0.78) 0%, rgba(20,10,5,0.2) 60%, transparent 100%)" }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="font-serif italic text-white" style={{ fontSize: "1.3rem" }}>
                {card.title}
              </h3>
              <p className="mt-1 text-xs leading-5" style={{ color: "#ddc8b4" }}>
                {card.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Secondary links — editorial list ── */}
      <section
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid #e8ddd4", background: "rgba(251, 244, 232, 0.92)" }}
      >
        <p
          className="px-6 pt-5 pb-3 text-xs uppercase tracking-[0.28em]"
          style={{ color: "#c9a0a0" }}
        >
          {t.moreLabel}
        </p>
        {t.links.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center justify-between px-6 py-4 transition hover:bg-black/[0.02]"
            style={{
              borderTop: i === 0 ? "1px solid #e8ddd4" : "1px solid #f0e8e0",
            }}
          >
            <div>
              <p
                className="font-serif italic"
                style={{ fontSize: "1.05rem", color: "#2d1f14" }}
              >
                {link.title}
              </p>
              <p className="mt-0.5 text-xs leading-5" style={{ color: "#8a7060" }}>
                {link.desc}
              </p>
            </div>
            <span
              className="ml-4 shrink-0 text-sm transition group-hover:translate-x-1"
              style={{ color: "#c9a0a0" }}
              aria-hidden
            >
              →
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
