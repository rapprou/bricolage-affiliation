import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/mdx'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()
  const articleUrls = articles.map(article => ({
    url: `https://bricolage-affiliation.vercel.app/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  return [
    {
      url: 'https://bricolage-affiliation.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: 'https://bricolage-affiliation.vercel.app/recherche',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: 'https://bricolage-affiliation.vercel.app/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...articleUrls,
  ]
}
