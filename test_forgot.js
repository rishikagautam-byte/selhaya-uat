const fetch = require('node-fetch');
require('dotenv').config();
async function test() {
  const query = 'mutation customerRecover($email: String!) { customerRecover(email: $email) { customerUserErrors { code field message } } }';
  const token = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
  const store = process.env.VITE_SHOPIFY_STORE;
  const url = store.includes('myshopify.com') ? 'https://' + store + '/api/2024-10/graphql.json' : 'https://' + store + '.myshopify.com/api/2024-10/graphql.json';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token },
    body: JSON.stringify({ query, variables: { email: 'test@example.com' } })
  });
  const json = await res.json();
  console.log(JSON.stringify(json, null, 2));
}
test();
