import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createZipBuffer } from "@/lib/storage/zip";
import { verifyClientToken, verifyGuestSession } from "@/lib/auth/client-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { galleryId, mediaIds, clientToken, guestSessionId } = body;

    // Verify authentication
    let isAuthenticated = false;

    if (clientToken) {
      const client = await verifyClientToken(clientToken);
      if (client) isAuthenticated = true;
    } else if (guestSessionId) {
      const session = await verifyGuestSession(guestSessionId);
      if (session) isAuthenticated = true;
    }

    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get gallery and check permissions
    const gallery = await prisma.gallery.findUnique({
      where: { id: galleryId },
      select: {
        id: true,
        title: true,
        allowDownload: true,
        status: true,
      },
    });

    if (!gallery || gallery.status !== "PUBLISHED" || !gallery.allowDownload) {
      return NextResponse.json(
        { error: "Download not allowed" },
        { status: 403 }
      );
    }

    // Get media files
    const whereClause: { galleryId: string; id?: { in: string[] } } = {
      galleryId,
    };

    if (mediaIds && mediaIds.length > 0) {
      whereClause.id = { in: mediaIds };
    }

    const media = await prisma.galleryMedia.findMany({
      where: whereClause,
      select: {
        id: true,
        filename: true,
        originalUrl: true,
      },
    });

    if (media.length === 0) {
      return NextResponse.json({ error: "No media found" }, { status: 404 });
    }

    // Create ZIP file
    const files = media.map((m) => ({
      url: m.originalUrl,
      filename: m.filename,
    }));

    const zipBuffer = await createZipBuffer(files);

    // Track download
    await prisma.download.create({
      data: {
        galleryId,
        type: mediaIds && mediaIds.length > 0 ? "SELECTION" : "ALL",
        ...(clientToken
          ? {
              clientId: (await verifyClientToken(clientToken))?.id,
            }
          : {
              guestSessionId,
            }),
      },
    });

    // Return ZIP file
    const filename = `${gallery.title.replace(/[^a-zA-Z0-9]/g, "_")}_photos.zip`;

    return new NextResponse(new Uint8Array(zipBuffer), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": zipBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Batch download error:", error);
    return NextResponse.json(
      { error: "Download failed" },
      { status: 500 }
    );
  }
}
