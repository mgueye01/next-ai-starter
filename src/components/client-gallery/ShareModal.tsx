"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Link as LinkIcon,
  Check,
  Facebook,
  MessageCircle,
  Mail,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface Media {
  id: string;
  filename: string;
  originalUrl: string;
  mediumUrl: string | null;
}

interface ShareModalProps {
  media: Media;
  onClose: () => void;
}

export default function ShareModal({ media, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = media.mediumUrl || media.originalUrl;

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-[#1877F2]",
      onClick: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          "_blank",
          "width=600,height=400"
        );
      },
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      color: "bg-[#25D366]",
      onClick: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`Regardez cette photo ! ${shareUrl}`)}`,
          "_blank"
        );
      },
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-[#6B5B47]",
      onClick: () => {
        window.location.href = `mailto:?subject=Photo partagée&body=Regardez cette photo ! ${shareUrl}`;
      },
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#6B5B47]">Partager</h2>
          <button
            onClick={onClose}
            className="p-2 text-[#8B7355] hover:text-[#6B5B47] hover:bg-[#ECEEDF] rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Preview */}
        <div className="p-4 bg-[#ECEEDF]">
          <div className="aspect-video rounded-lg overflow-hidden bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media.mediumUrl || media.originalUrl}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Share Options */}
        <div className="p-4 space-y-4">
          {/* Social Buttons */}
          <div className="flex justify-center gap-4">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={option.onClick}
                className={`${option.color} text-white p-4 rounded-full hover:opacity-90 transition-opacity`}
                title={option.name}
              >
                <option.icon size={24} />
              </button>
            ))}
          </div>

          {/* Copy Link */}
          <div className="flex gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-4 py-3 rounded-xl bg-[#ECEEDF] text-[#6B5B47] text-sm truncate"
            />
            <button
              onClick={copyLink}
              className={`px-4 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-[#CFAB8D] text-white hover:bg-[#B8967A]"
              }`}
            >
              {copied ? (
                <>
                  <Check size={18} />
                  Copié
                </>
              ) : (
                <>
                  <LinkIcon size={18} />
                  Copier
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
