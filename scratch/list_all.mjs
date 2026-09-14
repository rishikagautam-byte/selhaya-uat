const shopDomain = 'b15301-8f.myshopify.com';
const token = '8631fdc9ad53208f1eea8d1851cdf1ec';

const query = `
query {
  products(first: 250) {
    edges {
      node {
        id
        handle
        title
      }
    }
  }
}`;

fetch(`https://${shopDomain}/api/2024-10/graphql.json`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token
  },
  body: JSON.stringify({ query })
})
  .then(r => r.json())
  .then(d => console.log(JSON.stringify(d.data.products.edges.map(e => e.node), null, 2)));
