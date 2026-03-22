"use client";

import { useState } from "react";
import type { Locale } from "@/lib/locale";

export function MessageForm({ locale }: { locale: Locale }) {
  const t =
    locale === "es"
      ? {
          heading: "¡Nos encantaría escucharte!",
          sub: "Déjanos una nota, una pregunta o un mensaje especial para Ana y Joshua.",
          placeholder: "Escribe tu mensaje aquí...",
          submit: "Enviar Mensaje",
          sending: "Enviando...",
          ok: "¡Mensaje enviado! Gracias por tus palabras.",
          error: "No pudimos enviar tu mensaje. Inténtalo otra vez.",
        }
      : {
          heading: "We'd love to hear from you!",
          sub: "Leave us a note, a question, or a sweet message for Ana & Joshua.",
          placeholder: "Write your message here...",
          submit: "Send Message",
          sending: "Sending...",
          ok: "Message sent! Thank you for your kind words.",
          error: "Unable to send your message. Please try again.",
        };

  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setStatus("sending");

    const res = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    if (res.ok) {
      setStatus("ok");
      setText("");
    } else {
      setStatus("error");
    }
  }

  return (
    <div
      className="mt-8 rounded-2xl p-6"
      style={{
        border: "1px solid rgba(201,160,160,0.2)",
        background: "rgba(255,255,255,0.05)",
      }}
    >
      <p
        className="text-xs uppercase tracking-[0.28em]"
        style={{ color: "#c9a0a0" }}
      >
        ✦
      </p>
      <h3
        className="mt-2 font-serif italic"
        style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)", color: "#f5ece0" }}
      >
        {t.heading}
      </h3>
      <p className="mt-1 text-sm leading-6" style={{ color: "#c4a898" }}>
        {t.sub}
      </p>

      {status === "ok" ? (
        <p
          className="mt-5 text-sm"
          style={{ color: "#7ec8a0" }}
        >
          {t.ok}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.placeholder}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition"
            style={{
              border: "1px solid rgba(201,160,160,0.2)",
              background: "rgba(255,255,255,0.04)",
              color: "#f0e0d0",
            }}
          />
          {status === "error" && (
            <p className="text-xs" style={{ color: "#e0a0a0" }}>
              {t.error}
            </p>
          )}
          <button
            type="submit"
            disabled={status === "sending" || !text.trim()}
            className="rounded-full px-7 py-2.5 text-xs uppercase tracking-[0.22em] transition disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              border: "1px solid #c9a0a0",
              color: "#f0e0d0",
              background: "transparent",
            }}
          >
            {status === "sending" ? t.sending : t.submit}
          </button>
        </form>
      )}
    </div>
  );
}
