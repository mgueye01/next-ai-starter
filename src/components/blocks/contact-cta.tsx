'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MessageCircle, Mail, Phone, ArrowRight } from 'lucide-react';

export default function ContactCTA() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white to-[#ECEEDF]/30 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%236B5B47' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="bg-gradient-to-br from-[#BBDCE5]/10 via-white to-[#CFAB8D]/10 rounded-3xl p-8 md:p-16 backdrop-blur-sm border border-[#ECEEDF] shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#BBDCE5] to-[#CFAB8D] flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Calendar className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#6B5B47] mb-6 tracking-tight">
              Discutons de votre projet
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto mb-6" />
            <p className="text-lg md:text-xl text-[#8B7355] max-w-2xl mx-auto leading-relaxed">
              Réservez une consultation gratuite de 30 minutes pour explorer comment
              nous pouvons donner vie à votre vision photographique.
            </p>
          </div>

          {/* Contact Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: MessageCircle,
                title: "WhatsApp",
                description: "Réponse rapide sous 1h",
                action: "Envoyer un message",
                href: "https://wa.me/33123456789",
                color: "#25D366"
              },
              {
                icon: Mail,
                title: "Email",
                description: "contact@elgatophoto.com",
                action: "Envoyer un email",
                href: "mailto:contact@elgatophoto.com",
                color: "#CFAB8D"
              },
              {
                icon: Phone,
                title: "Téléphone",
                description: "+33 1 23 45 67 89",
                action: "Appeler maintenant",
                href: "tel:+33123456789",
                color: "#BBDCE5"
              }
            ].map((option, index) => {
              const IconComponent = option.icon;
              return (
                <motion.a
                  key={index}
                  href={option.href}
                  className="group bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-500 border border-[#ECEEDF] hover:border-[#CFAB8D]/30"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${option.color}20` }}
                  >
                    <IconComponent className="w-6 h-6" style={{ color: option.color }} />
                  </div>
                  <h3 className="text-xl font-medium text-[#6B5B47] mb-2">
                    {option.title}
                  </h3>
                  <p className="text-sm text-[#8B7355] mb-4">
                    {option.description}
                  </p>
                  <span
                    className="text-sm font-medium group-hover:underline"
                    style={{ color: option.color }}
                  >
                    {option.action} →
                  </span>
                </motion.a>
              );
            })}
          </div>

          {/* Main CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              className="group w-full sm:w-auto relative overflow-hidden flex items-center justify-center gap-3 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] text-white hover:from-[#A5C9D4] hover:to-[#B89B7F] rounded-full px-10 py-5 text-lg font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-transparent"
            >
              <span className="relative z-10">Réserver une consultation</span>
              <Calendar className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#A5C9D4] to-[#B89B7F] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <Link
              href="/portfolio"
              className="group w-full sm:w-auto relative overflow-hidden flex items-center justify-center gap-3 border-2 border-[#CFAB8D] text-[#CFAB8D] hover:bg-[#CFAB8D] hover:text-white rounded-full px-10 py-5 text-lg font-medium transition-all duration-300"
            >
              <span className="relative z-10">Voir le portfolio</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-12 pt-8 border-t border-[#ECEEDF]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-sm text-[#8B7355]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#BBDCE5]" />
                <span>Réponse sous 24h garantie</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#CFAB8D]" />
                <span>Devis gratuit & personnalisé</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#BBDCE5]" />
                <span>Sans engagement</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}