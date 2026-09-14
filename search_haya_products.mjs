import fs from 'fs';

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
  products(first: 250) {
    edges {
      node {
        id
        title
        handle
      }
    }
  }
}`;

async function listAllProducts() {
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
    
    console.log(`\n✅ Found ${products.length} products in Storefront API:\n`);
    products.forEach(({ node }, i) => {
      console.log(`${(i+1).toString().padStart(2, ' ')}. ${node.title.padEnd(30)} | handle: ${node.handle.padEnd(30)} | ${node.id}`);
    });
    
    console.log('\n🔍 Searching for HAYA products...');
    const hayaProducts = products.filter(({ node }) => 
      node.title.toLowerCase().includes('sharifa') || 
      node.title.toLowerCase().includes('safa') ||
      node.title.toLowerCase().includes('malika') ||
      node.title.toLowerCase().includes('noor')
    );
    
    if (hayaProducts.length > 0) {
      console.log(`✅ Found ${hayaProducts.length} HAYA products:`);
      hayaProducts.forEach(({ node }) => {
        console.log(`  - ${node.title}: handle="${node.handle}" → ${node.id}`);
      });
    } else {
      console.log('❌ No HAYA products found in Storefront API');
    }
  } catch (e) {
    console.error("Error:", e.message);
  }
}

await listAllProducts();
