'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const testimonials = [
  {
    text: "Des photos magnifiques qui ont capturé parfaitement l'essence de notre mariage",
    author: "Marie & Pierre",
    rating: 5
  },
  {
    text: "Un photographe exceptionnel avec un œil artistique remarquable",
    author: "Sophie L.",
    rating: 5
  },
  {
    text: "Professionnel, créatif et à l'écoute. Je recommande vivement !",
    author: "Thomas M.",
    rating: 5
  }
];

export default function TestimonialsCTA() {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-white to-elgato-cream/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Testimonials */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-elgato-brown mb-4">
              Témoignages Clients
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-elgato-blue to-elgato-sand mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 border border-elgato-cream hover:border-elgato-sand/30 transition-all duration-300 hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-elgato-sand text-elgato-sand" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-elgato-brown leading-relaxed mb-4 italic text-center">
                  "{testimonial.text}"
                </blockquote>

                {/* Author */}
                <cite className="text-elgato-text-light font-medium not-italic block text-center text-sm">
                  — {testimonial.author}
                </cite>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="bg-gradient-to-br from-elgato-blue/20 to-elgato-sand/20 rounded-3xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-light text-elgato-brown mb-4">
            Prêt à Créer Ensemble ?
          </h3>
          <p className="text-lg text-elgato-text-light mb-8 max-w-2xl mx-auto">
            Discutons de votre projet et donnons vie à vos idées.
            Réponse sous 24h garantie.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-elgato-blue to-elgato-sand text-white hover:from-elgato-blue-dark hover:to-elgato-sand-dark rounded-full px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Me Contacter
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-elgato-brown hover:text-elgato-text-light font-medium transition-colors duration-300"
            >
              Voir mon Portfolio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="text-sm text-elgato-text-light mt-6">
            📍 Basé à Paris • 🌍 Disponible France & Europe
          </p>
        </motion.div>
      </div>
    </section>
  );
}
