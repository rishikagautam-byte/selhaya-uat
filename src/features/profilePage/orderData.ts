export type OrderItem = {
  name: string;
  price: string;
  image?: string;
  qty?: number;
  size?: string;
};

export type Order = {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered";
  images: string[];
  items: OrderItem[];
  deliveryFee: string;
  tax: string;
  total: string;
  paymentMethod: string;
  customerName?: string;
  contactInfo?: string;
  deliveryAddress?: string;
  billingAddress?: string;
  shopifyId?: string | number;
};

export type TrackingStep = {
  date: string;
  time: string;
  status: string;
  location: string;
  active?: boolean;
};

export type OrderProduct = {
  image: string;
  name: string;
  ref: string;
  qty: number;
  size: string;
  price: string;
};

export type OrderDetailData = {
  trackingId: string;
  status: string;
  lastUpdated: string;
  trackingHistory: TrackingStep[];
  customerName: string;
  contactInfo: string;
  deliveryAddress: string;
  seller: string;
  sellerEmail: string;
  billingAddress: string;
  paymentStatus: string;
  products: OrderProduct[];
  total: string;
  tax: string;
  deliveryFee: string;
  totalAmount: string;
  paidBy: string;
  shopifyId?: string | number;
};

export const sampleOrders: Order[] = [
  {
    id: "SLY8263636363",
    date: "03/03/2026",
    status: "Processing",
    images: ["/images/order1a.png", "/images/order1b.png", "/images/order1c.png"],
    items: [
      { name: "Safa Bloom", price: "£ 6,000.00" },
      { name: "Sharifa cut", price: "£ 5,000.00" },
      { name: "Yaqeen", price: "£ 10,000.00" },
    ],
    deliveryFee: "Free",
    tax: "£ 50.00",
    total: "£ 21,000.00",
    paymentMethod: "paypal",
  },
  {
    id: "SLY8263636364",
    date: "03/03/2026",
    status: "Shipped",
    images: ["/images/order2a.png", "/images/order2b.png", "/images/order2c.png"],
    items: [
      { name: "Safa Bloom", price: "£ 6,000.00" },
      { name: "Sharifa cut", price: "£ 5,000.00" },
      { name: "Yaqeen", price: "£ 10,000.00" },
    ],
    deliveryFee: "Free",
    tax: "£ 50.00",
    total: "£ 21,000.00",
    paymentMethod: "paypal",
  },
  {
    id: "SLY8263636365",
    date: "23/02/2026",
    status: "Delivered",
    images: ["/images/order3a.png", "/images/order3b.png", "/images/order3c.png"],
    items: [
      { name: "Safa Bloom", price: "£ 6,000.00" },
      { name: "Sharifa cut", price: "£ 5,000.00" },
      { name: "Yaqeen", price: "£ 10,000.00" },
    ],
    deliveryFee: "Free",
    tax: "£ 50.00",
    total: "£ 21,000.00",
    paymentMethod: "paypal",
  },
];

const defaultDetail: Omit<OrderDetailData, "trackingId" | "status" | "trackingHistory" | "products" | "total" | "tax" | "deliveryFee" | "totalAmount"> = {
  lastUpdated: "12 Nov 2025",
  customerName: "Miss. Anisha Younis",
  contactInfo: "+000000000",
  deliveryAddress:
    "Miss. Anisha Younis 5 Bond St PE38et Boston United Kingdom Tel: +448972363636636",
  seller: "Selhaya",
  sellerEmail: "Support@selhaya",
  billingAddress:
    "Miss. Anisha Younis 5 Bond St PE38et Boston United Kingdom Tel: +448972363636636",
  paymentStatus: "Paid by paypal",
  paidBy: "Paid by paypal",
};

function buildTrackingHistory(status: Order["status"], orderDate: string): TrackingStep[] {
  if (status === "Processing") {
    return [
      { date: orderDate, time: "Just now", status: "Order Received", location: "Confirmed", active: true },
      { date: "Pending", time: "-", status: "Order Picked up", location: "Pending", active: false },
      { date: "Pending", time: "-", status: "Shipped", location: "Pending", active: false },
    ];
  }
  if (status === "Shipped") {
    return [
      { date: orderDate, time: "Earlier", status: "Order Received", location: "Confirmed", active: false },
      { date: orderDate, time: "Earlier", status: "Order Picked up", location: "Warehouse", active: false },
      { date: orderDate, time: "Just now", status: "Shipped", location: "In Transit", active: true },
    ];
  }
  return [
    { date: orderDate, time: "Earlier", status: "Order Received", location: "Confirmed", active: false },
    { date: orderDate, time: "Earlier", status: "Shipped", location: "In Transit", active: false },
    { date: orderDate, time: "Just now", status: "Delivered", location: "Customer address", active: true },
  ];
}

export function getOrderDetailData(orderOrId: string | Order): OrderDetailData | undefined {
  const order = typeof orderOrId === "string" 
    ? sampleOrders.find((item) => item.id === orderOrId)
    : orderOrId;
  if (!order) return undefined;

  const products: OrderProduct[] = order.items.map((item, index) => ({
    image: item.image || order.images[index] || `/images/product-${index + 1}.png`,
    name: item.name,
    ref: `${order.id}-${index + 1}`,
    qty: item.qty || 1,
    size: item.size || "S",
    price: (item.price.startsWith("£") || item.price.startsWith("€") || item.price.startsWith("$") ? item.price : `+ ${item.price}`).replace("$", "£"),
  }));

  return {
    trackingId: order.id,
    status: order.status,
    lastUpdated: order.date,
    trackingHistory: buildTrackingHistory(order.status, order.date),
    customerName: order.customerName || defaultDetail.customerName,
    contactInfo: order.contactInfo || defaultDetail.contactInfo,
    deliveryAddress: order.deliveryAddress || defaultDetail.deliveryAddress,
    seller: defaultDetail.seller,
    sellerEmail: defaultDetail.sellerEmail,
    billingAddress: order.billingAddress || defaultDetail.billingAddress,
    paymentStatus: `Paid by ${order.paymentMethod}`,
    products,
    total: order.total,
    tax: order.tax,
    deliveryFee: order.deliveryFee,
    totalAmount: order.total,
    paidBy: `Paid by ${order.paymentMethod}`,
    shopifyId: order.shopifyId,
  };
}
