"use client";

import { useState } from "react";
import { api } from "@/lib/trpc/react";
import { Send, X, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface CommentSectionProps {
  mediaId: string;
  sessionId?: string;
  clientToken?: string;
  onClose: () => void;
}

export default function CommentSection({
  mediaId,
  sessionId,
  clientToken,
  onClose,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");

  const { data, isLoading, refetch } = api.comment.list.useQuery({
    mediaId,
    limit: 50,
  });

  const addComment = api.comment.add.useMutation({
    onSuccess: () => {
      setNewComment("");
      refetch();
    },
  });

  const deleteComment = api.comment.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addComment.mutate({
      mediaId,
      content: newComment.trim(),
      clientToken,
      guestSessionId: sessionId,
    });
  };

  const handleDelete = (commentId: string) => {
    if (confirm("Supprimer ce commentaire ?")) {
      deleteComment.mutate({
        id: commentId,
        clientToken,
        guestSessionId: sessionId,
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#6B5B47]">Commentaires</h2>
        <button
          onClick={onClose}
          className="p-2 text-[#8B7355] hover:text-[#6B5B47] hover:bg-[#ECEEDF] rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24" />
                    <div className="h-12 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !data?.comments || data.comments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[#8B7355]">Aucun commentaire</p>
            <p className="text-sm text-[#8B7355] mt-1">
              Soyez le premier à commenter
            </p>
          </div>
        ) : (
          data.comments.map((comment) => (
            <div key={comment.id} className="group">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-[#ECEEDF] flex items-center justify-center flex-shrink-0">
                  {comment.authorAvatar ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={comment.authorAvatar}
                      alt=""
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={20} className="text-[#8B7355]" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#6B5B47]">
                      {comment.authorName}
                    </span>
                    {comment.isClient && (
                      <span className="text-xs px-2 py-0.5 bg-[#CFAB8D]/20 text-[#CFAB8D] rounded-full">
                        Client
                      </span>
                    )}
                    <span className="text-xs text-[#8B7355]">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </span>
                  </div>
                  <p className="text-[#6B5B47] mt-1 break-words">
                    {comment.content}
                  </p>
                </div>

                {/* Delete button (only shown on hover) */}
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-opacity"
                  title="Supprimer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none transition-all"
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!newComment.trim() || addComment.isPending}
            className="p-2 bg-[#CFAB8D] text-white rounded-xl hover:bg-[#B8967A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
        {addComment.isError && (
          <p className="text-red-500 text-sm mt-2">
            Erreur lors de l&apos;envoi du commentaire
          </p>
        )}
      </form>
    </div>
  );
}
