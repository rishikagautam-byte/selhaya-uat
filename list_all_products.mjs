import fs from 'fs';

// Load .env manually - simpler regex
const envFile = fs.readFileSync('.env', 'utf-8');
const lines = envFile.split('\n');

for (const line of lines) {
  if (!line.trim() || line.trim().startsWith('#')) continue;
  const idx = line.indexOf('=');
  if (idx > 0) {
    const key = line.substring(0, idx).trim();
    const val = line.substring(idx + 1).trim();
    process.env[key] = val;
  }
}

const shop = process.env.VITE_SHOPIFY_STORE?.trim();
const token = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN?.trim() || process.env.VITE_SHOPIFY_ACCESS_TOKEN?.trim();

const shopDomain = shop.includes(".myshopify.com") ? shop : `${shop}.myshopify.com`;

const query = `query {
  products(first: 100) {
    edges {
      node {
        id
        title
        handle
      }
    }
  }
}`;

async function listProducts() {
  try {
    const response = await fetch(`https://${shopDomain}/api/2024-10/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query }),
    });

    const json = await response.json();
    const products = json?.data?.products?.edges || [];
    
    console.log(`Found ${products.length} products:\n`);
    products.forEach(({ node }) => {
      console.log(`${node.title.padEnd(30)} | ${node.handle.padEnd(30)} | ${node.id}`);
    });
  } catch (e) {
    console.error("Error:", e.message);
  }
}

await listProducts();
