import { Resend } from "resend";
import { format } from "date-fns";
import { detectMeetingLinkType, meetingLinkLabel } from "@/lib/meeting-links";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const fromEmail = process.env.EMAIL_FROM ?? "Judaism 1 <bookings@judaism1.com>";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

type BookingEmailData = {
  bookingId: string;
  userName: string;
  userEmail: string;
  providerName: string;
  providerEmail: string;
  sessionName: string;
  scheduledAt: Date;
  topic: string;
  meetingLink: string;
  dashboardUrl: string;
};

export async function sendBookingConfirmationEmails(data: BookingEmailData) {
  if (!resend || !isEmailConfigured()) {
    console.info("[email] Skipped (RESEND not configured). Would send to:", data.userEmail);
    return { sent: false };
  }

  const when = format(data.scheduledAt, "EEEE, MMMM d, yyyy 'at' h:mm a");
  const linkType = meetingLinkLabel(detectMeetingLinkType(data.meetingLink));

  await Promise.all([
    resend.emails.send({
      from: fromEmail,
      to: data.userEmail,
      subject: `Session confirmed with ${data.providerName}`,
      html: `
        <p>Hi ${data.userName},</p>
        <p>Your session with <strong>${data.providerName}</strong> is confirmed.</p>
        <ul>
          <li><strong>When:</strong> ${when}</li>
          <li><strong>Session:</strong> ${data.sessionName}</li>
          <li><strong>Topic:</strong> ${data.topic}</li>
        </ul>
        <p>Join via ${linkType}:</p>
        <p><a href="${data.meetingLink}">${data.meetingLink}</a></p>
        <p>You can also find this link on your <a href="${data.dashboardUrl}">dashboard</a>.</p>
        <p style="color:#666;font-size:12px;margin-top:24px;">
          Judaism 1 provides pastoral guidance, not therapy. In crisis, call or text 988.
        </p>
      `,
    }),
    resend.emails.send({
      from: fromEmail,
      to: data.providerEmail,
      subject: `New booking: ${data.userName}`,
      html: `
        <p>Hi ${data.providerName},</p>
        <p>You have a new session booking.</p>
        <ul>
          <li><strong>Guest:</strong> ${data.userName} (${data.userEmail})</li>
          <li><strong>When:</strong> ${when}</li>
          <li><strong>Session:</strong> ${data.sessionName}</li>
          <li><strong>Topic:</strong> ${data.topic}</li>
        </ul>
        <p>The guest will join using your ${linkType} link:</p>
        <p><a href="${data.meetingLink}">${data.meetingLink}</a></p>
      `,
    }),
  ]);

  return { sent: true };
}

export async function sendBetaWelcomeEmail(email: string, name?: string | null) {
  if (!resend || !isEmailConfigured()) return { sent: false };

  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "You're on the Judaism 1 waitlist",
    html: `
      <p>Hi${name ? ` ${name}` : ""},</p>
      <p>Thanks for joining the Judaism 1 beta waitlist. We'll email you when founding guides are ready for bookings.</p>
    `,
  });

  return { sent: true };
}
