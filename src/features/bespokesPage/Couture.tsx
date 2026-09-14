import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../animations/textAnimation.js";
import editionsImg from "../../assets/main-product/editions.png";

interface CoutureProps {
  imageSrc?: string;
  imageAlt?: string;
  enquiryHref?: string;
}

const Couture: React.FC<CoutureProps> = ({
  imageSrc = editionsImg,
  imageAlt = "Selhaya Bespoke Couture",
  enquiryHref = "/bespoke",
}) => {
  return (
    <section className="relative w-full overflow-hidden">

      {/* ══════════════════════════════════════
          DESKTOP (md+) — height 815px
      ══════════════════════════════════════ */}
      <div
        className="hidden md:block relative w-full"
        style={{ height: "815px" }}
      >
        {/* Full-bleed background image */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(40, 27, 19, 0.45)" }}
        />

        {/* Content */}
        <motion.div
          className="absolute left-0 right-0 flex flex-col items-center text-center"
          style={{ top: "500px", bottom: "100px" }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h1
            variants={fadeUp}
            className="font-editorial text-white"
            style={{
              fontFamily: "'Silver Editorial', serif",
              fontWeight: 400,
              fontSize: "36px",
              lineHeight: "52px",
            }}
          >
            Selhaya Bespoke
          </motion.h1>

          <motion.h4
            variants={fadeUp}
            className="dm-sans text-white mt-1"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "auto",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Private Silk Couture Commissions
          </motion.h4>

          <motion.a
            variants={fadeUp}
            href={enquiryHref}
            className="dm-sans text-white mt-4"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "20px",
              lineHeight: "1",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              whiteSpace: "nowrap",
            }}
          >
            BEGIN A PRIVATE ENQUIRY →
          </motion.a>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════
          MOBILE (below md) — height 832px
      ══════════════════════════════════════ */}
      <div
        className="flex md:hidden relative w-full"
        style={{ height: "832px" }}
      >
        {/* Full-bleed background image */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(40, 27, 19, 0.4)" }}
        />

        {/* Content */}
        <motion.div
          className="absolute left-0 right-0 flex flex-col items-center text-center px-6"
          style={{ bottom: "80px" }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3
            variants={fadeUp}
            className="font-editorial text-white"
            style={{
              fontFamily: "'Silver Editorial', serif",
              fontWeight: 400,
              fontSize: "28px",
              lineHeight: "1.3",
            }}
          >
            Selhaya Bespoke
          </motion.h3>

          <motion.h5
            variants={fadeUp}
            className="dm-sans text-white mt-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "1.4",
              letterSpacing: "0.08em",
            }}
          >
            Private Silk Couture Commissions
          </motion.h5>

          <motion.a
            variants={fadeUp}
            href={enquiryHref}
            className="dm-sans text-white mt-4"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "1",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              whiteSpace: "nowrap",
            }}
          >
            BEGIN A PRIVATE ENQUIRY →
          </motion.a>
        </motion.div>
      </div>

    </section>
  );
};

export default Couture;