import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../animations/textAnimation.js";

interface TailoredProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
}

const Tailored: React.FC<TailoredProps> = ({ 
  title = "Pure silk robes tailored for\npresence and permanence", 
  content = "From everyday silk robes to couture commissions, collector pieces, ceremonial garments, and seasonal editions, each creation reflects a different expression of Selhaya. Designed not around trends, but around memory, movement, and enduring beauty." 
}) => {
  return (
    <section className="w-full bg-[#2D1F1D]">

      {/* ══════════════════════════════════════
          DESKTOP (md+) — height 251px
      ══════════════════════════════════════ */}
      <div
        className="hidden md:flex w-full items-center"
        style={{ minHeight: "251px", paddingLeft: "clamp(48px, 8vw, 100px)", paddingRight: "clamp(48px, 8vw, 100px)", paddingTop: "64px", paddingBottom: "64px" }}
      >
        {/* Left: Title — vertically centered, takes up left half */}
        <motion.div
          className="flex-1 flex items-center"
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
              fontSize: "clamp(24px, 2.8vw, 40px)",
              lineHeight: "1.45",
              whiteSpace: "pre-line",
            }}
          >
            {title}
          </motion.h1>
        </motion.div>

        {/* Right: Content — vertically centered, max 40% width */}
        <motion.div
          className="flex-shrink-0 flex items-center"
          style={{ maxWidth: "clamp(280px, 36%, 500px)", marginLeft: "auto" }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            viewport={{ once: true, amount: 0.2 }}
            className="dm-sans text-white text-left"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(13px, 1.1vw, 16px)",
              lineHeight: "1.65",
            }}
          >
            {content}
          </motion.p>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════
          MOBILE + TABLET (below md) — height 512px
      ══════════════════════════════════════ */}
      <motion.div
        className="flex md:hidden flex-col w-full items-center text-center"
        style={{ height: "512px", paddingLeft: "24px", paddingRight: "24px", paddingTop: "80px" }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h4
          variants={fadeUp}
          className="font-editorial text-white text-center"
          style={{
            fontFamily: "'Silver Editorial', serif",
            fontWeight: 400,
            fontSize: "24px",
            lineHeight: "1.4",
            whiteSpace: "pre-line",
          }}
        >
          {title}
        </motion.h4>

        <motion.p
          variants={fadeUp}
          className="dm-sans text-white text-center mt-6"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "1.55",
          }}
        >
          {content}
        </motion.p>
      </motion.div>

    </section>
  );
};

export default Tailored;