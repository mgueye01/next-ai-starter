"use client";

import Link from "next/link";
import {
  Image as ImageIcon,
  Users,
  Camera,
  Clock,
  FileEdit,
  Eye,
  Archive,
  Download,
  TrendingUp
} from "lucide-react";
import { api } from "@/lib/trpc/react";

export default function AdminDashboard() {
  const { data: stats, isLoading } = api.gallery.getStats.useQuery();

  const menuItems = [
    {
      title: "Galeries",
      description: "Gérez vos galeries photos et vidéos",
      href: "/admin/galleries",
      icon: ImageIcon,
      color: "bg-[#CFAB8D]",
    },
    {
      title: "Clients",
      description: "Gérez vos clients et leurs accès",
      href: "/admin/clients",
      icon: Users,
      color: "bg-[#8B7355]",
    },
  ];

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-[#ECEEDF]/30 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#6B5B47] mb-2">
            Administration
          </h1>
          <p className="text-[#8B7355] text-base md:text-lg">
            Bienvenue dans votre espace d'administration elGato Photo
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Total Galleries */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#BBDCE5]/20 rounded-lg">
                <ImageIcon className="w-5 h-5 text-[#6B5B47]" />
              </div>
              <span className="text-xs md:text-sm text-[#8B7355]">Galeries</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-[#6B5B47]">
              {isLoading ? "..." : stats?.galleries.total ?? 0}
            </p>
            <div className="mt-2 flex gap-2 text-xs text-[#8B7355]">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {stats?.galleries.published ?? 0}
              </span>
              <span className="flex items-center gap-1">
                <FileEdit className="w-3 h-3" />
                {stats?.galleries.draft ?? 0}
              </span>
              <span className="flex items-center gap-1">
                <Archive className="w-3 h-3" />
                {stats?.galleries.archived ?? 0}
              </span>
            </div>
          </div>

          {/* Photos */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#CFAB8D]/20 rounded-lg">
                <Camera className="w-5 h-5 text-[#6B5B47]" />
              </div>
              <span className="text-xs md:text-sm text-[#8B7355]">Photos</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-[#6B5B47]">
              {isLoading ? "..." : stats?.photos ?? 0}
            </p>
          </div>

          {/* Clients */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#D9C4B0]/20 rounded-lg">
                <Users className="w-5 h-5 text-[#6B5B47]" />
              </div>
              <span className="text-xs md:text-sm text-[#8B7355]">Clients</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-[#6B5B47]">
              {isLoading ? "..." : stats?.clients ?? 0}
            </p>
          </div>

          {/* Recent Sessions */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#ECEEDF] rounded-lg">
                <TrendingUp className="w-5 h-5 text-[#6B5B47]" />
              </div>
              <span className="text-xs md:text-sm text-[#8B7355]">Sessions</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-[#6B5B47]">
              {isLoading ? "..." : stats?.recentActivity.length ?? 0}
            </p>
          </div>
        </div>

        {/* Menu Grid + Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Menu Items */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#6B5B47]">Gestion</h2>
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-[#CFAB8D]/30"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`${item.color} p-3 rounded-xl text-white group-hover:scale-110 transition-transform`}
                  >
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#6B5B47] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#8B7355]">{item.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-[#6B5B47] mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Activité récente
            </h2>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-3/4" />
                      <div className="h-2 bg-gray-100 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : stats?.recentActivity && stats.recentActivity.length > 0 ? (
              <div className="space-y-3 max-h-[280px] overflow-y-auto">
                {stats.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#ECEEDF]/30 transition-colors"
                  >
                    <div className="w-8 h-8 bg-[#CFAB8D]/20 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-[#6B5B47]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#6B5B47] truncate">
                        {activity.guestName || "Visiteur anonyme"}
                      </p>
                      <p className="text-xs text-[#8B7355] truncate">
                        {activity.galleryTitle}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-[#8B7355]">
                        {formatDate(activity.lastAccess)}
                      </p>
                      {activity.downloadCount > 0 && (
                        <p className="text-xs text-[#CFAB8D] flex items-center gap-1 justify-end">
                          <Download className="w-3 h-3" />
                          {activity.downloadCount}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#8B7355] text-center py-8">
                Aucune activité récente
              </p>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="p-5 bg-white rounded-xl border border-gray-100">
          <h3 className="text-lg font-semibold text-[#6B5B47] mb-4">
            Liens rapides
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/galleries/new"
              className="px-4 py-2 bg-[#CFAB8D] text-white rounded-lg hover:bg-[#B89B7F] transition-colors text-sm font-medium"
            >
              + Nouvelle galerie
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-[#ECEEDF] text-[#6B5B47] rounded-lg hover:bg-[#D9C4B0] transition-colors text-sm"
            >
              Voir le site
            </Link>
            <Link
              href="/client/login"
              className="px-4 py-2 bg-[#ECEEDF] text-[#6B5B47] rounded-lg hover:bg-[#D9C4B0] transition-colors text-sm"
            >
              Espace client
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-[#8B7355]">
          <p>elGato Photo - Panel d'administration</p>
        </div>
      </div>
    </div>
  );
}
