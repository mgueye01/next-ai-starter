'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Calendar, Camera, Edit, Image, CheckCircle } from 'lucide-react';

const processSteps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Consultation",
    description: "Échange sur vos besoins, vos envies et votre vision. Nous définissons ensemble le style et l'ambiance de votre projet.",
    duration: "30-60 min",
    color: "#BBDCE5"
  },
  {
    icon: Calendar,
    number: "02",
    title: "Planification",
    description: "Organisation de la séance : choix des lieux, horaires optimaux, préparation des détails techniques et artistiques.",
    duration: "1-2 jours",
    color: "#CFAB8D"
  },
  {
    icon: Camera,
    number: "03",
    title: "Séance Photo",
    description: "Captation professionnelle dans une ambiance détendue. Direction artistique et guidance pour des résultats naturels.",
    duration: "2-4 heures",
    color: "#D9C4B0"
  },
  {
    icon: Edit,
    number: "04",
    title: "Sélection",
    description: "Tri et sélection des meilleures prises. Accès à votre galerie privée pour choisir vos photos préférées.",
    duration: "3-5 jours",
    color: "#BBDCE5"
  },
  {
    icon: Image,
    number: "05",
    title: "Retouche",
    description: "Post-production artistique sur les photos sélectionnées. Retouches professionnelles respectant votre authenticité.",
    duration: "1-2 semaines",
    color: "#CFAB8D"
  },
  {
    icon: CheckCircle,
    number: "06",
    title: "Livraison",
    description: "Réception de vos photos en haute résolution via galerie sécurisée. Formats optimisés pour tous vos usages.",
    duration: "Immédiat",
    color: "#D9C4B0"
  }
];

export default function PhotographyProcess() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-[#ECEEDF]/30 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#BBDCE5]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#CFAB8D]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-elgato-brown mb-6 tracking-tight">
            Mon Processus Créatif
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto mb-8" />
          <p className="text-lg md:text-xl text-elgato-text-light max-w-3xl mx-auto leading-relaxed">
            De la première consultation à la livraison finale, une expérience professionnelle
            et personnalisée à chaque étape.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Connecting line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#BBDCE5] via-[#CFAB8D] to-[#D9C4B0] transform -translate-y-1/2" />

          {/* Connecting line - Mobile */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#BBDCE5] via-[#CFAB8D] to-[#D9C4B0]" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isEvenRow = Math.floor(index / 3) % 2 === 1;
              const columnIndex = index % 3;
              const shouldFlip = isEvenRow;

              return (
                <motion.div
                  key={index}
                  className={`relative ${shouldFlip ? 'lg:translate-y-32' : ''}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: shouldFlip ? 128 : 0 }}
                  transition={{
                    duration: 0.8,
                    delay: columnIndex * 0.15,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="flex lg:flex-col items-start lg:items-center gap-6 lg:gap-0">
                    {/* Icon Circle */}
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg relative z-10 bg-white"
                        style={{
                          boxShadow: `0 10px 40px ${step.color}30`,
                          border: `2px solid ${step.color}40`
                        }}
                      >
                        <IconComponent className="w-9 h-9" style={{ color: step.color }} />
                      </div>

                      {/* Step Number Badge */}
                      <div
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white z-20"
                        style={{ backgroundColor: step.color }}
                      >
                        {step.number}
                      </div>

                      {/* Pulse effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: step.color }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      />
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 lg:mt-8">
                      <div className="bg-white rounded-2xl p-6 lg:p-8 border border-elgato-cream hover:border-elgato-sand/30 transition-all duration-500 hover:shadow-xl group">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-2xl font-light text-elgato-brown group-hover:text-elgato-text-light transition-colors">
                            {step.title}
                          </h3>
                          <span
                            className="text-xs font-medium px-3 py-1 rounded-full"
                            style={{
                              backgroundColor: `${step.color}20`,
                              color: step.color
                            }}
                          >
                            {step.duration}
                          </span>
                        </div>

                        <p className="text-elgato-text-light leading-relaxed">
                          {step.description}
                        </p>

                        {/* Progress indicator */}
                        <div className="mt-4 pt-4 border-t border-elgato-cream">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1 bg-elgato-cream rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: step.color }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${((index + 1) / processSteps.length) * 100}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                viewport={{ once: true }}
                              />
                            </div>
                            <span className="text-xs text-elgato-text-light font-medium">
                              {Math.round(((index + 1) / processSteps.length) * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-elgato-text-light mb-6 text-lg">
            Prêt à commencer votre projet ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-elgato-blue text-elgato-brown rounded-full hover:bg-elgato-blue hover:text-white transition-all duration-300"
            >
              Voir mes réalisations
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#CFAB8D] to-[#B89B7F] text-white rounded-full hover:shadow-lg transition-all duration-300"
            >
              Commencer maintenant
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}