'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Camera, Heart, Building2, Calendar, Check, ArrowRight, Star, Clock, Users } from 'lucide-react';

export default function TarifsPage() {
  const pricingPackages = [
    {
      id: 'portrait',
      name: 'Portrait Essentiel',
      price: '200',
      description: 'Idéal pour un portrait professionnel ou personnel',
      duration: '1h',
      icon: Camera,
      color: '#BBDCE5',
      features: [
        '1 heure de séance',
        '15 photos retouchées',
        'Galerie privée en ligne',
        'Téléchargement haute résolution',
        'Conseils styling inclus'
      ],
      popular: false
    },
    {
      id: 'portrait-premium',
      name: 'Portrait Premium',
      price: '350',
      description: 'Pour une séance plus complète avec plusieurs looks',
      duration: '2h',
      icon: Camera,
      color: '#BBDCE5',
      features: [
        '2 heures de séance',
        '30 photos retouchées',
        'Galerie privée en ligne',
        '2 changements de tenue',
        'Conseils styling personnalisés',
        '1 tirage photo 20x30 offert'
      ],
      popular: true
    },
    {
      id: 'mariage-essentiel',
      name: 'Mariage Essentiel',
      price: '1200',
      description: 'Couverture des moments clés de votre journée',
      duration: '6h',
      icon: Heart,
      color: '#CFAB8D',
      features: [
        '6 heures de couverture',
        'Préparatifs + cérémonie + cocktail',
        '100 photos retouchées',
        'Galerie privée partageable',
        'Clé USB personnalisée'
      ],
      popular: false
    },
    {
      id: 'mariage-premium',
      name: 'Mariage Premium',
      price: '2200',
      description: 'Couverture complète de votre mariage',
      duration: 'Journée',
      icon: Heart,
      color: '#CFAB8D',
      features: [
        'Journée complète (10h+)',
        'Préparatifs jusqu\'à la soirée',
        '300+ photos retouchées',
        'Galerie privée partageable',
        'Clé USB personnalisée',
        'Séance couple J+1 offerte',
        'Album photo 30x30 inclus'
      ],
      popular: true
    },
    {
      id: 'corporate',
      name: 'Corporate',
      price: '300',
      description: 'Portraits professionnels pour votre équipe',
      duration: '2h',
      icon: Building2,
      color: '#D9C4B0',
      features: [
        '2 heures sur site',
        'Jusqu\'à 5 portraits individuels',
        'Photos d\'équipe',
        'Retouche professionnelle',
        'Formats adaptés (LinkedIn, web, print)',
        'Livraison sous 48h'
      ],
      popular: false
    },
    {
      id: 'evenement',
      name: 'Événement',
      price: '400',
      description: 'Immortalisez vos célébrations',
      duration: '3h',
      icon: Calendar,
      color: '#8B7355',
      features: [
        '3 heures de couverture',
        '80 photos retouchées',
        'Galerie en ligne pour vos invités',
        'Photos spontanées et posées',
        'Livraison sous 1 semaine'
      ],
      popular: false
    }
  ];

  const extras = [
    { name: 'Heure supplémentaire', price: '150€/h' },
    { name: 'Photos supplémentaires (lot de 10)', price: '80€' },
    { name: 'Retouche avancée (par photo)', price: '15€' },
    { name: 'Album photo 30x30 (20 pages)', price: '250€' },
    { name: 'Tirage photo 20x30', price: '25€' },
    { name: 'Tirage photo 30x45', price: '45€' },
    { name: 'Déplacement hors Île-de-France', price: '0.50€/km' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-elgato-brown mb-6 tracking-wide">
            Tarifs
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto mb-8" />
          <p className="text-xl md:text-2xl text-elgato-text-light max-w-4xl mx-auto leading-relaxed">
            Des forfaits transparents adaptés à chaque projet.
            Tous les tarifs incluent la retouche professionnelle et la galerie en ligne.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          variants={itemVariants}
        >
          {pricingPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              className={`relative bg-elgato-cream rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ${
                pkg.popular ? 'ring-2 ring-elgato-sand scale-105' : ''
              }`}
              whileHover={{ y: -5 }}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-elgato-sand text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-4 h-4" /> Populaire
                </div>
              )}

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6"
                style={{ backgroundColor: pkg.color }}
              >
                <pkg.icon size={28} />
              </div>

              <h3 className="text-2xl font-semibold text-elgato-brown mb-2">
                {pkg.name}
              </h3>
              <p className="text-elgato-text-light mb-4">{pkg.description}</p>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-elgato-brown">{pkg.price}€</span>
              </div>
              <div className="flex items-center gap-2 text-elgato-text-light mb-6">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{pkg.duration}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-elgato-brown">
                    <Check className="w-5 h-5 text-elgato-sand flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`block text-center py-3 rounded-xl font-medium transition-colors duration-300 ${
                  pkg.popular
                    ? 'bg-elgato-sand text-white hover:bg-elgato-sand-dark'
                    : 'bg-elgato-blue text-elgato-brown hover:bg-elgato-blue-dark'
                }`}
              >
                Demander un devis
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Extras Section */}
        <motion.div
          className="bg-gradient-to-r from-[#BBDCE5]/10 to-[#D9C4B0]/10 rounded-3xl p-8 md:p-12 mb-20"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-light text-elgato-brown mb-8 text-center">
            Options & Suppléments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {extras.map((extra, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm"
              >
                <span className="text-elgato-brown">{extra.name}</span>
                <span className="font-semibold text-elgato-sand">{extra.price}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div className="mb-20" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-light text-elgato-brown mb-8 text-center">
            Questions Fréquentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-elgato-cream">
              <h3 className="font-semibold text-elgato-brown mb-3">Comment réserver ?</h3>
              <p className="text-elgato-text-light text-sm leading-relaxed">
                Contactez-moi via le formulaire ou par téléphone. Après notre échange,
                je vous envoie un devis personnalisé. Un acompte de 30% confirme la réservation.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-elgato-cream">
              <h3 className="font-semibold text-elgato-brown mb-3">Délais de livraison ?</h3>
              <p className="text-elgato-text-light text-sm leading-relaxed">
                Portraits : 1 semaine. Mariages : 3-4 semaines.
                Événements : 1 semaine. Corporate : 48h en urgence.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-elgato-cream">
              <h3 className="font-semibold text-elgato-brown mb-3">Déplacements ?</h3>
              <p className="text-elgato-text-light text-sm leading-relaxed">
                Paris et Île-de-France inclus. Au-delà, frais de déplacement de 0.50€/km.
                Séjours en province ou à l'étranger sur devis.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-elgato-cream">
              <h3 className="font-semibold text-elgato-brown mb-3">Conditions d'annulation ?</h3>
              <p className="text-elgato-text-light text-sm leading-relaxed">
                Annulation gratuite jusqu'à 14 jours avant. Entre 14 et 7 jours : 50% du montant.
                Moins de 7 jours : totalité due. Report possible sous conditions.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-gradient-to-r from-[#6B5B47] to-[#8B7355] text-white rounded-3xl p-8 md:p-12 shadow-2xl"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Votre projet est unique ?
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Ces tarifs sont indicatifs. Chaque projet étant différent,
            n'hésitez pas à me contacter pour un devis sur mesure.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-elgato-blue text-elgato-brown rounded-xl font-medium hover:bg-elgato-blue-dark transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Demander un devis gratuit</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  );
}
