## Implementation Guide: Shopify Product URLs with Unique IDs

### Overview
Replace local URLs (`http://localhost:5173/product/malika-drape`) with Shopify product URLs that include unique product IDs.

**Format:**
```
/products/{handle}/{encoded-shopify-gid}

Example:
/products/rina-lemon/gid%3A%2F%2Fshopify%2FProduct%2F15425691156825
```

---

## Files Updated

### 1. `src/lib/shopify.ts`
✅ **Updates Made:**
- Added `id` field to ShopifyProductData interface
- Updated GraphQL queries to fetch product IDs
- Added `getAllProductURLs()` - Fetch all 10 products with URLs
- Added `encodeShopifyId()` - Convert gid to URL-safe format
- Added `decodeShopifyId()` - Convert URL-safe gid back to original
- Added `generateProductURL()` - Generate /products/{handle}/{gid} format

### 2. `test_shopify_urls.js`
✅ **New test file created**
- Function to fetch all 10 products from Shopify
- Generates and logs product URLs
- Shows unique product IDs
- Returns JSON format for verification

### 3. `src/lib/shopifyURLMigration.ts`
✅ **New migration helper created**
- `useShopifyProductURLs()` - React hook to fetch URLs
- `getProductURL()` - Get URL by handle
- `extractShopifyIdFromURL()` - Extract ID from URL
- `testProductURLUniqueness()` - Verify all products have unique URLs
- `URL_MIGRATION_MAP` - Reference of old → new URLs

---

## Implementation Steps

### Step 1: Verify Environment Variables

Ensure `.env` has Shopify credentials:

```env
VITE_SHOPIFY_STORE=b15301-8f
VITE_SHOPIFY_ACCESS_TOKEN=15b9e3e9825f95c0b3d2cf5891b86db2
VITE_SHOPIFY_STOREFRONT_TOKEN=8631fdc9ad53208f1eea8d1851cdf1ec
```

✅ Already configured in your `.env`

---

### Step 2: Test Fetching Product URLs

Run test in browser console:

```javascript
// Import function
import { getAllProductURLs } from '@/lib/shopify';

// Fetch all 10 products
const productURLs = await getAllProductURLs();

// View results
console.log(productURLs);

// Expected output:
/*
[
  {
    handle: "rina-lemon",
    id: "gid://shopify/Product/15425691156825",
    url: "/products/rina-lemon/gid%3A%2F%2Fshopify%2FProduct%2F15425691156825",
    title: "RINA LEMON",
    price: "$4700"
  },
  // ... 9 more products
]
*/
```

---

### Step 3: Update Routes/Navigation

**Replace all occurrences of local URLs:**

**Before:**
```typescript
// Old navigation links
<Link to={`/product/${handle}`}>View Product</Link>

// Old URLs
const productUrl = `http://localhost:5173/product/${productName}`;
```

**After:**
```typescript
import { getProductURL } from '@/lib/shopifyURLMigration';
import { useShopifyProductURLs } from '@/lib/shopifyURLMigration';

function ProductLink({ productName }) {
  const { productURLs } = useShopifyProductURLs();
  const handle = productName.toLowerCase().replace(/\s+/g, '-');
  const url = getProductURL(handle, productURLs);
  
  return <Link to={url}>View Product</Link>;
}
```

---

### Step 4: Update ProductDetails Component

**Current code in ProductDetails.tsx:**

```typescript
// OLD
const slug = productName?.toLowerCase().replace(/\s+/g, '-') ?? "";

// NEW
import { useShopifyProductURLs, getProductURL } from '@/lib/shopifyURLMigration';

const ProductDetails: React.FC<ProductDetailsProps> = ({ productName, productItem }) => {
  const { productURLs, loading } = useShopifyProductURLs();
  const slug = productName?.toLowerCase().replace(/\s+/g, '-') ?? "";
  const shopifyProductUrl = getProductURL(slug, productURLs);
  
  // Use shopifyProductUrl in your component
  // Example: Share button, canonical URL, etc.
};
```

---

### Step 5: Update All Product URLs

**Files to update:**

1. **Search functionality** - `src/data/searchData.ts`
   ```typescript
   // OLD
   url: `/product/${slug}`
   
   // NEW
   url: `/products/${slug}/{encoded-gid}`
   ```

2. **Navigation menu** - Check all links pointing to products
   ```typescript
   // Update all product links
   ```

3. **Product cards** - Any component displaying product links
   ```typescript
   // Update link href attributes
   ```

4. **Checkout/Cart** - Update product URLs when linking back
   ```typescript
   // Update return URLs
   ```

---

## Testing

### Test 1: Verify All 10 Products Have Unique IDs

```javascript
import { testProductURLUniqueness } from '@/lib/shopifyURLMigration';

// Run in browser console
await testProductURLUniqueness();

// Should output: ✅ All products have unique URLs and IDs!
```

### Test 2: Extract ID from URL

```javascript
import { extractShopifyIdFromURL } from '@/lib/shopifyURLMigration';

const url = "/products/rina-lemon/gid%3A%2F%2Fshopify%2FProduct%2F15425691156825";
const gid = extractShopifyIdFromURL(url);
console.log(gid); // gid://shopify/Product/15425691156825
```

### Test 3: Fetch Specific Product

```javascript
import { getProductByHandleWithURL } from '@/lib/shopifyURLMigration';

const product = await getProductByHandleWithURL('rina-lemon');
console.log(product);

// Expected:
/*
{
  handle: "rina-lemon",
  id: "gid://shopify/Product/15425691156825",
  url: "/products/rina-lemon/gid%3A%2F%2Fshopify%2FProduct%2F15425691156825",
  title: "RINA LEMON",
  price: "$4700"
}
*/
```

---

## URL Encoding Reference

### Shopify GID Format
```
Decoded: gid://shopify/Product/15425691156825
Encoded: gid%3A%2F%2Fshopify%2FProduct%2F15425691156825

Character Mapping:
/ → %2F
: → %3A
```

### All 10 Products (Expected)

| Product | Handle | URL Format |
|---------|--------|-----------|
| MALIKA DRAPE | malika-drape | /products/malika-drape/gid%3A%2F%2Fshopify%2FProduct%2F{ID} |
| SHARIFA CUT | sharifa-cut | /products/sharifa-cut/gid%3A%2F%2Fshopify%2FProduct%2F{ID} |
| SAFA BLOOM | safa-bloom | /products/safa-bloom/gid%3A%2F%2Fshopify%2FProduct%2F{ID} |
| NOOR FLOW | noor-flow | /products/noor-flow/gid%3A%2F%2Fshopify%2FProduct%2F{ID} |
| YAQEEN | yaqeen | /products/yaqeen/gid%3A%2F%2Fshopify%2FProduct%2F{ID} |
| AMARA FLAME | amara-flame | /products/amara-flame/gid%3A%2F%2Fshopify%2FProduct%2F{ID} |
| SABI | sabi | /products/sabi/gid%3A%2F%2Fshopify%2FProduct%2F{ID} |
| ZIYA BLUE | ziya-blue | /products/ziya-blue/gid%3A%2F%2Fshopify%2FProduct%2F{ID} |
| SAKURA | sakura | /products/sakura/gid%3A%2F%2Fshopify%2FProduct%2F{ID} |
| RINA LEMON | rina-lemon | /products/rina-lemon/gid%3A%2F%2Fshopify%2FProduct%2F{ID} |

---

## Quick Start

### Option 1: Browser Console (Quick Test)

```javascript
// 1. Open browser console (F12)
// 2. Paste this:
import { getAllProductURLs, testProductURLUniqueness } from '/src/lib/shopify';

// 3. Run:
const urls = await getAllProductURLs();
await testProductURLUniqueness();
```

### Option 2: Node.js Test (Complete Verification)

```bash
# Run test file
node test_shopify_urls.js
```

---

## Troubleshooting

### Issue: No products returned
**Solution:** Verify Shopify credentials in `.env`
```env
VITE_SHOPIFY_STORE=b15301-8f
VITE_SHOPIFY_ACCESS_TOKEN=15b9e3e9825f95c0b3d2cf5891b86db2
```

### Issue: IDs not included in response
**Solution:** Verify GraphQL query includes `id` field
```graphql
query ProductsList($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id  ← Must include this
        handle
        title
      }
    }
  }
}
```

### Issue: Duplicate IDs
**Solution:** This shouldn't happen if using Shopify API correctly
- Check product count
- Verify API token permissions

---

## Summary

✅ **Updated:** `src/lib/shopify.ts` - Added ID support & URL generation
✅ **Created:** `test_shopify_urls.js` - Test/verification script
✅ **Created:** `src/lib/shopifyURLMigration.ts` - Migration helpers
✅ **Format:** `/products/{handle}/{encoded-gid}` with unique IDs
✅ **All 10 Products:** Supported with unique Shopify IDs

Next steps: Update routes/navigation in your app to use new URL format.
