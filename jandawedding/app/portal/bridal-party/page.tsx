import { getLocale } from "@/lib/locale";

// ─── Fill in each person's name and bio below ─────────────────────────────────
// photo: swap PHOTOS.portrait for a real URL when ready (see lib/photos.ts)

const MAIDS_OF_HONOR = [
  {
    name: "Meera Dasai",
    bio: "Meera Desai is Ana’s childhood best friend, and the two have shared a special and unbreakable bond since they met in the 5th grade. Over the past 15 years, they have grown up together through nearly every stage of life; from school days at Centerville to attending Texas A&M. Even when they went to different schools in high school, their friendship only grew stronger as they made every effort to stay close. Their friendship, full of laughter, love, and countless shared memories, has stood strong through every stage of life. Meera has always been a caring and steadfast presence in Ana’s life, and Ana and Joshua feel so grateful to have her by their side to celebrate this special day.",
    bioEs: "Meera Desai es la mejor amiga de la infancia de Ana, y desde que se conocieron en quinto grado, han compartido un vínculo especial e inquebrantable. Durante los últimos 15 años, han crecido juntas en casi todas las etapas de la vida; desde sus días escolares en Centerville hasta su paso por la Universidad de Texas A&M. Incluso cuando asistieron a diferentes escuelas en la preparatoria, su amistad se fortaleció aún más, esforzándose siempre por mantenerse unidas. Su amistad, llena de risas, amor e innumerables recuerdos compartidos, se ha mantenido firme a lo largo de todas las etapas de la vida. Meera siempre ha sido una presencia cariñosa y constante en la vida de Ana, y Ana y Joshua se sienten muy agradecidos de tenerla a su lado para celebrar este día tan especial.",
  },
  {
    name: "Ana Sofia Bremer",
    bio: "Ana Sofia Bremer is Ana’s college roommate and best friend, and they have shared a deep and lasting bond for the past seven years. From their time together at Texas A&M to all the milestones and challenges since, their friendship has always been full of laughter, love, and unwavering support. They have shared countless memories and have treated each other like sisters through every moment. Ana and Joshua are so grateful to have Annie in their lives as a lifelong friend and as someone who has always supported and celebrated their relationship.",
    bioEs: "Ana Sofía Bremer es la compañera de cuarto y mejor amiga de Ana en la universidad, y han compartido un vínculo profundo y duradero durante los últimos siete años. Desde su época juntas en Texas A&M hasta todos los logros y desafíos que han superado desde entonces, su amistad siempre ha estado llena de risas, amor y apoyo incondicional. Han compartido innumerables recuerdos y se han tratado como hermanas en todo momento. Ana y Joshua están muy agradecidos de tener a Annie en sus vidas como amiga de toda la vida y como alguien que siempre ha apoyado y celebrado su relación.",
  },
];

const BRIDESMAIDS = [
  { name: "Andrea Lima", 
    bio: "Andrea Lima is Ana’s beloved younger sister, and they have shared a special bond throughout their entire lives. Funny, intelligent, kind, and beautiful inside and out, Andrea brings warmth and joy to everyone she meets. Watching Andrea grow up has been one of the greatest privileges in Ana’s life, and she is incredibly proud of the person her sister has become. Ana is deeply grateful for the love and support Andrea has given her over the years and loves her more than words can express. She will always be Ana’s baby sister, and now she is Joshua’s little sister as well.", 
    bioEs: "Andrea Lima es la querida hermana menor de Ana, y han compartido un vínculo especial a lo largo de sus vidas. Divertida, inteligente, amable y hermosa por dentro y por fuera, Andrea irradia calidez y alegría a todos los que conoce. Verla crecer ha sido uno de los mayores privilegios en la vida de Ana, y está increíblemente orgullosa de la persona en la que se ha convertido su hermana. Ana está profundamente agradecida por el amor y el apoyo que Andrea le ha brindado a lo largo de los años y la ama más de lo que las palabras pueden expresar. Siempre será la hermanita de Ana, y ahora también es la hermanita de Joshua." 
  },
  { name: "Evelyn Williams", 
    bio: "Evelyn Williams is one of Ana’s closest and longest-standing friends. The two met in 5th grade and grew up together in the small town of Centerville, TX, forming a bond that has lasted through every stage of life. From playing in band and tennis together in school to cheering each other on as they crossed the stage at college graduation and beyond, their friendship has been filled with shared experiences and unwavering support. Known for her humor, intelligence, strong work ethic, and caring heart, Evelyn is someone who is always helping others, especially through her love of teaching. Evelyn has also been a wonderful supporter of Ana and Joshua’s relationship from the moment she met Joshua, and Ana and Joshua are so grateful to have her celebrating this special day with them.", 
    bioEs: "Evelyn Williams es una de las amigas más cercanas y de mayor amistad de Ana. Se conocieron en quinto grado y crecieron juntas en el pequeño pueblo de Centerville, Texas, forjando un vínculo que ha perdurado a lo largo de todas las etapas de la vida. Desde tocar juntas en la banda y jugar al tenis en la escuela hasta animarse mutuamente al cruzar el escenario en su graduación universitaria y más allá, su amistad ha estado llena de experiencias compartidas y apoyo incondicional. Conocida por su humor, inteligencia, gran ética de trabajo y corazón bondadoso, Evelyn siempre está dispuesta a ayudar a los demás, especialmente a través de su pasión por la enseñanza. Evelyn también ha sido un gran apoyo para la relación de Ana y Joshua desde el momento en que conoció a Joshua, y Ana y Joshua están muy agradecidos de que ella celebre este día tan especial con ellos." 
  },
  { name: "Linsy", 
    bio: "Linsy Mariano was one of Ana’s very first friends at Texas A&M, and the two have shared a special bond since meeting during their freshman year seven years ago. Known for her humor, caring heart, and driven spirit, Linsy is always someone you can count on. Throughout their time in college, Ana and Linsy created countless fun and hilarious memories- from studying together to spontaneous late-night adventures. From the moment they met, they quickly realized how similar they were, forming an instant connection that helped make the transition to A&M feel a little less intimidating. Over the years, their friendship has only grown stronger, and Ana cherishes the memories and support they have shared. Ana and Joshua are so grateful to have Linsy celebrating this special day with them.", 
    bioEs: "Linsy Mariano fue una de las primeras amigas de Ana en Texas A&M, y desde que se conocieron en su primer año, hace siete años, han compartido un vínculo muy especial. Conocida por su sentido del humor, su gran corazón y su espíritu emprendedor, Linsy siempre es alguien con quien se puede contar. Durante su tiempo en la universidad, Ana y Linsy crearon innumerables recuerdos divertidos e hilarantes, desde estudiar juntas hasta aventuras nocturnas improvisadas. Desde el momento en que se conocieron, se dieron cuenta rápidamente de lo parecidas que eran, creando una conexión instantánea que hizo que la transición a A&M fuera un poco menos intimidante. Con los años, su amistad se ha fortalecido aún más, y Ana atesora los recuerdos y el apoyo que han compartido. Ana y Joshua están muy agradecidos de que Linsy celebre este día tan especial con ellos." 
  },
  { name: "Ana Calleja", 
    bio: "Ana Calleja is one of Ana’s closest friends. The two met during their sophomore year of college through a church organization they were both involved in. They quickly bonded over sharing the same name, and after their very first “friend date” at a bagel shop, they decided that having the same name meant they had to be friends. Known for her humor, intelligence, driven spirit, and adventurous personality, Ana brings so much fun and energy wherever she goes. Although they met later in life, the two had an instant connection and quickly formed a strong friendship filled with trips, laughter, and countless memories together. Ana is so grateful for their friendship and the support they have always shown one another. Ana and Joshua are excited to have Ana celebrating this special day with them.", 
    bioEs: "Ana Calleja es una de las mejores amigas de Ana. Se conocieron durante su segundo año de universidad a través de una organización religiosa en la que ambas participaban. Rápidamente congeniaron al compartir el mismo nombre, y después de su primera cita de amigas en una panadería, decidieron que tener el mismo nombre significaba que tenían que ser amigas. Conocida por su humor, inteligencia, espíritu emprendedor y personalidad aventurera, Ana irradia alegría y energía allá donde va. Aunque se conocieron más tarde en la vida, conectaron al instante y rápidamente forjaron una sólida amistad llena de viajes, risas e innumerables recuerdos juntas. Ana está muy agradecida por su amistad y el apoyo que siempre se han brindado. Ana y Joshua están encantados de que Ana celebre este día tan especial con ellos." 
  },
  { name: "Maria Gonzalez", 
    bio: "Maria Gonzalez is one of Ana’s childhood friends, and the two have shared a close friendship since middle school after meeting through church events. Known for her beautiful spirit and generous heart, Maria is always ready to lend a helping hand to those around her. She holds a special place in Ana and Joshua’s story, as she was there the very moment they first met. Over the years, Maria and Ana have shared countless memories, laughter, and heartfelt conversations, always supporting and looking out for one another. Ana and Joshua are deeply grateful for Maria’s friendship and for the love and support she has shown their relationship from the very beginning.", 
    bioEs: "María González es una de las amigas de la infancia de Ana, y ambas comparten una estrecha amistad desde la secundaria, tras conocerse en eventos de la iglesia. Conocida por su gran corazón y amabilidad, María siempre está dispuesta a ayudar a quienes la rodean. Ocupa un lugar especial en la historia de Ana y Joshua, ya que estuvo presente desde el primer momento en que se conocieron. A lo largo de los años, María y Ana han compartido innumerables recuerdos, risas y conversaciones sinceras, apoyándose y cuidándose siempre mutuamente. Ana y Joshua están profundamente agradecidos por la amistad de María y por el amor y el apoyo que les ha brindado desde el principio." 
  },
  { name: "Miranda Alvarez", 
    bio: "Miranda Alvarez is Ana’s cousin and has also been one of her closest friends since childhood. Growing up together in Centerville, the two shared countless memories- from going to school together to making hilarious dancing videos growing up and laughing for hours. Miranda is known for her contagious laugh, positive spirit, and kind heart that brings joy to everyone around her. Anyone who has spent time with Miranda and Ana together knows they are constantly joking, laughing, and making the most of every moment. Ana and Joshua are so grateful to have Miranda celebrating this special day with them.", 
    bioEs: "Miranda Álvarez es prima de Ana y una de sus mejores amigas desde la infancia. Crecieron juntas en Centerville y compartieron innumerables recuerdos: desde ir juntas a la escuela hasta grabar divertidos videos de baile y reírse durante horas. Miranda es conocida por su risa contagiosa, su espíritu positivo y su gran corazón, que alegra a todos a su alrededor. Quienes han pasado tiempo con Miranda y Ana saben que siempre están bromeando, riendo y disfrutando al máximo cada momento. Ana y Joshua están muy agradecidos de que Miranda celebre este día tan especial con ellos." 
  },
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
  { name: "Jonathan Gaytan", 
    bio: "Write a short bio or note about this person here.", 
    bioEs: "Escribe una nota corta sobre esta persona aquí." 
  },
  { name: "Eddie Gracia", 
    bio: "Write a short bio or note about this person here.", 
    bioEs: "Escribe una nota corta sobre esta persona aquí." 
  },
  { name: "Jose Lima", 
    bio: "Write a short bio or note about this person here.", 
    bioEs: "Escribe una nota corta sobre esta persona aquí." 
  },
  { name: "Dustin Acosta", 
    bio: "Write a short bio or note about this person here.", 
    bioEs: "Escribe una nota corta sobre esta persona aquí." 
  },
  { name: "Luis Garduno", 
    bio: "Write a short bio or note about this person here.", 
    bioEs: "Escribe una nota corta sobre esta persona aquí." 
  },
  { name: "Abraham Diaz", 
    bio: "Write a short bio or note about this person here.", 
    bioEs: "Escribe una nota corta sobre esta persona aquí." 
  },
];

const PARENTS = [
  { name: "Francisco Duarte", 
    role: "Joshua's Parent", 
    roleEs: "Padre de Joshua", bio: "Write a short bio or note about this person here.", 
    bioEs: "Escribe una nota corta sobre esta persona aquí." 
  },
  { name: "Julissa Duarte", 
    role: "Joshua's Parent", 
    roleEs: "Padre de Joshua", 
    bio: "Write a short bio or note about this person here.", 
    bioEs: "Escribe una nota corta sobre esta persona aquí." 
  },
  { name: "Roberto Lima", 
    role: "Ana's Parent", 
    roleEs: "Padre de Ana", 
    bio: "Roberto Lima is Ana’s beloved father, who passed away in 2023. Known for his kindness, humor, and incredibly generous heart, Roberto was the most selfless and hardworking person Ana has ever known. He loved his family above everything and made countless sacrifices to support and care for them. Roberto quickly grew to love Joshua when they met and always supported their relationship. Ana misses her father deeply and especially will on their big day, but she knows he will be with them in spirit. He was Ana’s best friend, and his love and example will remain with her for the rest of her life.", 
    bioEs: "Roberto Lima era el amado padre de Ana, quien falleció en 2023. Conocido por su bondad, su sentido del humor y su increíble generosidad, Roberto fue la persona más desinteresada y trabajadora que Ana haya conocido. Amaba a su familia por encima de todo e hizo innumerables sacrificios para apoyarlos y cuidarlos. Roberto se enamoró rápidamente de Joshua cuando se conocieron y siempre apoyó su relación. Ana extraña profundamente a su padre, especialmente en su gran día, pero sabe que estará con ellos en espíritu. Él fue el mejor amigo de Ana, y su amor y ejemplo la acompañarán por el resto de su vida." 
  },
  { name: "Juanita Lima", 
    role: "Ana's Parent", 
    roleEs: "Padre de Ana", 
    bio: "​​Juanita Lima is Ana’s beloved mother and one of the most selfless and inspiring people she knows. A woman of deep faith, strength, and wisdom, Juanita has always guided her family with love and care while staying actively involved in her Catholic community. Ana is who she is today because of her mother’s example, support, and encouragement. From the moment Joshua entered their lives five years ago, Juanita welcomed him with open arms and has loved and supported their relationship as one of her own. Ana and Joshua are incredibly grateful for her constant love and guidance.", 
    bioEs: "Juanita Lima es la querida madre de Ana y una de las personas más altruistas e inspiradoras que conoce. Mujer de profunda fe, fortaleza y sabiduría, Juanita siempre ha guiado a su familia con amor y cariño, participando activamente en su comunidad católica. Ana es quien es hoy gracias al ejemplo, el apoyo y el aliento de su madre. Desde que Joshua llegó a sus vidas hace cinco años, Juanita lo recibió con los brazos abiertos y ha amado y apoyado su relación como si fuera la suya propia. Ana y Joshua están inmensamente agradecidos por su amor y guía constantes." 
  },
];

const GODPARENTS = [
  { name: "Ovidio Lima", 
    bio: "Ovidio Lima is Ana’s uncle, and has been a loving presence in her life since childhood. Known for his humor, and caring heart, Ovidio has always made family time special, especially during visits to Los Angeles. He warmly welcomed Joshua into the family and has continued to support Ana and Joshua with encouragement and guidance. Ana and Joshua are grateful for his love and for the important role he has played in their lives.", 
    bioEs: "Ovidio Lima es el tío de Ana y ha sido una presencia cariñosa en su vida desde la infancia. Conocido por su sentido del humor y su gran corazón, Ovidio siempre ha hecho que los momentos en familia sean especiales, sobre todo durante las visitas a Los Ángeles. Recibió a Joshua con mucho cariño en la familia y ha seguido apoyando a Ana y a Joshua con ánimo y orientación. Ana y Joshua están agradecidos por su amor y por el importante papel que ha desempeñado en sus vidas." 
  },
  { name: "Oneida Lima", 
    bio: "Oneida Lima is Ana’s aunt and her mom’s oldest sister, who has been a loving presence throughout Ana’s life. Known for her kindness, humor, and caring nature, Oneida has always made time spent together special, especially during visits to Los Angeles. She warmly welcomed Joshua into the family and is always looking out for Ana and Joshua, keeping them in her prayers and supporting their relationship. Ana and Joshua are grateful for her love and the role she has played in their family.", 
    bioEs: "Oneida Lima es la tía de Ana y la hermana mayor de su madre, y ha sido una presencia amorosa a lo largo de la vida de Ana. Conocida por su bondad, su sentido del humor y su naturaleza cariñosa, Oneida siempre ha hecho que el tiempo que pasan juntos sea especial, sobre todo durante sus visitas a Los Ángeles. Recibió a Joshua con mucho cariño en la familia y siempre está pendiente de Ana y Joshua, orando por ellos y apoyando su relación. Ana y Joshua están agradecidos por su amor y por el papel que ha desempeñado en su familia." 
  },
];

const PRIEST = [
  { name: "Father Rafal Duda", 
    role: "Priest", 
    roleEs: "Sacerdote", 
    bio: "Father Rafal Duda has been a spiritual guide to Ana and Joshua over the past two years. Through his guidance, wisdom, and encouragement, he has helped them grow both individually and as a couple in their faith. Ana and Joshua are deeply grateful for his support and are honored to have him play such a meaningful role in their wedding day.", 
    bioEs: "El padre Rafal Duda ha sido un guía espiritual para Ana y Joshua durante los últimos dos años. Con su guía, sabiduría y aliento, los ha ayudado a crecer tanto individualmente como en su fe como pareja. Ana y Joshua están profundamente agradecidos por su apoyo y se sienten honrados de que haya desempeñado un papel tan significativo en el día de su boda." 
  },
];

const DEACONS = [
  { name: "Alex Ebarle", 
    role: "Deacon", 
    roleEs: "Diácono", 
    bio: "Alex Ebarle has been a wonderful spiritual guide and mentor to Ana and Joshua over the past two years. As a deacon at St. Edward’s Catholic Church in Newark, CA, Alex has helped prepare them for marriage and supported Joshua on his journey to converting to Catholicism. Known for his humor, wisdom, and selfless spirit, Alex has had a profound impact on their spiritual growth and has always been willing to lend a helping hand.", 
    bioEs: "Alex Ebarle ha sido un maravilloso guía espiritual y mentor para Ana y Joshua durante los últimos dos años. Como diácono en la Iglesia Católica de San Eduardo en Newark, California, Alex los ayudó a prepararse para el matrimonio y apoyó a Joshua en su camino hacia la conversión al catolicismo. Conocido por su humor, sabiduría y espíritu altruista, Alex ha tenido un profundo impacto en su crecimiento espiritual y siempre ha estado dispuesto a brindarles su ayuda." 
  },
  { name: "Linda Ebarle", 
    role: "Deacon's Wife", 
    roleEs: "Esposa del Diácono", 
    bio: "Over the past year, Linda Ebarle has been a meaningful spiritual guide to Ana and Joshua as they prepared for marriage. Her kindness, humor, and ability to truly listen have made her a wonderful mentor and friend. Ana and Joshua are grateful for the encouragement and wisdom she has shared with them along the way.", 
    bioEs: "Durante el último año, Linda Ebarle ha sido una valiosa guía espiritual para Ana y Joshua mientras se preparaban para el matrimonio. Su amabilidad, su sentido del humor y su capacidad de escuchar con atención la han convertido en una maravillosa mentora y amiga. Ana y Joshua están agradecidos por el aliento y la sabiduría que ha compartido con ellos a lo largo de este camino." 
  },
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
