import { TravelBoard } from "@/components/travel-board";
import { getVisibleTravelPosts, getMyTravelPosts } from "@/lib/travel-store";
import { getAuthenticatedGuest, } from "@/lib/auth";
import { getGuestsByInviteCode } from "@/lib/guest-data";
import Image from "next/image";
import { PHOTOS } from "@/lib/photos";
import { getLocale } from "@/lib/locale";

export default async function TravelBoardPage() {
  const [posts, guest, locale] = await Promise.all([
    getVisibleTravelPosts(),
    getAuthenticatedGuest(),
    getLocale(),
  ]);

  const [myPosts, partyGuests] = await Promise.all([
    guest ? getMyTravelPosts(guest.id) : Promise.resolve([]),
    guest ? getGuestsByInviteCode(guest.inviteCode) : Promise.resolve([]),
  ]);

  // Build dropdown names from all guests sharing this invite code.
  // Only show a dropdown if there's more than one person on the invite.
  const partyMembers = partyGuests.length > 1
    ? partyGuests.map((g) => `${g.firstName} ${g.lastName}`)
    : [];

  const t =
    locale === "es"
      ? {
          label: "Tablero De Viaje",
          title: "¿Quién Viene?",
          intro:
            "La boda es en Monterey, CA. Comparte tus planes de viaje para conectar con otros invitados: tal vez coincidan en vuelo, compartan auto desde el aeropuerto o coordinen el hospedaje.",
        }
      : {
          label: "Travel Board",
          title: "Who's Coming?",
          intro:
            "The wedding is in Monterey, CA. Share your travel plans to connect with other guests — you might be on the same flight, share a car from the airport, or plan your stay together.",
        };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-stone-200 bg-white/90 p-8 shadow-sm">
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{t.label}</p>
            <h2 className="mt-2 font-serif text-4xl text-stone-900">{t.title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">{t.intro}</p>
          </div>
          <div className="relative h-44 overflow-hidden rounded-2xl border border-stone-200">
            <Image src={PHOTOS.moment12} alt="Monterey coast" fill className="object-cover" />
          </div>
        </div>
      </section>
      <TravelBoard initialPosts={posts} myInitialPosts={myPosts} partyMembers={partyMembers} locale={locale} />
    </div>
  );
}
