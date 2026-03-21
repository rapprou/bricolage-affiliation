import Image from 'next/image';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';

const badgeConfig = {
  bestseller: { label: 'Bestseller', className: 'bg-yellow-100 text-yellow-800' },
  'coup-de-coeur': { label: 'Coup de cœur', className: 'bg-blue-100 text-blue-800' },
  'rapport-qualite-prix': { label: 'Rapport qualité-prix', className: 'bg-green-100 text-green-800' },
};

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  return (
    <span className="flex items-center gap-px text-base leading-none">
      {Array.from({ length: full }).map((_, i) => (
        <span key={`f${i}`} className="text-amber-400">★</span>
      ))}
      {half === 1 && <span className="text-amber-400 text-sm">½</span>}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`e${i}`} className="text-gray-300">★</span>
      ))}
    </span>
  );
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const badge = product.badge ? badgeConfig[product.badge] : null;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative w-full h-[200px] bg-gray-50">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        {badge && (
          <span
            className={`absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full ${badge.className}`}
          >
            {badge.label}
          </span>
        )}
      </div>

      {/* Contenu */}
      <div className="p-4 flex flex-col flex-1">
        {/* Titre */}
        <h3 className="text-sm text-gray-800 font-medium line-clamp-2 mb-2 leading-snug">
          {product.title}
        </h3>

        {/* Étoiles + avis */}
        <div className="flex items-center gap-1.5 mb-1">
          <StarRating rating={product.rating} />
          <span className="text-sm text-gray-500">
            ({product.reviewCount.toLocaleString('fr-FR')} avis)
          </span>
        </div>

        {/* Prime */}
        {product.isPrime && (
          <span className="text-xs text-blue-600 font-semibold mb-2">✓ Prime</span>
        )}

        {/* Prix */}
        <p className="text-2xl font-bold text-gray-900 mt-auto">
          {formatPrice(product.price, product.currency)}
        </p>

        {/* Séparateur */}
        <div className="border-t border-gray-100 mt-3 pt-3">
          {/* Bouton Amazon */}
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener sponsored"
            className="block w-full text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-150"
          >
            Voir sur Amazon →
          </a>
        </div>
      </div>
    </div>
  );
}
