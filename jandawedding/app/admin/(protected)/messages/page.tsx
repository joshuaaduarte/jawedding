import { getAllMessages } from "@/lib/message-store";

export default async function AdminMessagesPage() {
  const messages = await getAllMessages();

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-stone-200 bg-white/90 px-6 py-5 shadow-sm">
        <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
          Guest Messages
        </p>
        <p className="mt-1 text-2xl font-semibold text-stone-900">
          {messages.length}
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 bg-white/90 p-8 text-center shadow-sm">
          <p className="text-sm text-stone-500">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <article
              key={msg.id}
              className="rounded-2xl border border-stone-200 bg-white/90 p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-stone-900">
                    {msg.guestName}
                  </p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.16em] text-stone-400">
                    {msg.inviteCode} &nbsp;·&nbsp;{" "}
                    {new Date(msg.submittedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-stone-700">
                {msg.body}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
