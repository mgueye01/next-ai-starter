"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    projectType: 'portrait',
    website: '' // Honeypot field - should remain empty
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setErrors({ submit: 'Trop de demandes. Veuillez réessayer dans une heure.' });
          return;
        }
        if (data.details) {
          const newErrors: Record<string, string> = {};
          data.details.forEach((err: { field: string; message: string }) => {
            newErrors[err.field] = err.message;
          });
          setErrors(newErrors);
          return;
        }
        setErrors({ submit: data.error || 'Erreur lors de l\'envoi' });
        return;
      }

      setIsSubmitted(true);
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          projectType: 'portrait',
          website: ''
        });
        setIsSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Erreur de connexion. Veuillez réessayer.' });
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

  // Input field styles with better contrast
  const inputBaseStyles = "w-full px-4 py-3 md:py-4 border rounded-xl transition-all duration-300 text-base touch-manipulation text-elgato-text-primary placeholder:text-elgato-text-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elgato-blue focus-visible:border-transparent";
  const inputNormalStyles = "border-elgato-sand-light/50 bg-white";
  const inputErrorStyles = "border-red-400 bg-red-50";

  return (
    <main className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-elgato-brown mb-6">
            Contact
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-elgato-blue to-elgato-sand mx-auto mb-6" aria-hidden="true"></div>
          <p className="text-lg md:text-xl text-elgato-text-secondary max-w-3xl mx-auto leading-relaxed">
            Discutons de votre projet photographique. Je serais ravi de vous accompagner
            dans la création d'images qui vous ressemblent.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Info */}
          <section aria-labelledby="contact-info-heading">
            <h2 id="contact-info-heading" className="text-2xl md:text-3xl font-light text-elgato-brown mb-6 md:mb-8">
              Rencontrons-nous
            </h2>

            <address className="not-italic space-y-6 md:space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-elgato-blue/20 rounded-xl" aria-hidden="true">
                  <MapPin className="text-elgato-brown flex-shrink-0" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-elgato-brown mb-2">Studio & Déplacements</h3>
                  <p className="text-elgato-text-secondary text-sm md:text-base leading-relaxed">
                    Paris et Île-de-France<br />
                    Studio disponible sur demande<br />
                    Déplacements dans toute la France
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-elgato-sand/20 rounded-xl" aria-hidden="true">
                  <Phone className="text-elgato-brown flex-shrink-0" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-elgato-brown mb-2">Téléphone</h3>
                  <p className="text-elgato-text-secondary text-sm md:text-base">
                    <a
                      href="tel:+33677684836"
                      className="hover:text-elgato-blue transition-colors touch-manipulation active:scale-95 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elgato-sand focus-visible:ring-offset-2"
                    >
                      +33 6 77 68 48 36
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-elgato-sand-light/20 rounded-xl" aria-hidden="true">
                  <Mail className="text-elgato-brown flex-shrink-0" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-elgato-brown mb-2">Email</h3>
                  <p className="text-elgato-text-secondary text-sm md:text-base">
                    <a
                      href="mailto:contact@elgatophoto.com"
                      className="hover:text-elgato-blue transition-colors touch-manipulation active:scale-95 break-all rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elgato-sand focus-visible:ring-offset-2"
                    >
                      contact@elgatophoto.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-elgato-blue/20 rounded-xl" aria-hidden="true">
                  <Clock className="text-elgato-brown flex-shrink-0" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-elgato-brown mb-2">Disponibilités</h3>
                  <p className="text-elgato-text-secondary text-sm md:text-base leading-relaxed">
                    Lundi - Vendredi : 9h - 19h<br />
                    Samedi - Dimanche : Sur rendez-vous<br />
                    Séances en soirée possibles
                  </p>
                </div>
              </div>
            </address>

            {/* Social Media */}
            <div className="mt-10 md:mt-12">
              <h3 className="font-semibold text-elgato-brown mb-4">Suivez-moi</h3>
              <div className="flex space-x-4" role="list" aria-label="Réseaux sociaux">
                <a
                  href="https://instagram.com/elgato_photo"
                  className="p-4 bg-gradient-to-r from-elgato-sand to-elgato-sand-light text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 touch-manipulation active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elgato-sand focus-visible:ring-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Suivez-nous sur Instagram"
                  role="listitem"
                >
                  <Instagram size={24} aria-hidden="true" />
                </a>
                <a
                  href="https://facebook.com/elgatophoto"
                  className="p-4 bg-elgato-blue text-elgato-brown rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 touch-manipulation active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elgato-sand focus-visible:ring-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Suivez-nous sur Facebook"
                  role="listitem"
                >
                  <Facebook size={24} aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 lg:p-12 border border-elgato-sand-light/20" aria-labelledby="form-heading">
            <h2 id="form-heading" className="text-2xl md:text-3xl font-light text-elgato-brown mb-6 md:mb-8">
              Demande de devis
            </h2>

            {/* Status announcements for screen readers */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {isSubmitting && "Envoi du formulaire en cours..."}
              {isSubmitted && "Message envoyé avec succès !"}
              {errors.submit && `Erreur: ${errors.submit}`}
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 md:space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-elgato-brown mb-2">
                    Nom complet <span aria-hidden="true">*</span>
                    <span className="sr-only">(requis)</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`${inputBaseStyles} ${errors.name ? inputErrorStyles : inputNormalStyles}`}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-600 text-sm mt-1 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-4 h-4" aria-hidden="true" />
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-elgato-brown mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`${inputBaseStyles} ${inputNormalStyles}`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-elgato-brown mb-2">
                  Email <span aria-hidden="true">*</span>
                  <span className="sr-only">(requis)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`${inputBaseStyles} ${errors.email ? inputErrorStyles : inputNormalStyles}`}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-600 text-sm mt-1 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-4 h-4" aria-hidden="true" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-elgato-brown mb-2">
                  Type de projet <span aria-hidden="true">*</span>
                  <span className="sr-only">(requis)</span>
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleChange}
                  className={`${inputBaseStyles} ${inputNormalStyles}`}
                >
                  <option value="portrait">Portrait</option>
                  <option value="mariage">Mariage</option>
                  <option value="evenement">Événement</option>
                  <option value="fashion">Fashion</option>
                  <option value="corporate">Corporate</option>
                  <option value="video">Vidéo</option>
                  <option value="contenu">Contenu Digital</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-elgato-brown mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`${inputBaseStyles} ${inputNormalStyles}`}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-elgato-brown mb-2">
                  Message <span aria-hidden="true">*</span>
                  <span className="sr-only">(requis)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet, vos besoins, la date souhaitée..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : "message-hint"}
                  className={`${inputBaseStyles} resize-none min-h-[120px] ${errors.message ? inputErrorStyles : inputNormalStyles}`}
                />
                <p id="message-hint" className="text-elgato-text-light text-xs mt-1">
                  Décrivez votre projet en quelques lignes
                </p>
                {errors.message && (
                  <p id="message-error" className="text-red-600 text-sm mt-1 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-4 h-4" aria-hidden="true" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Honeypot field - hidden from users, catches spam bots */}
              <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Global error display */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm flex items-center gap-2" role="alert">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  {errors.submit}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                aria-busy={isSubmitting}
                className={`w-full py-4 md:py-5 rounded-xl font-medium transition-all duration-300 text-base touch-manipulation flex items-center justify-center gap-2 min-h-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elgato-sand focus-visible:ring-offset-2 ${
                  isSubmitted
                    ? 'bg-green-500 text-white'
                    : isSubmitting
                    ? 'bg-elgato-blue/50 text-elgato-brown/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-elgato-blue to-elgato-blue-dark text-elgato-brown hover:from-elgato-blue-dark hover:to-elgato-blue hover:shadow-lg active:scale-[0.98]'
                }`}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" aria-hidden="true" />
                    Message envoyé !
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" aria-hidden="true" />
                    Envoyer la demande
                  </>
                )}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
