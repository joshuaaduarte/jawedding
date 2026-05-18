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
  { name: "Linsy Mariano", 
    bio: "Linsy Mariano was one of Ana’s very first friends at Texas A&M, and the two have shared a special bond since meeting during their freshman year seven years ago. Known for her humor, caring heart, and driven spirit, Linsy is always someone you can count on. Throughout their time in college, Ana and Linsy created countless fun and hilarious memories- from studying together to spontaneous late-night adventures. From the moment they met, they quickly realized how similar they were, forming an instant connection that helped make the transition to A&M feel a little less intimidating. Over the years, their friendship has only grown stronger, and Ana cherishes the memories and support they have shared. Ana and Joshua are so grateful to have Linsy celebrating this special day with them.", 
    bioEs: "Linsy Mariano fue una de las primeras amigas de Ana en Texas A&M, y desde que se conocieron en su primer año, hace siete años, han compartido un vínculo muy especial. Conocida por su sentido del humor, su gran corazón y su espíritu emprendedor, Linsy siempre es alguien con quien se puede contar. Durante su tiempo en la universidad, Ana y Linsy crearon innumerables recuerdos divertidos e hilarantes, desde estudiar juntas hasta aventuras nocturnas improvisadas. Desde el momento en que se conocieron, se dieron cuenta rápidamente de lo parecidas que eran, creando una conexión instantánea que hizo que la transición a A&M fuera un poco menos intimidante. Con los años, su amistad se ha fortalecido aún más, y Ana atesora los recuerdos y el apoyo que han compartido. Ana y Joshua están muy agradecidos de que Linsy celebre este día tan especial con ellos." 
  },
  { name: "Ana Calleja", 
    bio: "Ana Calleja is one of Ana’s closest friends. The two met during their sophomore year of college through a church organization they were both involved in. They quickly bonded over sharing the same name, and after their very first “friend date” at a bagel shop, they decided that having the same name meant they had to be friends. Known for her humor, intelligence, driven spirit, and adventurous personality, Ana brings so much fun and energy wherever she goes. Although they met later in life, the two had an instant connection and quickly formed a strong friendship filled with trips, laughter, and countless memories together. Ana is so grateful for their friendship and the support they have always shown one another. Ana and Joshua are excited to have Ana celebrating this special day with them.", 
    bioEs: "Ana Calleja es una de las mejores amigas de Ana. Se conocieron durante su segundo año de universidad a través de una organización religiosa en la que ambas participaban. Rápidamente congeniaron al compartir el mismo nombre, y después de su primera cita de amigas en una panadería, decidieron que tener el mismo nombre significaba que tenían que ser amigas. Conocida por su humor, inteligencia, espíritu emprendedor y personalidad aventurera, Ana irradia alegría y energía allá donde va. Aunque se conocieron más tarde en la vida, conectaron al instante y rápidamente forjaron una sólida amistad llena de viajes, risas e innumerables recuerdos juntas. Ana está muy agradecida por su amistad y el apoyo que siempre se han brindado. Ana y Joshua están encantados de que Ana celebre este día tan especial con ellos." 
  },
  { name: "Maria Gonzalez", 
    bio: "Maria Gonzalez is one of Ana’s childhood friends, and the two have shared a close friendship since middle school after meeting through church events. Known for her beautiful spirit and generous heart, Maria is always ready to lend a helping hand to those around her. She holds a special place in Ana and Joshua’s story, as she was there the very moment they first met. Over the years, Maria and Ana have shared countless memories, laughter, and heartfelt conversations, always supporting and looking out for one another. Ana and Joshua are deeply grateful for Maria’s friendship and for the love and support she has shown their relationship from the very beginning.", 
    bioEs: "María González es una de las amigas de la infancia de Ana, y ambas comparten una estrecha amistad desde la secundaria, después de conocerse en eventos de la iglesia. Conocida por su gran corazón y amabilidad, María siempre está dispuesta a ayudar a quienes la rodean. Ocupa un lugar especial en la historia de Ana y Joshua, ya que estuvo presente desde el primer momento en que se conocieron. A lo largo de los años, María y Ana han compartido incontables recuerdos, risas y conversaciones sinceras, apoyándose y cuidándose siempre mutuamente. Ana y Joshua están profundamente agradecidos por la amistad de María y por el amor y el apoyo que les ha brindado desde el principio." 
  },
  { name: "Miranda Alvarez", 
    bio: "Miranda Alvarez is Ana’s cousin and has also been one of her closest friends since childhood. Growing up together in Centerville, the two shared countless memories- from going to school together to making hilarious dancing videos growing up and laughing for hours. Miranda is known for her contagious laugh, positive spirit, and kind heart that brings joy to everyone around her. Anyone who has spent time with Miranda and Ana together knows they are constantly joking, laughing, and making the most of every moment. Ana and Joshua are so grateful to have Miranda celebrating this special day with them.", 
    bioEs: "Miranda Álvarez es prima de Ana y una de sus mejores amigas desde la infancia. Crecieron juntas en Centerville y compartieron innumerables recuerdos: desde ir juntas a la escuela hasta grabar divertidos videos de baile y reírse durante horas. Miranda es conocida por su risa contagiosa, su espíritu positivo y su gran corazón, que alegra a todos a su alrededor. Quienes han pasado tiempo con Miranda y Ana saben que siempre están bromeando, riendo y disfrutando al máximo cada momento. Ana y Joshua están muy agradecidos de que Miranda celebre este día tan especial con ellos." 
  },
];

const BEST_MEN = [
  {
    name: "Roberto Gonzalez",
    bio: "Roberto is one of Josh’s best men and someone he has shared a strong bond with since meeting in eighth grade after moving to Waxahachie. Their friendship grew through years of challenging classes, late night calls, and pushing each other to succeed. Whether it was cramming for exams at the last minute or simply being there when it mattered, Roberto has always been someone Josh can trust and depend on. Kind, genuine, and easygoing, he is the type of person who gets along with anyone he meets. Ana and Joshua are grateful to have him by their side on this special day.",
    bioEs: "Roberto es uno de los padrinos de Josh y alguien con quien ha forjado una fuerte amistad desde que se conocieron en octavo grado, después de mudarse a Waxahachie. Su amistad creció a lo largo de años de clases exigentes, llamadas nocturnas y apoyo mutuo para salir adelante. Ya fuera estudiando a último momento para los exámenes o simplemente estando presente cuando más se le necesitaba, Roberto siempre ha sido alguien en quien Josh puede confiar plenamente. Amable, sincero y de trato fácil, es el tipo de persona que se lleva bien con todos. Ana y Joshua están agradecidos de tenerlo a su lado en este día tan especial.",
  },
  {
    name: "Pavan Reddy",
    bio: "Pavan is one of Josh’s best men and a close friend he met while living at the International House at the University of California, Berkeley, where they were both pursuing their master’s in mechanical engineering. Their friendship grew through long nights working on their capstone project, frequent trips to La Burrita, and the occasional Shakira jam session. Pavan is always willing to help anyone in need, whether it is lending a hand or simply being there to listen. His kindness and generosity make him such a valued friend. Ana and Joshua are grateful to celebrate this moment with him.",
    bioEs: "Pavan es uno de los padrinos de Josh y un amigo cercano que conoció mientras vivía en la Residencia Internacional de la Universidad de California, Berkeley, donde ambos cursaban su maestría en ingeniería mecánica. Su amistad se fortaleció gracias a las largas noches trabajando en su proyecto final, las frecuentes visitas a La Burrita y las ocasionales sesiones improvisadas de Shakira. Pavan siempre está dispuesto a ayudar a quien lo necesite, ya sea echando una mano o simplemente escuchando. Su amabilidad y generosidad lo convierten en un amigo muy valioso. Ana y Joshua están agradecidos de poder celebrar este momento con él.",
  },
];

const GROOMSMEN = [
  { name: "Jonathan Gaytan", 
    bio: "Jonathan is a close friend Josh met freshman year, quickly standing out for his intelligence and thoughtfulness. Their friendship grew through shared experiences, from winning a hackathon together to spending a summer living and working in Seattle. While Jonathan may seem reserved at first, those who get to know him quickly discover one of the funniest people around. He has a natural ability to teach and share what he knows, making those around him better. Ana and Joshua are grateful for his friendship and the joy he brings to their lives.", 
    bioEs: "Jonathan es un amigo cercano que Josh conoció en su primer año de universidad y que rápidamente destacó por su inteligencia y consideración. Su amistad creció gracias a experiencias compartidas, desde ganar juntos un hackathon hasta pasar un verano viviendo y trabajando en Seattle. Aunque Jonathan puede parecer reservado al principio, quienes lo conocen pronto descubren que es una de las personas más divertidas que existen. Tiene una habilidad innata para enseñar y compartir sus conocimientos, inspirando a quienes lo rodean. Ana y Joshua están agradecidos por su amistad y la alegría que aporta a sus vidas." 
  },
  { name: "Eddie Gracia", 
    bio: "Eddie is someone Josh met through a mutual friend, and their connection quickly grew into a brother-like bond. Known for his constant laughter, positive energy, and unmistakable sense of style, Eddie has a way of lifting the mood wherever he goes. Whether it is through jokes, his infectious personality, or even his not so great dance moves, he brings life to every moment. Beyond that, Eddie is deeply caring and dependable, always showing up for the people around him. His presence has made a lasting impact on Josh’s life.", 
    bioEs: "Josh conoció a Eddie a través de un amigo en común, y su conexión rápidamente se convirtió en un vínculo fraternal. Conocido por su risa contagiosa, su energía positiva y su estilo inconfundible, Eddie tiene la capacidad de alegrar el ambiente allá donde va. Ya sea con sus bromas, su personalidad arrolladora o incluso sus peculiares pasos de baile, le da vida a cada momento. Además, Eddie es una persona muy cariñosa y confiable, siempre presente para quienes lo rodean. Su presencia ha dejado una huella imborrable en la vida de Josh." 
  },
  { name: "Jose Lima", 
    bio: "Jose is Josh’s future brother-in-law and the little brother he never had. From the start, Josh has always enjoyed being around him and admires the way Jose shows love so freely and is always willing to go out of his way to help others. A strong and dependable presence in Ana’s family, Jose is someone people naturally lean on. Whether it is their competitive games, constant jokes, or teaming up to get a reaction out of Ana, Jose has become not just family, but a true brother. Ana and Joshua are so grateful to have him in their lives.", 
    bioEs: "José es el futuro cuñado de Josh y el hermanito que nunca tuvo. Desde el principio, Josh siempre ha disfrutado de su compañía y admira la generosidad con la que José demuestra su cariño y su disposición a ayudar a los demás. José es una presencia sólida y confiable en la familia de Ana, alguien en quien todos pueden apoyarse fácilmente. Ya sea en sus juegos competitivos, sus bromas constantes o sus intentos de provocar una reacción en Ana, José se ha convertido no solo en parte de la familia, sino en un verdadero hermano. Ana y Joshua están muy agradecidos de tenerlo en sus vidas."   
  },
  { name: "Dustin Acosta", 
    bio: "Dustin is someone Josh met through a mutual friend and quickly grew to admire for his charm and ability to connect with anyone around him. Instantly likable and easy to talk to, Dustin has a way of making people feel comfortable wherever he goes. From celebrating Josh’s 21st birthday together in Cabo to sharing countless meaningful conversations, he has been a source of great advice and perspective. Passionate and genuine, Dustin is someone Josh deeply respects. Ana and Joshua are grateful to have him as part of their journey.", 
    bioEs: "Josh conoció a Dustin a través de un amigo en común y rápidamente lo admiró por su encanto y su facilidad para conectar con cualquiera. De trato agradable y conversador, Dustin tiene la habilidad de hacer que la gente se sienta cómoda allá donde va. Desde celebrar juntos el 21 cumpleaños de Josh en Cabo hasta compartir innumerables conversaciones significativas, ha sido una fuente de valiosos consejos y perspectivas. Apasionado y auténtico, Josh respeta profundamente a Dustin. Ana y Joshua están agradecidos de tenerlo como parte de su camino."   
  },
  { name: "Luis Garduno", 
    bio: "Luis, better known as Garduno, is a close friend Josh met freshman year of high school while playing soccer and someone who has always felt like an older brother. Known for his strong work ethic and drive, he played a major role in introducing Josh to Texas A&M University, a decision that ultimately shaped much of his life. From late nights and New Year’s traditions spent working on personal projects to making the best of a 7-Eleven pizza when nothing else was open, their friendship is built on shared experiences and mutual respect. Ana and Joshua are grateful to have him nearby in San Francisco and to celebrate this moment together.", 
    bioEs: "Luis, más conocido como Garduno, es un amigo íntimo que Josh conoció en su primer año de preparatoria jugando fútbol y que siempre ha sido como un hermano mayor para él. Conocido por su gran ética de trabajo y su determinación, jugó un papel fundamental en la decisión de que Josh ingresara a la Universidad de Texas A&M, una decisión que marcó gran parte de su vida. Desde noches en vela y tradiciones de Año Nuevo dedicadas a proyectos personales hasta disfrutar de una pizza de 7-Eleven cuando no había nada más abierto, su amistad se basa en experiencias compartidas y respeto mutuo. Ana y Joshua están agradecidos de tenerlo cerca en San Francisco y de poder celebrar este momento juntos."   
  },
  { name: "Abraham Diaz", 
    bio: "Abraham, better known as Abe, is a close friend Josh met through a mutual friend and grew alongside while serving on the SHPE board. Their friendship strengthened during the isolation of COVID, where daily Zoom calls became a way to stay connected and build lasting memories. Abe is known for the care and love he shows others, along with a level of discipline and dedication that stands out in everything he does. Always willing to help anyone in need, he is someone Josh deeply respects. Ana and Joshua are grateful for his friendship and the role he plays in their lives.", 
    bioEs: "Abraham, más conocido como Abe, es un amigo cercano que Josh conoció a través de un amigo en común y con quien creció mientras formaban parte de la junta directiva de SHPE. Su amistad se fortaleció durante el aislamiento por la COVID-19, cuando las videollamadas diarias por Zoom se convirtieron en una forma de mantenerse conectados y crear recuerdos imborrables. Abe es conocido por el cariño y la dedicación que demuestra hacia los demás, así como por su disciplina y entrega, que se reflejan en todo lo que hace. Siempre dispuesto a ayudar a quien lo necesite, es alguien a quien Josh respeta profundamente. Ana y Joshua están agradecidos por su amistad y por el papel que desempeña en sus vidas."   
  },
];

const PARENTS = [
  { name: "Francisco Duarte", 
    role: "Joshua's Parent", 
    roleEs: "Padre de Joshua", bio: "Francisco is Josh’s dad and a constant example of what it means to lead through action. While he always had something to say, it was his actions that taught Josh the most. He showed him the value of patience, perseverance, and a strong work ethic, always leading with love and putting his family first. Patient, humorous, and dependable, Francisco has always been someone Josh could count on in any moment. Ana and Joshua are deeply grateful for his guidance, his example, and the foundation he has helped build.", 
    bioEs: "Francisco es el padre de Josh y un ejemplo constante de liderazgo con el ejemplo. Si bien siempre tenía algo que decir, fueron sus acciones las que más le enseñaron a Josh. Le mostró el valor de la paciencia, la perseverancia y una sólida ética de trabajo, siempre actuando con amor y anteponiendo a su familia. Paciente, con sentido del humor y confiable, Francisco siempre fue alguien con quien Josh podía contar en cualquier momento. Ana y Joshua están profundamente agradecidos por su guía, su ejemplo y los cimientos que ayudó a construir." 
  },
  { name: "Julissa Duarte", 
    role: "Joshua's Parent", 
    roleEs: "Madre de Joshua", 
    bio: "Julissa is Josh’s mom and the heart of his family, known for her endless love, energy, and selflessness. She always put her children first and never hesitated to give up anything if it meant making them happy. From working tirelessly to support Josh’s dreams to hosting unforgettable moments where everyone felt at home, she created a space full of warmth and life. Whether she is cooking a meal on the spot or talking a little too loudly on the phone, Julissa’s spirit is unforgettable. Ana and Joshua are incredibly grateful for her love and the role she has played in shaping their lives.", 
    bioEs: "Julissa es la madre de Josh y el alma de su familia, conocida por su amor, energía y generosidad infinitos. Siempre antepuso a sus hijos y nunca dudó en sacrificarlo todo con tal de hacerlos felices. Desde trabajar incansablemente para apoyar los sueños de Josh hasta organizar momentos inolvidables donde todos se sentían como en casa, creó un espacio lleno de calidez y vida. Ya sea cocinando en el momento o hablando por teléfono con entusiasmo, el espíritu de Julissa es inolvidable. Ana y Joshua están inmensamente agradecidos por su amor y por el papel que ha desempeñado en la formación de sus vidas." 
  },
  { name: "Roberto Lima", 
    role: "Ana's Parent", 
    roleEs: "Padre de Ana", 
    bio: "Roberto Lima is Ana’s beloved father, who passed away in 2023. Known for his kindness, humor, and incredibly generous heart, Roberto was the most selfless and hardworking person Ana has ever known. He loved his family above everything and made countless sacrifices to support and care for them. Roberto quickly grew to love Joshua when they met and always supported their relationship. Ana misses her father deeply and especially will on their big day, but she knows he will be with them in spirit. He was Ana’s best friend, and his love and example will remain with her for the rest of her life.", 
    bioEs: "Roberto Lima era el amado padre de Ana, quien falleció en 2023. Conocido por su bondad, su sentido del humor y su increíble generosidad, Roberto fue la persona más desinteresada y trabajadora que Ana haya conocido. Amaba a su familia por encima de todo e hizo innumerables sacrificios para apoyarlos y cuidarlos. Roberto llegó a querer a Joshua rápidamente cuando se conocieron y siempre apoyó su relación. Ana extraña profundamente a su padre, especialmente en su gran día, pero sabe que estará con ellos en espíritu. Él fue el mejor amigo de Ana, y su amor y ejemplo la acompañarán por el resto de su vida." 
  },
  { name: "Juanita Lima", 
    role: "Ana's Parent", 
    roleEs: "Madre de Ana", 
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
          groomsmen: "Caballeros",
          groomsmanRole: "Caballero",
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
