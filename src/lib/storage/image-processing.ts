import sharp from "sharp";
import { uploadGalleryThumbnail } from "../storage";

interface ProcessedImage {
  width: number;
  height: number;
  size: number;
  thumbnailUrl: string;
  mediumUrl: string;
}

interface ImageMetadata {
  width?: number;
  height?: number;
  format?: string;
  space?: string;
  channels?: number;
  density?: number;
  hasAlpha?: boolean;
  orientation?: number;
}

// ==================== IMAGE PROCESSING ====================

export async function processGalleryImage(
  galleryId: string,
  originalBuffer: Buffer,
  filename: string
): Promise<ProcessedImage> {
  // Get original image metadata
  const metadata = await sharp(originalBuffer).metadata();

  // Generate base filename without extension
  const baseName = filename.replace(/\.[^.]+$/, "");

  // Process medium size (1200px wide)
  const mediumBuffer = await sharp(originalBuffer)
    .resize(1200, null, {
      withoutEnlargement: true,
      fit: "inside",
    })
    .jpeg({ quality: 85, progressive: true })
    .toBuffer();

  // Process thumbnail (400px wide)
  const thumbnailBuffer = await sharp(originalBuffer)
    .resize(400, null, {
      withoutEnlargement: true,
      fit: "inside",
    })
    .jpeg({ quality: 80, progressive: true })
    .toBuffer();

  // Upload both versions
  const [mediumUrl, thumbnailUrl] = await Promise.all([
    uploadGalleryThumbnail(galleryId, mediumBuffer, `${baseName}.jpg`, "medium"),
    uploadGalleryThumbnail(
      galleryId,
      thumbnailBuffer,
      `${baseName}.jpg`,
      "thumbnail"
    ),
  ]);

  return {
    width: metadata.width || 0,
    height: metadata.height || 0,
    size: originalBuffer.length,
    thumbnailUrl,
    mediumUrl,
  };
}

export async function getImageMetadata(
  buffer: Buffer
): Promise<ImageMetadata> {
  const metadata = await sharp(buffer).metadata();
  return {
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
    space: metadata.space,
    channels: metadata.channels,
    density: metadata.density,
    hasAlpha: metadata.hasAlpha,
    orientation: metadata.orientation,
  };
}

export async function generateImageThumbnail(
  buffer: Buffer,
  width: number,
  quality: number = 80
): Promise<Buffer> {
  return sharp(buffer)
    .resize(width, null, {
      withoutEnlargement: true,
      fit: "inside",
    })
    .jpeg({ quality, progressive: true })
    .toBuffer();
}

export async function extractVideoThumbnail(
  _videoPath: string
): Promise<Buffer | null> {
  // Video thumbnail extraction would require ffmpeg
  // This is a placeholder - in production, use a service like AWS MediaConvert
  // or implement ffmpeg-based extraction
  console.warn("Video thumbnail extraction not implemented");
  return null;
}

// ==================== WATERMARK ====================

export async function addWatermark(
  imageBuffer: Buffer,
  watermarkText: string
): Promise<Buffer> {
  const image = sharp(imageBuffer);
  const metadata = await image.metadata();

  const width = metadata.width || 800;
  const height = metadata.height || 600;

  // Create watermark SVG
  const fontSize = Math.max(16, Math.floor(width / 30));
  const watermarkSvg = Buffer.from(`
    <svg width="${width}" height="${height}">
      <style>
        .watermark {
          fill: rgba(255, 255, 255, 0.5);
          font-size: ${fontSize}px;
          font-family: Arial, sans-serif;
          font-weight: bold;
        }
      </style>
      <text
        x="50%"
        y="95%"
        text-anchor="middle"
        class="watermark"
      >${watermarkText}</text>
    </svg>
  `);

  return image
    .composite([
      {
        input: watermarkSvg,
        gravity: "southeast",
      },
    ])
    .toBuffer();
}
