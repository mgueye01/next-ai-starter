import { NextRequest, NextResponse } from "next/server";
import { getServerAuthSession } from "@/lib/auth";
import { uploadGalleryMedia } from "@/lib/storage";
import { processGalleryImage } from "@/lib/storage/image-processing";

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const session = await getServerAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const galleryId = formData.get("galleryId") as string;

    if (!file || !galleryId) {
      return NextResponse.json(
        { error: "Missing file or galleryId" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const safeFilename = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .toLowerCase();
    const filename = `${timestamp}-${safeFilename}`;

    // Upload original file
    const originalUrl = await uploadGalleryMedia(
      galleryId,
      buffer,
      filename,
      file.type
    );

    // Process image (generate thumbnails)
    let processedData = {
      width: 0,
      height: 0,
      thumbnailUrl: undefined as string | undefined,
      mediumUrl: undefined as string | undefined,
    };

    if (file.type.startsWith("image/")) {
      const processed = await processGalleryImage(galleryId, buffer, filename);
      processedData = {
        width: processed.width,
        height: processed.height,
        thumbnailUrl: processed.thumbnailUrl,
        mediumUrl: processed.mediumUrl,
      };
    }

    return NextResponse.json({
      filename,
      originalUrl,
      thumbnailUrl: processedData.thumbnailUrl,
      mediumUrl: processedData.mediumUrl,
      width: processedData.width,
      height: processedData.height,
      size: buffer.length,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
