import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Blog | elGato Photo Paris",
  description: "Conseils photo, coulisses de mes projets et actualités du studio.",
};

export default function BlogPage() {
  const comingSoonPosts = [
    {
      title: "10 Conseils pour Réussir votre Séance Photo Portrait",
      category: "Conseils",
      date: "Bientôt"
    },
    {
      title: "Coulisses d'un Mariage à Paris",
      category: "Behind the Scenes",
      date: "Bientôt"
    },
    {
      title: "Comment Choisir son Photographe de Mariage",
      category: "Guide",
      date: "Bientôt"
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#ECEEDF]/30 to-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <BookOpen className="w-16 h-16 text-[#CFAB8D] mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-light text-[#6B5B47] mb-6">
            Blog
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto mb-6" />
          <p className="text-xl text-[#8B7355] max-w-3xl mx-auto">
            Conseils photo, coulisses de mes projets et actualités du studio.
          </p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-[#BBDCE5]/10 to-[#CFAB8D]/10 rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-[#6B5B47] mb-6">
              Contenu À Venir
            </h2>
            <p className="text-lg text-[#8B7355] mb-12 max-w-2xl mx-auto">
              Le blog est en cours de développement. Bientôt, vous y trouverez des articles,
              des conseils photo et les coulisses de mes projets.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              {comingSoonPosts.map((post, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-[#ECEEDF]">
                  <span className="inline-block px-3 py-1 bg-[#CFAB8D]/10 text-[#CFAB8D] text-sm rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-medium text-[#6B5B47] mb-3">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-[#8B7355]">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] text-white px-8 py-4 rounded-full hover:shadow-lg transition-all"
            >
              Me contacter en attendant
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}