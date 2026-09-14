/**
 * GTM / GA4 dataLayer helper utilities — SELHAYA
 *
 * All functions guard against SSR and initialise window.dataLayer if missing.
 * Import only what you need — tree-shaking will drop the rest.
 *
 * GA4 Ecommerce reference:
 * https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
 */

/** Safely push to window.dataLayer */
function push(event: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem("selhaya_cookie_consent") !== "accepted") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

// ─── Shared item shape ──────────────────────────────────────────────────────

export interface GtmItem {
  item_id: string;        // slug / product handle
  item_name: string;      // product title
  item_brand?: string;    // collection name e.g. "HAYA ROBES"
  item_category?: string; // e.g. "Silk Couture"
  item_list_name?: string;// e.g. "Haya Robes Collection"
  item_list_id?: string;  // e.g. "haya_robes"
  price?: number;         // numeric price without currency symbol
  currency?: string;      // "GBP"
  quantity?: number;
  index?: number;         // position in list (0-based)
}

// ─── Helper: parse "£ 4,700.00" → 4700 ─────────────────────────────────────
export function parseNumericPrice(price: string | number | undefined): number {
  if (typeof price === "number") return price;
  if (!price) return 0;
  return Number(String(price).replace(/[^0-9.]/g, "")) || 0;
}

// ─── Events ─────────────────────────────────────────────────────────────────

/**
 * Fired on collection page load to tell GA4 which products were shown.
 * Call once inside a useEffect on mount.
 */
export function pushViewItemList(items: GtmItem[], listName: string, listId?: string): void {
  push({
    event: "view_item_list",
    ecommerce: {
      item_list_name: listName,
      item_list_id: listId ?? listName.toLowerCase().replace(/\s+/g, "_"),
      items: items.map((item, index) => ({
        ...item,
        item_list_name: listName,
        item_list_id: listId ?? listName.toLowerCase().replace(/\s+/g, "_"),
        index,
      })),
    },
  });
}

/**
 * Fired when a user clicks a product card in a collection list.
 */
export function pushSelectItem(item: GtmItem, listName: string, listId?: string): void {
  push({
    event: "select_item",
    ecommerce: {
      item_list_name: listName,
      item_list_id: listId ?? listName.toLowerCase().replace(/\s+/g, "_"),
      items: [item],
    },
  });
}

/**
 * Fired on product detail page load.
 */
export function pushViewItem(item: GtmItem): void {
  push({
    event: "view_item",
    ecommerce: {
      currency: item.currency ?? "GBP",
      value: item.price ?? 0,
      items: [item],
    },
  });
}

/**
 * Fired when a user confirms adding an item to cart.
 */
export function pushAddToCart(item: GtmItem): void {
  push({
    event: "add_to_cart",
    ecommerce: {
      currency: item.currency ?? "GBP",
      value: (item.price ?? 0) * (item.quantity ?? 1),
      items: [item],
    },
  });
}

/**
 * Fired when a user removes an item from cart.
 */
export function pushRemoveFromCart(item: GtmItem): void {
  push({
    event: "remove_from_cart",
    ecommerce: {
      currency: item.currency ?? "GBP",
      value: (item.price ?? 0) * (item.quantity ?? 1),
      items: [item],
    },
  });
}

/**
 * Fired when the cart drawer/page opens.
 */
export function pushViewCart(items: GtmItem[], cartValue: number): void {
  push({
    event: "view_cart",
    ecommerce: {
      currency: "GBP",
      value: cartValue,
      items,
    },
  });
}

/**
 * Fired when the user initiates checkout (before Shopify redirect).
 */
export function pushBeginCheckout(items: GtmItem[], cartValue: number): void {
  push({
    event: "begin_checkout",
    ecommerce: {
      currency: "GBP",
      value: cartValue,
      items,
    },
  });
}

/**
 * Fired when the user submits / confirms their shipping address.
 * Call this when the user proceeds past the shipping step in checkout.
 */
export function pushAddShippingInfo(
  items: GtmItem[],
  cartValue: number,
  shippingTier?: string
): void {
  push({
    event: "add_shipping_info",
    ecommerce: {
      currency: "GBP",
      value: cartValue,
      shipping_tier: shippingTier ?? "Standard",
      items,
    },
  });
}

/**
 * Fired when the user selects / confirms their payment method.
 * Call this when the user proceeds past the payment step in checkout.
 */
export function pushAddPaymentInfo(
  items: GtmItem[],
  cartValue: number,
  paymentType?: string
): void {
  push({
    event: "add_payment_info",
    ecommerce: {
      currency: "GBP",
      value: cartValue,
      payment_type: paymentType ?? "Credit Card",
      items,
    },
  });
}

/**
 * Fired on the order confirmation page.
 * Uses a dedup guard: once pushed per orderId it stores a flag in sessionStorage.
 */
export function pushPurchase(
  orderId: string,
  items: GtmItem[],
  value: number,
  tax?: number,
  shipping?: number
): void {
  // Deduplication — only fire once per order per tab session
  const dedupKey = `gtm_purchase_${orderId}`;
  if (typeof window !== "undefined" && sessionStorage.getItem(dedupKey)) return;

  push({
    event: "purchase",
    ecommerce: {
      transaction_id: orderId,
      currency: "GBP",
      value,
      tax: tax ?? 0,
      shipping: shipping ?? 0,
      items,
    },
  });

  if (typeof window !== "undefined") {
    sessionStorage.setItem(dedupKey, "1");
  }
}