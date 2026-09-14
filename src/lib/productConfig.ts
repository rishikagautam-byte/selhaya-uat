/**
 * Product URL Configuration
 * Maps all 9 products with their handles for URL generation
 */

export const PRODUCT_HANDLES = {
  // Wave of Lights (5 products)
  AMARA_FLAME: "amara-flame",
  SABI: "sabi",
  ZIYA_BLUE: "ziya-blue",
  SAKURA: "sakura",
  RINA_LEMON: "rina-lemon",
  
  // Heritage (1 product)
  YAQEEN: "yaqeen",
  
  // Haya (4 products)
  MALIKA_DRAPE: "malika-drape",
  SHARIFA_CUT: "sharifa-cut",
  SAFA_BLOOM: "safa-bloom",
  NOOR_FLOW: "noor-flow",

  // Rose of Resilience (5 products)
  CLARA: "clara",
  FARHANA: "farhana",
  HALIME: "halime",
  SERAPHINA: "seraphina",
  TATIANA: "tatiana",
} as const;

export const ALL_PRODUCT_HANDLES = Object.values(PRODUCT_HANDLES);

/**
 * Product display names for reference
 */
export const PRODUCT_NAMES = {
  "amara-flame": "AMARA FLAME",
  "sabi": "SABI",
  "ziya-blue": "ZIYA BLUE",
  "sakura": "SAKURA",
  "rina-lemon": "RINA LEMON",
  "yaqeen": "YAQEEN",
  "malika-drape": "MALIKA DRAPE",
  "sharifa-cut": "SHARIFA CUT",
  "safa-bloom": "SAFA BLOOM",
  "noor-flow": "NOOR FLOW",
  "clara": "CLARA",
  "farhana": "FARHANA",
  "halime": "HALIME",
  "seraphina": "SERAPHINA",
  "tatiana": "TATIANA",
} as const;

/**
 * Product collections
 */
export const PRODUCT_COLLECTIONS = {
  WAVE_OF_LIGHTS: [
    "amara-flame",
    "sabi",
    "ziya-blue",
    "sakura",
    "rina-lemon",
  ],
  HERITAGE: [
    "yaqeen",
  ],
  HAYA: [
    "malika-drape",
    "sharifa-cut",
    "safa-bloom",
    "noor-flow",
  ],
  ROSE_OF_RESILIENCE: [
    "clara",
    "farhana",
    "halime",
    "seraphina",
    "tatiana",
  ],
};

/**
 * Check if a handle is one of our products
 */
export function isValidProductHandle(handle: string): boolean {
  return ALL_PRODUCT_HANDLES.includes(handle as any);
}

/**
 * Get product name by handle
 */
export function getProductName(handle: string): string {
  return PRODUCT_NAMES[handle as keyof typeof PRODUCT_NAMES] || handle;
}

/**
 * Get collection type for a product
 */
export function getProductCollection(handle: string): "WAVE_OF_LIGHTS" | "HERITAGE" | "HAYA" | null {
  if (PRODUCT_COLLECTIONS.WAVE_OF_LIGHTS.includes(handle)) return "WAVE_OF_LIGHTS";
  if (PRODUCT_COLLECTIONS.HERITAGE.includes(handle)) return "HERITAGE";
  if (PRODUCT_COLLECTIONS.HAYA.includes(handle)) return "HAYA";
  return null;
}

export default {
  PRODUCT_HANDLES,
  PRODUCT_NAMES,
  PRODUCT_COLLECTIONS,
  ALL_PRODUCT_HANDLES,
  isValidProductHandle,
  getProductName,
  getProductCollection,
};
