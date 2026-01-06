"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/trpc/react";
import { Camera, Lock, Image as ImageIcon } from "lucide-react";

export default function GalleryAccessPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [accessCode, setAccessCode] = useState("");
  const [guestName, setGuestName] = useState("");
  const [error, setError] = useState("");

  // Check if gallery exists and needs code
  const { data: accessInfo, isLoading } = api.gallery.checkAccess.useQuery({
    slug,
  });

  // Verify access code mutation
  const verifyCode = api.gallery.verifyAccessCode.useMutation({
    onSuccess: (data) => {
      // Store session ID
      localStorage.setItem(`gallery_session_${slug}`, data.sessionId);
      router.push(`/gallery/${slug}/view`);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  // Check for existing session
  useEffect(() => {
    const existingSession = localStorage.getItem(`gallery_session_${slug}`);
    if (existingSession && accessInfo?.exists && !accessInfo.expired) {
      router.push(`/gallery/${slug}/view`);
    }
  }, [slug, accessInfo, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!accessCode) {
      setError("Veuillez entrer le code d'accès");
      return;
    }

    await verifyCode.mutateAsync({
      slug,
      accessCode,
      guestName: guestName || undefined,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ECEEDF] flex items-center justify-center">
        <div className="animate-pulse text-[#CFAB8D]">Chargement...</div>
      </div>
    );
  }

  if (!accessInfo?.exists) {
    return (
      <div className="min-h-screen bg-[#ECEEDF] flex items-center justify-center p-4">
        <div className="text-center">
          <ImageIcon size={64} className="mx-auto text-[#CFAB8D] mb-4" />
          <h1 className="text-2xl font-bold text-[#6B5B47] mb-2">
            Galerie non trouvée
          </h1>
          <p className="text-[#8B7355] mb-6">
            Cette galerie n&apos;existe pas ou n&apos;est plus disponible
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[#CFAB8D] text-white rounded-xl hover:bg-[#B8967A] transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  if (accessInfo.expired) {
    return (
      <div className="min-h-screen bg-[#ECEEDF] flex items-center justify-center p-4">
        <div className="text-center">
          <Lock size={64} className="mx-auto text-[#8B7355] mb-4" />
          <h1 className="text-2xl font-bold text-[#6B5B47] mb-2">
            Galerie expirée
          </h1>
          <p className="text-[#8B7355] mb-6">
            Cette galerie n&apos;est plus accessible
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[#CFAB8D] text-white rounded-xl hover:bg-[#B8967A] transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECEEDF] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Camera size={40} className="text-[#CFAB8D]" />
            <span className="text-2xl font-bold text-[#6B5B47]">ElGato Photo</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          {/* Cover */}
          {accessInfo.coverImage && (
            <div className="aspect-video relative">
              <Image
                src={accessInfo.coverImage}
                alt={accessInfo.title || "Gallery"}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-2xl font-bold text-white">
                  {accessInfo.title}
                </h1>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="p-8">
            {!accessInfo.coverImage && (
              <h1 className="text-2xl font-bold text-[#6B5B47] mb-2 text-center">
                {accessInfo.title}
              </h1>
            )}

            <p className="text-[#8B7355] text-center mb-6">
              Entrez le code d&apos;accès pour voir les photos
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Access Code */}
              <div>
                <label className="block text-sm font-medium text-[#6B5B47] mb-2">
                  Code d&apos;accès
                </label>
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="123456"
                  className="w-full px-4 py-3 text-center text-2xl tracking-widest font-mono rounded-xl border border-gray-200 focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none transition-all"
                  maxLength={6}
                  required
                />
              </div>

              {/* Guest Name (optional) */}
              <div>
                <label className="block text-sm font-medium text-[#6B5B47] mb-2">
                  Votre nom (optionnel)
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Jean Dupont"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none transition-all"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm text-center">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={verifyCode.isPending}
                className="w-full py-3 bg-[#CFAB8D] text-white rounded-xl font-medium hover:bg-[#B8967A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {verifyCode.isPending ? "Vérification..." : "Accéder à la galerie"}
              </button>
            </form>
          </div>
        </div>

        {/* Client Login Link */}
        <p className="text-center text-[#8B7355] mt-6">
          Vous avez un compte client ?{" "}
          <Link href="/client/login" className="text-[#CFAB8D] hover:underline">
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}
