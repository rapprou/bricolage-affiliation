import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';

export const metadata = {
  title: 'Blog bricolage — Guides et comparatifs outils | BricoSearch',
  description: 'Guides d\'achat, comparatifs et conseils pour choisir vos outils de bricolage.',
};

export default function BlogPage() {
  const articles = getAllArticles();

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
              <time>{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
              <span>·</span>
              <span>{article.readingTime}</span>
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
