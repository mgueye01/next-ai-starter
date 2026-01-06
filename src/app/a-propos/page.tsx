'use client';

import React from 'react';
import Image from 'next/image';
import { Camera, Award, Users, Heart, MapPin, Star, Palette, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function APropos() {
  const stats = [
    { icon: Camera, label: "Années d'expérience", value: "8+", desc: "de passion" },
    { icon: Users, label: "Clients satisfaits", value: "500+", desc: "témoignages" },
    { icon: Award, label: "Prix remportés", value: "15", desc: "distinctions" },
    { icon: Heart, label: "Projets réalisés", value: "1200+", desc: "moments capturés" }
  ];

  const expertise = [
    { 
      icon: Palette, 
      title: "Style Artistique", 
      description: "Un style intemporel alliant technique maîtrisée et sensibilité créative pour des images d'exception."
    },
    { 
      icon: Eye, 
      title: "Regard Unique", 
      description: "Chaque séance révèle votre authenticité à travers une approche personnalisée et bienveillante."
    },
    { 
      icon: Star, 
      title: "Excellence Technique", 
      description: "Équipement professionnel et maîtrise des dernières techniques pour un rendu parfait."
    }
  ];

  const services = [
    {
      title: "Portraits Intimes",
      description: "Sessions personnalisées en studio ou en extérieur pour révéler votre essence unique",
      image: "https://images.unsplash.com/photo-1494790108755-2616c28ca2ed?w=400&h=400&fit=crop"
    },
    {
      title: "Mariages d'Exception", 
      description: "Couverture complète de votre jour J avec un style documentaire élégant",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop"
    },
    {
      title: "Photographie Corporate",
      description: "Portraits professionnels et photos d'entreprise pour valoriser votre image",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      title: "Événements Privés",
      description: "Capturer l'atmosphère et les émotions de vos moments spéciaux",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-[#6B5B47] mb-6 tracking-wide">
            À propos
          </h1>
          <div className='w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto mb-8'></div>
          <p className="text-xl md:text-2xl text-[#8B7355] max-w-4xl mx-auto leading-relaxed">
            Photographe d'art basé à Paris, je capture l'essence de chaque instant 
            avec un style unique mêlant élégance contemporaine et authenticité naturelle.
          </p>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24"
          variants={itemVariants}
        >
          <div className="order-2 lg:order-1 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-[#6B5B47] mb-4">
                Bonjour, je suis 
                <span className="block text-4xl md:text-5xl font-extralight text-[#CFAB8D] mt-2">
                  Alexandre
                </span>
              </h2>
              <div className="flex items-center gap-2 text-[#8B7355] mb-6">
                <MapPin className="w-5 h-5 text-[#BBDCE5]" />
                <span>Photographe professionnel • Paris & Île-de-France</span>
              </div>
            </div>
            
            <div className="space-y-6 text-base md:text-lg text-[#8B7355] leading-relaxed">
              <p>
                Depuis plus de 8 ans, j'ai développé une passion profonde pour l'art photographique, 
                me spécialisant dans la capture d'instants authentiques et d'émotions sincères. 
                Mon approche artistique privilégie <span className="font-medium text-[#CFAB8D]">l'authenticité</span> 
                et <span className="font-medium text-[#CFAB8D]">l'élégance naturelle</span>.
              </p>
              <p>
                Formé aux Beaux-Arts et certifié par l'École Française de Photographie, 
                je maîtrise parfaitement les techniques classiques et contemporaines. 
                Chaque séance est pensée comme une <span className="font-medium text-[#CFAB8D]">œuvre d'art unique</span>, 
                adaptée à votre personnalité et vos aspirations.
              </p>
              <p>
                Que vous souhaitiez immortaliser votre union, créer des portraits d'exception 
                ou capturer l'essence d'un événement marquant, je m'engage à vous offrir 
                des images intemporelles qui préserveront la magie de ces instants précieux.
              </p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#ECEEDF]">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop"
                alt="Alexandre, photographe elGato Photo Paris"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center">
                  <div className="text-[#6B5B47] font-semibold">Alexandre Moreau</div>
                  <div className="text-sm text-[#8B7355]">Photographe d'Art • Paris</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-24"
          variants={itemVariants}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center p-6 bg-[#ECEEDF] rounded-2xl hover:bg-[#D9C4B0] transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] text-[#6B5B47] rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <stat.icon size={28} />
              </div>
              <div className="text-2xl md:text-3xl font-light text-[#CFAB8D] mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-[#6B5B47] mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-[#8B7355]">
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Expertise Section */}
        <motion.div 
          className="mb-20"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-light text-[#6B5B47] mb-12 text-center">
            Mon Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertise.map((item, index) => (
              <motion.div 
                key={index}
                className="text-center p-8 bg-white rounded-3xl shadow-lg border border-[#ECEEDF] hover:border-[#CFAB8D] transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] text-[#6B5B47] rounded-2xl mb-6">
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold text-[#6B5B47] mb-4">
                  {item.title}
                </h3>
                <p className="text-[#8B7355] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Philosophy */}
        <motion.div 
          className="bg-gradient-to-r from-[#BBDCE5]/20 to-[#D9C4B0]/20 rounded-3xl p-8 md:p-12 mb-24 border border-[#CFAB8D]/20"
          variants={itemVariants}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-[#6B5B47] mb-8">
              Ma Philosophie
            </h2>
            <blockquote className="text-xl md:text-2xl font-light text-[#6B5B47] italic leading-relaxed mb-8">
              "La photographie, c'est l'art de capturer l'âme d'un instant et de la 
              préserver pour l'éternité. Chaque clic devient une promesse de mémoire, 
              chaque image une fenêtre sur l'émotion."
            </blockquote>
            <p className="text-base md:text-lg text-[#8B7355] leading-relaxed">
              Je crois profondément que chaque personne porte en elle une beauté unique, 
              une histoire singulière qui mérite d'être révélée. Mon rôle de photographe 
              est de créer un espace de confiance où votre authenticité peut s'exprimer 
              naturellement, pour des images qui vous ressemblent vraiment.
            </p>
          </div>
        </motion.div>

        {/* Services */}
        <motion.div className="mb-24" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-light text-[#6B5B47] mb-12 text-center">
            Mes Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500"
                whileHover={{ scale: 1.02 }}
              >
                <div className="aspect-square relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#6B5B47]/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-[#CFAB8D]/0 group-hover:bg-[#CFAB8D]/20 transition-all duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-[#BBDCE5] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center bg-gradient-to-r from-[#6B5B47] to-[#8B7355] text-white rounded-3xl p-8 md:p-12 shadow-2xl"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Créons ensemble vos plus beaux souvenirs
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Prêt à vivre une expérience photographique unique et personnalisée ? 
            Contactez-moi pour discuter de votre projet et donner vie à vos idées.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#BBDCE5] text-[#6B5B47] rounded-xl font-medium hover:bg-[#A5C9D4] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Me contacter
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#CFAB8D] text-[#CFAB8D] hover:text-white rounded-xl font-medium hover:bg-[#CFAB8D] transition-all duration-300"
              >
                Découvrir mon portfolio
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}