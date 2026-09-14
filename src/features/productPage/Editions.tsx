import React from "react";
import editionsImage from "../../assets/main-product/editions.png";

interface EditionsProps {
  imageSrc?: string;
  imageAlt?: string;
}

const Editions: React.FC<EditionsProps> = ({
  imageSrc = editionsImage,
  imageAlt = "selhaya collections",
}) => {
  return (
    <section className="relative w-full h-svh min-h-screen overflow-hidden">
      {/* Full-bleed background image — fills all screen sizes */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Brand overlay tint */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(64, 44, 31, 0.35)" }}
      />

      {/* Content — pinned to bottom-center, matching the design screenshots */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-14 md:pb-16 px-5 text-center">

        {/*
          TITLE
          Mobile  → Silver Editorial, 28px, line-height auto  (h3 equivalent)
          Desktop → Silver Editorial, 48px, line-height 66px  (h0/display equivalent)
        */}
        <h1
          className="font-editorial text-white whitespace-nowrap"
          style={{
            fontFamily: "'Silver Editorial', serif",
            fontWeight: 400,
          }}
        >
          {/* Mobile size */}
          <span className="block text-[28px] leading-none md:hidden">
            selhaya collections
          </span>
          {/* Desktop size */}
          <span className="hidden md:block text-[48px] leading-[66px]">
            selhaya collections
          </span>
        </h1>

        {/*
          SUBTITLE
          Mobile  → DM Sans, font-size auto, line-height 14px  (h5 mobile)
          Desktop → DM Sans, 20px, line-height auto
          Always 2 lines, always centered
        */}
        <p
          className="dm-sans text-white mt-2 md:mt-3"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
        >
          {/* Mobile */}
          <span className="block md:hidden text-[14px] leading-[1.4]">
            Each Edition is crafted in pure silk.
            <br />
            Each carries its own lineage.
          </span>
          {/* Desktop */}
          <span className="hidden md:block text-[20px] leading-normal">
            Each Edition is crafted in pure silk.
            <br />
            Each carries its own lineage.
          </span>
        </p>

      </div>
    </section>
  );
};

export default Editions;