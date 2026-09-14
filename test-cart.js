import fs from 'fs';

const shop = "b15301-8f.myshopify.com";
const token = "8631fdc9ad53208f1eea8d1851cdf1ec";
const apiVersion = "2024-10";

const cartCreateMutation = `mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
    }
    userErrors {
      field
      message
    }
  }
}`;

async function run() {
  const lineItems = [
    { merchandiseId: 'gid://shopify/ProductVariant/54647307927897', quantity: 1 }
  ];
  
  const variables = {
    input: {
      lines: lineItems
    }
  };
  
  const response = await fetch(`https://${shop}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({
      query: cartCreateMutation,
      variables,
    }),
  });
  
  const json = await response.json();
  console.log("Cart Create Response:", JSON.stringify(json, null, 2));
}

run().catch(console.error);
