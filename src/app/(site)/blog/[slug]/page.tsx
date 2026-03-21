import Link from 'next/link';
import { notFound } from 'next/navigation';

const articles: Record<string, { title: string; date: string; readTime: string; content: string }> = {
  'choisir-sa-machine-bricolage': {
    title: 'Comment choisir sa machine à bricoler ?',
    date: '15 mars 2026',
    readTime: '7 min',
    content: `
Choisir le bon outil électroportatif peut sembler complexe face à la multitude d'offres disponibles. Voici les critères essentiels à considérer.

## Définissez vos besoins

Avant tout achat, posez-vous les bonnes questions : pour quels travaux ? À quelle fréquence ? En intérieur ou extérieur ? Ces réponses détermineront la puissance, le format (avec ou sans fil) et le budget appropriés.

## Avec ou sans fil ?

Les outils sans fil offrent une liberté de mouvement incomparable. Les batteries 18V Li-Ion sont aujourd'hui suffisamment puissantes pour la majorité des usages domestiques. Privilégiez les marques avec des plateformes de batteries compatibles (Bosch 18V, Makita LXT, Ryobi ONE+).

## Le rapport qualité-prix

Pour un usage occasionnel, les gammes intermédiaires (Black+Decker, Ryobi, Einhell) offrent d'excellentes performances. Pour un usage intensif, investissez dans du Bosch Professional, Makita ou DeWalt.

## Conclusion

N'oubliez pas de vérifier la garantie constructeur et le réseau SAV avant d'acheter. BricoSearch sélectionne uniquement des produits disponibles sur Amazon.fr avec des avis clients vérifiés.
    `.trim(),
  },
  'top-10-outils-moins-300-euros': {
    title: 'Top 10 des outils à moins de 300 €',
    date: '8 mars 2026',
    readTime: '5 min',
    content: `
Équiper son atelier n'implique pas forcément de se ruiner. Voici notre sélection des 10 meilleurs outils disponibles sous 300 € sur Amazon.fr.

## 1. Perceuse-Visseuse Bosch GSB 18V-55

Le meilleur choix pour débuter. Couple suffisant pour 90% des travaux domestiques, batterie longue durée incluse.

## 2. Visseuse à Impact Makita DTD155RTJ

Idéale pour l'assemblage de meubles et les travaux de charpente légers. Brushless = plus d'autonomie.

## 3. Meuleuse DeWalt DCG405NT-XJ

Parfaite pour couper et poncer. La version brushless garantit une durée de vie supérieure.

## 4-10 : Notre sélection complète

Retrouvez tous ces produits dans notre moteur de recherche avec leurs prix en temps réel sur Amazon.fr.
    `.trim(),
  },
  'comparatif-bosch-makita-blackdecker': {
    title: 'Bosch vs Makita vs Black+Decker : lequel choisir ?',
    date: '1 mars 2026',
    readTime: '9 min',
    content: `
Trois marques dominent le marché de l'outillage grand public en France. Voici notre comparatif objectif.

## Bosch Professional

**Pour qui ?** L'utilisateur exigeant qui veut du professionnel à prix abordable.
**Points forts :** Robustesse, SAV excellent, gamme 18V très complète.
**Points faibles :** Prix légèrement supérieur aux concurrents.

## Makita LXT

**Pour qui ?** Celui qui veut le meilleur de la technologie brushless.
**Points forts :** Autonomie record, ergonomie irréprochable, compatibilité batterie étendue.
**Points faibles :** Prix élevé, gamme parfois difficile à naviguer.

## Black+Decker

**Pour qui ?** Le bricoleur du week-end avec un budget serré.
**Points forts :** Prix attractifs, disponibilité partout, suffisant pour 80% des travaux.
**Points faibles :** Moins robuste pour un usage intensif, couple plus limité.

## Notre verdict

Pour un usage domestique occasionnel : **Black+Decker**. Pour un usage régulier : **Bosch Professional**. Pour les professionnels exigeants : **Makita LXT**.
    `.trim(),
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
        ← Retour au blog
      </Link>

      <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
        <time>{article.date}</time>
        <span>·</span>
        <span>{article.readTime} de lecture</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">{article.title}</h1>

      <div className="prose prose-gray max-w-none">
        {article.content.split('\n\n').map((block, idx) => {
          if (block.startsWith('## ')) {
            return (
              <h2 key={idx} className="text-xl font-bold text-gray-800 mt-8 mb-3">
                {block.slice(3)}
              </h2>
            );
          }
          if (block.startsWith('**') || block.includes('**')) {
            return (
              <p
                key={idx}
                className="text-gray-600 leading-relaxed mb-4"
                dangerouslySetInnerHTML={{
                  __html: block
                    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'),
                }}
              />
            );
          }
          return (
            <p key={idx} className="text-gray-600 leading-relaxed mb-4">
              {block}
            </p>
          );
        })}
      </div>

      <div className="mt-12 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
        Ce site participe au Programme Partenaires d&apos;Amazon EU. Les liens vers Amazon.fr
        sont des liens affiliés — nous percevons une commission si vous achetez via ces liens,
        sans surcoût pour vous.
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(articles).map(slug => ({ slug }));
}
