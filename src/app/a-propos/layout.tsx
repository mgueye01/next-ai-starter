import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "À Propos | elGato Photo Paris - Photographe Professionnel",
  description: "Découvrez l'histoire et la passion derrière elGato Photo Paris. Photographe professionnel spécialisé en portraits, mariages et événements depuis 2018.",
  openGraph: {
    title: "À Propos | elGato Photo Paris",
    description: "Photographe professionnel à Paris - portraits, mariages, événements",
    type: "website",
    locale: "fr_FR",
    siteName: "elGato Photo Paris",
  },
};

export default function AProposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
