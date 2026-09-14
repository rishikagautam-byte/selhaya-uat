import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import { fetchShopifyProductByHandle, createShopifyCheckout } from "../../lib/shopify";
import { pushBeginCheckout, pushAddShippingInfo, pushAddPaymentInfo, parseNumericPrice } from "../../lib/gtm";

// Handle mapping: local slug → Shopify handle
const LOCAL_TO_SHOPIFY_HANDLE: Record<string, string> = {
  // Wave of Light
  "ziya-blue":    "the-ziya-blue",
  "sakura":       "the-sakura",
  "sabi":         "the-sabi",
  "rina-lemon":   "rina-lemon",
  "amara-flame":  "amara-flame",
  // Heritage
  "yaqeen":       "the-yaqeen-abaya",
  // Haya Robes
  "sharifa-cut":  "the-sharifa-cut",
  "safa-bloom":   "the-safa-wrap",
  "malika-drape": "malika-drape",
  "noor-flow":    "noor-flow",
  // Rose of Resilience
  "tatiana":      "tatiana",
  "seraphina":    "seraphina",
  "clara":        "clara",
  "halime":       "halime",
  "farhana":      "farhana",
};

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const attemptedRef = useRef(false);

  useEffect(() => {
    if (attemptedRef.current) return;
    attemptedRef.current = true;

    async function initCheckout() {
      if (!user) {
        navigate("/login", { state: { from: "/checkout" } });
        return;
      }
      if (cartItems.length === 0) {
        navigate("/");
        return;
      }

      // GA4: begin_checkout — fire before async Shopify calls
      const cartValue = cartItems.reduce(
        (sum, item) => sum + parseNumericPrice(item.price) * item.quantity,
        0
      );
      const gtmItems = cartItems.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: parseNumericPrice(item.price),
        currency: "GBP",
        quantity: item.quantity,
      }));
      pushBeginCheckout(gtmItems, cartValue);

      // GA4: add_shipping_info — fire immediately after begin_checkout.
      // Shopify handles the actual shipping selection on its own domain;
      // firing here captures the intent before the redirect.
      pushAddShippingInfo(gtmItems, cartValue, "Standard");

      // GA4: add_payment_info — same rationale as add_shipping_info above.
      pushAddPaymentInfo(gtmItems, cartValue, "Credit Card");

      // Save cart snapshot so OrderConfirmationPage can fire purchase
      // even if it's loaded directly after a Shopify redirect
      try {
        sessionStorage.setItem(
          "selhaya_pending_order",
          JSON.stringify({ cartItems, cartValue })
        );
      } catch {/* ignore */}

      try {
        const itemsWithVariants = await Promise.all(
          cartItems.map(async (item) => {
            if (item.variantId) {
              const fullGid = item.variantId.startsWith("gid://")
                ? item.variantId
                : `gid://shopify/ProductVariant/${item.variantId}`;
              return { variantId: fullGid, quantity: item.quantity };
            }
            try {
              const shopifyHandle = LOCAL_TO_SHOPIFY_HANDLE[item.id] || item.id;
              const product = await fetchShopifyProductByHandle(shopifyHandle);
              if (product?.variants && product.variants.length > 0) {
                const matchedVariant =
                  product.variants.find((v) =>
                    v.title.toLowerCase().includes((item.size || "M").toLowerCase())
                  ) || product.variants[0];
                return { variantId: matchedVariant.id, quantity: item.quantity };
              }
            } catch {
              // ignore
            }
            return null;
          })
        );

        const validLineItems = itemsWithVariants.filter(
          (x): x is { variantId: string; quantity: number } => x !== null
        );

        if (validLineItems.length === 0) {
          setError("Could not resolve products. Please try again.");
          return;
        }

        const shopifyCheckoutUrl = await createShopifyCheckout(validLineItems);
        if (!shopifyCheckoutUrl) {
          setError("Could not connect to checkout. Please try again.");
          return;
        }

        window.location.href = shopifyCheckoutUrl;
      } catch (err) {
        console.error("Checkout error:", err);
        setError("Something went wrong. Please try again.");
      }
    }

    initCheckout();
  }, [cartItems, navigate, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F4EE] text-[#281B13]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        .loader { text-align: center; }
        .dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #8B7355; margin: 0 4px; animation: bounce 1.2s infinite ease-in-out; }
        .dot:nth-child(2) { animation-delay: .2s; }
        .dot:nth-child(3) { animation-delay: .4s; }
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
      `}</style>
      
      {error ? (
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={() => navigate("/")} className="underline hover:opacity-60 transition-opacity">Back to Shop</button>
        </div>
      ) : (
        <div className="loader">
          <p style={{ fontSize: "15px", letterSpacing: ".1em", marginBottom: "16px", textTransform: "uppercase" }}>Preparing your checkout</p>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      )}
    </div>
  );
}