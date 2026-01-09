import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact | elGato Photo Paris - Photographe Professionnel",
  description: "Contactez elGato Photo Paris pour votre projet photographique. Devis gratuit sous 24h. Portraits, mariages, événements à Paris et Île-de-France.",
  openGraph: {
    title: "Contact | elGato Photo Paris",
    description: "Demandez un devis gratuit pour votre séance photo à Paris",
    type: "website",
    locale: "fr_FR",
    siteName: "elGato Photo Paris",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
