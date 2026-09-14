import React from "react";
import legacy1Img from "../../assets/bespoke/legacy1.png";
import legacy2Img from "../../assets/bespoke/legacy2.png";

const Legacy: React.FC = () => {
  return (
    <section className="w-full">

      {/* ══════════════════════════════════════
          DESKTOP (lg+) — height 943px, bg image
      ══════════════════════════════════════ */}
      <div
        className="hidden lg:flex w-full items-center justify-center relative overflow-hidden"
        style={{ height: "943px" }}
      >
        {/* Full-bleed background image */}
        <img
          src={legacy1Img}
          alt="Legacy background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(40, 27, 19, 0.35)" }}
        />

        {/* Card — 544×644, centered */}
        <div
          className="relative z-10 flex flex-col items-center text-center"
          style={{
            width: "544px",
            height: "644px",
            backgroundColor: "#F9F4EE",
            padding: "48px 36px 40px 36px",
          }}
        >
          {/* Title — Silver Editorial h2 32/52, 3 lines */}
          <h2
            className="font-editorial text-[#281B13] text-center"
            style={{
              fontFamily: "'Silver Editorial', serif",
              fontWeight: 400,
              fontSize: "32px",
              lineHeight: "52px",
            }}
          >
            We do not design for
            <br />
            moments. We design
            <br />
            for legacy
          </h2>

          {/* Thumb image — 167×211 */}
          <div
            className="overflow-hidden mt-5 flex-shrink-0"
            style={{ width: "167px", height: "211px" }}
          >
            <img
              src={legacy2Img}
              alt="Legacy detail"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Content — 473×78, DM Sans h5 20/auto */}
          <p
            className="dm-sans text-[#281B13] text-center mt-6"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "20px",
              lineHeight: "1.55",
              width: "473px",
              height: "78px",
            }}
          >
            Rather than presenting products, we offers glimpses into silhouette,
            texture, embroidery, atmosphere, and ceremonial presence.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════
          TABLET (md to lg) — same as desktop card
          but no bg image, just cream bg
      ══════════════════════════════════════ */}
      <div
        className="hidden md:flex lg:hidden w-full items-center justify-center relative overflow-hidden"
        style={{ height: "943px", backgroundColor: "#F9F4EE" }}
      >
        {/* Card — centered */}
        <div
          className="flex flex-col items-center text-center"
          style={{
            width: "544px",
            height: "644px",
            backgroundColor: "#F9F4EE",
            padding: "48px 36px 40px 36px",
          }}
        >
          <h2
            className="font-editorial text-[#281B13] text-center"
            style={{
              fontFamily: "'Silver Editorial', serif",
              fontWeight: 400,
              fontSize: "32px",
              lineHeight: "52px",
            }}
          >
            We do not design for
            <br />
            moments. We design
            <br />
            for legacy
          </h2>

          <div
            className="overflow-hidden mt-5 flex-shrink-0"
            style={{ width: "167px", height: "211px" }}
          >
            <img
              src={legacy2Img}
              alt="Legacy detail"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <p
            className="dm-sans text-[#281B13] text-center mt-6"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "20px",
              lineHeight: "1.55",
              width: "473px",
              height: "78px",
            }}
          >
            Rather than presenting products, we offers glimpses into silhouette,
            texture, embroidery, atmosphere, and ceremonial presence.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════
          MOBILE (below md) — NO legacy1.png,
          dark bg, only thumb + text
      ══════════════════════════════════════ */}
      <div
        className="flex md:hidden w-full flex-col"
        style={{ backgroundColor: "#2D1F1D" }}
      >
        {/* Content area — no top image */}
        <div className="flex flex-col items-center text-center px-6 pt-14 pb-12">
          {/* Title */}
          <h3
            className="font-editorial text-white text-center"
            style={{
              fontFamily: "'Silver Editorial', serif",
              fontWeight: 400,
              fontSize: "28px",
              lineHeight: "1.4",
            }}
          >
            We do not design for
            <br />
            moments. We design for
            <br />
            legacy
          </h3>

          {/* Thumb image only */}
          <div
            className="overflow-hidden mt-6 flex-shrink-0"
            style={{ width: "167px", height: "211px" }}
          >
            <img
              src={legacy2Img}
              alt="Legacy detail"
              className="w-full h-full object-cover object-center"
            />
          </div>

        

          {/* Content */}
          <p
            className="dm-sans text-white text-center mt-6"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "1.6",
              maxWidth: "290px",
            }}
          >
            Rather than presenting products, we offers glimpses into silhouette,
            texture, embroidery, atmosphere, and ceremonial presence.
          </p>
        </div>
      </div>

    </section>
  );
};

export default Legacy;