import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getLocale } from "@/lib/locale";
import { LanguageSwitcher } from "@/components/language-switcher";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  if (await isAuthenticated()) {
    redirect("/portal");
  }
  const locale = await getLocale();
  const t =
    locale === "es"
      ? {
          guestPortal: "Portal De Invitados",
          login: "Ingresar",
          intro:
            "Ingresa tu código de invitación y apellido para ver tus detalles y enviar tu confirmación.",
          inviteCode: "Código De Invitación",
          lastName: "Apellido",
          mismatch: "El código y apellido no coinciden. Inténtalo otra vez.",
          continue: "Continuar",
          back: "Volver al sitio público",
          adminAccess: "Acceso administrador",
        }
      : {
          guestPortal: "Guest Portal",
          login: "Welcome",
          intro:
            "Enter your invite code and last name to view your timeline details and submit your RSVP.",
          inviteCode: "Invite Code",
          lastName: "Last Name",
          mismatch: "Invite code and last name did not match. Try again.",
          continue: "Continue",
          back: "Back to public page",
          adminAccess: "Admin access",
        };

  const params = await searchParams;
  const error = params.error === "1";

  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(160deg, #fbf4e8 0%, #f5f0e8 50%, #edf1ee 100%)",
      }}
    >
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* ── Left panel — atmospheric (desktop only) ── */}
        <div
          className="relative hidden md:flex md:w-1/2 md:flex-col md:items-center md:justify-end md:pb-16"
          style={{
            background:
              "linear-gradient(160deg, #3d2314 0%, #2d1f14 40%, #1a1008 100%)",
          }}
        >
          {/* Decorative texture overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 30% 20%, #c9a0a0 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, #8a7060 0%, transparent 50%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-14 text-center">
            <p
              className="text-xs uppercase tracking-[0.5em]"
              style={{ color: "#c9a8a0" }}
            >
              ✦
            </p>
            <h2
              className="mt-4 font-serif italic leading-tight"
              style={{
                fontSize: "clamp(2.4rem, 4vw, 3.6rem)",
                color: "#f5ece0",
              }}
            >
              Ana &amp; Joshua
            </h2>
            <div
              className="mx-auto my-5 h-px w-20"
              style={{ background: "#c9a0a0" }}
            />
            <p
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: "#c9a8a0" }}
            >
              September 4, 2026
            </p>
            <p
              className="mt-1 text-xs uppercase tracking-[0.3em]"
              style={{ color: "#8a7060" }}
            >
              Monterey, California
            </p>
          </div>
        </div>

        {/* ── Right panel — form ── */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-14 sm:px-10 md:w-1/2 md:px-16">
          {/* Mobile header */}
          <div className="mb-10 text-center md:hidden">
            <p
              className="font-serif italic"
              style={{ fontSize: "1.8rem", color: "#2d1f14" }}
            >
              Ana &amp; Joshua
            </p>
            <p
              className="mt-1 text-xs uppercase tracking-[0.28em]"
              style={{ color: "#c9a0a0" }}
            >
              September 4, 2026
            </p>
          </div>

          <div className="w-full max-w-sm">
            {/* Top bar */}
            <div className="mb-7 flex items-center justify-between">
              <p
                className="text-xs uppercase tracking-[0.3em]"
                style={{ color: "#c9a0a0" }}
              >
                {t.guestPortal}
              </p>
              <LanguageSwitcher locale={locale} />
            </div>

            <h1
              className="font-serif italic"
              style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)", color: "#2d1f14" }}
            >
              {t.login}
            </h1>
            <p
              className="mt-3 text-sm leading-7"
              style={{ color: "#6b5444" }}
            >
              {t.intro}
            </p>

            <form action="/api/login" method="post" className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="inviteCode"
                  className="mb-2 block text-xs uppercase tracking-[0.24em]"
                  style={{ color: "#8a7060" }}
                >
                  {t.inviteCode}
                </label>
                <input
                  id="inviteCode"
                  name="inviteCode"
                  type="text"
                  required
                  placeholder="AJD-0001"
                  className="w-full rounded-xl px-4 py-3 text-base md:text-sm outline-none ring-[#c9a0a0] transition focus:ring-1"
                  style={{
                    border: "1px solid #e0d2c4",
                    background: "rgba(251, 244, 232, 0.7)",
                    color: "#2d1f14",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-xs uppercase tracking-[0.24em]"
                  style={{ color: "#8a7060" }}
                >
                  {t.lastName}
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="w-full rounded-xl px-4 py-3 text-base md:text-sm outline-none ring-[#c9a0a0] transition focus:ring-1"
                  style={{
                    border: "1px solid #e0d2c4",
                    background: "rgba(251, 244, 232, 0.7)",
                    color: "#2d1f14",
                  }}
                />
              </div>

              {error ? (
                <p className="text-sm" style={{ color: "#b05a5a" }}>
                  {t.mismatch}
                </p>
              ) : null}

              <button
                type="submit"
                className="mt-2 w-full appearance-none rounded-full py-3 text-xs uppercase tracking-[0.24em] text-white transition hover:opacity-85"
                style={{ background: "#2d1f14" }}
              >
                {t.continue}
              </button>
            </form>

            <div className="mt-7 flex items-center justify-between gap-4">
              <Link
                href="/"
                className="text-xs uppercase tracking-[0.2em] transition hover:opacity-60"
                style={{ color: "#8a7060" }}
              >
                ← {t.back}
              </Link>
              <Link
                href="/admin/login"
                className="text-xs uppercase tracking-[0.18em] transition hover:opacity-60"
                style={{ color: "#c4b8b0" }}
              >
                {t.adminAccess}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
