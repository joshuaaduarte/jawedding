"use client";

import { useFormStatus } from "react-dom";

type AdminSubmitButtonProps = {
  label: string;
  pendingLabel?: string;
};

export function AdminSubmitButton({
  label,
  pendingLabel = "Saving...",
}: AdminSubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="h-10 rounded-full bg-stone-800 px-6 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
