import Image from "next/image";
import { PHOTOS } from "@/lib/photos";
import { getLocale } from "@/lib/locale";

// ─── Fill in your story below ─────────────────────────────────────────────────
// Replace each "Placeholder" with your real text.
// photo: swap PHOTOS.* for real engagement photo URLs when ready (see lib/photos.ts)

const STORY_CHAPTERS = [
  {
    title: "How We Met",
    titleEs: "Cómo Nos Conocimos",
    date: "February 12th, 2021",
    dateEs: "12 de Febrero de 2021",
    body: "Ana and Joshua met at a Latin dance party on a lively night filled with music and laughter. Ana was dancing with one of her friends when one of Joshua’s friends approached her and asked if she wanted to dance. After a few songs, she mentioned that Ana should meet some of her friends and she mentioned they were engineers, which obviously caught Ana’s attention. Curious, Ana followed her across the dance floor, unknowingly walking toward what would become the most pivotal moment of their lives. From the moment Ana and Joshua met, the connection was instant. Conversation flowed effortlessly, and the night quickly filled with smiles, laughter, and plenty of dancing. It felt to both of them as though they had known each other their whole lives. From that night on, their bond only grew stronger. What started as a chance meeting on the dance floor soon became something truly special- a love built on friendship, joy, and an undeniable connection that was truly meant to be.",
    bodyEs: "Ana y Joshua se conocieron en una fiesta de baile latino, en una noche animada llena de música y risas. Ana bailaba con una amiga cuando una amiga de Joshua se le acercó y le preguntó si quería bailar. Después de algunas canciones, le mencionó a Ana que debía conocer a algunos de sus amigos, quienes eran ingenieros, lo que obviamente llamó la atención de Ana. Curiosa, Ana la siguió por la pista de baile, sin saber que se dirigía hacia el que se convertiría en el momento más importante de sus vidas. Desde el momento en que Ana y Joshua se conocieron, la conexión fue instantánea. La conversación fluyó con naturalidad y la noche pronto se llenó de sonrisas, risas y mucho baile. Ambos sintieron como si se conocieran de toda la vida. A partir de esa noche, su vínculo no hizo más que fortalecerse. Lo que comenzó como un encuentro casual en la pista de baile pronto se convirtió en algo verdaderamente especial: un amor construido sobre la amistad, la alegría y una conexión innegable, un amor predestinado.",
    photo: PHOTOS.cheekKissOcean,
    photoAlt: "How we met",
  },
  {
    title: "Our First Date",
    titleEs: "Nuestra Primera Cita",
    date: "February 23rd, 2021",
    dateEs: "23 de Febrero de 2021",
    body: "Ana’s first date with Joshua took her somewhere she never expected- a sushi restaurant. Despite Ana not being a fan of sushi, Joshua chose Yummy Yummy Mongolian Grill in College Station, Texas, hoping to gently bring her out of her comfort zone. While Ana still left unconvinced about sushi, the evening turned out to be unforgettable. Over dinner, they talked for hours about their families, their pasts, their dreams, and their ambitions. Conversation came effortlessly, and the more they shared, the more they realized how special their connection was. One of the sweetest surprises of the night came when they discovered that they both come from Guatemalan families, which is something rare to find in Texas. It felt like another wonderful sign of how much they already had in common. Their first date remains one of their favorite memories together- a night filled with laughter, meaningful conversation, and the exciting realization that they had found someone truly special. And while Ana didn’t fall in love with sushi that night, after many years, Joshua finally convinced her…and now she might love sushi even more than him.",
    bodyEs: "La primera cita de Ana con Joshua la llevó a un lugar inesperado: un restaurante de sushi. A pesar de que Ana no era fanática del sushi, Joshua eligió Yummy Yummy Mongolian Grill en College Station, Texas, con la esperanza de sacarla poco a poco de su zona de confort. Aunque Ana no quedó del todo convencida, la velada resultó inolvidable. Durante la cena, hablaron durante horas sobre sus familias, su pasado, sus sueños y sus ambiciones. La conversación fluyó con naturalidad, y cuanto más compartían, más se daban cuenta de lo especial que era su conexión. Una de las sorpresas más dulces de la noche fue descubrir que ambos provenían de familias guatemaltecas, algo poco común en Texas. Fue otra maravillosa señal de todo lo que ya tenían en común. Su primera cita sigue siendo uno de sus recuerdos favoritos: una noche llena de risas, conversaciones profundas y la emocionante certeza de haber encontrado a alguien realmente especial. Y aunque Ana no se enamoró del sushi esa noche, años después, Joshua finalmente la convenció… y ahora puede que le guste el sushi incluso más que a él.",
    photo: PHOTOS.walkingSandyPath,
    photoAlt: "Our first date",
  },
  {
    title: "Falling in Love",
    titleEs: "Enamorándonos",
    date: "February 2021 - Forever",
    dateEs: "Febrero de 2021 - Para siempre",
    body: "Ana and Joshua’s love was felt from the very beginning, growing rapidly without either of them even realizing it. What has made their bond so special is how they have endured long distance for a lot of their relationship. Starting in the summer of 2021, when Joshua went to Seattle for an internship while Ana stayed in Texas, their love only grew stronger. Later, Joshua moved to California for graduate school and now work, yet despite the hundreds of miles between them, their connection remained unbreakable- a true testament to their commitment to each other.Over the years, they have shared countless wonderful moments together, and even through difficult times, their love has only deepened. They have fallen in love not through one big moment, but through everyday acts of unconditional love and care. Each simple, selfless act has strengthened their bond and filled their relationship with joy. While there may not have been a single moment when they ‘knew’ they were in love, from the very first night they met, Ana and Joshua felt a connection unlike anything they had ever experienced. From that moment on, love has been a constant in their lives- steady, unwavering, and ever-growing.",
    bodyEs: "El amor de Ana y Joshua se sintió desde el principio, creciendo rápidamente sin que ninguno de los dos se diera cuenta. Lo que ha hecho que su vínculo sea tan especial es cómo han superado la distancia durante gran parte de su relación. A partir del verano de 2021, cuando Joshua fue a Seattle para realizar una pasantía mientras Ana se quedaba en Texas, su amor no hizo más que fortalecerse. Más tarde, Joshua se mudó a California para cursar estudios de posgrado y ahora trabaja, pero a pesar de los cientos de kilómetros que los separaban, su conexión permaneció inquebrantable, un verdadero testimonio de su compromiso mutuo. A lo largo de los años, han compartido innumerables momentos maravillosos juntos, e incluso en los momentos difíciles, su amor no ha hecho más que profundizarse. Se enamoraron no por un gran momento, sino a través de actos cotidianos de amor y cariño incondicionales. Cada acto sencillo y desinteresado ha fortalecido su vínculo y llenado su relación de alegría. Si bien puede que no haya habido un momento específico en el que ‘supieran’ que estaban enamorados, desde la primera noche que se conocieron, Ana y Joshua sintieron una conexión como ninguna otra que hubieran experimentado. Desde ese momento, el amor ha sido una constante en sus vidas: firme, inquebrantable y en constante crecimiento.",
    photo: PHOTOS.embraceRocks,
    photoAlt: "Falling in love",
  },
  {
    title: "The Proposal",
    titleEs: "La Propuesta",
    date: "May 30th, 2025",
    dateEs: "30 de Mayo de 2025",
    body: "Joshua planned Ana’s dream proposal during a week they spent in Austin, Texas, supporting a close friend during a triathlon. While friends and family knew something special was on the horizon that Friday, Ana had no idea what was about to happen. With the breathtaking backdrop of Mount Bonnell, Joshua shared heartfelt words with Ana before getting down on one knee to propose. To her surprise, all of their closest family and friends were hidden nearby, waiting to witness the moment. Seeing the people who mean the most to them celebrate this special occasion filled Ana with an abundance of joy and gratitude, and she was deeply moved by Joshua’s thoughtfulness and dedication in making the day truly unforgettable. After the proposal, they enjoyed a wonderful lunch with everyone, hearing all the details of Joshua’s meticulous planning-  the stories he gathered, the helpers who made the day possible, and the many thoughtful touches he added, including creating the ring box himself. Every detail reflected not only Joshua’s love for Ana but also the love of all those who have been part of their journey together. Ana and Joshua’s proposal was a perfect reflection of their relationship: full of love, joy, thoughtfulness, and the beautiful support of everyone who has played a special role in their story.",
    bodyEs: "Joshua planeó la propuesta de matrimonio soñada de Ana durante una semana que pasaron en Austin, Texas, apoyando a un amigo cercano en un triatlón. Si bien amigos y familiares sabían que algo especial se avecinaba ese viernes, Ana no tenía idea de lo que estaba a punto de suceder. Con el impresionante paisaje del Monte Bonnell de fondo, Joshua le dedicó unas palabras conmovedoras a Ana antes de arrodillarse para pedirle matrimonio. Para su sorpresa, todos sus familiares y amigos más cercanos estaban cerca, esperando para presenciar el momento. Ver a las personas que más significan para ellos celebrar esta ocasión tan especial llenó a Ana de una inmensa alegría y gratitud, y se sintió profundamente conmovida por la consideración y la dedicación de Joshua para hacer de ese día algo verdaderamente inolvidable. Después de la propuesta, disfrutaron de un almuerzo maravilloso con todos, escuchando los detalles de la planificación tan minuciosa de Joshua: las historias que recopiló, los amigos que hicieron posible el día y los muchos detalles que agregó, incluyendo la creación de la caja del anillo. Cada detalle reflejaba no solo el amor de Joshua por Ana, sino también el amor de todos los que han formado parte de su historia juntos. La propuesta de matrimonio de Ana y Joshua fue un reflejo perfecto de su relación: llena de amor, alegría, cariño y el hermoso apoyo de todas las personas que han desempeñado un papel especial en su historia.",
    photo: PHOTOS.smilingBouquetSplash,
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
          intro: "De ser dos personas a convertirse en uno. Aquí les contamos cómo llegamos hasta aquí.",
          closing: "No podemos esperar para celebrar con ustedes.",
          closingVenue: "Basílica Misión Carmel · Monterey, CA",
        }
      : {
          label: "Ana & Joshua",
          title: "Our Story",
          intro: "From two people to becoming one. Here's how we got here.",
          closing: "We can't wait to celebrate with you.",
          closingVenue: "Carmel Mission Basilica · Monterey, CA",
        };

  return (
    <div className="space-y-8">
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

      {/* Story chapters */}
      {STORY_CHAPTERS.map((chapter, i) => {
        const isEven = i % 2 === 0;
        const isEs = locale === "es";
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
                  {isEs ? chapter.dateEs : chapter.date}
                </p>
                <h2 className="mt-2 font-serif text-3xl text-stone-900">
                  {isEs ? chapter.titleEs : chapter.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-stone-600">
                  {isEs ? chapter.bodyEs : chapter.body}
                </p>
              </div>
            </div>
          </article>
        );
      })}

      {/* Closing card */}
      <section className="rounded-3xl border border-stone-800 bg-stone-800 p-8 text-center text-stone-50">
        <p className="font-serif text-3xl">September 4, 2026</p>
        <p className="mt-2 text-xs uppercase tracking-[0.28em] text-stone-300">
          {t.closingVenue}
        </p>
        <p className="mt-4 text-sm leading-7 text-stone-300">
          {t.closing}
        </p>
      </section>
    </div>
  );
}
