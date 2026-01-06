"use client";

import Link from "next/link";
import { Image as ImageIcon, Users, BarChart3, Settings } from "lucide-react";

export default function AdminDashboard() {
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

  return (
    <div className="min-h-screen bg-[#ECEEDF]/30 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#6B5B47] mb-2">
            Administration
          </h1>
          <p className="text-[#8B7355] text-lg">
            Bienvenue dans votre espace d'administration ElGato Photo
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-[#CFAB8D]/30"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`${item.color} p-4 rounded-xl text-white group-hover:scale-110 transition-transform`}
                >
                  <item.icon size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#6B5B47] mb-1">
                    {item.title}
                  </h2>
                  <p className="text-[#8B7355]">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-12 p-6 bg-white rounded-2xl border border-gray-100">
          <h3 className="text-lg font-semibold text-[#6B5B47] mb-4">
            Liens rapides
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/galleries/new"
              className="px-4 py-2 bg-[#ECEEDF] text-[#6B5B47] rounded-lg hover:bg-[#CFAB8D] hover:text-white transition-colors text-sm"
            >
              + Nouvelle galerie
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-[#ECEEDF] text-[#6B5B47] rounded-lg hover:bg-[#CFAB8D] hover:text-white transition-colors text-sm"
            >
              Voir le site
            </Link>
            <Link
              href="/client/login"
              className="px-4 py-2 bg-[#ECEEDF] text-[#6B5B47] rounded-lg hover:bg-[#CFAB8D] hover:text-white transition-colors text-sm"
            >
              Espace client
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-[#8B7355]">
          <p>ElGato Photo - Panel d'administration</p>
        </div>
      </div>
    </div>
  );
}
