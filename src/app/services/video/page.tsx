'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Video, Play, Film, Clapperboard, ArrowRight, Check,
  Clock, Music, Sparkles, Monitor, Heart, Building2
} from 'lucide-react';

export default function VideoPage() {
  const services = [
    {
      icon: Heart,
      title: "Films de Mariage",
      description: "Un film cinématographique qui raconte l'histoire unique de votre journée. Captation des préparatifs jusqu'à la soirée, montage émotionnel avec musique sur mesure.",
      duration: "Film de 5-15 min",
      startingPrice: "1500"
    },
    {
      icon: Building2,
      title: "Vidéo Corporate",
      description: "Présentez votre entreprise, vos équipes et votre savoir-faire à travers une vidéo professionnelle. Idéale pour votre site web, réseaux sociaux ou recrutement.",
      duration: "Film de 2-5 min",
      startingPrice: "800"
    },
    {
      icon: Sparkles,
      title: "Contenu Réseaux Sociaux",
      description: "Reels, Stories, TikTok... Des formats courts et percutants optimisés pour chaque plateforme. Captez l'attention et engagez votre audience.",
      duration: "Pack de 5-10 vidéos",
      startingPrice: "500"
    },
    {
      icon: Clapperboard,
      title: "Événements",
      description: "Immortalisez vos événements : conférences, lancements de produits, soirées, anniversaires. Un souvenir vivant à partager et conserver.",
      duration: "Selon événement",
      startingPrice: "600"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Briefing Créatif",
      description: "Discussion de votre vision, objectifs et attentes. Définition du style, de l'ambiance et du message à transmettre."
    },
    {
      step: "02",
      title: "Pré-production",
      description: "Scénarisation, repérage des lieux, planning de tournage. Coordination avec tous les intervenants."
    },
    {
      step: "03",
      title: "Tournage",
      description: "Captation avec équipement professionnel : caméras 4K, stabilisateurs, drones (selon autorisation), micros HQ."
    },
    {
      step: "04",
      title: "Post-production",
      description: "Montage, étalonnage couleur, mixage audio, intégration musicale. Révisions incluses jusqu'à validation finale."
    }
  ];

  const equipment = [
    "Caméras Sony 4K",
    "Objectifs cinéma",
    "Stabilisateur gimbal",
    "Drone DJI (selon lieu)",
    "Micros professionnels",
    "Éclairage LED portatif"
  ];

  const packages = [
    {
      name: "Teaser",
      price: "400",
      description: "Vidéo courte et impactante",
      features: [
        "Durée : 30-60 secondes",
        "Tournage 2h",
        "Montage dynamique",
        "Musique libre de droits",
        "1 révision incluse",
        "Format vertical + horizontal"
      ]
    },
    {
      name: "Standard",
      price: "900",
      description: "Film complet et professionnel",
      features: [
        "Durée : 2-4 minutes",
        "Tournage demi-journée",
        "Étalonnage couleur",
        "Mixage audio pro",
        "2 révisions incluses",
        "Tous formats inclus"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "1800",
      description: "Production cinématographique",
      features: [
        "Durée : 5-10 minutes",
        "Tournage journée complète",
        "Direction artistique",
        "Drone inclus",
        "Révisions illimitées",
        "Teaser offert"
      ]
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
      <section className="relative h-[70vh] min-h-[600px] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&h=1080&fit=crop"
            alt="Video production"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div variants={itemVariants}>
              <div className="relative inline-block mb-6">
                <Video className="w-16 h-16 text-[#BBDCE5]" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-6 tracking-wide">
                Vidéographie
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
                Des films cinématographiques qui donnent vie à vos histoires
                et captivent votre audience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#BBDCE5] text-[#1a1a2e] px-8 py-4 rounded-xl font-medium border-2 border-transparent hover:bg-[#A5C9D4] transition-all duration-300 shadow-lg"
                >
                  <Play className="w-5 h-5" />
                  Démarrer un projet
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition-all duration-300"
                >
                  Voir mes films
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-light text-elgato-brown mb-4">
              Services Vidéo
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto mb-6" />
            <p className="text-lg text-elgato-text-light max-w-3xl mx-auto">
              De la captation au montage final, une approche cinématographique
              pour tous vos projets vidéo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-[#ECEEDF] to-[#E5E7D9] rounded-3xl p-8 hover:shadow-xl transition-all duration-500"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#BBDCE5] to-[#8FB8C5] rounded-2xl flex items-center justify-center text-white">
                    <service.icon size={28} />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-elgato-text-light">À partir de</p>
                    <p className="text-2xl font-bold text-elgato-brown">{service.startingPrice}€</p>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-elgato-brown mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[#CFAB8D] mb-4">{service.duration}</p>
                <p className="text-elgato-text-light leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              Mon Processus Créatif
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto mb-6" />
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Une méthodologie éprouvée pour des résultats professionnels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                variants={itemVariants}
              >
                <div className="text-6xl font-bold text-[#BBDCE5]/20 mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-[#BBDCE5] mb-3">
                  {step.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {step.description}
                </p>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#BBDCE5]/50 to-transparent" />
                )}
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
              Formules Vidéo
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto mb-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border ${
                  pkg.popular ? 'border-[#BBDCE5] ring-2 ring-[#BBDCE5]' : 'border-elgato-cream'
                }`}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#BBDCE5] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Film className="w-4 h-4" /> Populaire
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
                      <Check className="w-5 h-5 text-[#BBDCE5] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center py-3 rounded-xl font-medium transition-colors duration-300 ${
                    pkg.popular
                      ? 'bg-[#BBDCE5] text-white hover:bg-[#A5C9D4]'
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

      {/* Equipment Section */}
      <section className="py-16 bg-elgato-cream/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center" variants={itemVariants}>
            <h3 className="text-xl font-medium text-elgato-brown mb-6">
              Équipement Professionnel
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {equipment.map((item, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white rounded-full text-sm text-elgato-brown shadow-sm flex items-center gap-2"
                >
                  <Monitor className="w-4 h-4 text-[#BBDCE5]" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-3xl p-8 md:p-12 text-center shadow-2xl overflow-hidden relative"
            variants={itemVariants}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#BBDCE5] rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#CFAB8D] rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
              <Play className="w-16 h-16 text-[#BBDCE5] mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
                Prêt à donner vie à votre histoire ?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Chaque projet vidéo est unique. Discutons de votre vision
                et créons ensemble un film mémorable.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#BBDCE5] text-[#1a1a2e] px-8 py-4 rounded-xl font-medium hover:bg-[#A5C9D4] transition-all duration-300 shadow-lg"
              >
                Démarrer mon projet
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
