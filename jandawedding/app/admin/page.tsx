import { redirect } from "next/navigation";
import { getAllRsvps } from "@/lib/rsvp-store";
import { isAdminAuthenticated } from "@/lib/auth";
import { getLocale } from "@/lib/locale";
import { LanguageSwitcher } from "@/components/language-switcher";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const rsvps = await getAllRsvps();
  const locale = await getLocale();
  const t = locale === "es"
    ? {
        dashboard: "Panel Admin",
        title: "Confirmaciones",
        logout: "Salir",
        empty: "Aún no hay confirmaciones.",
        name: "Nombre",
        code: "Código",
        attendance: "Asistencia",
        guestCount: "Invitados",
        notes: "Notas",
        submitted: "Enviado",
      }
    : {
        dashboard: "Admin Dashboard",
        title: "RSVP Submissions",
        logout: "Logout",
        empty: "No RSVPs submitted yet.",
        name: "Name",
        code: "Invite Code",
        attendance: "Attendance",
        guestCount: "Guest Count",
        notes: "Notes",
        submitted: "Submitted",
      };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f5f2e8_0%,#f6f7f5_50%,#eaf1ef_100%)] px-6 py-10 text-stone-800 sm:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-4 rounded-3xl border border-stone-200 bg-white/80 p-8 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-stone-500">
              {t.dashboard}
            </p>
            <h1 className="mt-2 font-serif text-4xl text-stone-900">
              {t.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} />
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="h-10 rounded-full border border-stone-300 px-5 text-xs uppercase tracking-[0.2em] text-stone-700 transition hover:bg-stone-100"
              >
                {t.logout}
              </button>
            </form>
          </div>
        </header>

        <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          {rsvps.length === 0 ? (
            <p className="text-sm text-stone-700">{t.empty}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-200 text-xs uppercase tracking-[0.14em] text-stone-500">
                    <th className="px-2 py-3">{t.name}</th>
                    <th className="px-2 py-3">{t.code}</th>
                    <th className="px-2 py-3">{t.attendance}</th>
                    <th className="px-2 py-3">{t.guestCount}</th>
                    <th className="px-2 py-3">{t.notes}</th>
                    <th className="px-2 py-3">{t.submitted}</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((record) => (
                    <tr key={record.guestId} className="border-b border-stone-100">
                      <td className="px-2 py-3">{record.fullName}</td>
                      <td className="px-2 py-3">{record.inviteCode}</td>
                      <td className="px-2 py-3">{record.attendance}</td>
                      <td className="px-2 py-3">{record.guestCount}</td>
                      <td className="px-2 py-3">{record.notes || "-"}</td>
                      <td className="px-2 py-3">
                        {new Date(record.submittedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
