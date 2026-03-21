'use client';

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import Filters, { type FilterState } from '@/components/Filters';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import SkeletonCard from '@/components/ui/SkeletonCard';
import type { Product, SearchResult } from '@/types/product';

const SORT_OPTIONS = [
  { value: '', label: 'Pertinence' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'rating-desc', label: 'Meilleures notes' },
  { value: 'reviews-desc', label: "Nombre d'avis" },
];

// ─── Composant interne (accès à useSearchParams) ────────────────────────────

function RechercheContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialisation depuis l'URL
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [filters, setFilters] = useState<FilterState>({
    type: searchParams.get('type') ?? '',
    priceMin: searchParams.get('priceMin') ?? '',
    priceMax: searchParams.get('priceMax') ?? '',
    ratingMin: searchParams.get('ratingMin') ?? '',
  });
  const [sort, setSort] = useState(searchParams.get('sort') ?? '');
  const [page, setPage] = useState(
    parseInt(searchParams.get('page') ?? '1', 10)
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce du texte — valeur retardée qui déclenche la recherche
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(timer);
  }, [query]);

  // ─── Mise à jour de l'URL ────────────────────────────────────────────────

  const updateUrl = useCallback(
    (q: string, f: FilterState, s: string, p: number) => {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (f.type) params.set('type', f.type);
      if (f.priceMin) params.set('priceMin', f.priceMin);
      if (f.priceMax) params.set('priceMax', f.priceMax);
      if (f.ratingMin) params.set('ratingMin', f.ratingMin);
      if (s) params.set('sort', s);
      if (p > 1) params.set('page', String(p));
      const qs = params.toString();
      router.replace(`/recherche${qs ? '?' + qs : ''}`, { scroll: false });
    },
    [router]
  );

  // ─── Appel API ───────────────────────────────────────────────────────────

  const fetchProducts = useCallback(
    async (q: string, f: FilterState, p: number, s: string) => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.set('q', q);
        params.set('page', String(p));
        if (f.type) params.set('type', f.type);
        if (f.priceMin) params.set('priceMin', f.priceMin);
        if (f.priceMax) params.set('priceMax', f.priceMax);
        if (f.ratingMin) params.set('ratingMin', f.ratingMin);
        if (s) params.set('sort', s);

        const res = await fetch(`/api/search?${params.toString()}`);
        if (!res.ok) throw new Error('Erreur serveur');
        const data: SearchResult = await res.json();
        setProducts(data.products);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      } catch {
        setError('Une erreur est survenue. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ─── Effet principal : déclenché par query/filters/sort ─────────────────
  // Premier appel : conserve la page depuis l'URL.
  // Appels suivants : repart à la page 1.

  const initialPageRef = useRef(page);
  const isFirstRun = useRef(true);

  useEffect(() => {
    let p: number;
    if (isFirstRun.current) {
      isFirstRun.current = false;
      p = initialPageRef.current;
    } else {
      p = 1;
      setPage(1);
    }
    fetchProducts(debouncedQuery, filters, p, sort);
    updateUrl(debouncedQuery, filters, sort, p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, filters, sort]);

  // ─── Handlers ───────────────────────────────────────────────────────────

  function handlePageChange(newPage: number) {
    setPage(newPage);
    fetchProducts(debouncedQuery, filters, newPage, sort);
    updateUrl(debouncedQuery, filters, sort, newPage);
  }

  function handleSortChange(newSort: string) {
    setSort(newSort);
    // L'effet principal ne se re-déclenchera que si `sort` est une dep —
    // on le met à jour ici et l'effet réagit via la dep `sort`.
  }

  function resetAllFilters() {
    const emptyFilters: FilterState = {
      type: '',
      priceMin: '',
      priceMax: '',
      ratingMin: '',
    };
    setQuery('');
    setDebouncedQuery('');
    setFilters(emptyFilters);
    setSort('');
  }

  // ─── Chips de filtres actifs ─────────────────────────────────────────────

  type Chip = { key: string; label: string; remove: () => void };
  const chips: Chip[] = [
    filters.type
      ? {
          key: 'type',
          label: filters.type,
          remove: () => setFilters(f => ({ ...f, type: '' })),
        }
      : null,
    filters.priceMin
      ? {
          key: 'priceMin',
          label: `min ${filters.priceMin} €`,
          remove: () => setFilters(f => ({ ...f, priceMin: '' })),
        }
      : null,
    filters.priceMax
      ? {
          key: 'priceMax',
          label: `max ${filters.priceMax} €`,
          remove: () => setFilters(f => ({ ...f, priceMax: '' })),
        }
      : null,
    filters.ratingMin
      ? {
          key: 'ratingMin',
          label: `note ${filters.ratingMin}+`,
          remove: () => setFilters(f => ({ ...f, ratingMin: '' })),
        }
      : null,
  ].filter((c): c is Chip => c !== null);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Barre de recherche */}
      <div className="mb-8">
        <SearchBar value={query} onChange={setQuery} onSubmit={() => setDebouncedQuery(query)} />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtres */}
        <Filters filters={filters} onChange={setFilters} />

        {/* Résultats */}
        <div className="flex-1 min-w-0">
          {/* Bandeau résultats */}
          {!loading && (
            <div className="mb-4">
              {/* Compteur + sélecteur de tri */}
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <p className="text-sm text-gray-500">
                  {total === 0
                    ? 'Aucun résultat'
                    : `${total} résultat${total > 1 ? 's' : ''} trouvé${total > 1 ? 's' : ''}`}
                </p>
                {total > 0 && (
                  <select
                    value={sort}
                    onChange={e => handleSortChange(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                  >
                    {SORT_OPTIONS.map(o => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Chips de filtres actifs */}
              {chips.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {chips.map(chip => (
                    <button
                      key={chip.key}
                      onClick={chip.remove}
                      className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      <span>× {chip.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Erreur */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm mb-4">
              {error}
            </div>
          )}

          {/* Grille produits / skeleton / état vide */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">🔍</p>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Aucun résultat
                {debouncedQuery ? ` pour « ${debouncedQuery} »` : ''}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Essayez avec d&apos;autres mots-clés ou élargissez vos filtres.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-colors"
              >
                Réinitialiser tous les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {products.map(product => (
                <ProductCard key={product.asin} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Export page avec Suspense (requis pour useSearchParams) ─────────────────

export default function RecherchePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="h-14 bg-gray-100 rounded-full max-w-2xl mx-auto mb-8 animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      }
    >
      <RechercheContent />
    </Suspense>
  );
}
