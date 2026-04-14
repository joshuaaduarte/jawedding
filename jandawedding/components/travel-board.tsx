"use client";

import { useState } from "react";
import type { TravelPost, TravelMode } from "@/lib/travel-store";
import type { Locale } from "@/lib/locale";

type TravelBoardProps = {
  initialPosts: TravelPost[];
  myInitialPosts: TravelPost[];
  partyMembers: string[];
  locale: Locale;
};

type FormState = {
  id: string | null; // null = new post
  travelerNames: string[];
  travelMode: TravelMode;
  flyingFrom: string;
  flyingTo: string;
  arrivalDate: string;
  departureDate: string;
  contact: string;
  notes: string;
  isVisible: boolean;
};

function emptyForm(): FormState {
  return {
    id: null,
    travelerNames: [],
    travelMode: "flying",
    flyingFrom: "",
    flyingTo: "",
    arrivalDate: "",
    departureDate: "",
    contact: "",
    notes: "",
    isVisible: false,
  };
}

function postToForm(post: TravelPost): FormState {
  return {
    id: post.id,
    travelerNames: post.travelerNames,
    travelMode: post.travelMode,
    flyingFrom: post.flyingFrom,
    flyingTo: post.flyingTo,
    arrivalDate: post.arrivalDate,
    departureDate: post.departureDate,
    contact: post.contact,
    notes: post.notes,
    isVisible: post.isVisible,
  };
}

export function TravelBoard({ initialPosts, myInitialPosts, partyMembers, locale }: TravelBoardProps) {
  const isGroup = partyMembers.length > 0;

  const t =
    locale === "es"
      ? {
          boardTitle: "Planes De Viaje",
          boardEmpty: "Nadie ha compartido sus planes todavía. ¡Sé el primero!",
          myPlansTitle: "Mis Planes De Viaje",
          addPlan: "+ Agregar Plan De Viaje",
          editPlan: "Editar",
          cancelEdit: "Cancelar",
          everyoneHint: "Sin selección = todos en el grupo",
          forWho: "¿Para quién es este plan?",
          everyone: "Todos en nuestro grupo",
          modeFlying: "Avión",
          modeDriving: "Auto",
          modeOther: "Otro",
          flyingFrom: "Volando desde (ej. Los Ángeles / LAX)",
          flyingTo: "Llegando a (ej. SFO, OAK, SJC)",
          arriving: "Llegada",
          leaving: "Salida",
          contact: "Contacto (teléfono, correo, Instagram)",
          notes: "Notas (número de vuelo, compartir auto, etc.)",
          showMe: "Mostrar en el tablero de viajes",
          save: "Guardar",
          saving: "Guardando...",
          remove: "Eliminar",
          removing: "Eliminando...",
          saveOk: "¡Guardado!",
          saveError: "No se pudo guardar. Inténtalo de nuevo.",
          removeOk: "Eliminado.",
          removeError: "No se pudo eliminar. Inténtalo de nuevo.",
          flying: "Avión",
          driving: "Auto",
          other: "Otro",
          from: "Desde",
          to: "Hasta",
          arrives: "Llega",
          departs: "Sale",
          noPlans: "Aún no has compartido tus planes.",
        }
      : {
          boardTitle: "Travel Board",
          boardEmpty: "No one has shared their plans yet — be the first!",
          myPlansTitle: "Your Travel Plans",
          addPlan: "+ Add Travel Plan",
          editPlan: "Edit",
          cancelEdit: "Cancel",
          everyoneHint: "No selection = everyone in the group",
          forWho: "Who is this plan for?",
          everyone: "Everyone in our group",
          modeFlying: "Flying",
          modeDriving: "Driving",
          modeOther: "Other",
          flyingFrom: "Flying from (e.g. Los Angeles / LAX)",
          flyingTo: "Flying into (e.g. SFO, OAK, SJC)",
          arriving: "Arriving",
          leaving: "Leaving",
          contact: "Contact (phone, email, or Instagram)",
          notes: "Notes (flight #, open to sharing a car, etc.)",
          showMe: "Show on the Travel Board",
          save: "Save",
          saving: "Saving...",
          remove: "Remove",
          removing: "Removing...",
          saveOk: "Saved!",
          saveError: "Could not save. Please try again.",
          removeOk: "Removed.",
          removeError: "Could not remove. Please try again.",
          flying: "Flying",
          driving: "Driving",
          other: "Other",
          from: "From",
          to: "To",
          arrives: "Arrives",
          departs: "Departs",
          noPlans: "You haven't shared any travel plans yet.",
        };

  const [boardPosts, setBoardPosts] = useState<TravelPost[]>(initialPosts);
  const [myPosts, setMyPosts] = useState<TravelPost[]>(myInitialPosts);
  const myPostIds = new Set(myPosts.map((p) => p.id));

  // Active form: null = no form open, otherwise a FormState
  const [activeForm, setActiveForm] = useState<FormState | null>(null);
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const modeBadgeColor: Record<TravelMode, string> = {
    flying: "bg-sky-100 text-sky-700",
    driving: "bg-emerald-100 text-emerald-700",
    other: "bg-stone-100 text-stone-600",
  };

  async function refreshPosts() {
    const res = await fetch("/api/travel");
    if (!res.ok) return;
    const data = (await res.json()) as { posts: TravelPost[]; myPosts: TravelPost[] };
    setBoardPosts(data.posts);
    setMyPosts(data.myPosts);
  }

  async function onSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!activeForm) return;
    setFormStatus(null);
    setSaving(true);

    let res: Response;
    if (activeForm.id) {
      // Update existing
      res = await fetch(`/api/travel/${activeForm.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          travelerNames: activeForm.travelerNames,
          travelMode: activeForm.travelMode,
          flyingFrom: activeForm.flyingFrom,
          flyingTo: activeForm.flyingTo,
          arrivalDate: activeForm.arrivalDate,
          departureDate: activeForm.departureDate,
          contact: activeForm.contact,
          notes: activeForm.notes,
          isVisible: activeForm.isVisible,
        }),
      });
    } else {
      // Create new
      res = await fetch("/api/travel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          travelerNames: activeForm.travelerNames,
          travelMode: activeForm.travelMode,
          flyingFrom: activeForm.flyingFrom,
          flyingTo: activeForm.flyingTo,
          arrivalDate: activeForm.arrivalDate,
          departureDate: activeForm.departureDate,
          contact: activeForm.contact,
          notes: activeForm.notes,
          isVisible: activeForm.isVisible,
        }),
      });
    }

    setSaving(false);
    if (!res.ok) {
      setFormStatus(t.saveError);
      return;
    }

    setFormStatus(t.saveOk);
    setActiveForm(null);
    await refreshPosts();
  }

  async function onRemove(postId: string) {
    setRemovingId(postId);
    const res = await fetch(`/api/travel/${postId}`, { method: "DELETE" });
    setRemovingId(null);
    if (!res.ok) return;
    await refreshPosts();
  }

  function updateForm(patch: Partial<FormState>) {
    setActiveForm((prev) => prev ? { ...prev, ...patch } : prev);
  }

  function travelerLabel(post: TravelPost, isMine = false) {
    if (post.travelerNames.length > 0) {
      const last = post.travelerNames[post.travelerNames.length - 1];
      const rest = post.travelerNames.slice(0, -1);
      return rest.length > 0 ? `${rest.join(", ")} & ${last}` : last;
    }
    // "Everyone" post
    if (isMine && partyMembers.length > 1) {
      const last = partyMembers[partyMembers.length - 1];
      const rest = partyMembers.slice(0, -1);
      return rest.length > 0 ? `${rest.join(", ")} & ${last}` : last;
    }
    return post.guestName;
  }

  // Coverage: which party members are already claimed by existing posts
  function getCoveredNames(excludeId?: string): Set<string> {
    const covered = new Set<string>();
    for (const post of myPosts) {
      if (post.id === excludeId) continue;
      if (post.travelerNames.length === 0) {
        partyMembers.forEach((n) => covered.add(n));
      } else {
        post.travelerNames.forEach((n) => covered.add(n));
      }
    }
    return covered;
  }

  const coveredByOtherPosts = getCoveredNames(activeForm?.id ?? undefined);
  const hasUncoveredMembers = !isGroup || partyMembers.some((n) => !coveredByOtherPosts.has(n));

  const visibleBoardPosts = boardPosts.filter((p) => p.isVisible);

  return (
    <div className="space-y-6">
      {/* ── Board ── */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="font-serif text-3xl text-stone-900">{t.boardTitle}</h2>
        {visibleBoardPosts.length === 0 ? (
          <p className="mt-4 text-sm text-stone-500">{t.boardEmpty}</p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {visibleBoardPosts.map((post) => (
              <article
                key={post.id}
                className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-stone-900 text-sm">{travelerLabel(post, myPostIds.has(post.id))}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${modeBadgeColor[post.travelMode]}`}>
                    {t[post.travelMode]}
                  </span>
                </div>
                {post.travelMode === "flying" && (post.flyingFrom || post.flyingTo) && (
                  <p className="text-xs text-stone-600">
                    {post.flyingFrom && <span>{t.from}: {post.flyingFrom}</span>}
                    {post.flyingFrom && post.flyingTo && <span className="mx-1">→</span>}
                    {post.flyingTo && <span>{t.to}: {post.flyingTo}</span>}
                  </p>
                )}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-600">
                  {post.arrivalDate && <span>{t.arrives}: {post.arrivalDate}</span>}
                  {post.departureDate && <span>{t.departs}: {post.departureDate}</span>}
                </div>
                {post.contact && <p className="text-xs text-stone-700">📬 {post.contact}</p>}
                {post.notes && <p className="text-xs text-stone-600 italic">{post.notes}</p>}
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ── My Plans ── */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 space-y-4">
        <h2 className="font-serif text-3xl text-stone-900">{t.myPlansTitle}</h2>

        {/* Existing posts */}
        {myPosts.length === 0 && !activeForm && (
          <p className="text-sm text-stone-500">{t.noPlans}</p>
        )}

        {myPosts.map((post) => (
          <div key={post.id}>
            {/* Editing this post */}
            {activeForm?.id === post.id ? (
              <TravelForm
                form={activeForm}
                isGroup={isGroup}
                partyMembers={partyMembers}
                coveredNames={getCoveredNames(post.id)}
                t={t}
                saving={saving}
                status={formStatus}
                onChange={updateForm}
                onSubmit={onSave}
                onCancel={() => { setActiveForm(null); setFormStatus(null); }}
              />
            ) : (
              /* Display card */
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-stone-900 text-sm">{travelerLabel(post, true)}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${modeBadgeColor[post.travelMode]}`}>
                        {t[post.travelMode]}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${post.isVisible ? "bg-emerald-100 text-emerald-700" : "bg-stone-200 text-stone-500"}`}>
                        {post.isVisible ? (locale === "es" ? "Visible" : "Visible") : (locale === "es" ? "Oculto" : "Hidden")}
                      </span>
                    </div>
                    {post.travelMode === "flying" && (post.flyingFrom || post.flyingTo) && (
                      <p className="text-xs text-stone-600">
                        {post.flyingFrom && <span>{t.from}: {post.flyingFrom}</span>}
                        {post.flyingFrom && post.flyingTo && <span className="mx-1">→</span>}
                        {post.flyingTo && <span>{t.to}: {post.flyingTo}</span>}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-600">
                      {post.arrivalDate && <span>{t.arrives}: {post.arrivalDate}</span>}
                      {post.departureDate && <span>{t.departs}: {post.departureDate}</span>}
                    </div>
                    {post.contact && <p className="text-xs text-stone-700">📬 {post.contact}</p>}
                    {post.notes && <p className="text-xs text-stone-600 italic">{post.notes}</p>}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => { setActiveForm(postToForm(post)); setFormStatus(null); }}
                      className="rounded-full border border-stone-300 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-stone-600 transition hover:border-stone-500 hover:text-stone-800"
                    >
                      {t.editPlan}
                    </button>
                    <button
                      onClick={() => onRemove(post.id)}
                      disabled={removingId === post.id}
                      className="rounded-full border border-rose-200 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-rose-600 transition hover:border-rose-400 disabled:opacity-50"
                    >
                      {removingId === post.id ? t.removing : t.remove}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* New post form */}
        {activeForm?.id === null && (
          <TravelForm
            form={activeForm}
            isGroup={isGroup}
            partyMembers={partyMembers}
            coveredNames={getCoveredNames()}
            t={t}
            saving={saving}
            status={formStatus}
            onChange={updateForm}
            onSubmit={onSave}
            onCancel={() => { setActiveForm(null); setFormStatus(null); }}
          />
        )}

        {/* Add button — only show when under the per-group post limit */}
        {!activeForm && hasUncoveredMembers && (
          <button
            onClick={() => { setActiveForm(emptyForm()); setFormStatus(null); }}
            className="rounded-full border border-stone-300 px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-stone-600 transition hover:border-stone-500 hover:text-stone-900"
          >
            {t.addPlan}
          </button>
        )}
      </section>
    </div>
  );
}

// ── Extracted form component ──────────────────────────────────────────────────

type TravelFormProps = {
  form: FormState;
  isGroup: boolean;
  partyMembers: string[];
  coveredNames: Set<string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
  saving: boolean;
  status: string | null;
  onChange: (patch: Partial<FormState>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

function TravelForm({ form, isGroup, partyMembers, coveredNames, t, saving, status, onChange, onSubmit, onCancel }: TravelFormProps) {
  function toggleName(name: string) {
    const current = form.travelerNames;
    if (current.includes(name)) {
      onChange({ travelerNames: current.filter((n) => n !== name) });
    } else {
      onChange({ travelerNames: [...current, name] });
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-stone-300 bg-stone-50 p-5 space-y-4"
    >
      {/* Who is this for — only shown for group guests */}
      {isGroup && (
        <div>
          <label className="block text-xs uppercase tracking-[0.14em] text-stone-500 mb-3">
            {t.forWho}
          </label>
          <div className="flex flex-wrap gap-2">
            {partyMembers.map((name) => {
              const isSelected = form.travelerNames.includes(name);
              const isDisabled = coveredNames.has(name) && !isSelected;
              return (
                <button
                  key={name}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => toggleName(name)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    isSelected
                      ? "border-stone-800 bg-stone-800 text-stone-50"
                      : isDisabled
                      ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400"
                      : "border-stone-300 bg-white text-stone-700 hover:border-stone-500"
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
          {isGroup && form.travelerNames.length === 0 && (
            <p className="mt-2 text-xs text-stone-400">{t.everyoneHint}</p>
          )}
        </div>
      )}

      {/* Travel mode */}
      <div className="flex flex-wrap gap-2">
        {(["flying", "driving", "other"] as TravelMode[]).map((mode) => (
          <label
            key={mode}
            className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.14em] transition ${
              form.travelMode === mode
                ? "border-stone-800 bg-stone-800 text-stone-50"
                : "border-stone-300 bg-white text-stone-700 hover:border-stone-500"
            }`}
          >
            <input
              type="radio"
              name={`travelMode-${form.id ?? "new"}`}
              value={mode}
              checked={form.travelMode === mode}
              onChange={() => onChange({ travelMode: mode })}
              className="sr-only"
            />
            {mode === "flying" ? t.modeFlying : mode === "driving" ? t.modeDriving : t.modeOther}
          </label>
        ))}
      </div>

      {/* Flying fields */}
      {form.travelMode === "flying" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            value={form.flyingFrom}
            onChange={(e) => onChange({ flyingFrom: e.target.value })}
            placeholder={t.flyingFrom}
            className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-800 outline-none ring-stone-700/30 focus:ring-2"
          />
          <input
            type="text"
            value={form.flyingTo}
            onChange={(e) => onChange({ flyingTo: e.target.value })}
            placeholder={t.flyingTo}
            className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-800 outline-none ring-stone-700/30 focus:ring-2"
          />
        </div>
      )}

      {/* Dates */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-[0.14em] text-stone-500">{t.arriving}</label>
          <input
            type="date"
            value={form.arrivalDate}
            onChange={(e) => onChange({ arrivalDate: e.target.value })}
            className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-800 outline-none ring-stone-700/30 focus:ring-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-[0.14em] text-stone-500">{t.leaving}</label>
          <input
            type="date"
            value={form.departureDate}
            onChange={(e) => onChange({ departureDate: e.target.value })}
            className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-800 outline-none ring-stone-700/30 focus:ring-2"
          />
        </div>
      </div>

      {/* Contact */}
      <input
        type="text"
        value={form.contact}
        onChange={(e) => onChange({ contact: e.target.value })}
        placeholder={t.contact}
        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-800 outline-none ring-stone-700/30 focus:ring-2"
      />

      {/* Notes */}
      <textarea
        rows={2}
        value={form.notes}
        onChange={(e) => onChange({ notes: e.target.value })}
        placeholder={t.notes}
        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-800 outline-none ring-stone-700/30 focus:ring-2"
      />

      {/* Visibility toggle */}
      <label className="flex cursor-pointer items-center gap-3">
        <div
          onClick={() => onChange({ isVisible: !form.isVisible })}
          className={`relative h-6 w-11 rounded-full transition-colors ${form.isVisible ? "bg-stone-800" : "bg-stone-300"}`}
        >
          <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.isVisible ? "translate-x-5" : "translate-x-0"}`} />
        </div>
        <span className="text-sm text-stone-700">{t.showMe}</span>
      </label>

      {status && <p className="text-sm text-stone-700">{status}</p>}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full border border-stone-800 bg-stone-800 px-6 py-3 text-xs uppercase tracking-[0.18em] text-stone-50 transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {saving ? t.saving : t.save}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-stone-300 px-6 py-3 text-xs uppercase tracking-[0.18em] text-stone-600 transition hover:border-stone-500"
        >
          {t.cancelEdit}
        </button>
      </div>
    </form>
  );
}
