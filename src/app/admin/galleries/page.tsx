"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/trpc/react";
import { Plus, Image as ImageIcon, Users, Eye, MoreVertical, Trash2, Edit, Copy, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function AdminGalleriesPage() {
  const { data: galleries, isLoading, refetch } = api.gallery.list.useQuery();
  const deleteGallery = api.gallery.delete.useMutation({
    onSuccess: () => refetch(),
  });
  const setStatus = api.gallery.setStatus.useMutation({
    onSuccess: () => refetch(),
  });
  const regenerateCode = api.gallery.regenerateAccessCode.useMutation({
    onSuccess: () => refetch(),
  });

  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const copyAccessLink = (slug: string, accessCode: string | null) => {
    const url = `${window.location.origin}/gallery/${slug}`;
    const text = accessCode ? `${url}\nCode d'accès: ${accessCode}` : url;
    navigator.clipboard.writeText(text);
    setMenuOpen(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette galerie ?")) {
      await deleteGallery.mutateAsync({ id });
    }
  };

  const togglePublish = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    await setStatus.mutateAsync({ id, status: newStatus });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ECEEDF] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECEEDF] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#6B5B47]">Galeries Client</h1>
            <p className="text-[#8B7355] mt-1">Gérez vos galeries privées</p>
          </div>
          <Link
            href="/admin/galleries/new"
            className="flex items-center gap-2 bg-[#CFAB8D] text-white px-6 py-3 rounded-xl hover:bg-[#B8967A] transition-colors"
          >
            <Plus size={20} />
            Nouvelle galerie
          </Link>
        </div>

        {/* Gallery List */}
        {!galleries || galleries.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <ImageIcon size={48} className="mx-auto text-[#CFAB8D] mb-4" />
            <h2 className="text-xl font-semibold text-[#6B5B47] mb-2">
              Aucune galerie
            </h2>
            <p className="text-[#8B7355] mb-6">
              Créez votre première galerie pour commencer à partager vos photos
            </p>
            <Link
              href="/admin/galleries/new"
              className="inline-flex items-center gap-2 bg-[#CFAB8D] text-white px-6 py-3 rounded-xl hover:bg-[#B8967A] transition-colors"
            >
              <Plus size={20} />
              Créer une galerie
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {galleries.map((gallery) => (
              <div
                key={gallery.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-6">
                  {/* Cover Image */}
                  <div className="w-24 h-24 bg-[#ECEEDF] rounded-lg overflow-hidden flex-shrink-0">
                    {gallery.coverImage ? (
                      <Image
                        src={gallery.coverImage}
                        alt={gallery.title}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={32} className="text-[#CFAB8D]" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-xl font-semibold text-[#6B5B47] truncate">
                        {gallery.title}
                      </h2>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          gallery.status === "PUBLISHED"
                            ? "bg-green-100 text-green-700"
                            : gallery.status === "ARCHIVED"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {gallery.status === "PUBLISHED"
                          ? "Publié"
                          : gallery.status === "ARCHIVED"
                          ? "Archivé"
                          : "Brouillon"}
                      </span>
                    </div>

                    <p className="text-sm text-[#8B7355] mb-3">
                      Créé le{" "}
                      {format(new Date(gallery.createdAt), "d MMMM yyyy", {
                        locale: fr,
                      })}
                      {gallery.eventDate &&
                        ` • Événement: ${format(
                          new Date(gallery.eventDate),
                          "d MMMM yyyy",
                          { locale: fr }
                        )}`}
                    </p>

                    <div className="flex items-center gap-6 text-sm text-[#8B7355]">
                      <span className="flex items-center gap-1">
                        <ImageIcon size={16} />
                        {gallery.mediaCount} photos
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={16} />
                        {gallery.clientCount} clients
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={16} />
                        {gallery.sessionCount} visites
                      </span>
                      {gallery.accessCode && (
                        <span className="font-mono bg-[#ECEEDF] px-2 py-1 rounded">
                          Code: {gallery.accessCode}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/galleries/${gallery.id}/upload`}
                      className="p-2 text-[#6B5B47] hover:bg-[#ECEEDF] rounded-lg transition-colors"
                      title="Ajouter des photos"
                    >
                      <Plus size={20} />
                    </Link>
                    <Link
                      href={`/admin/galleries/${gallery.id}`}
                      className="p-2 text-[#6B5B47] hover:bg-[#ECEEDF] rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit size={20} />
                    </Link>

                    {/* Menu */}
                    <div className="relative">
                      <button
                        onClick={() =>
                          setMenuOpen(menuOpen === gallery.id ? null : gallery.id)
                        }
                        className="p-2 text-[#6B5B47] hover:bg-[#ECEEDF] rounded-lg transition-colors"
                      >
                        <MoreVertical size={20} />
                      </button>

                      {menuOpen === gallery.id && (
                        <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-2 w-48 z-10">
                          <button
                            onClick={() =>
                              copyAccessLink(gallery.slug, gallery.accessCode)
                            }
                            className="w-full px-4 py-2 text-left text-sm text-[#6B5B47] hover:bg-[#ECEEDF] flex items-center gap-2"
                          >
                            <Copy size={16} />
                            Copier le lien
                          </button>
                          <a
                            href={`/gallery/${gallery.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full px-4 py-2 text-left text-sm text-[#6B5B47] hover:bg-[#ECEEDF] flex items-center gap-2"
                          >
                            <ExternalLink size={16} />
                            Voir la galerie
                          </a>
                          <button
                            onClick={() =>
                              togglePublish(gallery.id, gallery.status)
                            }
                            className="w-full px-4 py-2 text-left text-sm text-[#6B5B47] hover:bg-[#ECEEDF] flex items-center gap-2"
                          >
                            <Eye size={16} />
                            {gallery.status === "PUBLISHED"
                              ? "Dépublier"
                              : "Publier"}
                          </button>
                          <button
                            onClick={() =>
                              regenerateCode.mutateAsync({ id: gallery.id })
                            }
                            className="w-full px-4 py-2 text-left text-sm text-[#6B5B47] hover:bg-[#ECEEDF] flex items-center gap-2"
                          >
                            <Copy size={16} />
                            Nouveau code
                          </button>
                          <hr className="my-2 border-gray-100" />
                          <button
                            onClick={() => handleDelete(gallery.id)}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 size={16} />
                            Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
