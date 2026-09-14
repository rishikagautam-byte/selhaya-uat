const shopDomain = 'b15301-8f.myshopify.com';
const token = '8631fdc9ad53208f1eea8d1851cdf1ec';
const handles = ['malika-drape', 'the-malika-drape', 'sharifa-cut', 'the-sharifa-cut', 'noor-flow', 'the-noor-flow', 'safa-bloom', 'the-safa-wrap'];

const query = `
query($handle: String!) {
  product(handle: $handle) {
    id
    title
    priceRange {
      minVariantPrice {
        amount
      }
    }
  }
}`;

Promise.all(handles.map(handle =>
  fetch(`https://${shopDomain}/api/2024-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token
    },
    body: JSON.stringify({ query, variables: { handle } })
  })
    .then(r => r.json())
    .then(d => ({ handle, product: d.data?.product }))
)).then(res => console.log(JSON.stringify(res, null, 2)));
