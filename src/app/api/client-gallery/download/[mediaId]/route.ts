import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyClientToken, verifyGuestSession } from "@/lib/auth/client-auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ mediaId: string }> }
) {
  try {
    const { mediaId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const clientToken = searchParams.get("clientToken");
    const guestSessionId = searchParams.get("guestSessionId");

    // Verify authentication
    let isAuthenticated = false;
    let clientId: string | undefined;

    if (clientToken) {
      const client = await verifyClientToken(clientToken);
      if (client) {
        isAuthenticated = true;
        clientId = client.id;
      }
    } else if (guestSessionId) {
      const session = await verifyGuestSession(guestSessionId);
      if (session) isAuthenticated = true;
    }

    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get media and gallery
    const media = await prisma.galleryMedia.findUnique({
      where: { id: mediaId },
      include: {
        gallery: {
          select: {
            id: true,
            allowDownload: true,
            status: true,
          },
        },
      },
    });

    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    if (
      media.gallery.status !== "PUBLISHED" ||
      !media.gallery.allowDownload
    ) {
      return NextResponse.json(
        { error: "Download not allowed" },
        { status: 403 }
      );
    }

    // Track download
    await prisma.download.create({
      data: {
        mediaId,
        type: "SINGLE",
        ...(clientId
          ? { clientId }
          : { guestSessionId: guestSessionId || undefined }),
      },
    });

    // Redirect to the file URL
    return NextResponse.redirect(media.originalUrl);
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Download failed" },
      { status: 500 }
    );
  }
}
