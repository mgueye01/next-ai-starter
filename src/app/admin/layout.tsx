"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Image, Users, BarChart3, Settings, LogOut } from "lucide-react";

const navItems = [
  {
    href: "/admin/galleries",
    label: "Galeries",
    icon: Image,
  },
  {
    href: "/admin/clients",
    label: "Clients",
    icon: Users,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#ECEEDF]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-lg z-40">
        {/* Logo */}
        <div className="p-6 border-b">
          <Link href="/" className="flex items-center gap-3">
            <Camera size={32} className="text-[#CFAB8D]" />
            <div>
              <span className="text-xl font-bold text-[#6B5B47]">ElGato</span>
              <span className="text-xs text-[#8B7355] block">Administration</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                  ${
                    isActive
                      ? "bg-[#CFAB8D] text-white"
                      : "text-[#6B5B47] hover:bg-[#ECEEDF]"
                  }
                `}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-[#8B7355] hover:text-[#6B5B47] hover:bg-[#ECEEDF] rounded-xl transition-colors"
          >
            <LogOut size={20} />
            Retour au site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64">{children}</main>
    </div>
  );
}
