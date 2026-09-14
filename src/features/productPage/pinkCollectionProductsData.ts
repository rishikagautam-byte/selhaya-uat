// Static product data for Pink Collection — mirrors the ShopifyProductData shape
// so ProductDetails.tsx can use it as a local fallback (no Shopify fetch needed).

import type { ShopifyProductData, ShopifyProductImage } from "../../lib/shopify";

import tatiana1 from "../../assets/main-product/products/tatiana/first.png";
import tatiana2 from "../../assets/main-product/products/tatiana/second.png";
import tatiana3 from "../../assets/main-product/products/tatiana/third.png";
import tatiana4 from "../../assets/main-product/products/tatiana/forth.png";

import sheraphina1 from "../../assets/main-product/products/sheraphina/first.png";
import sheraphina2 from "../../assets/main-product/products/sheraphina/second.png";
import sheraphina3 from "../../assets/main-product/products/sheraphina/third.png";
import sheraphina4 from "../../assets/main-product/products/sheraphina/forth.png";

import clara1 from "../../assets/main-product/products/clara/first.png";
import clara2 from "../../assets/main-product/products/clara/second.png";
import clara3 from "../../assets/main-product/products/clara/third.png";
import clara4 from "../../assets/main-product/products/clara/forth.png";

import halima1 from "../../assets/main-product/products/halima/first.png";
import halima2 from "../../assets/main-product/products/halima/second.png";
import halima3 from "../../assets/main-product/products/halima/third.png";
import halima4 from "../../assets/main-product/products/halima/forth.png";

import farhana1 from "../../assets/main-product/products/farhana/first.png";
import farhana2 from "../../assets/main-product/products/farhana/second.png";
import farhana3 from "../../assets/main-product/products/farhana/third.png";
import farhana4 from "../../assets/main-product/products/farhana/forth.png";

/** Slugs that belong to the Pink Collection — used to skip the Shopify API call. */
export const pinkCollectionSlugs = new Set<string>([
  "tatiana",
  "seraphina",
  "clara",
  "halime",
  "farhana",
]);

/**
 * Static Shopify-shaped data for all 5 Pink Collection products.
 * Keyed by the URL slug that appears in /product/:productName.
 */
export const pinkCollectionProductsData: Record<string, ShopifyProductData & { images: ShopifyProductImage[] }> = {
  tatiana: {
    title: "TATIANA",
    description:
      "A capsule created to honour women — their softness, their strength, and the quiet beauty they carry through every season of life. Modesty, here, is power and elevates her.",
    descriptionHtml:
      "<p>A capsule created to honour women — their softness, their strength, and the quiet beauty they carry through every season of life. Modesty, here, is power and elevates her.</p>",
    vendor: "PINK COLLECTION",
    collection: "ROSE OF RESILIENCE",
    price: "$ 4800",
    images: [
      { url: tatiana1, altText: "Tatiana – full look" },
      { url: tatiana2, altText: "Tatiana – detail" },
      { url: tatiana3, altText: "Tatiana – side view" },
      { url: tatiana4, altText: "Tatiana – close up" },
    ],
  },

  seraphina: {
    title: "SERAPHINA",
    description:
      "A form of quiet power. Seraphina fuses modest grace with structured British design thinking — worn over any style clothing, perfect for the London Social Season.",
    descriptionHtml:
      "<p>A form of quiet power. Seraphina fuses modest grace with structured British design thinking — worn over any style clothing, perfect for the London Social Season.</p>",
    vendor: "PINK COLLECTION",
    collection: "ROSE OF RESILIENCE",
    price: "$ 4800",
    images: [
      { url: sheraphina1, altText: "Seraphina – full look" },
      { url: sheraphina2, altText: "Seraphina – detail" },
      { url: sheraphina3, altText: "Seraphina – side view" },
      { url: sheraphina4, altText: "Seraphina – close up" },
    ],
  },

  clara: {
    title: "CLARA",
    description:
      "A true lady with unspoken power. Clara is a capsule created to honour women — their softness, their strength, and the quiet beauty they carry through every season of life.",
    descriptionHtml:
      "<p>A true lady with unspoken power. Clara is a capsule created to honour women — their softness, their strength, and the quiet beauty they carry through every season of life.</p>",
    vendor: "PINK COLLECTION",
    collection: "ROSE OF RESILIENCE",
    price: "$ 4800",
    images: [
      { url: clara1, altText: "Clara – full look" },
      { url: clara2, altText: "Clara – detail" },
      { url: clara3, altText: "Clara – side view" },
      { url: clara4, altText: "Clara – close up" },
    ],
  },

  halime: {
    title: "HALIME",
    description:
      "Her light was never meant to be reduced. Halime fuses modest grace with structured British design thinking — worn over any style clothing, perfect for the London Social Season.",
    descriptionHtml:
      "<p>Her light was never meant to be reduced. Halime fuses modest grace with structured British design thinking — worn over any style clothing, perfect for the London Social Season.</p>",
    vendor: "PINK COLLECTION",
    collection: "ROSE OF RESILIENCE",
    price: "$ 4800",
    images: [
      { url: halima1, altText: "Halime – full look" },
      { url: halima2, altText: "Halime – detail" },
      { url: halima3, altText: "Halime – side view" },
      { url: halima4, altText: "Halime – close up" },
    ],
  },

  farhana: {
    title: "FARHANA",
    description:
      "Something entirely her own. Farhana is a capsule created to honour women — their softness, their strength, and the quiet beauty they carry through every season of life.",
    descriptionHtml:
      "<p>Something entirely her own. Farhana is a capsule created to honour women — their softness, their strength, and the quiet beauty they carry through every season of life.</p>",
    vendor: "PINK COLLECTION",
    collection: "ROSE OF RESILIENCE",
    price: "$ 4800",
    images: [
      { url: farhana1, altText: "Farhana – full look" },
      { url: farhana2, altText: "Farhana – detail" },
      { url: farhana3, altText: "Farhana – side view" },
      { url: farhana4, altText: "Farhana – close up" },
    ],
  },
};
