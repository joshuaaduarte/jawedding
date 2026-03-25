"use client";

import { useState } from "react";
import Image from "next/image";
import { PHOTOS } from "@/lib/photos";
import type { Airport, ArrivalTime, DepartureTime, Interest, Origin, Place } from "@/lib/travel-data";
import {
  AIRPORT_PROFILES,
  LOCAL_PROFILE,
  ARRIVAL_DATES,
  DEPARTURE_DATES,
  ARRIVAL_TIMES,
  DEPARTURE_TIMES,
  WEDDING_DATE,
  INTERESTS,
  getRecommendation,
} from "@/lib/travel-data";

// ── Primitives ────────────────────────────────────────────────────────────────

function StepLabel({ number, label }: { number: number; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium"
        style={{ background: "#2d1f14", color: "#fbf4e8" }}
      >
        {number}
      </span>
      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "#2d1f14" }}>
        {label}
      </p>
    </div>
  );
}

function SelectButton({
  label, sublabel, active, onClick,
}: {
  label: string; sublabel?: string; active: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button" onClick={onClick}
      className="flex flex-col items-start rounded-xl px-4 py-3 text-left transition-all"
      style={active
        ? { background: "#2d1f14", border: "1px solid #2d1f14" }
        : { background: "transparent", border: "1px solid #e8ddd4" }}
    >
      <span className="text-sm font-medium" style={{ color: active ? "#fbf4e8" : "#3d2b1f" }}>
        {label}
      </span>
      {sublabel && (
        <span className="mt-0.5 text-[11px] leading-tight"
          style={{ color: active ? "rgba(251,244,232,0.6)" : "#a08060" }}>
          {sublabel}
        </span>
      )}
    </button>
  );
}

function InterestToggle({
  label, icon, active, onClick,
}: {
  label: string; icon: string; active: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button" onClick={onClick}
      className="flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.14em] transition-all"
      style={active
        ? { background: "rgba(201,160,160,0.18)", border: "1px solid #c9a0a0", color: "#2d1f14" }
        : { background: "transparent", border: "1px solid #e8ddd4", color: "#8a7060" }}
    >
      <span style={{ color: active ? "#c9a0a0" : "#c9b8a8" }} aria-hidden>{icon}</span>
      {label}
    </button>
  );
}

function PlaceCard({ place, highlighted, locale }: { place: Place; highlighted: boolean; locale: string }) {
  const imgSrc = PHOTOS[place.imageKey as keyof typeof PHOTOS] ?? PHOTOS.coast;
  const tagline = locale === "es" && place.taglineEs ? place.taglineEs : place.tagline;
  return (
    <article
      className="overflow-hidden rounded-2xl transition-all"
      style={{ border: highlighted ? "1px solid rgba(201,160,160,0.5)" : "1px solid #e8ddd4" }}
    >
      <div className="relative h-36 w-full">
        <Image src={imgSrc} alt={place.name} fill className="object-cover" />
        <span
          className="absolute right-2.5 top-2.5 rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] backdrop-blur-sm"
          style={{ background: "rgba(20,10,5,0.55)", color: "rgba(251,244,232,0.9)" }}
        >
          {place.timeNeeded}
        </span>
      </div>
      <div className="p-4"
        style={{ background: highlighted ? "rgba(201,160,160,0.06)" : "rgba(251,244,232,0.4)" }}>
        <h4 className="font-serif text-base leading-tight" style={{ color: "#2d1f14" }}>
          {place.name}
        </h4>
        <p className="mt-0.5 text-xs" style={{ color: "#c9a0a0" }}>{tagline}</p>
      </div>
    </article>
  );
}

// ── Results panel ─────────────────────────────────────────────────────────────

function RecommendationResults({
  origin, arrivalDate, arrivalTime, departureDate, departureTime, interests, locale,
}: {
  origin: Origin;
  arrivalDate: string;
  arrivalTime: ArrivalTime | null;
  departureDate: string | null;
  departureTime: DepartureTime | null;
  interests: Interest[];
  locale: string;
}) {
  const es = locale === "es";
  const rec = getRecommendation(origin, arrivalDate, interests, locale, arrivalTime ?? undefined);
  const hasPostWeddingTime = departureDate !== null && departureDate > WEDDING_DATE;

  const ui = es ? {
    weddingDay: "Día de la boda",
    yourPlan: "Tu plan",
    toMonterey: "a Monterey",
    recommendedStops: "Paradas recomendadas",
    dayOfTimeline: "Horario del día",
    suggestedItinerary: "Itinerario sugerido",
    ifTimeLimited: "Si el tiempo es limitado",
    afterWedding: "Después de la boda",
    postWeddingMorning: "Muy poco tiempo — solo desayuno antes de salir. Si madrugas, la Playa de Carmel al amanecer es hermosa.",
    postWeddingAfternoon: "La mañana del sábado es tuya — Point Lobos abre temprano y es impresionante antes de las multitudes. Planifica 2–3 horas.",
    postWeddingEvening: "Con un día completo después de la boda, Big Sur es lo que hay que hacer. Maneja al sur por la Highway 1 — Bixby Bridge, McWay Falls y la Playa Pfeiffer valen la pena.",
  } : {
    weddingDay: "Wedding day",
    yourPlan: "Your plan",
    toMonterey: "to Monterey",
    recommendedStops: "Recommended stops",
    dayOfTimeline: "Day-of timeline",
    suggestedItinerary: "Suggested itinerary",
    ifTimeLimited: "If time is limited",
    afterWedding: "After the wedding",
    postWeddingMorning: "Very little time — just breakfast before heading out. If you're up early, Carmel Beach at sunrise is beautiful.",
    postWeddingAfternoon: "Saturday morning is yours — Point Lobos opens early and is stunning before the crowds. Allow 2–3 hours.",
    postWeddingEvening: "With a full day after the wedding, Big Sur is the move. Drive south on Highway 1 — Bixby Bridge, McWay Falls, and Pfeiffer Beach are all worth it.",
  };

  const postWeddingNote =
    departureDate === "2026-09-05"
      ? (departureTime === "morning" ? ui.postWeddingMorning : departureTime === "afternoon" ? ui.postWeddingAfternoon : ui.postWeddingEvening)
      : ui.postWeddingEvening;

  return (
    <div className="mt-8 space-y-6">
      {/* Summary card */}
      <div className="rounded-2xl p-6"
        style={{
          background: rec.isWeddingDay
            ? "linear-gradient(135deg, rgba(45,31,20,0.06) 0%, rgba(201,160,160,0.12) 100%)"
            : "linear-gradient(135deg, rgba(45,31,20,0.04) 0%, rgba(201,160,160,0.08) 100%)",
          border: "1px solid #e8ddd4",
        }}
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs uppercase tracking-[0.18em]" style={{ color: "#8a7060" }}>
            {rec.isWeddingDay ? ui.weddingDay : ui.yourPlan}
          </span>
          <span
            className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.14em]"
            style={{ background: "rgba(201,160,160,0.15)", color: "#c9a0a0", border: "1px solid rgba(201,160,160,0.3)" }}
          >
            {rec.driveTime} {ui.toMonterey}
          </span>
        </div>
        <p className="text-base leading-7" style={{ color: "#3d2b1f" }}>{rec.summary}</p>
      </div>

      {/* Recommended stops */}
      {!rec.isWeddingDay && rec.stops.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "#8a7060" }}>
            {ui.recommendedStops}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rec.stops.map((place) => {
              const matchScore = interests.length > 0
                ? place.interests.filter(i => interests.includes(i)).length : 0;
              return <PlaceCard key={place.id} place={place} highlighted={matchScore > 0} locale={locale} />;
            })}
          </div>
        </div>
      )}

      {/* Itinerary */}
      <div className="rounded-2xl p-5"
        style={{ background: "rgba(251,244,232,0.5)", border: "1px solid #e8ddd4" }}>
        <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "#8a7060" }}>
          {rec.isWeddingDay ? ui.dayOfTimeline : ui.suggestedItinerary}
        </p>
        <ol className="space-y-2.5">
          {rec.itinerary.map((step, i) => {
            const isWeddingStep = step.includes("Carmel Mission Basilica") || step.includes("Fairview Laguna Seca");
            return (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px]"
                  style={{
                    background: isWeddingStep ? "rgba(201,160,160,0.35)" : "rgba(201,160,160,0.2)",
                    color: "#c9a0a0",
                  }}
                >
                  {i + 1}
                </span>
                <span className="text-sm leading-6"
                  style={{ color: isWeddingStep ? "#2d1f14" : "#4a3728", fontWeight: isWeddingStep ? 500 : 400 }}>
                  {step}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Skip note */}
      {!rec.isWeddingDay && rec.skipNote && (
        <div className="flex items-start gap-3 px-1">
          <span style={{ color: "#c9a0a0", fontSize: "1rem", marginTop: "2px" }} aria-hidden>✦</span>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] mb-1" style={{ color: "#a08060" }}>
              {ui.ifTimeLimited}
            </p>
            <p className="text-sm leading-6" style={{ color: "#6b5444" }}>{rec.skipNote}</p>
          </div>
        </div>
      )}

      {/* Post-wedding note */}
      {hasPostWeddingTime && (
        <div className="flex items-start gap-3 rounded-2xl p-5"
          style={{ background: "rgba(201,160,160,0.06)", border: "1px solid rgba(201,160,160,0.25)" }}>
          <span style={{ color: "#c9a0a0", fontSize: "1rem", marginTop: "1px" }} aria-hidden>✦</span>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] mb-1" style={{ color: "#c9a0a0" }}>
              {ui.afterWedding}
            </p>
            <p className="text-sm leading-6" style={{ color: "#5a4535" }}>{postWeddingNote}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function VisitPlanner({ locale = "en" }: { locale?: string }) {
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [arrivalDate, setArrivalDate] = useState<string | null>(null);
  const [arrivalTime, setArrivalTime] = useState<ArrivalTime | null>(null);
  const [departureDate, setDepartureDate] = useState<string | null>(null);
  const [departureTime, setDepartureTime] = useState<DepartureTime | null>(null);
  const [interests, setInterests] = useState<Interest[]>([]);

  const es = locale === "es";

  // ── Step numbering (dynamic — only count visible steps) ──────────────────
  let stepCounter = 0;
  const s = () => ++stepCounter;

  const isWeddingDay = arrivalDate !== null && arrivalDate >= WEDDING_DATE;
  const showArrivalTime = arrivalDate !== null && !isWeddingDay;
  const showDepartureTime = departureDate !== null && departureDate > WEDDING_DATE;
  const showInterests = showArrivalTime && arrivalTime !== null && arrivalTime !== "evening";
  // Show results once all required steps are answered:
  // - wedding day: no arrival time step needed
  // - other days: need arrival time before showing results
  const showResults = origin !== null && arrivalDate !== null && (isWeddingDay || arrivalTime !== null);

  const ui = es ? {
    step1:        "¿De dónde vienes?",
    step1Sub:     "Manejando desde el Bay Area",
    orLabel:      "o",
    step2:        "¿Cuándo llegas?",
    step3:        "¿A qué hora llegas?",
    step4:        "¿Cuándo regresas a casa?",
    step5:        "¿A qué hora sales?",
    step6:        "¿Qué te interesa? (opcional)",
    interestNote: "Selecciona lo que aplique — priorizaremos las paradas que coincidan.",
  } : {
    step1:        "Where are you coming from?",
    step1Sub:     "Driving from the Bay Area",
    orLabel:      "or",
    step2:        "When are you arriving?",
    step3:        "What time are you arriving?",
    step4:        "When are you heading home?",
    step5:        "What time are you leaving?",
    step6:        "What are you into? (optional)",
    interestNote: "Select any that apply — we'll prioritize stops that match.",
  };

  function selectOrigin(o: Origin) {
    setOrigin(o);
    if (o !== origin) {
      setArrivalDate(null);
      setArrivalTime(null);
      setDepartureDate(null);
      setDepartureTime(null);
      setInterests([]);
    }
  }

  function selectArrival(date: string) {
    setArrivalDate(date);
    setArrivalTime(null);
    if (departureDate && departureDate < date) setDepartureDate(null);
    setDepartureTime(null);
    setInterests([]);
  }

  function selectArrivalTime(t: ArrivalTime) {
    setArrivalTime(t);
    setInterests([]);
  }

  function toggleInterest(id: Interest) {
    setInterests(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }

  const validDepartureDates = arrivalDate
    ? DEPARTURE_DATES.filter(d => d.date >= arrivalDate)
    : DEPARTURE_DATES;

  const airportCharacter = origin && origin !== "LOCAL"
    ? (es && AIRPORT_PROFILES[origin as Airport].characterEs
        ? AIRPORT_PROFILES[origin as Airport].characterEs
        : AIRPORT_PROFILES[origin as Airport].character)
    : origin === "LOCAL"
      ? (es ? LOCAL_PROFILE.characterEs : LOCAL_PROFILE.character)
      : null;

  return (
    <div>
      {/* ── Step 1: Origin ── */}
      <div>
        <StepLabel number={s()} label={ui.step1} />

        {/* Airport buttons */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(["SFO", "SJC", "OAK", "MRY"] as Airport[]).map((code) => {
            const profile = AIRPORT_PROFILES[code];
            const active = origin === code;
            return (
              <button
                key={code} type="button" onClick={() => selectOrigin(code)}
                className="flex flex-col items-start rounded-2xl px-4 py-3.5 text-left transition-all w-full"
                style={active
                  ? { background: "#2d1f14", border: "1px solid #2d1f14" }
                  : { background: "transparent", border: "1px solid #e8ddd4" }}
              >
                <span className="font-serif text-xl leading-none"
                  style={{ color: active ? "#fbf4e8" : "#2d1f14" }}>
                  {code}
                </span>
                <span className="mt-1 text-[11px] leading-tight"
                  style={{ color: active ? "rgba(251,244,232,0.65)" : "#8a7060" }}>
                  {profile.name.split(" ").slice(0, 2).join(" ")}
                </span>
                <span className="mt-2 text-[10px] uppercase tracking-[0.14em] rounded-full px-2 py-0.5"
                  style={{
                    background: active ? "rgba(255,255,255,0.12)" : "rgba(201,160,160,0.12)",
                    color: active ? "rgba(251,244,232,0.8)" : "#c9a0a0",
                  }}>
                  {profile.driveTime}
                </span>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="relative flex items-center my-4">
          <div className="flex-1 border-t" style={{ borderColor: "#e8ddd4" }} />
          <span className="mx-3 text-xs uppercase tracking-[0.18em]" style={{ color: "#b09880" }}>
            {ui.orLabel}
          </span>
          <div className="flex-1 border-t" style={{ borderColor: "#e8ddd4" }} />
        </div>

        {/* Bay Area local button */}
        <button
          type="button" onClick={() => selectOrigin("LOCAL")}
          className="flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left transition-all"
          style={origin === "LOCAL"
            ? { background: "#2d1f14", border: "1px solid #2d1f14" }
            : { background: "transparent", border: "1px solid #e8ddd4" }}
        >
          <div>
            <span className="block font-serif text-base"
              style={{ color: origin === "LOCAL" ? "#fbf4e8" : "#2d1f14" }}>
              {es ? "Bay Area · Local" : "Bay Area · Local"}
            </span>
            <span className="text-[11px]"
              style={{ color: origin === "LOCAL" ? "rgba(251,244,232,0.6)" : "#8a7060" }}>
              {ui.step1Sub}
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.14em] rounded-full px-2.5 py-0.5"
            style={{
              background: origin === "LOCAL" ? "rgba(255,255,255,0.12)" : "rgba(201,160,160,0.12)",
              color: origin === "LOCAL" ? "rgba(251,244,232,0.8)" : "#c9a0a0",
            }}>
            {LOCAL_PROFILE.driveTime}
          </span>
        </button>

        {origin && airportCharacter && (
          <p className="mt-3 text-sm leading-6" style={{ color: "#8a7060" }}>
            {airportCharacter}
          </p>
        )}
      </div>

      {/* ── Step 2: Arrival date ── */}
      {origin && (
        <div className="mt-7">
          <StepLabel number={s()} label={ui.step2} />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {ARRIVAL_DATES.map(d => (
              <SelectButton
                key={d.date}
                label={es && d.labelEs ? d.labelEs : d.label}
                sublabel={es && d.sublabelEs ? d.sublabelEs : d.sublabel}
                active={arrivalDate === d.date}
                onClick={() => selectArrival(d.date)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Step 3: Arrival time ── */}
      {showArrivalTime && (
        <div className="mt-7">
          <StepLabel number={s()} label={ui.step3} />
          <div className="grid grid-cols-3 gap-2">
            {ARRIVAL_TIMES.map(t => (
              <SelectButton
                key={t.id}
                label={es && t.labelEs ? t.labelEs : t.label}
                sublabel={es && t.sublabelEs ? t.sublabelEs : t.sublabel}
                active={arrivalTime === t.id}
                onClick={() => selectArrivalTime(t.id as ArrivalTime)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Step 4: Departure date ── */}
      {arrivalDate && (isWeddingDay || arrivalTime !== null) && (
        <div className="mt-7">
          <StepLabel number={s()} label={ui.step4} />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {validDepartureDates.map(d => (
              <SelectButton
                key={d.date}
                label={es && d.labelEs ? d.labelEs : d.label}
                sublabel={es && d.sublabelEs ? d.sublabelEs : d.sublabel}
                active={departureDate === d.date}
                onClick={() => { setDepartureDate(d.date); setDepartureTime(null); }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Step 5: Departure time (only for post-wedding departures) ── */}
      {showDepartureTime && (
        <div className="mt-7">
          <StepLabel number={s()} label={ui.step5} />
          <div className="grid grid-cols-3 gap-2">
            {DEPARTURE_TIMES.map(t => (
              <SelectButton
                key={t.id}
                label={es && t.labelEs ? t.labelEs : t.label}
                sublabel={es && t.sublabelEs ? t.sublabelEs : t.sublabel}
                active={departureTime === t.id}
                onClick={() => setDepartureTime(t.id as DepartureTime)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Step 6: Interests ── */}
      {showInterests && (
        <div className="mt-7">
          <StepLabel number={s()} label={ui.step6} />
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map(interest => (
              <InterestToggle
                key={interest.id}
                label={es && interest.labelEs ? interest.labelEs : interest.label}
                icon={interest.icon}
                active={interests.includes(interest.id)}
                onClick={() => toggleInterest(interest.id)}
              />
            ))}
          </div>
          <p className="mt-2 text-xs" style={{ color: "#a08060" }}>{ui.interestNote}</p>
        </div>
      )}

      {/* ── Results ── */}
      {showResults && (
        <RecommendationResults
          origin={origin}
          arrivalDate={arrivalDate}
          arrivalTime={arrivalTime}
          departureDate={departureDate}
          departureTime={departureTime}
          interests={interests}
          locale={locale}
        />
      )}
    </div>
  );
}
