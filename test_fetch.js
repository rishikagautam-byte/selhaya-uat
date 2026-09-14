async function test() {
  const shop = 'b15301-8f.myshopify.com';
  const token = '8631fdc9ad53208f1cea8d1851cdf1cc';
  
  const queries = [
    '{ product(handle: "ziya-blue") { title vendor priceRange { minVariantPrice { amount } } } }',
    '{ product(handle: "ziya blue") { title vendor priceRange { minVariantPrice { amount } } } }'
  ];
  
  for(let q of queries) {
      const res = await fetch('https://' + shop + '/api/2024-10/graphql.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': token
        },
        body: JSON.stringify({ query: q })
      });
      console.log('Query:', q);
      console.log('Status:', res.status);
      if (res.ok) {
        const data = await res.json();
        console.log(JSON.stringify(data, null, 2));
      }
  }
}
test();
