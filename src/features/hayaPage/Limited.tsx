import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../animations/textAnimation.js";
import limitedImg from "../../assets/haya-images/limited2.png";

interface LimitedProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  descriptionLines?: string[];
}

export const Limited: React.FC<LimitedProps> = ({
  imageSrc = limitedImg,
  imageAlt = "Haya Robes",
  title,
  description,
  descriptionLines,
}) => {
  return (
    <section className="relative w-full overflow-hidden">

      <div
        className="hidden md:block relative w-full"
        style={{ height: "800px" }}
      >
        {/* Full-bleed image */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Subtle dark overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(40, 27, 19, 0.30)" }}
        />

        {/* Content */}
        <motion.div
          className="absolute left-0 right-0 flex flex-col items-center text-center"
          style={{ bottom: "120px" }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={fadeUp}
            className="font-editorial text-white"
            style={{
              fontFamily: "'Silver Editorial', serif",
              fontWeight: 400,
              fontSize: "48px",
              lineHeight: "70px",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {title || "Haya Robes"}
          </motion.h1>

          <motion.h5
            variants={fadeUp}
            className="dm-sans text-white mt-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "1.55",
            }}
          >
            {descriptionLines ? (
              descriptionLines.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < descriptionLines.length - 1 && <br />}
                </React.Fragment>
              ))
            ) : description ? (
              description
            ) : (
              <>
                Limited pure silk editions crafted
                <br />
                once, never repeated.
              </>
            )}
          </motion.h5>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════
          MOBILE (below md) — height 832px
      ══════════════════════════════════════ */}
      <div
        className="flex md:hidden relative w-full"
        style={{ height: "832px" }}
      >
        {/* Full-bleed image */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Subtle dark overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(40, 27, 19, 0.30)" }}
        />

        {/* Content */}
        <motion.div
          className="absolute left-0 right-0 flex flex-col items-center text-center px-6"
          style={{ bottom: "100px" }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
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
            {title || "Haya robes"}
          </motion.h3>

          <motion.h5
            variants={fadeUp}
            className="dm-sans text-white mt-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "1.55",
            }}
          >
            {descriptionLines ? (
              descriptionLines.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < descriptionLines.length - 1 && <br />}
                </React.Fragment>
              ))
            ) : description ? (
              description
            ) : (
              <>
                Limited pure silk editions crafted once, never
                <br />
                repeated.
              </>
            )}
          </motion.h5>
        </motion.div>
      </div>

    </section>
  );
};

export default Limited;