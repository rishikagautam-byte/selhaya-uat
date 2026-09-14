/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Shopify Admin API — creates REAL orders (not draft orders)
 * Uses Vite dev proxy so Admin token stays server-side.
 */

const ADMIN_API_VERSION = "2024-10";

export interface ShopifyLineItem {
  title: string;
  quantity: number;
  price: string; // e.g. "49.99"
  size?: string;
  height?: string;
  heightUnit?: string;
  image?: string;
  variantId?: string;
}

export interface ShopifyAddress {
  first_name: string;
  last_name: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  phone?: string;
}

export interface CreateOrderPayload {
  email: string;
  lineItems: ShopifyLineItem[];
  shippingAddress: ShopifyAddress;
  note?: string;
}

/**
 * Creates a real Shopify order via Admin API proxy.
 * financial_status = "pending" since payment gateway is not yet integrated.
 */
export async function createShopifyOrder(
  payload: CreateOrderPayload
): Promise<any> {
  const body = {
    order: {
      email: payload.email,
      note: payload.note || "Order placed via Selhaya website",
      financial_status: "paid",
      send_receipt: false,
      send_fulfillment_receipt: false,
      line_items: payload.lineItems.map((item) => {
        const properties = [];
        if (item.size) {
          properties.push({ name: "Size", value: item.size });
        }
        if (item.height) {
          properties.push({
            name: "Height",
            value: `${item.height}${item.heightUnit ? " " + item.heightUnit : ""}`,
          });
        }
        if (item.image) {
          properties.push({ name: "Image", value: item.image });
        }
        return {
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          requires_shipping: true,
          properties,
          ...(item.variantId ? { variant_id: Number(item.variantId) } : {}),
        };
      }),
      shipping_address: payload.shippingAddress,
      billing_address: payload.shippingAddress,
    },
  };

  const response = await fetch(
    `/shopify-admin/admin/api/${ADMIN_API_VERSION}/orders.json`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Shopify Admin API error:", response.status, errorText);
    throw new Error(
      `Order creation failed (${response.status}): ${errorText}`
    );
  }

  const result = await response.json();
  return result.order;
}

/**
 * Fetch real-time order data from Shopify by order ID.
 * Useful for tracking status and fulfillments.
 */
export async function fetchShopifyOrder(orderId: string | number): Promise<any> {
  const response = await fetch(
    `/shopify-admin/admin/api/${ADMIN_API_VERSION}/orders/${orderId}.json`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch order ${orderId}`);
  }

  const result = await response.json();
  return result.order;
}
