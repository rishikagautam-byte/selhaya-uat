/**
 * React hook to generate product URLs with Shopify IDs
 * Use this hook in components that need to navigate to products
 */

import { useEffect, useState } from 'react';
import { getProductURLsCache, getProductURLFromCache } from '../lib/productURLHelper';
import type { ProductURLData } from '../lib/shopify';

export function useProductURL(handle: string) {
  const [url, setUrl] = useState<string>(() => getProductURLFromCache(handle));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchURL = async () => {
      try {
        const urls = await getProductURLsCache();
        const product = urls.find(p => p.handle === handle);
        if (product) {
          setUrl(product.url);
        }
      } catch (error) {
        console.warn(`Failed to fetch product URL for ${handle}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchURL();
  }, [handle]);

  return { url, loading };
}

/**
 * Hook to get all product URLs
 */
export function useAllProductURLs() {
  const [urls, setUrls] = useState<ProductURLData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchURLs = async () => {
      try {
        const productURLs = await getProductURLsCache();
        setUrls(productURLs);
      } catch (error) {
        console.error('Failed to fetch product URLs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchURLs();
  }, []);

  return { urls, loading };
}

/**
 * Get product URL by handle (synchronous from cache)
 * Use this for static data or when hook overhead is not needed
 */
export function getProductURLSync(handle: string): string {
  return getProductURLFromCache(handle);
}

export default {
  useProductURL,
  useAllProductURLs,
  getProductURLSync,
} as const;
