// ── Travel recommendation data ──────────────────────────────────────────────

export type Airport = "SFO" | "SJC" | "OAK" | "MRY";
export type Origin = Airport | "LOCAL";
export type TimeFrame = "direct" | "half" | "full" | "weekend";
export type ArrivalTime = "morning" | "afternoon" | "evening";
export type DepartureTime = "morning" | "afternoon" | "evening";
export type Interest = "scenic" | "food" | "family" | "outdoors" | "relaxing";
export type Region = "monterey-carmel" | "en-route" | "bay-area" | "extended";

export interface Place {
  id: string;
  name: string;
  tagline: string;
  taglineEs?: string;
  description: string;
  interests: Interest[];
  timeNeeded: string;
  region: Region;
  airports: Airport[];
  imageKey: string;
}

export interface AirportProfile {
  code: Airport;
  name: string;
  driveTime: string;
  driveTimeNote: string;
  character: string;
  characterEs?: string;
}

export interface InterestOption {
  id: Interest;
  label: string;
  labelEs?: string;
  icon: string;
}

export interface TimeOption {
  id: ArrivalTime | DepartureTime;
  label: string;
  sublabel: string;
  labelEs?: string;
  sublabelEs?: string;
}

export interface Recommendation {
  driveTime: string;
  summary: string;
  stops: Place[];
  itinerary: string[];
  skipNote: string;
  isWeddingDay: boolean;
}

// ── Airport profiles ─────────────────────────────────────────────────────────

export const AIRPORT_PROFILES: Record<Airport, AirportProfile> = {
  SFO: {
    code: "SFO",
    name: "San Francisco International",
    driveTime: "~2 hours",
    driveTimeNote: "Via US-101 S or scenic Highway 1",
    character: "Great for guests who want Bay Area time. Beautiful coastal driving with Half Moon Bay and Santa Cruz as excellent stops. Budget extra time for traffic.",
    characterEs: "Ideal para quienes quieren pasar tiempo en el Bay Area. Hermosa carretera costera con Half Moon Bay y Santa Cruz como excelentes paradas. Planifica tiempo extra para el tráfico.",
  },
  SJC: {
    code: "SJC",
    name: "San Jose International",
    driveTime: "~1.5 hours",
    driveTimeNote: "Via US-101 S — the most direct route",
    character: "The most convenient major airport for Monterey. Straightforward drive with Santa Cruz as a natural halfway stop for guests with a few extra hours.",
    characterEs: "El aeropuerto más conveniente para Monterey. Trayecto directo con Santa Cruz como parada natural para quienes tienen unas horas extra.",
  },
  OAK: {
    code: "OAK",
    name: "Oakland International",
    driveTime: "~2.5 hours",
    driveTimeNote: "Via I-880 S to US-101 S",
    character: "Workable with a bit more drive time. The East Bay has excellent food if you want to explore before heading south. Leave early to beat Bay Bridge traffic.",
    characterEs: "Funciona bien con un poco más de tiempo de manejo. El East Bay tiene excelente comida si quieres explorar antes de seguir al sur. Sal temprano para evitar el tráfico del Bay Bridge.",
  },
  MRY: {
    code: "MRY",
    name: "Monterey Regional Airport",
    driveTime: "~15 minutes",
    driveTimeNote: "You're practically already here",
    character: "The best option for maximizing Monterey time. Fewer flights and fares are higher, but you'll spend your time exploring rather than driving.",
    characterEs: "La mejor opción para maximizar el tiempo en Monterey. Menos vuelos y tarifas más altas, pero pasarás tu tiempo explorando en vez de manejando.",
  },
};

// ── Local (Bay Area) profile ──────────────────────────────────────────────────

export const LOCAL_PROFILE = {
  driveTime: "~1.5–2.5 hrs",
  driveTimeNote: "Depending on where in the Bay Area",
  character: "You already know the Bay Area — just pick your day to head south. US-101 is the fastest route; Highway 1 through Half Moon Bay adds time but is genuinely beautiful.",
  characterEs: "Ya conoces el Bay Area — solo decide cuándo quieres ir al sur. La US-101 es la ruta más rápida; la Highway 1 por Half Moon Bay añade tiempo pero es genuinamente hermosa.",
};

// ── Wedding constants ─────────────────────────────────────────────────────────

export const WEDDING_DATE = "2026-09-04";

export interface DateOption {
  date: string;
  label: string;
  sublabel: string;
  labelEs?: string;
  sublabelEs?: string;
}

export const ARRIVAL_DATES: DateOption[] = [
  { date: "2026-09-01", label: "Tue, Sept 1", sublabel: "Long weekend",      labelEs: "Mar, 1 Sep",  sublabelEs: "Fin de semana largo" },
  { date: "2026-09-02", label: "Wed, Sept 2", sublabel: "A few days early",   labelEs: "Mié, 2 Sep",  sublabelEs: "Unos días antes" },
  { date: "2026-09-03", label: "Thu, Sept 3", sublabel: "Day before",         labelEs: "Jue, 3 Sep",  sublabelEs: "El día anterior" },
  { date: "2026-09-04", label: "Fri, Sept 4", sublabel: "Wedding day",        labelEs: "Vier, 4 Sep", sublabelEs: "Día de la boda" },
];

export const DEPARTURE_DATES: DateOption[] = [
  { date: "2026-09-04", label: "Fri, Sept 4", sublabel: "Just for the wedding",  labelEs: "Vier, 4 Sep", sublabelEs: "Solo para la boda" },
  { date: "2026-09-05", label: "Sat, Sept 5", sublabel: "Morning after",         labelEs: "Sáb, 5 Sep",  sublabelEs: "La mañana siguiente" },
  { date: "2026-09-06", label: "Sun, Sept 6", sublabel: "Full weekend",          labelEs: "Dom, 6 Sep",  sublabelEs: "Fin de semana completo" },
  { date: "2026-09-07", label: "Mon, Sept 7+", sublabel: "Extended stay",        labelEs: "Lun, 7 Sep+", sublabelEs: "Estadía extendida" },
];

export const ARRIVAL_TIMES: TimeOption[] = [
  { id: "morning",   label: "Morning",   sublabel: "Before noon",     labelEs: "Mañana",  sublabelEs: "Antes del mediodía" },
  { id: "afternoon", label: "Afternoon", sublabel: "Noon – 5 PM",     labelEs: "Tarde",   sublabelEs: "Mediodía – 5 PM" },
  { id: "evening",   label: "Evening",   sublabel: "After 5 PM",      labelEs: "Noche",   sublabelEs: "Después de las 5 PM" },
];

export const DEPARTURE_TIMES: TimeOption[] = [
  { id: "morning",   label: "Morning",   sublabel: "Before noon",     labelEs: "Mañana",  sublabelEs: "Antes del mediodía" },
  { id: "afternoon", label: "Afternoon", sublabel: "Noon – 5 PM",     labelEs: "Tarde",   sublabelEs: "Mediodía – 5 PM" },
  { id: "evening",   label: "Evening",   sublabel: "After 5 PM",      labelEs: "Noche",   sublabelEs: "Después de las 5 PM" },
];

export function arrivalToTimeFrame(arrivalDate: string): TimeFrame {
  if (arrivalDate >= WEDDING_DATE) return "direct";
  if (arrivalDate === "2026-09-03") return "full";
  return "weekend";
}

// ── Selector options ──────────────────────────────────────────────────────────

export const INTERESTS: InterestOption[] = [
  { id: "scenic",    label: "Scenic views",     labelEs: "Vistas panorámicas", icon: "◯" },
  { id: "food",      label: "Food & wine",       labelEs: "Comida y vino",      icon: "◎" },
  { id: "family",    label: "Family-friendly",   labelEs: "Familiar",           icon: "◇" },
  { id: "outdoors",  label: "Outdoors",          labelEs: "Naturaleza",         icon: "△" },
  { id: "relaxing",  label: "Relaxing",          labelEs: "Relajante",          icon: "◻" },
];

// ── Places database ───────────────────────────────────────────────────────────

export const ALL_PLACES: Place[] = [
  {
    id: "aquarium", name: "Monterey Bay Aquarium",
    tagline: "World-class marine life right on the bay",
    taglineEs: "Vida marina de clase mundial frente a la bahía",
    description: "One of the finest aquariums in the world, perched on Cannery Row. The kelp forest and jellyfish galleries are genuinely stunning. Book tickets in advance — it sells out regularly.",
    interests: ["family", "relaxing", "scenic"], timeNeeded: "2–3 hours",
    region: "monterey-carmel", airports: ["SFO", "SJC", "OAK", "MRY"], imageKey: "placeAquarium",
  },
  {
    id: "cannery-row", name: "Cannery Row",
    tagline: "Historic waterfront with restaurants and charm",
    taglineEs: "Muelle histórico con restaurantes y encanto",
    description: "Named after Steinbeck's novel, today it's a lively strip of restaurants, wine tasting rooms, and local shops with sweeping bay views. Ideal for a slow afternoon stroll.",
    interests: ["food", "relaxing", "scenic"], timeNeeded: "1–2 hours",
    region: "monterey-carmel", airports: ["SFO", "SJC", "OAK", "MRY"], imageKey: "placeCanneryRow",
  },
  {
    id: "carmel", name: "Carmel-by-the-Sea",
    tagline: "A fairytale village with galleries and white sand",
    taglineEs: "Un pueblo de cuento con galerías y arena blanca",
    description: "Walk Ocean Avenue's storybook cottages, browse art galleries, have coffee at Cultura Comida, and end at Carmel Beach — one of California's most beautiful shorelines.",
    interests: ["scenic", "food", "relaxing"], timeNeeded: "2–3 hours",
    region: "monterey-carmel", airports: ["SFO", "SJC", "OAK", "MRY"], imageKey: "placeCarmel",
  },
  {
    id: "point-lobos", name: "Point Lobos State Reserve",
    tagline: "The crown jewel of California state parks",
    taglineEs: "La joya de los parques estatales de California",
    description: "Sea otters, harbor seals, cypress groves, and turquoise coves all within a short walk. Called 'the greatest meeting of land and sea.' Arrive before 9 AM — it fills up quickly.",
    interests: ["scenic", "outdoors", "relaxing"], timeNeeded: "1.5–2.5 hours",
    region: "monterey-carmel", airports: ["SFO", "SJC", "OAK", "MRY"], imageKey: "placePointLobos",
  },
  {
    id: "17-mile-drive", name: "17-Mile Drive",
    tagline: "The iconic scenic loop through Pebble Beach",
    taglineEs: "El icónico circuito panorámico por Pebble Beach",
    description: "A toll road ($12.25) winding through Pebble Beach past the Lone Cypress, Ghost Tree, and Spanish Bay. Perfect for a slow afternoon with the windows down and nowhere to be.",
    interests: ["scenic", "relaxing"], timeNeeded: "1–2 hours",
    region: "monterey-carmel", airports: ["SFO", "SJC", "OAK", "MRY"], imageKey: "place17Mile",
  },
  {
    id: "carmel-valley", name: "Carmel Valley",
    tagline: "Sunny wine country just inland from the coast",
    taglineEs: "Viñedos soleados en el interior de la costa",
    description: "While the coast stays foggy, Carmel Valley is often bathed in sunshine. Tasting rooms at Bernardus, Folktale, and Joullian offer an unhurried wine country afternoon.",
    interests: ["food", "relaxing"], timeNeeded: "2–4 hours",
    region: "monterey-carmel", airports: ["SFO", "SJC", "OAK", "MRY"], imageKey: "placeCarmelVal",
  },
  {
    id: "big-sur", name: "Big Sur",
    tagline: "California's most dramatic stretch of coastline",
    taglineEs: "El tramo más dramático de la costa californiana",
    description: "Drive south on Highway 1 through rugged cliffs and redwood canyons. Bixby Bridge, McWay Falls, and Pfeiffer Beach are essential stops. Check road conditions before heading out.",
    interests: ["scenic", "outdoors"], timeNeeded: "Half day or more",
    region: "extended", airports: ["SFO", "SJC", "OAK", "MRY"], imageKey: "placeBigSur",
  },
  {
    id: "santa-cruz", name: "Santa Cruz",
    tagline: "Surf town vibes, a boardwalk, and redwoods nearby",
    taglineEs: "Ambiente surfero, un boardwalk y secuoyas cercanas",
    description: "A great halfway stop from SJC or SFO. Stroll the boardwalk, grab lunch on Pacific Avenue, or drive into the Santa Cruz Mountains for a quick redwood fix before continuing south.",
    interests: ["family", "food", "outdoors"], timeNeeded: "2–3 hours",
    region: "en-route", airports: ["SFO", "SJC", "OAK"], imageKey: "placeSantaCruz",
  },
  {
    id: "half-moon-bay", name: "Half Moon Bay",
    tagline: "Coastal farm town with dramatic bluffs and good seafood",
    taglineEs: "Pueblo costero con acantilados dramáticos y mariscos",
    description: "A lovely first stop heading south from SFO. Walk the blufftop coastal trail, grab clam chowder at Sam's Chowder House, and browse the farm stands. Beautiful on a clear day.",
    interests: ["scenic", "food", "outdoors", "relaxing"], timeNeeded: "1.5–2.5 hours",
    region: "en-route", airports: ["SFO", "OAK"], imageKey: "placeHalfMoon",
  },
  {
    id: "san-francisco", name: "San Francisco",
    tagline: "The city worth building your trip around",
    taglineEs: "La ciudad que vale la pena incluir en tu viaje",
    description: "If you're flying into SFO, you're already there. The Ferry Building farmers market, Golden Gate Bridge walk, cable cars, and neighborhoods like Hayes Valley and the Mission are all exceptional.",
    interests: ["food", "scenic", "family", "outdoors"], timeNeeded: "Half or full day",
    region: "bay-area", airports: ["SFO", "OAK"], imageKey: "placeSF",
  },
  {
    id: "oakland", name: "Oakland & the East Bay",
    tagline: "A vibrant food and culture scene worth slowing down for",
    taglineEs: "Una vibrante escena gastronómica y cultural",
    description: "If you're flying OAK, Temescal and Grand Lake neighborhoods offer some of the Bay Area's most exciting dining. Excellent coffee, standout restaurants, and genuine local character.",
    interests: ["food"], timeNeeded: "1–2 hours",
    region: "bay-area", airports: ["OAK"], imageKey: "placeOakland",
  },
];

// ── English recommendation text (morning arrivals / base) ─────────────────────

const SUMMARIES: Record<Airport, Record<TimeFrame, string>> = {
  SFO: {
    direct:  "Head straight down US-101 and you'll be in Monterey in about two hours. Skip the stops today — save your energy for the evening before the wedding.",
    half:    "Half Moon Bay is the perfect first stop from SFO. Walk the blufftop trail, have lunch at Sam's Chowder House, then continue south. Total trip with the stop: around 3.5 hours.",
    full:    "Take the scenic coastal route south. Half Moon Bay in the morning, Santa Cruz for lunch, and arrive in Monterey by late afternoon — one of California's great road trips.",
    weekend: "Make the most of SFO's location. A night in San Francisco, then the coastal drive south through Half Moon Bay and Santa Cruz, arriving in Monterey by Day 2. Keep Friday open for the wedding.",
  },
  SJC: {
    direct:  "SJC is the most straightforward airport for Monterey — about 1.5 hours on US-101. Easy drive, and you'll arrive with energy to settle in before the wedding.",
    half:    "Santa Cruz is a natural halfway stop from SJC. Grab lunch on Pacific Avenue, walk the boardwalk, then continue south on Highway 1 to arrive in Monterey fresh.",
    full:    "Linger in Santa Cruz in the morning, then spend the afternoon in Carmel or Monterey. The Aquarium is an excellent afternoon destination — book tickets in advance.",
    weekend: "SJC is ideal for a relaxed Monterey run. Arrive in Santa Cruz, explore Carmel and Monterey over the following days, and keep Friday clear for the wedding.",
  },
  OAK: {
    direct:  "Take I-880 S to US-101 S and you'll be in Monterey in about 2.5 hours. Leave early in the day to avoid Bay Bridge traffic — it can add significant time in the afternoon.",
    half:    "Grab coffee in Temescal (15 minutes from OAK), then hit the freeway south. If you're ahead of schedule, Santa Cruz makes a nice detour before the final stretch.",
    full:    "Spend a morning in Oakland or take BART to San Francisco for a few hours, then drive south. The coastal route via Half Moon Bay adds time but is genuinely beautiful.",
    weekend: "Spend a night in Oakland or San Francisco, drive south the next morning, and you'll have plenty of Monterey time without feeling rushed. Keep Friday open for the wedding.",
  },
  MRY: {
    direct:  "You've made the best airport choice. Pick up your rental, check in, and the afternoon is entirely yours. Cannery Row is 15 minutes away and Carmel is just 20 minutes south.",
    half:    "Head to Cannery Row for lunch, then spend the afternoon at the Aquarium or along the 17-Mile Drive. Carmel is 20 minutes south and worth the short trip.",
    full:    "Start early at Point Lobos (arrive by 9 AM), lunch in Carmel, afternoon on the 17-Mile Drive, and end with sunset at Cannery Row. A near-perfect Monterey day.",
    weekend: "With a full weekend from MRY, the whole peninsula is yours. Point Lobos, Carmel Valley wine tasting, Big Sur — take your time and keep Friday open for the wedding.",
  },
};

const ITINERARIES: Record<Airport, Record<TimeFrame, string[]>> = {
  SFO: {
    direct: [
      "Land at SFO → pick up rental car",
      "Drive US-101 S or I-280 S to CA-1 (~2 hours)",
      "Arrive Monterey, check in",
      "Evening: walk Cannery Row, dinner on the water",
    ],
    half: [
      "Land at SFO → pick up rental car",
      "Drive south on CA-1 to Half Moon Bay (~35 min)",
      "Walk the blufftop trail, lunch at Sam's Chowder House",
      "Continue south to Santa Cruz or straight to Monterey",
      "Arrive Monterey (~3.5 hours total from SFO)",
    ],
    full: [
      "Thu, Sept 3 — Land at SFO, optional coffee in the city",
      "Drive scenic Highway 1 south",
      "Mid-morning: Half Moon Bay — blufftop walk, farm stands",
      "Lunch: Santa Cruz — Pacific Ave or the Wharf",
      "Afternoon: arrive Monterey, check in, settle in",
      "Evening: rest up for the wedding tomorrow",
      "Fri, Sept 4 — 2:00 PM · Ceremony at Carmel Mission Basilica",
      "Fri, Sept 4 — 5:00 PM · Reception at Fairview Laguna Seca",
    ],
    weekend: [
      "Day 1: arrive SFO, explore San Francisco — Ferry Building, Golden Gate, neighborhoods",
      "Night 1: stay in San Francisco",
      "Day 2: drive coastal Highway 1 south — Half Moon Bay, Santa Cruz",
      "Afternoon: arrive Monterey, Cannery Row, check in",
      "Thu, Sept 3: Carmel + 17-Mile Drive + Point Lobos",
      "Fri, Sept 4 — 2:00 PM · Ceremony at Carmel Mission Basilica",
      "Fri, Sept 4 — 5:00 PM · Reception at Fairview Laguna Seca",
    ],
  },
  SJC: {
    direct: [
      "Land at SJC → pick up rental car",
      "Drive US-101 S (~1.5 hours)",
      "Arrive Monterey, check in",
      "Explore at your leisure before the wedding tomorrow",
    ],
    half: [
      "Land at SJC → pick up rental car",
      "Drive CA-17 over the hill to Santa Cruz (~45 min)",
      "Lunch on Pacific Avenue or at the Wharf",
      "Walk the boardwalk, stroll the beach",
      "Drive CA-1 S to Monterey (~45 min)",
    ],
    full: [
      "Thu, Sept 3 — Land at SJC",
      "Drive to Santa Cruz — explore, have lunch, beach time",
      "Early afternoon: continue to Monterey",
      "Afternoon: Monterey Bay Aquarium (book ahead!) or Cannery Row",
      "Evening: dinner on the water, rest up",
      "Fri, Sept 4 — 2:00 PM · Ceremony at Carmel Mission Basilica",
      "Fri, Sept 4 — 5:00 PM · Reception at Fairview Laguna Seca",
    ],
    weekend: [
      "Day 1: Santa Cruz — afternoon and evening",
      "Day 2: morning drive to Carmel, coffee + galleries",
      "Afternoon: 17-Mile Drive through Pebble Beach",
      "Evening: dinner in Carmel Valley",
      "Thu, Sept 3: Point Lobos morning hike",
      "Fri, Sept 4 — 2:00 PM · Ceremony at Carmel Mission Basilica",
      "Fri, Sept 4 — 5:00 PM · Reception at Fairview Laguna Seca",
    ],
  },
  OAK: {
    direct: [
      "Land at OAK → pick up rental car",
      "Drive I-880 S to US-101 S (~2.5 hours)",
      "Leave early to avoid Bay Bridge traffic",
      "Arrive Monterey, check in, relax",
    ],
    half: [
      "Land at OAK → grab coffee in Temescal (15 min from airport)",
      "Drive I-880 S → US-101 S south",
      "Optional: Santa Cruz detour if ahead of schedule",
      "Arrive Monterey, check in, explore Cannery Row",
    ],
    full: [
      "Thu, Sept 3 — Land at OAK, explore Temescal or take BART to San Francisco",
      "Midday: lunch in Oakland or the Ferry Building in SF",
      "Early afternoon: drive south via US-101 or coastal Highway 1",
      "Arrive Monterey by early evening, check in",
      "Evening: rest up for the wedding tomorrow",
      "Fri, Sept 4 — 2:00 PM · Ceremony at Carmel Mission Basilica",
      "Fri, Sept 4 — 5:00 PM · Reception at Fairview Laguna Seca",
    ],
    weekend: [
      "Day 1: arrive OAK, evening in Oakland or San Francisco",
      "Day 2: morning in the Bay Area, drive south via Half Moon Bay",
      "Afternoon: arrive Monterey — Aquarium or Cannery Row",
      "Thu, Sept 3: Carmel + Point Lobos + 17-Mile Drive",
      "Fri, Sept 4 — 2:00 PM · Ceremony at Carmel Mission Basilica",
      "Fri, Sept 4 — 5:00 PM · Reception at Fairview Laguna Seca",
    ],
  },
  MRY: {
    direct: [
      "Land at MRY — 15 minutes from downtown Monterey",
      "Pick up rental or arrange a short ride",
      "Check in, afternoon is completely yours",
      "Walk Cannery Row or drive the 17-Mile Drive",
    ],
    half: [
      "Land at MRY",
      "Lunch at Cannery Row or in Carmel",
      "Afternoon: Monterey Bay Aquarium or 17-Mile Drive",
      "Evening: sunset at the beach, dinner in Carmel",
    ],
    full: [
      "Thu, Sept 3 — Arrive MRY, coffee and breakfast in Carmel",
      "Mid-morning: Point Lobos State Reserve (arrive by 9 AM!)",
      "Lunch: Carmel — try Cultura Comida or Cantinetta Luca",
      "Afternoon: 17-Mile Drive through Pebble Beach",
      "Late afternoon: Cannery Row, sunset cocktails",
      "Evening: rest up for the wedding tomorrow",
      "Fri, Sept 4 — 2:00 PM · Ceremony at Carmel Mission Basilica",
      "Fri, Sept 4 — 5:00 PM · Reception at Fairview Laguna Seca",
    ],
    weekend: [
      "Day 1: arrive MRY, lunch in Carmel, evening at Cannery Row",
      "Day 2: Point Lobos morning + Carmel Valley wine tasting afternoon",
      "Thu, Sept 3: Big Sur day trip — Bixby Bridge, McWay Falls, Pfeiffer Beach",
      "Fri, Sept 4 — 2:00 PM · Ceremony at Carmel Mission Basilica",
      "Fri, Sept 4 — 5:00 PM · Reception at Fairview Laguna Seca",
    ],
  },
};

const SKIP_NOTES: Record<Airport, Record<TimeFrame, string>> = {
  SFO: {
    direct:  "Skip every stop en route — save Half Moon Bay and Santa Cruz for a future trip.",
    half:    "Skip San Francisco today. You'd need at least a full day to do it justice.",
    full:    "Skip Big Sur unless you're staying an extra day after the wedding. It takes half a day on its own.",
    weekend: "Skip the East Bay if time is tight — go straight from SFO to the coast.",
  },
  SJC: {
    direct:  "Skip Santa Cruz — the straight shot south is the right call today.",
    half:    "Skip San Francisco. The detour would eat your entire half day.",
    full:    "Skip Big Sur unless you have an extra full day. It deserves the time.",
    weekend: "Skip San Francisco — it's out of the way and adds 3+ hours of backtracking.",
  },
  OAK: {
    direct:  "Skip everything en route — budget the extra time for potential Bay Bridge traffic.",
    half:    "Skip San Francisco. You'd need a dedicated full day to experience it properly.",
    full:    "Skip the full coastal route if you want to reach Monterey before dinner.",
    weekend: "Skip trying to do both Oakland and San Francisco — pick one and explore it well.",
  },
  MRY: {
    direct:  "Nothing to skip — you're already here. Enjoy Monterey at your own pace.",
    half:    "Skip Big Sur today — save it for a full day. It deserves the time and focus.",
    full:    "Skip Carmel Valley unless food & wine is your main interest. Point Lobos is the better morning investment.",
    weekend: "Skip trying to do everything in one day. Point Lobos and Big Sur alone make for a memorable weekend.",
  },
};

// ── English LOCAL recommendation text ────────────────────────────────────────

const LOCAL_SUMMARIES_EN: Record<TimeFrame, string> = {
  direct:  "An easy drive from the Bay Area — 1.5 to 2.5 hours depending on where you're starting. Leave by 10–11 AM and you'll arrive in Carmel with time to spare before the 2 PM ceremony.",
  half:    "Heading down mid-morning gives you a clean run to Monterey with time for a quick Santa Cruz stop if you want it.",
  full:    "A classic Bay Area-to-Monterey drive. US-101 takes about 1.5–2.5 hours. You'll have all of Thursday to explore before the wedding on Friday.",
  weekend: "With a few days before the wedding, you can make a real trip of it. Stop in Santa Cruz or Half Moon Bay on the way down and spend a day or two in Monterey before Friday.",
};

const LOCAL_ITINERARIES_EN: Record<TimeFrame, string[]> = {
  direct: [
    "Leave Bay Area by 10:00–11:00 AM",
    "Drive US-101 S to Monterey (~1.5–2.5 hrs depending on traffic)",
    "Arrive Carmel by 12:30 PM — grab lunch on Ocean Avenue",
    "2:00 PM · Ceremony at Carmel Mission Basilica",
    "5:00 PM · Reception at Fairview Laguna Seca",
  ],
  half: [
    "Leave Bay Area mid-morning",
    "Optional: Santa Cruz stop for lunch (~45 min detour)",
    "Drive south to Monterey",
    "Arrive by early afternoon, check in, explore",
  ],
  full: [
    "Thu, Sept 3 — Leave Bay Area in the morning",
    "Optional stop: Santa Cruz for lunch (~45 min detour from US-101)",
    "Arrive Monterey by early-to-mid afternoon, check in",
    "Afternoon: Cannery Row, 17-Mile Drive, or Carmel",
    "Evening: dinner, rest up for the wedding",
    "Fri, Sept 4 — 2:00 PM · Ceremony at Carmel Mission Basilica",
    "Fri, Sept 4 — 5:00 PM · Reception at Fairview Laguna Seca",
  ],
  weekend: [
    "Day 1: drive south from Bay Area — optional stop at Half Moon Bay or Santa Cruz",
    "Arrive Monterey by afternoon, check in, explore Cannery Row",
    "Day 2: Carmel + 17-Mile Drive + Point Lobos",
    "Thu, Sept 3: Big Sur or Carmel Valley if time allows",
    "Fri, Sept 4 — 2:00 PM · Ceremony at Carmel Mission Basilica",
    "Fri, Sept 4 — 5:00 PM · Reception at Fairview Laguna Seca",
  ],
};

const LOCAL_SKIP_NOTES_EN: Record<TimeFrame, string> = {
  direct:  "Skip en-route stops today — save them for another trip south.",
  half:    "Skip San Francisco or Big Sur — neither fits a mid-morning drive.",
  full:    "Skip Santa Cruz if you're arriving in the afternoon — the extra stop adds an hour and a half. Head straight to Monterey.",
  weekend: "Skip trying to do everything on Day 1. Give yourself breathing room — the drive takes 1.5–2.5 hours.",
};

// ── English wedding-day content ───────────────────────────────────────────────

const WEDDING_DAY_SUMMARIES: Record<Airport, string> = {
  SFO: "The ceremony is at 2:00 PM at Carmel Mission Basilica — about two hours south. Leave by 10:30 AM at the latest to allow for traffic and a relaxed arrival. You'll have a beautiful morning to get ready.",
  SJC: "You're only 1.5 hours away — an easy morning drive. Leave by 11:00 AM and you'll have time for a coffee in Carmel before the 2:00 PM ceremony at Carmel Mission Basilica.",
  OAK: "Leave Oakland no later than 10:00 AM to allow for Bay Bridge traffic. You'll be in Carmel by 12:30 PM with time to breathe before the ceremony at Carmel Mission Basilica at 2:00 PM.",
  MRY: "You're already here — enjoy the morning. Take your time, get ready at your own pace, and soak it in. The ceremony is at 2:00 PM at Carmel Mission Basilica, just a short drive away.",
};

const WEDDING_DAY_ITINERARIES: Record<Airport, string[]> = {
  SFO: [
    "Leave SFO by 10:00–10:30 AM",
    "Drive US-101 S → CA-1 (~2 hours)",
    "Arrive Carmel by 12:30 PM — grab lunch on Ocean Avenue",
    "2:00 PM · Ceremony at Carmel Mission Basilica",
    "5:00 PM · Reception at Fairview Laguna Seca",
  ],
  SJC: [
    "Leave SJC by 11:00 AM",
    "Drive US-101 S (~1.5 hours)",
    "Arrive Carmel by 12:30 PM — coffee and a relaxed lunch",
    "2:00 PM · Ceremony at Carmel Mission Basilica",
    "5:00 PM · Reception at Fairview Laguna Seca",
  ],
  OAK: [
    "Leave Oakland by 10:00 AM (allow for Bay Bridge traffic)",
    "Drive I-880 S → US-101 S (~2.5 hours)",
    "Arrive Carmel by 12:30 PM — lunch on Ocean Avenue",
    "2:00 PM · Ceremony at Carmel Mission Basilica",
    "5:00 PM · Reception at Fairview Laguna Seca",
  ],
  MRY: [
    "Enjoy a relaxed morning at your hotel",
    "Breakfast in Carmel or Cannery Row",
    "Get ready, take in the coastal air",
    "2:00 PM · Ceremony at Carmel Mission Basilica",
    "5:00 PM · Reception at Fairview Laguna Seca",
  ],
};

// ── English arrival-time overrides (afternoon & evening) ─────────────────────
// Only needed for "full" and "weekend" timeframes — morning uses the base data above.

type OriginKey = Airport | "LOCAL";

const ARRIVAL_OVERRIDES_EN: Record<"afternoon" | "evening", {
  summary:     { full: Record<OriginKey, string>; weekend: Record<OriginKey, string> };
  itinerary:   { full: Record<OriginKey, string[]> };
  weekendDay1: Record<OriginKey, string>;
}> = {
  afternoon: {
    summary: {
      full: {
        SFO:   "Arriving in the afternoon, skip the coastal stops and drive direct — about 2 hours from SFO puts you in Monterey by 3–4 PM. A relaxed afternoon on Cannery Row, then rest up before the wedding.",
        SJC:   "Arriving in the afternoon from SJC means skipping Santa Cruz today — 1.5 hours straight to Monterey gets you there by 2–3 PM. Cannery Row for the afternoon, then rest up.",
        OAK:   "Head straight down from OAK in the afternoon, arriving in Monterey around 3–4 PM. Skip the Bay Area stops today and use the afternoon to explore before the wedding.",
        MRY:   "Arriving at MRY in the afternoon is genuinely great — you're in Monterey by early afternoon. The 17-Mile Drive or Carmel Beach makes for a perfect afternoon before the wedding tomorrow.",
        LOCAL: "Heading down in the afternoon means arriving in Monterey by 3–5 PM depending on Bay Area traffic. Skip en-route stops today and use the afternoon to check in and explore Cannery Row.",
      },
      weekend: {
        SFO:   "Afternoon arrival shortens Day 1 in San Francisco, but you've got enough time to grab dinner and explore before the coastal drive south tomorrow.",
        SJC:   "Afternoon arrival on Day 1 means a lighter Santa Cruz stop or skipping it — a quick diversion at most before settling in for the night.",
        OAK:   "Afternoon arrival shortens Day 1 in Oakland, but you've got multiple days ahead. Grab dinner and settle in — the real exploring starts tomorrow.",
        MRY:   "Afternoon arrival at MRY still gives you a solid afternoon — Carmel or Cannery Row, then settle in for the evening.",
        LOCAL: "Afternoon Day 1 means arriving with time for dinner and a walk. Not a bad way to start a Monterey getaway.",
      },
    },
    itinerary: {
      full: {
        SFO: [
          "Thu, Sept 3 — Drive from SFO direct to Monterey (~2 hrs, skip en-route stops today)",
          "Arrive by 3–4 PM, check in",
          "Afternoon: stroll Cannery Row or quick drive to Carmel",
          "Evening: dinner on the water, rest up",
          "Fri, Sept 4 — 2:00 PM · Ceremony at Carmel Mission Basilica",
          "Fri, Sept 4 — 5:00 PM · Reception at Fairview Laguna Seca",
        ],
        SJC: [
          "Thu, Sept 3 — Drive from SJC direct to Monterey (~1.5 hrs)",
          "Arrive by 1–3 PM, check in",
          "Afternoon: explore Cannery Row or head to Carmel",
          "Evening: dinner, rest up for the wedding",
          "Fri, Sept 4 — 2:00 PM · Ceremony at Carmel Mission Basilica",
          "Fri, Sept 4 — 5:00 PM · Reception at Fairview Laguna Seca",
        ],
        OAK: [
          "Thu, Sept 3 — Drive from OAK direct to Monterey (~2.5 hrs)",
          "Leave early enough to arrive by 3–4 PM",
          "Check in, afternoon walk on Cannery Row",
          "Evening: dinner, rest up for the wedding",
          "Fri, Sept 4 — 2:00 PM · Ceremony at Carmel Mission Basilica",
          "Fri, Sept 4 — 5:00 PM · Reception at Fairview Laguna Seca",
        ],
        MRY: [
          "Thu, Sept 3 — Arrive MRY in the afternoon",
          "Check in, freshen up",
          "Afternoon: 17-Mile Drive or stroll along Carmel Beach",
          "Evening: dinner in Carmel, rest up",
          "Fri, Sept 4 — 2:00 PM · Ceremony at Carmel Mission Basilica",
          "Fri, Sept 4 — 5:00 PM · Reception at Fairview Laguna Seca",
        ],
        LOCAL: [
          "Thu, Sept 3 — Drive down from Bay Area, arrive Monterey in the afternoon (~1.5–2.5 hrs)",
          "Check in, settle in",
          "Afternoon: Cannery Row stroll or quick drive to Carmel",
          "Evening: dinner, rest up for the wedding",
          "Fri, Sept 4 — 2:00 PM · Ceremony at Carmel Mission Basilica",
          "Fri, Sept 4 — 5:00 PM · Reception at Fairview Laguna Seca",
        ],
      },
    },
    weekendDay1: {
      SFO:   "Day 1 (afternoon): arrive SFO, head to the city for dinner — no full-day activities",
      SJC:   "Day 1 (afternoon): arrive SJC, quick Santa Cruz stop or head straight to Monterey",
      OAK:   "Day 1 (afternoon): arrive OAK, afternoon in Oakland, dinner in Temescal or Grand Lake",
      MRY:   "Day 1 (afternoon): arrive MRY, check in, afternoon on Cannery Row or a drive to Carmel",
      LOCAL: "Day 1 (afternoon): drive from Bay Area, arrive in Monterey, check in, explore Cannery Row",
    },
  },
  evening: {
    summary: {
      full: {
        SFO:   "Arriving from SFO in the evening — check in, dinner on Cannery Row, and an early night. The wedding is tomorrow at 2 PM and you'll be glad you saved your energy.",
        SJC:   "Heading straight from SJC and arriving in the evening — check in, grab dinner on Cannery Row or in Carmel, and rest up. The wedding is tomorrow.",
        OAK:   "Drive straight from OAK and arrive in the evening. Check in, dinner, and rest up — you want to feel fresh for the wedding tomorrow.",
        MRY:   "Arriving at MRY in the evening puts you right in Monterey. Walk Cannery Row as it lights up, find a good dinner, and rest up — the wedding is tomorrow.",
        LOCAL: "Arriving in the evening from the Bay Area — check in, Cannery Row for dinner, and an early night. The wedding is at 2 PM tomorrow.",
      },
      weekend: {
        SFO:   "Evening arrival means Day 1 is just about getting there. San Francisco is for another trip — get settled and hit the ground running tomorrow.",
        SJC:   "Day 1 is just about getting in. Drive down from SJC, settle in, and enjoy a quiet dinner. The exploring starts in earnest tomorrow.",
        OAK:   "Getting in on the evening of Day 1 means just dinner and settling in. Days 2 and 3 are where all the exploring happens.",
        MRY:   "Evening arrival at MRY is easy — you're already in Monterey. Cannery Row in the evening is lovely. Days ahead have all the sightseeing.",
        LOCAL: "Evening arrival means tonight is just settling in. Drive down, dinner, rest — the real exploring starts tomorrow.",
      },
    },
    itinerary: {
      full: {
        SFO: [
          "Thu, Sept 3 — Drive from SFO, arrive Monterey in the evening",
          "Check in, settle in",
          "Dinner: Cannery Row or a nearby restaurant",
          "Early night — the wedding is tomorrow",
          "Fri, Sept 4 — 2:00 PM · Ceremony at Carmel Mission Basilica",
          "Fri, Sept 4 — 5:00 PM · Reception at Fairview Laguna Seca",
        ],
        SJC: [
          "Thu, Sept 3 — Drive from SJC, arrive Monterey in the evening (~1.5 hrs)",
          "Check in, freshen up",
          "Dinner: Cannery Row or in Carmel",
          "Early night — the wedding is tomorrow",
          "Fri, Sept 4 — 2:00 PM · Ceremony at Carmel Mission Basilica",
          "Fri, Sept 4 — 5:00 PM · Reception at Fairview Laguna Seca",
        ],
        OAK: [
          "Thu, Sept 3 — Drive from OAK, arrive Monterey in the evening (~2.5 hrs)",
          "Check in, settle in",
          "Dinner: Cannery Row or a local spot",
          "Early night — the wedding is tomorrow",
          "Fri, Sept 4 — 2:00 PM · Ceremony at Carmel Mission Basilica",
          "Fri, Sept 4 — 5:00 PM · Reception at Fairview Laguna Seca",
        ],
        MRY: [
          "Thu, Sept 3 — Arrive MRY in the evening",
          "Check in",
          "Walk Cannery Row at dusk, dinner",
          "Early night — the wedding is tomorrow",
          "Fri, Sept 4 — 2:00 PM · Ceremony at Carmel Mission Basilica",
          "Fri, Sept 4 — 5:00 PM · Reception at Fairview Laguna Seca",
        ],
        LOCAL: [
          "Thu, Sept 3 — Drive from Bay Area, arrive Monterey in the evening",
          "Check in, settle in",
          "Dinner: Cannery Row or a nearby restaurant",
          "Early night — the wedding is tomorrow",
          "Fri, Sept 4 — 2:00 PM · Ceremony at Carmel Mission Basilica",
          "Fri, Sept 4 — 5:00 PM · Reception at Fairview Laguna Seca",
        ],
      },
    },
    weekendDay1: {
      SFO:   "Day 1 (evening): arrive SFO, check in to SF hotel, dinner and rest",
      SJC:   "Day 1 (evening): arrive SJC, drive to Monterey or Santa Cruz, settle in for the night",
      OAK:   "Day 1 (evening): arrive OAK, check in, dinner in Oakland — rest up",
      MRY:   "Day 1 (evening): arrive MRY, check in, walk Cannery Row at dusk, dinner",
      LOCAL: "Day 1 (evening): drive from Bay Area, arrive in the evening, dinner, settle in",
    },
  },
};

// ── Spanish recommendation text (morning arrivals / base) ─────────────────────

const SUMMARIES_ES: Record<Airport, Record<TimeFrame, string>> = {
  SFO: {
    direct:  "Ve directamente por la US-101 y estarás en Monterey en unas dos horas. No hagas paradas hoy — ahorra energía para la noche antes de la boda.",
    half:    "Half Moon Bay es la primera parada perfecta desde SFO. Camina por el sendero del acantilado, almuerza en Sam's Chowder House, y continúa al sur. Total con la parada: unas 3.5 horas.",
    full:    "Toma la ruta costera panorámica al sur. Half Moon Bay por la mañana, Santa Cruz para el almuerzo, y llega a Monterey a primera hora de la tarde.",
    weekend: "Aprovecha al máximo la ubicación de SFO. Una noche en San Francisco, luego la carretera costera hacia el sur por Half Moon Bay y Santa Cruz. Deja el viernes libre para la boda.",
  },
  SJC: {
    direct:  "SJC es el aeropuerto más conveniente para Monterey — unas 1.5 horas por la US-101. Trayecto fácil y llegarás con energía para acomodarte antes de la boda.",
    half:    "Santa Cruz es una parada natural desde SJC. Almuerza en Pacific Avenue, camina por el boardwalk, y continúa al sur por la Highway 1 hasta llegar a Monterey.",
    full:    "Disfruta Santa Cruz por la mañana, luego pasa la tarde en Carmel o Monterey. El Acuario es un excelente destino de tarde — reserva entradas con anticipación.",
    weekend: "SJC es ideal para un recorrido relajado a Monterey. Llega a Santa Cruz, explora Carmel y Monterey en los días siguientes, y deja el viernes libre para la boda.",
  },
  OAK: {
    direct:  "Toma la I-880 S hacia la US-101 S y estarás en Monterey en unas 2.5 horas. Sal temprano para evitar el tráfico del Bay Bridge.",
    half:    "Toma un café en Temescal (15 minutos del aeropuerto), luego toma la autopista al sur. Si vas adelantado, Santa Cruz es un buen desvío.",
    full:    "Pasa la mañana en Oakland o toma el BART a San Francisco unas horas, luego maneja al sur. La ruta costera por Half Moon Bay añade tiempo pero es hermosa.",
    weekend: "Pasa una noche en Oakland o San Francisco, maneja al sur al día siguiente, y tendrás mucho tiempo en Monterey sin prisa. Deja el viernes libre para la boda.",
  },
  MRY: {
    direct:  "Tomaste la mejor decisión de aeropuerto. Recoge tu auto, haz el check-in, y la tarde es completamente tuya. Cannery Row está a 15 minutos y Carmel a solo 20 minutos al sur.",
    half:    "Ve a Cannery Row para el almuerzo, luego pasa la tarde en el Acuario o por el 17-Mile Drive. Carmel está a 20 minutos al sur y vale la pena.",
    full:    "Empieza temprano en Point Lobos (llega antes de las 9 AM), almuerza en Carmel, tarde en el 17-Mile Drive, y termina con la puesta del sol en Cannery Row.",
    weekend: "Con un fin de semana completo desde MRY, toda la península es tuya. Point Lobos, catas de vino en Carmel Valley, Big Sur — tómate tu tiempo y deja el viernes para la boda.",
  },
};

const ITINERARIES_ES: Record<Airport, Record<TimeFrame, string[]>> = {
  SFO: {
    direct: [
      "Llegas a SFO → recoge el auto",
      "Maneja por la US-101 S o I-280 S hasta CA-1 (~2 horas)",
      "Llegas a Monterey, check-in",
      "Noche: camina por Cannery Row, cena junto al agua",
    ],
    half: [
      "Llegas a SFO → recoge el auto",
      "Maneja al sur por CA-1 hasta Half Moon Bay (~35 min)",
      "Camina por el sendero del acantilado, almuerza en Sam's Chowder House",
      "Continúa al sur a Santa Cruz o directo a Monterey",
    ],
    full: [
      "Jue, 3 Sep — Llegas a SFO, café opcional en la ciudad",
      "Manejas la pintoresca Highway 1 hacia el sur",
      "Media mañana: Half Moon Bay — sendero del acantilado, mercados de granjas",
      "Almuerzo: Santa Cruz — Pacific Ave o el Muelle",
      "Tarde: llegas a Monterey, check-in, descansas",
      "Noche: prepárate para la boda de mañana",
      "Vier, 4 Sep — 2:00 PM · Ceremonia en Carmel Mission Basilica",
      "Vier, 4 Sep — 5:00 PM · Recepción en Fairview Laguna Seca",
    ],
    weekend: [
      "Día 1: llegas a SFO, exploras San Francisco — Ferry Building, Golden Gate, vecindarios",
      "Noche 1: te quedas en San Francisco",
      "Día 2: manejas la costera Highway 1 al sur — Half Moon Bay, Santa Cruz",
      "Tarde: llegas a Monterey, Cannery Row, check-in",
      "Jue, 3 Sep: Carmel + 17-Mile Drive + Point Lobos",
      "Vier, 4 Sep — 2:00 PM · Ceremonia en Carmel Mission Basilica",
      "Vier, 4 Sep — 5:00 PM · Recepción en Fairview Laguna Seca",
    ],
  },
  SJC: {
    direct: [
      "Llegas a SJC → recoge el auto",
      "Maneja por la US-101 S (~1.5 horas)",
      "Llegas a Monterey, check-in",
      "Explora a tu ritmo antes de la boda mañana",
    ],
    half: [
      "Llegas a SJC → recoge el auto",
      "Maneja por CA-17 hasta Santa Cruz (~45 min)",
      "Almuerzo en Pacific Avenue o el Muelle",
      "Pasea por el boardwalk y la playa",
      "Maneja CA-1 S hasta Monterey (~45 min)",
    ],
    full: [
      "Jue, 3 Sep — Llegas a SJC",
      "Manejas a Santa Cruz — exploras, almuerzas, tiempo en la playa",
      "Primera tarde: continúas a Monterey",
      "Tarde: Acuario de la Bahía de Monterey (¡reserva!) o Cannery Row",
      "Noche: cena junto al agua, descansas",
      "Vier, 4 Sep — 2:00 PM · Ceremonia en Carmel Mission Basilica",
      "Vier, 4 Sep — 5:00 PM · Recepción en Fairview Laguna Seca",
    ],
    weekend: [
      "Día 1: Santa Cruz — tarde y noche",
      "Día 2: mañana en Carmel, café + galerías",
      "Tarde: 17-Mile Drive por Pebble Beach",
      "Noche: cena en Carmel Valley",
      "Jue, 3 Sep: caminata matutina en Point Lobos",
      "Vier, 4 Sep — 2:00 PM · Ceremonia en Carmel Mission Basilica",
      "Vier, 4 Sep — 5:00 PM · Recepción en Fairview Laguna Seca",
    ],
  },
  OAK: {
    direct: [
      "Llegas a OAK → recoge el auto",
      "Maneja por I-880 S hasta US-101 S (~2.5 horas)",
      "Sal temprano para evitar el tráfico del Bay Bridge",
      "Llegas a Monterey, check-in, descansas",
    ],
    half: [
      "Llegas a OAK → café en Temescal (15 min del aeropuerto)",
      "Maneja I-880 S → US-101 S hacia el sur",
      "Opcional: desvío a Santa Cruz si vas adelantado",
      "Llegas a Monterey, check-in, exploras Cannery Row",
    ],
    full: [
      "Jue, 3 Sep — Llegas a OAK, exploras Temescal o tomas el BART a San Francisco",
      "Mediodía: almuerzo en Oakland o el Ferry Building en SF",
      "Primera tarde: manejas al sur por la US-101 o la costera Highway 1",
      "Llegas a Monterey a primera hora de la noche, check-in",
      "Noche: prepárate para la boda de mañana",
      "Vier, 4 Sep — 2:00 PM · Ceremonia en Carmel Mission Basilica",
      "Vier, 4 Sep — 5:00 PM · Recepción en Fairview Laguna Seca",
    ],
    weekend: [
      "Día 1: llegas a OAK, noche en Oakland o San Francisco",
      "Día 2: mañana en el Bay Area, manejas al sur por Half Moon Bay",
      "Tarde: llegas a Monterey — Acuario o Cannery Row",
      "Jue, 3 Sep: Carmel + Point Lobos + 17-Mile Drive",
      "Vier, 4 Sep — 2:00 PM · Ceremonia en Carmel Mission Basilica",
      "Vier, 4 Sep — 5:00 PM · Recepción en Fairview Laguna Seca",
    ],
  },
  MRY: {
    direct: [
      "Llegas a MRY — 15 minutos del centro de Monterey",
      "Recoge el auto o arregla transporte corto",
      "Check-in, la tarde es completamente tuya",
      "Camina por Cannery Row o maneja el 17-Mile Drive",
    ],
    half: [
      "Llegas a MRY",
      "Almuerzo en Cannery Row o en Carmel",
      "Tarde: Acuario de la Bahía de Monterey o 17-Mile Drive",
      "Noche: atardecer en la playa, cena en Carmel",
    ],
    full: [
      "Jue, 3 Sep — Llegas a MRY, café y desayuno en Carmel",
      "Media mañana: Reserva Estatal de Point Lobos (¡llega antes de las 9 AM!)",
      "Almuerzo: Carmel — prueba Cultura Comida o Cantinetta Luca",
      "Tarde: 17-Mile Drive por Pebble Beach",
      "Última tarde: Cannery Row, cócteles al atardecer",
      "Noche: prepárate para la boda de mañana",
      "Vier, 4 Sep — 2:00 PM · Ceremonia en Carmel Mission Basilica",
      "Vier, 4 Sep — 5:00 PM · Recepción en Fairview Laguna Seca",
    ],
    weekend: [
      "Día 1: llegas a MRY, almuerzo en Carmel, noche en Cannery Row",
      "Día 2: mañana en Point Lobos + cata de vinos en Carmel Valley por la tarde",
      "Jue, 3 Sep: excursión a Big Sur — Bixby Bridge, McWay Falls, Playa Pfeiffer",
      "Vier, 4 Sep — 2:00 PM · Ceremonia en Carmel Mission Basilica",
      "Vier, 4 Sep — 5:00 PM · Recepción en Fairview Laguna Seca",
    ],
  },
};

const SKIP_NOTES_ES: Record<Airport, Record<TimeFrame, string>> = {
  SFO: {
    direct:  "Omite todas las paradas en el camino — guarda Half Moon Bay y Santa Cruz para otro viaje.",
    half:    "Omite San Francisco por hoy. Necesitarías al menos un día completo para disfrutarla.",
    full:    "Omite Big Sur a menos que te quedes un día extra después de la boda.",
    weekend: "Omite el East Bay si el tiempo es limitado — ve directo de SFO a la costa.",
  },
  SJC: {
    direct:  "Omite Santa Cruz — el trayecto directo al sur es la decisión correcta hoy.",
    half:    "Omite San Francisco. El desvío consumiría todo tu medio día.",
    full:    "Omite Big Sur a menos que tengas un día completo extra.",
    weekend: "Omite San Francisco — está fuera del camino y añade más de 3 horas de desvío.",
  },
  OAK: {
    direct:  "Omite todo en el camino — planifica tiempo extra para posible tráfico en el Bay Bridge.",
    half:    "Omite San Francisco. Necesitarías un día dedicado para vivirla bien.",
    full:    "Omite la ruta costera completa si quieres llegar a Monterey antes de cenar.",
    weekend: "Omite intentar hacer Oakland y San Francisco — elige una y explórala bien.",
  },
  MRY: {
    direct:  "Nada que omitir — ya estás aquí. Disfruta Monterey a tu propio ritmo.",
    half:    "Omite Big Sur hoy — guárdalo para un día completo.",
    full:    "Omite Carmel Valley a menos que la comida y el vino sean tu principal interés.",
    weekend: "Omite intentar hacer todo en un día. Point Lobos y Big Sur solos hacen un fin de semana memorable.",
  },
};

// ── Spanish LOCAL recommendation text ────────────────────────────────────────

const LOCAL_SUMMARIES_ES: Record<TimeFrame, string> = {
  direct:  "Un trayecto fácil desde el Bay Area — 1.5 a 2.5 horas según de dónde salgas. Sal entre las 10–11 AM y llegarás a Carmel con tiempo de sobra antes de la ceremonia de las 2 PM.",
  half:    "Ir a media mañana te da un trayecto limpio a Monterey con tiempo para una parada rápida en Santa Cruz si quieres.",
  full:    "Un clásico trayecto del Bay Area a Monterey. La US-101 toma unas 1.5–2.5 horas. Tendrás todo el jueves para explorar antes de la boda del viernes.",
  weekend: "Con unos días antes de la boda, puedes hacer un viaje de verdad. Para en Santa Cruz o Half Moon Bay en el camino y pasa un día o dos en Monterey antes del viernes.",
};

const LOCAL_ITINERARIES_ES: Record<TimeFrame, string[]> = {
  direct: [
    "Sale del Bay Area entre las 10:00–11:00 AM",
    "Maneja por la US-101 S a Monterey (~1.5–2.5 horas según el tráfico)",
    "Llega a Carmel a las 12:30 PM — almuerza en Ocean Avenue",
    "2:00 PM · Ceremonia en Carmel Mission Basilica",
    "5:00 PM · Recepción en Fairview Laguna Seca",
  ],
  half: [
    "Sale del Bay Area a media mañana",
    "Opcional: parada en Santa Cruz para almorzar (~45 min de desvío)",
    "Maneja al sur hasta Monterey",
    "Llega a primera hora de la tarde, check-in, explora",
  ],
  full: [
    "Jue, 3 Sep — Sale del Bay Area por la mañana",
    "Parada opcional: Santa Cruz para almorzar (~45 min de desvío desde US-101)",
    "Llega a Monterey a primera hora de la tarde, check-in",
    "Tarde: Cannery Row, 17-Mile Drive o Carmel",
    "Noche: cena, descansa para la boda",
    "Vier, 4 Sep — 2:00 PM · Ceremonia en Carmel Mission Basilica",
    "Vier, 4 Sep — 5:00 PM · Recepción en Fairview Laguna Seca",
  ],
  weekend: [
    "Día 1: maneja al sur desde el Bay Area — parada opcional en Half Moon Bay o Santa Cruz",
    "Llega a Monterey por la tarde, check-in, explora Cannery Row",
    "Día 2: Carmel + 17-Mile Drive + Point Lobos",
    "Jue, 3 Sep: Big Sur o Carmel Valley si hay tiempo",
    "Vier, 4 Sep — 2:00 PM · Ceremonia en Carmel Mission Basilica",
    "Vier, 4 Sep — 5:00 PM · Recepción en Fairview Laguna Seca",
  ],
};

const LOCAL_SKIP_NOTES_ES: Record<TimeFrame, string> = {
  direct:  "Omite las paradas en el camino hoy — guárdalas para otro viaje al sur.",
  half:    "Omite San Francisco o Big Sur — ninguno cabe en un trayecto de media mañana.",
  full:    "Omite Santa Cruz si llegas en la tarde — la parada extra añade hora y media. Ve directo a Monterey.",
  weekend: "Omite intentar hacer todo en el Día 1. Date margen — el trayecto toma 1.5–2.5 horas.",
};

// ── Spanish wedding-day content ───────────────────────────────────────────────

const WEDDING_DAY_SUMMARIES_ES: Record<Airport, string> = {
  SFO: "La ceremonia es a las 2:00 PM en la Carmel Mission Basilica — unas dos horas al sur. Sal a más tardar a las 10:30 AM para tener margen con el tráfico y llegar relajado.",
  SJC: "Estás a solo 1.5 horas — un trayecto matutino fácil. Sal a las 11:00 AM y tendrás tiempo para un café en Carmel antes de la ceremonia de las 2:00 PM.",
  OAK: "Sal de Oakland antes de las 10:00 AM para tener margen con el tráfico del Bay Bridge. Estarás en Carmel a las 12:30 PM con tiempo para respirar antes de la ceremonia a las 2:00 PM.",
  MRY: "Ya estás aquí — disfruta la mañana. Tómate tu tiempo, arréglate a tu ritmo, y absórbelo todo. La ceremonia es a las 2:00 PM en la Carmel Mission Basilica, a solo unos minutos.",
};

const WEDDING_DAY_ITINERARIES_ES: Record<Airport, string[]> = {
  SFO: [
    "Sal de SFO entre las 10:00–10:30 AM",
    "Maneja por la US-101 S → CA-1 (~2 horas)",
    "Llega a Carmel a las 12:30 PM — almuerza en Ocean Avenue",
    "2:00 PM · Ceremonia en Carmel Mission Basilica",
    "5:00 PM · Recepción en Fairview Laguna Seca",
  ],
  SJC: [
    "Sal de SJC a las 11:00 AM",
    "Maneja por la US-101 S (~1.5 horas)",
    "Llega a Carmel a las 12:30 PM — café y almuerzo tranquilo",
    "2:00 PM · Ceremonia en Carmel Mission Basilica",
    "5:00 PM · Recepción en Fairview Laguna Seca",
  ],
  OAK: [
    "Sal de Oakland antes de las 10:00 AM (considera el tráfico del Bay Bridge)",
    "Maneja por la I-880 S → US-101 S (~2.5 horas)",
    "Llega a Carmel a las 12:30 PM — almuerza en Ocean Avenue",
    "2:00 PM · Ceremonia en Carmel Mission Basilica",
    "5:00 PM · Recepción en Fairview Laguna Seca",
  ],
  MRY: [
    "Disfruta una mañana tranquila en tu hotel",
    "Desayuno en Carmel o Cannery Row",
    "Arréglate y disfruta el aire costero",
    "2:00 PM · Ceremonia en Carmel Mission Basilica",
    "5:00 PM · Recepción en Fairview Laguna Seca",
  ],
};

// ── Spanish arrival-time overrides ────────────────────────────────────────────

const ARRIVAL_OVERRIDES_ES: Record<"afternoon" | "evening", {
  summary:     { full: Record<OriginKey, string>; weekend: Record<OriginKey, string> };
  itinerary:   { full: Record<OriginKey, string[]> };
  weekendDay1: Record<OriginKey, string>;
}> = {
  afternoon: {
    summary: {
      full: {
        SFO:   "Al llegar en la tarde, saltarás las paradas costeras y manejarás directo — unas 2 horas desde SFO. Llegarás a Monterey hacia las 3–4 PM con una tarde relajada antes de la boda.",
        SJC:   "Llegar en la tarde desde SJC significa saltarte Santa Cruz hoy — 1.5 horas directo a Monterey te llevan para las 2–3 PM. Cannery Row en la tarde, luego descansas.",
        OAK:   "Ve directo desde OAK en la tarde, llegando a Monterey hacia las 3–4 PM. Salta las paradas del Bay Area hoy y usa la tarde para explorar antes de la boda.",
        MRY:   "Llegar a MRY en la tarde es perfecto — estás en Monterey a primera hora de la tarde. El 17-Mile Drive o la Playa de Carmel son actividades ideales antes de la boda mañana.",
        LOCAL: "Bajar en la tarde significa llegar a Monterey entre las 3–5 PM según el tráfico del Bay Area. Salta las paradas en el camino hoy y usa la tarde para hacer check-in y explorar.",
      },
      weekend: {
        SFO:   "La llegada de tarde acorta el Día 1 en San Francisco, pero tienes suficiente tiempo para cenar y acomodarte antes del trayecto costero al sur mañana.",
        SJC:   "Llegada de tarde en el Día 1 significa una parada más corta en Santa Cruz o saltarla — un breve desvío antes de tu primera noche.",
        OAK:   "La llegada de tarde acorta el Día 1 en Oakland, pero tienes varios días por delante. Cena y acomodate — la exploración real comienza mañana.",
        MRY:   "La llegada de tarde en MRY todavía te da una sólida tarde — Carmel o Cannery Row, luego te acomodas para la noche.",
        LOCAL: "La llegada de tarde en el Día 1 significa que llegas con tiempo para cenar y dar una caminata. No está mal para comenzar una escapada a Monterey.",
      },
    },
    itinerary: {
      full: {
        SFO: [
          "Jue, 3 Sep — Manejas desde SFO directo a Monterey (~2 hrs, sin paradas en el camino)",
          "Llegas hacia las 3–4 PM, check-in",
          "Tarde: paseas por Cannery Row o viaje rápido a Carmel",
          "Noche: cena junto al agua, descansas",
          "Vier, 4 Sep — 2:00 PM · Ceremonia en Carmel Mission Basilica",
          "Vier, 4 Sep — 5:00 PM · Recepción en Fairview Laguna Seca",
        ],
        SJC: [
          "Jue, 3 Sep — Manejas desde SJC directo a Monterey (~1.5 hrs)",
          "Llegas hacia la 1–3 PM, check-in",
          "Tarde: exploras Cannery Row o vas a Carmel",
          "Noche: cena, descansas para la boda",
          "Vier, 4 Sep — 2:00 PM · Ceremonia en Carmel Mission Basilica",
          "Vier, 4 Sep — 5:00 PM · Recepción en Fairview Laguna Seca",
        ],
        OAK: [
          "Jue, 3 Sep — Manejas desde OAK directo a Monterey (~2.5 hrs)",
          "Sal con tiempo para llegar hacia las 3–4 PM",
          "Check-in, paseo vespertino por Cannery Row",
          "Noche: cena, descansas para la boda",
          "Vier, 4 Sep — 2:00 PM · Ceremonia en Carmel Mission Basilica",
          "Vier, 4 Sep — 5:00 PM · Recepción en Fairview Laguna Seca",
        ],
        MRY: [
          "Jue, 3 Sep — Llegas a MRY en la tarde",
          "Check-in, refréscate",
          "Tarde: 17-Mile Drive o paseo en la Playa de Carmel",
          "Noche: cena en Carmel, descansas",
          "Vier, 4 Sep — 2:00 PM · Ceremonia en Carmel Mission Basilica",
          "Vier, 4 Sep — 5:00 PM · Recepción en Fairview Laguna Seca",
        ],
        LOCAL: [
          "Jue, 3 Sep — Bajas desde el Bay Area, llegas a Monterey en la tarde",
          "Check-in, acomodate",
          "Tarde: Cannery Row o viaje rápido a Carmel",
          "Noche: cena, descansas para la boda",
          "Vier, 4 Sep — 2:00 PM · Ceremonia en Carmel Mission Basilica",
          "Vier, 4 Sep — 5:00 PM · Recepción en Fairview Laguna Seca",
        ],
      },
    },
    weekendDay1: {
      SFO:   "Día 1 (tarde): llegas a SFO, te diriges a la ciudad para cenar — sin actividades de día completo",
      SJC:   "Día 1 (tarde): llegas a SJC, parada corta en Santa Cruz o vas directo a Monterey",
      OAK:   "Día 1 (tarde): llegas a OAK, tarde en Oakland, cena en Temescal o Grand Lake",
      MRY:   "Día 1 (tarde): llegas a MRY, check-in, tarde en Cannery Row o vas a Carmel",
      LOCAL: "Día 1 (tarde): manejas desde el Bay Area, llegas a Monterey, check-in, exploras Cannery Row",
    },
  },
  evening: {
    summary: {
      full: {
        SFO:   "Llegando desde SFO en la noche — check-in, cena en Cannery Row y acostarse temprano. La boda es mañana a las 2 PM y agradecerás haber guardado energías.",
        SJC:   "Yendo directo desde SJC y llegando en la noche — check-in, cena en Cannery Row o en Carmel, y descansa. La boda es mañana.",
        OAK:   "Maneja directo desde OAK y llega en la noche. Check-in, cena y descanso — quieres sentirte fresco para la boda mañana.",
        MRY:   "Llegar a MRY en la noche te pone directo en Monterey. Camina por Cannery Row mientras se ilumina, encuentra un buen restaurante y descansa — la boda es mañana.",
        LOCAL: "Llegando en la noche desde el Bay Area — check-in, cena en Cannery Row y acostarse temprano. La boda es a las 2 PM mañana.",
      },
      weekend: {
        SFO:   "La llegada nocturna significa que el Día 1 es solo de llegar. San Francisco es para otro viaje — acomodate y empieza a explorar mañana.",
        SJC:   "El Día 1 es solo de llegar. Baja desde SJC, acomodate y disfruta una cena tranquila. La exploración comienza en serio mañana.",
        OAK:   "Llegar en la noche del Día 1 significa solo cena y acomodarse. Los Días 2 y 3 son para toda la exploración.",
        MRY:   "La llegada nocturna en MRY es fácil — ya estás en Monterey. Cannery Row de noche es precioso. Los días siguientes tienen todo el turismo.",
        LOCAL: "La llegada nocturna significa que esta noche es solo de acomodarse. Baja, cena, descansa — la exploración real comienza mañana.",
      },
    },
    itinerary: {
      full: {
        SFO: [
          "Jue, 3 Sep — Manejas desde SFO, llegas a Monterey en la noche",
          "Check-in, acomodate",
          "Cena: Cannery Row o un restaurante cercano",
          "Noche temprana — la boda es mañana",
          "Vier, 4 Sep — 2:00 PM · Ceremonia en Carmel Mission Basilica",
          "Vier, 4 Sep — 5:00 PM · Recepción en Fairview Laguna Seca",
        ],
        SJC: [
          "Jue, 3 Sep — Manejas desde SJC, llegas a Monterey en la noche (~1.5 hrs)",
          "Check-in, refréscate",
          "Cena: Cannery Row o en Carmel",
          "Noche temprana — la boda es mañana",
          "Vier, 4 Sep — 2:00 PM · Ceremonia en Carmel Mission Basilica",
          "Vier, 4 Sep — 5:00 PM · Recepción en Fairview Laguna Seca",
        ],
        OAK: [
          "Jue, 3 Sep — Manejas desde OAK, llegas a Monterey en la noche (~2.5 hrs)",
          "Check-in, acomodate",
          "Cena: Cannery Row o un lugar local",
          "Noche temprana — la boda es mañana",
          "Vier, 4 Sep — 2:00 PM · Ceremonia en Carmel Mission Basilica",
          "Vier, 4 Sep — 5:00 PM · Recepción en Fairview Laguna Seca",
        ],
        MRY: [
          "Jue, 3 Sep — Llegas a MRY en la noche",
          "Check-in",
          "Caminas por Cannery Row al atardecer, cenas",
          "Noche temprana — la boda es mañana",
          "Vier, 4 Sep — 2:00 PM · Ceremonia en Carmel Mission Basilica",
          "Vier, 4 Sep — 5:00 PM · Recepción en Fairview Laguna Seca",
        ],
        LOCAL: [
          "Jue, 3 Sep — Bajas desde el Bay Area, llegas a Monterey en la noche",
          "Check-in, acomodate",
          "Cena: Cannery Row o un restaurante cercano",
          "Noche temprana — la boda es mañana",
          "Vier, 4 Sep — 2:00 PM · Ceremonia en Carmel Mission Basilica",
          "Vier, 4 Sep — 5:00 PM · Recepción en Fairview Laguna Seca",
        ],
      },
    },
    weekendDay1: {
      SFO:   "Día 1 (noche): llegas a SFO, check-in en hotel de SF, cena y descanso",
      SJC:   "Día 1 (noche): llegas a SJC, manejas a Monterey o Santa Cruz, te acomodas para la noche",
      OAK:   "Día 1 (noche): llegas a OAK, check-in, cena en Oakland — descanso",
      MRY:   "Día 1 (noche): llegas a MRY, check-in, caminas por Cannery Row al atardecer, cenas",
      LOCAL: "Día 1 (noche): bajas desde el Bay Area, llegas en la noche, cenas, te acomodas",
    },
  },
};

// ── Recommendation builder ────────────────────────────────────────────────────

export function getRecommendation(
  origin: Origin,
  arrivalDate: string,
  interests: Interest[],
  locale?: string,
  arrivalTime?: ArrivalTime,
): Recommendation {
  const es = locale === "es";

  // ── LOCAL (Bay Area) path ──────────────────────────────────────────────────
  if (origin === "LOCAL") {
    const driveTime = LOCAL_PROFILE.driveTime;
    if (arrivalDate >= WEDDING_DATE) {
      return {
        driveTime,
        summary: es ? LOCAL_SUMMARIES_ES.direct : LOCAL_SUMMARIES_EN.direct,
        stops: [],
        itinerary: es ? LOCAL_ITINERARIES_ES.direct : LOCAL_ITINERARIES_EN.direct,
        skipNote: "",
        isWeddingDay: true,
      };
    }

    const timeFrame = arrivalToTimeFrame(arrivalDate);
    const overrides = es ? ARRIVAL_OVERRIDES_ES : ARRIVAL_OVERRIDES_EN;

    if ((arrivalTime === "afternoon" || arrivalTime === "evening") && timeFrame === "full") {
      return {
        driveTime,
        summary: overrides[arrivalTime].summary.full.LOCAL,
        stops: [],
        itinerary: overrides[arrivalTime].itinerary.full.LOCAL,
        skipNote: "",
        isWeddingDay: false,
      };
    }

    // weekend with non-morning arrival: modify Day 1
    const baseItinerary = es ? LOCAL_ITINERARIES_ES[timeFrame] : LOCAL_ITINERARIES_EN[timeFrame];
    let itinerary = baseItinerary;
    let summary = es ? LOCAL_SUMMARIES_ES[timeFrame] : LOCAL_SUMMARIES_EN[timeFrame];

    if (timeFrame === "weekend" && (arrivalTime === "afternoon" || arrivalTime === "evening")) {
      const day1 = overrides[arrivalTime].weekendDay1.LOCAL;
      itinerary = [day1, ...baseItinerary.slice(1)];
      summary = overrides[arrivalTime].summary.weekend.LOCAL;
    }

    // Filter places for LOCAL (same as MRY area + en-route)
    let places = ALL_PLACES.filter(p => p.region !== "bay-area");
    if (timeFrame === "full") places = places.filter(p => p.region !== "extended");
    if (arrivalTime === "evening") places = [];
    if (interests.length > 0) {
      places.sort((a, b) =>
        b.interests.filter(i => interests.includes(i)).length -
        a.interests.filter(i => interests.includes(i)).length
      );
    }

    return {
      driveTime,
      summary,
      stops: places.slice(0, timeFrame === "full" ? 4 : 5),
      itinerary,
      skipNote: es ? LOCAL_SKIP_NOTES_ES[timeFrame] : LOCAL_SKIP_NOTES_EN[timeFrame],
      isWeddingDay: false,
    };
  }

  // ── Airport path ──────────────────────────────────────────────────────────
  const airport = origin;
  const profile = AIRPORT_PROFILES[airport];

  if (arrivalDate >= WEDDING_DATE) {
    return {
      driveTime: profile.driveTime,
      summary: es ? WEDDING_DAY_SUMMARIES_ES[airport] : WEDDING_DAY_SUMMARIES[airport],
      stops: [],
      itinerary: es ? WEDDING_DAY_ITINERARIES_ES[airport] : WEDDING_DAY_ITINERARIES[airport],
      skipNote: "",
      isWeddingDay: true,
    };
  }

  const timeFrame = arrivalToTimeFrame(arrivalDate);
  const overrides = es ? ARRIVAL_OVERRIDES_ES : ARRIVAL_OVERRIDES_EN;

  if ((arrivalTime === "afternoon" || arrivalTime === "evening") && timeFrame === "full") {
    return {
      driveTime: profile.driveTime,
      summary: overrides[arrivalTime].summary.full[airport],
      stops: arrivalTime === "evening" ? [] : filterPlaces(airport, timeFrame, interests, 2),
      itinerary: overrides[arrivalTime].itinerary.full[airport],
      skipNote: "",
      isWeddingDay: false,
    };
  }

  const baseSummaries = es ? SUMMARIES_ES : SUMMARIES;
  const baseItineraries = es ? ITINERARIES_ES : ITINERARIES;
  const baseSkipNotes = es ? SKIP_NOTES_ES : SKIP_NOTES;

  let summary = baseSummaries[airport][timeFrame];
  let itinerary = baseItineraries[airport][timeFrame];

  if (timeFrame === "weekend" && (arrivalTime === "afternoon" || arrivalTime === "evening")) {
    summary = overrides[arrivalTime].summary.weekend[airport];
    const day1 = overrides[arrivalTime].weekendDay1[airport];
    itinerary = [day1, ...baseItineraries[airport][timeFrame].slice(1)];
  }

  const maxStops = timeFrame === "full" ? 4 : 5;
  const stops = arrivalTime === "evening" ? [] : filterPlaces(airport, timeFrame, interests, maxStops);

  return {
    driveTime: profile.driveTime,
    summary,
    stops,
    itinerary,
    skipNote: baseSkipNotes[airport][timeFrame],
    isWeddingDay: false,
  };
}

function filterPlaces(airport: Airport, timeFrame: TimeFrame, interests: Interest[], max: number): Place[] {
  let places = ALL_PLACES.filter(p => p.airports.includes(airport));
  if (airport === "MRY") places = places.filter(p => p.region !== "bay-area" && p.region !== "en-route");
  if (timeFrame === "full") places = places.filter(p => p.region !== "extended");
  if (interests.length > 0) {
    places.sort((a, b) =>
      b.interests.filter(i => interests.includes(i)).length -
      a.interests.filter(i => interests.includes(i)).length
    );
  }
  return places.slice(0, max);
}

// ── Browse-all groupings ──────────────────────────────────────────────────────

export const BROWSE_GROUPS: {
  label: string; labelEs?: string;
  region: Region;
  sublabel: string; sublabelEs?: string;
}[] = [
  { label: "Monterey & Carmel",  labelEs: "Monterey y Carmel",       region: "monterey-carmel", sublabel: "The heart of the trip",                                sublabelEs: "El corazón del viaje" },
  { label: "Along the Way",      labelEs: "En el Camino",             region: "en-route",        sublabel: "Great stops en route from Bay Area airports",          sublabelEs: "Excelentes paradas desde los aeropuertos del Bay Area" },
  { label: "Bay Area Ideas",     labelEs: "Ideas en el Bay Area",     region: "bay-area",        sublabel: "If you have time before heading south",                sublabelEs: "Si tienes tiempo antes de ir al sur" },
  { label: "Extended Weekend",   labelEs: "Fin de Semana Extendido",  region: "extended",        sublabel: "Worth every minute if you can make it",               sublabelEs: "Vale cada minuto si puedes hacerlo" },
];

export function getPlacesByRegion(region: Region): Place[] {
  return ALL_PLACES.filter(p => p.region === region);
}
