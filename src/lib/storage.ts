import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";

// Support for Minio or any S3-compatible storage
const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  endpoint: process.env.S3_ENDPOINT, // Custom endpoint for Minio
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true, // Required for Minio compatibility
});

const BUCKET = process.env.BUCKET_NAME!;
const S3_PUBLIC_URL = process.env.S3_PUBLIC_URL || `https://${BUCKET}.s3.amazonaws.com`;
const GALLERIES_PREFIX = process.env.AWS_S3_GALLERIES_PREFIX || "galleries";

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
    }),
  );
  return `${S3_PUBLIC_URL}/${key}`;
}

// ==================== GALLERY MEDIA ====================

function getGalleryMediaKey(
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

  return `${S3_PUBLIC_URL}/${key}`;
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

  return `${S3_PUBLIC_URL}/${key}`;
}

export async function deleteGalleryMedia(galleryId: string, filename: string) {
  const keys = [
    getGalleryMediaKey(galleryId, filename, "original"),
    getGalleryMediaKey(galleryId, filename, "medium"),
    getGalleryMediaKey(galleryId, filename, "thumbnail"),
  ];

  // Use individual DeleteObjectCommand for Minio compatibility
  // (DeleteObjectsCommand requires Content-MD5 header which causes issues)
  await Promise.all(
    keys.map((key) =>
      s3.send(
        new DeleteObjectCommand({
          Bucket: BUCKET,
          Key: key,
        })
      ).catch(() => {
        // Ignore errors for non-existent files (thumbnails may not exist)
      })
    )
  );
}

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
