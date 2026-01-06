"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, X, CheckCircle, AlertCircle, Image as ImageIcon, Film } from "lucide-react";
import { api } from "@/lib/trpc/react";

interface UploadingFile {
  id: string;
  file: File;
  progress: number;
  status: "pending" | "uploading" | "processing" | "done" | "error";
  error?: string;
  result?: {
    filename: string;
    originalUrl: string;
    thumbnailUrl?: string;
    mediumUrl?: string;
    width?: number;
    height?: number;
  };
}

interface MediaUploaderProps {
  galleryId: string;
  onUploadComplete?: () => void;
}

export default function MediaUploader({ galleryId, onUploadComplete }: MediaUploaderProps) {
  const [files, setFiles] = useState<UploadingFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addMedia = api.galleryMedia.add.useMutation({
    onSuccess: () => {
      onUploadComplete?.();
    },
  });

  const handleFiles = useCallback(async (fileList: FileList) => {
    const newFiles: UploadingFile[] = Array.from(fileList)
      .filter((file) => file.type.startsWith("image/") || file.type.startsWith("video/"))
      .map((file) => ({
        id: Math.random().toString(36).slice(2),
        file,
        progress: 0,
        status: "pending" as const,
      }));

    if (newFiles.length === 0) return;

    setFiles((prev) => [...prev, ...newFiles]);

    // Upload files one by one
    for (const uploadFile of newFiles) {
      try {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id ? { ...f, status: "uploading" } : f
          )
        );

        // Create form data
        const formData = new FormData();
        formData.append("file", uploadFile.file);
        formData.append("galleryId", galleryId);

        // Upload to API
        const response = await fetch("/api/client-gallery/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const result = await response.json();

        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? { ...f, status: "processing", progress: 100 }
              : f
          )
        );

        // Add to gallery via tRPC
        await addMedia.mutateAsync({
          galleryId,
          files: [
            {
              filename: result.filename,
              originalUrl: result.originalUrl,
              thumbnailUrl: result.thumbnailUrl,
              mediumUrl: result.mediumUrl,
              type: uploadFile.file.type.startsWith("video/") ? "VIDEO" : "PHOTO",
              width: result.width,
              height: result.height,
              size: uploadFile.file.size,
            },
          ],
        });

        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id ? { ...f, status: "done", result } : f
          )
        );
      } catch (error) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? {
                  ...f,
                  status: "error",
                  error: error instanceof Error ? error.message : "Upload failed",
                }
              : f
          )
        );
      }
    }
  }, [galleryId, addMedia]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const completedCount = files.filter((f) => f.status === "done").length;
  const totalCount = files.length;

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all
          ${
            isDragging
              ? "border-[#CFAB8D] bg-[#CFAB8D]/10"
              : "border-gray-300 hover:border-[#CFAB8D] hover:bg-[#CFAB8D]/5"
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />

        <Upload size={48} className="mx-auto text-[#CFAB8D] mb-4" />
        <h3 className="text-lg font-semibold text-[#6B5B47] mb-2">
          {isDragging ? "Déposez vos fichiers ici" : "Glissez-déposez vos fichiers"}
        </h3>
        <p className="text-[#8B7355] mb-4">
          ou cliquez pour sélectionner des photos et vidéos
        </p>
        <p className="text-sm text-[#8B7355]">
          Formats acceptés: JPG, PNG, WEBP, MP4, MOV
        </p>
      </div>

      {/* Progress Summary */}
      {files.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-white rounded-xl">
          <span className="text-[#6B5B47]">
            {completedCount} / {totalCount} fichiers uploadés
          </span>
          {completedCount === totalCount && totalCount > 0 && (
            <span className="flex items-center gap-2 text-green-600">
              <CheckCircle size={20} />
              Terminé
            </span>
          )}
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((uploadFile) => (
            <div
              key={uploadFile.id}
              className="flex items-center gap-4 p-4 bg-white rounded-xl"
            >
              {/* Preview */}
              <div className="w-12 h-12 bg-[#ECEEDF] rounded-lg flex items-center justify-center overflow-hidden">
                {uploadFile.file.type.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={URL.createObjectURL(uploadFile.file)}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Film size={24} className="text-[#8B7355]" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[#6B5B47] font-medium truncate">
                  {uploadFile.file.name}
                </p>
                <p className="text-sm text-[#8B7355]">
                  {(uploadFile.file.size / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                {uploadFile.status === "pending" && (
                  <span className="text-[#8B7355]">En attente...</span>
                )}
                {uploadFile.status === "uploading" && (
                  <div className="w-24 h-2 bg-[#ECEEDF] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#CFAB8D] transition-all"
                      style={{ width: `${uploadFile.progress}%` }}
                    />
                  </div>
                )}
                {uploadFile.status === "processing" && (
                  <span className="text-[#CFAB8D]">Traitement...</span>
                )}
                {uploadFile.status === "done" && (
                  <CheckCircle size={20} className="text-green-500" />
                )}
                {uploadFile.status === "error" && (
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle size={20} />
                    <span className="text-sm">{uploadFile.error}</span>
                  </div>
                )}

                {/* Remove button */}
                {(uploadFile.status === "done" || uploadFile.status === "error") && (
                  <button
                    onClick={() => removeFile(uploadFile.id)}
                    className="p-1 text-[#8B7355] hover:text-red-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
