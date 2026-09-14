import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { pushPurchase, parseNumericPrice } from "../../lib/gtm";

const parsePrice = (price: string | number) => {
  if (typeof price === "number") return price;
  const num = price.replace(/[^0-9.]/g, "");
  return Number(num) || 0;
};

export default function OrderConfirmationPage() {
  const location = useLocation();
  const orderData = location.state;

  // Fallback to empty/mock if no state (e.g. direct access)
  const items = orderData?.cartItems || [];
  const form = orderData?.form || {};
  const subtotal = orderData?.orderValue || 0;
  // If the checkout provided tax and delivery, use it; otherwise default to 0
  const tax = orderData?.tax || 0;
  const delivery = orderData?.deliveryFee || 0;
  const finalTotal = orderData?.total || subtotal + tax + delivery;

  const formatPrice = (val: number) =>
    `£ ${val.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Use Shopify order name if available (e.g. #D1), else generate a local ID
  const shopifyOrderId: string | null = orderData?.shopifyOrderId || null;
  const orderId = shopifyOrderId
    ? String(shopifyOrderId)
    // eslint-disable-next-line react-hooks/purity
    : "SH-" + Math.random().toString(36).substr(2, 9).toUpperCase();

  // GA4: purchase — fire once on mount, with sessionStorage fallback
  const purchaseFiredRef = useRef(false);
  useEffect(() => {
    if (purchaseFiredRef.current) return;
    purchaseFiredRef.current = true;

    // Primary: use location.state (in-app navigation)
    let gtmItems = items;
    let gtmValue = finalTotal;
    let gtmTax = tax;
    let gtmShipping = delivery;

    // Fallback: read snapshot saved during checkout (Shopify redirect case)
    if ((!gtmItems || gtmItems.length === 0) && typeof window !== "undefined") {
      try {
        const raw = sessionStorage.getItem("selhaya_pending_order");
        if (raw) {
          const snapshot = JSON.parse(raw);
          gtmItems = snapshot.cartItems || [];
          gtmValue = snapshot.cartValue || 0;
          gtmTax = 0;
          gtmShipping = 0;
          sessionStorage.removeItem("selhaya_pending_order");
        }
      } catch {/* ignore */}
    }

    if (gtmItems && gtmItems.length > 0) {
      pushPurchase(
        orderId,
        gtmItems.map((item: { id: string; name: string; price: string | number; quantity: number }) => ({
          item_id: item.id,
          item_name: item.name,
          price: parseNumericPrice(item.price),
          currency: "GBP",
          quantity: item.quantity,
        })),
        gtmValue,
        gtmTax,
        gtmShipping
      );
    }
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen w-full bg-[#F7F3EE] text-[#2B1F1A] selection:bg-[#2B1F1A] selection:text-[#F7F3EE] pt-24">

      <main className="max-w-4xl mx-auto px-6 py-12 lg:py-20 flex flex-col items-center relative">
        {/* Back Link Container - Relative on mobile, absolute on desktop */}
        <div className="w-full lg:absolute lg:left-6 lg:top-8 mb-10 lg:mb-0">
          <Link
            to="/profile"
            className="flex items-center gap-2 text-[14px] uppercase tracking-[0.15em] font-semibold hover:opacity-60 transition-opacity"
          >
            <span>←</span>
            <span>Back to cart</span>
          </Link>
        </div>

        {/* ── ORDER HEADING ── */}
        <div className="text-center mb-12 lg:mb-20 flex flex-col items-center">
          <h2 className="editorial-heading text-[28px] lg:text-[55px] mx-auto whitespace-nowrap order-1 lg:order-2 mb-4 lg:mb-0">
            A story in silk has now begun
          </h2>
          <p className="luxury-label opacity-70 order-2 lg:order-1 lg:mb-4">
            Thank you for your order.
          </p>
        </div>

        {/* ── MAIN ORDER CARD ── */}
        <div className="luxury-container border-1 border-[#402C1F] luxury-border p-6 lg:p-12 mb-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between gap-6 mb-12 border-b border-[#E7E1DA] pb-8">
            <div>
              <p className="luxury-label mb-1">Order Status</p>
              <p className="text-sm">{orderDate}</p>
            </div>
            <div className="lg:text-right">
              <p className="luxury-label mb-1"># Confirmed</p>
              <p className="luxury-muted uppercase">{orderId}</p>
            </div>
          </div>

          <div className="mb-12">
            {items.map((item: any) => (
              <div key={item.id} className="flex gap-6 items-start border-b border-[#E7E1DA] pb-8 mb-8">
                <div className="w-24 lg:w-32 aspect-[3/4] bg-[#F3EFE9] overflow-hidden rounded-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col lg:flex-row justify-between gap-2">
                  <div>
                    <h3 className="editorial-subheading text-lg lg:text-xl mb-1">
                      {item.name}
                    </h3>
                    <p className="luxury-muted text-[10px] mb-2">REF. {item.id.substring(0, 8).toUpperCase()}</p>
                    <div className="flex gap-4 text-[10px] font-semibold uppercase tracking-wider">
                      <span>Qty: {item.quantity}</span>
                      <span>Size: {item.size || "M"}</span>
                      {item.height && <span>Height: {item.height} {item.heightUnit || ""}</span>}
                    </div>
                  </div>
                  <div className="flex items-start lg:items-center">
                    <span className="text-xs opacity-60 mr-1">+</span>
                    <p className="text-sm font-semibold">
                      {formatPrice(parsePrice(item.price))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center text-sm">
              <span className="opacity-70">Total</span>
              <span className="font-medium opacity-60">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="opacity-70">Tax</span>
              <span className="font-medium opacity-60">{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="opacity-70">Delivery Fee</span>
              <span className="luxury-muted uppercase">{delivery === 0 ? "Free" : formatPrice(delivery)}</span>
            </div>
          </div>

          <div className="border-t border-[#E7E1DA] pt-6 mb-12">
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold tracking-tight">Total Amount</span>
              <span className="text-lg font-semibold">
                {formatPrice(finalTotal)}
              </span>
            </div>
          </div>

        {/* ── CUSTOMER INFO BOX ── */}
        <div className="luxury-container luxury-border p-8 lg:p-10 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Column 1 */}
            <div className="space-y-8">
              <div>
                <p className="luxury-label mb-2 opacity-50 uppercase text-[10px] tracking-[0.2em]">Customer name</p>
                <p className="text-sm font-medium opacity-60">{form.fullName || "Guest Customer"}</p>
              </div>
              <div>
                <p className="luxury-label mb-2 opacity-50 uppercase text-[10px] tracking-[0.2em]">Contact Info</p>
                <p className="text-sm font-medium opacity-60">{form.email}</p>
              </div>
              <div>
                <p className="luxury-label mb-2 opacity-50 uppercase text-[10px] tracking-[0.2em]">Delivery Address</p>
                <p className="text-sm font-medium opacity-60 leading-relaxed">
                  {form.address} {form.apartment && `, ${form.apartment}`}<br />
                  {form.city}, {form.state} {form.pinCode}<br />
                  {form.country}
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-8">
              <div>
                <p className="luxury-label mb-2 opacity-50 uppercase text-[10px] tracking-[0.2em]">Seller</p>
                <p className="text-sm font-medium opacity-60">Selhaya</p>
              </div>
              <div>
                <p className="luxury-label mb-2 opacity-50 uppercase text-[10px] tracking-[0.2em]">Support</p>
                <p className="text-sm font-medium opacity-60 lowercase">Support@selhaya</p>
              </div>
              <div>
                <p className="luxury-label mb-2 opacity-50 uppercase text-[10px] tracking-[0.2em]">Shipping Status</p>
                <p className="text-sm font-medium opacity-60 leading-relaxed">
                  Expect delivery within 3-5 business days.<br />
                  A tracking link has been sent to your email.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button className="luxury-label underline underline-offset-4 hover:opacity-60 transition-opacity">
          Print Order Details
        </button>
        </div>
      </main>

      {/* Footer minimal spacer */}
     
    </div>
  );
}
