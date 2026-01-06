"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Download,
  Share2,
  MessageCircle,
  Play,
  Pause,
} from "lucide-react";
import CommentSection from "./CommentSection";
import ShareModal from "./ShareModal";

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

interface GalleryLightboxProps {
  media: Media[];
  initialIndex: number;
  onClose: () => void;
  allowDownload: boolean;
  allowFavorites: boolean;
  allowComments: boolean;
  allowSharing: boolean;
  favorites: Record<string, boolean>;
  onToggleFavorite: (mediaId: string) => void;
  sessionId?: string;
  clientToken?: string;
}

export default function GalleryLightbox({
  media,
  initialIndex,
  onClose,
  allowDownload,
  allowFavorites,
  allowComments,
  allowSharing,
  favorites,
  onToggleFavorite,
  sessionId,
  clientToken,
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentMedia = media[currentIndex];

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : media.length - 1));
  }, [media.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < media.length - 1 ? prev + 1 : 0));
  }, [media.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext, onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleDownload = () => {
    if (!allowDownload) return;
    const link = document.createElement("a");
    link.href = currentMedia.originalUrl;
    link.download = currentMedia.filename;
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
        <div className="text-white">
          <span className="text-lg font-medium">
            {currentIndex + 1} / {media.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {allowFavorites && (
            <button
              onClick={() => onToggleFavorite(currentMedia.id)}
              className={`p-3 rounded-full transition-colors ${
                favorites[currentMedia.id]
                  ? "bg-red-500 text-white"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <Heart
                size={22}
                fill={favorites[currentMedia.id] ? "currentColor" : "none"}
              />
            </button>
          )}

          {allowDownload && (
            <button
              onClick={handleDownload}
              className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <Download size={22} />
            </button>
          )}

          {allowSharing && (
            <button
              onClick={() => setShowShare(true)}
              className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <Share2 size={22} />
            </button>
          )}

          {allowComments && (
            <button
              onClick={() => setShowComments(!showComments)}
              className={`p-3 rounded-full transition-colors ${
                showComments
                  ? "bg-[#CFAB8D] text-white"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <MessageCircle size={22} />
            </button>
          )}

          <button
            onClick={onClose}
            className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors ml-2"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex">
        {/* Media Display */}
        <div
          className={`flex-1 flex items-center justify-center p-16 ${
            showComments ? "pr-96" : ""
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMedia.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-full max-h-full"
            >
              {currentMedia.type === "VIDEO" ? (
                <div className="relative">
                  <video
                    src={currentMedia.originalUrl}
                    className="max-w-full max-h-[80vh] rounded-lg"
                    controls={isPlaying}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                  {!isPlaying && (
                    <button
                      onClick={() => {
                        const video = document.querySelector("video");
                        video?.play();
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors">
                        <Play size={40} className="text-white ml-2" />
                      </div>
                    </button>
                  )}
                </div>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={currentMedia.mediumUrl || currentMedia.originalUrl}
                  alt={currentMedia.filename}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Comments Panel */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ x: 384 }}
              animate={{ x: 0 }}
              exit={{ x: 384 }}
              className="absolute right-0 top-0 bottom-0 w-96 bg-white"
            >
              <CommentSection
                mediaId={currentMedia.id}
                sessionId={sessionId}
                clientToken={clientToken}
                onClose={() => setShowComments(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
        style={{ right: showComments ? "25rem" : "1rem" }}
      >
        <ChevronRight size={28} />
      </button>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex justify-center gap-2 overflow-x-auto pb-2">
          {media.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(index)}
              className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                index === currentIndex
                  ? "border-white scale-110"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.thumbnailUrl || item.originalUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Share Modal */}
      {showShare && (
        <ShareModal
          media={currentMedia}
          onClose={() => setShowShare(false)}
        />
      )}
    </motion.div>
  );
}
