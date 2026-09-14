/**
 * Test script to fetch all products from Shopify and generate product URLs
 * This demonstrates how to get all 10 products with their unique Shopify IDs
 * and generate URLs in the format: /products/{handle}/{encoded-gid}
 */

// Using Shopify Storefront API (works in browser via VITE env)
const STORE = 'selhaya.myshopify.com';
const TOKEN = 'YOUR_VITE_SHOPIFY_ACCESS_TOKEN'; // from .env VITE_SHOPIFY_ACCESS_TOKEN
const API_VERSION = '2024-10';

/**
 * Fetch all products from Shopify (up to 10)
 */
async function getAllProductsFromShopify() {
  try {
    const query = `query ProductsList($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            handle
            title
            description
            vendor
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }`;

    const response = await fetch(
      `https://${STORE}/api/${API_VERSION}/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': TOKEN,
        },
        body: JSON.stringify({
          query,
          variables: { first: 10 }, // Fetch 10 products
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return [];
    }

    const edges = data?.data?.products?.edges;
    if (!edges) {
      console.error('No products found');
      return [];
    }

    return edges.map(({ node }) => node);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Encode Shopify product ID to URL-safe format
 * Example: gid://shopify/Product/15425691156825 → gid%3A%2F%2Fshopify%2FProduct%2F15425691156825
 */
function encodeShopifyId(gid) {
  return encodeURIComponent(gid);
}

/**
 * Generate product URL with handle and encoded ID
 * Format: /products/{handle}/{encodedGid}
 */
function generateProductURL(handle, gid) {
  const encodedGid = encodeShopifyId(gid);
  return `/products/${handle}/${encodedGid}`;
}

/**
 * Main function to get all product URLs
 */
async function getAllProductURLs() {
  console.log('🚀 Fetching all products from Shopify...\n');

  const products = await getAllProductsFromShopify();

  if (products.length === 0) {
    console.log('❌ No products found');
    return [];
  }

  console.log(`✅ Found ${products.length} products\n`);
  console.log('Product URLs with Shopify IDs:');
  console.log('─'.repeat(80));

  const productURLs = products.map((product, index) => {
    const url = generateProductURL(product.handle, product.id);
    const price = product.priceRange?.minVariantPrice
      ? `$${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}`
      : 'N/A';

    // Display product info
    console.log(`\n${index + 1}. ${product.title}`);
    console.log(`   Handle: ${product.handle}`);
    console.log(`   Shopify ID: ${product.id}`);
    console.log(`   Price: ${price}`);
    console.log(`   URL: ${url}`);

    return {
      handle: product.handle,
      id: product.id,
      title: product.title,
      price,
      url,
    };
  });

  console.log('\n' + '─'.repeat(80));
  console.log(`\nTotal Products: ${productURLs.length}`);

  // Return as JSON for easy copying/testing
  console.log('\n📋 JSON Format (copy for testing):');
  console.log(JSON.stringify(productURLs, null, 2));

  return productURLs;
}

/**
 * Usage in React component (example):
 * 
 * import { getAllProductURLs } from '@/lib/shopify';
 * 
 * useEffect(() => {
 *   const fetchURLs = async () => {
 *     const urls = await getAllProductURLs();
 *     console.log('Product URLs:', urls);
 *     // Use URLs in your app
 *   };
 *   
 *   fetchURLs();
 * }, []);
 */

// Run the function
// Uncomment below to execute in Node.js or browser console
// getAllProductURLs();

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getAllProductURLs, generateProductURL, encodeShopifyId };
}
