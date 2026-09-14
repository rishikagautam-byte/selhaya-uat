"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { allProducts, type ProductEntry } from "../lib/productImages";
import { useCart } from "../context/CartContext";
import { fetchShopifyProducts } from "../lib/shopify";

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

/* ─────────────────────────────────────────────────────────────────────────────
   Search.tsx
   Flow:
   • Typing → suggestion names list (top) + all matched product cards (below)
   • Click a name → highlight it, show only that product's card
   • Add to Cart → bottom-left toast, stay on search
   • No "Recent" section
───────────────────────────────────────────────────────────────────────────── */

export interface SearchProduct {
  id: number | string;
  name: string;
  image: string;
  href?: string;
}

interface SearchProps {
  products?: SearchProduct[];
  onClose: () => void;
  isOpen: boolean;
}

export default function Search({ onClose, isOpen }: SearchProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" data-lenis-prevent="true">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      {/* Drawer */}
      <div className="relative h-full flex items-start justify-end" role="dialog" aria-modal="true" aria-label="Search">
        {/* Desktop */}
        <div
          className="overflow-y-auto hide-scrollbar hidden md:flex md:flex-col md:w-[604px] h-full"
          style={{ backgroundColor: "var(--color-primary-light)", boxShadow: "0 8px 40px rgba(64,44,31,0.13)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <SearchInner onClose={onClose} />
        </div>

        {/* Mobile */}
        <div
          className="overflow-y-auto hide-scrollbar flex flex-col md:hidden w-screen h-full"
          style={{ backgroundColor: "var(--color-primary-light)", maxHeight: "100dvh" }}
          onClick={(e) => e.stopPropagation()}
        >
          <SearchInner onClose={onClose} mobile />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function SearchInner({ onClose, mobile }: { onClose: () => void; mobile?: boolean }) {
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ProductEntry | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [liveProducts, setLiveProducts] = useState<ProductEntry[]>(allProducts);

  useEffect(() => {
    let isMounted = true;
    async function loadPrices() {
      try {
        const shopifyProds = await fetchShopifyProducts(250);
        if (isMounted && shopifyProds && shopifyProds.length > 0) {
          setLiveProducts((prev) =>
            prev.map((localProd) => {
              const shopifyHandle = LOCAL_TO_SHOPIFY_HANDLE[localProd.slug] || localProd.slug;
              const shopProd = shopifyProds.find((s) => s.handle === shopifyHandle);
              if (shopProd) {
                return { ...localProd, price: shopProd.price };
              }
              return localProd;
            })
          );
        }
      } catch (err) {
        console.error("Search could not load Shopify prices:", err);
      }
    }
    loadPrices();
    return () => { isMounted = false; };
  }, []);

  // Detect tablet (769–1180px) — can't use CSS here so we do it in JS
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsTablet(w >= 769 && w <= 1180);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-dismiss toast after 3s
  useEffect(() => {
    if (!addedToast) return;
    const t = setTimeout(() => setAddedToast(null), 3000);
    return () => clearTimeout(t);
  }, [addedToast]);

  // All products matching the query
  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as ProductEntry[];
    return liveProducts.filter((p) => p.name.toLowerCase().includes(q));
  }, [query, liveProducts]);

  const handleAddToCart = useCallback((product: ProductEntry) => {
    addToCart({ id: product.slug, name: product.name, image: product.image, price: product.price, size: "M" });
    setAddedToast(product.name);
  }, [addToCart]);

  // Cards to show — only the selected one, or all matches
  const displayProducts: ProductEntry[] = selectedProduct ? [selectedProduct] : suggestions;

  const sp = mobile ? "20px" : "32px";
  const tp = mobile ? "20px" : "40px";
  // Responsive bottom padding: desktop 60px, tablet 40px, phone 20px
  const bottomPadding = mobile ? "20px" : isTablet ? "40px" : "60px";
  const c = { font: "'DM Sans', sans-serif" as const, dark: "#281B13", muted: "#8A7A6E", border: "#E7E1DA" };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", position: "relative" }}>

      {/* ── Search row ──────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", padding: `${tp} ${sp} 0 ${sp}`, gap: "12px" }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="7.5" cy="7.5" r="6" stroke={c.dark} strokeWidth="1.4" />
          <line x1="12" y1="12" x2="17" y2="17" stroke={c.dark} strokeWidth="1.4" strokeLinecap="round" />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSelectedProduct(null); }}
          placeholder="Search"
          autoFocus
          style={{
            flex: 1, background: "transparent", outline: "none", border: "none",
            fontFamily: c.font, fontSize: "14px", fontWeight: 400, color: c.dark, caretColor: c.dark,
          }}
        />

        <button
          onClick={onClose}
          style={{
            fontFamily: c.font, fontSize: "14px", color: c.dark,
            textDecoration: "underline", textUnderlineOffset: "3px",
            background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0,
          }}
        >
          CLOSE
        </button>
      </div>

      {/* ── Divider ─────────────────────────────────────────────────── */}
      <div style={{ height: "1px", background: c.border, margin: `16px ${sp} 0 ${sp}` }} />

      {/* ── Body ────────────────────────────────────────────────────── */}
      <div style={{ padding: `15px ${sp} ${bottomPadding} ${sp}`, flex: 1, overflowY: "auto" }}>

        {/* Empty state */}
        {!query.trim() && (
          <p style={{ fontFamily: c.font, fontSize: "14px", color: c.muted }}>Start typing to search...</p>
        )}

        {/* No match */}
        {query.trim() && suggestions.length === 0 && (
          <p style={{ fontFamily: c.font, fontSize: "14px", color: c.muted }}>No results found.</p>
        )}

        {/* Results */}
        {query.trim() && suggestions.length > 0 && (
          <>
            {/* ── "Suggestion" label ──────────────────────────────── */}
            <p style={{
              fontFamily: c.font,
              fontSize: mobile ? "16px" : "18px",
              fontWeight: 400,
              color: c.dark,
              marginBottom: mobile ? "12px" : "16px",
            }}>
              Suggestion
            </p>

            {/* ── Name list — no border between, only margin gap ─── */}
            <div style={{ marginBottom: "0" }}>
              {suggestions.map((product) => {
                const isActive = selectedProduct?.slug === product.slug;
                return (
                  <button
                    key={product.slug}
                    onClick={() => setSelectedProduct(isActive ? null : product)}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "0",
                      marginBottom: mobile ? "10px" : "14px",
                      border: "none",
                      background: "none", cursor: "pointer",
                      fontFamily: c.font, fontSize: mobile ? "10px" : "14px",
                      color: isActive ? c.dark : c.muted,
                      fontWeight: isActive ? 600 : 400,
                      transition: "color 0.15s, font-weight 0.15s",
                    }}
                  >
                    {product.name}
                  </button>
                );
              })}
            </div>

            {/* ── Single black divider before products ─────────────── */}
            <div style={{ height: "1px", background: c.dark, margin: `${mobile ? "12px" : "20px"} 0 ${mobile ? "16px" : "24px"} 0` }} />

            {/* ── Section label ───────────────────────────────────── */}
            <p style={{ fontFamily: c.font, fontSize: "12px", color: c.muted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "16px" }}>
              {selectedProduct ? "Product" : "Products"}
            </p>

            {/* ── Product cards ────────────────────────────────────── */}
            {displayProducts.map((product) => (
              <div
                key={product.slug}
                style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "24px", paddingBottom: "24px", borderBottom: `1px solid ${c.border}` }}
              >
                {/* Image */}
                <div style={{ width: mobile ? "90px" : "110px", height: mobile ? "125px" : "152px", flexShrink: 0, overflow: "hidden", background: "#EDE7DE" }}>
                  <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>

                {/* Info */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", paddingTop: "10px" }}>
                  {/* Row 1: collection | price */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: c.font, fontSize: "11px", color: c.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {product.collection}
                    </span>
                    <span style={{ fontFamily: c.font, fontSize: "13px", color: c.dark, fontWeight: 500, flexShrink: 0, marginLeft: "8px" }}>
                      {product.price}
                    </span>
                  </div>

                  {/* Row 2: name | add to cart */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                    <span style={{ fontFamily: c.font, fontSize: "14px", color: c.dark, fontWeight: 500, textTransform: "uppercase" }}>
                      {product.name}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      style={{
                        fontFamily: c.font, fontSize: "11px", color: c.dark,
                        textDecoration: "underline", textUnderlineOffset: "2px",
                        background: "none", border: "none", cursor: "pointer",
                        flexShrink: 0, marginLeft: "8px", transition: "opacity 0.15s",
                      }}
                      onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.5"; }}
                      onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* ── Bottom-left toast ───────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          bottom: addedToast ? "24px" : "-80px",
          left: "24px",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "#281B13",
          padding: "14px 20px",
          minWidth: "260px",
          maxWidth: "380px",
          boxShadow: "0 6px 24px rgba(40,27,19,0.22)",
          transition: "bottom 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          borderLeft: "3px solid #B1A08F",
        }}
        role="status"
        aria-live="polite"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B1A08F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#FAF7F2", margin: 0 }}>
          Added "<strong>{addedToast}</strong>" to your cart
        </p>
      </div>
    </div>
  );
}