'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, Heart, Building2, Calendar, Clock, MapPin, Star, ArrowRight, Users } from 'lucide-react';

export default function Services() {
  const services = [
    {
      id: 'portraits',
      title: 'Portraits Intimes',
      subtitle: 'Révélez votre essence unique',
      description: 'Sessions personnalisées en studio ou en extérieur pour capturer votre personnalité authentique. Chaque portrait raconte une histoire, la vôtre.',
      features: [
        'Séance de 1h à 3h selon vos besoins',
        'Choix du lieu (studio, domicile, extérieur)',
        '15 à 30 photos retouchées professionnellement',
        'Galerie privée en ligne',
        'Conseils styling inclus'
      ],
      startingPrice: '200€',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c28ca2ed?w=600&h=400&fit=crop',
      icon: Camera,
      color: '#BBDCE5'
    },
    {
      id: 'weddings',
      title: 'Mariages d\'Exception',
      subtitle: 'Votre jour J immortalisé avec élégance',
      description: 'Couverture complète de votre mariage dans un style documentaire élégant. De la préparation à la soirée, chaque émotion est capturée avec sensibilité.',
      features: [
        'Couverture de 6h à journée complète',
        'Préparatifs, cérémonie et réception',
        '100+ photos retouchées',
        'Galerie privée partageable',
        'USB personnalisé inclus',
        'Séance de couple offerte'
      ],
      startingPrice: '1200€',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
      icon: Heart,
      color: '#CFAB8D'
    },
    {
      id: 'corporate',
      title: 'Photographie Corporate',
      subtitle: 'Valorisez votre image professionnelle',
      description: 'Portraits d\'entreprise, photos d\'équipe et événements professionnels. Mettez en valeur votre marque et vos collaborateurs.',
      features: [
        'Portraits individuels et d\'équipe',
        'Photos d\'événements corporate',
        'Reportage en entreprise',
        'Retouche professionnelle',
        'Formats adaptés à vos supports',
        'Livraison rapide garantie'
      ],
      startingPrice: '300€',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      icon: Building2,
      color: '#D9C4B0'
    },
    {
      id: 'events',
      title: 'Événements Privés',
      subtitle: 'Capturez l\'atmosphère de vos célébrations',
      description: 'Anniversaires, baptêmes, fêtes familiales... Je documente vos moments de bonheur avec discrétion et professionnalisme.',
      features: [
        'Couverture d\'événements privés',
        'Approche documentaire discrète',
        'Photos spontanées et posées',
        'Galerie en ligne pour vos invités',
        'Retouche soignée',
        'Options d\'impression disponibles'
      ],
      startingPrice: '400€',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop',
      icon: Calendar,
      color: '#8B7355'
    }
  ];

  const additionalServices = [
    {
      title: 'Retouche et Post-Production',
      description: 'Service de retouche professionnel pour sublimer vos images',
      icon: Star
    },
    {
      title: 'Conseils en Image',
      description: 'Accompagnement personnalisé pour optimiser votre présence visuelle',
      icon: Users
    },
    {
      title: 'Formations Photo',
      description: 'Cours particuliers ou en groupe pour maîtriser l\'art photographique',
      icon: Camera
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Premier Contact',
      description: 'Échangeons sur votre projet, vos attentes et vos besoins spécifiques.'
    },
    {
      number: '02',
      title: 'Devis Personnalisé',
      description: 'Je vous propose une offre sur mesure adaptée à votre budget et vos objectifs.'
    },
    {
      number: '03',
      title: 'Planification',
      description: 'Nous organisons ensemble votre séance : lieu, timing, préparation.'
    },
    {
      number: '04',
      title: 'Séance Photo',
      description: 'Le jour J, je capture vos plus beaux moments dans une ambiance détendue.'
    },
    {
      number: '05',
      title: 'Sélection & Retouche',
      description: 'Vous choisissez vos photos préférées que je retouche avec soin.'
    },
    {
      number: '06',
      title: 'Livraison',
      description: 'Récepção de vos images finales via une galerie privée sécurisée.'
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
    <motion.main 
      className="min-h-screen pt-32 pb-20 px-4 bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-[#6B5B47] mb-6 tracking-wide">
            Services
          </h1>
          <div className='w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto mb-8'></div>
          <p className="text-xl md:text-2xl text-[#8B7355] max-w-4xl mx-auto leading-relaxed">
            Des prestations photographiques sur mesure pour immortaliser vos moments précieux 
            avec élégance et authenticité.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24"
          variants={itemVariants}
        >
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              className="bg-[#ECEEDF] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group"
              whileHover={{ y: -5 }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#6B5B47]/80 via-transparent to-transparent" />
                <div 
                  className="absolute top-6 left-6 w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                  style={{ backgroundColor: service.color }}
                >
                  <service.icon size={24} />
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#6B5B47] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-[#8B7355] font-medium">
                      {service.subtitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-light text-[#CFAB8D]">
                      À partir de
                    </div>
                    <div className="text-3xl font-semibold text-[#6B5B47]">
                      {service.startingPrice}
                    </div>
                  </div>
                </div>
                
                <p className="text-[#8B7355] leading-relaxed mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-[#6B5B47]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#CFAB8D] flex-shrink-0"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex gap-3">
                  <Link 
                    href="/contact"
                    className="flex-1 bg-[#BBDCE5] text-[#6B5B47] text-center py-3 rounded-xl font-medium hover:bg-[#A5C9D4] transition-colors duration-300"
                  >
                    Demander un devis
                  </Link>
                  <Link 
                    href="/services/tarifs"
                    className="px-6 border-2 border-[#CFAB8D] text-[#CFAB8D] py-3 rounded-xl font-medium hover:bg-[#CFAB8D] hover:text-white transition-colors duration-300"
                  >
                    Tarifs
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Services */}
        <motion.div 
          className="mb-24"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-light text-[#6B5B47] mb-12 text-center">
            Services Complémentaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div 
                key={index}
                className="text-center p-8 bg-white rounded-3xl shadow-md border border-[#ECEEDF] hover:border-[#CFAB8D] transition-all duration-300"
                whileHover={{ y: -3 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] text-[#6B5B47] rounded-2xl mb-6">
                  <service.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold text-[#6B5B47] mb-4">
                  {service.title}
                </h3>
                <p className="text-[#8B7355] leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process */}
        <motion.div 
          className="mb-24 bg-gradient-to-r from-[#BBDCE5]/10 to-[#D9C4B0]/10 rounded-3xl p-8 md:p-12"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-light text-[#6B5B47] mb-12 text-center">
            Comment ça se passe ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div 
                key={index}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#CFAB8D] text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#6B5B47] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[#8B7355] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-8 h-0.5 bg-[#CFAB8D]/30 transform -translate-x-4"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center bg-gradient-to-r from-[#6B5B47] to-[#8B7355] text-white rounded-3xl p-8 md:p-12 shadow-2xl"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Prêt à donner vie à votre projet ?
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Chaque projet est unique. Contactez-moi pour discuter de vos besoins 
            et recevoir une proposition personnalisée qui correspond parfaitement à vos attentes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#BBDCE5] text-[#6B5B47] rounded-xl font-medium hover:bg-[#A5C9D4] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Demander un devis gratuit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#CFAB8D] text-[#CFAB8D] hover:text-white rounded-xl font-medium hover:bg-[#CFAB8D] transition-all duration-300"
              >
                Découvrir mon travail
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}