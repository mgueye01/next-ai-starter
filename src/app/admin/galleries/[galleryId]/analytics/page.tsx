"use client";

import { use } from "react";
import Link from "next/link";
import { api } from "@/lib/trpc/react";
import {
  ArrowLeft,
  Eye,
  Heart,
  Download,
  MessageCircle,
  Users,
  Image as ImageIcon,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function GalleryAnalyticsPage({
  params,
}: {
  params: Promise<{ galleryId: string }>;
}) {
  const { galleryId } = use(params);

  const { data: summary, isLoading } =
    api.analytics.getGallerySummary.useQuery({ galleryId });
  const { data: viewsData } = api.analytics.getViewsOverTime.useQuery({
    galleryId,
  });
  const { data: topMedia } = api.analytics.getTopMedia.useQuery({ galleryId });

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl" />
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto text-center py-12">
          <p className="text-[#8B7355]">Galerie non trouvée</p>
        </div>
      </div>
    );
  }

  const stats = summary.stats;
  const maxViews = viewsData
    ? Math.max(...viewsData.map((d) => d.views), 1)
    : 1;

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/admin/galleries/${galleryId}`}
            className="inline-flex items-center gap-2 text-[#8B7355] hover:text-[#6B5B47] mb-4"
          >
            <ArrowLeft size={20} />
            Retour à la galerie
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#6B5B47]">
                Analytics: {summary.gallery.title}
              </h1>
              <p className="text-[#8B7355] mt-1">
                Statistiques et performances de votre galerie
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                summary.gallery.status === "PUBLISHED"
                  ? "bg-green-100 text-green-800"
                  : summary.gallery.status === "DRAFT"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
              }`}
            >
              {summary.gallery.status === "PUBLISHED"
                ? "Publiée"
                : summary.gallery.status === "DRAFT"
                  ? "Brouillon"
                  : "Archivée"}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Eye}
            label="Vues totales"
            value={stats.viewCount}
            color="blue"
          />
          <StatCard
            icon={Heart}
            label="Favoris"
            value={stats.favoriteCount}
            color="red"
          />
          <StatCard
            icon={Download}
            label="Téléchargements"
            value={stats.downloads.total}
            color="green"
          />
          <StatCard
            icon={MessageCircle}
            label="Commentaires"
            value={stats.commentCount}
            color="purple"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#CFAB8D]/10 rounded-lg flex items-center justify-center">
                <ImageIcon size={20} className="text-[#CFAB8D]" />
              </div>
              <div>
                <p className="text-sm text-[#8B7355]">Photos/Vidéos</p>
                <p className="text-2xl font-bold text-[#6B5B47]">
                  {stats.mediaCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#CFAB8D]/10 rounded-lg flex items-center justify-center">
                <Users size={20} className="text-[#CFAB8D]" />
              </div>
              <div>
                <p className="text-sm text-[#8B7355]">Clients avec accès</p>
                <p className="text-2xl font-bold text-[#6B5B47]">
                  {stats.clientCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#CFAB8D]/10 rounded-lg flex items-center justify-center">
                <Calendar size={20} className="text-[#CFAB8D]" />
              </div>
              <div>
                <p className="text-sm text-[#8B7355]">Sessions invité</p>
                <p className="text-2xl font-bold text-[#6B5B47]">
                  {stats.guestSessionCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Views Chart */}
        {viewsData && viewsData.length > 0 && (
          <div className="bg-white rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={20} className="text-[#CFAB8D]" />
              <h2 className="text-lg font-semibold text-[#6B5B47]">
                Vues des 30 derniers jours
              </h2>
            </div>
            <div className="h-48 flex items-end gap-1">
              {viewsData.map((day, i) => (
                <div
                  key={day.date}
                  className="flex-1 flex flex-col items-center group"
                >
                  <div className="relative w-full">
                    <div
                      className="w-full bg-[#CFAB8D] rounded-t transition-all hover:bg-[#B8967A]"
                      style={{
                        height: `${(day.views / maxViews) * 160}px`,
                        minHeight: day.views > 0 ? "4px" : "0",
                      }}
                    />
                    {day.views > 0 && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#6B5B47] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {day.views} vue{day.views > 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                  {i % 7 === 0 && (
                    <span className="text-xs text-[#8B7355] mt-2">
                      {format(new Date(day.date), "d MMM", { locale: fr })}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Download Breakdown */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-semibold text-[#6B5B47] mb-4">
              Types de téléchargements
            </h2>
            <div className="space-y-4">
              <DownloadRow
                label="Photo individuelle"
                value={stats.downloads.single}
                total={stats.downloads.total}
              />
              <DownloadRow
                label="Sélection (ZIP)"
                value={stats.downloads.selection}
                total={stats.downloads.total}
              />
              <DownloadRow
                label="Galerie complète"
                value={stats.downloads.all}
                total={stats.downloads.total}
              />
            </div>
          </div>

          {/* Top Performing Media */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-semibold text-[#6B5B47] mb-4">
              Photos les plus populaires
            </h2>
            {topMedia && topMedia.length > 0 ? (
              <div className="space-y-3">
                {topMedia.slice(0, 5).map((media: { id: string; filename: string; thumbnailUrl: string | null; favorites: number; downloads: number }, index: number) => (
                  <div
                    key={media.id}
                    className="flex items-center gap-3"
                  >
                    <span className="w-6 h-6 bg-[#ECEEDF] rounded-full flex items-center justify-center text-xs font-medium text-[#6B5B47]">
                      {index + 1}
                    </span>
                    <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      {media.thumbnailUrl && (
                        <img
                          src={media.thumbnailUrl}
                          alt={media.filename}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#6B5B47] truncate">
                        {media.filename}
                      </p>
                      <p className="text-xs text-[#8B7355]">
                        {media.favorites} favoris · {media.downloads} téléchargements
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#8B7355] text-sm">
                Aucune donnée d&apos;engagement pour le moment
              </p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        {summary.recentActivity.length > 0 && (
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-semibold text-[#6B5B47] mb-4">
              Activité récente
            </h2>
            <div className="space-y-3">
              {summary.recentActivity.slice(0, 10).map((activity: { id: string; event: string; createdAt: Date }) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.event === "view"
                          ? "bg-blue-100 text-blue-600"
                          : activity.event === "download"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {activity.event === "view" ? (
                        <Eye size={14} />
                      ) : activity.event === "download" ? (
                        <Download size={14} />
                      ) : (
                        <TrendingUp size={14} />
                      )}
                    </div>
                    <span className="text-sm text-[#6B5B47] capitalize">
                      {activity.event === "view"
                        ? "Vue de la galerie"
                        : activity.event}
                    </span>
                  </div>
                  <span className="text-xs text-[#8B7355]">
                    {format(new Date(activity.createdAt), "d MMM à HH:mm", {
                      locale: fr,
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Eye;
  label: string;
  value: number;
  color: "blue" | "red" | "green" | "purple";
}) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    red: "bg-red-100 text-red-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[color]}`}
        >
          <Icon size={20} />
        </div>
      </div>
      <p className="text-3xl font-bold text-[#6B5B47]">{value}</p>
      <p className="text-sm text-[#8B7355]">{label}</p>
    </div>
  );
}

function DownloadRow({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total: number;
}) {
  const percentage = total > 0 ? (value / total) * 100 : 0;

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-[#6B5B47]">{label}</span>
        <span className="text-[#8B7355]">{value}</span>
      </div>
      <div className="h-2 bg-[#ECEEDF] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#CFAB8D] rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
