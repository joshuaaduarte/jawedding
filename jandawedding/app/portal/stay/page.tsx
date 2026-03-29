import Image from "next/image";
import { PHOTOS } from "@/lib/photos";
import { getLocale } from "@/lib/locale";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

// TODO: Replace bookingUrl values with direct hotel website or booking.com links.
// TODO: Adjust priceRange, distCeremony, distVenue to match confirmed venues.
const HOTELS = [
  {
    name: "Monterey Plaza Hotel & Spa",
    area: "Cannery Row, Monterey",
    areaEs: "Cannery Row, Monterey",
    imageSrc: PHOTOS.coast,
    priceRange: "$$$",
    distCeremony: "20 min to ceremony",
    distCeremonyEs: "20 min a la ceremonia",
    distVenue: "15 min to reception",
    distVenueEs: "15 min al venue",
    note: "Waterfront property right on Cannery Row with a private ocean deck. Ideal for guests who want a splurge-worthy, scenic base.",
    noteEs: "Propiedad frente al mar en Cannery Row con terraza privada al océano. Ideal para quienes buscan una experiencia premium.",
    bookingUrl: "#", // TODO: Replace with direct booking link
  },
  {
    name: "Portola Hotel & Spa",
    area: "Downtown Monterey",
    areaEs: "Centro de Monterey",
    imageSrc: PHOTOS.venue,
    priceRange: "$$$",
    distCeremony: "20 min to ceremony",
    distCeremonyEs: "20 min a la ceremonia",
    distVenue: "12 min to reception",
    distVenueEs: "12 min al venue",
    note: "The largest full-service hotel in Monterey — great for families and groups traveling together. Central location with easy parking.",
    noteEs: "El hotel de servicio completo más grande de Monterey — ideal para familias y grupos. Ubicación central con estacionamiento fácil.",
    bookingUrl: "#", // TODO: Replace with direct booking link
  },
  {
    name: "Carmel Mission Inn",
    area: "Carmel-by-the-Sea",
    areaEs: "Carmel junto al Mar",
    imageSrc: PHOTOS.placeCarmel,
    priceRange: "$$",
    distCeremony: "5 min to ceremony",
    distCeremonyEs: "5 min a la ceremonia",
    distVenue: "18 min to reception",
    distVenueEs: "18 min al venue",
    note: "Best-value option closest to the Carmel Mission. Comfortable rooms, easy parking, and walking distance to Carmel village restaurants.",
    noteEs: "La mejor opción de precio más cerca de la Misión. Cómodas habitaciones, fácil estacionamiento y restaurantes a pie.",
    bookingUrl: "#", // TODO: Replace with direct booking link
  },
] as const;

// TODO: Adjust drive times once ceremony/reception addresses are confirmed.
const DISTANCES = [
  {
    from: "Carmel-by-the-Sea",
    to: "Carmel Mission Basilica",
    toLabel: "Ceremony",
    toLabelEs: "Ceremonia",
    time: "~5 min",
    icon: "⛪",
  },
  {
    from: "Carmel-by-the-Sea",
    to: "Fairview Laguna Seca",
    toLabel: "Reception",
    toLabelEs: "Recepción",
    time: "~18 min",
    icon: "🥂",
  },
  {
    from: "Downtown Monterey",
    to: "Carmel Mission Basilica",
    toLabel: "Ceremony",
    toLabelEs: "Ceremonia",
    time: "~20 min",
    icon: "⛪",
  },
  {
    from: "Downtown Monterey",
    to: "Fairview Laguna Seca",
    toLabel: "Reception",
    toLabelEs: "Recepción",
    time: "~12 min",
    icon: "🥂",
  },
  {
    from: "Pacific Grove",
    to: "Carmel Mission Basilica",
    toLabel: "Ceremony",
    toLabelEs: "Ceremonia",
    time: "~20 min",
    icon: "⛪",
  },
  {
    from: "Pacific Grove",
    to: "Fairview Laguna Seca",
    toLabel: "Reception",
    toLabelEs: "Recepción",
    time: "~15 min",
    icon: "🥂",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.22em]" style={{ color: "#c9a0a0" }}>
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mt-2 font-serif italic"
      style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#2d1f14" }}
    >
      {children}
    </h2>
  );
}

// Quick-action CTA buttons at the top of the page
function QuickLink({
  href,
  label,
  icon,
  isPrimary,
}: {
  href: string;
  label: string;
  icon: string;
  isPrimary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.14em] transition hover:opacity-80 active:scale-95 whitespace-nowrap"
      style={
        isPrimary
          ? { background: "#2d1f14", color: "#fbf4e8", border: "1px solid #2d1f14" }
          : {
              background: "rgba(251,244,232,0.7)",
              color: "#2d1f14",
              border: "1px solid #e8ddd4",
            }
      }
    >
      <span aria-hidden>{icon}</span>
      <span>{label}</span>
    </a>
  );
}

// Area overview card (with photo, name, badge)
function AreaCard({
  name,
  tagline,
  note,
  imageSrc,
  badge,
}: {
  name: string;
  tagline: string;
  note: string;
  imageSrc: string;
  badge: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl" style={{ border: "1px solid #e8ddd4" }}>
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <Image src={imageSrc} alt={name} fill className="object-cover" />
        <span
          className="absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.12em] backdrop-blur-sm"
          style={{ background: "rgba(45,31,20,0.62)", color: "#f5ede0" }}
        >
          {badge}
        </span>
      </div>
      <div className="px-5 py-4" style={{ background: "rgba(251,244,232,0.5)" }}>
        <h3 className="font-serif text-lg leading-tight" style={{ color: "#2d1f14" }}>
          {name}
        </h3>
        <p
          className="mt-0.5 text-[10px] uppercase tracking-[0.14em]"
          style={{ color: "#c9a0a0" }}
        >
          {tagline}
        </p>
        <p className="mt-2 text-xs leading-5" style={{ color: "#7a6050" }}>
          {note}
        </p>
      </div>
    </article>
  );
}

// Full hotel card with image, price range, distances, and booking CTA
function HotelCard({
  hotel,
  checkAvailability,
}: {
  hotel: (typeof HOTELS)[number];
  checkAvailability: string;
}) {
  return (
    <article
      className="overflow-hidden rounded-2xl flex flex-col"
      style={{ border: "1px solid #e8ddd4", background: "rgba(255,255,255,0.88)" }}
    >
      <div className="relative h-44 w-full overflow-hidden shrink-0">
        <Image src={hotel.imageSrc} alt={hotel.name} fill className="object-cover" />
      </div>
      <div className="flex flex-col flex-1 px-5 py-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className="font-serif text-xl leading-tight"
              style={{ color: "#2d1f14" }}
            >
              {hotel.name}
            </h3>
            <p
              className="mt-0.5 text-[10px] uppercase tracking-[0.14em]"
              style={{ color: "#c9a0a0" }}
            >
              {hotel.area}
            </p>
          </div>
          <span
            className="shrink-0 rounded-full px-3 py-1 text-xs font-medium"
            style={{ background: "rgba(201,160,160,0.14)", color: "#a07070" }}
          >
            {hotel.priceRange}
          </span>
        </div>

        {/* Distance chips */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span
            className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.1em]"
            style={{ border: "1px solid #e8ddd4", color: "#7a6050" }}
          >
            ⛪ {hotel.distCeremony}
          </span>
          <span
            className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.1em]"
            style={{ border: "1px solid #e8ddd4", color: "#7a6050" }}
          >
            🥂 {hotel.distVenue}
          </span>
        </div>

        {/* Description */}
        <p className="mt-3 text-xs leading-5 flex-1" style={{ color: "#8a7060" }}>
          {hotel.note}
        </p>

        {/* CTA */}
        {/* TODO: Replace hotel.bookingUrl with the actual hotel or Booking.com URL */}
        <a
          href={hotel.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center rounded-full py-2.5 text-[11px] uppercase tracking-[0.16em] transition hover:opacity-80"
          style={{ border: "1px solid #d4c4b4", color: "#2d1f14" }}
        >
          {checkAvailability}
        </a>
      </div>
    </article>
  );
}

// Travel tip card
function TipCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{ border: "1px solid #e8ddd4", background: "rgba(251,244,232,0.4)" }}
    >
      <p className="text-xl mb-2" aria-hidden>
        {icon}
      </p>
      <h4 className="text-sm font-medium" style={{ color: "#2d1f14" }}>
        {title}
      </h4>
      <p className="mt-1 text-xs leading-5" style={{ color: "#7a6050" }}>
        {body}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default async function StayPage() {
  const locale = await getLocale();
  const es = locale === "es";

  const t = es
    ? {
        // ── Hero ──
        sectionLabel: "Hospedaje",
        title: "Dónde Quedarse",
        intro:
          "Recomendamos Monterey o Carmel para el mejor acceso a los eventos de la boda. Todo está a 20 minutos o menos.",
        searchHotels: "Buscar Hoteles",
        searchAirbnb: "Buscar en Airbnb",
        viewMap: "Ver Mapa",

        // ── Areas ──
        areasLabel: "Zonas Recomendadas",
        areasTitle: "Elige Tu Base",
        areasIntro:
          "Las tres zonas funcionan bien. Elige según tu presupuesto y lo que quieras hacer el fin de semana.",
        areas: [
          {
            name: "Carmel-by-the-Sea",
            tagline: "Más cerca de la ceremonia",
            note: "Pueblo encantador y caminable justo al lado de la Basílica de la Misión. Boutiques, restaurantes y posadas a pie. La opción más pintoresca.",
            imageSrc: PHOTOS.placeCarmel,
            badge: "~5 min a la ceremonia",
          },
          {
            name: "Centro de Monterey",
            tagline: "Mejor selección de hoteles",
            note: "El hub de los hoteles grandes, ideal para grupos. Fácil acceso a Cannery Row, el Acuario y a corta distancia de los eventos de la boda.",
            imageSrc: PHOTOS.placeCanneryRow,
            badge: "~15 min a los eventos",
          },
          {
            name: "Pacific Grove",
            tagline: "Tranquilo y pintoresco",
            note: "Tranquilo pueblo costero entre Monterey y 17-Mile Drive. Más calmado que el centro, con posadas victorianas y vistas al mar.",
            imageSrc: PHOTOS.coast,
            badge: "~20 min a los eventos",
          },
        ],

        // ── Hotels ──
        hotelsLabel: "Hoteles Destacados",
        hotelsTitle: "Nuestras Recomendaciones",
        hotelsIntro:
          "Opciones comprobadas que conocemos y recomendamos a nuestros invitados.",
        checkAvailability: "Ver Disponibilidad →",

        // ── Airbnb ──
        airbnbLabel: "Alquiler Vacacional",
        airbnbTitle: "Airbnb & VRBO",
        airbnbIntro:
          "¿Viajas en grupo o con familia? Una casa de alquiler puede ser más cómoda y económica.",
        airbnbBody:
          "Busca en Carmel-by-the-Sea, Pacific Grove o Monterey. Para grupos de 4+, una casa frecuentemente ofrece más espacio y valor que habitaciones de hotel. Busca propiedades con estacionamiento incluido.",
        // TODO: Update Airbnb URL check-in/check-out dates when confirmed
        airbnbCta: "Buscar en Airbnb →",
        // TODO: Update VRBO search URL
        vrboCta: "Buscar en VRBO →",

        // ── Map ──
        mapLabel: "Orientación",
        mapTitle: "El Área",
        mapIntro:
          "La ceremonia es en la Basílica de la Misión de Carmel. La recepción es en Fairview Laguna Seca, Monterey. El mapa muestra la ruta entre ambas sedes.",

        // ── Distances ──
        distLabel: "Tiempos de Manejo",
        distTitle: "Distancias",
        distIntro:
          "Todo está cerca. Aquí tienes una guía de manejo aproximada desde cada zona.",

        // ── Tips ──
        tipsLabel: "Para Invitados de Fuera",
        tipsTitle: "Lo Que Necesitas Saber",
        tips: [
          {
            icon: "📅",
            title: "Reserva Pronto",
            body: "Septiembre es temporada alta en la Península. Los hoteles en Carmel y Monterey se llenan rápido para fines de semana de boda. Reserva con 4–6 meses de anticipación.",
          },
          {
            icon: "🚗",
            title: "Necesitarás un Auto",
            body: "El transporte público es muy limitado en la Península. Renta un auto o coordina viajes compartidos. Ambas sedes tienen estacionamiento disponible.",
          },
          {
            icon: "🌤",
            title: "El Clima en Septiembre es Ideal",
            body: "Tardes cálidas y despejadas — uno de los mejores meses en la península. Trae una capa ligera para la recepción nocturna.",
          },
          {
            icon: "🏡",
            title: "Considera una Casa Grupal",
            body: "Airbnb y VRBO tienen excelentes casas para grupos de 6–12 en Carmel y Pacific Grove — a menudo más espacio y valor que los hoteles.",
          },
        ],
      }
    : {
        // ── Hero ──
        sectionLabel: "Places To Stay",
        title: "Where to Stay",
        intro:
          "We recommend staying in Monterey or Carmel for easiest access to all the wedding weekend events. Everything is within 20 minutes.",
        searchHotels: "Search Hotels",
        searchAirbnb: "Search Airbnb",
        viewMap: "View Map",

        // ── Areas ──
        areasLabel: "Recommended Areas",
        areasTitle: "Choose Your Base",
        areasIntro:
          "All three areas work well. Choose based on your budget and what you want to do over the weekend.",
        areas: [
          {
            name: "Carmel-by-the-Sea",
            tagline: "Closest to the ceremony",
            note: "A walkable, charming village right next to the Carmel Mission Basilica. Boutiques, restaurants, and inns all within steps. The most picturesque option.",
            imageSrc: PHOTOS.placeCarmel,
            badge: "~5 min to ceremony",
          },
          {
            name: "Downtown Monterey",
            tagline: "Best hotel selection",
            note: "Hub of larger hotels, best for groups. Easy access to Cannery Row, the Aquarium, and a quick drive to both wedding venues.",
            imageSrc: PHOTOS.placeCanneryRow,
            badge: "~15 min to venues",
          },
          {
            name: "Pacific Grove",
            tagline: "Quiet & scenic",
            note: "Quaint coastal town between Monterey and 17-Mile Drive. Quieter than downtown, with lovely Victorian inns and ocean views.",
            imageSrc: PHOTOS.coast,
            badge: "~20 min to venues",
          },
        ],

        // ── Hotels ──
        hotelsLabel: "Featured Hotels",
        hotelsTitle: "Our Recommendations",
        hotelsIntro:
          "Tried-and-true properties we know and recommend for our guests.",
        checkAvailability: "Check Availability →",

        // ── Airbnb ──
        airbnbLabel: "Short-Term Rentals",
        airbnbTitle: "Airbnb & VRBO",
        airbnbIntro:
          "Traveling with a group or family? A rental home can be more comfortable and better value.",
        airbnbBody:
          "Search Carmel-by-the-Sea, Pacific Grove, or the Monterey area. For groups of 4+, a house often offers more space and value than individual hotel rooms. Look for properties with included parking.",
        // TODO: Update Airbnb URL check-in/check-out dates once confirmed (Sept 3–6, 2026)
        airbnbCta: "Search Airbnb →",
        // TODO: Update VRBO search URL
        vrboCta: "Search VRBO →",

        // ── Map ──
        mapLabel: "Getting Oriented",
        mapTitle: "The Area",
        mapIntro:
          "The ceremony is at Carmel Mission Basilica. The reception is at Fairview Laguna Seca, Monterey. The map shows the route between both venues.",

        // ── Distances ──
        distLabel: "Travel Times",
        distTitle: "Distances at a Glance",
        distIntro:
          "Everything is close. Here's approximate drive guidance from each area.",

        // ── Tips ──
        tipsLabel: "For Out-of-Town Guests",
        tipsTitle: "Good to Know",
        tips: [
          {
            icon: "📅",
            title: "Book Early — September Fills Fast",
            body: "The Monterey Peninsula is one of California's most popular destinations in fall. Hotels in Carmel and Monterey fill quickly for wedding weekends. Reserve 4–6 months ahead.",
          },
          {
            icon: "🚗",
            title: "You'll Need a Car",
            body: "Public transit is very limited on the Peninsula. Rent a car or coordinate rideshares. Both wedding venues have parking available for guests.",
          },
          {
            icon: "🌤",
            title: "September Weather Is Ideal",
            body: "Warm, clear afternoons — one of the best months on the Peninsula. Bring a light layer for the evening reception.",
          },
          {
            icon: "🏡",
            title: "Consider a Group House",
            body: "Airbnb and VRBO have excellent houses for groups of 6–12 in Carmel and Pacific Grove — often more space and better value than hotel rooms.",
          },
        ],
      };

  return (
    <div className="space-y-6">

      {/* ─────────────────────────────────────────────────────────────────────
          RECOMMENDED AREAS
          ───────────────────────────────────────────────────────────────────── */}
      <section
        className="rounded-3xl p-7 sm:p-10"
        style={{ border: "1px solid #e8ddd4", background: "rgba(255,255,255,0.88)" }}
      >
        <div className="mb-7">
          <SectionLabel>{t.sectionLabel}</SectionLabel>
          <SectionTitle>{t.title}</SectionTitle>
          <p className="mt-2 text-sm leading-6" style={{ color: "#8a7060", maxWidth: "52ch" }}>
            {t.intro}
          </p>
          <p className="mt-1 text-sm leading-6" style={{ color: "#8a7060", maxWidth: "52ch" }}>
            {t.areasIntro}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {t.areas.map((area) => (
            <AreaCard key={area.name} {...area} />
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          FEATURED HOTELS
          ───────────────────────────────────────────────────────────────────── */}
      <section
        className="rounded-3xl p-7 sm:p-10"
        style={{ border: "1px solid #e8ddd4", background: "rgba(255,255,255,0.88)" }}
      >
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>{t.hotelsLabel}</SectionLabel>
            <SectionTitle>{t.hotelsTitle}</SectionTitle>
            <p className="mt-2 text-sm leading-6" style={{ color: "#8a7060", maxWidth: "52ch" }}>
              {t.hotelsIntro}
            </p>
          </div>
          <QuickLink
            href="https://www.google.com/travel/hotels/Monterey,CA?q=hotels+monterey+carmel+california+september+2026"
            label={t.searchHotels}
            icon="🏨"
            isPrimary
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HOTELS.map((hotel) => (
            <HotelCard
              key={hotel.name}
              hotel={hotel}
              checkAvailability={t.checkAvailability}
            />
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          AIRBNB / SHORT-TERM RENTALS
          ───────────────────────────────────────────────────────────────────── */}
      <section
        className="rounded-3xl p-7 sm:p-10"
        style={{ border: "1px solid #e8ddd4", background: "rgba(255,255,255,0.88)" }}
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          {/* Copy side */}
          <div>
            <SectionLabel>{t.airbnbLabel}</SectionLabel>
            <SectionTitle>{t.airbnbTitle}</SectionTitle>
            <p className="mt-2 text-sm leading-6" style={{ color: "#8a7060" }}>
              {t.airbnbIntro}
            </p>
            <p className="mt-3 text-xs leading-6" style={{ color: "#7a6050" }}>
              {t.airbnbBody}
            </p>

            {/* Search CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              {/* TODO: Update Airbnb URL with confirmed check-in/check-out dates */}
              <a
                href="https://www.airbnb.com/s/Carmel-by-the-Sea--CA--United-States/homes?checkin=2026-09-03&checkout=2026-09-06"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.14em] transition hover:opacity-80"
                style={{ background: "#2d1f14", color: "#fbf4e8" }}
              >
                <span aria-hidden>🏡</span>
                {t.airbnbCta}
              </a>
              {/* TODO: Update VRBO URL with confirmed destination and dates */}
              <a
                href="https://www.vrbo.com/search?destination=Monterey%2C+CA&startDate=2026-09-03&endDate=2026-09-06"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.14em] transition hover:opacity-80"
                style={{
                  background: "rgba(251,244,232,0.7)",
                  color: "#2d1f14",
                  border: "1px solid #e8ddd4",
                }}
              >
                <span aria-hidden>🔍</span>
                {t.vrboCta}
              </a>
            </div>
          </div>

          {/* Photo grid side */}
          <div className="grid grid-cols-2 gap-3">
            {[PHOTOS.moment1, PHOTOS.moment3, PHOTOS.moment4, PHOTOS.moment6].map((src, i) => (
              <div
                key={src}
                className="relative overflow-hidden rounded-2xl"
                style={{ aspectRatio: "4/3", border: "1px solid #e8ddd4" }}
              >
                {/* TODO: Replace with real photos of the Carmel/Monterey area or rental homes */}
                <Image
                  src={src}
                  alt={`Rental area photo ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          MAP SECTION
          ───────────────────────────────────────────────────────────────────── */}
      <section
        className="rounded-3xl p-7 sm:p-10"
        style={{ border: "1px solid #e8ddd4", background: "rgba(255,255,255,0.88)" }}
      >
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>{t.mapLabel}</SectionLabel>
            <SectionTitle>{t.mapTitle}</SectionTitle>
            <p className="mt-2 text-sm leading-6" style={{ color: "#8a7060", maxWidth: "56ch" }}>
              {t.mapIntro}
            </p>
          </div>
          <QuickLink
            href="https://www.google.com/maps/dir/Carmel+Mission+Basilica,+Carmel,+CA/10520+York+Rd,+Monterey,+CA+93940"
            label={t.viewMap}
            icon="🗺️"
          />
        </div>

        {/* Directions embed: Carmel Mission Basilica → 10520 York Rd, Monterey.
            No API key required — uses the free legacy maps.google.com embed format. */}
        <div
          className="overflow-hidden rounded-2xl"
          style={{ border: "1px solid #e8ddd4" }}
        >
          <iframe
            src="https://maps.google.com/maps?saddr=Carmel+Mission+Basilica,+Carmel,+CA&daddr=10520+York+Rd,+Monterey,+CA+93940&dirflg=d&output=embed"
            width="100%"
            height="420"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ceremony to reception route — Carmel Mission Basilica to Fairview Laguna Seca"
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          DISTANCE GUIDE
          ───────────────────────────────────────────────────────────────────── */}
      <section
        className="rounded-3xl p-7 sm:p-10"
        style={{ border: "1px solid #e8ddd4", background: "rgba(255,255,255,0.88)" }}
      >
        <div className="mb-6">
          <SectionLabel>{t.distLabel}</SectionLabel>
          <SectionTitle>{t.distTitle}</SectionTitle>
          <p className="mt-2 text-sm leading-6" style={{ color: "#8a7060" }}>
            {t.distIntro}
          </p>
        </div>

        {/* Table-style distance rows, grouped by starting area */}
        {/* TODO: Confirm actual drive times once final venue addresses are set */}
        <div className="grid gap-6 sm:grid-cols-3">
          {["Carmel-by-the-Sea", "Downtown Monterey", "Pacific Grove"].map((from) => {
            const rows = DISTANCES.filter((d) => d.from === from);
            return (
              <div key={from}>
                <p
                  className="mb-2 text-xs font-medium uppercase tracking-[0.14em]"
                  style={{ color: "#2d1f14" }}
                >
                  {from === "Downtown Monterey" && es ? "Centro de Monterey" : from}
                </p>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ border: "1px solid #e8ddd4" }}
                >
                  {rows.map((d, i) => (
                    <div
                      key={`${d.from}-${d.to}`}
                      className="flex items-center justify-between px-4 py-3 gap-3"
                      style={{
                        borderBottom: i < rows.length - 1 ? "1px solid #e8ddd4" : "none",
                        background: i % 2 === 0 ? "rgba(251,244,232,0.3)" : "rgba(255,255,255,0.6)",
                      }}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-base shrink-0" aria-hidden>
                          {d.icon}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs truncate" style={{ color: "#2d1f14" }}>
                            {es ? d.toLabelEs : d.toLabel}
                          </p>
                          <p
                            className="text-[10px] truncate"
                            style={{ color: "#c9a0a0" }}
                          >
                            {d.to}
                          </p>
                        </div>
                      </div>
                      <span
                        className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium tabular-nums"
                        style={{ background: "rgba(201,160,160,0.14)", color: "#a07070" }}
                      >
                        {d.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          TRAVEL TIPS
          ───────────────────────────────────────────────────────────────────── */}
      <section
        className="rounded-3xl p-7 sm:p-10"
        style={{ border: "1px solid #e8ddd4", background: "rgba(255,255,255,0.88)" }}
      >
        <div className="mb-7">
          <SectionLabel>{t.tipsLabel}</SectionLabel>
          <SectionTitle>{t.tipsTitle}</SectionTitle>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.tips.map((tip) => (
            <TipCard key={tip.title} icon={tip.icon} title={tip.title} body={tip.body} />
          ))}
        </div>
      </section>

    </div>
  );
}
