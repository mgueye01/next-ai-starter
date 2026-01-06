import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Briefcase, Heart, Music, ArrowRight, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: "Photographie d'Événements | elGato Photo Paris",
  description: "Photographe d'événements à Paris. Couverture professionnelle pour événements corporatifs, familiaux et sociaux.",
};

export default function EvenementsPage() {
  const eventTypes = [
    {
      icon: Briefcase,
      title: "Corporate",
      description: "Séminaires, conférences, team buildings, inaugurations",
      startPrice: "800€"
    },
    {
      icon: Heart,
      title: "Familiaux",
      description: "Anniversaires, baptêmes, communions, fêtes familiales",
      startPrice: "600€"
    },
    {
      icon: Music,
      title: "Soirées",
      description: "Galas, soirées privées, lancements produits, cocktails",
      startPrice: "900€"
    },
    {
      icon: Users,
      title: "Associations",
      description: "Événements associatifs, collectes de fonds, cérémonies",
      startPrice: "700€"
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] bg-gradient-to-br from-[#D9C4B0] to-[#C7B19C]">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1920&auto=format&fit=crop"
            alt="Event photography"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Users className="w-12 h-12 text-white mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-light text-white mb-6">
              Photographie d'Événements
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Captation professionnelle de vos événements corporatifs, familiaux ou sociaux
              avec discrétion et créativité.
            </p>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-[#6B5B47] mb-6">
              Types d'Événements
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eventTypes.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div key={index} className="bg-white border-2 border-[#ECEEDF] rounded-2xl p-8 hover:border-[#CFAB8D]/30 hover:shadow-xl transition-all">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#BBDCE5]/20 to-[#CFAB8D]/20 flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-[#CFAB8D]" />
                  </div>
                  <h3 className="text-2xl font-light text-[#6B5B47] mb-3">{event.title}</h3>
                  <p className="text-[#8B7355] mb-4 leading-relaxed">{event.description}</p>
                  <p className="text-[#CFAB8D] font-medium">À partir de {event.startPrice}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-[#ECEEDF]/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light text-[#6B5B47] mb-6">
                Ce Qui Est Inclus
              </h2>
              <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mb-8" />

              <div className="space-y-4">
                {[
                  "Couverture complète de l'événement",
                  "Photos HD retouchées professionnellement",
                  "Galerie privée en ligne sécurisée",
                  "Téléchargement illimité haute résolution",
                  "Livraison rapide sous 48-72h",
                  "Usage commercial inclus (événements pro)",
                  "Photographe supplémentaire disponible",
                  "Coordination avec autres prestataires"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-[#CFAB8D] flex-shrink-0 mt-1" />
                    <span className="text-lg text-[#6B5B47]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop"
                alt="Event coverage"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-[#6B5B47] mb-6">
            Discutons de Votre Événement
          </h2>
          <p className="text-lg text-[#8B7355] mb-8">
            Chaque événement est unique. Contactez-moi pour un devis personnalisé
            adapté à vos besoins spécifiques.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D9C4B0] to-[#C7B19C] text-white px-10 py-5 rounded-full hover:shadow-xl transition-all"
          >
            Demander un devis
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}