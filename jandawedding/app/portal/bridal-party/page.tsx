import { getLocale } from "@/lib/locale";

// ─── Fill in each person's name and bio below ─────────────────────────────────
// photo: swap PHOTOS.portrait for a real URL when ready (see lib/photos.ts)

const MAIDS_OF_HONOR = [
  {
    name: "Ana Sofia Bremer",
    bio: "Ana Sofia Bremer is Ana’s college roommate and best friend, and they have shared a deep and lasting bond for the past seven years. From their time together at Texas A&M to all the milestones and challenges since, their friendship has always been full of laughter, love, and unwavering support. They have shared countless memories and have treated each other like sisters through every moment. Ana and Joshua are so grateful to have Annie in their lives as a lifelong friend and as someone who has always supported and celebrated their relationship.",
    bioEs: "Escribe una nota corta sobre esta persona aquí.",
  },
  {
    name: "Meera Dasai",
    bio: "Meera Desai is Ana’s childhood best friend, and the two have shared a special and unbreakable bond since they met in the 5th grade. Over the past 15 years, they have grown up together through nearly every stage of life; from school days at Centerville to attending Texas A&M. Even when they went to different schools in high school, their friendship only grew stronger as they made every effort to stay close. Their friendship, full of laughter, love, and countless shared memories, has stood strong through every stage of life. Meera has always been a caring and steadfast presence in Ana’s life, and Ana and Joshua feel so grateful to have her by their side to celebrate this special day.",
    bioEs: "Escribe una nota corta sobre esta persona aquí.",
  },
];

const BRIDESMAIDS = [
  { name: "Maria", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Evelyn Williams", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Linsy", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Ana Calleja", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Andrea Lima", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Miranda", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
];

const BEST_MEN = [
  {
    name: "Roberto Gonzalez",
    bio: "Write a short bio or note about this person here.",
    bioEs: "Escribe una nota corta sobre esta persona aquí.",
  },
  {
    name: "Pavan Reddy",
    bio: "Write a short bio or note about this person here.",
    bioEs: "Escribe una nota corta sobre esta persona aquí.",
  },
];

const GROOMSMEN = [
  { name: "Jonathan Gaytan", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Eddie Gracia", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Jose Lima", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Dustin Acosta", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Luis Garduno", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Abraham Diaz", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
];

const PARENTS = [
  { name: "Francisco Duarte", role: "Joshua's Parent", roleEs: "Padre de Joshua", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Julissa Duarte", role: "Joshua's Parent", roleEs: "Padre de Joshua", bio: "Write a short bio or note about this person here.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Roberto Lima", role: "Ana's Parent", roleEs: "Padre de Ana", bio: "Roberto Lima is Ana’s beloved father, who passed away in 2023. Known for his kindness, humor, and incredibly generous heart, Roberto was the most selfless and hardworking person Ana has ever known. He loved his family above everything and made countless sacrifices to support and care for them. Roberto quickly grew to love Joshua when they met and always supported their relationship. Ana misses her father deeply and especially will on their big day, but she knows he will be with them in spirit. He was Ana’s best friend, and his love and example will remain with her for the rest of her life.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Juanita Lima", role: "Ana's Parent", roleEs: "Padre de Ana", bio: "​​Juanita Lima is Ana’s beloved mother and one of the most selfless and inspiring people she knows. A woman of deep faith, strength, and wisdom, Juanita has always guided her family with love and care while staying actively involved in her Catholic community. Ana is who she is today because of her mother’s example, support, and encouragement. From the moment Joshua entered their lives five years ago, Juanita welcomed him with open arms and has loved and supported their relationship as one of her own. Ana and Joshua are incredibly grateful for her constant love and guidance.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
];

const GODPARENTS = [
  { name: "Ovidio Lima", bio: "Ovidio Lima is Ana’s uncle, and has been a loving presence in her life since childhood. Known for his humor, and caring heart, Ovidio has always made family time special, especially during visits to Los Angeles. He warmly welcomed Joshua into the family and has continued to support Ana and Joshua with encouragement and guidance. Ana and Joshua are grateful for his love and for the important role he has played in their lives.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Oneida Lima", bio: "Oneida Lima is Ana’s aunt and her mom’s oldest sister, who has been a loving presence throughout Ana’s life. Known for her kindness, humor, and caring nature, Oneida has always made time spent together special, especially during visits to Los Angeles. She warmly welcomed Joshua into the family and is always looking out for Ana and Joshua, keeping them in her prayers and supporting their relationship. Ana and Joshua are grateful for her love and the role she has played in their family.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
];

const PRIEST = [
  { name: "Father Rafal Duda", role: "Priest", roleEs: "Sacerdote", bio: "Father Rafal Duda has been a spiritual guide to Ana and Joshua over the past two years. Through his guidance, wisdom, and encouragement, he has helped them grow both individually and as a couple in their faith. Ana and Joshua are deeply grateful for his support and are honored to have him play such a meaningful role in their wedding day.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
];

const DEACONS = [
  { name: "Alex Ebarle", role: "Deacon", roleEs: "Diácono", bio: "Alex Ebarle has been a wonderful spiritual guide and mentor to Ana and Joshua over the past two years. As a deacon at St. Edward’s Catholic Church in Newark, CA, Alex has helped prepare them for marriage and supported Joshua on his journey to converting to Catholicism. Known for his humor, wisdom, and selfless spirit, Alex has had a profound impact on their spiritual growth and has always been willing to lend a helping hand.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
  { name: "Linda Ebarle", role: "Deacon's Wife", roleEs: "Esposa del Diácono", bio: "Over the past year, Linda Ebarle has been a meaningful spiritual guide to Ana and Joshua as they prepared for marriage. Her kindness, humor, and ability to truly listen have made her a wonderful mentor and friend. Ana and Joshua are grateful for the encouragement and wisdom she has shared with them along the way.", bioEs: "Escribe una nota corta sobre esta persona aquí." },
];
// ──────────────────────────────────────────────────────────────────────────────

type Person = { name: string; bio: string; bioEs?: string; role?: string; roleEs?: string };

function PersonCard({ person, role, locale }: { person: Person; role?: string; locale: string }) {
  const bio = locale === "es" ? (person.bioEs ?? person.bio) : person.bio;
  const displayRole = locale === "es" ? (person.roleEs ?? person.role ?? role) : (person.role ?? role);
  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
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

      <section className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{t.ceremony}</p>
          <h2 className="mt-1 font-serif text-3xl text-stone-900">{t.officiants}</h2>
        </div>
        {/* Priest — centered when on a wide grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2 md:mx-auto md:w-1/2">
            <PersonCard person={PRIEST[0]} locale={locale} />
          </div>
        </div>
        {/* Deacon + Deacon's Wife */}
        <div className="grid gap-4 md:grid-cols-2">
          {DEACONS.map((person, i) => (
            <PersonCard key={i} person={person} locale={locale} />
          ))}
        </div>
      </section>

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
      <Section label={t.moh} title={t.moh} people={MAIDS_OF_HONOR} role={t.mohRole} locale={locale} />
      <Section label={t.bridesmaids} title={t.bridesmaids} people={BRIDESMAIDS} role={t.bridesmaidRole} locale={locale} />
      <Section label={t.bestMen} title={t.bestMen} people={BEST_MEN} role={t.bestManRole} locale={locale} />
      <Section label={t.groomsmen} title={t.groomsmen} people={GROOMSMEN} role={t.groomsmanRole} locale={locale} />
    </div>
  );
}
