import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.BUCKET_NAME!;
const GALLERIES_PREFIX = process.env.AWS_S3_GALLERIES_PREFIX || "galleries";

// ==================== BASIC OPERATIONS ====================

export async function uploadFile(
  key: string,
  body: Buffer | Uint8Array | Blob | string,
  contentType?: string
) {
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
  return `https://${BUCKET}.s3.amazonaws.com/${key}`;
}

export async function deleteFile(key: string) {
  await s3.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
  );
}

export async function deleteFiles(keys: string[]) {
  if (keys.length === 0) return;

  await s3.send(
    new DeleteObjectsCommand({
      Bucket: BUCKET,
      Delete: {
        Objects: keys.map((key) => ({ Key: key })),
      },
    })
  );
}

// ==================== GALLERY MEDIA ====================

export function getGalleryMediaKey(
  galleryId: string,
  filename: string,
  variant: "original" | "medium" | "thumbnail" = "original"
) {
  return `${GALLERIES_PREFIX}/${galleryId}/${variant}/${filename}`;
}

export async function uploadGalleryMedia(
  galleryId: string,
  file: Buffer,
  filename: string,
  contentType: string
) {
  const key = getGalleryMediaKey(galleryId, filename, "original");

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file,
      ContentType: contentType,
    })
  );

  return `https://${BUCKET}.s3.amazonaws.com/${key}`;
}

export async function uploadGalleryThumbnail(
  galleryId: string,
  file: Buffer,
  filename: string,
  variant: "medium" | "thumbnail"
) {
  const key = getGalleryMediaKey(galleryId, filename, variant);

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file,
      ContentType: "image/jpeg",
    })
  );

  return `https://${BUCKET}.s3.amazonaws.com/${key}`;
}

export async function deleteGalleryMedia(galleryId: string, filename: string) {
  const keys = [
    getGalleryMediaKey(galleryId, filename, "original"),
    getGalleryMediaKey(galleryId, filename, "medium"),
    getGalleryMediaKey(galleryId, filename, "thumbnail"),
  ];

  await deleteFiles(keys);
}

// ==================== SIGNED URLS ====================

export async function getSignedDownloadUrl(
  key: string,
  expiresIn: number = 3600,
  filename?: string
) {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ...(filename && {
      ResponseContentDisposition: `attachment; filename="${filename}"`,
    }),
  });

  return getSignedUrl(s3, command, { expiresIn });
}

export async function getSignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn: number = 3600
) {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(s3, command, { expiresIn });
}

// ==================== HELPERS ====================

export function extractKeyFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    // Remove leading slash
    return urlObj.pathname.slice(1);
  } catch {
    return null;
  }
}

export function getPublicUrl(key: string): string {
  return `https://${BUCKET}.s3.amazonaws.com/${key}`;
}
