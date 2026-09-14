async function test() {
  const shop = 'b15301-8f.myshopify.com';
  const token = '15b9e3e9825f95c0b3d2cf5891b86db2';
  
  const query = `query {
    product(handle: "ziya-blue") {
      title
      descriptionHtml
      description
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
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
  console.log('Status:', res.status);
  if (res.ok) console.log(JSON.stringify(await res.json(), null, 2));
}
test();
