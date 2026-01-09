'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Calendar, Clock, ArrowLeft, ArrowRight, Share2, Tag,
  CheckCircle, Camera, Heart, Users, Lightbulb, Star
} from 'lucide-react';

// Articles data with full content
const articlesData: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: React.ReactNode;
  relatedSlugs: string[];
}> = {
  "10-conseils-reussir-seance-photo-portrait": {
    title: "10 Conseils pour Réussir votre Séance Photo Portrait",
    excerpt: "Découvrez mes conseils de photographe professionnel pour vous préparer et obtenir des portraits naturels et authentiques qui vous ressemblent vraiment.",
    category: "Conseils",
    date: "15 Décembre 2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&h=600&fit=crop",
    relatedSlugs: ["comment-choisir-photographe-mariage", "importance-lumiere-naturelle"],
    content: (
      <>
        <p className="text-lg text-elgato-text-light mb-6 leading-relaxed">
          Vous avez réservé une séance photo portrait et vous vous demandez comment vous y préparer ?
          C'est tout à fait normal d'appréhender ce moment. Après des années à photographier des centaines
          de personnes, je vous partage mes meilleurs conseils pour une séance réussie.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">1. Choisissez des vêtements qui vous ressemblent</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Évitez les tenues trop tendance que vous ne portez jamais. Optez plutôt pour des vêtements
          dans lesquels vous vous sentez bien au quotidien. Les couleurs unies fonctionnent généralement
          mieux que les motifs trop chargés. Privilégiez les tons neutres ou pastel qui mettront en
          valeur votre visage sans distraire l'attention.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">2. Dormez bien la veille</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Une bonne nuit de sommeil se voit sur les photos. Vos yeux seront plus lumineux, votre peau
          plus éclatante et vous serez naturellement plus détendu. Évitez également l'alcool la veille
          qui peut provoquer des gonflements.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">3. Hydratez-vous</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Buvez beaucoup d'eau les jours précédant la séance. Une peau bien hydratée capte mieux
          la lumière et paraît plus jeune et éclatante sur les photos.
        </p>

        <div className="bg-elgato-cream rounded-2xl p-6 my-8">
          <h3 className="text-xl font-semibold text-elgato-brown mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-elgato-sand" />
            Le conseil de pro
          </h3>
          <p className="text-elgato-text-light">
            Apportez plusieurs tenues à la séance. Cela permet de varier les looks et d'avoir
            un choix plus large lors de la sélection finale des photos.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">4. Faites confiance au photographe</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Laissez-vous guider ! En tant que photographe, je sais quelles poses vous mettront en valeur.
          N'hésitez pas à me dire si quelque chose vous met mal à l'aise, mais faites confiance à mon
          œil professionnel pour capturer votre meilleur profil.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">5. Pratiquez devant le miroir</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Avant la séance, passez quelques minutes devant votre miroir à essayer différentes expressions.
          Repérez votre "bon côté" et les sourires qui vous plaisent. Cela vous aidera à vous sentir
          plus à l'aise le jour J.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">6. Arrivez détendu</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Prévoyez d'arriver quelques minutes en avance. Cela vous laissera le temps de vous poser,
          de vous rafraîchir et de commencer la séance sereinement. Le stress se voit sur les photos,
          alors respirez profondément !
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">7. Évitez les changements drastiques</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Ce n'est pas le moment de tester une nouvelle coupe de cheveux ou un maquillage inhabituel.
          Restez fidèle à vous-même. Les photos doivent vous ressembler, pas représenter une version
          que vous ne reconnaissez pas.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">8. Mangez léger avant la séance</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Un repas trop copieux peut vous rendre léthargique. Optez pour une alimentation légère
          qui vous maintiendra énergique tout au long de la séance.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">9. Pensez à vos accessoires</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Lunettes, bijoux, montres... Ces éléments peuvent ajouter de la personnalité à vos photos.
          Apportez vos accessoires préférés, mais gardez à l'esprit que la simplicité est souvent
          synonyme d'élégance.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">10. Amusez-vous !</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          C'est le conseil le plus important. Une séance photo doit être un moment agréable.
          Plus vous vous amuserez, plus vos photos seront naturelles et authentiques. Laissez
          votre personnalité s'exprimer !
        </p>

        <div className="bg-gradient-to-r from-elgato-blue/20 to-elgato-sand/20 rounded-2xl p-8 my-10">
          <h3 className="text-xl font-semibold text-elgato-brown mb-4">Prêt(e) à réserver votre séance ?</h3>
          <p className="text-elgato-text-light mb-4">
            J'espère que ces conseils vous aideront à aborder votre prochaine séance photo
            avec sérénité. N'hésitez pas à me contacter pour discuter de votre projet !
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-elgato-sand text-white px-6 py-3 rounded-xl hover:bg-[#B89B7F] transition-colors"
          >
            Me contacter
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </>
    )
  },
  "coulisses-mariage-paris": {
    title: "Coulisses d'un Mariage à Paris : Une Journée avec les Mariés",
    excerpt: "Plongez dans les coulisses d'un mariage parisien, des préparatifs matinaux jusqu'à l'ouverture de bal. Une immersion dans mon travail de photographe de mariage.",
    category: "Behind the Scenes",
    date: "8 Décembre 2024",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=600&fit=crop",
    relatedSlugs: ["comment-choisir-photographe-mariage", "tendances-photo-2025"],
    content: (
      <>
        <p className="text-lg text-elgato-text-light mb-6 leading-relaxed">
          Le mariage de Sophie et Pierre restera gravé dans ma mémoire. Une journée parisienne
          d'automne, une lumière dorée, et deux personnes follement amoureuses. Je vous emmène
          dans les coulisses de cette journée exceptionnelle.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">6h30 - Le réveil du photographe</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Ma journée commence bien avant celle des mariés. Je vérifie une dernière fois mon
          équipement : deux boîtiers, cinq objectifs, batteries chargées, cartes mémoire formatées.
          En photographie de mariage, on ne laisse rien au hasard. Chaque moment est unique et
          ne se reproduira jamais.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">8h00 - Les préparatifs de la mariée</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          J'arrive à l'hôtel où Sophie se prépare avec ses demoiselles d'honneur. L'atmosphère
          est électrique, un mélange d'excitation et d'émotion. Je capture les détails : la robe
          suspendue contre la fenêtre, les chaussures, les bijoux de famille, le bouquet fraîchement livré.
        </p>

        <p className="text-elgato-text-light mb-6 leading-relaxed">
          La coiffeuse et la maquilleuse travaillent en harmonie. Je reste discret, capturant
          ces moments intimes : le regard de Sophie dans le miroir, le sourire complice avec sa mère,
          les larmes de joie de sa meilleure amie quand elle découvre la robe.
        </p>

        <div className="bg-elgato-cream rounded-2xl p-6 my-8">
          <h3 className="text-xl font-semibold text-elgato-brown mb-3 flex items-center gap-2">
            <Camera className="w-5 h-5 text-elgato-sand" />
            Note technique
          </h3>
          <p className="text-elgato-text-light">
            Pour les préparatifs, je privilégie un objectif 35mm f/1.4 qui me permet de capturer
            l'ambiance générale tout en créant un joli flou d'arrière-plan. La lumière naturelle
            de la fenêtre est ma meilleure alliée.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">10h30 - La découverte</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          C'est le moment que je préfère photographier : le "First Look". Sophie et Pierre ont
          choisi de se découvrir avant la cérémonie, dans les jardins du Palais Royal. Pierre
          tourne le dos, Sophie s'approche doucement... Il se retourne et leurs regards se croisent.
          Émotion pure.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">12h00 - La cérémonie</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          À l'église Saint-Germain-l'Auxerrois, je me positionne stratégiquement. Je connais
          les moments clés : l'entrée de la mariée, l'échange des vœux, les alliances, le premier
          baiser. Mais ce qui rend chaque mariage unique, ce sont les moments spontanés : l'enfant
          d'honneur qui baille, le grand-père qui essuie une larme discrète, les regards échangés
          entre les mariés.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">14h00 - La séance couple</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Direction le Pont des Arts pour la séance photo couple. En 45 minutes, nous devons
          créer des images inoubliables. Je guide les mariés avec des directions simples :
          "Marchez vers moi en vous regardant", "Chuchotez-lui quelque chose de drôle"...
          L'objectif est de capturer leur connexion naturelle.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">16h00 - Le vin d'honneur</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Les invités se retrouvent dans un magnifique hôtel particulier du Marais. C'est
          le moment des retrouvailles, des embrassades, des félicitations. Je me fonds dans
          la foule pour capturer ces instants de bonheur partagé.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">19h30 - Le dîner et les discours</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Les discours sont toujours des moments forts en émotion. Le père de Sophie qui
          s'effondre en parlant de sa petite fille, le témoin qui fait rire aux larmes avec
          ses anecdotes sur Pierre... Je capture les réactions des mariés, ces émotions à fleur de peau.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">22h00 - L'ouverture de bal</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Sous les lumières tamisées, Sophie et Pierre dansent leur première danse. Puis la
          piste se remplit, l'énergie monte. Je travaille avec mes flashs pour figer l'action
          tout en gardant l'ambiance festive de la soirée.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">00h30 - Fin de mission</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Après 18 heures de présence, mon travail sur place est terminé. Mais l'aventure
          continue : des heures de tri, de retouche et de mise en page m'attendent pour
          créer un album qui racontera leur histoire pour les générations à venir.
        </p>

        <div className="bg-gradient-to-r from-elgato-blue/20 to-elgato-sand/20 rounded-2xl p-8 my-10">
          <h3 className="text-xl font-semibold text-elgato-brown mb-4">Vous vous mariez bientôt ?</h3>
          <p className="text-elgato-text-light mb-4">
            J'adorerais être le témoin de votre histoire. Contactez-moi pour discuter de
            votre projet et vérifier ma disponibilité.
          </p>
          <Link
            href="/services/mariages"
            className="inline-flex items-center gap-2 bg-elgato-sand text-white px-6 py-3 rounded-xl hover:bg-[#B89B7F] transition-colors"
          >
            Découvrir mes prestations mariage
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </>
    )
  },
  "comment-choisir-photographe-mariage": {
    title: "Comment Choisir son Photographe de Mariage : Le Guide Complet",
    excerpt: "Tous les critères à prendre en compte pour choisir le photographe qui immortalisera le plus beau jour de votre vie. Style, budget, feeling... tout y est !",
    category: "Guide",
    date: "1er Décembre 2024",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&h=600&fit=crop",
    relatedSlugs: ["coulisses-mariage-paris", "tendances-photo-2025"],
    content: (
      <>
        <p className="text-lg text-elgato-text-light mb-6 leading-relaxed">
          Le choix du photographe de mariage est l'une des décisions les plus importantes
          de votre organisation. Après le jour J, il ne vous restera que les souvenirs et
          les photos. Voici mon guide complet pour faire le bon choix.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">1. Définissez votre style</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Chaque photographe a sa propre signature visuelle. Avant de commencer vos recherches,
          identifiez ce qui vous plaît :
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-elgato-text-light">
            <CheckCircle className="w-5 h-5 text-elgato-sand flex-shrink-0 mt-1" />
            <span><strong>Reportage/Documentaire :</strong> Photos prises sur le vif, sans intervention</span>
          </li>
          <li className="flex items-start gap-3 text-elgato-text-light">
            <CheckCircle className="w-5 h-5 text-elgato-sand flex-shrink-0 mt-1" />
            <span><strong>Fine Art :</strong> Images très travaillées, esthétiques et artistiques</span>
          </li>
          <li className="flex items-start gap-3 text-elgato-text-light">
            <CheckCircle className="w-5 h-5 text-elgato-sand flex-shrink-0 mt-1" />
            <span><strong>Traditionnel :</strong> Photos posées, portraits classiques</span>
          </li>
          <li className="flex items-start gap-3 text-elgato-text-light">
            <CheckCircle className="w-5 h-5 text-elgato-sand flex-shrink-0 mt-1" />
            <span><strong>Lifestyle :</strong> Mélange naturel de poses et de spontanéité</span>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">2. Étudiez les portfolios</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Ne vous contentez pas de regarder les meilleures photos mises en avant. Demandez
          à voir des galeries complètes de mariages. Cela vous donnera une vision réaliste
          de ce que vous pouvez attendre. Vérifiez la cohérence du style à travers différents
          mariages et conditions d'éclairage.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">3. Rencontrez les photographes</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Le feeling est essentiel. Vous passerez de nombreuses heures avec cette personne
          le jour le plus important de votre vie. Posez-vous ces questions :
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-elgato-text-light">
          <li>Êtes-vous à l'aise en sa présence ?</li>
          <li>Est-il/elle à l'écoute de vos attentes ?</li>
          <li>Communique-t-il/elle clairement ?</li>
          <li>Partage-t-il/elle vos valeurs ?</li>
        </ul>

        <div className="bg-elgato-cream rounded-2xl p-6 my-8">
          <h3 className="text-xl font-semibold text-elgato-brown mb-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-elgato-sand" />
            Astuce importante
          </h3>
          <p className="text-elgato-text-light">
            Les meilleurs photographes sont souvent réservés 12 à 18 mois à l'avance.
            Commencez vos recherches dès que vous avez votre date !
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">4. Comprenez les tarifs</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Les prix varient énormément selon l'expérience, la durée de couverture et les
          prestations incluses. Un photographe de mariage professionnel à Paris facture
          généralement entre 1 500€ et 4 000€. Méfiez-vous des tarifs trop bas qui peuvent
          cacher un manque d'expérience ou de matériel.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">5. Vérifiez ce qui est inclus</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Chaque prestation est différente. Assurez-vous de comprendre :
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-elgato-text-light">
          <li>Le nombre d'heures de présence</li>
          <li>Le nombre de photos livrées</li>
          <li>Les délais de livraison</li>
          <li>Le format de livraison (galerie en ligne, clé USB...)</li>
          <li>Les droits sur les images</li>
          <li>La possibilité d'avoir un album</li>
        </ul>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">6. Lisez les avis</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Consultez Google, les réseaux sociaux et les plateformes spécialisées. Au-delà
          des étoiles, lisez les commentaires pour comprendre l'expérience vécue par les
          couples précédents.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">7. Posez les bonnes questions</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Lors de votre rendez-vous, n'hésitez pas à demander :
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-elgato-text-light">
          <li>Combien de mariages avez-vous photographiés ?</li>
          <li>Travaillez-vous seul ou en équipe ?</li>
          <li>Que se passe-t-il si vous êtes malade le jour J ?</li>
          <li>Quel matériel utilisez-vous ?</li>
          <li>Comment se déroule le jour du mariage ?</li>
        </ul>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">8. Faites confiance à votre instinct</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Au final, au-delà de tous ces critères rationnels, faites confiance à votre
          ressenti. Si vous sentez que le courant passe et que le photographe comprend
          votre vision, c'est probablement le bon choix.
        </p>

        <div className="bg-gradient-to-r from-elgato-blue/20 to-elgato-sand/20 rounded-2xl p-8 my-10">
          <h3 className="text-xl font-semibold text-elgato-brown mb-4">Envie d'en discuter ?</h3>
          <p className="text-elgato-text-light mb-4">
            Je serais ravi de vous rencontrer pour parler de votre mariage et voir
            si nous sommes faits pour travailler ensemble.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-elgato-sand text-white px-6 py-3 rounded-xl hover:bg-[#B89B7F] transition-colors"
          >
            Prendre rendez-vous
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </>
    )
  },
  "preparer-shooting-entreprise": {
    title: "Comment Préparer un Shooting Photo d'Entreprise",
    excerpt: "Guide pratique pour les entreprises qui souhaitent organiser une séance photo professionnelle : préparation, tenue, et conseils pour des portraits corporate réussis.",
    category: "Corporate",
    date: "25 Novembre 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&h=600&fit=crop",
    relatedSlugs: ["10-conseils-reussir-seance-photo-portrait", "importance-lumiere-naturelle"],
    content: (
      <>
        <p className="text-lg text-elgato-text-light mb-6 leading-relaxed">
          Un shooting photo d'entreprise bien préparé fait toute la différence. Que vous
          souhaitiez mettre à jour vos portraits LinkedIn, refaire les photos de votre site
          web ou créer du contenu pour vos réseaux sociaux, voici comment garantir le succès
          de votre séance.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">Avant le shooting</h2>

        <h3 className="text-xl font-medium text-elgato-brown mt-6 mb-3">Définissez vos objectifs</h3>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Commencez par clarifier l'utilisation des photos : site web, LinkedIn, plaquette
          commerciale, réseaux sociaux ? Chaque support peut nécessiter un style différent.
          Partagez vos références et inspirations avec le photographe.
        </p>

        <h3 className="text-xl font-medium text-elgato-brown mt-6 mb-3">Planifiez la logistique</h3>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Établissez un planning précis avec des créneaux horaires pour chaque collaborateur.
          Prévoyez 15-20 minutes par personne pour des portraits individuels. Désignez un
          coordinateur interne qui sera le point de contact avec le photographe.
        </p>

        <div className="bg-elgato-cream rounded-2xl p-6 my-8">
          <h3 className="text-xl font-semibold text-elgato-brown mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-elgato-sand" />
            Conseil organisation
          </h3>
          <p className="text-elgato-text-light">
            Envoyez un email à tous les participants une semaine avant avec le planning,
            les consignes vestimentaires et ce qu'ils doivent apporter. Rappelez le jour J
            par un message le matin même.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">Les tenues</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          La cohérence vestimentaire est importante pour une image de marque professionnelle :
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-elgato-text-light">
            <CheckCircle className="w-5 h-5 text-elgato-sand flex-shrink-0 mt-1" />
            <span>Évitez les motifs trop voyants et les logos visibles</span>
          </li>
          <li className="flex items-start gap-3 text-elgato-text-light">
            <CheckCircle className="w-5 h-5 text-elgato-sand flex-shrink-0 mt-1" />
            <span>Privilégiez les couleurs unies, idéalement dans votre charte graphique</span>
          </li>
          <li className="flex items-start gap-3 text-elgato-text-light">
            <CheckCircle className="w-5 h-5 text-elgato-sand flex-shrink-0 mt-1" />
            <span>Demandez aux collaborateurs d'apporter deux options de tenue</span>
          </li>
          <li className="flex items-start gap-3 text-elgato-text-light">
            <CheckCircle className="w-5 h-5 text-elgato-sand flex-shrink-0 mt-1" />
            <span>Repassez les vêtements - les plis se voient sur les photos</span>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">Le jour du shooting</h2>

        <h3 className="text-xl font-medium text-elgato-brown mt-6 mb-3">L'espace</h3>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Préparez une salle dédiée, idéalement avec de la lumière naturelle. Rangez l'espace
          - l'arrière-plan compte ! Prévoyez un miroir et un coin retouche maquillage.
        </p>

        <h3 className="text-xl font-medium text-elgato-brown mt-6 mb-3">L'ambiance</h3>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Mettez les participants à l'aise. Une musique de fond légère peut aider à détendre
          l'atmosphère. Proposez de l'eau et des rafraîchissements. Rappelez que le photographe
          est là pour les mettre en valeur, pas pour les juger.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">Types de photos à prévoir</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-elgato-text-light">
          <li><strong>Portraits individuels</strong> - fond neutre, professionnel</li>
          <li><strong>Photos d'équipe</strong> - formelles et décontractées</li>
          <li><strong>Photos d'ambiance</strong> - vie au bureau, réunions, collaboration</li>
          <li><strong>Photos des locaux</strong> - espaces de travail, accueil, salles de réunion</li>
        </ul>

        <div className="bg-gradient-to-r from-elgato-blue/20 to-elgato-sand/20 rounded-2xl p-8 my-10">
          <h3 className="text-xl font-semibold text-elgato-brown mb-4">Besoin d'un shooting corporate ?</h3>
          <p className="text-elgato-text-light mb-4">
            Je propose des forfaits adaptés à toutes les tailles d'entreprise.
            Contactez-moi pour un devis personnalisé.
          </p>
          <Link
            href="/services/corporate"
            className="inline-flex items-center gap-2 bg-elgato-sand text-white px-6 py-3 rounded-xl hover:bg-[#B89B7F] transition-colors"
          >
            Voir mes offres corporate
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </>
    )
  },
  "tendances-photo-2025": {
    title: "Les Tendances Photo Mariage et Portrait en 2025",
    excerpt: "Découvrez les styles et tendances qui marqueront la photographie de mariage et de portrait cette année : du naturel, de l'émotion et des approches innovantes.",
    category: "Tendances",
    date: "18 Novembre 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&h=600&fit=crop",
    relatedSlugs: ["comment-choisir-photographe-mariage", "importance-lumiere-naturelle"],
    content: (
      <>
        <p className="text-lg text-elgato-text-light mb-6 leading-relaxed">
          2025 s'annonce comme une année passionnante pour la photographie de mariage et
          de portrait. Après des années de perfectionnisme et de filtres, la tendance
          est résolument au retour à l'authenticité. Voici les tendances qui marqueront l'année.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">1. L'authenticité avant tout</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Les couples ne veulent plus de poses artificielles ni de photos trop retouchées.
          Ils recherchent des images qui capturent leur personnalité réelle, leurs émotions
          vraies, leurs moments spontanés. Le rire non prévu, la larme de joie, le regard
          complice - voilà ce qui compte.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">2. La Golden Hour, toujours</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          La lumière dorée du coucher de soleil reste incontournable. Elle sublime les peaux,
          crée une atmosphère romantique et transforme n'importe quel lieu en décor de rêve.
          En 2025, on la recherche encore plus, quitte à organiser le planning de la journée
          autour de cette heure magique.
        </p>

        <div className="bg-elgato-cream rounded-2xl p-6 my-8">
          <h3 className="text-xl font-semibold text-elgato-brown mb-3 flex items-center gap-2">
            <Heart className="w-5 h-5 text-elgato-sand" />
            Tendance forte
          </h3>
          <p className="text-elgato-text-light">
            Le "editorial storytelling" : raconter l'histoire du couple comme un magazine
            de mode, mais avec l'émotion et l'intimité d'un reportage documentaire.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">3. Le retour du film</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          L'esthétique argentique fait son grand retour. Que ce soit avec de vraies pellicules
          ou des traitements numériques qui s'en inspirent, le grain, les couleurs douces et
          l'imperfection assumée séduisent une nouvelle génération de couples.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">4. Les micro-mariages intimistes</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Moins de 50 invités, des lieux atypiques, une atmosphère intime... Les micro-mariages
          permettent une photographie plus personnelle et immersive. Le photographe peut se
          concentrer sur les détails et créer des images plus profondes.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">5. La diversité célébrée</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          La photographie de mariage en 2025 célèbre toutes les formes d'amour et de beauté.
          Fini les canons esthétiques uniformes - chaque couple est unique et mérite des
          photos qui reflètent cette singularité.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">6. L'hybride photo-vidéo</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Les couples veulent le meilleur des deux mondes : des photos pour l'album et des
          vidéos pour revivre les émotions. Les photographes qui proposent les deux services
          de manière cohérente ont la cote.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">7. Le noir et blanc expressif</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Le noir et blanc revient en force, mais pas n'importe lequel. Un noir et blanc
          contrasté, expressif, qui met en valeur les émotions et les textures. Parfait
          pour les moments forts de la journée.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">8. Les lieux insolites</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Les couples sortent des sentiers battus : une forêt enchantée, un toit-terrasse
          urbain, une bibliothèque ancienne, une plage déserte au lever du soleil...
          L'originalité du lieu fait partie de l'histoire.
        </p>

        <div className="bg-gradient-to-r from-elgato-blue/20 to-elgato-sand/20 rounded-2xl p-8 my-10">
          <h3 className="text-xl font-semibold text-elgato-brown mb-4">Créons ensemble votre histoire</h3>
          <p className="text-elgato-text-light mb-4">
            Quelle que soit la tendance, mon objectif reste le même : capturer l'essence
            de votre histoire avec authenticité et émotion.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-elgato-sand text-white px-6 py-3 rounded-xl hover:bg-[#B89B7F] transition-colors"
          >
            Parlons de votre projet
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </>
    )
  },
  "importance-lumiere-naturelle": {
    title: "L'Importance de la Lumière Naturelle en Photographie",
    excerpt: "Pourquoi je privilégie la lumière naturelle dans mes séances photo et comment elle transforme vos portraits en œuvres authentiques et intemporelles.",
    category: "Technique",
    date: "10 Novembre 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=1200&h=600&fit=crop",
    relatedSlugs: ["10-conseils-reussir-seance-photo-portrait", "tendances-photo-2025"],
    content: (
      <>
        <p className="text-lg text-elgato-text-light mb-6 leading-relaxed">
          En tant que photographe, ma relation avec la lumière est centrale dans mon travail.
          Si je peux utiliser des flashs et des éclairages artificiels quand nécessaire,
          je privilégie toujours la lumière naturelle. Voici pourquoi.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">Une douceur incomparable</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          La lumière naturelle, surtout lorsqu'elle est diffuse ou filtrée, enveloppe le sujet
          d'une douceur qu'aucun flash ne peut reproduire. Elle lisse les imperfections, crée
          des transitions de tons subtiles et donne à la peau un éclat naturel.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">Des couleurs authentiques</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          La lumière du soleil révèle les vraies couleurs. Les tons chair sont plus naturels,
          les vêtements gardent leur teinte réelle, et l'ensemble de l'image possède une
          cohérence chromatique difficile à obtenir en studio.
        </p>

        <div className="bg-elgato-cream rounded-2xl p-6 my-8">
          <h3 className="text-xl font-semibold text-elgato-brown mb-3 flex items-center gap-2">
            <Camera className="w-5 h-5 text-elgato-sand" />
            Les meilleures heures
          </h3>
          <p className="text-elgato-text-light">
            <strong>Golden Hour :</strong> 1h après le lever et 1h avant le coucher du soleil.
            Lumière chaude et dorée, idéale pour les portraits romantiques.<br/><br/>
            <strong>Blue Hour :</strong> Juste avant le lever et après le coucher. Lumière
            douce et bleutée, parfaite pour une atmosphère mystérieuse.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">Une atmosphère détendue</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Sans projecteurs aveuglants ni flashs qui surprennent, mes sujets sont plus
          détendus. Ils oublient l'appareil photo plus facilement, ce qui se traduit par
          des expressions plus naturelles et des poses moins crispées.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">La variété des ambiances</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          La lumière naturelle change constamment : matin doux, midi contrasté, après-midi
          chaleureux, coucher de soleil doré... Chaque moment offre une ambiance différente,
          permettant de varier les styles au cours d'une même séance.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">Comment je travaille avec la lumière</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Je repère toujours mes lieux de shooting en amont pour comprendre comment la
          lumière évolue. Je positionne mes sujets face à la source de lumière principale
          ou légèrement de côté pour sculpter les visages. J'utilise des réflecteurs pour
          déboucher les ombres quand nécessaire.
        </p>

        <h2 className="text-2xl font-semibold text-elgato-brown mt-10 mb-4">Les défis de la lumière naturelle</h2>
        <p className="text-elgato-text-light mb-6 leading-relaxed">
          Travailler en lumière naturelle demande de la flexibilité. La météo peut changer,
          un nuage peut passer... Mais c'est aussi ce qui rend chaque séance unique. J'ai
          appris à voir ces "imprévus" comme des opportunités créatives.
        </p>

        <div className="bg-gradient-to-r from-elgato-blue/20 to-elgato-sand/20 rounded-2xl p-8 my-10">
          <h3 className="text-xl font-semibold text-elgato-brown mb-4">Envie d'une séance en lumière naturelle ?</h3>
          <p className="text-elgato-text-light mb-4">
            Que ce soit en extérieur ou dans un intérieur baigné de lumière, je vous propose
            des séances qui subliment votre beauté naturelle.
          </p>
          <Link
            href="/services/portraits"
            className="inline-flex items-center gap-2 bg-elgato-sand text-white px-6 py-3 rounded-xl hover:bg-[#B89B7F] transition-colors"
          >
            Découvrir mes séances portrait
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </>
    )
  }
};

// Article titles for related articles
const articleTitles: Record<string, string> = {
  "10-conseils-reussir-seance-photo-portrait": "10 Conseils pour Réussir votre Séance Photo Portrait",
  "coulisses-mariage-paris": "Coulisses d'un Mariage à Paris",
  "comment-choisir-photographe-mariage": "Comment Choisir son Photographe de Mariage",
  "preparer-shooting-entreprise": "Comment Préparer un Shooting Photo d'Entreprise",
  "tendances-photo-2025": "Les Tendances Photo 2025",
  "importance-lumiere-naturelle": "L'Importance de la Lumière Naturelle"
};

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = articlesData[slug];

  if (!article) {
    return (
      <main className="min-h-screen bg-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-light text-elgato-brown mb-4">Article non trouvé</h1>
          <p className="text-elgato-text-light mb-8">L'article que vous recherchez n'existe pas.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-elgato-sand text-white px-6 py-3 rounded-xl hover:bg-[#B89B7F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
        </div>
      </main>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <motion.main
      className="min-h-screen bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-elgato-sand text-white text-sm rounded-full mb-4">
              <Tag className="w-3 h-3" />
              {article.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime} de lecture
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-elgato-text-light hover:text-elgato-sand transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {article.content}
          </div>

          {/* Share */}
          <div className="border-t border-elgato-cream mt-12 pt-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <span className="text-elgato-brown font-medium">Partager cet article</span>
              <div className="flex gap-3">
                <button
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="w-10 h-10 rounded-full bg-elgato-cream hover:bg-elgato-sand hover:text-white flex items-center justify-center text-elgato-brown transition-all"
                  aria-label="Partager sur Facebook"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {article.relatedSlugs.length > 0 && (
        <section className="py-16 bg-elgato-cream/30">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-light text-elgato-brown mb-8 text-center">
              Articles similaires
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {article.relatedSlugs.map((relatedSlug) => {
                const relatedArticle = articlesData[relatedSlug];
                if (!relatedArticle) return null;
                return (
                  <Link
                    key={relatedSlug}
                    href={`/blog/${relatedSlug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs text-elgato-sand font-medium">{relatedArticle.category}</span>
                      <h3 className="text-lg font-semibold text-elgato-brown group-hover:text-elgato-sand transition-colors mt-1">
                        {articleTitles[relatedSlug] || relatedArticle.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </motion.main>
  );
}
