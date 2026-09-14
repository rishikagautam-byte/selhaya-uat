import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";
import { pushViewCart, pushBeginCheckout, pushAddShippingInfo, pushAddPaymentInfo, parseNumericPrice } from "../../lib/gtm";
import { useUser } from "../../context/UserContext";

export default function CartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user } = useUser();
  const selectedItemId = (location.state as { selectedItemId?: string } | null)?.selectedItemId;
  const selectedItem = selectedItemId
    ? cartItems.find((item) => item.id === selectedItemId)
    : null;

  // GA4: view_cart — fire once on page load with the actual cart items
  useEffect(() => {
    if (cartItems.length === 0) return;
    const value = cartItems.reduce(
      (sum, item) => sum + parseNumericPrice(item.price) * item.quantity,
      0
    );
    pushViewCart(
      cartItems.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: parseNumericPrice(item.price),
        currency: "GBP",
        quantity: item.quantity,
      })),
      value
    );
  // Fire once after cartItems hydrates from localStorage (avoids empty-array push)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems.length]);

  return (
    <div className="px-6 py-10 md:px-10">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-[32px] font-semibold text-[#281B13] mb-6"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="rounded-2xl bg-[#F9F4EE] p-8">
            <p
              className="text-[16px] text-[#281B13]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Your cart is currently empty. Add a product to continue.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {selectedItem && (
              <div className="rounded-2xl bg-[#F9F4EE] p-6 border border-[#E7E1DA]">
                <p
                  className="text-[13px] uppercase tracking-[0.16em] text-[#8A7A6E] mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Selected item
                </p>
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="w-full md:w-40 bg-[#EDE7DE] overflow-hidden">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className="text-[18px] text-[#281B13] font-medium"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {selectedItem.name}
                    </p>
                    {selectedItem.ref && (
                      <p
                        className="text-[12px] text-[#281B13] opacity-70 mt-2"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Ref: {selectedItem.ref}
                      </p>
                    )}
                    <p
                      className="text-[14px] text-[#281B13] mt-3"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Quantity: {selectedItem.quantity}
                    </p>
                    {selectedItem.size && (
                      <p
                        className="text-[14px] text-[#281B13]"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Size: {selectedItem.size}
                      </p>
                    )}
                    <p
                      className="text-[16px] text-[#281B13] mt-4 font-semibold"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {selectedItem.price}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-2xl bg-[#F9F4EE] p-6 border border-[#E7E1DA]">
              <p
                className="text-[16px] text-[#281B13] font-medium mb-4"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Cart items
              </p>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 bg-white rounded-2xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-20 bg-[#EDE7DE] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p
                          className="text-[14px] text-[#281B13] font-medium"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {item.name}
                        </p>
                        <p
                          className="text-[12px] text-[#281B13] opacity-70"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p
                      className="text-[14px] text-[#281B13] font-semibold"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <button
                type="button"
                onClick={() => {
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
                  pushAddShippingInfo(gtmItems, cartValue, "Standard");
                  pushAddPaymentInfo(gtmItems, cartValue, "Credit Card");

                  try {
                    sessionStorage.setItem(
                      "selhaya_pending_order",
                      JSON.stringify({ cartItems, cartValue })
                    );
                  } catch {/* ignore */}

                  if (!user) {
                    navigate("/login", { state: { from: "/checkout" } });
                  } else {
                    navigate("/checkout");
                  }
                }}
                data-cta="cartpage_checkout"
                className="w-full md:w-auto bg-[#8B7355] hover:bg-[#7A6347] text-white uppercase tracking-widest py-4 px-6 rounded-lg transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}
              >
                Proceed to checkout
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full md:w-auto text-[#281B13] underline hover:opacity-80 transition-opacity"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Back to shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
