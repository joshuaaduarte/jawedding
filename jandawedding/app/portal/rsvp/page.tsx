import { redirect } from "next/navigation";
import { getAuthenticatedGuest } from "@/lib/auth";
import { getGuestsByInviteCode } from "@/lib/guest-data";
import { getRsvpsByGuestIds } from "@/lib/rsvp-store";
import { getMessagesByInviteCode } from "@/lib/message-store";
import { RsvpForm } from "@/components/rsvp-form";
import { MessageForm } from "@/components/message-form";
import { getLocale } from "@/lib/locale";

export default async function RsvpPage() {
  const guest = await getAuthenticatedGuest();
  if (!guest) redirect("/login");

  const [groupGuests, locale] = await Promise.all([
    getGuestsByInviteCode(guest.inviteCode),
    getLocale(),
  ]);
  const [existingRsvps, existingMessages] = await Promise.all([
    getRsvpsByGuestIds(groupGuests.map((g) => g.id)),
    getMessagesByInviteCode(guest.inviteCode),
  ]);

  const t =
    locale === "es"
      ? {
          label: "Ana & Joshua · Confirmación",
          heading: "Confirmación de Asistencia",
          sub: "Por favor confirma antes del 31 de julio de 2026. Puedes actualizar tu respuesta cuando quieras.",
        }
      : {
          label: "Ana & Joshua · RSVP",
          heading: "RSVP",
          sub: "Please submit your RSVP by July 31, 2026. You can return and update your response anytime.",
        };

  return (
    <section
      className="rounded-3xl p-8 sm:p-10"
      style={{ background: "#2d1f14" }}
    >
      <p
        className="text-xs uppercase tracking-[0.32em]"
        style={{ color: "#c9a0a0" }}
      >
        {t.label}
      </p>
      <h1
        className="mt-2 font-serif italic"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f5ece0" }}
      >
        {t.heading}
      </h1>
      <p
        className="mt-3 max-w-2xl text-sm leading-7"
        style={{ color: "#c4a898" }}
      >
        {t.sub}
      </p>

      <RsvpForm
        guests={groupGuests}
        existingRsvps={existingRsvps}
        locale={locale}
      />

      <div
        className="mt-8 h-px"
        style={{ background: "rgba(201,160,160,0.2)" }}
      />

      <MessageForm locale={locale} existingMessages={existingMessages} />
    </section>
  );
}
