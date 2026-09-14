import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { ResilienceItem } from "../../types/resilienceTypes";
import { resilienceData } from "./resilienceData";
import { useProductURL } from "../../hooks/useProductURL";
import { createPatchedDataWithShopifyURLs } from "../../lib/dataPatcher";
import { pushViewItemList, pushSelectItem, parseNumericPrice } from "../../lib/gtm";
import { productBySlug } from "../../lib/productImages";

/* ─────────────────────────────────────────────
   Props
───────────────────────────────────────────── */
interface ResilienceProps {
  data?: ResilienceItem[];
  onCardClick?: (productName: string) => void;
  isClickable?: boolean;
  baseRoute?: string;
  specialSecondRowRightBg?: string;
  isProductPage?: boolean;
  landscapeFirstRow?: boolean;
  productSlug?: string;
}

/* ─────────────────────────────────────────────
   Helper to render <br/> tags safely
───────────────────────────────────────────── */
const renderTextWithBr = (text: string | undefined) => {
  if (!text) return null;
  return text.split(/<br\s*\/?>/i).map((part, index, array) => (
    <React.Fragment key={index}>
      {part}
      {index < array.length - 1 && <br />}
    </React.Fragment>
  ));
};

/* ─────────────────────────────────────────────
   Shared content block — title, content, enter
───────────────────────────────────────────── */
const ContentBlock: React.FC<{
  item: ResilienceItem;
  isClickable?: boolean;
  onCardClick?: () => void;
  isProductPage?: boolean;
}> = ({ item, isClickable, onCardClick, isProductPage }) => {
  const isId1 = isProductPage && item.id === 1;
  const isId2 = isProductPage && item.id === 2;

  let TitleTag: keyof React.JSX.IntrinsicElements = "h2";
  let titleClass = "resilience-title-default";

  if (isId1) {
    TitleTag = "h1";
    titleClass = "resilience-title-1";
  } else if (isId2) {
    TitleTag = "h4";
    titleClass = "resilience-title-2";
  }

  return (
    <div
      onClick={isClickable && onCardClick ? (e) => { e.stopPropagation(); onCardClick(); } : undefined}
      style={{
        width: isId2 ? "400px" : "329px",
        maxWidth: "90vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        cursor: isClickable ? "pointer" : "default",
      }}
    >
      <TitleTag className={titleClass} style={{ fontSize: "20px" }}>
        {renderTextWithBr(item.title)}
      </TitleTag>

      <p
        style={{
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "1.4",
          color: "#281B13",
          margin: "8px 0 0 0",
        }}
      >
        {renderTextWithBr(item.content)}
      </p>

      {item.enterLabel && (
        <a
          href={item.enterHref}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isClickable && onCardClick) {
              onCardClick();
            } else if (item.enterHref) {
              window.location.href = item.enterHref;
            }
          }}
          data-cta="collection_enter_product"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "1",
            color: "#281B13",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
            letterSpacing: "0.04em",
            marginTop: "10px",
            display: "inline-block",
          }}
        >
          {item.enterLabel}
        </a>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Desktop Arch card — cream bg, arch thumb + content
───────────────────────────────────────────── */
const ArchCard: React.FC<{
  item: ResilienceItem;
  isClickable?: boolean;
  onCardClick?: () => void;
  bgColor?: string;
  isProductPage?: boolean;
}> = ({ item, isClickable, onCardClick, bgColor, isProductPage }) => {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      onClick={isClickable ? onCardClick : undefined}
      style={{
        backgroundColor: bgColor ?? "#F9F4EE",
        cursor: isClickable ? "pointer" : "default",
      }}
    >
      {/* Arched thumbnail — 252×367 */}
      <div
        className="overflow-hidden flex-shrink-0"
        style={{
          width: "200px",
          height: "300px",
          borderRadius: "151px 151px 0 0",
        }}
      >
        <img
          src={item.thumbImageSrc}
          alt={item.thumbImageAlt}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Content block — 37px below thumb */}
      <div style={{ marginTop: "50px" }}>
        <ContentBlock item={item} isClickable={isClickable} onCardClick={onCardClick} isProductPage={isProductPage} />
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Helper to get product folder from slug
───────────────────────────────────────────── */
const getProductFolder = (slug?: string): string => {
  if (!slug) return "";
  return slug.split("-")[0];
};

/* ─────────────────────────────────────────────
   Full-bleed image/video panel
───────────────────────────────────────────── */
const ImagePanel: React.FC<{ item: ResilienceItem }> = ({
  item
}) => {
  const isVideo = item.mainImageSrc?.endsWith('.mp4');

  return (
    <div className="w-full h-full overflow-hidden">
      {isVideo ? (
        <video
          src={item.mainImageSrc}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-screen object-cover object-top"
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "cover",
            objectPosition: "top",
            display: "block",
          }}
        />
      ) : (
        <img
          src={item.mainImageSrc}
          alt={item.mainImageAlt}
          className="w-full h-screen object-cover object-top"
        />
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Landscape hero row — ONLY video here, id 1 only
───────────────────────────────────────────── */
const LandscapeRow: React.FC<{
  item: ResilienceItem;
  productSlug?: string;
}> = ({ item, productSlug }) => {
  const productFolder = getProductFolder(productSlug);
  const videoSrc = productFolder
    ? `/main-product/products/${productFolder}/story.mp4`
    : "";

  return (
    <>
      {/* ── DESKTOP (md+) ── full viewport landscape hero with video */}
      <div className="hidden md:block w-full" style={{ position: "relative", height: "100vh" }}>
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
        ) : (
          <img
            src={item.mainImageSrc}
            alt={item.mainImageAlt}
            className="w-full h-full"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        )}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: "60px",
            background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
            paddingTop: "120px",
          }}
        >
          <h1 className="resilience-title-1" style={{ color: "#FFFFFF" }}>
            {renderTextWithBr(item.title)}
          </h1>
          {item.content && (
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "1.4",
                color: "#FFFFFF",
                margin: "12px 0 0 0",
              }}
            >
              {renderTextWithBr(item.content)}
            </p>
          )}
        </div>
      </div>

      {/* ── MOBILE (below md) ── same height as id:2 row image (496px) with video */}
      <div className="block md:hidden w-full" style={{ position: "relative", height: "496px" }}>
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
        ) : (
          <img
            src={item.mainImageSrc}
            alt={item.mainImageAlt}
            className="w-full h-full"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        )}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: "30px",
            background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
            paddingTop: "80px",
          }}
        >
          <h1 className="resilience-title-1" style={{ color: "#FFFFFF", fontSize: "20px" }}>
            {renderTextWithBr(item.title)}
          </h1>
          {item.content && (
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "1.4",
                color: "#FFFFFF",
                margin: "8px 0 0 0",
              }}
            >
              {renderTextWithBr(item.content)}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

/* ─────────────────────────────────────────────
   Single row — alternates card/image each row
───────────────────────────────────────────── */
const ResilienceRow: React.FC<{
  item: ResilienceItem;
  index: number;
  isClickable?: boolean;
  onCardClick?: () => void;
  specialSecondRowRightBg?: string;
  isProductPage?: boolean;
  landscapeFirstRow?: boolean;
  productSlug?: string;
}> = ({
  item,
  index,
  isClickable,
  onCardClick,
  specialSecondRowRightBg,
  isProductPage,
  landscapeFirstRow,
  productSlug,
}) => {
    /* HAYA products that use full viewport for BOTH id:1 and id:2 */
    const hayaFullViewportProducts = ['sharifa-cut', 'noor-flow', 'safa-bloom', 'malika-drape'];
    /* Other products that use full viewport for id:2 only */


    const disableLandscapeForProducts = hayaFullViewportProducts;
    const shouldDisableLandscape = disableLandscapeForProducts.includes(productSlug || '');

    /* If landscapeFirstRow is enabled and this is the first row, render landscape hero */
    if (landscapeFirstRow && index === 0 && !shouldDisableLandscape) {
      return <LandscapeRow item={item} productSlug={productSlug} />;
    }

    const isEven = index % 2 === 0; // 0,2 → card left | 1,3 → image left
    const isSecondRowRight = !isEven && typeof specialSecondRowRightBg === "string";
    const mobileBgColor = isSecondRowRight ? specialSecondRowRightBg : "#F9F4EE";
    const archCardBgColor = isSecondRowRight ? specialSecondRowRightBg : undefined;

    const desktopHeight = "100vh";

    return (
      <>
        {/* ── DESKTOP (md+) ── */}
        <div className="hidden md:flex w-full" style={{ height: desktopHeight }}>
          {isEven ? (
            <>
              <div className="w-1/2 h-screen">
                <ArchCard item={item} isClickable={isClickable} onCardClick={onCardClick} isProductPage={isProductPage} />
              </div>
              <div className="w-1/2 h-screen">
                <ImagePanel item={item} />
              </div>
            </>
          ) : (
            <>
              <div className="w-1/2 h-screen">
                <ImagePanel item={item} />
              </div>
              <div className="w-1/2 h-screen">
                <ArchCard item={item} isClickable={isClickable} onCardClick={onCardClick} bgColor={archCardBgColor} isProductPage={isProductPage} />
              </div>
            </>
          )}
        </div>

        {/* ── MOBILE (below md) ── */}
        <div className="flex md:hidden flex-col w-full items-center">
          {/* Top: full-bleed image — 496px */}
          <div className="w-full flex-shrink-0" style={{ height: "496px" }}>
            <ImagePanel item={item} />
          </div>

          {/* Bottom: cream bg, arch thumb + content centered */}
          <div
            className="flex justify-center w-full"
            onClick={isClickable ? onCardClick : undefined}
            style={{
              backgroundColor: mobileBgColor,
              paddingBottom: "40px",
              cursor: isClickable ? "pointer" : "default",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Arch thumbnail */}
              <div style={{ marginTop: "30px" }}>
                <div
                  className="overflow-hidden"
                  style={{
                    width: "178px",
                    height: "267px",
                    borderRadius: "89px 89px 0 0",
                  }}
                >
                  <img
                    src={item.thumbImageSrc}
                    alt={item.thumbImageAlt}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Content block */}
              <div style={{ marginTop: "40px" }}>
                <ContentBlock item={item} isClickable={isClickable} onCardClick={onCardClick} isProductPage={isProductPage} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

/* ─────────────────────────────────────────────
   Main exported component
   — uses passed `data` prop, falls back to default
───────────────────────────────────────────── */
const Resilience: React.FC<ResilienceProps> = ({
  data,
  onCardClick,
  isClickable = false,
  baseRoute = "/selhaya-collections/haya",
  specialSecondRowRightBg,
  isProductPage,
  landscapeFirstRow,
  productSlug,
}) => {
  const rawItems = data ?? resilienceData;
  const [items, setItems] = React.useState<ResilienceItem[]>(rawItems);
  const navigate = useNavigate();
  const { url: shopifyProductURL } = useProductURL(productSlug || "");

  // Derive a human-readable list name from the baseRoute prop
  const listName = React.useMemo(() => {
    const routeToName: Record<string, string> = {
      "/selhaya-collections/haya": "Haya Robes",
      "/selhaya-collections/waves-of-light": "Waves of Light",
      "/selhaya-collections/heritage": "Heritage Edition",
      "/selhaya-collections/rose-of-resilience": "Rose of Resilience",
      "/selhaya-collections": "Selhaya Collections",
      "/product": "Selhaya Collections",
    };
    return routeToName[baseRoute] ?? "Selhaya Collections";
  }, [baseRoute]);

  // Wait for cache to be populated, then patch URLs
  React.useEffect(() => {
    const patchURLs = async () => {
      const { getProductURLsCache } = await import('../../lib/productURLHelper');
      // Ensure cache is populated
      await getProductURLsCache();
      // Now patch the URLs with fresh cache
      const patchedItems = createPatchedDataWithShopifyURLs(rawItems);
      setItems(patchedItems);
    };

    patchURLs();
  }, [rawItems]);

  // GA4: view_item_list — fire on mount after items are set
  React.useEffect(() => {
    if (!isClickable || items.length === 0) return;
    pushViewItemList(
      items.map((item, index) => {
        const rawTitle = typeof item.title === 'string' ? item.title.replace(/<[^>]*>?/gm, '').trim() : String(item.id);
        const slug = rawTitle.toLowerCase().replace(/\s+/g, '-');
        const prod = productBySlug[slug];
        return {
          item_id: slug || String(item.id),
          item_name: rawTitle,
          item_brand: prod?.collection || listName,
          price: parseNumericPrice(prod?.price),
          item_list_name: listName,
          currency: "GBP",
          quantity: 1,
          index,
        };
      }),
      listName
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listName, isClickable, items]);

  const handleCardClick = (item: ResilienceItem) => {
    const rawTitle = typeof item.title === 'string' ? item.title.replace(/<[^>]*>?/gm, '').trim() : '';
    const slug = rawTitle.toLowerCase().replace(/\s+/g, "-");
    const prod = productBySlug[slug];
    // GA4: select_item
    pushSelectItem(
      {
        item_id: slug,
        item_name: rawTitle,
        item_brand: prod?.collection || listName,
        price: parseNumericPrice(prod?.price),
        item_list_name: listName,
        currency: "GBP",
        quantity: 1,
        index: items.findIndex((i) => i.id === item.id),
      },
      listName
    );
    // If we're on a product page, try to navigate to Shopify product URL
    if (isProductPage && shopifyProductURL) {
      navigate(shopifyProductURL, { replace: false });
    } else if (item.enterHref) {
      // Navigate directly if enterHref is provided
      navigate(item.enterHref, { replace: false });
    } else {
      // Otherwise use baseRoute (for collection pages)
      navigate(`${baseRoute}/${slug}`, { replace: false });
    }
    onCardClick?.(slug);
  };

  return (
    <section className="w-full">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          id={item.sectionId || `resilience-item-${item.id}`}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.12 }}
        >
          <ResilienceRow
            item={item}
            index={index}
            isClickable={isClickable}
            onCardClick={() => handleCardClick(item)}
            specialSecondRowRightBg={specialSecondRowRightBg}
            isProductPage={isProductPage}
            landscapeFirstRow={landscapeFirstRow}
            productSlug={productSlug}
          />
        </motion.div>
      ))}

      <style>{`
        .resilience-title-default {
          font-weight: 400;
          font-size: 24px;
          line-height: 1.2;
          letter-spacing: 0.08em;
          color: #281B13;
          margin: 0;
        }

        /* Product Page ID 1 (Desktop & Tablet) */
        .resilience-title-1 {
          font-weight: 400;
          font-size: 36px;
          line-height: 66px;
          letter-spacing: 0.08em;
          color: #281B13;
          margin: 0;
        }

        /* Product Page ID 2 (All Devices) */
        .resilience-title-2 {
          font-weight: 400;
          font-size: 24px;
          line-height: normal;
          letter-spacing: 0.08em;
          color: #281B13;
          margin: 0;
        }

        /* Product Page ID 1 (Phone override) */
        @media (max-width: 768px) {
          .resilience-title-1 {
            font-size: 24px;
            line-height: normal;
            color: #A8A09A; /* silver */
          }
        }
      `}</style>
    </section>
  );
};

export default Resilience;