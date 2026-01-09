import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | elGato Photo Paris",
  description: "Conditions générales de vente des prestations photographiques elGato Photo Paris.",
};

export default function CGVPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-32">
        <h1 className="text-4xl md:text-5xl font-light text-elgato-brown mb-6">
          Conditions Générales de Vente
        </h1>
        <div className="w-24 h-0.5 bg-gradient-to-r from-[#BBDCE5] to-[#CFAB8D] mb-12" />

        <div className="prose prose-lg max-w-none text-elgato-brown">
          <section className="mb-8">
            <h2 className="text-2xl font-medium text-elgato-brown mb-4">1. Champ d'application</h2>
            <p className="text-elgato-text-light">
              Les présentes conditions générales de vente s'appliquent à toutes les prestations
              photographiques proposées par elGato Photo Paris. Toute commande implique
              l'acceptation sans réserve des présentes CGV.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-elgato-brown mb-4">2. Devis et réservation</h2>
            <p className="text-elgato-text-light mb-4">
              Tout devis est valable 30 jours. La réservation devient ferme et définitive
              après signature du devis et versement d'un acompte de 30% du montant total.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-elgato-brown mb-4">3. Tarifs</h2>
            <p className="text-elgato-text-light">
              Les tarifs indiqués sont en euros TTC. Ils incluent les frais de déplacement
              dans un rayon de 30km autour de Paris. Au-delà, des frais supplémentaires
              seront facturés selon barème en vigueur.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-elgato-brown mb-4">4. Paiement</h2>
            <p className="text-elgato-text-light mb-4">
              Le paiement s'effectue:
            </p>
            <ul className="list-disc list-inside text-elgato-text-light space-y-2 ml-4">
              <li>30% à la réservation</li>
              <li>70% le jour de la prestation ou à réception des photos</li>
            </ul>
            <p className="text-elgato-text-light mt-4">
              Moyens de paiement acceptés: virement bancaire, chèque, espèces.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-elgato-brown mb-4">5. Annulation</h2>
            <p className="text-elgato-text-light mb-4">
              En cas d'annulation par le client:
            </p>
            <ul className="list-disc list-inside text-elgato-text-light space-y-2 ml-4">
              <li>Plus de 30 jours avant: remboursement de l'acompte moins 50€ de frais</li>
              <li>Entre 30 et 15 jours: rétention de 50% de l'acompte</li>
              <li>Moins de 15 jours: acompte non remboursable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-elgato-brown mb-4">6. Livraison</h2>
            <p className="text-elgato-text-light">
              Les délais de livraison sont indicatifs et dépendent du type de prestation.
              Les photos sont livrées via galerie en ligne sécurisée. Le client dispose
              d'un accès illimité pendant 1 an.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-elgato-brown mb-4">7. Droits d'auteur</h2>
            <p className="text-elgato-text-light">
              Le photographe conserve les droits d'auteur sur toutes les photos.
              Le client obtient un droit d'usage privé non exclusif. Toute utilisation
              commerciale nécessite un accord écrit préalable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-elgato-brown mb-4">8. Droit à l'image</h2>
            <p className="text-elgato-text-light">
              Le photographe peut utiliser les photos pour sa promotion (portfolio, réseaux sociaux,
              site web) sauf opposition écrite du client dans un délai de 30 jours après livraison.
            </p>
          </section>

          <p className="text-sm text-elgato-text-light italic mt-12">
            Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>
    </main>
  );
}