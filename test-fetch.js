import fs from 'fs';

const shop = "b15301-8f.myshopify.com";
const token = "8631fdc9ad53208f1eea8d1851cdf1ec";
const apiVersion = "2024-10";

const productsQuery = `query ProductsList($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id
        handle
        title
        variants(first: 5) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    }
  }
}`;

async function run() {
  const response = await fetch(`https://${shop}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({
      query: productsQuery,
      variables: { first: 50 },
    }),
  });
  
  const data = await response.json();
  const products = data.data.products.edges.map(e => ({
    title: e.node.title,
    handle: e.node.handle,
    variants: e.node.variants.edges.map(v => v.node.title).join(", ")
  }));
  console.log(JSON.stringify(products, null, 2));
}

run().catch(console.error);
