import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer } from "../../../animations/textAnimation.js";

export interface Section2Props {
  image: string;
  imageAlt?: string;
  title: React.ReactNode;
  mobileTitle?: React.ReactNode;
  paragraphs?: React.ReactNode[];
  children?: React.ReactNode;
  linkText?: string;
  linkTo?: string;
  linkDataCta?: string;
  onLinkClick?: () => void;
  className?: string;
  imageClassName?: string;
  titleClassName?: string;
  paragraphClassName?: string;
}

export default function Section2({
  image,
  imageAlt,
  title,
  paragraphs,
  children,
  linkText,
  linkTo,
  linkDataCta,
  onLinkClick,
  className = "",
  imageClassName = "",
  titleClassName = "",
  paragraphClassName = "",
}: Section2Props) {
  return (
    <section
      className={`w-full bg-choclate-brown text-primary-light md:py-20 md:px-14 lg:px-20 ${className}`}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 xl:gap-0 items-center "
      >
        {/* Image Column */}
        <motion.div variants={fadeUp} className="order-2 md:order-1 w-full flex justify-center">
          <img
            src={image}
            alt={
              imageAlt ||
              (typeof title === "string" ? title : "SELHAYA Bespoke")
            }
            className={`w-full h-auto object-cover xl:pr-20 ${imageClassName}`}
          />
        </motion.div>

        {/* Text Column */}
        <motion.div
          variants={fadeUp}
          className="order-1 md:order-2 flex flex-col justify-center px-6 pt-10 md:pt-0 md:px-0"
        >
          <h3 className={`font-editorial leading-tight mb-6 xl:mb-12 ${titleClassName || "text-[28px] md:text-[32px]"}`}>
            {title}
          </h3>

          <div className={`space-y-6 xl:space-y-10 text-left ${paragraphClassName || "text-[16px] xl:text-[20px]"}`}>
            {paragraphs
              ? paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))
              : children}
          </div>

          {linkText && linkTo && (
            <Link
              to={linkTo}
              className="space-y-2 underline underline-offset-4 mt-8 xl:mt-10"
              data-cta={linkDataCta}
            >
              {linkText}
            </Link>
          )}

          {linkText && !linkTo && onLinkClick && (
            <button
              onClick={onLinkClick}
              className="space-y-2 underline underline-offset-4 mt-8 xl:mt-10 bg-transparent border-none text-inherit text-left cursor-pointer p-0 font-inherit"
              data-cta={linkDataCta}
            >
              {linkText}
            </button>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
