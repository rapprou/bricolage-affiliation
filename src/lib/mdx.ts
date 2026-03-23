import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface ArticleMeta {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  keywords: string[]
  excerpt: string
}

const contentDir = path.join(process.cwd(), 'src/content')

export function getAllArticles(): ArticleMeta[] {
  const files = fs.readdirSync(contentDir)
  return files
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(contentDir, filename), 'utf8')
      const { data, content } = matter(raw)
      const rt = readingTime(content)
      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        readingTime: `${Math.ceil(rt.minutes)} min de lecture`,
        keywords: data.keywords || [],
        excerpt: data.excerpt || '',
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleBySlug(slug: string) {
  const filepath = path.join(contentDir, `${slug}.mdx`)
  const raw = fs.readFileSync(filepath, 'utf8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)
  return {
    meta: {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      readingTime: `${Math.ceil(rt.minutes)} min de lecture`,
      keywords: data.keywords || [],
      excerpt: data.excerpt || '',
    },
    content,
  }
}
