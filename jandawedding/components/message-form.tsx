"use client";

import { useState } from "react";
import type { GuestMessage } from "@/lib/message-store";
import type { Locale } from "@/lib/locale";

type MessageFormProps = {
  locale: Locale;
  existingMessages: GuestMessage[];
};

export function MessageForm({ locale, existingMessages }: MessageFormProps) {
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
          another: "Enviar otro mensaje",
          previous: "Mensajes anteriores",
        }
      : {
          heading: "We'd love to hear from you!",
          sub: "Leave us a note, a question, or a sweet message for Ana & Joshua.",
          placeholder: "Write your message here...",
          submit: "Send Message",
          sending: "Sending...",
          ok: "Message sent! Thank you for your kind words.",
          error: "Unable to send your message. Please try again.",
          another: "Send another message",
          previous: "Previous messages",
        };

  const [messages, setMessages] = useState<GuestMessage[]>(existingMessages);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );
  const [showForm, setShowForm] = useState(messages.length === 0);

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
      const now = new Date().toISOString();
      setMessages((prev) => [
        ...prev,
        {
          id: now,
          guestId: "",
          inviteCode: "",
          guestName: "",
          body: text.trim(),
          submittedAt: now,
        },
      ]);
      setStatus("ok");
      setText("");
    } else {
      setStatus("error");
    }
  }

  function handleSendAnother() {
    setShowForm(true);
    setStatus("idle");
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

      {/* Previous messages */}
      {messages.length > 0 && (
        <div className="mt-5 space-y-3">
          <p
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: "#8a7060" }}
          >
            {t.previous}
          </p>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-xl px-4 py-3"
              style={{
                border: "1px solid rgba(201,160,160,0.12)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <p className="text-sm leading-6" style={{ color: "#e0d0c0" }}>
                {msg.body}
              </p>
              <p
                className="mt-1 text-xs"
                style={{ color: "#8a7060" }}
              >
                {msg.guestName
                  ? msg.guestName
                  : locale === "es"
                    ? "Tú"
                    : "You"}{" "}
                ·{" "}
                {new Date(msg.submittedAt).toLocaleDateString(
                  locale === "es" ? "es" : "en-US",
                  { month: "short", day: "numeric" },
                )}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Form or success + send another */}
      {status === "ok" && !showForm ? (
        <div className="mt-5">
          <p className="text-sm" style={{ color: "#7ec8a0" }}>
            {t.ok}
          </p>
          <button
            type="button"
            onClick={handleSendAnother}
            className="mt-3 rounded-full px-7 py-2.5 text-xs uppercase tracking-[0.22em] transition"
            style={{
              border: "1px solid rgba(201,160,160,0.35)",
              color: "#c4a898",
              background: "transparent",
            }}
          >
            {t.another}
          </button>
        </div>
      ) : showForm || messages.length === 0 ? (
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
      ) : (
        <div className="mt-5">
          <button
            type="button"
            onClick={handleSendAnother}
            className="rounded-full px-7 py-2.5 text-xs uppercase tracking-[0.22em] transition"
            style={{
              border: "1px solid rgba(201,160,160,0.35)",
              color: "#c4a898",
              background: "transparent",
            }}
          >
            {t.another}
          </button>
        </div>
      )}
    </div>
  );
}
