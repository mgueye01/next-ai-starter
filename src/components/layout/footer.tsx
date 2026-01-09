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
  { icon: Instagram, href: "https://instagram.com/elgatophoto", label: "Suivez-nous sur Instagram" },
  { icon: Facebook, href: "https://facebook.com/elgatophoto", label: "Suivez-nous sur Facebook" },
  { icon: Youtube, href: "https://youtube.com/elgatophoto", label: "Abonnez-vous sur YouTube" }
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-elgato-cream/30 to-elgato-cream/60 border-t border-elgato-cream" role="contentinfo">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block mb-6 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elgato-sand focus-visible:ring-offset-2"
            >
              <Image
                src="/elgato-logo.webp"
                alt="elGato Photo Paris - Retour à l'accueil"
                width={180}
                height={52}
                className="logo"
                priority
              />
            </Link>
            <p className="text-elgato-text-secondary leading-relaxed mb-6">
              Photographe professionnel à Paris, spécialisé dans la photographie artistique,
              les mariages et la création de contenu visuel depuis 2018.
            </p>

            {/* Contact Info */}
            <address className="not-italic space-y-3 mb-6">
              <a
                href="mailto:contact@elgatophoto.com"
                className="flex items-center gap-3 text-elgato-text-primary hover:text-elgato-sand transition-colors duration-300 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elgato-sand focus-visible:ring-offset-2"
              >
                <Mail className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm">contact@elgatophoto.com</span>
              </a>
              <a
                href="tel:+33677684836"
                className="flex items-center gap-3 text-elgato-text-primary hover:text-elgato-sand transition-colors duration-300 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elgato-sand focus-visible:ring-offset-2"
              >
                <Phone className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm">+33 6 77 68 48 36</span>
              </a>
              <div className="flex items-center gap-3 text-elgato-text-primary">
                <MapPin className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm">Paris, France</span>
              </div>
            </address>

            {/* Social Links - 48px touch targets for mobile */}
            <div className="flex gap-3" role="list" aria-label="Réseaux sociaux">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    role="listitem"
                    className="w-12 h-12 rounded-full bg-white hover:bg-gradient-to-br hover:from-elgato-blue hover:to-elgato-sand flex items-center justify-center text-elgato-brown hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elgato-sand focus-visible:ring-offset-2"
                  >
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services Column */}
          <nav className="lg:col-span-3" aria-labelledby="footer-services-heading">
            <h3 id="footer-services-heading" className="text-lg font-medium text-elgato-brown mb-6">Services</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-elgato-text-secondary hover:text-elgato-sand transition-colors duration-300 text-sm flex items-center gap-2 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elgato-sand focus-visible:ring-offset-2 py-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-elgato-sand opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company Column */}
          <nav className="lg:col-span-2" aria-labelledby="footer-company-heading">
            <h3 id="footer-company-heading" className="text-lg font-medium text-elgato-brown mb-6">Entreprise</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-elgato-text-secondary hover:text-elgato-sand transition-colors duration-300 text-sm flex items-center gap-2 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elgato-sand focus-visible:ring-offset-2 py-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-elgato-sand opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <h3 id="newsletter-heading" className="text-lg font-medium text-elgato-brown mb-6">Newsletter</h3>
            <p className="text-elgato-text-secondary text-sm mb-4 leading-relaxed">
              Recevez mes dernières créations, conseils photo et offres exclusives.
            </p>
            <form className="space-y-3" aria-labelledby="newsletter-heading">
              <div className="relative">
                <label htmlFor="newsletter-email" className="sr-only">
                  Adresse email pour la newsletter
                </label>
                <input
                  type="email"
                  id="newsletter-email"
                  name="email"
                  placeholder="Votre email"
                  required
                  autoComplete="email"
                  aria-describedby="newsletter-description"
                  className="w-full px-4 py-3 rounded-xl border border-elgato-cream bg-white text-elgato-text-primary placeholder:text-elgato-text-light focus:border-elgato-sand focus:ring-2 focus:ring-elgato-sand/20 outline-none transition-all duration-300 text-sm"
                />
                <span id="newsletter-description" className="sr-only">
                  Entrez votre adresse email pour recevoir notre newsletter
                </span>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-elgato-blue to-elgato-sand text-white px-6 py-3 rounded-xl hover:from-elgato-blue-dark hover:to-elgato-sand-dark transition-all duration-300 flex items-center justify-center gap-2 group text-sm font-medium shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elgato-sand focus-visible:ring-offset-2"
              >
                S'abonner
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-elgato-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-elgato-text-secondary text-center md:text-left">
              © {new Date().getFullYear()} elGato Photo Paris. Tous droits réservés.
            </p>

            {/* Legal Links */}
            <nav aria-label="Liens légaux">
              <ul className="flex flex-wrap justify-center gap-6" role="list">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-elgato-text-secondary hover:text-elgato-sand transition-colors duration-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elgato-sand focus-visible:ring-offset-2 py-1 px-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
