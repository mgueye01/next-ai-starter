import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { galleryId, event, metadata, sessionId, clientToken } = body;

    if (!galleryId || !event) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify session exists (for guests)
    if (sessionId) {
      const session = await prisma.guestSession.findUnique({
        where: { id: sessionId },
      });
      if (!session) {
        return NextResponse.json(
          { error: "Invalid session" },
          { status: 401 }
        );
      }
    }

    // Track the event
    await prisma.galleryAnalytics.create({
      data: {
        galleryId,
        event,
        metadata: {
          ...(metadata || {}),
          sessionId,
          clientToken: clientToken ? "present" : undefined,
          timestamp: new Date().toISOString(),
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}
