import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../../animations/textAnimation.js";

export interface Section4Props {
  backgroundImage: string;
  title: ReactNode;
  mobTitle: ReactNode;
  mobDescription: ReactNode;
  description: ReactNode;
  tagline?: ReactNode;
  showDivider?: boolean;
  className?: string;
  minHeight?: string;
  overlayClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  taglineClassName?: string;
  mobTitleClassName?: string;
  mobDescriptionClassName?: string;
  mobTaglineClassName?: string;
}

export default function Section4({
  backgroundImage,
  title,
  mobTitle,
  mobDescription,
  description,
  tagline = (
    <>
      Created once. <br />
      Never repeated.
    </>
  ),
  showDivider = true,
  className = "",
  minHeight = "min-h-[500px] md:min-h-[600px] xl:h-screen",
  titleClassName = "",
  descriptionClassName = "",
  taglineClassName = "",
  mobTitleClassName = "",
  mobDescriptionClassName = "",
  mobTaglineClassName = "",
}: Section4Props) {
  return (
    <>

      <section
        className={`hidden md:block  relative w-full ${minHeight} flex flex-col items-center justify-end overflow-hidden ${className}`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for text readability */}
      {/* <div className={`absolute inset-0 ${overlayClassName}`} /> */}

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 py-16 px-6 md:px-12 flex flex-col items-center justify-end h-full text-center text-white max-w-4xl mx-auto"
      >
        {/* Title */}
        <motion.h2
          variants={fadeUp}
          className={`font-editorial leading-tight ${titleClassName || "text-[26px] md:text-[32px]"}`}
        >
          {title}
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className={`text-white/90 max-w-xl mx-auto mt-4 leading-relaxed dm-sans ${descriptionClassName || "text-[14px] md:text-[16px]"}`}
        >
          {description}
        </motion.p>

        {/* Divider */}
        {showDivider && (
          <motion.div
            variants={fadeUp}
            className="w-12 h-px bg-white/70 mx-auto my-6 md:my-8"
          />
        )}

        {/* Tagline */}
        {tagline && (
          <motion.h3
            variants={fadeUp}
            className={`font-editorial italic text-white ${taglineClassName || "text-[22px] md:text-[28px]"}`}
          >
            {tagline}
          </motion.h3>
        )}
      </motion.div>
    </section>




     <section className="md:hidden bg-primary-light">
      <img src={backgroundImage} alt="" className="md:hidden w-full h-auto object-cover" />

      <div className="flex flex-col gap-2 items-center justify-center text-center px-10 py-10" >
        <h2 className={`mb-2 ${mobTitleClassName || "text-[24px] md:text-[32px]"}`}>{mobTitle}</h2>
        <p className={`text-center w-xs ${mobDescriptionClassName || "text-[16px] md:text-[20px]"}`}>{mobDescription}.</p>

        <div className="w-[52px] h-px bg-primary-dark my-4"/>

        <h2 className={mobTaglineClassName || "text-[24px] md:text-[28px]"}>
          <em>{tagline}</em> 
        </h2>
      </div>


    </section>
    </>
  );
}
