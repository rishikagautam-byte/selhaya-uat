import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../animations/textAnimation.js";

const Presence: React.FC = () => {
  return (
    <section className="w-full bg-[#2D1F1D]">
      {/* ── DESKTOP LAYOUT ── */}
      {/* items-start = both columns top-aligned | pt-[52px] = vertical centering offset for 251px height */}
      <motion.div
        className="hidden md:flex items-start w-full h-[251px] px-16 gap-16 pt-[52px]"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Left: Title */}
        <div className="flex-1 min-w-0">
          <motion.h1
            variants={fadeUp}
            className="font-editorial text-white"
            style={{
              fontFamily: "'Silver Editorial', serif",
              fontWeight: 400,
              fontSize: "36px",
              lineHeight: "65px",
            }}
          >
            Collections of Presence,
            <br />
            Ceremony &amp; Timeless Elegance
          </motion.h1>
        </div>

        {/* Right: Body copy */}
        <div
          className="flex-shrink-0"
          style={{ width: "406px" }}
        >
          <motion.p
            variants={fadeUp}
            className="dm-sans text-white text-left"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "1.55",
            }}
          >
            From everyday silk robes to couture commissions, collector pieces,
            ceremonial garments, and seasonal editions, each creation reflects a
            different expression of Selhaya. Designed not around trends, but
            around memory, movement, and enduring beauty.
          </motion.p>
        </div>
      </motion.div>

      {/* ── MOBILE LAYOUT ── */}
      <motion.div
        className="flex md:hidden flex-col w-full px-6 py-20"
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
          }}
        >
          Collections of Presence,
          <br />
          Ceremony &amp; Timeless
          <br />
          Elegance
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
          From everyday silk robes to couture commissions, collector pieces,
          ceremonial garments, and seasonal editions, each creation reflects a
          different expression of Selhaya. Designed not around trends, but
          around memory, movement, and enduring beauty.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Presence;