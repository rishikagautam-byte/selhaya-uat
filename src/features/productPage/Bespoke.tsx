import React from "react";
import bespokeMain from "../../assets/main-product/editions.png";
import bespokeCraft from "../../assets/navbar/the-house-of-selhaya/craft.png";

interface BespokeProps {
  mainImageSrc?: string;
  mainImageAlt?: string;
  thumbImageSrc?: string;
  thumbImageAlt?: string;
  exploreHref?: string;
}

const Bespoke: React.FC<BespokeProps> = ({
  mainImageSrc = bespokeMain,
  mainImageAlt = "SELHAYA Bespoke",
  thumbImageSrc = bespokeCraft,
  thumbImageAlt = "Bespoke detail",
  exploreHref = "/bespoke",
}) => {
  return (
    <section className="w-full bg-[#2D1F1D]">

      {/* ══════════════════════════════════════
          DESKTOP LAYOUT (md and above)
      ══════════════════════════════════════ */}
      <div className="hidden md:flex w-full" style={{ height: "830px" }}>

        {/* ── LEFT PANEL ── */}
        <div
          className="flex-shrink-0 flex flex-col"
          style={{ width: "50%", paddingLeft: "64px", paddingTop: "64px" }}
        >
          {/* Title — 2 lines, Silver Editorial 36/52 */}
          <h2
            className="font-editorial text-white"
            style={{
              fontFamily: "'Silver Editorial', serif",
              fontWeight: 400,
              fontSize: "32px",
              lineHeight: "52px",
              maxWidth: "365px",
            }}
          >
            The Pinnacle of Luxury:
            <br />
            SELHAYA Bespoke
          </h2>

          {/* Content — just below title */}
          <p
            className="dm-sans text-white text-left mt-4"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "1.55",
              maxWidth: "438px",
            }}
          >
            Selhaya abayas aren't just worn they are chosen for moments of
            significance, celebration, and cultural honour. From distinguished
            gatherings to timeless personal expression, these pieces carry
            quiet grace and meaningful presence.
          </p>

          {/* 200px spacer then explore + image */}
          <div style={{ marginTop: "150px" }}>
            {/* Dashed divider */}


            {/* Explore link */}
            <a
              href={exploreHref}
              className="dm-sans text-white flex items-center gap-2 mt-6"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                letterSpacing: "0.08em",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              EXPLORE SELHAYA BESPOKE &nbsp;→
            </a>

            {/* Thumb card: 217×231 */}
            <div
              className="overflow-hidden mt-6 flex-shrink-0"
              style={{ width: "217px", height: "231px" }}
            >
              <img
                src={thumbImageSrc}
                alt={thumbImageAlt}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL — full-bleed image ── */}
        <div className="flex-1 h-full overflow-hidden">
          <img
            src={mainImageSrc}
            alt={mainImageAlt}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* ══════════════════════════════════════
          MOBILE LAYOUT (below md)
      ══════════════════════════════════════ */}
      <div className="flex md:hidden flex-col w-full">

        {/* Top: full-width image 385px tall */}
        <div className="w-full flex-shrink-0" style={{ height: "385px" }}>
          <img
            src={mainImageSrc}
            alt={mainImageAlt}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Bottom: text content */}
        <div
          className="w-full flex flex-col"
          style={{ backgroundColor: "#2D1F1D", padding: "32px 24px 40px 24px" }}
        >
          {/* Title h4 Silver Editorial 24px */}
          <h4
            className="font-editorial text-white"
            style={{
              fontFamily: "'Silver Editorial', serif",
              fontWeight: 400,
              fontSize: "24px",
              lineHeight: "1.35",
            }}
          >
            The Pinnacle of Luxury:
            <br />
            SELHAYA Bespoke
          </h4>

          {/* Content — 4 lines, left aligned, just below title */}
          <p
            className="dm-sans text-white mt-4 text-left"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          >
            Selhaya abayas aren't just worn they are chosen for moments of
            significance, celebration, and cultural honour. From distinguished
            gatherings to timeless personal expression, these pieces carry
            quiet grace and meaningful presence.
          </p>

          {/* Explore link with arrow */}
          <a
            href={exploreHref}
            className="dm-sans text-white flex items-center gap-2 mt-6"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              letterSpacing: "0.08em",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
            EXPLORE SELHAYA BESPOKE
            <span style={{ fontSize: "14px" }}>→</span>
          </a>
        </div>
      </div>

    </section>
  );
};

export default Bespoke;