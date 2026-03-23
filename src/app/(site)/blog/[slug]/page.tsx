import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const { meta } = getArticleBySlug(slug);
    return {
      title: `${meta.title} | BricoSearch`,
      description: meta.description,
      keywords: meta.keywords,
    };
  } catch {
    return { title: 'Article introuvable | BricoSearch' };
  }
}

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map(a => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  try {
    const { meta, content } = getArticleBySlug(slug);

    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
          ← Retour au blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <time>{new Date(meta.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
          <span>·</span>
          <span>{meta.readingTime}</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">{meta.title}</h1>

        <div className="prose prose-gray max-w-none">
          <MDXRemote source={content} />
        </div>

        <div className="mt-12 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 mb-3">
            Vous cherchez un outil mentionné dans cet article ?
          </p>
          <Link
            href="/recherche"
            className="inline-block bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold px-4 py-2 rounded-lg text-sm transition"
          >
            Rechercher sur BricoSearch →
          </Link>
        </div>

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-500">
          Ce site participe au Programme Partenaires d&apos;Amazon EU. Les liens vers Amazon.fr
          sont des liens affiliés — nous percevons une commission si vous achetez via ces liens,
          sans surcoût pour vous.
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
