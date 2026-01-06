"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/trpc/react";
import {
  ArrowLeft,
  Save,
  Calendar,
  Download,
  Heart,
  MessageCircle,
  Share2,
  Droplet,
  Trash2,
  Upload,
  Users,
  ExternalLink,
  Copy,
  Image as ImageIcon,
  BarChart3,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditGalleryPage() {
  const params = useParams();
  const router = useRouter();
  const galleryId = params.galleryId as string;

  const { data: gallery, isLoading, refetch } = api.gallery.getById.useQuery({
    id: galleryId,
  });

  const updateGallery = api.gallery.update.useMutation({
    onSuccess: () => refetch(),
  });

  const deleteGallery = api.gallery.delete.useMutation({
    onSuccess: () => router.push("/admin/galleries"),
  });

  const setStatus = api.gallery.setStatus.useMutation({
    onSuccess: () => refetch(),
  });

  const regenerateCode = api.gallery.regenerateAccessCode.useMutation({
    onSuccess: () => refetch(),
  });

  const deleteMedia = api.galleryMedia.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const setCover = api.galleryMedia.setCover.useMutation({
    onSuccess: () => refetch(),
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: null as Date | null,
    expiresAt: null as Date | null,
    allowDownload: true,
    allowFavorites: true,
    allowComments: true,
    allowSharing: true,
    watermark: false,
  });

  useEffect(() => {
    if (gallery) {
      setFormData({
        title: gallery.title,
        description: gallery.description || "",
        eventDate: gallery.eventDate ? new Date(gallery.eventDate) : null,
        expiresAt: gallery.expiresAt ? new Date(gallery.expiresAt) : null,
        allowDownload: gallery.allowDownload,
        allowFavorites: gallery.allowFavorites,
        allowComments: gallery.allowComments,
        allowSharing: gallery.allowSharing,
        watermark: gallery.watermark,
      });
    }
  }, [gallery]);

  const handleSave = async () => {
    await updateGallery.mutateAsync({
      id: galleryId,
      title: formData.title,
      description: formData.description || undefined,
      eventDate: formData.eventDate || undefined,
      expiresAt: formData.expiresAt,
      allowDownload: formData.allowDownload,
      allowFavorites: formData.allowFavorites,
      allowComments: formData.allowComments,
      allowSharing: formData.allowSharing,
      watermark: formData.watermark,
    });
  };

  const handleDelete = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette galerie ?")) {
      await deleteGallery.mutateAsync({ id: galleryId });
    }
  };

  const copyAccessLink = () => {
    if (!gallery) return;
    const url = `${window.location.origin}/gallery/${gallery.slug}`;
    const text = gallery.accessCode
      ? `${url}\nCode d'accès: ${gallery.accessCode}`
      : url;
    navigator.clipboard.writeText(text);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ECEEDF] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-white rounded-xl w-48" />
            <div className="h-96 bg-white rounded-xl" />
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
          <Link
            href="/admin/galleries"
            className="text-[#CFAB8D] hover:underline mt-4 inline-block"
          >
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
              href="/admin/galleries"
              className="p-2 text-[#6B5B47] hover:bg-white rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-[#6B5B47]">
                Modifier la galerie
              </h1>
              <p className="text-[#8B7355] mt-1">{gallery.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/admin/galleries/${galleryId}/analytics`}
              className="flex items-center gap-2 px-4 py-2 text-[#6B5B47] hover:bg-white rounded-lg transition-colors"
            >
              <BarChart3 size={20} />
              Analytics
            </Link>
            <Link
              href={`/admin/galleries/${galleryId}/upload`}
              className="flex items-center gap-2 px-4 py-2 text-[#6B5B47] hover:bg-white rounded-lg transition-colors"
            >
              <Upload size={20} />
              Photos
            </Link>
            <button
              onClick={handleSave}
              disabled={updateGallery.isPending}
              className="flex items-center gap-2 px-6 py-2 bg-[#CFAB8D] text-white rounded-lg hover:bg-[#B8967A] transition-colors disabled:opacity-50"
            >
              <Save size={20} />
              {updateGallery.isPending ? "Sauvegarde..." : "Sauvegarder"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-lg font-semibold text-[#6B5B47] mb-4">
                Informations
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#6B5B47] mb-2">
                    Titre
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B5B47] mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#6B5B47] mb-2">
                      <Calendar size={16} className="inline mr-1" />
                      Date de l&apos;événement
                    </label>
                    <DatePicker
                      selected={formData.eventDate}
                      onChange={(date) =>
                        setFormData({ ...formData, eventDate: date })
                      }
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Sélectionner..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6B5B47] mb-2">
                      Date d&apos;expiration
                    </label>
                    <DatePicker
                      selected={formData.expiresAt}
                      onChange={(date) =>
                        setFormData({ ...formData, expiresAt: date })
                      }
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Jamais"
                      minDate={new Date()}
                      isClearable
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-lg font-semibold text-[#6B5B47] mb-4">
                Permissions
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-[#CFAB8D] transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.allowDownload}
                    onChange={(e) =>
                      setFormData({ ...formData, allowDownload: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-[#CFAB8D] focus:ring-[#CFAB8D]"
                  />
                  <Download size={20} className="text-[#8B7355]" />
                  <span className="text-[#6B5B47]">Téléchargement</span>
                </label>

                <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-[#CFAB8D] transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.allowFavorites}
                    onChange={(e) =>
                      setFormData({ ...formData, allowFavorites: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-[#CFAB8D] focus:ring-[#CFAB8D]"
                  />
                  <Heart size={20} className="text-[#8B7355]" />
                  <span className="text-[#6B5B47]">Favoris</span>
                </label>

                <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-[#CFAB8D] transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.allowComments}
                    onChange={(e) =>
                      setFormData({ ...formData, allowComments: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-[#CFAB8D] focus:ring-[#CFAB8D]"
                  />
                  <MessageCircle size={20} className="text-[#8B7355]" />
                  <span className="text-[#6B5B47]">Commentaires</span>
                </label>

                <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-[#CFAB8D] transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.allowSharing}
                    onChange={(e) =>
                      setFormData({ ...formData, allowSharing: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-[#CFAB8D] focus:ring-[#CFAB8D]"
                  />
                  <Share2 size={20} className="text-[#8B7355]" />
                  <span className="text-[#6B5B47]">Partage</span>
                </label>
              </div>

              <label className="flex items-center gap-3 p-4 mt-3 rounded-xl border border-gray-200 cursor-pointer hover:border-[#CFAB8D] transition-colors">
                <input
                  type="checkbox"
                  checked={formData.watermark}
                  onChange={(e) =>
                    setFormData({ ...formData, watermark: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-gray-300 text-[#CFAB8D] focus:ring-[#CFAB8D]"
                />
                <Droplet size={20} className="text-[#8B7355]" />
                <div>
                  <span className="text-[#6B5B47] block">Filigrane</span>
                  <span className="text-sm text-[#8B7355]">
                    Sur les téléchargements
                  </span>
                </div>
              </label>
            </div>

            {/* Photos Grid */}
            {gallery.media.length > 0 && (
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-[#6B5B47]">
                    Photos ({gallery.media.length})
                  </h2>
                  <Link
                    href={`/admin/galleries/${galleryId}/upload`}
                    className="text-[#CFAB8D] hover:underline text-sm"
                  >
                    Ajouter des photos
                  </Link>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {gallery.media.slice(0, 8).map((media) => (
                    <div
                      key={media.id}
                      className="aspect-square bg-[#ECEEDF] rounded-lg overflow-hidden relative group"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={media.thumbnailUrl || media.originalUrl}
                        alt={media.filename}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-1">
                          <button
                            onClick={() => setCover.mutateAsync({ mediaId: media.id })}
                            className="p-2 bg-white rounded-full text-[#6B5B47] hover:bg-[#CFAB8D] hover:text-white transition-colors"
                            title="Définir comme couverture"
                          >
                            <ImageIcon size={16} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm("Supprimer cette photo ?")) {
                                deleteMedia.mutateAsync({ id: media.id });
                              }
                            }}
                            className="p-2 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {gallery.media.length > 8 && (
                  <Link
                    href={`/admin/galleries/${galleryId}/upload`}
                    className="block text-center text-[#CFAB8D] hover:underline mt-4"
                  >
                    Voir les {gallery.media.length - 8} autres photos
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-lg font-semibold text-[#6B5B47] mb-4">
                Statut
              </h2>

              <div
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
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
              </div>

              <button
                onClick={() =>
                  setStatus.mutateAsync({
                    id: galleryId,
                    status:
                      gallery.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED",
                  })
                }
                className="w-full py-2 px-4 bg-[#CFAB8D] text-white rounded-lg hover:bg-[#B8967A] transition-colors"
              >
                {gallery.status === "PUBLISHED" ? "Dépublier" : "Publier"}
              </button>
            </div>

            {/* Access */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-lg font-semibold text-[#6B5B47] mb-4">
                Accès
              </h2>

              <div className="space-y-3">
                <div>
                  <span className="text-sm text-[#8B7355]">Code d&apos;accès</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-xl text-[#6B5B47] bg-[#ECEEDF] px-3 py-2 rounded-lg">
                      {gallery.accessCode}
                    </span>
                    <button
                      onClick={() => regenerateCode.mutateAsync({ id: galleryId })}
                      className="p-2 text-[#8B7355] hover:text-[#6B5B47] hover:bg-[#ECEEDF] rounded-lg transition-colors"
                      title="Nouveau code"
                    >
                      🔄
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={copyAccessLink}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-[#CFAB8D] text-[#CFAB8D] rounded-lg hover:bg-[#CFAB8D]/10 transition-colors"
                  >
                    <Copy size={16} />
                    Copier le lien
                  </button>
                  <a
                    href={`/gallery/${gallery.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-[#CFAB8D] text-[#CFAB8D] rounded-lg hover:bg-[#CFAB8D]/10 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Clients */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#6B5B47]">
                  Clients
                </h2>
                <Link
                  href={`/admin/galleries/${galleryId}/clients`}
                  className="text-[#CFAB8D] hover:underline text-sm"
                >
                  Gérer
                </Link>
              </div>

              {gallery.clientAccess.length === 0 ? (
                <p className="text-[#8B7355] text-sm">Aucun client associé</p>
              ) : (
                <div className="space-y-2">
                  {gallery.clientAccess.map((access) => (
                    <div
                      key={access.id}
                      className="flex items-center gap-3 p-2 bg-[#ECEEDF] rounded-lg"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#CFAB8D] flex items-center justify-center text-white font-medium">
                        {access.client.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#6B5B47] truncate">
                          {access.client.name}
                        </p>
                        <p className="text-xs text-[#8B7355] truncate">
                          {access.client.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-lg font-semibold text-[#6B5B47] mb-4">
                Statistiques
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-[#ECEEDF] rounded-lg">
                  <p className="text-2xl font-bold text-[#6B5B47]">
                    {gallery.media.length}
                  </p>
                  <p className="text-xs text-[#8B7355]">Photos</p>
                </div>
                <div className="text-center p-3 bg-[#ECEEDF] rounded-lg">
                  <p className="text-2xl font-bold text-[#6B5B47]">
                    {gallery._count.guestSessions}
                  </p>
                  <p className="text-xs text-[#8B7355]">Visites</p>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-red-700 mb-4">
                Zone de danger
              </h2>
              <button
                onClick={handleDelete}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 size={18} />
                Supprimer la galerie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
