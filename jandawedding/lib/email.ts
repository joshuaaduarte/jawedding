import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Notification email goes to Joshua
const NOTIFY_EMAIL = "Joshua.duarte151@gmail.com";

// The "from" address uses Resend's sandbox sender.
// Once you verify a custom domain in Resend, replace this with
// something like: "wedding@yourdomain.com"
const FROM_EMAIL = "onboarding@resend.dev";

export async function sendRsvpNotification(input: {
  guestName: string;
  inviteCode: string;
  attendance: "yes" | "no";
  guestCount: number;
  notes: string;
}): Promise<void> {
  const attending = input.attendance === "yes";
  const emoji = attending ? "🎉" : "💌";
  const status = attending ? "ATTENDING" : "DECLINING";

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `${emoji} RSVP — ${input.guestName} is ${status}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; color: #292524;">
          <h2 style="font-size: 24px; margin-bottom: 16px;">New RSVP Received</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #78716c; width: 130px;">Guest</td><td style="padding: 8px 0;"><strong>${input.guestName}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #78716c;">Invite Code</td><td style="padding: 8px 0;">${input.inviteCode}</td></tr>
            <tr><td style="padding: 8px 0; color: #78716c;">Status</td><td style="padding: 8px 0;">${status}</td></tr>
            <tr><td style="padding: 8px 0; color: #78716c;">Guest Count</td><td style="padding: 8px 0;">${input.guestCount}</td></tr>
            <tr><td style="padding: 8px 0; color: #78716c;">Notes</td><td style="padding: 8px 0;">${input.notes || "—"}</td></tr>
          </table>
        </div>
      `,
    });
  } catch (err) {
    // Email failure should never break the RSVP submission
    console.error("Failed to send RSVP notification email:", err);
  }
}
