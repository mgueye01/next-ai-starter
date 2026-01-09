"use client";
import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import StaggeredMenu from "@/components/StaggeredMenu";
import CardNav from "@/components/CardNav";
import type { StaggeredMenuItem, StaggeredMenuSocialItem } from "@/components/StaggeredMenu";
import type { CardNavItem } from "@/components/CardNav";
import { GoArrowUpRight } from "react-icons/go";

export function WebsiteNavbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  
  // Check if we're on homepage
  const isHomepage = pathname === "/";
  
  useEffect(() => {
    if (isHomepage && !hasAnimated) {
      // Delay the animation slightly to let the page load
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isHomepage, hasAnimated]);

  // Mobile menu items
  const menuItems: StaggeredMenuItem[] = [
    { label: "Portfolio", ariaLabel: "Voir le portfolio", link: "/portfolio" },
    { label: "Services", ariaLabel: "Découvrir nos services", link: "/services" },
    { label: "Mon Processus", ariaLabel: "Découvrir mon processus créatif", link: "/process" },
    { label: "À propos", ariaLabel: "En savoir plus sur le photographe", link: "/a-propos" },
    { label: "Contact", ariaLabel: "Contacter elGato Photo", link: "/contact" },
    ...(session ? [
      { label: "Administration", ariaLabel: "Accéder au panneau admin", link: "/admin" },
      { label: "Déconnexion", ariaLabel: "Se déconnecter", link: "/auth/signout" }
    ] : [
      { label: "Espace Client", ariaLabel: "Accéder à vos galeries", link: "/client/login" }
    ])
  ];

  const socialItems: StaggeredMenuSocialItem[] = [
    { label: "Instagram", link: "https://instagram.com/elgato_photo" },
    { label: "Facebook", link: "https://facebook.com/elgatophoto" }
  ];

  // CardNav items for desktop
  const cardNavItems: CardNavItem[] = [
    {
      label: "Services",
      bgColor: "rgba(187, 220, 229, 0.7)", // elgato-blue
      textColor: "#6B5B47", // elgato-brown
      links: [
        { label: "Tous les services", href: "/services", ariaLabel: "Voir tous les services" },
        { label: "Portraits d'Art", href: "/services/portraits", ariaLabel: "Séances photo portraits" },
        { label: "Mariages", href: "/services/mariages", ariaLabel: "Photographie de mariage" },
        { label: "Événements", href: "/services/evenements", ariaLabel: "Couverture d'événements" },
        { label: "Corporate", href: "/services/corporate", ariaLabel: "Photographie corporate" },
        { label: "Vidéographie", href: "/services/video", ariaLabel: "Services vidéo" }
      ]
    },
    {
      label: "Portfolio",
      bgColor: "rgba(217, 196, 176, 0.8)", // elgato-sand-light
      textColor: "#6B5B47", // elgato-brown
      links: [
        { label: "Galerie complète", href: "/portfolio", ariaLabel: "Voir tout le portfolio" },
        { label: "Mon processus", href: "/process", ariaLabel: "Découvrir mon processus créatif" }
      ]
    },
    {
      label: "À Propos",
      bgColor: "rgba(207, 171, 141, 0.9)", // elgato-sand
      textColor: "#6B5B47", // elgato-brown
      links: [
        { label: "Mon histoire", href: "/a-propos", ariaLabel: "En savoir plus sur le photographe" },
        { label: "Contact", href: "/contact", ariaLabel: "Contacter elGato Photo" }
      ]
    },
    {
      label: session ? "Mon Compte" : "Connexion",
      bgColor: "rgba(107, 91, 71, 0.9)", // elgato-brown
      textColor: "#ECEEDF", // elgato-cream
      links: session ? [
        { label: "Administration", href: "/admin", ariaLabel: "Accéder au panneau admin" },
        { label: "Déconnexion", href: "/auth/signout", ariaLabel: "Se déconnecter" }
      ] : [
        { label: "Espace Client", href: "/client/login", ariaLabel: "Accéder à vos galeries" },
        { label: "Administration", href: "/auth/signin", ariaLabel: "Connexion administrateur" }
      ]
    }
  ];
  
  return (
    <>
      {/* Desktop Navigation */}
      <motion.div
        className="hidden md:block w-full relative z-50"
        initial={isHomepage ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
        animate={
          isHomepage 
            ? hasAnimated 
              ? { y: 0, opacity: 1 } 
              : { y: -100, opacity: 0 }
            : { y: 0, opacity: 1 }
        }
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.8
        }}
      >
        <CardNav
          logo="/elgato-logo.png"
          logoAlt="elGato Photo - Photographe Paris"
          items={cardNavItems}
          baseColor="rgba(255, 255, 255, 0.25)"
          menuColor="#6B5B47" // elgato-brown
          buttonBgColor="#BBDCE5" // elgato-blue
          buttonTextColor="#6B5B47" // elgato-brown
          ease="power3.out"
          className="backdrop-blur-lg border border-elgato-sand-light/20 shadow-lg"
        />
      </motion.div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed inset-0 z-50 pointer-events-none">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#6B5B47" // elgato-brown
          openMenuButtonColor="#6B5B47" // elgato-brown
          changeMenuColorOnOpen={false}
          colors={['#BBDCE5', '#CFAB8D']} // elgato-blue, elgato-sand
          logoUrl="/elgato-logo.png"
          accentColor="#BBDCE5" // elgato-blue
        />
      </div>
    </>
  );
}