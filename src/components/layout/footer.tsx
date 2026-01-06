'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const footerLinks = {
  services: [
    { name: "Portraits d'Art", href: "/services/portraits" },
    { name: "Mariages", href: "/services/mariages" },
    { name: "Événements", href: "/services/evenements" },
    { name: "Vidéographie", href: "/services/video" },
    { name: "Corporate", href: "/services/corporate" },
    { name: "Contenu Digital", href: "/services/contenu" }
  ],
  company: [
    { name: "À propos", href: "/a-propos" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Mon processus", href: "/process" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Espace Client", href: "/client/login" },
    { name: "Administration", href: "/admin" }
  ],
  legal: [
    { name: "Mentions légales", href: "/mentions-legales" },
    { name: "Politique de confidentialité", href: "/confidentialite" },
    { name: "CGV", href: "/cgv" },
    { name: "Cookies", href: "/cookies" }
  ]
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/elgatophoto", label: "Instagram", color: "#E4405F" },
  { icon: Facebook, href: "https://facebook.com/elgatophoto", label: "Facebook", color: "#1877F2" },
  { icon: Youtube, href: "https://youtube.com/elgatophoto", label: "YouTube", color: "#FF0000" }
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#ECEEDF]/30 to-[#ECEEDF]/60 border-t border-[#ECEEDF]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/elgato-logo.webp"
                alt="elGato Photo Paris"
                width={180}
                height={52}
                className="logo"
                priority
              />
            </Link>
            <p className="text-[#8B7355] leading-relaxed mb-6">
              Photographe professionnel à Paris, spécialisé dans la photographie artistique,
              les mariages et la création de contenu visuel depuis 2018.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a
                href="mailto:contact@elgatophoto.com"
                className="flex items-center gap-3 text-[#6B5B47] hover:text-[#CFAB8D] transition-colors duration-300 group"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">contact@elgatophoto.com</span>
              </a>
              <a
                href="tel:+33123456789"
                className="flex items-center gap-3 text-[#6B5B47] hover:text-[#CFAB8D] transition-colors duration-300 group"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">+33 1 23 45 67 89</span>
              </a>
              <div className="flex items-center gap-3 text-[#6B5B47]">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">Paris, France</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white hover:bg-gradient-to-br from-[#BBDCE5] to-[#CFAB8D] flex items-center justify-center text-[#6B5B47] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-medium text-[#6B5B47] mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-[#8B7355] hover:text-[#CFAB8D] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#CFAB8D] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-medium text-[#6B5B47] mb-6">Entreprise</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-[#8B7355] hover:text-[#CFAB8D] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#CFAB8D] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-medium text-[#6B5B47] mb-6">Newsletter</h3>
            <p className="text-[#8B7355] text-sm mb-4 leading-relaxed">
              Recevez mes dernières créations, conseils photo et offres exclusives.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full px-4 py-3 rounded-xl border border-[#ECEEDF] bg-white focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none transition-all duration-300 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] text-white px-6 py-3 rounded-xl hover:from-[#A5C9D4] hover:to-[#B89B7F] transition-all duration-300 flex items-center justify-center gap-2 group text-sm font-medium shadow-sm hover:shadow-md"
              >
                S'abonner
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#ECEEDF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-[#8B7355] text-center md:text-left">
              © {new Date().getFullYear()} elGato Photo Paris. Tous droits réservés.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm text-[#8B7355] hover:text-[#CFAB8D] transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}