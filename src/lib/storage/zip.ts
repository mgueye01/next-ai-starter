import archiver from "archiver";
import { PassThrough, Readable } from "stream";

interface ZipFile {
  url: string;
  filename: string;
}

// ==================== BATCH DOWNLOAD ====================

export async function createZipFromUrls(
  files: ZipFile[]
): Promise<PassThrough> {
  const passThrough = new PassThrough();
  const archive = archiver("zip", {
    zlib: { level: 5 }, // Balanced compression
  });

  // Pipe archive to pass-through stream
  archive.pipe(passThrough);

  // Add files to archive
  for (const file of files) {
    try {
      const response = await fetch(file.url);
      if (!response.ok) {
        console.error(`Failed to fetch ${file.url}: ${response.statusText}`);
        continue;
      }

      const arrayBuffer = await response.arrayBuffer();
      archive.append(Buffer.from(arrayBuffer), { name: file.filename });
    } catch (error) {
      console.error(`Error fetching ${file.url}:`, error);
    }
  }

  // Finalize archive (this will trigger the end event)
  archive.finalize();

  return passThrough;
}

export async function createZipBuffer(files: ZipFile[]): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    const chunks: Buffer[] = [];
    const archive = archiver("zip", {
      zlib: { level: 5 },
    });

    archive.on("data", (chunk) => chunks.push(chunk));
    archive.on("end", () => resolve(Buffer.concat(chunks)));
    archive.on("error", reject);

    // Add files to archive
    for (const file of files) {
      try {
        const response = await fetch(file.url);
        if (!response.ok) continue;

        const arrayBuffer = await response.arrayBuffer();
        archive.append(Buffer.from(arrayBuffer), { name: file.filename });
      } catch (error) {
        console.error(`Error fetching ${file.url}:`, error);
      }
    }

    archive.finalize();
  });
}

export function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

// ==================== STREAMING DOWNLOAD ====================

export async function* streamZipFiles(
  files: ZipFile[]
): AsyncGenerator<{ filename: string; buffer: Buffer }> {
  for (const file of files) {
    try {
      const response = await fetch(file.url);
      if (!response.ok) continue;

      const arrayBuffer = await response.arrayBuffer();
      yield {
        filename: file.filename,
        buffer: Buffer.from(arrayBuffer),
      };
    } catch (error) {
      console.error(`Error fetching ${file.url}:`, error);
    }
  }
}
