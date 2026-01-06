"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Clock, Send, CheckCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    projectType: 'portrait'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          projectType: 'portrait'
        });
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Auto-resize textarea
  useEffect(() => {
    const textarea = document.getElementById('message') as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [formData.message]);

  return (
    <main className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#6B5B47] mb-6">
            Contact
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-[#8B7355] max-w-3xl mx-auto leading-relaxed">
            Discutons de votre projet photographique. Je serais ravi de vous accompagner 
            dans la création d'images qui vous ressemblent.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-[#6B5B47] mb-6 md:mb-8">
              Rencontrons-nous
            </h2>
            
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#BBDCE5]/20 rounded-xl">
                  <MapPin className="text-[#6B5B47] flex-shrink-0" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#6B5B47] mb-2">Studio & Déplacements</h3>
                  <p className="text-[#8B7355] text-sm md:text-base leading-relaxed">
                    Paris et Île-de-France<br />
                    Studio disponible sur demande<br />
                    Déplacements dans toute la France
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#CFAB8D]/20 rounded-xl">
                  <Phone className="text-[#6B5B47] flex-shrink-0" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#6B5B47] mb-2">Téléphone</h3>
                  <p className="text-[#8B7355] text-sm md:text-base">
                    <a href="tel:+33123456789" className="hover:text-[#BBDCE5] transition-colors touch-manipulation active:scale-95">
                      +33 1 23 45 67 89
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#D9C4B0]/20 rounded-xl">
                  <Mail className="text-[#6B5B47] flex-shrink-0" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#6B5B47] mb-2">Email</h3>
                  <p className="text-[#8B7355] text-sm md:text-base">
                    <a href="mailto:contact@elgato-photo.fr" className="hover:text-[#BBDCE5] transition-colors touch-manipulation active:scale-95 break-all">
                      contact@elgato-photo.fr
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#BBDCE5]/20 rounded-xl">
                  <Clock className="text-[#6B5B47] flex-shrink-0" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#6B5B47] mb-2">Disponibilités</h3>
                  <p className="text-[#8B7355] text-sm md:text-base leading-relaxed">
                    Lundi - Vendredi : 9h - 19h<br />
                    Samedi - Dimanche : Sur rendez-vous<br />
                    Séances en soirée possibles
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-10 md:mt-12">
              <h3 className="font-semibold text-[#6B5B47] mb-4">Suivez-moi</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com/elgato_photo" 
                  className="p-3 bg-gradient-to-r from-[#CFAB8D] to-[#D9C4B0] text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 touch-manipulation active:scale-95"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="https://facebook.com/elgatophoto" 
                  className="p-3 bg-[#BBDCE5] text-[#6B5B47] rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 touch-manipulation active:scale-95"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 lg:p-12 border border-[#D9C4B0]/20">
            <h2 className="text-2xl md:text-3xl font-light text-[#6B5B47] mb-6 md:mb-8">
              Demande de devis
            </h2>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#6B5B47] mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 md:py-4 border rounded-xl focus:ring-2 focus:ring-[#BBDCE5] focus:border-transparent transition-all duration-300 text-base touch-manipulation ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-[#D9C4B0]/50'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#6B5B47] mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 md:py-4 border border-[#D9C4B0]/50 rounded-xl focus:ring-2 focus:ring-[#BBDCE5] focus:border-transparent transition-all duration-300 text-base touch-manipulation"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#6B5B47] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 md:py-4 border rounded-xl focus:ring-2 focus:ring-[#BBDCE5] focus:border-transparent transition-all duration-300 text-base touch-manipulation ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-[#D9C4B0]/50'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-[#6B5B47] mb-2">
                  Type de projet *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 md:py-4 border border-[#D9C4B0]/50 rounded-xl focus:ring-2 focus:ring-[#BBDCE5] focus:border-transparent transition-all duration-300 text-base touch-manipulation"
                >
                  <option value="portrait">Portrait</option>
                  <option value="mariage">Mariage</option>
                  <option value="evenement">Événement</option>
                  <option value="fashion">Fashion</option>
                  <option value="corporate">Corporate</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#6B5B47] mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 md:py-4 border border-[#D9C4B0]/50 rounded-xl focus:ring-2 focus:ring-[#BBDCE5] focus:border-transparent transition-all duration-300 text-base touch-manipulation"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#6B5B47] mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet, vos besoins, la date souhaitée..."
                  className={`w-full px-4 py-3 md:py-4 border rounded-xl focus:ring-2 focus:ring-[#BBDCE5] focus:border-transparent transition-all duration-300 resize-none text-base touch-manipulation min-h-[120px] ${
                    errors.message ? 'border-red-300 bg-red-50' : 'border-[#D9C4B0]/50'
                  }`}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-4 md:py-5 rounded-xl font-medium transition-all duration-300 text-base touch-manipulation flex items-center justify-center gap-2 min-h-[56px] ${
                  isSubmitted 
                    ? 'bg-green-500 text-white' 
                    : isSubmitting
                    ? 'bg-[#BBDCE5]/50 text-[#6B5B47]/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#BBDCE5] to-[#A5C9D4] text-[#6B5B47] hover:from-[#A5C9D4] hover:to-[#8FB8C5] hover:shadow-lg active:scale-98'
                }`}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message envoyé !
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Envoyer la demande
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}