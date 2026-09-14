import { fetchShopifyProductByHandle } from './src/lib/shopify.js';

async function test() {
  const product = await fetchShopifyProductByHandle("the-sakura", 10);
  console.log("Product:", product);
}

test();
