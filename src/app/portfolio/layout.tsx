import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Portfolio | elGato Photo Paris - Photographe Professionnel",
  description: "Explorez le portfolio d'elGato Photo Paris : portraits artistiques, mariages d'exception, événements et photographie corporate à Paris et en Île-de-France.",
  openGraph: {
    title: "Portfolio | elGato Photo Paris",
    description: "Découvrez mes réalisations photographiques - portraits, mariages, événements",
    type: "website",
    locale: "fr_FR",
    siteName: "elGato Photo Paris",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
