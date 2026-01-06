"use client";

import { useState } from "react";
import { Download, Check, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BatchDownloadProps {
  galleryId: string;
  galleryTitle: string;
  mediaCount: number;
  selectedIds?: string[];
  sessionId?: string;
  clientToken?: string;
  onClearSelection?: () => void;
}

export default function BatchDownload({
  galleryId,
  galleryTitle,
  mediaCount,
  selectedIds = [],
  sessionId,
  clientToken,
  onClearSelection,
}: BatchDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const downloadCount = selectedIds.length > 0 ? selectedIds.length : mediaCount;

  const handleDownload = async () => {
    setIsDownloading(true);
    setProgress(0);
    setError(null);

    try {
      const response = await fetch("/api/client-gallery/download/batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          galleryId,
          mediaIds: selectedIds.length > 0 ? selectedIds : undefined,
          clientToken,
          guestSessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Download failed");
      }

      // Get the blob
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${galleryTitle.replace(/[^a-zA-Z0-9]/g, "_")}_photos.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setProgress(100);

      // Clear selection after download
      if (selectedIds.length > 0 && onClearSelection) {
        onClearSelection();
      }
    } catch (err) {
      setError("Erreur lors du téléchargement");
      console.error("Download error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleDownload}
        disabled={isDownloading || mediaCount === 0}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
          ${
            selectedIds.length > 0
              ? "bg-[#CFAB8D] text-white hover:bg-[#B8967A]"
              : "bg-white text-[#6B5B47] hover:bg-[#ECEEDF] border border-gray-200"
          }
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {isDownloading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Préparation...
          </>
        ) : (
          <>
            <Download size={18} />
            {selectedIds.length > 0
              ? `Télécharger (${downloadCount})`
              : "Tout télécharger"}
          </>
        )}
      </button>

      {/* Selection indicator */}
      <AnimatePresence>
        {selectedIds.length > 0 && onClearSelection && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onClearSelection}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X size={14} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Error message */}
      {error && (
        <div className="absolute top-full mt-2 right-0 bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
}
