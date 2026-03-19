import Image from "next/image";
import { PHOTOS } from "@/lib/photos";
import { getLocale } from "@/lib/locale";

// ─── Fill in your story below ─────────────────────────────────────────────────
// Replace each "Placeholder" with your real text.
// photo: swap PHOTOS.* for real engagement photo URLs when ready (see lib/photos.ts)

const STORY_CHAPTERS = [
  {
    title: "How We Met",
    date: "Month, Year",
    body: "Tell the story of how you two first crossed paths. Where were you? What was the moment like? Share as much or as little as you'd like — this is your story.",
    photo: PHOTOS.moment1,
    photoAlt: "How we met",
  },
  {
    title: "Our First Date",
    date: "Month, Year",
    body: "Describe your first date. Where did you go? What made it memorable? A funny moment, a nervous laugh, something that made you think this person was special.",
    photo: PHOTOS.moment2,
    photoAlt: "Our first date",
  },
  {
    title: "Falling in Love",
    date: "Month, Year",
    body: "Share a moment — or a collection of moments — when you knew this was something real. It doesn't have to be dramatic; sometimes it's the quiet ones that matter most.",
    photo: PHOTOS.moment3,
    photoAlt: "Falling in love",
  },
  {
    title: "The Proposal",
    date: "Month, Year",
    body: "Tell us about the proposal. Where were you? Was it a surprise? What was said? This is the chapter everyone is going to want to read twice.",
    photo: PHOTOS.moment4,
    photoAlt: "The proposal",
  },
];
// ──────────────────────────────────────────────────────────────────────────────

export default async function OurStoryPage() {
  const locale = await getLocale();
  const t =
    locale === "es"
      ? {
          label: "Ana & Joshua",
          title: "Nuestra Historia",
          intro:
            "De ser dos personas a convertirse en uno. Aquí les contamos cómo llegamos hasta aquí.",
        }
      : {
          label: "Ana & Joshua",
          title: "Our Story",
          intro:
            "From two people to becoming one. Here's how we got here.",
        };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="overflow-hidden rounded-3xl border border-stone-200 shadow-sm">
        <div className="relative h-64 md:h-80">
          <Image
            src={PHOTOS.hero}
            alt="Ana & Joshua"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-xs uppercase tracking-[0.28em] text-emerald-200">
              {t.label}
            </p>
            <h1 className="mt-2 font-serif text-5xl text-white">{t.title}</h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-stone-200">{t.intro}</p>
          </div>
        </div>
      </section>

      {/* Story chapters */}
      {STORY_CHAPTERS.map((chapter, i) => {
        const isEven = i % 2 === 0;
        return (
          <article
            key={chapter.title}
            className="overflow-hidden rounded-3xl border border-stone-200 bg-white/90 shadow-sm"
          >
            <div
              className={`grid md:grid-cols-2 ${isEven ? "" : "md:[&>*:first-child]:order-last"}`}
            >
              <div className="relative h-56 md:h-auto">
                <Image
                  src={chapter.photo}
                  alt={chapter.photoAlt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                  {chapter.date}
                </p>
                <h2 className="mt-2 font-serif text-3xl text-stone-900">
                  {chapter.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-stone-600">{chapter.body}</p>
              </div>
            </div>
          </article>
        );
      })}

      {/* Closing card */}
      <section className="rounded-3xl border border-stone-800 bg-stone-800 p-8 text-center text-stone-50">
        <p className="font-serif text-3xl">September 4, 2026</p>
        <p className="mt-2 text-xs uppercase tracking-[0.28em] text-stone-300">
          Carmel Mission Basilica · Monterey, CA
        </p>
        <p className="mt-4 text-sm leading-7 text-stone-300">
          We can&apos;t wait to celebrate with you.
        </p>
      </section>
    </div>
  );
}
