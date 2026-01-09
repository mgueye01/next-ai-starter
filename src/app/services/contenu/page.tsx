'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Sparkles, Instagram, TrendingUp, Camera, ArrowRight, Check,
  Smartphone, Share2, Target, Zap, Calendar, Palette
} from 'lucide-react';

export default function ContenuPage() {
  const platforms = [
    {
      name: "Instagram",
      icon: Instagram,
      formats: ["Posts carrés", "Stories", "Reels", "Carrousels"],
      color: "from-[#E4405F] to-[#833AB4]"
    },
    {
      name: "LinkedIn",
      icon: Share2,
      formats: ["Posts corporate", "Articles visuels", "Bannières"],
      color: "from-[#0077B5] to-[#00A0DC]"
    },
    {
      name: "TikTok",
      icon: Smartphone,
      formats: ["Vidéos courtes", "Tendances", "Behind the scenes"],
      color: "from-[#000000] to-[#25F4EE]"
    },
    {
      name: "Site Web",
      icon: Target,
      formats: ["Hero images", "Galeries", "Bannières"],
      color: "from-elgato-brown to-elgato-brown-light"
    }
  ];

  const services = [
    {
      icon: Camera,
      title: "Shooting Contenu",
      description: "Sessions photo dédiées à la création de contenu pour vos réseaux. Plusieurs tenues, décors et ambiances en une seule séance pour alimenter votre feed pendant des semaines.",
      includes: ["30+ photos retouchées", "Formats multiples", "Direction artistique"]
    },
    {
      icon: Palette,
      title: "Identité Visuelle",
      description: "Développement d'une identité visuelle cohérente pour vos réseaux sociaux. Palette de couleurs, style photographique et templates personnalisés.",
      includes: ["Moodboard", "Charte visuelle", "Templates Canva"]
    },
    {
      icon: Calendar,
      title: "Pack Mensuel",
      description: "Abonnement mensuel pour une création de contenu régulière. Shooting + retouche + planification pour une présence constante et professionnelle.",
      includes: ["1 shooting/mois", "20 visuels", "Planning éditorial"]
    },
    {
      icon: TrendingUp,
      title: "Stratégie Contenu",
      description: "Accompagnement stratégique pour optimiser votre présence visuelle. Analyse de votre audience, recommandations et suivi des performances.",
      includes: ["Audit visuel", "Recommandations", "Rapport mensuel"]
    }
  ];

  const packages = [
    {
      name: "Starter",
      price: "350",
      description: "Pour démarrer sur les réseaux",
      features: [
        "1 shooting de 2h",
        "15 photos retouchées",
        "2 formats par photo",
        "Conseils de publication",
        "Livraison sous 5 jours"
      ]
    },
    {
      name: "Growth",
      price: "650",
      description: "Pour une présence régulière",
      features: [
        "1 shooting de 3h",
        "30 photos retouchées",
        "Tous formats inclus",
        "Moodboard personnalisé",
        "5 vidéos courtes",
        "Planning éditorial"
      ],
      popular: true
    },
    {
      name: "Pro",
      price: "1200",
      description: "Solution complète mensuelle",
      features: [
        "2 shootings/mois",
        "50 photos retouchées",
        "10 vidéos (Reels/Stories)",
        "Direction artistique",
        "Identité visuelle",
        "Accompagnement stratégique"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Léa M.",
      role: "Influenceuse lifestyle",
      text: "Mes shootings avec elGato ont transformé mon feed Instagram. La qualité des photos a fait exploser mon engagement !",
      followers: "45K followers"
    },
    {
      name: "Studio Bloom",
      role: "Marque beauté",
      text: "Un partenaire créatif de confiance pour tous nos visuels réseaux sociaux. Professionnel et toujours force de proposition.",
      followers: "12K followers"
    }
  ];

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
      <section className="relative h-[70vh] min-h-[600px] bg-gradient-to-br from-[#D9C4B0] to-[#CFAB8D] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#BBDCE5]/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div variants={itemVariants}>
              <Sparkles className="w-16 h-16 text-white mx-auto mb-6" />
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-6 tracking-wide">
                Création de Contenu
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
                Des visuels qui captent l'attention et racontent votre histoire
                sur les réseaux sociaux.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-elgato-brown px-8 py-4 rounded-xl font-medium border-2 border-transparent hover:bg-elgato-cream transition-all duration-300 shadow-lg"
                >
                  Booster mon contenu
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition-all duration-300"
                >
                  Voir mes créations
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-light text-elgato-brown mb-4">
              Contenu Optimisé pour Chaque Plateforme
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto mb-6" />
            <p className="text-lg text-elgato-text-light max-w-3xl mx-auto">
              Des visuels adaptés aux spécificités de chaque réseau social
              pour maximiser votre impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-elgato-cream"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${platform.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                  <platform.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-elgato-brown mb-3">
                  {platform.name}
                </h3>
                <ul className="space-y-1">
                  {platform.formats.map((format, idx) => (
                    <li key={idx} className="text-sm text-elgato-text-light">
                      • {format}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-[#ECEEDF]/30 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-light text-elgato-brown mb-4">
              Mes Services
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#D9C4B0] to-[#CFAB8D] rounded-2xl flex items-center justify-center text-white mb-6">
                  <service.icon size={28} />
                </div>
                <h3 className="text-2xl font-semibold text-elgato-brown mb-4">
                  {service.title}
                </h3>
                <p className="text-elgato-text-light leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.includes.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-elgato-cream text-elgato-brown text-sm rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-light text-elgato-brown mb-4">
              Formules Création de Contenu
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto mb-6" />
            <p className="text-lg text-elgato-text-light max-w-3xl mx-auto">
              Des packages adaptés à vos objectifs et votre budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  pkg.popular ? 'ring-2 ring-[#CFAB8D] scale-105' : ''
                }`}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D9C4B0] to-[#CFAB8D] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Sparkles className="w-4 h-4" /> Best-seller
                  </div>
                )}
                <h3 className="text-2xl font-semibold text-elgato-brown mb-2">
                  {pkg.name}
                </h3>
                <p className="text-elgato-text-light text-sm mb-4">{pkg.description}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-elgato-brown">{pkg.price}</span>
                  <span className="text-elgato-text-light">€</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-elgato-brown">
                      <Check className="w-5 h-5 text-[#CFAB8D] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center py-3 rounded-xl font-medium transition-colors duration-300 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-[#D9C4B0] to-[#CFAB8D] text-white hover:from-[#C7B19C] hover:to-[#B89B7F]'
                      : 'bg-elgato-cream text-elgato-brown hover:bg-[#D9C4B0]'
                  }`}
                >
                  Choisir cette formule
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-elgato-cream/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-light text-elgato-brown mb-4">
              Ils m'ont fait confiance
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg"
                variants={itemVariants}
              >
                <p className="text-elgato-text-light italic mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-elgato-brown">{testimonial.name}</p>
                    <p className="text-sm text-elgato-text-light">{testimonial.role}</p>
                  </div>
                  <span className="px-3 py-1 bg-[#CFAB8D]/10 text-[#CFAB8D] text-sm rounded-full">
                    {testimonial.followers}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="bg-gradient-to-r from-[#D9C4B0] to-[#CFAB8D] rounded-3xl p-8 md:p-12 text-center shadow-2xl"
            variants={itemVariants}
          >
            <Sparkles className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              Prêt à élever votre contenu ?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Discutons de votre marque, votre audience et vos objectifs
              pour créer un contenu visuel qui vous démarque.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-elgato-brown px-8 py-4 rounded-xl font-medium hover:bg-elgato-cream transition-all duration-300 shadow-lg"
            >
              Commencer maintenant
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
