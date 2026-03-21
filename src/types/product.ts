export interface Product {
  asin: string;
  title: string;
  imageUrl: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  type: 'perceuse' | 'visseuse' | 'meuleuse' | 'scie' | 'ponceuse' | 'autre';
  brand: string;
  affiliateUrl: string;
  isPrime: boolean;
  badge?: 'bestseller' | 'coup-de-coeur' | 'rapport-qualite-prix';
}

export interface SearchParams {
  q: string;
  page: number;
  type?: string;
  priceMin?: number;
  priceMax?: number;
  ratingMin?: number;
  brand?: string;
  sortBy?: string;
}

export interface SearchResult {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}
