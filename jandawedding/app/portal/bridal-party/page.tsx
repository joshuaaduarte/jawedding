import Image from "next/image";
import { PHOTOS } from "@/lib/photos";
import { getLocale } from "@/lib/locale";

// ─── Fill in each person's name and bio below ─────────────────────────────────
// photo: swap PHOTOS.portrait for a real URL when ready (see lib/photos.ts)

const MAIDS_OF_HONOR = [
  {
    name: "Name Placeholder",
    bio: "Write a short bio or note about this person here.",
  },
  {
    name: "Name Placeholder",
    bio: "Write a short bio or note about this person here.",
  },
];

const BRIDESMAIDS = [
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here." },
];

const BEST_MEN = [
  {
    name: "Name Placeholder",
    bio: "Write a short bio or note about this person here.",
  },
  {
    name: "Name Placeholder",
    bio: "Write a short bio or note about this person here.",
  },
];

const GROOMSMEN = [
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here." },
];

const PARENTS = [
  { name: "Name Placeholder", role: "Joshua's Parent", bio: "Write a short bio or note about this person here." },
  { name: "Name Placeholder", role: "Joshua's Parent", bio: "Write a short bio or note about this person here." },
  { name: "Name Placeholder", role: "Ana's Parent", bio: "Write a short bio or note about this person here." },
  { name: "Name Placeholder", role: "Ana's Parent", bio: "Write a short bio or note about this person here." },
];

const GODPARENTS = [
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here." },
];

const CLERGY = [
  { name: "Name Placeholder", role: "Deacon", bio: "Write a short bio or note about this person here." },
  { name: "Name Placeholder", role: "Deacon's Wife", bio: "Write a short bio or note about this person here." },
  { name: "Name Placeholder", role: "Priest", bio: "Write a short bio or note about this person here." },
];
// ──────────────────────────────────────────────────────────────────────────────

type Person = { name: string; bio: string; role?: string };

function PersonCard({ person, role }: { person: Person; role?: string }) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:flex-row sm:items-start">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-stone-200">
        <Image src={PHOTOS.portrait} alt={person.name} fill className="object-cover" />
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.16em] text-stone-500">
          {person.role ?? role}
        </p>
        <h3 className="mt-1 font-serif text-xl text-stone-900">{person.name}</h3>
        <p className="mt-2 text-sm leading-6 text-stone-600">{person.bio}</p>
      </div>
    </article>
  );
}

function Section({
  label,
  title,
  people,
  role,
}: {
  label: string;
  title: string;
  people: Person[];
  role?: string;
}) {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{label}</p>
        <h2 className="mt-1 font-serif text-3xl text-stone-900">{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {people.map((person, i) => (
          <PersonCard key={i} person={person} role={role} />
        ))}
      </div>
    </section>
  );
}

export default async function BridalPartyPage() {
  const locale = await getLocale();
  const t =
    locale === "es"
      ? {
          label: "Nuestra Boda",
          title: "La Familia De La Boda",
          intro:
            "Las personas especiales que estarán con nosotros el día más importante de nuestras vidas.",
        }
      : {
          label: "Our Wedding",
          title: "The Wedding Party",
          intro:
            "The special people standing beside us on the most important day of our lives.",
        };

  return (
    <div className="space-y-10">
      {/* Page header */}
      <section className="rounded-3xl border border-stone-200 bg-white/90 p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{t.label}</p>
        <h1 className="mt-2 font-serif text-5xl text-stone-900">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600">{t.intro}</p>
      </section>

      <Section label="Bridesmaids" title="Maids of Honor" people={MAIDS_OF_HONOR} role="Maid of Honor" />
      <Section label="Bridesmaids" title="Bridesmaids" people={BRIDESMAIDS} role="Bridesmaid" />
      <Section label="Groomsmen" title="Best Men" people={BEST_MEN} role="Best Man" />
      <Section label="Groomsmen" title="Groomsmen" people={GROOMSMEN} role="Groomsman" />

      <section className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Family</p>
          <h2 className="mt-1 font-serif text-3xl text-stone-900">Parents</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {PARENTS.map((person, i) => (
            <PersonCard key={i} person={person} />
          ))}
        </div>
      </section>

      <Section label="Family" title="Godparents" people={GODPARENTS} role="Godparent" />
      <Section label="Ceremony" title="Officiants" people={CLERGY} />
    </div>
  );
}
