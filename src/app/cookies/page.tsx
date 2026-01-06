import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Politique des Cookies | elGato Photo Paris",
  description: "Politique d'utilisation des cookies sur le site elGato Photo Paris.",
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-32">
        <h1 className="text-4xl md:text-5xl font-light text-[#6B5B47] mb-6">
          Politique des Cookies
        </h1>
        <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mb-12" />

        <div className="prose prose-lg max-w-none text-[#6B5B47]">
          <section className="mb-8">
            <h2 className="text-2xl font-medium text-[#6B5B47] mb-4">Qu'est-ce qu'un cookie ?</h2>
            <p className="text-[#8B7355]">
              Un cookie est un petit fichier texte déposé sur votre ordinateur lors de la visite
              d'un site web. Il permet au site de mémoriser vos préférences et d'améliorer
              votre expérience de navigation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-[#6B5B47] mb-4">Les cookies que nous utilisons</h2>
            <p className="text-[#8B7355] mb-4">
              Ce site utilise uniquement des cookies strictement nécessaires à son fonctionnement:
            </p>
            <ul className="list-disc list-inside text-[#8B7355] space-y-2 ml-4">
              <li><strong>Cookies de session:</strong> permettent de maintenir votre connexion si vous vous authentifiez</li>
              <li><strong>Cookies de préférence:</strong> mémorisent vos choix de langue et d'affichage</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-[#6B5B47] mb-4">Ce que nous n'utilisons PAS</h2>
            <p className="text-[#8B7355]">
              Ce site ne dépose AUCUN cookie de:
            </p>
            <ul className="list-disc list-inside text-[#8B7355] space-y-2 ml-4">
              <li>Tracking ou suivi publicitaire</li>
              <li>Réseaux sociaux tiers</li>
              <li>Analyse comportementale invasive</li>
              <li>Partage de données avec des tiers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-[#6B5B47] mb-4">Gestion des cookies</h2>
            <p className="text-[#8B7355] mb-4">
              Vous pouvez à tout moment désactiver les cookies dans les paramètres de votre navigateur.
              Cependant, cela peut affecter certaines fonctionnalités du site.
            </p>
            <p className="text-[#8B7355]">
              Pour plus d'informations sur la gestion des cookies, consultez la documentation
              de votre navigateur.
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