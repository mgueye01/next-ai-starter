import { NextResponse } from "next/server";
import { uploadFile } from "@/lib/storage";
import { getServerAuthSession } from "@/lib/auth";

// Types de fichiers autorisés
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'video/mp4',
  'video/webm',
];

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.webm'];

// Taille maximale: 50MB
const MAX_FILE_SIZE = 50 * 1024 * 1024;

export async function POST(req: Request) {
  try {
    // Vérification de l'authentification
    const session = await getServerAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Non autorisé. Veuillez vous connecter." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
    }

    // Validation du type MIME
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Type de fichier non autorisé: ${file.type}. Types acceptés: images (JPEG, PNG, WebP, GIF) et vidéos (MP4, WebM).` },
        { status: 400 }
      );
    }

    // Validation de l'extension
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return NextResponse.json(
        { error: `Extension non autorisée: ${extension}` },
        { status: 400 }
      );
    }

    // Validation de la taille
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `Fichier trop volumineux. Taille maximale: 50MB` },
        { status: 413 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const url = await uploadFile(file.name, buffer);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Échec de l'upload" }, { status: 500 });
  }
}
