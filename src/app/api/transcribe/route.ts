import { type NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { getServerAuthSession } from "@/lib/auth";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY ?? "",
});

// Types audio autorisés
const ALLOWED_AUDIO_TYPES = [
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/webm',
  'audio/ogg',
  'audio/flac',
  'audio/m4a',
];

// Taille maximale: 25MB (limite Groq)
const MAX_AUDIO_SIZE = 25 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    // Vérification de l'authentification
    const session = await getServerAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Non autorisé. Veuillez vous connecter." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier audio fourni" },
        { status: 400 }
      );
    }

    // Validation du type
    if (!ALLOWED_AUDIO_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Type audio non supporté: ${file.type}. Types acceptés: MP3, WAV, WebM, OGG, FLAC, M4A.` },
        { status: 400 }
      );
    }

    // Validation de la taille
    if (file.size > MAX_AUDIO_SIZE) {
      return NextResponse.json(
        { error: "Fichier audio trop volumineux. Taille maximale: 25MB" },
        { status: 413 }
      );
    }

    const transcription = await groq.audio.transcriptions.create({
      file,
      model: "distil-whisper-large-v3-en",
    });

    return NextResponse.json({ text: transcription.text });
  } catch (error) {
    console.error("Transcription error:", error);
    return NextResponse.json(
      { error: "Échec de la transcription" },
      { status: 500 }
    );
  }
}
