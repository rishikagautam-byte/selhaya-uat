/**
 * Utility to patch product data URLs with Shopify URLs
 * This function takes static data and updates the enterHref fields with proper Shopify URLs
 */

import type { ResilienceItem } from '../types/resilienceTypes';
import { getProductURLFromCache } from './productURLHelper';

/**
 * Convert old /product/{handle} format to new /products/{handle}/{gid} format
 * Uses cache if available, otherwise falls back to old format
 */
export function convertProductURL(oldURL: string): string {
  if (!oldURL.startsWith('/product/')) {
    return oldURL;
  }
  
  // Extract handle from old URL
  const handle = oldURL.replace('/product/', '');
  
  // Get new URL from cache
  const newURL = getProductURLFromCache(handle);
  
  return newURL;
}

/**
 * Patch all product URLs in an array of ResilienceItems
 */
export function patchProductDataURLs(items: ResilienceItem[]): ResilienceItem[] {
  return items.map(item => ({
    ...item,
    enterHref: convertProductURL(item.enterHref),
  }));
}

/**
 * Create a patched version of data with Shopify URLs
 */
export function createPatchedDataWithShopifyURLs(items: ResilienceItem[]): ResilienceItem[] {
  return patchProductDataURLs(items);
}

export default {
  convertProductURL,
  patchProductDataURLs,
  createPatchedDataWithShopifyURLs,
};
