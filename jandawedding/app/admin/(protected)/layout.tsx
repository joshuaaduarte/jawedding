import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/guests", label: "Guests" },
  { href: "/admin/groups", label: "Groups" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/travel", label: "Travel" },
];

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f5f2e8_0%,#f6f7f5_50%,#eaf1ef_100%)] px-4 py-8 text-stone-800 sm:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Admin top bar */}
        <header className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white/90 px-5 py-4 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Admin</p>
            <nav className="flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-[0.16em] text-stone-600">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-stone-900"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="h-9 rounded-full border border-stone-300 px-5 text-xs uppercase tracking-[0.18em] text-stone-700 transition hover:bg-stone-100"
            >
              Logout
            </button>
          </form>
        </header>

        {children}
      </div>
    </main>
  );
}
