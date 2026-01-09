'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Briefcase, Building2, Users, Camera, ArrowRight, Check,
  Clock, Award, Target, Zap, Globe, Shield
} from 'lucide-react';

export default function CorporatePage() {
  const services = [
    {
      icon: Users,
      title: "Portraits Professionnels",
      description: "Headshots et portraits d'équipe pour LinkedIn, site web et supports de communication. Un style moderne et authentique qui reflète l'identité de votre entreprise.",
      features: ["Portraits individuels", "Photos d'équipe", "Photos de direction", "Retouche professionnelle"]
    },
    {
      icon: Building2,
      title: "Reportage d'Entreprise",
      description: "Documentez la vie de votre entreprise : locaux, processus de travail, ambiance d'équipe. Des images authentiques pour votre communication interne et externe.",
      features: ["Vie au bureau", "Processus métier", "Culture d'entreprise", "Espaces de travail"]
    },
    {
      icon: Camera,
      title: "Événements Corporate",
      description: "Couverture complète de vos événements professionnels : séminaires, conférences, team buildings, soirées d'entreprise et inaugurations.",
      features: ["Conférences", "Séminaires", "Team buildings", "Soirées d'entreprise"]
    },
    {
      icon: Globe,
      title: "Contenu Digital",
      description: "Photos optimisées pour vos réseaux sociaux professionnels, site web et campagnes marketing. Des visuels qui renforcent votre image de marque.",
      features: ["Réseaux sociaux", "Site web", "Newsletters", "Présentations"]
    }
  ];

  const packages = [
    {
      name: "Essentiel",
      price: "300",
      description: "Idéal pour les startups et petites équipes",
      duration: "2h sur site",
      features: [
        "Jusqu'à 5 portraits individuels",
        "1 photo d'équipe",
        "Retouche professionnelle",
        "Formats web et print",
        "Livraison sous 48h"
      ],
      popular: false
    },
    {
      name: "Business",
      price: "600",
      description: "Pour les PME et équipes moyennes",
      duration: "Demi-journée",
      features: [
        "Jusqu'à 15 portraits individuels",
        "Photos d'équipe multiples",
        "Photos des locaux",
        "Retouche avancée",
        "Formats tous supports",
        "Livraison sous 72h"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Sur devis",
      description: "Solution complète pour grandes entreprises",
      duration: "Journée complète",
      features: [
        "Portraits illimités",
        "Reportage complet",
        "Photos d'événement incluses",
        "Direction artistique",
        "Post-production premium",
        "Accompagnement annuel possible"
      ],
      popular: false
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Efficacité",
      description: "Organisation optimisée pour minimiser le temps de mobilisation de vos équipes"
    },
    {
      icon: Shield,
      title: "Confidentialité",
      description: "Respect total de la confidentialité de vos locaux et informations sensibles"
    },
    {
      icon: Target,
      title: "Sur-mesure",
      description: "Chaque projet est adapté à votre secteur d'activité et votre image de marque"
    },
    {
      icon: Clock,
      title: "Réactivité",
      description: "Livraison express possible sous 24-48h pour les urgences"
    }
  ];

  const clients = [
    "Startups tech", "Cabinets d'avocats", "Agences de communication",
    "Entreprises du CAC 40", "PME innovantes", "Institutions culturelles"
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
      <section className="relative h-[70vh] min-h-[600px] bg-gradient-to-br from-[#6B5B47] to-[#8B7355] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
            alt="Corporate photography"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div variants={itemVariants}>
              <Briefcase className="w-16 h-16 text-[#CFAB8D] mx-auto mb-6" />
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-6 tracking-wide">
                Photographie Corporate
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
                Valorisez votre image professionnelle avec des visuels qui reflètent
                l'excellence et le dynamisme de votre entreprise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#CFAB8D] text-white px-8 py-4 rounded-xl font-medium border-2 border-transparent hover:bg-[#B89B7F] transition-all duration-300 shadow-lg"
                >
                  Demander un devis
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition-all duration-300"
                >
                  Voir mes réalisations
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
              Services Corporate
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto mb-6" />
            <p className="text-lg text-elgato-text-light max-w-3xl mx-auto">
              Une offre complète pour répondre à tous vos besoins en communication visuelle professionnelle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-elgato-cream rounded-3xl p-8 hover:shadow-xl transition-all duration-500"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#CFAB8D] to-[#D9C4B0] rounded-2xl flex items-center justify-center text-white mb-6">
                  <service.icon size={28} />
                </div>
                <h3 className="text-2xl font-semibold text-elgato-brown mb-4">
                  {service.title}
                </h3>
                <p className="text-elgato-text-light leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="grid grid-cols-2 gap-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-elgato-brown">
                      <Check className="w-4 h-4 text-[#CFAB8D]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-[#ECEEDF]/30 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-light text-elgato-brown mb-4">
              Forfaits Corporate
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto mb-6" />
            <p className="text-lg text-elgato-text-light max-w-3xl mx-auto">
              Des formules adaptées à la taille et aux besoins de votre entreprise.
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
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#CFAB8D] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Recommandé
                  </div>
                )}
                <h3 className="text-2xl font-semibold text-elgato-brown mb-2">
                  {pkg.name}
                </h3>
                <p className="text-elgato-text-light text-sm mb-4">{pkg.description}</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-elgato-brown">{pkg.price}</span>
                  {pkg.price !== "Sur devis" && <span className="text-elgato-text-light">€</span>}
                </div>
                <p className="text-sm text-[#CFAB8D] mb-6">{pkg.duration}</p>
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
                      ? 'bg-[#CFAB8D] text-white hover:bg-[#B89B7F]'
                      : 'bg-elgato-cream text-elgato-brown hover:bg-[#D9C4B0]'
                  }`}
                >
                  Demander un devis
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-light text-elgato-brown mb-4">
              Pourquoi me choisir ?
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#BBDCE5] to-[#CFAB8D] rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold text-elgato-brown mb-2">
                  {benefit.title}
                </h3>
                <p className="text-elgato-text-light text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16 bg-elgato-cream/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center" variants={itemVariants}>
            <p className="text-elgato-text-light mb-6">Ils me font confiance</p>
            <div className="flex flex-wrap justify-center gap-4">
              {clients.map((client, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white rounded-full text-sm text-elgato-brown shadow-sm"
                >
                  {client}
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
            className="bg-gradient-to-r from-[#6B5B47] to-[#8B7355] rounded-3xl p-8 md:p-12 text-center shadow-2xl"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              Valorisez votre image d'entreprise
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Discutons de votre projet et créons ensemble des visuels qui
              incarnent les valeurs et l'excellence de votre entreprise.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#CFAB8D] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#B89B7F] transition-all duration-300 shadow-lg"
            >
              Planifier un rendez-vous
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
