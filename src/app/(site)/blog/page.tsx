import Link from 'next/link';

const articles = [
  {
    slug: 'choisir-sa-machine-bricolage',
    title: 'Comment choisir sa machine à bricoler ?',
    excerpt:
      'Guide complet pour choisir votre premier outil électroportatif selon votre budget et vos projets. Perceuse, visseuse ou meuleuse : on vous aide à y voir clair.',
    date: '15 mars 2026',
    readTime: '7 min',
  },
  {
    slug: 'top-10-outils-moins-300-euros',
    title: 'Top 10 des outils à moins de 300 €',
    excerpt:
      'Notre sélection des meilleurs outils de bricolage pour équiper votre atelier sans se ruiner. Du meilleur rapport qualité-prix au bestseller Amazon.',
    date: '8 mars 2026',
    readTime: '5 min',
  },
  {
    slug: 'comparatif-bosch-makita-blackdecker',
    title: 'Bosch vs Makita vs Black+Decker : lequel choisir ?',
    excerpt:
      'Comparatif détaillé des trois grandes marques d\'outillage électroportatif disponibles sur Amazon. Qualité, prix, SAV : notre verdict sans concession.',
    date: '1 mars 2026',
    readTime: '9 min',
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog bricolage</h1>
      <p className="text-gray-500 mb-10">Guides, comparatifs et conseils pour choisir vos outils.</p>

      <div className="flex flex-col gap-8">
        {articles.map(article => (
          <article
            key={article.slug}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
              <time>{article.date}</time>
              <span>·</span>
              <span>{article.readTime} de lecture</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{article.title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{article.excerpt}</p>
            <Link
              href={`/blog/${article.slug}`}
              className="inline-block text-sm font-semibold text-blue-600 hover:underline"
            >
              Lire l&apos;article →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
