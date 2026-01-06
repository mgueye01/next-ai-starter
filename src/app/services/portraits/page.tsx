import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Camera, Clock, MapPin, Star, ArrowRight, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: "Portraits d'Art | elGato Photo Paris",
  description: "Séances photo portraits artistiques à Paris. Révélez votre essence unique avec une approche personnalisée et professionnelle.",
};

export default function PortraitsPage() {
  const packages = [
    {
      name: "Essentiel",
      price: "350€",
      duration: "1h",
      photos: "15 photos retouchées",
      features: [
        "1 tenue",
        "1 lieu (studio ou extérieur)",
        "Retouches professionnelles",
        "Galerie privée en ligne",
        "Téléchargement haute résolution"
      ]
    },
    {
      name: "Premium",
      price: "550€",
      duration: "2h",
      photos: "30 photos retouchées",
      features: [
        "2-3 tenues",
        "2 lieux différents",
        "Retouches artistiques avancées",
        "Coaching photo inclus",
        "Galerie privée + tirages offerts",
        "Livraison express 7 jours"
      ],
      popular: true
    },
    {
      name: "Excellence",
      price: "850€",
      duration: "3h",
      photos: "50+ photos retouchées",
      features: [
        "Tenues illimitées",
        "3+ lieux ou studio premium",
        "Direction artistique complète",
        "Maquillage professionnel inclus",
        "Album photo premium",
        "Vidéo BTS offerte",
        "Livraison express 5 jours"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] bg-gradient-to-br from-[#BBDCE5] to-[#CFAB8D] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=1920&auto=format&fit=crop"
            alt="Portrait photography"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Camera className="w-8 h-8 text-white" />
              <span className="text-white/90 text-lg">Service Premium</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight">
              Portraits d'Art
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Révélez votre essence unique à travers des portraits artistiques
              capturant votre personnalité et votre authenticité.
            </p>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-light text-[#6B5B47]">
                Une Expérience Photographique Unique
              </h2>
              <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D]" />
              <p className="text-lg text-[#8B7355] leading-relaxed">
                Spécialisé dans la photographie de portrait depuis plus de 5 ans, je crée des images
                qui racontent votre histoire unique. Mon approche artistique combine techniques
                classiques et vision contemporaine pour des résultats intemporels.
              </p>
              <p className="text-lg text-[#8B7355] leading-relaxed">
                Chaque séance est une collaboration créative où je vous guide avec bienveillance
                pour capturer des expressions naturelles et authentiques. Que ce soit pour des
                portraits professionnels, personnels ou artistiques, mon objectif est de révéler
                la meilleure version de vous-même.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-[#CFAB8D] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-[#6B5B47] mb-1">Flexible</h3>
                    <p className="text-sm text-[#8B7355]">Séances 1-3h selon vos besoins</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-[#CFAB8D] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-[#6B5B47] mb-1">Lieux Variés</h3>
                    <p className="text-sm text-[#8B7355]">Studio, extérieur, ou chez vous</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-[#CFAB8D] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-[#6B5B47] mb-1">Qualité Pro</h3>
                    <p className="text-sm text-[#8B7355]">Retouches artistiques incluses</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Camera className="w-6 h-6 text-[#CFAB8D] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-[#6B5B47] mb-1">Coaching</h3>
                    <p className="text-sm text-[#8B7355]">Direction et poses naturelles</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop"
                alt="Portrait example"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-[#ECEEDF]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-[#6B5B47] mb-6">
              Forfaits & Tarifs
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto mb-6" />
            <p className="text-lg text-[#8B7355] max-w-2xl mx-auto">
              Choisissez le forfait qui correspond le mieux à vos besoins.
              Tous incluent retouches professionnelles et galerie en ligne.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-8 border-2 ${
                  pkg.popular
                    ? 'border-[#CFAB8D] shadow-2xl scale-105'
                    : 'border-[#ECEEDF] shadow-lg'
                } transition-all duration-300 hover:shadow-2xl`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#CFAB8D] to-[#B89B7F] text-white px-6 py-2 rounded-full text-sm font-medium">
                    Plus Populaire
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-medium text-[#6B5B47] mb-2">{pkg.name}</h3>
                  <div className="text-5xl font-light text-[#CFAB8D] mb-4">{pkg.price}</div>
                  <div className="flex items-center justify-center gap-4 text-sm text-[#8B7355]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {pkg.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Camera className="w-4 h-4" />
                      {pkg.photos}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#CFAB8D] flex-shrink-0 mt-0.5" />
                      <span className="text-[#6B5B47]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`block text-center py-4 rounded-xl font-medium transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-[#CFAB8D] to-[#B89B7F] text-white hover:shadow-lg'
                      : 'border-2 border-[#CFAB8D] text-[#CFAB8D] hover:bg-[#CFAB8D] hover:text-white'
                  }`}
                >
                  Réserver
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-[#8B7355] mb-4">
              Besoin d'un forfait personnalisé ? Contactez-moi pour un devis sur mesure.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[#CFAB8D] hover:text-[#B89B7F] font-medium"
            >
              Demander un devis personnalisé
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#BBDCE5]/10 to-[#CFAB8D]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-[#6B5B47] mb-6">
            Prêt à Créer des Portraits Exceptionnels ?
          </h2>
          <p className="text-lg text-[#8B7355] mb-8">
            Réservez votre consultation gratuite de 15 minutes pour discuter de votre projet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300"
            >
              Réserver une séance
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#CFAB8D] text-[#CFAB8D] px-8 py-4 rounded-full hover:bg-[#CFAB8D] hover:text-white transition-all duration-300"
            >
              Voir le portfolio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}