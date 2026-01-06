"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/trpc/react";
import { ArrowLeft, Check, Image as ImageIcon } from "lucide-react";
import MediaUploader from "@/components/admin/galleries/MediaUploader";

export default function UploadMediaPage() {
  const params = useParams();
  const router = useRouter();
  const galleryId = params.galleryId as string;

  const { data: gallery, isLoading, refetch } = api.gallery.getById.useQuery({
    id: galleryId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ECEEDF] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-white rounded-xl w-48" />
            <div className="h-64 bg-white rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="min-h-screen bg-[#ECEEDF] p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-[#6B5B47]">Galerie non trouvée</h1>
          <Link href="/admin/galleries" className="text-[#CFAB8D] hover:underline mt-4 inline-block">
            Retour aux galeries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECEEDF] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href={`/admin/galleries/${galleryId}`}
              className="p-2 text-[#6B5B47] hover:bg-white rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-[#6B5B47]">
                Ajouter des photos
              </h1>
              <p className="text-[#8B7355] mt-1">{gallery.title}</p>
            </div>
          </div>

          <Link
            href={`/admin/galleries/${galleryId}`}
            className="flex items-center gap-2 px-6 py-3 bg-[#CFAB8D] text-white rounded-xl hover:bg-[#B8967A] transition-colors"
          >
            <Check size={20} />
            Terminé
          </Link>
        </div>

        {/* Current Media Count */}
        <div className="bg-white rounded-xl p-6 mb-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#ECEEDF] rounded-lg flex items-center justify-center">
            <ImageIcon size={24} className="text-[#CFAB8D]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#6B5B47]">
              {gallery.media.length}
            </p>
            <p className="text-[#8B7355]">photos dans la galerie</p>
          </div>
        </div>

        {/* Uploader */}
        <MediaUploader galleryId={galleryId} onUploadComplete={() => refetch()} />

        {/* Existing Media Grid */}
        {gallery.media.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-[#6B5B47] mb-4">
              Photos existantes
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {gallery.media.map((media) => (
                <div
                  key={media.id}
                  className="aspect-square bg-white rounded-lg overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={media.thumbnailUrl || media.originalUrl}
                    alt={media.filename}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
