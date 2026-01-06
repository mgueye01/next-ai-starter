import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mentions Légales | elGato Photo Paris",
  description: "Mentions légales et informations sur l'éditeur du site elGato Photo Paris.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-32">
        <h1 className="text-4xl md:text-5xl font-light text-[#6B5B47] mb-6">
          Mentions Légales
        </h1>
        <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mb-12" />

        <div className="prose prose-lg max-w-none text-[#6B5B47]">
          <section className="mb-8">
            <h2 className="text-2xl font-medium text-[#6B5B47] mb-4">Éditeur du site</h2>
            <p className="text-[#8B7355]">
              <strong>elGato Photo Paris</strong><br />
              Photographe professionnel<br />
              SIRET: [À COMPLÉTER]<br />
              Paris, France<br />
              Email: contact@elgatophoto.com<br />
              Téléphone: +33 1 23 45 67 89
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-[#6B5B47] mb-4">Hébergement</h2>
            <p className="text-[#8B7355]">
              Ce site est hébergé par:<br />
              [NOM DE L'HÉBERGEUR À COMPLÉTER]<br />
              [ADRESSE À COMPLÉTER]
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-[#6B5B47] mb-4">Propriété intellectuelle</h2>
            <p className="text-[#8B7355]">
              L'ensemble des contenus présents sur ce site (textes, images, vidéos, graphismes)
              sont la propriété exclusive de elGato Photo Paris, sauf mention contraire.
              Toute reproduction, même partielle, est interdite sans autorisation préalable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-[#6B5B47] mb-4">Droit à l'image</h2>
            <p className="text-[#8B7355]">
              Les photographies présentées sur ce site sont protégées par le droit d'auteur.
              Les personnes photographiées ont donné leur autorisation pour la publication
              de leur image sur ce site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-[#6B5B47] mb-4">Collecte de données</h2>
            <p className="text-[#8B7355]">
              Les informations collectées via le formulaire de contact sont utilisées
              uniquement pour répondre à votre demande et ne sont jamais transmises à des tiers.
              Conformément à la loi Informatique et Libertés, vous disposez d'un droit d'accès,
              de modification et de suppression de vos données personnelles.
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