import { mockProducts } from './mockData';
import type { SearchParams, SearchResult } from '@/types/product';

const PRODUCTS_PER_PAGE = 10;

export function searchProducts(params: SearchParams): SearchResult {
  let results = [...mockProducts];

  // Filtre texte (titre + marque)
  if (params.q && params.q.trim()) {
    const query = params.q.toLowerCase().trim();
    results = results.filter(
      p =>
        p.title.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query)
    );
  }

  // Filtre type d'outil
  if (params.type) {
    results = results.filter(p => p.type === params.type);
  }

  // Filtre prix
  if (params.priceMin !== undefined) {
    results = results.filter(p => p.price >= params.priceMin!);
  }
  if (params.priceMax !== undefined) {
    results = results.filter(p => p.price <= params.priceMax!);
  }

  // Filtre note
  if (params.ratingMin !== undefined) {
    results = results.filter(p => p.rating >= params.ratingMin!);
  }

  // Filtre marque
  if (params.brand) {
    results = results.filter(
      p => p.brand.toLowerCase() === params.brand!.toLowerCase()
    );
  }

  // Tri
  switch (params.sortBy) {
    case 'price-asc':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      results.sort((a, b) => b.rating - a.rating);
      break;
    case 'reviews-desc':
      results.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    default:
      break; // Pertinence : ordre d'origine
  }

  // Pagination
  const total = results.length;
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
  const page = Math.max(1, Math.min(params.page, totalPages || 1));
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const products = results.slice(start, start + PRODUCTS_PER_PAGE);

  return { products, total, page, totalPages };
}
