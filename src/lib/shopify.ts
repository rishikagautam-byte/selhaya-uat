declare global {
  interface ImportMetaEnv {
    VITE_SHOPIFY_STORE?: string;
    VITE_SHOPIFY_ACCESS_TOKEN?: string;
    VITE_SHOPIFY_STOREFRONT_TOKEN?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export interface ShopifyProductImage {
  url: string;
  altText: string | null;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
}

export interface ShopifyProductData {
  id?: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  vendor: string;
  collection?: string;
  price: string;
  images: ShopifyProductImage[];
  variants?: ShopifyVariant[];
}

export interface ProductURLData {
  handle: string;
  id: string;
  url: string;
  title: string;
  price: string;
}

const shop = import.meta.env.VITE_SHOPIFY_STORE?.trim() ?? "";
// Storefront token — prefer the dedicated STOREFRONT_TOKEN, fall back to ACCESS_TOKEN
const token =
  (import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN?.trim() ||
    import.meta.env.VITE_SHOPIFY_ACCESS_TOKEN?.trim()) ?? "";
const apiVersion = "2024-10";
const shopDomain = shop.includes(".myshopify.com") ? shop : `${shop}.myshopify.com`;

const productQuery = `query ProductByHandle($handle: String!, $imageCount: Int!) {
  product(handle: $handle) {
    id
    title
    description
    descriptionHtml
    vendor
    collections(first: 1) {
      edges {
        node {
          title
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: $imageCount) {
      edges {
        node {
          url
          altText
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          availableForSale
        }
      }
    }
  }
}`;

export async function fetchShopifyProductByHandle(
  handle: string,
  imageCount = 10,
): Promise<ShopifyProductData | null> {
  if (!shop || !token) {
    return null;
  }

  // Handle local to shopify mapping for fetching
  const localToShopify: Record<string, string> = {
    "ziya-blue": "the-ziya-blue",
    "yaqeen": "the-yaqeen-abaya",
    "sakura": "the-sakura",
    "sabi": "the-sabi",
    "sharifa-cut": "the-sharifa-cut",
    "safa-bloom": "the-safa-wrap",
    "malika-drape": "malika-drape",
    "noor-flow": "noor-flow",
  };
  const shopifyHandle = localToShopify[handle] || handle;

  const response = await fetch(`https://${shopDomain}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({
      query: productQuery,
      variables: { handle: shopifyHandle, imageCount },
    }),
  });

  if (!response.ok) {
    return null;
  }

  const json = await response.json();
  const product = json?.data?.product;
  if (!product) {
    return null;
  }

  const priceRange = product.priceRange?.minVariantPrice;
  const price = priceRange
    ? `£ ${parseFloat(priceRange.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
    : "";

  return {
    id: product.id,
    title: product.title || handle.replace(/-/g, " ").toUpperCase(),
    description: product.description || "",
    descriptionHtml: product.descriptionHtml || "",
    vendor: product.vendor || "",
    collection: product.collections?.edges?.[0]?.node?.title || "",
    price,
    images:
      product.images?.edges?.map((edge: any) => ({
        url: edge.node.url,
        altText: edge.node.altText,
      })) ?? [],
    variants:
      product.variants?.edges?.map((edge: any) => ({
        id: edge.node.id,
        title: edge.node.title,
        availableForSale: edge.node.availableForSale,
      })) ?? [],
  };
}

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

export async function createShopifyCheckout(
  lineItems: { variantId: string; quantity: number }[]
): Promise<string | null> {
  if (!shop || !token) {
    console.error("Missing Shopify credentials");
    return null;
  }

  const variables = {
    input: {
      lines: lineItems.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity
      }))
    }
  };

  try {
    const response = await fetch(`https://${shopDomain}/api/${apiVersion}/graphql.json`, {
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

    if (!response.ok) {
      console.error("Cart creation failed with status:", response.status);
      return null;
    }

    const json = await response.json();
    const cartCreate = json?.data?.cartCreate;

    if (cartCreate?.userErrors?.length > 0) {
      console.error("Cart creation user errors:", cartCreate.userErrors);
      return null;
    }

    const rawUrl: string | undefined = cartCreate?.cart?.checkoutUrl;
    if (!rawUrl) return null;

    // The Storefront API may return checkoutUrl as https://selhaya.com/cart/c/...
    // But selhaya.com is the React app which throws a 404.
    // The actual Shopify checkout domain is shop.selhaya.com.
    try {
      const parsed = new URL(rawUrl);
      // Force it to use the Shopify checkout subdomain
      if (parsed.hostname === "selhaya.com" || parsed.hostname === shopDomain) {
        parsed.hostname = "shop.selhaya.com";
      }
      return parsed.toString();
    } catch {
      return rawUrl;
    }
  } catch (error) {
    console.error("Error creating Shopify checkout:", error);
    return null;
  }
}


const productsQuery = `query ProductsList($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id
        handle
        title
        description
        vendor
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 1) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  }
}`;

export async function fetchShopifyProducts(
  first = 250
): Promise<(ShopifyProductData & { id: string, handle: string })[]> {
  if (!shop || !token) {
    return [];
  }

  const response = await fetch(`https://${shopDomain}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({
      query: productsQuery,
      variables: { first },
    }),
  });

  if (!response.ok) {
    return [];
  }

  const json = await response.json();
  const edges = json?.data?.products?.edges;
  if (!edges) {
    return [];
  }

  return edges.map(({ node }: any) => {
    const priceRange = node.priceRange?.minVariantPrice;
    const price = priceRange
      ? `£ ${parseFloat(priceRange.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
      : "";

    return {
      id: node.id,
      handle: node.handle,
      title: node.title || node.handle.replace(/-/g, " ").toUpperCase(),
      description: node.description || "",
      vendor: node.vendor || "",
      price,
      images:
        node.images?.edges?.map((edge: any) => ({
          url: edge.node.url,
          altText: edge.node.altText,
        })) ?? [],
    };
  });
}

/**
 * Encode Shopify product ID to URL-safe format
 * Converts: gid://shopify/Product/12345 to gid%3A%2F%2Fshopify%2FProduct%2F12345
 */
function encodeShopifyId(gid: string): string {
  return encodeURIComponent(gid);
}

/**
 * Generate product URL with handle and encoded ID
 * Format: /products/{handle}/{encodedGid}
 */
function generateProductURL(handle: string, gid: string): string {
  const shopifyToLocal: Record<string, string> = {
    "the-ziya-blue": "ziya-blue",
    "the-yaqeen-abaya": "yaqeen",
    "the-sakura": "sakura",
    "the-sabi": "sabi",
    "the-sharifa-cut": "sharifa-cut",
    "the-safa-wrap": "safa-bloom",
    "malika-drape": "malika-drape",
    "noor-flow": "noor-flow",
  };
  const localHandle = shopifyToLocal[handle] || handle;
  const encodedGid = encodeShopifyId(gid);
  return `/products/${localHandle}/${encodedGid}`;
}

/**
 * Fetch all products from Shopify (up to 10 or specified limit)
 * Returns array with handle, ID, URL, title, and price for each product
 */
export async function getAllProductURLs(limit = 250): Promise<ProductURLData[]> {
  if (!shop || !token) {
    return [];
  }

  const products = await fetchShopifyProducts(limit);
  
  return products.map(product => {
    const shopifyToLocal: Record<string, string> = {
      "the-ziya-blue": "ziya-blue",
      "the-yaqeen-abaya": "yaqeen",
      "the-sakura": "sakura",
      "the-sabi": "sabi",
      "the-sharifa-cut": "sharifa-cut",
      "the-safa-bloom": "safa-bloom",
      "malika-drape": "malika-drape",
      "noor-flow": "noor-flow",
    };
    const localHandle = shopifyToLocal[product.handle] || product.handle;
    return {
      handle: localHandle,
      id: product.id,
      url: generateProductURL(product.handle, product.id),
      title: product.title,
      price: product.price,
    };
  });
}

/**
 * Decode URL-safe Shopify ID back to original format
 * Converts: gid%3A%2F%2Fshopify%2FProduct%2F12345 to gid://shopify/Product/12345
 */
export function decodeShopifyId(encodedGid: string): string {
  return decodeURIComponent(encodedGid);
}

