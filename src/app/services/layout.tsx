import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Services | elGato Photo Paris - Photographe Professionnel",
  description: "Services photographiques professionnels à Paris : portraits, mariages, événements, corporate et création de contenu. Devis gratuit et personnalisé.",
  openGraph: {
    title: "Services | elGato Photo Paris",
    description: "Portraits, mariages, événements, corporate - photographe professionnel à Paris",
    type: "website",
    locale: "fr_FR",
    siteName: "elGato Photo Paris",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
