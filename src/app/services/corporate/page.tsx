import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Building, Users, Camera, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Photographie Corporate | elGato Photo Paris",
  description: "Photographie professionnelle pour entreprises. Headshots, événements corporatifs, photos de produits et branding visuel.",
};

export default function CorporatePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[60vh] min-h-[500px] bg-gradient-to-br from-[#CFAB8D] to-[#B89B7F]">
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Briefcase className="w-12 h-12 text-white mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-light text-white mb-6">
              Photographie Corporate
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Solutions photographiques professionnelles pour votre entreprise.
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
            Page en construction. Contactez-moi pour vos besoins en photographie corporate.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#CFAB8D] to-[#B89B7F] text-white px-8 py-4 rounded-full"
          >
            Me Contacter
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}