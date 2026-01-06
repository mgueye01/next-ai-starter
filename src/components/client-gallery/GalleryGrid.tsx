"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Download, Share2, Play } from "lucide-react";
import { api } from "@/lib/trpc/react";
import GalleryLightbox from "./GalleryLightbox";

interface Media {
  id: string;
  type: "PHOTO" | "VIDEO";
  filename: string;
  originalUrl: string;
  thumbnailUrl: string | null;
  mediumUrl: string | null;
  width: number | null;
  height: number | null;
  metadata: unknown;
}

interface GalleryGridProps {
  galleryId: string;
  media: Media[];
  allowDownload: boolean;
  allowFavorites: boolean;
  allowComments: boolean;
  allowSharing: boolean;
  sessionId?: string;
  clientToken?: string;
}

export default function GalleryGrid({
  galleryId,
  media,
  allowDownload,
  allowFavorites,
  allowComments,
  allowSharing,
  sessionId,
  clientToken,
}: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "favorites">("all");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // Fetch favorites
  const { data: favoritesData } = api.favorite.check.useQuery(
    {
      mediaIds: media.map((m) => m.id),
      clientToken,
      guestSessionId: sessionId,
    },
    { enabled: allowFavorites && (!!sessionId || !!clientToken) }
  );

  useEffect(() => {
    if (favoritesData) {
      setFavorites(favoritesData);
    }
  }, [favoritesData]);

  // Toggle favorite mutation
  const toggleFavorite = api.favorite.toggle.useMutation({
    onSuccess: (data, variables) => {
      setFavorites((prev) => ({
        ...prev,
        [variables.mediaId]: data.favorited,
      }));
    },
  });

  const handleFavoriteClick = (e: React.MouseEvent, mediaId: string) => {
    e.stopPropagation();
    if (!allowFavorites) return;

    toggleFavorite.mutate({
      mediaId,
      clientToken,
      guestSessionId: sessionId,
    });
  };

  const filteredMedia =
    filter === "favorites"
      ? media.filter((m) => favorites[m.id])
      : media;

  const handleDownload = async (e: React.MouseEvent, mediaItem: Media) => {
    e.stopPropagation();
    if (!allowDownload) return;

    const link = document.createElement("a");
    link.href = mediaItem.originalUrl;
    link.download = mediaItem.filename;
    link.click();
  };

  const handleShare = async (e: React.MouseEvent, mediaItem: Media) => {
    e.stopPropagation();
    if (!allowSharing) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Photo partagée",
          url: mediaItem.mediumUrl || mediaItem.originalUrl,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(mediaItem.mediumUrl || mediaItem.originalUrl);
    }
  };

  return (
    <div>
      {/* Filter Tabs */}
      {allowFavorites && (
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-[#CFAB8D] text-white"
                : "bg-white text-[#6B5B47] hover:bg-[#ECEEDF]"
            }`}
          >
            Toutes les photos ({media.length})
          </button>
          <button
            onClick={() => setFilter("favorites")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
              filter === "favorites"
                ? "bg-[#CFAB8D] text-white"
                : "bg-white text-[#6B5B47] hover:bg-[#ECEEDF]"
            }`}
          >
            <Heart size={16} />
            Mes favoris ({Object.values(favorites).filter(Boolean).length})
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {filteredMedia.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="relative aspect-square bg-[#ECEEDF] rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => setSelectedIndex(media.findIndex((m) => m.id === item.id))}
            >
              {/* Thumbnail */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.thumbnailUrl || item.originalUrl}
                alt={item.filename}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Video indicator */}
              {item.type === "VIDEO" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
                    <Play size={24} className="text-white ml-1" />
                  </div>
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors">
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                  <div className="flex items-center justify-center gap-3">
                    {allowFavorites && (
                      <button
                        onClick={(e) => handleFavoriteClick(e, item.id)}
                        className={`p-2 rounded-full transition-colors ${
                          favorites[item.id]
                            ? "bg-red-500 text-white"
                            : "bg-white/90 text-[#6B5B47] hover:bg-white"
                        }`}
                      >
                        <Heart
                          size={18}
                          fill={favorites[item.id] ? "currentColor" : "none"}
                        />
                      </button>
                    )}
                    {allowDownload && (
                      <button
                        onClick={(e) => handleDownload(e, item)}
                        className="p-2 bg-white/90 rounded-full text-[#6B5B47] hover:bg-white transition-colors"
                      >
                        <Download size={18} />
                      </button>
                    )}
                    {allowSharing && (
                      <button
                        onClick={(e) => handleShare(e, item)}
                        className="p-2 bg-white/90 rounded-full text-[#6B5B47] hover:bg-white transition-colors"
                      >
                        <Share2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Favorite indicator */}
              {favorites[item.id] && (
                <div className="absolute top-2 right-2">
                  <Heart size={20} className="text-red-500 fill-red-500" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state for favorites */}
      {filter === "favorites" && filteredMedia.length === 0 && (
        <div className="text-center py-12">
          <Heart size={48} className="mx-auto text-[#CFAB8D] mb-4" />
          <h3 className="text-lg font-semibold text-[#6B5B47] mb-2">
            Aucun favori
          </h3>
          <p className="text-[#8B7355]">
            Cliquez sur le coeur pour ajouter des photos à vos favoris
          </p>
        </div>
      )}

      {/* Lightbox */}
      {selectedIndex !== null && (
        <GalleryLightbox
          media={media}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          allowDownload={allowDownload}
          allowFavorites={allowFavorites}
          allowComments={allowComments}
          allowSharing={allowSharing}
          favorites={favorites}
          onToggleFavorite={(mediaId) => {
            toggleFavorite.mutate({
              mediaId,
              clientToken,
              guestSessionId: sessionId,
            });
          }}
          sessionId={sessionId}
          clientToken={clientToken}
        />
      )}
    </div>
  );
}
