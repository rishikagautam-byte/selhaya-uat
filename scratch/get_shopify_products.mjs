const shopDomain = 'b15301-8f.myshopify.com';
const token = '8631fdc9ad53208f1eea8d1851cdf1ec';
const apiVersion = '2024-10';

const query = `
query {
  products(first: 100) {
    edges {
      node {
        id
        handle
        title
        priceRange {
          minVariantPrice {
            amount
          }
        }
      }
    }
  }
}
`;

fetch(`https://${shopDomain}/api/${apiVersion}/graphql.json`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token
  },
  body: JSON.stringify({ query })
})
  .then(r => r.json())
  .then(d => console.log(JSON.stringify(d, null, 2)))
  .catch(console.error);
