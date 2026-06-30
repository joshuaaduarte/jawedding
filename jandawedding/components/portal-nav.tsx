"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUnsavedChanges } from "@/components/unsaved-changes";

type NavItem = { href: string; label: string };

export function PortalNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const unsavedChanges = useUnsavedChanges();

  // Block client-side tab navigation when the active page has unsaved edits.
  function handleNavClick(e: React.MouseEvent) {
    if (unsavedChanges && !unsavedChanges.confirmIfDirty()) {
      e.preventDefault();
      return false;
    }
    return true;
  }

  return (
    <>
      {/* ── Desktop nav — horizontal strip ── */}
      <nav
        aria-label="Portal navigation"
        className="hidden overflow-x-auto scrollbar-none sm:block"
        style={{ background: "rgba(251, 244, 232, 0.96)" }}
      >
        <div
          className="flex items-center border-b px-2"
          style={{ borderColor: "#e8ddd4" }}
        >
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="shrink-0 px-4 py-4 text-xs uppercase tracking-[0.18em] transition"
                style={{
                  color: active ? "#2d1f14" : "#8a7060",
                  borderBottom: active
                    ? "2px solid #c9a0a0"
                    : "2px solid transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Mobile nav — hamburger ── */}
      <div
        className="sm:hidden"
        style={{ background: "rgba(251, 244, 232, 0.96)" }}
      >
        {/* Trigger row */}
        <div
          className="flex items-center justify-between border-b px-5 py-3"
          style={{ borderColor: "#e8ddd4" }}
        >
          <span
            className="text-xs uppercase tracking-[0.24em]"
            style={{ color: "#8a7060" }}
          >
            {items.find((i) => i.href === pathname)?.label ?? "Menu"}
          </span>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full transition"
            style={{ color: "#3d2b1f" }}
          >
            {open ? (
              /* X icon */
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <line x1="3" y1="3" x2="15" y2="15" />
                <line x1="15" y1="3" x2="3" y2="15" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <line x1="2" y1="5" x2="16" y2="5" />
                <line x1="2" y1="9" x2="16" y2="9" />
                <line x1="2" y1="13" x2="16" y2="13" />
              </svg>
            )}
          </button>
        </div>

        {/* Dropdown menu */}
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: open ? `${items.length * 48 + 16}px` : "0px",
            opacity: open ? 1 : 0,
          }}
        >
          <nav
            aria-label="Mobile portal navigation"
            className="border-b px-4 pb-3 pt-1"
            style={{ borderColor: "#e8ddd4" }}
          >
            {items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    if (!handleNavClick(e)) return;
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition"
                  style={{
                    color: active ? "#2d1f14" : "#6b5444",
                    background: active
                      ? "rgba(201,160,160,0.12)"
                      : "transparent",
                    fontStyle: active ? "italic" : "normal",
                  }}
                >
                  {active && (
                    <span style={{ color: "#c9a0a0" }} aria-hidden>
                      ✦
                    </span>
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
