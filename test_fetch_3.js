async function test() {
  const shop = 'b15301-8f.myshopify.com';
  const token = '15b9e3e9825f95c0b3d2cf5891b86db2';
  
  const query = `query {
    products(first: 20) {
      edges {
        node {
          handle
          title
        }
      }
    }
  }`;
  
  const res = await fetch('https://' + shop + '/api/2024-10/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token
    },
    body: JSON.stringify({ query })
  });
  if (res.ok) console.log(JSON.stringify(await res.json(), null, 2));
}
test();
