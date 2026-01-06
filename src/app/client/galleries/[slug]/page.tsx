"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/trpc/react";
import { Camera, Calendar, Download, Image as ImageIcon, ArrowLeft, LogOut } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import GalleryGrid from "@/components/client-gallery/GalleryGrid";

interface ClientData {
  id: string;
  name: string;
  email: string;
}

export default function ClientGalleryViewPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [clientToken, setClientToken] = useState<string | null>(null);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("clientToken");
    const data = localStorage.getItem("clientData");

    if (!token) {
      router.push("/client/login");
      return;
    }

    setClientToken(token);
    if (data) {
      setClientData(JSON.parse(data));
    }
  }, [router]);

  const { data: gallery, isLoading, error } = api.gallery.getBySlug.useQuery(
    { slug, clientToken: clientToken || undefined },
    { enabled: !!clientToken }
  );

  // Track view
  useEffect(() => {
    if (gallery && clientToken && !hasTrackedView.current) {
      hasTrackedView.current = true;
      fetch("/api/client-gallery/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          galleryId: gallery.id,
          event: "view",
          clientToken,
        }),
      }).catch(() => {});
    }
  }, [gallery, clientToken]);

  const handleLogout = () => {
    localStorage.removeItem("clientToken");
    localStorage.removeItem("clientData");
    router.push("/client/login");
  };

  if (!clientToken) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ECEEDF] flex items-center justify-center">
        <div className="animate-pulse text-[#CFAB8D]">Chargement...</div>
      </div>
    );
  }

  if (error || !gallery) {
    return (
      <div className="min-h-screen bg-[#ECEEDF] flex items-center justify-center p-4">
        <div className="text-center">
          <ImageIcon size={64} className="mx-auto text-[#CFAB8D] mb-4" />
          <h1 className="text-2xl font-bold text-[#6B5B47] mb-2">
            Galerie non trouvée
          </h1>
          <p className="text-[#8B7355] mb-6">
            Cette galerie n&apos;existe pas ou vous n&apos;y avez pas accès
          </p>
          <Link
            href="/client/galleries"
            className="inline-block px-6 py-3 bg-[#CFAB8D] text-white rounded-xl hover:bg-[#B8967A] transition-colors"
          >
            Retour à mes galeries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECEEDF]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/client/galleries"
              className="p-2 text-[#6B5B47] hover:bg-[#ECEEDF] rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <Camera size={32} className="text-[#CFAB8D]" />
              <span className="text-xl font-bold text-[#6B5B47]">ElGato Photo</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {gallery.allowDownload && (
              <button
                onClick={() => {
                  alert("Téléchargement de toutes les photos en cours...");
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#CFAB8D] text-white rounded-lg hover:bg-[#B8967A] transition-colors"
              >
                <Download size={18} />
                Tout télécharger
              </button>
            )}

            <span className="text-[#6B5B47]">
              {clientData?.name}
            </span>
            <button
              onClick={handleLogout}
              className="p-2 text-[#8B7355] hover:text-[#6B5B47] hover:bg-[#ECEEDF] rounded-lg transition-colors"
              title="Déconnexion"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Gallery Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-[#6B5B47] mb-2">
            {gallery.title}
          </h1>

          <div className="flex items-center gap-6 text-[#8B7355]">
            <span className="flex items-center gap-2">
              <ImageIcon size={18} />
              {gallery.media.length} photos
            </span>
            {gallery.eventDate && (
              <span className="flex items-center gap-2">
                <Calendar size={18} />
                {format(new Date(gallery.eventDate), "d MMMM yyyy", {
                  locale: fr,
                })}
              </span>
            )}
          </div>

          {gallery.description && (
            <p className="mt-4 text-[#6B5B47] max-w-2xl">
              {gallery.description}
            </p>
          )}
        </div>
      </div>

      {/* Gallery Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {gallery.media.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon size={48} className="mx-auto text-[#CFAB8D] mb-4" />
            <h2 className="text-xl font-semibold text-[#6B5B47] mb-2">
              Galerie vide
            </h2>
            <p className="text-[#8B7355]">
              Les photos seront bientôt disponibles
            </p>
          </div>
        ) : (
          <GalleryGrid
            galleryId={gallery.id}
            media={gallery.media}
            allowDownload={gallery.allowDownload}
            allowFavorites={gallery.allowFavorites}
            allowComments={gallery.allowComments}
            allowSharing={gallery.allowSharing}
            clientToken={clientToken}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-[#8B7355]">
          <p>
            © {new Date().getFullYear()} ElGato Photo. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
