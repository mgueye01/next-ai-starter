import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog | elGato Photo Paris - Conseils et Actualités Photo",
  description: "Blog photographique d'elGato Photo Paris : conseils pour vos séances photos, coulisses de mariages, tendances et astuces pour réussir vos portraits.",
  openGraph: {
    title: "Blog | elGato Photo Paris",
    description: "Conseils photo, coulisses de mariages et actualités",
    type: "website",
    locale: "fr_FR",
    siteName: "elGato Photo Paris",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
