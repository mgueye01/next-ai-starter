import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Video, Play, Film, Zap, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Vidéographie | elGato Photo Paris",
  description: "Services de vidéographie professionnelle à Paris. Films cinématographiques et contenu vidéo de haute qualité.",
};

export default function VideoPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[60vh] min-h-[500px] bg-gradient-to-br from-[#BBDCE5] to-[#8FB8C5]">
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Video className="w-12 h-12 text-white mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-light text-white mb-6">
              Vidéographie
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Films cinématographiques et contenu vidéo professionnel pour tous vos projets.
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
            Cette page est en cours de développement. Pour toute demande de vidéographie,
            n'hésitez pas à me contacter directement.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] text-white px-8 py-4 rounded-full"
          >
            Me Contacter
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}