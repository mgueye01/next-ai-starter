"use client";

import { usePathname } from "next/navigation";
import { WebsiteNavbar } from "@/components/ui/website-navbar";
import Footer from "@/components/layout/footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Routes where we don't want the public navbar and footer
  const isAdminRoute = pathname?.startsWith("/admin");
  const isClientRoute = pathname?.startsWith("/client");
  const isAuthRoute = pathname?.startsWith("/auth");

  // Hide navbar/footer for admin, client portal, and auth pages
  const hidePublicLayout = isAdminRoute || isClientRoute || isAuthRoute;

  if (hidePublicLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <WebsiteNavbar />
      {children}
      <Footer />
    </>
  );
}
