"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/trpc/react";
import { Camera, Image as ImageIcon, Calendar, LogOut } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface ClientData {
  id: string;
  name: string;
  email: string;
}

export default function ClientGalleriesPage() {
  const router = useRouter();
  const [clientToken, setClientToken] = useState<string | null>(null);
  const [clientData, setClientData] = useState<ClientData | null>(null);

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

  const { data: galleries, isLoading } = api.client.myGalleries.useQuery(
    { token: clientToken! },
    { enabled: !!clientToken }
  );

  const handleLogout = () => {
    localStorage.removeItem("clientToken");
    localStorage.removeItem("clientData");
    router.push("/client/login");
  };

  if (!clientToken) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#ECEEDF]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Camera size={32} className="text-[#CFAB8D]" />
            <span className="text-xl font-bold text-[#6B5B47]">ElGato Photo</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-[#6B5B47]">
              Bonjour, <strong>{clientData?.name}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-[#8B7355] hover:text-[#6B5B47] hover:bg-[#ECEEDF] rounded-lg transition-colors"
            >
              <LogOut size={18} />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#6B5B47] mb-2">Mes Galeries</h1>
        <p className="text-[#8B7355] mb-8">
          Retrouvez toutes vos photos et souvenirs
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="aspect-video bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : !galleries || galleries.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <ImageIcon size={48} className="mx-auto text-[#CFAB8D] mb-4" />
            <h2 className="text-xl font-semibold text-[#6B5B47] mb-2">
              Aucune galerie disponible
            </h2>
            <p className="text-[#8B7355]">
              Vos galeries apparaîtront ici une fois partagées par votre photographe
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleries.map((gallery) => (
              <Link
                key={gallery.id}
                href={`/client/galleries/${gallery.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
              >
                {/* Cover Image */}
                <div className="aspect-video bg-[#ECEEDF] relative overflow-hidden">
                  {gallery.coverImage ? (
                    <Image
                      src={gallery.coverImage}
                      alt={gallery.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon size={48} className="text-[#CFAB8D]" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-[#6B5B47] mb-2 group-hover:text-[#CFAB8D] transition-colors">
                    {gallery.title}
                  </h2>

                  <div className="flex items-center gap-4 text-sm text-[#8B7355]">
                    <span className="flex items-center gap-1">
                      <ImageIcon size={16} />
                      {gallery.mediaCount} photos
                    </span>
                    {gallery.eventDate && (
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {format(new Date(gallery.eventDate), "d MMM yyyy", {
                          locale: fr,
                        })}
                      </span>
                    )}
                  </div>

                  {gallery.description && (
                    <p className="mt-3 text-[#8B7355] text-sm line-clamp-2">
                      {gallery.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
