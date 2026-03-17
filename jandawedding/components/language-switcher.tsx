"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/locale";

type LanguageSwitcherProps = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter();
  const [active, setActive] = useState<Locale>(locale);
  const [saving, setSaving] = useState(false);

  async function setLocale(nextLocale: Locale) {
    if (nextLocale === active || saving) {
      return;
    }

    setSaving(true);
    const response = await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: nextLocale }),
    });
    setSaving(false);

    if (!response.ok) {
      return;
    }

    setActive(nextLocale);
    router.refresh();
  }

  return (
    <div className="inline-flex h-10 items-center rounded-full border border-stone-300 bg-white/95 p-1 text-[11px] uppercase tracking-[0.13em] shadow-sm">
      <button
        type="button"
        onClick={() => setLocale("en")}
        disabled={saving}
        className={`h-8 rounded-full px-3 transition ${
          active === "en"
            ? "bg-stone-800 text-white"
            : "text-stone-700 hover:bg-stone-100"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("es")}
        disabled={saving}
        className={`h-8 rounded-full px-3 transition ${
          active === "es"
            ? "bg-stone-800 text-white"
            : "text-stone-700 hover:bg-stone-100"
        }`}
      >
        ES
      </button>
    </div>
  );
}
