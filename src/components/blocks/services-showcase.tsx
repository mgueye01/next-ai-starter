'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Video, Users, Briefcase, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Camera,
    title: "Portraits d'Art",
    description: "Séances photo personnalisées capturant votre essence unique avec une approche artistique et intime.",
    features: ["Studio ou extérieur", "Retouche professionnelle", "Galerie privée en ligne"],
    price: "À partir de 350€",
    color: "from-[#BBDCE5]/20 to-[#BBDCE5]/5",
    accentColor: "#BBDCE5"
  },
  {
    icon: Heart,
    title: "Mariages",
    description: "Immortalisation complète de votre journée spéciale, de la préparation à la première danse.",
    features: ["Couverture complète", "Second photographe inclus", "Album premium"],
    price: "À partir de 2500€",
    color: "from-[#CFAB8D]/20 to-[#CFAB8D]/5",
    accentColor: "#CFAB8D"
  },
  {
    icon: Users,
    title: "Événements",
    description: "Captation professionnelle de vos événements corporatifs, familiaux ou sociaux.",
    features: ["Reportage complet", "Livraison rapide 48h", "Photos HD illimitées"],
    price: "À partir de 800€",
    color: "from-[#D9C4B0]/20 to-[#D9C4B0]/5",
    accentColor: "#D9C4B0"
  },
  {
    icon: Video,
    title: "Vidéographie",
    description: "Films cinématographiques et contenu vidéo de haute qualité pour tous types de projets.",
    features: ["4K professionnel", "Montage créatif", "Musique originale"],
    price: "À partir de 1200€",
    color: "from-[#BBDCE5]/20 to-[#BBDCE5]/5",
    accentColor: "#BBDCE5"
  },
  {
    icon: Briefcase,
    title: "Corporate",
    description: "Photos professionnelles pour votre entreprise : headshots, événements, produits.",
    features: ["Session entreprise", "Usage commercial inclus", "Branding cohérent"],
    price: "Sur devis",
    color: "from-[#CFAB8D]/20 to-[#CFAB8D]/5",
    accentColor: "#CFAB8D"
  },
  {
    icon: Sparkles,
    title: "Création de Contenu",
    description: "Contenu visuel sur mesure pour vos réseaux sociaux et campagnes marketing.",
    features: ["Package mensuel", "Stories & Reels", "Stratégie créative"],
    price: "À partir de 600€/mois",
    color: "from-[#D9C4B0]/20 to-[#D9C4B0]/5",
    accentColor: "#D9C4B0"
  }
];

export default function ServicesShowcase() {
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#BBDCE5] to-[#CFAB8D] flex items-center justify-center mx-auto mb-6">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#6B5B47] mb-6 tracking-tight">
            Services Photographiques
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto mb-8" />
          <p className="text-lg md:text-xl text-[#8B7355] max-w-3xl mx-auto leading-relaxed">
            Des prestations sur mesure pour capturer vos moments les plus précieux
            avec une touche artistique et professionnelle.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className={`relative h-full bg-gradient-to-br ${service.color} backdrop-blur-sm rounded-2xl p-8 border border-[#ECEEDF] hover:border-[${service.accentColor}]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[${service.accentColor}]/10`}>
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                    style={{ boxShadow: `0 8px 24px ${service.accentColor}20` }}
                  >
                    <IconComponent className="w-7 h-7" style={{ color: service.accentColor }} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-light text-[#6B5B47] mb-3 group-hover:text-[#8B7355] transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-[#8B7355] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-[#6B5B47]">
                        <div
                          className="w-1.5 h-1.5 rounded-full mr-3"
                          style={{ backgroundColor: service.accentColor }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="pt-6 border-t border-[#ECEEDF]">
                    <p className="text-lg font-medium" style={{ color: service.accentColor }}>
                      {service.price}
                    </p>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${service.accentColor}05, transparent)`
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] text-white hover:from-[#A5C9D4] hover:to-[#B89B7F] rounded-full px-10 py-5 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Réserver une consultation gratuite
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          </Link>
          <p className="text-sm text-[#8B7355] mt-4">
            Réponse sous 24h • Devis personnalisé gratuit
          </p>
        </motion.div>
      </div>
    </section>
  );
}