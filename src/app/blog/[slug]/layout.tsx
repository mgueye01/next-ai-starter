import { Metadata } from 'next';

const articleMeta: Record<string, { title: string; description: string }> = {
  "10-conseils-reussir-seance-photo-portrait": {
    title: "10 Conseils pour Réussir votre Séance Photo Portrait | elGato Photo Paris",
    description: "Découvrez mes conseils de photographe professionnel pour vous préparer et obtenir des portraits naturels et authentiques qui vous ressemblent vraiment."
  },
  "coulisses-mariage-paris": {
    title: "Coulisses d'un Mariage à Paris | elGato Photo Paris",
    description: "Plongez dans les coulisses d'un mariage parisien, des préparatifs matinaux jusqu'à l'ouverture de bal. Une immersion dans mon travail de photographe de mariage."
  },
  "comment-choisir-photographe-mariage": {
    title: "Comment Choisir son Photographe de Mariage | elGato Photo Paris",
    description: "Tous les critères à prendre en compte pour choisir le photographe qui immortalisera le plus beau jour de votre vie. Style, budget, feeling... le guide complet."
  },
  "preparer-shooting-entreprise": {
    title: "Comment Préparer un Shooting Photo d'Entreprise | elGato Photo Paris",
    description: "Guide pratique pour les entreprises qui souhaitent organiser une séance photo professionnelle : préparation, tenue, et conseils pour des portraits corporate réussis."
  },
  "tendances-photo-2025": {
    title: "Les Tendances Photo Mariage et Portrait en 2025 | elGato Photo Paris",
    description: "Découvrez les styles et tendances qui marqueront la photographie de mariage et de portrait cette année : du naturel, de l'émotion et des approches innovantes."
  },
  "importance-lumiere-naturelle": {
    title: "L'Importance de la Lumière Naturelle en Photographie | elGato Photo Paris",
    description: "Pourquoi je privilégie la lumière naturelle dans mes séances photo et comment elle transforme vos portraits en œuvres authentiques et intemporelles."
  }
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params;
  const meta = articleMeta[resolvedParams.slug];

  if (!meta) {
    return {
      title: "Article | elGato Photo Paris",
      description: "Blog de photographie - conseils, coulisses et actualités"
    };
  }

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
      locale: "fr_FR",
      siteName: "elGato Photo Paris",
    },
  };
}

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
