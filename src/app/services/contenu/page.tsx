import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Instagram, TrendingUp, Camera, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Création de Contenu | elGato Photo Paris",
  description: "Création de contenu visuel pour réseaux sociaux et campagnes marketing. Stories, Reels et stratégie créative.",
};

export default function ContenuPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[60vh] min-h-[500px] bg-gradient-to-br from-[#D9C4B0] to-[#C7B19C]">
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Sparkles className="w-12 h-12 text-white mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-light text-white mb-6">
              Création de Contenu
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Contenu visuel sur mesure pour vos réseaux sociaux et campagnes marketing.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-light text-[#6B5B47] mb-6">
            Contenu À Venir
          </h2>
          <p className="text-lg text-[#8B7355] mb-8">
            Page en développement. Pour des packages création de contenu, contactez-moi.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D9C4B0] to-[#C7B19C] text-white px-8 py-4 rounded-full"
          >
            Me Contacter
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}