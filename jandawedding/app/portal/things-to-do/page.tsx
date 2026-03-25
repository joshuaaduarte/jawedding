import Image from "next/image";
import { PHOTOS } from "@/lib/photos";
import { getLocale } from "@/lib/locale";
import { VisitPlanner } from "@/components/visit-planner";
import { BROWSE_GROUPS, getPlacesByRegion, AIRPORT_PROFILES } from "@/lib/travel-data";
import type { Place } from "@/lib/travel-data";

// ── Image-forward place card (server-rendered, browse section) ────────────────

function BrowsePlaceCard({ place, locale }: { place: Place; locale: string }) {
  const imgSrc = PHOTOS[place.imageKey as keyof typeof PHOTOS] ?? PHOTOS.coast;
  const tagline = locale === "es" && place.taglineEs ? place.taglineEs : place.tagline;
  return (
    <article
      className="overflow-hidden rounded-2xl"
      style={{ border: "1px solid #e8ddd4" }}
    >
      <div className="relative w-full" style={{ aspectRatio: "3/2" }}>
        <Image src={imgSrc} alt={place.name} fill className="object-cover" />
        <span
          className="absolute right-2.5 top-2.5 rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] backdrop-blur-sm"
          style={{ background: "rgba(20,10,5,0.5)", color: "rgba(251,244,232,0.9)" }}
        >
          {place.timeNeeded}
        </span>
      </div>
      <div className="px-4 py-3.5" style={{ background: "rgba(251,244,232,0.5)" }}>
        <h4 className="font-serif text-base leading-tight" style={{ color: "#2d1f14" }}>
          {place.name}
        </h4>
        <p className="mt-0.5 text-xs" style={{ color: "#c9a0a0" }}>
          {tagline}
        </p>
      </div>
    </article>
  );
}

// ── Travel tip card ────────────────────────────────────────────────────────────

function TipCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{ border: "1px solid #e8ddd4", background: "rgba(251,244,232,0.4)" }}
    >
      <p className="text-xl mb-2" aria-hidden>{icon}</p>
      <h4 className="text-sm font-medium" style={{ color: "#2d1f14" }}>{title}</h4>
      <p className="mt-1 text-xs leading-5" style={{ color: "#7a6050" }}>{body}</p>
    </div>
  );
}

// ── FAQ item ───────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b py-4" style={{ borderColor: "#e8ddd4" }}>
      <p className="text-sm font-medium" style={{ color: "#2d1f14" }}>{q}</p>
      <p className="mt-1.5 text-xs leading-5" style={{ color: "#6b5444" }}>{a}</p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ThingsToDoPage() {
  const locale = await getLocale();
  const es = locale === "es";

  const t = es
    ? {
        section: "Plan Tu Visita",
        title: "Explora el Área",
        intro:
          "Ya sea que hagas un fin de semana o llegues el día de la boda, Monterey recompensa cada hora extra.",
        plannerLabel: "Planificador de Visita",
        plannerTitle: "Encuentra Tu Plan Ideal",
        plannerIntro:
          "Dinos de dónde vuelas y cuándo llegas — te mostraremos exactamente qué hacer.",
        browseLabel: "Explorar Todo",
        browseTitle: "Lugares Para Descubrir",
        browseIntro:
          "¿Prefieres explorar por tu cuenta? Aquí está todo organizado por región.",
        tipsLabel: "Consejos de Viaje",
        tipsTitle: "Lo Que Necesitas Saber",
        driveTimes: "Tiempos de manejo a Monterey",
        faqLabel: "Notas",
        faqTitle: "Bueno Saber",
        tips: [
          { icon: "🚗", title: "Renta un auto", body: "El transporte público es limitado. Un auto es necesario para Point Lobos, Big Sur y 17-Mile Drive. Reserva con anticipación para un fin de semana festivo." },
          { icon: "📅", title: "Reserva el Acuario con anticipación", body: "Los boletos se agotan. Compra en línea antes de llegar — puedes cancelar, pero no puedes añadir un día agotado." },
          { icon: "🌫", title: "Espera niebla matutina", body: "La niebla costera suele despejarse al mediodía. Planifica actividades al aire libre para la tarde, o dirígete al interior hacia el soleado Carmel Valley." },
          { icon: "⛽", title: "Llena el tanque antes de Big Sur", body: "Las gasolineras desaparecen al sur de Carmel. Llena primero y revisa CalTrans para cualquier condición de la carretera." },
          { icon: "🏨", title: "Reserva hospedaje con anticipación", body: "Carmel y Monterey se llenan rápido en fines de semana de bodas. Consulta la pestaña de Alojamiento para nuestras recomendaciones." },
          { icon: "🌊", title: "Septiembre es ideal", body: "Uno de los mejores meses en la península — las tardes son cálidas y despejadas. Trae una capa ligera para las noches." },
        ],
        faqs: [
          { q: "¿Cuál aeropuerto es mejor?", a: "SJC es el más directo (~1.5 horas). MRY te deja en Monterey pero tiene menos vuelos. SFO es genial si quieres tiempo en el Bay Area. OAK funciona pero añade tiempo de manejo." },
          { q: "¿Necesito rentar un auto?", a: "Sí. La mayoría de los atractivos requieren uno — Point Lobos, Big Sur, 17-Mile Drive y Carmel son todos destinos en auto. Reserva con anticipación." },
          { q: "¿Puedo hacer el Acuario y Carmel en un día?", a: "Fácilmente. Acuario en la mañana (2–3 horas), almuerzo en Cannery Row, luego maneja 20 minutos al sur a Carmel para la tarde." },
          { q: "¿Vale la pena Big Sur?", a: "Sí, si tienes un día completo. A 30 minutos al sur de Carmel. Revisa CalTrans para las condiciones de la carretera — la Highway 1 ocasionalmente cierra." },
          { q: "¿Recomendaciones de restaurantes?", a: "Monterey: Fish Hopper (Cannery Row). Carmel: Cultura Comida, Cantinetta Luca. Carmel Valley: Folktale Winery para cenas al aire libre." },
        ],
      }
    : {
        section: "Plan Your Visit",
        title: "Explore the Area",
        intro:
          "Whether you're making a weekend of it or arriving the morning of the wedding, Monterey rewards every extra hour.",
        plannerLabel: "Visit Planner",
        plannerTitle: "Find Your Perfect Plan",
        plannerIntro:
          "Tell us where you're flying in and how much time you have — we'll show you exactly what to do.",
        browseLabel: "Browse Everything",
        browseTitle: "Places to Discover",
        browseIntro:
          "Prefer to explore on your own terms? Here's everything organized by region.",
        tipsLabel: "Travel Tips",
        tipsTitle: "What You Need to Know",
        driveTimes: "Drive times to Monterey",
        faqLabel: "Notes",
        faqTitle: "Good to Know",
        tips: [
          { icon: "🚗", title: "Rent a car", body: "Public transit is limited. A car is required for Point Lobos, Big Sur, and 17-Mile Drive. Reserve early for a holiday weekend." },
          { icon: "📅", title: "Book the Aquarium early", body: "Tickets sell out. Book online before you arrive — you can cancel, but you can't add a sold-out day." },
          { icon: "🌫", title: "Expect morning fog", body: "Coastal fog usually burns off by midday. Plan outdoor activities for the afternoon, or head inland to sunny Carmel Valley." },
          { icon: "⛽", title: "Fill up before Big Sur", body: "Gas stations disappear south of Carmel. Fill up first and check CalTrans for any road conditions." },
          { icon: "🏨", title: "Book lodging early", body: "Carmel and Monterey fill up fast for wedding weekends. See the Stay tab for our recommendations." },
          { icon: "🌊", title: "September is ideal", body: "One of the best months on the peninsula — afternoons are warm and clear. Bring a light layer for evenings." },
        ],
        faqs: [
          { q: "Which airport is best?", a: "SJC is most direct (~1.5 hrs). MRY puts you right in Monterey but has fewer flights. SFO is great if you want Bay Area time first. OAK works but adds drive time." },
          { q: "Do I need to rent a car?", a: "Yes. Most highlights require one — Point Lobos, Big Sur, 17-Mile Drive, and Carmel are all driving destinations. Reserve early." },
          { q: "Can I do the Aquarium and Carmel in one day?", a: "Easily. Aquarium in the morning (2–3 hrs), lunch on Cannery Row, then drive 20 minutes south to Carmel for the afternoon." },
          { q: "Is Big Sur worth it?", a: "Yes, if you have a full day. 30 minutes south of Carmel. Check CalTrans for road conditions — Highway 1 occasionally closes." },
          { q: "Any restaurant picks?", a: "Monterey: Fish Hopper (Cannery Row). Carmel: Cultura Comida, Cantinetta Luca. Carmel Valley: Folktale Winery for outdoor dining." },
        ],
      };

  return (
    <div className="space-y-6">

      {/* ── Interactive planner ── */}
      <section
        className="rounded-3xl p-7 sm:p-10"
        style={{ border: "1px solid #e8ddd4", background: "rgba(255,255,255,0.88)" }}
      >
        <div className="mb-7">
          <p className="text-xs uppercase tracking-[0.22em]" style={{ color: "#c9a0a0" }}>
            {t.plannerLabel}
          </p>
          <h2
            className="mt-2 font-serif italic"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#2d1f14" }}
          >
            {t.plannerTitle}
          </h2>
          <p className="mt-2 text-sm leading-6" style={{ color: "#8a7060", maxWidth: "52ch" }}>
            {t.plannerIntro}
          </p>
        </div>
        <VisitPlanner locale={locale} />
      </section>

      {/* ── Browse all ── */}
      <section
        className="rounded-3xl p-7 sm:p-10"
        style={{ border: "1px solid #e8ddd4", background: "rgba(255,255,255,0.88)" }}
      >
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.22em]" style={{ color: "#c9a0a0" }}>
            {t.browseLabel}
          </p>
          <h2
            className="mt-2 font-serif italic"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#2d1f14" }}
          >
            {t.browseTitle}
          </h2>
          <p className="mt-2 text-sm leading-6" style={{ color: "#8a7060" }}>
            {t.browseIntro}
          </p>
        </div>

        <div className="space-y-10">
          {BROWSE_GROUPS.map((group) => {
            const places = getPlacesByRegion(group.region);
            const label = es && group.labelEs ? group.labelEs : group.label;
            const sublabel = es && group.sublabelEs ? group.sublabelEs : group.sublabel;
            return (
              <div key={group.region}>
                <div className="mb-4 flex items-baseline gap-3">
                  <h3
                    className="font-serif text-xl"
                    style={{ color: "#2d1f14" }}
                  >
                    {label}
                  </h3>
                  <span
                    className="text-xs uppercase tracking-[0.14em]"
                    style={{ color: "#c9a0a0" }}
                  >
                    {sublabel}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {places.map((place) => (
                    <BrowsePlaceCard key={place.id} place={place} locale={locale} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* ── Travel tips ── */}
      <section
        className="rounded-3xl p-7 sm:p-10"
        style={{ border: "1px solid #e8ddd4", background: "rgba(255,255,255,0.88)" }}
      >
        <div className="mb-7">
          <p className="text-xs uppercase tracking-[0.22em]" style={{ color: "#c9a0a0" }}>
            {t.tipsLabel}
          </p>
          <h2
            className="mt-2 font-serif italic"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#2d1f14" }}
          >
            {t.tipsTitle}
          </h2>
        </div>

        {/* Airport drive times */}
        <div className="mb-7">
          <p className="text-xs uppercase tracking-[0.18em] mb-4" style={{ color: "#8a7060" }}>
            {t.driveTimes}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(["SFO", "SJC", "OAK", "MRY"] as const).map((code) => {
              const p = AIRPORT_PROFILES[code];
              return (
                <div
                  key={code}
                  className="rounded-2xl p-4"
                  style={{ border: "1px solid #e8ddd4", background: "rgba(251,244,232,0.4)" }}
                >
                  <p
                    className="font-serif text-2xl"
                    style={{ color: "#2d1f14" }}
                  >
                    {code}
                  </p>
                  <p
                    className="mt-1 text-sm font-medium"
                    style={{ color: "#c9a0a0" }}
                  >
                    {p.driveTime}
                  </p>
                  <p
                    className="mt-1 text-xs leading-5"
                    style={{ color: "#8a7060" }}
                  >
                    {p.driveTimeNote}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {t.tips.map((tip) => (
            <TipCard key={tip.title} icon={tip.icon} title={tip.title} body={tip.body} />
          ))}
        </div>
      </section>

      {/* ── FAQ / Notes ── */}
      <section
        className="rounded-3xl p-7 sm:p-10"
        style={{ border: "1px solid #e8ddd4", background: "rgba(255,255,255,0.88)" }}
      >
        <div className="mb-2">
          <p className="text-xs uppercase tracking-[0.22em]" style={{ color: "#c9a0a0" }}>
            {t.faqLabel}
          </p>
          <h2
            className="mt-2 font-serif italic"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#2d1f14" }}
          >
            {t.faqTitle}
          </h2>
        </div>

        <div className="divide-y" style={{ borderColor: "#e8ddd4" }}>
          {t.faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

    </div>
  );
}
