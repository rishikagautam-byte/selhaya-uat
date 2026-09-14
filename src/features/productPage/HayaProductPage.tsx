import React from "react";
import { useParams } from "react-router-dom";
import type { ResilienceItem } from "../../types/resilienceTypes";
import { productPagesData } from "./productPagesData";

/* ─────────────────────────────────────────────
   Props
───────────────────────────────────────────── */
interface HayaProductPageProps {
  data?: ResilienceItem[];
}

/* ─────────────────────────────────────────────
   Shared content block — title, content (no enter link)
───────────────────────────────────────────── */
const ContentBlock: React.FC<{ item: ResilienceItem }> = ({ item }) => (
  <div
    style={{
      width: "329px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    }}
  >
    <h2
      style={{
        fontFamily: "'Silver Editorial', serif",
        fontWeight: 400,
        fontSize: "24px",
        lineHeight: "1.2",
        letterSpacing: "0.08em",
        color: "#281B13",
        margin: 0,
      }}
    >
      {item.title}
    </h2>

    <p
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 400,
        fontSize: "13px",
        lineHeight: "1.4",
        color: "#281B13",
        margin: "8px 0 0 0",
      }}
    >
      {item.content}
    </p>
  </div>
);

/* ─────────────────────────────────────────────
   Desktop Arch card — cream bg, arch thumb + content
───────────────────────────────────────────── */
const ArchCard: React.FC<{ item: ResilienceItem }> = ({ item }) => {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{ backgroundColor: "#F9F4EE" }}
    >
      {/* Arched thumbnail — 252×367 */}
      <div
        className="overflow-hidden flex-shrink-0"
        style={{
          width: "252px",
          height: "367px",
          borderRadius: "151px 151px 0 0",
        }}
      >
        <img
          src={item.thumbImageSrc}
          alt={item.thumbImageAlt}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Content block — 80px below thumb */}
      <div style={{ marginTop: "80px" }}>
        <ContentBlock item={item} />
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Full-bleed image panel
───────────────────────────────────────────── */
const ImagePanel: React.FC<{ item: ResilienceItem }> = ({ item }) => (
  <div className="w-full h-full overflow-hidden">
    <img
      src={item.mainImageSrc}
      alt={item.mainImageAlt}
      className="w-full h-full object-cover object-center"
    />
  </div>
);

/* ─────────────────────────────────────────────
   Single row — alternates card/image each row
───────────────────────────────────────────── */
const ProductRow: React.FC<{ item: ResilienceItem; index: number; productSlug?: string }> = ({
  item,
  index,
  productSlug
}) => {
  const isEven = index % 2 === 0; // 0,2 → card left | 1,3 → image left

  const oneViewportProducts = ["sakura", "sabi", "amara-flame", "ziya-blue", "rina-lemon", "yaqeen"];
  const isLandscapeId2 = item.id === 2 && productSlug && oneViewportProducts.includes(productSlug);
  const desktopHeight = isLandscapeId2 ? "100vh" : "876px";

  return (
    <>
      {/* ── DESKTOP (md+) ── */}
      <div className="hidden md:flex w-full" style={{ height: desktopHeight }}>
        {isEven ? (
          <>
            <div className="w-1/2 h-full">
              <ArchCard item={item} />
            </div>
            <div className="w-1/2 h-full">
              <ImagePanel item={item} />
            </div>
          </>
        ) : (
          <>
            <div className="w-1/2 h-full">
              <ImagePanel item={item} />
            </div>
            <div className="w-1/2 h-full">
              <ArchCard item={item} />
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
          style={{ backgroundColor: "#F9F4EE", paddingBottom: "40px" }}
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
              <ContentBlock item={item} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ─────────────────────────────────────────────
   Main component — Dynamic product page
───────────────────────────────────────────── */
const HayaProductPage: React.FC<HayaProductPageProps> = ({ data }) => {
  const { productName } = useParams<{ productName: string }>();

  // Get data from productPagesData or use passed data
  const items = data ?? (productName ? productPagesData[productName] : []);

  if (!items || items.length === 0) {
    return (
      <div className="p-8 text-center text-[#281B13]">
        Product not found
      </div>
    );
  }

  return (
    <section className="w-full">
      {items.map((item, index) => (
        <ProductRow key={item.id} item={item} index={index} productSlug={productName} />
      ))}
    </section>
  );
};

export default HayaProductPage;
