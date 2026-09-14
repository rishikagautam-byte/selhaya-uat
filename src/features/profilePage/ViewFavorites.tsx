// ViewFavorites.tsx

import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
// ─── Data ────────────────────────────────────────────────────────────────────
import { useFavorites, type FavoriteItem } from "../../context/FavoritesContext";
import { fetchShopifyProducts } from "../../lib/shopify";

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

const DESKTOP_PER_PAGE = 8;
const MOBILE_PER_PAGE  = 6;

// ─── Card ─────────────────────────────────────────────────────────────────────

import { useNavigate } from "react-router-dom";
import { getProductURLsCache } from "../../lib/productURLHelper";

function FavoriteCard({
  item,
  isMobile,
  inCart,
  onToggleCart,
}: {
  item: FavoriteItem;
  isMobile: boolean;
  inCart: boolean;
  onToggleCart: (item: FavoriteItem) => void;
}) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const navigate = useNavigate();

  const cardW = isMobile ? 156 : 182;
  const cardH = isMobile ? 280 : 250;

  const handleNavigate = async () => {
    try {
      const urls = await getProductURLsCache();
      const match = urls.find((u) => u.handle === item.slug);
      if (match) {
        navigate(match.url);
      } else {
        navigate(`/products/${item.slug}`);
      }
    } catch {
      navigate(`/products/${item.slug}`);
    }
  };

  const formattedPrice = item.price.startsWith("£") || item.price.startsWith("$") 
    ? item.price.replace("$", "£")
    : `£ ${Number(item.price.replace(/[^0-9.]/g, "")).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

  return (
    <div className="flex flex-col" style={{ width: cardW }}>
      {/* Image + bottom overlay */}
      <div
        className="relative overflow-hidden bg-[#E4DDCB] cursor-pointer"
        style={{ width: cardW, height: cardH }}
        onClick={handleNavigate}
      >
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />

        {overlayOpen && (
          <div
            className="absolute bottom-0 left-0 right-0 bg-white flex flex-col"
            style={{ height: "50%" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top section: sizes + divider + REMOVE — all centred */}
            <div className="flex flex-col items-center justify-center flex-1 gap-[4px] px-2">
              {(["[S] SMALL", "[M] MEDIUM", "[L] LARGE"] as const).map((size) => {
                const key = size[1];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedSize(key)}
                    className={`text-center w-full text-[12px] font-['DM_Sans'] border-none bg-transparent cursor-pointer p-0 leading-snug transition-colors ${
                      selectedSize === key ? "text-[#402C1F] font-semibold" : "text-[#402C1F]"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}

              <div className="text-[12px] text-[#C5B4A0] font-['DM_Sans'] leading-none text-center w-full">
                –
              </div>

              <button
                onClick={() => onToggleCart(item)}
                className="text-center w-full text-[12px] text-[#402C1F] font-['DM_Sans'] border-none bg-transparent cursor-pointer p-0 leading-snug hover:opacity-60 transition-opacity"
              >
                {inCart ? "REMOVE" : "ADD TO CART"}
              </button>
            </div>

            {/* ADD TO CART — separated with top border */}
            <button
              onClick={() => onToggleCart(item)}
              className="text-center w-full text-[12px] text-[#402C1F] font-['DM_Sans'] font-semibold border-none bg-white cursor-pointer px-2 py-2 leading-snug hover:opacity-60 transition-opacity tracking-wide flex-shrink-0"
              style={{ borderTop: "1px solid #E4DDCB" }}
            >
              {inCart ? "REMOVE FROM CART" : "ADD TO CART"}
            </button>
          </div>
        )}
      </div>

      {/* Below card: name+price left | + right */}
      <div className="flex items-start justify-between mt-2" style={{ width: cardW }}>
        <div className="flex flex-col gap-0.5 cursor-pointer" onClick={handleNavigate}>
          <p className="m-0 text-[12px] leading-tight font-medium text-[#402C1F] font-['DM_Sans'] hover:opacity-70 transition-opacity">
            {item.name}
          </p>
          <p className="m-0 text-[12px] leading-tight text-[#C5B4A0] font-['DM_Sans']">
            {formattedPrice}
          </p>
        </div>

        <button
          onClick={() => setOverlayOpen((p) => !p)}
          className="text-[#402C1F] text-[20px] font-light leading-none border-none bg-transparent cursor-pointer p-0 mt-0.5 flex-shrink-0"
          aria-label="Toggle options"
        >
          {overlayOpen ? "×" : "+"}
        </button>
      </div>
    </div>
  );
}

// ─── Pagination — centred ─────────────────────────────────────────────────────

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  const getPages = (): (number | "...")[] => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [1];
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  return (
    <div className="flex items-center justify-center gap-5 mt-10 w-full">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={prevDisabled}
        className={`font-editorial text-[13px] border-none bg-transparent cursor-pointer p-0 transition-opacity ${
          prevDisabled ? "text-[#C5B4A0] cursor-not-allowed opacity-50" : "text-[#402C1F] hover:opacity-70"
        }`}
      >
        ← Previous
      </button>

      <div className="flex items-center gap-2">
        {getPages().map((p, i) =>
          p === "..." ? (
            <span key={`dot-${i}`} className="font-editorial text-[13px] text-[#C5B4A0]">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`font-editorial text-[13px] border-none bg-transparent cursor-pointer px-0.5 py-0 transition-colors ${
                currentPage === p ? "text-[#402C1F] font-semibold" : "text-[#C5B4A0] hover:text-[#402C1F]"
              }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={nextDisabled}
        className={`font-editorial text-[13px] border-none bg-transparent cursor-pointer p-0 transition-opacity ${
          nextDisabled ? "text-[#C5B4A0] cursor-not-allowed opacity-50" : "text-[#402C1F] font-semibold hover:opacity-70"
        }`}
      >
        Next →
      </button>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

import { productBySlug } from "../../lib/productImages";

export default function ViewFavorites() {
  const { favorites } = useFavorites();
  const [items, setItems] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const { addToCart, removeFromCart, isInCart } = useCart();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => { setCurrentPage(1); }, [isMobile]);

  useEffect(() => {
    let isMounted = true;
    
    // Filter out dummy data that is not in the real product registry
    const realFavorites = favorites.filter(fav => !!productBySlug[fav.slug]);
    
    setItems(realFavorites);
    setLoading(false);
    
    // Fetch live prices from Shopify to update local storage data with real prices
    async function loadLivePrices() {
      try {
        const shopifyProds = await fetchShopifyProducts(250);
        if (isMounted && shopifyProds && shopifyProds.length > 0) {
          setItems((prevItems) => 
            prevItems.map((item) => {
              const shopifyHandle = LOCAL_TO_SHOPIFY_HANDLE[item.slug] || item.slug;
              const shopProd = shopifyProds.find((s) => s.handle === shopifyHandle);
              if (shopProd) {
                return { ...item, price: shopProd.price };
              }
              return item;
            })
          );
        }
      } catch (err) {
        console.error("ViewFavorites could not load Shopify prices:", err);
      }
    }
    
    if (realFavorites.length > 0) {
      loadLivePrices();
    }
    
    return () => { isMounted = false; };
  }, [favorites]);

  const perPage        = isMobile ? MOBILE_PER_PAGE : DESKTOP_PER_PAGE;
  const totalPages     = Math.max(1, Math.ceil(items.length / perPage));
  const paginatedItems = items.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleToggleCart = (item: FavoriteItem) => {
    if (isInCart(item.slug)) {
      removeFromCart(item.slug);
      return;
    }

    addToCart({
      id: item.slug,
      name: item.name,
      image: item.image,
      price: item.price,
      size: "M" // Required field for adding to cart
    });
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {/* Header: Wishlist left | Search By Collection right */}
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-['DM_Sans'] text-[24px] font-normal text-[#402C1F] m-0 leading-tight">
          Wishlist
        </h4>
        <button className="font-editorial text-[13px] text-[#402C1F] border-none bg-transparent cursor-pointer p-0 underline underline-offset-2 hover:opacity-70 transition-opacity">
          Search By Collection
        </button>
      </div>

      {loading ? (
        <p className="text-[13px] text-[#C5B4A0] mt-4 font-['DM_Sans']">Loading favourites...</p>
      ) : items.length === 0 ? (
        <p className="text-[13px] text-[#C5B4A0] mt-4 font-['DM_Sans']">No favourites yet.</p>
      ) : (
        <>
          <div className={`grid gap-x-5 gap-y-8 ${isMobile ? "grid-cols-2" : "grid-cols-4"}`}>
            {paginatedItems.map((item) => (
              <FavoriteCard
                key={item.slug}
                item={item}
                isMobile={isMobile}
                inCart={isInCart(item.slug)}
                onToggleCart={handleToggleCart}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}