"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Structured from "./Structured";
import type { ResilienceItem } from "../../types/resilienceTypes";
import {
  fetchShopifyProductByHandle,
  type ShopifyProductData,
  type ShopifyProductImage,
} from "../../lib/shopify";
import { useCart } from "../../context/CartContext";
import SizeGuide from "../../components/products/SizeGuide";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { pushViewItem, pushAddToCart, parseNumericPrice } from "../../lib/gtm";
import { PRODUCT_SEO_CONFIG, DEFAULT_PRODUCT_SEO } from "../../config/seo";


const WA_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"
    style={{ marginRight: 6, flexShrink: 0 }} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const SIZES = [
  { label: "Small", code: "S" },
  { label: "Medium", code: "M" },
  { label: "Large", code: "L" },
];

interface ProductDetailsProps {
  productName?: string;
  productItem?: ResilienceItem;
  encodedGid?: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  productName,
  productItem,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [heightVal, setHeightVal] = useState<string>("");
  const [heightUnit, setHeightUnit] = useState<string>("cm");

  // Reset local inputs when navigating to a new product
  useEffect(() => {
    setHeightVal("");
  }, [productName]);
  const [shopifyProduct, setShopifyProduct] = useState<ShopifyProductData | null>(null);
  const [shopifyImages, setShopifyImages] = useState<ShopifyProductImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [shopifyLoading, setShopifyLoading] = useState<boolean>(false);
  const [desktopSwiper, setDesktopSwiper] = useState<any>(null);
  const [mobileSwiper, setMobileSwiper] = useState<any>(null);

  useEffect(() => {
    if (desktopSwiper && !desktopSwiper.destroyed && desktopSwiper.activeIndex !== currentImageIndex) {
      desktopSwiper.slideTo(currentImageIndex);
    }
  }, [currentImageIndex, desktopSwiper]);

  useEffect(() => {
    if (mobileSwiper && !mobileSwiper.destroyed && mobileSwiper.activeIndex !== currentImageIndex) {
      mobileSwiper.slideTo(currentImageIndex);
    }
  }, [currentImageIndex, mobileSwiper]);
  const [showDescPopup, setShowDescPopup] = useState<boolean>(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState<boolean>(false);
  const [showHeightToast, setShowHeightToast] = useState<boolean>(false);
  const [floaterVisible, setFloaterVisible] = useState<boolean>(false);
  // @ts-ignore
  const [navVisible, setNavVisible] = useState<boolean>(true);
  // @ts-ignore
  const [breadcrumbsActive, setBreadcrumbsActive] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const mobileDetailsRef = useRef<HTMLDivElement>(null);
  const mobileInfoRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();



  const allMedia = React.useMemo(() => {
    const list: { url: string; type: 'video' | 'image' }[] = [];

    // Add Shopify images ONLY
    if (shopifyImages && shopifyImages.length > 0) {
      shopifyImages.forEach(img => list.push({ url: img.url, type: 'image' }));
    } else if (productItem?.mainImageSrc && !productItem.mainImageSrc.endsWith('.mp4')) {
      list.push({ url: productItem.mainImageSrc, type: 'image' });
    }

    return list.length > 0 ? list : [{ url: "/safa-bloom.jpg", type: 'image' }];
  }, [shopifyImages, productItem]);

  const currentMedia = allMedia[currentImageIndex] || allMedia[0];

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allMedia.length);
  };
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  const triggerHeightToast = () => {
    setShowHeightToast(true);
    setTimeout(() => setShowHeightToast(false), 3500);
  };

  const handleAddToCart = () => {
    if (!productName) return;
    if (!heightVal.trim()) { triggerHeightToast(); return; }
    // Find matching variant by title/size, or fallback to the first variant
    const variant = shopifyProduct?.variants?.find(v => v.title.toLowerCase().includes(selectedSize.toLowerCase()) || v.title.toLowerCase() === selectedSize.toLowerCase())
      || shopifyProduct?.variants?.[0];

    // Extract numeric ID from gid://shopify/ProductVariant/46663554039868
    const numericVariantId = variant?.id ? variant.id.split('/').pop() : undefined;

    addToCart({
      id: slug,
      name: title,
      image: imageSrc,
      price: price,
      size: selectedSize,
      height: heightVal,
      heightUnit: heightUnit,
      variantId: numericVariantId,
    });
    // GA4: add_to_cart
    pushAddToCart({
      item_id: slug,
      item_name: title,
      item_brand: brand,
      price: parseNumericPrice(price),
      currency: "GBP",
      quantity: 1,
    });
    window.dispatchEvent(new CustomEvent('openCart'));
  };

  // Lock/unlock page scroll when popup is open (same as Cart)
  useEffect(() => {
    if (showDescPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showDescPopup]);

  // Sync navbar visibility, breadcrumbs active state, and details scroll position
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;

      // 1. Navbar visibility logic
      if (current < 100) {
        setNavVisible(true);
      } else if (current > lastScrollY) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }

      // 2. Breadcrumbs active state
      const isBActive = current > window.innerHeight * 0.8;
      setBreadcrumbsActive(isBActive);

      // 3. Floater visible (show when breadcrumbs are visible)
      setFloaterVisible(isBActive);

      lastScrollY = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDetails = useCallback(() => {
    if (mobileDetailsRef.current) {
      mobileDetailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Track product view in history
  useEffect(() => {
    if (productName) {
      const slug = productName.toLowerCase();
      try {
        const historyJson = localStorage.getItem("selhaya_view_history");
        let historySlugs: string[] = historyJson ? JSON.parse(historyJson) : [];
        // Remove if it exists to put it at the top
        historySlugs = historySlugs.filter((s) => s !== slug);
        historySlugs.unshift(slug);
        // Keep last 20 items max
        if (historySlugs.length > 20) {
          historySlugs = historySlugs.slice(0, 20);
        }
        localStorage.setItem("selhaya_view_history", JSON.stringify(historySlugs));
      } catch (e) {
        console.error("Failed to update view history", e);
      }
    }
  }, [productName]);

  // Close popup when clicking outside
  useEffect(() => {
    if (!showDescPopup) return;
    const handleOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowDescPopup(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [showDescPopup]);

  const slug = productName?.toLowerCase().replace(/\s+/g, '-') ?? "";

  const brandMap: Record<string, string> = {
    "malika-drape": "HAYA ROBES", "sharifa-cut": "HAYA ROBES",
    "safa-bloom": "HAYA ROBES", "noor-flow": "HAYA ROBES",
    yaqeen: "HERITAGE EDITION", "amara-flame": "WAVE OF LIGHTS",
    sabi: "WAVE OF LIGHTS", "ziya-blue": "WAVE OF LIGHTS",
    sakura: "WAVE OF LIGHTS", "rina-lemon": "WAVE OF LIGHTS",
    tatiana: "ROSE OF RESILIENCE", seraphina: "ROSE OF RESILIENCE",
    clara: "ROSE OF RESILIENCE", halime: "ROSE OF RESILIENCE",
    farhana: "ROSE OF RESILIENCE",
  };
  const descriptionMap: Record<string, string> = {
    "malika-drape": "A regal drape designed for modern silhouettes, blending sculptural tailoring with rich silk heritage.",
    "sharifa-cut": "A sharply tailored statement for the contemporary woman who moves with quiet authority.",
    "safa-bloom": "An ode to delicate blooms, crafted in pure silk for ceremonies and unforgettable evenings.",
    "noor-flow": "A fluid expression of light and movement, created to carry you gracefully through every occasion.",
    yaqeen: "A heritage piece rooted in quiet devotion, crafted with soft silk and ancestral reverence.",
    "amara-flame": "An elegant celebration of fire-lit evenings, finished with hand-applied couture details.",
    sabi: "A calm, refined silhouette inspired by balance, designed for luxurious modern living.",
    "ziya-blue": "A luminous blue creation made to evoke twilight reflections and graceful motion.",
    sakura: "A poetic spring inspired piece with subtle floral structure and serene movement.",
    "rina-lemon": "A fresh, citrus-infused statement of light silk craftsmanship and joyful elegance.",
    clara: "A timeless expression of grace and refinement, crafted with pure silk and understated elegance.",
    farhana: "A celebration of feminine grace, blending delicate craftsmanship with luxurious silk.",
    halime: "A refined silhouette that honours grace and sophistication with every carefully placed stitch.",
    seraphina: "An ethereal creation where lightness and luxury dance together in perfect harmony.",
    tatiana: "A bold and beautiful statement of strength, draped with modern sensibility and timeless grace.",
  };
  const priceMap: Record<string, string> = {
    "malika-drape": "£ 4700", "sharifa-cut": "£ 4700",
    "safa-bloom": "£ 4700", "noor-flow": "£ 4700",
    yaqeen: "£ 5200", "amara-flame": "£ 4900",
    sabi: "£ 4600", "ziya-blue": "£ 4800",
    sakura: "£ 4500", "rina-lemon": "£ 4700",
    clara: "£ 4700", farhana: "£ 4700",
    halime: "£ 4700", seraphina: "£ 4700",
    tatiana: "£ 4700",
  };

  useEffect(() => {
    if (!productName) return;
    const rawHandle = productName.toLowerCase().replace(/\s+/g, '-');

    let active = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShopifyLoading(true);

    // Handle local slug → Shopify handle mapping
    const handleMap: Record<string, string> = {
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
    const shopifyHandle = handleMap[rawHandle] || rawHandle;

    fetchShopifyProductByHandle(shopifyHandle)
      .then((result) => {
        if (!active) return;
        if (result) {
          setShopifyProduct(result);
          setShopifyImages(result.images);
          // GA4: view_item — fire with current viewed product data
          pushViewItem({
            item_id: rawHandle,
            item_name: result.title || rawHandle.toUpperCase(),
            item_brand: result.collection || result.vendor || brandMap[rawHandle] || "SELHAYA",
            price: parseNumericPrice(result.price),
            currency: "GBP",
            quantity: 1,
          });
        } else {
          // Fallback if Shopify returned null
          pushViewItem({
            item_id: rawHandle,
            item_name: productItem?.title || rawHandle.replace(/-/g, " ").toUpperCase(),
            item_brand: brandMap[rawHandle] || "SELHAYA",
            price: parseNumericPrice(priceMap[rawHandle] || "4700"),
            currency: "GBP",
            quantity: 1,
          });
        }
      })
      .catch(() => {
        if (!active) return;
        // Fallback on error
        pushViewItem({
          item_id: rawHandle,
          item_name: productItem?.title || rawHandle.replace(/-/g, " ").toUpperCase(),
          item_brand: brandMap[rawHandle] || "SELHAYA",
          price: parseNumericPrice(priceMap[rawHandle] || "4700"),
          currency: "GBP",
          quantity: 1,
        });
      })
      .finally(() => { if (active) setShopifyLoading(false); });

    return () => { active = false; };
  }, [productName, productItem]);

  const title = shopifyProduct?.title || productItem?.title || slug.replace(/-/g, " ").toUpperCase();
  const brand = shopifyProduct?.collection || brandMap[slug] || shopifyProduct?.vendor || "SELHAYA EDITION";
  const description =
    shopifyProduct?.description || productItem?.content ||
    descriptionMap[slug] ||
    "A refined product from Selhaya, crafted with the quiet luxury of timeless silk and modern attention to detail.";
  const price = shopifyProduct?.price || priceMap[slug] || "£ 4700";
  const imageSrc = currentMedia.url;
  const imageAlt = `${title} – product image`;

  // Plain text from Shopify HTML or fallback
  const plainText = (() => {
    const html = shopifyProduct?.descriptionHtml;
    if (html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      return doc.body.textContent || description;
    }
    return description;
  })();

  const hasProductData = Boolean(shopifyProduct || productItem);
  if (shopifyLoading && !hasProductData) {
    return <div className="p-8 text-center text-text">Loading product…</div>;
  }
  if (!hasProductData) {
    return <div className="p-8 text-center text-text">Product not found</div>;
  }

  useEffect(() => {
    if (title || productName) {
      const slug = productName?.toLowerCase().replace(/\s+/g, '-');
      const productSeo = slug ? PRODUCT_SEO_CONFIG[slug] : undefined;

      const pageTitle = productSeo?.title || (title ? `${title} | SELHAYA®️` : "SELHAYA®️");
      document.title = pageTitle;

      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }

      const customDesc = productSeo?.description;
      const descText = customDesc || plainText || description || DEFAULT_PRODUCT_SEO.description;
      const cleanDesc = descText.replace(/\s+/g, ' ').trim();
      metaDescription.setAttribute('content', cleanDesc.substring(0, 300));
    }
  }, [title, plainText, description, productName]);

  const renderInfoPanel = (isMobile = false) => (
    <div className={isMobile ? "pd-info-mobile" : "pd-info-desktop"}>
      {/* Brand */}
      <p className="pd-brand">{brand}</p>

      {/* Title */}
      <h1 className="pd-title">{title}</h1>

      {/* Description — 3 lines + "view" popup button */}
      <div className="pd-desc-wrapper" style={{ position: 'relative' }}>
        <p className="pd-desc">
          {plainText}
        </p>
        <button
          type="button"
          className="pd-view-btn"
          onClick={() => setShowDescPopup(true)}
        >
          view
        </button>

        {/* Description popup — animated sliding drawer */}
        <AnimatePresence>
          {showDescPopup && (
            <>
              {/* Overlay */}
              <motion.div
                className="fixed inset-0 bg-black/60 z-[90]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowDescPopup(false)}
              />

              {/* Drawer */}
              <motion.div
                ref={popupRef}
                data-lenis-prevent
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="fixed top-0 right-0 z-[100] h-screen w-full md:w-[500px] bg-[#FAF7F2] overflow-y-auto px-8 py-10 shadow-2xl"
              >
                <div className="flex justify-between items-start mb-6 border-b border-[#E0D8CE] pb-4">
                  <h2 className="text-[20px] uppercase font-medium text-text" style={{ fontFamily: "'Silver Editorial', serif" }}>
                    Details
                  </h2>
                  <button
                    onClick={() => setShowDescPopup(false)}
                    className="text-xs uppercase hover:opacity-60 transition text-[#8A7A6E] mt-1"
                  >
                    Close
                  </button>
                </div>
                {shopifyProduct?.descriptionHtml ? (
                  <div
                    className="pd-desc-popup__html"
                    dangerouslySetInnerHTML={{ __html: shopifyProduct.descriptionHtml }}
                  />
                ) : (
                  <p className="pd-desc-popup__text" style={{ paddingRight: 0 }}>{plainText}</p>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>


      {/* <p className="pd-price">{price}</p>
      <p className="pd-tax">Including All Taxes</p> */}

      {/* Size */}
      <div className="pd-size-row">
        <div className="pd-size-options">
          {SIZES.map((s) => (
            <button
              key={s.code}
              onClick={() => setSelectedSize(s.code)}
              className={`pd-size-btn${selectedSize === s.code ? " pd-size-btn--active" : ""}`}
            >
              {isMobile ? `[${s.code}]` : `${s.label} [${s.code}]`}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setSizeGuideOpen(true)} className="pd-size-guide">
          Size Guide
        </button>
      </div>

      {/* Height */}
      <div className="pd-height-row" style={{ width: '100%' }}>
        <p className="pd-height-label">Height</p>
        <div className="pd-height-inputs">
          <input
            type="number"
            value={heightVal}
            onChange={(e) => setHeightVal(e.target.value)}
            placeholder="000"
            className="pd-height-input"
          />
          <div className="pd-unit-row">
            <button
              onClick={() => setHeightUnit('inch')}
              className={`pd-unit-btn${heightUnit === 'inch' ? ' pd-unit-btn--active' : ''}`}
            >
              {(() => {
                if (heightUnit === 'cm' && heightVal) {
                  const cm = Number(heightVal);
                  if (cm && !isNaN(cm)) {
                    const totalInches = Math.round(cm / 2.54);
                    const feet = Math.floor(totalInches / 12);
                    const inches = totalInches % 12;
                    return <span style={{ fontSize: '14px', color: '#281B13' }}>{`${feet}'${inches}"`}</span>;
                  }
                }
                return "Inch";
              })()}
            </button>
            <button
              onClick={() => setHeightUnit('cm')}
              className={`pd-unit-btn${heightUnit === 'cm' ? ' pd-unit-btn--active' : ''}`}
            >Cm</button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="pd-cta-row" style={{ display: 'block', width: '100%' }}>
        <button
          className="pd-add-to-cart"
          style={{ width: '100%' }}
          onClick={handleAddToCart}
          data-cta="product_add_to_bag"
        >
          Reserve the Piece
        </button>
        <p style={{ fontSize: '13px', lineHeight: '1.5', marginTop: '16px', color: '#8A7A6E', fontFamily: "'DM Sans', sans-serif" }}>
          Want to commission a bespoke version of this piece? <a 
            href={`https://wa.me/+447908236431?text=Hi,%20I%20am%20interested%20in%20bespoke%20version%20of%20${encodeURIComponent(title)}.`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'underline', color: '#281B13' }}
          >Request Your Creation</a>
        </p>
      </div>

      {/* VIP */}
      <p className="pd-vip-note">
        The House offers private reservation via WhatsApp for <strong>VIP clients.</strong>
      </p>
      <a
        href={`https://wa.me/+447908236431?text=Hi!%20I%20want%20to%20have%20a%20reservation%20for%20${encodeURIComponent(title)}.%20`}
        target="_blank"
        rel="noopener noreferrer"
        className="pd-whatsapp"
      >
        {WA_ICON} Message us on WhatsApp
      </a>
    </div>
  );

  return (
    <>
      {/* ── HEIGHT REQUIRED TOAST ─────────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed', top: '24px',
          right: showHeightToast ? '24px' : '-420px',
          zIndex: 9999, display: 'flex', alignItems: 'flex-start', gap: '14px',
          background: '#281B13', color: '#FAF7F2', padding: '16px 20px',
          minWidth: '320px', maxWidth: '380px',
          boxShadow: '0 8px 32px rgba(40,27,19,0.22)',
          transition: 'right 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          borderLeft: '3px solid #B1A08F',
        }}
        role="alert" aria-live="assertive"
      >
        <div style={{ flexShrink: 0, marginTop: '2px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B1A08F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 21h10" /><path d="M12 3c-1.2 5.4-2.3 8.3-5 11h10c-2.7-2.7-3.8-5.6-5-11Z" /><path d="M3 18h18" />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '4px', color: '#FAF7F2' }}>Height Required</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#C8BDB5' }}>Please enter your height so we can tailor the garment perfectly for you.</p>
        </div>
        <button onClick={() => setShowHeightToast(false)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8A7A6E', flexShrink: 0, padding: '0', marginTop: '1px' }}
          aria-label="Dismiss">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* ── DESKTOP — exactly ONE viewport height ─────────────────────────── */}
      <section className="pd-desktop">
        {/* LEFT — image/video, full height, no black bars */}
        <div className="pd-image-wrap">
          <Swiper
            onSwiper={setDesktopSwiper}
            onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
            className="h-full w-full"
            slidesPerView={1}
            loop={false}
          >
            {allMedia.map((media, idx) => (
              <SwiperSlide key={idx}>
                {media.type === 'video' ? (
                  <video
                    src={media.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="pd-image"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                ) : (
                  <img src={media.url} alt={imageAlt} className="pd-image" style={{ width: '100%', height: '100%' }} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {allMedia.length > 1 && (
            <div className="pd-image-nav">
              <button onClick={handlePrevImage} className="pd-nav-arrow" aria-label="Previous image">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button onClick={handleNextImage} className="pd-nav-arrow" aria-label="Next image">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* RIGHT — info panel, vertically centered, fixed height */}
        <div className="pd-info-wrap">
          {renderInfoPanel()}
        </div>
      </section>

      {/* ── MOBILE ────────────────────────────────────────────────────────── */}
      <section className="pd-mobile">
        {/* Sticky Floater — mobile & tablet only (animated brown bar style placed below breadcrumbs) */}
        {floaterVisible && (
          <motion.div
            key="product-bar-floater"
            layout={false}
            initial={false}
            animate={{
              opacity: floaterVisible ? 1 : 0,
              bottom: 50,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            style={{
              position: "fixed",
              pointerEvents: floaterVisible ? "auto" : "none",
            }}
            className="pd-floater-bar w-full"
            onClick={scrollToDetails}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && scrollToDetails()}
          >
            <span className="pd-floater-bar__action">Reserve the Piece</span>
            <span className="pd-floater-bar__price">{price}</span>
          </motion.div>
        )}

        {/* Image/Video */}
        <div className="pd-mobile-image-wrap" ref={mobileDetailsRef}>
          <Swiper
            onSwiper={setMobileSwiper}
            onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
            className="h-full w-full"
            slidesPerView={1}
            loop={false}
          >
            {allMedia.map((media, idx) => (
              <SwiperSlide key={idx}>
                {media.type === 'video' ? (
                  <video
                    src={media.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="pd-mobile-image"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                ) : (
                  <img src={media.url} alt={imageAlt} className="pd-mobile-image" style={{ width: '100%', height: '100%' }} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          {allMedia.length > 1 && (
            <div className="pd-image-nav pd-image-nav--mobile">
              <button onClick={handlePrevImage} className="pd-nav-arrow" aria-label="Previous image">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button onClick={handleNextImage} className="pd-nav-arrow" aria-label="Next image">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          )}
        </div>
        {/* Info */}
        <div ref={mobileInfoRef}>
          {renderInfoPanel(true)}
        </div>
      </section>

      {/* ── SCOPED STYLES ─────────────────────────────────────────────────── */}
      <style>{`
        /* ══ VISIBILITY GATES ══ */
        .pd-desktop { display: flex; }
        .pd-mobile  { display: none; }
        @media (max-width: 1024px) {
          .pd-desktop { display: none !important; }
          .pd-mobile  { display: block !important; }
        }

        /* ══ DESKTOP — ONE VIEWPORT ══ */
        .pd-desktop {
          width: 100%;
          height: 100vh;          /* ← single viewport, all devices */
          display: flex;
          align-items: stretch;
          background: var(--color-primary-light);
          overflow: hidden;
        }

        /* ── LEFT IMAGE ── */
        .pd-image-wrap {
          width: 50%;
          height: 100%;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          background: var(--color-primary-light);  /* cream bg = no black bars */
        }
        .pd-image-wrap .swiper {
          width: 100%;
          height: 100%;
        }
        .pd-image {
          width: 100%;
          height: 100%;
          object-fit: cover;             /* fill panel completely, no side bars */
          object-position: center top;    /* anchor to top so face/body stays visible */
          display: block;
        }

        /* Carousel nav */
        .pd-image-nav {
          position: absolute;
          top: 50%;
          left: 0; right: 0;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          pointer-events: none;
          z-index: 10;
        }
        .pd-image-nav--mobile { padding: 0 12px; }
        .pd-nav-arrow {
          pointer-events: auto;
          background: rgba(255,255,255,0.88);
          border: none;
          width: 44px; height: 44px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #281B13;
          transition: background 0.2s ease, transform 0.2s ease;
          flex-shrink: 0;
        }
        .pd-nav-arrow:hover { background: #fff; transform: scale(1.08); }
        .pd-nav-arrow:active { transform: scale(0.94); }

        /* ── RIGHT INFO WRAP ── */
        .pd-info-wrap {
          width: 50%;
          height: 100%;
          flex-shrink: 0;
          display: flex;
          align-items: center;      /* vertically center all content */
          justify-content: flex-start;
          background: var(--color-primary-light);
          overflow: hidden;         /* height never grows */
          position: relative;
          padding: 0 clamp(32px, 5vw, 100px) 0 clamp(32px, 4vw, 56px);
        }

        /* ══ INFO BOX (shared desktop) ══ */
        .pd-info-desktop {
          width: 100%;
          max-width: 520px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
        }

        /* Brand */
        .pd-brand {
          font-family: "DM Sans", sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-secondary-2);
          margin: 0 0 30px;
        }

        /* Title */
        .pd-title {
          font-size: clamp(24px, 2.4vw, 36px);
          line-height: 1.2;
          text-transform: uppercase;
          color: var(--color-primary-dark);
          margin: 0 0 12px;
          text-align: left;
        }

        /* Description wrapper */
        .pd-desc-wrapper {
          width: 100%;
          margin-bottom: 10px;
        }

        /* 3-line clamp — fixed height, never expands layout */
        .pd-desc {
          font-family: "DM Sans", sans-serif;
          font-size: clamp(14px, 1.2vw, 17px);
          line-height: 1.55;
          font-weight: 300;
          color: var(--color-text);
          margin: 0 0 4px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* "view" inline button */
        .pd-view-btn {
          background: none;
          border: none;
          padding: 0;
          font-family: "DM Sans", sans-serif;
          font-size: clamp(13px, 1.1vw, 15px);
          font-weight: 400;
          color: var(--color-text);
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
          display: inline-block;
          margin-bottom: 12px;
        }

        /* ── DESCRIPTION POPUP (500px × max 80vh, scrollable) ── */
        .pd-desc-popup {
          position: absolute;
          top: 0;
          right: 0;
          width: 500px;
          max-height: 80vh;
          background: #FAF7F2;
          border: 1px solid #E0D8CE;
          box-shadow: 0 8px 32px rgba(40,27,19,0.16);
          padding: 24px 24px 20px;
          overflow-y: auto;
          z-index: 100;
          border-radius: 2px;
        }
        .pd-desc-popup__close {
          position: sticky;
          top: 0;
          right: 0;
          background: none;
          border: none;
          font-size: 24px;
          line-height: 1;
          cursor: pointer;
          color: #8A7A6E;
          padding: 0 0 8px 0;
          float: right;
          z-index: 101;
        }
        .pd-desc-popup__close:hover { color: #281B13; }
        .pd-desc-popup__text {
          font-family: "DM Sans", sans-serif;
          font-size: clamp(14px, 1.2vw, 17px);
          line-height: 1.65;
          font-weight: 300;
          color: var(--color-text);
          margin: 0;
          padding-right: 16px;
        }

        /* Rich HTML from Shopify descriptionHtml */
        .pd-desc-popup__html {
          font-family: "DM Sans", sans-serif;
          font-size: 15px;
          line-height: 1.75;
          font-weight: 300;
          color: var(--color-text);
        }
        .pd-desc-popup__html p {
          margin: 0 0 14px;
          color: #281B13;
        }
        .pd-desc-popup__html h1,
        .pd-desc-popup__html h2,
        .pd-desc-popup__html h3,
        .pd-desc-popup__html h4 {
          font-family: var(--font-editorial, 'Cormorant Garamond', serif);
          font-weight: 600;
          color: #281B13;
          margin: 22px 0 8px;
          line-height: 1.3;
        }
        .pd-desc-popup__html h1 { font-size: 22px; }
        .pd-desc-popup__html h2 { font-size: 19px; }
        .pd-desc-popup__html h3 { font-size: 17px; }
        .pd-desc-popup__html strong, .pd-desc-popup__html b {
          font-weight: 600;
          color: #281B13;
        }
        .pd-desc-popup__html em, .pd-desc-popup__html i {
          font-style: italic;
        }
        .pd-desc-popup__html ul, .pd-desc-popup__html ol {
          margin: 0 0 14px 18px;
          padding: 0;
        }
        .pd-desc-popup__html li {
          margin-bottom: 6px;
        }
        .pd-desc-popup__html a {
          color: #8A7A6E;
          text-decoration: underline;
        }
        .pd-desc-popup__html br { display: block; margin: 4px 0; }

        /* Price */
        .pd-price {
          font-family: "DM Sans", sans-serif;
          font-size: clamp(18px, 1.7vw, 24px);
          font-weight: 500;
          color: var(--color-text);
          margin: 0 0 2px;
        }
        .pd-tax {
          font-family: "DM Sans", sans-serif;
          font-size: 12px;
          color: #281B13;
          margin: 0 0 14px;
        }

        /* Size */
        .pd-size-row {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .pd-size-options { display: flex; gap: 14px; }
        .pd-size-btn {
          font-family: "DM Sans", sans-serif;
          font-size: clamp(13px, 1vw, 15px);
          font-weight: 400;
          color: var(--color-secondary-2);
          background: transparent; border: none;
          cursor: pointer; padding: 0;
          transition: color 0.15s ease;
        }
        .pd-size-btn--active { font-weight: 600; color: var(--color-text); }
        .pd-size-guide {
          font-family: "DM Sans", sans-serif;
          font-size: clamp(13px, 1vw, 15px);
          font-weight: 400;
          color: var(--color-text);
          text-decoration: underline;
          text-underline-offset: 3px;
          background: none; border: none; cursor: pointer;
        }

        /* Height */
        .pd-height-row { margin-bottom: 20px; }
        .pd-height-label {
          font-family: "DM Sans", sans-serif;
          font-size: 13px;
          color: #281B13;
          margin: 0 0 10px;
        }
        .pd-height-inputs {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .pd-height-input {
          border: none;
          border-bottom: 1px solid #B1A08F;
          background: transparent;
          color: #281B13;
          font-family: "DM Sans", sans-serif;
          font-size: 14px;
          width: 60px;
          padding-bottom: 4px;
          outline: none;
        }
        .pd-height-input::placeholder { color: #B1A08F; }
        .pd-unit-row { display: flex; gap: 6px; }
        .pd-unit-btn {
          font-family: "DM Sans", sans-serif;
          font-size: 12px;
          padding: 4px 12px;
          border: none; cursor: pointer;
          background: transparent;
          color: #8A7A6E;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .pd-unit-btn--active { background: #B1A08F; color: #fff; }

        /* CTA */
        .pd-cta-row {
          display: flex; align-items: center; gap: 20px;
          margin-bottom: 14px;
        }
        .pd-add-to-cart {
          font-family: "DM Sans", sans-serif;
          font-size: 14px; font-weight: 500;
          color: var(--color-white);
          background: var(--color-primary-dark);
          border: none; padding: 12px 32px;
          cursor: pointer; letter-spacing: 0.04em;
          transition: background 0.2s ease;
        }
        .pd-add-to-cart:hover { background: var(--color-choclate-brown); }
        .pd-request {
          font-family: "DM Sans", sans-serif;
          font-size: 14px; font-weight: 400;
          color: var(--color-text);
          text-decoration: underline; text-underline-offset: 3px;
        }

        /* VIP */
        .pd-vip-note {
          font-family: "DM Sans", sans-serif;
          font-size: 12px; font-weight: 300;
          color: var(--color-secondary-2);
          margin: 0 0 6px; line-height: 1.4;
        }
        .pd-whatsapp {
          display: flex; align-items: center;
          font-family: "DM Sans", sans-serif;
          font-size: 13px; font-weight: 400;
          color: var(--color-text);
          text-decoration: underline; text-underline-offset: 3px;
        }

        /* ══ TABLET (769-1180px) — still one viewport ══ */
        @media (min-width: 769px) and (max-width: 1180px) {
          .pd-info-desktop { max-width: 100%; }
        }

        /* ══ STICKY FLOATER (mobile + tablet only - brown bar format) ══ */
        .pd-floater-bar {
          display: none; /* hidden on desktop */
          align-items: center;
          justify-content: space-between;
          padding: 6px 24px;
          background: var(--color-primary-dark, #402C1F);
          box-shadow: 0 8px 24px rgba(40, 27, 19, 0.2);
          cursor: pointer;
          pointer-events: auto;
          outline: none;
          border: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 250;
        }
        .pd-floater-bar__action {
          font-size: 16px;
          font-weight: 500;
          color: #FAF7F2;
        }
        .pd-floater-bar__price {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #FAF7F2;
        }
        @media (max-width: 768px) {
          .pd-floater-bar { display: flex; }
        }

        /* ══ MOBILE ══ */
        .pd-mobile {
          background: var(--color-primary-light);
        }
        .pd-mobile-image-wrap {
          width: 100%;
          height: 460px;
          position: relative;
          overflow: hidden;
          background: var(--color-primary-light);
        }
        .pd-mobile-image-wrap .swiper {
          width: 100%;
          height: 100%;
        }
        .pd-mobile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        .pd-info-mobile {
          padding: 28px 16px 36px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
        }
        @media (max-width: 1024px) {
          .pd-title { font-size: 24px; margin-bottom: 10px; }
          .pd-desc  { font-size: 14px; }
          .pd-price { font-size: 20px; }
          .pd-add-to-cart { width: 100%; }
          .pd-desc-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            right: auto;
            transform: translate(-50%, -50%);
            width: calc(100vw - 32px);
            max-width: 500px;
            max-height: 80vh;
          }
          .pd-desc-popup__text {
            font-size: 14px;
          }
        }
      `}</style>

      <Structured slug={slug} images={(() => {
        // Map product slugs to their public/products/slider/<folder> names
        const sliderFolderMap: Record<string, string> = {
          "amara-flame": "amara",
          "malika-drape": "malika",
          "noor-flow": "noor",
          "rina-lemon": "rina",
          "sabi": "sabi",
          "safa-bloom": "safa",
          "sakura": "sakura",
          "sharifa-cut": "sharifa",
          "yaqeen": "yaqeen",
          "ziya-blue": "ziya",
          "seraphina": "seraphina",
          "halime": "halime",
          "clara": "clara",
          "tatiana": "tatiana",
          "farhana": "farhana",
        };
        const folder = sliderFolderMap[slug];
        if (!folder) return undefined;
        return [
          `/products/slider/${folder}/slider1.png`,
          `/products/slider/${folder}/slider2.png`,
          `/products/slider/${folder}/slider3.png`,
        ];
      })()} />
      <SizeGuide isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </>
  );
};

export default ProductDetails;