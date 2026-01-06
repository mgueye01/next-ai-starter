"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/trpc/react";
import { ArrowLeft, Calendar, Download, Heart, MessageCircle, Share2, Droplet } from "lucide-react";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function NewGalleryPage() {
  const router = useRouter();
  const createGallery = api.gallery.create.useMutation({
    onSuccess: (gallery) => {
      router.push(`/admin/galleries/${gallery.id}/upload`);
    },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createGallery.mutateAsync({
      ...formData,
      eventDate: formData.eventDate || undefined,
      expiresAt: formData.expiresAt || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-[#ECEEDF] p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/galleries"
            className="p-2 text-[#6B5B47] hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#6B5B47]">Nouvelle galerie</h1>
            <p className="text-[#8B7355] mt-1">Créez une galerie pour votre client</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-sm">
          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#6B5B47] mb-2">
              Titre de la galerie *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Mariage de Sophie & Thomas"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none transition-all"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#6B5B47] mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Une description pour vos clients..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none transition-all resize-none"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#6B5B47] mb-2">
                <Calendar size={16} className="inline mr-1" />
                Date de l&apos;événement
              </label>
              <DatePicker
                selected={formData.eventDate}
                onChange={(date) => setFormData({ ...formData, eventDate: date })}
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
                onChange={(date) => setFormData({ ...formData, expiresAt: date })}
                dateFormat="dd/MM/yyyy"
                placeholderText="Jamais"
                minDate={new Date()}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Permissions */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-[#6B5B47] mb-4">
              Permissions client
            </label>
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
          </div>

          {/* Watermark */}
          <div className="mb-8">
            <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-[#CFAB8D] transition-colors">
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
                  Ajouter votre logo sur les téléchargements
                </span>
              </div>
            </label>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Link
              href="/admin/galleries"
              className="px-6 py-3 text-[#6B5B47] hover:bg-[#ECEEDF] rounded-xl transition-colors"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={!formData.title || createGallery.isPending}
              className="px-6 py-3 bg-[#CFAB8D] text-white rounded-xl hover:bg-[#B8967A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createGallery.isPending ? "Création..." : "Créer la galerie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
