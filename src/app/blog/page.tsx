'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

const articles = [
  {
    slug: "10-conseils-reussir-seance-photo-portrait",
    title: "10 Conseils pour Réussir votre Séance Photo Portrait",
    excerpt: "Découvrez mes conseils de photographe professionnel pour vous préparer et obtenir des portraits naturels et authentiques qui vous ressemblent vraiment.",
    category: "Conseils",
    date: "15 Décembre 2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=500&fit=crop",
    featured: true
  },
  {
    slug: "coulisses-mariage-paris",
    title: "Coulisses d'un Mariage à Paris : Une Journée avec les Mariés",
    excerpt: "Plongez dans les coulisses d'un mariage parisien, des préparatifs matinaux jusqu'à l'ouverture de bal. Une immersion dans mon travail de photographe de mariage.",
    category: "Behind the Scenes",
    date: "8 Décembre 2024",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=500&fit=crop",
    featured: true
  },
  {
    slug: "comment-choisir-photographe-mariage",
    title: "Comment Choisir son Photographe de Mariage : Le Guide Complet",
    excerpt: "Tous les critères à prendre en compte pour choisir le photographe qui immortalisera le plus beau jour de votre vie. Style, budget, feeling... tout y est !",
    category: "Guide",
    date: "1er Décembre 2024",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=500&fit=crop",
    featured: false
  },
  {
    slug: "preparer-shooting-entreprise",
    title: "Comment Préparer un Shooting Photo d'Entreprise",
    excerpt: "Guide pratique pour les entreprises qui souhaitent organiser une séance photo professionnelle : préparation, tenue, et conseils pour des portraits corporate réussis.",
    category: "Corporate",
    date: "25 Novembre 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=500&fit=crop",
    featured: false
  },
  {
    slug: "tendances-photo-2025",
    title: "Les Tendances Photo Mariage et Portrait en 2025",
    excerpt: "Découvrez les styles et tendances qui marqueront la photographie de mariage et de portrait cette année : du naturel, de l'émotion et des approches innovantes.",
    category: "Tendances",
    date: "18 Novembre 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=500&fit=crop",
    featured: false
  },
  {
    slug: "importance-lumiere-naturelle",
    title: "L'Importance de la Lumière Naturelle en Photographie",
    excerpt: "Pourquoi je privilégie la lumière naturelle dans mes séances photo et comment elle transforme vos portraits en œuvres authentiques et intemporelles.",
    category: "Technique",
    date: "10 Novembre 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=800&h=500&fit=crop",
    featured: false
  }
];

const categories = ["Tous", "Conseils", "Guide", "Behind the Scenes", "Corporate", "Tendances", "Technique"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("Tous");

  const filteredArticles = selectedCategory === "Tous"
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticles = articles.filter(article => article.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.main
      className="min-h-screen bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-elgato-cream/30 to-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div variants={itemVariants}>
            <BookOpen className="w-16 h-16 text-elgato-sand mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-light text-elgato-brown mb-6">
              Blog
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-elgato-blue to-elgato-sand mx-auto mb-6" />
            <p className="text-xl text-elgato-text-light max-w-3xl mx-auto">
              Conseils photo, coulisses de mes projets et actualités du studio.
              Partageons ensemble ma passion pour la photographie.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-2xl font-light text-elgato-brown mb-8"
            variants={itemVariants}
          >
            Articles à la une
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <motion.article
                key={article.slug}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link href={`/blog/${article.slug}`}>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-block px-3 py-1 bg-white/90 text-elgato-brown text-sm rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-elgato-brown mb-2 group-hover:text-elgato-sand transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-elgato-text-light mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-elgato-text-light">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-y border-elgato-cream">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="flex flex-wrap gap-3 justify-center"
            variants={itemVariants}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-elgato-blue to-elgato-sand text-white shadow-md'
                    : 'bg-elgato-cream text-elgato-brown hover:bg-elgato-sand-light'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-2xl font-light text-elgato-brown mb-8"
            variants={itemVariants}
          >
            {selectedCategory === "Tous" ? "Tous les articles" : `Articles : ${selectedCategory}`}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <motion.article
                key={article.slug}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-elgato-cream"
              >
                <Link href={`/blog/${article.slug}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-elgato-sand/10 text-elgato-sand text-xs rounded-full">
                        <Tag className="w-3 h-3" />
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-elgato-brown mb-2 group-hover:text-elgato-sand transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-elgato-text-light mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-elgato-text-light">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-elgato-text-light">Aucun article dans cette catégorie pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-b from-elgato-cream/30 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="bg-gradient-to-r from-elgato-brown to-elgato-brown-light rounded-3xl p-8 md:p-12 text-center shadow-2xl"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Ne manquez aucun article
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Inscrivez-vous à ma newsletter pour recevoir mes derniers conseils photo,
              les coulisses de mes projets et des offres exclusives.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-elgato-brown px-8 py-4 rounded-xl font-medium hover:bg-elgato-cream transition-all duration-300 shadow-lg"
            >
              S'inscrire à la newsletter
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
