import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tarifs | elGato Photo Paris - Photographe Professionnel",
  description: "Découvrez les tarifs d'elGato Photo Paris : portraits à partir de 200€, mariages dès 1200€, corporate et événements. Devis personnalisé gratuit.",
  openGraph: {
    title: "Tarifs | elGato Photo Paris",
    description: "Tarifs transparents pour portraits, mariages, événements et corporate",
    type: "website",
    locale: "fr_FR",
    siteName: "elGato Photo Paris",
  },
};

export default function TarifsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
