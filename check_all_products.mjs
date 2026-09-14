import fetch from 'node-fetch';

const store = 'selhaya.myshopify.com';
const token = '8631fdc9ad53208f1eea8d1851cdf1ec';
const apiVersion = '2024-10';

const query = `query ProductsList($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id
        handle
        title
      }
    }
  }
}`;

const response = await fetch(`https://${store}/api/${apiVersion}/graphql.json`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token,
  },
  body: JSON.stringify({ query, variables: { first: 250 } }),
});

const json = await response.json();
const products = json?.data?.products?.edges || [];

console.log(`\n=== ALL ${products.length} Shopify Products ===\n`);
products.forEach(({ node }) => {
  console.log(`Handle: "${node.handle}"`);
});

// Check specifically for the 4 HAYA products we're looking for
console.log('\n=== Looking for HAYA Products ===');
const expectedHandles = ['the-safa-wrap', 'the-sharifa-cut', 'the-malika-drape', 'the-noor-flow'];
expectedHandles.forEach(handle => {
  const found = products.find(p => p.node.handle === handle);
  if (found) {
    console.log(`✓ Found: ${handle}`);
  } else {
    console.log(`✗ Missing: ${handle}`);
  }
});
