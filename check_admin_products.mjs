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
const accessToken = process.env.VITE_SHOPIFY_ACCESS_TOKEN?.trim(); // Admin API token

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

async function checkAdminProducts() {
  try {
    console.log('🔍 Checking Shopify Admin API for ALL products...\n');
    const response = await fetch(`https://${shopDomain}/admin/api/2024-10/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
      body: JSON.stringify({ query }),
    });

    const json = await response.json();
    
    if (json.errors) {
      console.error('❌ Error:', json.errors);
      return;
    }

    const products = json?.data?.products?.edges || [];
    
    console.log(`✅ Found ${products.length} products in Admin\n`);
    products.forEach(({ node }, i) => {
      console.log(`${(i+1).toString().padStart(3, ' ')}. ${node.title.padEnd(30)} | ${node.handle}`);
    });
    
    console.log('\n🔍 Checking for HAYA products:');
    const hayaKeywords = ['sharifa', 'safa', 'malika', 'noor'];
    const hayaProducts = products.filter(({ node }) => 
      hayaKeywords.some(kw => node.title.toLowerCase().includes(kw) || node.handle.toLowerCase().includes(kw))
    );
    
    if (hayaProducts.length > 0) {
      console.log(`✅ Found ${hayaProducts.length} HAYA products:\n`);
      hayaProducts.forEach(({ node }) => {
        console.log(`  ✓ ${node.title} (handle: ${node.handle})`);
      });
    } else {
      console.log('❌ No HAYA products found');
    }
  } catch (e) {
    console.error("Error:", e.message);
  }
}

await checkAdminProducts();
