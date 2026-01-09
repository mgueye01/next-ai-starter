'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Users, Heart, ArrowRight } from 'lucide-react';

const stats = [
  { icon: Users, value: "800+", label: "Clients satisfaits" },
  { icon: Award, value: "150+", label: "Mariages immortalisés" },
  { icon: Heart, value: "98%", label: "Taux de satisfaction" }
];

export default function AboutPreview() {
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Images */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Main image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=800&auto=format&fit=crop"
                alt="Photographe au travail"
                fill
                className="object-cover"
              />
              {/* Artistic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#6B5B47]/80 via-transparent to-transparent" />

              {/* Floating badge */}
              <motion.div
                className="absolute bottom-8 left-8 bg-white rounded-2xl p-6 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#BBDCE5] to-[#CFAB8D] flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-elgato-text-light">Photographe certifié</p>
                    <p className="text-lg font-medium text-elgato-brown">Depuis 2018</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Secondary image */}
            <motion.div
              className="absolute -bottom-8 -right-8 w-64 h-64 rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Image
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=400&auto=format&fit=crop"
                alt="Équipement photo"
                fill
                className="object-cover"
              />
              {/* Film grain effect */}
              <div className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
              />
            </motion.div>

            {/* Decorative corner frame */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-elgato-sand rounded-tl-2xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-elgato-blue rounded-br-2xl hidden lg:block" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div>
                <motion.p
                  className="text-elgato-sand font-medium mb-2 tracking-wide"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  À PROPOS
                </motion.p>
                <h2 className="text-4xl md:text-5xl font-light text-elgato-brown mb-6 tracking-tight">
                  Capturer l'émotion,
                  <br />
                  <span className="text-elgato-sand">Créer des souvenirs</span>
                </h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D]" />
              </div>

              <div className="space-y-4 text-elgato-text-light leading-relaxed text-lg">
                <p>
                  Basé à Paris depuis 2018, je suis un photographe passionné spécialisé dans la
                  capture de moments authentiques et intemporels. Mon approche artistique allie
                  techniques classiques et vision contemporaine.
                </p>
                <p>
                  Chaque projet est une nouvelle histoire à raconter. Que ce soit un mariage,
                  un portrait ou un événement corporate, je m'engage à créer des images qui
                  résonnent avec émotion et authenticité.
                </p>
                <p>
                  Ma philosophie : la photographie n'est pas seulement une question de technique,
                  mais de connexion humaine et de compréhension profonde de ce que vous souhaitez transmettre.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#BBDCE5]/20 to-[#CFAB8D]/20 flex items-center justify-center mx-auto mb-3">
                        <IconComponent className="w-6 h-6 text-elgato-sand" />
                      </div>
                      <div className="text-2xl md:text-3xl font-light text-elgato-brown mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs md:text-sm text-elgato-text-light">
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="pt-8">
                <Link
                  href="/a-propos"
                  className="group inline-flex items-center gap-3 text-elgato-sand hover:text-elgato-sand-dark font-medium text-lg transition-colors duration-300"
                >
                  En savoir plus sur mon parcours
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}