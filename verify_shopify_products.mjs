import fetch from 'node-fetch';

const store = 'selhaya.myshopify.com';
const token = '8631fdc9ad53208f1eea8d1851cdf1ec';
const apiVersion = '2024-10';

async function getAllProducts() {
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
  return json?.data?.products?.edges || [];
}

const products = await getAllProducts();
console.log(`\n=== ALL ${products.length} SHOPIFY PRODUCTS ===\n`);
products.forEach(({ node }) => {
  console.log(`${node.handle}`);
});

console.log('\n=== Checking HAYA Products ===');
const hayaLookup = ['the-malika-drape', 'the-noor-flow', 'the-sharifa-cut', 'the-safa-wrap'];
hayaLookup.forEach(handle => {
  const found = products.find(p => p.node.handle === handle);
  console.log(`${handle}: ${found ? '✓ FOUND' : '✗ MISSING'}`);
});
