/**
 * Utility to generate Shopify product URLs with IDs
 * This helper converts product handles to full URLs with Shopify product IDs
 */

import { getAllProductURLs, type ProductURLData } from './shopify';

let productURLCache: ProductURLData[] | null = null;
let cachePromise: Promise<ProductURLData[]> | null = null;

/**
 * Get cached product URLs or fetch them once
 */
export async function getProductURLsCache(): Promise<ProductURLData[]> {
  if (productURLCache) {
    return productURLCache;
  }
  
  if (cachePromise) {
    return cachePromise;
  }
  
  cachePromise = getAllProductURLs().then(urls => {
    productURLCache = urls;
    return urls;
  });
  
  return cachePromise;
}

/**
 * Generate product URL from handle
 * Returns full URL with Shopify ID, or fallback to old format if not available
 */
export async function generateProductLinkURL(handle: string): Promise<string> {
  try {
    const urls = await getProductURLsCache();
    const product = urls.find(p => p.handle === handle);
    if (product) {
      return product.url;
    }
  } catch (error) {
    console.warn(`Failed to generate product URL for ${handle}:`, error);
  }
  
  // Fallback to new format with fake gid if not available in Shopify
  const fakeGid = `gid://shopify/Product/0000000000000`;
  const encodedGid = encodeURIComponent(fakeGid);
  return `/products/${handle}/${encodedGid}`;
}

/**
 * Get product URL synchronously from cache
 * (if cache is not yet populated, returns old format)
 */
export function getProductURLFromCache(handle: string): string {
  if (productURLCache) {
    const product = productURLCache.find(p => p.handle === handle);
    if (product) {
      return product.url;
    }
  }
  
  // Fallback to new format with fake gid
  const fakeGid = `gid://shopify/Product/0000000000000`;
  const encodedGid = encodeURIComponent(fakeGid);
  return `/products/${handle}/${encodedGid}`;
}

/**
 * Preload product URLs cache on app startup
 * Call this in your main App component useEffect to avoid delays
 */
export async function preloadProductURLs(): Promise<void> {
  try {
    await getProductURLsCache();
  } catch (error) {
    console.error('Failed to preload product URLs:', error);
  }
}

/**
 * Clear cache (useful for testing or manual refresh)
 */
export function clearProductURLCache(): void {
  productURLCache = null;
  cachePromise = null;
}

export default {
  getProductURLsCache,
  generateProductLinkURL,
  getProductURLFromCache,
  preloadProductURLs,
  clearProductURLCache,
};
