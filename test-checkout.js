import fs from 'fs';

const shop = "b15301-8f.myshopify.com";
const token = "8631fdc9ad53208f1eea8d1851cdf1ec";
const apiVersion = "2024-10";

// Replace with checkoutCreate mutation exactly as in our code
const checkoutCreateMutation = `mutation checkoutCreate($input: CheckoutCreateInput!) {
  checkoutCreate(input: $input) {
    checkout {
      id
      webUrl
    }
    checkoutUserErrors {
      code
      field
      message
    }
  }
}`;

// Fetch the variant IDs
async function getVariantIds() {
  const query = `query {
    products(first: 50) {
      edges {
        node {
          handle
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }`;
  
  const response = await fetch(`https://${shop}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query }),
  });
  const data = await response.json();
  const variants = {};
  for (const edge of data.data.products.edges) {
    variants[edge.node.handle] = edge.node.variants.edges[0].node.id;
  }
  return variants;
}

async function run() {
  const variants = await getVariantIds();
  console.log("Variants found:", variants);
  
  // We want to test Sakura (the-sakura) and Yaqeen (the-yaqeen-abaya)
  const lineItems = [
    { variantId: variants['the-sakura'], quantity: 1 },
    { variantId: variants['the-yaqeen-abaya'], quantity: 1 }
  ];
  
  const variables = {
    input: {
      lineItems: lineItems
    }
  };
  
  console.log("Sending checkout payload:", JSON.stringify(variables, null, 2));

  const response = await fetch(`https://${shop}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({
      query: checkoutCreateMutation,
      variables,
    }),
  });
  
  if (!response.ok) {
    console.error("HTTP Error", response.status, await response.text());
    return;
  }
  
  const json = await response.json();
  console.log("Response:", JSON.stringify(json, null, 2));
}

run().catch(console.error);
