/**
 * Client Amazon Product Advertising API 5.0 — Phase 2
 *
 * À implémenter lorsque MOCK_MODE=false.
 * Documentation : https://webservices.amazon.com/paapi5/documentation/
 *
 * Variables d'environnement requises :
 *   AMAZON_ACCESS_KEY
 *   AMAZON_SECRET_KEY
 *   AMAZON_ASSOCIATE_TAG
 */

import type { SearchParams, SearchResult } from '@/types/product';

export async function searchItems(_params: SearchParams): Promise<SearchResult> {
  throw new Error(
    'PA-API non configurée. Renseignez les clés dans .env.local et implémentez ce client.'
  );
}
