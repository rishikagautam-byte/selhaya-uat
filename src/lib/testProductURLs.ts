/**
 * Test file to verify all 9 products have working URLs
 * Run this in browser console to test
 */

import { 
  getAllProductURLs
} from './shopify';
import { ALL_PRODUCT_HANDLES, PRODUCT_NAMES } from './productConfig';

/**
 * Test all 9 products and verify URLs are generated
 */
export async function testAll9ProductURLs() {
  console.log('🧪 Testing All 9 Product URLs...\n');
  console.log('Products to test:', ALL_PRODUCT_HANDLES);
  console.log('─'.repeat(100));

  try {
    // Fetch all products from Shopify
    const allProductURLs = await getAllProductURLs();
    
    console.log(`\n✅ Successfully fetched ${allProductURLs.length} products from Shopify\n`);

    // Test each of our 9 products
    const results = [];
    for (const handle of ALL_PRODUCT_HANDLES) {
      const product = allProductURLs.find(p => p.handle === handle);
      
      if (product) {
        const name = PRODUCT_NAMES[handle as keyof typeof PRODUCT_NAMES];
        console.log(`✅ ${name}`);
        console.log(`   Handle: ${handle}`);
        console.log(`   Shopify ID: ${product.id}`);
        console.log(`   Price: ${product.price}`);
        console.log(`   URL: ${product.url}`);
        console.log('');
        
        results.push({
          handle,
          name,
          id: product.id,
          url: product.url,
          price: product.price,
          status: 'SUCCESS',
        });
      } else {
        console.log(`❌ ${PRODUCT_NAMES[handle as keyof typeof PRODUCT_NAMES]} - NOT FOUND IN SHOPIFY`);
        console.log(`   Handle: ${handle}\n`);
        
        results.push({
          handle,
          name: PRODUCT_NAMES[handle as keyof typeof PRODUCT_NAMES],
          status: 'NOT_FOUND',
        });
      }
    }

    // Summary
    console.log('─'.repeat(100));
    const successful = results.filter(r => r.status === 'SUCCESS').length;
    console.log(`\n📊 Summary: ${successful}/${ALL_PRODUCT_HANDLES.length} products have URLs\n`);

    if (successful === ALL_PRODUCT_HANDLES.length) {
      console.log('🎉 ALL 9 PRODUCTS HAVE VALID SHOPIFY URLs!');
    } else {
      console.warn(`⚠️  ${ALL_PRODUCT_HANDLES.length - successful} products missing Shopify URLs`);
    }

    return results;
  } catch (error) {
    console.error('❌ Error testing product URLs:', error);
    return null;
  }
}

/**
 * Test URL display
 */
export function testURLDisplay() {
  console.log('\n🧪 URL Format Examples...\n');

  const examples = [
    { handle: "rina-lemon", product: "RINA LEMON" },
    { handle: "yaqeen", product: "YAQEEN" },
    { handle: "sharifa-cut", product: "SHARIFA CUT" },
  ];

  examples.forEach(({ handle, product }) => {
    console.log(`${product}:`);
    console.log(`  /products/${handle}/gid%3A%2F%2Fshopify%2FProduct%2F...`);
  });
}

/**
 * Main test runner
 */
export async function runAllTests() {
  console.log('\n🚀 RUNNING ALL PRODUCT URL TESTS\n');
  console.log('═'.repeat(100));
  
  await testAll9ProductURLs();
  testURLDisplay();
  
  console.log('\n═'.repeat(100));
  console.log('✅ TEST SUITE COMPLETE\n');
}

// Export for browser console usage
if (typeof window !== 'undefined') {
  (window as any).testProductURLs = testAll9ProductURLs;
  (window as any).testAllProductURLs = runAllTests;
  console.log('📝 Available test functions:');
  console.log('  - testProductURLs() - Test all 9 products');
  console.log('  - testAllProductURLs() - Run complete test suite');
}

export default {
  testAll9ProductURLs,
  testURLDisplay,
  runAllTests,
};
