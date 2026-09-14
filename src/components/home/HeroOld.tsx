"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroSection from "../HeroSection";
import HouseQuitelyGives from "../global/HouseQuitelyGives";
import Bespoke from "../global/Bespoke.js";
import JournalSection from "./JournalSection";
import { staggerContainer, fadeUp } from "../../../src/animations/textAnimation.js"
import FloatingLogo from "../global/FloatingLogo.js";
const selhayaVideo = "/videos/hero-video.mp4";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import ExploreLink from "../global/ExploreLink.js";
import SEO from "../SEO";
import { SEO_CONFIG } from "../../config/seo";



const collectionItems = [
  { src: "/images/home/resilence.jpg", title: "ROSE OF RESILIENCE", url: "/selhaya-collections/rose-of-resilience" },
  { src: "/images/home/haya.png", title: "HAYA", url: "/selhaya-collections/haya" },
  { src: "/images/home/waves.jpg", title: "WAVES OF LIGHT", url: "/selhaya-collections/waves-of-light" },
  { src: "/images/home/heritage.png", title: "HERITAGE", url: "/selhaya-collections/heritage" },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <>
      <SEO
        title={SEO_CONFIG.home.title}
        description={SEO_CONFIG.home.description}
        canonical={SEO_CONFIG.home.canonical}
      />
      {/* hero section */}
      <HeroSection
        image="/images/home/hero.png"
        video={selhayaVideo}
        title="The World of Selhaya"
        desktopText={
          <>
            Exquisite and bespoke luxury craft of silk garments and art works that enchant the senses.
          </>
        }
        mobileText="Exquisite and bespoke luxury craft of silk garments and art works that enchant the senses."
        buttonText="JOURNEY SELHAYA COLLECTIONS"
        buttonLink="/selhaya-collections"
        textColor="text-white"
      />

      <FloatingLogo />

      {/* title and description */}
      <section className="relative py-24 px-10 md:px-12 bg-section-bg z-1 text-text">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }} className="text-center flex flex-col gap-6">
          <motion.h2
            variants={fadeUp}
            className="text-[24px] md:text-[32px] text-left md:text-center"
          >
            Welcome to the first Maison of its kind.{" "}<br className="hidden md:block" />{" "}The exceptional world of SELHAYA
          </motion.h2>

          <div className="space-y-6 max-w-7xl mx-auto">
            <motion.p variants={fadeUp} className="w-full mx-auto text-[16px] md:text-[20px] text-left md:text-center">
              Timeless presence. Historical craftsmanship. SELHAYA encapsulates elevated beauty, ensuring every Edition transcends{" "}<br className="hidden xl:block" />{" "}the pinnacle of elegance and luxury refinement. Stories with meaning are at the core of every SELHAYA creation.
            </motion.p>

          </div>

        </motion.div>
      </section>


      {/* The Sovereign Robe Reimagined Section */}
      <section className="flex flex-col md:flex-row w-full bg-choclate-brown text-primary-light">
        <div className="md:w-1/2 md:h-auto">
          <img
            src="/images/home/sovereign.png"
            alt="The Sovereign Robe Reimagined"
            className="w-full h-[500px] md:h-screen object-cover object-top"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between px-8 py-12 md:py-20 md:px-8 lg:px-20">
          <motion.div variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className=" flex flex-col justify-center">
            <motion.h2 variants={fadeUp}
              className="text-[28px] lg:text-[32px] font-editorial mb-6"
            >
              The Sovereign Robe Reimagined
            </motion.h2>
            <motion.div variants={fadeUp}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-[16px] md:text-[20px] text-left space-y-6"
            >
              <p>Across courts, ceremonies and sacred rooms, the outer robe has long carried the image of sovereignty. It covered without diminishing, gave shape to dignity, and turned cloth into identity.</p>

              <p>Selhaya takes this ancient language and brings it into the modern luxury wardrobe. Through silk, handwork and storytelling, the House gives modest outerwear its own place in luxury: coveted, collected and remembered.</p>

              <p>For the Selhaya woman, the robe is not simply worn. It becomes her standard.</p>
            </motion.div>

          </motion.div>
          <motion.div
            className="mt-6"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <ExploreLink to="/the-house-of-selhaya" />
          </motion.div>
        </div>
      </section >

      {/* Collections Section */}
      < section className="bg-primary-light text-text pt-10 md:pt-24 w-full overflow-hidden" >

        <div className="px-10 md:px-12 flex flex-col  justify-center items-center mb-4 gap-8">
          <motion.div variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}>

            <motion.h3 variants={fadeUp} className="text-[26px] md:text-[28px] md:text-center mb-6 md:mb-8">
              Stories with meaning are at the core of every SELHAYA creation.{" "}<br className="hidden md:block" />
              Stunning pure silk garments are made by hand for the most elegant and refined of women.
            </motion.h3>


          </motion.div>
          <div className="flex justify-between w-full items-end px-4">
            <motion.p variants={fadeUp} className="text-[14px] md:text-[20px]">
              Every collection portrays a story. <br />
              A unique feeling of timeless and limitless elegance.
            </motion.p>

            {/* Link */}
            <motion.div variants={fadeUp} className="hidden sm:block">
              <ExploreLink to="/selhaya-collections" text="JOURNEY SELHAYA COLLECTIONS" arrowColor="black" />
            </motion.div>

          </div>
        </div>

        {/* Desktop View (sm and up) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
          {collectionItems.map((item, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] md:aspect-[4/5] group overflow-hidden"
            >
              <Link to={item.url}>
                <img
                  src={item.src}
                  alt={item.title}
                  draggable="false"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-80 hover:brightness-100 transition-all duration-1000"
                />
              </Link>

              <div className="absolute bottom-6 w-full px-4 flex justify-center">
                <span className="text-white text-[12px] md:text-[14px] uppercase text-center font-medium drop-shadow-md">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="block sm:hidden w-full relative pb-10">

          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            onSlideChange={(swiper) => {
              setCurrentSlide(swiper.realIndex + 1);
            }}
          >
            {collectionItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="px-10">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Link to={item.url}>
                      <img
                        src={item.src}
                        alt={item.title}
                        draggable="false"
                        className="w-full h-full object-cover brightness-80"
                      />
                    </Link>

                    <div className="absolute bottom-6 w-full px-4 flex justify-center">
                      <span className="text-white text-[12px] uppercase text-center font-medium drop-shadow-md">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-between items-center px-10 mt-6">
            <span className="text-text text-[16px] font-medium tracking-wide">
              {currentSlide}/{collectionItems.length}
            </span>

            <Link
              to="/selhaya-collections"
              className="text-[16px] uppercase flex items-center gap-1"
            >
              <span className="text-text border-b border-text">
                EXPLORE THE EDITIONS
              </span>
              <span>&rarr;</span>
            </Link>
          </div>

        </div>
      </section >

      {/* bespoke */}
      < Bespoke/>

      {/* Refined Cultural Presence */}
      < section className="grid grid-cols-1 md:grid-cols-2 bg-white" >
        <div className="w-full h-auto">
          <img src="/images/home/presence.png"
            alt="Garments of Presence"
            className="w-full md:h-screen object-cover" />
        </div>
        <div className="px-10 py-12 xl:p-20 flex flex-col justify-between">
          <div className="text">
            <h2 className="text-[24px] md:text-[32px]">Refined Cultural Presence</h2>
            <div className="flex flex-col gap-2 md:gap-6 my-6 lg:pr-14">
              <p className="text-[16px] md:text-[20px] ">
                SELHAYA is highly regarded not only as a one of a kind Maison but for its quintessential artistic visions representing historical as well as cultural traditions.
              </p>
              <p className="text-[16px] md:text-[20px]">
                Revered worldwide by Royalty, Diplomats and Institutions, SELHAYA is carving its own unique space merging luxury with heritage. A unity of cultures abound by emotion and stories shared, who collectively appreciate the depth of care and attention to detail for the very fine luxury wear and art works of SELHAYA.
              </p>

            </div>
          </div>
          <div className="mt-4">
            <ExploreLink to="/cultural-alliance" text="Explore  Cultural Alliances" arrowColor="black" />
          </div>
        </div>
      </section >

      <HouseQuitelyGives />

      {/* journal */}
      < JournalSection />
    </>
  )
}
