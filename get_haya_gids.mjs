import fs from 'fs';

// Load .env manually - simpler regex
const envFile = fs.readFileSync('.env', 'utf-8');
const lines = envFile.split('\n');
console.log(`[DEBUG] Found ${lines.length} lines`);

for (const line of lines) {
  if (!line.trim() || line.trim().startsWith('#')) continue;
  const idx = line.indexOf('=');
  if (idx > 0) {
    const key = line.substring(0, idx).trim();
    const val = line.substring(idx + 1).trim();
    process.env[key] = val;
    if (key.includes('SHOPIFY') || key.includes('VITE')) {
      console.log(`[DEBUG] Set: ${key}`);
    }
  }
}

const shop = process.env.VITE_SHOPIFY_STORE?.trim();
const token = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN?.trim() || process.env.VITE_SHOPIFY_ACCESS_TOKEN?.trim();

console.log('[DEBUG] Shop:', shop);
console.log('[DEBUG] Token exists:', !!token);

if (!shop || !token) {
  console.error("Missing VITE_SHOPIFY_STORE or tokens");
  process.exit(1);
}

const shopDomain = shop.includes(".myshopify.com") ? shop : `${shop}.myshopify.com`;

const productQuery = `query ProductByHandle($handle: String!) {
  product(handle: $handle) {
    id
    title
    handle
  }
}`;

const handles = [
  "the-sharifa-cut",
  "the-safa-bloom",
  "malika-drape",
  "noor-flow"
];

async function getProductGids() {
  console.log('[DEBUG] Starting getProductGids...');
  for (const handle of handles) {
    console.log(`[DEBUG] Fetching ${handle}...`);
    try {
      const response = await fetch(`https://${shopDomain}/api/2024-10/graphql.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": token,
        },
        body: JSON.stringify({
          query: productQuery,
          variables: { handle },
        }),
      });

      console.log(`[DEBUG] Got response for ${handle}, status:`, response.status);
      const json = await response.json();
      console.log(`[DEBUG] Response data:`, JSON.stringify(json).substring(0, 200));
      const product = json?.data?.product;
      
      if (product) {
        console.log(`✓ ${handle}: ${product.id}`);
      } else if (json?.errors) {
        console.log(`✗ ${handle}: ERROR -`, json.errors[0]?.message);
      } else {
        console.log(`✗ ${handle}: No product data`);
      }
    } catch (e) {
      console.log(`✗ ${handle}: Exception -`, e.message);
    }
  }
  console.log('[DEBUG] Done with getProductGids');
}

await getProductGids();
