import React from 'react';
import { Metadata } from 'next';
import PhotographyProcess from '@/components/blocks/photography-process';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Mon Processus Créatif | elGato Photo Paris",
  description: "Découvrez le processus complet de A à Z pour vos projets photo. De la consultation initiale à la livraison finale.",
};

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#ECEEDF]/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-elgato-brown mb-6 tracking-tight">
            Mon Processus Créatif
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto mb-8" />
          <p className="text-xl md:text-2xl text-elgato-text-light max-w-4xl mx-auto leading-relaxed">
            De la première consultation à la livraison finale, découvrez comment je travaille
            pour créer des images qui racontent votre histoire unique.
          </p>
        </div>
      </section>

      {/* Process Component */}
      <PhotographyProcess />

      {/* Additional Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-[#BBDCE5]/10 to-[#CFAB8D]/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-elgato-brown mb-4">
                Transparence Totale
              </h2>
              <p className="text-elgato-text-light leading-relaxed mb-4">
                Je crois en une communication claire et honnête à chaque étape. Vous saurez
                toujours où nous en sommes dans le processus et quand attendre vos photos.
              </p>
              <p className="text-elgato-text-light leading-relaxed">
                Aucune surprise, aucun frais caché. Le prix convenu au départ est le prix final.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#CFAB8D]/10 to-[#D9C4B0]/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-elgato-brown mb-4">
                Qualité Garantie
              </h2>
              <p className="text-elgato-text-light leading-relaxed mb-4">
                Chaque photo est soigneusement sélectionnée et retouchée avec attention.
                Je ne livre que des images dont je suis fier et qui respectent mes standards élevés.
              </p>
              <p className="text-elgato-text-light leading-relaxed">
                Si vous n'êtes pas satisfait, nous travaillons ensemble jusqu'à ce que vous le soyez.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-white to-[#ECEEDF]/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-elgato-brown mb-6">
            Prêt à Commencer Votre Projet ?
          </h2>
          <p className="text-lg text-elgato-text-light mb-8">
            Réservez une consultation gratuite pour discuter de vos besoins
            et voir comment nous pouvons travailler ensemble.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] text-white px-10 py-5 rounded-full border-2 border-transparent hover:shadow-xl transition-all"
            >
              Réserver une consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 border-2 border-elgato-sand text-[#CFAB8D] px-10 py-5 rounded-full hover:bg-elgato-sand hover:text-white transition-all"
            >
              Voir les services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}