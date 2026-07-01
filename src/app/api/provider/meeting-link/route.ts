import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isValidMeetingLink, normalizeMeetingLink } from "@/lib/meeting-links";

const schema = z.object({
  meetingLink: z.string().min(1),
});

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.providerId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const meetingLink = normalizeMeetingLink(parsed.data.meetingLink);
  if (!isValidMeetingLink(meetingLink)) {
    return NextResponse.json(
      {
        error:
          "Please enter a valid Zoom link (zoom.us/j/...) or Google Meet link (meet.google.com/...).",
      },
      { status: 400 },
    );
  }

  await prisma.provider.update({
    where: { id: session.user.providerId },
    data: { meetingLink },
  });

  return NextResponse.json({ ok: true, meetingLink });
}
