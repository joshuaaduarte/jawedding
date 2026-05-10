import Image from "next/image";
import { PHOTOS } from "@/lib/photos";
import { getLocale } from "@/lib/locale";

// ─── Update payment handles before going live ────────────────────────────────
const VENMO_HANDLE = "@Joshua-Duarte-10";       // e.g. @JoshuaDuarte
const ZELLE_CONTACT = "704-960-5071";          // phone or email registered with Zelle
const PAYPAL_HANDLE = "joshuaduarte151";   // e.g. JoshuaDuarte (after paypal.me/)
// ─────────────────────────────────────────────────────────────────────────────

const DESTINATIONS = [
  {
    flag: "🇯🇵",
    country: "Japan",
    countryEs: "Japón",
    label: "Land of the Rising Sun",
    labelEs: "La Tierra del Sol Naciente",
    body: "From the neon glow of Tokyo to the quiet temples of Kyoto, Japan has been a dream destination for us both. We're looking forward to exploring ancient shrines, wandering lantern-lit streets, and discovering a culture unlike anything we've experienced together.",
    bodyEs: "Desde el brillo de neón de Tokio hasta los tranquilos templos de Kioto, Japón ha sido un destino soñado para ambos. Nos emociona explorar santuarios milenarios, recorrer calles iluminadas con faroles y descubrir una cultura completamente nueva para nosotros.",
    photo: "destJapan" as const,
    accent: "#c9a0a0",
  },
];

const PAYMENT_METHODS = [
  {
    name: "Venmo",
    description: "Send to",
    value: VENMO_HANDLE,
    href: `https://venmo.com/u/${VENMO_HANDLE.replace("@", "")}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M19.09 1.285c.38.571.55 1.16.55 1.904 0 2.38-2.028 5.476-3.675 7.651H10.57L9.055 2.54l-4.67.447 2.19 13.52H13.7c3.295-4.768 6.568-9.71 6.568-13.728 0-.963-.19-1.75-.534-2.494h-.644z"/>
      </svg>
    ),
  },
  {
    name: "Zelle",
    description: "Send to",
    value: ZELLE_CONTACT,
    href: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93V18c-3.31-.49-6-3.37-6-6.93 0-.34.03-.67.08-1H5v-2h2.26C8.15 5.69 9.96 4 12 4v2c-2.21 0-4 1.79-4 4H12v2H8c0 2.21 1.79 4 4 4v2.93z"/>
      </svg>
    ),
  },
  {
    name: "PayPal",
    description: "Send to",
    value: `paypal.me/${PAYPAL_HANDLE}`,
    href: `https://paypal.me/${PAYPAL_HANDLE}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.565 6.132-8.028 6.132H10.36a.556.556 0 0 0-.549.47L8.71 19.945a.556.556 0 0 0 .549.637h3.533c.483 0 .894-.351.969-.828l.04-.207.772-4.892.05-.268a.98.98 0 0 1 .969-.828h.61c3.953 0 7.049-1.605 7.95-6.25.38-1.948.184-3.574-.93-4.72z"/>
      </svg>
    ),
  },
];

export default async function RegistryPage() {
  const locale = await getLocale();
  const isEs = locale === "es";

  const t = isEs
    ? {
        label: "Ana & Joshua",
        title: "Luna de Miel",
        headline: "Tu presencia lo es todo.",
        intro:
          "Que estés con nosotros en este día ya es el regalo más grande que podríamos recibir. Sin embargo, si deseas contribuir a nuestra luna de miel, estaremos profundamente agradecidos.",
        destinationsLabel: "Nuestro Viaje",
        giveLabel: "Contribuir, si así lo deseas",
        giveSub:
          "No hay monto mínimo, ni expectativa alguna — solo nuestra gratitud.",
        copyHint: "Copiar",
        copied: "¡Copiado!",
        sendVia: "Enviar a través de",
      }
    : {
        label: "Ana & Joshua",
        title: "Honeymoon Fund",
        headline: "Your presence is the greatest gift.",
        intro:
          "Having you with us on our wedding day is more than we could ever ask for. That said, if you'd like to contribute to our honeymoon adventure, we are truly grateful.",
        destinationsLabel: "Our Adventure",
        giveLabel: "Contribute, if you'd like",
        giveSub:
          "No amount is expected — just our deepest gratitude.",
        copyHint: "Copy",
        copied: "Copied!",
        sendVia: "Send via",
      };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="px-1">
        <p
          className="text-xs uppercase tracking-[0.32em]"
          style={{ color: "#c9a0a0" }}
        >
          {t.label}
        </p>
        <h1
          className="mt-2 font-serif italic"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#2d1f14" }}
        >
          {t.title}
        </h1>
        <p className="mt-1 text-sm leading-6" style={{ color: "#8a7060" }}>
          {t.intro}
        </p>
      </div>

      {/* Hero sentiment */}
      <div
        className="rounded-3xl p-8 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(201,160,160,0.12) 0%, rgba(251,244,232,0.9) 100%)",
          border: "1px solid #e8ddd4",
        }}
      >
        <p
          className="font-serif italic"
          style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#2d1f14" }}
        >
          &ldquo;{t.headline}&rdquo;
        </p>
      </div>

      {/* Destination — Japan */}
      <section>
        <p
          className="px-1 mb-5 text-xs uppercase tracking-[0.32em]"
          style={{ color: "#c9a0a0" }}
        >
          {t.destinationsLabel}
        </p>

        {(() => {
          const dest = DESTINATIONS[0];
          return (
            <article
              className="rounded-3xl overflow-hidden md:flex"
              style={{
                border: "1px solid #e8ddd4",
                background: "rgba(251, 244, 232, 0.92)",
              }}
            >
              {/* Image — tall on mobile, side panel on desktop */}
              <div className="relative h-64 md:h-auto md:w-1/2 md:min-h-[320px]">
                <Image
                  src={PHOTOS[dest.photo]}
                  alt={isEs ? dest.countryEs : dest.country}
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(45,31,20,0.5) 0%, transparent 50%)",
                  }}
                />
                <div className="absolute bottom-5 left-5 flex items-center gap-2">
                  <span className="text-3xl" role="img" aria-label={dest.country}>
                    {dest.flag}
                  </span>
                  <p
                    className="font-serif italic text-white drop-shadow-lg"
                    style={{ fontSize: "1.4rem" }}
                  >
                    {isEs ? dest.countryEs : dest.country}
                  </p>
                </div>
              </div>

              {/* Text */}
              <div className="p-7 md:p-9 md:w-1/2 flex flex-col justify-center space-y-3">
                <p
                  className="text-xs uppercase tracking-[0.18em]"
                  style={{ color: dest.accent }}
                >
                  {isEs ? dest.labelEs : dest.label}
                </p>
                <p
                  className="text-sm leading-7"
                  style={{ color: "#6b5444" }}
                >
                  {isEs ? dest.bodyEs : dest.body}
                </p>
              </div>
            </article>
          );
        })()}
      </section>

      {/* Payment section */}
      <section>
        <div className="px-1 mb-5">
          <p
            className="text-xs uppercase tracking-[0.32em]"
            style={{ color: "#c9a0a0" }}
          >
            {t.giveLabel}
          </p>
          <p className="mt-1 text-sm" style={{ color: "#8a7060" }}>
            {t.giveSub}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {PAYMENT_METHODS.map((method) => {
            const inner = (
              <div className="flex flex-col h-full gap-4">
                <div className="flex items-center gap-3">
                  <span style={{ color: "#8a5c5c" }}>{method.icon}</span>
                  <span
                    className="font-serif italic"
                    style={{ fontSize: "1.1rem", color: "#2d1f14" }}
                  >
                    {method.name}
                  </span>
                </div>
                <div className="mt-auto">
                  <p className="text-xs uppercase tracking-[0.18em] mb-1" style={{ color: "#c9a0a0" }}>
                    {method.description}
                  </p>
                  <p className="text-sm font-mono" style={{ color: "#6b5444" }}>
                    {method.value}
                  </p>
                </div>
                {method.href && (
                  <div
                    className="inline-flex items-center gap-1.5 self-start rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
                    style={{
                      border: "1px solid #c9a0a0",
                      color: "#8a5c5c",
                    }}
                  >
                    {t.sendVia} {method.name} →
                  </div>
                )}
              </div>
            );

            return method.href ? (
              <a
                key={method.name}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl p-6 block"
                style={{
                  border: "1px solid #e8ddd4",
                  background: "rgba(251, 244, 232, 0.92)",
                }}
              >
                {inner}
              </a>
            ) : (
              <div
                key={method.name}
                className="rounded-2xl p-6"
                style={{
                  border: "1px solid #e8ddd4",
                  background: "rgba(251, 244, 232, 0.92)",
                }}
              >
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      {/* Closing note */}
      <section
        className="rounded-3xl p-8 text-center"
        style={{
          border: "1px solid #e8ddd4",
          background: "rgba(251, 244, 232, 0.7)",
        }}
      >
        <p className="font-serif text-2xl" style={{ color: "#2d1f14" }}>
          {isEs ? "Con amor, Ana & Joshua" : "With love, Ana & Joshua"}
        </p>
        <p className="mt-2 text-sm" style={{ color: "#8a7060" }}>
          {isEs
            ? "Gracias por ser parte de este capítulo tan especial."
            : "Thank you for being part of this chapter."}
        </p>
      </section>
    </div>
  );
}
