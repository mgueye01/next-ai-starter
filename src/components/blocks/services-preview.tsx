'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Video, ArrowRight, Building2, PartyPopper, Sparkles } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Camera,
    title: "Portraits d'Art",
    description: "Séances personnalisées capturant votre essence unique",
    color: "#BBDCE5",
    href: "/services/portraits"
  },
  {
    icon: Heart,
    title: "Mariages",
    description: "Immortaliser votre journée la plus précieuse",
    color: "#CFAB8D",
    href: "/services/mariages"
  },
  {
    icon: PartyPopper,
    title: "Événements",
    description: "Capturer l'atmosphère de vos moments spéciaux",
    color: "#D9C4B0",
    href: "/services/evenements"
  },
  {
    icon: Video,
    title: "Vidéographie",
    description: "Films cinématographiques de haute qualité",
    color: "#BBDCE5",
    href: "/services/video"
  },
  {
    icon: Building2,
    title: "Corporate",
    description: "Photos professionnelles pour votre entreprise",
    color: "#CFAB8D",
    href: "/services/corporate"
  },
  {
    icon: Sparkles,
    title: "Contenu Digital",
    description: "Création de contenu pour vos réseaux sociaux",
    color: "#D9C4B0",
    href: "/services/contenu"
  }
];

export default function ServicesPreview() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-light text-elgato-brown mb-4">
            Services
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-elgato-blue to-elgato-sand mx-auto" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={service.href}>
                  <div className="group relative bg-white rounded-xl p-6 border border-elgato-cream hover:border-elgato-sand/30 transition-all duration-300 hover:shadow-lg cursor-pointer">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                      style={{ boxShadow: `0 4px 16px ${service.color}30` }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: service.color }} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-light text-elgato-brown mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-elgato-text-light leading-relaxed">
                      {service.description}
                    </p>

                    {/* Hover Arrow */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-5 h-5" style={{ color: service.color }} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-elgato-sand hover:text-elgato-sand-dark font-medium transition-colors duration-300"
          >
            Voir tous les services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
