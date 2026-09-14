import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productBySlug } from "../../lib/productImages";
import { fetchShopifyProducts } from "../../lib/shopify";
import { getProductURLsCache } from "../../lib/productURLHelper";

// ─── Data ────────────────────────────────────────────────────────────────────

interface HistoryItem {
  id: string;
  name: string;
  image: string;
  price: string;
}

const DESKTOP_PER_PAGE = 8;
const MOBILE_PER_PAGE  = 6;

// ─── Card ─────────────────────────────────────────────────────────────────────

function HistoryCard({ item, isMobile }: { item: HistoryItem; isMobile: boolean }) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const navigate = useNavigate();

  const cardW = isMobile ? 156 : 182;
  const cardH = isMobile ? 280 : 250;

  const handleNavigate = async () => {
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
            className="absolute bottom-0 left-0 right-0 bg-white flex flex-col items-center justify-center px-2 py-2 gap-[5px]"
            style={{ height: "50%" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sizes — centred */}
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

            {/* Divider */}
            <div className="text-[12px] text-[#C5B4A0] font-['DM_Sans'] leading-none text-center w-full">
              –
            </div>

            {/* Save for later — centred */}
            <button className="flex items-center justify-center gap-1 w-full text-[12px] text-[#402C1F] font-['DM_Sans'] border-none bg-transparent cursor-pointer p-0 hover:opacity-60 transition-opacity">
              SAVE FOR LATER
              <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
                <path d="M1 1.5h9v10.5L5.5 9 1 12V1.5z" stroke="#402C1F" strokeWidth="1.2" fill="none" />
              </svg>
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
          aria-label="Toggle size options"
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

export default function ViewHistory() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => { setCurrentPage(1); }, [isMobile]);

  useEffect(() => {
    // Load viewed product slugs from local storage
    const loadHistory = async () => {
      try {
        setLoading(true);
        const historyJson = localStorage.getItem("selhaya_view_history");
        const historySlugs: string[] = historyJson ? JSON.parse(historyJson) : [];
        
        // Filter and map to real product data
        let historyItems: HistoryItem[] = historySlugs
          .map(slug => productBySlug[slug])
          .filter(Boolean)
          .map(p => ({
            id: p.slug,
            name: p.name,
            image: p.image,
            price: p.price,
          }));
          
        setItems(historyItems);

        // Fetch real-time prices from Shopify for the items
        if (historyItems.length > 0) {
          const shopifyData = await fetchShopifyProducts(50);
          setItems(prevItems => prevItems.map(item => {
            const shopifyMatch = shopifyData.find(s => s.handle === item.id);
            if (shopifyMatch && shopifyMatch.price) {
              return { ...item, price: shopifyMatch.price };
            }
            return item;
          }));
        }
      } catch (error) {
        console.error("Failed to load view history:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const perPage        = isMobile ? MOBILE_PER_PAGE : DESKTOP_PER_PAGE;
  const totalPages     = Math.max(1, Math.ceil(items.length / perPage));
  const paginatedItems = items.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h4 className="font-['DM_Sans'] text-[24px] font-normal text-[#402C1F] m-0 leading-tight">
          History
        </h4>
      </div>

      {loading ? (
        <p className="text-[13px] text-[#C5B4A0] mt-4 font-['DM_Sans']">Loading history...</p>
      ) : items.length === 0 ? (
        <p className="text-[13px] text-[#C5B4A0] mt-4 font-['DM_Sans']">No history yet.</p>
      ) : (
        <>
          <div className={`grid gap-x-5 gap-y-8 ${isMobile ? "grid-cols-2" : "grid-cols-4"}`}>
            {paginatedItems.map((item) => (
              <HistoryCard key={item.id} item={item} isMobile={isMobile} />
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