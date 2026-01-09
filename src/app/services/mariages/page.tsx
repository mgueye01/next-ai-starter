import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Clock, Users, Camera, Check, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Photographie de Mariage | elGato Photo Paris",
  description: "Photographe de mariage à Paris. Immortalisez votre jour J avec des photos artistiques et émouvantes. Plus de 150 mariages capturés.",
};

export default function MariagesPage() {
  const packages = [
    {
      name: "Demi-Journée",
      price: "2500€",
      duration: "6 heures",
      features: [
        "Couverture cérémonie + cocktail",
        "1 photographe professionnel",
        "300+ photos retouchées",
        "Galerie privée en ligne",
        "Téléchargement HD illimité",
        "Livraison sous 4 semaines"
      ]
    },
    {
      name: "Journée Complète",
      price: "3800€",
      duration: "10 heures",
      features: [
        "Préparatifs jusqu'à première danse",
        "2 photographes professionnels",
        "600+ photos retouchées",
        "Album photo premium 30x30cm",
        "Clé USB personnalisée",
        "Vidéo teaser offerte",
        "Livraison sous 3 semaines"
      ],
      popular: true
    },
    {
      name: "Prestige",
      price: "5500€",
      duration: "12+ heures",
      features: [
        "Couverture complète illimitée",
        "2 photographes + videaste",
        "1000+ photos retouchées",
        "2 albums premium + tirages",
        "Film cinématographique complet",
        "Séance engagement offerte",
        "Drone (si autorisé)",
        "Livraison express 2 semaines"
      ]
    }
  ];

  const process = [
    {
      step: "1",
      title: "Consultation",
      description: "Rencontre pour comprendre votre vision et planifier la journée"
    },
    {
      step: "2",
      title: "Préparation",
      description: "Repérage des lieux et coordination avec vos prestataires"
    },
    {
      step: "3",
      title: "Jour J",
      description: "Couverture discrète et artistique de vos moments précieux"
    },
    {
      step: "4",
      title: "Post-Production",
      description: "Sélection et retouches professionnelles de vos photos"
    },
    {
      step: "5",
      title: "Livraison",
      description: "Galerie en ligne + album premium et tous vos fichiers HD"
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[600px] bg-gradient-to-br from-[#CFAB8D] to-[#B89B7F] overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop"
            alt="Wedding photography"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Heart className="w-8 h-8 text-white" />
              <span className="text-white/90 text-lg">150+ Mariages Capturés</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight">
              Photographie de Mariage
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Immortalisez votre jour J avec des photos artistiques qui racontent
              l'histoire de votre amour et de votre célébration.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-elgato-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "150+", label: "Mariages" },
              { number: "98%", label: "Satisfaction" },
              { number: "10h", label: "Durée moyenne" },
              { number: "600+", label: "Photos livrées" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-light text-elgato-sand mb-2">
                  {stat.number}
                </div>
                <div className="text-elgato-text-light">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-elgato-brown mb-6">
              Forfaits Mariage
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto mb-6" />
            <p className="text-lg text-elgato-text-light max-w-2xl mx-auto">
              Des formules complètes pour que vous profitiez pleinement de votre journée
              sans vous soucier de rien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-8 border-2 ${
                  pkg.popular
                    ? 'border-elgato-sand shadow-2xl scale-105'
                    : 'border-elgato-cream shadow-lg'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#CFAB8D] to-[#B89B7F] text-white px-6 py-2 rounded-full text-sm font-medium">
                    Recommandé
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-medium text-elgato-brown mb-2">{pkg.name}</h3>
                  <div className="text-5xl font-light text-elgato-sand mb-2">{pkg.price}</div>
                  <div className="text-sm text-elgato-text-light">{pkg.duration}</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-elgato-sand flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-elgato-brown">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`block text-center py-4 rounded-xl font-medium transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-[#CFAB8D] to-[#B89B7F] text-white'
                      : 'border-2 border-elgato-sand text-elgato-sand hover:bg-elgato-sand hover:text-white'
                  }`}
                >
                  Réserver
                </Link>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#BBDCE5]/10 to-[#CFAB8D]/10 rounded-2xl p-8 text-center">
            <p className="text-elgato-brown font-medium mb-2">Options supplémentaires disponibles</p>
            <p className="text-elgato-text-light">
              Séance engagement, livre d'or photo, tirages d'art, drone (selon lieu),
              photographe supplémentaire, heures additionnelles
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-elgato-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-elgato-brown mb-6">
              Comment Ça Se Passe ?
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#BBDCE5] to-[#CFAB8D] flex items-center justify-center text-2xl font-light text-white mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-medium text-elgato-brown mb-2">{item.title}</h3>
                <p className="text-sm text-elgato-text-light">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-elgato-brown mb-6">
            Réservez Votre Date Dès Maintenant
          </h2>
          <p className="text-lg text-elgato-text-light mb-8">
            Les dates se remplissent rapidement. Contactez-moi pour vérifier la disponibilité
            et recevoir votre devis personnalisé.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#CFAB8D] to-[#B89B7F] text-white px-10 py-5 rounded-full hover:shadow-xl transition-all"
          >
            Vérifier la disponibilité
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}