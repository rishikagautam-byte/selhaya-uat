/**
 * Migration Guide: Replace localhost URLs with Shopify product URLs
 * 
 * BEFORE (Local URL):
 * http://localhost:5173/product/malika-drape
 * 
 * AFTER (Shopify URL with ID):
 * /products/malika-drape/gid%3A%2F%2Fshopify%2FProduct%2F15425691156825
 */

import React from 'react';
// Import the function
import { getAllProductURLs, decodeShopifyId } from './shopify';

/**
 * Hook to fetch and cache all product URLs on app startup
 */
export function useShopifyProductURLs() {
  const [productURLs, setProductURLs] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchURLs = async () => {
      try {
        const urls = await getAllProductURLs();
        // Build a map of handles to URLs
        const urlMap: Record<string, string> = {};
        urls.forEach(product => {
          urlMap[product.handle] = product.url;
        });
        setProductURLs(urlMap);
      } catch (error) {
        console.error('Failed to fetch product URLs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchURLs();
  }, []);

  return { productURLs, loading };
}

/**
 * Helper function to get product URL by handle
 * 
 * Usage:
 * const url = getProductURL('malika-drape');
 * // Returns: /products/malika-drape/gid%3A%2F%2Fshopify%2FProduct%2F123456
 */
export function getProductURL(handle: string, productURLs: Record<string, string>) {
  return productURLs[handle] || `/products/${handle}`;
}

/**
 * URL Mapping: Local to Shopify
 * 
 * Update all these routes in your app:
 */
const URL_MIGRATION_MAP = {
  // Old local URLs → New Shopify URLs
  // You need to replace these in your navigation/links

  // Navigation Links
  'OLD: http://localhost:5173/product/malika-drape': 'NEW: /products/malika-drape/gid%3A%2F%2Fshopify%2FProduct%2F{ID}',
  'OLD: http://localhost:5173/product/sharifa-cut': 'NEW: /products/sharifa-cut/gid%3A%2F%2Fshopify%2FProduct%2F{ID}',
  'OLD: http://localhost:5173/product/safa-bloom': 'NEW: /products/safa-bloom/gid%3A%2F%2Fshopify%2FProduct%2F{ID}',
  'OLD: http://localhost:5173/product/noor-flow': 'NEW: /products/noor-flow/gid%3A%2F%2Fshopify%2FProduct%2F{ID}',
  'OLD: http://localhost:5173/product/yaqeen': 'NEW: /products/yaqeen/gid%3A%2F%2Fshopify%2FProduct%2F{ID}',
  'OLD: http://localhost:5173/product/amara-flame': 'NEW: /products/amara-flame/gid%3A%2F%2Fshopify%2FProduct%2F{ID}',
  'OLD: http://localhost:5173/product/sabi': 'NEW: /products/sabi/gid%3A%2F%2Fshopify%2FProduct%2F{ID}',
  'OLD: http://localhost:5173/product/ziya-blue': 'NEW: /products/ziya-blue/gid%3A%2F%2Fshopify%2FProduct%2F{ID}',
  'OLD: http://localhost:5173/product/sakura': 'NEW: /products/sakura/gid%3A%2F%2Fshopify%2FProduct%2F{ID}',
  'OLD: http://localhost:5173/product/rina-lemon': 'NEW: /products/rina-lemon/gid%3A%2F%2Fshopify%2FProduct%2F{ID}',
};

/**
 * Example: Update ProductDetails component
 * 
 * Replace this:
 * const slug = productName?.toLowerCase().replace(/\s+/g, '-') ?? "";
 * 
 * With this:
 * const slug = productName?.toLowerCase().replace(/\s+/g, '-') ?? "";
 * const productURLs = useShopifyProductURLs();
 * const productURL = getProductURL(slug, productURLs.productURLs);
 */

/**
 * Extract Shopify ID from URL
 * 
 * Usage:
 * const url = "/products/rina-lemon/gid%3A%2F%2Fshopify%2FProduct%2F15425691156825";
 * const gid = extractShopifyIdFromURL(url);
 * // Returns: gid://shopify/Product/15425691156825
 */
export function extractShopifyIdFromURL(url: string) {
  const parts = url.split('/');
  if (parts.length >= 3) {
    const encodedGid = parts[parts.length - 1];
    return decodeShopifyId(encodedGid);
  }
  return null;
}

/**
 * Test: Verify all 10 products have unique URLs
 * 
 * Run this in browser console to check:
 */
export async function testProductURLUniqueness() {
  const urls = await getAllProductURLs();
  
  console.log('🧪 Testing Product URL Uniqueness');
  console.log('─'.repeat(80));
  
  const uniqueURLs = new Set(urls.map(p => p.url));
  const uniqueIDs = new Set(urls.map(p => p.id));
  
  console.log(`Total Products: ${urls.length}`);
  console.log(`Unique URLs: ${uniqueURLs.size}`);
  console.log(`Unique IDs: ${uniqueIDs.size}`);
  
  if (uniqueURLs.size === urls.length && uniqueIDs.size === urls.length) {
    console.log('✅ All products have unique URLs and IDs!');
  } else {
    console.log('⚠️ Warning: Duplicate URLs or IDs detected!');
  }
  
  // Display all products
  urls.forEach((product, index) => {
    console.log(`\n${index + 1}. ${product.title}`);
    console.log(`   ID: ${product.id}`);
    console.log(`   URL: ${product.url}`);
  });
  
  return urls;
}

/**
 * Fetch specific product by handle with full URL
 * 
 * Usage:
 * const product = await getProductByHandleWithURL('rina-lemon');
 * // Returns product data with URL included
 */
export async function getProductByHandleWithURL(handle: string) {
  const urls = await getAllProductURLs();
  const product = urls.find(p => p.handle === handle);
  return product || null;
}

export default {
  getProductURL,
  extractShopifyIdFromURL,
  testProductURLUniqueness,
  getProductByHandleWithURL,
  URL_MIGRATION_MAP,
};
