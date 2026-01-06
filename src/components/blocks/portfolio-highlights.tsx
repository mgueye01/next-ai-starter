'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Camera, Heart, Star, Users } from 'lucide-react';

const portfolioCategories = [
  {
    title: "Portraits d'Art",
    description: "Révéler l'essence de chaque personnalité",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=600&auto=format&fit=crop",
    count: "200+",
    icon: Camera,
    color: "from-[#BBDCE5] to-[#A5C9D4]"
  },
  {
    title: "Mariages",
    description: "Immortaliser vos moments les plus précieux",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
    count: "150+",
    icon: Heart,
    color: "from-[#CFAB8D] to-[#B89B7F]"
  },
  {
    title: "Événements",
    description: "Capturer l'émotion de chaque célébration",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop",
    count: "300+",
    icon: Users,
    color: "from-[#D9C4B0] to-[#C7B19C]"
  }
];

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

export default function PortfolioHighlights() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#ECEEDF]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#6B5B47] mb-6">
            Mon Travail
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-[#8B7355] max-w-3xl mx-auto leading-relaxed">
            Découvrez une sélection de mes créations photographiques, 
            où chaque image raconte une histoire unique et émouvante.
          </p>
        </motion.div>

        {/* Portfolio Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {portfolioCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                {/* Background Image */}
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  {/* Top Badge */}
                  <div className="self-start">
                    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-[#6B5B47]">
                      <IconComponent className="w-4 h-4" />
                      <span>{category.count}</span>
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="text-white">
                    <h3 className="text-2xl md:text-3xl font-light mb-2 group-hover:text-[#BBDCE5] transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/90 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#6B5B47]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="text-center text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium">Voir la galerie</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials */}
        <motion.div
          className="bg-[#ECEEDF] rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-light text-[#6B5B47] mb-4">
              Témoignages
            </h3>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#CFAB8D] text-[#CFAB8D]" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-[#6B5B47] text-lg leading-relaxed mb-4 italic">
                  "{testimonial.text}"
                </blockquote>
                
                {/* Author */}
                <cite className="text-[#8B7355] font-medium not-italic">
                  — {testimonial.author}
                </cite>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#BBDCE5] to-[#A5C9D4] text-[#6B5B47] hover:from-[#A5C9D4] hover:to-[#8FB8C5] rounded-full px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Voir tout mon portfolio
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}