import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/auth";
import { getLocale } from "@/lib/locale";
import { LanguageSwitcher } from "@/components/language-switcher";

type AdminLoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }
  const locale = await getLocale();
  const t = locale === "es"
    ? {
        portal: "Portal Admin",
        title: "Ingreso Admin",
        intro: "Usa la contraseña admin para ver todas las confirmaciones.",
        password: "Contraseña",
        error: "Contraseña incorrecta.",
        continue: "Continuar",
        back: "Volver al sitio público",
      }
    : {
        portal: "Admin Portal",
        title: "Admin Login",
        intro: "Use the admin password to view all RSVP submissions.",
        password: "Password",
        error: "Incorrect admin password.",
        continue: "Continue",
        back: "Back to public page",
      };

  const params = await searchParams;
  const error = params.error === "1";

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f9f4ec_0%,#f7f7f5_48%,#edf3f1_100%)] px-6 py-10 text-stone-800 sm:px-10">
      <div className="mx-auto max-w-lg rounded-3xl border border-stone-200 bg-white/80 p-8 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between gap-3"><p className="text-xs uppercase tracking-[0.28em] text-stone-500">{t.portal}</p><LanguageSwitcher locale={locale} /></div>
        <h1 className="mt-3 font-serif text-4xl text-stone-900">
          {t.title}
        </h1>
        <p className="mt-4 text-sm leading-7 text-stone-700">
          {t.intro}
        </p>

        <form action="/api/admin/login" method="post" className="mt-8 space-y-4">
          <label
            htmlFor="password"
            className="block text-xs uppercase tracking-[0.2em] text-stone-600"
          >
            {t.password}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
          />
          {error ? (
            <p className="text-sm text-red-700">{t.error}</p>
          ) : null}
          <button
            type="submit"
            className="w-full rounded-full border border-stone-800 bg-stone-800 px-6 py-3 text-xs uppercase tracking-[0.2em] text-stone-50 transition hover:bg-stone-700"
          >
            {t.continue}
          </button>
        </form>

        <Link href="/" className="mt-6 inline-block text-sm text-stone-600 underline">
          {t.back}
        </Link>
      </div>
    </main>
  );
}
