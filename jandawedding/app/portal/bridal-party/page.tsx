import Image from "next/image";
import { PHOTOS } from "@/lib/photos";
import { getLocale } from "@/lib/locale";

// ─── Fill in each person's name and bio below ─────────────────────────────────
// photo: swap PHOTOS.portrait for a real URL when ready (see lib/photos.ts)

const MAIDS_OF_HONOR = [
  {
    name: "Name Placeholder",
    bio: "Write a short bio or note about this person here.",
    bioEs: "Escribe una nota corta sobre esta persona aquí.",
  },
  {
    name: "Name Placeholder",
    bio: "Write a short bio or note about this person here.",
    bioEs: "Escribe una nota corta sobre esta persona aquí.",
  },
];

const BRIDESMAIDS = [
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
];

const BEST_MEN = [
  {
    name: "Name Placeholder",
    bio: "Write a short bio or note about this person here.",
    bioEs: "Escribe una nota corta sobre esta persona aquí.",
  },
  {
    name: "Name Placeholder",
    bio: "Write a short bio or note about this person here.",
    bioEs: "Escribe una nota corta sobre esta persona aquí.",
  },
];

const GROOMSMEN = [
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
];

const PARENTS = [
  { name: "Name Placeholder", role: "Joshua's Parent", roleEs: "Padre de Joshua", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Name Placeholder", role: "Joshua's Parent", roleEs: "Padre de Joshua", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Name Placeholder", role: "Ana's Parent", roleEs: "Padre de Ana", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Name Placeholder", role: "Ana's Parent", roleEs: "Padre de Ana", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
];

const GODPARENTS = [
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Name Placeholder", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
];

const CLERGY = [
  { name: "Name Placeholder", role: "Deacon", roleEs: "Diácono", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Name Placeholder", role: "Deacon's Wife", roleEs: "Esposa del Diácono", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Name Placeholder", role: "Priest", roleEs: "Sacerdote", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
];
// ──────────────────────────────────────────────────────────────────────────────

type Person = { name: string; bio: string; bioEs?: string; role?: string; roleEs?: string };

function PersonCard({ person, role, locale }: { person: Person; role?: string; locale: string }) {
  const bio = locale === "es" ? (person.bioEs ?? person.bio) : person.bio;
  const displayRole = locale === "es" ? (person.roleEs ?? person.role ?? role) : (person.role ?? role);
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:flex-row sm:items-start">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-stone-200">
        <Image src={PHOTOS.portrait} alt={person.name} fill className="object-cover" />
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.16em] text-stone-500">
          {displayRole}
        </p>
        <h3 className="mt-1 font-serif text-xl text-stone-900">{person.name}</h3>
        <p className="mt-2 text-sm leading-6 text-stone-600">{bio}</p>
      </div>
    </article>
  );
}

function Section({
  label,
  title,
  people,
  role,
  locale,
}: {
  label: string;
  title: string;
  people: Person[];
  role?: string;
  locale: string;
}) {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{label}</p>
        <h2 className="mt-1 font-serif text-3xl text-stone-900">{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {people.map((person, i) => (
          <PersonCard key={i} person={person} role={role} locale={locale} />
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
          intro: "Las personas especiales que estarán con nosotros el día más importante de nuestras vidas.",
          moh: "Damas de Honor",
          mohRole: "Dama de Honor",
          bridesmaids: "Damas",
          bridesmaidRole: "Dama",
          bestMen: "Padrinos de Honor",
          bestManRole: "Padrino de Honor",
          groomsmen: "Chambelanes",
          groomsmanRole: "Chambelán",
          familyLabel: "Familia",
          parents: "Padres",
          godparents: "Padrinos",
          godparentRole: "Padrino / Madrina",
          ceremony: "Ceremonia",
          officiants: "Celebrantes",
          deaconRole: "Diácono",
          deaconsWife: "Esposa del Diácono",
          priestRole: "Sacerdote",
        }
      : {
          label: "Our Wedding",
          title: "The Wedding Party",
          intro: "The special people standing beside us on the most important day of our lives.",
          moh: "Maids of Honor",
          mohRole: "Maid of Honor",
          bridesmaids: "Bridesmaids",
          bridesmaidRole: "Bridesmaid",
          bestMen: "Best Men",
          bestManRole: "Best Man",
          groomsmen: "Groomsmen",
          groomsmanRole: "Groomsman",
          familyLabel: "Family",
          parents: "Parents",
          godparents: "Godparents",
          godparentRole: "Godparent",
          ceremony: "Ceremony",
          officiants: "Officiants",
          deaconRole: "Deacon",
          deaconsWife: "Deacon's Wife",
          priestRole: "Priest",
        };

  return (
    <div className="space-y-10">
      {/* Page header */}
      <section className="rounded-3xl border border-stone-200 bg-white/90 p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{t.label}</p>
        <h1 className="mt-2 font-serif text-5xl text-stone-900">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600">{t.intro}</p>
      </section>

      <Section label={t.moh} title={t.moh} people={MAIDS_OF_HONOR} role={t.mohRole} locale={locale} />
      <Section label={t.bridesmaids} title={t.bridesmaids} people={BRIDESMAIDS} role={t.bridesmaidRole} locale={locale} />
      <Section label={t.bestMen} title={t.bestMen} people={BEST_MEN} role={t.bestManRole} locale={locale} />
      <Section label={t.groomsmen} title={t.groomsmen} people={GROOMSMEN} role={t.groomsmanRole} locale={locale} />

      <section className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{t.familyLabel}</p>
          <h2 className="mt-1 font-serif text-3xl text-stone-900">{t.parents}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {PARENTS.map((person, i) => (
            <PersonCard key={i} person={person} locale={locale} />
          ))}
        </div>
      </section>

      <Section label={t.familyLabel} title={t.godparents} people={GODPARENTS} role={t.godparentRole} locale={locale} />
      <Section label={t.ceremony} title={t.officiants} people={CLERGY} locale={locale} />
    </div>
  );
}
