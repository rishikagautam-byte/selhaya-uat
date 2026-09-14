/**
 * src/lib/productImages.ts
 *
 * Single source of truth for ALL product data (image, name, price, collection).
 * Every component — Search, ViewHistory, ViewFavorites, Cart recommended —
 * uses this so the image always matches what ProductDetails shows.
 */

import { productPagesData } from "../features/productPage/productPagesData";
import { pinkCollectionProductsData } from "../features/productPage/pinkCollectionProductsData.ts";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProductEntry {
  slug: string;
  name: string;
  image: string; // same image ProductDetails shows as first image
  price: string;
  collection: string;
}

// ─── Maps ─────────────────────────────────────────────────────────────────────

const shopifyCanonicalSlugs: string[] = [
  "malika-drape", "sharifa-cut", "safa-bloom", "noor-flow",
  "yaqeen", "amara-flame", "sabi", "ziya-blue", "sakura", "rina-lemon",
];

const pinkSlugs: string[] = [
  "tatiana", "seraphina", "clara", "halime", "farhana",
];

const collectionMap: Record<string, string> = {
  "malika-drape": "HAYA ROBES",
  "sharifa-cut":  "HAYA ROBES",
  "safa-bloom":   "HAYA ROBES",
  "noor-flow":    "HAYA ROBES",
  yaqeen:         "HERITAGE EDITION",
  "amara-flame":  "WAVE OF LIGHTS",
  sabi:           "WAVE OF LIGHTS",
  "ziya-blue":    "WAVE OF LIGHTS",
  sakura:         "WAVE OF LIGHTS",
  "rina-lemon":   "WAVE OF LIGHTS",
  tatiana:        "PINK COLLECTION",
  seraphina:      "PINK COLLECTION",
  clara:          "PINK COLLECTION",
  halime:         "PINK COLLECTION",
  farhana:        "PINK COLLECTION",
};

const priceMap: Record<string, string> = {
  "malika-drape": "£ 4,700",
  "sharifa-cut":  "£ 4,700",
  "safa-bloom":   "£ 4,700",
  "noor-flow":    "£ 4,700",
  yaqeen:         "£ 5,200",
  "amara-flame":  "£ 4,900",
  sabi:           "£ 4,600",
  "ziya-blue":    "£ 4,800",
  sakura:         "£ 4,500",
  "rina-lemon":   "£ 4,700",
  tatiana:        "£ 4,800",
  seraphina:      "£ 4,800",
  clara:          "£ 4,800",
  halime:         "£ 4,800",
  farhana:        "£ 4,800",
};

// ─── Master list ──────────────────────────────────────────────────────────────

/**
 * All 15 products (5 Pink + 10 Shopify) with their definitive first image.
 * Pink first, then Shopify.
 */
export const allProducts: ProductEntry[] = [
  // Pink Collection — local assets from pinkCollectionProductsData
  ...pinkSlugs.map((slug) => {
    const d = pinkCollectionProductsData[slug];
    return {
      slug,
      name:       d.title,
      image:      d.images[0]?.url ?? "",
      price:      d.price,
      collection: "PINK COLLECTION",
    };
  }),

  // Shopify products — local mainImageSrc from productPagesData (same fallback
  // that ProductDetails uses when the Shopify API is unavailable)
  // For HAYA products: use id:2 (second item) for display since id:1 is video
  ...shopifyCanonicalSlugs.map((slug) => {
    const items = productPagesData[slug];
    const hayaProducts = ["malika-drape", "sharifa-cut", "safa-bloom", "noor-flow"];
    const displayItemIndex = hayaProducts.includes(slug) ? 1 : 0; // Use id:2 for HAYA, id:1 for others
    return {
      slug,
      name:       items?.[0]?.title ?? slug.replace(/-/g, " ").toUpperCase(),
      image:      items?.[displayItemIndex]?.mainImageSrc ?? "",
      price:      priceMap[slug] ?? "$ 4700",
      collection: collectionMap[slug] ?? "SELHAYA EDITION",
    };
  }),
];

/** Quick lookup: slug → ProductEntry */
export const productBySlug: Record<string, ProductEntry> =
  Object.fromEntries(allProducts.map((p) => [p.slug, p]));

/** Returns the definitive first image for a product slug (or empty string). */
export function getProductImage(slug: string): string {
  return productBySlug[slug]?.image ?? "";
}
