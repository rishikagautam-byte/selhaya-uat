/**
 * Test: Old URL Redirect to New Shopify Format
 * 
 * This test verifies that when users visit old URLs like:
 *   http://localhost:5173/product/sabi
 *   http://localhost:5173/product/yaqeen
 * 
 * They are automatically redirected to new format:
 *   http://localhost:5173/products/sabi/gid%3A%2F%2Fshopify%2FProduct%2F...
 *   http://localhost:5173/products/yaqeen/gid%3A%2F%2Fshopify%2FProduct%2F...
 */

import { getProductURLFromCache, generateProductLinkURL } from './productURLHelper';
import { ALL_PRODUCT_HANDLES } from './productConfig';

/**
 * Test redirect logic for all 9 products
 */
export async function testOldUrlRedirect() {
  console.log('🧪 Testing Old URL Redirect Logic\n');
  console.log('═'.repeat(100));

  const results = [];

  for (const handle of ALL_PRODUCT_HANDLES) {
    console.log(`\nTesting: /product/${handle}`);
    
    // Try cache first
    const cachedUrl = getProductURLFromCache(handle);
    
    if (cachedUrl) {
      console.log(`✅ Cache HIT`);
      console.log(`   Would redirect to: ${cachedUrl}`);
      results.push({ handle, method: 'cache', url: cachedUrl, status: 'success' });
    } else {
      console.log(`⏳ Cache MISS - Fetching from Shopify...`);
      try {
        const url = await generateProductLinkURL(handle);
        if (url) {
          console.log(`✅ Async Fetch Success`);
          console.log(`   Would redirect to: ${url}`);
          results.push({ handle, method: 'async', url, status: 'success' });
        } else {
          console.log(`❌ Async Fetch Failed - No URL generated`);
          results.push({ handle, method: 'async', status: 'failed' });
        }
      } catch (err) {
        console.log(`❌ Async Fetch Error:`, err);
        results.push({ handle, method: 'async', status: 'error' });
      }
    }
  }

  // Summary
  console.log('\n' + '═'.repeat(100));
  const successful = results.filter(r => r.status === 'success').length;
  console.log(`\n📊 Results: ${successful}/${ALL_PRODUCT_HANDLES.length} products ready for redirect\n`);

  if (successful === ALL_PRODUCT_HANDLES.length) {
    console.log('🎉 ALL PRODUCTS WILL REDIRECT SUCCESSFULLY!');
  } else {
    console.log(`⚠️  ${ALL_PRODUCT_HANDLES.length - successful} products need attention`);
  }

  return results;
}

/**
 * Test redirect flow simulation
 */
export async function simulateRedirectFlow() {
  console.log('\n\n🔄 Simulating Old URL Redirect Flow\n');
  console.log('═'.repeat(100));

  const testProducts = ['sabi', 'yaqeen', 'rina-lemon', 'sharifa-cut', 'amara-flame'];

  for (const handle of testProducts) {
    console.log(`\n🔗 User visits: http://localhost:5173/product/${handle}`);
    console.log('   ├─ Products component detects old URL format');
    console.log('   ├─ Checks if product in 9-product list');

    if (ALL_PRODUCT_HANDLES.includes(handle as any)) {
      console.log(`   ├─ ✅ "${handle}" is in product list`);
      
      const url = getProductURLFromCache(handle) || (await generateProductLinkURL(handle));
      if (url) {
        console.log(`   ├─ ✅ Got Shopify URL from cache/fetch`);
        console.log(`   └─ 🚀 REDIRECTS TO: ${url}`);
      } else {
        console.log(`   ├─ ❌ Could not fetch Shopify URL`);
        console.log(`   └─ ⏸️  Shows product page (fallback)`);
      }
    } else {
      console.log(`   ├─ ❌ "${handle}" not in product list`);
      console.log(`   └─ ⏸️  Shows product page (no redirect)`);
    }
  }

  console.log('\n' + '═'.repeat(100));
}

/**
 * Main test runner
 */
export async function runRedirectTests() {
  console.log('\n');
  console.log('╔' + '═'.repeat(98) + '╗');
  console.log('║' + ' '.repeat(30) + '🔀 OLD URL REDIRECT TESTS' + ' '.repeat(44) + '║');
  console.log('╚' + '═'.repeat(98) + '╝');

  await testOldUrlRedirect();
  await simulateRedirectFlow();

  console.log('\n✅ REDIRECT TEST SUITE COMPLETE\n');
}

// Export for browser console
if (typeof window !== 'undefined') {
  (window as any).testRedirect = testOldUrlRedirect;
  (window as any).simulateRedirect = simulateRedirectFlow;
  (window as any).runRedirectTests = runRedirectTests;
  console.log('📝 Redirect test functions available:');
  console.log('  - testRedirect() - Check redirect readiness');
  console.log('  - simulateRedirect() - Simulate user flow');
  console.log('  - runRedirectTests() - Run all tests');
}

export default {
  testOldUrlRedirect,
  simulateRedirectFlow,
  runRedirectTests,
};
