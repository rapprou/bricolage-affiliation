import { NextRequest, NextResponse } from 'next/server';
import { searchProducts } from '@/lib/searchProducts';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const params = {
    q: searchParams.get('q') || '',
    page: parseInt(searchParams.get('page') || '1', 10),
    type: searchParams.get('type') || undefined,
    priceMin: searchParams.get('priceMin')
      ? parseFloat(searchParams.get('priceMin')!)
      : undefined,
    priceMax: searchParams.get('priceMax')
      ? parseFloat(searchParams.get('priceMax')!)
      : undefined,
    ratingMin: searchParams.get('ratingMin')
      ? parseFloat(searchParams.get('ratingMin')!)
      : undefined,
    brand: searchParams.get('brand') || undefined,
    sortBy: searchParams.get('sort') || undefined,
  };

  try {
    // Phase 1 : mock data
    // Phase 2 : remplacer par paapi.searchItems(params)
    const result = searchProducts(params);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la recherche' },
      { status: 500 }
    );
  }
}
