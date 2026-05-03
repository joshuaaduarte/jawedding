"use server";

import { createGuestsBatch, type GuestGroup } from "@/lib/guest-data";
import { redirect } from "next/navigation";

export async function batchCreateGuests(formJson: string) {
  const data = JSON.parse(formJson) as {
    inviteCode: string;
    group: GuestGroup;
    displayName: string;
    anecdote: string;
    anecdoteEs: string;
    members: {
      firstName: string;
      lastName: string;
      email: string;
      customNotes: boolean;
      customAnecdote?: string;
      customAnecdoteEs?: string;
    }[];
  };

  if (!data.inviteCode.trim() || data.members.length === 0) return;

  const validMembers = data.members.filter(
    (m) => m.firstName.trim() && m.lastName.trim(),
  );
  if (validMembers.length === 0) return;

  await createGuestsBatch(
    {
      inviteCode: data.inviteCode.trim().toUpperCase(),
      group: data.group,
      displayName: data.displayName.trim(),
      anecdote: data.anecdote.trim(),
      anecdoteEs: data.anecdoteEs.trim(),
    },
    validMembers.map((m) => ({
      firstName: m.firstName.trim(),
      lastName: m.lastName.trim(),
      email: m.email.trim(),
      customAnecdote: m.customNotes ? m.customAnecdote?.trim() : undefined,
      customAnecdoteEs: m.customNotes ? m.customAnecdoteEs?.trim() : undefined,
    })),
  );

  redirect("/admin/guests");
}
