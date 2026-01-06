import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Politique de Confidentialité | elGato Photo Paris",
  description: "Politique de confidentialité et protection des données personnelles.",
};

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-32">
        <h1 className="text-4xl md:text-5xl font-light text-[#6B5B47] mb-6">
          Politique de Confidentialité
        </h1>
        <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mb-12" />

        <div className="prose prose-lg max-w-none text-[#6B5B47]">
          <section className="mb-8">
            <h2 className="text-2xl font-medium text-[#6B5B47] mb-4">Collecte des données</h2>
            <p className="text-[#8B7355]">
              Nous collectons uniquement les informations que vous nous fournissez volontairement
              via notre formulaire de contact (nom, email, téléphone, message).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-[#6B5B47] mb-4">Utilisation des données</h2>
            <p className="text-[#8B7355] mb-4">
              Vos données personnelles sont utilisées exclusivement pour:
            </p>
            <ul className="list-disc list-inside text-[#8B7355] space-y-2 ml-4">
              <li>Répondre à vos demandes de renseignements</li>
              <li>Établir des devis personnalisés</li>
              <li>Gérer nos prestations photographiques</li>
              <li>Vous tenir informé de nos actualités (si vous y consentez)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-[#6B5B47] mb-4">Protection des données</h2>
            <p className="text-[#8B7355]">
              Vos données sont stockées de manière sécurisée et ne sont jamais vendues,
              louées ou partagées avec des tiers sans votre consentement explicite.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-[#6B5B47] mb-4">Vos droits</h2>
            <p className="text-[#8B7355] mb-4">
              Conformément au RGPD, vous disposez des droits suivants:
            </p>
            <ul className="list-disc list-inside text-[#8B7355] space-y-2 ml-4">
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la portabilité</li>
              <li>Droit d'opposition au traitement</li>
            </ul>
            <p className="text-[#8B7355] mt-4">
              Pour exercer ces droits, contactez-nous à: contact@elgatophoto.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-[#6B5B47] mb-4">Cookies</h2>
            <p className="text-[#8B7355]">
              Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement.
              Aucun cookie de tracking ou publicitaire n'est utilisé.
            </p>
          </section>

          <p className="text-sm text-[#8B7355] italic mt-12">
            Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>
    </main>
  );
}