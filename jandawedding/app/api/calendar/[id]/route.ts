import { NextRequest, NextResponse } from "next/server";
import { getEventById } from "@/lib/guest-data";
import { getAuthenticatedGuest } from "@/lib/auth";

function parseLocalDatetime(dt: string) {
  const [datePart, timePart = "00:00"] = dt.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  return { year, month, day, hour, minute };
}

function toIcalDatetime(p: ReturnType<typeof parseLocalDatetime>): string {
  return (
    `${p.year}` +
    `${String(p.month).padStart(2, "0")}` +
    `${String(p.day).padStart(2, "0")}` +
    `T${String(p.hour).padStart(2, "0")}` +
    `${String(p.minute).padStart(2, "0")}00`
  );
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const guest = await getAuthenticatedGuest();
  if (!guest) return new NextResponse("Unauthorized", { status: 401 });

  const { id } = await params;
  const event = await getEventById(id);
  if (!event) return new NextResponse("Not Found", { status: 404 });
  if (!event.startDatetime)
    return new NextResponse("No datetime set for this event", { status: 400 });

  const start = parseLocalDatetime(event.startDatetime);
  const end = { ...start, hour: (start.hour + 2) % 24 };

  const now = new Date().toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
  const slug = event.title.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ana & Joshua Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}@jawedding`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=America/Los_Angeles:${toIcalDatetime(start)}`,
    `DTEND;TZID=America/Los_Angeles:${toIcalDatetime(end)}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return new NextResponse(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/calendar;charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}.ics"`,
    },
  });
}
