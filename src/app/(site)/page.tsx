import Link from 'next/link';

export const metadata = {
  title: 'BricoSearch — Moteur de recherche outils bricolage | Amazon.fr',
  description: 'Trouvez l\'outil parfait pour vos projets bricolage. Comparez perceuses, visseuses, meuleuses au meilleur prix sur Amazon.fr.',
}
import { ShieldCheck, Star, Zap } from 'lucide-react';

const features = [
  {
    icon: <Zap size={28} className="text-blue-600" />,
    title: 'Prix compétitifs',
    description: 'Nous sélectionnons uniquement les meilleurs tarifs disponibles sur Amazon.fr.',
  },
  {
    icon: <ShieldCheck size={28} className="text-blue-600" />,
    title: 'Sélection experte',
    description: 'Chaque outil est analysé selon ses caractéristiques techniques et son rapport qualité-prix.',
  },
  {
    icon: <Star size={28} className="text-blue-600" />,
    title: 'Avis vérifiés',
    description: 'Nous nous appuyons sur les avis authentiques des acheteurs Amazon pour nos recommandations.',
  },
];

const articles = [
  {
    slug: 'choisir-sa-machine-bricolage',
    title: 'Comment choisir sa machine à bricoler ?',
    excerpt: 'Guide complet pour choisir votre premier outil électroportatif selon votre budget et vos projets.',
    date: '15 mars 2026',
    readTime: '7 min',
  },
  {
    slug: 'top-10-outils-moins-300-euros',
    title: 'Top 10 des outils à moins de 300 €',
    excerpt: 'Notre sélection des meilleurs outils de bricolage pour équiper votre atelier sans se ruiner.',
    date: '8 mars 2026',
    readTime: '5 min',
  },
  {
    slug: 'comparatif-bosch-makita-blackdecker',
    title: 'Bosch vs Makita vs Black+Decker : lequel choisir ?',
    excerpt: 'Comparatif détaillé des trois grandes marques d\'outillage électroportatif disponibles sur Amazon.',
    date: '1 mars 2026',
    readTime: '9 min',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Trouvez l&apos;outil parfait pour vos projets bricolage
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Comparez les meilleures perceuses, visseuses et meuleuses du marché.
            Prix Amazon mis à jour en temps réel.
          </p>
          <Link
            href="/recherche"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Lancer ma recherche
          </Link>
        </div>
      </section>

      {/* Pourquoi BricoSearch */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">
          Pourquoi BricoSearch ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(f => (
            <div key={f.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="flex justify-center mb-4">{f.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Derniers guides */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">
            Nos derniers guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map(article => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime} de lecture</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 leading-snug">{article.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{article.excerpt}</p>
                <span className="inline-block mt-4 text-sm text-blue-600 font-medium hover:underline">
                  Lire la suite →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
