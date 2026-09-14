"use client";

import { useEffect, useState } from "react";
import { pushViewCart, pushAddToCart, pushBeginCheckout, pushAddShippingInfo, pushAddPaymentInfo, parseNumericPrice } from "../../lib/gtm";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useUser } from "../../context/UserContext";

import { allProducts, productBySlug } from "../../lib/productImages";
import { fetchShopifyProducts, createShopifyCheckout, fetchShopifyProductByHandle } from "../../lib/shopify";
import { getProductURLsCache } from "../../lib/productURLHelper";

interface CartItem {
  id: string;
  name: string;
  ref?: string;
  size?: string;
  price: string;
  image: string;
  quantity: number;
  height?: string;
  heightUnit?: string;
  variantId?: string;
}

interface RecommendedItem {
  id: string;
  collection: string;
  name: string;
  price: number;
  image: string;
  shopifyGid?: string; // full GID e.g. gid://shopify/Product/12345
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  recommendedItems?: RecommendedItem[];
}

// Pink Collection products as default recommendations (from central registry)
const defaultRecommended: RecommendedItem[] = allProducts
  .filter((p) => p.collection === "PINK COLLECTION")
  .slice(0, 3)
  .map((p) => ({
    id: p.slug,
    collection: p.collection,
    name: p.name,
    price: Number(p.price.replace(/[^0-9.]/g, "")) || 4800,
    image: p.image,
  }));

const parsePrice = (price: string) => Number(price.replace(/[^0-9.]/g, "")) || 0;

const formatPrice = (price: number) =>
  `£ ${price.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

const formatHeight = (heightVal?: string, unit?: string) => {
  if (!heightVal) return null;
  const num = parseFloat(heightVal);
  if (isNaN(num)) return `${heightVal} ${unit || ''}`.trim();

  let totalInches = num;
  if (unit === 'cm') {
    totalInches = num / 2.54;
  }

  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);

  return `${feet}'${inches}"`;
};

export default function Cart({
  isOpen,
  onClose,
  recommendedItems = defaultRecommended,
}: CartProps) {
  const { cartItems, addToCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // GA4: view_cart — fire when drawer opens with current cart items
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
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  // cartItems included so the event always reflects the current cart
  }, [isOpen, cartItems]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );

  const handleAddToCart = (rec: RecommendedItem) => {
    addToCart({
      id: rec.id,
      name: rec.name,
      image: rec.image,
      price: `${rec.price}`,
      ref: "",
      size: "S",
    });
    // GA4: add_to_cart from cart recommendations
    pushAddToCart({
      item_id: rec.id,
      item_name: rec.name,
      item_brand: rec.collection || "SELHAYA",
      price: rec.price,
      currency: "GBP",
      quantity: 1,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" data-lenis-prevent="true">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Cart Panel */}
      <div
        className="relative h-full flex items-start justify-end"
        role="dialog"
        aria-modal="true"
        aria-label="Your Cart"
      >
        {/* Desktop: fixed 604px wide, full height */}
        <div
          className="
            bg-[#F9F4EE] overflow-y-auto overscroll-contain hide-scrollbar
            /* Desktop */
            hidden md:flex md:flex-col
            md:w-[604px] h-full
            /* Mobile — handled via separate block */
          "
          style={{ boxShadow: "0 8px 40px rgba(64,44,31,0.13)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <CartInner
            cartItems={cartItems}
            recommendedItems={recommendedItems}
            subtotal={subtotal}
            onClose={onClose}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Mobile: full-width from bottom sheet style */}
        <div
          className="
            bg-[#F9F4EE] overflow-y-auto overscroll-contain hide-scrollbar
            flex flex-col md:hidden
            w-screen h-full
          "
          style={{ maxHeight: "100dvh" }}
          onClick={(e) => e.stopPropagation()}
        >
          <CartInner
            cartItems={cartItems}
            recommendedItems={recommendedItems}
            subtotal={subtotal}
            onClose={onClose}
            onAddToCart={handleAddToCart}
            mobile
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Inner content — shared between desktop & mobile
───────────────────────────────────────────────────────────── */
function CartInner({
  cartItems,
  recommendedItems,
  subtotal,
  onClose,
  onAddToCart,
  mobile = false,
}: {
  cartItems: CartItem[];
  recommendedItems: RecommendedItem[];
  subtotal: number;
  onClose: () => void;
  onAddToCart: (rec: RecommendedItem) => void;
  mobile?: boolean;
}) {
  const navigate = useNavigate();
  // const {  } = useFavorites();
  const [dynamicRecommended, setDynamicRecommended] = useState<RecommendedItem[]>([]);
  const px = mobile ? "px-5" : "px-6";
  const dividerColor = "border-[#E7E1DA]";

  useEffect(() => {
    async function loadShopifyRecommendations() {
      try {
        const products = await fetchShopifyProducts(250);

        const mapped: RecommendedItem[] = products.map((p) => {
          const numPrice = Number(p.price.replace(/[^0-9.]/g, "")) || 0;
          // Local map for product handle to local ID if needed, 
          // but handle works fine for id since addToCart uses id=slug
          const localToShopify: Record<string, string> = {
            "the-ziya-blue": "ziya-blue", "the-yaqeen-abaya": "yaqeen",
            "the-sharifa-cut": "sharifa-cut", "the-safa-wrap": "safa-bloom",
            "the-sakura": "sakura", "the-sabi": "sabi",
          };
          const localHandle = localToShopify[p.handle] || p.handle;

          return {
            id: localHandle,
            collection: p.vendor || "SELHAYA",
            name: p.title,
            price: numPrice,
            image: p.images[0]?.url || "",
            shopifyGid: p.id,
          };
        });

        // Group by collection to ensure diversity
        const byCollection: Record<string, RecommendedItem[]> = {};
        mapped.forEach((item) => {
          const col = item.collection || "OTHER";
          if (!byCollection[col]) byCollection[col] = [];
          byCollection[col].push(item);
        });

        const diverseList: RecommendedItem[] = [];
        const collections = Object.keys(byCollection);
        let added = true;
        while (added) {
          added = false;
          for (const col of collections) {
            if (byCollection[col].length > 0) {
              diverseList.push(byCollection[col].shift()!);
              added = true;
            }
          }
        }

        setDynamicRecommended(diverseList);
      } catch (error) {
        console.error("Failed to load recommendations:", error);
      }
    }
    loadShopifyRecommendations();
  }, []);

  const cartIds = new Set(cartItems.map((item) => item.id));
  const availableRecommended = dynamicRecommended.filter((rec) => !cartIds.has(rec.id));

  const handleCartItemClick = async (item: CartItem) => {
    onClose();
    try {
      const urls = await getProductURLsCache();
      const match = urls.find((u) => u.handle === item.id);
      if (match) {
        navigate(match.url);
      } else {
        navigate(`/products/${item.id}`);
      }
    } catch {
      navigate(`/products/${item.id}`);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* ── Header ── */}
      <div className={`${px} pt-[40px] md:pt-[80px]`}>
        <div className="flex items-center justify-between">
          <h6
            className="font-editorial text-[16px] leading-none text-[#281B13]"
            style={{ fontFamily: "'Silver Editorial', serif", fontWeight: 400 }}
          >
            Your Cart
          </h6>
          <button
            onClick={onClose}
            className="dm-sans text-[14px] text-[#281B13] hover:opacity-60 transition-opacity uppercase tracking-wide"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            aria-label="Close cart"
          >
            CLOSE
          </button>
        </div>

        {/* Border under header */}
        <div className={`mt-4 border-b ${dividerColor}`} />
      </div>

      {/* ── Cart Items ── */}
      <div className={`${px} flex flex-col`}>
        {cartItems.length === 0 ? (
          <p
            className="text-[14px] text-[#281B13] py-5"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Your cart is empty.
          </p>
        ) : (
          [...cartItems].reverse().map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              dividerColor={dividerColor}
              onClick={() => handleCartItemClick(item)}
            />
          ))
        )}
      </div>

      {/* ── Tax & Shipping note ── */}
      <div className={`${px} mt-4`}>
        <p
          className="text-[12px] text-[#281B13]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Tax included.{" "}
          <span className="underline cursor-pointer hover:opacity-70">Shipping</span>{" "}
          calculated at checkout.
        </p>
      </div>

      {/* ── Divider ── */}
      <div className={`${px} mt-4`}>
        <div className={`border-b ${dividerColor}`} />
      </div>

      {/* ── Subtotal ── */}
      <div className={`${px} mt-4 flex items-center justify-between`}>
        <span
          className="text-[14px] text-[#281B13]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Subtotal:
        </span>
        <span
          className="text-[14px] font-medium text-[#281B13]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {formatPrice(subtotal)}
        </span>
      </div>

      {/* ── Divider ── */}
      <div className={`${px} mt-4`}>
        <div className={`border-b ${dividerColor}`} />
      </div>

      {/* ── You May Also Like ── */}
      <div className={`${px} mt-5`}>
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-[13px] text-[#281B13]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            You may also like
          </span>
          <button
            onClick={() => { onClose(); navigate("/profile/favorites"); }}
            className="text-[13px] text-[#281B13] underline hover:opacity-60 transition-opacity"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            View Favorites
          </button>
        </div>

        {/* Recommended Items */}
        {availableRecommended.length > 0 ? availableRecommended.slice(0, 3).map((rec) => (
          <RecommendedRow
            key={rec.id}
            rec={rec}
            onAdd={onAddToCart}
            onNavigate={(r) => {
              onClose();
              if (r.shopifyGid) {
                navigate(`/products/${r.id}/${encodeURIComponent(r.shopifyGid)}`);
              } else {
                navigate(`/products/${r.id}`);
              }
            }}
          />
        )) : recommendedItems.filter(r => !cartIds.has(r.id)).slice(0, 3).map((rec) => (
          <RecommendedRow
            key={rec.id}
            rec={rec}
            onAdd={onAddToCart}
            onNavigate={(r) => {
              onClose();
              navigate(`/products/${r.id}`);
            }}
          />
        ))}
      </div>

      {/* ── Checkout CTA ── */}
      <CheckoutButton cartItems={cartItems} onClose={onClose} px={px} />

      {/* ── Footer Links ── */}
      <div className={`${px} mt-4 mb-6 flex items-center gap-1 flex-wrap`}>
        <span
          className="text-[12px] text-[#281B13]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Message us on
        </span>
        <a
          href="#"
          className="text-[12px] text-[#281B13] underline hover:opacity-60 transition-opacity"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          WhatsApp
        </a>
        <span
          className="text-[12px] text-[#281B13] ml-2"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Need help? Please
        </span>
        <a
          href="#"
          className="text-[12px] text-[#281B13] underline hover:opacity-60 transition-opacity"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          contact Us
        </a>
      </div>

      {/* ── Trust Bar ── */}
      <div
        className={`${px} pb-6 border-t ${dividerColor} pt-4`}
      >
        <p
          className="text-[11px] text-[#8A7A6E] text-center"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Trusted by 50,000+ customers · Premium Quality · Easy Returns
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Cart Item Row
───────────────────────────────────────────────────────────── */
function CartItemRow({
  item,
  dividerColor,
  onClick,
}: {
  item: CartItem;
  dividerColor: string;
  onClick?: () => void;
}) {
  const { updateQuantity, removeFromCart } = useCart();
  const { addFavorite } = useFavorites();

  const handleSaveForLater = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Look up extra product info from the master registry
    const registryEntry = productBySlug[item.id];
    addFavorite({
      slug: item.id,
      name: item.name,
      image: item.image || registryEntry?.image || "",
      price: item.price,
      collection: registryEntry?.collection || "SELHAYA",
    });
    // Item stays in cart — only saved to favorites
  };

  return (
    <div className={`py-5 border-b ${dividerColor} last:border-b-0`}>
      <div className="flex gap-4">
        {/* Product Image */}
        <div
          onClick={onClick}
          className="flex-shrink-0 bg-[#EDE7DE] overflow-hidden cursor-pointer"
          style={{ width: 90, height: 120 }}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            style={{ imageRendering: "auto" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
          {/* Row 1: Name and Price */}
          <div className="flex justify-between items-start">
            <div>
              <p
                onClick={onClick}
                className="text-[14px] text-[#281B13] leading-snug cursor-pointer hover:opacity-70"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {item.name}
              </p>
              {item.ref && (
                <p
                  className="text-[11px] mt-0.5"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#281B13", opacity: 0.6 }}
                >
                  Ref : {item.ref}
                </p>
              )}
            </div>
            <span
              className="text-[14px] text-[#281B13] flex-shrink-0 ml-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              + {formatPrice(parsePrice(item.price))}
            </span>
          </div>

          {/* Row 2: Qty Adjuster & Remove */}
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center border border-[#E7E1DA] rounded-sm bg-white">
              <button
                onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, item.quantity - 1); }}
                className="px-2.5 py-0.5 text-[14px] text-[#281B13] hover:bg-[#F0EAE1] transition-colors border-r border-[#E7E1DA]"
              >
                –
              </button>
              <span className="px-3 text-[12px] text-[#281B13]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {item.quantity}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, item.quantity + 1); }}
                className="px-2.5 py-0.5 text-[14px] text-[#281B13] hover:bg-[#F0EAE1] transition-colors border-l border-[#E7E1DA]"
              >
                +
              </button>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleSaveForLater}
                className="text-[12px] text-[#281B13] underline hover:opacity-60 transition-opacity uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif", textUnderlineOffset: '2px' }}
              >
                Save for later
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }}
                className="text-[12px] text-[#281B13] underline hover:opacity-60 transition-opacity uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif", textUnderlineOffset: '2px' }}
              >
                Remove
              </button>
            </div>
          </div>

          {/* Row 3: Size & Height */}
          <div className="flex items-center gap-4 mt-2.5">
            {item.size && (
              <span
                className="text-[12px] text-[#281B13]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Size: {item.size}
              </span>
            )}
            {item.height && (
              <span
                className="text-[12px] text-[#281B13]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Height: {formatHeight(item.height, item.heightUnit)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function RecommendedRow({
  rec,
  onAdd,
  onNavigate,
}: {
  rec: RecommendedItem;
  onAdd: (rec: RecommendedItem) => void;
  onNavigate?: (rec: RecommendedItem) => void;
}) {
  const handleClick = () => {
    if (onNavigate) onNavigate(rec);
  };

  return (
    <div className="flex items-center gap-3 bg-[#F0EAE1] px-3 py-3 mb-3">
      {/* Image — clickable */}
      <div
        className="flex-shrink-0 bg-[#EDE7DE] overflow-hidden cursor-pointer"
        style={{ width: 72, height: 92 }}
        onClick={handleClick}
      >
        <img
          src={rec.image}
          alt={rec.name}
          width={72}
          height={92}
          className="w-full h-full object-cover"
          style={{ imageRendering: "auto" }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Text — clickable */}
      <div className="flex-1 min-w-0 cursor-pointer" onClick={handleClick}>
        <p
          className="text-[11px] text-[#8A7A6E]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {rec.collection}
        </p>
        <p
          className="text-[14px] text-[#281B13] mt-0.5 hover:opacity-70 transition-opacity"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {rec.name}
        </p>
      </div>

      {/* Price + Add to Cart */}
      <div className="flex-shrink-0 text-right flex flex-col items-end gap-1">
        <span
          className="text-[13px] text-[#281B13]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {`£ ${rec.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
        </span>
        <button
          onClick={() => onAdd(rec)}
          className="text-[12px] text-[#281B13] underline hover:opacity-60 transition-opacity whitespace-nowrap"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Checkout Button — creates real Shopify checkout URL
───────────────────────────────────────────────────────────── */

// Handle mapping: local slug → Shopify handle
const LOCAL_TO_SHOPIFY_HANDLE: Record<string, string> = {
  // Wave of Light
  "ziya-blue": "the-ziya-blue",
  "sakura": "the-sakura",
  "sabi": "the-sabi",
  "rina-lemon": "rina-lemon",
  "amara-flame": "amara-flame",
  // Heritage
  "yaqeen": "the-yaqeen-abaya",
  // Haya Robes
  "sharifa-cut": "the-sharifa-cut",
  "safa-bloom": "the-safa-wrap",
  "malika-drape": "malika-drape",
  "noor-flow": "noor-flow",
  // Rose of Resilience
  "tatiana": "tatiana",
  "seraphina": "seraphina",
  "clara": "clara",
  "halime": "halime",
  "farhana": "farhana",
};

function CheckoutButton({
  cartItems,
  onClose,
  px,
}: {
  cartItems: CartItem[];
  onClose: () => void;
  px: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    // GA4 checkout events — fire immediately upon checkout initiation
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

    // Save cart snapshot for purchase tracking on order confirmation
    try {
      sessionStorage.setItem(
        "selhaya_pending_order",
        JSON.stringify({ cartItems, cartValue })
      );
    } catch {/* ignore */}

    if (!user) {
      onClose();
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }

    // ── Open a blank tab IMMEDIATELY (synchronous, same tick as click)
    // This bypasses the browser popup blocker. If called after an async
    // operation, most browsers silently block the new tab.
    const newTab = window.open("", "_blank");
    if (newTab) {
      newTab.document.write(
        `<html><head><title>Preparing Checkout…</title>
         <style>body{margin:0;display:flex;align-items:center;justify-content:center;
         min-height:100vh;font-family:'DM Sans',sans-serif;background:#F9F4EE;color:#281B13;}
         .loader{text-align:center;}.dot{display:inline-block;width:8px;height:8px;
         border-radius:50%;background:#8B7355;margin:0 4px;
         animation:bounce 1.2s infinite ease-in-out;}.dot:nth-child(2){animation-delay:.2s;}
         .dot:nth-child(3){animation-delay:.4s;}
         @keyframes bounce{0%,80%,100%{transform:scale(0);}40%{transform:scale(1);}}</style>
         </head><body><div class="loader">
         <p style="font-size:15px;letter-spacing:.1em;margin-bottom:16px;">Preparing your checkout</p>
         <span class="dot"></span><span class="dot"></span><span class="dot"></span>
         </div></body></html>`
      );
    }

    setIsLoading(true);
    setCheckoutError(null);

    try {
      // Step 1: Resolve variantIds for all cart items
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
            // ignore individual fetch errors
          }
          return null;
        })
      );

      const validLineItems = itemsWithVariants.filter(
        (x): x is { variantId: string; quantity: number } => x !== null
      );

      if (validLineItems.length === 0) {
        if (newTab) newTab.close();
        setCheckoutError("Could not resolve products. Please try again.");
        return;
      }

      // Step 2: Create Shopify cart → get checkout URL
      const shopifyCheckoutUrl = await createShopifyCheckout(validLineItems);

      if (!shopifyCheckoutUrl) {
        if (newTab) newTab.close();
        setCheckoutError("Could not connect to checkout. Please try again.");
        return;
      }

      // Step 3: Redirect the already-open tab to the Shopify checkout
      onClose();
      if (newTab) {
        newTab.location.href = shopifyCheckoutUrl;
      } else {
        // Fallback if tab was blocked somehow
        window.open(shopifyCheckoutUrl, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      if (newTab) newTab.close();
      setCheckoutError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${px} mt-6`}>
      {checkoutError && (
        <p
          className="text-[11px] text-red-600 text-center mb-2"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {checkoutError}
        </p>
      )}
      <button
        type="button"
        onClick={handleCheckout}
        disabled={isLoading || cartItems.length === 0}
        data-cta="cart_checkout"
        className="
          w-full bg-[#8B7355] hover:bg-[#7A6347] active:bg-[#6B5540]
          text-white text-[14px] tracking-widest uppercase
          py-4 transition-colors duration-200
          disabled:opacity-60 disabled:cursor-not-allowed
          flex items-center justify-center gap-2
        "
        style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            Preparing Checkout…
          </>
        ) : (
          "Checkout"
        )}
      </button>
    </div>
  );
}